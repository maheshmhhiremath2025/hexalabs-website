import { useState, useEffect, useRef } from 'react';

interface CounterProps {
    end: number;
    duration?: number;
    suffix?: string;
}

const AnimatedCounter = ({ end, duration = 2000, suffix = '' }: CounterProps) => {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const counterRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated) {
                    setHasAnimated(true);

                    const startTime = Date.now();
                    const endTime = startTime + duration;

                    const updateCount = () => {
                        const now = Date.now();
                        const progress = Math.min((now - startTime) / duration, 1);

                        // Easing function for smooth animation
                        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                        const currentCount = Math.floor(easeOutQuart * end);

                        setCount(currentCount);

                        if (now < endTime) {
                            requestAnimationFrame(updateCount);
                        } else {
                            setCount(end);
                        }
                    };

                    requestAnimationFrame(updateCount);
                }
            },
            { threshold: 0.5 }
        );

        if (counterRef.current) {
            observer.observe(counterRef.current);
        }

        return () => {
            if (counterRef.current) {
                observer.unobserve(counterRef.current);
            }
        };
    }, [end, duration, hasAnimated]);

    return (
        <div ref={counterRef}>
            {count}{suffix}
        </div>
    );
};

export default AnimatedCounter;
