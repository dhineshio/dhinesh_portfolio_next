"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowUpRight, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const FILTERS = ["All", "Websites", "Mobile App", "Portals", "Products"];

const TECH_ICONS: Record<string, string> = {
  html:       "/icons/ic_html.png",
  css:        "/icons/ic_css.png",
  js:         "/icons/ic_js.png",
  typescript: "/icons/ic_ts.png",
  bootstrap:  "/icons/ic_bootstrap.png",
  tailwind:   "/icons/ic_tailwind.png",
  nextjs:     "/icons/ic_nextjs.png",
  flutter:    "/icons/ic_flutter.png",
  dart:       "/icons/ic_dart.png",
  python:     "/icons/ic_python.png",
  django:     "/icons/ic_django.png",
};

const TECH_LABELS: Record<string, string> = {
  html:       "HTML",
  css:        "CSS",
  js:         "JavaScript",
  typescript: "TypeScript",
  bootstrap:  "Bootstrap",
  tailwind:   "Tailwind CSS",
  nextjs:     "Next.js",
  flutter:    "Flutter",
  dart:       "Dart",
  python:     "Python",
  django:     "Django",
};

type Project = {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  url: string;
  screenshot: string;
  logo: string;
  techStack: string[];
};

const PROJECTS: Project[] = [
  {
    id: "fiveflow",
    name: "Five Flow Infra",
    category: "Websites",
    tagline: "Plumbing, Fire Safety & Treatment Plant Consultant",
    description:
      "Built with SEO optimization and a dynamic UI fully manageable through a custom admin panel — content, sections, and visuals update without code changes.",
    url: "https://fiveflowinfra.com/",
    screenshot: "/projects/fiveflow-screen.png",
    logo: "/companies/five_flow_logo.png",
    techStack: ["html", "css", "js", "bootstrap"],
  },
  {
    id: "skillup-languages",
    name: "Skill Up Languages",
    category: "Websites",
    tagline: "Educational Institute — Language Courses",
    description:
      "Static website for a language learning institute offering English and Hindi courses, built for performance and SEO.",
    url: "https://www.skilluplanguages.com/",
    screenshot: "/projects/skillup-languages-screen.png",
    logo: "/companies/skillup_languages_logo.png",
    techStack: ["nextjs", "tailwind", "typescript"],
  },
  {
    id: "topgrade",
    name: "Top Grade",
    category: "Websites",
    tagline: "Online E-Learning Platform Landing Page",
    description:
      "Landing page for an e-learning platform built to drive course enrollments with a clean, conversion-focused design.",
    url: "https://www.topgradeinnovation.com/",
    screenshot: "/projects/topgrade-screen.png",
    logo: "/companies/topgrade_logo.png",
    techStack: ["html", "css", "tailwind", "js"],
  },
  {
    id: "sri-karpom-karpipom",
    name: "Sri Karpom Karpipom",
    category: "Websites",
    tagline: "Children's Tamil Online Learning Academy",
    description:
      "Static website for a Tamil language teaching institute for children, showcasing courses and enrollment details.",
    url: "https://srikarpomkarpipom.com/",
    screenshot: "/projects/sri-karpom-karpipom-screen.png",
    logo: "/companies/sri_karpom_karpipom_logo.png",
    techStack: ["nextjs", "tailwind", "typescript"],
  },
  {
    id: "rims-edu",
    name: "RIMS Faculty of Nursing",
    category: "Websites",
    tagline: "Nursing College — Institutional Website",
    description:
      "Official website for RIMS Faculty of Nursing with course details, admissions, and college information.",
    url: "https://www.rimsedu.in/",
    screenshot: "/projects/rims-screen.png",
    logo: "/companies/rims_logo.png",
    techStack: ["html", "css", "js", "bootstrap"],
  },
  {
    id: "rvr-engineering",
    name: "RVR Engineering ERP",
    category: "Portals",
    tagline: "Internal Management System",
    description:
      "Full-scale ERP built from scratch — staff management, accounts, clients, lead tracking, and real-time WebSocket chat, all in one platform.",
    url: "https://pm.rvrengineering.com/",
    screenshot: "/projects/rvr-engineering-portal.png",
    logo: "/companies/rvr_logo.png",
    techStack: ["nextjs", "tailwind", "typescript", "python", "django"],
  },
  {
    id: "a11y-alt-product",
    name: "A11y Alt Text",
    category: "Products",
    tagline: "AI-Powered Alt Text Generator",
    description:
      "AI product that automatically generates accurate alt text for images, improving web accessibility and SEO for publishers.",
    url: "https://alt.a11ydigitech.com/",
    screenshot: "/projects/a11yalt-product.png",
    logo: "/companies/a11y_digitech_logo.png",
    techStack: ["nextjs", "tailwind", "typescript", "python", "django"],
  },
  {
    id: "topgrade-app",
    name: "Top Grade App",
    category: "Mobile App",
    tagline: "E-Learning Mobile Application",
    description:
      "Mobile app for the Top Grade e-learning platform — students can access courses, track progress, and learn on the go.",
    url: "https://play.google.com/store/apps/details?id=com.topgrade.app&pcampaignid=web_share",
    screenshot: "/projects/topgrade-mobile.png",
    logo: "/companies/topgrade_logo.png",
    techStack: ["flutter", "dart"],
  },
  {
    id: "rims-admin",
    name: "RIMS College Portal",
    category: "Portals",
    tagline: "Complete College Management System",
    description:
      "Large-scale subdomain-based management portal covering student records, admissions, faculty, and college operations end-to-end.",
    url: "https://admin.rimsedu.in/",
    screenshot: "/projects/rims-admin.png",
    logo: "/companies/rims_logo.png",
    techStack: ["html", "css", "js", "python", "django"],
  },
  {
    id: "hita-decor",
    name: "Hita Decor",
    category: "Websites",
    tagline: "Home Decor E-Commerce Store",
    description:
      "Full e-commerce website for a home decor brand with product listings, cart, and order flow.",
    url: "https://hitadecor.com/",
    screenshot: "/projects/hita-screen.png",
    logo: "/companies/hita_logo.png",
    techStack: ["html", "css", "bootstrap", "js"],
  },
  {
    id: "topgrade-admin",
    name: "Top Grade LMS Portal",
    category: "Portals",
    tagline: "Learning Management System",
    description:
      "Full LMS portal — course video uploads, student management, progress stats, and automated certificate distribution.",
    url: "https://www.topgradeinnovation.com/dashboard/signin/",
    screenshot: "/projects/topgrade-admin.png",
    logo: "/companies/topgrade_logo.png",
    techStack: ["html", "css", "js", "bootstrap", "python", "django"],
  },
  {
    id: "gcc-attendance",
    name: "GCC Attendance App",
    category: "Mobile App",
    tagline: "Government Staff Attendance Management",
    description:
      "Mobile app for government staff attendance management — built for the Greater Chennai Corporation to streamline daily attendance tracking and reporting.",
    url: "https://play.google.com/store/apps/details?id=com.m7corp.gccPhdAttendanceApp&pcampaignid=web_share",
    screenshot: "/projects/gcc-mobile",
    logo: "/companies/gcc_logo.png",
    techStack: ["flutter", "dart"],
  },
  {
    id: "auctus",
    name: "Auctus Technology",
    category: "Websites",
    tagline: "Software Company — Professional Dynamic Site",
    description:
      "SEO-optimized professional website for a software company with a dynamic content structure managed through a custom backend.",
    url: "https://www.auctustechnologies.com/",
    screenshot: "/projects/auctus-screen.png",
    logo: "/companies/auctus_logo.png",
    techStack: ["nextjs", "tailwind", "typescript"],
  },
  {
    id: "fiveflow-admin",
    name: "Five Flow Admin",
    category: "Portals",
    tagline: "Content Management Portal",
    description:
      "Custom admin dashboard to manage website content, sections, and media — giving the client full control without touching code.",
    url: "https://fiveflowinfra.com/dashboard/signin/",
    screenshot: "/projects/fiveflow-admin-screen.png",
    logo: "/companies/five_flow_logo.png",
    techStack: ["html", "css", "js", "bootstrap", "python", "django"],
  },
  {
    id: "hita-admin",
    name: "Hita Decor Admin",
    category: "Portals",
    tagline: "E-Commerce Management Portal",
    description:
      "Complete admin portal for Hita Decor — product management, order tracking, sales stats, and full store control in one dashboard.",
    url: "https://hitadecor.com/login/",
    screenshot: "/projects/hita-admin.png",
    logo: "/companies/hita_logo.png",
    techStack: ["html", "css", "js", "bootstrap", "python", "django"],
  },
  {
    id: "a11y-digitech",
    name: "A11y DigiTech",
    category: "Websites",
    tagline: "e-Publishing Company Website",
    description:
      "Static website for an accessibility-focused e-publishing company, built for performance and clarity.",
    url: "https://www.a11ydigitech.com/",
    screenshot: "/projects/a11ydigitech-screen.png",
    logo: "/companies/a11y_digitech_logo.png",
    techStack: ["html", "css", "js"],
  },
  {
    id: "agamagizh",
    name: "Agamagizh",
    category: "Websites",
    tagline: "NGO — SEO Friendly Static Website",
    description:
      "SEO-optimized static website for an NGO, built for visibility and outreach with clean, accessible design.",
    url: "https://www.agamagizhtrust.com/",
    screenshot: "/projects/agamagizh-screen.png",
    logo: "/companies/agamagizh_logo.png",
    techStack: ["nextjs", "tailwind", "typescript"],
  },
  {
    id: "gloup",
    name: "Gloup",
    category: "Mobile App",
    tagline: "Salon Booking System",
    description:
      "Mobile app for booking salon appointments — users can browse salons, pick services, and schedule visits with ease.",
    url: "https://play.google.com/store/apps/details?id=com.gloup.userapp&pcampaignid=web_share",
    screenshot: "/projects/gloup-mobile.png",
    logo: "/companies/gloup_logo.png",
    techStack: ["flutter", "dart"],
  },
];

