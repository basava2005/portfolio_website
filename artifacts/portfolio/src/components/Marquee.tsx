const items = [
  "Full Stack Developer",
  "AI Enthusiast",
  "AUTOSAR Engineer",
  "LLM Integrations",
  "Open to Work",
  "Karnataka, India",
  "Available 2026",
  "React · Node · Python",
];

export default function Marquee() {
  const repeated = [...items, ...items, ...items, ...items];
  return (
    <section
      className="relative bg-ink text-cream border-y border-ink overflow-hidden"
      data-testid="marquee-root"
    >
      <div className="ticker flex items-center gap-12 py-5 whitespace-nowrap">
        {repeated.map((it, i) => (
          <span
            key={i}
            className="flex items-center gap-12 font-display text-3xl sm:text-5xl uppercase"
          >
            {it}
            <span className="text-orange">★</span>
          </span>
        ))}
      </div>
    </section>
  );
}
