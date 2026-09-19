import { useEffect, useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDownRight, ArrowRight, Layers3 } from "lucide-react";
import { projects, smallerProjects } from "../content/projects";

import {
    taskflowImage,
    cloudProjectImage,
    assistantProjectImage
} from "../content/imagery";
import "./PortfolioPage.css";

gsap.registerPlugin(ScrollTrigger);

function PortfolioPage() {
    const pageRef = useRef(null);

    useEffect(() => {
        const refreshFrame = window.requestAnimationFrame(() => {
            ScrollTrigger.refresh();
        });

        return () => {
            window.cancelAnimationFrame(refreshFrame);
        };
    }, []);

    useLayoutEffect(() => {
        const media = gsap.matchMedia();

        const context = gsap.context(() => {
            media.add("(prefers-reduced-motion: no-preference)", () => {
                const heroTimeline = gsap.timeline({
                    defaults: { ease: "power3.out" }
                });

                heroTimeline
                    .from(".portfolio-hero__eyebrow", {
                        y: 24,
                        autoAlpha: 0,
                        duration: 0.7
                    })
                    .from(
                        ".portfolio-hero__title-line > span",
                        {
                            yPercent: 115,
                            rotation: 2,
                            duration: 1,
                            stagger: 0.09
                        },
                        "-=0.35"
                    )
                    .from(
                        ".portfolio-hero__summary, .portfolio-hero__actions",
                        {
                            y: 30,
                            autoAlpha: 0,
                            duration: 0.8,
                            stagger: 0.1
                        },
                        "-=0.58"
                    )
                    .from(
                        ".portfolio-hero__card",
                        {
                            y: 90,
                            z: -160,
                            rotationX: 9,
                            autoAlpha: 0,
                            duration: 1,
                            stagger: 0.12
                        },
                        "-=0.82"
                    )
                    .from(
                        ".portfolio-hero__scroll",
                        { autoAlpha: 0, y: 14, duration: 0.6 },
                        "-=0.35"
                    );

                gsap.to(".portfolio-hero__grid", {
                    yPercent: 18,
                    scale: 1.1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".portfolio-hero",
                        start: "top top",
                        end: "bottom top",
                        scrub: 0.8
                    }
                });

                gsap.to(".portfolio-hero__copy", {
                    yPercent: -10,
                    autoAlpha: 0.3,
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".portfolio-hero",
                        start: "top top",
                        end: "bottom top",
                        scrub: 0.8
                    }
                });

                gsap.to(".portfolio-hero__stage", {
                    yPercent: 19,
                    rotation: -1.5,
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".portfolio-hero",
                        start: "top top",
                        end: "bottom top",
                        scrub: 0.9
                    }
                });

                gsap.utils
                    .toArray("[data-portfolio-reveal]")
                    .forEach((element) => {
                        gsap.from(element, {
                            y: 64,
                            autoAlpha: 0,
                            duration: 0.9,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: element,
                                start: "top 84%",
                                toggleActions: "play none none reverse"
                            }
                        });
                    });

                const projectBlocks = gsap.utils.toArray(
                    ".portfolio-project"
                );

                projectBlocks.forEach((block) => {
                    const frame = block.querySelector(
                        ".portfolio-project__frame"
                    );
                    const image = block.querySelector(
                        ".portfolio-project__image"
                    );
                    const copyItems = block.querySelectorAll(
                        ".portfolio-project__copy > *"
                    );
                    const floats = block.querySelectorAll(
                        ".portfolio-project__float"
                    );

                    gsap.from(frame, {
                        clipPath: "inset(10% 10% 10% 10% round 32px)",
                        scale: 0.94,
                        duration: 1.15,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: block,
                            start: "top 80%",
                            toggleActions: "play none none reverse"
                        }
                    });

                    gsap.from(copyItems, {
                        y: 46,
                        autoAlpha: 0,
                        duration: 0.8,
                        stagger: 0.08,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: block,
                            start: "top 72%",
                            toggleActions: "play none none reverse"
                        }
                    });

                    gsap.fromTo(
                        image,
                        { yPercent: -7, scale: 1.12 },
                        {
                            yPercent: 7,
                            scale: 1.02,
                            ease: "none",
                            scrollTrigger: {
                                trigger: block,
                                start: "top bottom",
                                end: "bottom top",
                                scrub: 1
                            }
                        }
                    );

                    floats.forEach((item, index) => {
                        gsap.fromTo(
                            item,
                            { yPercent: index % 2 === 0 ? 24 : -16 },
                            {
                                yPercent: index % 2 === 0 ? -24 : 20,
                                ease: "none",
                                scrollTrigger: {
                                    trigger: block,
                                    start: "top bottom",
                                    end: "bottom top",
                                    scrub: 1.2
                                }
                            }
                        );
                    });
                });

                gsap.fromTo(
                    ".portfolio-progress__fill",
                    { scaleY: 0 },
                    {
                        scaleY: 1,
                        ease: "none",
                        scrollTrigger: {
                            trigger: ".portfolio-projects",
                            start: "top 60%",
                            end: "bottom 40%",
                            scrub: 0.5
                        }
                    }
                );
            });

        }, pageRef);

        return () => {
            media.revert();
            context.revert();
        };
    }, []);

    return (
        <main id="main-content" tabIndex={-1} className="portfolio-page" ref={pageRef}>
            <section
                className="portfolio-hero"
                aria-labelledby="portfolio-page-title"
            >
                <div className="portfolio-hero__grid" aria-hidden="true" />
                <div className="portfolio-hero__glow" aria-hidden="true" />

                <div className="portfolio-shell portfolio-hero__layout">
                    <div className="portfolio-hero__copy">
                        <span className="portfolio-hero__eyebrow">
                            <i aria-hidden="true" />
                            Project concepts / Paarth Infotech
                        </span>

                        <h1 id="portfolio-page-title">
                            <span className="portfolio-hero__title-line">
                                <span>Ideas for</span>
                            </span>
                            <span className="portfolio-hero__title-line">
                                <span>what we can</span>
                            </span>
                            <span className="portfolio-hero__title-line portfolio-hero__title-line--accent">
                                <span>build together.</span>
                            </span>
                        </h1>

                        <p className="portfolio-hero__summary">
                            Explore illustrative project concepts across education, cloud operations and enterprise software. These examples describe possible approaches, not delivered client work.
                        </p>

                        <div className="portfolio-hero__actions">
                            <a href="#featured-work">
                                Explore the concepts
                                <ArrowDownRight aria-hidden="true" />
                            </a>
                            <Link to="/#contact">Start a project</Link>
                        </div>
                    </div>

                    <div
                        className="portfolio-hero__stage"
                        aria-hidden="true"
                    >
                        <div className="portfolio-hero__card portfolio-hero__card--back">
                            <img src={cloudProjectImage} alt="" width="1536" height="1024" decoding="async" />
                            <span>Cloud operations</span>
                        </div>
                        <div className="portfolio-hero__card portfolio-hero__card--middle">
                            <img src={assistantProjectImage} alt="" width="1536" height="1024" decoding="async" />
                            <span>Learning assistant</span>
                        </div>
                        <div className="portfolio-hero__card portfolio-hero__card--front">
                            <div className="portfolio-hero__window-bar">
                                <i />
                                <i />
                                <i />
                                <span>paarth / concept-studio</span>
                            </div>
                            <img src={taskflowImage} alt="" width="1536" height="1024" decoding="async" fetchPriority="high" />
                            <div className="portfolio-hero__card-label">
                                <span>Featured concept</span>
                                <strong>TaskFlow · Team task board</strong>
                            </div>
                        </div>
                    </div>
                </div>

                <a className="portfolio-hero__scroll" href="#portfolio-intro">
                    <span>Scroll to discover</span>
                    <i aria-hidden="true" />
                </a>
            </section>

            <section className="portfolio-intro" id="portfolio-intro">
                <div className="portfolio-shell portfolio-intro__layout">
                    <p
                        className="portfolio-intro__kicker"
                        data-portfolio-reveal
                    >
                        Strategy. Experience. Engineering.
                    </p>
                    <div data-portfolio-reveal>
                        <h2>
                            A problem. A direction.
                            <span>A possible product.</span>
                        </h2>
                        <p>
                            Each concept connects a common challenge to a proposed experience and technology stack. AI-generated concept visuals bring these ideas to life; they are not screenshots of delivered products.
                        </p>
                        <span className="portfolio-intro__note">
                            Concept projects · No client delivery or measured results are claimed.
                        </span>
                    </div>
                </div>
            </section>

            <section
                className="portfolio-projects"
                id="featured-work"
                aria-labelledby="featured-work-title"
            >
                <div className="portfolio-shell portfolio-projects__heading">
                    <span data-portfolio-reveal>Illustrative concepts</span>
                    <h2 id="featured-work-title" data-portfolio-reveal>
                        A closer look at the possibilities.
                    </h2>
                </div>

                <div className="portfolio-progress" aria-hidden="true">
                    <span className="portfolio-progress__line">
                        <i className="portfolio-progress__fill" />
                    </span>
                    <small>01</small>
                    <small>04</small>
                </div>

                {projects.map((project) => {
                    const Icon = project.Icon;

                    return (
                        <article
                            className={`portfolio-project portfolio-project--${project.accent} ${
                                project.direction === "reverse"
                                    ? "portfolio-project--reverse"
                                    : ""
                            }`}
                            key={project.number}
                        >
                            <div className="portfolio-shell portfolio-project__inner">
                                <div className="portfolio-project__copy">
                                    <span className="portfolio-project__number">
                                        {project.number}
                                    </span>
                                    <span className="portfolio-project__eyebrow">
                                        <Icon aria-hidden="true" />
                                        {project.eyebrow}
                                    </span>
                                    <h3>{project.title}</h3>
                                    <p>{project.description}</p>

                                    <dl className="portfolio-project__outcomes">
                                        {project.outcomes.map(
                                            ([value, label]) => (
                                                <div key={label}>
                                                    <dt>{value}</dt>
                                                    <dd>{label}</dd>
                                                </div>
                                            )
                                        )}
                                    </dl>

                                    <ul
                                        className="portfolio-project__tags"
                                        aria-label={`${project.title} technology stack`}
                                    >
                                        {project.tags.map((tag) => (
                                            <li key={tag}>{tag}</li>
                                        ))}
                                    </ul>

                                    <Link
                                        className="portfolio-project__link"
                                        to="/#contact"
                                    >
                                        Build something similar
                                        <ArrowRight aria-hidden="true" />
                                    </Link>
                                </div>

                                <div className="portfolio-project__visual">
                                    <div className="portfolio-project__frame">
                                        <div className="portfolio-project__browser">
                                            <span />
                                            <span />
                                            <span />
                                            <small>
                                                Concept project / {project.number}
                                            </small>
                                        </div>
                                        <div className="portfolio-project__media">
                                            <img
                                                className="portfolio-project__image"
                                                src={project.image}
                                                alt={project.imageAlt}
                                                width="1536"
                                                height="1024"
                                                loading="lazy"
                                                decoding="async"
                                            />
                                            <div className="portfolio-project__shade" />
                                            <span className="portfolio-project__watermark">
                                                {project.number}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="portfolio-project__float portfolio-project__float--status">
                                        <span>
                                            <i aria-hidden="true" />
                                            {project.cardLabel}
                                        </span>
                                        <strong>{project.cardValue}</strong>
                                    </div>

                                    <div className="portfolio-project__float portfolio-project__float--build">
                                        <Layers3 aria-hidden="true" />
                                        <span>
                                            <small>Proposed approach</small>
                                            <strong>Design + Engineering</strong>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </section>

            <section
                className="portfolio-more"
                aria-labelledby="portfolio-more-title"
            >
                <div className="portfolio-shell">
                    <div
                        className="portfolio-more__heading"
                        data-portfolio-reveal
                    >
                        <span>More from the studio</span>
                        <h2 id="portfolio-more-title">
                            Every idea starts with a useful problem.
                        </h2>
                    </div>

                    <div className="portfolio-more__grid">
                        {smallerProjects.map((project) => {
                            const Icon = project.Icon;

                            return (
                                <article
                                    className={`portfolio-more-card ${project.className}`}
                                    data-portfolio-reveal
                                    key={project.title}
                                >
                                    <img
                                        src={project.image}
                                        alt={project.imageAlt}
                                        width="1536"
                                        height="1024"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                    <div className="portfolio-more-card__shade" />
                                    <div className="portfolio-more-card__top">
                                        <span>Project concept</span>
                                        <Icon aria-hidden="true" />
                                    </div>
                                    <div className="portfolio-more-card__copy">
                                        <span>{project.type}</span>
                                        <h3>{project.title}</h3>
                                        <p>{project.copy}</p>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="portfolio-marquee" aria-label="Our approach">
                <div className="portfolio-marquee__track">
                    {[0, 1].map((group) => (
                        <div aria-hidden={group === 1} key={group}>
                            <span>Think clearly</span>
                            <i />
                            <span>Design boldly</span>
                            <i />
                            <span>Build reliably</span>
                            <i />
                            <span>Learn continuously</span>
                            <i />
                        </div>
                    ))}
                </div>
            </section>

            <section className="portfolio-closing">
                <div className="portfolio-closing__orb" aria-hidden="true" />
                <div className="portfolio-shell" data-portfolio-reveal>
                    <span>Have a project in mind?</span>
                    <h2>
                        Let&apos;s make your next
                        <em>success story.</em>
                    </h2>
                    <Link to="/#contact">
                        Start a conversation
                        <ArrowRight aria-hidden="true" />
                    </Link>
                </div>
            </section>
        </main>
    );
}

export default PortfolioPage;
