import { useEffect, useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    ArrowRight,
    Bot,
    Cloud,
    Code2,
    Layers3,
    Server
} from "lucide-react";

import aspNetImage from "../images/asp.net.png";
import fullStackImage from "../images/fullstack.png";
import projectsImage from "../images/projects.png";
import aiImage from "../images/Ai.png";
import CinematicScrollOverlay from "../components/CinematicScrollOverlay";
import "./ProgramsPage.css";

gsap.registerPlugin(ScrollTrigger);

const programs = [
    {
        id: "dotnet",
        Icon: Server,
        label: "Backend engineering",
        title: "ASP.NET Core Developer",
        description:
            "Move from C# foundations to secure, production-minded APIs and data-driven business applications.",
        duration: "4 months",
        level: "Beginner to Pro",
        format: "Live mentoring + capstone",
        skills: [
            "C#",
            "ASP.NET Core",
            "Entity Framework",
            "SQL Server",
            "REST APIs",
            "Deployment"
        ],
        project:
            "Build and deploy a secure business-management web application.",
        outcomes: [
            "Structure REST APIs with clean, maintainable layers",
            "Add JWT authentication and role-based authorization",
            "Connect, test and deploy a SQL-backed application"
        ]
    },
    {
        id: "full-stack",
        Icon: Layers3,
        label: "Product engineering",
        title: "Full Stack Development",
        description:
            "Own the complete product journey—from responsive React interfaces to a secure API and database.",
        duration: "6 months",
        level: "Career Track",
        format: "Frontend + backend projects",
        skills: [
            "HTML",
            "CSS",
            "JavaScript",
            "React",
            "ASP.NET Core",
            "SQL Server"
        ],
        project:
            "Create a complete React commerce dashboard with an ASP.NET API.",
        outcomes: [
            "Build responsive interfaces from reusable components",
            "Connect polished frontend flows to secure backend APIs",
            "Ship a cohesive, portfolio-ready full stack product"
        ]
    },
    {
        id: "dynamics-365",
        Icon: Cloud,
        label: "Enterprise systems",
        title: "Microsoft Dynamics 365",
        description:
            "Build enterprise workflows that connect operations, reporting, integrations and the Power Platform.",
        duration: "3 months",
        level: "Specialist",
        format: "Enterprise workflow labs",
        skills: [
            "Finance & Operations",
            "X++",
            "Extensions",
            "SSRS Reports",
            "Integrations",
            "Power Platform"
        ],
        project:
            "Extend a finance and operations workflow for a realistic business case.",
        outcomes: [
            "Create X++ extensions using maintainable patterns",
            "Build SSRS reports and practical integrations",
            "Connect Dynamics 365 workflows with Power Platform"
        ]
    },
    {
        id: "ai-copilot",
        Icon: Bot,
        label: "Intelligent automation",
        title: "AI & Copilot",
        description:
            "Turn business problems into practical copilots, reliable prompts and connected automated workflows.",
        duration: "2 months",
        level: "Fast Track",
        format: "Automation-first workshops",
        skills: [
            "Prompt Engineering",
            "Azure AI",
            "Copilot Studio",
            "Automation",
            "Chatbots",
            "AI Workflows"
        ],
        project:
            "Launch a Copilot-powered support assistant with automated workflows.",
        outcomes: [
            "Design reliable prompts around real business scenarios",
            "Build conversational experiences in Copilot Studio",
            "Connect Azure AI capabilities to automated workflows"
        ]
    }
];

const learningSteps = [
    {
        number: "01",
        title: "Learn",
        text: "Build the right foundation through focused concepts, guided demonstrations and practical labs."
    },
    {
        number: "02",
        title: "Build",
        text: "Turn each concept into a working feature using realistic requirements, tools and team workflows."
    },
    {
        number: "03",
        title: "Review",
        text: "Improve the implementation through mentor feedback, code review and purposeful iteration."
    },
    {
        number: "04",
        title: "Deploy",
        text: "Bring the pieces together as a polished capstone you can explain, demonstrate and keep improving."
    }
];

