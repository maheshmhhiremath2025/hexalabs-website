import { SERVICES } from "../constants/data";

const Services = () => {
    return (
        <section id="services" style={{ padding: '8rem 2rem', backgroundColor: 'var(--bg-surface)' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                    <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Our <span className="text-gradient">Professional Services</span></h2>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                        Tailored IT solutions designed to drive growth, efficiency, and competitive advantage.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2.5rem'
                }}>
                    {SERVICES.map((service, index) => (
                        <div
                            key={index}
                            id={service.title.toLowerCase().replace(/\s+/g, '-')}
                            className="reveal glass card-hover"
                            style={{
                                padding: '3rem 2rem',
                                borderRadius: '24px',
                                cursor: 'default',
                                scrollMarginTop: '100px' // Offset for sticky header
                            }}
                        >
                            <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>{service.icon}</div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{service.title}</h3>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
