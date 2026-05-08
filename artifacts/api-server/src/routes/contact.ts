import { Router } from "express";
import { db } from "@workspace/db";
import { contactsTable, insertContactSchema } from "@workspace/db/schema";
import { z } from "zod";
import nodemailer from "nodemailer";

const router = Router();

const bodySchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string().optional(),
  message: z.string().min(1),
});

async function sendEmail(data: { name: string; email: string; subject?: string; message: string }) {
  const { GMAIL_USER, GMAIL_APP_PASSWORD } = process.env;
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) return;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
  });

  await transporter.sendMail({
    from: `"Portfolio Contact" <${GMAIL_USER}>`,
    to: GMAIL_USER,
    replyTo: data.email,
    subject: `[Portfolio] ${data.subject || "New message"} — from ${data.name}`,
    text: `Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`,
    html: `
      <div style="font-family:monospace;max-width:600px;margin:0 auto;padding:24px;border:2px solid #0d0d0d">
        <div style="background:#0d0d0d;color:#ede5d5;padding:12px 16px;font-size:10px;letter-spacing:0.3em;text-transform:uppercase">
          Portfolio Contact Form · ${new Date().toLocaleDateString()}
        </div>
        <table style="width:100%;border-collapse:collapse;margin-top:16px">
          <tr><td style="padding:8px;font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:#666;border-bottom:1px solid #eee">Name</td><td style="padding:8px;font-size:14px;border-bottom:1px solid #eee">${data.name}</td></tr>
          <tr><td style="padding:8px;font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:#666;border-bottom:1px solid #eee">Email</td><td style="padding:8px;font-size:14px;border-bottom:1px solid #eee"><a href="mailto:${data.email}">${data.email}</a></td></tr>
          <tr><td style="padding:8px;font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:#666;border-bottom:1px solid #eee">Subject</td><td style="padding:8px;font-size:14px;border-bottom:1px solid #eee">${data.subject || "—"}</td></tr>
        </table>
        <div style="margin-top:16px;padding:16px;background:#f8f5f0;border-left:4px solid #ff5722">
          <div style="font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:#666;margin-bottom:8px">Message</div>
          <p style="margin:0;font-size:16px;line-height:1.6">${data.message.replace(/\n/g, "<br>")}</p>
        </div>
      </div>
    `,
  });
}

router.post("/contact", async (req, res) => {
  const parsed = bodySchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }

  const { name, email, subject, message } = parsed.data;

  try {
    const [row] = await db
      .insert(contactsTable)
      .values(insertContactSchema.parse({ name, email, subject, message }))
      .returning();

    try {
      await sendEmail({ name, email, subject, message });
    } catch (emailErr) {
      req.log.warn({ err: emailErr }, "Email send failed but form saved");
    }

    res.json({ ok: true, id: row.id });
  } catch (err) {
    req.log.error({ err }, "Failed to save contact submission");
    res.status(500).json({ error: "Failed to save message" });
  }
});

export default router;
