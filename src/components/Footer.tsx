const Footer = () => {
    return (
        <footer
            style={{
                padding: "5rem 2rem 2.5rem",
                background: "var(--bg-elevated)",
                borderTop: "1px solid var(--glass-border)",
            }}
        >
            <div className="container footer-container">
                {/* Top Section */}
                <div className="footer-grid">
                    {/* Brand */}
                    <div className="footer-brand">
                        <div className="logo">
                            <img
                                src="/logo.png"
                                alt="Hexalabs Logo"
                                className="footer-logo"
                            />
                            <span>
                                HEXA<span className="text-gradient">LABS</span>
                            </span>
                        </div>

                        <p className="footer-desc">
                            Building the next generation of technology leaders and innovative
                            IT solutions for a digital-first world.
                        </p>
                    </div>

                    {/* Solutions */}
                    <div>
                        <h4 className="footer-title">Solutions</h4>
                        <ul className="footer-links">
                            <li><a href="#services">IT Consulting</a></li>
                            <li><a href="#services">Cloud Strategy</a></li>
                            <li><a href="#services">Cybersecurity</a></li>
                            <li><a href="#services">AI Development</a></li>
                        </ul>
                    </div>

                    {/* Training */}
                    <div>
                        <h4 className="footer-title">Training</h4>
                        <ul className="footer-links">
                            <li><a href="#training">Web Development</a></li>
                            <li><a href="#training">Cloud Architecting</a></li>
                            <li><a href="#training">DevOps</a></li>
                            <li><a href="#training">Data Science</a></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="footer-title">Company</h4>
                        <ul className="footer-links">
                            <li><a href="#about">About Us</a></li>
                            <li><a href="#about">Careers</a></li>
                            <li><a href="#contact">Contact</a></li>
                            <li><a href="#contact">Privacy Policy</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="footer-bottom">
                    <p>
                        © {new Date().getFullYear()} Hexalabs IT Services & Training Private
                        Limited.
                    </p>

                    <div className="footer-social">
                        <a href="#">LinkedIn</a>
                        <a href="#">Twitter</a>
                        <a href="#">GitHub</a>
                    </div>
                </div>
            </div>

            {/* Styles */}
            <style>{`
        .footer-container {
          max-width: 1200px;
          margin: auto;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 3rem;
          margin-bottom: 3rem;
        }

        .footer-brand {
          max-width: 420px;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1.8rem;
          font-weight: 800;
          margin-bottom: 1.2rem;
        }

        .footer-logo {
          height: 42px;
          width: auto;
        }

        .footer-desc {
          color: var(--text-secondary);
          line-height: 1.6;
          font-size: 0.95rem;
        }

        .footer-title {
          margin-bottom: 1.2rem;
          font-size: 1.05rem;
        }

        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          font-size: 0.95rem;
          color: var(--text-secondary);
        }

        .footer-links a {
          color: inherit;
          text-decoration: none;
          transition: color 0.2s ease, transform 0.2s ease;
        }

        .footer-links a:hover {
          color: white;
          transform: translateX(4px);
        }

        .footer-bottom {
          padding-top: 2rem;
          border-top: 1px solid var(--glass-border);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
          font-size: 0.9rem;
          color: var(--text-muted);
        }

        .footer-social {
          display: flex;
          gap: 1.5rem;
        }

        .footer-social a {
          color: var(--text-muted);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .footer-social a:hover {
          color: white;
        }

        /* Responsive */
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr;
          }

          .footer-bottom {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
        </footer>
    );
};

export default Footer;
