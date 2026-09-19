import { Link } from "react-router-dom";
import "./InformationPage.css";

export default function NotFoundPage() {
    return (
        <main className="information-page" id="main-content" tabIndex={-1}>
            <div className="information-shell">
                <span className="information-eyebrow">404 · Page not found</span>
                <h1>Let’s get you back on track.</h1>
                <p className="information-lead">This link may be out of date, or the address may have a typo. You can explore our programs and services below.</p>
                <section>
                    <h2>Where would you like to go?</h2>
                    <p><Link to="/">Back to the homepage →</Link></p>
                    <p><Link to="/programs">Explore training programs →</Link></p>
                    <p><Link to="/services">Explore software services →</Link></p>
                    <p><Link to="/#contact">Contact Paarth Infotech →</Link></p>
                </section>
            </div>
        </main>
    );
}
