import { motion } from "framer-motion";

interface Props {
  number: string;
  kicker: string;
  title: string;
  subtitle?: string;
  invert?: boolean;
}

const titleVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

const letterVariants = {
  hidden: { y: "110%", opacity: 0 },
  visible: { y: "0%", opacity: 1, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as any } },
};

export default function SectionHeader({ number, kicker, title, subtitle, invert = false }: Props) {
  const lines = title.split("\n");

  return (
    <div
      className={`border-b ${invert ? "border-cream/20" : "border-ink"} pb-6 mb-10`}
      data-testid={`header-${kicker.toLowerCase().replace(/\s+/g, "-")}`}
    >
      {/* Top row: number · kicker · subtitle */}
      <div className="flex items-center justify-between gap-4 mb-3">
        <div className="flex items-center gap-5">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display text-3xl sm:text-4xl text-orange leading-none"
          >
            {number}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`font-mono text-[10px] uppercase tracking-[0.4em] ${invert ? "text-cream/60" : "text-ink/60"}`}
          >
            §{number} — {kicker}
          </motion.span>
        </div>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className={`hidden sm:block font-serif italic text-base text-right max-w-[220px] ${invert ? "text-cream/70" : "text-ink/70"}`}
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      {/* Full-width title */}
      <div className={`font-display uppercase leading-[0.9] text-5xl sm:text-7xl lg:text-8xl ${invert ? "text-cream" : "text-ink"}`}>
        {lines.map((line, li) => (
          <div key={li} className="overflow-hidden pb-[0.1em]">
            <motion.div
              variants={titleVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="flex flex-wrap"
            >
              {line.split("").map((ch, ci) => (
                <motion.span
                  key={ci}
                  variants={letterVariants}
                  style={{ display: ch === " " ? "inline" : "inline-block" }}
                >
                  {ch === " " ? "\u00A0" : ch}
                </motion.span>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
