import { motion } from "framer-motion";

export default function AvailabilityBadge() {
  return (
    <motion.a
      href="mailto:basavarajha05@gmail.com"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6 }}
      className="hidden sm:inline-flex fixed bottom-6 right-6 z-50 items-center gap-3 rounded-full border border-white/15 bg-[#050508]/80 px-4 py-2.5 backdrop-blur-xl hover:border-[#7cffd4]/50 transition-all"
      data-testid="badge-availability"
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full rounded-full bg-[#7cffd4] opacity-75 pulse-dot" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#7cffd4]" />
      </span>
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/80">
        Available for Opportunities
      </span>
    </motion.a>
  );
}
