import { useEffect, useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    ArrowRight,
    Bot,
    Check,
    ChevronDown,
    Cloud,
    Code2,
    Gauge,
    Layers3,
    Rocket,
    Server,
    Sparkles,
    Target,
    Users,
    Workflow
} from "lucide-react";

import aspNetImage from "../images/asp.net.png";
import aiImage from "../images/Ai.png";
import careerImage from "../images/career.png";
import CinematicScrollOverlay from "../components/CinematicScrollOverlay";
import "./ServicesPage.css";

gsap.registerPlugin(ScrollTrigger);

const audiences = [
    {
        Icon: Target,
        label: "For businesses",
        title: "From idea to reliable software",
        description:
            "Plan, build and improve secure digital products without losing sight of the people and workflows they need to support.",
        items: [
            "Product engineering and modernization",
            "Cloud infrastructure and delivery",
            "AI-enabled business automation"
        ],
        href: "#software"
    },
    {
        Icon: Users,
        label: "For teams & talent",
        title: "From skill gaps to delivery-ready capability",
        description:
            "Turn modern technology into practical ability through guided labs, real projects and feedback from experienced mentors.",
        items: [
            "Custom corporate cohorts",
            "Live projects and capstones",
            "Career-focused mentorship"
        ],
        href: "#enablement"
    }
];

const capabilities = [
    {
        id: "software",
        index: "01",
        Icon: Server,
        eyebrow: "Business platforms",
        title: "Custom Software & ASP.NET Core",
        description:
            "Secure business platforms, APIs and workflow systems built around how your organization actually works.",
        bestFor:
            "Internal tools, customer portals, legacy replacement and connected business systems.",
        deliverables: [
            "Solution architecture and delivery blueprint",
            "Secure REST APIs and business integrations",
            "Role-based dashboards and administration",
            "Deployment documentation and handover"
        ],
        technologies: ["C#", "ASP.NET Core", "SQL Server", "Azure"],
        outcome:
            "A maintainable product foundation your team can understand, operate and extend.",
        image: aspNetImage,
        imagePosition: "center"
    },
    {
        id: "product",
        index: "02",
        Icon: Layers3,
        eyebrow: "Digital experiences",
        title: "Web & Product Engineering",
        description:
            "Responsive React experiences backed by scalable services, thoughtful interaction design and measurable performance.",
        bestFor:
            "New digital products, responsive portals, dashboards and frontend modernization.",
        deliverables: [
            "Responsive interfaces and reusable components",
            "Design-system foundations",
            "Backend and third-party API integration",
            "Accessibility, performance and quality review"
        ],
        technologies: ["React", "JavaScript", "REST APIs", "CSS"],
        outcome:
            "A polished experience that feels fast, consistent and ready for real users."
    },
    {
        id: "cloud",
        index: "03",
        Icon: Cloud,
        eyebrow: "Cloud foundations",
        title: "Azure Cloud & DevOps",
        description:
            "Reliable cloud foundations and repeatable delivery pipelines that make releases safer and operations easier to understand.",
        bestFor:
            "Cloud adoption, application deployment, environment standardization and release automation.",
        deliverables: [
            "Workload and infrastructure assessment",
            "Azure architecture and environment setup",
            "Continuous integration and delivery pipelines",
            "Monitoring, security and cost guidance"
        ],
        technologies: ["Microsoft Azure", "CI/CD", "Containers", "Monitoring"],
        outcome:
            "A visible, repeatable path from source code to a healthy production environment."
    },
    {
        id: "ai",
        index: "04",
        Icon: Bot,
        eyebrow: "Intelligent workflows",
        title: "AI, Copilot & Automation",
        description:
            "Useful assistants and automations embedded into real workflows, with clear boundaries and people remaining in control.",
        bestFor:
            "Knowledge assistants, repetitive workflows, support experiences and internal productivity.",
        deliverables: [
            "Use-case discovery and feasibility mapping",
            "Copilot and conversational experiences",
            "Azure AI and workflow integration",
            "Governance, testing and team handover"
        ],
        technologies: [
            "Azure AI",
            "Copilot Studio",
            "Prompt Design",
            "Automation"
        ],
        outcome:
            "Practical AI that removes friction instead of adding another disconnected tool.",
        image: aiImage,
        imagePosition: "center"
    },
    {
        id: "dynamics",
        index: "05",
        Icon: Workflow,
        eyebrow: "Connected operations",
        title: "Dynamics 365 & Power Platform",
        description:
            "Extend core business workflows and connect teams through focused low-code apps, reporting and automation.",
        bestFor:
            "CRM and ERP extensions, operational workflows, business reporting and process automation.",
        deliverables: [
            "Dynamics configuration and extensions",
            "Purpose-built Power Apps",
            "Power Automate workflows",
            "Reporting and system integrations"
        ],
        technologies: [
            "Dynamics 365",
            "Power Apps",
            "Power Automate",
            "Dataverse"
        ],
        outcome:
            "Connected processes that reduce manual work and make business information easier to act on."
    },
    {
        id: "enablement",
        index: "06",
        Icon: Rocket,
        eyebrow: "Capability building",
        title: "Corporate Training & Career Enablement",
        description:
            "Hands-on programs centered on live projects, expert feedback and outcomes that transfer directly to real work.",
        bestFor:
            "Technical teams, graduate cohorts, working professionals and career-focused learners.",
        deliverables: [
            "Custom learning path and cohort plan",
            "Instructor-led labs and live projects",
            "Capstone reviews and practical feedback",
            "Mentoring and progress reporting"
        ],
        technologies: [".NET", "Full Stack", "Cloud", "AI & Copilot"],
        outcome:
            "Confident people who can apply what they learned beyond the classroom.",
        image: careerImage,
        imagePosition: "center 45%"
    }
];

