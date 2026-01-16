const Hero = () => {
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
            {/* Animated background glow */}
            <div className="hero-glow" />

            {/* Heading */}
            <h1 className="hero-title">
                Accelerating Innovation Through <br />
                <span className="text-gradient">IT Services & Expert Training</span>
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
                <button className="btn-premium hero-btn-primary">
                    Our Services
                </button>

                <button className="glass hero-btn-secondary">
                    Explore Training
                </button>
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

            {/* Styles */}
            <style>{`
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
          0%, 100% {
            transform: translateX(-50%) translateY(0);
          }
          50% {
            transform: translateX(-50%) translateY(20px);
          }
        }

        /* Title */
        .hero-title {
          font-size: clamp(3rem, 8vw, 5rem);
          line-height: 1.1;
          margin-bottom: 1.5rem;
          letter-spacing: -0.03em;
          animation: fadeUp 0.8s ease forwards;
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
          color: white;
          font-weight: 700;
          font-size: 1.1rem;
          cursor: pointer;
        }

        /* Tags */
        .hero-tags {
          margin-top: 5rem;
          opacity: 0;
          display: flex;
          justify-content: center;
          gap: 3rem;
          flex-wrap: wrap;
          animation: fadeUp 0.8s ease forwards;
          animation-delay: 0.6s;
        }

        .hero-tag {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-muted);
          border: 1px solid var(--glass-border);
          padding: 0.5rem 1rem;
          border-radius: 50px;
          animation: tagPulse 3s ease-in-out infinite;
        }

        @keyframes tagPulse {
          0%, 100% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
        }

        /* Fade Up Animation */
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(25px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Mobile */
        @media (max-width: 768px) {
          .hero-actions {
            flex-direction: column;
          }
        }
      `}</style>
        </section>
    );
};

export default Hero;
