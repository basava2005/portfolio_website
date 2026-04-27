import { motion } from "framer-motion";
import { Link } from "react-scroll";

export default function StatusSticker() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
      animate={{ opacity: 1, scale: 1, rotate: -8 }}
      transition={{ duration: 0.6, delay: 1.2, type: "spring", stiffness: 200 }}
      className="fixed bottom-5 right-5 z-40 hidden md:block"
      data-testid="sticker-status"
    >
      <Link
        to="contact"
        smooth
        duration={800}
        offset={-50}
        className="cursor-pointer"
      >
        <div className="relative h-24 w-24 lg:h-28 lg:w-28">
          <div className="absolute inset-0 rounded-full bg-orange shadow-brutal grid place-items-center text-center p-2">
            <div>
              <div className="font-mono text-[8px] uppercase tracking-[0.2em] text-ink leading-tight">
                Available
                <br />
                For
              </div>
              <div className="font-display text-base text-ink leading-none uppercase">
                Hire
              </div>
              <div className="font-mono text-[8px] uppercase tracking-[0.2em] text-ink mt-0.5">
                · 2026 ·
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
