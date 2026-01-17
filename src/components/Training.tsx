import { COURSES } from "../constants/data";

const Training = () => {
    return (
        <section id="training" style={{ padding: '8rem 2rem' }}>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem', gap: '2rem', flexWrap: 'wrap' }}>
                    <div>
                        <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Upskill with <span className="text-gradient">Hexalabs Training</span></h2>
                        <p style={{ color: 'var(--text-secondary)', maxWidth: '500px' }}>
                            Industry-aligned training programs led by expert mentors to propel your career in technology.
                        </p>
                    </div>
                    <button className="glass" style={{ padding: '0.8rem 2rem', borderRadius: '50px', fontWeight: '600' }}>
                        All Courses →
                    </button>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '2rem'
                }}>
                    {COURSES.map((course, index) => (
                        <div key={index} className="reveal card-hover" style={{
                            backgroundColor: 'var(--bg-elevated)',
                            borderRadius: '24px',
                            padding: '2.5rem',
                            border: '1px solid var(--glass-border)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                        }}
                        >
                            <div>
                                <div style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{course.level} • {course.duration}</div>
                                <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', lineHeight: 1.3 }}>{course.title}</h3>
                                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                                    {course.tags.map(tag => (
                                        <span key={tag} style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.05)', padding: '0.3rem 0.8rem', borderRadius: '4px', color: 'var(--text-secondary)' }}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <button style={{
                                width: '100%',
                                padding: '0.8rem',
                                borderRadius: '12px',
                                background: 'transparent',
                                border: '1px solid var(--primary)',
                                color: 'var(--primary)',
                                fontWeight: '600',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = 'var(--primary)';
                                    e.currentTarget.style.color = 'white';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                    e.currentTarget.style.color = 'var(--primary)';
                                }}
                            >
                                Enroll Now
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Training;
