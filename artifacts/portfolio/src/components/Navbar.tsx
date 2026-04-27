import { useEffect, useState } from "react";
import { Link } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-[60] transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-[#050508]/70 border-b border-white/[0.06]"
          : "bg-transparent border-b border-transparent"
      }`}
      data-testid="nav-root"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10 h-16 flex items-center justify-between">
        <Link
          to="hero"
          smooth
          duration={700}
          spy
          className="font-display text-2xl tracking-widest text-[#7cffd4] cursor-pointer"
          data-testid="link-logo"
        >
          BHA<span className="text-white/40">.</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.id}
              to={l.id}
              smooth
              duration={700}
              offset={-40}
              spy
              activeClass="!text-[#7cffd4]"
              className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/60 hover:text-white transition-colors cursor-pointer"
              data-testid={`link-nav-${l.id}`}
            >
              <span className="text-[#7cffd4] mr-2">/</span>{l.label}
            </Link>
          ))}
        </nav>

        <a
          href="mailto:basavarajha05@gmail.com"
          className="hidden md:inline-flex items-center gap-2 rounded-full border border-[#7cffd4]/40 bg-[#7cffd4]/10 px-5 py-2 font-mono text-[11px] uppercase tracking-[0.25em] text-[#7cffd4] hover:bg-[#7cffd4]/20 hover:border-[#7cffd4] transition-all"
          data-testid="button-hire-me"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#7cffd4] pulse-dot" />
          Hire Me
        </a>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-white/80 hover:text-[#7cffd4]"
          aria-label="Toggle menu"
          data-testid="button-menu-toggle"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden border-t border-white/[0.06] bg-[#050508]/90 backdrop-blur-xl"
            data-testid="nav-mobile"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {links.map((l) => (
                <Link
                  key={l.id}
                  to={l.id}
                  smooth
                  duration={700}
                  offset={-40}
                  onClick={() => setOpen(false)}
                  className="font-display text-3xl tracking-wide text-white/80 cursor-pointer"
                  data-testid={`link-mobile-${l.id}`}
                >
                  {l.label}
                </Link>
              ))}
              <a
                href="mailto:basavarajha05@gmail.com"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full border border-[#7cffd4]/50 bg-[#7cffd4]/10 px-5 py-3 font-mono text-xs uppercase tracking-[0.3em] text-[#7cffd4]"
                data-testid="button-mobile-hire"
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
