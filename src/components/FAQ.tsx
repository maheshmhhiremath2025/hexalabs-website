import { useState } from 'react';

interface FAQItem {
    question: string;
    answer: string;
}

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs: FAQItem[] = [
        {
            question: "What services does Hexalabs offer?",
            answer: "Hexalabs provides comprehensive IT consulting services including Cloud Strategy, Cybersecurity, AI Development, and IT Consulting. We also offer expert training programs in Web Development, Cloud Architecting, DevOps, and Data Science."
        },
        {
            question: "How long are the training programs?",
            answer: "Our training programs vary in duration from 4 weeks to 12 weeks depending on the course complexity. Each program includes hands-on projects, real-world scenarios, and industry-recognized certifications."
        },
        {
            question: "Do you offer custom solutions for enterprises?",
            answer: "Yes! We specialize in creating tailored IT solutions for enterprises. Our team works closely with you to understand your unique challenges and deliver customized strategies that align with your business goals."
        },
        {
            question: "What is your pricing model?",
            answer: "Our pricing is project-based and customized to your specific needs. We offer flexible payment plans and can provide a detailed quote after an initial consultation. Contact us for a free assessment."
        },
        {
            question: "Do you provide post-training support?",
            answer: "Absolutely! All our training programs include 3 months of post-training support, access to our alumni network, job placement assistance, and lifetime access to course materials and updates."
        },
        {
            question: "How can I get started?",
            answer: "Getting started is easy! Simply book a demo consultation through our website, and our team will reach out within 24 hours to discuss your requirements and create a customized plan for you."
        }
    ];

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section style={{ padding: '6rem 2rem', background: 'var(--bg-color)' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <p className="section-label">FAQ</p>
                    <h2 className="section-title">Frequently Asked Questions</h2>
                    <p className="section-subtitle">
                        Find answers to common questions about our services and training programs
                    </p>
                </div>

                <div className="faq-container">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`faq-item ${openIndex === index ? 'active' : ''}`}
                            onClick={() => toggleFAQ(index)}
                        >
                            <div className="faq-question">
                                <h3>{faq.question}</h3>
                                <span className="faq-icon">{openIndex === index ? '−' : '+'}</span>
                            </div>
                            <div className={`faq-answer ${openIndex === index ? 'open' : ''}`}>
                                <p>{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
        .faq-container {
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .faq-item {
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: 16px;
          padding: 1.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .faq-item:hover {
          border-color: var(--primary);
          box-shadow: 0 4px 20px rgba(99, 102, 241, 0.1);
        }

        .faq-item.active {
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(14, 165, 233, 0.05) 100%);
          border-color: var(--primary);
        }

        .faq-question {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
        }

        .faq-question h3 {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0;
        }

        .faq-icon {
          font-size: 1.5rem;
          color: var(--primary);
          font-weight: 300;
          min-width: 30px;
          text-align: center;
          transition: transform 0.3s ease;
        }

        .faq-item.active .faq-icon {
          transform: rotate(180deg);
        }

        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease, margin-top 0.3s ease;
        }

        .faq-answer.open {
          max-height: 500px;
          margin-top: 1rem;
        }

        .faq-answer p {
          color: var(--text-secondary);
          line-height: 1.7;
          margin: 0;
        }

        @media (max-width: 768px) {
          .faq-question h3 {
            font-size: 1rem;
          }

          .faq-item {
            padding: 1.25rem;
          }
        }
      `}</style>
        </section>
    );
};

export default FAQ;
