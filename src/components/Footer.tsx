"use client";
import Image from "next/image";
import { ArrowUpRight, Mail } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useEffect, useRef } from "react";
import PixelSnow from "./PixelSnow";

gsap.registerPlugin(ScrollToPlugin);

const footerLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const scrollTo = (href: string) => {
  const el = document.getElementById(href.replace("#", ""));
  if (!el) return;
  gsap.to(window, { scrollTo: { y: el, offsetY: 64 }, duration: 0.9, ease: "power3.inOut" });
};

export default function Footer() {
  const ctaRef = useRef<HTMLDivElement>(null);
  const hasEntered = useRef(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!ctaRef.current) return;
    const els = ctaRef.current.querySelectorAll(".cta-el");
    const animate = () => {
      if (hasEntered.current) return;
      hasEntered.current = true;
      gsap.fromTo(Array.from(els),
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" }
      );
    };
    const rect = ctaRef.current.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) { animate(); return; }
    const trigger = ScrollTrigger.create({ trigger: ctaRef.current, start: "top 85%", once: true, onEnter: animate });
    return () => trigger.kill();
  }, []);

  return (
    <>
      {/* CTA */}
      <section className="relative px-6 py-16 overflow-hidden">
        {/* PixelSnow background */}
        <div className="absolute inset-0 z-0">
          <PixelSnow
            className="w-full h-full"
            color="#ffffff"
            flakeSize={0.01}
            minFlakeSize={1.25}
            pixelResolution={200}
            speed={1.25}
            density={0.3}
            direction={125}
            brightness={1}
            depthFade={8}
            farPlane={20}
            gamma={0.4545}
            variant="square"
            style={{ background: "#0a0a0a", width: "100%", height: "100%" }}
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center" ref={ctaRef}>
          <p className="cta-el text-[11px] font-semibold text-white/40 uppercase tracking-widest mb-5">
            Let's Collaborate
          </p>
          <h2 className="cta-el text-4xl sm:text-5xl lg:text-[64px] font-extrabold text-white leading-tight lg:leading-[1.1] lg:tracking-[-2px]">
            Have a project<br />in mind?
          </h2>
          <p className="cta-el mt-6 text-[15px] text-white/50 max-w-lg mx-auto leading-relaxed">
            I'm open to freelance projects, full-time roles, and collaborations.<br className="hidden sm:block" />
            Let's build something great together.
          </p>
          <div className="cta-el mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#contact"
              onClick={e => { e.preventDefault(); scrollTo("#contact"); }}
              className="inline-flex items-center gap-2 bg-white text-[#111] text-sm font-bold px-7 py-3.5 rounded-full hover:bg-neutral-100 transition-colors"
            >
              Start a Project <ArrowUpRight size={15} />
            </a>
            <a
              href="mailto:dhinesh.tech2001@gmail.com"
              target="_blank"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 border border-white/15 px-7 py-3.5 rounded-full hover:border-white/40 hover:text-white transition-colors"
            >
              <Mail size={14} />
              dhinesh.tech2001@gmail.com
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0a0a] border-t border-white/[0.06] px-6 py-10">
        <div className="max-w-7xl mx-auto">

          {/* Top row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-white/[0.06]">

            {/* Logo + tagline */}
            <div className="flex items-center gap-3">
              <Image src="/logo.webp" alt="Logo" width={32} height={32} className="opacity-90 brightness-0 invert" />
              <div>
                <p className="text-sm font-bold text-white leading-none">Dhinesh</p>
                <p className="text-[11px] text-white/60 mt-0.5">Full Stack & Mobile Developer</p>
              </div>
            </div>

            {/* Nav links */}
            <nav className="flex flex-wrap gap-x-6 gap-y-2">
              {footerLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={e => { e.preventDefault(); scrollTo(link.href); }}
                  className="text-xs text-white/65 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Social */}
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/dhineshio"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/20 text-white/65 hover:text-white hover:border-white/50 transition-colors"
                aria-label="GitHub"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>
              <a
                href="mailto:dhinesh.tech2001@gmail.com"
                target="_blank"
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/20 text-white/65 hover:text-white hover:border-white/50 transition-colors"
                aria-label="Email"
              >
                <Mail size={13} />
              </a>
            </div>
          </div>

          {/* Bottom row */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[11px] text-white/50">
              © {new Date().getFullYear()} Dhinesh. All rights reserved.
            </p>
            <p className="text-[11px] text-white/50">
              Built with Next.js · Tailwind · GSAP
            </p>
          </div>

        </div>
      </footer>
    </>
  );
}
