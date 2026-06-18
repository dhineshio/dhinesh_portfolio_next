"use client";
import { useEffect, useState } from "react";

const ROLES = ["App Developer", "Web Developer", "Full Stack Developer"];

export default function AboutRole() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex(i => (i + 1) % ROLES.length);
        setVisible(true);
      }, 300);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <h3
      className="text-3xl font-bold text-[#1a1a1a] transition-all duration-300"
      style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(8px)" }}
    >
      {ROLES[index]}
    </h3>
  );
}
