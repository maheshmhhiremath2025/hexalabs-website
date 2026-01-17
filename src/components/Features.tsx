import { motion } from "framer-motion";
import { FEATURES } from "../constants/data";
import { TiltCard } from "./animations/MotionWrapper";

const Features = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94] as const
            }
        }
    };

    const iconVariants = {
        hidden: { scale: 0, rotate: -180 },
        visible: {
            scale: 1,
            rotate: 0,
            transition: {
                type: "spring" as const,
                stiffness: 200,
                damping: 15
            }
        }
    };

    return (
        <section className="features-section">
            <div className="container">
                {/* Header */}
                <motion.div
                    className="features-header"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.span
                        className="section-badge"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        Why Us
                    </motion.span>
                    <h2 className="features-title">
                        Why Choose <span className="text-gradient">Hexalabs</span>
                    </h2>
                    <p className="features-subtitle">
                        We combine technical excellence with business acumen to deliver solutions that drive real results.
                    </p>
                </motion.div>

                {/* Features Grid */}
                <motion.div
                    className="features-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {FEATURES.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                        >
                            <TiltCard maxTilt={8}>
                                <div className="feature-card glass">
                                    {/* Glow effect */}
                                    <div className="card-glow" />

                                    {/* Icon */}
                                    <motion.div
                                        className="feature-icon"
                                        variants={iconVariants}
                                        whileHover={{
                                            scale: 1.2,
                                            rotate: [0, -10, 10, 0],
                                            transition: { duration: 0.5 }
                                        }}
                                    >
                                        <span className="icon-bg" />
                                        <span className="icon-text">{feature.icon}</span>
                                    </motion.div>

                                    {/* Content */}
                                    <h3 className="feature-title">{feature.title}</h3>
                                    <p className="feature-description">{feature.description}</p>

                                    {/* Hover arrow */}
                                    <motion.div
                                        className="feature-arrow"
                                        initial={{ opacity: 0, x: -10 }}
                                        whileHover={{ opacity: 1, x: 0 }}
                                    >
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </motion.div>
                                </div>
                            </TiltCard>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            <style>{`
                .features-section {
                    padding: 8rem 2rem;
                    background: var(--bg-color);
                    position: relative;
                    overflow: hidden;
                }

                .features-header {
                    text-align: center;
                    margin-bottom: 5rem;
                }

                .section-badge {
                    display: inline-block;
                    font-size: 0.85rem;
                    color: var(--primary);
                    font-weight: 600;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    margin-bottom: 1rem;
                    padding: 0.5rem 1.25rem;
                    background: linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(14, 165, 233, 0.1) 100%);
                    border: 1px solid rgba(99, 102, 241, 0.2);
                    border-radius: 50px;
                }

                .features-title {
                    font-size: clamp(2rem, 5vw, 3rem);
                    margin-bottom: 1rem;
                }

                .features-subtitle {
                    color: var(--text-secondary);
                    max-width: 600px;
                    margin: 0 auto;
                    font-size: 1.1rem;
                }

                .features-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 2rem;
                }

                .feature-card {
                    padding: 2.5rem 2rem;
                    border-radius: 24px;
                    text-align: center;
                    cursor: default;
                    position: relative;
                    overflow: hidden;
                    height: 100%;
                    transition: box-shadow 0.3s ease;
                }

                .feature-card:hover {
                    box-shadow: 0 20px 60px rgba(99, 102, 241, 0.15);
                }

                .card-glow {
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: radial-gradient(
                        circle at 30% 30%,
                        rgba(99, 102, 241, 0.1) 0%,
                        transparent 50%
                    );
                    opacity: 0;
                    transition: opacity 0.5s ease;
                    pointer-events: none;
                }

                .feature-card:hover .card-glow {
                    opacity: 1;
                }

                .feature-icon {
                    position: relative;
                    width: 90px;
                    height: 90px;
                    margin: 0 auto 1.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .icon-bg {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(14, 165, 233, 0.1) 100%);
                    border-radius: 24px;
                    transform: rotate(45deg);
                    transition: all 0.3s ease;
                }

                .feature-card:hover .icon-bg {
                    transform: rotate(45deg) scale(1.1);
                    background: linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(14, 165, 233, 0.2) 100%);
                }

                .icon-text {
                    position: relative;
                    font-size: 2.5rem;
                    z-index: 1;
                    filter: drop-shadow(0 4px 12px rgba(99, 102, 241, 0.3));
                }

                .feature-title {
                    font-size: 1.4rem;
                    margin-bottom: 0.75rem;
                    transition: color 0.3s ease;
                }

                .feature-card:hover .feature-title {
                    color: var(--primary);
                }

                .feature-description {
                    color: var(--text-secondary);
                    line-height: 1.7;
                    font-size: 0.95rem;
                }

                .feature-arrow {
                    position: absolute;
                    bottom: 1.5rem;
                    right: 1.5rem;
                    color: var(--primary);
                    opacity: 0;
                }

                .feature-card:hover .feature-arrow {
                    opacity: 1;
                }

                @media (max-width: 768px) {
                    .features-grid {
                        gap: 1.5rem;
                    }

                    .feature-card {
                        padding: 2rem 1.5rem;
                    }

                    .feature-icon {
                        width: 70px;
                        height: 70px;
                    }

                    .icon-text {
                        font-size: 2rem;
                    }
                }
            `}</style>
        </section>
    );
};

export default Features;
