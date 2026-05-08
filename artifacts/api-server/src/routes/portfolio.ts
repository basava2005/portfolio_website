import { Router } from "express";
import { db } from "@workspace/db";
import {
  siteSettingsTable,
  experiencesTable,
  projectsTable,
  achievementsTable,
} from "@workspace/db/schema";
import { asc, eq } from "drizzle-orm";

const router = Router();

router.get("/portfolio/settings/:key", async (req, res) => {
  try {
    const rows = await db
      .select()
      .from(siteSettingsTable)
      .where(eq(siteSettingsTable.key, req.params.key))
      .limit(1);
    res.json(rows[0]?.value ?? null);
  } catch (err) {
    req.log.error({ err }, "Failed to get setting");
    res.status(500).json({ error: "Failed" });
  }
});

router.get("/portfolio/experiences", async (_req, res) => {
  try {
    const rows = await db
      .select()
      .from(experiencesTable)
      .orderBy(asc(experiencesTable.sortOrder), asc(experiencesTable.createdAt));
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Failed" });
  }
});

router.get("/portfolio/projects", async (_req, res) => {
  try {
    const rows = await db
      .select()
      .from(projectsTable)
      .orderBy(asc(projectsTable.sortOrder), asc(projectsTable.createdAt));
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Failed" });
  }
});

router.get("/portfolio/achievements", async (_req, res) => {
  try {
    const rows = await db
      .select()
      .from(achievementsTable)
      .orderBy(asc(achievementsTable.sortOrder), asc(achievementsTable.createdAt));
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Failed" });
  }
});

export default router;
