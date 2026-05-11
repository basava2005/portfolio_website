import { motion } from "framer-motion";
import { Trophy, Globe } from "lucide-react";
import SectionHeader from "./SectionHeader";

const items = [
  {
    icon: Trophy,
    title: "Hackathon Winner",
    blurb: "Awarded for building an AI-powered productivity tool in under 24 hours, beating teams from across regional engineering colleges.",
    tag: "Trophy",
  },
  {
    icon: Globe,
    title: "Open Source Contributor",
    blurb: "Active contributor to community JavaScript and Python repositories — bug fixes, tooling, and documentation in widely-used libraries.",
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
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="border border-ink bg-cream shadow-brutal hover-lift group cursor-default"
                data-testid={`achievement-${i}`}
              >
                <div className="bg-ink text-cream px-5 py-3 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
                    {it.tag} · No. 0{i + 1}
                  </span>
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon size={18} className="text-orange" />
                  </motion.div>
                </div>
                <div className="p-6 sm:p-8">
                  <motion.h3
                    className="font-display text-3xl sm:text-4xl uppercase leading-[0.95] mb-4"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 + 0.2, duration: 0.5 }}
                  >
                    {it.title}
                  </motion.h3>
                  <p className="font-serif text-lg leading-relaxed text-ink/80">{it.blurb}</p>
                </div>
                {/* Bottom bar fills on hover */}
                <motion.div
                  className="h-1 bg-orange origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
