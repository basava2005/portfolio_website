import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) {
      setEnabled(false);
      return;
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`;
      }
    };

    const tick = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX - 18}px, ${ringY - 18}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    const interactiveSelector = "a, button, [role='button'], [data-cursor='hover'], input, textarea, select";
    const handleOver = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest(interactiveSelector)) setHovering(true);
    };
    const handleOut = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest(interactiveSelector)) setHovering(false);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[200] h-2 w-2 rounded-full bg-[#7cffd4]"
        style={{ boxShadow: "0 0 12px rgba(124,255,212,0.8)" }}
        data-testid="cursor-dot"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[200] rounded-full border transition-[width,height,border-color,opacity] duration-200 ease-out"
        style={{
          width: hovering ? 56 : 36,
          height: hovering ? 56 : 36,
          borderColor: hovering ? "rgba(124,255,212,0.9)" : "rgba(124,255,212,0.4)",
          mixBlendMode: "difference",
        }}
        data-testid="cursor-ring"
      />
    </>
  );
}
