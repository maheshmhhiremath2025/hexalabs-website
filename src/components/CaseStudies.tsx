import { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { TiltCard } from "./animations/MotionWrapper";

interface CaseStudy {
    title: string;
    category: string;
    description: string;
    metrics: { label: string; value: string }[];
    image: string;
    color: string;
    fullDescription: string;
    challenges: string[];
    solutions: string[];
    technologies: string[];
    testimonial?: { quote: string; author: string; role: string };
}

const CaseStudies = () => {
    const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);

    const caseStudies: CaseStudy[] = [
        {
            title: "Cloud Migration for FinTech Giant",
            category: "Cloud Transformation",
            description: "Migrated legacy infrastructure to AWS, reducing operational costs by 45% and improving uptime to 99.99%.",
            metrics: [
                { label: "Cost Reduction", value: "45%" },
                { label: "Uptime", value: "99.99%" },
                { label: "Deployment Speed", value: "10x" }
            ],
            image: "🏦",
            color: "#6366f1",
            fullDescription: "A leading FinTech company was struggling with their aging on-premise infrastructure that couldn't scale to meet growing customer demands. Their systems experienced frequent downtime during peak trading hours, resulting in significant revenue loss and customer dissatisfaction.",
            challenges: [
                "Legacy monolithic architecture with 15+ years of technical debt",
                "Zero tolerance for downtime during migration",
                "Strict regulatory compliance requirements (PCI-DSS, SOX)",
                "Data migration of 50+ TB with real-time synchronization"
            ],
            solutions: [
                "Designed a phased migration strategy with blue-green deployments",
                "Implemented AWS Landing Zone with multi-account governance",
                "Built automated CI/CD pipelines with security scanning",
                "Established 24/7 monitoring with automated incident response"
            ],
            technologies: ["AWS", "Kubernetes", "Terraform", "Jenkins", "Datadog"],
            testimonial: {
                quote: "Hexalabs transformed our infrastructure completely. We went from dreading peak hours to confidently scaling to 10x our normal traffic.",
                author: "Rajiv Mehta",
                role: "CTO, FinServe Technologies"
            }
        },
        {
            title: "AI-Powered Customer Support",
            category: "AI & Machine Learning",
            description: "Implemented intelligent chatbot that handles 70% of support queries, reducing response time from hours to seconds.",
            metrics: [
                { label: "Queries Automated", value: "70%" },
                { label: "Response Time", value: "<5s" },
                { label: "Satisfaction", value: "94%" }
            ],
            image: "🤖",
            color: "#8b5cf6",
            fullDescription: "A major e-commerce platform was overwhelmed with customer support tickets, with average response times exceeding 24 hours. They needed an intelligent solution that could handle routine queries while seamlessly escalating complex issues to human agents.",
            challenges: [
                "24-hour average response time for customer queries",
                "Support team burnout with 5000+ daily tickets",
                "Inconsistent responses leading to customer frustration",
                "Multi-language support requirement (8 languages)"
            ],
            solutions: [
                "Developed custom NLP models trained on 2M+ historical tickets",
                "Built intelligent routing system with sentiment analysis",
                "Integrated with existing CRM and order management systems",
                "Created agent assist tools for complex query resolution"
            ],
            technologies: ["Python", "TensorFlow", "Azure OpenAI", "FastAPI", "Redis"],
            testimonial: {
                quote: "Our customer satisfaction scores jumped from 72% to 94% within 3 months. The AI handles routine queries instantly while our team focuses on complex issues.",
                author: "Priya Sharma",
                role: "VP Customer Experience, ShopEase"
            }
        },
        {
            title: "Enterprise DevOps Pipeline",
            category: "DevOps & Automation",
            description: "Built end-to-end CI/CD pipeline with Kubernetes, enabling 50+ daily deployments with zero downtime.",
            metrics: [
                { label: "Daily Deploys", value: "50+" },
                { label: "Downtime", value: "0%" },
                { label: "Build Time", value: "-80%" }
            ],
            image: "⚙️",
            color: "#0ea5e9",
            fullDescription: "A fast-growing SaaS company was releasing updates only once a month due to manual deployment processes. This slow cadence was hampering their ability to compete and respond to customer feedback quickly.",
            challenges: [
                "Monthly release cycles limiting market responsiveness",
                "Manual deployments taking 4+ hours with frequent failures",
                "No standardized testing or quality gates",
                "Development and operations teams working in silos"
            ],
            solutions: [
                "Implemented GitOps workflow with ArgoCD and Kubernetes",
                "Built comprehensive testing pyramid (unit, integration, E2E)",
                "Created self-service developer portal with golden paths",
                "Established platform engineering team and practices"
            ],
            technologies: ["Kubernetes", "ArgoCD", "GitHub Actions", "Helm", "Prometheus"],
            testimonial: {
                quote: "We went from monthly releases to deploying 50+ times a day. Our developers are happier, and we can respond to market changes in hours, not weeks.",
                author: "Amit Kumar",
                role: "Engineering Director, CloudFlow"
            }
        },
        {
            title: "Cybersecurity Overhaul",
            category: "Security",
            description: "Comprehensive security audit and implementation for a healthcare provider, achieving HIPAA compliance.",
            metrics: [
                { label: "Vulnerabilities Fixed", value: "200+" },
                { label: "Compliance", value: "HIPAA" },
                { label: "Incidents", value: "0" }
            ],
            image: "🛡️",
            color: "#10b981",
            fullDescription: "A regional healthcare provider faced a critical security audit that revealed significant vulnerabilities. With patient data at risk and regulatory penalties looming, they needed a comprehensive security transformation.",
            challenges: [
                "200+ critical vulnerabilities identified in initial audit",
                "No centralized security monitoring or incident response",
                "Outdated access control with shared credentials",
                "HIPAA compliance deadline in 6 months"
            ],
            solutions: [
                "Implemented Zero Trust architecture with identity-first security",
                "Deployed 24/7 SOC with SIEM and automated threat response",
                "Established comprehensive data protection and encryption",
                "Created security awareness training program for all staff"
            ],
            technologies: ["CrowdStrike", "Splunk", "Okta", "Vault", "Prisma Cloud"],
            testimonial: {
                quote: "Hexalabs not only helped us achieve HIPAA compliance but transformed our entire security posture. We've had zero security incidents since implementation.",
                author: "Dr. Sarah Chen",
                role: "CISO, MedCare Regional"
            }
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94] as const
            }
        }
    };

    return (
        <section id="case-studies" className="case-studies-section">
            <div className="container">
                {/* Header */}
                <motion.div
                    className="case-studies-header"
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
                        📊 Success Stories
                    </motion.span>
                    <h2 className="case-studies-title">
                        Our <span className="text-gradient">Case Studies</span>
                    </h2>
                    <p className="case-studies-subtitle">
                        Real-world solutions that delivered measurable business impact
                    </p>
                </motion.div>

                {/* Case Studies Grid */}
                <motion.div
                    className="case-studies-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {caseStudies.map((study, index) => (
                        <motion.div key={index} variants={itemVariants}>
                            <TiltCard maxTilt={5}>
                                <motion.div
                                    className="case-study-card glass"
                                    whileHover={{ y: -8 }}
                                >
                                    <span
                                        className="category-badge"
                                        style={{ background: `${study.color}20`, color: study.color }}
                                    >
                                        {study.category}
                                    </span>

                                    <motion.div
                                        className="study-icon"
                                        style={{ background: `${study.color}15` }}
                                        whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                                    >
                                        {study.image}
                                    </motion.div>

                                    <h3 className="study-title">{study.title}</h3>
                                    <p className="study-description">{study.description}</p>

                                    <div className="study-metrics">
                                        {study.metrics.map((metric, i) => (
                                            <div key={i} className="metric">
                                                <span className="metric-value" style={{ color: study.color }}>
                                                    {metric.value}
                                                </span>
                                                <span className="metric-label">{metric.label}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <motion.button
                                        className="view-case-btn"
                                        style={{ borderColor: study.color, color: study.color }}
                                        whileHover={{
                                            background: study.color,
                                            color: 'white'
                                        }}
                                        onClick={() => setSelectedStudy(study)}
                                    >
                                        View Case Study →
                                    </motion.button>
                                </motion.div>
                            </TiltCard>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedStudy && (
                    <motion.div
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedStudy(null)}
                    >
                        <motion.div
                            className="modal-content glass"
                            initial={{ opacity: 0, scale: 0.9, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 50 }}
                            transition={{ duration: 0.3 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                className="modal-close"
                                onClick={() => setSelectedStudy(null)}
                            >
                                ✕
                            </button>

                            {/* Modal Header */}
                            <div className="modal-header">
                                <span
                                    className="modal-category"
                                    style={{ background: `${selectedStudy.color}20`, color: selectedStudy.color }}
                                >
                                    {selectedStudy.category}
                                </span>
                                <div className="modal-icon" style={{ background: `${selectedStudy.color}15` }}>
                                    {selectedStudy.image}
                                </div>
                                <h2>{selectedStudy.title}</h2>
                            </div>

                            {/* Metrics Bar */}
                            <div className="modal-metrics">
                                {selectedStudy.metrics.map((metric, i) => (
                                    <div key={i} className="modal-metric">
                                        <span className="modal-metric-value" style={{ color: selectedStudy.color }}>
                                            {metric.value}
                                        </span>
                                        <span className="modal-metric-label">{metric.label}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Content */}
                            <div className="modal-body">
                                <div className="modal-section">
                                    <h3>Overview</h3>
                                    <p>{selectedStudy.fullDescription}</p>
                                </div>

                                <div className="modal-two-col">
                                    <div className="modal-section">
                                        <h3>🎯 Challenges</h3>
                                        <ul>
                                            {selectedStudy.challenges.map((challenge, i) => (
                                                <li key={i}>{challenge}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="modal-section">
                                        <h3>💡 Solutions</h3>
                                        <ul>
                                            {selectedStudy.solutions.map((solution, i) => (
                                                <li key={i}>{solution}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="modal-section">
                                    <h3>🛠️ Technologies Used</h3>
                                    <div className="tech-tags">
                                        {selectedStudy.technologies.map((tech, i) => (
                                            <span key={i} className="tech-tag" style={{ borderColor: selectedStudy.color }}>
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {selectedStudy.testimonial && (
                                    <div className="modal-testimonial" style={{ borderColor: selectedStudy.color }}>
                                        <p>"{selectedStudy.testimonial.quote}"</p>
                                        <div className="testimonial-author">
                                            <strong>{selectedStudy.testimonial.author}</strong>
                                            <span>{selectedStudy.testimonial.role}</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* CTA */}
                            <div className="modal-cta">
                                <motion.button
                                    className="cta-btn"
                                    style={{ background: selectedStudy.color }}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => window.location.href = '#contact'}
                                >
                                    Discuss Your Project
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                .case-studies-section {
                    padding: 8rem 2rem;
                    background: var(--bg-surface);
                    position: relative;
                    overflow: hidden;
                }

                .case-studies-header {
                    text-align: center;
                    margin-bottom: 5rem;
                }

                .section-badge {
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

                .case-studies-title {
                    font-size: clamp(2rem, 5vw, 3rem);
                    margin-bottom: 1rem;
                }

                .case-studies-subtitle {
                    color: var(--text-secondary);
                    max-width: 600px;
                    margin: 0 auto;
                    font-size: 1.1rem;
                }

                .case-studies-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
                    gap: 2rem;
                }

                .case-study-card {
                    padding: 2rem;
                    border-radius: 24px;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    transition: box-shadow 0.3s ease;
                }

                .case-study-card:hover {
                    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
                }

                .category-badge {
                    display: inline-block;
                    font-size: 0.75rem;
                    font-weight: 600;
                    padding: 0.35rem 0.75rem;
                    border-radius: 50px;
                    width: fit-content;
                    margin-bottom: 1.5rem;
                }

                .study-icon {
                    width: 70px;
                    height: 70px;
                    border-radius: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 2rem;
                    margin-bottom: 1.5rem;
                }

                .study-title {
                    font-size: 1.3rem;
                    margin-bottom: 0.75rem;
                    line-height: 1.3;
                }

                .study-description {
                    color: var(--text-secondary);
                    font-size: 0.95rem;
                    line-height: 1.7;
                    margin-bottom: 1.5rem;
                    flex: 1;
                }

                .study-metrics {
                    display: flex;
                    gap: 1.5rem;
                    margin-bottom: 1.5rem;
                    padding: 1rem 0;
                    border-top: 1px solid var(--glass-border);
                    border-bottom: 1px solid var(--glass-border);
                }

                .metric {
                    display: flex;
                    flex-direction: column;
                    gap: 0.25rem;
                }

                .metric-value {
                    font-size: 1.25rem;
                    font-weight: 700;
                }

                .metric-label {
                    font-size: 0.75rem;
                    color: var(--text-muted);
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }

                .view-case-btn {
                    width: 100%;
                    padding: 0.9rem;
                    border-radius: 12px;
                    background: transparent;
                    border: 1px solid;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                /* Modal Styles */
                .modal-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.8);
                    backdrop-filter: blur(10px);
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 2rem;
                    overflow-y: auto;
                }

                .modal-content {
                    width: 100%;
                    max-width: 800px;
                    max-height: 90vh;
                    overflow-y: auto;
                    border-radius: 24px;
                    padding: 2.5rem;
                    position: relative;
                    background: var(--bg-elevated);
                    border: 1px solid var(--glass-border);
                }

                .modal-close {
                    position: absolute;
                    top: 1.5rem;
                    right: 1.5rem;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: var(--glass-bg);
                    border: 1px solid var(--glass-border);
                    color: var(--text-primary);
                    font-size: 1.2rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .modal-close:hover {
                    background: var(--primary);
                    color: white;
                }

                .modal-header {
                    text-align: center;
                    margin-bottom: 2rem;
                }

                .modal-category {
                    display: inline-block;
                    font-size: 0.8rem;
                    font-weight: 600;
                    padding: 0.4rem 1rem;
                    border-radius: 50px;
                    margin-bottom: 1rem;
                }

                .modal-icon {
                    width: 80px;
                    height: 80px;
                    border-radius: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 2.5rem;
                    margin: 0 auto 1rem;
                }

                .modal-header h2 {
                    font-size: 1.8rem;
                }

                .modal-metrics {
                    display: flex;
                    justify-content: center;
                    gap: 3rem;
                    padding: 1.5rem;
                    background: var(--glass-bg);
                    border-radius: 16px;
                    margin-bottom: 2rem;
                }

                .modal-metric {
                    text-align: center;
                }

                .modal-metric-value {
                    display: block;
                    font-size: 2rem;
                    font-weight: 800;
                }

                .modal-metric-label {
                    font-size: 0.8rem;
                    color: var(--text-muted);
                    text-transform: uppercase;
                }

                .modal-body {
                    margin-bottom: 2rem;
                }

                .modal-section {
                    margin-bottom: 2rem;
                }

                .modal-section h3 {
                    font-size: 1.1rem;
                    margin-bottom: 0.75rem;
                    color: var(--text-primary);
                }

                .modal-section p {
                    color: var(--text-secondary);
                    line-height: 1.8;
                }

                .modal-section ul {
                    list-style: none;
                    padding: 0;
                }

                .modal-section li {
                    color: var(--text-secondary);
                    padding: 0.5rem 0;
                    padding-left: 1.5rem;
                    position: relative;
                    line-height: 1.6;
                }

                .modal-section li::before {
                    content: "→";
                    position: absolute;
                    left: 0;
                    color: var(--primary);
                }

                .modal-two-col {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 2rem;
                }

                .tech-tags {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.75rem;
                }

                .tech-tag {
                    padding: 0.4rem 1rem;
                    border-radius: 50px;
                    border: 1px solid;
                    font-size: 0.85rem;
                    font-weight: 500;
                }

                .modal-testimonial {
                    padding: 1.5rem;
                    border-left: 4px solid;
                    background: var(--glass-bg);
                    border-radius: 0 16px 16px 0;
                    margin-top: 2rem;
                }

                .modal-testimonial p {
                    font-style: italic;
                    color: var(--text-secondary);
                    margin-bottom: 1rem;
                    line-height: 1.7;
                }

                .testimonial-author {
                    display: flex;
                    flex-direction: column;
                    gap: 0.25rem;
                }

                .testimonial-author strong {
                    color: var(--text-primary);
                }

                .testimonial-author span {
                    font-size: 0.9rem;
                    color: var(--text-muted);
                }

                .modal-cta {
                    text-align: center;
                }

                .cta-btn {
                    padding: 1rem 3rem;
                    border-radius: 12px;
                    border: none;
                    color: white;
                    font-weight: 600;
                    font-size: 1rem;
                    cursor: pointer;
                }

                @media (max-width: 768px) {
                    .case-studies-grid {
                        grid-template-columns: 1fr;
                    }

                    .study-metrics {
                        flex-wrap: wrap;
                        gap: 1rem;
                    }

                    .modal-content {
                        padding: 1.5rem;
                    }

                    .modal-two-col {
                        grid-template-columns: 1fr;
                    }

                    .modal-metrics {
                        flex-wrap: wrap;
                        gap: 1.5rem;
                    }
                }
            `}</style>
        </section>
    );
};

export default CaseStudies;
