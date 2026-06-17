import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import profile from "@/assets/profile-new.png";
import resumeAsset from "@/assets/yash-resume.pdf.asset.json";
import {
  MagneticButton,
  Reveal,
  ScrollProgress,
  SectionHeading,
  useTheme,
} from "@/components/portfolio-ui";
import { ChatWidget } from "@/components/chat-widget";

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
      <Services />
      <Projects />
      <Learning />
      <ResumeCTA />
      <Contact />
      <Footer theme={theme} toggle={toggle} />
      <ChatWidget />
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
          <span>Agentforce Developer</span>
          <span className="hidden h-1 w-1 rounded-full bg-primary sm:inline-block" />
          <span>Future AI Engineer</span>
          <span className="hidden h-1 w-1 rounded-full bg-primary sm:inline-block" />
          <span>Since 2024</span>
        </div>
      </Reveal>

      {/* image-clipped name */}
      <div className="relative flex flex-col items-center">
        {/* portrait rectangle peeking behind the text */}
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
            Yash&nbsp;Raj
          </h1>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="relative z-10 mt-1 text-center font-serif-display text-3xl font-semibold tracking-tight text-primary sm:text-4xl lg:text-5xl">
            ai engineer
          </p>
        </Reveal>
      </div>


      {/* intro + CTAs */}
      <Reveal delay={0.25}>
        <div className="mt-10 flex max-w-xl flex-col items-center gap-5 text-center">
          <p className="text-base font-medium text-muted-foreground sm:text-lg">
            Hi, I'm <span className="font-bold text-foreground">Nemala Yash Raj</span> — building
            intelligent systems that bridge enterprise solutions and the future of AI.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <MagneticButton href={resumeAsset.url} download="Nemala_Yash_Raj_Resume.pdf">
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
  const traits = ["Curious learner", "Analytical thinker", "Adaptable", "Passion-driven", "Growth-oriented"];
  const interests = [
    "Solving mathematics problems",
    "Learning new technologies",
    "Collecting coins worldwide",
    "Watching movies",
    "Anime enthusiast",
  ];
  return (
    <section id="about" className="mx-auto max-w-7xl px-6 py-28">
      <SectionHeading eyebrow="About Me" title="An authentic, human story." />
      <div className="mt-12 grid gap-8 lg:grid-cols-3">
        <Reveal>
          <div className="rounded-3xl border border-border bg-card p-8">
            <h3 className="font-display text-xl font-semibold">Professional Summary</h3>
            <p className="mt-4 text-muted-foreground">
              Working professional currently serving as an Agentforce Developer Intern at Appstrail.
              Passionate about artificial intelligence and continuously exploring technologies that
              shape the future.
            </p>
            <h3 className="mt-8 font-display text-xl font-semibold">Career Goal</h3>
            <p className="mt-4 text-muted-foreground">
              To grow professionally in AI-related fields and contribute to impactful innovations
              that transform industries.
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
            <h3 className="font-display text-xl font-semibold">Personality</h3>
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
      <SectionHeading eyebrow="Education" title="The learning timeline." />
      <div className="mt-14 max-w-3xl">
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
    </section>
  );
}

function Experience() {
  const resp = [
    "Agentforce development",
    "Salesforce CRM solutions",
    "Enterprise workflow automation",
    "AI-powered customer experiences",
    "Building intelligent agents",
  ];
  return (
    <section id="journey" className="mx-auto max-w-7xl px-6 py-28">
      <SectionHeading eyebrow="Professional Journey" title="Executive experience." />
      <Reveal>
        <div className="mt-12 grid gap-8 rounded-3xl border border-border bg-card p-8 md:grid-cols-2 md:p-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              Joined 23 February 2026
            </p>
            <h3 className="mt-2 font-display text-3xl font-bold">Appstrail</h3>
            <p className="mt-1 text-lg text-muted-foreground">Agentforce Developer Intern</p>
            <p className="mt-6 text-muted-foreground">
              Working with Salesforce CRM and Agentforce technologies to help organizations build
              autonomous AI agents capable of securely connecting to enterprise data, understanding
              customer intent, and executing complex workflows with minimal human intervention.
            </p>
          </div>
          <div className="md:border-l md:border-border md:pl-10">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Responsibilities
            </p>
            <ul className="space-y-3">
              {resp.map((r) => (
                <li key={r} className="flex items-center gap-3">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-primary/15 text-xs text-primary">
                    ✓
                  </span>
                  {r}
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
    <section id="skills" className="mx-auto max-w-7xl px-6 py-28">
      <SectionHeading eyebrow="Skills & Expertise" title="The technical toolkit." />
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
                    className="rounded-full border border-border bg-muted px-3 py-1.5 text-sm"
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
    <section id="services" className="mx-auto max-w-7xl px-6 py-28">
      <SectionHeading eyebrow="Services" title="What I can build for you." />
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
    <section id="projects" className="mx-auto max-w-7xl px-6 py-28">
      <SectionHeading eyebrow="Projects" title="Selected work." />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {projects.map(([t, d, tags], i) => (
          <Reveal key={t} delay={i * 0.1}>
            <motion.div
              whileHover={{ y: -8 }}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-primary/25 via-accent/10 to-transparent">
                <div className="absolute inset-0 grid place-items-center">
                  <span className="font-display text-6xl font-bold text-foreground/15">
                    0{i + 1}
                  </span>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-xl font-semibold">{t}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{d}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
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
      <Reveal delay={0.2}>
        <div className="mt-10 rounded-3xl border border-dashed border-border bg-card/50 p-10 text-center">
          <h3 className="font-display text-2xl font-bold">More Innovations Coming Soon</h3>
          <p className="mt-2 text-muted-foreground">
            Continuously building — bigger AI experiences are on the way.
          </p>
        </div>
      </Reveal>
    </section>
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
            Explore my journey, achievements, and technical expertise.
          </p>
          <div className="mt-8 flex justify-center">
            <MagneticButton href={resumeAsset.url} download="Nemala_Yash_Raj_Resume.pdf">
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
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="rounded-3xl border border-border bg-card p-8"
          >
            <div className="grid gap-4">
              <input
                required
                placeholder="Your name"
                className="rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary"
              />
              <input
                required
                type="email"
                placeholder="Your email"
                className="rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary"
              />
              <textarea
                required
                rows={4}
                placeholder="Your message"
                className="resize-none rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary"
              />
              <MagneticButton>{sent ? "Message sent ✓" : "Send message →"}</MagneticButton>
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
