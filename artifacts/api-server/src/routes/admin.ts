import { Router } from "express";
import { db } from "@workspace/db";
import { certificatesTable, contactsTable, insertCertificateSchema } from "@workspace/db/schema";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";
import { ObjectStorageService } from "../lib/objectStorage.js";

const router = Router();

const storage = new ObjectStorageService();

function isAdmin(req: any, res: any, next: any) {
  if ((req.session as any)?.adminAuthed) return next();
  res.status(401).json({ error: "Unauthorized" });
}

router.post("/admin/login", (req, res) => {
  const { password } = req.body ?? {};
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    res.status(503).json({ error: "Admin not configured" });
    return;
  }
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

router.get("/admin/contacts", isAdmin, async (req, res) => {
  try {
    const rows = await db
      .select()
      .from(contactsTable)
      .orderBy(desc(contactsTable.createdAt));
    res.json(rows);
  } catch (err) {
    req.log.error({ err }, "Failed to list contacts");
    res.status(500).json({ error: "Failed to list contacts" });
  }
});

router.patch("/admin/contacts/:id/read", isAdmin, async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await db.update(contactsTable).set({ read: true }).where(eq(contactsTable.id, id));
    res.json({ ok: true });
  } catch (err) {
    req.log.error({ err }, "Failed to mark contact read");
    res.status(500).json({ error: "Failed to update" });
  }
});

const certBodySchema = z.object({
  name: z.string().min(1),
  issuer: z.string().min(1),
  description: z.string().optional(),
  year: z.string().optional(),
  fileUrl: z.string().optional(),
  fileType: z.string().optional(),
});

router.get("/admin/certificates", isAdmin, async (req, res) => {
  try {
    const rows = await db
      .select()
      .from(certificatesTable)
      .orderBy(desc(certificatesTable.createdAt));
    res.json(rows);
  } catch (err) {
    req.log.error({ err }, "Failed to list certs");
    res.status(500).json({ error: "Failed to list certificates" });
  }
});

router.post("/admin/certificates", isAdmin, async (req, res) => {
  const parsed = certBodySchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid body" });
    return;
  }
  try {
    const [row] = await db
      .insert(certificatesTable)
      .values(insertCertificateSchema.parse(parsed.data))
      .returning();
    res.json(row);
  } catch (err) {
    req.log.error({ err }, "Failed to create cert");
    res.status(500).json({ error: "Failed to create certificate" });
  }
});

router.patch("/admin/certificates/:id", isAdmin, async (req, res) => {
  const id = parseInt(req.params.id);
  const parsed = certBodySchema.partial().safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid body" });
    return;
  }
  try {
    const [row] = await db
      .update(certificatesTable)
      .set(parsed.data)
      .where(eq(certificatesTable.id, id))
      .returning();
    res.json(row);
  } catch (err) {
    req.log.error({ err }, "Failed to update cert");
    res.status(500).json({ error: "Failed to update certificate" });
  }
});

router.delete("/admin/certificates/:id", isAdmin, async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await db.delete(certificatesTable).where(eq(certificatesTable.id, id));
    res.json({ ok: true });
  } catch (err) {
    req.log.error({ err }, "Failed to delete cert");
    res.status(500).json({ error: "Failed to delete certificate" });
  }
});

router.post("/admin/storage/request-url", isAdmin, async (req, res) => {
  try {
    const uploadURL = await storage.getObjectEntityUploadURL();
    const objectPath = storage.normalizeObjectEntityPath(uploadURL);
    res.json({ uploadURL, objectPath });
  } catch (err) {
    req.log.error({ err }, "Failed to get upload URL");
    res.status(500).json({ error: "Failed to generate upload URL" });
  }
});

export default router;
