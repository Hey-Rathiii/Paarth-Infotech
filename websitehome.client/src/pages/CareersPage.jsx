import { Link } from "react-router-dom";
import { ArrowDown, ArrowUpRight, Braces, BookOpen, PenTool, Sprout } from "lucide-react";
import { vacancies } from "../content/site";
import { workplaceImage } from "../content/imagery";
import "./CareersPage.css";

const disciplines = [
    { Icon: Braces, title: "Build useful software", text: "Web applications, enterprise workflows and the details that make a product dependable.", tags: ".NET / React / Cloud" },
    { Icon: PenTool, title: "Make complexity clear", text: "Interfaces and experiences that help people understand what to do next.", tags: "Design / Research / Experience" },
    { Icon: BookOpen, title: "Help someone progress", text: "Practical explanations, thoughtful code reviews and learning through real problems.", tags: "Teaching / Mentorship / Learning" }
];

export default function CareersPage() {
    const openRoles = vacancies.filter((role) => role.published);
    return (
        <main id="main-content" tabIndex={-1} className="careers-page">
            <section className="careers-hero">
                <div className="careers-shell careers-hero__grid">
                    <div className="careers-hero__copy"><span className="careers-eyebrow">Careers at Paarth Infotech</span><h1>Build with purpose.<br /><em>Grow through<br />the work.</em></h1><p>For curious people who like making things work—and helping others understand how.</p><div className="careers-actions"><a className="career-button" href="#opportunities">Explore opportunities <ArrowDown size={17} aria-hidden="true" /></a><Link className="career-text-link" to="/careers/apply">Introduce yourself <ArrowUpRight size={18} aria-hidden="true" /></Link></div></div>
                    <div className="careers-studio" aria-label="Our approach: curiosity, craft and progress"><div className="careers-studio__top"><span>THE WAY WE WORK</span><span>PI / PEOPLE</span></div><figure className="careers-studio__photo"><img src={workplaceImage} alt="Four colleagues collaborating on software at a shared studio desk" width="1536" height="1024" decoding="async" /><figcaption>AI-generated workplace illustration</figcaption></figure><div className="careers-studio__line"><span>01</span><strong>Stay curious.</strong></div><div className="careers-studio__line"><span>02</span><strong>Care about the craft.</strong></div><div className="careers-studio__line"><span>03</span><strong>Make progress together.</strong></div><p>Good work begins with a good question.</p></div>
                </div>
                <div className="careers-shell careers-hero__foot"><span>Software + Education + People</span><span>A place for thoughtful work <ArrowDown size={14} aria-hidden="true" /></span></div>
            </section>
            <section className="careers-section careers-shell">
                <div className="careers-section-heading"><span className="careers-eyebrow">Where your craft can take you</span><h2>Different strengths.<br />A shared sense of purpose.</h2><p>Our work connects product development and practical education. These are the disciplines around which we build.</p></div>
                <div className="careers-disciplines">{disciplines.map(({ Icon, title, text, tags }) => <article key={title}><Icon size={27} strokeWidth={1.4} aria-hidden="true" /><h3>{title}</h3><p>{text}</p><span>{tags}</span></article>)}</div>
            </section>
            <section className="careers-principles"><div className="careers-shell careers-principles__grid"><div><span className="careers-eyebrow">What we value</span><h2>Bring your questions.<br /><em>Bring your care.</em></h2><p>Tools change. The way we approach the work matters just as much as the tools we use.</p><Link className="career-text-link" to="/about">Get to know Paarth <ArrowUpRight size={18} aria-hidden="true" /></Link></div><ol><li><span>01</span><div><h3>Explain your thinking</h3><p>Make room for questions and talk through the decisions behind your work.</p></div></li><li><span>02</span><div><h3>Stay close to the problem</h3><p>Understand who you are helping before deciding what to build.</p></div></li><li><span>03</span><div><h3>Keep getting better</h3><p>Use feedback, experiments and reflection to move the work forward.</p></div></li></ol></div></section>
            <section className="careers-section careers-shell" id="opportunities"><div className="careers-section-heading"><span className="careers-eyebrow">Opportunities</span><h2>Your next chapter.</h2><p>Published roles appear here, with their location, work arrangement and requirements.</p></div>
                {openRoles.length ? <div className="careers-roles">{openRoles.map((role) => <article key={role.id}><div><span>{role.type} · {role.location}</span><h3>{role.title}</h3><p>{role.summary}</p>{role.requirements?.length > 0 && <ul>{role.requirements.map((requirement) => <li key={requirement}>{requirement}</li>)}</ul>}</div><Link className="career-button" to={`/careers/apply?role=${encodeURIComponent(role.id)}`}>Apply for this role <ArrowUpRight size={18} aria-hidden="true" /></Link></article>)}</div> : <div className="careers-empty"><div className="careers-empty__icon"><Sprout size={32} strokeWidth={1.5} aria-hidden="true" /></div><div><span className="careers-status">No open roles published</span><h3>Still think we could be a good fit?</h3><p>Introduce yourself and share the kind of work you are interested in. A general introduction is not an application to an advertised vacancy.</p></div><Link className="career-button" to="/careers/apply">Introduce yourself <ArrowUpRight size={18} aria-hidden="true" /></Link></div>}
            </section>
            <section className="careers-closing careers-shell"><span>Looking to learn instead?</span><h2>A career starts with<br /><em>something you can build.</em></h2><Link className="career-text-link" to="/programs">Explore training programs <ArrowUpRight size={20} aria-hidden="true" /></Link></section>
        </main>
    );
}
