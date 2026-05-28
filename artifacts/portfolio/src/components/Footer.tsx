import { Link } from "react-scroll";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="relative bg-ink text-cream lg:pl-16 xl:pl-20"
      data-testid="footer-root"
    >
      {/* Big colophon */}
      <div className="px-4 sm:px-8 lg:px-12 py-16 border-b border-cream/15">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream/60 mb-4">
              Colophon
            </div>
            <div className="font-serif italic text-4xl sm:text-5xl lg:text-6xl leading-[1.1] max-w-4xl">
              "Design is not just what it looks like and feels like. <span className="text-orange">Design is how it works.</span>"
            </div>
          </div>
          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            <Link
              to="hero"
              smooth
              duration={900}
              className="group inline-flex items-center gap-3 border border-cream px-6 py-4 font-mono text-xs uppercase tracking-[0.3em] cursor-pointer hover:bg-orange hover:text-ink hover:border-orange transition-colors"
              data-testid="button-back-top"
            >
              <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform" />
              Back to top
            </Link>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 lg:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-cream/60">
        <div data-testid="text-footer-copy">
          © 2026 · All rights reserved
        </div>
        <div className="flex items-center gap-4">
          <span>Made by hand</span>
          <span className="text-orange">●</span>
          <span>Karnataka · India</span>
        </div>
      </div>
    </footer>
  );
}
