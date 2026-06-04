import { useState } from "react";
import { Sparkles, TrendingUp, Users, Award, Zap, HardDrive } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { skillsCategories } from "../data";
import Icon from "./Icon";

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState("3d-software");

  const currentCategoryObj = skillsCategories.find((cat) => cat.id === selectedCategory) || skillsCategories[0];

  return (
    <section id="skills" className="py-24 bg-theme-bg border-t border-theme-border/40 relative transition-colors duration-500 overflow-hidden">
      <div className="stark-hex transition-opacity duration-700" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-left mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-theme-primary/10 border border-theme-primary/20 text-theme-primary text-xs font-semibold tracking-wider uppercase mb-4 transition-all duration-300">
            <Sparkles size={14} />
            Skills & Expertise
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 font-sans">
            Technical Mastery Meets <span className="bg-clip-text text-transparent bg-gradient-to-r from-theme-primary to-theme-secondary">Creative Vision</span>
          </h2>
          <p className="text-gray-400 text-base max-w-3xl leading-relaxed">
            A comprehensive toolkit spanning traditional 3D artistry, cutting-edge AI integration, and proven leadership capabilities that drive teams to excellence.
          </p>
        </div>

        {/* Categories and Skill Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20">
          
          {/* Left: Filter Buttons */}
          <div className="md:col-span-12 lg:col-span-4 flex flex-col gap-4">
            {skillsCategories.map((cat) => {
              const isSelected = cat.id === selectedCategory;
              return (
                <button
                  key={cat.id}
                  id={`skill-cat-${cat.id}`}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full flex justify-between items-center px-6 py-4 rounded-xl border transition-all duration-300 cursor-pointer stark-hud ${
                    isSelected
                      ? "bg-theme-secondary/20 border-theme-secondary/50 text-white shadow-[0_4px_20px_rgba(var(--theme-glow-crimson),0.3)] scale-[1.02]"
                      : "bg-theme-card-bg/60 border-theme-border/40 text-gray-400 hover:text-white hover:border-theme-primary/50 hover:bg-theme-card-bg"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Choose matching icon based on ID */}
                    <Icon name={cat.id === "3d-software" ? "Gamepad2" : cat.id === "ai-tools" ? "Cpu" : cat.id === "design-effects" ? "Palette" : "Users"} className={isSelected ? "text-white" : "text-gray-400"} size={18} />
                    <span className="font-bold tracking-wide text-sm">{cat.name}</span>
                  </div>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full border font-mono font-bold ${
                      isSelected
                        ? "bg-theme-primary/20 border-theme-primary/40 text-theme-primary"
                        : "bg-black/40 border-gray-700/50 text-gray-400"
                    }`}
                  >
                    {cat.skills.length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right: Skills List Grid */}
          <div className="md:col-span-12 lg:col-span-8">
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              id="skill-cards-grid"
            >
              <AnimatePresence mode="popLayout">
                {currentCategoryObj.skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="p-6 rounded-2xl bg-theme-card-bg/60 border border-theme-border/30 hover:border-theme-primary/60 hover:shadow-[0_4px_25px_rgba(var(--theme-glow),0.1)] transition-all duration-300 flex flex-col justify-between text-left group stark-hud"
                  >
                    <div>
                      {/* Skill Icon & Label */}
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 rounded-xl bg-black/40 border border-theme-border/40 text-theme-primary group-hover:bg-theme-primary/10 group-hover:border-theme-primary/40 transition-colors">
                            <Icon name={skill.icon} size={18} />
                          </div>
                          <span className="font-bold text-white text-base tracking-wide group-hover:text-theme-primary transition-colors">{skill.name}</span>
                        </div>
                        {skill.trend === "Growing" && (
                          <span className="inline-flex items-center gap-1 text-[10px] bg-theme-primary/10 text-theme-primary px-2 py-0.5 rounded-md font-mono font-medium border border-theme-primary/20">
                            <TrendingUp size={10} />
                            Growing
                          </span>
                        )}
                      </div>

                      {/* Score Value Bar */}
                      <div className="flex justify-between text-xs font-semibold text-gray-400 mb-2 font-mono">
                        <span>{skill.status}</span>
                        <span className="text-theme-primary">{skill.level}%</span>
                      </div>
                    </div>

                    <div className="w-full bg-black/40 rounded-full h-2 overflow-hidden border border-theme-border/20">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-[var(--theme-button-gradient-from)] to-[var(--theme-button-gradient-to)] rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* Career Highlights Panel */}
        <div 
          id="career-highlights-panel" 
          className="rounded-3xl bg-theme-card-bg/80 border border-theme-border/50 p-8 sm:p-10 relative overflow-hidden stark-hud transition-all duration-500"
        >
          {/* Faint accent gradient glow */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-theme-primary/10 rounded-full filter blur-2xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Highlights Statistics Panel */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-6 lg:border-r lg:border-theme-border/30 lg:pr-8 text-center sm:text-left">
              <div>
                <div className="text-4xl font-extrabold text-theme-primary font-mono">8+</div>
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mt-1">
                  Years Experience
                </div>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-theme-secondary font-mono">5+</div>
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mt-1">
                  Leadership Roles
                </div>
              </div>
            </div>

            {/* Notable Records List */}
            <div className="lg:col-span-8 flex flex-col gap-5 text-left">
              <h3 className="text-theme-primary text-sm font-bold tracking-wider uppercase font-mono flex items-center gap-2">
                <Zap size={14} />
                Career Highlights
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 bg-black/30 p-3 rounded-xl border border-theme-border/30 hover:border-theme-primary/50 transition-colors duration-300">
                  <div className="p-2 rounded-lg bg-theme-primary/10 text-theme-primary shrink-0 mt-0.5">
                    <Award size={14} />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-white">Art Director</h4>
                    <p className="text-xs text-gray-400 mt-0.5">At InvisionXR Studios, driving AI art integration.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-black/30 p-3 rounded-xl border border-theme-border/30 hover:border-theme-primary/50 transition-colors duration-300">
                  <div className="p-2 rounded-lg bg-theme-dark-accent/40 text-rose-400 shrink-0 mt-0.5">
                    <Users size={14} />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-white">Led 10+ Art Specialists</h4>
                    <p className="text-xs text-gray-400 mt-0.5">Mentored and managed developers, artists, and modelers.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-black/30 p-3 rounded-xl border border-theme-border/30 sm:col-span-2 hover:border-theme-primary/50 transition-colors duration-300">
                  <div className="p-2 rounded-lg bg-theme-secondary/15 text-theme-secondary shrink-0 mt-0.5">
                    <HardDrive size={14} />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-white">Spearheaded Odia Metaverse Project</h4>
                    <p className="text-xs text-gray-400 mt-0.5">Brought ancient Indian architecture and heritage to life inside rich, interactive mobile VR and rendering environments.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
