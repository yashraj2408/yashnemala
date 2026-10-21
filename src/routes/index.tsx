import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import profile from "@/assets/profile-new.png";
import {
  MagneticButton,
  Reveal,
  ScrollProgress,
  SectionHeading,
  useTheme,
} from "@/components/portfolio-ui";
import { ChatWidget } from "@/components/chat-widget";
import { CursorMascot } from "@/components/cursor-mascot";

const resumeUrl = "/Nemala_Yash_Raj_Resume.pdf";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nemala Yash Raj — Backend & AI Engineer | Agentforce & LLM Systems" },
      {
        name: "description",
        content:
          "Portfolio of Nemala Yash Raj — Backend and AI engineer building Python REST APIs, LLM-powered applications, RAG pipelines, and multi-agent workflows.",
      },
      { property: "og:title", content: "Nemala Yash Raj — Backend & AI Engineer" },
      {
        property: "og:description",
        content: "Backend & AI Engineer • Python REST APIs • Multi-Agent Workflows • LangChain & LangGraph",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://yashnemala.lovable.app/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://yashnemala.lovable.app/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Nemala Yash Raj",
          jobTitle: "Backend & AI Engineer",
          url: "https://yashnemala.lovable.app/",
          worksFor: { "@type": "Organization", name: "Appstrail Technologies" },
          alumniOf: { "@type": "CollegeOrUniversity", name: "KL University" },
          email: "mailto:yashrajnemala@gmail.com",
          knowsAbout: [
            "Python",
            "REST APIs",
            "Artificial Intelligence",
            "RAG Pipelines",
            "AI Agents",
            "LangChain",
            "LangGraph",
            "Multi-Agent Orchestration",
            "Agentforce",
            "PostgreSQL",
            "Docker",
            "AWS",
            "Apex",
          ],
          sameAs: [
            "https://www.linkedin.com/in/yash-nemala-8bbb2028a/",
            "https://github.com/yashraj2408",
          ],
        }),
      },
    ],
  }),

  component: Portfolio,
});

const NAV = [
  ["About", "#about"],
  ["Education", "#education"],
  ["Experience", "#journey"],
  ["Skills", "#skills"],
  ["Projects", "#projects"],
  ["Publications", "#publications"],
  ["Certs", "#certifications"],
  ["Contact", "#contact"],
];

const SOCIALS = [
  ["LinkedIn", "https://www.linkedin.com/in/yash-nemala-8bbb2028a/"],
  ["GitHub", "https://github.com/yashraj2408"],
  ["X", "https://x.com/home"],
  ["Instagram", "https://www.instagram.com/yash_nemala/"],
];

function Portfolio() {
  const { theme, toggle } = useTheme();
  return (
    <div className="relative overflow-x-clip">
      <ScrollProgress />
      <Nav theme={theme} toggle={toggle} />
      <Hero theme={theme} toggle={toggle} />
      <Marquee />
      <About />
      <Education />
      <Experience />
      <Skills />
      <Projects />
      <Publications />
      <Certifications />
      <Services />
      <Learning />
      <ResumeCTA />
      <Contact />
      <Footer theme={theme} toggle={toggle} />
      <ChatWidget />
      <CursorMascot />
    </div>
  );
}

/* ---------------- Nav ---------------- */
function Nav({ theme, toggle }: { theme: string; toggle: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 sm:px-10">
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
          className="grid h-12 w-12 place-items-center rounded-full border border-foreground/25 bg-background/70 backdrop-blur transition-colors hover:bg-foreground hover:text-background"
        >
          <span className="text-lg leading-none">{open ? "✕" : "≡"}</span>
        </button>
        <div className="flex items-center gap-4">
          <ThemeToggle theme={theme} toggle={toggle} />
          <span className="font-display text-sm font-bold tracking-tight">©2026</span>
        </div>
      </div>
      {open && (
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-6 flex flex-col gap-1 rounded-2xl border border-border bg-card p-4 shadow-xl sm:mx-10 sm:max-w-xs"
        >
          {NAV.map(([label, href]) => (
            <a
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 font-display text-lg font-bold uppercase tracking-tight hover:bg-muted"
            >
              {label}
            </a>
          ))}
        </motion.nav>
      )}
    </header>
  );
}

