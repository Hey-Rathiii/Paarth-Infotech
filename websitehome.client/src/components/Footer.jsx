import "./Footer.css";
import { Link } from "react-router-dom";

import {
    FaLinkedinIn,
    FaInstagram,
    FaGithub,
    FaYoutube
} from "react-icons/fa";

function Footer() {

    return (
        <footer className="footer">

            <div className="footer-top">

                {/* BRAND */}

                <div className="footer-brand">

                    <h2>Paarth Infotech</h2>

                    <p>
                        Transforming learners into industry-ready
                        professionals through practical training,
                        live projects, mentorship and modern
                        technologies.
                    </p>

                    <div className="footer-socials">

                        <a href="#">
                            <FaLinkedinIn />
                        </a>

                        <a href="#">
                            <FaInstagram />
                        </a>

                        <a href="#">
                            <FaGithub />
                        </a>

                        <a href="#">
                            <FaYoutube />
                        </a>

                    </div>

                </div>

                {/* COMPANY */}

                <div className="footer-links">

                    <h4>Company</h4>

                    <Link to="/">Home</Link>

                    <Link to="/about">About</Link>

                    <Link to="/services">Services</Link>

                    <Link to="/portfolio">Our Work</Link>

                    <Link to="/technologies">Technologies</Link>

                    <Link to="/#contact">Contact</Link>

                </div>

                {/* PROGRAMS */}

                <div className="footer-links">

                    <h4>Programs</h4>

                    <Link to="/programs#dotnet">ASP.NET Core</Link>

                    <Link to="/programs#full-stack">Full Stack</Link>

                    <Link to="/programs#dynamics-365">Dynamics 365</Link>

                    <Link to="/programs#ai-copilot">AI & Copilot</Link>

                </div>

                {/* CONTACT */}

                <div className="footer-links">

                    <h4>Contact</h4>

                    <p>Ghaziabad, Uttar Pradesh</p>

                    <p>info@phsolutions.in</p>

                    <p>+91 XXXXX XXXXX</p>

                </div>

            </div>

            <div className="footer-bottom">
                Copyright 2026 Paarth Infotech. All Rights Reserved.
            </div>
            
        </footer>
    );
}

export default Footer;
