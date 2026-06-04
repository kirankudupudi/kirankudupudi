import { Sparkles, Gamepad2, Play } from "lucide-react";
import { motion } from "motion/react";
import Interactive3DViewport from "./Interactive3DViewport";

interface HomeProps {
  onExploreClick: () => void;
  onContactClick: () => void;
}

export default function Home({ onExploreClick, onContactClick }: HomeProps) {
  return (
    <section
      id="home"
      className="min-h-screen relative flex items-center justify-center bg-theme-bg pt-20 transition-colors duration-500 overflow-hidden"
    >
      <div className="stark-hex transition-opacity duration-700" />
      {/* 3D Viewport grid alignment pattern overlay background */}
      <div 
        className="absolute inset-0 opacity-[0.065] pointer-events-none select-none z-0 transition-all duration-700"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(var(--theme-arc), 0.35) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(var(--theme-arc), 0.35) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          backgroundPosition: "center center"
        }}
      />

      {/* Decorative Blueprint Target Coordinate Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] rounded-full border border-dashed border-theme-primary/[0.04] pointer-events-none z-0 animate-spin-slow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[440px] h-[440px] rounded-full border border-dotted border-theme-secondary/[0.06] pointer-events-none z-0" />

      {/* Dynamic ambient background blobs */}
      <div className="absolute top-[20%] left-[10%] w-[35rem] h-[35rem] bg-theme-dark-accent/20 rounded-full filter blur-3xl pointer-events-none animate-pulse duration-[8000ms] z-0" />
      <div className="absolute bottom-[20%] right-[10%] w-[30rem] h-[30rem] bg-theme-primary/10 rounded-full filter blur-3xl pointer-events-none animate-pulse duration-[10000ms] z-0" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 py-12">
        {/* Left: Text Content & Stats */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left" id="hero-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-theme-primary/10 border border-theme-primary/20 text-theme-primary text-xs font-semibold tracking-wider uppercase mb-6 self-start transition-all duration-300"
            id="hero-badge"
          >
            <Sparkles size={14} className="animate-spin-slow text-theme-primary" />
            Welcome to my digital realm
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-none mb-6 font-sans"
            id="hero-name"
          >
            Kiran Kumar <span className="bg-clip-text text-transparent bg-gradient-to-r from-theme-primary to-theme-secondary">K</span>
          </motion.h1>

          {/* Neatly aligned horizontal badges for subheadings */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-wrap gap-2.5 mb-8"
            id="hero-titles-row"
          >
            {[
              { label: "CEO at InvisionXRStudios Pvt Ltd", style: "bg-theme-dark-accent/35 border-theme-dark-accent text-red-200" },
              { label: "3D Generalist", style: "bg-gray-900/60 border-gray-800 text-gray-300" },
              { label: "Game Artist", style: "bg-theme-primary/10 border-theme-primary/35 text-theme-primary" },
              { label: "AI Enthusiast", style: "bg-theme-bg border-[#9e2a40]/30 text-rose-300" }
            ].map((item, index) => (
              <span
                key={index}
                className={`px-3.5 py-1.5 rounded-xl border text-xs font-extrabold font-mono tracking-wider uppercase transition-all duration-300 ${item.style}`}
              >
                {item.label}
              </span>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-300 leading-relaxed mb-10 max-w-2xl font-sans"
            id="hero-paragraph"
          >
            Crafting immersive digital experiences through the fusion of{" "}
            <span className="text-theme-primary font-semibold">advanced 3D artistry</span>,{" "}
            <span className="text-theme-primary font-semibold">AI-powered workflows</span>, and{" "}
            <span className="text-theme-primary font-semibold">innovative game development</span>.
          </motion.p>

          {/* Core Metrics Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-3 gap-2 sm:gap-6 border-y border-gray-800/60 py-8 mb-10 w-full"
            id="hero-metrics"
          >
            <div className="text-left border-r border-gray-800/40 pr-2 sm:pr-6">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold flex items-baseline filter drop-shadow-[0_0_8px_rgba(var(--theme-glow),0.2)]">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-theme-primary to-theme-secondary">
                  8+
                </span>
              </div>
              <div className="text-[9px] sm:text-xs font-bold uppercase tracking-wider text-gray-400 mt-2">
                Years Experience
              </div>
            </div>
            <div className="text-left border-r border-gray-800/40 px-2 sm:px-6">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-theme-primary to-theme-secondary flex items-baseline">
                50+
              </div>
              <div className="text-[9px] sm:text-xs font-bold uppercase tracking-wider text-gray-400 mt-2">
                Projects Completed
              </div>
            </div>
            <div className="text-left pl-2 sm:pl-6">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-theme-primary to-theme-secondary flex items-baseline">
                10+
              </div>
              <div className="text-[9px] sm:text-xs font-bold uppercase tracking-wider text-gray-400 mt-2">
                Team Handled
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
            id="hero-actions"
          >
            <button
              onClick={onExploreClick}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-[var(--theme-button-gradient-from)] to-[var(--theme-button-gradient-to)] hover:from-[var(--theme-button-hover-from)] hover:to-[var(--theme-button-hover-to)] text-white font-semibold flex items-center justify-center gap-3 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
              style={{
                boxShadow: "0 4px 20px rgba(var(--theme-glow-crimson), 0.35)"
              }}
              id="btn-explore"
            >
              <Play size={18} fill="currentColor" />
              Explore My Work
            </button>
            <button
              onClick={onContactClick}
              className="px-8 py-4 rounded-xl border border-theme-primary/40 hover:border-theme-primary bg-transparent text-theme-primary hover:bg-theme-primary/5 font-medium flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              id="btn-collaborate"
            >
              Let's Collaborate
            </button>
          </motion.div>
        </div>

        {/* Right: Interactive 3D Canvas Viewport */}
        <div className="lg:col-span-5 flex justify-center items-center relative py-6 md:py-12" id="hero-right">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-[420px] aspect-square rounded-3xl bg-theme-card-bg border border-theme-border p-4 flex flex-col items-center justify-center relative group transition-all duration-500 stark-hud"
            id="orbiting-graphic-container"
          >
            {/* Background glowing circle */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-theme-dark-accent/10 to-theme-primary/5 blur-lg filter pointer-events-none" />

            <div className="w-full h-full relative" id="canvas-wrapper">
              <Interactive3DViewport />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Bottom Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
        <span className="text-[10px] font-semibold text-gray-500 tracking-widest uppercase">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-1.5 h-4 rounded-full bg-theme-primary"
        />
      </div>
    </section>
  );
}
