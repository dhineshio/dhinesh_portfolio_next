import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import TechStack from "@/components/TechStack";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white">

      {/* Header */}
      <header className="relative z-10 h-16" />

      <Hero />
      <About />
      <Projects />
      <TechStack />
      <Services />
      <Contact />
      <Footer />

    </div>
  );
}
