import { defineConfig } from "drizzle-kit";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables from root .env if not already set
if (!process.env.DATABASE_URL) {
  try {
    const dirname = typeof __dirname !== "undefined"
      ? __dirname
      : path.dirname(fileURLToPath(import.meta.url));
    process.loadEnvFile(path.resolve(dirname, "../../.env"));
  } catch (err) {
    // Ignore if .env file is not found
  }
}

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL, ensure the database is provisioned");
}

let databaseUrl = process.env.DATABASE_URL;

// Parse connection string and add Neon-specific options for cold start handling
try {
  const dbUrl = new URL(databaseUrl);
  // If using Neon's connection pooler, convert to direct connection.
  // Direct connections wake up Neon compute instances natively and support
  // channel_binding=require without PgBouncer limitations.
  if (dbUrl.hostname.includes("-pooler.")) {
    dbUrl.hostname = dbUrl.hostname.replace("-pooler.", ".");
    databaseUrl = dbUrl.toString();
  }
} catch (err) {
  // Ignore URL parsing errors for non-standard connection strings
}

export default defineConfig({
  schema: "./src/schema/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl,
  },
});
