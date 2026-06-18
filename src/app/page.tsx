import Hero from "@/components/Hero";
import About from "@/components/About";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white">

      {/* Header */}
      <header className="relative z-10 h-16" />

      <Hero />
      <About />

    </div>
  );
}
