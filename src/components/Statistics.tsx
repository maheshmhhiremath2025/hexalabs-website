const Statistics = () => {
    const stats = [
        { label: 'Projects Completed', value: '500+', icon: '🚀' },
        { label: 'Students Trained', value: '10K+', icon: '🎓' },
        { label: 'Corporate Partners', value: '50+', icon: '🏢' },
        { label: 'Tech Certifications', value: '100+', icon: '📜' }
    ];

    return (
        <section style={{ padding: '6rem 2rem', background: 'var(--bg-surface)' }}>
            <div className="container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '3rem'
                }}>
                    {stats.map((stat, index) => (
                        <div key={index} className="reveal" style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{stat.icon}</div>
                            <div style={{
                                fontSize: '3rem',
                                fontWeight: '800',
                                fontFamily: 'var(--font-heading)',
                                marginBottom: '0.5rem'
                            }} className="text-gradient">
                                {stat.value}
                            </div>
                            <div style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Statistics;
