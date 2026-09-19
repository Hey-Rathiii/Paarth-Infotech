import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./About.css";
import { Link } from "react-router-dom";
import { workplaceImage } from "../content/imagery";

gsap.registerPlugin(ScrollTrigger);

function About() {

    const aboutRef = useRef(null);

    useLayoutEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

        const ctx = gsap.context(() => {

            // LEFT SIDE FADE UP

            gsap.from(".about-left > *", {
                y: 60,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: aboutRef.current,
                    start: "top 75%",
                    toggleActions: "play none none reverse"
                }
            });

            // CARDS STAGGER REVEAL

            gsap.from(".about-card", {
                y: 60,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".about-right",
                    start: "top 85%"
                }
            });

        }, aboutRef);

        return () => ctx.revert();

    }, []);

    return (
        <section
            ref={aboutRef}
            id="about"
            className="about"
        >

            <div className="about-container">

                <div className="about-left">

                    <span className="about-tag">
                        ABOUT Paarth Infotech
                    </span>

                    <h2 className="about-title">
                        Learn by building.
                        <span> Build with understanding.</span>
                    </h2>

                    <p className="about-text">
                        For learners, our programs connect technical concepts to practical projects, code reviews and guided learning. The focus is on understanding what you build and being able to explain it.
                    </p>

                    <p className="about-text">
                        For businesses, we help turn requirements into web applications, cloud solutions and enterprise workflows. Explore the services and approach that fit your next project.
                    </p>

                    <div className="about-buttons">

                        <Link to="/programs" className="about-btn-primary">
                            Explore programs
                        </Link>

                        <Link to="/about" className="about-btn-secondary">
                            Our approach
                        </Link>

                    </div>

                </div>

                <div className="about-right">

                    <figure className="about-workplace">
                        <img
                            src={workplaceImage}
                            alt="Four colleagues collaborating at computers in a bright studio"
                            width="1536"
                            height="1024"
                            loading="lazy"
                            decoding="async"
                        />
                        <figcaption>AI-generated workplace illustration</figcaption>
                    </figure>

                    <div className="about-card">
                        <h3>Learn</h3>
                        <p>Practical training</p>
                    </div>

                    <div className="about-card">
                        <h3>Build</h3>
                        <p>Software development</p>
                    </div>

                    <div className="about-card">
                        <h3>Grow</h3>
                        <p>Career preparation</p>
                    </div>

                    <div className="about-card">
                        <h3>Connect</h3>
                        <p>Direct conversations</p>
                    </div>

                </div>

            </div>

        </section>
    );
}

export default About;
