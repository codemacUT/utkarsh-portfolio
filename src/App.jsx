import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github, Linkedin, Mail, ExternalLink, Code, FileText, Menu, X, ChevronRight,
  Cpu, Globe, Database, Smartphone, Zap, Server, Sparkles, MessageCircle, Send,
  Bot, Loader2, Layers, Command, ArrowRight, CheckCircle2
} from "lucide-react";

// --- Config & API ---
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
const GEMINI_MODEL = import.meta.env.VITE_GEMINI_MODEL || "gemini-1.5-flash";

if (import.meta.env.DEV) {
  console.log("🔑 API Key Status:", apiKey ? "✅ Loaded" : "❌ Missing - Running in demo mode");
}

// --- Data Models ---
const BASE_PERSONAL_INFO = {
  name: "Utkarsh Tiwari",
  email: "utkt9502@gmail.com",
  github: "https://github.com/codemacUT",
  linkedin: "https://www.linkedin.com/in/utkarsh-tiwari-491846274/",
  phone: "+91-8299502048",
  profileImage: "/profile.jpg", // Replace the file at public/profile.jpg with your downloaded LinkedIn image
};

const ROLE_VARIANTS = {
  flutter: {
    id: "flutter",
    label: "Mobile / Flutter Developer",
    shortLabel: "Flutter",
    valueProps: "Building fast, cross-platform mobile apps with robust backend integrations.",
    metrics: ["10K+ Lines of Dart", "Real-time Sync", "80% Faster Workflows"],
    personal: {
      role: "Flutter Developer",
      headline: "Building polished cross-platform mobile apps with speed and reliability.",
      resumeLink: "https://drive.google.com/file/d/1VPoFZ2vMZDLGNSEfM0uUNtqRZX-puKBt/view?usp=drive_link",
    },
    skills: [
      { name: "Flutter & Dart", level: "Specialist", icon: <Smartphone size={18} /> },
      { name: "Firebase & REST APIs", level: "Advanced", icon: <Database size={18} /> },
      { name: "SQL & PostgreSQL", level: "Advanced", icon: <Server size={18} /> },
      { name: "App Architecture", level: "Advanced", icon: <Layers size={18} /> },
    ],
    projects: [
      {
        id: "p1",
        title: "Smart Attendee App",
        description: "QR-based attendance platform reducing manual roll-call time by 80%. Built with robust offline capabilities and real-time syncing.",
        tech: ["Flutter", "Firebase", "PostgreSQL", "Riverpod"],
        metrics: ["80% Time Saved", "Real-time Sync"],
        github: "https://github.com/codemacUT/smart-attendee-app",
        demo: null,
        image: "https://placehold.co/800x500/0f172a/38bdf8?text=Smart+Attendee",
        featured: true,
      },
      {
        id: "p2",
        title: "AI-Integrated Telegram Bot",
        description: "Event-driven automation that integrates Gemini API to process prompts and deliver AI-generated images in under 30 seconds.",
        tech: ["Gemini API", "n8n", "Webhooks"],
        metrics: ["<30s Latency", "100% Automated"],
        github: "https://github.com/codemacUT/prompt2pic-ai",
        demo: null,
        image: "https://placehold.co/800x500/0f172a/10b981?text=AI+Telegram+Bot",
        featured: true,
      }
    ],
    quickPrompts: ["Flutter experience?", "Show mobile projects", "Contact details"]
  },
  sde: {
    id: "sde",
    label: "Software Engineer",
    shortLabel: "SDE",
    valueProps: "Designing reliable backend systems, automation workflows, and analytical solutions.",
    metrics: ["100% Process Accuracy", "Automated Pipelines", "Complex SQL"],
    personal: {
      role: "Software Engineer",
      headline: "Designing reliable software systems with clean logic and measurable impact.",
      resumeLink: "https://drive.google.com/file/d/1esMt599aD7wbDJ29KcVk_cQ8PLWxzfWr/view?usp=drive_link",
    },
    skills: [
      { name: "Java & C++", level: "Proficient", icon: <Code size={18} /> },
      { name: "PostgreSQL & SQL", level: "Advanced", icon: <Database size={18} /> },
      { name: "n8n Automation", level: "Advanced", icon: <Zap size={18} /> },
      { name: "System Design", level: "Intermediate", icon: <Server size={18} /> },
    ],
    projects: [
      {
        id: "s1",
        title: "AI-Integrated Telegram Bot",
        description: "Event-driven system orchestrated with webhooks that processes natural language triggers to generate context-aware images rapidly.",
        tech: ["n8n", "Webhooks", "Gemini API", "Node.js"],
        metrics: ["<30s Latency", "100% Automated"],
        github: "https://github.com/codemacUT/prompt2pic-ai",
        demo: null,
        image: "https://placehold.co/800x500/0f172a/10b981?text=AI+Telegram+Bot",
        featured: true,
      },
      {
        id: "s2",
        title: "Distributed Ticket System",
        description: "Scalable backend architecture to manage high-concurrency event bookings with caching and database locking.",
        tech: ["Java", "Spring Boot", "Redis"],
        metrics: ["High Concurrency", "Low Latency"],
        github: "https://github.com/codemacUT",
        demo: null,
        image: "https://placehold.co/800x500/0f172a/f59e0b?text=Distributed+System",
        featured: true,
      }
    ],
    quickPrompts: ["SDE projects?", "Backend experience", "Problem-solving approach"]
  }
};