function ThemeToggle({ theme, toggle }: { theme: string; toggle: () => void }) {
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="grid h-12 w-12 place-items-center rounded-full border border-foreground/25 transition-transform hover:scale-105"
    >
      <span className="text-base">{theme === "dark" ? "☀️" : "🌙"}</span>
    </button>
  );
}

/* ---------------- Hero ---------------- */
function Hero({ theme, toggle }: { theme: string; toggle: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  void theme;
  void toggle;

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-screen flex-col items-center justify-center px-6"
    >
      {/* top meta */}
      <Reveal>
        <div className="absolute inset-x-0 top-28 mx-auto flex max-w-[1600px] flex-wrap items-center justify-center gap-x-6 gap-y-2 px-6 text-center text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground sm:px-10">
          <span>Backend &amp; AI Engineer</span>
          <span className="hidden h-1 w-1 rounded-full bg-primary sm:inline-block" />
          <span>LLM &amp; Multi-Agent Systems</span>
        </div>
      </Reveal>

      {/* image-clipped name */}
      <div className="relative flex flex-col items-center">
        <motion.img
          src={profile}
          alt="Nemala Yash Raj"
          width={896}
          height={1152}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 0.22, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[clamp(220px,26vw,340px)] w-[clamp(130px,15vw,210px)] -translate-x-1/2 -translate-y-1/2 rounded-sm object-cover object-top shadow-2xl"
        />

        <Reveal y={50}>
          <h1
            className="hero-clip font-serif-display relative z-10 select-none text-center font-bold leading-[0.85] tracking-tight text-foreground text-[22vw] sm:text-[18vw] lg:text-[15vw]"
            style={{ backgroundImage: `url(${profile})` }}
          >
            <span aria-hidden="true">Yash&nbsp;Raj</span>
            <span className="sr-only">
              Nemala Yash Raj — Backend &amp; AI Engineer
            </span>
          </h1>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="relative z-10 mt-1 text-center font-serif-display text-3xl font-semibold tracking-tight text-primary sm:text-4xl lg:text-5xl">
            backend &amp; ai engineer
          </p>
        </Reveal>
      </div>

      {/* intro + CTAs */}
      <Reveal delay={0.25}>
        <div className="mt-10 flex max-w-xl flex-col items-center gap-5 text-center">
          <p className="text-base font-medium text-muted-foreground sm:text-lg">
            Hi, I'm <span className="font-bold text-foreground">Nemala Yash Raj</span> — building
            Python REST APIs and LLM-powered applications, with hands-on RAG pipelines, tool-calling agents, and multi-agent workflows.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <MagneticButton href={resumeUrl} download="Nemala_Yash_Raj_Resume.pdf">
              Resume ↓
            </MagneticButton>
            <MagneticButton href="#contact" variant="ghost">
              Contact
            </MagneticButton>
          </div>
        </div>
      </Reveal>

      {/* scroll cue */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ y: { repeat: Infinity, duration: 2 }, opacity: { delay: 0.4 } }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-xs font-semibold uppercase tracking-[0.4em] text-primary"
      >
        Scroll
      </motion.a>
    </section>
  );
}

