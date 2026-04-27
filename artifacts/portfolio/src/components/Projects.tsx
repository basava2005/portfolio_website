import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    n: "01",
    title: "Satyagraha AI Platform",
    description:
      "AI-powered legal platform for agreement drafting, FIR analysis, and contract risk assessment. Role-based authentication, encrypted document handling, and automated PDF generation.",
    tech: ["React.js", "Node.js", "Neon PostgreSQL", "LLM/AI"],
  },
  {
    n: "02",
    title: "SkyForger Technologies Website",
    description:
      "Production startup site with full internship management, applicant tracking, and admin dashboards — currently serving 50+ active users.",
    tech: ["React.js", "Node.js", "Neon PostgreSQL"],
  },
  {
    n: "03",
    title: "Exam Guardian System",
    description:
      "AI-driven exam monitoring system with real-time face detection, behavior tracking, and SHA-256 tamper-proof logs for academic integrity.",
    tech: ["React.js", "Node.js", "Express.js", "SHA-256"],
  },
  {
    n: "04",
    title: "Face Recognition Attendance",
    description:
      "Real-time face recognition attendance with PostgreSQL storage, CSV export, and timetable-aware auto-marking for classrooms.",
    tech: ["Python", "OpenCV", "NumPy", "PostgreSQL"],
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative px-6 sm:px-10 py-28 sm:py-40"
      data-testid="section-projects"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          index="03"
          kicker="Selected Work"
          title="Projects, in production."
          subtitle="A focused selection — full-stack platforms, AI systems, and tooling I've built end to end."
        />

        <div className="grid sm:grid-cols-2 gap-5 sm:gap-7">
          {projects.map((p, i) => (
            <Reveal key={p.n} delay={(i % 2) * 0.08}>
              <article
                className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-white/[0.005] p-7 sm:p-9 backdrop-blur-sm transition-all ring-mint"
                data-testid={`card-project-${p.n}`}
              >
                <div
                  className="pointer-events-none absolute -right-8 -top-8 font-display text-[12rem] leading-none text-white/[0.04] select-none"
                  aria-hidden
                >
                  {p.n}
                </div>

                <div className="relative flex flex-col h-full gap-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#7cffd4]">
                      Project / {p.n}
                    </div>
                    <ArrowUpRight
                      size={18}
                      className="text-white/30 group-hover:text-[#7cffd4] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
                    />
                  </div>

                  <h3 className="font-display text-3xl sm:text-4xl text-white leading-tight">
                    {p.title}
                  </h3>

                  <p className="text-white/60 leading-relaxed">{p.description}</p>

                  <div className="mt-auto pt-4 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center rounded-full border border-white/10 bg-black/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/70"
                        data-testid={`tag-tech-${t.toLowerCase().replace(/\s+/g, "-").replace(/\./g, "").replace(/\//g, "-")}`}
                      >
                        {t}
                      </span>
                    ))}
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
