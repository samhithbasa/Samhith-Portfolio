'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import SkillBar from './components/SkillBar';
import ProjectCard from './components/ProjectCard';

const ParticleField = dynamic(() => import('./components/ParticleField'), { ssr: false });
const FloatingCube = dynamic(() => import('./components/FloatingCube'), { ssr: false });
const TechOrbit = dynamic(() => import('./components/TechOrbit'), { ssr: false });

const ROLES = ['Full-Stack Developer', 'Android Developer', 'AWS Certified', 'MERN Stack Expert', 'Cloud Architect'];

// ─── PROJECTS ─────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    title: 'AI Prompt & Dataset Manager',
    subtitle: 'Full-Stack MERN · 2024',
    desc: 'Full-stack web app for creating, managing, and exporting AI training datasets with role-based access control, JWT auth, and CI/CD deployment.',
    tags: ['React.js', 'Node.js', 'MongoDB', 'JWT', 'Vercel', 'Render'],
    emoji: '🤖',
    color: '#8B5CF6',
    accent: '#10F0B0',
    link: 'https://ethara-ai-prompt-manager-frontend.vercel.app/admin',
    github: undefined,
    status: 'live' as const,
  },
  {
    title: 'CodeStream IDE',
    subtitle: 'Online Compiler · 2024',
    desc: 'Browser-based IDE supporting C, C++, Java, Python with Docker-containerized execution. Write, test, and share code instantly with a web playground.',
    tags: ['React.js', 'Node.js', 'Docker', 'Express.js', 'REST API'],
    emoji: '⚡',
    color: '#10F0B0',
    accent: '#8B5CF6',
    link: 'https://codestream-94ss.onrender.com/',
    github: undefined,
    status: 'live' as const,
  },
  {
    title: 'MusicApp',
    subtitle: 'Android Streaming · 2024 – Present',
    desc: 'Feature-rich music streaming app in Jetpack Compose with offline downloads, 5-band EQ, sleep timer, Last.fm scrobbling, and gapless playback.',
    tags: ['Kotlin', 'Jetpack Compose', 'Room DB', 'ExoPlayer', 'Firebase'],
    emoji: '🎵',
    color: '#FF2D78',
    accent: '#8B5CF6',
    link: undefined,
    github: undefined,
    status: 'wip' as const,
  },
  {
    title: 'Hospital Management System',
    subtitle: 'Native Android · 2023',
    desc: 'Native Android app for hospital records with Firebase Firestore real-time sync, SQLite offline persistence, and structured PDF export. APK available on GitHub.',
    tags: ['Java', 'Android', 'Firebase', 'SQLite', 'Firestore'],
    emoji: '🏥',
    color: '#6366F1',
    accent: '#10F0B0',
    link: undefined,
    github: 'https://github.com/samhithbasa/Hospital-App',
    status: 'github' as const,
  },
];

const SKILL_GROUPS = [
  { title: 'Frontend', icon: '🎨', color: '#8B5CF6', skills: [
    { name: 'React.js / Next.js', level: 90, color: '#61DAFB', icon: '⚛️' },
    { name: 'TypeScript', level: 82, color: '#3178C6', icon: '📘' },
    { name: 'Tailwind CSS', level: 88, color: '#06B6D4', icon: '🌊' },
    { name: 'HTML5 / CSS3', level: 92, color: '#E34F26', icon: '🌐' },
  ]},
  { title: 'Backend', icon: '⚙️', color: '#10F0B0', skills: [
    { name: 'Node.js / Express', level: 87, color: '#68A063', icon: '🟢' },
    { name: 'MongoDB', level: 85, color: '#4DB33D', icon: '🍃' },
    { name: 'Firebase', level: 80, color: '#FFA000', icon: '🔥' },
    { name: 'REST API Design', level: 90, color: '#10F0B0', icon: '🔗' },
  ]},
  { title: 'Mobile & Cloud', icon: '📱', color: '#FF2D78', skills: [
    { name: 'Kotlin / Jetpack Compose', level: 83, color: '#7F52FF', icon: '🎯' },
    { name: 'AWS (EC2, S3, VPC)', level: 78, color: '#FF9900', icon: '☁️' },
    { name: 'Docker', level: 75, color: '#2496ED', icon: '🐳' },
    { name: 'Java Android', level: 80, color: '#F05032', icon: '📱' },
  ]},
];

