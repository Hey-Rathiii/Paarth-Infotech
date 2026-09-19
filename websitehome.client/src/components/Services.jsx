import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./Services.css";
import { Link } from "react-router-dom";
import aspNetImage from "../images/services/aspnet-development.png";
import fullStackImage from "../images/services/full-stack-development.png";
import cloudImage from "../images/services/cloud-solutions.png";
import projectsImage from "../images/services/business-applications.png";
import aiImage from "../images/services/artificial-intelligence.png";
import workflowsImage from "../images/services/enterprise-workflows.png";

import {
    Server,
    Layers3,
    Cloud,
    Code2,
    Bot,
    Workflow
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function Services() {

    const servicesRef = useRef(null);

    useLayoutEffect(() => {
        const media = gsap.matchMedia();

        const ctx = gsap.context(() => {

            media.add("(prefers-reduced-motion: no-preference)", () => {
                gsap.from(".services-header > *", {
                    y: 60,
                    opacity: 0,
                    duration: 1,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: servicesRef.current,
                        start: "top 75%",
                        toggleActions: "play none none reverse"
                    }
                });
            });

            media.add("(min-width: 769px) and (prefers-reduced-motion: no-preference)", () => {
                const cards = gsap.utils.toArray(".service-card");

                cards.forEach((card, index) => {
                    gsap.to(card, {
                        scale: 0.92 - (index * 0.02),
                        y: index * 40,
                        force3D: true,
                        ease: "none",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 20%",
                            end: "bottom 20%",
                            scrub: true,
                        }
                    });
                });
            });

        }, servicesRef);

        return () => {
            media.revert();
            ctx.revert();
        };

    }, []);

    return (
        <section
            ref={servicesRef}
            id="services"
            className="services-section"
        >

            <div className="services-header">

                <span className="section-tag">
                    Our Services
                </span>

                <h2>
                    Software for your business.
                    <br />
                    Built around your needs.
                </h2>

                <p>
                    Web applications, cloud infrastructure and enterprise workflows that support the way your business operates.
                </p>

                <Link to="/services" className="services-overview-link">Explore business services →</Link>
            </div>

            <div className="services-stack">

                {/* ASP.NET */}

                <div className="service-card">

                    <img
                        src={aspNetImage}
                        alt=""
                        className="card-bg"
                        loading="lazy"
                        decoding="async"
                    />

                    <div className="card-overlay"></div>

                    <div className="card-content">

                        <div className="service-icon aspnet-icon">
                            <Server size={36} strokeWidth={2.2} />
                        </div>

                        <h3>ASP.NET Development</h3>

                        <p>
                            Enterprise-grade applications built with ASP.NET Core and C#.
                        </p>

                    </div>

                </div>

                {/* FULL STACK */}

                <div className="service-card">

                    <img
                        src={fullStackImage}
                        alt=""
                        className="card-bg"
                        loading="lazy"
                        decoding="async"
                    />

                    <div className="card-overlay"></div>

                    <div className="card-content">

                        <div className="service-icon fullstack-icon">
                            <Layers3 size={36} strokeWidth={2.2} />
                        </div>

                        <h3>Full Stack Development</h3>

                        <p>
                            Modern React applications integrated with powerful backends.
                        </p>

                    </div>

                </div>

                {/* CLOUD */}

                <div className="service-card">

                    <img
                        src={cloudImage}
                        alt=""
                        className="card-bg"
                        loading="lazy"
                        decoding="async"
                    />

                    <div className="card-overlay"></div>

                    <div className="card-content">

                        <div className="service-icon cloud-icon">
                            <Cloud size={36} strokeWidth={2.2} />
                        </div>

                        <h3>Cloud Solutions</h3>

                        <p>
                            Azure deployment, DevOps automation and scalable infrastructure.
                        </p>

                    </div>

                </div>

                {/* PROJECTS */}

                <div className="service-card">

                    <img
                        src={projectsImage}
                        alt=""
                        className="card-bg"
                        loading="lazy"
                        decoding="async"
                    />

                    <div className="card-overlay"></div>

                    <div className="card-content">

                        <div className="service-icon projects-icon">
                            <Code2 size={36} strokeWidth={2.2} />
                        </div>

                        <h3>Business Applications</h3>

                        <p>
                            Connect everyday operations with practical portals, dashboards and workflows.
                        </p>

                    </div>

                </div>

                {/* AI */}

                <div className="service-card">

                    <img
                        src={aiImage}
                        alt=""
                        className="card-bg"
                        loading="lazy"
                        decoding="async"
                    />

                    <div className="card-overlay"></div>

                    <div className="card-content">

                        <div className="service-icon ai-icon">
                            <Bot size={36} strokeWidth={2.2} />
                        </div>

                        <h3>Artificial Intelligence</h3>

                        <p>
                            AI tools, Copilot integrations and intelligent automation.
                        </p>

                    </div>

                </div>

                {/* ENTERPRISE WORKFLOWS */}

                <div className="service-card">

                    <img
                        src={workflowsImage}
                        alt=""
                        className="card-bg"
                        loading="lazy"
                        decoding="async"
                    />

                    <div className="card-overlay"></div>

                    <div className="card-content">

                        <div className="service-icon workflow-icon">
                            <Workflow size={36} strokeWidth={2.2} />
                        </div>

                        <h3>Enterprise Workflows</h3>

                        <p>
                            Dynamics 365 and Power Platform solutions for connected business processes.
                        </p>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default Services;
