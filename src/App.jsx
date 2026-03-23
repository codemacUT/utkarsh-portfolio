import React, { useState, useEffect, useRef } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  FileText,
  Menu,
  X,
  ChevronRight,
  Cpu,
  Globe,
  Database,
  Smartphone,
  Zap,
  Server,
  Sparkles,
  MessageCircle,
  Send,
  Bot,
  Loader2,
  Layers,
  Command,
  ArrowLeft,
} from "lucide-react";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
const GEMINI_MODEL = import.meta.env.VITE_GEMINI_MODEL || "gemini-1.5-flash";

if (import.meta.env.DEV) {
  console.log("🔑 API Key Status:", apiKey ? "✅ Loaded" : "❌ Missing - Running in demo mode");
}

const BASE_PERSONAL_INFO = {
  name: "Utkarsh Tiwari",
  email: "utkt9502@gmail.com",
  github: "https://github.com/codemacUT",
  linkedin: "https://www.linkedin.com/in/utkarsh-tiwari-491846274/",
  phone: "+91-8299502048",
  profileImage: "profile.jpg",
};

const ROLE_VARIANTS = {
  flutter: {
    slug: "flutter",
    route: "/flutter",
    gatewayTitle: "Mobile / Flutter Developer",
    gatewaySubtitle: "Cross-platform app development, Firebase integrations, and product-first mobile UX.",
    personal: {
      role: "Flutter Developer",
      headline: "Building polished cross-platform mobile apps with speed and reliability.",
      about:
        "I am a pre-final year B.Tech student focused on Flutter development. I build scalable mobile apps with strong backend integration, clean architecture, and fast iteration cycles.",
      resumeLink: "https://drive.google.com/file/d/1VPoFZ2vMZDLGNSEfM0uUNtqRZX-puKBt/view?usp=drive_link",
    },
    skills: [
      { name: "Flutter & Dart", icon: <Smartphone size={24} />, level: "Specialist", color: "bg-blue-900/30 text-blue-300 border-blue-800" },
      { name: "Firebase & REST APIs", icon: <Database size={24} />, level: "Advanced", color: "bg-yellow-900/30 text-yellow-300 border-yellow-800" },
      { name: "SQL & PostgreSQL", icon: <Server size={24} />, level: "Advanced", color: "bg-indigo-900/30 text-indigo-300 border-indigo-800" },
      { name: "Gemini AI API", icon: <Sparkles size={24} />, level: "Intermediate", color: "bg-purple-900/30 text-purple-300 border-purple-800" },
      { name: "n8n Automation", icon: <Zap size={24} />, level: "Advanced", color: "bg-orange-900/30 text-orange-300 border-orange-800" },
      { name: "Git & GitHub Actions", icon: <Command size={24} />, level: "Intermediate", color: "bg-rose-900/30 text-rose-300 border-rose-800" },
    ],
    projects: [
      {
        title: "Smart Attendee App",
        description:
          "QR-based attendance app reducing class roll-call time by 80%. Built in Flutter with Firebase Auth and PostgreSQL backend hosted on Render.",
        tags: ["Flutter", "Firebase", "PostgreSQL"],
        github: "https://github.com/codemacUT/smart-attendee-app",
        demo: null,
        image: "https://placehold.co/600x400/1e293b/cbd5e1?text=Smart+Attendee+App",
      },
      {
        title: "AI-Integrated Telegram Bot",
        description:
          "Event-driven automation that integrates Gemini API to process prompts and deliver AI-generated images in under 30 seconds.",
        tags: ["Gemini API", "n8n", "Webhooks"],
        github: "https://github.com/codemacUT/prompt2pic-ai",
        demo: null,
        image: "https://placehold.co/600x400/1e293b/cbd5e1?text=AI+Telegram+Bot",
      },
    ],
    experienceSubtitle: "Hands-on internship work in operations and geospatial data quality pipelines.",
    quickPrompts: [
      "Tell me about your Flutter experience",
      "Show your mobile app projects with links",
      "What Firebase features have you implemented?",
      "How can I contact you?",
    ],
  },
  sde: {
    slug: "sde",
    route: "/sde",
    gatewayTitle: "Software Engineer",
    gatewaySubtitle: "Backend systems, SQL analytics, automation workflows, and problem solving.",
    personal: {
      role: "Software Engineer",
      headline: "Designing reliable software systems with clean logic and measurable impact.",
      about:
        "I am a pre-final year B.Tech student passionate about software engineering. I enjoy building backend-integrated products, data workflows, and robust automation solutions that solve real-world problems.",
      resumeLink: "https://drive.google.com/file/d/1esMt599aD7wbDJ29KcVk_cQ8PLWxzfWr/view?usp=drive_link",
    },
    skills: [
      { name: "Java + C++ / DSA", icon: <Code size={24} />, level: "Proficient", color: "bg-slate-800 text-slate-300 border-slate-700" },
      { name: "SQL & PostgreSQL", icon: <Server size={24} />, level: "Advanced", color: "bg-indigo-900/30 text-indigo-300 border-indigo-800" },
      { name: "n8n Automation", icon: <Zap size={24} />, level: "Advanced", color: "bg-orange-900/30 text-orange-300 border-orange-800" },
      { name: "Excel Data Analysis", icon: <Layers size={24} />, level: "Advanced", color: "bg-emerald-900/30 text-emerald-300 border-emerald-800" },
      { name: "GIS & Mappls", icon: <Globe size={24} />, level: "Intermediate", color: "bg-cyan-900/30 text-cyan-300 border-cyan-800" },
      { name: "Git & GitHub Actions", icon: <Command size={24} />, level: "Intermediate", color: "bg-rose-900/30 text-rose-300 border-rose-800" },
    ],
    projects: [
      {
        title: "Smart Attendee App",
        description:
          "End-to-end attendance platform with QR workflows, resilient auth integration, and performant data persistence.",
        tags: ["System Design", "PostgreSQL", "Firebase"],
        github: "https://github.com/codemacUT/smart-attendee-app",
        demo: null,
        image: "https://placehold.co/600x400/1e293b/cbd5e1?text=Smart+Attendee+App",
      },
      {
        title: "AI-Integrated Telegram Bot",
        description:
          "Automation-first system built with robust event processing and API orchestration for AI-enhanced user interactions.",
        tags: ["Automation", "Gemini API", "n8n"],
        github: "https://github.com/codemacUT/prompt2pic-ai",
        demo: null,
        image: "https://placehold.co/600x400/1e293b/cbd5e1?text=AI+Telegram+Bot",
      },
    ],
    experienceSubtitle: "Internship work focused on analytics, data quality, and geospatial consistency checks.",
    quickPrompts: [
      "Tell me about your software engineering projects",
      "Show your backend/data experience",
      "What are your strongest problem-solving skills?",
      "How can I contact you?",
    ],
  },
};

