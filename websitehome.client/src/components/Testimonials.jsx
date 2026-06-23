import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./Testimonials.css";
import { FaStar } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

function Testimonials() {

    const testimonialsRef = useRef(null);

    const testimonials = [
        {
            name: "Anchal",
            role: "(Salesforce Developer)",
            company: "Cheetu Inc.",
            text: "Paarth Infotech helped me build strong technical foundations and gain practical experience through live projects. The mentorship and placement guidance played a key role in helping me secure my position at Cheetu."
        },
        {
            name: "Ayush Rathi",
            role: "(Full Stack Developer & Dynamics 365 Consultant)",
            company: "Paarth Infotech",
            text: "The training combined modern web development with enterprise technologies. Working on real-world projects gave me the confidence to start my professional journey at Paarth Infotech."
        },
        {
            name: "Aryan Anand",
            role: "(Java Full Stack Developer)",
            company: "QSpiders",
            text: "The structured learning path, interview preparation, and hands-on projects helped me improve my technical skills and secure opportunities through QSpiders."
        }
    ];

    useLayoutEffect(() => {

        const ctx = gsap.context(() => {

            // HEADER ANIMATION

            gsap.from(".testimonials-header > *", {
                y: 60,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: testimonialsRef.current,
                    start: "top 75%",
                    toggleActions: "play none none reverse"
                }
            });

            // CARD ANIMATION

            gsap.from(".testimonial-card", {
                y: 60,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".testimonials-grid",
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });

            // STAR POP ANIMATION

            gsap.from(".stars svg", {
                scale: 0,
                duration: 0.4,
                stagger: 0.05,
                ease: "back.out(2)",
                scrollTrigger: {
                    trigger: ".testimonials-grid",
                    start: "top 80%"
                }
            });

        }, testimonialsRef);

        return () => ctx.revert();

    }, []);

    return (
        <section
            ref={testimonialsRef}
            className="testimonials"
            id="testimonials"
        >

            <div className="testimonials-header">

                <span className="testimonial-tag">
                    Student Success Stories
                </span>

                <h2>
                    What Our Students Say
                </h2>

                <p>
                    Hear from students who transformed
                    their careers with Paarth Infotech.
                </p>

            </div>

            <div className="testimonials-grid">

                {testimonials.map((item, index) => (

                    <div
                        className="testimonial-card"
                        key={index}
                    >

                        <h4 className="student-name">
                            {item.name}
                        </h4>

                        <div className="student-role">
                            {item.role} at {item.company}
                        </div>

                        <br />

                        <div className="stars">
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                        </div>

                        <p className="testimonial-text">
                            "{item.text}"
                        </p>

                    </div>

                ))}

            </div>

        </section>
    );
}

export default Testimonials;