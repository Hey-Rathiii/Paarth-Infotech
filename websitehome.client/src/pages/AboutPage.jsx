import { useEffect, useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    ArrowDownRight,
    ArrowRight,
    BookOpen,
    Code2,
    HeartHandshake,
    MessageSquareText,
    ShieldCheck,
    UsersRound
} from "lucide-react";
import careerImage from "../images/career.png";
import projectsImage from "../images/projects.png";
import fullStackImage from "../images/fullstack.png";
import "./AboutPage.css";

gsap.registerPlugin(ScrollTrigger);

const principles = [
    {
        number: "01",
        title: "Learn by making",
        text: "Concepts become useful when they are applied to a working feature, reviewed carefully and improved more than once.",
        Icon: BookOpen
    },
    {
        number: "02",
        title: "Explain the trade-offs",
        text: "We do not teach one magic answer. We help people understand why a technical decision fits one situation and not another.",
        Icon: MessageSquareText
    },
    {
        number: "03",
        title: "Build responsibly",
        text: "Reliable software includes security, accessibility, maintainability and respect for the people who will actually use it.",
        Icon: ShieldCheck
    },
    {
        number: "04",
        title: "Stay close to the work",
        text: "Small teams, direct conversations and visible progress keep learning and product delivery grounded in real needs.",
        Icon: HeartHandshake
    }
];

const workingSteps = [
    ["Listen", "Understand the person, problem and constraints before recommending a course or technical approach."],
    ["Plan", "Turn the goal into a realistic sequence with clear milestones and a useful first outcome."],
    ["Build", "Work through implementation, feedback and the difficult middle—not only the polished demonstration."],
    ["Transfer", "Leave people able to explain, maintain and continue what has been created." ]
];

