import { motion } from "framer-motion";

const Team = () => {
    const teamMembers = [
        {
            name: "Mahesh H",
            role: "Founder & CEO",
            bio: "15+ years in enterprise IT consulting and cloud architecture",
            avatar: "👨‍💼",
            linkedin: "#",
            expertise: ["Cloud Strategy", "Leadership"]
        },
        {
            name: "Priya Sharma",
            role: "Head of Training",
            bio: "Expert instructor with certifications in AWS, Azure & GCP",
            avatar: "👩‍🏫",
            linkedin: "#",
            expertise: ["Training", "DevOps"]
        },
        {
            name: "Rajesh Kumar",
            role: "Lead Cloud Architect",
            bio: "Architected 100+ enterprise cloud migrations",
            avatar: "👨‍💻",
            linkedin: "#",
            expertise: ["AWS", "Kubernetes"]
        },
        {
            name: "Sneha Reddy",
            role: "Security Specialist",
            bio: "Cybersecurity expert with CISSP & CEH certifications",
            avatar: "👩‍🔬",
            linkedin: "#",
            expertise: ["Security", "Compliance"]
        }
    ];

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
        hidden: { opacity: 0, y: 40, scale: 0.95 },
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
        <section id="team" className="team-section">
            <div className="container">
                {/* Header */}
                <motion.div
                    className="team-header"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.span
                        className="team-badge"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        👥 Our Team
                    </motion.span>
                    <h2 className="team-title">
                        Meet The <span className="text-gradient">Experts</span>
                    </h2>
                    <p className="team-subtitle">
                        A dedicated team of professionals committed to your success
                    </p>
                </motion.div>

                {/* Team Grid */}
                <motion.div
                    className="team-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={index}
                            className="team-card glass"
                            variants={itemVariants}
                            whileHover={{ y: -10, scale: 1.02 }}
                        >
                            {/* Avatar */}
                            <motion.div
                                className="member-avatar"
                                whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                            >
                                {member.avatar}
                            </motion.div>

                            {/* Info */}
                            <h3 className="member-name">{member.name}</h3>
                            <p className="member-role">{member.role}</p>
                            <p className="member-bio">{member.bio}</p>

                            {/* Expertise Tags */}
                            <div className="member-expertise">
                                {member.expertise.map((skill, i) => (
                                    <span key={i} className="expertise-tag">{skill}</span>
                                ))}
                            </div>

                            {/* Social Links */}
                            <motion.a
                                href={member.linkedin}
                                className="linkedin-btn"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                                Connect
                            </motion.a>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            <style>{`
                .team-section {
                    padding: 8rem 2rem;
                    background: var(--bg-color);
                    position: relative;
                }

                .team-header {
                    text-align: center;
                    margin-bottom: 5rem;
                }

                .team-badge {
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

                .team-title {
                    font-size: clamp(2rem, 5vw, 3rem);
                    margin-bottom: 1rem;
                }

                .team-subtitle {
                    color: var(--text-secondary);
                    max-width: 500px;
                    margin: 0 auto;
                    font-size: 1.1rem;
                }

                .team-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
                    gap: 2rem;
                }

                .team-card {
                    padding: 2.5rem 2rem;
                    border-radius: 24px;
                    text-align: center;
                    transition: box-shadow 0.3s ease;
                }

                .team-card:hover {
                    box-shadow: 0 20px 50px rgba(99, 102, 241, 0.1);
                }

                .member-avatar {
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, var(--primary), var(--secondary));
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 3rem;
                    margin: 0 auto 1.5rem;
                    box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);
                }

                .member-name {
                    font-size: 1.3rem;
                    margin-bottom: 0.25rem;
                }

                .member-role {
                    color: var(--primary);
                    font-size: 0.95rem;
                    font-weight: 500;
                    margin-bottom: 1rem;
                }

                .member-bio {
                    color: var(--text-secondary);
                    font-size: 0.9rem;
                    line-height: 1.6;
                    margin-bottom: 1.5rem;
                }

                .member-expertise {
                    display: flex;
                    gap: 0.5rem;
                    justify-content: center;
                    flex-wrap: wrap;
                    margin-bottom: 1.5rem;
                }

                .expertise-tag {
                    font-size: 0.75rem;
                    padding: 0.3rem 0.75rem;
                    border-radius: 50px;
                    background: rgba(99, 102, 241, 0.1);
                    color: var(--primary);
                    font-weight: 500;
                }

                .linkedin-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.6rem 1.25rem;
                    border-radius: 50px;
                    background: var(--glass-bg);
                    border: 1px solid var(--glass-border);
                    color: var(--text-secondary);
                    font-size: 0.9rem;
                    font-weight: 500;
                    transition: all 0.3s ease;
                }

                .linkedin-btn:hover {
                    background: #0077b5;
                    border-color: #0077b5;
                    color: white;
                }

                @media (max-width: 768px) {
                    .team-grid {
                        grid-template-columns: 1fr;
                        max-width: 400px;
                        margin: 0 auto;
                    }
                }
            `}</style>
        </section>
    );
};

export default Team;
