import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
        { text: "Hi there! 👋 How can we help you today?", isUser: false }
    ]);
    const [inputValue, setInputValue] = useState('');

    const quickReplies = [
        "Tell me about services",
        "Training courses info",
        "Book a demo",
        "Contact support"
    ];

    const handleSend = () => {
        if (!inputValue.trim()) return;

        setMessages(prev => [...prev, { text: inputValue, isUser: true }]);
        setInputValue('');

        // Auto-reply simulation
        setTimeout(() => {
            setMessages(prev => [...prev, {
                text: "Thanks for your message! Our team will get back to you shortly. You can also email us at labs@hexalabs.online.",
                isUser: false
            }]);
        }, 1000);
    };

    const handleQuickReply = (reply: string) => {
        setMessages(prev => [...prev, { text: reply, isUser: true }]);

        setTimeout(() => {
            let response = "";
            if (reply.includes("services")) {
                response = "We offer Cloud Consulting, DevOps, Cybersecurity, AI/ML, and more. Visit our Services section to learn more!";
            } else if (reply.includes("Training")) {
                response = "We have expert-led courses in AWS, Azure, Kubernetes, and DevOps. Check out our Training section for details!";
            } else if (reply.includes("demo")) {
                response = "Great! You can book a demo by clicking the 'Book Demo' button in our nav, or email us at labs@hexalabs.online.";
            } else {
                response = "Our support team is available 24/7. Email: labs@hexalabs.online";
            }
            setMessages(prev => [...prev, { text: response, isUser: false }]);
        }, 800);
    };

    return (
        <>
            {/* Chat Button */}
            <motion.button
                className="chat-toggle"
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                animate={{ rotate: isOpen ? 45 : 0 }}
            >
                {isOpen ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                )}
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="chat-window glass"
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Header */}
                        <div className="chat-header">
                            <div className="chat-header-info">
                                <div className="chat-avatar">
                                    <span>🤖</span>
                                    <span className="online-indicator" />
                                </div>
                                <div>
                                    <h4>Hexalabs Support</h4>
                                    <p>We typically reply instantly</p>
                                </div>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="chat-messages">
                            {messages.map((msg, index) => (
                                <motion.div
                                    key={index}
                                    className={`chat-message ${msg.isUser ? 'user' : 'bot'}`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    {msg.text}
                                </motion.div>
                            ))}

                            {/* Quick Replies */}
                            {messages.length === 1 && (
                                <div className="quick-replies">
                                    {quickReplies.map((reply, i) => (
                                        <motion.button
                                            key={i}
                                            className="quick-reply-btn"
                                            onClick={() => handleQuickReply(reply)}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.2 + i * 0.1 }}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            {reply}
                                        </motion.button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Input */}
                        <div className="chat-input">
                            <input
                                type="text"
                                placeholder="Type a message..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            />
                            <motion.button
                                onClick={handleSend}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                .chat-toggle {
                    position: fixed;
                    bottom: 30px;
                    right: 30px;
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, var(--primary), var(--secondary));
                    border: none;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                    box-shadow: 0 10px 30px rgba(99, 102, 241, 0.4);
                }

                .chat-window {
                    position: fixed;
                    bottom: 100px;
                    right: 30px;
                    width: 360px;
                    max-height: 500px;
                    border-radius: 24px;
                    z-index: 9998;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    background: var(--bg-elevated);
                    border: 1px solid var(--glass-border);
                }

                .chat-header {
                    padding: 1.25rem;
                    background: linear-gradient(135deg, var(--primary), var(--secondary));
                    color: white;
                }

                .chat-header-info {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }

                .chat-avatar {
                    width: 45px;
                    height: 45px;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.2);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.5rem;
                    position: relative;
                }

                .online-indicator {
                    position: absolute;
                    bottom: 2px;
                    right: 2px;
                    width: 10px;
                    height: 10px;
                    background: #10b981;
                    border-radius: 50%;
                    border: 2px solid white;
                }

                .chat-header h4 {
                    font-size: 1rem;
                    font-weight: 600;
                    margin-bottom: 0.1rem;
                }

                .chat-header p {
                    font-size: 0.8rem;
                    opacity: 0.9;
                }

                .chat-messages {
                    flex: 1;
                    padding: 1rem;
                    overflow-y: auto;
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                    max-height: 280px;
                }

                .chat-message {
                    max-width: 85%;
                    padding: 0.75rem 1rem;
                    border-radius: 16px;
                    font-size: 0.9rem;
                    line-height: 1.5;
                }

                .chat-message.bot {
                    background: var(--glass-bg);
                    border: 1px solid var(--glass-border);
                    align-self: flex-start;
                    border-bottom-left-radius: 4px;
                }

                .chat-message.user {
                    background: linear-gradient(135deg, var(--primary), var(--secondary));
                    color: white;
                    align-self: flex-end;
                    border-bottom-right-radius: 4px;
                }

                .quick-replies {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                    margin-top: 0.5rem;
                }

                .quick-reply-btn {
                    padding: 0.5rem 0.9rem;
                    border-radius: 50px;
                    background: transparent;
                    border: 1px solid var(--primary);
                    color: var(--primary);
                    font-size: 0.8rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .quick-reply-btn:hover {
                    background: var(--primary);
                    color: white;
                }

                .chat-input {
                    display: flex;
                    gap: 0.5rem;
                    padding: 1rem;
                    border-top: 1px solid var(--glass-border);
                }

                .chat-input input {
                    flex: 1;
                    padding: 0.75rem 1rem;
                    border-radius: 50px;
                    border: 1px solid var(--glass-border);
                    background: var(--glass-bg);
                    color: var(--text-primary);
                    font-size: 0.9rem;
                }

                .chat-input input:focus {
                    outline: none;
                    border-color: var(--primary);
                }

                .chat-input button {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: var(--primary);
                    border: none;
                    color: white;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                @media (max-width: 500px) {
                    .chat-window {
                        right: 10px;
                        left: 10px;
                        width: auto;
                        bottom: 90px;
                    }

                    .chat-toggle {
                        right: 20px;
                        bottom: 20px;
                    }
                }
            `}</style>
        </>
    );
};

export default ChatWidget;
