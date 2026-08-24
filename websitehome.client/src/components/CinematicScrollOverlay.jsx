import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./CinematicScrollOverlay.css";

gsap.registerPlugin(ScrollTrigger);

function CinematicScrollOverlay({ pageRef, variant = "blue" }) {
    const overlayRef = useRef(null);

    useLayoutEffect(() => {
        const page = pageRef.current;
        const overlay = overlayRef.current;

        if (!page || !overlay) return undefined;

        const media = gsap.matchMedia();

        media.add("(prefers-reduced-motion: no-preference)", () => {
            const beam = overlay.querySelector(".cinematic-scroll-overlay__beam");
            const bloom = overlay.querySelector(".cinematic-scroll-overlay__bloom");

            const sequence = gsap.timeline({
                scrollTrigger: {
                    trigger: page,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.45
                }
            });

            sequence
                .fromTo(
                    overlay,
                    { opacity: 0.08 },
                    { opacity: 0.32, ease: "none", duration: 0.46 },
                    0
                )
                .to(
                    overlay,
                    { opacity: 0.12, ease: "none", duration: 0.54 },
                    0.46
                )
                .fromTo(
                    beam,
                    { xPercent: -160, yPercent: -12, rotation: -12 },
                    {
                        xPercent: 180,
                        yPercent: 14,
                        rotation: 12,
                        ease: "none",
                        duration: 1
                    },
                    0
                )
                .fromTo(
                    bloom,
                    { xPercent: -14, yPercent: -8, scale: 0.78 },
                    {
                        xPercent: 16,
                        yPercent: 10,
                        scale: 1.18,
                        ease: "none",
                        duration: 1
                    },
                    0
                );

            return () => sequence.kill();
        });

        return () => media.revert();
    }, [pageRef]);

    return (
        <div
            ref={overlayRef}
            className={`cinematic-scroll-overlay cinematic-scroll-overlay--${variant}`}
            aria-hidden="true"
        >
            <span className="cinematic-scroll-overlay__bloom" />
            <span className="cinematic-scroll-overlay__beam" />
            <span className="cinematic-scroll-overlay__grain" />
            <span className="cinematic-scroll-overlay__edge" />
        </div>
    );
}

export default CinematicScrollOverlay;