const projects = [
    {
        id: "operations-hub",
        image: aspNetImage,
        imageAlt:
            "Blue-lit server infrastructure representing the Operations Hub capstone",
        number: "01",
        title: "Operations Hub",
        category: "ASP.NET Core capstone",
        description:
            "A secure business-management platform designed around structured data, role-based workflows and a production-minded API.",
        build:
            "Architecture, authentication, core business workflows and deployment",
        stack: ["C#", "ASP.NET Core", "EF Core", "SQL Server", "JWT"]
    },
    {
        id: "commerce-command-center",
        image: fullStackImage,
        imageAlt:
            "Connected illuminated pathways representing a full stack commerce application",
        number: "02",
        title: "Commerce Command Center",
        category: "Full stack capstone",
        description:
            "A responsive React dashboard connected to an ASP.NET API, bringing product, order and operational flows into one experience.",
        build:
            "Reusable UI, API integration, responsive states and data workflows",
        stack: ["React", "JavaScript", "ASP.NET Core", "REST", "SQL"]
    },
    {
        id: "finance-flow-extension",
        image: projectsImage,
        imageAlt:
            "Professional development workstation representing a Dynamics 365 extension project",
        number: "03",
        title: "Finance Flow Extension",
        category: "Dynamics 365 capstone",
        description:
            "A Finance & Operations workflow extension that combines maintainable X++ logic, reporting and connected business tools.",
        build:
            "Extensions, SSRS reporting, integrations and Power Platform flows",
        stack: ["D365 F&O", "X++", "SSRS", "Integrations", "Power Platform"]
    },
    {
        id: "copilot-service-desk",
        image: aiImage,
        imageAlt:
            "Futuristic AI assistant representing the Copilot Service Desk capstone",
        number: "04",
        title: "Copilot Service Desk",
        category: "AI & Copilot capstone",
        description:
            "A support assistant designed to answer common questions, collect useful context and move requests into an automated workflow.",
        build:
            "Conversation design, prompt logic, connected actions and escalation",
        stack: [
            "Copilot Studio",
            "Azure AI",
            "Prompt Design",
            "Automation"
        ]
    }
];

