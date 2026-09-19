import { useId } from "react";
import { Link } from "react-router-dom";
import "./FAQ.css";

const faqs = [
    ["Are you a training company or a software development company?", "Both. Our programs focus on practical technical learning, while our business services cover web applications, cloud solutions and enterprise workflows."],
    ["Do I need prior coding experience?", "The right starting point depends on the program and your current skills. Share your experience so we can discuss prerequisites and the learning path before you enroll."],
    ["Will I work on projects?", "Programs include practical assignments and project work. Ask for the current syllabus and capstone brief to understand what you will build and how it will be reviewed."],
    ["Does training guarantee a job?", "No. Ask about the project reviews, interview preparation and career guidance included in your program. Employment decisions are made by employers; a course does not guarantee a placement or salary."],
    ["Where can I find fees, class dates and cancellation details?", "Request the current batch schedule, complete fee breakdown, mentor details and cancellation terms before enrolling. These details depend on the program and should be confirmed in writing."],
    ["How do I discuss a software project?", "Share the problem you want to solve, your priorities and any target timeline through the contact section. You can use the email draft form or write directly to the address shown."],
    ["Are the portfolio projects delivered client projects?", "The current portfolio contains clearly labeled illustrative concepts. They show possible project directions and technology choices, not measured client results."]
];

export default function FAQ() {
    const id = useId();
    return <section className="faq-section" id="faq" aria-labelledby="faq-title"><div className="faq-header"><span className="faq-tag">A little clarity</span><h2 id="faq-title">Good questions.<br />Straight answers.</h2><p>About learning, working together and taking the next step.</p></div><div className="faq-container">{faqs.map(([question, answer], index) => <details className="faq-item" key={question} name={id}><summary className="faq-question">{question}<span aria-hidden="true">+</span></summary><div className="faq-response"><p>{answer}</p>{index === 4 && <Link to="/terms#training">Before you enroll →</Link>}</div></details>)}</div></section>;
}
