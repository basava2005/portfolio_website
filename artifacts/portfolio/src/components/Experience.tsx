import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

const bullets = [
  "Building and integrating production web applications using modern stacks (React, Node, Python).",
  "Working on AUTOSAR-based automotive software tooling and embedded workflows.",
  "Designing internal LLM-powered utilities to accelerate engineer productivity.",
  "Collaborating with senior engineers across geographies on architecture and code review.",
  "Owning small features end-to-end — from spec to deploy to follow-up support.",
];

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
          {/* Left margin column with date + meta — like a magazine */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3 border-l-4 border-orange pl-4 lg:sticky lg:top-20 lg:self-start"
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60 mb-2">
              Period
            </div>
            <div className="font-display text-3xl">
              2024 <span className="text-orange">—</span> Now
            </div>
            <div className="mt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60 mb-2">
              Location
            </div>
            <div className="font-display text-xl">Remote · India</div>
            <div className="mt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60 mb-2">
              Type
            </div>
            <div className="font-display text-xl">Internship</div>
          </motion.aside>

          {/* Article body */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-9 border border-ink bg-cream shadow-brutal-orange"
            data-testid="experience-card-luxoft"
          >
            <header className="bg-ink text-cream px-6 py-4 flex items-center justify-between flex-wrap gap-3">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-orange mb-1">
                  Currently
                </div>
                <h3 className="font-display text-3xl sm:text-4xl uppercase">
                  Software Engineering Intern
                </h3>
              </div>
              <div className="text-right">
                <div className="font-display text-2xl sm:text-3xl uppercase text-orange">
                  Luxoft
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream/70 mt-1">
                  A DXC Technology Co.
                </div>
              </div>
            </header>

            <div className="px-6 py-6 sm:px-8 sm:py-8">
              <p className="font-serif text-xl leading-relaxed text-ink/85 mb-6">
                <span className="font-display text-5xl float-left leading-[0.8] mr-3 mt-1 text-orange">
                  W
                </span>
                orking across full-stack web, automotive software, and AI tooling
                — translating real engineering problems into shipped, maintainable
                software.
              </p>

              <ul className="space-y-0 border-t border-ink/15">
                {bullets.map((b, i) => (
                  <li
                    key={i}
                    className="grid grid-cols-12 gap-4 border-b border-ink/15 py-4"
                    data-testid={`experience-bullet-${i}`}
                  >
                    <span className="col-span-2 sm:col-span-1 font-mono text-xs text-orange pt-1">
                      0{i + 1}
                    </span>
                    <span className="col-span-10 sm:col-span-11 text-ink/85 font-sans text-base sm:text-lg">
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
