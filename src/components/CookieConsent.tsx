import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already consented
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            // Show banner after a short delay
            const timer = setTimeout(() => setIsVisible(true), 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie-consent', 'accepted');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('cookie-consent', 'declined');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="cookie-banner glass"
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                >
                    <div className="cookie-content">
                        <div className="cookie-icon">🍪</div>
                        <div className="cookie-text">
                            <h4>We value your privacy</h4>
                            <p>
                                We use cookies to enhance your browsing experience, analyze site traffic,
                                and personalize content. By clicking "Accept", you consent to our use of cookies.
                            </p>
                        </div>
                    </div>
                    <div className="cookie-actions">
                        <motion.button
                            className="cookie-btn decline"
                            onClick={handleDecline}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Decline
                        </motion.button>
                        <motion.button
                            className="cookie-btn accept"
                            onClick={handleAccept}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Accept All
                        </motion.button>
                    </div>

                    <style>{`
                        .cookie-banner {
                            position: fixed;
                            bottom: 20px;
                            left: 20px;
                            right: 20px;
                            max-width: 600px;
                            padding: 1.5rem 2rem;
                            border-radius: 20px;
                            z-index: 9997;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            gap: 1.5rem;
                            flex-wrap: wrap;
                            background: var(--bg-elevated);
                            border: 1px solid var(--glass-border);
                            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
                        }

                        .cookie-content {
                            display: flex;
                            align-items: flex-start;
                            gap: 1rem;
                            flex: 1;
                        }

                        .cookie-icon {
                            font-size: 2rem;
                            flex-shrink: 0;
                        }

                        .cookie-text h4 {
                            font-size: 1rem;
                            font-weight: 600;
                            margin-bottom: 0.25rem;
                        }

                        .cookie-text p {
                            font-size: 0.85rem;
                            color: var(--text-secondary);
                            line-height: 1.5;
                        }

                        .cookie-actions {
                            display: flex;
                            gap: 0.75rem;
                            flex-shrink: 0;
                        }

                        .cookie-btn {
                            padding: 0.75rem 1.5rem;
                            border-radius: 10px;
                            font-weight: 600;
                            font-size: 0.9rem;
                            cursor: pointer;
                            transition: all 0.3s ease;
                        }

                        .cookie-btn.decline {
                            background: transparent;
                            border: 1px solid var(--glass-border);
                            color: var(--text-secondary);
                        }

                        .cookie-btn.decline:hover {
                            border-color: var(--text-primary);
                            color: var(--text-primary);
                        }

                        .cookie-btn.accept {
                            background: linear-gradient(135deg, var(--primary), var(--secondary));
                            border: none;
                            color: white;
                        }

                        .cookie-btn.accept:hover {
                            box-shadow: 0 8px 25px rgba(99, 102, 241, 0.4);
                        }

                        @media (max-width: 600px) {
                            .cookie-banner {
                                flex-direction: column;
                                text-align: center;
                                left: 10px;
                                right: 10px;
                            }

                            .cookie-content {
                                flex-direction: column;
                                align-items: center;
                            }

                            .cookie-actions {
                                width: 100%;
                                justify-content: center;
                            }
                        }
                    `}</style>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CookieConsent;