const processSteps = [
    {
        number: "01",
        title: "Discover",
        copy: "Clarify the goal, users, constraints and the result that would make the work valuable."
    },
    {
        number: "02",
        title: "Define",
        copy: "Turn discovery into a focused scope, solution blueprint and practical delivery milestones."
    },
    {
        number: "03",
        title: "Build",
        copy: "Work in visible increments with regular demonstrations, testing and feedback."
    },
    {
        number: "04",
        title: "Launch",
        copy: "Deploy with documentation, knowledge transfer and a clear operational handover."
    },
    {
        number: "05",
        title: "Improve",
        copy: "Use real feedback and system insight to prioritize the next meaningful improvement."
    }
];

const engagementModels = [
    {
        Icon: Rocket,
        tag: "Focused delivery",
        title: "MVP or modernization",
        description:
            "A defined outcome delivered through clear milestones—ideal for a new product, workflow or targeted upgrade.",
        points: ["Shared scope and priorities", "Incremental demonstrations", "Launch-ready handover"]
    },
    {
        Icon: Gauge,
        tag: "Ongoing capability",
        title: "Engineering support",
        description:
            "Flexible product and platform expertise that works alongside your team as needs evolve.",
        points: ["Prioritized delivery backlog", "Specialist technical support", "Continuous improvement"]
    },
    {
        Icon: Users,
        tag: "Team enablement",
        title: "Custom training cohort",
        description:
            "A practical learning experience designed around your technology, team level and business context.",
        points: ["Role-based curriculum", "Live labs and capstones", "Mentor feedback"]
    }
];

const faqs = [
    {
        question: "Can you improve an application that already exists?",
        answer:
            "Yes. We can begin with a focused review of the current product, architecture and delivery process, then recommend an incremental modernization path."
    },
    {
        question: "Do you work with both businesses and individual learners?",
        answer:
            "Yes. Software and cloud engagements are shaped around organizational needs, while training and mentoring can support teams, cohorts or career-focused learners."
    },
    {
        question: "Which technologies do you specialize in?",
        answer:
            "Our core strengths include ASP.NET Core, React, SQL Server, Microsoft Azure, Dynamics 365, Power Platform, Azure AI and Copilot experiences."
    },
    {
        question: "How does a new project begin?",
        answer:
            "It starts with a short discovery conversation about the goal, users, existing systems and constraints. From there, we can recommend a sensible first phase."
    },
    {
        question: "Is support available after launch?",
        answer:
            "Post-launch support can be included in the engagement plan, covering stabilization, knowledge transfer and prioritized improvements."
    }
];