/* ---------------- Marquee ---------------- */
function Marquee() {
  const words = [
    "Agentic RAG",
    "LangChain & LangGraph",
    "Python & REST APIs",
    "Agentforce",
    "Docker & CI/CD",
    "AWS Cloud",
    "Multi-Agent Systems",
    "PostgreSQL",
    "Spring Boot",
  ];
  const row = [...words, ...words];
  return (
    <div className="my-10 border-y border-border bg-primary py-4 text-primary-foreground">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
        {row.map((w, i) => (
          <span key={i} className="font-display text-2xl font-black uppercase tracking-tight">
            {w} <span className="px-4">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------- About ---------------- */
function About() {
  const traits = [
    "Curious learner",
    "System Designer",
    "Analytical thinker",
    "End-to-End Ownership",
    "Agile Collaborator",
  ];
  const interests = [
    "Solving mathematics problems",
    "Exploring multi-agent architectures",
    "Learning new technologies",
    "Collecting coins worldwide",
    "Anime enthusiast",
  ];
  return (
    <section id="about" className="mx-auto max-w-7xl px-6 py-28">
      <SectionHeading eyebrow="About Me" title="Engineering intelligent solutions." />
      <div className="mt-12 grid gap-8 lg:grid-cols-3">
        <Reveal>
          <div className="rounded-3xl border border-border bg-card p-8">
            <h3 className="font-display text-xl font-semibold">Professional Summary</h3>
            <p className="mt-4 text-muted-foreground">
              Backend and AI engineer building Python REST APIs and LLM-powered applications, with hands-on RAG pipelines, tool-calling agents, and multi-agent workflows (LangChain, LangGraph, Agentforce). Experienced with PostgreSQL, Docker, and AWS, and published in CI/CD for ML. Comfortable owning features end to end, from design and testing to production debugging in Agile teams.
            </p>
            <h3 className="mt-8 font-display text-xl font-semibold">Career Goal</h3>
            <p className="mt-4 text-muted-foreground">
              To engineer scalable backend services and autonomous agent architectures, leveraging cutting-edge LLMs and robust distributed systems to solve high-impact real-world problems.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="h-full rounded-3xl border border-border bg-card p-8">
            <h3 className="font-display text-xl font-semibold">Personal Interests</h3>
            <ul className="mt-4 space-y-3">
              {interests.map((t) => (
                <li key={t} className="flex items-center gap-3 text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="h-full rounded-3xl border border-border bg-gradient-to-br from-primary/15 to-accent/5 p-8">
            <h3 className="font-display text-xl font-semibold">Core Values &amp; Mindset</h3>
            <div className="mt-5 flex flex-wrap gap-2">
              {traits.map((t) => (
                <span
                  key={t}
                  className="rounded-full glass border border-border px-4 py-2 text-sm"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Education + Experience ---------------- */
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
        <span className="absolute left-0 top-1 grid h-7 w-7 place-items-center rounded-full bg-primary text-primary-foreground glow">
          ◆
        </span>
        {!last && <span className="absolute left-[13px] top-9 h-full w-px bg-border" />}
        <div className="pb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">{period}</p>
          <h3 className="mt-1 font-display text-xl font-semibold">{title}</h3>
          <p className="text-muted-foreground">{sub}</p>
          {body && <p className="mt-3 max-w-2xl text-sm text-muted-foreground">{body}</p>}
        </div>
      </div>
    </Reveal>
  );
}

function Education() {
  return (
    <section id="education" className="mx-auto max-w-7xl px-6 py-28">
      <SectionHeading eyebrow="Education" title="Academic foundation." />
      <div className="mt-14 max-w-3xl">
        <TimelineItem
          period="2020 – 2022"
          title="Narayana Junior College"
          sub="Intermediate (MPC) • Score: 757 / 1000"
          body="Strong grounding in Mathematics, Physics, and Chemistry."
        />
        <TimelineItem
          period="2022 – 2026"
          title="KL University"
          sub="B.Tech in Computer Science & Engineering — CGPA: 9.17 / 10"
          body="Specialization in Artificial Intelligence, backend development, and scalable cloud computing architectures."
          last
        />
      </div>
    </section>
  );
}

function Experience() {
  const resp = [
    "Built and debugged multi-step AI agent workflows (Agentforce) with tool calling, state management, and grounded external-system lookups to automate customer-facing processes in production.",
    "Designed and shipped REST APIs and backend services (Apex classes, triggers, handlers) that connect agents to business data, with test-class coverage and root cause analysis of production defects.",
    "Built Lightning Web Components on top of these services for internal tooling, owning features from requirements through testing and deployment.",
    "Worked in an Agile/Scrum team with peer code reviews, translating requirements into technical solutions through rapid design-test-deploy cycles.",
  ];
  return (
    <section id="journey" className="mx-auto max-w-7xl px-6 py-28">
      <SectionHeading eyebrow="Experience" title="Professional journey." />
      <Reveal>
        <div className="mt-12 grid gap-8 rounded-3xl border border-border bg-card p-8 md:grid-cols-2 md:p-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              Feb 2026 – Present • Bangalore, India
            </p>
            <h3 className="mt-2 font-display text-3xl font-bold">Appstrail Technologies</h3>
            <p className="mt-1 text-lg text-muted-foreground">Software Development Intern</p>
            <p className="mt-6 text-muted-foreground">
              Engineering multi-step AI agent workflows and robust backend services that integrate enterprise data with autonomous intelligence, operating end-to-end within an Agile engineering team.
            </p>
          </div>
          <div className="md:border-l md:border-border md:pl-10">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Key Contributions &amp; Impact
            </p>
            <ul className="space-y-4">
              {resp.map((r, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary/15 text-xs text-primary">
                    ✓
                  </span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------------- Skills ---------------- */
function Skills() {
  const groups: [string, string[]][] = [
    ["Languages", ["Python", "SQL", "Java", "JavaScript (Node.js)", "C", "Apex"]],
    [
      "Backend & APIs",
      [
        "REST API Design",
        "Flask",
        "Django",
        "Spring Boot",
        "Event-Driven Design",
        "Unit & Integration Testing",
      ],
    ],
    [
      "LLM & AI Systems",
      [
        "LLM APIs",
        "Prompt Engineering",
        "Tool Calling",
        "RAG",
        "AI Agents",
        "LangChain",
        "LangGraph",
        "Multi-Agent Orchestration",
        "Agentforce",
      ],
    ],
    ["Databases", ["PostgreSQL", "MongoDB", "Schema Design"]],
    [
      "Cloud & DevOps",
      ["AWS (Kinesis, Lambda, S3)", "Docker", "CI/CD Pipelines", "Git/GitHub"],
    ],
    [
      "Frontend & Practices",
      ["React", "HTML/CSS", "Agile/Scrum", "Peer Code Review", "Root Cause Analysis"],
    ],
  ];
  return (
    <section id="skills" className="mx-auto max-w-7xl px-6 py-28">
      <SectionHeading eyebrow="Technical Skills" title="The technical toolkit." />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map(([title, items], i) => (
          <Reveal key={title} delay={(i % 3) * 0.08}>
            <motion.div
              whileHover={{ y: -6 }}
              className="h-full rounded-3xl border border-border bg-card p-7 transition-shadow hover:glow"
            >
              <h3 className="font-display text-lg font-semibold">{title}</h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {items.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-border bg-muted px-3 py-1.5 text-xs font-medium sm:text-sm"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Projects ---------------- */
function Projects() {
  const projects = [
    {
      title: "Agentic RAG Pipeline for Document Q&A",
      subtitle: "Python, LangChain, LangGraph, LLM APIs",
      desc: "Built a multi-agent RAG system with embeddings-based retrieval, reranking, and tool-calling agents that synthesize source-grounded answers over large document corpora.",
      tags: ["Python", "LangChain", "LangGraph", "LLM APIs", "RAG", "Multi-Agent"],
    },
    {
      title: "Cloud-Based CI/CD Pipeline for ML in Healthcare",
      subtitle: "AWS, Docker, CI/CD, MLOps – Published Research",
      desc: "Designed and evaluated an MLOps pipeline automating build, test, versioning, and deployment of a breast-cancer prediction model, covering the full model lifecycle from training to release.",
      tags: ["AWS", "Docker", "CI/CD", "MLOps", "Healthcare AI", "Published Research"],
    },
    {
      title: "Real-Time Stream Analytics on AWS",
      subtitle: "AWS Kinesis, Lambda, S3, Python",
      desc: "Designed a scalable, fault-tolerant event-driven pipeline for real-time data ingestion and processing, delivering insights through analytics dashboards.",
      tags: ["AWS Kinesis", "AWS Lambda", "AWS S3", "Python", "Event-Driven", "Real-Time"],
    },
  ];
  return (
    <section id="projects" className="mx-auto max-w-7xl px-6 py-28">
      <SectionHeading eyebrow="Projects" title="Featured engineering projects." />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.1}>
            <motion.div
              whileHover={{ y: -8 }}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-primary/25 via-accent/10 to-transparent p-6 flex flex-col justify-between">
                <span className="font-display text-4xl font-bold text-foreground/20">
                  0{i + 1}
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  {p.subtitle}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-xl font-semibold leading-tight">{p.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {p.desc}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Publications ---------------- */
function Publications() {
  const pubs = [
    {
      title: "A Cloud-Based CI/CD Pipeline for Machine Learning in Healthcare: Breast Cancer Prediction",
      desc: "Published research detailing an automated MLOps pipeline covering model training, testing, artifact versioning, containerization with Docker, and cloud-based automated deployment on AWS.",
      badge: "Published Research",
    },
    {
      title: "Safe Ride AI Helmet System",
      desc: "Intelligent real-time computer vision safety system detecting helmet compliance and violations, integrating deep learning models with event-driven alerting.",
      badge: "AI & Computer Vision",
    },
  ];
  return (
    <section id="publications" className="mx-auto max-w-7xl px-6 py-28">
      <SectionHeading eyebrow="Research & Publications" title="Published work." />
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {pubs.map((pub, i) => (
          <Reveal key={pub.title} delay={i * 0.1}>
            <motion.div
              whileHover={{ y: -6 }}
              className="flex h-full flex-col justify-between rounded-3xl border border-border bg-card p-8 transition-shadow hover:glow"
            >
              <div>
                <span className="inline-block rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                  {pub.badge}
                </span>
                <h3 className="mt-4 font-display text-xl font-bold leading-snug">
                  {pub.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {pub.desc}
                </p>
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Certifications ---------------- */
const CERTIFICATIONS: [string, string, string][] = [
  [
    "Salesforce Certified AI Associate",
    "Salesforce",
    "https://www.salesforce.com/trailblazer/cv0z3g20afdml4l3qw",
  ],
  [
    "5-Day AI Agents: Intensive Vibe Coding",
    "Kaggle",
    "https://www.kaggle.com/certification/badges/yashrajnemala/108",
  ],
  [
    "Red Hat Certified Enterprise Application Developer",
    "Red Hat",
    "https://www.credly.com/badges/e995faa2-4a89-4d28-9ce6-2c6a152db90d/public_url",
  ],
  [
    "Aviatrix Certified Engineer — Multicloud Network Associate",
    "Aviatrix",
    "https://www.credly.com/badges/c2759b99-09d5-4417-8a06-66e26a92ce34/public_url",
  ],
  [
    "Automation Anywhere Certified Essentials RPA Professional",
    "Automation Anywhere",
    "https://certificates.automationanywhere.com/8379a4aa-8b54-4ab1-9145-f3f51b03999a#acc.NVHpTI9g",
  ],
  [
    "TalentNext Java Full Stack Certificate",
    "Wipro",
    "https://drive.google.com/file/d/1nMorFsxLYyWHDkh29hNmRJuTiV9rBM4b/view?usp=drive_link",
  ],
];

function Certifications() {
  return (
    <section id="certifications" className="mx-auto max-w-7xl px-6 py-28">
      <SectionHeading eyebrow="Certifications" title="Credentials & badges." />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {CERTIFICATIONS.map(([title, issuer, url], i) => (
          <Reveal key={title} delay={(i % 3) * 0.08}>
            <motion.a
              href={url}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -6 }}
              className="flex h-full flex-col justify-between rounded-3xl border border-border bg-card p-7 transition-shadow hover:glow"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                  {issuer}
                </p>
                <h3 className="mt-2 font-display text-lg font-semibold leading-snug">{title}</h3>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-border/50 pt-4">
                <span className="text-xs font-medium text-muted-foreground underline decoration-border underline-offset-4">
                  View credential
                </span>
                <span aria-hidden className="text-base text-muted-foreground">
                  ↗
                </span>
              </div>
            </motion.a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Services ---------------- */
function Services() {
  const services = [
    ["Python & REST APIs", "Robust, scalable backend APIs built with Flask, Django & FastAPI."],
    ["Agentic AI & Multi-Agent Workflows", "Stateful, tool-calling agents engineered with LangGraph & LangChain."],
    ["Enterprise Agentforce Solutions", "Autonomous agents securely integrated with enterprise data and Salesforce CRM."],
    ["RAG Systems", "Retrieval-augmented generation pipelines over complex enterprise document corpora."],
    ["Cloud & MLOps Pipelines", "CI/CD automation, Docker containerization, and AWS serverless deployment."],
    ["Database Architecture", "Relational and NoSQL schema design optimized with PostgreSQL and MongoDB."],
  ];
  return (
    <section id="services" className="mx-auto max-w-7xl px-6 py-28">
      <SectionHeading eyebrow="Capabilities" title="What I can build for you." />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map(([t, d], i) => (
          <Reveal key={t} delay={(i % 3) * 0.08}>
            <motion.div
              whileHover={{ y: -6 }}
              className="group relative h-full overflow-hidden rounded-3xl border border-border bg-card p-7"
            >
              <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-primary/10 blur-2xl transition-all group-hover:bg-primary/25" />
              <span className="font-display text-3xl text-primary">0{i + 1}</span>
              <h3 className="mt-4 font-display text-lg font-semibold">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Learning ---------------- */
function Learning() {
  const items = [
    "Multi-Agent Orchestration & LangGraph",
    "Production-Grade Agentic RAG Systems",
    "Enterprise Agentforce & Apex Microservices",
    "Scalable Stream Processing with AWS Kinesis",
    "Distributed System Reliability & MLOps",
    "Advanced Prompting & Structured Tool Calling",
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 py-28">
      <SectionHeading eyebrow="Currently Exploring" title="Always learning." />
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((t, i) => (
          <Reveal key={t} delay={(i % 3) * 0.08}>
            <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/15 font-display text-primary">
                {i + 1}
              </span>
              <span className="font-medium">{t}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Resume CTA ---------------- */
function ResumeCTA() {
  return (
    <section id="resume" className="mx-auto max-w-7xl px-6 py-20">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-gradient-to-br from-primary/20 via-card to-card p-12 text-center md:p-20">
          <div className="absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-primary/30 blur-3xl" />
          <h2 className="font-display text-4xl font-bold sm:text-5xl">Get my resume</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Explore my latest experience in Backend &amp; AI Engineering, Agentic RAG pipelines, and full-stack systems.
          </p>
          <div className="mt-8 flex justify-center">
            <MagneticButton href={resumeUrl} download="Nemala_Yash_Raj_Resume.pdf">
              Download Resume ↓
            </MagneticButton>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------------- Contact ---------------- */
function Contact() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const info = [
    ["Email", "yashrajnemala@gmail.com", "mailto:yashrajnemala@gmail.com"],
    ["Phone", "+91 7997244791", "tel:+917997244791"],
    ["Location", "India", undefined],
  ] as [string, string, string?][];
  return (
    <section id="contact" className="mx-auto max-w-7xl px-6 py-28">
      <SectionHeading eyebrow="Contact" title="Let's build together." />
      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <Reveal>
          <div className="space-y-4">
            {info.map(([label, value, href]) => (
              <div
                key={label}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                  {label}
                </p>
                {href ? (
                  <a href={href} className="mt-1 block text-lg hover:text-primary">
                    {value}
                  </a>
                ) : (
                  <p className="mt-1 text-lg">{value}</p>
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
                  className="rounded-full glass border border-border px-5 py-2.5 text-sm transition-colors hover:border-primary/50"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (sending) return;
              setError(null);
              setSending(true);
              const form = e.currentTarget;
              const data = new FormData(form);
              try {
                const res = await fetch("/api/contact", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    name: data.get("name"),
                    email: data.get("email"),
                    message: data.get("message"),
                  }),
                });
                if (!res.ok) {
                  const body = await res.json().catch(() => ({}));
                  throw new Error(body.error || "Failed to send message.");
                }
                setSent(true);
                form.reset();
              } catch (err) {
                setError(
                  err instanceof Error ? err.message : "Something went wrong.",
                );
              } finally {
                setSending(false);
              }
            }}
            className="rounded-3xl border border-border bg-card p-8"
          >
            <div className="grid gap-4">
              <input
                required
                name="name"
                placeholder="Your name"
                className="rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary"
              />
              <input
                required
                name="email"
                type="email"
                placeholder="Your email"
                className="rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary"
              />
              <textarea
                required
                name="message"
                rows={4}
                placeholder="Your message"
                className="resize-none rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary"
              />
              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}
              <MagneticButton>
                {sending
                  ? "Sending…"
                  : sent
                    ? "Message sent ✓"
                    : "Send message →"}
              </MagneticButton>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */
function Footer({ theme, toggle }: { theme: string; toggle: () => void }) {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-14 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-2xl font-bold">
            Nemala Yash Raj<span className="text-primary">.</span>
          </p>
          <p className="mt-2 max-w-sm text-muted-foreground">
            Building intelligent experiences for tomorrow.
          </p>
        </div>
        <div className="flex flex-col gap-5 md:items-end">
          <nav className="flex flex-wrap gap-5 text-sm text-muted-foreground">
            {NAV.map(([label, href]) => (
              <a key={label} href={href} className="hover:text-foreground">
                {label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            {SOCIALS.map(([label, href]) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                {label}
              </a>
            ))}
            <ThemeToggle theme={theme} toggle={toggle} />
          </div>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Nemala Yash Raj. All rights reserved.
      </div>
    </footer>
  );
}