function AboutPage() {
    const pageRef = useRef(null);

    useEffect(() => {
        const previousTitle = document.title;
        document.title = "About Paarth Infotech";
        return () => { document.title = previousTitle; };
    }, []);

    useLayoutEffect(() => {
        const media = gsap.matchMedia();
        const context = gsap.context(() => {
            media.add("(prefers-reduced-motion: no-preference)", () => {
                const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });

                heroTimeline
                    .from(".about-page__eyebrow", { y: 22, autoAlpha: 0, duration: .65 })
                    .from(".about-page__hero h1", { y: 70, autoAlpha: 0, duration: 1 }, "-=.3")
                    .from(".about-page__hero-lead", { y: 30, autoAlpha: 0, duration: .75 }, "-=.52")
                    .from(".about-page__missions article", { y: 38, autoAlpha: 0, duration: .72, stagger: .12 }, "-=.45")
                    .from(".about-page__scroll", { autoAlpha: 0, y: 12, duration: .5 }, "-=.25");

                gsap.to(".about-page__hero-grid", {
                    yPercent: 14,
                    ease: "none",
                    scrollTrigger: { trigger: ".about-page__hero", start: "top top", end: "bottom top", scrub: .8 }
                });

                gsap.utils.toArray("[data-about-reveal]").forEach((element) => {
                    gsap.from(element, {
                        y: 56,
                        autoAlpha: 0,
                        duration: .85,
                        ease: "power3.out",
                        scrollTrigger: { trigger: element, start: "top 84%", toggleActions: "play none none reverse" }
                    });
                });

                gsap.from(".about-page__collage-main", {
                    clipPath: "inset(12% 10% 12% 10% round 25px)",
                    scale: .94,
                    duration: 1.1,
                    ease: "power3.out",
                    scrollTrigger: { trigger: ".about-page__collage", start: "top 80%" }
                });
                gsap.from(".about-page__collage-small", {
                    x: -50,
                    y: 45,
                    autoAlpha: 0,
                    duration: .9,
                    ease: "power3.out",
                    scrollTrigger: { trigger: ".about-page__collage", start: "top 72%" }
                });
                gsap.to(".about-page__collage-main img", {
                    yPercent: 8,
                    scale: 1.06,
                    ease: "none",
                    scrollTrigger: { trigger: ".about-page__collage", start: "top bottom", end: "bottom top", scrub: 1 }
                });

                gsap.from(".about-page__framework-grid article", {
                    y: 50,
                    autoAlpha: 0,
                    duration: .75,
                    stagger: .12,
                    ease: "power3.out",
                    scrollTrigger: { trigger: ".about-page__framework-grid", start: "top 80%" }
                });

                gsap.from(".about-page__people-media img", {
                    scale: 1.14,
                    duration: 1.4,
                    ease: "power2.out",
                    scrollTrigger: { trigger: ".about-page__people", start: "top 72%" }
                });
                gsap.from(".about-page__people-copy > *", {
                    x: 45,
                    autoAlpha: 0,
                    duration: .75,
                    stagger: .08,
                    ease: "power3.out",
                    scrollTrigger: { trigger: ".about-page__people-copy", start: "top 75%" }
                });

                gsap.from(".about-page__principles-grid article", {
                    y: 46,
                    autoAlpha: 0,
                    duration: .72,
                    stagger: .1,
                    ease: "power3.out",
                    scrollTrigger: { trigger: ".about-page__principles-grid", start: "top 82%" }
                });

                gsap.from(".about-page__method li", {
                    x: 42,
                    autoAlpha: 0,
                    duration: .68,
                    stagger: .11,
                    ease: "power3.out",
                    scrollTrigger: { trigger: ".about-page__method ol", start: "top 82%" }
                });

                gsap.from(".about-page__closing > div > *", {
                    y: 45,
                    autoAlpha: 0,
                    duration: .8,
                    stagger: .1,
                    ease: "power3.out",
                    scrollTrigger: { trigger: ".about-page__closing", start: "top 72%" }
                });
            });
        }, pageRef);

        return () => {
            media.revert();
            context.revert();
        };
    }, []);

    return (
        <main className="about-page" ref={pageRef}>
            <section className="about-page__hero" aria-labelledby="about-title">
                <div className="about-page__hero-grid" aria-hidden="true" />
                <div className="about-page__shell about-page__hero-inner">
                    <span className="about-page__eyebrow">About Paarth Infotech</span>
                    <h1 id="about-title">One company.<br /><em>Two commitments.</em></h1>
                    <p className="about-page__hero-lead">Technology should help people move forward—whether they are learning to build it or trusting us to build with them.</p>
                    <div className="about-page__missions">
                        <article><span>For learners</span><h2>Turn technical knowledge into confident, practical ability.</h2><Link to="/programs">Explore programs <ArrowRight aria-hidden="true" /></Link></article>
                        <article><span>For businesses</span><h2>Turn useful ideas into dependable digital products.</h2><Link to="/services">Explore services <ArrowRight aria-hidden="true" /></Link></article>
                    </div>
                    <a className="about-page__scroll" href="#our-story">Our approach <ArrowDownRight aria-hidden="true" /></a>
                </div>
            </section>

            <section className="about-page__story" id="our-story">
                <div className="about-page__shell about-page__story-grid">
                    <div className="about-page__story-copy" data-about-reveal>
                        <span className="about-page__section-label">Who we are</span>
                        <h2>A training partner and product studio, built around the same belief.</h2>
                        <p className="about-page__story-intro">People understand technology best when they use it to solve something real.</p>
                        <p>Paarth Infotech brings software education and product development into one practice. Learners work with realistic requirements, complete applications and direct feedback. Businesses get thoughtful engineering with clear communication and maintainable foundations.</p>
                        <p>That combination keeps our teaching connected to current delivery work—and keeps our delivery process curious, explainable and human.</p>
                    </div>
                    <div className="about-page__collage" aria-label="Learning and product development at Paarth Infotech">
                        <figure className="about-page__collage-main"><img src={projectsImage} alt="A development workspace representing practical project work" /><figcaption>Build what you can explain.</figcaption></figure>
                        <figure className="about-page__collage-small"><img src={careerImage} alt="A career pathway representing guided technical growth" /><figcaption>Progress with direction.</figcaption></figure>
                        <span className="about-page__collage-note">Learning ↔ Delivery</span>
                    </div>
                </div>
            </section>

            <section className="about-page__framework" aria-labelledby="framework-title">
                <div className="about-page__shell">
                    <div className="about-page__section-heading" data-about-reveal><span className="about-page__section-label">Our foundation</span><h2 id="framework-title">What guides the work.</h2></div>
                    <div className="about-page__framework-grid">
                        <article><span>Mission</span><h3>Make practical technology learning and dependable software more accessible.</h3><p>We connect clear explanation with real implementation so progress is visible, useful and repeatable.</p></article>
                        <article><span>Vision</span><h3>A local technology community that can learn, build and create opportunities together.</h3><p>Growth should not depend on memorising tools. It should come from judgment, confidence and continued practice.</p></article>
                        <article><span>Promise</span><h3>Be honest about the work, the difficulty and the next useful step.</h3><p>No invented shortcuts or unnecessary complexity—just thoughtful guidance, feedback and accountable delivery.</p></article>
                    </div>
                </div>
            </section>

            <section className="about-page__people">
                <div className="about-page__people-media"><img src={fullStackImage} alt="Connected layers representing collaborative full-stack product work" /></div>
                <div className="about-page__people-copy">
                    <span className="about-page__section-label">People before platforms</span>
                    <UsersRound aria-hidden="true" />
                    <h2>Good technology work changes the person doing it.</h2>
                    <p>We want learners to ask better questions, communicate their decisions and recover from mistakes. We want clients to understand what is being built and feel confident continuing after delivery.</p>
                    <p>That means making room for questions, reviews and honest conversations—not only fast output.</p>
                    <Link to="/#contact">Start a conversation <ArrowRight aria-hidden="true" /></Link>
                </div>
            </section>

            <section className="about-page__principles" aria-labelledby="principles-title">
                <div className="about-page__shell">
                    <div className="about-page__section-heading about-page__section-heading--split" data-about-reveal><div><span className="about-page__section-label">Our working principles</span><h2 id="principles-title">Values you can see in the process.</h2></div><p>Values matter when they change everyday decisions. These four principles shape how we teach, review and deliver.</p></div>
                    <div className="about-page__principles-grid">
                        {principles.map(({ number, title, text, Icon }) => <article key={number}><div><span>{number}</span><Icon aria-hidden="true" /></div><h3>{title}</h3><p>{text}</p></article>)}
                    </div>
                </div>
            </section>

            <section className="about-page__method" aria-labelledby="method-title">
                <div className="about-page__shell about-page__method-grid">
                    <div data-about-reveal><span className="about-page__section-label">How we work</span><h2 id="method-title">A simple process that keeps people involved.</h2><Code2 aria-hidden="true" /></div>
                    <ol>{workingSteps.map(([title, text], index) => <li key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol>
                </div>
            </section>

            <section className="about-page__closing">
                <div className="about-page__shell"><span>Build your next chapter</span><h2>Come to learn.<br />Come with a problem.<br /><em>Leave with progress.</em></h2><div><Link to="/programs">Find a program <ArrowRight aria-hidden="true" /></Link><Link to="/#contact">Talk to us</Link></div></div>
            </section>
        </main>
    );
}

export default AboutPage;
