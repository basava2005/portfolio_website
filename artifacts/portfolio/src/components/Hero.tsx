import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { ArrowDownRight, Mail } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-32 pb-24 px-6 sm:px-10"
      data-testid="section-hero"
    >
      <div className="mx-auto max-w-7xl w-full grid lg:grid-cols-12 gap-10 items-end">
        <div className="lg:col-span-9">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.02] px-4 py-1.5 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#7cffd4] opacity-75 pulse-dot" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#7cffd4]" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/70">
              Available for Opportunities
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8 font-mono text-[11px] uppercase tracking-[0.4em] text-white/40"
          >
            Portfolio · Vol. 01 · 2026
          </motion.div>

          <h1
            className="mt-3 font-display leading-[0.85] tracking-tight"
            data-testid="text-hero-name"
          >
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="block text-white text-[18vw] sm:text-[14vw] lg:text-[11.5rem]"
            >
              BASAVARAJ
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="block text-gradient-brand text-[18vw] sm:text-[14vw] lg:text-[11.5rem]"
            >
              H A
            </motion.span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mt-8 flex flex-col gap-2"
          >
            <p className="font-sans text-xl sm:text-2xl text-white/80" data-testid="text-hero-subtitle">
              Full Stack Developer<span className="text-[#7cffd4]"> & </span>AI Enthusiast
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/40">
              Karnataka, India · ISE @ GM Institute of Technology
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="mt-6 max-w-2xl text-white/60 leading-relaxed text-base sm:text-lg"
            data-testid="text-hero-bio"
          >
            I build production-grade web platforms and AI-powered tools — from
            AUTOSAR rule visualizers and embedded simulation suites at Luxoft to
            LLM-driven legal platforms and face-recognition systems. Quietly
            obsessed with shipping things that actually work.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              to="projects"
              smooth
              duration={800}
              offset={-40}
              className="group inline-flex items-center gap-3 rounded-full bg-[#7cffd4] px-6 py-3 font-mono text-[11px] uppercase tracking-[0.3em] text-[#050508] hover:bg-white transition-all glow-mint cursor-pointer"
              data-testid="button-view-work"
            >
              View Work
              <ArrowDownRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </Link>
            <Link
              to="contact"
              smooth
              duration={800}
              offset={-40}
              className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.02] px-6 py-3 font-mono text-[11px] uppercase tracking-[0.3em] text-white/80 hover:border-[#7cffd4]/60 hover:text-[#7cffd4] transition-all cursor-pointer"
              data-testid="button-get-in-touch"
            >
              <Mail size={14} />
              Get In Touch
            </Link>
          </motion.div>
        </div>

        <div className="lg:col-span-3 hidden lg:flex flex-col items-end gap-6 pb-6">
          <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/30 text-right">
            <div>(00) Index</div>
            <div className="mt-1 text-white/60">01 — Hero</div>
            <div className="text-white/30">02 — About</div>
            <div className="text-white/30">03 — Experience</div>
            <div className="text-white/30">04 — Projects</div>
            <div className="text-white/30">05 — Contact</div>
          </div>
        </div>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 bottom-6 flex flex-col items-center gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/40">scroll</span>
        <div className="relative h-14 w-[2px] overflow-hidden">
          <div className="absolute inset-0 bg-white/10" />
          <div className="absolute inset-x-0 h-1/2 bg-[#7cffd4] scroll-line-anim" />
        </div>
      </div>
    </section>
  );
}
