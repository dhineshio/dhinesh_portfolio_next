"use client";

import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const NAVBAR_HEIGHT = 64;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sectionIds = navLinks.map(l => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: `-${NAVBAR_HEIGHT}px 0px -60% 0px`, threshold: 0 }
    );
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (!el) return;
    gsap.to(window, {
      scrollTo: { y: el, offsetY: NAVBAR_HEIGHT },
      duration: 0.9,
      ease: "power3.inOut",
    });
  };

  const toggleMenu = () => {
    const menu = menuRef.current;
    if (!menu) return;

    if (!open) {
      setOpen(true);
      gsap.fromTo(
        menu,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.35, ease: "power3.out" }
      );
      gsap.fromTo(
        menu.querySelectorAll("a"),
        { y: -8, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, ease: "power2.out", stagger: 0.05, delay: 0.05 }
      );
    } else {
      gsap.to(menu, {
        height: 0,
        opacity: 0,
        duration: 0.28,
        ease: "power3.in",
        onComplete: () => setOpen(false),
      });
    }
  };

  const handleMobileClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    gsap.to(menuRef.current, {
      height: 0,
      opacity: 0,
      duration: 0.25,
      ease: "power3.in",
      onComplete: () => {
        setOpen(false);
        scrollTo(href);
      },
    });
  };

  return (
    <nav className="fixed inset-x-0 top-0 z-[1000] w-full bg-white/80 backdrop-blur-[5px] shadow-[0_1px_1px_#e7e7e9] 2xl:pt-[10px]">

      {/* Mobile / Tablet */}
      <div className="flex lg:hidden items-center h-16 px-2">
        <button aria-label="Toggle menu" className="p-1" onClick={toggleMenu}>
          {open ? <X size={24} strokeWidth={1.75} /> : <Menu size={24} strokeWidth={1.75} />}
        </button>

        <Image src="/logo.webp" alt="Logo" width={36} height={36} className="ml-3" />

        <a
          href="#contact"
          onClick={e => { e.preventDefault(); scrollTo("#contact"); }}
          className="ml-auto inline-flex items-center justify-center h-9 px-4 rounded-full border border-black/20 text-sm font-medium text-black hover:bg-black/5 transition-colors"
        >
          Hire Me
        </a>
      </div>

      {/* Mobile Dropdown */}
      <div
        ref={menuRef}
        className="lg:hidden overflow-hidden h-0 opacity-0 bg-white/95 backdrop-blur-[5px] border-t border-black/5"
      >
        <div className="flex flex-col px-6 py-4 gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={e => handleMobileClick(e, link.href)}
              className={`text-sm font-medium py-3 border-b border-black/5 last:border-0 transition-colors ${
                activeSection === link.href.replace("#", "") ? "text-black" : "text-gray-500 hover:text-black"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden lg:flex items-center h-16 max-w-7xl mx-auto w-full gap-8">

        <Image src="/logo.webp" alt="Logo" width={36} height={36} />

        <div className="flex items-end gap-10 h-full ml-6">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={e => { e.preventDefault(); scrollTo(link.href); }}
                className={`text-sm font-medium pb-[18px] border-b-2 transition-colors ${
                  isActive ? "text-black border-black" : "text-gray-500 border-transparent hover:text-black hover:border-black"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        <div className="ml-auto flex items-center gap-3">
          <a
            href="#contact"
            onClick={e => { e.preventDefault(); scrollTo("#contact"); }}
            className="inline-flex items-center justify-center h-10 px-5 rounded-full bg-black text-white text-sm font-medium hover:bg-neutral-800 transition-colors"
          >
            Hire Me
          </a>
        </div>

      </div>
    </nav>
  );
}
