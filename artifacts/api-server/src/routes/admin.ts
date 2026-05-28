import { Router } from "express";
import { db } from "@workspace/db";
import {
  certificatesTable,
  contactsTable,
  insertCertificateSchema,
  siteSettingsTable,
  experiencesTable,
  insertExperienceSchema,
  projectsTable,
  insertProjectSchema,
  achievementsTable,
  insertAchievementSchema,
} from "@workspace/db/schema";
import { desc, eq, asc, gte, sql } from "drizzle-orm";
import { z } from "zod";
import { ObjectStorageService } from "../lib/objectStorage.js";

const router = Router();
const storage = new ObjectStorageService();

function isAdmin(req: any, res: any, next: any) {
  if ((req.session as any)?.adminAuthed) return next();
  req.log.warn({ 
    sessionID: req.sessionID, 
    hasSession: !!req.session, 
    authed: (req.session as any)?.adminAuthed 
  }, "Unauthorized access attempt");
  res.status(401).json({ error: "Unauthorized" });
}

// ── Auth ──────────────────────────────────────────────────────────────────
router.post("/admin/login", (req, res) => {
  const { password } = req.body ?? {};
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) { res.status(503).json({ error: "Admin not configured" }); return; }
  if (password === adminPassword) {
    (req.session as any).adminAuthed = true;
    res.json({ ok: true });
  } else {
    res.status(401).json({ error: "Wrong password" });
  }
});

router.post("/admin/logout", (req, res) => {
  req.session.destroy(() => res.json({ ok: true }));
});

router.get("/admin/me", (req, res) => {
  res.json({ authed: !!(req.session as any)?.adminAuthed });
});

// ── Contacts ──────────────────────────────────────────────────────────────
router.get("/admin/contacts", isAdmin, async (req, res) => {
  try {
    const rows = await db.select().from(contactsTable).orderBy(desc(contactsTable.createdAt));
    res.json(rows);
  } catch (err) { req.log.error({ err }); res.status(500).json({ error: "Failed" }); }
});

router.patch("/admin/contacts/:id/read", isAdmin, async (req, res) => {
  try {
    await db.update(contactsTable).set({ read: true }).where(eq(contactsTable.id, parseInt(req.params.id)));
    res.json({ ok: true });
  } catch (err) { res.status(500).json({ error: "Failed" }); }
});

// ── Certificates ──────────────────────────────────────────────────────────
const certBodySchema = z.object({
  name: z.string().min(1), issuer: z.string().min(1),
  description: z.string().optional(), year: z.string().optional(),
  fileUrl: z.string().optional(), fileType: z.string().optional(),
});

router.get("/admin/certificates", isAdmin, async (req, res) => {
  try {
    const rows = await db.select().from(certificatesTable).orderBy(desc(certificatesTable.createdAt));
    res.json(rows);
  } catch (err) { res.status(500).json({ error: "Failed" }); }
});

router.post("/admin/certificates", isAdmin, async (req, res) => {
  const parsed = certBodySchema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: "Invalid body" }); return; }
  try {
    const [row] = await db.insert(certificatesTable).values(insertCertificateSchema.parse(parsed.data)).returning();
    res.json(row);
  } catch (err) { res.status(500).json({ error: "Failed" }); }
});

router.patch("/admin/certificates/:id", isAdmin, async (req, res) => {
  const parsed = certBodySchema.partial().safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: "Invalid body" }); return; }
  try {
    const [row] = await db.update(certificatesTable).set(parsed.data).where(eq(certificatesTable.id, parseInt(req.params.id))).returning();
    res.json(row);
  } catch (err) { res.status(500).json({ error: "Failed" }); }
});

router.delete("/admin/certificates/:id", isAdmin, async (req, res) => {
  try {
    await db.delete(certificatesTable).where(eq(certificatesTable.id, parseInt(req.params.id)));
    res.json({ ok: true });
  } catch (err) { res.status(500).json({ error: "Failed" }); }
});

