import "./Services.css";

import {
    FaCode,
    FaReact,
    FaCloud,
    FaMicrosoft,
    FaRobot,
    FaRocket
} from "react-icons/fa";

function Services() {
    return (
        <section id="services" className="services-section">

            <div className="services-header">

                <span className="section-tag">
                    Our Services
                </span>

                <h2>
                    Empowering Careers &
                    <br />
                    Businesses Through Technology
                </h2>

                <p>
                    From industry-focused training programs to enterprise software
                    solutions, we help learners and organizations succeed in the
                    modern digital world.
                </p>

            </div>

            <div className="services-grid">

                <div className="service-card">
                    <div className="service-icon">
                        <FaMicrosoft />
                    </div>
                    <h3>ASP.NET Development</h3>
                    <p>
                        Enterprise-grade applications built with ASP.NET Core and C#.
                    </p>
                </div>

                <div className="service-card">
                    <div className="service-icon">
                        <FaReact />
                    </div>
                    <h3>Full Stack Development</h3>
                    <p>
                        Modern React applications integrated with powerful backends.
                    </p>
                </div>

                <div className="service-card">
                    <div className="service-icon">
                        <FaCloud />
                    </div>
                    <h3>Cloud Solutions</h3>
                    <p>
                        Azure deployment, DevOps automation and scalable infrastructure.
                    </p>
                </div>

                <div className="service-card">
                    <div className="service-icon">
                        <FaCode />
                    </div>
                    <h3>Live Projects</h3>
                    <p>
                        Gain real-world experience through industry-level projects.
                    </p>
                </div>

                <div className="service-card">
                    <div className="service-icon">
                        <FaRobot />
                    </div>
                    <h3>Artificial Intelligence</h3>
                    <p>
                        AI tools, Copilot integrations and intelligent automation.
                    </p>
                </div>

                <div className="service-card">
                    <div className="service-icon">
                        <FaRocket />
                    </div>
                    <h3>Career Growth</h3>
                    <p>
                        Mentorship, interview preparation and placement assistance.
                    </p>
                </div>

            </div>

        </section>
    );
}

export default Services;