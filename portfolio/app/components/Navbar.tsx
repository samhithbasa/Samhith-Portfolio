'use client';
import { useEffect, useState } from 'react';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('Home');
  const [ctaHovered, setCtaHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <style>{`
        @keyframes nav-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.45; transform: scale(0.65); }
        }
        .nav-dot {
          animation: nav-pulse 2.2s ease infinite;
        }
      `}</style>

      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-300"
        style={{
          padding: scrolled ? '12px 32px' : '18px 32px',
          background: scrolled ? 'rgba(5,5,8,0.82)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(139,92,246,0.12)'
            : 'none',
        }}
      >
        {/* ── Logo ── */}
        <div className="relative">
          <div
            className="flex items-baseline"
            style={{ letterSpacing: '-0.04em' }}
          >
            <span
              className="text-lg font-black"
              style={{
                background: 'linear-gradient(135deg, #a78bfa, #10F0B0)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Samhith
            </span>
            <span
              className="text-lg font-medium"
              style={{ color: 'rgba(255,255,255,0.4)' }}
            >
              .dev
            </span>
          </div>
          {/* underline accent */}
          <span
            className="absolute left-0 right-0"
            style={{
              bottom: -3,
              height: 1,
              background:
                'linear-gradient(90deg, rgba(139,92,246,0.55), rgba(16,240,176,0.35), transparent)',
            }}
          />
        </div>

        {/* ── Nav pill ── */}
        <div
          className="hidden md:flex items-center"
          style={{
            gap: 2,
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 100,
            padding: 4,
          }}
        >
          {navItems.map((item) => {
            const isActive = active === item.label;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setActive(item.label)}
                className="relative text-sm font-medium transition-colors duration-200"
                style={{
                  padding: '7px 16px',
                  borderRadius: 100,
                  letterSpacing: '0.01em',
                  color: isActive
                    ? 'rgba(255,255,255,0.95)'
                    : 'rgba(255,255,255,0.42)',
                  background: isActive
                    ? 'rgba(139,92,246,0.10)'
                    : 'transparent',
                  textDecoration: 'none',
                }}
              >
                {item.label}

                {/* active indicator bar */}
                {isActive && (
                  <span
                    className="absolute left-1/2 -translate-x-1/2"
                    style={{
                      bottom: 4,
                      width: 18,
                      height: 2,
                      borderRadius: 2,
                      background:
                        'linear-gradient(90deg, #8B5CF6, #10F0B0)',
                      opacity: 0.85,
                    }}
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* ── CTA ── */}
        <a
          href="mailto:samhithbasa12@gmail.com"
          className="hidden md:flex items-center gap-2 text-sm font-semibold text-white transition-all duration-200"
          style={{
            padding: '8px 18px',
            borderRadius: 100,
            letterSpacing: '0.01em',
            textDecoration: 'none',
            transform: ctaHovered ? 'translateY(-1px)' : 'translateY(0)',
            border: ctaHovered
              ? '1px solid rgba(139,92,246,0.75)'
              : '1px solid rgba(139,92,246,0.45)',
            background: ctaHovered
              ? 'rgba(139,92,246,0.20)'
              : 'rgba(139,92,246,0.10)',
          }}
          onMouseEnter={() => setCtaHovered(true)}
          onMouseLeave={() => setCtaHovered(false)}
        >
          {/* pulsing availability dot */}
          <span
            className="nav-dot flex-shrink-0"
            style={{
              width: 5,
              height: 5,
              borderRadius: '50%',
              background: '#10F0B0',
              display: 'inline-block',
            }}
          />
          Hire Me
        </a>
      </nav>
    </>
  );
}