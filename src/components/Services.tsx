import { motion } from "framer-motion";
import { SERVICES } from "../constants/data";
import { TiltCard } from "./animations/MotionWrapper";

const Services = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94] as const
            }
        }
    };

    return (
        <section id="services" className="services-section">
            {/* Background decorations */}
            <div className="services-bg">
                <motion.div
                    className="bg-orb orb-1"
                    animate={{
                        x: [0, 50, 0],
                        y: [0, -30, 0],
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="bg-orb orb-2"
                    animate={{
                        x: [0, -40, 0],
                        y: [0, 40, 0],
                    }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                />
            </div>

            <div className="container">
                {/* Header */}
                <motion.div
                    className="services-header"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.span
                        className="services-badge"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        🚀 Our Expertise
                    </motion.span>
                    <h2 className="services-title">
                        Our <span className="text-gradient">Professional Services</span>
                    </h2>
                    <p className="services-subtitle">
                        Tailored IT solutions designed to drive growth, efficiency, and competitive advantage.
                    </p>
                </motion.div>

                {/* Services Grid */}
                <motion.div
                    className="services-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {SERVICES.map((service, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                        >
                            <TiltCard maxTilt={6}>
                                <motion.div
                                    id={service.title.toLowerCase().replace(/\s+/g, '-')}
                                    className="service-card glass"
                                    style={{ scrollMarginTop: '100px' }}
                                    whileHover={{
                                        y: -8,
                                        transition: { duration: 0.3 }
                                    }}
                                >
                                    {/* Animated border gradient */}
                                    <div className="card-border" />

                                    {/* Icon container */}
                                    <motion.div
                                        className="service-icon"
                                        whileHover={{
                                            scale: 1.15,
                                            rotate: [0, -5, 5, 0],
                                        }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <span className="icon-glow" />
                                        {service.icon}
                                    </motion.div>

                                    {/* Content */}
                                    <h3 className="service-title">{service.title}</h3>
                                    <p className="service-description">{service.description}</p>

                                    {/* Learn more link */}
                                    <motion.a
                                        href={`#${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                                        className="service-link"
                                        whileHover={{ x: 5 }}
                                    >
                                        Learn more
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </motion.a>
                                </motion.div>
                            </TiltCard>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            <style>{`
                .services-section {
                    padding: 8rem 2rem;
                    background: var(--bg-surface);
                    position: relative;
                    overflow: hidden;
                }

                .services-bg {
                    position: absolute;
                    inset: 0;
                    pointer-events: none;
                    overflow: hidden;
                }

                .bg-orb {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(100px);
                    opacity: 0.15;
                }

                .orb-1 {
                    width: 500px;
                    height: 500px;
                    background: var(--primary);
                    top: -10%;
                    right: -10%;
                }

                .orb-2 {
                    width: 400px;
                    height: 400px;
                    background: var(--secondary);
                    bottom: -10%;
                    left: -10%;
                }

                .services-header {
                    text-align: center;
                    margin-bottom: 5rem;
                }

                .services-badge {
                    display: inline-block;
                    font-size: 0.9rem;
                    color: var(--primary);
                    font-weight: 600;
                    margin-bottom: 1rem;
                    padding: 0.5rem 1.25rem;
                    background: rgba(99, 102, 241, 0.1);
                    border: 1px solid rgba(99, 102, 241, 0.2);
                    border-radius: 50px;
                }

                .services-title {
                    font-size: clamp(2rem, 5vw, 3rem);
                    margin-bottom: 1rem;
                }

                .services-subtitle {
                    color: var(--text-secondary);
                    max-width: 600px;
                    margin: 0 auto;
                    font-size: 1.1rem;
                }

                .services-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 2rem;
                }

                .service-card {
                    padding: 2.5rem 2rem;
                    border-radius: 24px;
                    cursor: default;
                    position: relative;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    transition: box-shadow 0.4s ease;
                }

                .service-card:hover {
                    box-shadow: 0 25px 70px rgba(99, 102, 241, 0.12);
                }

                .card-border {
                    position: absolute;
                    inset: 0;
                    border-radius: 24px;
                    padding: 1px;
                    background: linear-gradient(135deg, transparent 0%, transparent 40%, var(--primary) 50%, transparent 60%, transparent 100%);
                    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                    -webkit-mask-composite: xor;
                    mask-composite: exclude;
                    opacity: 0;
                    transition: opacity 0.4s ease;
                }

                .service-card:hover .card-border {
                    opacity: 1;
                    animation: borderRotate 3s linear infinite;
                }

                @keyframes borderRotate {
                    from { filter: hue-rotate(0deg); }
                    to { filter: hue-rotate(360deg); }
                }

                .service-icon {
                    position: relative;
                    font-size: 3rem;
                    margin-bottom: 1.5rem;
                    width: fit-content;
                }

                .icon-glow {
                    position: absolute;
                    inset: -15px;
                    background: radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%);
                    opacity: 0;
                    transition: opacity 0.3s ease;
                    border-radius: 50%;
                }

                .service-card:hover .icon-glow {
                    opacity: 1;
                }

                .service-title {
                    font-size: 1.4rem;
                    margin-bottom: 0.75rem;
                    transition: color 0.3s ease;
                }

                .service-card:hover .service-title {
                    color: var(--primary);
                }

                .service-description {
                    color: var(--text-secondary);
                    line-height: 1.7;
                    flex: 1;
                    margin-bottom: 1.5rem;
                }

                .service-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--primary);
                    font-weight: 600;
                    font-size: 0.95rem;
                    opacity: 0;
                    transform: translateY(10px);
                    transition: all 0.3s ease;
                }

                .service-card:hover .service-link {
                    opacity: 1;
                    transform: translateY(0);
                }

                .service-link:hover {
                    gap: 0.75rem;
                }

                @media (max-width: 768px) {
                    .services-grid {
                        gap: 1.5rem;
                    }

                    .service-card {
                        padding: 2rem 1.5rem;
                    }

                    .service-link {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </section>
    );
};

export default Services;
