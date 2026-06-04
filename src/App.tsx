import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [theme, setTheme] = useState<"luxury" | "ironman">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("portfolio-theme") as "luxury" | "ironman") || "luxury";
    }
    return "luxury";
  });

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 76; // Navbar height offset
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    const sections = ["home", "about", "skills", "experience", "projects", "contact"];
    const observers = sections.map((id) => {
      const element = document.getElementById(id);
      if (!element) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        {
          rootMargin: "-20% 0px -60% 0px" // Adjust to detect middle section
        }
      );
      observer.observe(element);
      return { observer, element };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) {
          obs.observer.unobserve(obs.element);
        }
      });
    };
  }, []);

  return (
    <div className="bg-theme-bg text-white min-h-screen selection:bg-[var(--theme-dark-accent)] selection:text-[var(--theme-primary)] transition-colors duration-500 overflow-x-hidden">
      {/* Sticky Top Navigation */}
      <Navbar activeSection={activeSection} onNavClick={handleNavClick} theme={theme} setTheme={setTheme} />

      {/* Main Core View Modules */}
      <Home 
        onExploreClick={() => handleNavClick("projects")} 
        onContactClick={() => handleNavClick("contact")} 
      />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
    </div>
  );
}

