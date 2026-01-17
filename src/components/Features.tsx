import { FEATURES } from "../constants/data";

const Features = () => {
    return (
        <section style={{ padding: '8rem 2rem', background: 'var(--bg-color)' }}>
            <div className="container">
                <div className="reveal-scale" style={{ textAlign: 'center', marginBottom: '5rem' }}>
                    <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                        Why Choose <span className="text-gradient">Hexalabs</span>
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                        We combine technical excellence with business acumen to deliver solutions that drive real results.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '2.5rem'
                }}>
                    {FEATURES.map((feature, index) => (
                        <div
                            key={index}
                            className={`reveal-scale glass`}
                            style={{
                                padding: '3rem 2rem',
                                borderRadius: '24px',
                                textAlign: 'center',
                                transition: 'all 0.3s ease',
                                cursor: 'default',
                                animationDelay: `${index * 0.1}s`
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-10px)';
                                e.currentTarget.style.borderColor = 'var(--primary)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.borderColor = 'var(--glass-border)';
                            }}
                        >
                            <div style={{
                                fontSize: '4rem',
                                marginBottom: '1.5rem',
                                filter: 'drop-shadow(0 0 20px rgba(99, 102, 241, 0.3))'
                            }}>
                                {feature.icon}
                            </div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{feature.title}</h3>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
