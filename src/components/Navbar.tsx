const Navbar = () => {
    return (
        <header
            className="glass"
            style={{
                position: "sticky",
                top: 0,
                zIndex: 1000,
                borderBottom: "1px solid var(--glass-border)",
            }}
        >
            <nav className="container navbar">
                {/* Logo */}
                <div className="navbar-logo">
                    <img
                        src="/logo.png"
                        alt="Hexalabs Logo"
                        className="logo-img"
                    />
                </div>

                {/* Navigation */}
                <ul className="nav-links">
                    {/* Services Dropdown */}
                    <li className="dropdown-parent">
                        <span className="nav-link dropdown-trigger">
                            Services
                            <svg
                                width="10"
                                height="6"
                                viewBox="0 0 10 6"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M1 1L5 5L9 1"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </span>

                        <div className="dropdown-menu">
                            <a href="#services" className="dropdown-item">All Services</a>
                            <a href="#cloud-portal" className="dropdown-item">Cloud Portal</a>
                            <a href="#marketplace" className="dropdown-item">Marketplace</a>
                            <a href="#it-consulting" className="dropdown-item">IT Consulting</a>
                        </div>
                    </li>

                    {["Training", "About", "Contact"].map((item, i) => (
                        <li key={i}>
                            <a
                                href={`#${item.toLowerCase()}`}
                                className="nav-link"
                            >
                                {item}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* CTA */}
                <button className="btn-premium nav-cta">
                    Book Demo
                </button>
            </nav>

            {/* Styles */}
            <style>{`
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 72px;
          padding: 0 2rem;
        }

        /* Logo */
        .navbar-logo {
          display: flex;
          align-items: center;
        }

        .logo-img {
          height: 100px; /* ✅ fixed proper logo size */
          width: auto;
          object-fit: contain;
          display: block;
        }

        /* Nav Links */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 2.5rem;
          list-style: none;
          margin: 0;
          padding: 0;
          height: 100%;
        }

        .nav-link {
          color: var(--text-secondary);
          font-size: 0.95rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .nav-link:hover {
          color: var(--primary);
        }

        /* Dropdown */
        .dropdown-parent {
          position: relative;
          height: 100%;
          display: flex;
          align-items: center;
        }

        .dropdown-menu {
          position: absolute;
          top: 110%;
          left: 0;
          min-width: 200px;
          background: var(--bg-elevated);
          border: 1px solid var(--glass-border);
          border-radius: 14px;
          padding: 0.5rem;
          display: none;
          flex-direction: column;
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
          backdrop-filter: blur(12px);
        }

        .dropdown-parent:hover .dropdown-menu {
          display: flex;
        }

        .dropdown-item {
          padding: 0.65rem 0.9rem;
          border-radius: 10px;
          font-size: 0.9rem;
          color: var(--text-secondary);
          text-decoration: none;
          transition: background 0.2s ease, color 0.2s ease;
        }

        .dropdown-item:hover {
          background: rgba(255,255,255,0.06);
          color: white;
        }

        /* CTA */
        .nav-cta {
          padding: 0.5rem 1.25rem;
          font-size: 0.85rem;
          box-shadow: 0 4px 20px rgba(99, 102, 241, 0.3);
          white-space: nowrap;
        }

        /* Responsive */
        @media (max-width: 900px) {
          .nav-links {
            gap: 1.5rem;
          }
        }
      `}</style>
        </header>
    );
};

export default Navbar;
