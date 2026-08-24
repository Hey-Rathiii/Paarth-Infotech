import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./Services.css";
import aspNetImage from "../images/asp.net.png";
import fullStackImage from "../images/fullstack.png";
import cloudImage from "../images/cloud.png";
import projectsImage from "../images/projects.png";
import aiImage from "../images/Ai.png";
import careerImage from "../images/career.png";

import {
    Server,
    Layers3,
    Cloud,
    Code2,
    Bot,
    Rocket
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

                        <h3>Live Projects</h3>

                        <p>
                            Gain real-world experience through industry-level projects.
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

                {/* CAREER */}

                <div className="service-card">

                    <img
                        src={careerImage}
                        alt=""
                        className="card-bg"
                        loading="lazy"
                        decoding="async"
                    />

                    <div className="card-overlay"></div>

                    <div className="card-content">

                        <div className="service-icon career-icon">
                            <Rocket size={36} strokeWidth={2.2} />
                        </div>

                        <h3>Career Growth</h3>

                        <p>
                            Mentorship, interview preparation and placement assistance.
                        </p>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default Services;
