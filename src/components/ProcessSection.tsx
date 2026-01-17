import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ProcessSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

    const steps = [
        {
            number: "01",
            title: "Discovery & Strategy",
            description: "We begin by understanding your business goals, challenges, and vision. Our team conducts thorough research to develop a strategic roadmap tailored to your needs.",
            icon: "🔍",
            color: "#6366f1"
        },
        {
            number: "02",
            title: "Design & Planning",
            description: "Our experts create detailed blueprints and prototypes, ensuring every aspect of your solution is meticulously planned before development begins.",
            icon: "✏️",
            color: "#8b5cf6"
        },
        {
            number: "03",
            title: "Development & Implementation",
            description: "Using agile methodologies, we build your solution with best practices, ensuring scalability, security, and performance at every step.",
            icon: "⚙️",
            color: "#0ea5e9"
        },
        {
            number: "04",
            title: "Testing & Quality Assurance",
            description: "Rigorous testing ensures your solution is robust, secure, and performs flawlessly across all scenarios and platforms.",
            icon: "✅",
            color: "#10b981"
        },
        {
            number: "05",
            title: "Launch & Continuous Support",
            description: "We deploy your solution and provide ongoing support, optimization, and maintenance to ensure long-term success.",
            icon: "🚀",
            color: "#f59e0b"
        }
    ];

    return (
        <section className="process-section" ref={containerRef}>
            <div className="container">
                {/* Header */}
                <motion.div
                    className="process-header"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.span
                        className="process-badge"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        ✨ Our Process
                    </motion.span>
                    <h2 className="process-title">
                        How We <span className="text-gradient">Work</span>
                    </h2>
                    <p className="process-subtitle">
                        A proven methodology that delivers exceptional results every time
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="timeline">
                    {/* Animated progress line */}
                    <div className="timeline-track">
                        <motion.div
                            className="timeline-progress"
                            style={{ height: lineHeight }}
                        />
                    </div>

                    {/* Steps */}
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            {/* Number bubble */}
                            <motion.div
                                className="timeline-number"
                                style={{ background: `linear-gradient(135deg, ${step.color}, ${step.color}88)` }}
                                whileInView={{
                                    scale: [0, 1.2, 1],
                                }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                            >
                                <span className="number-text">{step.number}</span>
                            </motion.div>

                            {/* Content card */}
                            <motion.div
                                className="timeline-card glass"
                                whileHover={{
                                    scale: 1.02,
                                    boxShadow: `0 20px 50px ${step.color}20`
                                }}
                            >
                                <span className="card-icon" style={{ background: `${step.color}15` }}>
                                    {step.icon}
                                </span>
                                <h3 className="card-title">{step.title}</h3>
                                <p className="card-description">{step.description}</p>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <style>{`
                .process-section {
                    padding: 8rem 2rem;
                    background: var(--bg-elevated);
                    position: relative;
                    overflow: hidden;
                }

                .process-header {
                    text-align: center;
                    margin-bottom: 5rem;
                }

                .process-badge {
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

                .process-title {
                    font-size: clamp(2rem, 5vw, 3rem);
                    margin-bottom: 1rem;
                }

                .process-subtitle {
                    color: var(--text-secondary);
                    max-width: 600px;
                    margin: 0 auto;
                    font-size: 1.1rem;
                }

                .timeline {
                    position: relative;
                    max-width: 1000px;
                    margin: 0 auto;
                    padding: 2rem 0;
                }

                .timeline-track {
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 4px;
                    height: 100%;
                    background: var(--glass-border);
                    border-radius: 2px;
                }

                .timeline-progress {
                    width: 100%;
                    background: linear-gradient(180deg, var(--primary), var(--secondary));
                    border-radius: 2px;
                    box-shadow: 0 0 20px var(--primary);
                }

                .timeline-item {
                    position: relative;
                    width: 50%;
                    padding: 2rem;
                    display: flex;
                    align-items: center;
                }

                .timeline-item.left {
                    padding-right: 4rem;
                    justify-content: flex-end;
                }

                .timeline-item.right {
                    margin-left: 50%;
                    padding-left: 4rem;
                    justify-content: flex-start;
                }

                .timeline-number {
                    position: absolute;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10;
                    box-shadow: 0 8px 25px rgba(0,0,0,0.3);
                }

                .timeline-item.left .timeline-number {
                    right: -25px;
                }

                .timeline-item.right .timeline-number {
                    left: -25px;
                }

                .number-text {
                    font-size: 0.9rem;
                    font-weight: 800;
                    color: white;
                }

                .timeline-card {
                    padding: 2rem;
                    border-radius: 20px;
                    max-width: 380px;
                    transition: all 0.3s ease;
                }

                .card-icon {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 50px;
                    height: 50px;
                    border-radius: 12px;
                    font-size: 1.5rem;
                    margin-bottom: 1rem;
                }

                .card-title {
                    font-size: 1.3rem;
                    margin-bottom: 0.75rem;
                }

                .card-description {
                    color: var(--text-secondary);
                    line-height: 1.7;
                    font-size: 0.95rem;
                }

                @media (max-width: 900px) {
                    .timeline-track {
                        left: 30px;
                    }

                    .timeline-item,
                    .timeline-item.left,
                    .timeline-item.right {
                        width: 100%;
                        margin-left: 0;
                        padding-left: 80px;
                        padding-right: 0;
                        justify-content: flex-start;
                    }

                    .timeline-item.left .timeline-number,
                    .timeline-item.right .timeline-number {
                        left: 5px;
                        right: auto;
                    }

                    .timeline-card {
                        max-width: none;
                    }
                }

                @media (max-width: 600px) {
                    .timeline-item,
                    .timeline-item.left,
                    .timeline-item.right {
                        padding: 1rem;
                        padding-left: 70px;
                    }

                    .timeline-track {
                        left: 25px;
                    }

                    .timeline-number {
                        width: 40px;
                        height: 40px;
                    }

                    .timeline-card {
                        padding: 1.5rem;
                    }
                }
            `}</style>
        </section>
    );
};

export default ProcessSection;