const EXPERIENCE = [
  {
    id: "e0",
    company: "Tnennt Technologies Pvt. Ltd. (Corpse)",
    role: "Flutter Developer Intern",
    period: "Dec 2025 - Present",
    current: true,
    impact: "Spearheaded front-end architecture and full-stack integration for a cross-platform tournament application.",
    bullets: [
      "Built 15+ dynamic screens with responsive, pixel-perfect UI implementations based on Figma designs.",
      "Implemented Clean Architecture and scalable MVVM patterns using Provider for state management.",
      "Integrated Firebase Auth (2FA) & Firestore to transition from mockups to real-time cloud data.",
      "Executed API integrations via Dio and maintained strict version control with Git feature branches."
    ]
  },
  {
    id: "e1",
    company: "Paytm Payments Services Ltd.",
    role: "Operations & GIS Analytics Intern",
    period: "Dec 2025 - Mar 2026",
    impact: "Improved geospatial data workflows and ensured system consistency through extensive SQL querying and Mappls validations.",
    bullets: [
      "Analyzed big datasets using SQL reducing mapping inconsistencies significantly.",
      "Engineered automated validation rules within operations pipeline.",
      "Optimized Google Sheets workflows heavily with advanced pivot techniques."
    ]
  }
];

const EDUCATION = [
  {
    institution: "JSS Academy Of Technical Education",
    degree: "B.Tech in Computer Science",
    period: "2023 - Present",
    current: true,
    description: "Pre-final year student. Focusing on Software Development, Data Structures, and Algorithms. Active in building practical projects."
  },
  {
    institution: "Dr. Virendra Swaroop Education Centre",
    degree: "Intermediate (Class XII)",
    period: "Completed 2023",
    description: "ISC Board. Achieved 91.5%. Strong foundation in mathematics and computer science principles."
  }
];

// --- Animation Tokens (Framer Motion) ---
const eaOut = [0.25, 1, 0.5, 1];
const anim = {
  heroContainer: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  },
  fadeUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: eaOut } }
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4, ease: eaOut } }
  },
  staggerList: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  },
  cardHover: {
    scale: 1.03,
    y: -6,
    transition: { duration: 0.2 }
  }
};

// --- Helper Functions ---
const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) {
    const offset = 80;
    const y = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
};

async function callGemini(sys, prompt) {
  if (!apiKey) {
    await new Promise(r => setTimeout(r, 600));
    return "Demo Mode: I am an AI assistant here to help. Contact Utkarsh at utkt9502@gmail.com for real business.";
  }
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;
  const body = { contents: [{ parts: [{ text: prompt }] }], systemInstruction: { parts: [{ text: sys }] } };
  try {
    const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    const data = await res.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || "Unable to process.";
  } catch (e) {
    return "Connection error with Gemini API.";
  }
}

