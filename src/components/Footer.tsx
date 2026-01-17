import { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

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
            </div>

            <p className="footer-desc">
              Building the next generation of technology leaders and innovative
              IT solutions for a digital-first world.
            </p>

            {/* Newsletter Signup */}
            <div className="newsletter">
              <h4 className="newsletter-title">Stay Updated</h4>
              <form onSubmit={handleSubscribe} className="newsletter-form">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="newsletter-input"
                  required
                />
                <button type="submit" className="newsletter-btn">
                  {subscribed ? '✓' : '→'}
                </button>
              </form>
              {subscribed && (
                <p className="newsletter-success">Thanks for subscribing! 🎉</p>
              )}
            </div>
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
            <a href="https://linkedin.com/company/hexalabs" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a href="https://twitter.com/hexalabs" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Twitter">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </a>
            <a href="https://github.com/hexalabs" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="GitHub">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
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
          height: 100px;
          width: auto;
        }

        .footer-desc {
          color: var(--text-secondary);
          line-height: 1.6;
          font-size: 0.95rem;
          margin-bottom: 2rem;
        }

        .newsletter {
          margin-top: 1.5rem;
        }

        .newsletter-title {
          font-size: 1rem;
          margin-bottom: 0.75rem;
          color: var(--text-primary);
        }

        .newsletter-form {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .newsletter-input {
          flex: 1;
          padding: 0.75rem 1rem;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: 10px;
          color: var(--text-primary);
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }

        .newsletter-input:focus {
          outline: none;
          border-color: var(--primary);
          background: rgba(99, 102, 241, 0.05);
        }

        .newsletter-input::placeholder {
          color: var(--text-muted);
        }

        .newsletter-btn {
          padding: 0.75rem 1.25rem;
          background: var(--primary);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 1.2rem;
          cursor: pointer;
          transition: all 0.3s ease;
          min-width: 50px;
        }

        .newsletter-btn:hover {
          background: var(--primary-hover);
          transform: translateX(3px);
        }

        .newsletter-success {
          color: #10b981;
          font-size: 0.85rem;
          animation: fadeIn 0.3s ease;
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
          display: inline-block;
        }

        .footer-links a:hover {
          color: var(--primary);
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
          gap: 1rem;
        }

        .social-icon {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: 50%;
          color: var(--text-secondary);
          transition: all 0.3s ease;
        }

        .social-icon:hover {
          background: var(--primary);
          border-color: var(--primary);
          color: white;
          transform: translateY(-3px);
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
