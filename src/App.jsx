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
  { name: "n8n Automation", icon: <Zap size={24} />, level: "Advanced", color: "bg-orange-900/30 text-orange-300 border-orange-800" },
  { name: "Gemini AI API", icon: <Sparkles size={24} />, level: "Intermediate", color: "bg-purple-900/30 text-purple-300 border-purple-800" },
  { name: "Firebase & Auth", icon: <Database size={24} />, level: "Advanced", color: "bg-yellow-900/30 text-yellow-300 border-yellow-800" },
  { name: "PostgreSQL", icon: <Server size={24} />, level: "Intermediate", color: "bg-indigo-900/30 text-indigo-300 border-indigo-800" },
  { name: "C++ / DSA", icon: <Code size={24} />, level: "Proficient", color: "bg-slate-800 text-slate-300 border-slate-700" },
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
  },
  {
    title: "Automation Workflow System",
    description: "Modular automation pipelines designed for API calls, parsing, and backend tasks. Optimized data flow between services to reduce latency.",
    tags: ["n8n", "REST APIs", "Automation"],
    github: null, 
    demo: null,
    image: "https://placehold.co/600x400/1e293b/cbd5e1?text=Automation+System"
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
  <div className="mb-16 text-center md:text-left">
    <h2 id={id} className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
      {children}
    </h2>
    <p className="text-lg text-slate-400 max-w-2xl">{subtitle}</p>
  </div>
);

