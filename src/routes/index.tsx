import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import profile from "@/assets/profile-new.png";
import {
  PillButton,
  Reveal,
  ScrollProgress,
  SectionHeading,
} from "@/components/portfolio-ui";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nemala Yash Raj — Agentforce Developer & Future AI Engineer" },
      {
        name: "description",
        content:
          "Portfolio of Nemala Yash Raj — Agentforce Developer Intern at Appstrail, Salesforce enthusiast and aspiring AI engineer building intelligent enterprise systems.",
      },
      { property: "og:title", content: "Nemala Yash Raj — Future AI Engineer" },
      {
        property: "og:description",
        content: "Agentforce Developer • Salesforce Enthusiast • AI Engineer",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Portfolio,
});

const NAV = [
  ["About", "#about"],
  ["Journey", "#journey"],
  ["Skills", "#skills"],
  ["Projects", "#projects"],
  ["Contact", "#contact"],
];

const SOCIALS = [
  ["LinkedIn", "https://www.linkedin.com/in/yash-nemala-8bbb2028a/"],
  ["GitHub", "https://github.com/yashraj2408"],
  ["X", "https://x.com/home"],
  ["Instagram", "https://www.instagram.com/yash_nemala/"],
];

/* ---------------- Tile wrapper ---------------- */
function Tile({
  id,
  tone = "white",
  children,
}: {
  id?: string;
  tone?: "white" | "parchment" | "dark" | "dark-2";
  children: React.ReactNode;
}) {
  const bg =
    tone === "white"
      ? "bg-background text-foreground"
      : tone === "parchment"
        ? "bg-parchment text-foreground"
        : tone === "dark-2"
          ? "bg-tile-dark-2 text-white"
          : "bg-tile-dark text-white";
  return (
    <section id={id} className={`${bg} px-6 py-20 sm:py-[80px]`}>
      <div className="mx-auto max-w-[1080px]">{children}</div>
    </section>
  );
}

function Portfolio() {
  return (
    <div className="relative overflow-x-clip">
      <ScrollProgress />
      <Nav />
      <Hero />
      <Marquee />
      <About />
      <Education />
      <Experience />
      <Skills />
      <Services />
      <Projects />
      <Learning />
      <ResumeCTA />
      <Contact />
      <Footer />
    </div>
  );
}

/* ---------------- Nav ---------------- */
function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* global nav */}
      <div className="bg-black text-white">
        <div className="mx-auto flex h-11 max-w-[1080px] items-center justify-between px-6">
          <a href="#top" className="text-[14px] font-semibold tracking-tight">
            Yash Raj
          </a>
          <nav className="hidden items-center gap-7 md:flex">
            {NAV.map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="text-[12px] text-white/85 transition-colors hover:text-white"
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="rounded-sm bg-[#1d1d1f] px-[15px] py-[6px] text-[12px] text-white"
            >
              Contact
            </a>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Menu"
              className="text-lg leading-none md:hidden"
            >
              {open ? "✕" : "≡"}
            </button>
          </div>
        </div>
      </div>
      {/* sub-nav frosted */}
      <div className="glass border-b border-hairline/60">
        <div className="mx-auto flex h-[52px] max-w-[1080px] items-center justify-between px-6">
          <span className="text-[21px] font-semibold tracking-tight">Portfolio</span>
          <div className="hidden items-center gap-6 md:flex">
            <span className="text-[14px] text-muted-foreground">
              Agentforce Developer · Future AI Engineer
            </span>
            <PillButton href="#resume">Resume</PillButton>
          </div>
        </div>
      </div>
      {open && (
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-6 mt-2 flex flex-col gap-1 rounded-lg border border-hairline bg-white p-3 shadow-product md:hidden"
        >
          {NAV.map(([label, href]) => (
            <a
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className="rounded-sm px-3 py-2 text-[17px] hover:bg-parchment"
            >
              {label}
            </a>
          ))}
        </motion.nav>
      )}
    </header>
  );
}

