import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

const items = [
  {
    icon: "🏆",
    title: "Top 10 Finalist — Hackathon",
    org: "JNNCE Shivamogga",
    date: "Mar 2026",
  },
  {
    icon: "🌐",
    title: "Winter of Code — Social Contributor",
    org: "Open Source",
    date: "Jan 2026",
  },
];

export default function Achievements() {
  return (
    <section
      id="achievements"
      className="relative px-6 sm:px-10 py-28 sm:py-40"
      data-testid="section-achievements"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader index="04" kicker="Recognition" title="Wins worth noting." />

        <div className="grid sm:grid-cols-2 gap-5 sm:gap-7">
          {items.map((it, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <article
                className="relative rounded-2xl border border-white/10 bg-white/[0.02] p-7 sm:p-9 backdrop-blur-sm hover:border-[#7cffd4]/30 hover:bg-white/[0.04] transition-all"
                data-testid={`card-achievement-${i}`}
              >
                <div className="flex items-start gap-5">
                  <div
                    className="flex-shrink-0 h-14 w-14 rounded-xl border border-white/10 bg-black/40 grid place-items-center text-2xl"
                    aria-hidden
                  >
                    {it.icon}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#7cffd4]">
                      {it.date}
                    </div>
                    <h3 className="font-display text-2xl sm:text-3xl text-white leading-tight">
                      {it.title}
                    </h3>
                    <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/50">
                      {it.org}
                    </div>
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
