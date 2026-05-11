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
      className={`grid grid-cols-12 gap-4 sm:gap-6 items-end border-b ${
        invert ? "border-cream/20" : "border-ink"
      } pb-6 mb-10`}
      data-testid={`header-${kicker.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        className="col-span-3 sm:col-span-2"
      >
        <span className="font-display text-5xl sm:text-7xl text-orange">{number}</span>
      </motion.div>

      <div className="col-span-9 sm:col-span-7">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`font-mono text-[10px] uppercase tracking-[0.4em] ${invert ? "text-cream/60" : "text-ink/60"} mb-2`}
        >
          §{number} — {kicker}
        </motion.div>

        <div className={`font-display uppercase leading-[0.85] text-5xl sm:text-7xl lg:text-8xl ${invert ? "text-cream" : "text-ink"}`}>
          {lines.map((line, li) => (
            <div key={li} className="overflow-hidden">
              <motion.div
                variants={titleVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="flex"
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

      {subtitle && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="hidden sm:block sm:col-span-3"
        >
          <p className={`font-serif italic text-base ${invert ? "text-cream/70" : "text-ink/70"}`}>
            {subtitle}
          </p>
        </motion.div>
      )}
    </div>
  );
}
