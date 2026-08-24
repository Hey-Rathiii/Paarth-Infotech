import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./Programs.css";
import {
    FaArrowRight,
    FaCloud,
    FaCode,
    FaLaptopCode,
    FaRobot
} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const programs = [
    {
        id: "dotnet",
        Icon: FaCode,
        title: "ASP.NET Core Developer",
        duration: "4 Months",
        level: "Beginner to Pro",
        format: "Live mentoring + capstone",
        project: "Build and deploy a secure business-management web application.",
        outcomes: [
            "Design REST APIs using clean architecture",
            "Add JWT authentication and role-based security",
            "Deploy a production-ready app with SQL Server"
        ],
        skills: [
            "C#",
            "ASP.NET Core",
            "Entity Framework",
            "SQL Server",
            "Web API",
            "Deployment"
        ]
    },
    {
        id: "full-stack",
        Icon: FaLaptopCode,
        title: "Full Stack Development",
        duration: "6 Months",
        level: "Career Track",
        format: "Frontend + backend projects",
        project: "Create a complete React commerce dashboard with an ASP.NET API.",
        outcomes: [
            "Build responsive React interfaces and reusable components",
            "Connect frontend flows to secure backend APIs",
            "Ship a portfolio-ready full stack application"
        ],
        skills: [
            "HTML",
            "CSS",
            "JavaScript",
            "React",
            "ASP.NET Core",
            "SQL Server"
        ]
    },
    {
        id: "dynamics-365",
        Icon: FaCloud,
        title: "Microsoft Dynamics 365",
        duration: "3 Months",
        level: "Specialist",
        format: "Enterprise workflow labs",
        project: "Extend a finance and operations workflow for a real business case.",
        outcomes: [
            "Create X++ extensions using best practices",
            "Build SSRS reports and business integrations",
            "Connect Dynamics 365 with the Power Platform"
        ],
        skills: [
            "Finance & Operations",
            "X++",
            "Extensions",
            "SSRS Reports",
            "Integrations",
            "Power Platform"
        ]
    },
    {
        id: "ai-copilot",
        Icon: FaRobot,
        title: "AI & Copilot",
        duration: "2 Months",
        level: "Fast Track",
        format: "Automation-first workshops",
        project: "Launch a Copilot-powered support assistant with automated workflows.",
        outcomes: [
            "Write reliable prompts for business scenarios",
            "Build conversational experiences in Copilot Studio",
            "Automate work using Azure AI and connected flows"
        ],
        skills: [
            "Prompt Engineering",
            "Azure AI",
            "Copilot Studio",
            "Automation",
            "Chatbots",
            "AI Workflows"
        ]
    }
];

