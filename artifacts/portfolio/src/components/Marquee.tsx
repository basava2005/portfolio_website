import { useRef, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";

const items = [
  "Full Stack Developer", "AI Enthusiast", "AUTOSAR Engineer",
  "LLM Integrations", "Open to Work", "Karnataka, India",
  "Available 2026", "React · Node · Python",
];

function Track({ reverse = false, speed = 30 }: { reverse?: boolean; speed?: number }) {
  const repeated = [...items, ...items, ...items, ...items];
  return (
    <div className="flex overflow-hidden">
      <motion.div
        className="flex items-center gap-12 whitespace-nowrap"
        animate={{ x: reverse ? ["0%", "50%"] : ["0%", "-50%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {repeated.map((it, i) => (
          <span
            key={i}
            className={`flex items-center gap-12 font-display text-3xl sm:text-5xl uppercase ${reverse ? "text-orange" : "text-cream"}`}
          >
            {it}
            <span className={reverse ? "text-cream" : "text-orange"}>★</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function Marquee() {
  const [paused, setPaused] = useState(false);

  return (
    <section
      className="relative bg-ink text-cream border-y border-ink overflow-hidden py-0 cursor-pointer"
      data-testid="marquee-root"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div animate={{ opacity: paused ? 0.4 : 1 }} transition={{ duration: 0.3 }}>
        <div className="py-4 border-b border-cream/10">
          <motion.div
            animate={paused ? { x: 0 } : {}}
            style={{ pointerEvents: "none" }}
          >
            <Track reverse={false} speed={32} />
          </motion.div>
        </div>
        <div className="py-4">
          <Track reverse={true} speed={40} />
        </div>
      </motion.div>

      {/* Pause label */}
      {paused && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
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
