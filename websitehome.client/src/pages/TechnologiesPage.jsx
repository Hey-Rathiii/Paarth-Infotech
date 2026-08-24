import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    ArrowRight,
    Bot,
    Boxes,
    Braces,
    Cloud,
    Code2,
    Database,
    Gauge,
    Layers3,
    ShieldCheck,
    Workflow
} from "lucide-react";
import "./TechnologiesPage.css";

gsap.registerPlugin(ScrollTrigger);

const categories = ["All", "Frontend", "Backend", "Cloud", "Data", "AI & Automation"];

const technologies = [
    {
        name: "React",
        category: "Frontend",
        Icon: Braces,
        difficulty: 2,
        trend: "Strong demand",
        summary: "A component-based JavaScript library for building responsive web interfaces and product dashboards.",
        why: "React remains a practical choice for teams that need reusable UI, a large ecosystem and developers who can work across web products.",
        prerequisites: "HTML, CSS and modern JavaScript",
        learningTime: "6–10 weeks",
        next: "Build a dashboard that consumes a real API.",
        tools: ["JavaScript", "Vite", "React Router", "State management"]
    },
    {
        name: "ASP.NET Core",
        category: "Backend",
        Icon: Code2,
        difficulty: 3,
        trend: "Enterprise staple",
        summary: "Microsoft’s cross-platform framework for secure APIs, business applications and high-performance backend services.",
        why: "It is especially relevant for enterprise systems, Microsoft-focused organisations and products that need strong typing and mature tooling.",
        prerequisites: "C# fundamentals and basic SQL",
        learningTime: "10–16 weeks",
        next: "Create an authenticated REST API with roles.",
        tools: ["C#", "Entity Framework", "REST APIs", "Identity"]
    },
    {
        name: "SQL Server",
        category: "Data",
        Icon: Database,
        difficulty: 2,
        trend: "Always relevant",
        summary: "A relational database platform used to store, query and protect structured business data.",
        why: "Most business applications still depend on reliable relational data, clear reporting and transactions that behave predictably.",
        prerequisites: "No programming experience required",
        learningTime: "4–8 weeks",
        next: "Design a normalized database and reporting queries.",
        tools: ["T-SQL", "Joins", "Indexes", "Stored procedures"]
    },
    {
        name: "Microsoft Azure",
        category: "Cloud",
        Icon: Cloud,
        difficulty: 3,
        trend: "Cloud-first growth",
        summary: "A cloud platform for deploying applications, databases, identity, monitoring and AI services.",
        why: "Azure connects naturally with .NET, Microsoft 365 and enterprise identity, making it valuable for production deployment skills.",
        prerequisites: "Web fundamentals and one backend stack",
        learningTime: "8–14 weeks",
        next: "Deploy and monitor a full-stack application.",
        tools: ["App Service", "Azure SQL", "Entra ID", "Monitor"]
    },
    {
        name: "Docker & DevOps",
        category: "Cloud",
        Icon: Boxes,
        difficulty: 3,
        trend: "Expected skill",
        summary: "Containers and automated delivery practices that make software consistent from a developer’s machine to production.",
        why: "Teams increasingly expect developers to understand builds, environments, deployment pipelines and operational responsibility.",
        prerequisites: "Command line, Git and application basics",
        learningTime: "6–10 weeks",
        next: "Containerize an API and automate its deployment.",
        tools: ["Docker", "GitHub Actions", "CI/CD", "Observability"]
    },
    {
        name: "Azure AI & RAG",
        category: "AI & Automation",
        Icon: Bot,
        difficulty: 4,
        trend: "Rapidly evolving",
        summary: "AI services and retrieval patterns for assistants that answer using controlled business knowledge.",
        why: "The useful opportunity is moving from generic chatbots to grounded systems with permissions, evaluation and human oversight.",
        prerequisites: "APIs, backend development and data basics",
        learningTime: "10–16 weeks",
        next: "Build a cited assistant over approved documents.",
        tools: ["Azure OpenAI", "Embeddings", "Vector search", "Evaluation"]
    },
    {
        name: "Power Platform",
        category: "AI & Automation",
        Icon: Workflow,
        difficulty: 2,
        trend: "Business adoption",
        summary: "Low-code tools for building internal apps, automating workflows and connecting Microsoft business data.",
        why: "It helps organisations solve smaller operational problems quickly while developers handle governance and complex integrations.",
        prerequisites: "Process thinking and data fundamentals",
        learningTime: "4–8 weeks",
        next: "Automate an approval flow with an auditable record.",
        tools: ["Power Apps", "Power Automate", "Dataverse", "Copilot Studio"]
    },
    {
        name: "Dynamics 365",
        category: "Backend",
        Icon: Layers3,
        difficulty: 4,
        trend: "Specialist demand",
        summary: "Microsoft’s enterprise platform for finance, operations, sales and customer-service workflows.",
        why: "It is a specialised path with a steeper learning curve, but it connects software skills directly to real organisational processes.",
        prerequisites: "Business-process knowledge and programming basics",
        learningTime: "12–20 weeks",
        next: "Extend one end-to-end finance or operations process.",
        tools: ["X++", "Dataverse", "Integrations", "SSRS"]
    }
];

