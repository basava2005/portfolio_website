import { useEffect, useState } from "react";
import { Link } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { id: "hero", label: "Index", n: "00" },
  { id: "about", label: "About", n: "01" },
  { id: "experience", label: "Experience", n: "02" },
  { id: "projects", label: "Projects", n: "03" },
  { id: "achievements", label: "Awards", n: "04" },
  { id: "certifications", label: "Credentials", n: "05" },
  { id: "contact", label: "Contact", n: "06" },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + window.innerHeight * 0.4;
      let current = "hero";
      for (const l of links) {
        const el = document.getElementById(l.id);
        if (el && el.offsetTop <= y) current = l.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Desktop fixed left rail — simplified: just numbered dots */}
      <aside
        className="hidden lg:flex fixed left-0 top-9 bottom-0 z-40 w-14 flex-col items-center justify-between bg-cream border-r-2 border-ink py-6"
        data-testid="sidebar-root"
      >
        <Link
          to="hero"
          smooth
          duration={700}
          className="font-display text-xl text-ink cursor-pointer leading-none select-none"
          data-testid="link-logo"
        >
          B<span className="text-orange">·</span>A
        </Link>

        <nav className="flex flex-col items-center gap-3">
          {links.map((l) => (
            <Link
              key={l.id}
              to={l.id}
              smooth
              duration={700}
              offset={-50}
              spy
              title={l.label}
              className="relative group cursor-pointer"
              data-testid={`link-side-${l.id}`}
            >
              <div
                className={`h-2 w-2 rounded-full transition-all duration-200 ${
                  active === l.id
                    ? "bg-orange scale-125"
                    : "bg-ink/30 group-hover:bg-ink"
                }`}
              />
              {/* Tooltip on hover */}
              <div className="absolute left-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity bg-ink text-cream font-mono text-[9px] uppercase tracking-[0.25em] px-2 py-1 whitespace-nowrap">
                {l.n} / {l.label}
              </div>
            </Link>
          ))}
        </nav>

        <div className="font-mono text-[8px] uppercase tracking-[0.3em] text-ink/40 [writing-mode:vertical-rl] rotate-180">
          2026
        </div>
      </aside>

      {/* Mobile menu button */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-12 right-4 z-40 h-11 w-11 bg-ink text-cream grid place-items-center shadow-brutal-orange"
        aria-label="Open menu"
        data-testid="button-menu-open"
      >
        <Menu size={18} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
            className="lg:hidden fixed inset-0 z-50 bg-ink text-cream flex flex-col"
            data-testid="menu-mobile"
          >
            <div className="flex items-center justify-between border-b border-cream/20 px-6 py-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
                Index
              </span>
              <button
                onClick={() => setOpen(false)}
                className="text-cream"
                aria-label="Close menu"
                data-testid="button-menu-close"
              >
                <X size={22} />
              </button>
            </div>
            <nav className="flex-1 flex flex-col justify-center px-8 gap-2">
              {links.map((l) => (
                <Link
                  key={l.id}
                  to={l.id}
                  smooth
                  duration={700}
                  offset={-50}
                  onClick={() => setOpen(false)}
                  className="group flex items-baseline gap-5 py-3 cursor-pointer"
                  data-testid={`link-mobile-${l.id}`}
                >
                  <span className="font-mono text-xs text-orange">{l.n}</span>
                  <span className="font-display text-5xl uppercase group-hover:text-orange transition-colors">
                    {l.label}
                  </span>
                </Link>
              ))}
            </nav>
            <div className="border-t border-cream/20 px-6 py-5 font-mono text-xs uppercase tracking-[0.3em] text-cream/50">
              Basavaraj H A · Full Stack Dev
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