const NavLink = ({ href, label, onClick, active }) => (
  <a 
    href={href} 
    onClick={(e) => {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      if (onClick) onClick();
    }}
    className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
      active ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'text-slate-400 hover:text-white hover:bg-slate-800'
    }`}
  >
    {label}
  </a>
);

const ProjectCard = ({ project }) => (
  <div className="group relative bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-lg hover:shadow-green-900/20 hover:border-green-500/30 transition-all duration-500 hover:-translate-y-2">
    <div className="aspect-video overflow-hidden bg-slate-800 relative">
      <img 
        src={project.image} 
        alt={project.title} 
        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300 flex items-end justify-between p-6">
        <div className="flex gap-3">
          {project.github && (
            <a 
              href={project.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 bg-white text-slate-900 rounded-full hover:bg-slate-200 transition-colors shadow-lg"
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
    <div className="p-8">
      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">{project.title}</h3>
      <p className="text-slate-400 mb-6 leading-relaxed">{project.description}</p>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag, i) => (
          <span key={i} className="px-3 py-1 bg-slate-800 text-blue-200 border border-slate-700 text-xs font-semibold rounded-full uppercase tracking-wider">
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
      const bulletMatch = line.match(/^\s*[\*\-\•]\s*(.+)/);
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
      const context = JSON.stringify({ PERSONAL_INFO, SKILLS, PROJECTS, EDUCATION });
      
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
        <div className="mb-4 w-80 md:w-96 bg-slate-900/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-800 overflow-hidden animate-in slide-in-from-bottom-5">
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

  const generate = async () => {
    setLoading(true);
    const skills = SKILLS.map(s => s.name).join(', ');
    const prompt = `Generate 1 realistic project idea using ${skills}. Output JSON: {title, description (max 15 words), tags}. NO Markdown.`;
    try {
      const res = await callGeminiAPI("Idea", prompt, true);
      setIdea(res);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  return (
    <div className="mt-20 relative rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 p-10 text-center text-white overflow-hidden shadow-2xl border border-slate-700/50">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-white/5 px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-white/10 text-blue-300">
          <Sparkles size={14} className="text-yellow-400" /> AI Powered
        </div>
        <h3 className="text-3xl font-bold mb-4 text-white">Curious what I can build?</h3>
        <p className="text-slate-400 mb-8">Let my AI assistant brainstorm a project concept based on my exact tech stack.</p>
        
        {!idea ? (
          <button onClick={generate} disabled={loading} className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-500 transition-all disabled:opacity-70 flex items-center gap-2 mx-auto shadow-lg shadow-blue-900/20">
            {loading ? <Loader2 className="animate-spin" /> : <Cpu />} 
            {loading ? "Analyzing Stack..." : "Generate Concept"}
          </button>
        ) : (
          <div className="bg-slate-950/50 backdrop-blur-md border border-slate-700 rounded-2xl p-6 text-left animate-in zoom-in duration-300">
            <h4 className="text-xl font-bold mb-2 text-white">{idea.title}</h4>
            <p className="text-slate-300 text-sm mb-4">{idea.description}</p>
            <div className="flex gap-2 mb-4 flex-wrap">
              {idea.tags?.map(t => <span key={t} className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs text-blue-200">{t}</span>)}
            </div>
            <button onClick={generate} className="text-xs text-slate-400 hover:text-white underline">Try another</button>
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
      const sections = ['about', 'skills', 'projects', 'education', 'contact'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= (el.offsetTop - 200)) setActiveSection(id);
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-200 selection:bg-blue-500 selection:text-white">
      
      {/* --- DYNAMIC BACKGROUND (UPDATED COLORS) --- */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-blue-900/20 blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-900/20 blur-[120px]"></div>
        <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] rounded-full bg-purple-900/10 blur-[80px]"></div>
      </div>

      {/* --- FLOATING NAVIGATION --- */}
      <div className="fixed top-6 left-0 w-full z-50 flex justify-center px-4">
        {/* High opacity and border for contrast */}
        <nav className={`flex items-center gap-1 p-1.5 rounded-full transition-all duration-500 border ${scrolled ? 'bg-slate-950/90 backdrop-blur-md shadow-2xl border-slate-800 scale-100' : 'bg-transparent border-transparent scale-105'}`}>
          {['About', 'Skills', 'Projects', 'Education'].map((item) => (
            <NavLink 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              label={item} 
              active={activeSection === item.toLowerCase()}
            />
          ))}
          <div className="w-px h-4 bg-slate-700 mx-2"></div>
          <a 
            href="#contact" 
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-5 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white text-sm font-bold rounded-full transition-all cursor-pointer shadow-lg shadow-green-900/30 hover:shadow-green-900/50"
          >
            Hire Me
          </a>
        </nav>
      </div>

      <ChatInterface />

      {/* --- HERO SECTION --- */}
      <header id="about" className="pt-40 pb-20 px-6 relative scroll-mt-40">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
            
            <div className="order-2 md:order-1 flex-1 text-center md:text-left space-y-8 animate-in slide-in-from-bottom-10 duration-1000">
              <div>
                {/* UPDATED: Badge colors */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-900/30 text-green-400 text-xs font-bold mb-4 border border-green-800">
                  <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span></span>
                  Available for Work
                </div>
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
                  Hello, I'm <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                    {PERSONAL_INFO.name.split(' ')[0]}.
                  </span>
                </h1>
              </div>
              
              <p className="text-xl text-slate-400 leading-relaxed max-w-2xl">
                {PERSONAL_INFO.headline} <br className="hidden md:block" />
                {PERSONAL_INFO.about}
              </p>

              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <a 
                  href={PERSONAL_INFO.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-white text-slate-900 rounded-full font-bold hover:bg-slate-200 transition-all flex items-center gap-2 shadow-lg hover:shadow-white/10"
                >
                  <Github size={20} /> GitHub
                </a>
                <a 
                  href={PERSONAL_INFO.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-[#0077b5] text-white border border-transparent rounded-full font-bold hover:bg-[#006097] transition-all flex items-center gap-2"
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
                  className="relative w-full h-full object-cover rounded-[2rem] border-4 border-slate-800 shadow-2xl rotate-3 hover:rotate-0 transition-all duration-500 bg-slate-800"
                  onError={(e) => { e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${PERSONAL_INFO.name}`; }}
                />
                
                <div className="absolute -bottom-6 -left-6 bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 transform transition-all hover:scale-105 hover:shadow-blue-500/20">
                  <div className="bg-blue-900/50 p-2 rounded-full text-blue-400"><Code size={20} /></div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase">Role</p>
                    <p className="text-sm font-bold text-white">Full Stack Dev</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="container mx-auto px-6 py-20 space-y-32 max-w-6xl">

        {/* SKILLS */}
        <section id="skills" className="scroll-mt-40">
          <SectionTitle subtitle="My technical toolkit and areas of expertise.">Expertise</SectionTitle>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {SKILLS.map((skill, idx) => (
              // UPDATED: Dark mode card styles
              <div key={idx} className={`bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-sm hover:shadow-lg hover:shadow-green-900/10 transition-all hover:-translate-y-1 group hover:border-green-500/50`}>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${skill.color} group-hover:scale-110 transition-transform`}>
                  {skill.icon}
                </div>
                <h3 className="font-bold text-slate-100 text-lg mb-1">{skill.name}</h3>
                <p className="text-sm text-slate-500 font-medium">{skill.level}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="scroll-mt-40">
          <SectionTitle subtitle="Selected works demonstrating code quality and product thinking.">Featured Projects</SectionTitle>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map((project, idx) => <ProjectCard key={idx} project={project} />)}
          </div>
          <IdeaGenerator />
        </section>

        {/* EDUCATION */}
        <section id="education" className="max-w-4xl mx-auto scroll-mt-40">
          <SectionTitle subtitle="My academic journey and educational background.">Education</SectionTitle>
          <div className="relative border-l-2 border-slate-800 ml-3 md:ml-0 md:border-l-0 space-y-16">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-800 -translate-x-1/2"></div>
            {EDUCATION.map((education, idx) => <EducationCard key={idx} education={education} isLatest={idx === 0} />)}
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
        <section id="contact" className="bg-slate-900 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden scroll-mt-40 border border-slate-800">
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