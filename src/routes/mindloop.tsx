import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, type MotionProps } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";

import Hls from "hls.js";

import avatar1 from "../assets/avatar-1.jpg";
import avatar2 from "../assets/avatar-2.jpg";
import avatar3 from "../assets/avatar-3.jpg";

export const Route = createFileRoute("/mindloop")({
  head: () => ({
    meta: [
      { title: "Mindloop — Get inspired with us" },
      {
        name: "description",
        content:
          "Mindloop is a newsletter and content platform where curiosity meets clarity — depth for readers, reach for writers.",
      },
      { property: "og:title", content: "Mindloop — Get inspired with us" },
      {
        property: "og:description",
        content: "Depth for readers, reach for writers. Join 7,000+ subscribers.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MindloopPage,
});

const VIDEO_HERO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_120549_0cd82c36-56b3-4dd9-b190-069cfc3a623f.mp4";
const VIDEO_MISSION =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_132944_a0d124bb-eaa1-4082-aa30-2310efb42b4b.mp4";
const VIDEO_SOLUTION =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_125119_8e5ae31c-0021-4396-bc08-f7aebeb877a2.mp4";
const HLS_CTA = "https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8";

const fadeUp = (delay: number): MotionProps => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, delay, ease: "easeOut" },
});

function Logo({ size = "sm" }: { size?: "sm" | "lg" }) {
  const outer = size === "lg" ? "w-10 h-10" : "w-7 h-7";
  const inner = size === "lg" ? "w-5 h-5" : "w-3 h-3";
  return (
    <div
      className={`${outer} rounded-full border-2 border-white/60 flex items-center justify-center`}
    >
      <div className={`${inner} rounded-full border border-white/60`} />
    </div>
  );
}

function GlassIconButton({ children, label }: { children: ReactNode; label: string }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="liquid-glass w-10 h-10 rounded-full flex items-center justify-center text-white/80 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
    >
      {children}
    </a>
  );
}

