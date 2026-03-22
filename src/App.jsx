import React, { useState, useEffect, useRef } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Briefcase,
  User,
  FileText,
  Menu,
  X,
  ChevronRight,
  Cpu,
  Globe,
  Database,
  Terminal,
  Smartphone,
  Zap,
  Server,
  GraduationCap,
  ArrowUp,
  Sparkles,
  MessageCircle,
  Send,
  Bot,
  Loader2,
  Layers,
  Command
} from 'lucide-react';

// --- GEMINI API CONFIGURATION ---
// SECURE: Access key from Environment Variables (Vite standard)
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";

// Debug: Check if API key is loaded
if (import.meta.env.DEV) {
  console.log("🔑 API Key Status:", apiKey ? "✅ Loaded" : "❌ Missing - Running in demo mode");
}

// --- USER DATA CONFIGURATION ---
const PERSONAL_INFO = {
  name: "Utkarsh Tiwari",
  role: "Software Developer (Flutter + Automation)",
  headline: "Crafting digital experiences with code & creativity.",
  about: "I am a pre-final year B.Tech student and passionate Flutter Developer. I bridge the gap between complex backend logic and intuitive mobile interfaces. My work focuses on scalable cross-platform apps and intelligent automation workflows that save time and solve real problems.",
  email: "utkt9502@gmail.com",
  github: "https://github.com/codemacUT",
  linkedin: "https://www.linkedin.com/in/utkarsh-tiwari-491846274/",
  resumeLink: "https://drive.google.com/file/d/1303xZx9BDQwpLqVpOZnWx4NofRpbObKt/view?usp=sharing",
  phone: "+91-8299502048",
  profileImage: "profile.jpg",
};

const SKILLS = [
  { name: "Flutter & Dart", icon: <Smartphone size={24} />, level: "Specialist", color: "bg-blue-900/30 text-blue-300 border-blue-800" },
  { name: "SQL & PostgreSQL", icon: <Server size={24} />, level: "Advanced", color: "bg-indigo-900/30 text-indigo-300 border-indigo-800" },
  { name: "Excel Data Analysis", icon: <Layers size={24} />, level: "Advanced", color: "bg-emerald-900/30 text-emerald-300 border-emerald-800" },
  { name: "GIS & Mappls", icon: <Globe size={24} />, level: "Intermediate", color: "bg-cyan-900/30 text-cyan-300 border-cyan-800" },
  { name: "n8n Automation", icon: <Zap size={24} />, level: "Advanced", color: "bg-orange-900/30 text-orange-300 border-orange-800" },
  { name: "Gemini AI API", icon: <Sparkles size={24} />, level: "Intermediate", color: "bg-purple-900/30 text-purple-300 border-purple-800" },
  { name: "Firebase & REST APIs", icon: <Database size={24} />, level: "Advanced", color: "bg-yellow-900/30 text-yellow-300 border-yellow-800" },
  { name: "Java + C++ / DSA", icon: <Code size={24} />, level: "Proficient", color: "bg-slate-800 text-slate-300 border-slate-700" },
  { name: "Git & GitHub Actions", icon: <Command size={24} />, level: "Intermediate", color: "bg-rose-900/30 text-rose-300 border-rose-800" },
];

const PROJECTS = [
  {
    title: "Smart Attendee App",
    description: "QR-based attendance system reducing class roll-call time by 80%. Features a PostgreSQL backend on Render with Firebase Auth for zero data loss.",
    tags: ["Flutter", "Firebase", "PostgreSQL"],
    github: "https://github.com/codemacUT/smart-attendee-app",
    demo: null,
    image: "https://placehold.co/600x400/1e293b/cbd5e1?text=Smart+Attendee+App"
  },
  {
    title: "AI-Integrated Telegram Bot",
    description: "Event-driven bot integrating Gemini API to process prompts and deliver AI images in under 30s. Built with fault-tolerant n8n workflows.",
    tags: ["Gemini API", "n8n", "Webhooks"],
    github: "https://github.com/codemacUT/prompt2pic-ai",
    demo: null,
    image: "https://placehold.co/600x400/1e293b/cbd5e1?text=AI+Telegram+Bot"
  }
];

