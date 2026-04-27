import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

const skills = [
  "JavaScript", "TypeScript", "React", "Next.js", "Node.js",
  "Express", "Python", "FastAPI", "PostgreSQL", "MongoDB",
  "AUTOSAR", "C/C++", "Tailwind CSS", "Three.js", "LangChain",
  "OpenAI API", "Docker",
];

const facts = [
  { k: "Role", v: "Full Stack Dev / AI" },
  { k: "Now", v: "Intern @ Luxoft" },
  { k: "Base", v: "Karnataka, India" },
  { k: "Stack", v: "TS · React · Python" },
  { k: "Status", v: "Open to Offers" },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative bg-cream lg:pl-16 xl:pl-20 py-24 sm:py-32 paper-grain"
      data-testid="about-root"
    >
      <div className="px-4 sm:px-8 lg:px-12">
        <SectionHeader
          number="01"
          kicker="The Author"
          title={"About\nthe maker"}
          subtitle="A short profile of the developer behind the byline."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 space-y-6 font-serif text-xl sm:text-2xl leading-relaxed text-ink/85"
          >
            <p data-testid="text-about-bio-1">
              I'm a developer who likes the friction of real systems —
              shipping software that runs in production, talks to APIs, and
              survives Monday morning. My day-to-day swings between{" "}
              <span className="underline-orange">React frontends</span>, Node
              and Python services, and the more particular world of{" "}
              <span className="underline-orange">AUTOSAR tooling</span>.
            </p>
            <p data-testid="text-about-bio-2">
              Lately I've been building with LLMs — assistants, retrieval
              pipelines, and small interfaces that make models feel less like
              a chatbot and more like a coworker. I care about typography,
              keyboard ergonomics, and the difference between a thing that
              works and a thing you actually want to use.
            </p>
            <p className="font-sans text-base text-ink/60 not-italic">
              Currently interning at Luxoft, sharpening on automotive software,
              and open to full-time roles where I can pair frontend craft with
              backend depth.
            </p>
          </motion.div>

          {/* Facts table */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <div className="border border-ink bg-cream shadow-brutal">
              <div className="bg-ink text-cream px-4 py-2 font-mono text-[10px] uppercase tracking-[0.3em] flex items-center justify-between">
                <span>Fact Sheet</span>
                <span>v.2026</span>
              </div>
              <dl className="divide-y divide-ink/15">
                {facts.map((f) => (
                  <div
                    key={f.k}
                    className="flex items-baseline justify-between px-4 py-3"
                    data-testid={`fact-${f.k.toLowerCase()}`}
                  >
                    <dt className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink/60">
                      {f.k}
                    </dt>
                    <dd className="font-display text-lg uppercase">{f.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </motion.div>
        </div>

        {/* Skills grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mt-20"
        >
          <div className="flex items-baseline justify-between border-b border-ink pb-3 mb-6">
            <h3 className="font-display text-2xl uppercase">Toolbox</h3>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60">
              {skills.length} entries · sorted by use
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-0 border-l border-t border-ink">
            {skills.map((s, i) => (
              <div
                key={s}
                className="border-r border-b border-ink px-4 py-4 hover:bg-ink hover:text-orange transition-colors group"
                data-testid={`skill-${s.toLowerCase().replace(/[/.\s]/g, "-")}`}
              >
                <div className="font-mono text-[10px] text-ink/40 group-hover:text-cream/60">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="font-display text-xl uppercase mt-1">{s}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
