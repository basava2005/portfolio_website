import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionHeader from "./SectionHeader";

const projects = [
  {
    n: "01",
    title: "AI Resume Analyzer",
    type: "Feature",
    blurb:
      "Upload a resume, get back structured feedback, an ATS score, and rewrite suggestions. Built with Next.js, FastAPI, and an OpenAI-backed scoring pipeline.",
    tags: ["Next.js", "FastAPI", "OpenAI", "PostgreSQL"],
    accent: "orange",
  },
  {
    n: "02",
    title: "AUTOSAR Configuration Tool",
    type: "Industry",
    blurb:
      "Internal tool that parses ARXML, validates configuration against the standard, and generates compliant code stubs for embedded ECU teams.",
    tags: ["Python", "Qt", "AUTOSAR", "C"],
    accent: "navy",
  },
  {
    n: "03",
    title: "Real-Time Chat Platform",
    type: "Side Project",
    blurb:
      "End-to-end encrypted chat with rooms, presence, typing indicators, and image sharing. Powered by Socket.io and a Mongo-backed message store.",
    tags: ["React", "Node", "Socket.io", "MongoDB"],
    accent: "amber",
  },
  {
    n: "04",
    title: "LLM Knowledge Assistant",
    type: "Experiment",
    blurb:
      "RAG-based assistant that ingests PDFs and docs, then answers questions with citations. Built on LangChain with a custom retrieval ranker.",
    tags: ["LangChain", "Python", "Vector DB"],
    accent: "orange",
  },
];

const accentMap: Record<string, string> = {
  orange: "shadow-brutal-orange",
  navy: "shadow-brutal-navy",
  amber: "shadow-brutal",
};
const dotMap: Record<string, string> = {
  orange: "bg-orange",
  navy: "bg-navy",
  amber: "bg-amber",
};

export default function Projects() {
  const [feature, ...rest] = projects;
  return (
    <section
      id="projects"
      className="relative bg-ink text-cream lg:pl-16 xl:pl-20 py-24 sm:py-32"
      data-testid="projects-root"
    >
      <div className="px-4 sm:px-8 lg:px-12">
        <SectionHeader
          number="03"
          kicker="Selected Work"
          title={"Projects"}
          subtitle="A handful of things worth showing off."
          invert
        />

        {/* Feature project — full-width newspaper splash */}
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 border-y border-cream/30 py-10 mb-16"
          data-testid={`project-${feature.n}`}
        >
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-3">
              <span className={`h-2 w-2 ${dotMap[feature.accent]}`} />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-orange">
                Feature · {feature.n}
              </span>
            </div>
            <h3 className="font-display text-6xl sm:text-8xl uppercase leading-[0.9]">
              {feature.title}
            </h3>
          </div>
          <div className="lg:col-span-5 flex flex-col justify-end">
            <p className="font-serif text-xl leading-relaxed text-cream/80 mb-5">
              {feature.blurb}
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {feature.tags.map((t) => (
                <span
                  key={t}
                  className="font-mono text-[10px] uppercase tracking-[0.2em] border border-cream/40 px-2 py-1"
                >
                  {t}
                </span>
              ))}
            </div>
            <button
              className="group inline-flex items-center justify-between bg-orange text-ink px-5 py-3 font-mono text-xs uppercase tracking-[0.3em] w-full sm:w-auto self-start hover-lift"
              data-testid={`button-project-feature`}
            >
              <span>Read the case</span>
              <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform ml-3" />
            </button>
          </div>
        </motion.article>

        {/* Smaller projects in newspaper grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-l border-t border-cream/30">
          {rest.map((p, i) => (
            <motion.article
              key={p.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="border-r border-b border-cream/30 p-6 sm:p-8 group hover:bg-cream hover:text-ink transition-colors"
              data-testid={`project-${p.n}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className={`h-2 w-2 ${dotMap[p.accent]}`} />
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-orange">
                    {p.type} · {p.n}
                  </span>
                </div>
                <ArrowUpRight
                  size={18}
                  className="opacity-50 group-hover:opacity-100 group-hover:rotate-45 transition-all"
                />
              </div>
              <h3 className="font-display text-3xl sm:text-4xl uppercase leading-[0.95] mb-4">
                {p.title}
              </h3>
              <p className="font-sans text-sm leading-relaxed text-cream/75 group-hover:text-ink/75 mb-5">
                {p.blurb}
              </p>
              <div className="flex flex-wrap gap-2 pt-4 border-t border-cream/20 group-hover:border-ink/20">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream/70 group-hover:text-ink/70"
                  >
                    /{t}
                  </span>
                ))}
              </div>
              <div className={`mt-6 pt-4 ${accentMap[p.accent]} h-0`} />
            </motion.article>
          ))}
        </div>

        <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.3em] text-cream/50 text-center">
          ↓ Continued on the next page
        </p>
      </div>
    </section>
  );
}
