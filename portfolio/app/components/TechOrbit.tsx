'use client';
import { useEffect, useRef, useState } from 'react';

const TECHS = [
  { label: 'React', color: '#61DAFB', icon: '⚛️' },
  { label: 'Node.js', color: '#68A063', icon: '🟢' },
  { label: 'MongoDB', color: '#4DB33D', icon: '🍃' },
  { label: 'TypeScript', color: '#3178C6', icon: '📘' },
  { label: 'Docker', color: '#2496ED', icon: '🐳' },
  { label: 'AWS', color: '#FF9900', icon: '☁️' },
  { label: 'Firebase', color: '#FFA000', icon: '🔥' },
  { label: 'Kotlin', color: '#7F52FF', icon: '🎯' },
  { label: 'Next.js', color: '#ffffff', icon: '▲' },
  { label: 'Express', color: '#8B5CF6', icon: '⚡' },
  { label: 'Tailwind', color: '#06B6D4', icon: '🌊' },
  { label: 'Git', color: '#F05032', icon: '🌿' },
];

export default function TechOrbit() {
  const [hovered, setHovered] = useState<number | null>(null);
  const frameRef = useRef(0);
  const animRef = useRef<number>(0);
  const [angles, setAngles] = useState(() => TECHS.map((_, i) => (i / TECHS.length) * Math.PI * 2));

  useEffect(() => {
    const animate = () => {
      frameRef.current++;
      setAngles(prev => prev.map((a, i) => a + (hovered === i ? 0 : 0.005)));
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [hovered]);

  const rings = [
    { techs: [0, 1, 2, 3], rx: 160, ry: 60, tilt: 20 },
    { techs: [4, 5, 6, 7], rx: 240, ry: 80, tilt: -15 },
    { techs: [8, 9, 10, 11], rx: 320, ry: 100, tilt: 35 },
  ];

  return (
    <div className="relative flex items-center justify-center" style={{ width: 700, height: 600, perspective: 900 }}>
      <div style={{ transformStyle: 'preserve-3d', position: 'relative', width: '100%', height: '100%' }}>
        {/* Central sphere */}
        <div className="absolute" style={{
          left: '50%', top: '50%',
          transform: 'translate(-50%,-50%)',
          width: 100, height: 100,
          borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 35%, #8B5CF6, #3b0764)',
          boxShadow: '0 0 40px rgba(139,92,246,0.8), 0 0 80px rgba(139,92,246,0.4), inset 0 0 30px rgba(16,240,176,0.2)',
          zIndex: 20,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span className="text-2xl font-black text-white" style={{ textShadow: '0 0 10px rgba(16,240,176,0.8)' }}>BS</span>
        </div>

        {/* Orbit rings */}
        {rings.map((ring, ri) => (
          <div key={ri} style={{
            position: 'absolute', left: '50%', top: '50%',
            width: ring.rx * 2, height: ring.ry * 2,
            transform: `translate(-50%,-50%) rotateX(${ring.tilt}deg)`,
            borderRadius: '50%',
            border: `1px solid rgba(139,92,246,${0.15 + ri * 0.05})`,
            transformStyle: 'preserve-3d',
          }}>
            {ring.techs.map((techIdx, j) => {
              const angle = angles[techIdx];
              const x = Math.cos(angle) * ring.rx;
              const y = Math.sin(angle) * ring.ry;
              const scale = 0.8 + 0.4 * (Math.sin(angle) * 0.5 + 0.5);
              const zIndex = Math.sin(angle) > 0 ? 30 : 5;
              const tech = TECHS[techIdx];

              return (
                <div
                  key={techIdx}
                  onMouseEnter={() => setHovered(techIdx)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    position: 'absolute',
                    left: '50%', top: '50%',
                    transform: `translate(-50%,-50%) translate(${x}px, ${y}px) scale(${scale})`,
                    zIndex,
                    cursor: 'pointer',
                    transition: 'transform 0.1s',
                  }}
                >
                  <div style={{
                    background: hovered === techIdx
                      ? `rgba(${parseInt(tech.color.slice(1,3),16)},${parseInt(tech.color.slice(3,5),16)},${parseInt(tech.color.slice(5,7),16)},0.3)`
                      : 'rgba(13,13,26,0.8)',
                    border: `1px solid ${tech.color}55`,
                    backdropFilter: 'blur(10px)',
                    borderRadius: 12,
                    padding: '6px 10px',
                    display: 'flex', alignItems: 'center', gap: 4,
                    boxShadow: hovered === techIdx ? `0 0 20px ${tech.color}88` : 'none',
                    transform: hovered === techIdx ? 'scale(1.3)' : 'scale(1)',
                    transition: 'all 0.3s ease',
                    whiteSpace: 'nowrap',
                    minWidth: 80,
                  }}>
                    <span style={{ fontSize: 14 }}>{tech.icon}</span>
                    <span style={{ fontSize: 11, color: tech.color, fontWeight: 600, letterSpacing: 0.5 }}>{tech.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