// ── Modal ──────────────────────────────────────────────────────────────────

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 24, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.28, ease: "power2.out" }
      );
    }
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div
        ref={contentRef}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-5 pt-5 pb-4 border-b border-neutral-100">
          <div className="w-10 h-10 rounded-xl border border-neutral-100 bg-white shadow-sm flex items-center justify-center p-1 overflow-hidden shrink-0">
            <img src={project.logo} alt={project.name} className="w-full h-full object-contain" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-[15px] font-bold text-neutral-900 leading-tight">{project.name}</h3>
            <p className="text-xs text-neutral-500 mt-0.5 truncate">{project.tagline}</p>
          </div>
          <span className="text-[10px] font-medium text-neutral-500 bg-neutral-100 rounded-full px-2.5 py-1 shrink-0">
            {project.category}
          </span>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center hover:bg-neutral-200 transition-colors shrink-0"
          >
            <X size={13} className="text-neutral-600" />
          </button>
        </div>

        {/* Screenshot */}
        <div className="relative bg-neutral-50 overflow-hidden">
          <img
            src={project.screenshot}
            alt={project.name}
            className="w-full h-[280px] object-contain"
          />
          {project.url !== "#" && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-3 right-3 z-10 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm border border-neutral-200 rounded-full px-3 py-1.5 text-xs font-medium text-neutral-800 hover:bg-white hover:shadow-sm transition-all"
            >
              {project.category === "Mobile App" ? "Visit App" : "Visit Site"}
              <ArrowUpRight size={12} />
            </a>
          )}
        </div>

        {/* Body */}
        <div className="px-5 py-5">
          <p className="text-sm text-neutral-600 leading-relaxed">{project.description}</p>

          {project.techStack.length > 0 && (
            <div className="mt-5">
              <p className="text-[10px] font-semibold text-neutral-400 uppercase tracking-widest mb-3">Tech Stack</p>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map(tech => (
                  <div
                    key={tech}
                    className="flex items-center gap-1.5 bg-neutral-50 border border-neutral-100 rounded-lg px-2.5 py-1.5"
                  >
                    <img
                      src={TECH_ICONS[tech]}
                      alt={TECH_LABELS[tech]}
                      className="w-[18px] h-[18px] object-contain"
                    />
                    <span className="text-xs font-medium text-neutral-700">{TECH_LABELS[tech]}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Card ───────────────────────────────────────────────────────────────────

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <div
      onClick={onOpen}
      className="project-card group rounded-xl border border-neutral-200 bg-white overflow-hidden hover:shadow-md transition-shadow duration-300 cursor-pointer"
    >
      {/* Screenshot */}
      <div className="relative h-[220px] overflow-hidden bg-neutral-100">
        <img
          src={project.screenshot}
          alt={project.name}
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        {project.url !== "#" && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm border border-neutral-200 flex items-center justify-center hover:bg-white transition-colors z-10"
          >
            <ArrowUpRight size={13} className="text-neutral-600" />
          </a>
        )}
      </div>

      {/* Body */}
      <div className="relative px-4 pb-4">
        <div className="absolute -top-5 left-4 w-10 h-10 rounded-xl border-2 border-white bg-white shadow-sm flex items-center justify-center p-1 overflow-hidden">
          <img src={project.logo} alt={project.name} className="w-full h-full object-contain" />
        </div>

        <div className="pt-7">
          <h3 className="text-[15px] font-bold text-neutral-900 leading-tight">{project.name}</h3>
          <p className="text-xs text-neutral-500 mt-0.5">{project.tagline}</p>
        </div>

        <div className="mt-3 pt-3 border-t border-neutral-100 flex items-center justify-between gap-3">
          {project.techStack.length > 0 && (
            <div className="flex items-center gap-1.5">
              {project.techStack.map(tech => (
                <img
                  key={tech}
                  src={TECH_ICONS[tech]}
                  alt={TECH_LABELS[tech]}
                  title={TECH_LABELS[tech]}
                  className="w-[18px] h-[18px] object-contain"
                />
              ))}
            </div>
          )}
          <span className="shrink-0 text-[10px] font-medium text-neutral-500 bg-neutral-100 rounded-full px-2.5 py-1 ml-auto">
            {project.category}
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Grid ───────────────────────────────────────────────────────────────────

const PAGE_SIZE = 9;

function animateCards(cards: Element[] | NodeListOf<Element>, stagger = 0.07) {
  gsap.fromTo(
    Array.from(cards),
    { opacity: 0, y: 36 },
    { opacity: 1, y: 0, duration: 0.5, stagger, ease: "power2.out", overwrite: "auto" }
  );
}

export default function Projects() {
  const [active, setActive] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const hasEntered = useRef(false);
  const prevCount = useRef(0);
  const prevFilter = useRef(active);

  const filtered = active === "All" ? PROJECTS : PROJECTS.filter(p => p.category === active);
  const visible = showAll ? filtered : filtered.slice(0, PAGE_SIZE);
  const hasMore = filtered.length > PAGE_SIZE && !showAll;

  const triggerEntrance = () => {
    if (hasEntered.current || !gridRef.current) return;
    hasEntered.current = true;
    const cards = gridRef.current.querySelectorAll(".project-card");
    prevCount.current = cards.length;
    animateCards(cards);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!gridRef.current) return;

    const rect = gridRef.current.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.82) {
      triggerEntrance();
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: gridRef.current,
      start: "top 82%",
      once: true,
      onEnter: triggerEntrance,
    });

    return () => trigger.kill();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!hasEntered.current || !gridRef.current) return;
    const cards = Array.from(gridRef.current.querySelectorAll(".project-card"));

    if (active !== prevFilter.current) {
      prevFilter.current = active;
      prevCount.current = 0;
      animateCards(cards, 0.05);
    } else {
      const newCards = cards.slice(prevCount.current);
      if (newCards.length > 0) animateCards(newCards, 0.05);
    }

    prevCount.current = cards.length;
  }, [visible, active]);

  const handleFilterChange = (filter: string) => {
    setActive(filter);
    setShowAll(false);
  };

  return (
    <>
      <section id="projects" className="relative px-6 py-20 min-h-screen">
        <div className="max-w-7xl mx-auto">

          <h2 className="text-xl font-extrabold text-[#1a1a1a] mb-8">My Projects</h2>

          <div className="flex flex-wrap gap-2 mb-10">
            {FILTERS.map(filter => (
              <button
                key={filter}
                onClick={() => handleFilterChange(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                  active === filter
                    ? "bg-[#1a1a1a] text-white border-[#1a1a1a]"
                    : "bg-white text-[#555] border-black/10 hover:border-black/30 hover:text-[#1a1a1a]"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {visible.map(project => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpen={() => setSelectedProject(project)}
              />
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center mt-10">
              <button
                onClick={() => setShowAll(true)}
                className="px-6 py-2.5 text-sm font-medium text-neutral-700 border border-neutral-200 rounded-full hover:border-neutral-400 hover:text-neutral-900 transition-colors"
              >
                Load More ({filtered.length - PAGE_SIZE} more)
              </button>
            </div>
          )}

        </div>
      </section>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
}
