import { motion } from "framer-motion";

interface Props {
  number: string;
  kicker: string;
  title: string;
  subtitle?: string;
  invert?: boolean;
}

export default function SectionHeader({ number, kicker, title, subtitle, invert = false }: Props) {
  return (
    <div
      className={`grid grid-cols-12 gap-4 sm:gap-6 items-end border-b ${
        invert ? "border-cream/20" : "border-ink"
      } pb-6 mb-10`}
      data-testid={`header-${kicker.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <div className="col-span-3 sm:col-span-2">
        <span className={`font-display text-5xl sm:text-7xl ${invert ? "text-orange" : "text-orange"}`}>
          {number}
        </span>
      </div>
      <div className="col-span-9 sm:col-span-7">
        <div className={`font-mono text-[10px] uppercase tracking-[0.4em] ${invert ? "text-cream/60" : "text-ink/60"} mb-2`}>
          §{number} — {kicker}
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={`font-display uppercase leading-[0.85] text-5xl sm:text-7xl lg:text-8xl ${invert ? "text-cream" : "text-ink"}`}
        >
          {title}
        </motion.h2>
      </div>
      {subtitle && (
        <div className="hidden sm:block sm:col-span-3">
          <p className={`font-serif italic text-base ${invert ? "text-cream/70" : "text-ink/70"}`}>
            {subtitle}
          </p>
        </div>
      )}
    </div>
  );
}
