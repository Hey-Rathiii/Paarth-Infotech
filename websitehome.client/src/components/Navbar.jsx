import { useState, useEffect } from "react";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {

    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {

        const handleScroll = () => {
            setScrolled(window.scrollY > 80);
        };

        window.addEventListener("scroll", handleScroll);

        return () =>
            window.removeEventListener("scroll", handleScroll);

    }, []);

    return (

        <header
            className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}
        >

            <div className="logo">
                PH Solutions
            </div>

            <nav className="desktop-nav">

                <a href="#home">Home</a>

                <div className="nav-item">

                    <button>
                        Programs
                        <FaChevronDown />
                    </button>

                    <div className="mega-menu">

                        <a href="#">ASP.NET Core</a>
                        <a href="#">Full Stack Development</a>
                        <a href="#">Cloud Development</a>
                        <a href="#">Dynamics 365</a>
                        <a href="#">Artificial Intelligence</a>

                    </div>

                </div>

                <div className="nav-item">

                    <button>
                        Services
                        <FaChevronDown />
                    </button>

                    <div className="mega-menu">

                        <a href="#">Career Guidance</a>
                        <a href="#">Live Projects</a>
                        <a href="#">Placement Support</a>
                        <a href="#">Corporate Training</a>

                    </div>

                </div>

                <div className="nav-item">

                    <button>
                        Technologies
                        <FaChevronDown />
                    </button>

                    <div className="mega-menu">

                        <a href="#">React</a>
                        <a href="#">Azure</a>
                        <a href="#">SQL Server</a>
                        <a href="#">Power Platform</a>
                        <a href="#">Copilot</a>

                    </div>

                </div>

                <a href="#about">About</a>
                <a href="#contact">Contact</a>

            </nav>

            <button className="nav-cta">
                Book Consultation
            </button>

            <button
                className="mobile-toggle"
                onClick={() => setMobileOpen(!mobileOpen)}
            >
                {mobileOpen ? <FaTimes /> : <FaBars />}
            </button>

            <div className={`mobile-menu ${mobileOpen ? "open" : ""}`}>

                <a href="#home">Home</a>
                <a href="#about">About</a>
                <a href="#programs">Programs</a>
                <a href="#services">Services</a>
                <a href="#contact">Contact</a>

            </div>

        </header>
    );
}

export default Navbar;