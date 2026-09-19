import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { company } from "../content/site";
import Logo from "./Logo";
import "./Footer.css";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="footer-brand"><Logo /><p>Practical software training.<br />Thoughtful product development.<br />Progress through real work.</p>
                    {company.socialLinks.length > 0 && <div className="footer-socials">{company.socialLinks.map((social) => <a key={social.label} href={social.url} target="_blank" rel="noopener noreferrer">{social.label}<ArrowUpRight size={15} aria-hidden="true" /></a>)}</div>}
                </div>
                <div className="footer-links"><h3>Explore</h3><Link to="/about">About us</Link><Link to="/services">Business services</Link><Link to="/portfolio">Project concepts</Link><Link to="/technologies">Technologies</Link><Link to="/careers">Careers</Link></div>
                <div className="footer-links"><h3>Learn with us</h3><Link to="/programs">All programs</Link><Link to="/programs#dotnet">ASP.NET Core</Link><Link to="/programs#full-stack">Full Stack</Link><Link to="/programs#dynamics-365">Dynamics 365</Link><Link to="/programs#ai-copilot">AI & Copilot</Link></div>
                <div className="footer-links"><h3>Let’s talk</h3><a href={`mailto:${company.email}`}>{company.email}</a>{company.phone && <a href={`tel:${company.phone.replace(/[^+\d]/g, "")}`}>{company.phone}</a>}{company.address && <p>{company.address}</p>}<Link to="/#contact">Make an inquiry <ArrowUpRight size={15} aria-hidden="true" /></Link><Link to="/careers/apply">Introduce yourself</Link>{company.identityNote && <p>{company.identityNote}</p>}</div>
            </div>
            <div className="footer-bottom"><p>© {new Date().getFullYear()} {company.legalName || company.name}.{company.registration && ` ${company.registration}`}</p><div><Link to="/privacy">Privacy</Link><Link to="/terms">Working with us</Link><Link to="/terms#training">Fees & cancellation</Link></div></div>
        </footer>
    );
}
