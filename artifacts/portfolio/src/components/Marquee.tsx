import { useState } from "react";
import { motion } from "framer-motion";

const items = [
  "Full Stack Developer", "AI Enthusiast", "AUTOSAR Engineer",
  "LLM Integrations", "Open to Work", "Karnataka, India",
  "Available 2026", "React · Node · Python",
];

export default function Marquee() {
  const [paused, setPaused] = useState(false);
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <section
      className="relative bg-ink text-cream border-y border-ink overflow-hidden cursor-pointer"
      data-testid="marquee-root"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="py-5 overflow-hidden">
        <motion.div
          className="flex items-center gap-12 whitespace-nowrap"
          animate={paused ? {} : { x: ["0%", "-50%"] }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        >
          {repeated.map((it, i) => (
            <span
              key={i}
              className="flex items-center gap-12 font-display text-3xl sm:text-5xl uppercase"
            >
              {it}
              <span className="text-orange">★</span>
            </span>
          ))}
        </motion.div>
      </div>

      {paused && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="bg-orange text-ink font-mono text-[11px] uppercase tracking-[0.4em] px-5 py-2">
            ⏸ Paused
          </div>
        </motion.div>
      )}
    </section>
  );
}