const W = { maxWidth: 1200, margin: '0 auto', padding: '0 48px', width: '100%' };

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
export default function Home() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    const cur = ROLES[roleIdx];
    if (typing) {
      if (charIdx < cur.length) {
        const t = setTimeout(() => { setDisplayed(cur.slice(0, charIdx + 1)); setCharIdx(c => c + 1); }, 60);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 2000);
        return () => clearTimeout(t);
      }
    } else {
      if (charIdx > 0) {
        const t = setTimeout(() => { setDisplayed(cur.slice(0, charIdx - 1)); setCharIdx(c => c - 1); }, 30);
        return () => clearTimeout(t);
      } else {
        setRoleIdx(i => (i + 1) % ROLES.length);
        setTyping(true);
      }
    }
  }, [charIdx, typing, roleIdx]);

  return (
    <main style={{ background: '#050508', minHeight: '100vh', overflowX: 'hidden' }}>
      <ParticleField />
      <Navbar />

      {/* ── HERO ── */}
      <section id="home" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', overflow: 'hidden' }}>
          <span style={{ fontSize: 'clamp(80px,18vw,260px)', fontWeight: 900, color: 'rgba(139,92,246,0.04)', letterSpacing: -10, userSelect: 'none', whiteSpace: 'nowrap' }}>SAMHITH</span>
        </div>

        <div style={{ ...W, paddingTop: 100, paddingBottom: 60 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>

            {/* Left */}
            <div style={{ animation: 'fade-up 0.8s ease forwards' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 28, padding: '8px 18px', borderRadius: 50, background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.3)' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10F0B0', animation: 'pulse-dot 2s infinite' }} />
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>Open to opportunities · 2026</span>
              </div>

              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 'clamp(52px,6vw,88px)', fontWeight: 900, lineHeight: 1, letterSpacing: -3, background: 'linear-gradient(135deg,#8B5CF6,#10F0B0,#FF2D78)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Basa</div>
                <div style={{ fontSize: 'clamp(52px,6vw,88px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: -3, color: '#fff' }}>Samhith</div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, height: 40 }}>
                <div style={{ width: 4, height: 36, borderRadius: 4, background: 'linear-gradient(#8B5CF6,#10F0B0)', flexShrink: 0 }} />
                <span style={{ fontSize: 20, fontWeight: 600, color: '#10F0B0', minWidth: 280 }}>{displayed}<span style={{ animation: 'pulse-dot 1s infinite' }}>|</span></span>
              </div>

              <p style={{ fontSize: 15, lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', marginBottom: 32, maxWidth: 480 }}>
                Final-year CS student at SRM University, AP. Building production-grade MERN apps, Android experiences, and cloud-native systems. AWS certified. Docker fluent.
              </p>

              <div style={{ display: 'flex', gap: 16, marginBottom: 36, flexWrap: 'wrap' }}>
                {[
                  { n: '4+', l: 'Projects', c: '#8B5CF6' },
                  { n: '3×', l: 'AWS Certs', c: '#10F0B0' },
                  { n: '7.42', l: 'CGPA', c: '#FF2D78' },
                  { n: '2026', l: 'Graduate', c: '#6366F1' },
                ].map(s => (
                  <div key={s.n} style={{ textAlign: 'center', padding: '14px 22px', borderRadius: 16, background: 'rgba(13,13,26,0.7)', border: `1px solid ${s.c}33`, backdropFilter: 'blur(10px)' }}>
                    <div style={{ fontSize: 26, fontWeight: 900, color: s.c }}>{s.n}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{s.l}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <a href="#projects" style={{ padding: '14px 32px', borderRadius: 50, fontWeight: 700, fontSize: 14, textDecoration: 'none', color: '#fff', background: 'linear-gradient(135deg,#8B5CF6,#FF2D78)', boxShadow: '0 0 30px rgba(139,92,246,0.5)', transition: 'all 0.3s ease' }}>View Projects ↗</a>
                <a href="mailto:samhithbasa12@gmail.com" style={{ padding: '14px 32px', borderRadius: 50, fontWeight: 700, fontSize: 14, textDecoration: 'none', color: '#10F0B0', border: '1px solid rgba(16,240,176,0.4)', background: 'rgba(16,240,176,0.05)', transition: 'all 0.3s ease' }}>Contact Me ✉</a>
              </div>
            </div>

            {/* Right: 3D Cube */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', height: 500 }}>
              <div style={{ position: 'absolute', width: 340, height: 340, borderRadius: '50%', border: '1px solid rgba(139,92,246,0.2)', animation: 'spin-slow 20s linear infinite' }} />
              <div style={{ position: 'absolute', width: 260, height: 260, borderRadius: '50%', border: '1px dashed rgba(16,240,176,0.12)', animation: 'spin-slow 14s linear infinite reverse' }} />
              <div style={{ position: 'absolute', width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)' }} />
              {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                <div key={i} style={{
                  position: 'absolute', width: 10, height: 10, borderRadius: '50%',
                  background: i % 2 === 0 ? '#8B5CF6' : '#10F0B0',
                  boxShadow: `0 0 10px ${i % 2 === 0 ? '#8B5CF6' : '#10F0B0'}`,
                  transform: `rotate(${deg}deg) translateX(170px)`,
                  animation: 'spin-slow 20s linear infinite',
                }} />
              ))}
              <FloatingCube />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 60 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.2)', fontSize: 12 }}>
              <span>scroll</span>
              <div style={{ width: 1, height: 48, background: 'linear-gradient(#8B5CF6, transparent)', animation: 'pulse-dot 2s infinite' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, #8B5CF6, #10F0B0, transparent)' }} />
        <div style={{ ...W, paddingTop: 100, paddingBottom: 100 }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <p style={{ fontSize: 11, letterSpacing: 4, color: '#10F0B0', marginBottom: 12, textTransform: 'uppercase' }}>Who I Am</p>
            <h2 style={{ fontSize: 52, fontWeight: 900, letterSpacing: -2 }}>
              <span style={{ color: '#fff' }}>About </span>
              <span style={{ background: 'linear-gradient(135deg,#8B5CF6,#10F0B0,#FF2D78)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Me</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 48 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{ background: 'rgba(13,13,26,0.7)', backdropFilter: 'blur(20px)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: 24, padding: 36 }}>
                <p style={{ fontSize: 15, lineHeight: 1.9, color: 'rgba(255,255,255,0.72)' }}>
                  I am a <strong style={{ color: '#8B5CF6' }}>final-year Computer Science student</strong> at SRM University, Andhra Pradesh, graduating in 2026. My craft sits at the crossroads of full-stack web engineering and native Android development — building products that are fast, beautiful, and production-ready.
                </p>
                <p style={{ fontSize: 15, lineHeight: 1.9, color: 'rgba(255,255,255,0.72)', marginTop: 16 }}>
                  I have shipped real apps — an <strong style={{ color: '#10F0B0' }}>AI training dataset platform</strong>, a <strong style={{ color: '#FF2D78' }}>browser-based multi-language IDE</strong>, a hospital management system, and a feature-packed Android <strong style={{ color: '#8B5CF6' }}>music streaming app</strong>.
                </p>
              </div>

              <div style={{ background: 'rgba(13,13,26,0.7)', backdropFilter: 'blur(20px)', border: '1px solid rgba(16,240,176,0.15)', borderRadius: 24, padding: 36 }}>
                <p style={{ fontSize: 11, letterSpacing: 3, color: 'rgba(255,255,255,0.4)', marginBottom: 24, textTransform: 'uppercase' }}>Timeline</p>
                <div style={{ position: 'relative' }}>
                  {[
                    { year: '2022', label: 'Started B.Tech CSE @ SRM University AP', color: '#8B5CF6' },
                    { year: '2023', label: 'Built Hospital Management System (Android)', color: '#6366F1' },
                    { year: '2024 Jun', label: 'Front-End Intern @ Edunet Foundation', color: '#10F0B0' },
                    { year: '2024 Aug', label: 'AWS Cloud Certifications ×3', color: '#FF9900' },
                    { year: '2024', label: 'Shipped AI Prompt Manager + CodeStream IDE', color: '#FF2D78' },
                    { year: '2024+', label: 'Building MusicApp in Jetpack Compose', color: '#8B5CF6' },
                    { year: '2026', label: 'Graduation + Full-Time Role 🎓', color: '#10F0B0' },
                  ].map((item, i, arr) => (
                    <div key={i} style={{ display: 'flex', gap: 20, position: 'relative', paddingBottom: i < arr.length - 1 ? 20 : 0 }}>
                      {i < arr.length - 1 && <div style={{ position: 'absolute', left: 76, top: 20, bottom: 0, width: 1, background: 'rgba(139,92,246,0.2)' }} />}
                      <div style={{ fontSize: 11, fontFamily: 'monospace', color: item.color, minWidth: 68, textAlign: 'right', paddingTop: 2, flexShrink: 0 }}>{item.year}</div>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                        <div style={{ width: 10, height: 10, borderRadius: '50%', background: item.color, boxShadow: `0 0 8px ${item.color}`, marginTop: 4, flexShrink: 0 }} />
                        <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>{item.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { icon: '🎓', title: 'Education', val: 'B.Tech CSE · SRM University AP', sub: 'CGPA 7.42 / 10.0 · 2022–2026', color: '#8B5CF6' },
                { icon: '💼', title: 'Experience', val: 'Front-End Developer Intern', sub: 'Edunet Foundation · Jun–Aug 2024', color: '#10F0B0' },
                { icon: '☁️', title: 'Certifications', val: 'AWS ×3 Certified', sub: 'Essentials · Migration · Architecting', color: '#FF9900' },
                { icon: '🏆', title: 'Hackathon', val: 'AIESEC Global Hackathon', sub: 'MERN Stack · UN SDGs · 48hrs', color: '#FF2D78' },
                { icon: '📍', title: 'Location', val: 'Andhra Pradesh, India', sub: 'Remote-ready · Available 2026', color: '#6366F1' },
              ].map((card, i) => (
                <div key={i}
                  style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '18px 22px', borderRadius: 18, background: 'rgba(13,13,26,0.7)', border: `1px solid ${card.color}22`, backdropFilter: 'blur(10px)', transition: 'transform 0.3s ease', cursor: 'default' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'translateX(6px)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'translateX(0)')}>
                  <span style={{ fontSize: 26, filter: `drop-shadow(0 0 8px ${card.color})`, flexShrink: 0 }}>{card.icon}</span>
                  <div>
                    <div style={{ fontSize: 10, letterSpacing: 2, color: card.color, marginBottom: 2, textTransform: 'uppercase' }}>{card.title}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>{card.val}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{card.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', zIndex: 1, background: 'rgba(13,13,26,0.3)' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, #8B5CF6, #10F0B0, transparent)' }} />
        <div style={{ ...W, paddingTop: 100, paddingBottom: 100 }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <p style={{ fontSize: 11, letterSpacing: 4, color: '#FF2D78', marginBottom: 12, textTransform: 'uppercase' }}>Tech Arsenal</p>
            <h2 style={{ fontSize: 52, fontWeight: 900, letterSpacing: -2 }}>
              <span style={{ background: 'linear-gradient(135deg,#8B5CF6,#10F0B0,#FF2D78)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Skills & </span>
              <span style={{ color: '#fff' }}>Stack</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 14, marginTop: 12 }}>From pixel to cloud — the full stack I wield daily</p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 80, overflow: 'hidden' }}>
            <TechOrbit />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
            {SKILL_GROUPS.map((group, gi) => (
              <div key={gi} style={{ background: 'rgba(13,13,26,0.7)', backdropFilter: 'blur(20px)', border: `1px solid ${group.color}22`, borderRadius: 24, padding: 32 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
                  <span style={{ fontSize: 24, filter: `drop-shadow(0 0 8px ${group.color})` }}>{group.icon}</span>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: group.color }}>{group.title}</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  {group.skills.map((skill, si) => (
                    <SkillBar key={si} skill={skill} delay={gi * 100 + si * 150} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, #8B5CF6, #10F0B0, transparent)' }} />
        <div style={{ ...W, paddingTop: 100, paddingBottom: 120 }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <p style={{ fontSize: 11, letterSpacing: 4, color: '#8B5CF6', marginBottom: 12, textTransform: 'uppercase' }}>What I've Built</p>
            <h2 style={{ fontSize: 52, fontWeight: 900, letterSpacing: -2 }}>
              <span style={{ color: '#fff' }}>Featured </span>
              <span style={{ background: 'linear-gradient(135deg,#8B5CF6,#10F0B0,#FF2D78)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Projects</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 14, marginTop: 12 }}>Production-grade apps shipped with real users in mind</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 36 }}>
            {PROJECTS.map((p, i) => (
              <ProjectCard key={i} project={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', position: 'relative', zIndex: 1, background: 'rgba(13,13,26,0.4)' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, #8B5CF6, #10F0B0, transparent)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
          <div style={{ width: 700, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)' }} />
        </div>

        <div style={{ ...W, paddingTop: 100, paddingBottom: 100, textAlign: 'center' }}>
          <p style={{ fontSize: 11, letterSpacing: 4, color: '#10F0B0', marginBottom: 16, textTransform: 'uppercase' }}>Let's Connect</p>
          <h2 style={{ fontSize: 'clamp(40px,6vw,72px)', fontWeight: 900, letterSpacing: -3, lineHeight: 1.1, marginBottom: 24 }}>
            <span style={{ background: 'linear-gradient(135deg,#8B5CF6,#10F0B0,#FF2D78)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Let's Build</span>
            <br />
            <span style={{ color: '#fff' }}>Something Great.</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 15, maxWidth: 520, margin: '0 auto 48px', lineHeight: 1.8 }}>
            Final year, open to full-time roles starting 2026. Whether it's SDE, Android, or full-stack — I'm all in.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center', marginBottom: 48 }}>
            {[
              { icon: '✉️', label: 'samhithbasa12@gmail.com', href: 'mailto:samhithbasa12@gmail.com', color: '#8B5CF6' },
              { icon: '📱', label: '+91 9182291580', href: 'tel:+919182291580', color: '#10F0B0' },
              { icon: '💼', label: 'LinkedIn', href: 'http://linkedin.com/in/basasamhith/', color: '#0077B5' },
              { icon: '🐙', label: 'GitHub', href: 'https://github.com/samhithbasa', color: '#a78bfa' },
            ].map(link => (
              <a key={link.label} href={link.href}
                style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 22px', borderRadius: 50, fontSize: 13, fontWeight: 500, textDecoration: 'none', color: 'rgba(255,255,255,0.8)', background: 'rgba(13,13,26,0.7)', border: `1px solid ${link.color}33`, backdropFilter: 'blur(10px)', transition: 'all 0.3s ease' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 0 20px ${link.color}44`; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                <span>{link.icon}</span><span>{link.label}</span>
              </a>
            ))}
          </div>

          <a href="mailto:samhithbasa12@gmail.com"
            style={{ display: 'inline-block', padding: '18px 56px', borderRadius: 50, fontWeight: 900, fontSize: 18, textDecoration: 'none', color: '#fff', background: 'linear-gradient(135deg,#8B5CF6,#10F0B0,#FF2D78)', boxShadow: '0 0 60px rgba(139,92,246,0.5)', animation: 'glow-anim 3s ease-in-out infinite', transition: 'transform 0.3s ease' }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05) translateY(-4px)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1) translateY(0)')}>
            Say Hello 👋
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(139,92,246,0.1)', padding: '24px 48px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>© 2026 Basa Samhith · Crafted with Next.js, Tailwind & 3D magic ✦</p>
      </footer>
    </main>
  );
}