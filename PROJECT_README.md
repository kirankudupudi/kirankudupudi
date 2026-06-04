# Stark-Themed Portfolio Application

A bespoke, immersive, and highly responsive web portfolio engineered specifically for **Kiran Kudupudi**, CEO & Art Lead.

This application is built with a bold, minimal, and premium aesthetic, utilizing a custom "Iron Man / Stark Industries" dark theme designed to put visual artistry and asset presentations at the center of the user experience.

---

## 🎨 Design Philosophy & Theme

- **Stark Core Theme**: Formed on a pure deep oceanic dark canvas (`#050a0f`) with vibrant crimson highlights (`#e11d48`) and glowing arc cyan details (`#00f0ff`).
- **Typography Pairings**: Blends the technical readability of **Inter** for descriptions and body UI with the structural displays of **Space Grotesk** to offer striking modern headers.
- **Architectural Honesty**: Zero bloated visual indicators or terminal simulators. The focus is purely on high-fidelity visual assets, 3D modeling pipelines, and game development achievements wrapped in subtle frost glass panels.
- **Micro-interactions**: Powered by clean, responsive scroll-spy animations, interactive key strength slider mechanisms, and a dynamic filtered project showcase grid featuring detailed work summaries and modal peeks.

---

## 🚀 Key Features

1. **Interactive Navigation**: Seamless sticky top navbar featuring auto-updating intersection observers (scroll-spy highlights) and native smooth deceleration window scrolling.
2. **Dynamic Project Grid**: High-fidelity cards grouping ArtStation integrations, 3D assets, VR reconstructions, and visualization renders with on-the-fly category filtering.
3. **Interactive Project Peek (Modal)**: Custom overlays revealing extensive summaries, involved pipeline technologies, feature highlight checkboxes, and deep links to project posts.
4. **Interactive Skill Milestones**: Slidable highlight cards displaying professional focus areas (visual innovation, technical leadership, next-gen pipelines) complete with interactive deck controls.

---

## 🛠️ Technology Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vite.dev/) (fast, performant, next-gen client-only bundles).
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (fluid layout utilities, grid controls, and modern theme variable tokens).
- **Animations**: [Motion](https://motion.dev/) (hardware-accelerated page transitions, hover states, filter layouts, and state drawer expansions).
- **Icons**: [Lucide React](https://lucide.dev/) (standardized visual iconography).

---

## 📁 Repository Structure

```text
├── index.html            # Main site entry point and SEO head declarations
├── metadata.json         # Platform configuration
├── package.json          # Dependency configurations
├── vite.config.ts        # Vite build configurations
├── src/
│   ├── App.tsx           # Global routing, layout wrapper, and scroll-spy triggers
│   ├── data.ts           # Unified data file storing milestones, skills, and projects
│   ├── index.css         # Tailwind directives, custom webfonts, and scroll styles
│   ├── main.tsx          # React application root render bootstrap
│   ├── types.ts          # Custom static TS interface definitions
│   └── components/
│       ├── About.tsx     # Biography block, journey milestones, and focus cards
│       ├── Contact.tsx   # Detailed links, form capture, phone and location cards
│       ├── Experience.tsx# Professional work history timeline
│       ├── Home.tsx      # Splendid hero banner, numeric stats, and orbital indicators
│       ├── Navbar.tsx    # Responsive sticky top mobile-drawer scroll-spy navbar
│       ├── Projects.tsx  # Filterable grid cards and modal detail inspection overlays
│       └── Skills.tsx    # Technical skillset category boxes & progress meters
```

---

## ⚙️ Development & Build Guide

### Prerequisites
Make sure you have Node.js (version 18 or above) installed on your system.

### Running the Application in Development Mode
To start the local developer server, run:
```bash
npm install
npm run dev
```

### Building for Production
To compile and generate an optimized static production distribution folder (`dist/`), run:
```bash
npm run build
```

### Static Validation (Linting)
To check types and prevent syntax flaws, run the static compiler analyzer:
```bash
npm run lint
```