const EXPERIENCE = [
  {
    company: "Paytm Payments Services Ltd.",
    role: "Operations & GIS Analytics Intern",
    period: "Dec 2025 - Mar 2026",
    location: "India",
    summary:
      "Worked on operational and geospatial data quality workflows using SQL, Google Sheets, and Mappls (MapmyIndia) to improve mapping accuracy and integrity.",
    highlights: [
      "Queried and analyzed operational/geospatial datasets in SQL to identify mapping inconsistencies.",
      "Segmented entities into active/passive categories to evaluate coverage and data accuracy.",
      "Performed data cleaning and validation in Google Sheets with lookup and pivot techniques.",
      "Validated and corrected location mappings in Mappls, reducing overlap and improving spatial precision.",
      "Applied rule-based checks to detect inconsistencies and support corrective actions.",
    ],
    tags: ["SQL", "GIS Analytics", "Google Sheets", "Mappls", "Data Quality"],
  },
];

const EDUCATION = [
  {
    institution: "JSS Academy Of Technical Education",
    degree: "B.Tech in Computer Science",
    period: "2023 - Present",
    description:
      "Pre-final year student. Focusing on Software Development, Data Structures, and Algorithms. Active in building practical projects.",
  },
  {
    institution: "Dr. Virendra Swaroop Education Centre",
    degree: "Intermediate (Class XII)",
    period: "Completed 2023",
    description:
      "ISC Board. Achieved 91.5%. Strong foundation in mathematics and computer science principles.",
  },
];

async function callGeminiAPI(prompt, systemInstruction, isJson = false) {
  if (!apiKey) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (isJson) {
      return {
        title: "Smart Eco-Tracker (Demo)",
        tagline: "Flutter app that classifies waste and tracks carbon footprint.",
        features: ["Flutter camera workflow", "Gemini-assisted predictions", "Automation-ready pipeline"],
        tags: ["Flutter", "AI", "n8n"],
        difficulty: "Intermediate",
      };
    }
    return "I'm currently running in demo mode. Ask me about skills, projects, and contact details.";
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;
  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    systemInstruction: { parts: [{ text: systemInstruction }] },
  };

  if (isJson) {
    payload.generationConfig = {
      responseMimeType: "application/json",
      responseSchema: {
        type: "OBJECT",
        properties: {
          title: { type: "STRING" },
          tagline: { type: "STRING" },
          features: { type: "ARRAY", items: { type: "STRING" } },
          tags: { type: "ARRAY", items: { type: "STRING" } },
          difficulty: { type: "STRING" },
        },
      },
    };
  }

  for (let i = 0; i < 3; i += 1) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const apiMessage = errorData?.error?.message;
        throw new Error(apiMessage || `HTTP Error: ${response.status}`);
      }

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) throw new Error("No content");

      if (isJson) return JSON.parse(text.replace(/```json|```/g, "").trim());
      return text;
    } catch (e) {
      if (i === 2) throw e;
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  return "Unable to process request right now.";
}

const SectionTitle = ({ children, id, subtitle }) => (
  <div className="mb-10 text-center md:text-left">
    <div className="section-chip inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-[11px] font-semibold tracking-[0.2em] uppercase text-cyan-200 mb-3">
      Portfolio
    </div>
    <h2 id={id} className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3">
      {children}
    </h2>
    <p className="text-base text-slate-300/85 max-w-2xl mx-auto md:mx-0">{subtitle}</p>
  </div>
);

