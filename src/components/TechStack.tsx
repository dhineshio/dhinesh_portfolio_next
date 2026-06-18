"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const CATEGORIES = [
  {
    label: "Frontend",
    techs: [
      { name: "Next.js",      icon: "/icons/ic_nextjs.png" },
      { name: "TypeScript",   icon: "/icons/ic_ts.png" },
      { name: "Tailwind CSS", icon: "/icons/ic_tailwind.png" },
      { name: "JavaScript",   icon: "/icons/ic_js.png" },
      { name: "HTML",         icon: "/icons/ic_html.png" },
      { name: "CSS",          icon: "/icons/ic_css.png" },
      { name: "Bootstrap",    icon: "/icons/ic_bootstrap.png" },
    ],
  },
  {
    label: "Mobile",
    techs: [
      { name: "Flutter", icon: "/icons/ic_flutter.png" },
      { name: "Dart",    icon: "/icons/ic_dart.png" },
    ],
  },
  {
    label: "Backend",
    techs: [
      { name: "Python",  icon: "/icons/ic_python.png" },
      { name: "Django",  icon: "/icons/ic_django.png" },
    ],
  },
  {
    label: "Tools & Infra",
    techs: [
      { name: "AWS",        icon: "/icons/ic_aws.png" },
      { name: "Git",        icon: "/icons/ic_git.png" },
      { name: "PostgreSQL", icon: "/icons/ic_postgresql.png" },
      { name: "Figma",      icon: "/icons/ic_figma.png" },
    ],
  },
];

export default function TechStack() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasEntered = useRef(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!sectionRef.current) return;

    const items = sectionRef.current.querySelectorAll(".tech-item");

    const animate = () => {
      if (hasEntered.current) return;
      hasEntered.current = true;
      gsap.fromTo(
        Array.from(items),
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.04, ease: "power2.out" }
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
    <section id="techstack" className="bg-neutral-100 px-6 py-20">
      <div className="max-w-7xl mx-auto" ref={sectionRef}>

        <h2 className="text-xl font-extrabold text-[#1a1a1a] mb-12">Technologies</h2>

        <div className="flex flex-col divide-y divide-neutral-200">
          {CATEGORIES.map(category => (
            <div
              key={category.label}
              className="tech-item flex flex-col sm:flex-row sm:items-center gap-4 py-6"
            >
              {/* Category label */}
              <p className="text-[10px] font-semibold text-neutral-400 uppercase tracking-widest w-28 shrink-0">
                {category.label}
              </p>

              {/* Tech pills */}
              <div className="flex flex-wrap gap-2">
                {category.techs.map(tech => (
                  <div
                    key={tech.name}
                    className="flex items-center gap-2 bg-white border border-neutral-200 rounded-xl px-3.5 py-2 hover:border-neutral-300 hover:shadow-sm transition-all duration-200 cursor-default"
                  >
                    <img
                      src={tech.icon}
                      alt={tech.name}
                      className="w-[18px] h-[18px] object-contain"
                    />
                    <span className="text-sm font-medium text-neutral-700">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
