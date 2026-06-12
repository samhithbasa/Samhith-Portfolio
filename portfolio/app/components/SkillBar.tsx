'use client';
import { useEffect, useRef, useState } from 'react';

interface Skill {
  name: string;
  level: number;
  color: string;
  icon: string;
}

export default function SkillBar({ skill, delay = 0 }: { skill: Skill; delay?: number }) {
  const [filled, setFilled] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => setFilled(true), delay);
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className="group">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <span className="text-sm">{skill.icon}</span>
          <span className="text-sm font-medium text-white/80">{skill.name}</span>
        </div>
        <span className="text-xs font-bold" style={{ color: skill.color }}>{skill.level}%</span>
      </div>
      <div className="relative h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
        {/* 3D depth shadow */}
        <div className="absolute inset-0 rounded-full" style={{ background: 'rgba(0,0,0,0.3)', top: 1 }} />
        <div
          className="h-full rounded-full relative"
          style={{
            width: filled ? `${skill.level}%` : '0%',
            background: `linear-gradient(90deg, ${skill.color}aa, ${skill.color})`,
            transition: `width 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)`,
            boxShadow: `0 0 10px ${skill.color}66, 0 0 20px ${skill.color}33`,
          }}
        >
          {/* Shine effect */}
          <div className="absolute inset-0 rounded-full"
            style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 60%)' }}
          />
        </div>
      </div>
    </div>
  );
}