function ProgramsPage() {
    const pageRef = useRef(null);

    useEffect(() => {
        const previousTitle = document.title;
        document.title = "Programs & Projects | Paarth Infotech";

        return () => {
            document.title = previousTitle;
        };
    }, []);

    useLayoutEffect(() => {
        const page = pageRef.current;
        if (!page) return undefined;

        const media = gsap.matchMedia();

        media.add(
            {
                motion: "(prefers-reduced-motion: no-preference)",
                finePointer: "(hover: hover) and (pointer: fine)"
            },
            (context) => {
                const { motion, finePointer } = context.conditions;
                const cleanups = [];

                if (motion) {
                    const heroTimeline = gsap.timeline({
                        defaults: { ease: "power3.out" }
                    });

                    heroTimeline
                        .from(
                            page.querySelectorAll(
                                ".programs-page__hero-copy > *"
                            ),
                            {
                                autoAlpha: 0,
                                y: 42,
                                duration: 0.85,
                                stagger: 0.1
                            }
                        )
                        .from(
                            page.querySelector(".programs-page__hero-visual"),
                            {
                                autoAlpha: 0,
                                y: 60,
                                rotationY: -8,
                                duration: 1.1
                            },
                            "-=0.65"
                        )
                        .from(
                            page.querySelectorAll(
                                ".programs-page__proof-item"
                            ),
                            {
                                autoAlpha: 0,
                                y: 20,
                                duration: 0.55,
                                stagger: 0.08
                            },
                            "-=0.45"
                        );

                    const hero = page.querySelector(
                        ".programs-page__hero"
                    );
                    const heroGrid = page.querySelector(
                        ".programs-page__hero-grid"
                    );
                    const heroCopy = page.querySelector(
                        ".programs-page__hero-copy"
                    );
                    const heroVisual = page.querySelector(
                        ".programs-page__hero-visual"
                    );

                    if (hero && heroGrid && heroCopy && heroVisual) {
                        gsap.to(heroGrid, {
                            yPercent: 18,
                            scale: 1.08,
                            ease: "none",
                            scrollTrigger: {
                                trigger: hero,
                                start: "top top",
                                end: "bottom top",
                                scrub: 0.8
                            }
                        });

                        gsap.to(heroCopy, {
                            yPercent: -10,
                            ease: "none",
                            scrollTrigger: {
                                trigger: hero,
                                start: "top top",
                                end: "bottom top",
                                scrub: 0.8
                            }
                        });

                        gsap.to(heroVisual, {
                            yPercent: 14,
                            rotationZ: -1.5,
                            ease: "none",
                            scrollTrigger: {
                                trigger: hero,
                                start: "top top",
                                end: "bottom top",
                                scrub: 0.8
                            }
                        });
                    }

                    page.querySelectorAll(
                        ".programs-page__reveal"
                    ).forEach((element) => {
                        gsap.from(element, {
                            autoAlpha: 0,
                            y: 54,
                            duration: 0.85,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: element,
                                start: "top 86%",
                                once: true
                            }
                        });
                    });

                    gsap.from(
                        page.querySelectorAll(".programs-page__journey-step"),
                        {
                            autoAlpha: 0,
                            y: 36,
                            duration: 0.7,
                            stagger: 0.12,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: page.querySelector(
                                    ".programs-page__journey"
                                ),
                                start: "top 78%",
                                once: true
                            }
                        }
                    );

                    gsap.fromTo(
                        page.querySelector(
                            ".programs-page__journey-progress"
                        ),
                        { scaleX: 0 },
                        {
                            scaleX: 1,
                            ease: "none",
                            scrollTrigger: {
                                trigger: page.querySelector(
                                    ".programs-page__journey-steps"
                                ),
                                start: "top 75%",
                                end: "bottom 62%",
                                scrub: 0.6
                            }
                        }
                    );
                }

                if (motion && finePointer) {
                    page.querySelectorAll("[data-programs-tilt]").forEach(
                        (surface) => {
                            const rotateX = gsap.quickTo(
                                surface,
                                "rotationX",
                                {
                                    duration: 0.55,
                                    ease: "power3.out"
                                }
                            );
                            const rotateY = gsap.quickTo(
                                surface,
                                "rotationY",
                                {
                                    duration: 0.55,
                                    ease: "power3.out"
                                }
                            );

                            gsap.set(surface, {
                                transformPerspective: 1200,
                                transformOrigin: "center"
                            });

                            const handlePointerMove = (event) => {
                                const bounds =
                                    surface.getBoundingClientRect();
                                const x =
                                    (event.clientX - bounds.left) /
                                        bounds.width -
                                    0.5;
                                const y =
                                    (event.clientY - bounds.top) /
                                        bounds.height -
                                    0.5;

                                rotateX(y * -7);
                                rotateY(x * 9);
                            };

                            const resetTilt = () => {
                                rotateX(0);
                                rotateY(0);
                            };

                            surface.addEventListener(
                                "pointermove",
                                handlePointerMove
                            );
                            surface.addEventListener(
                                "pointerleave",
                                resetTilt
                            );

                            cleanups.push(() => {
                                surface.removeEventListener(
                                    "pointermove",
                                    handlePointerMove
                                );
                                surface.removeEventListener(
                                    "pointerleave",
                                    resetTilt
                                );
                            });
                        }
                    );
                }

                return () => {
                    cleanups.forEach((cleanup) => cleanup());
                };
            }
        );

        return () => media.revert();
    }, []);

    return (
        <main ref={pageRef} className="programs-page" id="programs-page">
            <CinematicScrollOverlay pageRef={pageRef} variant="programs" />

            <section
                className="programs-page__hero"
                aria-labelledby="programs-page-title"
            >
                <div className="programs-page__hero-grid" aria-hidden="true" />

                <div className="programs-page__hero-inner">
                    <div className="programs-page__hero-copy">
                        <span className="programs-page__eyebrow">
                            Programs + Project Lab
                        </span>

                        <h1 id="programs-page-title">
                            Learn the stack.
                            <span> Build the proof.</span>
                        </h1>

                        <p>
                            Choose an industry-focused learning track, practise
                            with guided labs, and leave with a capstone that
                            shows how you think—not only what you studied.
                        </p>

                        <div className="programs-page__hero-actions">
                            <a
                                className="programs-page__button programs-page__button--primary"
                                href="#programs"
                            >
                                Explore programs
                                <ArrowRight aria-hidden="true" />
                            </a>

                            <a
                                className="programs-page__button programs-page__button--ghost"
                                href="#projects"
                            >
                                View project briefs
                            </a>
                        </div>
                    </div>

                    <div className="programs-page__hero-visual">
                        <div
                            className="programs-page__hero-tilt"
                            data-programs-tilt
                            aria-hidden="true"
                        >
                            <div className="programs-page__hero-panel programs-page__hero-panel--back">
                                <span>LEARN</span>
                                <span>BUILD</span>
                                <span>DEPLOY</span>
                            </div>

                            <div className="programs-page__hero-panel programs-page__hero-panel--code">
                                <div className="programs-page__code-bar">
                                    <span />
                                    <span />
                                    <span />
                                    <small>Program.cs</small>
                                </div>

                                <div className="programs-page__code-copy">
                                    <span>
                                        <i>01</i>
                                        <b>var</b> path = new CareerTrack();
                                    </span>
                                    <span>
                                        <i>02</i>
                                        path.Learn(<em>&quot;Modern Stack&quot;</em>);
                                    </span>
                                    <span>
                                        <i>03</i>
                                        path.Build(<em>&quot;Real Project&quot;</em>);
                                    </span>
                                    <span>
                                        <i>04</i>
                                        path.Review().Deploy();
                                    </span>
                                </div>

                                <div className="programs-page__code-status">
                                    <span>
                                        <i />
                                        Build successful
                                    </span>
                                    <strong>Ready to showcase</strong>
                                </div>
                            </div>

                            <div className="programs-page__hero-panel programs-page__hero-panel--project">
                                <Code2 aria-hidden="true" />
                                <div>
                                    <span>Capstone 04</span>
                                    <strong>Working proof</strong>
                                </div>
                            </div>

                            <span className="programs-page__orbit-chip programs-page__orbit-chip--one">
                                .NET
                            </span>
                            <span className="programs-page__orbit-chip programs-page__orbit-chip--two">
                                React
                            </span>
                            <span className="programs-page__orbit-chip programs-page__orbit-chip--three">
                                D365
                            </span>
                            <span className="programs-page__orbit-chip programs-page__orbit-chip--four">
                                Azure AI
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <ul className="programs-page__proof" aria-label="Program approach">
                <li className="programs-page__proof-item">
                    <strong>04</strong>
                    <span>Focused career tracks</span>
                </li>
                <li className="programs-page__proof-item">
                    <strong>Learn</strong>
                    <span>Guided technical foundations</span>
                </li>
                <li className="programs-page__proof-item">
                    <strong>Build</strong>
                    <span>Practical project work</span>
                </li>
                <li className="programs-page__proof-item">
                    <strong>Show</strong>
                    <span>Portfolio-ready outcomes</span>
                </li>
            </ul>

            <section
                className="programs-page__programs"
                id="programs"
                aria-labelledby="programs-heading"
            >
                <div className="programs-page__section-heading programs-page__reveal">
                    <span className="programs-page__section-kicker">
                        Choose your path
                    </span>
                    <h2 id="programs-heading">
                        Four tracks. One practical standard.
                    </h2>
                    <p>
                        Each path combines focused technical learning with a
                        capstone brief that gives the skills a clear purpose.
                    </p>
                </div>

                <div className="programs-page__program-grid">
                    {programs.map((program, index) => {
                        const Icon = program.Icon;

                        return (
                            <article
                                className="programs-page__program-shell programs-page__reveal"
                                id={program.id}
                                key={program.id}
                            >
                                <div
                                    className="programs-page__program-card"
                                    data-programs-tilt
                                >
                                    <header className="programs-page__program-header">
                                        <div className="programs-page__program-icon">
                                            <Icon aria-hidden="true" />
                                        </div>

                                        <span>
                                            {String(index + 1).padStart(2, "0")}
                                            /04
                                        </span>
                                    </header>

                                    <span className="programs-page__program-label">
                                        {program.label}
                                    </span>
                                    <h3>{program.title}</h3>
                                    <p className="programs-page__program-description">
                                        {program.description}
                                    </p>

                                    <dl className="programs-page__program-meta">
                                        <div>
                                            <dt>Duration</dt>
                                            <dd>{program.duration}</dd>
                                        </div>
                                        <div>
                                            <dt>Level</dt>
                                            <dd>{program.level}</dd>
                                        </div>
                                    </dl>

                                    <ul
                                        className="programs-page__skills"
                                        aria-label={`${program.title} skills`}
                                    >
                                        {program.skills.map((skill) => (
                                            <li key={skill}>{skill}</li>
                                        ))}
                                    </ul>

                                    <div className="programs-page__capstone">
                                        <span>Capstone brief</span>
                                        <p>{program.project}</p>
                                    </div>

                                    <div className="programs-page__outcomes">
                                        <span>What you will practise</span>
                                        <ul>
                                            {program.outcomes.map((outcome) => (
                                                <li key={outcome}>{outcome}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <footer className="programs-page__program-footer">
                                        <span>{program.format}</span>
                                        <Link to="/#contact">
                                            Discuss this track
                                            <ArrowRight aria-hidden="true" />
                                        </Link>
                                    </footer>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </section>

            <section
                className="programs-page__journey"
                id="learning-path"
                aria-labelledby="journey-heading"
            >
                <div className="programs-page__section-heading programs-page__reveal">
                    <span className="programs-page__section-kicker">
                        The learning loop
                    </span>
                    <h2 id="journey-heading">
                        Knowledge becomes valuable when it moves.
                    </h2>
                    <p>
                        Every stage moves you closer to explaining and
                        demonstrating what you can build.
                    </p>
                </div>

                <div className="programs-page__journey-steps">
                    <div
                        className="programs-page__journey-track"
                        aria-hidden="true"
                    >
                        <span className="programs-page__journey-progress" />
                    </div>

                    {learningSteps.map((step) => (
                        <article
                            className="programs-page__journey-step"
                            key={step.number}
                        >
                            <span>{step.number}</span>
                            <h3>{step.title}</h3>
                            <p>{step.text}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section
                className="programs-page__projects"
                id="projects"
                aria-labelledby="projects-heading"
            >
                <div className="programs-page__section-heading programs-page__section-heading--projects programs-page__reveal">
                    <span className="programs-page__section-kicker">
                        Project Lab
                    </span>
                    <h2 id="projects-heading">
                        Projects designed to make learning visible.
                    </h2>
                    <p>
                        These are transparent capstone briefs—realistic products
                        learners can build, explain and extend as their skills
                        grow.
                    </p>
                </div>

                <div className="programs-page__project-grid">
                    {projects.map((project) => (
                        <article
                            className="programs-page__project-shell programs-page__reveal"
                            id={project.id}
                            key={project.id}
                        >
                            <div
                                className="programs-page__project-card"
                                data-programs-tilt
                            >
                                <div className="programs-page__project-media">
                                    <img
                                        src={project.image}
                                        alt={project.imageAlt}
                                        loading="lazy"
                                        decoding="async"
                                    />
                                    <span>{project.number}</span>
                                </div>

                                <div className="programs-page__project-content">
                                    <span className="programs-page__project-category">
                                        {project.category}
                                    </span>
                                    <h3>{project.title}</h3>
                                    <p>{project.description}</p>

                                    <div className="programs-page__project-build">
                                        <span>What gets built</span>
                                        <p>{project.build}</p>
                                    </div>

                                    <ul
                                        className="programs-page__project-stack"
                                        aria-label={`${project.title} technology stack`}
                                    >
                                        {project.stack.map((technology) => (
                                            <li key={technology}>
                                                {technology}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section
                className="programs-page__cta programs-page__reveal"
                aria-labelledby="programs-cta-heading"
            >
                <div>
                    <span className="programs-page__section-kicker">
                        Your next build starts here
                    </span>
                    <h2 id="programs-cta-heading">
                        Choose a track. Build something worth showing.
                    </h2>
                </div>

                <div className="programs-page__cta-actions">
                    <Link
                        className="programs-page__button programs-page__button--primary"
                        to="/#contact"
                    >
                        Book a consultation
                        <ArrowRight aria-hidden="true" />
                    </Link>
                    <Link
                        className="programs-page__button programs-page__button--ghost"
                        to="/services"
                    >
                        Explore services
                    </Link>
                </div>
            </section>
        </main>
    );
}

export default ProgramsPage;
