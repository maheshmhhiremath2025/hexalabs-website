const testimonials = [
    {
        name: 'Sarah Chen',
        role: 'CTO at TechFlow',
        content: 'Hexalabs transformed our legacy infrastructure into a cloud-native powerhouse. Their expertise in DevOps is unmatched.',
        avatar: '👩‍💻'
    },
    {
        name: 'James Wilson',
        role: 'Senior Developer',
        content: 'The Full Stack Boot Camp was life-changing. I went from basics to building complex applications in 12 weeks.',
        avatar: '👨‍💻'
    },
    {
        name: 'Elena Rodriguez',
        role: 'HR Director at GlobalIT',
        content: 'Their corporate training programs have significantly boosted our team productivity and moral. Highly recommended.',
        avatar: '👩‍💼'
    }
];

const Testimonials = () => {
    return (
        <section id="testimonials" style={{ padding: '8rem 2rem' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                    <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Voice of Our <span className="text-gradient">Success Stories</span></h2>
                    <p style={{ color: 'var(--text-secondary)' }}>Don't just take our word for it — hear from our clients and students.</p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem'
                }}>
                    {testimonials.map((t, i) => (
                        <div key={i} className="glass card-hover" style={{
                            padding: '3rem 2rem',
                            borderRadius: '24px',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <div style={{
                                position: 'absolute',
                                top: '1rem',
                                right: '2rem',
                                fontSize: '5rem',
                                opacity: 0.05,
                                fontFamily: 'serif'
                            }}>“</div>
                            <p style={{
                                fontSize: '1.1rem',
                                lineHeight: 1.8,
                                color: 'var(--text-secondary)',
                                marginBottom: '2rem',
                                position: 'relative'
                            }}>
                                {t.content}
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                    background: 'var(--glass-bg)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.5rem',
                                    border: '1px solid var(--glass-border)'
                                }}>
                                    {t.avatar}
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '1.1rem' }}>{t.name}</h4>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{t.role}</p>
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
