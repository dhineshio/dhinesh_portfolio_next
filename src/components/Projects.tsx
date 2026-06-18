"use client";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

const FILTERS = ["All", "Websites", "Mobile App", "Portals", "Products"];

type Project = {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  url: string;
  screenshots: string[];
  logo: string;
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
    screenshots: ["/projects/fiveflow-screen.png"],
    logo: "/companies/five_flow_logo.png",
  },
  {
    id: "auctus",
    name: "Auctus Technology",
    category: "Websites",
    tagline: "Software Company — Professional Dynamic Site",
    description:
      "SEO-optimized professional website for a software company with a dynamic content structure managed through a custom backend.",
    url: "https://www.auctustechnologies.com/",
    screenshots: ["/projects/auctus-screen.png"],
    logo: "/companies/auctus_logo.png",
  },
  {
    id: "skillup-languages",
    name: "Skill Up Languages",
    category: "Websites",
    tagline: "Educational Institute — Language Courses",
    description:
      "Static website for a language learning institute offering English and Hindi courses, built for performance and SEO.",
    url: "https://www.skilluplanguages.com/",
    screenshots: ["/projects/skillup-languages-screen.png"],
    logo: "/companies/skillup_languages_logo.png",
  },
  {
    id: "topgrade",
    name: "Top Grade",
    category: "Websites",
    tagline: "Online E-Learning Platform Landing Page",
    description:
      "Landing page for an e-learning platform built to drive course enrollments with a clean, conversion-focused design.",
    url: "https://www.topgradeinnovation.com/",
    screenshots: ["/projects/topgrade-screen.png"],
    logo: "/companies/topgrade_logo.png",
  },
  {
    id: "topgrade-admin",
    name: "Top Grade LMS Portal",
    category: "Portals",
    tagline: "Learning Management System",
    description:
      "Full LMS portal — course video uploads, student management, progress stats, and automated certificate distribution.",
    url: "https://www.topgradeinnovation.com/dashboard/signin/",
    screenshots: ["/projects/topgrade-admin-login.png", "/projects/topgrade-admin.png"],
    logo: "/companies/topgrade_logo.png",
  },
  {
    id: "agamagizh",
    name: "Agamagizh",
    category: "Websites",
    tagline: "NGO — SEO Friendly Static Website",
    description:
      "SEO-optimized static website for an NGO, built for visibility and outreach with clean, accessible design.",
    url: "#",
    screenshots: ["/projects/agamagizh-screen.png"],
    logo: "/companies/agamagizh_logo.png",
  },
  {
    id: "hita-decor",
    name: "Hita Decor",
    category: "Websites",
    tagline: "Home Decor E-Commerce Store",
    description:
      "Full e-commerce website for a home decor brand with product listings, cart, and order flow.",
    url: "https://hitadecor.com/",
    screenshots: ["/projects/hita-screen.png"],
    logo: "/companies/hita_logo.png",
  },
  {
    id: "hita-admin",
    name: "Hita Decor Admin",
    category: "Portals",
    tagline: "E-Commerce Management Portal",
    description:
      "Complete admin portal for Hita Decor — product management, order tracking, sales stats, and full store control in one dashboard.",
    url: "https://hitadecor.com/login/",
    screenshots: ["/projects/hita-admin-login.png", "/projects/hita-admin.png"],
    logo: "/companies/hita_logo.png",
  },
  {
    id: "sri-karpom-karpipom",
    name: "Sri Karpom Karpipom",
    category: "Websites",
    tagline: "Children's Tamil Online Learning Academy",
    description:
      "Static website for a Tamil language teaching institute for children, showcasing courses and enrollment details.",
    url: "https://srikarpomkarpipom.com/",
    screenshots: ["/projects/sri-karpom-karpipom-screen.png"],
    logo: "/companies/sri_karpom_karpipom_logo.png",
  },
  {
    id: "rvr-engineering",
    name: "RVR Engineering ERP",
    category: "Portals",
    tagline: "Internal Management System",
    description:
      "Full-scale ERP built from scratch — staff management, accounts, clients, lead tracking, and real-time WebSocket chat, all in one platform.",
    url: "https://pm.rvrengineering.com/",
    screenshots: ["/projects/rvr-login-protal.png", "/projects/rvr-engineering-portal.png"],
    logo: "/companies/rvr_logo.png",
  },
  {
    id: "a11y-digitech",
    name: "A11y DigiTech",
    category: "Websites",
    tagline: "e-Publishing Company Website",
    description:
      "Static website for an accessibility-focused e-publishing company, built for performance and clarity.",
    url: "https://www.a11ydigitech.com/",
    screenshots: ["/projects/a11ydigitech-screen.png"],
    logo: "/companies/a11y_digitech_logo.png",
  },
  {
    id: "a11y-alt-product",
    name: "A11y Alt Text",
    category: "Products",
    tagline: "AI-Powered Alt Text Generator",
    description:
      "AI product that automatically generates accurate alt text for images, improving web accessibility and SEO for publishers.",
    url: "https://alt.a11ydigitech.com/",
    screenshots: ["/projects/a11ydigitech-login.png","/projects/a11yalt-product.png"],
    logo: "/companies/a11y_digitech_logo.png",
  },
  {
    id: "rims-edu",
    name: "RIMS Faculty of Nursing",
    category: "Websites",
    tagline: "Nursing College — Institutional Website",
    description:
      "Official website for RIMS Faculty of Nursing with course details, admissions, and college information.",
    url: "https://www.rimsedu.in/",
    screenshots: ["/projects/rims-screen.png"],
    logo: "/companies/rims_logo.png",
  },
  {
    id: "rims-admin",
    name: "RIMS College Portal",
    category: "Portals",
    tagline: "Complete College Management System",
    description:
      "Large-scale subdomain-based management portal covering student records, admissions, faculty, and college operations end-to-end.",
    url: "https://admin.rimsedu.in/",
    screenshots: ["/projects/rims-admin-login.png", "/projects/rims-admin.png"],
    logo: "/companies/rims_logo.png",
  },
  {
    id: "fiveflow-admin",
    name: "Five Flow Admin",
    category: "Portals",
    tagline: "Content Management Portal",
    description:
      "Custom admin dashboard to manage website content, sections, and media — giving the client full control without touching code.",
    url: "https://fiveflowinfra.com/dashboard/signin/",
    screenshots: ["/projects/fiveflow-admin-login.png", "/projects/fiveflow-admin-screen.png"],
    logo: "/companies/five_flow_logo.png",
  },
];

