import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
    FaArrowRight,
    FaMoon,
    FaSun,
    FaTimes
} from "react-icons/fa";
import "./Navbar.css";
import Logo from "../components/Logo";

const mobileLinks = [
    { to: "/", label: "Home", route: true, end: true },
    { to: "/programs", label: "Programs", route: true },
    { to: "/services", label: "Services", route: true },
    { to: "/portfolio", label: "Projects", route: true },
    { to: "/technologies", label: "Technologies", route: true },
    { to: "/about", label: "About", route: true },
    { to: "/careers", label: "Careers", route: true },
    { to: "/#contact", label: "Contact" }
];

function Navbar({ theme, onToggleTheme, onMobileMenuChange }) {
    const { pathname } = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const mobileLayerRef = useRef(null);
    const mobileDrawerRef = useRef(null);
    const mobileToggleRef = useRef(null);
    const mobileCloseRef = useRef(null);

    useEffect(() => {
        let previousY = window.scrollY;
        let direction = 0;
        let distance = 0;
        const handleScroll = () => {
            // Clamp elastic overscroll so it cannot reverse the detected direction.
            const maxY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
            const currentY = Math.max(0, Math.min(window.scrollY, maxY));
            const delta = currentY - previousY;
            setScrolled(currentY > 80);

            if (currentY <= 82) {
                setHidden(false);
                distance = 0;
            } else if (delta !== 0) {
                const nextDirection = Math.sign(delta);
                if (nextDirection !== direction) distance = 0;
                direction = nextDirection;
                distance += Math.abs(delta);
                // Ignore small wheel/touch movements and the tail of smooth scrolling.
                if (distance >= 12) {
                    setHidden(direction > 0);
                    distance = 0;
                }
            }
            previousY = currentY;
        };

        const frame = window.requestAnimationFrame(() => {
            handleScroll();
            setHidden(false);
        });
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.cancelAnimationFrame(frame);
            window.removeEventListener("scroll", handleScroll);
        };
    }, [pathname]);

    useEffect(() => {
        const desktopQuery = window.matchMedia("(min-width: 1101px)");
        const closeOnDesktop = (event) => {
            if (event.matches) setMobileOpen(false);
        };

        desktopQuery.addEventListener("change", closeOnDesktop);

        return () => desktopQuery.removeEventListener("change", closeOnDesktop);
    }, []);

    useEffect(() => {
        if (mobileLayerRef.current) {
            mobileLayerRef.current.inert = !mobileOpen;
        }

        onMobileMenuChange?.(mobileOpen);

        if (!mobileOpen) return undefined;

        const previousOverflow = document.body.style.overflow;
        const toggleElement = mobileToggleRef.current;
        document.body.style.overflow = "hidden";

        const focusFrame = window.requestAnimationFrame(() => {
            mobileCloseRef.current?.focus();
        });

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setMobileOpen(false);
                return;
            }

            if (event.key !== "Tab" || !mobileDrawerRef.current) return;

            const focusableElements = [
                ...mobileDrawerRef.current.querySelectorAll(
                    "a[href], button:not([disabled])"
                )
            ];
            const firstElement = focusableElements[0];
            const lastElement = focusableElements.at(-1);

            if (!firstElement || !lastElement) return;

            if (
                event.shiftKey &&
                (document.activeElement === firstElement ||
                    !mobileDrawerRef.current.contains(document.activeElement))
            ) {
                event.preventDefault();
                lastElement.focus();
            } else if (
                !event.shiftKey &&
                document.activeElement === lastElement
            ) {
                event.preventDefault();
                firstElement.focus();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            window.cancelAnimationFrame(focusFrame);
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = previousOverflow;
            onMobileMenuChange?.(false);

            if (window.matchMedia("(max-width: 1100px)").matches) {
                toggleElement?.focus();
            }
        };
    }, [mobileOpen, onMobileMenuChange]);

    const closeMobileMenu = () => setMobileOpen(false);

    return (
        <header
            className={[
                "navbar",
                scrolled ? "navbar-scrolled" : "",
                pathname === "/" && !scrolled ? "navbar-over-hero" : "",
                hidden && !mobileOpen ? "navbar-hidden" : "",
                mobileOpen ? "navbar-menu-open" : ""
            ].filter(Boolean).join(" ")}
        >
            <div className="logo">
                <Logo />
            </div>

            <nav className="desktop-nav" aria-label="Primary navigation">
                {mobileLinks.filter((link) => link.route && link.to !== "/").map((link) => <NavLink key={link.to} to={link.to} className={({ isActive }) => isActive ? "active" : ""}>{link.label}</NavLink>)}
            </nav>

            <div className="navbar-actions">
                <Link to="/#contact" className="nav-cta">
                    Let’s talk
                </Link>

                <button
                    type="button"
                    className="theme-toggle"
                    onClick={onToggleTheme}
                    aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
                    aria-pressed={theme === "dark"}
                    title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                >
                    <span className="theme-toggle-track" aria-hidden="true">
                        <span
                            key={theme}
                            className={`theme-toggle-icon theme-toggle-icon-${theme}`}
                        >
                            {theme === "dark" ? <FaSun /> : <FaMoon />}
                        </span>
                    </span>
                </button>

                <button
                    ref={mobileToggleRef}
                    type="button"
                    className={`mobile-toggle ${mobileOpen ? "is-open" : ""}`}
                    onClick={() => setMobileOpen((isOpen) => !isOpen)}
                    aria-label={mobileOpen
                        ? "Close navigation menu"
                        : "Open navigation menu"}
                    aria-expanded={mobileOpen}
                    aria-controls="mobile-navigation"
                >
                    <span className="mobile-toggle-lines" aria-hidden="true">
                        <span />
                        <span />
                        <span />
                    </span>
                </button>
            </div>

            <div
                ref={mobileLayerRef}
                className={`mobile-nav-layer ${mobileOpen ? "is-open" : ""}`}
                aria-hidden={!mobileOpen}
            >
                <div
                    className="mobile-nav-backdrop"
                    aria-hidden="true"
                    onClick={closeMobileMenu}
                />

                <aside
                    ref={mobileDrawerRef}
                    className="mobile-drawer"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="mobile-navigation-title"
                    data-lenis-prevent
                >
                    <div className="mobile-drawer-header">
                        <div>
                            <span className="mobile-drawer-eyebrow">
                                Explore
                            </span>
                            <h2 id="mobile-navigation-title">Navigation</h2>
                        </div>

                        <div className="mobile-drawer-controls">
                            <button
                                type="button"
                                className="mobile-drawer-theme"
                                onClick={onToggleTheme}
                                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme in navigation menu`}
                                aria-pressed={theme === "dark"}
                                title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                            >
                                <span
                                    key={theme}
                                    className={`theme-toggle-icon theme-toggle-icon-${theme}`}
                                    aria-hidden="true"
                                >
                                    {theme === "dark" ? <FaSun /> : <FaMoon />}
                                </span>
                            </button>

                            <button
                                ref={mobileCloseRef}
                                type="button"
                                className="mobile-drawer-close"
                                onClick={closeMobileMenu}
                                aria-label="Close navigation menu"
                            >
                                <FaTimes aria-hidden="true" />
                            </button>
                        </div>
                    </div>

                    <nav
                        className="mobile-drawer-links"
                        id="mobile-navigation"
                        aria-label="Mobile navigation"
                    >
                        {mobileLinks.map((link, index) => {
                            const content = (
                                <>
                                    <span className="mobile-drawer-index">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                    <span>{link.label}</span>
                                    <FaArrowRight aria-hidden="true" />
                                </>
                            );
                            const sharedProps = {
                                style: { "--menu-index": index },
                                onClick: closeMobileMenu
                            };

                            return link.route ? (
                                <NavLink
                                    to={link.to}
                                    end={link.end}
                                    key={link.to}
                                    className={({ isActive }) =>
                                        `mobile-drawer-link ${isActive ? "active" : ""}`
                                    }
                                    {...sharedProps}
                                >
                                    {content}
                                </NavLink>
                            ) : (
                                <Link
                                    to={link.to}
                                    key={link.to}
                                    className="mobile-drawer-link"
                                    {...sharedProps}
                                >
                                    {content}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="mobile-drawer-footer">
                        <p>Ready to build your future?</p>
                        <Link
                            to="/#contact"
                            className="mobile-drawer-cta"
                            onClick={closeMobileMenu}
                        >
                            <span>Let’s talk</span>
                            <FaArrowRight aria-hidden="true" />
                        </Link>
                    </div>
                </aside>
            </div>
        </header>
    );
}

export default Navbar;
