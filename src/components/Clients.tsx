const Clients = () => {
    const logos = [
        { name: "Microsoft", src: "/clients/microsoft.svg" },
        { name: "Google Cloud", src: "/clients/google-cloud.svg" },
        { name: "AWS", src: "/clients/aws.svg" },
        { name: "Red-Hat", src: "/clients/Red-Hat.svg" },
        { name: "Cisco", src: "/clients/cisco.svg" },
        { name: "Adobe", src: "/clients/adobe.svg" },
        { name: "Intel", src: "/clients/intel.svg" },
        { name: "NVIDIA", src: "/clients/nvidia.svg" },
    ];

    return (
        <section
            id="clients"
            style={{
                padding: "6rem 0",
                background: "var(--bg-color)",
                borderTop: "1px solid var(--glass-border)",
                borderBottom: "1px solid var(--glass-border)",
            }}
        >
            <div className="container" style={{ textAlign: "center", marginBottom: "3rem" }}>
                <p
                    style={{
                        color: "var(--text-muted)",
                        letterSpacing: "0.2rem",
                        fontSize: "0.8rem",
                        fontWeight: "700",
                        textTransform: "uppercase",
                    }}
                >
                    Trusted by Industry Leaders
                </p>
            </div>

            <div className="marquee-container">
                <div className="marquee-content">
                    {[...logos, ...logos].map((logo, index) => (
                        <div key={index} className="client-logo">
                            <img src={logo.src} alt={logo.name} />
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
        .marquee-container {
          overflow: hidden;
          width: 100%;
        }

        .marquee-content {
          display: flex;
          width: max-content;
          animation: marquee 35s linear infinite;
        }

        .client-logo {
          padding: 0 3.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.6;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }

        .client-logo img {
        height: 38px;
        width: auto;
        filter: none;
        transition: transform 0.3s ease;
        }

        .client-logo:hover img {
        transform: scale(1.08);
        }


        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @media (max-width: 768px) {
          .client-logo {
            padding: 0 2rem;
          }

          .client-logo img {
            height: 30px;
          }
        }
      `}</style>
        </section>
    );
};

export default Clients;
