import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TESTIMONIALS } from "../constants/data";

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // Auto-play carousel
    useEffect(() => {
        const interval = setInterval(() => {
            setDirection(1);
            setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0,
            scale: 0.9,
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94] as const
            }
        },
        exit: (direction: number) => ({
            x: direction > 0 ? -300 : 300,
            opacity: 0,
            scale: 0.9,
            transition: {
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94] as const
            }
        })
    };

    const goToSlide = (index: number) => {
        setDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
    };

    const nextSlide = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    };

    const prevSlide = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
    };

    return (
        <section className="testimonials-section">
            <div className="container">
                {/* Header */}
                <motion.div
                    className="testimonials-header"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.span
                        className="section-label"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        ✨ Testimonials
                    </motion.span>
                    <h2 className="section-title">
                        What Our <span className="text-gradient">Clients Say</span>
                    </h2>
                    <p className="section-subtitle">
                        Don't just take our word for it. Here's what industry leaders have to say about working with Hexalabs.
                    </p>
                </motion.div>

                {/* Carousel Container */}
                <div className="carousel-wrapper" ref={containerRef}>
                    {/* Navigation Arrows */}
                    <motion.button
                        className="carousel-arrow carousel-arrow-left"
                        onClick={prevSlide}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </motion.button>

                    <motion.button
                        className="carousel-arrow carousel-arrow-right"
                        onClick={nextSlide}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </motion.button>

                    {/* Carousel Track */}
                    <div className="carousel-track">
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={currentIndex}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="testimonial-card glass"
                            >
                                {/* Quote Icon */}
                                <div className="quote-icon">
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                    </svg>
                                </div>

                                {/* Rating Stars */}
                                <motion.div
                                    className="rating-stars"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    {Array.from({ length: TESTIMONIALS[currentIndex].rating }).map((_, i) => (
                                        <motion.span
                                            key={i}
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.3 + i * 0.1 }}
                                            className="star"
                                        >
                                            ⭐
                                        </motion.span>
                                    ))}
                                </motion.div>

                                {/* Content */}
                                <motion.p
                                    className="testimonial-content"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    "{TESTIMONIALS[currentIndex].content}"
                                </motion.p>

                                {/* Author */}
                                <motion.div
                                    className="testimonial-author"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <div className="author-avatar">
                                        {TESTIMONIALS[currentIndex].avatar}
                                    </div>
                                    <div className="author-info">
                                        <div className="author-name">
                                            {TESTIMONIALS[currentIndex].name}
                                        </div>
                                        <div className="author-role">
                                            {TESTIMONIALS[currentIndex].role}
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Indicators */}
                    <div className="carousel-indicators">
                        {TESTIMONIALS.map((_, index) => (
                            <motion.button
                                key={index}
                                className={`indicator ${index === currentIndex ? 'active' : ''}`}
                                onClick={() => goToSlide(index)}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
                .testimonials-section {
                    padding: 8rem 2rem;
                    background: var(--bg-surface);
                    position: relative;
                    overflow: hidden;
                }

                .testimonials-header {
                    text-align: center;
                    margin-bottom: 4rem;
                }

                .section-label {
                    display: inline-block;
                    font-size: 0.9rem;
                    color: var(--primary);
                    font-weight: 600;
                    letter-spacing: 0.05em;
                    margin-bottom: 1rem;
                    padding: 0.5rem 1rem;
                    background: rgba(99, 102, 241, 0.1);
                    border-radius: 50px;
                }

                .section-title {
                    font-size: clamp(2rem, 5vw, 3rem);
                    margin-bottom: 1rem;
                }

                .section-subtitle {
                    color: var(--text-secondary);
                    max-width: 600px;
                    margin: 0 auto;
                    font-size: 1.1rem;
                }

                .carousel-wrapper {
                    position: relative;
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 0 60px;
                }

                .carousel-arrow {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background: var(--glass-bg);
                    border: 1px solid var(--glass-border);
                    color: var(--text-primary);
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10;
                    transition: all 0.3s ease;
                }

                .carousel-arrow:hover {
                    background: var(--primary);
                    border-color: var(--primary);
                    color: white;
                }

                .carousel-arrow-left {
                    left: 0;
                }

                .carousel-arrow-right {
                    right: 0;
                }

                .carousel-track {
                    overflow: hidden;
                    min-height: 400px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .testimonial-card {
                    padding: 3rem;
                    border-radius: 30px;
                    text-align: center;
                    position: relative;
                    background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(99, 102, 241, 0.05) 100%);
                }

                .quote-icon {
                    position: absolute;
                    top: 2rem;
                    right: 2rem;
                    color: var(--primary);
                    opacity: 0.2;
                }

                .rating-stars {
                    display: flex;
                    gap: 0.25rem;
                    justify-content: center;
                    margin-bottom: 1.5rem;
                    font-size: 1.3rem;
                }

                .testimonial-content {
                    font-size: 1.25rem;
                    line-height: 1.8;
                    color: var(--text-secondary);
                    font-style: italic;
                    margin-bottom: 2rem;
                    max-width: 600px;
                    margin-left: auto;
                    margin-right: auto;
                }

                .testimonial-author {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 1rem;
                    padding-top: 1.5rem;
                    border-top: 1px solid var(--glass-border);
                }

                .author-avatar {
                    font-size: 3rem;
                    width: 70px;
                    height: 70px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 8px 30px rgba(99, 102, 241, 0.3);
                }

                .author-info {
                    text-align: left;
                }

                .author-name {
                    font-weight: 700;
                    font-size: 1.2rem;
                    margin-bottom: 0.25rem;
                }

                .author-role {
                    color: var(--text-muted);
                    font-size: 0.95rem;
                }

                .carousel-indicators {
                    display: flex;
                    justify-content: center;
                    gap: 0.75rem;
                    margin-top: 2rem;
                }

                .indicator {
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: var(--glass-border);
                    border: none;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .indicator.active {
                    background: var(--primary);
                    width: 36px;
                    border-radius: 6px;
                }

                @media (max-width: 768px) {
                    .carousel-wrapper {
                        padding: 0 20px;
                    }

                    .carousel-arrow {
                        width: 40px;
                        height: 40px;
                    }

                    .testimonial-card {
                        padding: 2rem;
                    }

                    .testimonial-content {
                        font-size: 1.1rem;
                    }

                    .author-avatar {
                        width: 55px;
                        height: 55px;
                        font-size: 2.5rem;
                    }
                }
            `}</style>
        </section>
    );
};

export default Testimonials;
