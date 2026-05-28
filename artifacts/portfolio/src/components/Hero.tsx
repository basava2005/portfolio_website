import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring, animate } from "framer-motion";
import { Link } from "react-scroll";
import { ArrowDown, ArrowUpRight } from "lucide-react";

/* ─── Letter split ──────────────────────────────────────────────────── */
function SplitText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const letters = text.split("");
  return (
    <span className={className} aria-label={text}>
      {letters.map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{
            duration: 0.7,
            delay: delay + i * 0.045,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ display: ch === " " ? "inline" : "inline-block" }}
        >
          {ch === " " ? "\u00A0" : ch}
        </motion.span>
      ))}
    </span>
  );
}

/* ─── Animated counter ───────────────────────────────────────────────── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let animControls: ReturnType<typeof animate> | undefined;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animControls = animate(0, to, {
            duration: 1.4,
            ease: [0.22, 1, 0.36, 1],
            onUpdate: (v) => setVal(Math.round(v)),
          });
          obs.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      animControls?.stop();
    };
  }, [to]);

  return (
    <div ref={ref} className="font-display text-5xl text-orange tabular-nums">
      {val}{suffix}
    </div>
  );
}

/* ─── Hero ───────────────────────────────────────────────────────────── */
interface HeroSettings {
  name: string;
  tagline: string;
  bio: string;
  available: boolean;
  availableText: string;
  location: string;
  stat1Label: string; stat1Value: string;
  stat2Label: string; stat2Value: string;
  stat3Label: string; stat3Value: string;
}

const defaults: HeroSettings = {
  name: "Basavaraj H A",
  tagline: "Full Stack Developer & AI Enthusiast",
  bio: "Enter your professional bio in the admin panel to display it here.",
  available: false,
  availableText: "Update your status in Admin",
  location: "Karnataka, India",
  stat1Label: "Projects", stat1Value: "0",
  stat2Label: "Skills", stat2Value: "0",
  stat3Label: "Exp", stat3Value: "0",
};

export default function Hero() {
  const [data, setData] = useState<HeroSettings>(defaults);

  useEffect(() => {
    fetch("/api/portfolio/settings/hero")
      .then((r) => r.json())
      .then((d) => {
        if (d) setData({ ...defaults, ...d });
      })
      .catch(() => {});
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const gridX = useTransform(smoothX, [-1, 1], [-12, 12]);
  const gridY = useTransform(smoothY, [-1, 1], [-8, 8]);

  const handleMouse = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
    mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
  };

  const nameParts = data.name.split(" ");
  const firstName = nameParts[0] || "Basavaraj";
  const lastName = nameParts.slice(1).join(" ") || "H A";

  return (
    <section
      id="hero"
      className="relative min-h-screen lg:pl-16 xl:pl-20 pt-9 paper-grain overflow-hidden"
      data-testid="hero-root"
      onMouseMove={handleMouse}
    >
      {/* Parallax grid */}
      <motion.div
        className="absolute inset-0 grid-lines pointer-events-none"
        style={{ x: gridX, y: gridY }}
      />

      <div className="relative px-4 sm:px-8 lg:px-12 pt-10 pb-16 min-h-[calc(100vh-2.25rem)] flex flex-col">
        {/* Top meta strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex items-center justify-between border-b border-ink pb-3 font-mono text-[10px] uppercase tracking-[0.3em]"
        >
          <span>Issue 01 · Vol. 2026 · Edition: Personal</span>
          <span className="hidden sm:inline">A Brutalist Portfolio</span>
        </motion.div>

        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex items-center gap-3"
        >
          {data.available && (
            <motion.span
              className="h-2 w-2 bg-orange rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            />
          )}
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink/70">
            {data.availableText}
          </span>
        </motion.div>

        {/* Hero name — letter split */}
        <h1
          className="font-display uppercase leading-[0.82] mt-6 overflow-hidden"
          data-testid="text-hero-name"
        >
          <div className="overflow-hidden">
            <SplitText
              text={firstName}
              className="block text-[19vw] sm:text-[14vw] lg:text-[11rem] xl:text-[13rem]"
              delay={0.4}
            />
          </div>
          <div className="overflow-hidden flex items-end gap-4 sm:gap-8 mt-2">
            <SplitText
              text={lastName}
              className="block text-[19vw] sm:text-[14vw] lg:text-[11rem] xl:text-[13rem]"
              delay={0.65}
            />
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
              className="hidden sm:inline-block font-serif italic text-2xl sm:text-4xl lg:text-5xl text-ink/70 pb-4 sm:pb-8 lg:pb-10"
            >
              <span className="not-italic font-mono text-xs uppercase tracking-[0.3em] block mb-1">
                — also called
              </span>
              the developer.
            </motion.span>
          </div>
        </h1>

        {/* Bottom row */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-end flex-1">
          {/* Drop-cap bio */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="lg:col-span-6 max-w-xl"
            data-testid="text-hero-bio"
          >
            <p className="font-serif text-2xl sm:text-3xl leading-[1.15] text-ink">
              <span className="float-left font-display text-7xl leading-[0.8] mr-3 mt-1 text-orange">
                {data.bio.charAt(0)}
              </span>
              {data.bio.slice(1)}
            </p>
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.25 }}
            className="lg:col-span-3 flex flex-col gap-3"
          >
            <Link
              to="projects" smooth duration={800} offset={-50}
              className="group inline-flex items-center justify-between bg-ink text-cream px-5 py-4 font-mono text-xs uppercase tracking-[0.3em] cursor-pointer hover-lift hover-lift-orange shadow-brutal-orange"
              data-testid="button-view-work"
            >
              <span>See the Work</span>
              <motion.span
                className="inline-flex"
                whileHover={{ rotate: 45 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowUpRight size={18} />
              </motion.span>
            </Link>
            <Link
              to="contact" smooth duration={800} offset={-50}
              className="group inline-flex items-center justify-between bg-cream border border-ink text-ink px-5 py-4 font-mono text-xs uppercase tracking-[0.3em] cursor-pointer hover-lift shadow-brutal"
              data-testid="button-contact"
            >
              <span>Get In Touch</span>
              <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform" />
            </Link>
          </motion.div>

          {/* Stats — animated counters */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="lg:col-span-3 grid grid-cols-3 lg:grid-cols-1 gap-4 border-t lg:border-t-0 lg:border-l border-ink pt-6 lg:pt-0 lg:pl-6"
          >
            <div>
              <Counter to={10} suffix="+" />
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60 mt-1">Projects shipped</div>
            </div>
            <div>
              <Counter to={17} />
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60 mt-1">Core skills</div>
            </div>
            <div>
              <div className="font-display text-5xl">∞</div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60 mt-1">Curiosity</div>
            </div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="mt-10 border-t border-ink pt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em]"
        >
          <motion.span
            className="flex items-center gap-2"
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            <ArrowDown size={12} /> Scroll to read
          </motion.span>
          <span className="hidden sm:inline">Page 01 of 06</span>
          <span>Karnataka · India</span>
        </motion.div>
      </div>
    </section>
  );
}
