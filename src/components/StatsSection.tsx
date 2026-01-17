import AnimatedCounter from "./AnimatedCounter";

const StatsSection = () => {
    return (
        <section style={{ padding: '6rem 2rem', background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)', position: 'relative', overflow: 'hidden' }}>
            {/* Animated background pattern */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                opacity: 0.1,
                backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                backgroundSize: '50px 50px'
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '3rem',
                    textAlign: 'center'
                }}>
                    <div className="reveal-scale">
                        <div style={{
                            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                            fontWeight: 800,
                            color: 'white',
                            marginBottom: '0.5rem',
                            fontFamily: 'var(--font-heading)'
                        }}>
                            <AnimatedCounter end={500} suffix="+" duration={2500} />
                        </div>
                        <div style={{
                            fontSize: '1.1rem',
                            color: 'rgba(255, 255, 255, 0.9)',
                            fontWeight: 500
                        }}>
                            Projects Delivered
                        </div>
                    </div>

                    <div className="reveal-scale" style={{ animationDelay: '0.15s' }}>
                        <div style={{
                            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                            fontWeight: 800,
                            color: 'white',
                            marginBottom: '0.5rem',
                            fontFamily: 'var(--font-heading)'
                        }}>
                            <AnimatedCounter end={50} suffix="+" duration={2500} />
                        </div>
                        <div style={{
                            fontSize: '1.1rem',
                            color: 'rgba(255, 255, 255, 0.9)',
                            fontWeight: 500
                        }}>
                            Enterprise Clients
                        </div>
                    </div>

                    <div className="reveal-scale" style={{ animationDelay: '0.3s' }}>
                        <div style={{
                            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                            fontWeight: 800,
                            color: 'white',
                            marginBottom: '0.5rem',
                            fontFamily: 'var(--font-heading)'
                        }}>
                            <AnimatedCounter end={10} suffix="K+" duration={2500} />
                        </div>
                        <div style={{
                            fontSize: '1.1rem',
                            color: 'rgba(255, 255, 255, 0.9)',
                            fontWeight: 500
                        }}>
                            Professionals Trained
                        </div>
                    </div>

                    <div className="reveal-scale" style={{ animationDelay: '0.45s' }}>
                        <div style={{
                            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                            fontWeight: 800,
                            color: 'white',
                            marginBottom: '0.5rem',
                            fontFamily: 'var(--font-heading)'
                        }}>
                            <AnimatedCounter end={98} suffix="%" duration={2500} />
                        </div>
                        <div style={{
                            fontSize: '1.1rem',
                            color: 'rgba(255, 255, 255, 0.9)',
                            fontWeight: 500
                        }}>
                            Client Satisfaction
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
