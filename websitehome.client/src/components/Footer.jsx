import "./Footer.css";

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

                    <a href="#home">Home</a>

                    <a href="#about">About</a>

                    <a href="#services">Services</a>

                    <a href="#contact">Contact</a>

                </div>

                {/* PROGRAMS */}

                <div className="footer-links">

                    <h4>Programs</h4>

                    <a href="#">ASP.NET Core</a>

                    <a href="#">Full Stack</a>

                    <a href="#">Dynamics 365</a>

                    <a href="#">AI & Copilot</a>

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