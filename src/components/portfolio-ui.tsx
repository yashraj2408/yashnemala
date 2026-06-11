import { useEffect, useState, type ReactNode } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export function useTheme() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  useEffect(() => {
    const stored = (typeof localStorage !== "undefined" && localStorage.getItem("theme")) as
      | "dark"
      | "light"
      | null;
    const initial = stored ?? "dark";
    setTheme(initial);
  }, []);
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    if (typeof localStorage !== "undefined") localStorage.setItem("theme", theme);
  }, [theme]);
  return { theme, toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")) };
}

export function Reveal({
  children,
  delay = 0,
  y = 40,
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
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
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
      className="fixed left-0 top-0 z-[60] h-[3px] w-full origin-left bg-gradient-to-r from-primary to-accent"
    />
  );
}

export function MagneticButton({
  children,
  href,
  variant = "primary",
  onClick,
}: {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "ghost";
  onClick?: () => void;
}) {
  const base =
    "group relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-all duration-300 will-change-transform";
  const styles =
    variant === "primary"
      ? "bg-primary text-primary-foreground hover:shadow-[0_0_40px_-5px_var(--color-primary)] hover:-translate-y-0.5"
      : "glass border border-border text-foreground hover:-translate-y-0.5 hover:border-primary/50";
  const cls = `${base} ${styles}`;
  if (href)
    return (
      <a href={href} className={cls} onClick={onClick}>
        {children}
      </a>
    );
  return (
    <button className={cls} onClick={onClick}>
      {children}
    </button>
  );
}

export function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <Reveal>
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
        {eyebrow}
      </p>
      <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
        {title}
      </h2>
    </Reveal>
  );
}