const EXPERIENCE = [
  {
    company: "Paytm Payments Services Ltd.",
    role: "Operations & GIS Analytics Intern",
    period: "Dec 2025 - Mar 2026",
    location: "India",
    summary: "Worked on operational and geospatial data quality workflows using SQL, Google Sheets, and Mappls (MapmyIndia) to improve mapping accuracy and integrity.",
    highlights: [
      "Queried and analyzed operational/geospatial datasets in SQL to identify mapping inconsistencies.",
      "Segmented entities into active/passive categories to evaluate coverage and data accuracy.",
      "Performed data cleaning and validation in Google Sheets with lookup and pivot techniques.",
      "Validated and corrected location mappings in Mappls, reducing overlap and improving spatial precision.",
      "Applied rule-based checks to detect inconsistencies and support corrective actions."
    ],
    tags: ["SQL", "GIS Analytics", "Google Sheets", "Mappls", "Data Quality"]
  }
];

const EDUCATION = [
  {
    institution: "JSS Academy Of Technical Education",
    degree: "B.Tech in Computer Science",
    period: "2023 - Present",
    description: "Pre-final year student. Focusing on Software Development, Data Structures, and Algorithms. Active in building practical projects.",
    type: "education"
  },
  {
    institution: "Dr. Virendra Swaroop Education Centre",
    degree: "Intermediate (Class XII)",
    period: "Completed 2023",
    description: "ISC Board. Achieved 91.5%. Strong foundation in mathematics and computer science principles.",
    type: "education"
  }
];

