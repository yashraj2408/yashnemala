import { useEffect, useRef, useState } from "react";
import mascot from "@/assets/cursor-mascot.png.asset.json";

const SIZE = 80;
const FOLLOW = 0.025; // very slow trailing — character drifts toward the cursor
const ROTATION_EASE = 0.08;
const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

/**
 * Original mascot image that floats near the cursor and slowly drifts toward it.
 */
export function CursorMascot() {
  const [enabled, setEnabled] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const mouse = useRef({ x: -500, y: -500 });
  const pos = useRef({ x: -500, y: -500 });
  const angle = useRef(0);
  const facing = useRef(1);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(fine && !reduced);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    // place it near the cursor on first load so it doesn't fly from off-screen
    pos.current.x = mouse.current.x - 80;
    pos.current.y = mouse.current.y + 20;

    let raf = 0;

    const loop = () => {
      const dx = mouse.current.x - pos.current.x;
      const dy = mouse.current.y - pos.current.y;

      // target rests slightly behind and below the cursor
      const targetX = mouse.current.x - 60 * facing.current;
      const targetY = mouse.current.y + 30;

      pos.current.x += (targetX - pos.current.x) * FOLLOW;
      pos.current.y += (targetY - pos.current.y) * FOLLOW;

      // face the cursor
      if (Math.abs(dx) > 4) facing.current = dx > 0 ? 1 : -1;

      // gentle tilt toward movement direction
      const targetAngle = clamp(dx * 0.08, -20, 20) * facing.current;
      angle.current += (targetAngle - angle.current) * ROTATION_EASE;

      const wrap = wrapRef.current;
      if (wrap) {
        wrap.style.transform = `translate3d(${pos.current.x - SIZE / 2}px, ${
          pos.current.y - SIZE / 2
        }px, 0) scaleX(${facing.current}) rotate(${angle.current}deg)`;
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block will-change-transform"
      style={{
        width: SIZE,
        height: SIZE,
        backgroundImage: `url(${(mascot as { url: string }).url})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        filter: "drop-shadow(0 6px 10px rgb(0 0 0 / 0.18))",
      }}
    />
  );
}
