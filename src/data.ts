import { SkillCategory, Experience, Project, Milestone } from "./types";

export const journeyMilestones: Milestone[] = [
  {
    year: "2024",
    title: "CEO at InvisionXR",
    description: "Leading AI-enhanced creative workflows and managing cross-functional production teams."
  },
  {
    year: "2022",
    title: "Art Lead - Metaverse Pioneer",
    description: "Spearheaded the Odia Metaverse project, bringing rich cultural history into interactive 3D."
  },
  {
    year: "2017",
    title: "Started Professional Journey",
    description: "Began as a 3D Graphic Developer, focusing on high-precision simulations."
  }
];

export const skillsCategories: SkillCategory[] = [
  {
    id: "3d-software",
    name: "3D Software",
    skills: [
      { name: "Unreal Engine", level: 95, status: "Expert", trend: "Growing", icon: "Gamepad2" },
      { name: "Unity 3D", level: 90, status: "Expert", trend: "Growing", icon: "Cpu" },
      { name: "Maya", level: 85, status: "Advanced", trend: "Growing", icon: "Compass" },
      { name: "Substance Painter", level: 80, status: "Advanced", icon: "Paintbrush" },
      { name: "ZBrush", level: 65, status: "Intermediate", icon: "Sparkles" }
    ]
  },
  {
    id: "ai-tools",
    name: "AI Tools",
    skills: [
      { name: "Midjourney & Stable Diffusion", level: 95, status: "Expert", trend: "Growing", icon: "Sparkles" },
      { name: "ComfyUI & Custom LoRAs", level: 90, status: "Expert", trend: "Growing", icon: "GitFork" },
      { name: "Prompt Engineering & Workflows", level: 85, status: "Advanced", icon: "Terminal" },
      { name: "GenAI Texture/Mesh Synthesizers", level: 80, status: "Advanced", icon: "Cpu" }
    ]
  },
  {
    id: "design-effects",
    name: "Design & Effects",
    skills: [
      { name: "Real-time Lighting & VFX", level: 90, status: "Expert", trend: "Growing", icon: "Sun" },
      { name: "PBR Material Design", level: 85, status: "Advanced", icon: "Layers" },
      { name: "Post-Processing & Compositing", level: 80, status: "Advanced", icon: "Sliders" },
      { name: "Photoshop & Illustrator", level: 85, status: "Advanced", icon: "Image" }
    ]
  },
  {
    id: "leadership",
    name: "Leadership",
    skills: [
      { name: "Creative Art Direction", level: 90, status: "Expert", trend: "Growing", icon: "Award" },
      { name: "Agile Team Management (10+ Artists)", level: 85, status: "Advanced", icon: "Users" },
      { name: "Client Relations & Communication", level: 85, status: "Advanced", icon: "Briefcase" },
      { name: "Project Estimation & Pipelines", level: 80, status: "Advanced", icon: "TrendingUp" }
    ]
  }
];

export const experienceData: Experience[] = [
  {
    id: "exp-1",
    title: "CEO",
    company: "InvisionXR Studios Pvt Ltd",
    location: "Hyderabad",
    duration: "Jul 2024 – Present",
    type: "Full-time",
    achievements: [
      "Architected AI-enhanced workflows integrating generative AI for faster asset prototyping, improving delivery times by 35%.",
      "Led and inspired a multi-disciplinary team of 3D modelers, concept artists, and engine developers to deliver cutting-edge interactive showrooms.",
      "Conducted specialized workshops on AI-driven creative tools and direct integration with Unreal Engine 5 production pipelines.",
      "Developed comprehensive project initiation catalogues that standardise art guidelines and technical constraints for all active accounts."
    ],
    technologies: ["Unreal Engine", "AI Tools", "Team Management", "Client Relations"],
    icon: "Award"
  },
  {
    id: "exp-2",
    title: "Art Lead",
    company: "Immersive Gamitronics Studios Pvt Ltd",
    location: "Hyderabad",
    duration: "Apr 2022 – Apr 2024",
    type: "Full-time",
    achievements: [
      "Spearheaded the breakthrough Odia Metaverse project, constructing exceptionally rich interactive 3D digital reconstructions of historical heritage centers.",
      "Managed, coordinated, and mentored a department of 10+ artists to ensure top-tier visual excellence and technical compliance with real-time standards.",
      "Optimized asset pipelines for VR and mobile rendering engines, reducing draw calls by 45% while maintaining visual fidelity.",
      "Collaborated deeply with narrative leads and historical consultants to maintain accurate environment modeling, lighting, and cultural textures."
    ],
    technologies: ["Unity 3D", "Maya", "Substance Painter", "Leadership", "Git"],
    icon: "Users"
  },
  {
    id: "exp-3",
    title: "Lead Designer",
    company: "VR Simulations / VU Infomedia LLP",
    location: "Hyderabad",
    duration: "Apr 2019 – Dec 2021",
    type: "Full-time",
    achievements: [
      "Designed and produced highly accurate VR tactical and mechanical training simulators for defense training (including projects for the Indian Army).",
      "Created high-fidelity hard-surface models of modern military hardware, vehicles, and complex control interfaces.",
      "Developed interactive environments featuring physical simulation adapters, complex destructible assets, and environmental weather variants.",
      "Directly engaged with major clients to gather custom hardware integrations and translate feedback into engine-ready visual specs."
    ],
    technologies: ["Unreal Engine", "ZBrush", "Photoshop", "Client Relations"],
    icon: "Gamepad2"
  },
  {
    id: "exp-4",
    title: "3D Graphic Developer",
    company: "Simulations Works / Digital Curve IT Solutions",
    location: "Hyderabad",
    duration: "Oct 2017 – Dec 2019",
    type: "Full-time",
    achievements: [
      "Modeled, UV-unwrapped, baked, and textured dozens of dense mechanical and industrial models for engineering walkthroughs.",
      "Authored custom PBR material libraries for high-fidelity metallic, glass, and composite surfaces.",
      "Partnered with integration developers to maintain smooth 60fps operation on mid-spec web platforms and desktop simulators."
    ],
    technologies: ["Maya", "Substance Painter", "Photoshop", "ZBrush"],
    icon: "Layers"
  }
];