function Navbar() {
  const links = ["Home", "How It Works", "Philosophy", "Use Cases"];
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-8 md:px-28 py-4 flex items-center justify-between">
      <a href="#" className="flex items-center gap-2 text-white font-bold">
        <Logo />
        <span>Mindloop</span>
      </a>
      <div className="hidden md:flex items-center gap-2 text-sm">
        {links.map((l, i) => (
          <span key={l} className="flex items-center gap-2">
            <a
              href="#"
              className="text-white/60 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
            >
              {l}
            </a>
            {i < links.length - 1 && <span className="text-white/30">•</span>}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <GlassIconButton label="Instagram">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
        </GlassIconButton>
        <GlassIconButton label="LinkedIn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1V21H18.6v-5.4c0-1.29-.02-2.94-1.8-2.94-1.8 0-2.08 1.4-2.08 2.85V21H10z"/></svg>
        </GlassIconButton>
        <GlassIconButton label="Twitter">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 3H22l-7.5 8.6L23 21h-6.9l-5.4-6.4L4.5 21H1.4l8-9.2L1 3h7l4.9 6zm-1.2 16h1.7L7.4 4.9H5.6z"/></svg>
        </GlassIconButton>
      </div>
    </nav>
  );
}

function Hero() {
  const avatars = [avatar1, avatar2, avatar3];
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-black">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src={VIDEO_HERO}
      />
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black to-transparent z-[1]" />
      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-28 md:pt-32 pb-24">
        <motion.div
          {...fadeUp(0.05)}
          className="flex items-center gap-3 mb-8"
        >
          <div className="flex -space-x-2">
            {avatars.map((a, i) => (
              <img
                key={i}
                src={a}
                alt=""
                width={32}
                height={32}
                loading="lazy"
                className="w-8 h-8 rounded-full border-2 border-black object-cover"
              />
            ))}
          </div>
          <span className="text-white/60 text-sm">7,000+ people already subscribed</span>
        </motion.div>
        <motion.h1
          {...fadeUp(0.15)}
          className="text-white text-5xl md:text-7xl lg:text-8xl font-medium tracking-[-2px] max-w-5xl leading-[1.05]"
        >
          Get <span className="font-instrument italic font-normal">Inspired</span> with Us
        </motion.h1>
        <motion.p
          {...fadeUp(0.25)}
          className="mt-6 text-lg max-w-2xl"
          style={{ color: "hsl(210 17% 95%)" }}
        >
          Join our feed for meaningful updates, news around technology and a shared journey toward
          depth and direction.
        </motion.p>
        <motion.form
          {...fadeUp(0.35)}
          onSubmit={(e) => e.preventDefault()}
          className="liquid-glass rounded-full p-2 mt-8 max-w-lg w-full flex items-center gap-2"
        >
          <label htmlFor="ml-email" className="sr-only">
            Email address
          </label>
          <input
            id="ml-email"
            type="email"
            required
            placeholder="Enter your email"
            className="flex-1 bg-transparent px-4 py-3 text-white placeholder:text-white/40 outline-none focus-visible:ring-0"
          />
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="bg-white text-black rounded-full px-8 py-3 text-sm font-semibold uppercase tracking-wider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            Subscribe
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}

function IconChatGPT() {
  return (
    <div className="w-[200px] h-[200px] rounded-3xl bg-white/[0.03] border border-white/10 flex items-center justify-center">
      <svg viewBox="0 0 24 24" width="88" height="88" fill="none" stroke="white" strokeWidth="1.2">
        <path d="M12 2c2.5 0 4.6 1.7 5.3 4 2.3.7 4 2.8 4 5.3 0 1.5-.6 2.9-1.7 3.9.2 2.4-1.5 4.6-3.9 4.9-1 1-2.4 1.6-3.9 1.6-2.5 0-4.6-1.7-5.3-4-2.3-.7-4-2.8-4-5.3 0-1.5.6-2.9 1.7-3.9-.2-2.4 1.5-4.6 3.9-4.9C9.1 2.6 10.5 2 12 2z" />
      </svg>
    </div>
  );
}
function IconPerplexity() {
  return (
    <div className="w-[200px] h-[200px] rounded-3xl bg-white/[0.03] border border-white/10 flex items-center justify-center">
      <svg viewBox="0 0 24 24" width="88" height="88" fill="none" stroke="white" strokeWidth="1.3">
        <path d="M12 3v18M4 7l16 10M4 17L20 7M3 12h18" />
      </svg>
    </div>
  );
}
function IconGoogle() {
  return (
    <div className="w-[200px] h-[200px] rounded-3xl bg-white/[0.03] border border-white/10 flex items-center justify-center">
      <svg viewBox="0 0 24 24" width="88" height="88" fill="none" stroke="white" strokeWidth="1.3">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a13 13 0 0 1 0 18M12 3a13 13 0 0 0 0 18" />
      </svg>
    </div>
  );
}

function SearchChanged() {
  const cards = [
    {
      icon: <IconChatGPT />,
      name: "ChatGPT",
      desc: "Users ask conversational questions and expect trusted, contextual answers back.",
    },
    {
      icon: <IconPerplexity />,
      name: "Perplexity",
      desc: "Cites sources directly — creators with clarity get pulled into the answer.",
    },
    {
      icon: <IconGoogle />,
      name: "Google AI",
      desc: "AI summaries surface first — presence in the answer layer defines discovery.",
    },
  ];
  return (
    <section className="px-6 md:px-24 pt-52 md:pt-64 pb-6 md:pb-9 text-center">
      <motion.h2
        {...fadeUp(0)}
        className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-[-2px] text-white max-w-5xl mx-auto leading-[1.05]"
      >
        Search has <span className="font-instrument italic font-normal">changed.</span> Have you?
      </motion.h2>
      <motion.p
        {...fadeUp(0.1)}
        className="text-white/60 text-lg max-w-2xl mx-auto mt-6 mb-24"
      >
        Attention has moved from lists of links to answers built in real time. Where your ideas
        live now decides whether they're found at all.
      </motion.p>
      <div className="grid md:grid-cols-3 gap-12 md:gap-8 mb-20 max-w-5xl mx-auto">
        {cards.map((c, i) => (
          <motion.div key={c.name} {...fadeUp(0.1 + i * 0.1)} className="flex flex-col items-center gap-5">
            {c.icon}
            <div>
              <h3 className="font-semibold text-base text-white">{c.name}</h3>
              <p className="text-white/60 text-sm mt-2 max-w-[240px] mx-auto">{c.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.p {...fadeUp(0.2)} className="text-white/60 text-sm">
        If you don't answer the questions, someone else will.
      </motion.p>
    </section>
  );
}

function ScrollWords({
  text,
  className,
  highlight = [],
}: {
  text: string;
  className: string;
  highlight?: string[];
}) {
  const ref = useRef<HTMLParagraphElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.25"],
  });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);
        const isHi = highlight.includes(w.replace(/[^a-zA-Z]/g, ""));
        return (
          <motion.span
            key={i}
            style={{ opacity, color: isHi ? "hsl(0 0% 100%)" : "hsl(210 17% 95%)" }}
            className="inline-block mr-[0.25em]"
          >
            {w}
          </motion.span>
        );
      })}
    </p>
  );
}

