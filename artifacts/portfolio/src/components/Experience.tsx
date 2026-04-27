import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

const experience = [
  {
    role: "Software Developer Intern",
    company: "Luxoft",
    period: "May 2025 — Present",
    location: "Remote",
    bullets: [
      "Built React UIs and Python Flask APIs for full-stack web applications",
      "Developed an AUTOSAR BSWM Rule Visualizer for JSON-based logic",
      "Built an LLM chatbot using Mistral served via LM Studio",
      "Used Renode for embedded system simulation and validation",
      "Engineered an AUTOSAR Analysis & Simulation Suite end-to-end",
    ],
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative px-6 sm:px-10 py-28 sm:py-40"
      data-testid="section-experience"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader index="02" kicker="Experience" title="Where I've shipped." />

        <div className="space-y-6">
          {experience.map((job, idx) => (
            <Reveal key={idx} delay={idx * 0.08}>
              <article
                className="group relative rounded-2xl border border-white/10 bg-white/[0.02] p-7 sm:p-10 backdrop-blur-sm hover:border-[#7cffd4]/30 transition-all"
                data-testid={`card-experience-${idx}`}
              >
                <div className="absolute left-0 top-7 sm:top-10 bottom-7 sm:bottom-10 w-px bg-gradient-to-b from-[#7cffd4]/0 via-[#7cffd4]/60 to-[#7cffd4]/0" />
                <div className="grid lg:grid-cols-12 gap-6 lg:gap-10">
                  <div className="lg:col-span-4 flex flex-col gap-2">
                    <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#7cffd4]">
                      {job.period}
                    </div>
                    <h3 className="font-display text-3xl sm:text-4xl text-white leading-tight">
                      {job.company}
                    </h3>
                    <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/40">
                      {job.location}
                    </div>
                  </div>

                  <div className="lg:col-span-8">
                    <div className="text-white/85 text-lg sm:text-xl mb-5">
                      {job.role}
                    </div>
                    <ul className="space-y-3">
                      {job.bullets.map((b, i) => (
                        <li
                          key={i}
                          className="flex gap-3 text-white/65 leading-relaxed"
                        >
                          <span className="mt-2 h-1 w-3 flex-shrink-0 bg-[#7cffd4]/70" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
