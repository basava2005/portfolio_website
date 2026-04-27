import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import { ScrollText } from "lucide-react";

const certs = [
  {
    title: "Python Programming Course",
    issuer: "Dhaapps",
    date: "May 2024",
  },
  {
    title: "Diploma in Computer Financial Accounting",
    issuer: "KEONICS",
    date: "Feb 2022",
  },
];

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="relative px-6 sm:px-10 py-28 sm:py-40"
      data-testid="section-certifications"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader index="05" kicker="Credentials" title="Certifications." />

        <div className="grid sm:grid-cols-2 gap-5 sm:gap-7">
          {certs.map((c, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <article
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-7 sm:p-9 backdrop-blur-sm hover:border-[#a78bfa]/30 transition-all"
                data-testid={`card-cert-${i}`}
              >
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 h-14 w-14 rounded-xl border border-white/10 bg-black/40 grid place-items-center text-[#a78bfa]">
                    <ScrollText size={22} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#a78bfa]">
                      {c.date}
                    </div>
                    <h3 className="font-display text-2xl sm:text-3xl text-white leading-tight">
                      {c.title}
                    </h3>
                    <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/50">
                      {c.issuer}
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
