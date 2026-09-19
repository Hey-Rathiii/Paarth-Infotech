import { testimonials } from "../content/site";
import "./Testimonials.css";

export default function Testimonials() {
    const published = testimonials.filter((item) => item.published);
    if (!published.length) return null;
    return <section className="testimonials" id="testimonials" aria-labelledby="testimonials-title"><div className="testimonials-header"><span className="testimonial-tag">Learning experiences</span><h2 id="testimonials-title">In their own words.</h2></div><div className="testimonials-grid">{published.map((item) => <figure className="testimonial-card" key={item.name}><blockquote className="testimonial-text">“{item.text}”</blockquote><figcaption><h3 className="student-name">{item.name}</h3><p className="student-role">{item.role}{item.company && ` at ${item.company}`}</p>{item.date && <p>{item.date}</p>}{item.affiliation && <p>{item.affiliation}</p>}{item.sourceUrl && <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer">View source</a>}</figcaption></figure>)}</div></section>;
}
