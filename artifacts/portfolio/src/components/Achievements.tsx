import { motion } from "framer-motion";
import { Trophy, Globe } from "lucide-react";
import SectionHeader from "./SectionHeader";

const items = [
  {
    icon: Trophy,
    title: "Hackathon Winner",
    blurb:
      "Awarded for building an AI-powered productivity tool in under 24 hours, beating teams from across regional engineering colleges.",
    tag: "Trophy",
  },
  {
    icon: Globe,
    title: "Open Source Contributor",
    blurb:
      "Active contributor to community JavaScript and Python repositories — bug fixes, tooling, and documentation in widely-used libraries.",
    tag: "Community",
  },
];

export default function Achievements() {
  return (
    <section
      id="achievements"
      className="relative bg-cream lg:pl-16 xl:pl-20 py-24 sm:py-32 paper-grain"
      data-testid="achievements-root"
    >
      <div className="px-4 sm:px-8 lg:px-12">
        <SectionHeader
          number="04"
          kicker="Honors"
          title={"Achievements"}
          subtitle="Things people kindly handed me a piece of paper for."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-12">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <motion.div
                key={it.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="border border-ink bg-cream shadow-brutal hover-lift"
                data-testid={`achievement-${i}`}
              >
                <div className="bg-ink text-cream px-5 py-3 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
                    {it.tag} · No. 0{i + 1}
                  </span>
                  <Icon size={18} className="text-orange" />
                </div>
                <div className="p-6 sm:p-8">
                  <h3 className="font-display text-3xl sm:text-4xl uppercase leading-[0.95] mb-4">
                    {it.title}
                  </h3>
                  <p className="font-serif text-lg leading-relaxed text-ink/80">
                    {it.blurb}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