function ProjectCard({ project }: { project: Project }) {
  const [idx, setIdx] = useState(0);
  const total = project.screenshots.length;
  const hasMultiple = total > 1;

  const next = () => setIdx(i => (i + 1) % total);
  const prev = () => setIdx(i => (i - 1 + total) % total);

  return (
    <div className="group rounded-xl border border-neutral-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">

      {/* Screenshot hero */}
      <div className="relative h-[220px] overflow-hidden bg-neutral-100">

        {/* Slides */}
        {project.screenshots.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={project.name}
            className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500 ${
              i === idx ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          />
        ))}

        {/* Dot indicators */}
        {hasMultiple && (
          <div className="absolute bottom-2.5 left-0 right-0 flex justify-center items-center gap-1.5 z-10">
            {project.screenshots.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === idx
                    ? "bg-neutral-700 w-4 h-1.5"
                    : "bg-neutral-400 w-1.5 h-1.5 hover:bg-neutral-600"
                }`}
              />
            ))}
          </div>
        )}

        {/* Prev / Next arrows — visible on hover */}
        {hasMultiple && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm border border-neutral-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white z-10"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-neutral-600"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm border border-neutral-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white z-10"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-neutral-600"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </>
        )}

        {/* Visit button */}
        {project.url !== "#" && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm border border-neutral-200 flex items-center justify-center hover:bg-white transition-colors z-10"
          >
            <ArrowUpRight size={13} className="text-neutral-600" />
          </a>
        )}
      </div>

      {/* Body */}
      <div className="relative px-4 pb-4">

        {/* Overlapping logo */}
        <div className="absolute -top-5 left-4 w-10 h-10 rounded-xl border-2 border-white bg-white shadow-sm flex items-center justify-center p-1 overflow-hidden">
          <img src={project.logo} alt={project.name} className="w-full h-full object-contain" />
        </div>

        {/* Name + tagline */}
        <div className="pt-7">
          <h3 className="text-[15px] font-bold text-neutral-900 leading-tight">{project.name}</h3>
          <p className="text-xs text-neutral-500 mt-0.5">{project.tagline}</p>
        </div>

        {/* Divider row */}
        <div className="mt-3 pt-3 border-t border-neutral-100 flex items-center justify-between gap-3">
          <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2 flex-1">
            {project.description}
          </p>
          <span className="shrink-0 text-[10px] font-medium text-neutral-500 bg-neutral-100 rounded-full px-2.5 py-1">
            {project.category}
          </span>
        </div>

      </div>
    </div>
  );
}

const PAGE_SIZE = 9;

export default function Projects() {
  const [active, setActive] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const filtered =
    active === "All"
      ? PROJECTS
      : PROJECTS.filter(p => p.category === active);

  const visible = showAll ? filtered : filtered.slice(0, PAGE_SIZE);
  const hasMore = filtered.length > PAGE_SIZE && !showAll;

  const handleFilterChange = (filter: string) => {
    setActive(filter);
    setShowAll(false);
  };

  return (
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map(project => (
            <ProjectCard key={project.id} project={project} />
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
  );
}
