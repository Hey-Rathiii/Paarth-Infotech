import { lazy, Suspense, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Link } from "react-router-dom";
import { Pause, Play, Zap } from "lucide-react";
import { getPreset, getPresetKeys } from "./Hyperspeedpresets";
import RotatingText from "./RotatingText/RotatingText";
import "./Hero.css";

const Hyperspeed = lazy(() => import("./Hyperspeed"));
const technologies = ["AI & ML", "Full Stack", "React", ".NET", "Python", "Cloud", "Dynamics 365", "Java", "Angular"];
const presetKeys = getPresetKeys();
const motionQuery = "(prefers-reduced-motion: no-preference)";
const subscribe = (callback) => {
    const query = window.matchMedia(motionQuery);
    query.addEventListener("change", callback);
    return () => query.removeEventListener("change", callback);
};
const getSnapshot = () => window.matchMedia(motionQuery).matches;

export default function Hero() {
    const motionAllowed = useSyncExternalStore(subscribe, getSnapshot, () => false);
    const [paused, setPaused] = useState(false);
    const [presetsOpen, setPresetsOpen] = useState(false);
    const [currentPreset, setCurrentPreset] = useState("one");
    const [boosted, setBoosted] = useState(false);
    const boostTimer = useRef(null);
    const press = useRef(null);
    const animationPlaying = motionAllowed && !paused;

    const resetBoost = () => {
        window.clearTimeout(boostTimer.current);
        press.current = null;
        setBoosted(false);
    };

    useEffect(() => {
        const release = (event) => {
            if (!press.current || event.pointerId !== press.current.id) return;
            // A quick tap gets a brief burst; holding sustains the original speed effect.
            const remaining = Math.max(0, 700 - (performance.now() - press.current.started));
            press.current = null;
            boostTimer.current = window.setTimeout(() => setBoosted(false), remaining);
        };
        const cancel = () => {
            window.clearTimeout(boostTimer.current);
            press.current = null;
            setBoosted(false);
        };
        const visibilityChanged = () => { if (document.hidden) cancel(); };
        window.addEventListener("pointerup", release);
        window.addEventListener("pointercancel", cancel);
        window.addEventListener("blur", cancel);
        document.addEventListener("visibilitychange", visibilityChanged);
        return () => {
            window.clearTimeout(boostTimer.current);
            window.removeEventListener("pointerup", release);
            window.removeEventListener("pointercancel", cancel);
            window.removeEventListener("blur", cancel);
            document.removeEventListener("visibilitychange", visibilityChanged);
        };
    }, []);

    const startPress = (event) => {
        if (!animationPlaying || !event.isPrimary || event.button !== 0 ||
            event.target.closest("a, button, input, select, textarea")) return;
        window.clearTimeout(boostTimer.current);
        press.current = { id: event.pointerId, started: performance.now() };
        setBoosted(true);
    };

    const boostSpeed = () => {
        window.clearTimeout(boostTimer.current);
        setBoosted(true);
        boostTimer.current = window.setTimeout(() => setBoosted(false), 900);
    };

    return (
        <section id="home" className="hero" aria-labelledby="home-title" onPointerDown={startPress}>
            <div className="hero-background" aria-hidden="true">
                <div className="hero-road-fallback" />
                {animationPlaying && <Suspense fallback={null}><Hyperspeed effectOptions={getPreset(currentPreset)} boosted={boosted} /></Suspense>}
            </div>
            <div className="hero-particles" aria-hidden="true" />
            <div className="hero-shade" aria-hidden="true" />
            <div className="hero-content">
                <div className="hero-badge"><span className="hero-badge-new">NEW</span><span className="hero-badge-text">.NET · D365 · Cloud</span></div>
                <h1 id="home-title" className="hero-title">Your Vision.<br />Our Technology.</h1>
                <div className="hero-master-row">
                    <span className="hero-prefix">Master</span>
                    {animationPlaying ? <RotatingText texts={technologies} interval={2500} className="hero-technology" /> : <div className="rt-wrapper hero-technology"><span className="rt-word">AI &amp; ML</span></div>}
                </div>
                <div className="hero-buttons"><Link to="/#contact" className="hero-btn hero-btn-primary">Get started</Link><Link to="/about" className="hero-btn hero-btn-secondary">Learn more</Link></div>
            </div>
            {motionAllowed && <div className="hero-controls">
                <button type="button" className={`hero-boost${boosted && animationPlaying ? " is-boosting" : ""}`} onClick={boostSpeed} disabled={!animationPlaying} title="Tap for a speed burst, or hold the hero to keep accelerating"><Zap size={13} aria-hidden="true" />Boost speed</button>
                <button type="button" className="hero-motion" onClick={() => { resetBoost(); setPaused((value) => !value); }} aria-label={paused ? "Play background animation" : "Pause background animation"} title={paused ? "Play animation" : "Pause animation"}>{paused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}</button>
                <button type="button" className="hero-preset-toggle" aria-expanded={presetsOpen} aria-controls="hero-presets" onClick={() => setPresetsOpen((value) => !value)}>Change Presets<span className={`hero-toggle-track${presetsOpen ? " is-open" : ""}`} aria-hidden="true"><span /></span></button>
                {presetsOpen && <div className="hero-presets" id="hero-presets" role="group" aria-label="Background presets">
                    {presetKeys.map((key) => <button type="button" key={key} aria-pressed={currentPreset === key} onClick={() => { resetBoost(); setCurrentPreset(key); setPaused(false); }}>{key[0].toUpperCase() + key.slice(1)}</button>)}
                </div>}
            </div>}
        </section>
    );
}
