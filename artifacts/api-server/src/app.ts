import express, { type Express, type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import session from "express-session";
import router from "./routes";
import { logger } from "./lib/logger";
import { ensureDbConnection, pool } from "@workspace/db";

const app: Express = express();

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

// Health check endpoint (called by Render)
app.get("/health", async (req, res) => {
  try {
    await ensureDbConnection();
    res.status(200).json({ status: "ok", db: "connected" });
  } catch (err) {
    res.status(503).json({ status: "degraded", db: "disconnected", error: String(err) });
  }
});

// Middleware: Ensure DB connection is alive before handling request
app.use(async (req: Request, res: Response, next: NextFunction) => {
  if (req.path === "/health") return next(); // Skip for health check
  try {
    // Quick connection test
    const client = await pool.connect();
    await client.query("SELECT 1");
    client.release();
    next();
  } catch (err) {
    logger.warn("DB connection failed on request, attempting retry...");
    try {
      await ensureDbConnection();
      next();
    } catch (retryErr) {
      logger.error({ err: retryErr }, "DB still unreachable after retry");
      res.status(503).json({ error: "Database temporarily unavailable, please try again" });
    }
  }
});

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "dev-secret-change-me",
    resave: true,
    saveUninitialized: false,
    proxy: process.env.NODE_ENV === "production",
    rolling: true,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    },
  }),
);

app.use("/api", router);

export default app;
