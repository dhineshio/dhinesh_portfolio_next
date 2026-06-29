"use client";
import { useState, useEffect, useRef } from "react";
import { Mail, ChevronDown, ArrowUpRight, MessageCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Click-to-chat fallback — most India-based clients prefer WhatsApp over forms.
const WHATSAPP_NUMBER = "918610360491";
const EMAIL = "dhinesh.tech2001@gmail.com";
const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi Dhinesh, I came across your portfolio and I'd like to discuss a project."
)}`;

const FAQS = [
  {
    q: "What's your typical project timeline?",
    a: "Most websites take 1–3 weeks, portals and ERPs take 4–8 weeks. Mobile apps typically 6–10 weeks. I'll give a clear timeline before we start.",
  },
  {
    q: "Do you work with international clients?",
    a: "Yes — I work with clients worldwide via WhatsApp, email, or video calls, and adapt to your timezone.",
  },
  {
    q: "What technologies do you specialize in?",
    a: "Next.js, Tailwind, TypeScript for frontend; Python & Django for backend; Flutter & Dart for mobile; AWS for deployment.",
  },
  {
    q: "Do you provide post-launch support?",
    a: "Yes. Bug fixes, feature updates, performance monitoring, and server management after launch.",
  },
  {
    q: "How do we get started?",
    a: "Send me a message with your project idea — I'll respond within 24 hours with scope, timeline, and pricing.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-neutral-100 last:border-0">
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 py-4 text-left group"
      >
        <span className="text-sm font-semibold text-neutral-800 group-hover:text-neutral-900 transition-colors">{q}</span>
        <ChevronDown
          size={15}
          className={`shrink-0 text-neutral-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-40 pb-4" : "max-h-0"}`}>
        <p className="text-xs text-neutral-500 leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasEntered = useRef(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!sectionRef.current) return;
    const els = sectionRef.current.querySelectorAll(".anim-el");
    const animate = () => {
      if (hasEntered.current) return;
      hasEntered.current = true;
      gsap.fromTo(Array.from(els),
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }
      );
    };
    const rect = sectionRef.current.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.82) { animate(); return; }
    const trigger = ScrollTrigger.create({ trigger: sectionRef.current, start: "top 82%", once: true, onEnter: animate });
    return () => trigger.kill();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const sheetUrl = process.env.NEXT_PUBLIC_SHEET_URL;

    // No backend configured — don't fake success. Hand off to email so the lead is never lost.
    if (!sheetUrl) {
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
        `Project inquiry from ${name || "your site"}`
      )}&body=${encodeURIComponent(message)}`;
      return;
    }

    setStatus("sending");
    try {
      await fetch(sheetUrl, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({ name, email, message }),
      });
      setStatus("sent");
      setName(""); setEmail(""); setMessage("");
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section id="contact" className="px-6 py-20 bg-white">
      <div className="max-w-7xl mx-auto" ref={sectionRef}>

        {/* Top heading */}
        <div className="anim-el mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <p className="text-[10px] font-semibold text-neutral-400 uppercase tracking-widest mb-3">Contact</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1a1a] leading-tight">
              Let's build something<br />great together.
            </h2>
          </div>
          <a
            href="mailto:dhinesh.tech2001@gmail.com"
            target="_blank"
            className="flex items-center gap-2 text-sm font-semibold text-neutral-700 border border-neutral-200 rounded-full px-5 py-2.5 hover:border-neutral-400 hover:text-neutral-900 transition-all shrink-0 self-start sm:self-auto"
          >
            <Mail size={14} />
            dhinesh.tech2001@gmail.com
            <ArrowUpRight size={13} className="text-neutral-400" />
          </a>
        </div>

        {/* 2 col */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* FAQ */}
          <div className="anim-el bg-neutral-50 rounded-2xl border border-neutral-100 px-6 py-2">
            {FAQS.map(faq => <FAQItem key={faq.q} q={faq.q} a={faq.a} />)}
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="anim-el bg-[#141414] rounded-2xl p-6 flex flex-col gap-5 border border-white/[0.06]"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-semibold text-white/70 uppercase tracking-widest">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  placeholder="Your name"
                  className="w-full text-sm text-white bg-[#252525] border border-white/15 rounded-xl px-4 py-3.5 outline-none focus:border-white/50 focus:ring-2 focus:ring-white/10 transition-all placeholder:text-white/30"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-semibold text-white/70 uppercase tracking-widest">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="your@email.com"
                  className="w-full text-sm text-white bg-[#252525] border border-white/15 rounded-xl px-4 py-3.5 outline-none focus:border-white/50 focus:ring-2 focus:ring-white/10 transition-all placeholder:text-white/30"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-semibold text-white/70 uppercase tracking-widest">Message</label>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                required
                rows={5}
                placeholder="Tell me about your project..."
                className="w-full text-sm text-white bg-[#252525] border border-white/15 rounded-xl px-4 py-3.5 outline-none focus:border-white/50 focus:ring-2 focus:ring-white/10 transition-all placeholder:text-white/30 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="flex items-center justify-center gap-2 w-full bg-white text-[#141414] text-sm font-bold rounded-lg py-3.5 hover:bg-neutral-100 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "sending" && "Sending…"}
              {status === "sent"    && "✓ Message Sent!"}
              {status === "error"   && "Failed — try again"}
              {status === "idle"    && <><span>Send Message</span><ArrowUpRight size={15} /></>}
            </button>

            {status === "error" && (
              <p className="text-xs text-red-300/80 -mt-2">
                Couldn't send just now —{" "}
                <a href={`mailto:${EMAIL}`} className="underline hover:text-white">email me directly</a> or use WhatsApp below.
              </p>
            )}

            {/* Faster channels — preferred by most India-based clients */}
            <div className="flex items-center gap-3 pt-1">
              <span className="text-[11px] text-white/40 uppercase tracking-widest shrink-0">Or reach me on</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-sm font-semibold text-white border border-white/15 rounded-lg py-3 hover:border-white/40 hover:bg-white/[0.04] transition-all"
              >
                <MessageCircle size={15} /> WhatsApp
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center justify-center gap-2 text-sm font-semibold text-white border border-white/15 rounded-lg py-3 hover:border-white/40 hover:bg-white/[0.04] transition-all"
              >
                <Mail size={15} /> Email
              </a>
            </div>
          </form>

        </div>
      </div>
    </section>
  );
}
