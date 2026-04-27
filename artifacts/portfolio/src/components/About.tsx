import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

const skills = [
  "Python",
  "JavaScript",
  "React.js",
  "Node.js",
  "Flask",
  "FastAPI",
  "PostgreSQL",
  "MongoDB",
  "OpenCV",
  "LLM Integration",
  "LoRA Fine-tuning",
  "AUTOSAR",
  "Renode",
  "Git",
  "Power BI",
  "Java",
  "C",
];

export default function About() {
  return (
    <section
      id="about"
      className="relative px-6 sm:px-10 py-28 sm:py-40"
      data-testid="section-about"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader index="01" kicker="About" title="The short version." />

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-7 space-y-6 text-white/70 text-lg leading-relaxed">
            <Reveal>
              <p>
                I'm <span className="text-white">Basavaraj H A</span> — an
                Information Science engineering student at GM Institute of
                Technology, VTU, currently building production software as a
                Software Developer Intern at <span className="text-[#7cffd4]">Luxoft</span>.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <p>
                My work spans full-stack web platforms with React, Node, Flask
                and FastAPI; AUTOSAR tooling and embedded simulation with Renode;
                and AI systems built on local LLMs, computer vision, and
                fine-tuned models with LoRA.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <p>
                I care about products that ship — clean architecture, real
                authentication, real persistence, real users. Based in
                Karnataka, India, open to remote roles, internships, and
                collaborations.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-6 pt-8 border-t border-white/10">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">Location</div>
                  <div className="mt-1 text-white text-sm">Karnataka, India</div>
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">Education</div>
                  <div className="mt-1 text-white text-sm">B.E. ISE — VTU</div>
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">Status</div>
                  <div className="mt-1 text-[#7cffd4] text-sm">Open to work</div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/40 mb-6">
                / stack
              </div>
            </Reveal>
            <div className="flex flex-wrap gap-2.5" data-testid="grid-skills">
              {skills.map((skill, i) => (
                <Reveal key={skill} delay={0.05 + i * 0.025}>
                  <span
                    className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-white/75 hover:border-[#7cffd4]/50 hover:text-[#7cffd4] hover:bg-[#7cffd4]/[0.06] transition-colors"
                    data-testid={`tag-skill-${skill.toLowerCase().replace(/\s+/g, "-").replace(/\./g, "")}`}
                  >
                    {skill}
                  </span>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
