import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MagneticButton, StaggerContainer, StaggerItem } from "./animations/MotionWrapper";

const Hero = () => {
  /* =========================
     TYPEWRITER EFFECT
  ========================= */
  const words = ["Expert Training", "Corporate Training", "Hands-on Labs"];

  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  // Mouse position for interactive glow
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);

  // Scroll-based parallax
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    const current = words[index];
    const speed = deleting ? 50 : 90;

    const timeout = setTimeout(() => {
      if (!deleting && charIndex < current.length) {
        setText(current.slice(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      } else if (deleting && charIndex > 0) {
        setText(current.slice(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      } else if (!deleting && charIndex === current.length) {
        setTimeout(() => setDeleting(true), 1200);
      } else if (deleting && charIndex === 0) {
        setDeleting(false);
        setIndex((prev) => (prev + 1) % words.length);
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, index]);

  // Mouse tracking for interactive glow
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.section
      ref={heroRef}
      className="hero container"
      style={{
        padding: "10rem 2rem 8rem",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        isolation: "isolate",
        y: heroY,
      }}
    >
      {/* ================= ANIMATED BACKGROUND ================= */}
      <div className="hero-bg">
        {/* Animated Gradient Orbs */}
        <motion.span
          className="blob blob-1"
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -40, 20, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.span
          className="blob blob-2"
          animate={{
            x: [0, -40, 30, 0],
            y: [0, 30, -30, 0],
            scale: [1, 0.9, 1.15, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.span
          className="blob blob-3"
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -20, 40, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />
        <div className="grid-overlay" />

        {/* Floating Particles */}
        <div className="particles">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="particle"
              initial={{
                x: Math.random() * 100 + "%",
                y: Math.random() * 100 + "%",
                opacity: Math.random() * 0.5 + 0.2,
              }}
              animate={{
                y: [null, "-100vh"],
                opacity: [null, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "linear",
              }}
              style={{
                width: Math.random() * 4 + 2 + "px",
                height: Math.random() * 4 + 2 + "px",
              }}
            />
          ))}
        </div>
      </div>

      {/* Mouse-following Glow */}
      <motion.div
        className="mouse-glow"
        animate={{
          left: mousePosition.x - 200,
          top: mousePosition.y - 200,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />

      {/* Background Glow */}
      <motion.div
        className="hero-glow"
        style={{ opacity: heroOpacity }}
      />

      {/* Content with stagger animations */}
      <StaggerContainer style={{ position: "relative", zIndex: 10 }}>
        {/* Heading with text reveal */}
        <StaggerItem>
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Accelerating Innovation Through
            </motion.span>
            <br />
            <span className="text-gradient">
              IT Services & {text}
              <motion.span
                className="cursor"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                |
              </motion.span>
            </span>
          </motion.h1>
        </StaggerItem>

        {/* Subtitle */}
        <StaggerItem>
          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Hexalabs is your strategic partner for digital transformation. From
            cloud-native software development to industry-leading technical
            certifications, we empower businesses and professionals to lead in the
            digital age.
          </motion.p>
        </StaggerItem>

        {/* CTA Buttons with magnetic effect */}
        <StaggerItem>
          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <MagneticButton strength={0.2}>
              <button className="btn-premium hero-btn-primary">
                <span>Our Services</span>
                <motion.span
                  className="btn-shine"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                />
              </button>
            </MagneticButton>
            <MagneticButton strength={0.2}>
              <button className="glass hero-btn-secondary">
                <span>Explore Training</span>
                <svg className="btn-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <motion.path
                    d="M5 12H19M19 12L12 5M19 12L12 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                  />
                </svg>
              </button>
            </MagneticButton>
          </motion.div>
        </StaggerItem>

        {/* Tags with stagger animation */}
        <StaggerItem>
          <motion.div
            className="hero-tags"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {["Cloud Native", "Cybersecurity", "AI & ML", "DevOps"].map((tag, i) => (
              <motion.span
                key={tag}
                className="hero-tag"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
                whileHover={{
                  scale: 1.1,
                  borderColor: "var(--primary)",
                  color: "var(--primary)",
                }}
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        </StaggerItem>
      </StaggerContainer>

      {/* Scroll Indicator */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>

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
          width: 500px;
          height: 500px;
          filter: blur(100px);
          opacity: 0.4;
          border-radius: 50%;
        }

        .blob-1 {
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          top: -15%;
          left: -10%;
        }

        .blob-2 {
          background: linear-gradient(135deg, #22d3ee 0%, #0ea5e9 100%);
          top: 20%;
          right: -15%;
        }

        .blob-3 {
          background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);
          bottom: -20%;
          left: 30%;
        }

        /* Grid Overlay */
        .grid-overlay {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 80px 80px;
          animation: gridMove 25s linear infinite;
          pointer-events: none;
        }

        @keyframes gridMove {
          from { background-position: 0 0; }
          to { background-position: 80px 80px; }
        }

        /* Floating Particles */
        .particles {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .particle {
          position: absolute;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          border-radius: 50%;
        }

        /* Mouse-following glow */
        .mouse-glow {
          position: absolute;
          width: 400px;
          height: 400px;
          background: radial-gradient(
            circle,
            rgba(99, 102, 241, 0.15) 0%,
            transparent 70%
          );
          border-radius: 50%;
          pointer-events: none;
          z-index: -1;
        }

        /* Background Glow */
        .hero-glow {
          position: absolute;
          top: -20%;
          left: 50%;
          transform: translateX(-50%);
          width: 800px;
          height: 800px;
          background: radial-gradient(
            circle,
            rgba(99, 102, 241, 0.2) 0%,
            rgba(99, 102, 241, 0.1) 40%,
            transparent 70%
          );
          border-radius: 50%;
          z-index: -1;
          filter: blur(20px);
        }

        /* Title */
        .hero-title {
          font-size: clamp(2.8rem, 7vw, 4.5rem);
          line-height: 1.15;
          margin-bottom: 1.5rem;
          letter-spacing: -0.03em;
          font-weight: 800;
        }

        .cursor {
          margin-left: 4px;
          font-weight: 400;
        }

        /* Subtitle */
        .hero-subtitle {
          font-size: 1.2rem;
          color: var(--text-secondary);
          max-width: 750px;
          margin: 0 auto 3rem;
          line-height: 1.7;
        }

        /* Buttons */
        .hero-actions {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .hero-btn-primary {
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .btn-shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transform: skewX(-20deg);
        }

        .hero-btn-secondary {
          padding: 1rem 2.5rem;
          border-radius: 12px;
          font-weight: 700;
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          transition: all 0.3s ease;
        }

        .hero-btn-secondary:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(0,0,0,0.3);
        }

        .btn-arrow {
          transition: transform 0.3s ease;
        }

        .hero-btn-secondary:hover .btn-arrow {
          transform: translateX(4px);
        }

        /* Tags */
        .hero-tags {
          margin-top: 4rem;
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .hero-tag {
          font-size: 0.9rem;
          color: var(--text-muted);
          border: 1px solid var(--glass-border);
          padding: 0.6rem 1.25rem;
          border-radius: 50px;
          cursor: default;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          background: rgba(255,255,255,0.02);
        }

        /* Scroll Indicator */
        .scroll-indicator {
          margin-top: 5rem;
          display: flex;
          justify-content: center;
        }

        .scroll-indicator span {
          width: 26px;
          height: 42px;
          border: 2px solid var(--glass-border);
          border-radius: 20px;
          position: relative;
          display: block;
        }

        .scroll-indicator span::before {
          content: "";
          position: absolute;
          top: 8px;
          left: 50%;
          transform: translateX(-50%);
          width: 5px;
          height: 5px;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          border-radius: 50%;
        }

        /* Mobile */
        @media (max-width: 768px) {
          .hero-actions { flex-direction: column; align-items: center; }
          .hero-tags { gap: 1rem; }
          .hero-tag { padding: 0.5rem 1rem; font-size: 0.85rem; }
        }
      `}</style>
    </motion.section>
  );
};

export default Hero;
