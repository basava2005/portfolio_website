import app from "./app";
import { logger } from "./lib/logger";
import { ensureDbConnection } from "@workspace/db";

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

// Test database connection first and handle cold starts
const startServer = async () => {
  try {
    await ensureDbConnection();
    app.listen(port, (err) => {
      if (err) {
        logger.error({ err }, "Error listening on port");
        process.exit(1);
      }

      logger.info({ port }, "Server listening");
    });
  } catch (dbErr) {
    logger.error({ err: dbErr }, "Failed to initialize database connection on startup");
    // Still start server but log error; let routes handle retries
    app.listen(port, (err) => {
      if (err) {
        logger.error({ err }, "Error listening on port");
        process.exit(1);
      }
      logger.info({ port, dbConnected: false }, "Server listening (database connection failed on startup");
    });
  }
};

startServer();
