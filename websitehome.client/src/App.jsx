import {
    lazy,
    Suspense,
    useCallback,
    useEffect,
    useRef,
    useState
} from "react";
import { flushSync } from "react-dom";
import { Navigate, Route, Routes } from "react-router-dom";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "tailwindcss";
import "lenis/dist/lenis.css";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PointerAura from "./components/PointerAura";
import RouteScrollManager from "./components/RouteScrollManager";
import "./theme.css";

gsap.registerPlugin(ScrollTrigger);

const HomePage = lazy(() => import("./pages/HomePage"));
const ProgramsPage = lazy(() => import("./pages/ProgramsPage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const PortfolioPage = lazy(() => import("./pages/PortfolioPage"));
const TechnologiesPage = lazy(() => import("./pages/TechnologiesPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));

const getInitialTheme = () => {
    const documentTheme = document.documentElement.dataset.theme;

    if (documentTheme === "light" || documentTheme === "dark") {
        return documentTheme;
    }

    try {
        const savedTheme = localStorage.getItem("theme");

        if (savedTheme === "light" || savedTheme === "dark") {
            return savedTheme;
        }
    } catch {
        // The system preference still provides a safe default when storage is blocked.
    }

    return window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark";
};

const initialTheme = getInitialTheme();
document.documentElement.dataset.theme = initialTheme;
document.documentElement.style.colorScheme = initialTheme;

function App() {
    const [theme, setTheme] = useState(initialTheme);
    const themeTransitioningRef = useRef(false);
    const lenisRef = useRef(null);

    useEffect(() => {
        const lenis = new Lenis({
            lerp: 0.14,
            smoothWheel: true,
            syncTouch: false,
            anchors: {
                offset: -90,
            },
            stopInertiaOnNavigate: true,
        });
        lenisRef.current = lenis;

        lenis.on("scroll", ScrollTrigger.update);
        ScrollTrigger.config({ ignoreMobileResize: true });

        const updateLenis = (time) => lenis.raf(time * 1000);
        gsap.ticker.add(updateLenis);
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(updateLenis);
            lenis.off("scroll", ScrollTrigger.update);
            lenis.destroy();
            lenisRef.current = null;
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    const handleMobileMenuChange = useCallback((isOpen) => {
        if (isOpen) {
            lenisRef.current?.stop();
        } else {
            lenisRef.current?.start();
        }
    }, []);

    const applyTheme = useCallback((nextTheme) => {
        document.documentElement.dataset.theme = nextTheme;
        document.documentElement.style.colorScheme = nextTheme;

        try {
            localStorage.setItem("theme", nextTheme);
        } catch {
            // Theme switching should still work when the browser blocks storage.
        }

        setTheme(nextTheme);
    }, []);

    const toggleTheme = useCallback((event) => {
        if (themeTransitioningRef.current) return;

        const nextTheme = theme === "dark" ? "light" : "dark";
        const buttonRect = event.currentTarget.getBoundingClientRect();
        const x = buttonRect.left + buttonRect.width / 2;
        const y = buttonRect.top + buttonRect.height / 2;
        const radius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
        );
        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        const commitTheme = () => {
            flushSync(() => applyTheme(nextTheme));
        };

        if (prefersReducedMotion) {
            commitTheme();
            return;
        }

        themeTransitioningRef.current = true;
        document.documentElement.dataset.themeTransition = "active";

        if (document.startViewTransition) {
            const transition = document.startViewTransition(commitTheme);

            transition.ready
                .then(() => document.documentElement.animate(
                    {
                        clipPath: [
                            `circle(0px at ${x}px ${y}px)`,
                            `circle(${radius}px at ${x}px ${y}px)`
                        ]
                    },
                    {
                        duration: 720,
                        easing: "cubic-bezier(0.76, 0, 0.24, 1)",
                        pseudoElement: "::view-transition-new(root)"
                    }
                ).finished)
                .catch(() => {
                    if (document.documentElement.dataset.theme !== nextTheme) {
                        commitTheme();
                    }
                })
                .finally(() => {
                    themeTransitioningRef.current = false;
                    delete document.documentElement.dataset.themeTransition;
                });

            return;
        }

        const circle = document.createElement("span");
        circle.className = "theme-fallback-circle";
        circle.setAttribute("aria-hidden", "true");
        circle.style.left = `${x}px`;
        circle.style.top = `${y}px`;
        circle.style.width = `${radius * 2}px`;
        circle.style.height = `${radius * 2}px`;
        circle.style.background = nextTheme === "light" ? "#f4f7fb" : "#050505";
        document.body.append(circle);

        circle.animate(
            [
                { transform: "translate(-50%, -50%) scale(0)" },
                { transform: "translate(-50%, -50%) scale(1)" }
            ],
            {
                duration: 720,
                easing: "cubic-bezier(0.76, 0, 0.24, 1)",
                fill: "forwards"
            }
        ).finished
            .then(() => {
                commitTheme();

                return circle.animate(
                    [{ opacity: 1 }, { opacity: 0 }],
                    { duration: 180, fill: "forwards" }
                ).finished;
            })
            .catch(() => {
                if (document.documentElement.dataset.theme !== nextTheme) {
                    commitTheme();
                }
            })
            .finally(() => {
                circle.remove();
                themeTransitioningRef.current = false;
                delete document.documentElement.dataset.themeTransition;
            });
    }, [applyTheme, theme]);

    return (
        <>
            <PointerAura />
            <RouteScrollManager lenisRef={lenisRef} />
            <Navbar
                theme={theme}
                onToggleTheme={toggleTheme}
                onMobileMenuChange={handleMobileMenuChange}
            />
            <Suspense
                fallback={
                    <main
                        className="route-loader"
                        aria-live="polite"
                        aria-label="Loading page"
                    >
                        <span aria-hidden="true" />
                    </main>
                }
            >
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/programs" element={<ProgramsPage />} />
                    <Route path="/services" element={<ServicesPage />} />
                    <Route path="/portfolio" element={<PortfolioPage />} />
                    <Route path="/technologies" element={<TechnologiesPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Suspense>
            <Footer />
        </>
    );
}

export default App;