const Reveal = ({ children, delay = 0, y = 20, className = "" }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.14 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        filter: visible ? "blur(0px)" : "blur(6px)",
        transform: visible ? "translateY(0px) scale(1)" : `translateY(${y}px) scale(0.985)`,
        transition: `opacity 700ms ease ${delay}ms, transform 700ms ease ${delay}ms, filter 700ms ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

const scrollToSectionFast = (href) => {
  const target = document.querySelector(href);
  if (!target) return;

  const startY = window.scrollY;
  const offset = window.innerWidth < 768 ? 84 : 96;
  const targetY = target.getBoundingClientRect().top + window.scrollY - offset;
  const distance = targetY - startY;
  const duration = 380;
  let startTime = null;

  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  const animate = (timestamp) => {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutCubic(progress);
    window.scrollTo(0, startY + distance * eased);

    if (progress < 1) requestAnimationFrame(animate);
  };

  requestAnimationFrame(animate);
};

const NavLink = ({ href, label, onClick, active }) => (
  <a
    href={href}
    onClick={(e) => {
      e.preventDefault();
      scrollToSectionFast(href);
      if (onClick) onClick();
    }}
    className={`nav-link relative px-2.5 sm:px-3.5 md:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap ${
      active
        ? "nav-link-active bg-cyan-400/20 text-cyan-100 border border-cyan-400/40"
        : "text-slate-300/90 hover:text-white hover:bg-slate-800/70 border border-transparent"
    }`}
  >
    {label}
  </a>
);

const ProjectCard = ({ project }) => (
  <div
    className="project-card premium-card group relative rounded-3xl overflow-hidden border border-slate-700/70 bg-slate-900/70 shadow-xl shadow-slate-950/40 transition-all duration-500 hover:border-cyan-400/60"
    style={{ "--mx": "50%", "--my": "50%", "--rx": "0deg", "--ry": "0deg", "--ty": "0px" }}
    onMouseMove={(e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = (x / rect.width - 0.5) * 7;
      const rotateY = (y / rect.height - 0.5) * -7;
      e.currentTarget.style.setProperty("--mx", `${x}px`);
      e.currentTarget.style.setProperty("--my", `${y}px`);
      e.currentTarget.style.setProperty("--rx", `${rotateX.toFixed(2)}deg`);
      e.currentTarget.style.setProperty("--ry", `${rotateY.toFixed(2)}deg`);
      e.currentTarget.style.setProperty("--ty", "-6px");
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.setProperty("--rx", "0deg");
      e.currentTarget.style.setProperty("--ry", "0deg");
      e.currentTarget.style.setProperty("--ty", "0px");
    }}
  >
    <div className="project-spotlight" />
    <div className="aspect-video overflow-hidden bg-slate-800 relative">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-85 group-hover:opacity-100"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/30 to-transparent opacity-70 group-hover:opacity-95 transition-opacity duration-300 flex items-end justify-between p-5">
        <div className="flex gap-3">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-white text-slate-900 rounded-full hover:bg-slate-200 transition-colors shadow-lg"
              title="View Code"
            >
              <Github size={20} />
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/10 backdrop-blur-md text-white rounded-full hover:bg-blue-600 transition-colors border border-white/10"
              title="Live Demo"
            >
              <ExternalLink size={20} />
            </a>
          )}
        </div>
      </div>
    </div>
    <div className="p-7">
      <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-cyan-200 transition-colors">
        {project.title}
      </h3>
      <p className="text-slate-300/85 mb-6 leading-relaxed text-sm md:text-base">{project.description}</p>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="px-3 py-1 bg-slate-950/80 text-cyan-100 border border-slate-700 text-[11px] font-semibold rounded-full uppercase tracking-wider">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const EducationCard = ({ education, isLatest }) => (
  <div
    className={`education-card premium-card rounded-2xl border p-6 md:p-7 transition-all duration-300 ${
      isLatest ? "border-cyan-400/40 bg-cyan-500/10" : "border-slate-700 bg-slate-900/60"
    }`}
  >
    <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
      <h4 className="text-lg font-bold text-white">{education.degree}</h4>
      <span className="text-xs px-3 py-1 rounded-full border border-slate-600 text-slate-300">{education.period}</span>
    </div>
    <p className="text-cyan-200 font-medium mb-2">{education.institution}</p>
    <p className="text-sm text-slate-300/85 leading-relaxed">{education.description}</p>
  </div>
);

const ExperienceCard = ({ item, index }) => (
  <Reveal delay={index * 120}>
    <div className="experience-card premium-card group relative overflow-hidden rounded-3xl border border-slate-700/80 bg-slate-900/70 backdrop-blur-sm p-7 md:p-8 shadow-xl shadow-slate-950/40 hover:border-cyan-400/50 transition-all duration-500 hover:-translate-y-1">
      <div className="absolute -top-20 -right-16 h-44 w-44 rounded-full bg-cyan-400/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-60" />
      <div className="relative z-10">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-white">{item.role}</h3>
            <p className="text-cyan-200 font-semibold mt-1">{item.company}</p>
          </div>
          <span className="text-xs font-bold tracking-wider uppercase px-3 py-1.5 rounded-full bg-cyan-500/10 text-cyan-100 border border-cyan-400/30">
            {item.period}
          </span>
        </div>

        <p className="text-slate-300/90 leading-relaxed mb-5">{item.summary}</p>

        <ul className="space-y-2.5 mb-6">
          {item.highlights.map((point) => (
            <li key={point} className="flex items-start gap-2.5 text-slate-400">
              <ChevronRight size={14} className="mt-1 text-cyan-400 flex-shrink-0" />
              <span>{point}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-slate-950 text-slate-300 border border-slate-700">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  </Reveal>
);

const ChatInterface = ({ assistantData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: apiKey
        ? `Hi! I'm ${assistantData.personalInfo.name}'s AI assistant for the ${assistantData.roleLabel} profile.`
        : "Hi! I'm running in demo mode because the Gemini API key is not configured. You can still ask about skills, projects, and contact details.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const parseMarkdownBold = (text) => {
    const boldRegex = /\*\*(.+?)\*\*/g;
    const parts = [];
    let lastIndex = 0;
    let match;
    let key = 0;

    while ((match = boldRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(<span key={key}>{text.substring(lastIndex, match.index)}</span>);
        key += 1;
      }
      parts.push(
        <strong key={key} className="font-semibold">
          {match[1]}
        </strong>
      );
      key += 1;
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      parts.push(<span key={key}>{text.substring(lastIndex)}</span>);
    }

    return parts.length > 0 ? parts : [<span key="empty">{text}</span>];
  };

  const renderMessage = (text) => {
    const lines = text.split("\n");
    return lines.map((line, lineIdx) => {
      if (!line.trim() && lineIdx < lines.length - 1) return <br key={lineIdx} />;

      const bulletMatch = line.match(/^\s*[*•-]\s*(.+)/);
      if (bulletMatch) {
        const content = bulletMatch[1];
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const parts = content.split(urlRegex);
        return (
          <div key={lineIdx} className="mb-1.5">
            <span className="mr-2">•</span>
            {parts.map((part, partIdx) => {
              if (part.match(urlRegex)) {
                return (
                  <a
                    key={partIdx}
                    href={part}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline break-all hover:text-blue-300"
                  >
                    {part}
                  </a>
                );
              }
              return <span key={partIdx}>{parseMarkdownBold(part)}</span>;
            })}
          </div>
        );
      }

      const urlRegex = /(https?:\/\/[^\s]+)/g;
      const parts = line.split(urlRegex);
      return (
        <div key={lineIdx} className={lineIdx < lines.length - 1 ? "mb-2" : ""}>
          {parts.map((part, partIdx) => {
            if (part.match(urlRegex)) {
              return (
                <a
                  key={partIdx}
                  href={part}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 underline break-all hover:text-blue-300 block mb-1"
                >
                  {part}
                </a>
              );
            }
            return <span key={partIdx}>{parseMarkdownBold(part)}</span>;
          })}
        </div>
      );
    });
  };

  const send = async (presetMessage) => {
    if (loading) return;
    const msg = (presetMessage ?? input).trim();
    if (!msg) return;
    if (!presetMessage) setInput("");
    setLoading(true);
    setMessages((prev) => [...prev, { role: "user", text: msg }]);

    try {
      const { personalInfo, skills, projects, experience, education } = assistantData;
      const context = JSON.stringify({ personalInfo, skills, projects, experience, education });
      const systemPrompt = `
        You are a professional portfolio assistant for ${personalInfo.name}.
        You are currently representing the ${assistantData.roleLabel} profile.
        Use this data to answer: ${context}.

        CRITICAL RULES:
        1. If asked for a resume/CV, share this direct link: ${personalInfo.resumeLink}
        2. If asked to contact him, give this email: ${personalInfo.email}
        3. Provide raw URLs only. Do NOT use markdown links.
        4. For lists, use bullet points with each item on a new line.
        5. Keep answers concise (max 3 sentences unless list requested).
      `;

      const reply = await callGeminiAPI(msg, systemPrompt);
      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "Unknown error";
      const assistantMessage = !apiKey
        ? "Demo mode is active. Add VITE_GEMINI_API_KEY to your local .env file and restart the app to enable live AI responses."
        : `I couldn't fetch a live AI response (${errorMessage}). Please verify your API key and restart the app.`;
      setMessages((prev) => [...prev, { role: "assistant", text: assistantMessage }]);
    }

    setLoading(false);
  };

  return (
    <div className="fixed bottom-4 right-3 left-3 sm:left-auto sm:right-6 sm:bottom-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="assistant-shell assistant-safe-panel mb-3 sm:mb-4 w-[min(25rem,calc(100vw-1rem))] rounded-3xl shadow-2xl overflow-hidden flex flex-col">
          <div className="assistant-header p-4 text-white flex justify-between items-center">
            <div>
              <div className="flex items-center gap-2 font-bold text-base">
                <Bot size={18} className="text-cyan-300" />
                AI Assistant
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
              </div>
              <p className="text-xs text-slate-400 mt-1">Ask about projects, skills, and experience</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="assistant-icon-btn h-8 w-8 rounded-lg flex items-center justify-center"
              aria-label="Close assistant"
            >
              <X size={16} />
            </button>
          </div>
          <div className="assistant-body min-h-0 flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((m, i) => (
              <div key={`${m.role}-${i}`} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[86%] p-3 rounded-2xl text-sm whitespace-pre-wrap ${m.role === "user" ? "assistant-user-msg" : "assistant-ai-msg"}`}>
                  {m.role === "assistant" ? renderMessage(m.text) : m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-slate-400 text-xs">
                <Loader2 size={14} className="animate-spin" />
                Thinking...
              </div>
            )}
            <div ref={scrollRef} />
          </div>
          <div className="assistant-quick-actions px-3 pb-2 flex flex-wrap gap-2 max-h-20 overflow-y-auto">
            {assistantData.quickPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => send(prompt)}
                disabled={loading}
                className="assistant-chip px-3 py-1.5 rounded-full text-xs font-medium"
              >
                {prompt}
              </button>
            ))}
          </div>
          <div className="assistant-input-wrap p-3 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask about internship, skills, or projects..."
              className="assistant-input flex-1 rounded-full px-4 py-2.5 text-sm focus:outline-none"
            />
            <button
              onClick={() => send()}
              disabled={loading}
              className="assistant-send-btn h-10 w-10 rounded-full flex items-center justify-center disabled:opacity-50"
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="assistant-fab h-14 w-14 rounded-full shadow-xl hover:scale-105 transition-transform flex items-center justify-center"
      >
        {isOpen ? <X /> : <MessageCircle />}
      </button>
    </div>
  );
};

const IdeaGenerator = ({ skills }) => {
  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(false);

  const MOCK_IDEAS = [
    {
      title: "Smart Lens AI",
      tagline: "Point-and-shoot object identifier using Gemini Vision.",
      features: ["Flutter camera integration", "Gemini multimodal API", "Instant object analysis"],
      tags: ["Flutter", "Gemini API", "Dart"],
      difficulty: "Intermediate",
    },
    {
      title: "Auto-CRM Sync",
      tagline: "No-code CRM automation system.",
      features: ["n8n webhook triggers", "PostgreSQL storage", "Automated email workflows"],
      tags: ["n8n", "PostgreSQL", "Automation"],
      difficulty: "Advanced",
    },
    {
      title: "High-Freq Trading Sim",
      tagline: "Low-latency trading engine simulator.",
      features: ["Optimized matching core", "Fast order-book lookups", "Real-time metrics"],
      tags: ["C++", "DSA", "System Design"],
      difficulty: "Advanced",
    },
  ];

  const generate = async () => {
    setIdea(null);
    setLoading(true);
    const skillNames = skills.map((s) => s.name).join(", ");

    const prompt = `
      Role: Senior Tech Architect.
      Task: Generate 1 portfolio-worthy project idea using a creative combination of 2-3 of these skills: ${skillNames}.
      Output JSON keys: title, tagline, features (3), tags, difficulty.
    `;

    const systemInstruction = `
      You are a Senior Technical Architect.
      Output valid JSON only.
      Constraints:
      - Title: max 5 words
      - Tagline: max 15 words
      - Features: exactly 3 items
      - Difficulty: Beginner, Intermediate, Advanced
      - Tags: 2-4 tags
    `;

    try {
      const res = await callGeminiAPI(prompt, systemInstruction, true);
      if (!res || typeof res !== "object" || !res.title || !res.tagline || !Array.isArray(res.features)) {
        throw new Error("Incomplete JSON");
      }

      setIdea({
        title: String(res.title).substring(0, 60),
        tagline: String(res.tagline).substring(0, 120),
        features: res.features.slice(0, 3).map((f) => String(f).substring(0, 90)),
        tags: Array.isArray(res.tags) ? res.tags.slice(0, 4) : ["React", "Node.js"],
        difficulty: ["Beginner", "Intermediate", "Advanced"].includes(res.difficulty) ? res.difficulty : "Intermediate",
      });
    } catch (e) {
      console.error("Generation failed, using fallback:", e);
      setIdea(MOCK_IDEAS[Math.floor(Math.random() * MOCK_IDEAS.length)]);
    }

    setLoading(false);
  };

  return (
    <div className="mt-20 relative rounded-[2.5rem] bg-slate-900 border border-slate-800 p-8 md:p-12 overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 border border-slate-700 text-blue-300 text-sm font-semibold mb-6">
          <Sparkles size={16} className="text-yellow-400" />
          <span>AI Project Architect</span>
        </div>

        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Need your next project idea?</h3>
        <p className="text-slate-400 mb-10 text-lg">Generate a portfolio-worthy project concept tailored to your current skill stack.</p>

        {!idea ? (
          <button
            onClick={generate}
            disabled={loading}
            className="group relative px-8 py-4 bg-blue-600 text-white rounded-full font-bold text-lg hover:bg-blue-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-xl shadow-blue-900/20 hover:shadow-blue-900/40 hover:-translate-y-1"
          >
            <span className="flex items-center gap-3">
              {loading ? <Loader2 className="animate-spin" /> : <Cpu />}
              {loading ? "Architecting Solution..." : "Generate Project Concept"}
            </span>
          </button>
        ) : (
          <div className="bg-slate-950/80 backdrop-blur-xl border border-slate-700 rounded-3xl p-8 text-left shadow-2xl">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6 border-b border-slate-800 pb-6">
              <div>
                <h4 className="text-2xl md:text-3xl font-bold text-white mb-2">{idea.title}</h4>
                <p className="text-blue-400 font-medium text-lg">{idea.tagline}</p>
              </div>
              <span
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${
                  idea.difficulty === "Advanced"
                    ? "bg-red-900/20 text-red-400 border-red-900/50"
                    : idea.difficulty === "Intermediate"
                    ? "bg-yellow-900/20 text-yellow-400 border-yellow-900/50"
                    : "bg-green-900/20 text-green-400 border-green-900/50"
                }`}
              >
                {idea.difficulty}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h5 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Layers size={16} /> Key Features
                </h5>
                <ul className="space-y-3">
                  {idea.features?.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-slate-300">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Code size={16} /> Tech Stack
                </h5>
                <div className="flex flex-wrap gap-2">
                  {idea.tags?.map((tag) => (
                    <span key={tag} className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-300 font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-center pt-2">
              <button
                onClick={generate}
                className="text-slate-400 hover:text-white text-sm font-medium transition-colors flex items-center gap-2 mx-auto hover:bg-slate-900 px-4 py-2 rounded-full"
              >
                <Sparkles size={14} /> Generate Another Idea
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const RoleGateway = ({ onSelectRole }) => (
  <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500 selection:text-slate-950 flex items-center px-6 py-12">
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="animated-grid-bg absolute inset-0 opacity-25" />
      <div className="mesh-blob mesh-blob--one" />
      <div className="mesh-blob mesh-blob--two" />
      <div className="mesh-blob mesh-blob--three" />
    </div>

    <div className="container mx-auto max-w-5xl">
      <div className="hero-shell rounded-[2rem] border border-cyan-500/20 bg-[#050816]/75 backdrop-blur-xl px-6 py-10 md:px-12 md:py-14 shadow-2xl shadow-black/50">
        <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-200 text-xs font-bold mb-5 border border-cyan-400/40">
          <span className="inline-flex rounded-full h-2 w-2 bg-cyan-400" />
          Welcome to Utkarsh's Portfolio
        </p>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight mb-4">
          Which role are you hiring for?
        </h1>
        <p className="text-slate-300/90 text-lg mb-10 max-w-2xl">
          Pick a role to open a tailored portfolio version with role-specific introduction, resume, and focused highlights.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {Object.values(ROLE_VARIANTS).map((role) => (
            <button
              key={role.slug}
              onClick={() => onSelectRole(role.slug)}
              className="text-left premium-card rounded-2xl border border-slate-700 bg-slate-900/70 p-6 md:p-7 hover:border-cyan-400/55 transition-all duration-300 hover:-translate-y-1 group"
            >
              <h2 className="text-xl md:text-2xl font-bold text-white group-hover:text-cyan-200 transition-colors mb-2">
                {role.gatewayTitle}
              </h2>
              <p className="text-slate-300/85 text-sm md:text-base mb-4">{role.gatewaySubtitle}</p>
              <span className="inline-flex items-center gap-2 text-cyan-300 font-semibold text-sm">
                Open Portfolio <ChevronRight size={16} />
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  </div>
);

function PortfolioPage({ roleKey, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const roleData = ROLE_VARIANTS[roleKey];
  const personalInfo = { ...BASE_PERSONAL_INFO, ...roleData.personal };
  const assistantData = {
    roleLabel: roleData.gatewayTitle,
    personalInfo,
    skills: roleData.skills,
    projects: roleData.projects,
    experience: EXPERIENCE,
    education: EDUCATION,
    quickPrompts: roleData.quickPrompts,
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      setScrollY(window.scrollY);
      const sections = ["about", "skills", "projects", "experience", "education", "contact"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 200) setActiveSection(id);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = mobileMenuOpen ? "hidden" : "auto";
    return () => {
      document.documentElement.style.overflow = "auto";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    document.title = `${personalInfo.name} | ${personalInfo.role}`;
  }, [personalInfo.name, personalInfo.role]);

  const navItems = ["About", "Skills", "Projects", "Experience", "Education"];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500 selection:text-slate-950">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="animated-grid-bg parallax-grid absolute inset-0 opacity-25" style={{ transform: `translate3d(0, ${scrollY * 0.06}px, 0)` }} />
        <div className="mesh-blob mesh-blob--one" style={{ transform: `translate3d(0, ${scrollY * 0.12}px, 0)` }} />
        <div className="mesh-blob mesh-blob--two" style={{ transform: `translate3d(0, ${scrollY * -0.08}px, 0)` }} />
        <div className="mesh-blob mesh-blob--three" style={{ transform: `translate3d(0, ${scrollY * 0.05}px, 0)` }} />
      </div>

      <div className="fixed top-2 sm:top-6 left-0 w-full z-50 flex justify-center px-2 sm:px-4">
        <nav className={`top-nav hidden md:flex items-center gap-0.5 sm:gap-1 p-1 sm:p-1.5 rounded-2xl transition-all duration-500 border max-w-full overflow-x-auto hide-scrollbar ${scrolled ? "is-scrolled" : ""}`}>
          {navItems.map((item) => (
            <NavLink key={item} href={`#${item.toLowerCase()}`} label={item} active={activeSection === item.toLowerCase()} />
          ))}
          <div className="w-px h-3 sm:h-4 bg-slate-700 mx-1 sm:mx-2 flex-shrink-0" />
          <button
            onClick={() => onNavigate("/")}
            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs sm:text-sm font-bold rounded-xl transition-all inline-flex items-center gap-2"
          >
            <ArrowLeft size={14} /> Switch Role
          </button>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSectionFast("#contact");
            }}
            className="hire-btn px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer shadow-lg shadow-cyan-900/30 hover:shadow-cyan-900/50 whitespace-nowrap flex-shrink-0"
          >
            Hire Me
          </a>
        </nav>

        <div className="mobile-top-nav md:hidden">
          <div className={`top-nav mobile-top-nav-bar border ${scrolled ? "is-scrolled" : ""}`}>
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="mobile-nav-toggle"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <span className="mobile-nav-title">{roleData.gatewayTitle}</span>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSectionFast("#contact");
                setMobileMenuOpen(false);
              }}
              className="mobile-hire-btn"
            >
              Hire
            </a>
          </div>

          <div className={`mobile-nav-backdrop ${mobileMenuOpen ? "is-open" : ""}`} onClick={() => setMobileMenuOpen(false)} aria-hidden={!mobileMenuOpen} />

          <div className={`mobile-nav-drawer ${mobileMenuOpen ? "is-open" : ""}`}>
            <button
              onClick={() => {
                onNavigate("/");
                setMobileMenuOpen(false);
              }}
              className="mobile-nav-item"
            >
              Switch Role
            </button>
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => {
                  scrollToSectionFast(`#${item.toLowerCase()}`);
                  setMobileMenuOpen(false);
                }}
                className={`mobile-nav-item ${activeSection === item.toLowerCase() ? "mobile-nav-item-active" : ""}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      <ChatInterface key={roleKey} assistantData={assistantData} />

      <header id="about" className="pt-32 pb-14 px-6 relative scroll-mt-40">
        <div className="container mx-auto max-w-6xl">
          <div className="hero-shell rounded-[2rem] border border-cyan-500/20 bg-[#050816]/75 backdrop-blur-xl px-6 py-10 md:px-12 md:py-14 shadow-2xl shadow-black/50">
            <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
              <div className="order-2 md:order-1 flex-1 text-center md:text-left space-y-7">
                <div>
                  <div className="hero-status inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-200 text-xs font-bold mb-4 border border-cyan-400/40">
                    <span className="inline-flex rounded-full h-2 w-2 bg-cyan-400" />
                    Available for Work
                  </div>
                  <h1 className="hero-heading text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.05]">
                    {personalInfo.name}
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-blue-300 to-violet-300 mt-2 text-2xl md:text-4xl">
                      {personalInfo.role}
                    </span>
                  </h1>
                </div>

                <p className="text-lg md:text-xl text-slate-300/90 leading-relaxed max-w-2xl">
                  {personalInfo.headline}
                  <br className="hidden md:block" />
                  {personalInfo.about}
                </p>

                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-cta-primary px-7 py-3.5 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-100 transition-all flex items-center gap-2 shadow-lg hover:shadow-cyan-300/20 hover:-translate-y-0.5"
                  >
                    <Github size={20} /> GitHub
                  </a>
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-cta-secondary px-7 py-3.5 bg-[#0077b5] text-white border border-transparent rounded-xl font-bold hover:bg-[#006097] transition-all flex items-center gap-2 hover:-translate-y-0.5"
                  >
                    <Linkedin size={20} /> LinkedIn
                  </a>
                </div>
              </div>

              <div className="order-1 md:order-2 flex-1 flex justify-center relative">
                <div className="relative w-64 h-64 md:w-80 md:h-80">
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-purple-500 rounded-[2rem] rotate-6 opacity-30 blur-2xl" />
                  <img
                    src={personalInfo.profileImage}
                    alt="Profile"
                    className="relative w-full h-full object-cover rounded-[2rem] border-4 border-slate-800 shadow-2xl rotate-2 hover:rotate-0 transition-all duration-500 bg-slate-800"
                    onError={(e) => {
                      e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${personalInfo.name}`;
                    }}
                  />

                  <div className="profile-badge absolute -bottom-6 -left-6 bg-[#050816]/90 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-cyan-500/30 flex items-center gap-3 transform transition-all hover:scale-105 hover:shadow-cyan-500/20">
                    <div className="bg-cyan-900/50 p-2 rounded-full text-cyan-300">
                      <Code size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase">Role</p>
                      <p className="text-sm font-bold text-white">{personalInfo.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-16 space-y-24 max-w-6xl">
        <section id="skills" className="scroll-mt-40">
          <Reveal>
            <SectionTitle subtitle="My technical toolkit and areas of expertise.">Expertise</SectionTitle>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
            {roleData.skills.map((skill, idx) => (
              <Reveal key={skill.name} delay={idx * 90}>
                <div className="bg-[#0a1124]/75 backdrop-blur-sm p-6 rounded-3xl border border-slate-700 shadow-sm hover:shadow-xl hover:shadow-cyan-900/10 transition-all hover:-translate-y-1.5 group hover:border-cyan-500/40">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${skill.color} group-hover:scale-110 transition-transform`}>
                    {skill.icon}
                  </div>
                  <h3 className="font-bold text-slate-100 text-lg mb-1">{skill.name}</h3>
                  <p className="text-sm text-slate-500 font-medium">{skill.level}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="projects" className="scroll-mt-40">
          <Reveal>
            <SectionTitle subtitle="Selected works demonstrating code quality and product thinking.">Featured Projects</SectionTitle>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-7 max-w-5xl mx-auto">
            {roleData.projects.map((project, idx) => (
              <Reveal key={project.title} delay={idx * 100}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
          <IdeaGenerator skills={roleData.skills} />
        </section>

        <section id="experience" className="scroll-mt-40">
          <Reveal>
            <SectionTitle subtitle={roleData.experienceSubtitle}>Experience</SectionTitle>
          </Reveal>
          <div className="grid gap-6">
            {EXPERIENCE.map((item, idx) => (
              <ExperienceCard key={`${item.company}-${item.role}`} item={item} index={idx} />
            ))}
          </div>
        </section>

        <section id="education" className="max-w-5xl mx-auto scroll-mt-40">
          <Reveal>
            <SectionTitle subtitle="My academic journey and educational background.">Education</SectionTitle>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            {EDUCATION.map((education, idx) => (
              <Reveal key={`${education.institution}-${education.degree}`} delay={idx * 120}>
                <EducationCard education={education} isLatest={idx === 0} />
              </Reveal>
            ))}
          </div>

          <div className="mt-20 text-center">
            <a
              href={personalInfo.resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-200 transition-all shadow-lg hover:shadow-white/20"
            >
              <FileText size={18} /> Download Full Resume
            </a>
          </div>
        </section>

        <section id="contact" className="contact-shell bg-[#050816]/80 backdrop-blur-md rounded-[2rem] p-10 md:p-16 text-center relative overflow-hidden scroll-mt-40 border border-cyan-500/20">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">Ready to collaborate?</h2>
            <p className="text-slate-400 text-lg mb-10">
              I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`mailto:${personalInfo.email}`}
                className="px-8 py-4 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
              >
                <Mail size={20} /> {personalInfo.email}
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-[#0077b5] text-white border border-transparent rounded-xl font-bold hover:bg-[#006097] transition-all flex items-center justify-center gap-2"
              >
                <Linkedin size={20} /> LinkedIn
              </a>
            </div>
          </div>

          <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-900/20 rounded-full mix-blend-screen filter blur-3xl" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-900/20 rounded-full mix-blend-screen filter blur-3xl" />
          </div>
        </section>
      </main>

      <footer className="py-8 text-center text-slate-500 text-sm">
        <p>
          © {new Date().getFullYear()} {personalInfo.name}. Built with React, Tailwind & Gemini AI.
        </p>
      </footer>
    </div>
  );
}

const normalizePath = (pathname) => {
  const cleaned = pathname.replace(/\/+$/, "");
  return cleaned === "" ? "/" : cleaned;
};

const pathToRole = (pathname) => {
  const normalized = normalizePath(pathname);
  if (normalized === ROLE_VARIANTS.flutter.route) return "flutter";
  if (normalized === ROLE_VARIANTS.sde.route) return "sde";
  return null;
};

export default function App() {
  const [pathname, setPathname] = useState(() => normalizePath(window.location.pathname));

  useEffect(() => {
    const onPopState = () => setPathname(normalizePath(window.location.pathname));
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigate = (nextPath) => {
    const normalized = normalizePath(nextPath);
    if (window.location.pathname !== normalized) {
      window.history.pushState({}, "", normalized);
    }
    setPathname(normalized);
    window.scrollTo(0, 0);
  };

  const roleKey = pathToRole(pathname);

  if (!roleKey) {
    return (
      <RoleGateway
        onSelectRole={(selectedRole) => {
          const variant = ROLE_VARIANTS[selectedRole];
          navigate(variant.route);
        }}
      />
    );
  }

  return <PortfolioPage roleKey={roleKey} onNavigate={navigate} />;
}
