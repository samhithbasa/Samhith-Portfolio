'use client';
import { useRef, MouseEvent } from 'react';

interface Project {
  title: string;
  subtitle: string;
  desc: string;
  tags: string[];
  emoji: string;
  color: string;
  accent: string;
  link?: string;
  github?: string;
  status?: 'live' | 'wip' | 'github';
}

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -12;
    const rotY = ((x - cx) / cx) * 12;

    card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
    glow.style.left = `${x}px`;
    glow.style.top = `${y}px`;
    glow.style.opacity = '1';
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (card) card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
    if (glow) glow.style.opacity = '0';
  };

  const delays = ['0ms', '100ms', '200ms'];

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative glass-card rounded-2xl overflow-hidden cursor-pointer group"
      style={{
        transition: 'transform 0.1s ease',
        transformStyle: 'preserve-3d',
        animationDelay: delays[index % 3],
        minHeight: 340,
      }}
    >
      {/* Glow follower */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute"
        style={{
          width: 200,
          height: 200,
          background: `radial-gradient(circle, ${project.color}33 0%, transparent 70%)`,
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          opacity: 0,
          transition: 'opacity 0.3s ease',
          zIndex: 0,
        }}
      />

      {/* Top gradient bar */}
      <div
        className="h-1 w-full"
        style={{ background: `linear-gradient(90deg, ${project.color}, ${project.accent})` }}
      />

      <div className="p-8" style={{ position: 'relative', zIndex: 1 }}>

        {/* Header row: emoji + status badge + action buttons */}
        <div className="flex items-start justify-between mb-4">

          {/* Emoji */}
          <div
            className="text-5xl"
            style={{ filter: `drop-shadow(0 0 10px ${project.color})` }}
          >
            {project.emoji}
          </div>

          {/* Right: status badge + buttons stacked */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>

            {/* Status badge */}
            {project.status === 'wip' && (
              <span style={{
                fontSize: 10,
                padding: '3px 10px',
                borderRadius: 20,
                background: 'rgba(255,45,120,0.12)',
                border: '1px solid rgba(255,45,120,0.35)',
                color: '#FF2D78',
                letterSpacing: '0.05em',
                fontWeight: 600,
              }}>
                🔧 In Development
              </span>
            )}
            {project.status === 'live' && (
              <span style={{
                fontSize: 10,
                padding: '3px 10px',
                borderRadius: 20,
                background: 'rgba(16,240,176,0.10)',
                border: '1px solid rgba(16,240,176,0.30)',
                color: '#10F0B0',
                letterSpacing: '0.05em',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 5,
              }}>
                <span style={{
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  background: '#10F0B0',
                  display: 'inline-block',
                }} />
                Live
              </span>
            )}
            {project.status === 'github' && (
              <span style={{
                fontSize: 10,
                padding: '3px 10px',
                borderRadius: 20,
                background: 'rgba(99,102,241,0.12)',
                border: '1px solid rgba(99,102,241,0.35)',
                color: '#a78bfa',
                letterSpacing: '0.05em',
                fontWeight: 600,
              }}>
                🐙 Open Source
              </span>
            )}

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-3 py-1 rounded-full border transition-all hover:scale-105"
                  style={{
                    borderColor: `${project.color}66`,
                    color: project.color,
                    background: `${project.color}0D`,
                    textDecoration: 'none',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                  onClick={e => e.stopPropagation()}
                >
                  GitHub ↗
                </a>
              )}
              {project.status === 'github' && project.github && (
                <a
                  href={'https://raw.githubusercontent.com/samhithbasa/Hospital-App/main/releases/HospitalApp.apk'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-3 py-1 rounded-full transition-all hover:scale-105"
                  style={{
                    color: '#fff',
                    textDecoration: 'none',
                    fontWeight: 600,
                    background: `linear-gradient(135deg, ${project.color}, ${project.accent})`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                  onClick={e => e.stopPropagation()}
                >
                  ⬇ APK
                </a>
              )}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-3 py-1 rounded-full transition-all hover:scale-105"
                  style={{
                    color: '#fff',
                    textDecoration: 'none',
                    fontWeight: 600,
                    background: `linear-gradient(135deg, ${project.color}, ${project.accent})`,
                  }}
                  onClick={e => e.stopPropagation()}
                >
                  Live ↗
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Subtitle pill */}
        <div className="mb-2">
          <span style={{
            fontSize: 10,
            padding: '3px 10px',
            borderRadius: 20,
            border: `1px solid ${project.color}33`,
            color: project.accent,
            letterSpacing: '0.04em',
            opacity: 0.85,
          }}>
            {project.subtitle}
          </span>
        </div>

        <h3 className="text-2xl font-bold mb-4" style={{ color: project.color }}>
          {project.title}
        </h3>

        <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.85 }}>
          {project.desc}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map(tag => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded-md"
              style={{
                background: 'rgba(139,92,246,0.15)',
                color: 'rgba(255,255,255,0.6)',
                border: '1px solid rgba(139,92,246,0.2)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* 3D depth layer */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${project.color}08, transparent, ${project.accent}08)`,
        }}
      />
    </div>
  );
}