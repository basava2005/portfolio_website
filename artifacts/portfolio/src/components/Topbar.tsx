import { useEffect, useState } from "react";
import { Link } from "react-scroll";

export default function Topbar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const d = new Date();
      const opts: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      };
      setTime(new Intl.DateTimeFormat("en-GB", opts).format(d) + " IST");
    };
    update();
    const id = setInterval(update, 1000 * 30);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="fixed top-0 inset-x-0 z-50 bg-ink text-cream border-b border-ink"
      data-testid="topbar-root"
    >
      <div className="px-4 sm:px-6 h-9 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em]">
        <div className="flex items-center gap-3 sm:gap-6">
          <span className="text-orange">●</span>
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
    </div>
  );
}
