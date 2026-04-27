import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

const certs = [
  { title: "Full Stack Web Development", issuer: "Online Bootcamp", year: "2024" },
  { title: "Python for Data Science", issuer: "IBM / Coursera", year: "2023" },
  { title: "AI & Machine Learning Foundations", issuer: "Google", year: "2024" },
  { title: "AUTOSAR Fundamentals", issuer: "Industry Training", year: "2025" },
];

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="relative bg-cream lg:pl-16 xl:pl-20 py-24 sm:py-32"
      data-testid="certifications-root"
    >
      <div className="px-4 sm:px-8 lg:px-12">
        <SectionHeader
          number="05"
          kicker="Credentials"
          title={"Certifications"}
          subtitle="Receipts, in case you wanted to see them."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="border border-ink mt-12 shadow-brutal-orange"
        >
          <div className="bg-ink text-cream grid grid-cols-12 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.3em]">
            <div className="col-span-1">№</div>
            <div className="col-span-7 sm:col-span-7">Title</div>
            <div className="col-span-3 sm:col-span-3">Issuer</div>
            <div className="col-span-1 text-right">Yr</div>
          </div>
          {certs.map((c, i) => (
            <div
              key={c.title}
              className="grid grid-cols-12 px-5 py-5 border-t border-ink/15 items-baseline hover:bg-ink hover:text-cream transition-colors group"
              data-testid={`cert-${i}`}
            >
              <div className="col-span-1 font-mono text-xs text-orange">
                0{i + 1}
              </div>
              <div className="col-span-7 sm:col-span-7 font-display text-xl sm:text-2xl uppercase leading-tight">
                {c.title}
              </div>
              <div className="col-span-3 sm:col-span-3 font-sans text-sm text-ink/70 group-hover:text-cream/80">
                {c.issuer}
              </div>
              <div className="col-span-1 text-right font-mono text-xs">
                {c.year}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
