import "./Footer.css";
import {
    FaLinkedinIn,
    FaInstagram,
    FaGithub
} from "react-icons/fa";

function Footer() {
    return (
        <footer className="footer">

            <div className="footer-top">

                <div className="footer-brand">

                    <h2>PH Solutions</h2>

                    <p>
                        Transforming learners into
                        industry-ready professionals through
                        practical training, live projects,
                        mentorship and modern technologies.
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

                    </div>

                </div>

                <div className="footer-links">

                    <h4>Quick Links</h4>

                    <a href="#home">Home</a>
                    <a href="#about">About</a>
                    <a href="#services">Services</a>
                    <a href="#contact">Contact</a>

                </div>

                <div className="footer-links">

                    <h4>Programs</h4>

                    <a href="#">ASP.NET Core</a>
                    <a href="#">Full Stack</a>
                    <a href="#">Dynamics 365</a>
                    <a href="#">Cloud Development</a>

                </div>

                <div className="footer-links">

                    <h4>Contact</h4>

                    <p>Ghaziabad, Uttar Pradesh</p>
                    <p>info@phsolutions.in</p>
                    <p>+91 XXXXX XXXXX</p>

                </div>

            </div>

            <div className="newsletter">

                <h3>Subscribe For Updates</h3>

                <form>

                    <input
                        type="email"
                        placeholder="Enter your email"
                    />

                    <button type="submit">
                        Subscribe
                    </button>

                </form>

            </div>

            <div className="footer-bottom">

                © 2026 PH Solutions.
                All Rights Reserved.

            </div>

        </footer>
    );
}

export default Footer;