import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { team } from "../content/site";
import "./Team.css";

export default function Team() {
    const people = team.filter((person) => person.published);
    return (
        <section className="team-section" aria-labelledby="team-title"><div className="team-shell"><span>People behind the work</span><h2 id="team-title">Know who you will work with.</h2>
            {people.length > 0 ? <div className="team-grid">{people.map((person) => <article key={person.name}>{person.image && <img src={person.image} alt={person.name} loading="lazy" />}<h3>{person.name}</h3><span>{person.role}</span><p>{person.bio}</p>{person.profileUrl && <a href={person.profileUrl} target="_blank" rel="noopener noreferrer">Professional profile <ArrowUpRight size={16} aria-hidden="true" /></a>}</article>)}</div> : <div className="team-introduction"><p>Choosing a program or a development partner is a people decision. Ask about your instructor’s experience or the team who would work on your project before you commit.</p><Link to="/#contact">Ask about your mentor or project team <ArrowUpRight size={18} aria-hidden="true" /></Link></div>}
        </div></section>
    );
}
