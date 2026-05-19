"use client";

import { useRef, useEffect } from "react";

interface Props {
  variant?:  "blue" | "green" | "purple" | "white";
  density?:  "light" | "medium" | "dense";
  speed?:    "slow" | "normal" | "fast";
  opacity?:  number;
  className?: string;
  fixed?:    boolean;
}

// ── Palette ───────────────────────────────────────────────────────────
const PALETTE = {
  blue:   ["#3b82f6", "#6366f1", "#8b5cf6", "#60a5fa", "#a5b4fc"],
  green:  ["#10b981", "#34d399", "#3b82f6", "#6ee7b7", "#a3e635"],
  purple: ["#8b5cf6", "#a78bfa", "#ec4899", "#6366f1", "#c084fc"],
  white:  ["#ffffff",  "#e0e7ff", "#bfdbfe", "#a5f3fc", "#fde68a"],
};

const COUNTS = { light: 45, medium: 75, dense: 110 };
const SPEEDS = { slow: 0.25, normal: 0.5, fast: 0.9 };

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  color: string;
  alpha: number;
  shape: "circle" | "square" | "triangle";
  rot: number; drot: number;
}

// ── Canvas particle-network layer ─────────────────────────────────────
function useParticleCanvas(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  palette: string[],
  count: number,
  speed: number,
  masterAlpha: number,
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let particles: Particle[] = [];
    const CONNECT = 140;

    const w = () => canvas.offsetWidth;
    const h = () => canvas.offsetHeight;

    const mkParticle = (): Particle => ({
      x: Math.random() * w(),
      y: Math.random() * h(),
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      r: Math.random() * 3 + 1,
      color: palette[Math.floor(Math.random() * palette.length)],
      alpha: Math.random() * 0.5 + 0.15,
      shape: (["circle", "circle", "circle", "square", "triangle"] as const)[
        Math.floor(Math.random() * 5)
      ],
      rot: Math.random() * Math.PI * 2,
      drot: (Math.random() - 0.5) * 0.02,
    });

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width  = canvas.offsetWidth  * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
      particles = Array.from({ length: count }, mkParticle);
    };

    const drawShape = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = p.alpha * masterAlpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();

      if (p.shape === "circle") {
        ctx.arc(0, 0, p.r, 0, Math.PI * 2);
      } else if (p.shape === "square") {
        const s = p.r * 1.6;
        ctx.rect(-s / 2, -s / 2, s, s);
      } else {
        // equilateral triangle
        const s = p.r * 2;
        ctx.moveTo(0, -s);
        ctx.lineTo(s * 0.866, s * 0.5);
        ctx.lineTo(-s * 0.866, s * 0.5);
        ctx.closePath();
      }
      ctx.fill();
      ctx.restore();
    };

    const frame = () => {
      const cw = w();
      const ch = h();
      ctx.clearRect(0, 0, cw, ch);

      // Update + draw each particle
      for (const p of particles) {
        p.x   += p.vx;
        p.y   += p.vy;
        p.rot += p.drot;
        if (p.x < -10 || p.x > cw + 10) p.vx *= -1;
        if (p.y < -10 || p.y > ch + 10) p.vy *= -1;
        drawShape(p);
      }

      // Draw connecting lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx   = particles[i].x - particles[j].x;
          const dy   = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT) {
            const lineAlpha = (1 - dist / CONNECT) * 0.18 * masterAlpha;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = particles[i].color;
            ctx.globalAlpha = lineAlpha;
            ctx.lineWidth   = 0.6;
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(frame);
    };

    resize();
    frame();

    const onResize = () => resize();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animId);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [palette, count, speed, masterAlpha]);
}

