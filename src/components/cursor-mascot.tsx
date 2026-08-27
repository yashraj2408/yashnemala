import { useEffect, useRef, useState } from "react";
import sprite from "@/assets/shinchan-sprite.png.asset.json";

const FRAMES = 18;
const SIZE = 96; // rendered character box (px)
const SHEET_WIDTH = SIZE * FRAMES;
const HEAD_RATIO = 0.52; // top portion of the sprite that is the head
const FOLLOW = 0.055; // body lag (slow, so it trails rather than teleports)
const TURN = 0.12; // head easing
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

      // --- body: lags behind the cursor, keeps a natural offset ---
      const restX = mouse.current.x - 90 * facing.current;
      const restY = mouse.current.y + 20;
      const prevX = pos.current.x;
      pos.current.x += (restX - pos.current.x) * FOLLOW;
      pos.current.y += (restY - pos.current.y) * FOLLOW;
      const speed = Math.abs(pos.current.x - prevX);

      // --- head: vector from face to pointer, eased ---
      const faceX = pos.current.x;
      const faceY = pos.current.y - SIZE * (1 - HEAD_RATIO) * 0.5;
      const dx = mouse.current.x - faceX;
      const dy = mouse.current.y - faceY;
      const targetLX = clamp(dx / 260, -1, 1);
      const targetLY = clamp(dy / 220, -1, 1);
      look.current.x += (targetLX - look.current.x) * TURN;
      look.current.y += (targetLY - look.current.y) * TURN;

      if (Math.abs(dx) > 40) facing.current = dx > 0 ? 1 : -1;

      // --- walk cycle only while actually moving ---
      frameClock += dt;
      const stepping = speed > 0.35;
      if (stepping && frameClock > 90) {
        frame.current = (frame.current + 1) % FRAMES;
        frameClock = 0;
      }

      const wrap = wrapRef.current;
      const head = headRef.current;
      const body = bodyRef.current;
      if (wrap && head && body) {
        const bob = stepping ? Math.sin(now / 130) * 2 : Math.sin(now / 700) * 1.5;
        wrap.style.transform = `translate3d(${pos.current.x - SIZE / 2}px, ${
          pos.current.y - SIZE / 2 + bob
        }px, 0) scaleX(${facing.current})`;

        const offset = `-${frame.current * SIZE}px 0`;
        head.style.backgroundPosition = offset;
        body.style.backgroundPosition = offset;

        // rotation is authored in un-flipped space, so mirror it when facing left
        const lx = look.current.x * facing.current;
        const rotZ = clamp(lx * 22, -22, 22);
        const rotX = clamp(-look.current.y * 16, -16, 16);
        head.style.transform = `perspective(320px) translate(${lx * 5}px, ${
          look.current.y * 4
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