// --- UI Components ---
const SectionHeader = ({ title }) => (
  <motion.div variants={anim.fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="mb-8">
    <h2 className="text-3xl font-extrabold text-slate-100 tracking-tight flex items-center gap-3">
      {title}
      <div className="h-px bg-slate-800 flex-1 ml-4 hidden sm:block" />
    </h2>
  </motion.div>
);

const Navbar = ({ activeRole, setActiveRole }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const hand = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", hand);
    return () => window.removeEventListener("scroll", hand);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.5, ease: eaOut }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-slate-950/80 backdrop-blur-md border-b border-slate-800/60" : "bg-transparent"}`}
    >
      <div className="container mx-auto max-w-5xl px-6 h-16 flex items-center justify-between">
        <div className="group flex items-center gap-2 cursor-pointer font-bold tracking-tight" onClick={() => scrollToSection('top')} aria-label="Go to top">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-sm text-white shadow-lg">
            UT
          </div>
          <span className="text-sm text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Utkarsh Tiwari
          </span>
        </div>
        <nav className="flex gap-4 sm:gap-6 text-sm font-medium text-slate-300">
          <button onClick={() => scrollToSection('quick-proof')} className="hover:text-white transition-colors relative group">
            Work
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full" />
          </button>
          <button onClick={() => scrollToSection('experience')} className="hover:text-white transition-colors relative group">
            Professional Journey
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full" />
          </button>
          <button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors relative group">
            Contact
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full" />
          </button>
        </nav>
      </div>
    </motion.header>
  );
};

