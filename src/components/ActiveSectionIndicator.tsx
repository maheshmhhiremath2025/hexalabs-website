import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ActiveSectionNavbarProps {
    sections: { id: string; label: string }[];
}

const ActiveSectionIndicator = ({ sections }: ActiveSectionNavbarProps) => {
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const observers: IntersectionObserver[] = [];

        sections.forEach((section) => {
            const element = document.getElementById(section.id);
            if (element) {
                const observer = new IntersectionObserver(
                    (entries) => {
                        entries.forEach((entry) => {
                            if (entry.isIntersecting) {
                                setActiveSection(section.id);
                            }
                        });
                    },
                    { threshold: 0.3, rootMargin: '-100px 0px -50% 0px' }
                );
                observer.observe(element);
                observers.push(observer);
            }
        });

        return () => {
            observers.forEach((observer) => observer.disconnect());
        };
    }, [sections]);

    const handleClick = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 80; // navbar height
            const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    };

    return (
        <motion.div
            className="section-nav"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
        >
            {sections.map((section) => (
                <motion.button
                    key={section.id}
                    className={`section-nav-item ${activeSection === section.id ? 'active' : ''}`}
                    onClick={() => handleClick(section.id)}
                    whileHover={{ x: -5 }}
                >
                    <span className="nav-dot" />
                    <span className="nav-label">{section.label}</span>
                </motion.button>
            ))}

            <style>{`
                .section-nav {
                    position: fixed;
                    right: 30px;
                    top: 50%;
                    transform: translateY(-50%);
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                    z-index: 100;
                }

                .section-nav-item {
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    gap: 0.75rem;
                    padding: 0.5rem;
                    background: none;
                    border: none;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .nav-dot {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background: var(--glass-border);
                    transition: all 0.3s ease;
                    order: 2;
                }

                .section-nav-item.active .nav-dot {
                    background: var(--primary);
                    box-shadow: 0 0 10px var(--primary);
                    width: 12px;
                    height: 12px;
                }

                .nav-label {
                    font-size: 0.8rem;
                    color: var(--text-muted);
                    opacity: 0;
                    transform: translateX(10px);
                    transition: all 0.3s ease;
                    order: 1;
                    white-space: nowrap;
                }

                .section-nav-item:hover .nav-label,
                .section-nav-item.active .nav-label {
                    opacity: 1;
                    transform: translateX(0);
                }

                .section-nav-item.active .nav-label {
                    color: var(--primary);
                }

                @media (max-width: 1200px) {
                    .section-nav {
                        display: none;
                    }
                }
            `}</style>
        </motion.div>
    );
};

export default ActiveSectionIndicator;
