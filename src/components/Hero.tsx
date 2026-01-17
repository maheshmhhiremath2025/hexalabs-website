import { useEffect, useState } from "react";

const Hero = () => {
  /* =========================
     TYPEWRITER EFFECT
  ========================= */
  const words = ["Expert Training", "Corporate Training", "Hands-on Labs"];
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    const currentWord = words[wordIndex];
    const speed = deleting ? 60 : 120;

    const timer = setTimeout(() => {
      if (!deleting) {
        setText(currentWord.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);

        if (charIndex === currentWord.length) {
          setTimeout(() => setDeleting(true), 1200);
        }
      } else {
        setText(currentWord.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);

        if (charIndex === 0) {
          setDeleting(false);
          setWordIndex((wordIndex + 1) % words.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [charIndex, deleting, wordIndex]);

  return (
    <section
      className="hero container"
      style={{
        padding: "10rem 2rem 8rem",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ================= ANIMATED BACKGROUND ================= */}
      <div className="hero-bg">
        <span className="blob blob-1" />
        <span className="blob blob-2" />
        <span className="blob blob-3" />
        <div className="grid-overlay" />
      </div>

      {/* Background Glow */}
      <div className="hero-glow" />

      {/* Heading */}
      <h1 className="hero-title">
        Accelerating Innovation Through <br />
        <span className="text-gradient">
          IT Services & {text}
          <span className="cursor">|</span>
        </span>
      </h1>

      {/* Subtitle */}
      <p className="hero-subtitle">
        Hexalabs is your strategic partner for digital transformation. From
        cloud-native software development to industry-leading technical
        certifications, we empower businesses and professionals to lead in the
        digital age.
      </p>

      {/* CTA Buttons */}
      <div className="hero-actions">
        <button className="btn-premium hero-btn-primary">Our Services</button>
        <button className="glass hero-btn-secondary">Explore Training</button>
      </div>


      {/* Tags */}
      <div className="hero-tags">
        {["Cloud Native", "Cybersecurity", "AI & ML", "DevOps"].map((tag, i) => (
          <span
            key={tag}
            className="hero-tag"
            style={{ animationDelay: `${i * 0.15}s` }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <span />
      </div>

      {/* ================= STYLES ================= */}
      <style>{`
        /* Animated Background */
        .hero-bg {
          position: absolute;
          inset: 0;
          overflow: hidden;
          z-index: -2;
        }

        .blob {
          position: absolute;
          width: 420px;
          height: 420px;
          filter: blur(90px);
          opacity: 0.35;
          border-radius: 50%;
          animation: blobMove 18s infinite alternate ease-in-out;
        }

        .blob-1 {
          background: #6366f1;
          top: -10%;
          left: -5%;
        }

        .blob-2 {
          background: #22d3ee;
          top: 30%;
          right: -10%;
          animation-delay: 4s;
        }

        .blob-3 {
          background: #a855f7;
          bottom: -15%;
          left: 35%;
          animation-delay: 8s;
        }

        @keyframes blobMove {
          0% {
            transform: translate(0, 0) scale(1);
          }
          100% {
            transform: translate(60px, -40px) scale(1.2);
          }
        }

        /* Grid Overlay */
        .grid-overlay {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px);
          background-size: 60px 60px;
          animation: gridMove 20s linear infinite;
          pointer-events: none;
        }

        @keyframes gridMove {
          from { background-position: 0 0; }
          to { background-position: 120px 120px; }
        }

        /* Background Glow */
        .hero-glow {
          position: absolute;
          top: -15%;
          left: 50%;
          transform: translateX(-50%);
          width: 650px;
          height: 650px;
          background: radial-gradient(
            circle,
            rgba(99, 102, 241, 0.18) 0%,
            transparent 70%
          );
          border-radius: 50%;
          z-index: -1;
          animation: floatGlow 8s ease-in-out infinite;
        }

        @keyframes floatGlow {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(20px); }
        }

        /* Title */
        .hero-title {
          font-size: clamp(3rem, 8vw, 5rem);
          line-height: 1.1;
          margin-bottom: 1.5rem;
          letter-spacing: -0.03em;
          animation: fadeUp 0.8s ease forwards;
        }

        .cursor {
          margin-left: 4px;
          animation: blink 1s infinite;
        }

        @keyframes blink {
          0%, 50%, 100% { opacity: 1; }
          25%, 75% { opacity: 0; }
        }

        /* Subtitle */
        .hero-subtitle {
          font-size: 1.25rem;
          color: var(--text-secondary);
          max-width: 800px;
          margin: 0 auto 3rem;
          line-height: 1.6;
          opacity: 0;
          animation: fadeUp 0.8s ease forwards;
          animation-delay: 0.2s;
        }

        /* Buttons */
        .hero-actions {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          opacity: 0;
          animation: fadeUp 0.8s ease forwards;
          animation-delay: 0.4s;
        }

        .hero-btn-primary,
        .hero-btn-secondary {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .hero-btn-primary:hover,
        .hero-btn-secondary:hover {
          transform: translateY(-3px);
        }

        .hero-btn-secondary {
          padding: 1rem 2.5rem;
          border-radius: 12px;
          font-weight: 700;
          font-size: 1.1rem;
        }

        /* Stats */
        .hero-stats {
          margin-top: 4rem;
          display: flex;
          justify-content: center;
          gap: 4rem;
          flex-wrap: wrap;
          opacity: 0;
          animation: fadeUp 0.8s ease forwards;
          animation-delay: 0.5s;
        }

        .hero-stats strong {
          font-size: 2rem;
          display: block;
          color: white;
        }

        .hero-stats span {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        /* Tags */
        .hero-tags {
          margin-top: 4rem;
          display: flex;
          justify-content: center;
          gap: 3rem;
          flex-wrap: wrap;
          opacity: 0;
          animation: fadeUp 0.8s ease forwards;
          animation-delay: 0.6s;
        }

        .hero-tag {
          font-size: 0.9rem;
          color: var(--text-muted);
          border: 1px solid var(--glass-border);
          padding: 0.5rem 1rem;
          border-radius: 50px;
          animation: tagPulse 3s ease-in-out infinite;
        }

        @keyframes tagPulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }

        /* Scroll Indicator */
        .scroll-indicator {
          margin-top: 5rem;
          display: flex;
          justify-content: center;
        }

        .scroll-indicator span {
          width: 22px;
          height: 36px;
          border: 2px solid var(--glass-border);
          border-radius: 20px;
          position: relative;
        }

        .scroll-indicator span::before {
          content: "";
          position: absolute;
          top: 8px;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          height: 4px;
          background: var(--primary);
          border-radius: 50%;
          animation: scrollDot 2s infinite;
        }

        @keyframes scrollDot {
          0% { opacity: 0; transform: translate(-50%, 0); }
          50% { opacity: 1; }
          100% { opacity: 0; transform: translate(-50%, 12px); }
        }

        /* Fade Up */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(25px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Mobile */
        @media (max-width: 768px) {
          .hero-actions { flex-direction: column; }
          .hero-stats { gap: 2rem; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
