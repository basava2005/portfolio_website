import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const ringX = useSpring(mx, { stiffness: 120, damping: 20, mass: 0.5 });
  const ringY = useSpring(my, { stiffness: 120, damping: 20, mass: 0.5 });

  const hovering = useRef(false);
  const ringSize = useSpring(28, { stiffness: 200, damping: 22 });
  const dotSize = useSpring(6, { stiffness: 300, damping: 22 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };

    const enter = () => {
      hovering.current = true;
      ringSize.set(52);
      dotSize.set(4);
    };
    const leave = () => {
      hovering.current = false;
      ringSize.set(28);
      dotSize.set(6);
    };

    window.addEventListener("mousemove", move);
    document.querySelectorAll("a,button,[data-cursor='hover']").forEach((el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });

    // Re-run on DOM changes
    const obs = new MutationObserver(() => {
      document.querySelectorAll("a,button,[data-cursor='hover']").forEach((el) => {
        el.addEventListener("mouseenter", enter);
        el.addEventListener("mouseleave", leave);
      });
    });
    obs.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", move);
      obs.disconnect();
    };
  }, []);

  return (
    <>
      {/* Dot — follows immediately */}
      <motion.div
        className="fixed z-[999] pointer-events-none rounded-full bg-orange mix-blend-multiply"
        style={{
          x: mx,
          y: my,
          width: dotSize,
          height: dotSize,
          translateX: "-50%",
          translateY: "-50%",
          top: 0,
          left: 0,
        }}
      />
      {/* Ring — follows with spring lag */}
      <motion.div
        className="fixed z-[998] pointer-events-none rounded-full border border-orange mix-blend-multiply"
        style={{
          x: ringX,
          y: ringY,
          width: ringSize,
          height: ringSize,
          translateX: "-50%",
          translateY: "-50%",
          top: 0,
          left: 0,
        }}
      />
    </>
  );
}