// ── SVG geometric overlay (large slow shapes + rings) ─────────────────
function GeoOverlay({ c, opacity }: { c: string[]; opacity: number }) {
  return (
    <>
      <style>{`
        @keyframes geoFloat  { 0%,100%{transform:translateY(0) rotate(0deg)}  50%{transform:translateY(-22px) rotate(12deg)} }
        @keyframes geoFloatB { 0%,100%{transform:translateY(0) rotate(0deg)}  50%{transform:translateY(-16px) rotate(-8deg)} }
        @keyframes geoSpin   { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes geoRing   { 0%,100%{opacity:0.07;transform:scale(1)}       50%{opacity:0.18;transform:scale(1.15)} }
        @keyframes geoDash   { from{stroke-dashoffset:500} to{stroke-dashoffset:0} }
      `}</style>
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1200 700"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        style={{ opacity }}
      >
        {/* ── pulsing rings ── */}
        {[
          { cx:1100, cy:80,  r:90,  color:c[0], delay:"0s",   dur:"5s"  },
          { cx:60,   cy:580, r:70,  color:c[1], delay:"1.5s", dur:"6s"  },
          { cx:600,  cy:680, r:110, color:c[2], delay:"0.8s", dur:"7s"  },
          { cx:200,  cy:100, r:55,  color:c[3], delay:"2s",   dur:"4.5s"},
          { cx:950,  cy:600, r:80,  color:c[0], delay:"1s",   dur:"5.5s"},
        ].map((ring, i) => (
          <circle key={i} cx={ring.cx} cy={ring.cy} r={ring.r}
            fill="none" stroke={ring.color} strokeWidth="1"
            style={{ animation: `geoRing ${ring.dur} ease-in-out ${ring.delay} infinite` }} />
        ))}

        {/* ── dashed orbiting ring ── */}
        <circle cx="600" cy="350" r="220" fill="none" stroke={c[1]}
          strokeWidth="0.8" strokeOpacity="0.12" strokeDasharray="12 8"
          style={{ animation: "geoSpin 40s linear infinite", transformOrigin: "600px 350px" }} />
        <circle cx="600" cy="350" r="320" fill="none" stroke={c[0]}
          strokeWidth="0.6" strokeOpacity="0.08" strokeDasharray="8 14"
          style={{ animation: "geoSpin 60s linear infinite reverse", transformOrigin: "600px 350px" }} />

        {/* ── vector lines (static connections between hub nodes) ── */}
        {[
          { x1:100,  y1:80,  x2:350, y2:200, color:c[0], dur:"4s",   del:"0s"   },
          { x1:850,  y1:60,  x2:1100,y2:180, color:c[1], dur:"5s",   del:"1s"   },
          { x1:350,  y1:200, x2:600, y2:160, color:c[2], dur:"3.5s", del:"0.5s" },
          { x1:600,  y1:160, x2:850, y2:60,  color:c[0], dur:"6s",   del:"2s"   },
          { x1:200,  y1:480, x2:450, y2:560, color:c[1], dur:"4.5s", del:"1.5s" },
          { x1:750,  y1:500, x2:1000,y2:580, color:c[3], dur:"5.5s", del:"0.8s" },
          { x1:100,  y1:80,  x2:200, y2:480, color:c[2], dur:"7s",   del:"0.3s" },
          { x1:1100, y1:180, x2:1000,y2:580, color:c[0], dur:"6s",   del:"2.5s" },
        ].map((ln, i) => (
          <line key={i} x1={ln.x1} y1={ln.y1} x2={ln.x2} y2={ln.y2}
            stroke={ln.color} strokeWidth="0.8" strokeOpacity="0.15"
            strokeDasharray="500"
            style={{ animation: `geoDash ${ln.dur} ease ${ln.del} infinite alternate` }} />
        ))}

        {/* ── hub nodes at line intersections ── */}
        {[
          { cx:100,  cy:80,  r:5,  color:c[0], anim:"geoFloat"  },
          { cx:350,  cy:200, r:7,  color:c[1], anim:"geoFloatB" },
          { cx:600,  cy:160, r:6,  color:c[2], anim:"geoFloat"  },
          { cx:850,  cy:60,  r:5,  color:c[3], anim:"geoFloatB" },
          { cx:1100, cy:180, r:8,  color:c[0], anim:"geoFloat"  },
          { cx:200,  cy:480, r:6,  color:c[1], anim:"geoFloatB" },
          { cx:450,  cy:560, r:4,  color:c[2], anim:"geoFloat"  },
          { cx:750,  cy:500, r:7,  color:c[3], anim:"geoFloatB" },
          { cx:1000, cy:580, r:5,  color:c[0], anim:"geoFloat"  },
        ].map((nd, i) => (
          <circle key={i} cx={nd.cx} cy={nd.cy} r={nd.r} fill={nd.color} fillOpacity="0.35"
            style={{ animation: `${nd.anim} ${4 + i * 0.7}s ease-in-out ${i * 0.4}s infinite` }} />
        ))}

        {/* ── floating geometric shapes ── */}
        {/* triangles */}
        <polygon points="180,300 200,330 160,330" fill={c[0]} fillOpacity="0.12"
          style={{ animation: "geoFloat 7s ease-in-out 0.5s infinite" }} />
        <polygon points="980,250 1005,285 955,285" fill={c[2]} fillOpacity="0.1"
          style={{ animation: "geoFloatB 8s ease-in-out 2s infinite" }} />
        <polygon points="540,600 560,630 520,630" fill={c[1]} fillOpacity="0.12"
          style={{ animation: "geoFloat 9s ease-in-out 1s infinite" }} />

        {/* squares */}
        <rect x="70" y="380" width="22" height="22" rx="4" fill={c[3]} fillOpacity="0.12"
          style={{ animation: "geoFloatB 6s ease-in-out 1.5s infinite" }} />
        <rect x="1090" y="420" width="18" height="18" rx="3" fill={c[1]} fillOpacity="0.1"
          style={{ animation: "geoFloat 7.5s ease-in-out 0.8s infinite" }} />
        <rect x="400" y="80" width="14" height="14" rx="2" fill={c[0]} fillOpacity="0.14"
          style={{ animation: "geoFloatB 5.5s ease-in-out 2.5s infinite" }} />

        {/* hexagon (approximated as polygon) */}
        <polygon
          points="820,400 840,388 860,400 860,424 840,436 820,424"
          fill="none" stroke={c[0]} strokeWidth="1.5" strokeOpacity="0.15"
          style={{ animation: "geoSpin 25s linear infinite", transformOrigin: "840px 412px" }} />
        <polygon
          points="310,550 332,538 354,550 354,574 332,586 310,574"
          fill="none" stroke={c[2]} strokeWidth="1.2" strokeOpacity="0.12"
          style={{ animation: "geoSpin 35s linear infinite reverse", transformOrigin: "332px 562px" }} />

        {/* diamond */}
        <polygon points="700,50 720,70 700,90 680,70" fill={c[1]} fillOpacity="0.12"
          style={{ animation: "geoFloat 8s ease-in-out 3s infinite" }} />
        <polygon points="120,230 138,248 120,266 102,248" fill={c[3]} fillOpacity="0.1"
          style={{ animation: "geoFloatB 10s ease-in-out 0.5s infinite" }} />

        {/* cross / plus shape */}
        <g style={{ animation: "geoSpin 20s linear infinite", transformOrigin: "1050px 320px" }}>
          <rect x="1044" y="312" width="12" height="16" rx="2" fill={c[0]} fillOpacity="0.12" />
          <rect x="1040" y="316" width="20" height="8" rx="2" fill={c[0]} fillOpacity="0.12" />
        </g>
      </svg>
    </>
  );
}

// ── Main export ───────────────────────────────────────────────────────
export default function AnimatedBackground({
  variant  = "blue",
  density  = "medium",
  speed    = "normal",
  opacity  = 1,
  className = "",
  fixed    = false,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const palette   = PALETTE[variant];

  useParticleCanvas(
    canvasRef as React.RefObject<HTMLCanvasElement | null>,
    palette,
    COUNTS[density],
    SPEEDS[speed],
    opacity,
  );

  const positionCls = fixed
    ? "fixed inset-0 w-screen h-screen"
    : "absolute inset-0 w-full h-full";

  return (
    <div
      className={`${positionCls} overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* Particle network */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Geometric shape overlay */}
      <GeoOverlay c={palette} opacity={opacity * 0.8} />
    </div>
  );
}
