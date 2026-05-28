import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Phone, Linkedin, Github, ArrowUpRight, Send, Check } from "lucide-react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [links, setLinks] = useState({ linkedin: "", github: "" });

  useEffect(() => {
    fetch("/api/portfolio/settings/hero")
      .then((r) => r.json())
      .then((d) => {
        if (d) setLinks({ linkedin: d.linkedin || "", github: d.github || "" });
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });
      if (res.ok) {
        setStatus("sent");
        setName(""); setEmail(""); setSubject(""); setMessage("");
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section
      id="contact"
      className="relative bg-orange text-ink lg:pl-14 py-24 sm:py-32 overflow-hidden"
      data-testid="contact-root"
    >
      <div className="absolute inset-0 grid-lines opacity-40 pointer-events-none" />
      <div className="relative px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-12 gap-4 items-end border-b border-ink pb-6 mb-12">
          <div className="col-span-3 sm:col-span-2">
            <span className="font-display text-5xl sm:text-7xl">06</span>
          </div>
          <div className="col-span-9 sm:col-span-7">
            <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-ink/70 mb-2">
              §06 — Last Page
            </div>
            <h2 className="font-display text-5xl sm:text-7xl lg:text-8xl uppercase leading-[0.85]">
              Contact me
            </h2>
          </div>
          <div className="hidden sm:block sm:col-span-3 font-serif italic text-base">
            Tell me about your project — I usually reply within a working day.
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-ink bg-cream shadow-brutal">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-8 p-6 sm:p-10 border-b lg:border-b-0 lg:border-r border-ink"
            data-testid="contact-form"
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60 mb-8 flex items-center justify-between">
              <span>Form / 01 · Direct Message</span>
              <span>* Required</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border-t border-ink">
              <label className="block border-b border-r-0 sm:border-r border-ink p-4">
                <span className="block font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60 mb-2">Your name *</span>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                  className="w-full bg-transparent border-0 outline-none font-display text-2xl uppercase placeholder:text-ink/25"
                  data-testid="input-contact-name"
                />
              </label>
              <label className="block border-b border-ink p-4">
                <span className="block font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60 mb-2">Your email *</span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@example.com"
                  className="w-full bg-transparent border-0 outline-none font-display text-2xl uppercase placeholder:text-ink/25"
                  data-testid="input-contact-email"
                />
              </label>
              <label className="block border-b border-ink p-4 sm:col-span-2">
                <span className="block font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60 mb-2">Subject</span>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="A project, a role, an idea…"
                  className="w-full bg-transparent border-0 outline-none font-display text-2xl uppercase placeholder:text-ink/25"
                  data-testid="input-contact-subject"
                />
              </label>
              <label className="block p-4 sm:col-span-2">
                <span className="block font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60 mb-2">Your message *</span>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me what you're building or what role you're hiring for…"
                  className="w-full bg-transparent border-0 outline-none font-serif text-xl leading-relaxed placeholder:text-ink/25 resize-none"
                  data-testid="input-contact-message"
                />
              </label>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:justify-between">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60">
                {status === "sent" && "Message sent! I'll be in touch."}
                {status === "error" && "Something went wrong — try again."}
                {status === "sending" && "Sending…"}
                {status === "idle" && "By sending you agree to a friendly reply."}
              </p>
              <button
                type="submit"
                disabled={status === "sending" || status === "sent"}
                className="group inline-flex items-center justify-between bg-ink text-cream px-6 py-4 font-mono text-xs uppercase tracking-[0.3em] hover-lift hover-lift-orange shadow-brutal-orange disabled:opacity-60 disabled:cursor-not-allowed"
                data-testid="button-contact-send"
              >
                <span className="flex items-center gap-3">
                  {status === "sent" ? <><Check size={16} /> Sent</> : <><Send size={16} /> Send Message</>}
                </span>
                <ArrowUpRight size={16} className="ml-3 group-hover:rotate-45 transition-transform" />
              </button>
            </div>
          </motion.form>

          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-4 bg-ink text-cream p-6 sm:p-10 flex flex-col"
            data-testid="contact-side"
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-orange mb-6">
              Or find me on
            </div>
            <div className="flex-1 space-y-0 border-t border-cream/15">
              <a href="tel:+919353198281" className="group flex items-center justify-between py-5 border-b border-cream/15 hover:text-orange transition-colors" data-testid="link-contact-phone">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream/60 mb-1">Phone</div>
                  <div className="font-display text-xl uppercase">+91 93531 98281</div>
                </div>
                <Phone size={18} className="text-cream/60 group-hover:text-orange" />
              </a>
              <a href={links.linkedin || "https://www.linkedin.com/in/basavaraj-h-a"} target="_blank" rel="noreferrer" className="group flex items-center justify-between py-5 border-b border-cream/15 hover:text-orange transition-colors" data-testid="link-contact-linkedin">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream/60 mb-1">LinkedIn</div>
                  <div className="font-display text-xl uppercase">
                    {links.linkedin ? `/${links.linkedin.split("/in/")[1]?.replace(/\/$/, "") || "profile"}` : "/in/basavaraj-h-a"}
                  </div>
                </div>
                <Linkedin size={18} className="text-cream/60 group-hover:text-orange" />
              </a>
              <a href={links.github || "https://github.com/basavarajha05"} target="_blank" rel="noreferrer" className="group flex items-center justify-between py-5 hover:text-orange transition-colors" data-testid="link-contact-github">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream/60 mb-1">GitHub</div>
                  <div className="font-display text-xl uppercase">
                    {links.github ? `/${links.github.split("github.com/")[1]?.replace(/\/$/, "") || "profile"}` : "/basavarajha05"}
                  </div>
                </div>
                <Github size={18} className="text-cream/60 group-hover:text-orange" />
              </a>
            </div>
            <div className="mt-8 pt-6 border-t border-cream/15 font-mono text-[10px] uppercase tracking-[0.3em] text-cream/60 leading-relaxed">
              Based in Karnataka · India<br />
              Open to remote &amp; hybrid roles<br />
              <span className="text-orange">●</span> Available 2026
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
