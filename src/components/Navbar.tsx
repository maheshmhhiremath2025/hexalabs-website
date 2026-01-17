import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import styles from "./Navbar.module.css";
import { NAV_LINKS } from "../constants/data";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeAll = () => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
  };

  return (
    <header className={`${styles.header} ${isScrolled ? "glass" : ""}`}>
      <nav className={`container ${styles.navbar}`}>
        {/* Logo */}
        <div className={styles.logoContainer}>
          <img src="/logo.png" alt="Hexalabs Logo" className={styles.logo} />
        </div>

        {/* Navigation */}
        <ul className={`${styles.navLinks} ${isMenuOpen ? styles.active : ""}`}>
          {/* Services Dropdown */}
          <li className={styles.dropdownParent}>
            <button
              className={`${styles.navLink} ${styles.dropdownTrigger}`}
              onClick={() => setIsServicesOpen(!isServicesOpen)}
              aria-expanded={isServicesOpen}
            >
              Services
              <svg width="10" height="6" viewBox="0 0 10 6">
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>

            {isServicesOpen && (
              <div className={styles.dropdownMenu}>
                <a href="#services" className={styles.dropdownItem} onClick={closeAll}>All Services</a>
                <a href="#cloud-portal" className={styles.dropdownItem} onClick={closeAll}>Cloud Portal</a>
                <a href="#marketplace" className={styles.dropdownItem} onClick={closeAll}>Marketplace</a>
                <a href="#it-consulting" className={styles.dropdownItem} onClick={closeAll}>IT Consulting</a>
              </div>
            )}
          </li>

          {NAV_LINKS.map((link) => (
            <li key={link.name}>
              <a href={link.href} className={styles.navLink} onClick={closeAll}>
                {link.name}
              </a>
            </li>
          ))}

          {/* Mobile Theme Toggle */}
          <li className={styles.mobileOnly}>
            <button onClick={toggleTheme} className={styles.themeToggle}>
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
          </li>

          {/* Mobile CTA */}
          <li className={styles.mobileOnly}>
            <button className={`btn-premium ${styles.navCta}`}>
              Book Demo
            </button>
          </li>
        </ul>

        {/* Desktop Actions */}
        <div className={styles.navAction}>
          <button onClick={toggleTheme} className={styles.themeToggle}>
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          <button className={`btn-premium ${styles.navCta}`}>
            Book Demo
          </button>
        </div>

        {/* Hamburger */}
        <button
          className={`${styles.menuToggle} ${isMenuOpen ? styles.active : ""}`}
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
            setIsServicesOpen(false);
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