function ServicesPage() {
    const pageRef = useRef(null);

    useEffect(() => {
        const previousTitle = document.title;
        document.title = "Services | Paarth Infotech";

        const refreshFrame = window.requestAnimationFrame(() => {
            ScrollTrigger.refresh();
        });

        return () => {
            window.cancelAnimationFrame(refreshFrame);
            document.title = previousTitle;
        };
    }, []);

    useLayoutEffect(() => {
        const media = gsap.matchMedia();

        const context = gsap.context(() => {
            media.add(
                "(prefers-reduced-motion: no-preference)",
                () => {
                    const heroTimeline = gsap.timeline({
                        defaults: { ease: "power3.out" }
                    });

                    heroTimeline
                        .from(".services-page-hero-copy > *", {
                            y: 46,
                            autoAlpha: 0,
                            duration: 0.9,
                            stagger: 0.11
                        })
                        .from(
                            ".services-page-hero-card",
                            {
                                y: 70,
                                z: -180,
                                rotationY: -10,
                                autoAlpha: 0,
                                duration: 1,
                                stagger: 0.12
                            },
                            "-=0.68"
                        );

                    gsap.to(".services-page-hero-grid", {
                        yPercent: 18,
                        scale: 1.08,
                        ease: "none",
                        scrollTrigger: {
                            trigger: ".services-page-hero",
                            start: "top top",
                            end: "bottom top",
                            scrub: 0.8
                        }
                    });

                    gsap.to(".services-page-hero-copy", {
                        yPercent: -10,
                        ease: "none",
                        scrollTrigger: {
                            trigger: ".services-page-hero",
                            start: "top top",
                            end: "bottom top",
                            scrub: 0.8
                        }
                    });

                    gsap.to(".services-page-hero-stage", {
                        yPercent: 14,
                        rotationZ: -1.5,
                        ease: "none",
                        scrollTrigger: {
                            trigger: ".services-page-hero",
                            start: "top top",
                            end: "bottom top",
                            scrub: 0.8
                        }
                    });

                    gsap.to(".services-page-hero-orb", {
                        yPercent: 30,
                        scale: 1.16,
                        ease: "none",
                        scrollTrigger: {
                            trigger: ".services-page-hero",
                            start: "top top",
                            end: "bottom top",
                            scrub: 1
                        }
                    });

                    gsap.utils
                        .toArray("[data-services-reveal]")
                        .forEach((element) => {
                            gsap.from(element, {
                                y: 64,
                                autoAlpha: 0,
                                duration: 0.9,
                                ease: "power3.out",
                                scrollTrigger: {
                                    trigger: element,
                                    start: "top 84%",
                                    toggleActions:
                                        "play none none reverse"
                                }
                            });
                        });

                    const navigationLinks = gsap.utils.toArray(
                        ".services-page-capability-nav a"
                    );
                    const capabilityPanels = gsap.utils.toArray(
                        ".services-page-capability-motion"
                    );

                    capabilityPanels.forEach((panel, index) => {
                        gsap.from(panel, {
                            y: 90,
                            rotationX: 5,
                            autoAlpha: 0,
                            duration: 1,
                            ease: "power3.out",
                            transformOrigin: "50% 100%",
                            scrollTrigger: {
                                trigger: panel,
                                start: "top 82%",
                                toggleActions: "play none none reverse"
                            }
                        });

                        ScrollTrigger.create({
                            trigger: panel,
                            start: "top 52%",
                            end: "bottom 52%",
                            onToggle: (self) => {
                                if (!self.isActive) return;

                                navigationLinks.forEach((link) =>
                                    link.classList.remove("is-active")
                                );
                                navigationLinks[index]?.classList.add(
                                    "is-active"
                                );
                            }
                        });

                        const image = panel.querySelector(
                            ".services-page-capability-image"
                        );

                        if (image) {
                            gsap.fromTo(
                                image,
                                { yPercent: -5 },
                                {
                                    yPercent: 5,
                                    ease: "none",
                                    scrollTrigger: {
                                        trigger: panel,
                                        start: "top bottom",
                                        end: "bottom top",
                                        scrub: 1
                                    }
                                }
                            );
                        }
                    });

                    gsap.fromTo(
                        ".services-page-process-progress",
                        { scaleX: 0 },
                        {
                            scaleX: 1,
                            ease: "none",
                            scrollTrigger: {
                                trigger: ".services-page-process-list",
                                start: "top 78%",
                                end: "bottom 64%",
                                scrub: 0.7
                            }
                        }
                    );
                }
            );

            media.add(
                "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
                () => {
                    const cleanupCallbacks = [];

                    gsap.utils
                        .toArray("[data-services-tilt]")
                        .forEach((panel) => {
                            const rotateX = gsap.quickTo(
                                panel,
                                "rotationX",
                                {
                                    duration: 0.45,
                                    ease: "power3.out"
                                }
                            );
                            const rotateY = gsap.quickTo(
                                panel,
                                "rotationY",
                                {
                                    duration: 0.45,
                                    ease: "power3.out"
                                }
                            );

                            const handlePointerMove = (event) => {
                                const bounds =
                                    panel.getBoundingClientRect();
                                const x =
                                    (event.clientX - bounds.left) /
                                    bounds.width;
                                const y =
                                    (event.clientY - bounds.top) /
                                    bounds.height;

                                rotateX((0.5 - y) * 5);
                                rotateY((x - 0.5) * 5);
                            };

                            const resetTilt = () => {
                                rotateX(0);
                                rotateY(0);
                            };

                            panel.addEventListener(
                                "pointermove",
                                handlePointerMove
                            );
                            panel.addEventListener(
                                "pointerleave",
                                resetTilt
                            );
                            panel.addEventListener("blur", resetTilt, true);

                            cleanupCallbacks.push(() => {
                                panel.removeEventListener(
                                    "pointermove",
                                    handlePointerMove
                                );
                                panel.removeEventListener(
                                    "pointerleave",
                                    resetTilt
                                );
                                panel.removeEventListener(
                                    "blur",
                                    resetTilt,
                                    true
                                );
                            });
                        });

                    return () => {
                        cleanupCallbacks.forEach((cleanup) => cleanup());
                    };
                }
            );
        }, pageRef);

        return () => {
            media.revert();
            context.revert();
        };
    }, []);

    return (
        <main className="services-page" ref={pageRef}>
            <CinematicScrollOverlay pageRef={pageRef} variant="services" />

            <section
                className="services-page-hero"
                aria-labelledby="services-page-title"
            >
                <div
                    className="services-page-hero-grid"
                    aria-hidden="true"
                />
                <div
                    className="services-page-hero-orb"
                    aria-hidden="true"
                />

                <div className="services-page-container services-page-hero-layout">
                    <div className="services-page-hero-copy">
                        <span className="services-page-kicker">
                            Services / Strategy to delivery
                        </span>

                        <h1 id="services-page-title">
                            Build smarter.
                            <span>Ship faster.</span>
                            Grow with confidence.
                        </h1>

                        <p>
                            We design production-ready digital products,
                            cloud systems and learning programs for
                            businesses, teams and ambitious developers.
                        </p>

                        <div className="services-page-actions">
                            <Link
                                className="services-page-button services-page-button-primary"
                                to="/#contact"
                            >
                                Start a project
                                <ArrowRight aria-hidden="true" />
                            </Link>
                            <a
                                className="services-page-button services-page-button-secondary"
                                href="#capabilities"
                            >
                                Explore services
                            </a>
                        </div>

                        <div className="services-page-techline">
                            <span>ASP.NET</span>
                            <span>React</span>
                            <span>Azure</span>
                            <span>AI</span>
                            <span>Dynamics 365</span>
                        </div>
                    </div>

                    <div
                        className="services-page-hero-stage"
                        aria-hidden="true"
                    >
                        <div
                            className="services-page-hero-stage-tilt"
                            data-services-tilt
                        >
                            <div className="services-page-hero-card services-page-hero-card-main">
                                <span>From concept</span>
                                <Sparkles />
                                <strong>Digital products that move</strong>
                                <div>
                                    <span>Strategy</span>
                                    <span>Engineering</span>
                                    <span>Scale</span>
                                </div>
                            </div>

                            <div className="services-page-hero-card services-page-hero-card-code">
                                <Code2 />
                                <div>
                                    <small>BUILD STATUS</small>
                                    <strong>Production ready</strong>
                                </div>
                                <span className="services-page-status-dot" />
                            </div>

                            <div className="services-page-hero-card services-page-hero-card-cloud">
                                <Cloud />
                                <span>Connected systems</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section
                className="services-page-audiences"
                aria-labelledby="services-audiences-title"
            >
                <div className="services-page-container">
                    <div
                        className="services-page-section-heading"
                        data-services-reveal
                    >
                        <span className="services-page-kicker">
                            Built around your next move
                        </span>
                        <h2 id="services-audiences-title">
                            Different challenges.
                            <span>One practical approach.</span>
                        </h2>
                    </div>

                    <div className="services-page-audience-grid">
                        {audiences.map((audience) => {
                            const Icon = audience.Icon;

                            return (
                                <article
                                    className="services-page-audience-motion"
                                    data-services-reveal
                                    key={audience.label}
                                >
                                    <div
                                        className="services-page-audience-card"
                                        data-services-tilt
                                    >
                                        <div className="services-page-audience-icon">
                                            <Icon aria-hidden="true" />
                                        </div>
                                        <span>{audience.label}</span>
                                        <h3>{audience.title}</h3>
                                        <p>{audience.description}</p>
                                        <ul>
                                            {audience.items.map((item) => (
                                                <li key={item}>
                                                    <Check
                                                        aria-hidden="true"
                                                    />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                        <a href={audience.href}>
                                            Explore this path
                                            <ArrowRight
                                                aria-hidden="true"
                                            />
                                        </a>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section
                className="services-page-capabilities"
                id="capabilities"
                aria-labelledby="services-capabilities-title"
            >
                <div className="services-page-container">
                    <div
                        className="services-page-section-heading services-page-section-heading-wide"
                        data-services-reveal
                    >
                        <span className="services-page-kicker">
                            Our capabilities
                        </span>
                        <h2 id="services-capabilities-title">
                            The expertise to move from
                            <span>possibility to production.</span>
                        </h2>
                        <p>
                            Choose a focused engagement or combine
                            capabilities into one connected delivery path.
                        </p>
                    </div>

                    <div className="services-page-capability-layout">
                        <nav
                            className="services-page-capability-nav"
                            aria-label="Service capabilities"
                        >
                            <span>Jump to a capability</span>
                            {capabilities.map((capability, index) => (
                                <a
                                    className={
                                        index === 0 ? "is-active" : ""
                                    }
                                    href={`#${capability.id}`}
                                    key={capability.id}
                                >
                                    <span>{capability.index}</span>
                                    {capability.title}
                                </a>
                            ))}
                        </nav>

                        <div className="services-page-capability-list">
                            {capabilities.map((capability) => {
                                const Icon = capability.Icon;

                                return (
                                    <div
                                        className="services-page-capability-motion"
                                        id={capability.id}
                                        key={capability.id}
                                    >
                                        <article
                                            className="services-page-capability"
                                            data-services-tilt
                                        >
                                            <div className="services-page-capability-copy">
                                                <div className="services-page-capability-meta">
                                                    <span>
                                                        {capability.index}
                                                    </span>
                                                    <div>
                                                        <Icon
                                                            aria-hidden="true"
                                                        />
                                                    </div>
                                                </div>

                                                <span className="services-page-capability-eyebrow">
                                                    {capability.eyebrow}
                                                </span>
                                                <h3>{capability.title}</h3>
                                                <p className="services-page-capability-description">
                                                    {
                                                        capability.description
                                                    }
                                                </p>

                                                <div className="services-page-best-for">
                                                    <span>Best suited for</span>
                                                    <p>
                                                        {capability.bestFor}
                                                    </p>
                                                </div>

                                                <ul className="services-page-deliverables">
                                                    {capability.deliverables.map(
                                                        (deliverable) => (
                                                            <li
                                                                key={
                                                                    deliverable
                                                                }
                                                            >
                                                                <Check
                                                                    aria-hidden="true"
                                                                />
                                                                {deliverable}
                                                            </li>
                                                        )
                                                    )}
                                                </ul>

                                                <div className="services-page-technologies">
                                                    {capability.technologies.map(
                                                        (technology) => (
                                                            <span
                                                                key={
                                                                    technology
                                                                }
                                                            >
                                                                {technology}
                                                            </span>
                                                        )
                                                    )}
                                                </div>

                                                <div className="services-page-outcome">
                                                    <Sparkles
                                                        aria-hidden="true"
                                                    />
                                                    <p>
                                                        {
                                                            capability.outcome
                                                        }
                                                    </p>
                                                </div>

                                                <Link
                                                    className="services-page-text-link"
                                                    to={`/?service=${capability.id}#contact`}
                                                >
                                                    Discuss this service
                                                    <ArrowRight
                                                        aria-hidden="true"
                                                    />
                                                </Link>
                                            </div>

                                            <div
                                                className={`services-page-capability-visual ${capability.image ? "has-image" : "is-abstract"}`}
                                                aria-hidden="true"
                                            >
                                                {capability.image ? (
                                                    <img
                                                        className="services-page-capability-image"
                                                        src={
                                                            capability.image
                                                        }
                                                        alt=""
                                                        loading="lazy"
                                                        decoding="async"
                                                        style={{
                                                            objectPosition:
                                                                capability.imagePosition
                                                        }}
                                                    />
                                                ) : (
                                                    <>
                                                        <div className="services-page-visual-grid" />
                                                        <Icon />
                                                    </>
                                                )}
                                                <div className="services-page-visual-shade" />
                                                <div className="services-page-visual-label">
                                                    <span>
                                                        {
                                                            capability.eyebrow
                                                        }
                                                    </span>
                                                    <strong>
                                                        {capability.index}
                                                    </strong>
                                                </div>
                                            </div>
                                        </article>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            <section
                className="services-page-process"
                aria-labelledby="services-process-title"
            >
                <div className="services-page-container">
                    <div
                        className="services-page-section-heading"
                        data-services-reveal
                    >
                        <span className="services-page-kicker">
                            A clear delivery rhythm
                        </span>
                        <h2 id="services-process-title">
                            From first conversation
                            <span>to the next improvement.</span>
                        </h2>
                    </div>

                    <div className="services-page-process-list">
                        <div
                            className="services-page-process-track"
                            aria-hidden="true"
                        >
                            <span className="services-page-process-progress" />
                        </div>

                        {processSteps.map((step) => (
                            <article
                                className="services-page-process-step"
                                data-services-reveal
                                key={step.number}
                            >
                                <span>{step.number}</span>
                                <h3>{step.title}</h3>
                                <p>{step.copy}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section
                className="services-page-engagements"
                aria-labelledby="services-engagements-title"
            >
                <div className="services-page-container">
                    <div
                        className="services-page-section-heading"
                        data-services-reveal
                    >
                        <span className="services-page-kicker">
                            Ways to work together
                        </span>
                        <h2 id="services-engagements-title">
                            Start with the model that
                            <span>fits the challenge.</span>
                        </h2>
                    </div>

                    <div className="services-page-engagement-grid">
                        {engagementModels.map((model) => {
                            const Icon = model.Icon;

                            return (
                                <article
                                    className="services-page-engagement-card"
                                    data-services-reveal
                                    key={model.title}
                                >
                                    <div>
                                        <Icon aria-hidden="true" />
                                    </div>
                                    <span>{model.tag}</span>
                                    <h3>{model.title}</h3>
                                    <p>{model.description}</p>
                                    <ul>
                                        {model.points.map((point) => (
                                            <li key={point}>
                                                <Check
                                                    aria-hidden="true"
                                                />
                                                {point}
                                            </li>
                                        ))}
                                    </ul>
                                    <Link to="/#contact">
                                        Explore with us
                                        <ArrowRight aria-hidden="true" />
                                    </Link>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section
                className="services-page-faq"
                aria-labelledby="services-faq-title"
            >
                <div className="services-page-container services-page-faq-layout">
                    <div
                        className="services-page-section-heading"
                        data-services-reveal
                    >
                        <span className="services-page-kicker">
                            Before we begin
                        </span>
                        <h2 id="services-faq-title">
                            A few helpful
                            <span>answers.</span>
                        </h2>
                        <p>
                            Every engagement starts with context. These are
                            the questions we hear most often.
                        </p>
                    </div>

                    <div
                        className="services-page-faq-list"
                        data-services-reveal
                    >
                        {faqs.map((faq) => (
                            <details key={faq.question}>
                                <summary>
                                    <span>{faq.question}</span>
                                    <ChevronDown aria-hidden="true" />
                                </summary>
                                <p>{faq.answer}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            <section className="services-page-closing">
                <div className="services-page-container">
                    <div
                        className="services-page-closing-card"
                        data-services-reveal
                    >
                        <div
                            className="services-page-closing-orb"
                            aria-hidden="true"
                        />
                        <span className="services-page-kicker">
                            Let&apos;s create what comes next
                        </span>
                        <h2>Have a challenge worth solving?</h2>
                        <p>
                            Tell us where you are today. We&apos;ll help map
                            the clearest next move.
                        </p>
                        <div className="services-page-actions">
                            <Link
                                className="services-page-button services-page-button-primary"
                                to="/#contact"
                            >
                                Book consultation
                                <ArrowRight aria-hidden="true" />
                            </Link>
                            <Link
                                className="services-page-button services-page-button-secondary"
                                to="/programs"
                            >
                                View programs
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default ServicesPage;
