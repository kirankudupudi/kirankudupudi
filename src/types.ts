export interface Skill {
  name: string;
  level: number; // percentage (e.g. 95)
  status: "Expert" | "Advanced" | "Intermediate";
  trend?: "Growing" | "Stable";
  icon: string; // lucide icon name
}

export interface SkillCategory {
  id: string; // e.g. "3d-software"
  name: string; // e.g. "3D Software"
  skills: Skill[];
}

export interface Milestone {
  year: string;
  title: string;
  description: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  duration: string; // e.g. "Jul 2024 - Present"
  type: string; // e.g. "Full-time"
  achievements: string[];
  technologies: string[];
  icon: string; // lucide icon name
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  details: string;
  features: string[];
  technologies: string[];
  playUrl?: string;
  videoUrl?: string;
  year?: number;
  client?: string;
}

export interface Stats {
  yearsOfExperience: string;
  projectsCompleted: string;
  teamMembersLed: string;
}
