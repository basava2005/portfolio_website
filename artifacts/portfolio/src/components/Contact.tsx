import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, Github, ArrowUpRight } from "lucide-react";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative bg-orange text-ink lg:pl-16 xl:pl-20 py-24 sm:py-32 overflow-hidden"
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
              Get in touch
            </h2>
          </div>
          <div className="hidden sm:block sm:col-span-3 font-serif italic text-base">
            Reply guaranteed within a working day.
          </div>
        </div>

        <motion.a
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          href="mailto:basavarajha05@gmail.com"
          className="block group"
          data-testid="link-contact-email"
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/70 mb-3 flex items-center gap-2">
            <Mail size={12} /> Drop a line
          </div>
          <div className="font-display text-[12vw] sm:text-[10vw] lg:text-[8rem] xl:text-[10rem] uppercase leading-[0.85] tracking-tight break-words">
            basavarajha05
            <wbr />
            <span className="text-ink/30">@</span>gmail<span className="text-ink/30">.</span>com
            <span className="inline-block ml-3 align-middle group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform">
              ↗
            </span>
          </div>
        </motion.a>

        {/* Three card row: phone / linkedin / github */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-0 mt-16 border border-ink"
        >
          <a
            href="tel:+919353198281"
            className="border-b md:border-b-0 md:border-r border-ink p-6 sm:p-8 bg-cream hover:bg-ink hover:text-cream transition-colors group"
            data-testid="link-contact-phone"
          >
            <div className="flex items-center justify-between mb-6">
              <Phone size={20} />
              <ArrowUpRight size={18} className="opacity-50 group-hover:opacity-100 group-hover:rotate-45 transition-all" />
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] mb-2 opacity-70">
              Phone
            </div>
            <div className="font-display text-2xl sm:text-3xl uppercase">
              +91 93531 98281
            </div>
          </a>

          <a
            href="https://www.linkedin.com/in/basavaraj-h-a"
            target="_blank"
            rel="noreferrer"
            className="border-b md:border-b-0 md:border-r border-ink p-6 sm:p-8 bg-cream hover:bg-ink hover:text-cream transition-colors group"
            data-testid="link-contact-linkedin"
          >
            <div className="flex items-center justify-between mb-6">
              <Linkedin size={20} />
              <ArrowUpRight size={18} className="opacity-50 group-hover:opacity-100 group-hover:rotate-45 transition-all" />
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] mb-2 opacity-70">
              LinkedIn
            </div>
            <div className="font-display text-2xl sm:text-3xl uppercase">
              /in/basavaraj-h-a
            </div>
          </a>

          <a
            href="https://github.com/basavarajha05"
            target="_blank"
            rel="noreferrer"
            className="p-6 sm:p-8 bg-cream hover:bg-ink hover:text-cream transition-colors group"
            data-testid="link-contact-github"
          >
            <div className="flex items-center justify-between mb-6">
              <Github size={20} />
              <ArrowUpRight size={18} className="opacity-50 group-hover:opacity-100 group-hover:rotate-45 transition-all" />
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] mb-2 opacity-70">
              GitHub
            </div>
            <div className="font-display text-2xl sm:text-3xl uppercase">
              /basavarajha05
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
