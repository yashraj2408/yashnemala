import { useEffect, useRef, useState } from "react";
import sprite from "@/assets/shinchan-sprite.png.asset.json";

const FRAMES = 18;
const SIZE = 96; // rendered character box (px)
const SHEET_WIDTH = SIZE * FRAMES;
const HEAD_RATIO = 0.52; // top portion of the sprite that is the head
const FOLLOW = 0.018; // much slower trailing — character walks/runs toward cursor
const TURN = 0.09; // head easing
const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

/**
 * Transparent sprite-sheet character (extracted from the source video) that
 * floats above the page, trails the pointer slowly, and always turns its face
 * toward the cursor.
 */
export function CursorMascot() {
  const [enabled, setEnabled] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const headRef = useRef<HTMLDivElement | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);

  const mouse = useRef({ x: -500, y: -500 });
  const pos = useRef({ x: -500, y: -500 });
  const look = useRef({ x: 0, y: 0 }); // eased -1..1 look direction
  const facing = useRef(1);
  const frame = useRef(0);

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

    let raf = 0;
    let last = performance.now();
    let frameClock = 0;

    const loop = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;

      // --- body: trails far behind the cursor so it visibly runs/walks toward it ---
      const restX = mouse.current.x - 110 * facing.current;
      const restY = mouse.current.y + 24;
      const prevX = pos.current.x;
      const prevY = pos.current.y;
      pos.current.x += (restX - pos.current.x) * FOLLOW;
      pos.current.y += (restY - pos.current.y) * FOLLOW;
      const vx = pos.current.x - prevX;
      const vy = pos.current.y - prevY;
      const speed = Math.hypot(vx, vy);

      // --- always face the cursor direction ---
      const dx = mouse.current.x - pos.current.x;
      if (Math.abs(dx) > 4) facing.current = dx > 0 ? 1 : -1;

      // --- head: vector from face to pointer, eased ---
      const faceX = pos.current.x;
      const faceY = pos.current.y - SIZE * (1 - HEAD_RATIO) * 0.5;
      const headDx = mouse.current.x - faceX;
      const headDy = mouse.current.y - faceY;
      const targetLX = clamp(headDx / 180, -1, 1);
      const targetLY = clamp(headDy / 160, -1, 1);
      look.current.x += (targetLX - look.current.x) * TURN;
      look.current.y += (targetLY - look.current.y) * TURN;

      // --- walk/run cycle: faster when far from cursor, slower when close ---
      frameClock += dt;
      const stepping = speed > 0.08;
      const runFactor = clamp(speed / 2.5, 0.5, 2.2);
      if (stepping && frameClock > 110 / runFactor) {
        frame.current = (frame.current + 1) % FRAMES;
        frameClock = 0;
      }

      const wrap = wrapRef.current;
      const head = headRef.current;
      const body = bodyRef.current;
      if (wrap && head && body) {
        const bob = stepping
          ? Math.sin(now / (160 / runFactor)) * 3
          : Math.sin(now / 900) * 1.2;

        // body leans into the movement direction
        const bodyLean = clamp(vx * facing.current * 2.2, -18, 18);

        wrap.style.transform = `translate3d(${pos.current.x - SIZE / 2}px, ${
          pos.current.y - SIZE / 2 + bob
        }px, 0) scaleX(${facing.current}) rotateZ(${bodyLean}deg)`;

        const offset = `-${frame.current * SIZE}px 0`;
        head.style.backgroundPosition = offset;
        body.style.backgroundPosition = offset;

        // head turns to look at the pointer in the (possibly mirrored) sprite space
        const lx = look.current.x * facing.current;
        const rotZ = clamp(lx * 34, -34, 34);
        const rotX = clamp(-look.current.y * 18, -18, 18);
        head.style.transform = `perspective(320px) translate(${lx * 7}px, ${
          look.current.y * 5
        }px) rotateX(${rotX}deg) rotateZ(${rotZ}deg)`;
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

  const layer: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    backgroundImage: `url(${(sprite as { url: string }).url})`,
    backgroundSize: `${SHEET_WIDTH}px ${SIZE}px`,
    backgroundRepeat: "no-repeat",
    imageRendering: "auto",
  };

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block will-change-transform"
      style={{ width: SIZE, height: SIZE, filter: "drop-shadow(0 6px 10px rgb(0 0 0 / 0.18))" }}
    >
      <div
        ref={bodyRef}
        style={{
          ...layer,
          clipPath: `inset(${HEAD_RATIO * 100}% 0 0 0)`,
        }}
      />
      <div
        ref={headRef}
        style={{
          ...layer,
          clipPath: `inset(0 0 ${(1 - HEAD_RATIO) * 100}% 0)`,
          transformOrigin: `50% ${HEAD_RATIO * 100}%`,
          willChange: "transform",
        }}
      />
    </div>
  );
}