const difficultyLabels = ["Foundation", "Approachable", "Intermediate", "Advanced", "Specialist"];
const cardAccents = ["#61dafb", "#8ab4f8", "#f2b84b", "#55b6ff", "#6dd6a8", "#b992ff", "#de7cff", "#77a7ff"];

function Difficulty({ level }) {
    return (
        <div className="technologies-page__difficulty" aria-label={`Difficulty: ${difficultyLabels[level - 1]}`}>
            <span>{difficultyLabels[level - 1]}</span>
            <span className="technologies-page__difficulty-bars" aria-hidden="true">
                {[1, 2, 3, 4, 5].map((bar) => (
                    <i className={bar <= level ? "is-active" : ""} key={bar} />
                ))}
            </span>
        </div>
    );
}

function TechnologiesPage() {
    const pageRef = useRef(null);
    const [activeCategory, setActiveCategory] = useState("All");
    const visibleTechnologies = useMemo(
        () => activeCategory === "All"
            ? technologies
            : technologies.filter((technology) => technology.category === activeCategory),
        [activeCategory]
    );

    useEffect(() => {
        const previousTitle = document.title;
        document.title = "Technologies & Learning Difficulty | Paarth Infotech";
        return () => { document.title = previousTitle; };
    }, []);

    useLayoutEffect(() => {
        const media = gsap.matchMedia();
        const context = gsap.context(() => {
            media.add("(prefers-reduced-motion: no-preference)", () => {
                const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });

                heroTimeline
                    .from(".technologies-page__eyebrow", { y: 20, autoAlpha: 0, duration: .6 })
                    .from(".technologies-page__hero h1", { y: 65, autoAlpha: 0, duration: .95 }, "-=.28")
                    .from(".technologies-page__hero-copy > p, .technologies-page__hero-copy > a", { y: 28, autoAlpha: 0, duration: .68, stagger: .08 }, "-=.48")
                    .from(".technologies-page__signal-board", { y: 42, autoAlpha: 0, scale: .97, duration: .82 }, "-=.36")
                    .from(".technologies-page__signal-board li", { x: 24, autoAlpha: 0, duration: .5, stagger: .08 }, "-=.42");

                gsap.to(".technologies-page__hero-grid", {
                    yPercent: 15,
                    ease: "none",
                    scrollTrigger: { trigger: ".technologies-page__hero", start: "top top", end: "bottom top", scrub: .8 }
                });

                gsap.from(".technologies-page__principles article", {
                    y: 44,
                    autoAlpha: 0,
                    duration: .75,
                    stagger: .11,
                    ease: "power3.out",
                    scrollTrigger: { trigger: ".technologies-page__principles-grid", start: "top 85%" }
                });

                gsap.from(".technologies-page__section-heading > *, .technologies-page__filters", {
                    y: 38,
                    autoAlpha: 0,
                    duration: .72,
                    stagger: .1,
                    ease: "power3.out",
                    scrollTrigger: { trigger: ".technologies-page__section-heading", start: "top 84%" }
                });

                gsap.from(".technologies-page__grid", {
                    y: 25,
                    autoAlpha: 0,
                    duration: .55,
                    ease: "power3.out",
                    scrollTrigger: { trigger: ".technologies-page__grid", start: "top 88%" }
                });

                gsap.from(".technologies-page__path-inner > *", {
                    y: 42,
                    autoAlpha: 0,
                    duration: .8,
                    stagger: .12,
                    ease: "power3.out",
                    scrollTrigger: { trigger: ".technologies-page__path", start: "top 76%" }
                });
            });
        }, pageRef);

        return () => {
            media.revert();
            context.revert();
        };
    }, []);

    useLayoutEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

        const animation = gsap.fromTo(
            ".technology-card",
            { y: 34, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: .58, stagger: .065, ease: "power3.out", clearProps: "transform,opacity,visibility" }
        );

        return () => animation.kill();
    }, [activeCategory]);

    return (
        <main className="technologies-page" ref={pageRef}>
            <section className="technologies-page__hero">
                <div className="technologies-page__hero-grid" aria-hidden="true" />
                <div className="technologies-page__shell technologies-page__hero-inner">
                    <div>
                        <span className="technologies-page__eyebrow"><Gauge aria-hidden="true" /> Technology guide</span>
                        <h1>Choose technology with <em>context</em>, not hype.</h1>
                    </div>
                    <div className="technologies-page__hero-copy">
                        <p>Understand what each technology does, why teams use it, how difficult it is to learn and what you should build first.</p>
                        <a href="#technology-directory">Explore the directory <ArrowRight aria-hidden="true" /></a>
                        <div className="technologies-page__signal-board" aria-label="A practical technology learning sequence">
                            <div className="technologies-page__signal-head"><span>Learning signal</span><small>Practical path</small></div>
                            <ol>
                                <li><span>01</span><strong>Foundation</strong><small>Language + data</small></li>
                                <li><span>02</span><strong>Application</strong><small>Frontend + API</small></li>
                                <li><span>03</span><strong>Production</strong><small>Cloud + delivery</small></li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>

            <section className="technologies-page__principles" aria-label="How to read technology trends">
                <div className="technologies-page__shell technologies-page__principles-grid">
                    <article><span>01</span><h2>Trend is not a guarantee</h2><p>Demand varies by role, location and company. Build transferable fundamentals before chasing a tool.</p></article>
                    <article><span>02</span><h2>Difficulty is contextual</h2><p>Our levels consider prerequisites, ecosystem size and the time needed to build independently.</p></article>
                    <article><span>03</span><h2>Projects prove understanding</h2><p>A small working product demonstrates more than a long list of technologies on a résumé.</p></article>
                </div>
            </section>

            <section className="technologies-page__directory" id="technology-directory">
                <div className="technologies-page__shell">
                    <div className="technologies-page__section-heading">
                        <div><span>Technology directory</span><h2>What is worth learning—and why.</h2></div>
                        <p>Difficulty runs from Foundation to Specialist. It describes the path to practical independence, not intelligence.</p>
                    </div>

                    <div className="technologies-page__filters" aria-label="Filter technologies by category">
                        {categories.map((category) => (
                            <button
                                type="button"
                                className={activeCategory === category ? "is-active" : ""}
                                aria-pressed={activeCategory === category}
                                onClick={() => setActiveCategory(category)}
                                key={category}
                            >{category}</button>
                        ))}
                    </div>

                    <div className="technologies-page__grid" aria-live="polite">
                        {visibleTechnologies.map((technology) => {
                            const Icon = technology.Icon;
                            const technologyNumber = technologies.indexOf(technology) + 1;
                            return (
                                <article
                                    className="technology-card"
                                    style={{ "--card-accent": cardAccents[technologyNumber - 1] }}
                                    key={technology.name}
                                >
                                    <div className="technology-card__top">
                                        <span className="technology-card__icon"><Icon aria-hidden="true" /></span>
                                        <div className="technology-card__meta">
                                            <span className="technology-card__trend">{technology.trend}</span>
                                            <span className="technology-card__number">{String(technologyNumber).padStart(2, "0")}</span>
                                        </div>
                                    </div>
                                    <span className="technology-card__category">{technology.category}</span>
                                    <h3>{technology.name}</h3>
                                    <p className="technology-card__summary">{technology.summary}</p>
                                    <Difficulty level={technology.difficulty} />
                                    <div className="technology-card__why"><strong>Why it matters now</strong><p>{technology.why}</p></div>
                                    <dl className="technology-card__facts">
                                        <div><dt>Start with</dt><dd>{technology.prerequisites}</dd></div>
                                        <div><dt>Typical foundation</dt><dd>{technology.learningTime}</dd></div>
                                    </dl>
                                    <ul aria-label={`${technology.name} topics`}>{technology.tools.map((tool) => <li key={tool}>{tool}</li>)}</ul>
                                    <div className="technology-card__next"><ShieldCheck aria-hidden="true" /><span><small>First useful project</small><strong>{technology.next}</strong></span></div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="technologies-page__path">
                <div className="technologies-page__shell technologies-page__path-inner">
                    <div><span>Unsure where to begin?</span><h2>Start with the role you want—not the longest tool list.</h2></div>
                    <div><p>Tell us your current experience and target role. We’ll suggest a realistic learning sequence and a first project.</p><Link to="/#contact">Discuss your learning path <ArrowRight aria-hidden="true" /></Link></div>
                </div>
            </section>
        </main>
    );
}

export default TechnologiesPage;
