import { Router } from "express";
import { db } from "@workspace/db";
import { certificatesTable } from "@workspace/db/schema";
import { asc } from "drizzle-orm";

const router = Router();

router.get("/certificates", async (req, res) => {
  try {
    const rows = await db
      .select()
      .from(certificatesTable)
      .orderBy(asc(certificatesTable.createdAt));
    res.json(rows);
  } catch (err) {
    req.log.error({ err }, "Failed to fetch certificates");
    res.status(500).json({ error: "Failed to fetch certificates" });
  }
});

export default router;