// --- HELPER FUNCTIONS ---
async function callGeminiAPI(prompt, systemInstruction, isJson = false) {
  if (!apiKey) {
    console.warn("API Key missing. Returning demo data.");
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (isJson) {
      return {
        title: "Smart Eco-Tracker (Demo)",
        description: "A Flutter app that uses AI to classify waste from photos and tracks carbon footprint via n8n.",
        tags: ["Flutter", "AI", "n8n"]
      };
    }
    return "I'm currently running in demo mode. Utkarsh is a skilled developer specializing in Flutter, n8n automation, and backend integration!";
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
  const payload = { contents: [{ parts: [{ text: prompt }] }], systemInstruction: { parts: [{ text: systemInstruction }] } };

  if (isJson) {
    payload.generationConfig = {
      responseMimeType: "application/json",
      responseSchema: {
        type: "OBJECT",
        properties: {
          title: { type: "STRING" },
          description: { type: "STRING" },
          tags: { type: "ARRAY", items: { type: "STRING" } }
        }
      }
    };
  }

  for (let i = 0; i < 3; i++) {
    try {
      const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) throw new Error("No content");

      if (isJson) return JSON.parse(text.replace(/```json|```/g, '').trim());
      return text;
    } catch (e) {
      if (i === 2) throw e;
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}

// --- COMPONENTS ---

const SectionTitle = ({ children, id, subtitle }) => (
  <div className="mb-12 text-center md:text-left">
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/70 border border-slate-700 text-xs font-semibold tracking-widest uppercase text-cyan-300 mb-4">
      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
      Section
    </div>
    <h2 id={id} className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-3">
      {children}
    </h2>
    <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto md:mx-0">{subtitle}</p>
  </div>
);

const Reveal = ({ children, delay = 0, y = 20, className = "" }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

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
        transform: visible ? "translateY(0px)" : `translateY(${y}px)`,
        transition: `opacity 700ms ease ${delay}ms, transform 700ms ease ${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

const NavLink = ({ href, label, onClick, active }) => (
  <a
    href={href}
    onClick={(e) => {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      if (onClick) onClick();
    }}
    className={`relative px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap ${active ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-900/40' : 'text-slate-300/90 hover:text-white hover:bg-slate-800/80'
      }`}
  >
    {label}
  </a>
);

const ProjectCard = ({ project }) => (
  <div className="group relative rounded-3xl overflow-hidden border border-slate-800/90 bg-gradient-to-b from-slate-900 to-slate-950 shadow-xl shadow-slate-950/40 transition-all duration-500 hover:-translate-y-2 hover:border-cyan-500/40">
    <div className="aspect-video overflow-hidden bg-slate-800 relative">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-85 group-hover:opacity-100"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-70 group-hover:opacity-95 transition-opacity duration-300 flex items-end justify-between p-5">
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
      <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">{project.title}</h3>
      <p className="text-slate-400 mb-6 leading-relaxed text-sm md:text-base">{project.description}</p>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag, i) => (
          <span key={i} className="px-3 py-1 bg-slate-900 text-cyan-100 border border-slate-700 text-[11px] font-semibold rounded-full uppercase tracking-wider">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const EducationCard = ({ education, isLatest }) => (
  <div className="relative pl-8 md:pl-0">
    {/* Mobile Line */}
    <div className="md:hidden absolute left-2 top-2 bottom-0 w-0.5 bg-slate-800"></div>

    <div className="md:flex items-center justify-between group">
      <div className="hidden md:block w-1/2 pr-12 text-right">
        <span className={`text-sm font-bold tracking-widest uppercase ${isLatest ? 'text-green-400' : 'text-slate-500'}`}>
          {education.period}
        </span>
        <h3 className="text-xl font-bold text-white mt-1">{education.institution}</h3>
      </div>

      {/* Timeline Dot */}
      <div className={`absolute left-0 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full border-4 z-10 transition-all duration-300 
        ${isLatest
          ? 'bg-green-500 border-green-900 shadow-[0_0_0_4px_rgba(34,197,94,0.2)]'
          : 'bg-slate-900 border-slate-700 shadow-[0_0_0_4px_rgba(30,41,59,0.5)]'
        }`}>
        {isLatest && <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75"></div>}
      </div>

      <div className="md:w-1/2 md:pl-12 pb-16">
        <div className="md:hidden mb-2">
          <span className={`text-xs font-bold px-2 py-1 rounded ${isLatest ? 'text-green-300 bg-green-900/30 border border-green-800' : 'text-slate-400 bg-slate-800 border border-slate-700'}`}>
            {education.period}
          </span>
        </div>
        <h4 className="text-lg font-bold text-slate-200 md:mb-1 group-hover:text-blue-400 transition-colors">{education.degree}</h4>
        <h5 className="text-md text-slate-500 md:hidden mb-2">{education.institution}</h5>
        <p className="text-slate-400 text-sm leading-relaxed">{education.description}</p>
      </div>
    </div>
  </div>
);

const ExperienceCard = ({ item, index }) => (
  <Reveal delay={index * 120}>
    <div className="group relative overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/70 backdrop-blur-sm p-7 md:p-8 shadow-xl shadow-slate-950/40 hover:border-cyan-500/50 transition-all duration-500 hover:-translate-y-1">
      <div className="absolute -top-20 -right-16 h-44 w-44 rounded-full bg-cyan-500/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-60" />
      <div className="relative z-10">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-white">{item.role}</h3>
            <p className="text-cyan-300 font-semibold mt-1">{item.company}</p>
          </div>
          <span className="text-xs font-bold tracking-wider uppercase px-3 py-1.5 rounded-full bg-cyan-500/10 text-cyan-200 border border-cyan-500/30">
            {item.period}
          </span>
        </div>

        <p className="text-slate-300 leading-relaxed mb-5">{item.summary}</p>

        <ul className="space-y-2.5 mb-6">
          {item.highlights.map((point, pointIdx) => (
            <li key={pointIdx} className="flex items-start gap-2.5 text-slate-400">
              <ChevronRight size={14} className="mt-1 text-cyan-400 flex-shrink-0" />
              <span>{point}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag, tagIdx) => (
            <span
              key={tagIdx}
              className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-slate-950 text-slate-300 border border-slate-700"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  </Reveal>
);

// --- AI COMPONENTS ---
const ChatInterface = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'assistant', text: "Hi! I'm Utkarsh's AI assistant. Ask me about his skills or projects." }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => { scrollRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isOpen]);

  // Helper function to parse markdown bold (**text**) and return React elements
  const parseMarkdownBold = (text) => {
    const boldRegex = /\*\*(.+?)\*\*/g;
    const parts = [];
    let lastIndex = 0;
    let match;
    let key = 0;

    while ((match = boldRegex.exec(text)) !== null) {
      // Add text before the bold
      if (match.index > lastIndex) {
        parts.push(<span key={key++}>{text.substring(lastIndex, match.index)}</span>);
      }
      // Add the bold text
      parts.push(<strong key={key++} className="font-semibold">{match[1]}</strong>);
      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(<span key={key++}>{text.substring(lastIndex)}</span>);
    }

    return parts.length > 0 ? parts : [<span key={0}>{text}</span>];
  };

  // Helper function to detect links and return clickable elements with proper formatting
  const renderMessage = (text) => {
    // Split by newlines first to handle line breaks
    const lines = text.split('\n');

    return lines.map((line, lineIdx) => {
      // Skip empty lines
      if (!line.trim() && lineIdx < lines.length - 1) {
        return <br key={lineIdx} />;
      }

      // Handle markdown-style bullet points
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

      // Regular line with potential URLs
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      const parts = line.split(urlRegex);

      const lineContent = parts.map((part, partIdx) => {
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
      });

      return (
        <div key={lineIdx} className={lineIdx < lines.length - 1 ? 'mb-2' : ''}>
          {lineContent}
        </div>
      );
    });
  };

  const send = async () => {
    if (!input.trim() || loading) return;
    const msg = input; setInput(''); setLoading(true);
    setMessages(p => [...p, { role: 'user', text: msg }]);
    try {
      const context = JSON.stringify({ PERSONAL_INFO, SKILLS, PROJECTS, EXPERIENCE, EDUCATION });

      const systemPrompt = `
        You are a professional portfolio assistant for ${PERSONAL_INFO.name}.
        Use this data to answer: ${context}.
        
        CRITICAL RULES:
        1. If asked for a resume/CV, DO NOT ask for an email. Give this link directly: ${PERSONAL_INFO.resumeLink}
        2. If asked to contact him, give this email: ${PERSONAL_INFO.email}
        3. Provide raw URLs only. Do NOT use markdown links like [Link](url).
        4. When listing multiple items (like projects or links), put each item on a NEW LINE.
        5. Use bullet points with asterisk (*) for lists, with each item on a separate line.
        6. Format URLs on separate lines for better readability.
        7. Do NOT use markdown bold syntax (**text**). Just use plain text for project names.
        8. Keep answers concise (max 3 sentences for general answers, but lists can be longer).
        
        FORMATTING EXAMPLE:
        If listing projects, format like this:
        * Smart Attendee App: https://github.com/username/project
        * AI-Integrated Telegram Bot: https://github.com/username/another
        * LinkedIn: https://www.linkedin.com/in/utkarsh-tiwari-491846274/
        * GitHub: https://github.com/codemacUT
        
        NOT like this:
        * **Smart Attendee App:** https://github.com/username/project
        Project Name: https://github.com/username/project Another Project: https://github.com/username/another
      `;

      const reply = await callGeminiAPI(msg, systemPrompt);
      setMessages(p => [...p, { role: 'assistant', text: reply }]);
    } catch {
      setMessages(p => [...p, { role: 'assistant', text: "Connection error. Please check your API Key." }]);
    }
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 bg-slate-900/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-800 overflow-hidden">
          <div className="bg-slate-950 p-4 text-white flex justify-between items-center border-b border-slate-800">
            <div className="flex items-center gap-2 font-bold"><Bot size={18} className="text-blue-400" /> AI Assistant</div>
            <button onClick={() => setIsOpen(false)}><X size={18} /></button>
          </div>
          <div className="h-80 p-4 overflow-y-auto space-y-3 bg-slate-950/50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm whitespace-pre-wrap ${m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-200 border border-slate-700 shadow-sm'}`}>
                  {m.role === 'assistant' ? renderMessage(m.text) : m.text}
                </div>
              </div>
            ))}
            {loading && <Loader2 size={16} className="animate-spin text-slate-500" />}
            <div ref={scrollRef} />
          </div>
          <div className="p-3 bg-slate-950 border-t border-slate-800 flex gap-2">
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Type a message..." className="flex-1 bg-slate-900 text-white rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border border-slate-800 placeholder:text-slate-500" />
            <button onClick={send} disabled={loading} className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-500 disabled:opacity-50"><Send size={16} /></button>
          </div>
        </div>
      )}
      <button onClick={() => setIsOpen(!isOpen)} className="h-14 w-14 bg-blue-600 text-white rounded-full shadow-xl hover:scale-105 transition-transform flex items-center justify-center hover:bg-blue-500 shadow-blue-900/20">
        {isOpen ? <X /> : <MessageCircle />}
      </button>
    </div>
  );
};

