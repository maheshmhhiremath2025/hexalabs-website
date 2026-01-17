import { TESTIMONIALS } from "../constants/data";

const Testimonials = () => {
    return (
        <section style={{ padding: '8rem 2rem', background: 'var(--bg-surface)' }}>
            <div className="container">
                <div className="reveal" style={{ textAlign: 'center', marginBottom: '5rem' }}>
                    <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                        What Our <span className="text-gradient">Clients Say</span>
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                        Don't just take our word for it. Here's what industry leaders have to say about working with Hexalabs.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '2.5rem'
                }}>
                    {TESTIMONIALS.map((testimonial, index) => (
                        <div
                            key={index}
                            className="reveal-scale glass card-hover"
                            style={{
                                padding: '2.5rem',
                                borderRadius: '24px',
                                animationDelay: `${index * 0.15}s`,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1.5rem'
                            }}
                        >
                            {/* Rating Stars */}
                            <div style={{ display: 'flex', gap: '0.25rem', fontSize: '1.2rem' }}>
                                {Array.from({ length: testimonial.rating }).map((_, i) => (
                                    <span key={i} style={{ color: '#fbbf24' }}>⭐</span>
                                ))}
                            </div>

                            {/* Content */}
                            <p style={{
                                color: 'var(--text-secondary)',
                                lineHeight: 1.8,
                                fontSize: '1rem',
                                fontStyle: 'italic',
                                flex: 1
                            }}>
                                "{testimonial.content}"
                            </p>

                            {/* Author */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--glass-border)' }}>
                                <div style={{
                                    fontSize: '3rem',
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '50%',
                                    background: 'var(--glass-bg)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    {testimonial.avatar}
                                </div>
                                <div>
                                    <div style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '0.25rem' }}>
                                        {testimonial.name}
                                    </div>
                                    <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                        {testimonial.role}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
