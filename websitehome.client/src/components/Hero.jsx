import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import "./Hero.css";

function Hero() {

    const videoRef = useRef(null);

    useLayoutEffect(() => {

        const tl = gsap.timeline();

        tl.fromTo(
            ".hero-title",
            {
                y: 120,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 1.4,
                ease: "power4.out"
            }
        )

            .fromTo(
                ".hero-description",
                {
                    y: 40,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out"
                },
                "-=0.8"
            )

            .fromTo(
                ".scroll-indicator",
                {
                    opacity: 0,
                    y: 20
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8
                },
                "-=0.5"
            );

        const moveBackground = (e) => {

            if (window.innerWidth < 768) return;

            const x =
                (e.clientX / window.innerWidth - 0.5) * 15;

            const y =
                (e.clientY / window.innerHeight - 0.5) * 15;

            gsap.to(videoRef.current, {
                x,
                y,
                duration: 2,
                ease: "power3.out",
                overwrite: true
            });
        };

        const moveContent = (e) => {

            if (window.innerWidth < 768) return;

            const x =
                (e.clientX / window.innerWidth - 0.5) * -8;

            const y =
                (e.clientY / window.innerHeight - 0.5) * -8;

            gsap.to(".hero-content", {
                x,
                y,
                duration: 1.5,
                ease: "power3.out",
                overwrite: true
            });
        };

        window.addEventListener("mousemove", moveBackground);
        window.addEventListener("mousemove", moveContent);

        return () => {

            window.removeEventListener(
                "mousemove",
                moveBackground
            );

            window.removeEventListener(
                "mousemove",
                moveContent
            );
        };

    }, []);

    return (
        <section className="hero">

            <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                className="hero-video"
            >
                <source
                    src="/videos/background5.mp4"
                    type="video/mp4"
                />
            </video>

            <div className="hero-overlay"></div>

            <div className="hero-content">

                <h1 className="hero-title">
                    Transforming
                    <br />

                    <span className="hero-highlight">
                        Learners
                    </span>

                    <span className="hero-script">
                        Into
                    </span>

                    <br />

                    Industry
                    <br />

                    Professionals
                </h1>

                <p className="hero-description">
                    <strong>Build skills.</strong> Gain experience.
                    Launch your career through industry-led training,
                    live projects, mentorship, and modern technology programs.
                </p>

            </div>

            <div className="scroll-indicator">
                ↓
            </div>

        </section>
    );
}

export default Hero;