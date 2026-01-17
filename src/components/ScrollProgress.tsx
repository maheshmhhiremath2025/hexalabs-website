import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <>
            <motion.div
                className="scroll-progress-bar"
                style={{ scaleX }}
            />
            <style>{`
                .scroll-progress-bar {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 4px;
                    background: linear-gradient(90deg, var(--primary), var(--secondary));
                    transform-origin: 0%;
                    z-index: 10000;
                    box-shadow: 0 0 10px var(--primary), 0 0 20px rgba(99, 102, 241, 0.3);
                }
            `}</style>
        </>
    );
};

export default ScrollProgress;