// --- Main App ---
export default function App() {
  const [roleMode, setRoleMode] = useState(() => localStorage.getItem("ut_portfolio_role") || "flutter");

  useEffect(() => {
    localStorage.setItem("ut_portfolio_role", roleMode);
  }, [roleMode]);

  const rd = ROLE_VARIANTS[roleMode];
  const personal = { ...BASE_PERSONAL_INFO, ...rd.personal };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-200 font-sans selection:bg-blue-500/30 overflow-x-hidden" id="top">
      {/* Background Mesh */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px]" />
      </div>

      <Navbar activeRole={roleMode} setActiveRole={setRoleMode} />

      <main className="relative z-10 container mx-auto max-w-5xl px-6 pt-40 md:pt-38 pb-24 flex flex-col gap-24 md:gap-32">

        {/* 1. HERO */}
        <section>
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">

            {/* LEFT */}
            <motion.div
              variants={anim.heroContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-6 max-w-2xl order-2 md:order-1"
            >

              {/* 🔹 Strong Identity Line */}
              <motion.div variants={anim.fadeUp} className="text-sm sm:text-base text-blue-400 font-semibold tracking-wide">
                Flutter Developer · Ex-Paytm Intern
              </motion.div>

              {/* 🔹 Headline (FIXED) */}
              <motion.h1 variants={anim.fadeUp} className="text-5xl sm:text-6xl font-extrabold tracking-tight text-slate-100 leading-[1.1]">
                I build scalable mobile apps with
                <span className="text-blue-400"> real-time systems</span>
              </motion.h1>

              {/* 🔹 Subtext (WITH PROOF) */}
              <motion.p variants={anim.fadeUp} className="text-lg sm:text-xl text-slate-400 max-w-xl leading-relaxed">
                Built 20+ production screens and real-time sync systems using Flutter + Firebase, focused on performance and scalable architecture.
              </motion.p>

              {/* 🔹 CTA FIX */}
              <motion.div variants={anim.fadeUp} className="flex flex-wrap items-center gap-4 pt-4">

                {/* PRIMARY */}
                <button
                  onClick={() => scrollToSection('quick-proof')}
                  className="px-7 py-3.5 bg-white text-slate-900 font-bold rounded-xl hover:scale-[1.03] hover:brightness-110 active:scale-95 transition-all shadow-xl hover:shadow-2xl"
                >
                  View Projects
                </button>

                {/* SECONDARY */}
                <a
                  href={personal.resumeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-slate-800 text-slate-200 font-bold rounded-xl hover:bg-slate-700 hover:scale-[1.02] hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
                >
                  <FileText size={18} /> Resume
                </a>

                {/* SOCIAL */}
                <div className="flex gap-3">
                  <a href={personal.github} target="_blank" rel="noopener noreferrer"
                    className="p-3 bg-slate-800 rounded-xl hover:bg-slate-700 hover:scale-[1.05] hover:brightness-110 transition-all">
                    <Github size={20} />
                  </a>

                  <a href={personal.linkedin} target="_blank" rel="noopener noreferrer"
                    className="p-3 bg-slate-800 rounded-xl hover:bg-[#0077b5] hover:scale-[1.05] hover:brightness-110 transition-all">
                    <Linkedin size={20} />
                  </a>
                </div>
              </motion.div>

            </motion.div>

            {/* RIGHT IMAGE */}
            <div className="flex justify-center md:justify-end order-1 md:order-2 shrink-0 -mt-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                whileHover={{ scale: 1.03 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-full blur-3xl opacity-10" />

                <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[22rem] lg:h-[22rem] p-2 rounded-full bg-slate-900 border border-slate-800 shadow-[0_0_60px_rgba(56,189,248,0.15)]">
                  <img
                    src={personal.profileImage}
                    alt={personal.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </motion.div>
            </div>

          </div>
        </section>

        {/* 2. QUICK PROOF */}
        <section id="quick-proof" className="scroll-mt-32">
          <SectionHeader title="Quick Proof" />
          <motion.div variants={anim.staggerList} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="grid sm:grid-cols-2 gap-6">
            {rd.projects.filter(p => p.featured).slice(0, 2).map((project, i) => (
              <motion.a href={project.github} target="_blank" rel="noopener noreferrer" key={project.id} variants={anim.fadeUp} whileHover="cardHover" className="block group relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-blue-500/40 will-change-transform shadow-lg">
                <div className="h-44 bg-slate-800 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent z-10 opacity-60" />
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 z-20 bg-slate-950/60 backdrop-blur-sm p-2 rounded-full text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink size={16} />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-blue-400 transition-colors">{project.title}</h3>
                  <p className="text-sm text-slate-400 mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.metrics.map(m => (
                      <span key={m} className="px-2 py-1 bg-blue-500/10 text-blue-300 text-[10px] font-bold uppercase tracking-wider rounded border border-blue-500/20">{m}</span>
                    ))}
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </section>

        {/* 3. INLINE ROLE SWITCHER (HIDDEN)
        <section className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-6 md:p-8 relative overflow-hidden backdrop-blur-sm shadow-xl">
           ...
        </section> */}

        {/* 4. DYNAMIC SECTIONS (SKILLS, EXP, PROJECTS) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={roleMode}
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }}
            className="flex flex-col gap-24"
          >
            {/* SKILLS */}
            <section>
              <SectionHeader title="Technical Context" />
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {rd.skills.map((s) => (
                  <div key={s.name} className="p-5 bg-slate-900/80 border border-slate-800 rounded-2xl hover:border-slate-700 transition-colors flex items-start gap-4 group">
                    <div className="p-2.5 bg-slate-950 rounded-xl text-slate-400 group-hover:text-blue-400 transition-colors shadow-inner">{s.icon}</div>
                    <div>
                      <h4 className="font-bold text-slate-200 text-sm">{s.name}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{s.level}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* PROFESSIONAL JOURNEY */}
            <section id="experience" className="scroll-mt-32">
              <SectionHeader title="Professional Journey" />
              <div className="grid gap-6">
                {EXPERIENCE.map((exp) => (
                  <motion.div variants={anim.fadeUp} key={exp.id} className={`relative p-6 sm:p-8 transition-all group overflow-hidden ${exp.current ? 'bg-slate-900/80 border-2 border-blue-500/40 shadow-[0_0_30px_rgba(59,130,246,0.15)] rounded-3xl' : 'bg-slate-900/50 border border-slate-800 rounded-3xl hover:border-blue-500/30 hover:bg-slate-900/80'}`}>
                    <div className={`absolute top-0 right-0 w-48 h-48 rounded-bl-[100px] rounded-tr-3xl -z-10 transition-colors blur-xl ${exp.current ? 'bg-blue-600/20' : 'bg-blue-600/5 group-hover:bg-blue-600/10'}`} />
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5">
                      <div>
                        <h4 className="text-xl font-bold text-slate-100">{exp.role}</h4>
                        <p className="text-sm text-blue-400 font-medium mt-1">{exp.company}</p>
                      </div>
                      <span className={`inline-flex items-center gap-2.5 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-widest border rounded-full w-fit shadow-lg ${exp.current ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/40' : 'bg-slate-800 text-slate-300 border-slate-700/50'}`}>
                        {exp.current && (
                          <span className="relative flex h-2.5 w-2.5 shrink-0">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                          </span>
                        )}
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed mb-6 font-medium">{exp.impact}</p>
                    <div className="h-px bg-slate-800 w-full mb-6 hidden sm:block" />
                    <ul className="grid sm:grid-cols-2 gap-4">
                      {exp.bullets.map((b, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-400">
                          <CheckCircle2 size={16} className="shrink-0 text-blue-500 mt-0.5" />
                          <span className="leading-relaxed">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* EDUCATION */}
            <section id="education" className="scroll-mt-32">
              <SectionHeader title="Education" />
              <div className="grid sm:grid-cols-2 gap-6">
                {EDUCATION.map((edu, idx) => (
                  <motion.div variants={anim.fadeUp} key={idx} className={`relative p-6 sm:p-8 transition-colors group overflow-hidden ${edu.current ? 'bg-slate-900/80 border-2 border-blue-500/40 shadow-[0_0_30px_rgba(59,130,246,0.15)] rounded-3xl' : 'bg-slate-900/30 border border-slate-800 rounded-3xl hover:border-slate-700 shadow-lg'}`}>
                    <div className={`absolute top-0 right-0 w-32 h-32 rounded-bl-full rounded-tr-3xl -z-10 transition-colors blur-xl ${edu.current ? 'bg-blue-600/20' : 'bg-transparent'}`} />
                    <h4 className="text-lg font-bold text-slate-100 mb-1">{edu.degree}</h4>
                    <p className="text-sm text-blue-400 font-medium mb-4">{edu.institution}</p>
                    <span className={`inline-flex items-center gap-2.5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest border rounded w-fit mb-4 shadow-sm ${edu.current ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/40' : 'bg-slate-800 text-slate-400 border-slate-700/50'}`}>
                      {edu.current && (
                        <span className="relative flex h-2.5 w-2.5 shrink-0">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                        </span>
                      )}
                      {edu.period}
                    </span>
                    <p className="text-sm text-slate-400 leading-relaxed">{edu.description}</p>
                  </motion.div>
                ))}
              </div>
            </section>


          </motion.div>
        </AnimatePresence>

        {/* 5. CONTACT */}
        <section id="contact" className="scroll-mt-32 bg-gradient-to-b from-slate-900/50 to-slate-950 border border-slate-800/60 rounded-[2.5rem] p-10 md:p-16 text-center">
          <motion.div variants={anim.fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="max-w-xl mx-auto space-y-6">
            <h2 className="text-4xl font-extrabold text-white">Let's Connect</h2>
            <p className="text-slate-400 text-lg">Looking for a determined builder for your next project? My inbox is always open.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <a href={"mailto:" + personal.email} className="px-8 py-4 bg-slate-100 text-slate-900 font-bold rounded-xl hover:scale-105 active:scale-95 transition-transform flex justify-center gap-2 items-center">
                <Mail size={18} /> Contact Me
              </a>
              <a href={personal.github} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-slate-800 text-slate-200 font-bold rounded-xl hover:bg-slate-700 hover:scale-105 active:scale-95 transition-all flex justify-center gap-2 items-center">
                <Github size={18} /> GitHub
              </a>
              <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-[#0077b5] text-white font-bold rounded-xl hover:bg-blue-600 hover:scale-105 active:scale-95 transition-all flex justify-center gap-2 items-center">
                <Linkedin size={18} /> LinkedIn
              </a>
            </div>
          </motion.div>
        </section>

      </main>

      {/* AI CHAT WIDGET */}
      <ChatWidget rd={rd} personal={personal} />

      <footer className="text-center p-8 text-slate-500 text-sm pb-24 border-t border-slate-900">
        <p>© {new Date().getFullYear()} {personal.name}. Built with React, Tailwind & Framer Motion.</p>
      </footer>
    </div>
  );
}

// --- Chat Widget ---
const ChatWidget = ({ rd, personal }) => {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([
    {
      role: "ai",
      text: `Ask about projects, experience, or skills. I’ll answer based on this role.`,
    },
  ]);
  const [inp, setInp] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, open]);

  // 🔹 Close when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (!e.target.closest(".chat-container") && !e.target.closest(".chat-toggle-btn")) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const send = async (txt) => {
    const q = txt || inp;
    if (!q.trim() || loading) return;

    setInp("");
    setLoading(true);
    setMsgs((p) => [...p, { role: "user", text: q }]);

    const sys = `You are an AI assistant for ${personal.name}. Context: ${rd.valueProps}. Skills: ${rd.skills
      .map((s) => s.name)
      .join(", ")}. Keep answers short and useful.`;

    const res = await callGemini(sys, q);

    setMsgs((p) => [...p, { role: "ai", text: res }]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-8 md:bottom-10 right-6 z-50 flex flex-col items-end">

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="chat-container mb-4 w-80 h-[22rem] bg-slate-900/90 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col backdrop-blur-sm"
          >
            {/* HEADER */}
            <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex justify-between items-center">
              <div className="flex items-center gap-2 font-bold text-sm text-slate-200">
                <Sparkles size={16} className="text-blue-400" />
                AI Assistant
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-slate-400 hover:text-white p-1 bg-slate-800 rounded-md"
              >
                <X size={14} />
              </button>
            </div>

            {/* MESSAGES */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm">

              {/* 🔹 Quick Prompts */}
              <div className="flex flex-wrap gap-2">
                {["Show projects", "Skills overview", "Contact info"].map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="text-xs px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 transition"
                  >
                    {q}
                  </button>
                ))}
              </div>

              {msgs.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"
                    }`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-xl leading-relaxed ${m.role === "user"
                      ? "bg-blue-600/20 text-blue-100 border border-blue-500/30 rounded-br-sm"
                      : "bg-slate-800/70 backdrop-blur-sm text-slate-300 border border-slate-700/50 rounded-bl-sm"
                      }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="text-xs text-slate-500 flex gap-2 items-center">
                  <Loader2 size={12} className="animate-spin" />
                  Analyzing...
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* INPUT */}
            <div className="p-3 bg-slate-950 border-t border-slate-800">
              <div className="flex gap-2">
                <input
                  value={inp}
                  onChange={(e) => setInp(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                  placeholder="Ask me something..."
                  className="flex-1 bg-slate-900 text-sm text-white rounded-lg px-3 py-2 border border-slate-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition placeholder:text-slate-600"
                />
                <button
                  onClick={() => send()}
                  disabled={loading}
                  className="bg-blue-600 p-2 rounded-lg text-white hover:bg-blue-500 disabled:opacity-50"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOGGLE BUTTON */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="chat-toggle-btn w-12 h-12 bg-slate-800 border border-slate-700 text-slate-300 rounded-full shadow-lg flex items-center justify-center hover:bg-slate-700 hover:text-white hover:scale-105 active:scale-95 transition-all"
      >
        {open ? <X size={20} className="pointer-events-none" /> : <MessageCircle size={20} className="pointer-events-none" />}
      </motion.button>
    </div>
  );
};