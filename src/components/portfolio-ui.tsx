import { useEffect, useState, type ReactNode } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export function useTheme() {
  const [theme, setTheme] = useState<"dark" | "light">("light");
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark");
  }, []);
  return { theme, toggle: () => setTheme((t) => t) };
}

export function Reveal({
  children,
  delay = 0,
  y = 24,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[60] h-[2px] w-full origin-left bg-primary"
    />
  );
}

/* Apple pill CTA. variant: primary (filled blue), ghost (blue outline) */
export function PillButton({
  children,
  href,
  variant = "primary",
  onDark = false,
  onClick,
  type,
}: {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "ghost";
  onDark?: boolean;
  onClick?: () => void;
  type?: "submit" | "button";
}) {
  const base =
    "inline-flex items-center justify-center rounded-pill px-[22px] py-[11px] text-[17px] font-normal transition-transform duration-150 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-focus";
  const styles =
    variant === "primary"
      ? "bg-primary text-primary-foreground hover:bg-[#0077ed]"
      : onDark
        ? "border border-primary-on-dark text-primary-on-dark hover:bg-primary-on-dark/10"
        : "border border-primary text-primary hover:bg-primary/5";
  const cls = `${base} ${styles}`;
  if (href)
    return (
      <a href={href} className={cls} onClick={onClick}>
        {children}
      </a>
    );
  return (
    <button type={type} className={cls} onClick={onClick}>
      {children}
    </button>
  );
}

/* Backwards-compatible alias */
export const MagneticButton = PillButton;

export function SectionHeading({
  eyebrow,
  title,
  onDark = false,
  center = true,
}: {
  eyebrow?: string;
  title: string;
  onDark?: boolean;
  center?: boolean;
}) {
  return (
    <Reveal>
      <div className={center ? "text-center" : ""}>
        {eyebrow && (
          <p
            className={`mb-3 text-[19px] font-semibold ${
              onDark ? "text-primary-on-dark" : "text-primary"
            }`}
          >
            {eyebrow}
          </p>
        )}
        <h2
          className={`apple-tight font-display text-[40px] font-semibold leading-[1.1] sm:text-[48px] ${
            onDark ? "text-white" : "text-foreground"
          }`}
        >
          {title}
        </h2>
      </div>
    </Reveal>
  );
}