function Programs() {
    const programsRef = useRef(null);
    const frontButtonRefs = useRef([]);
    const backButtonRefs = useRef([]);
    const lastTouchAtRef = useRef(0);
    const [hoveredCard, setHoveredCard] = useState(null);
    const [openedCard, setOpenedCard] = useState(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (
                window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ) {
                return;
            }

            gsap.from(".programs-header > *", {
                y: 60,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: programsRef.current,
                    start: "top 75%",
                    toggleActions: "play none none reverse"
                }
            });

            gsap.from(".program-card-shell", {
                y: 60,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".programs-grid",
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            });

            gsap.from(".program-icon", {
                scale: 0,
                rotation: -180,
                duration: 0.8,
                stagger: 0.12,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: ".programs-grid",
                    start: "top 80%"
                }
            });
        }, programsRef);

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key !== "Escape" || openedCard === null) return;

            const cardIndex = programs.findIndex(
                (program) => program.id === openedCard
            );

            setOpenedCard(null);
            setHoveredCard(null);
            window.requestAnimationFrame(() => {
                frontButtonRefs.current[cardIndex]?.focus();
            });
        };

        document.addEventListener("keydown", handleEscape);

        return () => document.removeEventListener("keydown", handleEscape);
    }, [openedCard]);

    const openCard = (cardId, index) => {
        setOpenedCard(cardId);
        window.requestAnimationFrame(() => {
            backButtonRefs.current[index]?.focus();
        });
    };

    const closeCard = (index) => {
        setOpenedCard(null);
        setHoveredCard(null);
        window.requestAnimationFrame(() => {
            frontButtonRefs.current[index]?.focus();
        });
    };

    return (
        <section ref={programsRef} className="programs" id="programs">
            <div className="programs-header">
                <span className="program-tag">Our Programs</span>

                <h2>
                    Choose The Right Path
                    <br />
                    For Your Career
                </h2>

                <p>
                    Industry-focused programs designed to help students become
                    job-ready professionals. Hover a card or select View
                    details to explore the complete outcome.
                </p>
            </div>

            <div className="programs-grid">
                {programs.map((program, index) => {
                    const isFlipped =
                        hoveredCard === program.id ||
                        openedCard === program.id;
                    const Icon = program.Icon;

                    return (
                        <article
                            className={`program-card-shell ${isFlipped ? "is-flipped" : ""}`}
                            key={program.id}
                            onTouchStart={() => {
                                lastTouchAtRef.current = Date.now();
                            }}
                            onMouseEnter={() => {
                                if (
                                    Date.now() - lastTouchAtRef.current >
                                    1000
                                ) {
                                    setHoveredCard(program.id);
                                }
                            }}
                            onMouseLeave={() => {
                                setHoveredCard((currentCard) =>
                                    currentCard === program.id
                                        ? null
                                        : currentCard
                                );
                            }}
                        >
                            <div className="program-card">
                                <div
                                    className="program-face program-card-front"
                                    aria-hidden={isFlipped}
                                    inert={isFlipped}
                                    id={`${program.id}-overview`}
                                >
                                    <div className="program-icon">
                                        <Icon aria-hidden="true" />
                                    </div>

                                    <span className="program-level">
                                        {program.level}
                                    </span>

                                    <h3>{program.title}</h3>

                                    <ul className="program-skills">
                                        {program.skills.map((skill) => (
                                            <li key={skill}>
                                                <span aria-hidden="true">
                                                    {"\u2713"}
                                                </span>{" "}
                                                {skill}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="program-face-footer">
                                        <span>{program.duration}</span>
                                        <button
                                            ref={(element) => {
                                                frontButtonRefs.current[index] =
                                                    element;
                                            }}
                                            type="button"
                                            className="program-flip-hint"
                                            aria-expanded={isFlipped}
                                            aria-controls={`${program.id}-details`}
                                            onClick={() =>
                                                openCard(program.id, index)}
                                        >
                                            View details
                                            <FaArrowRight aria-hidden="true" />
                                        </button>
                                    </div>
                                </div>

                                <div
                                    className="program-face program-card-back"
                                    aria-hidden={!isFlipped}
                                    inert={!isFlipped}
                                    id={`${program.id}-details`}
                                >
                                    <span className="program-back-label">
                                        Inside the program
                                    </span>

                                    <h3>{program.title}</h3>

                                    <div className="program-project">
                                        <span>Capstone project</span>
                                        <p>{program.project}</p>
                                    </div>

                                    <div className="program-outcomes">
                                        <span>What you will achieve</span>
                                        <ul>
                                            {program.outcomes.map((outcome) => (
                                                <li key={outcome}>
                                                    {outcome}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="program-back-footer">
                                        <span>{program.format}</span>
                                        <button
                                            ref={(element) => {
                                                backButtonRefs.current[index] =
                                                    element;
                                            }}
                                            type="button"
                                            className="program-flip-hint"
                                            aria-expanded={!isFlipped}
                                            aria-controls={`${program.id}-overview`}
                                            onClick={() => closeCard(index)}
                                        >
                                            Overview
                                            <FaArrowRight aria-hidden="true" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}

export default Programs;
