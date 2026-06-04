import { useState } from "react";
import { Layers, Play, X, ExternalLink, Sparkles, CheckCircle, Calendar, Tag } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { projectsData } from "../data";
import { Project } from "../types";

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filterCategories = [
    "All",
    "VR/AR",
    "Character Design",
    "Environment",
    "Visualization",
    "Game Art",
    "Product Design",
    "Concept Art",
    "Coming Soon"
  ];

  const filteredProjects = activeFilter === "All"
    ? projectsData
    : projectsData.filter((proj) => proj.category === activeFilter);

  const getCategoryCount = (category: string) => {
    if (category === "All") return projectsData.length;
    return projectsData.filter((p) => p.category === category).length;
  };

  return (
    <section id="projects" className="py-24 bg-theme-bg border-t border-theme-border/40 relative transition-colors duration-500 overflow-hidden">
      <div className="stark-hex transition-opacity duration-700" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-left mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-theme-primary/10 border border-theme-primary/20 text-theme-primary text-xs font-semibold tracking-wider uppercase mb-4 transition-all duration-300">
            <Layers size={14} />
            Portfolio Showcase
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 font-sans">
            Featured Projects & <span className="bg-clip-text text-transparent bg-gradient-to-r from-theme-primary to-theme-secondary">Creative Work</span>
          </h2>
          <p className="text-gray-400 text-base max-w-2xl">
            A curated selection of my most impactful projects, ranging from immersive metaverse experiences to AI-enhanced game development workflows.
          </p>
        </div>

        {/* Filter Badges with Counts */}
        <div className="flex flex-wrap gap-2.5 mb-12" id="project-filters">
          {filterCategories.map((cat) => (
            <button
              key={cat}
              id={`project-filter-${cat.replace(/\s+/g, '-').toLowerCase()}`}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2.5 rounded-xl border text-xs font-bold font-sans tracking-wide transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                activeFilter === cat
                  ? "bg-theme-secondary/20 border-theme-secondary/60 text-white shadow-[0_4px_15px_rgba(var(--theme-glow-crimson),0.2)]"
                  : "bg-theme-card-bg border-theme-border/30 text-gray-400 hover:text-white hover:border-theme-primary/50"
              }`}
            >
              <span>{cat}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full transition-colors ${
                activeFilter === cat 
                  ? "bg-theme-secondary/30 text-white" 
                  : "bg-black/40 text-gray-500 group-hover:text-gray-300"
              }`}>
                {getCategoryCount(cat)}
              </span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left"
          id="project-items-grid"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedProject(project)}
                className="group rounded-3xl bg-theme-card-bg border border-theme-border/50 hover:border-theme-primary/60 overflow-hidden cursor-pointer shadow-[0_6px_25px_rgba(0,0,0,0.5)] flex flex-col justify-between min-h-[440px] relative transition-all duration-300 hover:shadow-[0_15px_30px_rgba(var(--theme-glow),0.15)] stark-hud"
              >
                {/* Image Showcase Container */}
                <div className="h-56 relative overflow-hidden shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-t from-theme-card-bg via-transparent to-transparent z-10" />
                  
                  {/* Subtle dark color mask over image */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors z-0" />

                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Category overlay */}
                  <span className="absolute top-4 left-4 z-20 text-[10px] font-extrabold uppercase font-mono tracking-widest bg-theme-dark-accent/95 border border-theme-border/40 text-theme-primary px-3 py-1.5 rounded-lg shadow-md flex items-center gap-1.5">
                    <Tag size={10} />
                    {project.category}
                  </span>

                  {project.category === "Coming Soon" && (
                    <span className="absolute top-4 right-4 z-20 text-[10px] font-extrabold uppercase font-mono tracking-widest bg-theme-secondary/95 border border-theme-secondary/50 text-white px-3 py-1.5 rounded-lg shadow-md">
                      Coming Soon
                    </span>
                  )}
                </div>

                {/* Content Container */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-xl font-extrabold text-white group-hover:text-theme-primary transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                    
                    {/* Meta Info (Year and Category) */}
                    <div className="flex items-center gap-3.5 text-xs text-gray-400 font-medium">
                      <span className="flex items-center gap-1">
                        <Calendar size={13} className="text-gray-500" />
                        {project.year || "2024"}
                      </span>
                      <span className="flex items-center gap-1">
                        <Tag size={13} className="text-gray-500" />
                        {project.category}
                      </span>
                    </div>

                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed line-clamp-3 font-sans pt-1">
                      {project.description}
                    </p>
                  </div>

                  {/* Client name or personal study indicator */}
                  <div className="mt-4 pt-3 border-t border-theme-border/30 flex flex-col gap-2">
                    {project.client && (
                      <div className="text-xs text-gray-400 font-sans">
                        <span className="text-gray-500 font-semibold mr-1.5">Client:</span>
                        <span className="text-gray-300 font-bold">{project.client}</span>
                      </div>
                    )}

                    {/* Tech stack row */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] sm:text-[11px] font-semibold bg-black/40 border border-theme-border/40 text-gray-300 px-2.5 py-1 rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="text-[10px] sm:text-[11px] font-mono text-gray-550 font-bold self-center px-1">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Overlaid quick-peek hover icon - hidden for coming soon unless it has details */}
                {project.category !== "Coming Soon" && (
                  <div className="absolute bottom-5 right-5 h-8 w-8 rounded-full bg-gradient-to-r from-[var(--theme-button-gradient-from)] to-[var(--theme-button-gradient-to)] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                    <Play size={12} className="ml-0.5" fill="currentColor" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View More on ArtStation Call to Action */}
        <div className="mt-16 p-8 rounded-3xl bg-theme-card-bg border border-theme-border/50 max-w-3xl mx-auto text-center shadow-[0_10px_35px_rgba(0,0,0,0.4)] relative overflow-hidden stark-hud transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-theme-primary/10 to-transparent pointer-events-none" />
          <h3 className="text-xl font-bold text-white mb-2 font-sans relative z-10">View More on ArtStation</h3>
          <p className="text-gray-400 text-sm max-w-lg mx-auto mb-6 relative z-10">
            Explore my complete historical portfolio including detailed visual breakdowns, process movies, high-res renders, and additional studies.
          </p>
          <a
            href="https://www.artstation.com/kiranprince9297"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[var(--theme-button-gradient-from)] to-[var(--theme-button-gradient-to)] hover:from-[var(--theme-button-hover-from)] hover:to-[var(--theme-button-hover-to)] text-white font-semibold text-sm hover:opacity-95 transition shadow-lg hover:scale-[1.02] active:scale-95 duration-200"
          >
            Visit ArtStation Portfolio
            <ExternalLink size={15} />
          </a>
        </div>

        {/* Project Detailed Description Modal Overlay */}
        <AnimatePresence>
          {selectedProject && (
            <div
              id="project-detail-modal"
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="w-full max-w-4xl bg-theme-card-bg border border-theme-border/50 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] max-h-[90vh] flex flex-col text-left stark-hud transition-colors duration-500"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Title / Action Bar */}
                <div className="flex justify-between items-center p-6 border-b border-theme-border/40 bg-black/20 shrink-0">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[10px] font-extrabold font-mono uppercase bg-theme-dark-accent/40 border border-theme-border/40 text-theme-primary px-2.5 py-1 rounded-md">
                      {selectedProject.category}
                    </span>
                    <h4 className="text-lg font-bold text-white truncate max-w-xs sm:max-w-md">{selectedProject.title}</h4>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-1.5 rounded-lg border border-theme-border/40 hover:border-theme-primary bg-black/40 text-gray-400 hover:text-white transition"
                    aria-label="Close modal"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Modal Scrollable Body */}
                <div className="overflow-y-auto p-6 md:p-8 space-y-8 flex-grow">
                  {/* Banner image with overlays */}
                  <div className="h-64 sm:h-80 rounded-2xl overflow-hidden relative border border-theme-border/30 shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-theme-card-bg via-transparent to-transparent z-10" />
                    <img
                      src={selectedProject.imageUrl}
                      alt={selectedProject.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Summary & Core Features Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    
                    {/* Left: General description */}
                    <div className="md:col-span-7 space-y-6">
                      <div className="flex items-center gap-6 text-sm text-theme-primary font-mono border-b border-theme-border/30 pb-4">
                        {selectedProject.client && (
                          <div>
                            <span className="text-gray-400 uppercase text-xs">Client</span>
                            <div className="text-white font-bold mt-0.5">{selectedProject.client}</div>
                          </div>
                        )}
                        {selectedProject.year && (
                          <div>
                            <span className="text-gray-400 uppercase text-xs">Project Year</span>
                            <div className="text-white font-bold mt-0.5">{selectedProject.year}</div>
                          </div>
                        )}
                      </div>

                      <h5 className="text-theme-primary text-xs font-bold tracking-widest uppercase font-mono">
                        Project Overview
                      </h5>
                      <p className="text-gray-300 leading-relaxed text-sm sm:text-base font-sans">
                        {selectedProject.details}
                      </p>

                      <div className="border-t border-theme-border/30 pt-6">
                        <h5 className="text-theme-primary text-xs font-bold tracking-widest uppercase font-mono mb-3.5">
                          Involved Technologies
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="text-xs bg-black/40 border border-theme-border/40 text-gray-300 px-3.5 py-1.5 rounded-xl font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right: Feature Highlights list */}
                    <div className="md:col-span-5 p-6 rounded-2xl bg-black/35 border border-theme-border/40 flex flex-col justify-between h-fit gap-6">
                      <div>
                        <h5 className="text-white text-xs font-bold tracking-widest uppercase font-mono flex items-center gap-2 mb-4">
                          <Sparkles size={13} className="text-theme-secondary" />
                          Key Features
                        </h5>
                        <ul className="space-y-3.5">
                          {selectedProject.features.map((feat, i) => (
                            <li key={i} className="flex gap-2.5 items-start text-xs sm:text-sm text-gray-400 font-sans">
                              <CheckCircle size={14} className="text-theme-primary shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {selectedProject.playUrl && (
                        <a
                          href={selectedProject.playUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[var(--theme-button-gradient-from)] to-[var(--theme-button-gradient-to)] hover:from-[var(--theme-button-hover-from)] hover:to-[var(--theme-button-hover-to)] text-white font-semibold text-center flex items-center justify-center gap-2 text-sm shadow-[0_4px_15px_rgba(var(--theme-glow-crimson),0.3)] hover:scale-[1.02] active:scale-95 transition-all"
                        >
                          View on ArtStation
                          <ExternalLink size={13} />
                        </a>
                      )}
                    </div>

                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
