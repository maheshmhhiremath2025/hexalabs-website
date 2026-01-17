import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHoveringLink, setIsHoveringLink] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const cursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Check if touch device
        const isTouchDevice = 'ontouchstart' in window;
        if (isTouchDevice) return;

        setIsVisible(true);

        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        const handleMouseEnter = (e: Event) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('card-hover') ||
                target.classList.contains('service-card') ||
                target.classList.contains('feature-card')
            ) {
                setIsHoveringLink(true);
            }
        };

        const handleMouseLeave = () => {
            setIsHoveringLink(false);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mouseover', handleMouseEnter);
        document.addEventListener('mouseout', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mouseover', handleMouseEnter);
            document.removeEventListener('mouseout', handleMouseLeave);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <>
            {/* Main cursor dot */}
            <motion.div
                ref={cursorRef}
                className="custom-cursor-dot"
                animate={{
                    x: mousePosition.x - 6,
                    y: mousePosition.y - 6,
                    scale: isClicking ? 0.8 : 1,
                }}
                transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 28,
                    mass: 0.5,
                }}
            />

            {/* Cursor ring */}
            <motion.div
                className="custom-cursor-ring"
                animate={{
                    x: mousePosition.x - 20,
                    y: mousePosition.y - 20,
                    scale: isHoveringLink ? 1.5 : 1,
                    opacity: isHoveringLink ? 0.8 : 0.4,
                }}
                transition={{
                    type: 'spring',
                    stiffness: 150,
                    damping: 15,
                    mass: 0.1,
                }}
            />

            {/* Glow effect when hovering interactive elements */}
            <AnimatePresence>
                {isHoveringLink && (
                    <motion.div
                        className="custom-cursor-glow"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{
                            x: mousePosition.x - 40,
                            y: mousePosition.y - 40,
                            opacity: 0.3,
                            scale: 1,
                        }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{
                            type: 'spring',
                            stiffness: 100,
                            damping: 20,
                        }}
                    />
                )}
            </AnimatePresence>

            <style>{`
                .custom-cursor-dot {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 12px;
                    height: 12px;
                    background: linear-gradient(135deg, var(--primary), var(--secondary));
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 99999;
                    mix-blend-mode: difference;
                }

                .custom-cursor-ring {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 40px;
                    height: 40px;
                    border: 2px solid var(--primary);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 99998;
                }

                .custom-cursor-glow {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 80px;
                    height: 80px;
                    background: radial-gradient(circle, var(--primary) 0%, transparent 70%);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 99997;
                    filter: blur(15px);
                }

                /* Hide default cursor when custom cursor is active */
                body {
                    cursor: none !important;
                }

                a, button, .card-hover, .service-card, .feature-card {
                    cursor: none !important;
                }

                /* Show default cursor on touch devices and when custom cursor is disabled */
                @media (hover: none) {
                    body {
                        cursor: auto !important;
                    }

                    a, button, .card-hover, .service-card, .feature-card {
                        cursor: pointer !important;
                    }

                    .custom-cursor-dot,
                    .custom-cursor-ring,
                    .custom-cursor-glow {
                        display: none !important;
                    }
                }
            `}</style>
        </>
    );
};

export default CustomCursor;