/* ---------------- Hero ---------------- */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yImg = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section
      id="top"
      ref={ref}
      className="flex min-h-screen flex-col items-center justify-center bg-background px-6 pt-32 pb-20 text-center"
    >
      <Reveal>
        <p className="text-[19px] font-semibold text-primary">Nemala Yash Raj</p>
      </Reveal>
      <Reveal delay={0.05}>
        <h1 className="apple-tight mt-3 font-display text-[clamp(40px,9vw,72px)] font-semibold leading-[1.05] text-foreground">
          Building the future
          <br />
          of enterprise AI.
        </h1>
      </Reveal>
      <Reveal delay={0.12}>
        <p className="mx-auto mt-5 max-w-2xl text-[21px] font-normal text-muted-foreground">
          Agentforce Developer · Salesforce Enthusiast · Future AI Engineer
        </p>
      </Reveal>
      <Reveal delay={0.18}>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
          <PillButton href="#about">Learn more</PillButton>
          <PillButton href="#contact" variant="ghost">
            Get in touch
          </PillButton>
        </div>
      </Reveal>

      <Reveal delay={0.24}>
        <motion.div style={{ y: yImg }} className="mt-14 w-[78%] max-w-[420px]">
          <img
            src={profile}
            alt="Nemala Yash Raj"
            width={896}
            height={1152}
            className="aspect-[4/5] w-full rounded-lg object-cover object-top shadow-product"
          />
        </motion.div>
      </Reveal>
    </section>
  );
}

