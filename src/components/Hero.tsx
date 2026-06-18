"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Image from "next/image";

gsap.registerPlugin(ScrollToPlugin);

const logos = [
  { src: "/companies/auctus_logo.webp", alt: "Auctus" },
  { src: "/companies/koko_farms_logo.webp", alt: "Koko Farms" },
  { src: "/companies/hita_logo.webp", alt: "Hita" },
  { src: "/companies/rims_logo.webp", alt: "RIMS" },
  { src: "/companies/topgrade_logo.webp", alt: "Topgrade" },
  { src: "/companies/thaagam_logo.webp", alt: "Thaagam" },
  { src: "/companies/gcc_logo.webp", alt: "GCC" },
  { src: "/companies/five_flow_logo.webp", alt: "Five Flow" },
  { src: "/companies/sri_karpom_karpipom_logo.webp", alt: "Sri Karpom Karpipom" },
  { src: "/companies/rvr_logo.webp", alt: "RVR" },
  { src: "/companies/a11y_digitech_logo.webp", alt: "A11Y Digitech" },
  { src: "/companies/tastenow_logo.webp", alt: "TasteNow" },
  { src: "/companies/skillup_languages_logo.webp", alt: "Skillup Languages" },
  { src: "/companies/gloup_logo.webp", alt: "Gloup" },
  { src: "/companies/agamagizh_logo.webp", alt: "Agamagizh" },
];

export default function Hero() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const tween = gsap.to(track, {
      x: "-50%",
      duration: 22,
      ease: "none",
      repeat: -1,
    });

    const pause = () => tween.pause();
    const resume = () => tween.resume();

    track.addEventListener("mouseenter", pause);
    track.addEventListener("mouseleave", resume);

    return () => {
      tween.kill();
      track.removeEventListener("mouseenter", pause);
      track.removeEventListener("mouseleave", resume);
    };
  }, []);

  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById("contact");
    if (!el) return;
    gsap.to(window, { scrollTo: { y: el, offsetY: 64 }, duration: 0.9, ease: "power3.inOut" });
  };

  return (
    <section id="home" className="grid-lines mt-0 flex flex-col items-center justify-center px-6 py-24">

      {/* Heading */}
      <div className="text-center max-w-5xl mx-auto mt-0">
        <h1 className="text-4xl sm:text-5xl mt-8 lg:text-[64px] font-semibold lg:leading-[70px] lg:tracking-[-3px] text-center text-[#1a1a1a]">
          I design, build & deploy<br />
          digital products end-to-end.
        </h1>
        <p className="mt-6 text-sm sm:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
          Full-stack freelancer available for web, mobile & cloud projects worldwide.
        </p>
      </div>

      {/* Logo Marquee */}
      <div className="mt-16 w-full max-w-xl mx-auto">
        <p className="text-xs text-gray-400 text-center mb-6 tracking-widest uppercase">
          Worked on projects for
        </p>
        <div className="overflow-hidden">
          <div ref={trackRef} className="marquee-track gap-6">
            {[...logos, ...logos].map((logo, i) => (
              <div key={i} className="flex-shrink-0 flex items-center justify-center px-4">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  height={38}
                  width={120}
                  className="h-9 object-contain"
                  style={{ width: "auto" }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Banner */}
      <div className="mt-16 w-full max-w-lg mx-auto px-2 sm:px-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white rounded-3xl sm:rounded-full shadow-[0_4px_24px_rgba(0,0,0,0.18)] px-6 py-5 sm:py-3.5">
          <p className="text-sm font-medium text-[#1a1a1a] leading-snug text-center sm:text-left">
            Available for freelance &amp; full-time opportunities worldwide
          </p>
          <a
            href="#contact"
            onClick={scrollToContact}
            className="inline-flex items-center justify-center h-10 px-6 rounded-full bg-[#0f0f0f] text-white text-sm font-semibold hover:bg-neutral-800 transition-colors whitespace-nowrap shrink-0"
          >
            Hire Me
          </a>
        </div>
      </div>

    </section>
  );
}
