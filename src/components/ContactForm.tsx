import { useState } from "react";

const ContactForm = () => {
    const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");

        setTimeout(() => {
            setStatus("sent");
            setTimeout(() => setStatus("idle"), 3000);
        }, 2000);
    };

    return (
        <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-card">
                <div className="grid">
                    <div className="input-group">
                        <label>Full Name</label>
                        <input type="text" placeholder="John Doe" required />
                    </div>

                    <div className="input-group">
                        <label>Email Address</label>
                        <input type="email" placeholder="john@example.com" required />
                    </div>
                </div>

                <div className="input-group">
                    <label>Service Interested In</label>
                    <select>
                        <option>IT Consulting</option>
                        <option>Cloud Portal</option>
                        <option>Marketplace</option>
                        <option>Software Development</option>
                        <option>Training Programs</option>
                    </select>
                </div>

                <div className="input-group">
                    <label>Your Message</label>
                    <textarea
                        rows={5}
                        placeholder="Tell us about your project or training needs..."
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="btn-premium submit-btn"
                    disabled={status !== "idle"}
                >
                    {status === "idle" && "Send Message"}
                    {status === "sending" && (
                        <span className="sending">
                            <span className="loader" />
                            Sending...
                        </span>
                    )}
                    {status === "sent" && "✓ Message Sent Successfully!"}
                </button>
            </div>

            <style>{`
        .contact-form {
          width: 100%;
        }

        .form-card {
          padding: 2.5rem;
          border-radius: 20px;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          backdrop-filter: blur(14px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.35);
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .input-group label {
          font-size: 0.85rem;
          opacity: 0.85;
        }

        .input-group input,
        .input-group textarea,
        .input-group select {
          padding: 0.9rem 1.1rem;
          border-radius: 14px;
          border: 1px solid var(--glass-border);
          background: var(--input-bg);
          color: white;
          outline: none;
          transition: all 0.25s ease;
        }

        .input-group input:focus,
        .input-group textarea:focus,
        .input-group select:focus {
          border-color: rgba(255,255,255,0.6);
          box-shadow: 0 0 0 3px rgba(255,255,255,0.08);
        }

        select {
          cursor: pointer;
          appearance: none;
        }

        textarea {
          resize: none;
        }

        .submit-btn {
          width: 100%;
          margin-top: 1.5rem;
          height: 52px;
          font-size: 1rem;
          position: relative;
          overflow: hidden;
        }

        .sending {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
        }

        .loader {
          width: 16px;
          height: 16px;
          border: 2px solid white;
          border-top-color: transparent;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
          /* Dropdown menu background */
        .input-group select {
        background-color: var(--input-bg);
        color: white;
        }

        /* Dropdown options */
        .input-group select option {
        background-color: #000;
        color: white;
        }


        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
        </form>
    );
};

export default ContactForm;
