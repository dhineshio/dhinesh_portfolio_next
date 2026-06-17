"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";

const logos = [
  { src: "/companies/auctus_logo.png", alt: "Auctus" },
  { src: "/companies/koko_farms_logo.png", alt: "Koko Farms" },
  { src: "/companies/hita_logo.png", alt: "Hita" },
  { src: "/companies/rims_logo.png", alt: "RIMS" },
  { src: "/companies/topgrade_logo.png", alt: "Topgrade" },
  { src: "/companies/thaagam_logo.png", alt: "Thaagam" },
  { src: "/companies/gcc_logo.png", alt: "GCC" },
  { src: "/companies/five_flow_logo.png", alt: "Five Flow" },
  { src: "/companies/sri_karpom_karpipom_logo.png", alt: "Sri Karpom Karpipom" },
  { src: "/companies/rvr_logo.png", alt: "RVR" },
  { src: "/companies/a11y_digitech_logo.png", alt: "A11Y Digitech" },
  { src: "/companies/tastenow_logo.png", alt: "TasteNow" },
  { src: "/companies/skillup_languages_logo.png", alt: "Skillup Languages" },
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

  return (
    <section className="grid-lines mt-0 flex flex-col items-center justify-center px-6 py-20">

      {/* Heading */}
      <div className="text-center max-w-5xl mx-auto mt-0">
        <h1 className="text-4xl sm:text-5xl mt-8 lg:text-[64px] font-semibold lg:leading-[70px] lg:tracking-[-3px] text-center text-[#1a1a1a]">
          Fast, scalable & beautifully<br />
          crafted digital products.
        </h1>
        <p className="mt-6 text-sm sm:text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
          Full-stack freelancer · Web · Mobile · AWS · Server management.
        </p>
      </div>

      {/* Logo Marquee */}
      <div className="mt-16 w-full max-w-2xl mx-auto">
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
      <div className="mt-26 w-full max-w-xl mx-auto">
        <div className="flex items-center justify-between gap-4 bg-white rounded-full shadow-[0_4px_24px_rgba(0,0,0,0.18)] px-6 py-4">
          <p className="text-sm font-medium text-[#1a1a1a] leading-snug">
            Available for freelance &amp; full-time<br className="hidden sm:block" /> opportunities worldwide
          </p>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#contact"
              className="ml-2 inline-flex items-center justify-center h-10 px-5 rounded-full bg-[#0f0f0f] text-white text-sm font-semibold hover:bg-neutral-800 transition-colors whitespace-nowrap"
            >
              Hire Me
            </a>
          </div>
        </div>
      </div>

    </section>
  );
}
