import { useState } from "react";
import { Award, Briefcase, MapPin, Calendar, CircleDot } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { experienceData } from "../data";
import Icon from "./Icon";

export default function Experience() {
  const [activeExpId, setActiveExpId] = useState(experienceData[0].id);

  const selectedExpObj = experienceData.find((exp) => exp.id === activeExpId) || experienceData[0];

  return (
    <section id="experience" className="py-24 bg-theme-bg border-t border-theme-border/40 relative transition-colors duration-500 overflow-hidden">
      <div className="stark-hex transition-opacity duration-700" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-left mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-theme-primary/10 border border-theme-primary/20 text-theme-primary text-xs font-semibold tracking-wider uppercase mb-4 transition-all duration-300">
            <Briefcase size={14} />
            Professional Milestones
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 font-sans">
            Interactive <span className="bg-clip-text text-transparent bg-gradient-to-r from-theme-primary to-theme-secondary">Career Timeline</span>
          </h2>
          <p className="text-gray-400 text-base max-w-2xl">
            A history of technical excellence, team mentoring, and visual asset delivery in cutting-edge real-time simulation and immersive media projects.
          </p>
        </div>

        {/* Experience Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Interactive Timeline list */}
          <div className="lg:col-span-5 flex flex-col gap-4 text-left">
            {experienceData.map((exp) => {
              const isSelected = exp.id === activeExpId;
              return (
                <button
                  key={exp.id}
                  id={`experience-timeline-item-${exp.id}`}
                  onClick={() => setActiveExpId(exp.id)}
                  className={`w-full flex justify-between items-center p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden text-left cursor-pointer stark-hud ${
                    isSelected
                      ? "bg-theme-card-bg border-theme-primary/60 shadow-[0_4px_30px_rgba(var(--theme-glow),0.1)] scale-[1.01]"
                      : "bg-theme-card-bg/50 border-theme-border/30 text-gray-400 hover:text-white hover:border-theme-primary/40 hover:bg-theme-card-bg"
                  }`}
                >
                  {/* Left highlighted bar for selected experience */}
                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[var(--theme-button-gradient-from)] to-[var(--theme-button-gradient-to)]" />
                  )}

                  <div className="flex gap-4 items-start">
                    <div
                      className={`p-3 rounded-xl border shrink-0 ${
                        isSelected
                          ? "bg-theme-primary/10 border-theme-primary/40 text-theme-primary"
                          : "bg-black/40 border-theme-border/50 text-gray-400"
                      }`}
                    >
                      <Icon name={exp.icon} size={18} />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-white text-base leading-snug">{exp.title}</h3>
                      <p className="text-xs text-gray-400 font-semibold mt-1">{exp.company}</p>
                      
                      <div className="flex items-center gap-3 text-[11px] text-gray-500 mt-2 font-mono">
                        <span className="flex items-center gap-1">
                          <Calendar size={11} />
                          {exp.duration}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin size={11} />
                          {exp.location}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`text-gray-500 shrink-0 ${isSelected ? "text-theme-primary" : ""}`}>
                    <Icon name="ChevronRight" size={16} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Experience highlight card */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeExpId}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="p-8 rounded-3xl bg-theme-card-bg border border-theme-border/50 shadow-2xl text-left relative overflow-hidden flex flex-col h-full stark-hud transition-all duration-500"
                id="selected-experience-detail"
              >
                {/* Glow decorations */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-theme-dark-accent/20 rounded-full filter blur-2xl pointer-events-none" />

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-theme-border/30 pb-6 mb-6 gap-4">
                  <div className="flex gap-4 items-center">
                    <div className="p-4 rounded-2xl bg-theme-dark-accent/20 border border-theme-dark-accent/30 text-theme-primary">
                      <Icon name={selectedExpObj.icon} size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-extrabold text-white tracking-tight">{selectedExpObj.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-300 font-semibold mt-1">
                        <span>{selectedExpObj.company}</span>
                        <span>•</span>
                        <span className="text-xs bg-black/40 text-gray-400 px-2 py-0.5 rounded-full font-sans text-[11px] font-bold">
                          {selectedExpObj.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right text-xs text-gray-400 font-mono flex flex-col items-start sm:items-end gap-1">
                    <span className="flex items-center gap-1.5 bg-black/40 border border-theme-border/50 px-3 py-1 rounded-full text-theme-primary font-bold">
                      <Calendar size={11} />
                      {selectedExpObj.duration}
                    </span>
                    <span className="flex items-center gap-1 text-gray-500 font-bold px-3 py-1">
                      <MapPin size={11} />
                      {selectedExpObj.location}
                    </span>
                  </div>
                </div>

                {/* Key Achievements */}
                <div className="flex-grow">
                  <h4 className="text-theme-primary text-xs font-bold tracking-widest uppercase font-mono mb-4">
                    Key Achievements
                  </h4>
                  <ul className="space-y-4 mb-8">
                    {selectedExpObj.achievements.map((ach, i) => (
                      <li key={i} className="flex gap-3 items-start text-sm text-gray-300 leading-relaxed">
                        <span className="text-theme-secondary shrink-0 mt-1.5">
                          <CircleDot size={8} fill="currentColor" />
                        </span>
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div className="border-t border-theme-border/30 pt-6 mt-auto">
                  <h4 className="text-theme-primary text-xs font-bold tracking-widest uppercase font-mono mb-3">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedExpObj.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs bg-theme-primary/10 border border-theme-primary/20 text-white px-3.5 py-1.5 rounded-xl font-medium tracking-wide transition-colors hover:bg-theme-primary/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
