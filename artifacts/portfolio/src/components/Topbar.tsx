import { useEffect, useState } from "react";
import { Link } from "react-scroll";
import { motion, useScroll, useSpring } from "framer-motion";

export default function Topbar() {
  const [time, setTime] = useState("");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const update = () => {
      const d = new Date();
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Kolkata",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        }).format(d) + " IST"
      );
    };
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="fixed top-0 inset-x-0 z-50 bg-ink text-cream border-b border-ink" data-testid="topbar-root">
      <div className="px-4 sm:px-6 h-9 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em]">
        <div className="flex items-center gap-3 sm:gap-6">
          <motion.span
            className="text-orange"
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            ●
          </motion.span>
          <span className="hidden sm:inline">Portfolio / Vol. 2026</span>
          <span className="sm:hidden">BHA / 2026</span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <span>Karnataka · IN</span>
          <span>{time || "—:—"}</span>
        </div>
        <Link
          to="contact"
          smooth
          duration={800}
          offset={-50}
          className="text-orange hover:text-cream transition-colors cursor-pointer"
          data-testid="link-topbar-contact"
        >
          ↗ Contact
        </Link>
      </div>
      {/* Scroll progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-orange origin-left"
        style={{ scaleX }}
      />
    </div>
  );
}
