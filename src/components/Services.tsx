"use client";
import { useEffect, useRef } from "react";
import { Globe, LayoutDashboard, Smartphone, Bot, Server, Wrench } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const SERVICES = [
  {
    icon: Globe,
    title: "Web Development",
    description:
      "Fast, SEO-optimized websites and landing pages built to convert — from static brochure sites to fully dynamic content-managed platforms.",
    tags: ["Next.js", "Tailwind CSS", "SEO", "CMS"],
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    glowColor: "#3b82f6",
  },
  {
    icon: LayoutDashboard,
    title: "Admin Portals & ERP",
    description:
      "Custom dashboards and management systems tailored to your workflow — staff, inventory, orders, reports, all in one place.",
    tags: ["Role-based Access", "Analytics", "Real-time"],
    iconBg: "bg-violet-50",
    iconColor: "text-violet-500",
    glowColor: "#8b5cf6",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description:
      "Cross-platform iOS & Android apps with a native feel — built with Flutter for smooth performance on both platforms from a single codebase.",
    tags: ["Flutter", "Dart", "Play Store", "App Store"],
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
    glowColor: "#10b981",
  },
  {
    icon: Bot,
    title: "AI & Automation",
    description:
      "Python-powered APIs, AI-integrated products, and workflow automation — from intelligent tools to backend services that do the heavy lifting.",
    tags: ["Python", "Django", "REST API", "AI Integration"],
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    glowColor: "#f97316",
  },
  {
    icon: Server,
    title: "Server & Deployment",
    description:
      "End-to-end deployment on AWS — domain setup, SSL, server configuration, CI/CD pipelines, and ongoing maintenance so your app stays live.",
    tags: ["AWS", "Ubuntu", "Nginx", "CI/CD"],
    iconBg: "bg-rose-50",
    iconColor: "text-rose-500",
    glowColor: "#f43f5e",
  },
  {
    icon: Wrench,
    title: "Maintenance & Support",
    description:
      "Ongoing support after launch — bug fixes, performance updates, feature additions, and monitoring to keep your product running smoothly.",
    tags: ["Bug Fixes", "Updates", "Monitoring", "24/7 Support"],
    iconBg: "bg-amber-50",
    iconColor: "text-amber-500",
    glowColor: "#f59e0b",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasEntered = useRef(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll(".service-card");

    const animate = () => {
      if (hasEntered.current) return;
      hasEntered.current = true;
      gsap.fromTo(
        Array.from(cards),
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" }
      );
    };

    const rect = sectionRef.current.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.82) {
      animate();
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 82%",
      once: true,
      onEnter: animate,
    });

    return () => trigger.kill();
  }, []);

  return (
    <section id="services" className="px-6 py-20 border-b border-black/10">
      <div className="max-w-7xl mx-auto" ref={sectionRef}>

        <h2 className="text-xl font-extrabold text-[#1a1a1a] mb-10">Services</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map(({ icon: Icon, title, description, tags, iconBg, iconColor }) => (
            <div
              key={title}
              className="service-card group bg-white border border-neutral-200 rounded-2xl p-6 hover:shadow-md transition-all duration-300 flex flex-col gap-5 hover:border-neutral-300"
            >
              {/* Icon */}
              <div className={`w-11 h-11 rounded-xl ${iconBg} flex items-center justify-center shrink-0`}>
                <Icon size={20} className={iconColor} strokeWidth={1.8} />
              </div>

              {/* Text */}
              <div className="flex flex-col gap-2">
                <h3 className="text-[15px] font-bold text-neutral-900">{title}</h3>
                <p className="text-xs text-neutral-500 leading-relaxed">{description}</p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {tags.map(tag => (
                  <span
                    key={tag}
                    className="text-[10px] font-medium text-neutral-500 bg-neutral-50 border border-neutral-100 rounded-full px-2.5 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
