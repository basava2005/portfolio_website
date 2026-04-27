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
    const duration = 1800;
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
        }, 250);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[100] bg-ink text-cream flex flex-col"
          data-testid="loader-root"
        >
          <div className="flex items-center justify-between border-b border-cream/20 px-6 py-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
              Issue No. 01 / Vol. 2026
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
              <span className="blink">●</span> Now Loading
            </span>
          </div>

          <div className="flex-1 flex flex-col justify-center px-6 sm:px-16">
            <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-orange mb-6">
              The Basavaraj Issue
            </div>
            <h1
              className="font-display text-[18vw] sm:text-[14vw] lg:text-[12rem] leading-[0.85] uppercase"
              data-testid="text-loader-name"
            >
              Basavaraj
              <br />
              <span className="text-orange">H A</span>
            </h1>
            <div className="mt-12 max-w-md">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] mb-2">
                <span>Setting type</span>
                <span data-testid="text-loader-progress">
                  {Math.floor(progress).toString().padStart(3, "0")} / 100
                </span>
              </div>
              <div className="h-[3px] w-full bg-cream/15 overflow-hidden">
                <motion.div
                  className="h-full bg-orange"
                  style={{ width: `${progress}%` }}
                  data-testid="bar-loader-progress"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-cream/20 px-6 py-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em]">
            <span>Karnataka · India</span>
            <span>Full Stack · AI</span>
            <span>Open to Work</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