const IdeaGenerator = () => {
  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fallback Data Pool (Varied Skill Combinations)
  const MOCK_IDEAS = [
    {
      title: "Smart Lens AI",
      tagline: "Point-and-shoot object identifier using Gemini Vision.",
      features: ["Flutter camera integration", "Gemini Multimodal API", "Instant object analysis"],
      tags: ["Flutter", "Gemini API", "Dart"],
      difficulty: "Intermediate"
    },
    {
      title: "Auto-CRM Sync",
      tagline: "Self-hosting CRM automation system without coding.",
      features: ["n8n webhook triggers", "PostgreSQL data storage", "Automated email workflows"],
      tags: ["n8n", "PostgreSQL", "Automation"],
      difficulty: "Advanced"
    },
    {
      title: "High-Freq Trading Sim",
      tagline: "Low-latency trading engine simulator.",
      features: ["C++ optimized matching engine", "O(1) order book lookups", "Real-time performance metrics"],
      tags: ["C++", "DSA", "System Design"],
      difficulty: "Advanced"
    }
  ];

  const generate = async () => {
    setIdea(null);
    setLoading(true);
    const skills = SKILLS.map(s => s.name).join(', ');

    // Few-Shot Prompting for JSON Structure
    const prompt = `
    Role: Senior Tech Architect.
    Task: Generate 1 impressive project idea using a creative combination of 2-3 of these skills: ${skills}.
    
    Example Output JSON:
    {
      "title": "NebulaStream",
      "tagline": "Real-time distributed data processing engine.",
      "features": ["Low-latency event processing", "Fault-tolerant architecture", "Visual data pipeline builder"],
      "tags": ["Flutter", "Gemini API"],
      "difficulty": "Advanced"
    }
    
    Generate for: ${skills}`;

    const systemInstruction = `You are a Senior Technical Architect.
    CRITICAL: Output ONLY valid JSON.
    Constraints:
    - Title: Max 5 words.
    - Tagline: Max 15 words.
    - Features: Exactly 3 short bullet points.
    - Difficulty: Beginner, Intermediate, or Advanced.
    - Tech Stack: Pick 2-3 relevant skills from input.`;

    try {
      let res = await callGeminiAPI(prompt, systemInstruction, true);

      // STRICT VALIDATION: Fail if any key field is missing or empty
      if (!res || typeof res !== 'object' || !res.title || !res.tagline || !Array.isArray(res.features)) {
        throw new Error("Incomplete JSON");
      }

      const safeRes = {
        title: res.title.substring(0, 60), // Relaxed limit
        tagline: res.tagline.substring(0, 120), // Relaxed limit
        features: res.features.slice(0, 3).map(f => f.substring(0, 80)),
        tags: Array.isArray(res.tags) ? res.tags.slice(0, 4) : ["React", "Node.js"],
        difficulty: ["Beginner", "Intermediate", "Advanced"].includes(res.difficulty) ? res.difficulty : "Intermediate"
      };

      setIdea(safeRes);
    } catch (e) {
      console.error("Generation failed, using fallback:", e);
      // Random Fallback
      const randomIdea = MOCK_IDEAS[Math.floor(Math.random() * MOCK_IDEAS.length)];
      setIdea(randomIdea);
    }
    setLoading(false);
  };

  return (
    <div className="mt-20 relative rounded-[2.5rem] bg-slate-900 border border-slate-800 p-8 md:p-12 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 border border-slate-700 text-blue-300 text-sm font-semibold mb-6">
          <Sparkles size={16} className="text-yellow-400" />
          <span>AI Project Architect</span>
        </div>

        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Stuck on what to build next?</h3>
        <p className="text-slate-400 mb-10 text-lg">Generate a portfolio-worthy project idea tailored to your exact skill set.</p>

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
              <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${idea.difficulty === 'Advanced' ? 'bg-red-900/20 text-red-400 border-red-900/50' :
                idea.difficulty === 'Intermediate' ? 'bg-yellow-900/20 text-yellow-400 border-yellow-900/50' :
                  'bg-green-900/20 text-green-400 border-green-900/50'
                }`}>
                {idea.difficulty}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h5 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Layers size={16} /> Key Features
                </h5>
                <ul className="space-y-3">
                  {idea.features?.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-300">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0"></span>
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
                  {idea.tags?.map(t => (
                    <span key={t} className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-300 font-medium">
                      {t}
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

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = ['about', 'skills', 'projects', 'experience', 'education', 'contact'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= (el.offsetTop - 200)) setActiveSection(id);
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-200 selection:bg-cyan-500 selection:text-slate-950">

      {/* --- DYNAMIC BACKGROUND (UPDATED COLORS) --- */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="animated-grid-bg absolute inset-0 opacity-25" />
        <div className="mesh-blob mesh-blob--one"></div>
        <div className="mesh-blob mesh-blob--two"></div>
        <div className="mesh-blob mesh-blob--three"></div>
      </div>

      {/* --- FLOATING NAVIGATION --- */}
      <div className="fixed top-3 sm:top-6 left-0 w-full z-50 flex justify-center px-2 sm:px-4">
        <nav className={`flex items-center gap-0.5 sm:gap-1 p-1 sm:p-1.5 rounded-full transition-all duration-500 border max-w-full overflow-x-auto hide-scrollbar ${scrolled ? 'bg-slate-950/75 backdrop-blur-xl shadow-2xl shadow-slate-950/70 border-slate-700 scale-100' : 'bg-slate-950/35 backdrop-blur-md border-slate-800/70 scale-100'}`}>
          {['About', 'Skills', 'Projects', 'Experience', 'Education'].map((item) => (
            <NavLink
              key={item}
              href={`#${item.toLowerCase()}`}
              label={item}
              active={activeSection === item.toLowerCase()}
            />
          ))}
          <div className="w-px h-3 sm:h-4 bg-slate-700 mx-1 sm:mx-2 flex-shrink-0"></div>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white text-xs sm:text-sm font-bold rounded-full transition-all cursor-pointer shadow-lg shadow-cyan-900/30 hover:shadow-cyan-900/50 whitespace-nowrap flex-shrink-0"
          >
            Hire Me
          </a>
        </nav>
      </div>

      <ChatInterface />

      {/* --- HERO SECTION --- */}
      <header id="about" className="pt-36 pb-16 px-6 relative scroll-mt-40">
        <div className="container mx-auto max-w-6xl">
          <div className="rounded-[2.5rem] border border-slate-800/80 bg-slate-900/45 backdrop-blur-xl px-6 py-10 md:px-12 md:py-14 shadow-2xl shadow-slate-950/40">
            <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">

              <div className="order-2 md:order-1 flex-1 text-center md:text-left space-y-7">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-900/30 text-cyan-300 text-xs font-bold mb-4 border border-cyan-800/70">
                    <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-300 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span></span>
                    Available for Work
                  </div>
                  <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.05]">
                    Building products that
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 mt-2">
                      feel simple.
                    </span>
                  </h1>
                </div>

                <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl">
                  {PERSONAL_INFO.headline} <br className="hidden md:block" />
                  {PERSONAL_INFO.about}
                </p>

                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-7 py-3.5 bg-white text-slate-900 rounded-full font-bold hover:bg-slate-100 transition-all flex items-center gap-2 shadow-lg hover:shadow-cyan-300/20 hover:-translate-y-0.5"
                  >
                    <Github size={20} /> GitHub
                  </a>
                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-7 py-3.5 bg-[#0077b5] text-white border border-transparent rounded-full font-bold hover:bg-[#006097] transition-all flex items-center gap-2 hover:-translate-y-0.5"
                  >
                    <Linkedin size={20} /> LinkedIn
                  </a>
                </div>
              </div>

              <div className="order-1 md:order-2 flex-1 flex justify-center relative">
                <div className="relative w-64 h-64 md:w-80 md:h-80">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-[2rem] rotate-6 opacity-30 blur-2xl animate-pulse"></div>
                  <img
                    src={PERSONAL_INFO.profileImage}
                    alt="Profile"
                    className="relative w-full h-full object-cover rounded-[2rem] border-4 border-slate-800 shadow-2xl rotate-2 hover:rotate-0 transition-all duration-500 bg-slate-800"
                    onError={(e) => { e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${PERSONAL_INFO.name}`; }}
                  />

                  <div className="absolute -bottom-6 -left-6 bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 transform transition-all hover:scale-105 hover:shadow-cyan-500/20">
                    <div className="bg-cyan-900/50 p-2 rounded-full text-cyan-300"><Code size={20} /></div>
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase">Role</p>
                      <p className="text-sm font-bold text-white">{PERSONAL_INFO.role}</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="container mx-auto px-6 py-16 space-y-28 max-w-6xl">

        {/* SKILLS */}
        <section id="skills" className="scroll-mt-40">
          <Reveal>
            <SectionTitle subtitle="My technical toolkit and areas of expertise.">Expertise</SectionTitle>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
            {SKILLS.map((skill, idx) => (
              <Reveal key={idx} delay={idx * 90}>
                <div className={`bg-slate-900/70 backdrop-blur-sm p-6 rounded-3xl border border-slate-800 shadow-sm hover:shadow-xl hover:shadow-cyan-900/10 transition-all hover:-translate-y-1.5 group hover:border-cyan-500/40`}>
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

        {/* PROJECTS */}
        <section id="projects" className="scroll-mt-40">
          <Reveal>
            <SectionTitle subtitle="Selected works demonstrating code quality and product thinking.">Featured Projects</SectionTitle>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {PROJECTS.map((project, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
          <IdeaGenerator />
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="scroll-mt-40">
          <Reveal>
            <SectionTitle subtitle="Industry internship experience aligned with operational analytics and geospatial data quality.">Experience</SectionTitle>
          </Reveal>
          <div className="grid gap-6">
            {EXPERIENCE.map((item, idx) => <ExperienceCard key={idx} item={item} index={idx} />)}
          </div>
        </section>

        {/* EDUCATION */}
        <section id="education" className="max-w-4xl mx-auto scroll-mt-40">
          <Reveal>
            <SectionTitle subtitle="My academic journey and educational background.">Education</SectionTitle>
          </Reveal>
          <div className="relative border-l-2 border-slate-800 ml-3 md:ml-0 md:border-l-0 space-y-16">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-800 -translate-x-1/2"></div>
            {EDUCATION.map((education, idx) => (
              <Reveal key={idx} delay={idx * 120}>
                <EducationCard education={education} isLatest={idx === 0} />
              </Reveal>
            ))}
          </div>

          <div className="mt-20 text-center">
            <a
              href={PERSONAL_INFO.resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 rounded-full font-bold hover:bg-slate-200 transition-all shadow-lg hover:shadow-white/20"
            >
              <FileText size={18} /> Download Full Resume
            </a>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="bg-slate-900/80 backdrop-blur-md rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden scroll-mt-40 border border-slate-800">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">Ready to collaborate?</h2>
            <p className="text-slate-400 text-lg mb-10">
              I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="px-8 py-4 bg-white text-slate-900 rounded-full font-bold hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
              >
                <Mail size={20} /> {PERSONAL_INFO.email}
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-[#0077b5] text-white border border-transparent rounded-full font-bold hover:bg-[#006097] transition-all flex items-center justify-center gap-2"
              >
                <Linkedin size={20} /> LinkedIn
              </a>
            </div>
          </div>

          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-900/20 rounded-full mix-blend-screen filter blur-3xl"></div>
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-900/20 rounded-full mix-blend-screen filter blur-3xl"></div>
          </div>
        </section>

      </main>

      <footer className="py-8 text-center text-slate-500 text-sm">
        <p>© {new Date().getFullYear()} {PERSONAL_INFO.name}. Built with React, Tailwind & Gemini AI.</p>
      </footer>

    </div>
  );
}
