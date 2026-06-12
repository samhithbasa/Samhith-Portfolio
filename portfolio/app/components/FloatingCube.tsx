'use client';
import { useEffect, useRef } from 'react';

export default function FloatingCube() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    let animId: number;
    const el = containerRef.current;
    if (!el) return;

    const animate = () => {
      frame++;
      const t = frame * 0.008;
      el.style.transform = `rotateX(${t * 30}deg) rotateY(${t * 45}deg) rotateZ(${t * 15}deg)`;
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, []);

  const faceStyle = (transform: string, bg: string) => ({
    position: 'absolute' as const,
    width: '100%',
    height: '100%',
    transform,
    background: bg,
    border: '1px solid rgba(139,92,246,0.5)',
    backdropFilter: 'blur(10px)',
  });

  return (
    <div className="relative flex items-center justify-center" style={{ width: 160, height: 160, perspective: 400 }}>
      <div ref={containerRef} style={{ width: '100%', height: '100%', transformStyle: 'preserve-3d', position: 'relative' }}>
        {/* Front */}
        <div style={faceStyle('translateZ(80px)', 'rgba(139,92,246,0.15)')} className="flex items-center justify-center">
          <span className="text-3xl">⚡</span>
        </div>
        {/* Back */}
        <div style={faceStyle('rotateY(180deg) translateZ(80px)', 'rgba(16,240,176,0.15)')} className="flex items-center justify-center">
          <span className="text-3xl">🚀</span>
        </div>
        {/* Left */}
        <div style={faceStyle('rotateY(-90deg) translateZ(80px)', 'rgba(255,45,120,0.12)')} className="flex items-center justify-center">
          <span className="text-3xl">💻</span>
        </div>
        {/* Right */}
        <div style={faceStyle('rotateY(90deg) translateZ(80px)', 'rgba(99,102,241,0.15)')} className="flex items-center justify-center">
          <span className="text-3xl">📱</span>
        </div>
        {/* Top */}
        <div style={faceStyle('rotateX(90deg) translateZ(80px)', 'rgba(139,92,246,0.1)')} className="flex items-center justify-center">
          <span className="text-3xl">☁️</span>
        </div>
        {/* Bottom */}
        <div style={faceStyle('rotateX(-90deg) translateZ(80px)', 'rgba(16,240,176,0.1)')} className="flex items-center justify-center">
          <span className="text-3xl">🔥</span>
        </div>
      </div>
    </div>
  );
}
