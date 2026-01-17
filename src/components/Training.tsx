import { motion } from "framer-motion";
import { COURSES } from "../constants/data";
import { TiltCard } from "./animations/MotionWrapper";

const Training = () => {
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
        <>
            <section id="training" className="training-section">
                <div className="container">

                    {/* Header */}
                    <motion.div
                        className="training-header"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div>
                            <motion.span
                                className="training-badge"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                            >
                                📚 Expert Training
                            </motion.span>
                            <h2 className="training-title">
                                Upskill with <span className="text-gradient">Hexalabs Training</span>
                            </h2>
                            <p className="training-subtitle">
                                Industry-aligned training programs led by expert mentors to propel your career in technology.
                            </p>
                        </div>

                        <motion.button
                            className="glass training-cta"
                            whileHover={{ scale: 1.05, y: -3 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            All Courses
                            <motion.svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                style={{ marginLeft: '0.5rem' }}
                            >
                                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </motion.svg>
                        </motion.button>
                    </motion.div>

                    {/* Courses Grid */}
                    <motion.div
                        className="training-grid"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        {COURSES.map((course, index) => (
                            <motion.div key={index} variants={itemVariants}>
                                <TiltCard maxTilt={6}>
                                    <motion.div
                                        className="training-card"
                                        whileHover={{ y: -8 }}
                                    >
                                        {/* Card glow */}
                                        <div className="card-glow" />

                                        <div>
                                            <motion.div
                                                className="training-meta"
                                                initial={{ opacity: 0 }}
                                                whileInView={{ opacity: 1 }}
                                                viewport={{ once: true }}
                                            >
                                                <span className="level-badge">{course.level}</span>
                                                <span className="duration">{course.duration}</span>
                                            </motion.div>

                                            <h3 className="training-card-title">
                                                {course.title}
                                            </h3>

                                            <div className="training-tags">
                                                {course.tags.map((tag, i) => (
                                                    <motion.span
                                                        key={tag}
                                                        className="training-tag"
                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                        whileInView={{ opacity: 1, scale: 1 }}
                                                        viewport={{ once: true }}
                                                        transition={{ delay: i * 0.1 }}
                                                        whileHover={{ scale: 1.1 }}
                                                    >
                                                        {tag}
                                                    </motion.span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Enroll Button */}
                                        <motion.button
                                            className="training-btn"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => {
                                                const subject = `Training Enrollment Request - ${course.title}`;
                                                const body =
                                                    `Hello Hexalabs Team,\n\n` +
                                                    `I am interested in enrolling in the following course:\n\n` +
                                                    `Course Name: ${course.title}\n` +
                                                    `Level: ${course.level}\n` +
                                                    `Duration: ${course.duration}\n\n` +
                                                    `Please contact me with further details.\n\n` +
                                                    `Regards,\n`;

                                                window.location.href =
                                                    `mailto:labs@hexalabs.online` +
                                                    `?subject=${encodeURIComponent(subject)}` +
                                                    `&body=${encodeURIComponent(body)}`;
                                            }}
                                        >
                                            <span className="btn-text">Enroll Now</span>
                                            <span className="btn-bg" />
                                        </motion.button>
                                    </motion.div>
                                </TiltCard>
                            </motion.div>
                        ))}
                    </motion.div>

                </div>
            </section>

            {/* ================= STYLES ================= */}
            <style>{`
                .training-section {
                    padding: 8rem 2rem;
                    background: var(--bg-color);
                    position: relative;
                    overflow: hidden;
                }

                .training-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    margin-bottom: 4rem;
                    gap: 2rem;
                    flex-wrap: wrap;
                }

                .training-badge {
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

                .training-title {
                    font-size: clamp(2rem, 5vw, 3rem);
                    margin-bottom: 1rem;
                }

                .training-subtitle {
                    color: var(--text-secondary);
                    max-width: 520px;
                }

                .training-cta {
                    padding: 0.9rem 2rem;
                    border-radius: 999px;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    transition: all 0.3s ease;
                }

                .training-cta:hover {
                    box-shadow: 0 12px 30px rgba(0,0,0,0.25);
                }

                .training-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 2rem;
                }

                .training-card {
                    background:
                        linear-gradient(
                            180deg,
                            rgba(255,255,255,0.04),
                            rgba(255,255,255,0.01)
                        ),
                        var(--bg-elevated);
                    border-radius: 24px;
                    padding: 2.5rem;
                    border: 1px solid var(--glass-border);
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    position: relative;
                    overflow: hidden;
                    transition: box-shadow 0.4s ease;
                    height: 100%;
                }

                .training-card:hover {
                    box-shadow: 0 25px 60px rgba(99, 102, 241, 0.12);
                }

                .card-glow {
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: radial-gradient(
                        600px circle at top left,
                        rgba(99, 102, 241, 0.12),
                        transparent 40%
                    );
                    opacity: 0;
                    transition: opacity 0.4s ease;
                }

                .training-card:hover .card-glow {
                    opacity: 1;
                }

                .training-meta {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    margin-bottom: 1rem;
                }

                .level-badge {
                    font-size: 0.8rem;
                    font-weight: 600;
                    color: var(--primary);
                    padding: 0.35rem 0.75rem;
                    background: rgba(99, 102, 241, 0.15);
                    border-radius: 50px;
                }

                .duration {
                    font-size: 0.85rem;
                    color: var(--text-muted);
                }

                .training-card-title {
                    font-size: 1.4rem;
                    margin-bottom: 1.5rem;
                    line-height: 1.3;
                }

                .training-tags {
                    display: flex;
                    gap: 0.5rem;
                    flex-wrap: wrap;
                    margin-bottom: 2rem;
                }

                .training-tag {
                    font-size: 0.75rem;
                    padding: 0.35rem 0.85rem;
                    border-radius: 999px;
                    background: rgba(255,255,255,0.06);
                    color: var(--text-secondary);
                    border: 1px solid var(--glass-border);
                    transition: all 0.3s ease;
                    cursor: default;
                }

                .training-tag:hover {
                    background: rgba(99, 102, 241, 0.15);
                    border-color: var(--primary);
                    color: var(--primary);
                }

                .training-btn {
                    width: 100%;
                    padding: 1rem;
                    border-radius: 14px;
                    background: transparent;
                    border: 1px solid var(--primary);
                    color: var(--primary);
                    font-weight: 600;
                    cursor: pointer;
                    position: relative;
                    overflow: hidden;
                    transition: color 0.3s ease;
                }

                .btn-text {
                    position: relative;
                    z-index: 1;
                }

                .btn-bg {
                    position: absolute;
                    inset: 0;
                    background: var(--primary);
                    transform: scaleX(0);
                    transform-origin: left;
                    transition: transform 0.4s ease;
                    z-index: 0;
                }

                .training-btn:hover .btn-bg {
                    transform: scaleX(1);
                }

                .training-btn:hover {
                    color: white;
                }

                @media (max-width: 768px) {
                    .training-title {
                        font-size: 2rem;
                    }

                    .training-card {
                        padding: 2rem;
                    }

                    .training-header {
                        flex-direction: column;
                        align-items: flex-start;
                    }
                }
            `}</style>
        </>
    );
};

export default Training;
