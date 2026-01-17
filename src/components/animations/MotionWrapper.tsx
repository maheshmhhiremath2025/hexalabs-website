import { motion, useInView, useAnimation } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useRef, useEffect } from 'react';
import type { ReactNode } from 'react';

// Animation presets
export const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
    }
};

export const fadeInDown: Variants = {
    hidden: { opacity: 0, y: -60 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
    }
};

export const fadeInLeft: Variants = {
    hidden: { opacity: 0, x: -80 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
    }
};

export const fadeInRight: Variants = {
    hidden: { opacity: 0, x: 80 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
    }
};

export const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
    }
};

export const staggerContainer: Variants = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.1
        }
    }
};

export const staggerItem: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
    }
};

// Text reveal animation (character by character)
export const textRevealContainer: Variants = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.03,
            delayChildren: 0.2
        }
    }
};

export const textRevealChild: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: "easeOut" }
    }
};

// Scroll-triggered wrapper component
interface ScrollRevealProps {
    children: ReactNode;
    variants?: Variants;
    className?: string;
    style?: React.CSSProperties;
    delay?: number;
    once?: boolean;
    threshold?: number;
}

export const ScrollReveal = ({
    children,
    variants = fadeInUp,
    className,
    style,
    delay = 0,
    once = true,
    threshold = 0.1
}: ScrollRevealProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, amount: threshold });
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start('visible');
        }
    }, [isInView, controls]);

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={variants}
            className={className}
            style={style}
            transition={{ delay }}
        >
            {children}
        </motion.div>
    );
};

// Stagger container for multiple items
interface StaggerContainerProps {
    children: ReactNode;
    className?: string;
    style?: React.CSSProperties;
    delay?: number;
}

export const StaggerContainer = ({
    children,
    className,
    style,
    delay = 0
}: StaggerContainerProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start('visible');
        }
    }, [isInView, controls]);

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={{
                ...staggerContainer,
                visible: {
                    ...staggerContainer.visible,
                    transition: {
                        ...((staggerContainer.visible as { transition?: object })?.transition || {}),
                        delayChildren: delay
                    }
                }
            }}
            className={className}
            style={style}
        >
            {children}
        </motion.div>
    );
};

// Individual stagger item
interface StaggerItemProps {
    children: ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

export const StaggerItem = ({ children, className, style }: StaggerItemProps) => {
    return (
        <motion.div variants={staggerItem} className={className} style={style}>
            {children}
        </motion.div>
    );
};

// Magnetic button effect
interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    style?: React.CSSProperties;
    strength?: number;
}

export const MagneticButton = ({
    children,
    className,
    style,
    strength = 0.3
}: MagneticButtonProps) => {
    const ref = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    };

    const handleMouseLeave = () => {
        if (!ref.current) return;
        ref.current.style.transform = 'translate(0px, 0px)';
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={className}
            style={{
                ...style,
                display: 'inline-block',
                transition: 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            {children}
        </motion.div>
    );
};

// Parallax effect wrapper
interface ParallaxProps {
    children: ReactNode;
    offset?: number;
    className?: string;
    style?: React.CSSProperties;
}

export const Parallax = ({
    children,
    offset = 50,
    className,
    style
}: ParallaxProps) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!ref.current) return;
            const scrollY = window.scrollY;
            const rect = ref.current.getBoundingClientRect();
            const elementTop = rect.top + scrollY;
            const progress = (scrollY - elementTop + window.innerHeight) / (window.innerHeight + rect.height);
            const translateY = (progress - 0.5) * offset;
            ref.current.style.transform = `translateY(${translateY}px)`;
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [offset]);

    return (
        <div ref={ref} className={className} style={style}>
            {children}
        </div>
    );
};

// Hover 3D tilt effect for cards
interface TiltCardProps {
    children: ReactNode;
    className?: string;
    style?: React.CSSProperties;
    maxTilt?: number;
}

export const TiltCard = ({
    children,
    className,
    style,
    maxTilt = 10
}: TiltCardProps) => {
    const ref = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -maxTilt;
        const rotateY = ((x - centerX) / centerX) * maxTilt;
        ref.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    };

    const handleMouseLeave = () => {
        if (!ref.current) return;
        ref.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    };

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={className}
            style={{
                ...style,
                transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                transformStyle: 'preserve-3d'
            }}
        >
            {children}
        </div>
    );
};

// Glow effect on hover
interface GlowProps {
    children: ReactNode;
    className?: string;
    style?: React.CSSProperties;
    color?: string;
}

export const GlowOnHover = ({
    children,
    className,
    style,
    color = 'rgba(99, 102, 241, 0.4)'
}: GlowProps) => {
    return (
        <motion.div
            className={className}
            style={style}
            whileHover={{
                boxShadow: `0 0 30px 10px ${color}`,
                transition: { duration: 0.3 }
            }}
        >
            {children}
        </motion.div>
    );
};

export { motion };