export const projectsData: Project[] = [
  {
    id: "proj-medieval",
    title: "MedievalFeast",
    description: "This video was created utilizing free assets from Unreal Engine, Mixamo characters, and Quixel content. It aims to demonstrate advanced environment building.",
    category: "Environment",
    imageUrl: "projects/medieval.jpg",
    details: "This video was created utilizing free assets from Unreal Engine, Mixamo characters, and Quixel content. It aims to demonstrate high-quality environment creation and character integration using industry-standard tools.",
    features: [
      "Environment creation using Quixel Megascans",
      "Character animation using Mixamo",
      "Asset integration with fab",
      "Real-time rendering in Unreal Engine"
    ],
    technologies: ["Unreal Engine", "Quixel Megascans", "fab", "Mixamo"],
    playUrl: "https://www.artstation.com/artwork/ZlQDm0",
    year: 2024,
    client: "Personal Project"
  },
  {
    id: "proj-1",
    title: "Desert Love",
    description: "Immersive cultural metaverse environment celebrating Odia heritage with AI-enhanced procedural generation",
    category: "Environment",
    imageUrl: "projects/odia-metaverse.jpg",
    details: "Built with extreme historical fidelity, this metaverse platform allows users to explore virtualized reconstructions of the Konark Sun Temple and other key cultural sites of Odisha. The challenge was maintaining cinematic visual fidelity inside an optimized, low-draw-call environment suitable for mobile VR headsets and web browser players alike.",
    features: [
      "Real-time dynamic light mapping & atmospheric fog cycles",
      "Interactive AI-grounded historical guides giving customized tours",
      "Adaptive LOD rendering algorithms ensuring constant 90fps on mobile HMDs",
      "Interactive cultural asset drawers featuring detailed historical inspectables"
    ],
    technologies: ["Unreal Engine", "Metaverse", "3D Modeling", "AI Tools"],
    playUrl: "https://www.artstation.com/artwork/rlXv4a",
    year: 2024,
    client: "World Odia Conference"
  },
  {
    id: "proj-2",
    title: "Lush Forest",
    description: "Advanced character modeling and texturing showcasing detailed facial features and realistic materials",
    category: "Environment",
    imageUrl: "projects/character-design.jpg",
    details: "In-depth organic visual design and complex realistic body and facial rendering tests incorporating layered PBR maps, fine-tuned materials, and optimized polygon counts for standard game character pipelines.",
    features: [
      "High-fidelity skin shader pipelines with sub-surface scattering (SSS)",
      "Realistic micro-detail hair modeling and grooming shaders",
      "Optimized topology layout for high-fidelity facial expression shapes",
      "Detail displacement map projection from high-poly sculpts"
    ],
    technologies: ["Maya", "ZBrush", "Substance Painter", "Photoshop"],
    playUrl: "https://www.artstation.com/artwork/AZa05q",
    year: 2024,
    client: "Personal Project"
  },
  {
    id: "proj-3",
    title: "Air Pods demo",
    description: "Stunning environment pieces demonstrating mastery of lighting, composition, and atmospheric effects",
    category: "Product Design",
    imageUrl: "projects/environment-portfolio.png",
    details: "A collection of high-fidelity scenes depicting lush wilderness and realistic lighting, focusing on procedural foliage distribution, atmospheric depth, and advanced material blending inside Unreal Engine.",
    features: [
      "Full lighting studies with real-time Lumen global illumination",
      "Procedural foliage distribution and terrain blend material shaders",
      "Advanced weather post-processing layer integration",
      "Modular assets kits constructed with standardized trim sheet sets"
    ],
    technologies: ["Unreal Engine", "Maya", "Substance Designer", "Lumen"],
    playUrl: "https://www.artstation.com/artwork/5WKvOO",
    year: 2024,
    client: "Portfolio Work"
  },
  {
    id: "proj-4",
    title: "Architectural Visualization",
    description: "Photorealistic architectural renders showcasing advanced lighting and material techniques",
    category: "Visualization",
    imageUrl: "projects/architectural-visualization.jpg",
    details: "Crafted photorealistic interior bakes showcasing premium architectural finishes and precise symmetric balance, designed specifically for high-end luxury portfolios.",
    features: [
      "High-fidelity interior raytraced shadows and soft studio light bakes",
      "Custom luxury leather, wood veneer, and marble procedural materials",
      "Symmetric layout composition optimized for portfolio showcase",
      "Color-corrected post-processing curves applied directly in frame buffers"
    ],
    technologies: ["3ds Max", "V-Ray", "Photoshop", "PBR Shading"],
    playUrl: "https://www.artstation.com/artwork/gRVagL",
    year: 2023,
    client: "Architectural Firm"
  },
  {
    id: "proj-5",
    title: "Game Asset Creation",
    description: "High-quality game assets optimized for real-time rendering with detailed texturing workflows",
    category: "Game Art",
    imageUrl: "projects/game-asset-creation.jpg",
    details: "High-precision poly-budget hard-surface asset modeling containing custom details with baked maps, realistic materials, and direct compatibility checks with active game engine project guidelines.",
    features: [
      "Realtime model poly-budget optimization under strict limits",
      "Multi-layered baking techniques utilizing customized cage offsets",
      "Handcrafted micro-abrasions, dust, and scratch layer styling",
      "Full compatibility checks across standard game rendering pipelines"
    ],
    technologies: ["Maya", "Substance Painter", "Unity", "PBR Texturing"],
    playUrl: "https://www.artstation.com/artwork/elOkD3",
    year: 2023,
    client: "Game Studio"
  },
  {
    id: "proj-6",
    title: "Product Visualization",
    description: "Commercial product renders with studio lighting and premium material presentation",
    category: "Product Design",
    imageUrl: "projects/product-visualization.jpg",
    details: "Sophisticated commercial product placement and rendering studies centering premium tech products with studio light arrays and accurate glass index refractions.",
    features: [
      "Studio lighting structures using three-point lighting principles",
      "Realistic glass and metallic dielectric material bakes",
      "Dynamic abstract product arrangement compositions",
      "Detailed presentation decks for advertising prints"
    ],
    technologies: ["Blender", "Cycles", "Photoshop", "Studio Lighting"],
    playUrl: "https://www.artstation.com/artwork/2By9Dx",
    year: 2023,
    client: "Product Company"
  },
  {
    id: "proj-7",
    title: "Concept Art & Design",
    description: "Creative concept art pieces demonstrating ideation and visual development skills",
    category: "Concept Art",
    imageUrl: "projects/concept-art-design.jpg",
    details: "Explorative world-building compositions featuring expressive brush strokes, environment depth layering, and perspective guide templates for subsequent production pipelines.",
    features: [
      "Expressive digital speed painting techniques and brush structures",
      "Advanced perspective line structures and depth overlays",
      "Immersive sci-fi and fantasy atmosphere thumbnailing",
      "Direct character-mood style sheet boards for lead artists"
    ],
    technologies: ["Photoshop", "Procreate", "3D Coat", "Digital Matte Painting"],
    playUrl: "https://www.artstation.com/artwork/981EYo",
    year: 2022,
    client: "Entertainment Studio"
  },
  {
    id: "proj-8",
    title: "Update Soon...!",
    description: "New exciting projects are in development. Stay tuned for amazing upcoming work showcasing the latest in AI-enhanced 3D artistry and innovative design solutions.",
    category: "Coming Soon",
    imageUrl: "projects/coming-soon.jpg",
    details: "Multiple research and development pieces exploring modern AI neural networks, ComfyUI stable diffusion custom LoRA models, dynamic game-engine pipelines, and next-generation real-time interactive tools.",
    features: [
      "Explorative study work integrating ComfyUI & custom trained LoRAs",
      "Realtime engine testing with newly released production builds",
      "Deep dive research into high-fidelity real-time simulation pipelines",
      "Collaborative design models for interactive client portals"
    ],
    technologies: ["AI Tools", "Next-Gen Pipeline", "Innovation"],
    year: 2025,
    client: "Upcoming Projects"
  }
];