// ── Site Settings (hero, about, contact info) ─────────────────────────────
router.get("/admin/settings", isAdmin, async (req, res) => {
  try {
    const rows = await db.select().from(siteSettingsTable);
    const out: Record<string, any> = {};
    rows.forEach((r) => { out[r.key] = r.value; });
    res.json(out);
  } catch (err) { res.status(500).json({ error: "Failed" }); }
});

router.put("/admin/settings/:key", isAdmin, async (req, res) => {
  const { key } = req.params;
  const { value } = req.body;
  try {
    const existing = await db.select().from(siteSettingsTable).where(eq(siteSettingsTable.key, key)).limit(1);
    if (existing.length > 0) {
      await db.update(siteSettingsTable).set({ value, updatedAt: new Date() }).where(eq(siteSettingsTable.key, key));
    } else {
      await db.insert(siteSettingsTable).values({ key, value });
    }
    res.json({ ok: true });
  } catch (err) { req.log.error({ err }); res.status(500).json({ error: "Failed" }); }
});

// ── Experiences ───────────────────────────────────────────────────────────
const expBodySchema = z.object({
  role: z.string().min(1), company: z.string().min(1),
  companyNote: z.string().optional(), period: z.string().min(1),
  location: z.string().optional(), type: z.string().optional(),
  bullets: z.array(z.string()).optional().default([]),
  sortOrder: z.number().optional().default(0),
});

router.get("/admin/experiences", isAdmin, async (req, res) => {
  try {
    const rows = await db.select().from(experiencesTable).orderBy(asc(experiencesTable.sortOrder));
    res.json(rows);
  } catch (err) { res.status(500).json({ error: "Failed" }); }
});

router.post("/admin/experiences", isAdmin, async (req, res) => {
  const parsed = expBodySchema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: "Invalid body" }); return; }
  try {
    const [row] = await db.insert(experiencesTable).values(insertExperienceSchema.parse(parsed.data)).returning();
    res.json(row);
  } catch (err) { res.status(500).json({ error: "Failed" }); }
});

router.patch("/admin/experiences/:id", isAdmin, async (req, res) => {
  const parsed = expBodySchema.partial().safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: "Invalid body" }); return; }
  try {
    const [row] = await db.update(experiencesTable).set(parsed.data).where(eq(experiencesTable.id, parseInt(req.params.id))).returning();
    res.json(row);
  } catch (err) { res.status(500).json({ error: "Failed" }); }
});

router.delete("/admin/experiences/:id", isAdmin, async (req, res) => {
  try {
    await db.delete(experiencesTable).where(eq(experiencesTable.id, parseInt(req.params.id)));
    res.json({ ok: true });
  } catch (err) { res.status(500).json({ error: "Failed" }); }
});

// ── Projects ──────────────────────────────────────────────────────────────
const projBodySchema = z.object({
  title: z.string().min(1), type: z.string().optional(), blurb: z.string().optional(),
  tags: z.array(z.string()).optional().default([]),
  accent: z.string().optional().default("orange"),
  link: z.string().optional(), sortOrder: z.number().optional().default(0),
});

router.get("/admin/projects", isAdmin, async (req, res) => {
  try {
    const rows = await db.select().from(projectsTable).orderBy(asc(projectsTable.sortOrder));
    res.json(rows);
  } catch (err) { res.status(500).json({ error: "Failed" }); }
});

router.post("/admin/projects", isAdmin, async (req, res) => {
  const parsed = projBodySchema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: "Invalid body" }); return; }
  try {
    const { sortOrder } = parsed.data;
    // Shift existing projects forward if needed
    if (sortOrder !== undefined) {
      await db.update(projectsTable)
        .set({ sortOrder: sql`${projectsTable.sortOrder} + 1` })
        .where(gte(projectsTable.sortOrder, sortOrder));
    }
    const [row] = await db.insert(projectsTable).values(insertProjectSchema.parse(parsed.data)).returning();
    res.json(row);
  } catch (err) { req.log.error({ err }); res.status(500).json({ error: "Failed" }); }
});

