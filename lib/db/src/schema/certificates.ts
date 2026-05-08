import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const certificatesTable = pgTable("certificates", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  issuer: text("issuer").notNull(),
  description: text("description"),
  year: text("year"),
  fileUrl: text("file_url"),
  fileType: text("file_type"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertCertificateSchema = createInsertSchema(certificatesTable).omit({ id: true, createdAt: true });
export type InsertCertificate = z.infer<typeof insertCertificateSchema>;
export type Certificate = typeof certificatesTable.$inferSelect;