function Mission() {
  return (
    <section className="px-6 md:px-24 pt-0 pb-32 md:pb-44">
      <div className="max-w-[800px] mx-auto flex justify-center mb-16">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full max-w-[800px] aspect-square object-cover rounded-3xl"
          src={VIDEO_MISSION}
        />
      </div>
      <div className="max-w-5xl mx-auto">
        <ScrollWords
          text="We're building a space where curiosity meets clarity — where readers find depth, writers find reach, and every newsletter becomes a conversation worth having."
          className="text-2xl md:text-4xl lg:text-5xl font-medium tracking-[-1px] leading-tight"
          highlight={["curiosity", "meets", "clarity"]}
        />
        <div className="mt-10">
          <ScrollWords
            text="A platform where content, community, and insight flow together — with less noise, less friction, and more meaning for everyone involved."
            className="text-xl md:text-2xl lg:text-3xl font-medium leading-snug"
          />
        </div>
      </div>
    </section>
  );
}

function Solution() {
  const feats = [
    { t: "Curated Feed", d: "Signal-first reading — no algorithmic churn, no bait." },
    { t: "Writer Tools", d: "Draft, publish and grow with a calm, focused editor." },
    { t: "Community", d: "Threaded conversations that reward depth over volume." },
    { t: "Distribution", d: "Reach subscribers where they actually read." },
  ];
  return (
    <section className="px-6 md:px-24 py-32 md:py-44 border-t border-white/20">
      <motion.p
        {...fadeUp(0)}
        className="text-xs tracking-[3px] uppercase text-white/60 text-center"
      >
        Solution
      </motion.p>
      <motion.h2
        {...fadeUp(0.05)}
        className="text-4xl md:text-6xl text-white text-center max-w-4xl mx-auto mt-4 leading-tight"
      >
        The platform for <span className="font-instrument italic">meaningful</span> content
      </motion.h2>
      <motion.div {...fadeUp(0.1)} className="mt-14 max-w-6xl mx-auto">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full rounded-2xl aspect-[3/1] object-cover"
          src={VIDEO_SOLUTION}
        />
      </motion.div>
      <div className="grid md:grid-cols-4 gap-8 mt-16 max-w-6xl mx-auto">
        {feats.map((f, i) => (
          <motion.div key={f.t} {...fadeUp(0.1 + i * 0.05)}>
            <h3 className="font-semibold text-base text-white">{f.t}</h3>
            <p className="text-white/60 text-sm mt-2">{f.d}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function CtaSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(HLS_CTA);
      hls.attachMedia(video);
      return () => hls.destroy();
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = HLS_CTA;
    }
  }, []);
  return (
    <section className="relative py-32 md:py-44 border-t border-white/20 overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0 bg-black/45 z-[1]" />
      <div className="relative z-10 text-center px-6 flex flex-col items-center">
        <motion.div {...fadeUp(0)}>
          <Logo size="lg" />
        </motion.div>
        <motion.h2
          {...fadeUp(0.05)}
          className="text-5xl md:text-7xl font-medium text-white mt-6 tracking-[-1.5px]"
        >
          Start Your <span className="font-instrument italic">Journey</span>
        </motion.h2>
        <motion.p {...fadeUp(0.1)} className="text-white/60 text-lg mt-6 max-w-xl">
          Subscribe for weekly signal, or start writing and reach readers who actually finish the
          piece.
        </motion.p>
        <motion.div {...fadeUp(0.15)} className="flex flex-wrap justify-center gap-3 mt-8">
          <button className="bg-white text-black rounded-lg px-8 py-3.5 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black hover:bg-white/90 transition-colors">
            Subscribe Now
          </button>
          <button className="liquid-glass rounded-lg px-8 py-3.5 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black">
            Start Writing
          </button>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 px-8 md:px-28 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/10">
      <p className="text-white/60 text-sm">© 2026 Mindloop. All rights reserved.</p>
      <div className="flex items-center gap-6 text-sm">
        {["Privacy", "Terms", "Contact"].map((l) => (
          <a
            key={l}
            href="#"
            className="text-white/60 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
          >
            {l}
          </a>
        ))}
      </div>
    </footer>
  );
}

function MindloopPage() {
  return (
    <main
      className="bg-black text-white min-h-screen antialiased selection:bg-white selection:text-black"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <Navbar />
      <Hero />
      <SearchChanged />
      <Mission />
      <Solution />
      <CtaSection />
      <Footer />
    </main>
  );
}
