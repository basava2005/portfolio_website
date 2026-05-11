import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

const bullets = [
  "Building and integrating production web applications using modern stacks (React, Node, Python).",
  "Working on AUTOSAR-based automotive software tooling and embedded workflows.",
  "Designing internal LLM-powered utilities to accelerate engineer productivity.",
  "Collaborating with senior engineers across geographies on architecture and code review.",
  "Owning small features end-to-end — from spec to deploy to follow-up support.",
];

const bulletVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};
const bulletItem = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as any } },
};

export default function Experience() {
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12">
          {/* Sticky meta aside */}
          <motion.aside
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3 border-l-4 border-orange pl-4 lg:sticky lg:top-20 lg:self-start"
          >
            {[
              { label: "Period", value: "2024 — Now" },
              { label: "Location", value: "Remote · India" },
              { label: "Type", value: "Internship" },
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
                  {i === 0 ? (
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
            data-testid="experience-card-luxoft"
          >
            <header className="bg-ink text-cream px-6 py-4 flex items-center justify-between flex-wrap gap-3">
              <div>
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
                <h3 className="font-display text-3xl sm:text-4xl uppercase">
                  Software Engineering Intern
                </h3>
              </div>
              <div className="text-right">
                <div className="font-display text-2xl sm:text-3xl uppercase text-orange">Luxoft</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream/70 mt-1">A DXC Technology Co.</div>
              </div>
            </header>

            <div className="px-6 py-6 sm:px-8 sm:py-8">
              <p className="font-serif text-xl leading-relaxed text-ink/85 mb-6">
                <span className="font-display text-5xl float-left leading-[0.8] mr-3 mt-1 text-orange">W</span>
                orking across full-stack web, automotive software, and AI tooling
                — translating real engineering problems into shipped, maintainable software.
              </p>

              <motion.ul
                variants={bulletVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="space-y-0 border-t border-ink/15"
              >
                {bullets.map((b, i) => (
                  <motion.li
                    key={i}
                    variants={bulletItem}
                    className="grid grid-cols-12 gap-4 border-b border-ink/15 py-4 group"
                    data-testid={`experience-bullet-${i}`}
                  >
                    <span className="col-span-2 sm:col-span-1 font-mono text-xs text-orange pt-1 group-hover:scale-110 transition-transform origin-left">
                      0{i + 1}
                    </span>
                    <span className="col-span-10 sm:col-span-11 text-ink/85 font-sans text-base sm:text-lg group-hover:text-ink transition-colors">
                      {b}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