/* ---------------- Marquee ---------------- */
function Marquee() {
  const words = [
    "Agentforce",
    "Salesforce",
    "Machine Learning",
    "LLMs",
    "Computer Vision",
    "LangChain",
    "RAG",
    "Deep Learning",
  ];
  const row = [...words, ...words];
  return (
    <div className="overflow-hidden border-y border-hairline bg-parchment py-6">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
        {row.map((w, i) => (
          <span key={i} className="text-[21px] font-semibold tracking-tight text-foreground/80">
            {w} <span className="px-4 text-primary">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------- About ---------------- */
function About() {
  const interests = [
    "Solving mathematics problems",
    "Learning new technologies",
    "Collecting coins worldwide",
    "Watching movies",
    "Anime enthusiast",
  ];
  const traits = ["Curious learner", "Analytical thinker", "Adaptable", "Passion-driven", "Growth-oriented"];
  return (
    <Tile id="about" tone="white">
      <SectionHeading eyebrow="About Me" title="An authentic, human story." />
      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        <Reveal>
          <div className="h-full rounded-lg border border-hairline p-6">
            <h3 className="text-[21px] font-semibold">Professional Summary</h3>
            <p className="mt-3 text-[17px] leading-[1.47] text-muted-foreground">
              Working professional currently serving as an Agentforce Developer Intern at Appstrail.
              Passionate about artificial intelligence and continuously exploring technologies that
              shape the future.
            </p>
            <h3 className="mt-7 text-[21px] font-semibold">Career Goal</h3>
            <p className="mt-3 text-[17px] leading-[1.47] text-muted-foreground">
              To grow professionally in AI-related fields and contribute to impactful innovations
              that transform industries.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="h-full rounded-lg border border-hairline p-6">
            <h3 className="text-[21px] font-semibold">Personal Interests</h3>
            <ul className="mt-4 space-y-3">
              {interests.map((t) => (
                <li key={t} className="flex items-center gap-3 text-[17px] text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="h-full rounded-lg border border-hairline bg-parchment p-6">
            <h3 className="text-[21px] font-semibold">Personality</h3>
            <div className="mt-5 flex flex-wrap gap-2">
              {traits.map((t) => (
                <span
                  key={t}
                  className="rounded-pill border border-hairline bg-white px-4 py-2 text-[14px]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Tile>
  );
}

/* ---------------- Education ---------------- */
function TimelineItem({
  title,
  sub,
  period,
  body,
  last,
}: {
  title: string;
  sub: string;
  period: string;
  body?: string;
  last?: boolean;
}) {
  return (
    <Reveal>
      <div className="relative pl-10">
        <span className="absolute left-0 top-1 grid h-6 w-6 place-items-center rounded-full bg-primary text-[11px] text-white">
          ◆
        </span>
        {!last && <span className="absolute left-[11px] top-8 h-full w-px bg-hairline" />}
        <div className="pb-10">
          <p className="text-[14px] font-semibold text-primary">{period}</p>
          <h3 className="mt-1 text-[21px] font-semibold">{title}</h3>
          <p className="text-[17px] text-muted-foreground">{sub}</p>
          {body && (
            <p className="mt-3 max-w-2xl text-[17px] leading-[1.47] text-muted-foreground">{body}</p>
          )}
        </div>
      </div>
    </Reveal>
  );
}

function Education() {
  return (
    <Tile id="education" tone="parchment">
      <SectionHeading eyebrow="Education" title="The learning timeline." />
      <div className="mx-auto mt-14 max-w-3xl">
        <TimelineItem
          period="2019 – 2020"
          title="A.A.N.M & V.V.R.S.R EM High School"
          sub="Schooling • Gudlavalleru"
        />
        <TimelineItem
          period="2020 – 2022"
          title="Narayana Junior College"
          sub="Intermediate • Gudivada"
        />
        <TimelineItem
          period="2022 – 2026"
          title="KL University"
          sub="B.Tech in Computer Science Engineering (AI specialization)"
          body="Graduated while pursuing internship experience — balancing academics with real-world enterprise development."
          last
        />
      </div>
    </Tile>
  );
}

/* ---------------- Experience ---------------- */
function Experience() {
  const resp = [
    "Agentforce development",
    "Salesforce CRM solutions",
    "Enterprise workflow automation",
    "AI-powered customer experiences",
    "Building intelligent agents",
  ];
  return (
    <Tile id="journey" tone="dark">
      <SectionHeading eyebrow="Professional Journey" title="Executive experience." onDark />
      <Reveal>
        <div className="mt-14 grid gap-10 rounded-lg border border-white/10 p-8 md:grid-cols-2 md:p-12">
          <div>
            <p className="text-[14px] font-semibold text-primary-on-dark">
              Joined 23 February 2026
            </p>
            <h3 className="mt-2 text-[34px] font-semibold text-white">Appstrail</h3>
            <p className="mt-1 text-[21px] text-white/70">Agentforce Developer Intern</p>
            <p className="mt-6 text-[17px] leading-[1.47] text-white/70">
              Working with Salesforce CRM and Agentforce technologies to help organizations build
              autonomous AI agents capable of securely connecting to enterprise data, understanding
              customer intent, and executing complex workflows with minimal human intervention.
            </p>
          </div>
          <div className="md:border-l md:border-white/10 md:pl-10">
            <p className="mb-4 text-[14px] font-semibold uppercase tracking-widest text-white/50">
              Responsibilities
            </p>
            <ul className="space-y-3">
              {resp.map((r) => (
                <li key={r} className="flex items-center gap-3 text-[17px] text-white/85">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-primary-on-dark/15 text-xs text-primary-on-dark">
                    ✓
                  </span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </Tile>
  );
}

/* ---------------- Skills ---------------- */
function Skills() {
  const groups: [string, string[]][] = [
    ["Programming", ["Java", "Python", "C", "SQL"]],
    ["Frontend", ["React"]],
    ["Databases", ["MongoDB", "SQL"]],
    ["Salesforce", ["Agentforce", "Lightning Web Components", "Apex", "SOQL"]],
    [
      "Artificial Intelligence",
      [
        "Machine Learning",
        "Deep Learning",
        "Neural Networks",
        "Computer Vision",
        "Speech Processing",
        "RAG",
        "LLMs",
        "LangChain",
      ],
    ],
    ["Soft Skills", ["Problem Solving", "Continuous Learning", "Adaptability", "Innovation Mindset"]],
  ];
  return (
    <Tile id="skills" tone="white">
      <SectionHeading eyebrow="Skills & Expertise" title="The technical toolkit." />
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map(([title, items], i) => (
          <Reveal key={title} delay={(i % 3) * 0.08}>
            <div className="h-full rounded-lg border border-hairline p-6">
              <h3 className="text-[19px] font-semibold">{title}</h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {items.map((s) => (
                  <span
                    key={s}
                    className="rounded-pill border border-hairline bg-parchment px-3 py-1.5 text-[14px]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Tile>
  );
}

/* ---------------- Services ---------------- */
function Services() {
  const services = [
    ["Salesforce Development", "Customization & configuration tailored to enterprise needs."],
    ["Agentforce AI Agents", "Autonomous agents that act on enterprise data securely."],
    ["AI / ML Solutions", "End-to-end machine learning models and pipelines."],
    ["RAG & LLM Apps", "Retrieval-augmented generation for grounded intelligence."],
    ["LangChain Applications", "Composable AI workflows and orchestration."],
    ["Computer Vision", "Image classification, detection & visual intelligence."],
  ];
  return (
    <Tile id="services" tone="parchment">
      <SectionHeading eyebrow="Services" title="What I can build for you." />
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map(([t, d], i) => (
          <Reveal key={t} delay={(i % 3) * 0.08}>
            <div className="h-full rounded-lg border border-hairline bg-white p-6">
              <span className="text-[28px] font-semibold text-primary">0{i + 1}</span>
              <h3 className="mt-3 text-[19px] font-semibold">{t}</h3>
              <p className="mt-2 text-[17px] leading-[1.47] text-muted-foreground">{d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Tile>
  );
}

/* ---------------- Projects ---------------- */
function Projects() {
  const projects = [
    [
      "Tomato Leaf Disease Prediction",
      "An intelligent agricultural disease detection system using computer vision and deep learning.",
      ["Python", "Deep Learning", "Computer Vision"],
    ],
    [
      "Sonar Classification",
      "A machine learning model that classifies sonar signals to identify object categories.",
      ["Python", "Machine Learning"],
    ],
    [
      "Vehicle Classification",
      "A computer vision system that identifies and classifies vehicle types in real time.",
      ["Python", "Deep Learning", "Computer Vision"],
    ],
  ] as [string, string, string[]][];
  return (
    <Tile id="projects" tone="white">
      <SectionHeading eyebrow="Projects" title="Selected work." />
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {projects.map(([t, d, tags], i) => (
          <Reveal key={t} delay={i * 0.1}>
            <div className="flex h-full flex-col overflow-hidden rounded-lg border border-hairline">
              <div className="relative aspect-[16/10] bg-parchment">
                <div className="absolute inset-0 grid place-items-center">
                  <span className="text-[56px] font-semibold text-foreground/10">0{i + 1}</span>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-[19px] font-semibold">{t}</h3>
                <p className="mt-2 flex-1 text-[17px] leading-[1.47] text-muted-foreground">{d}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-pill border border-hairline px-3 py-1 text-[12px] text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.2}>
        <div className="mt-10 rounded-lg border border-dashed border-hairline p-10 text-center">
          <h3 className="text-[24px] font-semibold">More Innovations Coming Soon</h3>
          <p className="mt-2 text-[17px] text-muted-foreground">
            Continuously building — bigger AI experiences are on the way.
          </p>
        </div>
      </Reveal>
    </Tile>
  );
}

/* ---------------- Learning ---------------- */
function Learning() {
  const items = [
    "Advanced Agentforce Capabilities",
    "Enterprise AI Systems",
    "Advanced LLM Architectures",
    "Retrieval-Augmented Generation",
    "LangChain Ecosystems",
    "Emerging AI Trends",
  ];
  return (
    <Tile tone="dark-2">
      <SectionHeading eyebrow="Currently Exploring" title="Always learning." onDark />
      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((t, i) => (
          <Reveal key={t} delay={(i % 3) * 0.08}>
            <div className="flex items-center gap-4 rounded-lg border border-white/10 p-5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary-on-dark/15 text-primary-on-dark">
                {i + 1}
              </span>
              <span className="text-[17px] text-white/90">{t}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </Tile>
  );
}

/* ---------------- Resume CTA ---------------- */
function ResumeCTA() {
  return (
    <Tile id="resume" tone="parchment">
      <Reveal>
        <div className="py-10 text-center">
          <h2 className="apple-tight font-display text-[40px] font-semibold sm:text-[48px]">
            Get my resume
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[21px] text-muted-foreground">
            Explore my journey, achievements, and technical expertise.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <PillButton href="#contact">Download Resume</PillButton>
            <PillButton href="#projects" variant="ghost">
              View projects
            </PillButton>
          </div>
        </div>
      </Reveal>
    </Tile>
  );
}

/* ---------------- Contact ---------------- */
function Contact() {
  const [sent, setSent] = useState(false);
  const info = [
    ["Email", "yashrajnemala@gmail.com", "mailto:yashrajnemala@gmail.com"],
    ["Phone", "+91 7997244791", "tel:+917997244791"],
    ["Location", "India", undefined],
  ] as [string, string, string?][];
  return (
    <Tile id="contact" tone="white">
      <SectionHeading eyebrow="Contact" title="Let's build together." />
      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        <Reveal>
          <div className="space-y-4">
            {info.map(([label, value, href]) => (
              <div key={label} className="rounded-lg border border-hairline p-6">
                <p className="text-[14px] font-semibold text-primary">{label}</p>
                {href ? (
                  <a href={href} className="mt-1 block text-[19px] hover:text-primary">
                    {value}
                  </a>
                ) : (
                  <p className="mt-1 text-[19px]">{value}</p>
                )}
              </div>
            ))}
            <div className="flex flex-wrap gap-3 pt-2">
              {SOCIALS.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-pill border border-hairline px-5 py-2.5 text-[14px] transition-colors hover:border-primary hover:text-primary"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="rounded-lg border border-hairline p-8"
          >
            <div className="grid gap-4">
              <input
                required
                placeholder="Your name"
                className="rounded-md border border-hairline bg-white px-4 py-3 text-[17px] outline-none focus:border-primary"
              />
              <input
                required
                type="email"
                placeholder="Your email"
                className="rounded-md border border-hairline bg-white px-4 py-3 text-[17px] outline-none focus:border-primary"
              />
              <textarea
                required
                rows={4}
                placeholder="Your message"
                className="resize-none rounded-md border border-hairline bg-white px-4 py-3 text-[17px] outline-none focus:border-primary"
              />
              <PillButton type="submit">{sent ? "Message sent ✓" : "Send message"}</PillButton>
            </div>
          </form>
        </Reveal>
      </div>
    </Tile>
  );
}

/* ---------------- Footer ---------------- */
function Footer() {
  return (
    <footer className="bg-parchment">
      <div className="mx-auto max-w-[1080px] px-6 py-16">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[24px] font-semibold">
              Nemala Yash Raj<span className="text-primary">.</span>
            </p>
            <p className="mt-2 max-w-sm text-[17px] text-muted-foreground">
              Building intelligent experiences for tomorrow.
            </p>
          </div>
          <div className="flex flex-col gap-4 md:items-end">
            <nav className="flex flex-wrap gap-5 text-[14px] text-muted-foreground">
              {NAV.map(([label, href]) => (
                <a key={label} href={href} className="hover:text-foreground">
                  {label}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-5">
              {SOCIALS.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[14px] text-muted-foreground hover:text-primary"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-hairline pt-6 text-[12px] text-muted-foreground">
          © {new Date().getFullYear()} Nemala Yash Raj. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
