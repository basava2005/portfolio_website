import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Parse connection string and add Neon-specific options for cold start handling
const dbUrl = new URL(process.env.DATABASE_URL);
dbUrl.searchParams.set("connect_timeout", "30");
dbUrl.searchParams.set("application_name", "portfolio-builder");

export const pool = new Pool({
  connectionString: dbUrl.toString(),
  max: 20, // Max connections in pool
  idleTimeoutMillis: 30000, // 30 seconds
  connectionTimeoutMillis: 30000, // 30 seconds
  maxUses: 7500, // Recycle connections periodically
});

// Add a function to test and reconnect if needed
export async function ensureDbConnection() {
  let retries = 3;
  while (retries > 0) {
    try {
      const client = await pool.connect();
      await client.query("SELECT NOW()"); // Simple ping query
      client.release();
      return;
    } catch (err) {
      console.error(`Database connection attempt failed (${4 - retries}/3):`, err);
      retries--;
      if (retries > 0) await new Promise(r => setTimeout(r, 2000)); // Wait 2 seconds before retry
    }
  }
  throw new Error("Failed to connect to database after multiple attempts");
}

export const db = drizzle(pool, { schema });

export * from "./schema";
