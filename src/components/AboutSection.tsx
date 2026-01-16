const AboutSection = () => {
    return (
        <section
            id="about"
            style={{ padding: "10rem 2rem", background: "var(--bg-color)" }}
        >
            <div className="container">
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
                        gap: "6rem",
                        alignItems: "center",
                    }}
                >
                    {/* Left Content */}
                    <div className="reveal">
                        <h2
                            style={{
                                fontSize: "3.5rem",
                                marginBottom: "2rem",
                                lineHeight: 1.1,
                            }}
                        >
                            Engineering the{" "}
                            <span className="text-gradient">Future of Innovation</span>
                        </h2>

                        <p
                            style={{
                                color: "var(--text-secondary)",
                                fontSize: "1.1rem",
                                lineHeight: 1.8,
                                marginBottom: "1.8rem",
                            }}
                        >
                            Hexalabs is a technology-driven IT services and professional training
                            organization focused on building scalable digital solutions and
                            future-ready talent. We specialize in cloud platforms, enterprise
                            IT consulting, and hands-on technical training that bridges the gap
                            between real-world industry needs and modern technology.
                        </p>

                        <p
                            style={{
                                color: "var(--text-secondary)",
                                fontSize: "1.05rem",
                                lineHeight: 1.7,
                                marginBottom: "3rem",
                            }}
                        >
                            We collaborate with enterprises, startups, and training partners
                            to design customized solutions—ranging from cloud automation and
                            lab environments to instructor-led programs that accelerate
                            workforce transformation.
                        </p>

                        {/* Mission */}
                        <div style={{ marginBottom: "2.5rem" }}>
                            <div
                                style={{
                                    display: "flex",
                                    gap: "1.5rem",
                                    marginBottom: "2rem",
                                }}
                            >
                                <div style={{ fontSize: "2rem" }}>🎯</div>
                                <div>
                                    <h4
                                        style={{
                                            fontSize: "1.2rem",
                                            marginBottom: "0.5rem",
                                        }}
                                    >
                                        Our Mission
                                    </h4>
                                    <p style={{ color: "var(--text-muted)" }}>
                                        To empower organizations and professionals by delivering
                                        reliable IT solutions, cloud-native architectures, and
                                        practical training programs that enable sustainable growth
                                        and operational excellence.
                                    </p>
                                </div>
                            </div>

                            {/* Vision */}
                            <div style={{ display: "flex", gap: "1.5rem" }}>
                                <div style={{ fontSize: "2rem" }}>👁️</div>
                                <div>
                                    <h4
                                        style={{
                                            fontSize: "1.2rem",
                                            marginBottom: "0.5rem",
                                        }}
                                    >
                                        Our Vision
                                    </h4>
                                    <p style={{ color: "var(--text-muted)" }}>
                                        To become a globally trusted technology partner and learning
                                        ecosystem, recognized for transforming businesses and
                                        individuals through innovation, knowledge, and execution
                                        excellence.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Card */}
                    <div
                        className="reveal glass"
                        style={{
                            padding: "3rem",
                            borderRadius: "40px",
                            position: "relative",
                        }}
                    >
                        <div
                            style={{
                                position: "absolute",
                                top: "-20px",
                                left: "-20px",
                                width: "100px",
                                height: "100px",
                                background: "var(--primary)",
                                opacity: 0.1,
                                borderRadius: "50%",
                                filter: "blur(30px)",
                            }}
                        />

                        <h3
                            style={{ fontSize: "2rem", marginBottom: "2rem" }}
                            className="secondary-gradient"
                        >
                            Our Values
                        </h3>

                        <ul
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "1.5rem",
                            }}
                        >
                            {[
                                {
                                    t: "Integrity",
                                    d: "We operate with transparency, accountability, and ethical responsibility in every engagement.",
                                },
                                {
                                    t: "Innovation",
                                    d: "We continuously adopt modern technologies and creative problem-solving to deliver future-ready solutions.",
                                },
                                {
                                    t: "Excellence",
                                    d: "From consulting to training delivery, we maintain the highest standards of quality and performance.",
                                },
                                {
                                    t: "Empowerment",
                                    d: "We focus on enabling businesses, professionals, and students with skills that create real-world impact.",
                                },
                            ].map((v, i) => (
                                <li
                                    key={i}
                                    style={{
                                        paddingBottom: "1.5rem",
                                        borderBottom: "1px solid var(--glass-border)",
                                    }}
                                >
                                    <strong
                                        style={{
                                            display: "block",
                                            fontSize: "1.1rem",
                                            marginBottom: "0.3rem",
                                            color: "var(--primary-light)",
                                        }}
                                    >
                                        {v.t}
                                    </strong>
                                    <span
                                        style={{
                                            color: "var(--text-secondary)",
                                            fontSize: "0.95rem",
                                        }}
                                    >
                                        {v.d}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
