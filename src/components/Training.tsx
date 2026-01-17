import { COURSES } from "../constants/data";

const Training = () => {
    return (
        <>
            <section id="training" className="training-section">
                <div className="container">

                    {/* Header */}
                    <div className="training-header">
                        <div>
                            <h2 className="training-title">
                                Upskill with <span className="text-gradient">Hexalabs Training</span>
                            </h2>
                            <p className="training-subtitle">
                                Industry-aligned training programs led by expert mentors to propel your career in technology.
                            </p>
                        </div>

                        <button className="glass training-cta">
                            All Courses →
                        </button>
                    </div>

                    {/* Grid */}
                    <div className="training-grid">
                        {COURSES.map((course, index) => (
                            <div key={index} className="training-card reveal">
                                <div>
                                    <div className="training-meta">
                                        {course.level} • {course.duration}
                                    </div>

                                    <h3 className="training-card-title">
                                        {course.title}
                                    </h3>

                                    <div className="training-tags">
                                        {course.tags.map(tag => (
                                            <span key={tag} className="training-tag">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <button className="training-btn">
                                    Enroll Now
                                </button>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* ================= STYLES ================= */}
            <style>{`
                .training-section {
                    padding: 8rem 2rem;
                }

                .training-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    margin-bottom: 4rem;
                    gap: 2rem;
                    flex-wrap: wrap;
                }

                .training-title {
                    font-size: 3rem;
                    margin-bottom: 1rem;
                }

                .training-subtitle {
                    color: var(--text-secondary);
                    max-width: 520px;
                }

                .training-cta {
                    padding: 0.9rem 2.4rem;
                    border-radius: 999px;
                    font-weight: 600;
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }

                .training-cta:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 12px 30px rgba(0,0,0,0.25);
                }

                .training-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 2.5rem;
                }

                .training-card {
                    background:
                        linear-gradient(
                            180deg,
                            rgba(255,255,255,0.04),
                            rgba(255,255,255,0.01)
                        ),
                        var(--bg-elevated);
                    border-radius: 26px;
                    padding: 2.8rem;
                    border: 1px solid var(--glass-border);
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    position: relative;
                    overflow: hidden;
                    transition: transform 0.4s ease, box-shadow 0.4s ease;
                }

                .training-card::before {
                    content: "";
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(
                        600px circle at top left,
                        rgba(99,102,241,0.12),
                        transparent 40%
                    );
                    opacity: 0;
                    transition: opacity 0.4s ease;
                }

                .training-card:hover::before {
                    opacity: 1;
                }

                .training-card:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 28px 60px rgba(0,0,0,0.45);
                }

                .training-meta {
                    color: var(--primary);
                    font-weight: 600;
                    font-size: 0.85rem;
                    margin-bottom: 0.75rem;
                }

                .training-card-title {
                    font-size: 1.45rem;
                    margin-bottom: 1.8rem;
                    line-height: 1.3;
                }

                .training-tags {
                    display: flex;
                    gap: 0.6rem;
                    flex-wrap: wrap;
                    margin-bottom: 2.5rem;
                }

                .training-tag {
                    font-size: 0.75rem;
                    padding: 0.35rem 0.85rem;
                    border-radius: 999px;
                    background: rgba(255,255,255,0.06);
                    color: var(--text-secondary);
                    border: 1px solid var(--glass-border);
                }

                .training-btn {
                    width: 100%;
                    padding: 0.9rem;
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

                .training-btn::before {
                    content: "";
                    position: absolute;
                    inset: 0;
                    background: var(--primary);
                    transform: translateX(-100%);
                    transition: transform 0.4s ease;
                    z-index: -1;
                }

                .training-btn:hover::before {
                    transform: translateX(0);
                }

                .training-btn:hover {
                    color: white;
                }

                @media (max-width: 768px) {
                    .training-title {
                        font-size: 2.4rem;
                    }

                    .training-card {
                        padding: 2.2rem;
                    }
                }
            `}</style>
        </>
    );
};

export default Training;
