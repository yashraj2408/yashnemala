import { useEffect, useRef, useState } from "react";
import mascot from "@/assets/cursor-mascot.png.asset.json";

/** Small image that trails the mouse pointer (desktop, non-reduced-motion only). */
export function CursorMascot() {
  const target = useRef({ x: -200, y: -200 });
  const pos = useRef({ x: -200, y: -200 });
  const elRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(fine && !reduced);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };
    const loop = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.14;
      pos.current.y += (target.current.y - pos.current.y) * 0.14;
      const el = elRef.current;
      if (el) {
        el.style.transform = `translate3d(${pos.current.x + 14}px, ${pos.current.y + 10}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={elRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block will-change-transform"
    >
      <img
        src={(mascot as { url: string }).url}
        alt=""
        className="h-16 w-16 animate-float select-none drop-shadow-lg"
        draggable={false}
      />
    </div>
  );
}
