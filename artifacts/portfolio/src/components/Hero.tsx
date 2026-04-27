import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { ArrowDown, ArrowUpRight } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen lg:pl-16 xl:pl-20 pt-9 paper-grain"
      data-testid="hero-root"
    >
      <div className="absolute inset-0 grid-lines pointer-events-none" />

      <div className="relative px-4 sm:px-8 lg:px-12 pt-10 pb-16 min-h-[calc(100vh-2.25rem)] flex flex-col">
        {/* Top meta strip */}
        <div className="flex items-center justify-between border-b border-ink pb-3 font-mono text-[10px] uppercase tracking-[0.3em]">
          <span>Issue 01 · Vol. 2026 · Edition: Personal</span>
          <span className="hidden sm:inline">A Brutalist Portfolio</span>
        </div>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-8 flex items-center gap-3"
        >
          <span className="h-2 w-2 bg-orange rounded-full blink" />
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink/70">
            Available for Opportunities · Intern @ Luxoft
          </span>
        </motion.div>

        {/* Hero name — massive editorial */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-display uppercase leading-[0.82] mt-6"
          data-testid="text-hero-name"
        >
          <span className="block text-[19vw] sm:text-[14vw] lg:text-[11rem] xl:text-[13rem]">
            Basa<span className="text-orange">v</span>araj
          </span>
          <span className="flex items-end gap-4 sm:gap-8 mt-2">
            <span className="block text-[19vw] sm:text-[14vw] lg:text-[11rem] xl:text-[13rem]">
              H A
            </span>
            <span className="hidden sm:inline-block font-serif italic text-2xl sm:text-4xl lg:text-5xl text-ink/70 pb-4 sm:pb-8 lg:pb-10">
              <span className="not-italic font-mono text-xs uppercase tracking-[0.3em] block mb-1">
                — also called
              </span>
              the developer.
            </span>
          </span>
        </motion.h1>

        {/* Bottom row: lede + actions + meta */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-end flex-1">
          {/* Big drop-cap intro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="lg:col-span-6 max-w-xl"
            data-testid="text-hero-bio"
          >
            <p className="font-serif text-2xl sm:text-3xl leading-[1.15] text-ink">
              <span className="float-left font-display text-7xl leading-[0.8] mr-3 mt-1 text-orange">
                F
              </span>
              ull Stack Developer & AI Enthusiast crafting{" "}
              <span className="underline-orange">production-grade</span>{" "}
              web apps, AUTOSAR tooling, and LLM-powered systems. Currently
              interning at Luxoft.
            </p>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="lg:col-span-3 flex flex-col gap-3"
          >
            <Link
              to="projects"
              smooth
              duration={800}
              offset={-50}
              className="group inline-flex items-center justify-between bg-ink text-cream px-5 py-4 font-mono text-xs uppercase tracking-[0.3em] cursor-pointer hover-lift hover-lift-orange shadow-brutal-orange"
              data-testid="button-view-work"
            >
              <span>See the Work</span>
              <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform" />
            </Link>
            <Link
              to="contact"
              smooth
              duration={800}
              offset={-50}
              className="group inline-flex items-center justify-between bg-cream border border-ink text-ink px-5 py-4 font-mono text-xs uppercase tracking-[0.3em] cursor-pointer hover-lift shadow-brutal"
              data-testid="button-contact"
            >
              <span>Get In Touch</span>
              <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform" />
            </Link>
          </motion.div>

          {/* Stats column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="lg:col-span-3 grid grid-cols-3 lg:grid-cols-1 gap-4 border-t lg:border-t-0 lg:border-l border-ink pt-6 lg:pt-0 lg:pl-6"
          >
            <div>
              <div className="font-display text-5xl text-orange">10+</div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60 mt-1">
                Projects shipped
              </div>
            </div>
            <div>
              <div className="font-display text-5xl">17</div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60 mt-1">
                Core skills
              </div>
            </div>
            <div>
              <div className="font-display text-5xl">∞</div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60 mt-1">
                Curiosity
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom: scroll hint + bottom rule */}
        <div className="mt-10 border-t border-ink pt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em]">
          <span className="flex items-center gap-2">
            <ArrowDown size={12} /> Scroll to read
          </span>
          <span className="hidden sm:inline">Page 01 of 06</span>
          <span>Karnataka · India</span>
        </div>
      </div>
    </section>
  );
}
