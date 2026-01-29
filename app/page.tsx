import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      {/* Gradient overlay at the top */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
      
      <main className="max-w-4xl mx-auto px-6 md:px-8 relative z-10">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}
