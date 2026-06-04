import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  activeSection: string;
  onNavClick: (sectionId: string) => void;
  theme: "luxury" | "ironman";
  setTheme: React.Dispatch<React.SetStateAction<"luxury" | "ironman">>;
}

export default function Navbar({ activeSection, onNavClick, theme, setTheme }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Skills", id: "skills" },
    { label: "Experience", id: "experience" },
    { label: "Projects", id: "projects" },
    { label: "Contact", id: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (id: string) => {
    onNavClick(id);
    setIsOpen(false);
  };

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-theme-bg/90 backdrop-blur-md border-b border-theme-border py-3 shadow-[0_4px_30px_rgba(0,0,0,0.8)]"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <button
          id="logo-brand"
          onClick={() => handleClick("home")}
          className="text-2xl font-bold font-sans tracking-widest text-theme-primary hover:opacity-80 transition-opacity cursor-pointer"
        >
          KK
        </button>

        {/* Desktop Menu & Theme Controller Container */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center space-x-8" id="desktop-menu">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-item-${item.id}`}
                onClick={() => handleClick(item.id)}
                className={`text-sm font-medium tracking-wider relative py-1 cursor-pointer transition-colors duration-200 ${
                  activeSection === item.id
                    ? "text-theme-primary font-bold"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-theme-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Theme Switcher Toggle button */}
          <button
            onClick={() => setTheme(theme === "luxury" ? "ironman" : "luxury")}
            className="group relative p-2.5 rounded-xl bg-black/45 hover:bg-black/20 border border-theme-border flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 text-white/95 shadow-md overflow-hidden"
            title={`Switch to ${theme === "luxury" ? "Iron Man" : "Royal Gold"} Theme`}
            style={{
              boxShadow: theme === "luxury" 
                ? "0 0 12px rgba(229, 193, 88, 0.08)" 
                : "0 0 15px rgba(0, 240, 255, 0.18)"
            }}
          >
            {theme === "luxury" ? (
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-theme-primary filter drop-shadow-[0_0_3px_rgba(229,193,88,0.4)] transition-transform duration-500 group-hover:rotate-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2.4 20h19.2c.4 0 .7-.3.7-.7l-1.9-9.5c-.1-.4-.4-.7-.8-.7l-4.1 3-3.1-6c-.1-.3-.4-.5-.7-.5s-.6.2-.7.5l-3.1 6-4.1-3c-.4 0-.7.3-.8.7L1.7 19.3c.1.4.4.7.7.7z" fill="currentColor" fillOpacity="0.15" />
                  <circle cx="12" cy="4" r="1.5" fill="currentColor" />
                  <circle cx="2" cy="9" r="1.5" fill="currentColor" />
                  <circle cx="22" cy="9" r="1.5" fill="currentColor" />
                </svg>
                <span className="text-[9px] uppercase font-black tracking-widest text-[#e5c158] hidden lg:inline-block bg-[#e5c158]/5 border border-[#e5c158]/10 px-2 py-0.5 rounded-md">Luxury Gold</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 animate-spin-slow text-[#00f0ff] filter drop-shadow-[0_0_8px_rgba(0,240,255,0.85)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeDasharray="4 2" />
                  <circle cx="12" cy="12" r="4" fill="currentColor" className="animate-pulse" />
                  <path d="M12 2v2M12 20v2M2 12h2M20 12h2" stroke="currentColor" />
                </svg>
                <span className="text-[9px] uppercase font-black tracking-widest text-[#00f0ff] hidden lg:inline-block bg-[#00f0ff]/10 border border-[#00f0ff]/20 px-2 py-0.5 rounded-md">Stark core</span>
              </div>
            )}
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-300 hover:text-white transition-colors p-2 cursor-pointer"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-theme-bg border-b border-theme-border overflow-hidden"
          >
            <div className="px-6 py-6 pb-8 space-y-4 flex flex-col">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  id={`mobile-nav-item-${item.id}`}
                  onClick={() => handleClick(item.id)}
                  className={`text-left text-base font-semibold py-2 tracking-wider border-l-2 pl-3 transition-all duration-200 cursor-pointer ${
                    activeSection === item.id
                      ? "text-theme-primary border-theme-primary bg-theme-primary/5"
                      : "text-gray-400 border-transparent hover:text-white hover:border-gray-550"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