router.patch("/admin/projects/:id", isAdmin, async (req, res) => {
  const parsed = projBodySchema.partial().safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: "Invalid body" }); return; }
  try {
    const id = parseInt(req.params.id);
    const { sortOrder } = parsed.data;

    if (sortOrder !== undefined) {
      const [current] = await db.select().from(projectsTable).where(eq(projectsTable.id, id)).limit(1);
      if (current && current.sortOrder !== sortOrder) {
        if (sortOrder < current.sortOrder!) {
          // Moving up: shift projects between new and old position down
          await db.update(projectsTable)
            .set({ sortOrder: sql`${projectsTable.sortOrder} + 1` })
            .where(sql`${projectsTable.sortOrder} >= ${sortOrder} AND ${projectsTable.sortOrder} < ${current.sortOrder}`);
        } else {
          // Moving down: shift projects between old and new position up
          await db.update(projectsTable)
            .set({ sortOrder: sql`${projectsTable.sortOrder} - 1` })
            .where(sql`${projectsTable.sortOrder} > ${current.sortOrder} AND ${projectsTable.sortOrder} <= ${sortOrder}`);
        }
      }
    }

    const [row] = await db.update(projectsTable).set(parsed.data).where(eq(projectsTable.id, id)).returning();
    res.json(row);
  } catch (err) { req.log.error({ err }); res.status(500).json({ error: "Failed" }); }
});

router.delete("/admin/projects/:id", isAdmin, async (req, res) => {
  try {
    await db.delete(projectsTable).where(eq(projectsTable.id, parseInt(req.params.id)));
    res.json({ ok: true });
  } catch (err) { res.status(500).json({ error: "Failed" }); }
});

// ── Achievements ──────────────────────────────────────────────────────────
const achBodySchema = z.object({
  title: z.string().min(1), tag: z.string().optional(),
  blurb: z.string().optional(), icon: z.string().optional().default("trophy"),
  sortOrder: z.number().optional().default(0),
});

router.get("/admin/achievements", isAdmin, async (req, res) => {
  try {
    const rows = await db.select().from(achievementsTable).orderBy(asc(achievementsTable.sortOrder));
    res.json(rows);
  } catch (err) { res.status(500).json({ error: "Failed" }); }
});

router.post("/admin/achievements", isAdmin, async (req, res) => {
  const parsed = achBodySchema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: "Invalid body" }); return; }
  try {
    const [row] = await db.insert(achievementsTable).values(insertAchievementSchema.parse(parsed.data)).returning();
    res.json(row);
  } catch (err) { res.status(500).json({ error: "Failed" }); }
});

router.patch("/admin/achievements/:id", isAdmin, async (req, res) => {
  const parsed = achBodySchema.partial().safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: "Invalid body" }); return; }
  try {
    const [row] = await db.update(achievementsTable).set(parsed.data).where(eq(achievementsTable.id, parseInt(req.params.id))).returning();
    res.json(row);
  } catch (err) { res.status(500).json({ error: "Failed" }); }
});

router.delete("/admin/achievements/:id", isAdmin, async (req, res) => {
  try {
    await db.delete(achievementsTable).where(eq(achievementsTable.id, parseInt(req.params.id)));
    res.json({ ok: true });
  } catch (err) { res.status(500).json({ error: "Failed" }); }
});

// ── Storage ───────────────────────────────────────────────────────────────
router.post("/admin/storage/request-url", isAdmin, async (req, res) => {
  try {
    const uploadURL = await storage.getObjectEntityUploadURL();
    const objectPath = storage.normalizeObjectEntityPath(uploadURL);
    res.json({ uploadURL, objectPath });
  } catch (err) { req.log.error({ err }); res.status(500).json({ error: "Failed to generate upload URL" }); }
});

export default router;
