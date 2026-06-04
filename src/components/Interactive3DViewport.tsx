import React, { useEffect, useRef, useState } from "react";
import { Rotate3d, HelpCircle, RefreshCw, Cpu, Activity, Disc, Network } from "lucide-react";

interface Point3D {
  x: number;
  y: number;
  z: number;
  type?: string;
  id?: number;
}

interface Edge {
  u: number;
  v: number;
  color?: string;
  dashed?: boolean;
}

export default function Interactive3DViewport() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Style states: 
  // 0 -> Konark Chariot Sun Wheel
  // 1 -> Geodesic Sphere Core
  // 2 -> Torus Super-Helix Knot
  const [modelType, setModelType] = useState<number>(0);
  const [isRotating, setIsRotating] = useState<boolean>(true);

  // Mouse / Rotation references for direct thread access inside the frame loop
  const rotationRef = useRef<{ x: number; y: number; z: number }>({ x: 0.4, y: 0.6, z: 0 });
  const spinVelocityRef = useRef<{ x: number; y: number; z: number }>({ x: 0.005, y: 0.008, z: 0 });
  const mouseRef = useRef<{ x: number; y: number; isDown: boolean; startX: number; startY: number }>({
    x: 0,
    y: 0,
    isDown: false,
    startX: 0,
    startY: 0,
  });

  // Track hover coordinate text for real-time visual "3D workspace coordinate display" HUD effect
  const [hudCoords, setHudCoords] = useState<string>("X: 0.00 | Y: 0.00 | Z: 0.00");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 360;
    let height = 360;

    // Handle Resize dynamically via ResizeObserver
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width: entryWidth, height: entryHeight } = entry.contentRect;
        width = Math.max(entryWidth || 360, 280);
        height = Math.max(entryHeight || 360, 280);
        canvas.width = width * window.devicePixelRatio;
        canvas.height = height * window.devicePixelRatio;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Geometry Generation Generators
    const generateModel = (type: number): { points: Point3D[]; edges: Edge[]; faces?: number[][] } => {
      const pts: Point3D[] = [];
      const edgs: Edge[] = [];
      const faces: number[][] = [];

      if (type === 0) {
        // --- 1. KOARK SUN WHEEL --- (Art Lead Tribute)
        // Hub Outer & Inner circles
        const hubResolution = 16;
        for (let i = 0; i < hubResolution; i++) {
          const theta = (i / hubResolution) * Math.PI * 2;
          const cos = Math.cos(theta);
          const sin = Math.sin(theta);

          // Front hub ring
          pts.push({ x: cos * 14, y: sin * 14, z: -10, type: "hub" });
          // Rear hub ring
          pts.push({ x: cos * 14, y: sin * 14, z: 10, type: "hub" });
          // Axle hub core
          pts.push({ x: cos * 6, y: sin * 6, z: -16, type: "axle" });
          pts.push({ x: cos * 6, y: sin * 6, z: 16, type: "axle" });

          // Connect hub rings
          const idx = i * 4;
          edgs.push({ u: idx, v: idx + 1, color: "#e5c158" }); // Z connections
          edgs.push({ u: idx + 2, v: idx + 3, color: "#9e2a40" }); // Axle Z
          edgs.push({ u: idx, v: ((i + 1) % hubResolution) * 4, color: "#e5c158" }); // Ring connections
          edgs.push({ u: idx + 1, v: ((i + 1) % hubResolution) * 4 + 1, color: "#e5c158" });
        }

        const hubPtsCount = pts.length;

        // Middle circular rim
        const midRimResolution = 24;
        for (let i = 0; i < midRimResolution; i++) {
          const theta = (i / midRimResolution) * Math.PI * 2;
          const cos = Math.cos(theta);
          const sin = Math.sin(theta);
          pts.push({ x: cos * 64, y: sin * 64, z: -4, type: "rim-mid" });
          pts.push({ x: cos * 64, y: sin * 64, z: 4, type: "rim-mid" });

          const idx = hubPtsCount + i * 2;
          edgs.push({ u: idx, v: idx + 1, color: "#851c2e" });
          edgs.push({ u: idx, v: hubPtsCount + ((i + 1) % midRimResolution) * 2, color: "#9e2a40" });
          edgs.push({ u: idx + 1, v: hubPtsCount + ((i + 1) % midRimResolution) * 2 + 1, color: "#9e2a40" });
        }

        const midRimPtsCount = pts.length;

        // Outer rim
        const outerResolution = 32;
        for (let i = 0; i < outerResolution; i++) {
          const theta = (i / outerResolution) * Math.PI * 2;
          const cos = Math.cos(theta);
          const sin = Math.sin(theta);
          pts.push({ x: cos * 105, y: sin * 105, z: -6, type: "rim-outer" });
          pts.push({ x: cos * 105, y: sin * 105, z: 6, type: "rim-outer" });
          pts.push({ x: cos * 114, y: sin * 114, z: 0, type: "rim-outer-bevel" });

          const idx = midRimPtsCount + i * 3;
          edgs.push({ u: idx, v: idx + 1, color: "#e5c158" });
          edgs.push({ u: idx, v: idx + 2, color: "#e5c158", dashed: true });
          edgs.push({ u: idx + 1, v: idx + 2, color: "#e5c158", dashed: true });

          edgs.push({ u: idx, v: midRimPtsCount + ((i + 1) % outerResolution) * 3, color: "#e5c158" });
          edgs.push({ u: idx + 1, v: midRimPtsCount + ((i + 1) % outerResolution) * 3 + 1, color: "#e5c158" });
          edgs.push({ u: idx + 2, v: midRimPtsCount + ((i + 1) % outerResolution) * 3 + 2, color: "#ffd700" });
        }

        const outerRimPtsCount = pts.length;

        // 8 Spokes (Major) with carved circles
        const spokesCount = 8;
        for (let i = 0; i < spokesCount; i++) {
          const theta = (i / spokesCount) * Math.PI * 2;
          const cos = Math.cos(theta);
          const sin = Math.sin(theta);

          // Connect hub boundary to outer rim boundary
          pts.push({ x: cos * 14, y: sin * 14, z: 0, type: "spoke-start" });
          pts.push({ x: cos * 105, y: sin * 105, z: 0, type: "spoke-end" });

          const spokeIdx = outerRimPtsCount + i * 5;
          edgs.push({ u: spokeIdx, v: spokeIdx + 1, color: "#ffd700" });

          // Intricate decorative bead carvings along spokes
          pts.push({ x: cos * 36, y: sin * 36, z: 0, type: "spoke-bead" });
          pts.push({ x: cos * 52, y: sin * 52, z: 0, type: "spoke-bead-ring" });
          pts.push({ x: cos * 80, y: sin * 80, z: 0, type: "spoke-bead" });

          // Connected ring decorative lines around spokes
          edgs.push({ u: spokeIdx + 2, v: spokeIdx + 3, color: "#e5c158" });
          edgs.push({ u: spokeIdx + 3, v: spokeIdx + 4, color: "#e5c158" });
        }
      } 
      else if (type === 1) {
        // --- 2. FUTURISTIC GEODESIC SPHERE CORE ---
        // Gold icosahedron base geometry
        const phi = (1 + Math.sqrt(5)) / 2;
        const scale = 65;

        const vertices = [
          { x: -1, y: phi, z: 0 }, { x: 1, y: phi, z: 0 }, { x: -1, y: -phi, z: 0 }, { x: 1, y: -phi, z: 0 },
          { x: 0, y: -1, z: phi }, { x: 0, y: 1, z: phi }, { x: 0, y: -1, z: -phi }, { x: 0, y: 1, z: -phi },
          { x: phi, y: 0, z: -1 }, { x: phi, y: 0, z: 1 }, { x: -phi, y: 0, z: -1 }, { x: -phi, y: 0, z: 1 }
        ];

        vertices.forEach(v => {
          pts.push({ x: v.x * scale, y: v.y * scale, z: v.z * scale, type: "geo-vertex" });
        });

        // Add indices of connected vertices (Euler Edges)
        const polyEdges = [
          [0,1],[0,5],[0,7],[0,10],[0,11],[1,5],[1,7],[1,8],[1,9],[2,3],
          [2,4],[2,6],[2,10],[2,11],[3,4],[3,6],[3,8],[3,9],[4,5],[4,9],
          [4,11],[5,9],[5,11],[6,7],[6,8],[6,10],[7,8],[7,10],[8,9],[10,11]
        ];

        polyEdges.forEach(([u, v]) => {
          edgs.push({ u, v, color: "#e5c158" });
        });

        // Translucent faces for icosahedron core
        const icoFaces = [
          [0, 5, 11], [0, 11, 10], [0, 10, 7], [0, 7, 1], [0, 1, 5],
          [1, 7, 8], [1, 8, 9], [1, 9, 5], [5, 9, 4], [5, 4, 11],
          [11, 4, 2], [11, 2, 10], [10, 2, 6], [10, 6, 7], [7, 6, 8],
          [3, 4, 9], [3, 9, 8], [3, 8, 6], [3, 6, 2], [3, 2, 4]
        ];
        icoFaces.forEach(f => faces.push(f));

        // Add nested outer orbital rings
        const outerVOffset = pts.length;
        const ringRes = 32;
        for (let i = 0; i < ringRes; i++) {
          const t = (i / ringRes) * Math.PI * 2;
          // Orbit Ring 1 (XY plane)
          pts.push({ x: Math.cos(t) * 110, y: Math.sin(t) * 110, z: 0, type: "orbit-ring-1" });
          // Orbit Ring 2 (YZ plane)
          pts.push({ x: 0, y: Math.cos(t) * 110, z: Math.sin(t) * 110, type: "orbit-ring-2" });

          const idx1 = outerVOffset + i * 2;
          const idx2 = outerVOffset + i * 2 + 1;
          const nextIdx1 = outerVOffset + ((i + 1) % ringRes) * 2;
          const nextIdx2 = outerVOffset + ((i + 1) % ringRes) * 2 + 1;

          edgs.push({ u: idx1, v: nextIdx1, color: "#9e2a40", dashed: true });
          edgs.push({ u: idx2, v: nextIdx2, color: "#5a0e1b", dashed: true });
        }
      } 
      else if (type === 2) {
        // --- 3. TORUS SUPER-HELIX KNOT ---
        // Generates three interlacing spiral helix branches
        const helixResolution = 140;
        const R = 64; // Major radius
        const r = 24; // Minor radius

        for (let i = 0; i < helixResolution; i++) {
          const theta = (i / helixResolution) * Math.PI * 6; // Multiturns
          const phi = theta * 2.5;

          // Branch A
          const xA = (R + r * Math.cos(phi)) * Math.cos(theta);
          const yA = (R + r * Math.cos(phi)) * Math.sin(theta);
          const zA = r * Math.sin(phi);
          pts.push({ x: xA, y: yA, z: zA, type: "helix-a" });

          // Branch B (Offset phase rotation)
          const xB = (R + r * Math.cos(phi + Math.PI * 0.66)) * Math.cos(theta + Math.PI * 0.66);
          const yB = (R + r * Math.cos(phi + Math.PI * 0.66)) * Math.sin(theta + Math.PI * 0.66);
          const zB = r * Math.sin(phi + Math.PI * 0.66);
          pts.push({ x: xB, y: yB, z: zB, type: "helix-b" });

          // Branch C
          const xC = (R + r * Math.cos(phi + Math.PI * 1.33)) * Math.cos(theta + Math.PI * 1.33);
          const yC = (R + r * Math.cos(phi + Math.PI * 1.33)) * Math.sin(theta + Math.PI * 1.33);
          const zC = r * Math.sin(phi + Math.PI * 1.33);
          pts.push({ x: xC, y: yC, z: zC, type: "helix-c" });

          // Inner skeleton connections
          if (i > 0) {
            const prevA = (i - 1) * 3;
            const prevB = (i - 1) * 3 + 1;
            const prevC = (i - 1) * 3 + 2;
            const currA = i * 3;
            const currB = i * 3 + 1;
            const currC = i * 3 + 2;

            edgs.push({ u: prevA, v: currA, color: "#e5c158" });
            edgs.push({ u: prevB, v: currB, color: "#9e2a40" });
            edgs.push({ u: prevC, v: currC, color: "#475569", dashed: true });

            // Lattice bridges across branches for digital cage effect
            if (i % 6 === 0) {
              edgs.push({ u: currA, v: currB, color: "rgba(229, 193, 88, 0.3)" });
              edgs.push({ u: currB, v: currC, color: "rgba(158, 42, 64, 0.3)" });
              edgs.push({ u: currC, v: currA, color: "rgba(229, 193, 88, 0.2)" });
            }
          }
        }
      }
      else {
        // --- 4. LIGHTWEIGHT POLY MESH --- (Wavy Low-Poly Landscape Grid)
        const cols = 5;
        const rows = 5;
        const spacing = 42;

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            // Centered around coordinate system origin
            const x = (c - (cols - 1) / 2) * spacing;
            const y = (r - (rows - 1) / 2) * spacing;

            // Build a responsive dome height profile
            const distFromCenter = Math.sqrt(x * x + y * y);
            const z = -Math.cos(distFromCenter / 70) * 30 + (Math.sin(r) * 5);

            pts.push({ x, y, z, type: "lowpoly" });
          }
        }

        // Triangulate grid vertices into polygons
        for (let r = 0; r < rows - 1; r++) {
          for (let c = 0; c < cols - 1; c++) {
            const i0 = r * cols + c;
            const i1 = r * cols + (c + 1);
            const i2 = (r + 1) * cols + c;
            const i3 = (r + 1) * cols + (c + 1);

            if ((r + c) % 2 === 0) {
              faces.push([i0, i1, i2]);
              faces.push([i1, i3, i2]);

              edgs.push({ u: i0, v: i1, color: "#e5c158" });
              edgs.push({ u: i1, v: i3, color: "#e5c158" });
              edgs.push({ u: i3, v: i2, color: "#e5c158" });
              edgs.push({ u: i2, v: i0, color: "#e5c158" });
              edgs.push({ u: i1, v: i2, color: "#9e2a40", dashed: true });
            } else {
              faces.push([i0, i1, i3]);
              faces.push([i0, i3, i2]);

              edgs.push({ u: i0, v: i1, color: "#e5c158" });
              edgs.push({ u: i1, v: i3, color: "#e5c158" });
              edgs.push({ u: i3, v: i2, color: "#e5c158" });
              edgs.push({ u: i2, v: i0, color: "#e5c158" });
              edgs.push({ u: i0, v: i3, color: "#9e2a40", dashed: true });
            }
          }
        }
      }

      return { points: pts, edges: edgs, faces };
    };

    // Keep active geometry generated object
    let currentModel = generateModel(modelType);

    // Frame Core Loop
    const render = () => {
      // Re-generate model if type state changed during render block
      if (currentModel.points.length === 0 || lastTypeRef.current !== modelType) {
        currentModel = generateModel(modelType);
        lastTypeRef.current = modelType;
      }

      ctx.clearRect(0, 0, width, height);

      const center = { x: width / 2, y: height / 2 };
      const scale = 1.3; // Scaling adaptation

      // Keep track of frame-based organic movement
      const timeMs = Date.now() * 0.0015;

      // Apply inertial physics rotation
      if (isRotating && !mouseRef.current.isDown) {
        rotationRef.current.x += spinVelocityRef.current.x;
        rotationRef.current.y += spinVelocityRef.current.y;
        rotationRef.current.z += spinVelocityRef.current.z;

        // Apply friction decay to spin
        spinVelocityRef.current.x *= 0.985;
        spinVelocityRef.current.y *= 0.985;

        // Return to lazy default slow orbit if spin is dead
        const velocityThreshold = 0.001;
        if (
          Math.abs(spinVelocityRef.current.x) < velocityThreshold &&
          Math.abs(spinVelocityRef.current.y) < velocityThreshold
        ) {
          spinVelocityRef.current.x = 0.001;
          spinVelocityRef.current.y = 0.002;
        }
      }

      const rx = rotationRef.current.x;
      const ry = rotationRef.current.y;
      const rz = rotationRef.current.z;

      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);
      const cosZ = Math.cos(rz);
      const sinZ = Math.sin(rz);

      // Mouse coordinate attraction effect calculations
      const cx = mouseRef.current.x;
      const cy = mouseRef.current.y;
      const attractionForceFactor = 0.04;

      // Project all 3D vertices to depth buffered 2D coordinate space
      const projected = currentModel.points.map((p, index) => {
        let px = p.x;
        let py = p.y;
        let pz = p.z;

        // Apply organic wave undulating motion for low-poly mesh model
        if (modelType === 3) {
          const waveSpeed = timeMs * 1.5;
          const waveFreq = 0.04;
          pz += Math.sin(px * waveFreq + waveSpeed) * 12 + Math.cos(py * waveFreq + waveSpeed) * 12;

          // Light-weight polygons mouse hover elevation/ripple interaction
          if (cx > 0 && cx < width && cy > 0 && cy < height) {
            // Map mouse coordinate from screen space to physical original grid plane
            const mx = (cx - center.x) * 0.70;
            const my = (cy - center.y) * 0.70;
            const distToMouse = Math.sqrt((px - mx) * (px - mx) + (py - my) * (py - my));
            if (distToMouse < 90) {
              const hoverInfluence = (1 - distToMouse / 90);
              // Gently distort vertices with a premium elastic micro-tension curve
              pz += hoverInfluence * hoverInfluence * 30;
            }
          }
        }

        // Rotate points symmetrically
        // 1. Roll (Around Z axis)
        let x1 = px * cosZ - py * sinZ;
        let y1 = px * sinZ + py * cosZ;
        let z1 = pz;

        // 2. Pitch (Around X axis)
        let y2 = y1 * cosX - z1 * sinX;
        let z2 = y1 * sinX + z1 * cosX;

        // 3. Yaw (Around Y axis)
        let x3 = x1 * cosY + z2 * sinY;
        let z3 = -x1 * sinY + z2 * cosY;

        // Apply magnetic focus pull from active mouse positioning
        const dx = x3 - (cx - center.x);
        const dy = y2 - (cy - center.y);
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120 && dist > 0) {
          const factor = (1 - dist / 120) * attractionForceFactor;
          x3 -= dx * factor;
          y2 -= dy * factor;
        }

        // Perspective mapping math
        const focalLength = 320;
        const cameraDistance = 240; // Virtual depth projection
        const depth = cameraDistance + z3;
        
        let screenX = center.x + (x3 * focalLength) / depth * scale;
        let screenY = center.y + (y2 * focalLength) / depth * scale;

        return {
          screenX,
          screenY,
          depth,
          rawZ: pz,
          rotatedZ: z3,
          type: p.type,
          index
        };
      });

      // Update interactive coordinate text HUD
      if (Math.random() < 0.1) {
        const activeHoveringPt = projected.find(p => Math.abs(p.screenX - cx) < 30 && Math.abs(p.screenY - cy) < 30);
        if (activeHoveringPt) {
          const rootPt = currentModel.points[activeHoveringPt.index];
          setHudCoords(
            `X: ${rootPt.x.toFixed(1)} | Y: ${rootPt.y.toFixed(1)} | Z: ${activeHoveringPt.rotatedZ.toFixed(1)} [LOCK]`
          );
        } else {
          setHudCoords(
            `Pitch: ${rx.toFixed(2)}r | Yaw: ${ry.toFixed(2)}r | Drag Active: ${
              mouseRef.current.isDown ? "TRUE" : "FALSE"
            }`
          );
        }
      }

      // Draw Grid Matrix floor in perspective background
      ctx.strokeStyle = "rgba(Gray, 0.05)";
      ctx.lineWidth = 0.5;
      const gridSize = 12;
      const gridSpan = 80;
      for (let i = -gridSize; i <= gridSize; i += 2) {
        // Align background grid line coordinates
        const lineOffset = i * (gridSpan / gridSize);
        const p1 = { x: -lineOffset, y: 110, z: -gridSpan };
        const p2 = { x: -lineOffset, y: 110, z: gridSpan };

        // Quick rotate X math
        let y_r1 = p1.y * cosX - p1.z * sinX;
        let z_r1 = p1.y * sinX + p1.z * cosX;
        let x_r1 = p1.x * cosY + z_r1 * sinY;
        let d_r1 = 240 + (-p1.x * sinY + z_r1 * cosY);

        let y_r2 = p2.y * cosX - p2.z * sinX;
        let z_r2 = p2.y * sinX + p2.z * cosX;
        let x_r2 = p2.x * cosY + z_r2 * sinY;
        let d_r2 = 240 + (-p2.x * sinY + z_r2 * cosY);

        if (d_r1 > 20 && d_r2 > 20) {
          const sx1 = center.x + (x_r1 * 320) / d_r1;
          const sy1 = center.y + (y_r1 * 320) / d_r1;
          const sx2 = center.x + (x_r2 * 320) / d_r2;
          const sy2 = center.y + (y_r2 * 320) / d_r2;

          ctx.beginPath();
          ctx.moveTo(sx1, sy1);
          ctx.lineTo(sx2, sy2);
          ctx.strokeStyle = `rgba(158, 42, 64, ${Math.max(0.01, 0.08 - d_r1 / 4000)})`;
          ctx.stroke();
        }
      }

      // Render Translucent Polygons (Faces) sorted by average depth (Painter's Algorithm)
      if (currentModel.faces && currentModel.faces.length > 0) {
        const sortedFaces = currentModel.faces
          .map((face) => {
            const u = projected[face[0]];
            const v = projected[face[1]];
            const w = projected[face[2]];
            const avgDepth = u && v && w ? (u.depth + v.depth + w.depth) / 3 : 999;
            return { face, avgDepth };
          })
          .sort((a, b) => b.avgDepth - a.avgDepth);

        sortedFaces.forEach(({ face, avgDepth }) => {
          const u = projected[face[0]];
          const v = projected[face[1]];
          const w = projected[face[2]];

          if (!u || !v || !w) return;
          if (u.depth < 10 || v.depth < 10 || w.depth < 10) return;

          // Backface culling: determine facing direction to avoid inside-out overlap
          const val = (v.screenX - u.screenX) * (w.screenY - u.screenY) - (v.screenY - u.screenY) * (w.screenX - u.screenX);
          if (val > 0) return;

          ctx.beginPath();
          ctx.moveTo(u.screenX, u.screenY);
          ctx.lineTo(v.screenX, v.screenY);
          ctx.lineTo(w.screenX, w.screenY);
          ctx.closePath();

          // Calculate face opacity based on depth
          const alpha = Math.max(0.04, 0.18 - (avgDepth - 120) / 450);

          if (modelType === 1) {
            // Geodesic Core: Crimson translucent panels
            ctx.fillStyle = `rgba(158, 42, 64, ${alpha * 0.4})`;
          } else {
            // Low-Poly Grid Mesh: Golden glowing facets
            ctx.fillStyle = `rgba(229, 193, 88, ${alpha * 0.28})`;
          }
          ctx.fill();
        });
      }

      // Render Edges with depth-buffered visibility levels
      currentModel.edges.forEach((edge) => {
        const u = projected[edge.u];
        const v = projected[edge.v];

        if (!u || !v) return;

        // Clip vertices if behind projection plane
        if (u.depth < 10 || v.depth < 10) return;

        // Calculate line transparency based on average depth (farther is dimmer)
        const avgDepth = (u.depth + v.depth) / 2;
        const alpha = Math.max(0.05, 1 - (avgDepth - 120) / 360);

        ctx.beginPath();
        ctx.moveTo(u.screenX, u.screenY);
        ctx.lineTo(v.screenX, v.screenY);

        if (edge.dashed) {
          ctx.setLineDash([3, 5]);
        } else {
          ctx.setLineDash([]);
        }

        ctx.strokeStyle = edge.color
          ? `${edge.color}${Math.floor(alpha * 255).toString(16).padStart(2, "0")}`
          : `rgba(255, 255, 255, ${alpha * 0.45})`;

        ctx.lineWidth = edge.dashed ? 0.8 : 1.2;
        ctx.stroke();
      });

      ctx.setLineDash([]); // Reset line dashes

      // Draw projected nodes with shining gradients
      projected.forEach((node) => {
        if (node.depth < 10) return;

        const sizeAlpha = Math.max(0.1, 1 - (node.depth - 120) / 300);
        let nodeRadius = 2.5;
        let colorGrad = "#e5c158";

        // Style sizing base on coordinate types
        if (node.type === "hub" || node.type === "spoke-bead-ring") {
          nodeRadius = 4;
          colorGrad = "#ffd700";
        } else if (node.type === "axle") {
          nodeRadius = 5;
          colorGrad = "#9e2a40";
        } else if (node.type === "spoke-bead") {
          nodeRadius = 3;
          colorGrad = "#fff";
        } else if (node.type?.startsWith("rim-outer")) {
          nodeRadius = 2.5;
          colorGrad = "#e5c158";
        } else if (node.type === "geo-vertex") {
          nodeRadius = 5;
          colorGrad = "#ffd700";
        }

        // Draw node points
        ctx.beginPath();
        ctx.arc(node.screenX, node.screenY, nodeRadius * sizeAlpha, 0, Math.PI * 2);
        ctx.fillStyle = colorGrad;
        ctx.shadowBlur = 10 * sizeAlpha;
        ctx.shadowColor = colorGrad;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow for lines speed
      });

      // Render Interactive HUD lines and technical markers
      ctx.font = "9px Courier New, monospace";
      ctx.fillStyle = "rgba(229, 193, 88, 0.4)";
      ctx.fillText(`3D CORE V-ENGINE CORE: BUILD_9297`, 12, 22);
      ctx.fillText(`ROT_X: ${rx.toFixed(2)} | ROT_Y: ${ry.toFixed(2)}`, 12, 34);

      // Interactive mouse feedback cursor locator ring
      if (cx > 0 && cx < width && cy > 0 && cy < height) {
        ctx.beginPath();
        ctx.arc(cx, cy, 14, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(229, 193, 88, 0.35)";
        ctx.lineWidth = 0.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(cx - 3, cy);
        ctx.lineTo(cx + 3, cy);
        ctx.moveTo(cx, cy - 3);
        ctx.lineTo(cx, cy + 3);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // Tracking references used for state cycle trigger updates
    const lastTypeRef = { current: modelType };

    // Engage Render loop
    render();

    // Cleanup tasks
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [modelType, isRotating]);

  // Pointer event trackers for real time mouse navigation dragging
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseRef.current = {
      x,
      y,
      isDown: true,
      startX: x,
      startY: y,
    };
    
    // Stop slow rotation velocity on initial click grabs
    spinVelocityRef.current = { x: 0, y: 0, z: 0 };
    canvas.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (mouseRef.current.isDown) {
      // Rotate coordinates relative to mouse distance delta moved
      const dx = x - mouseRef.current.startX;
      const dy = y - mouseRef.current.startY;

      rotationRef.current.y += dx * 0.007; // Yaw delta speed
      rotationRef.current.x += dy * 0.007; // Pitch delta speed

      // Store continuous instantaneous velocity for release momentum inertia spin
      spinVelocityRef.current.x = dy * 0.0012;
      spinVelocityRef.current.y = dx * 0.0012;

      mouseRef.current.startX = x;
      mouseRef.current.startY = y;
    }

    mouseRef.current.x = x;
    mouseRef.current.y = y;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    mouseRef.current.isDown = false;
    canvasRef.current?.releasePointerCapture(e.pointerId);
  };

  const handlePointerLeave = () => {
    mouseRef.current.isDown = false;
    mouseRef.current.x = -1000; // Place outside viewport boundary
    mouseRef.current.y = -1000;
  };

  // Double-click canvas style cyclist shortcut
  const handleDoubleClick = () => {
    setModelType((prev) => (prev + 1) % 4);
  };

  return (
    <div ref={containerRef} className="w-full h-full min-h-[290px] flex flex-col justify-between items-center relative select-none">
      
      {/* 3D Wireframe Canvas Render Stage Area */}
      <div className="relative w-full flex-grow flex items-center justify-center">
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerLeave}
          onDoubleClick={handleDoubleClick}
          className="cursor-grab active:cursor-grabbing max-w-full rounded-2xl relative z-10 hover:shadow-[0_0_20px_rgba(229,193,88,0.06)] transition-shadow"
          id="hero-3d-canvas"
        />

        {/* Orbit indicator text prompt overlay positioned at the absolute bottom margin edge */}
        <div className="absolute bottom-16 left-4 right-4 z-20 pointer-events-none text-center bg-black/45 border border-gray-900/50 rounded-xl px-2 py-1.5 backdrop-blur-[3px] flex items-center justify-center gap-1.5">
          <Rotate3d size={11} className="text-[#e5c158] animate-pulse" />
          <span className="text-[10px] font-mono tracking-widest text-[#e5c158] uppercase">
            Double Click Canvas to switch models
          </span>
        </div>
      </div>

      {/* Floating Interactive Model Control Deck Overlay */}
      <div className="w-full flex flex-col gap-2.1 z-20 shrink-0 select-none pb-2" id="canvas-control-deck">
        
        {/* Active Coordinate status tracker output lines */}
        <div className="flex items-center justify-between text-[10px] font-mono text-gray-400 border-t border-gray-900/60 pt-3 px-1 select-all">
          <span className="flex items-center gap-1">
            <Cpu size={10} className="text-[#ffd700]" />
            GRID_COORD:
          </span>
          <span className="text-gray-300 font-semibold">{hudCoords}</span>
        </div>

        {/* Dynamic click style select options row */}
        <div className="grid grid-cols-2 sm:flex sm:items-center sm:justify-between gap-1 mt-1 border-t border-gray-900/40 pt-2 select-none">
          <button
            onClick={() => setModelType(0)}
            className={`py-1.5 px-1 rounded-lg border text-[10px] font-bold tracking-wider font-mono uppercase transition flex items-center justify-center gap-1 sm:flex-1 ${
              modelType === 0
                ? "bg-[#e5c158]/15 border-[#e5c158]/55 text-[#e5c158] font-bold"
                : "bg-black/45 border-gray-850 hover:border-gray-800 text-gray-500 hover:text-gray-300"
            }`}
          >
            <Disc size={9} />
            Sun Wheel
          </button>
          <button
            onClick={() => setModelType(1)}
            className={`py-1.5 px-1 rounded-lg border text-[10px] font-bold tracking-wider font-mono uppercase transition flex items-center justify-center gap-1 sm:flex-1 ${
              modelType === 1
                ? "bg-[#e5c158]/15 border-[#e5c158]/55 text-[#e5c158] font-bold"
                : "bg-black/45 border-gray-850 hover:border-gray-800 text-gray-500 hover:text-gray-300"
            }`}
          >
            <RefreshCw size={9} />
            Sphere Core
          </button>
          <button
            onClick={() => setModelType(2)}
            className={`py-1.5 px-1 rounded-lg border text-[10px] font-bold tracking-wider font-mono uppercase transition flex items-center justify-center gap-1 sm:flex-1 ${
              modelType === 2
                ? "bg-[#e5c158]/15 border-[#e5c158]/55 text-[#e5c158] font-bold"
                : "bg-black/45 border-gray-850 hover:border-gray-800 text-gray-500 hover:text-gray-300"
            }`}
          >
            <Activity size={9} />
            Helix Knot
          </button>
          <button
            onClick={() => setModelType(3)}
            className={`py-1.5 px-1 rounded-lg border text-[10px] font-bold tracking-wider font-mono uppercase transition flex items-center justify-center gap-1 sm:flex-1 ${
              modelType === 3
                ? "bg-[#e5c158]/15 border-[#e5c158]/55 text-[#e5c158] font-bold"
                : "bg-black/45 border-gray-850 hover:border-gray-800 text-gray-500 hover:text-gray-300"
            }`}
          >
            <Network size={9} />
            Poly Mesh
          </button>
        </div>

      </div>
    </div>
  );
}
