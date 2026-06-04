import { useState } from "react";
import { Sparkles, Brain, Award, Users, ChevronRight, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { journeyMilestones } from "../data";

export default function About() {
  const [activeHighlight, setActiveHighlight] = useState(0);

  const keyStrengths = [
    {
      title: "AI-Powered Workflows",
      desc: "Pioneering the custom integration of Generative AI tools (Midjourney, Stable Diffusion, LLM APIs) in traditional 3D pipelines, boosting overall asset prototyping efficiency by 40%.",
      icon: Brain,
      bgColor: "bg-theme-dark-accent/20",
      borderColor: "border-theme-dark-accent/40",
      iconColor: "text-red-500",
    },
    {
      title: "Visual Innovation",
      desc: "Expertise in creating ultra-immersive historical reconstructions, tactile training simulations, and high-performance cross-platform VR/AR optimization.",
      icon: Sparkles,
      bgColor: "bg-theme-primary/10",
      borderColor: "border-theme-primary/30",
      iconColor: "text-theme-primary",
    },
    {
      title: "Technical Leadership",
      desc: "Proven track record of coordinating and inspiring cross-functional departments (10+ senior artists), creating standardized delivery specifications and robust production templates.",
      icon: Users,
      bgColor: "bg-gray-800/40",
      borderColor: "border-gray-700",
      iconColor: "text-blue-400",
    },
  ];

  const handleNextStrength = () => {
    setActiveHighlight((prev) => (prev + 1) % keyStrengths.length);
  };

  const handlePrevStrength = () => {
    setActiveHighlight((prev) => (prev - 1 + keyStrengths.length) % keyStrengths.length);
  };

  return (
    <section id="about" className="py-24 bg-theme-bg border-t border-theme-border/40 relative transition-colors duration-500 overflow-hidden">
      <div className="stark-hex transition-opacity duration-700" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-left mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-theme-primary/10 border border-theme-primary/20 text-theme-primary text-xs font-semibold tracking-wider uppercase mb-4 transition-all duration-300">
            <Award size={14} />
            About Me
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-sans">
            Crafting Digital Experiences Through <span className="bg-clip-text text-transparent bg-gradient-to-r from-theme-primary to-theme-secondary">Innovation & Artistry</span>
          </h2>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Biography & Milestones */}
          <div className="lg:col-span-7 space-y-12 text-left">
            <div className="prose prose-invert max-w-none space-y-6 text-gray-300 text-base leading-relaxed">
              <p>
                I'm a passionate CEO, Art Lead, and 3D Generalist who bridges the gap between traditional artistry and cutting-edge technology. With over 8 years of experience in game development, VR/AR, and immersive media, I specialize in creating compelling visual narratives that engage and inspire.
              </p>
              
              <div>
                <h3 className="text-theme-primary text-lg font-bold font-sans uppercase tracking-widest mb-4">My Journey</h3>
                <p className="mb-4">
                  Starting as a 3D Designer, I've evolved into a leader who embraces innovation. My recent focus on <strong className="text-white font-semibold">Generative AI integration</strong> has revolutionized how my teams approach creative workflows, reducing prototyping time by 40% while maintaining artistic integrity.
                </p>
                <p>
                  From leading the <strong className="text-theme-primary font-semibold">Odia Metaverse project</strong> to developing tactical VR simulations for the Indian Army, I've consistently delivered projects that push the boundaries of what's possible in digital media.
                </p>
              </div>
            </div>

            {/* Structured Milestones */}
            <div className="space-y-6" id="about-milestones">
              {journeyMilestones.map((ms, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-4 p-4 rounded-xl bg-theme-card-bg/40 border border-theme-border/40 hover:border-theme-primary/50 transition-colors duration-300 stark-hud"
                >
                  <span className="text-lg font-bold text-theme-primary bg-theme-primary/5 px-3 py-1 rounded-lg border border-theme-primary/10 font-mono">
                    {ms.year}
                  </span>
                  <div className="text-left">
                    <h4 className="font-bold text-white text-base">{ms.title}</h4>
                    <p className="text-sm text-gray-400 mt-1">{ms.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Key Strengths interactive card deck */}
          <div className="lg:col-span-5 flex flex-col justify-start items-center lg:items-end w-full pt-2" id="about-card-column">
            <div className="relative w-full max-w-sm h-[25rem] flex justify-center items-center">
              
              <AnimatePresence mode="wait">
                {keyStrengths.map((str, index) => {
                  if (index !== activeHighlight) return null;
                  const IconComp = str.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 50, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -50, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className={`absolute w-full h-full p-8 rounded-2xl border ${str.borderColor} ${str.bgColor} flex flex-col justify-between shadow-[0_10px_35px_rgba(0,0,0,0.5)] bg-opacity-30 stark-hud transition-colors duration-500`}
                    >
                      <div>
                        <div className="flex justify-between items-start mb-6">
                          <div className={`p-4 rounded-xl bg-black/40 border border-gray-800/40 ${str.iconColor}`}>
                            <IconComp size={28} />
                          </div>
                          <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest font-mono">
                            Focus 0{index + 1}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{str.title}</h3>
                        <p className="text-sm text-gray-300 leading-relaxed">{str.desc}</p>
                      </div>

                      {/* Manual Card Controls */}
                      <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/5">
                        <span className="text-xs font-semibold text-gray-400 font-mono">
                          {index + 1} of {keyStrengths.length}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={handlePrevStrength}
                            className="p-1.5 rounded-lg bg-black/40 text-gray-400 hover:text-white border border-gray-800 hover:border-theme-primary transition z-20 cursor-pointer relative"
                            aria-label="Previous card"
                          >
                            <ChevronLeft size={16} />
                          </button>
                          <button
                            onClick={handleNextStrength}
                            className="p-1.5 rounded-lg bg-black/40 text-theme-primary hover:text-white border border-theme-primary/30 hover:border-theme-primary transition z-20 cursor-pointer relative"
                            aria-label="Next card"
                          >
                            <ChevronRight size={16} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
