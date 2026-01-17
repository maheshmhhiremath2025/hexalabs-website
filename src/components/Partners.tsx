import { motion } from "framer-motion";

const Partners = () => {
    const certifications = [
        {
            name: "AWS Partner",
            color: "#FF9900",
            logoUrl: "/logos/aws.png"
        },
        {
            name: "Microsoft Azure",
            color: "#0078D4",
            logoUrl: "/logos/azure.sv"
        },
        {
            name: "Google Cloud",
            color: "#4285F4",
            logoUrl: "/logos/google.png"
        },
        {
            name: "Kubernetes",
            color: "#326CE5",
            logoUrl: "/logos/k8s.svg"
        },
        {
            name: "Docker",
            color: "#2496ED",
            logoUrl: "/logos/docker.png"
        },
        {
            name: "Terraform",
            color: "#7B42BC",
            logoUrl: "/logos/terraform.png"
        },
        {
            name: "ISO 27001",
            color: "#10B981",
            logoUrl: null,
            icon: "✅"
        },
        {
            name: "SOC 2",
            color: "#059669",
            logoUrl: null,
            icon: "✅"
        }
    ];

    return (
        <section className="partners-section">
            <div className="container">
                {/* Header */}
                <motion.div
                    className="partners-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.span
                        className="partners-badge"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        🏆 Certifications
                    </motion.span>
                    <h2 className="partners-title">
                        Our <span className="text-gradient">Partnerships & Certifications</span>
                    </h2>
                    <p className="partners-subtitle">
                        Industry-recognized certifications and strategic partnerships
                    </p>
                </motion.div>

                {/* Certifications Grid */}
                <motion.div
                    className="certifications-grid"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {certifications.map((cert, index) => (
                        <motion.div
                            key={index}
                            className="cert-item glass"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.08 }}
                            whileHover={{
                                scale: 1.05,
                                y: -5,
                                boxShadow: `0 15px 40px ${cert.color}20`
                            }}
                        >
                            <motion.div
                                className="cert-logo"
                                whileHover={{ scale: 1.1 }}
                            >
                                {cert.logoUrl ? (
                                    <img
                                        src={cert.logoUrl}
                                        alt={cert.name}
                                        className="logo-img"
                                    />
                                ) : (
                                    <span className="logo-icon">{cert.icon}</span>
                                )}
                            </motion.div>
                            <span className="cert-name">{cert.name}</span>
                            <div
                                className="cert-indicator"
                                style={{ background: cert.color }}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            <style>{`
                .partners-section {
                    padding: 6rem 2rem;
                    background: var(--bg-elevated);
                    position: relative;
                    overflow: hidden;
                }

                .partners-header {
                    text-align: center;
                    margin-bottom: 4rem;
                }

                .partners-badge {
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

                .partners-title {
                    font-size: clamp(1.8rem, 4vw, 2.5rem);
                    margin-bottom: 1rem;
                }

                .partners-subtitle {
                    color: var(--text-secondary);
                    max-width: 500px;
                    margin: 0 auto;
                    font-size: 1rem;
                }

                .certifications-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
                    gap: 1.5rem;
                    max-width: 900px;
                    margin: 0 auto;
                }

                .cert-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 2rem 1.5rem;
                    border-radius: 20px;
                    text-align: center;
                    position: relative;
                    overflow: hidden;
                    transition: all 0.3s ease;
                    cursor: default;
                }

                .cert-logo {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 60px;
                    margin-bottom: 1rem;
                }

                .logo-img {
                    max-width: 80px;
                    max-height: 50px;
                    object-fit: contain;
                }

                .logo-icon {
                    font-size: 2.5rem;
                }

                .cert-name {
                    font-size: 0.95rem;
                    font-weight: 600;
                    color: var(--text-primary);
                }

                .cert-indicator {
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 40px;
                    height: 3px;
                    border-radius: 3px 3px 0 0;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                .cert-item:hover .cert-indicator {
                    opacity: 1;
                }

                @media (max-width: 768px) {
                    .certifications-grid {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 1rem;
                    }

                    .cert-item {
                        padding: 1.5rem 1rem;
                    }
                }
            `}</style>
        </section>
    );
};

export default Partners;
