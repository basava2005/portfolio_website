import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoaderProps {
  onFinish: () => void;
}

export default function Loader({ onFinish }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const start = performance.now();
    const duration = 2500;
    let frame = 0;

    const tick = (now: number) => {
      const elapsed = Math.min(now - start, duration);
      setProgress((elapsed / duration) * 100);
      if (elapsed < duration) {
        frame = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setVisible(false);
          onFinish();
        }, 350);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [onFinish]);

  const name = "BASAVARAJ H A";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.65, 0, 0.35, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050508]"
          data-testid="loader-root"
        >
          <div className="absolute inset-0 opacity-30" style={{
            background: "radial-gradient(circle at 50% 50%, rgba(124,255,212,0.18), transparent 60%)"
          }} />

          <div className="relative flex flex-col items-center gap-10 px-8 w-full max-w-3xl">
            <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/40">
              <span className="text-[#7cffd4]">●</span> Initializing portfolio_v1.0
            </div>

            <h1
              className="font-display text-6xl sm:text-7xl md:text-8xl text-white text-center leading-none"
              data-testid="text-loader-name"
            >
              {name.split("").map((c, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block"
                  style={{ minWidth: c === " " ? "0.4em" : undefined }}
                >
                  {c === " " ? "\u00A0" : c}
                </motion.span>
              ))}
            </h1>

            <div className="w-full max-w-md flex flex-col gap-3">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">
                <span>loading assets</span>
                <span data-testid="text-loader-progress">{Math.floor(progress).toString().padStart(3, "0")}%</span>
              </div>
              <div className="h-[2px] w-full bg-white/10 overflow-hidden rounded-full">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#7cffd4] via-[#a78bfa] to-[#ff6b6b]"
                  style={{ width: `${progress}%` }}
                  data-testid="bar-loader-progress"
                />
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 font-mono text-[10px] uppercase tracking-[0.4em] text-white/30">
            basavaraj h a — full stack & ai
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
