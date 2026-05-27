import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

interface AboutSettings {
  bio1: string;
  bio2: string;
  bio3: string;
  skills: string[];
  facts: Array<{ k: string; v: string }>;
}

const defaults: AboutSettings = {
  bio1: "Update your bio in the admin panel.",
  bio2: "",
  bio3: "",
  skills: [],
  facts: [],
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};
const cellVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as any } },
};
const factVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: (i: number) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.45, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] as any },
  }),
};

export default function About() {
  const [data, setData] = useState<AboutSettings>(defaults);

  useEffect(() => {
    fetch("/api/portfolio/settings/about")
      .then((r) => r.json())
      .then((d) => {
        if (d) setData({ ...defaults, ...d });
      })
      .catch(() => {});
  }, []);

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
          {/* Bio paragraphs */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 space-y-6 font-serif text-xl sm:text-2xl leading-relaxed text-ink/85"
          >
            <p data-testid="text-about-bio-1">
              {data.bio1}
            </p>
            <p data-testid="text-about-bio-2">
              {data.bio2}
            </p>
            <p className="font-sans text-base text-ink/60 not-italic">
              {data.bio3}
            </p>
          </motion.div>

          {/* Fact sheet */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="border border-ink bg-cream shadow-brutal"
            >
              <div className="bg-ink text-cream px-4 py-2 font-mono text-[10px] uppercase tracking-[0.3em] flex items-center justify-between">
                <span>Fact Sheet</span>
                <span>v.2026</span>
              </div>
              <dl className="divide-y divide-ink/15">
                {data.facts.map((f, i) => (
                  <motion.div
                    key={f.k}
                    custom={i}
                    variants={factVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex items-baseline justify-between px-4 py-3 group hover:bg-ink hover:text-cream transition-colors"
                    data-testid={`fact-${f.k.toLowerCase()}`}
                  >
                    <dt className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink/60 group-hover:text-orange transition-colors">{f.k}</dt>
                    <dd className="font-display text-lg uppercase group-hover:text-cream transition-colors">{f.v}</dd>
                  </motion.div>
                ))}
              </dl>
            </motion.div>
          </div>
        </div>

        {/* Skills grid — staggered cells */}
        <div className="mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="flex items-baseline justify-between border-b border-ink pb-3 mb-6"
          >
            <h3 className="font-display text-2xl uppercase">Toolbox</h3>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60">
              {data.skills.length} entries · sorted by use
            </span>
          </motion.div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-0 border-l border-t border-ink"
          >
            {data.skills.map((s, i) => (
              <motion.div
                key={s}
                variants={cellVariants}
                whileHover={{ backgroundColor: "var(--color-ink)", color: "var(--color-orange)", scale: 1.02 }}
                className="border-r border-b border-ink px-4 py-4 cursor-default group transition-colors"
                data-testid={`skill-${s.toLowerCase().replace(/[/.\s]/g, "-")}`}
              >
                <div className="font-mono text-[10px] text-ink/40 group-hover:text-cream/60 transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="font-display text-xl uppercase mt-1">{s}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
