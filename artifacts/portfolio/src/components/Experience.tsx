import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  companyNote?: string | null;
  period: string;
  location?: string | null;
  type?: string | null;
  bullets: string[];
}

const defaultExperience: ExperienceItem[] = [];

const bulletVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};
const bulletItem = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as any } },
};

export default function Experience() {
  const [items, setItems] = useState<ExperienceItem[]>(defaultExperience);

  useEffect(() => {
    fetch("/api/portfolio/experiences")
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d) && d.length > 0) setItems(d);
      })
      .catch(() => {});
  }, []);

  return (
    <section
      id="experience"
      className="relative bg-cream lg:pl-16 xl:pl-20 py-24 sm:py-32"
      data-testid="experience-root"
    >
      <div className="px-4 sm:px-8 lg:px-12">
        <SectionHeader
          number="02"
          kicker="Field Notes"
          title={"Experience"}
          subtitle="Where the work has happened so far."
        />

        <div className="space-y-16 mt-12">
          {items.map((e, idx) => (
            <div key={e.id} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Sticky meta aside */}
              <motion.aside
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="lg:col-span-3 border-l-4 border-orange pl-4 lg:sticky lg:top-20 lg:self-start"
              >
                {[
                  { label: "Period", value: e.period },
                  { label: "Location", value: e.location || "—" },
                  { label: "Type", value: e.type || "—" },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="mt-6 first:mt-0"
                  >
                    <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60 mb-2">{item.label}</div>
                    <div className={`font-display ${i === 0 ? "text-3xl" : "text-xl"}`}>
                      {i === 0 && item.value.includes("—") ? (
                        <>{item.value.split("—")[0]}<span className="text-orange">—</span>{item.value.split("—")[1]}</>
                      ) : item.value}
                    </div>
                  </motion.div>
                ))}
              </motion.aside>

              {/* Article card */}
              <motion.article
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                className="lg:col-span-9 border border-ink bg-cream shadow-brutal-orange"
                data-testid={`experience-card-${e.id}`}
              >
                <header className="bg-ink text-cream px-6 py-4 flex items-center justify-between flex-wrap gap-3">
                  <div>
                    {idx === 0 && (
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="font-mono text-[10px] uppercase tracking-[0.3em] text-orange mb-1"
                        style={{ overflow: "hidden", whiteSpace: "nowrap" }}
                      >
                        Currently
                      </motion.div>
                    )}
                    <h3 className="font-display text-3xl sm:text-4xl uppercase">
                      {e.role}
                    </h3>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-2xl sm:text-3xl uppercase text-orange">{e.company}</div>
                    {e.companyNote && (
                      <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream/70 mt-1">{e.companyNote}</div>
                    )}
                  </div>
                </header>

                <div className="px-6 py-6 sm:px-8 sm:py-8">
                  <motion.ul
                    variants={bulletVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="space-y-4"
                  >
                    {e.bullets.map((b, i) => (
                      <motion.li
                        key={i}
                        variants={bulletItem}
                        className="flex items-start gap-4 group"
                      >
                        <span className="mt-2 h-1.5 w-1.5 bg-orange flex-shrink-0 group-hover:scale-150 transition-transform" />
                        <span className="font-serif text-lg leading-relaxed text-ink/85">{b}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              </motion.article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
