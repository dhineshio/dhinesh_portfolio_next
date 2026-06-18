import { Suspense } from "react";
import { Mail } from "lucide-react";
import Lanyard from "./lanyard/Lanyard";
import GitHubContributions from "./GitHubContributions";
import GitHubStats from "./GitHubStats";
import AboutRole from "./AboutRole";

export default function About() {
  return (
    <section id="about" className="px-6 py-20 border-b border-black/10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl font-extrabold text-[#1a1a1a] mb-8">About Me</h2>

        <div className="flex flex-col lg:flex-row items-start gap-16">

          {/* Left — Lanyard ID Card */}
          <div className="relative w-full lg:w-[650px] h-[560px] shrink-0 rounded-2xl border border-black/10 overflow-hidden">
            <Suspense fallback={null}>
              <GitHubContributions />
            </Suspense>
            <Suspense fallback={null}>
              <GitHubStats />
            </Suspense>

            {/* Top-right action buttons */}
            <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
              <a
                href="https://github.com/dhineshio"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm border border-black/5 shadow-sm rounded-lg px-3 py-2 text-[#1a1a1a] hover:bg-white transition-colors"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                <span className="text-[11px] font-medium">GitHub</span>
              </a>
              <a
                href="mailto:dhinesh.tech2001@gmail.com"
                className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm border border-black/5 shadow-sm rounded-lg px-3 py-2 text-[#1a1a1a] hover:bg-white transition-colors"
              >
                <Mail size={13} />
                <span className="text-[11px] font-medium">Mail</span>
              </a>
            </div>

            <Lanyard
              position={[0, 0, 13]}
              gravity={[0, -40, 0]}
              lanyardWidth={1.2}
              frontImage="/lanyard/id_card.png"
              imageFit="contain"
            />
          </div>

          {/* Right — content */}
          <div className="flex-1 flex flex-col gap-8 pt-2">

            {/* Role + bio */}
            <div>
              <p className="text-sm text-[#888] mb-1 tracking-wide">Hello! I'm</p>
              <AboutRole />
              <p className="text-[15px] text-[#555] mt-4 leading-relaxed max-w-lg">
                Dhinesh, a Full Stack and Cloud Developer with 2+ years of experience crafting
                intelligent web and mobile apps. Skilled in app development, backend systems,
                UI/UX, and AWS deployment — driven by curiosity, I build scalable digital
                solutions from idea to cloud.
              </p>
            </div>

            {/* Stats */}
            <div className="flex gap-8">
              {[
                { value: "2.2+", label: "Years in App Development" },
                { value: "1.5+", label: "Years in Web Development" },
                { value: "12+",  label: "Projects Completed" },
              ].map(s => (
                <div key={s.label}>
                  <div className="text-3xl font-bold text-[#1a1a1a]">{s.value}</div>
                  <div className="text-xs text-[#888] mt-1 leading-snug max-w-[90px]">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Timeline */}
            <div>
              <p className="text-xs font-semibold text-[#888] uppercase tracking-widest mb-4">Education & Experience</p>
              <div className="flex flex-col gap-0">
                {[
                  { title: "Full Stack Developer",          org: "Auctus Technology",                          period: "2025 – Present", type: "work" },
                  { title: "Mobile App Developer",          org: "M7 Corp · Thaagam Foundation",            period: "2024 – 2025",   type: "work" },
                  { title: "Master of Computer Application", org: "P R Engineering College",                 period: "2021 – 2023",   type: "edu"  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 group">
                    {/* Line + dot */}
                    <div className="flex flex-col items-center">
                      <div className={`w-2 h-2 rounded-full mt-1 shrink-0 ${item.type === "work" ? "bg-[#1a1a1a]" : "bg-[#aaa]"}`} />
                      <div className="w-px flex-1 bg-black/10 my-1" />
                    </div>
                    {/* Content */}
                    <div className="pb-5">
                      <p className="text-sm font-semibold text-[#1a1a1a] leading-tight">{item.title}</p>
                      <p className="text-xs text-[#666] mt-0.5">{item.org}</p>
                      <p className="text-[11px] text-[#aaa] mt-0.5">{item.period}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
