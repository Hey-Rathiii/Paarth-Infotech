import React, { useLayoutEffect, useRef, useMemo, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hyperspeed from './Hyperspeed';
import { getPreset, getPresetKeys } from './hyperspeedPresets';
import "./Hero.css";

gsap.registerPlugin(ScrollTrigger);

function Hero() {
    const titleRef = useRef(null);
    const heroRef = useRef(null);
    const [demoActive, setDemoActive] = useState(false);
    const [currentPreset, setCurrentPreset] = useState('one');

    // Memoize effectOptions to prevent unnecessary re-renders and WebGL scene recreations
    // Using presets for easy switching between different Hyperspeed visual styles
    const hyperspeedOptions = useMemo(
        () => getPreset(currentPreset),
        [currentPreset]
    );

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            tl.fromTo(
                ".hero-badge",
                {
                    y: 20,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power3.out",
                }
            )
                .fromTo(
                    ".hero-title",
                    {
                        y: 30,
                        opacity: 0,
                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        ease: "power4.out",
                    },
                    "-=0.4"
                )
                .fromTo(
                    ".hero-buttons",
                    {
                        y: 20,
                        opacity: 0,
                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        ease: "power3.out",
                    },
                    "-=0.5"
                );

            // HERO SCROLL TIMELINE
            gsap.timeline({
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "+=150%",
                    scrub: 1.5,
                },
            })
                .to(
                    ".hero-content",
                    {
                        y: -250,
                        opacity: 0,
                    },
                    0
                );

            // PARTICLES
            gsap.to(".hero-particles", {
                yPercent: -20,
                ease: "none",
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
            });
        }, heroRef);

        return () => {
            ctx.revert();
        };
    }, []);

    // Ensure click/touch events reach the canvas for speedup
    useLayoutEffect(() => {
        const hero = heroRef.current;
        if (!hero) return;

        const handlePointerDown = (e) => {
            // Ignore clicks on buttons and interactive elements
            if (e.target.closest('.hero-btn, .toggle-switch, .demo-toggle, .preset-selector')) {
                return;
            }

            // Pass event to the hyperspeed canvas
            const lightsCanvas = hero.querySelector('#lights');
            if (lightsCanvas) {
                const mouseEvent = new MouseEvent('mousedown', {
                    bubbles: true,
                    cancelable: true,
                    view: window,
                    clientX: e.clientX,
                    clientY: e.clientY,
                });
                lightsCanvas.dispatchEvent(mouseEvent);
            }
        };

        const handlePointerUp = (e) => {
            const lightsCanvas = hero.querySelector('#lights');
            if (lightsCanvas) {
                const mouseEvent = new MouseEvent('mouseup', {
                    bubbles: true,
                    cancelable: true,
                    view: window,
                    clientX: e.clientX,
                    clientY: e.clientY,
                });
                lightsCanvas.dispatchEvent(mouseEvent);
            }
        };

        hero.addEventListener('pointerdown', handlePointerDown);
        hero.addEventListener('pointerup', handlePointerUp);
        hero.addEventListener('pointerleave', handlePointerUp);

        return () => {
            hero.removeEventListener('pointerdown', handlePointerDown);
            hero.removeEventListener('pointerup', handlePointerUp);
            hero.removeEventListener('pointerleave', handlePointerUp);
        };
    }, []);

    return (
        <section ref={heroRef} className="hero">
            <div className="hero-background">
                <Hyperspeed effectOptions={hyperspeedOptions} />
            </div>

            <div className="hero-particles"></div>

            <div className="hero-content">
                <div className="hero-badge">
                    <span className="badge-new">NEW</span>
                    <span className="badge-text">.NET • D365 • Cloud</span>
                </div>

                <h1 ref={titleRef} className="hero-title">
                    Your Vision.
                    Our Technology.
                    <br />
                    <span className="hero-highlight">Infinite Possibilities</span>
                </h1>

                <div className="hero-buttons">
                    <button className="hero-btn hero-btn-primary">
                        Get started
                    </button>

                    <button className="hero-btn hero-btn-secondary">
                        Learn more
                    </button>
                </div>
            </div>

            <div className="demo-toggle">
                <span className="demo-label">Change Presets</span>
                <label className="toggle-switch">
                    <input
                        type="checkbox"
                        checked={demoActive}
                        onChange={(e) => setDemoActive(e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                </label>
            </div>

            {/* Preset Selector - Only visible when demo is active */}
            {demoActive && (
                <div className="preset-selector">
                    <span className="preset-label">Presets:</span>
                    <div className="preset-buttons">
                        {getPresetKeys().map((key) => (
                            <button
                                key={key}
                                className={`preset-btn ${currentPreset === key ? 'active' : ''}`}
                                onClick={() => setCurrentPreset(key)}
                            >
                                {key}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
}

export default Hero;