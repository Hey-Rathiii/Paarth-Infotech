import { Link } from "react-router-dom";
import { company } from "../content/site";
import "./InformationPage.css";

export default function InformationPage({ kind }) {
    const privacy = kind === "privacy";
    const title = privacy ? "Your information, explained." : "Clarity before commitment.";
    return (
        <main className="information-page" id="main-content" tabIndex={-1}>
            <div className="information-shell"><span className="information-eyebrow">{privacy ? "Website privacy" : "Working with Paarth"}</span><h1>{title}</h1>
                <p className="information-lead">{privacy ? "Here is how information moves through the contact and careers pages on this website." : "Use these points to prepare for a conversation and understand the details to confirm before you start."}</p>
                {privacy ? <>
                    <section><h2>Contact and careers forms</h2><p>These forms prepare an email draft in your browser. Clicking “Prepare email” does not submit your information to a server. The draft remains in the page until you change the form or leave it.</p><p>“Open email app” passes the draft to your configured email application. “Copy draft” places it on your clipboard. You decide whether to send the email. Your email service may save its own draft once opened.</p></section>
                    <section><h2>Information you choose to share</h2><p>A draft includes your name, email address, topic and message. Phone numbers, experience and portfolio links are optional. The careers form does not upload files; you can attach a résumé in your email application.</p><p>Share only information relevant to your inquiry. Please do not include passwords, identity documents or confidential customer information in an initial message.</p></section>
                    <section><h2>Email delivery and follow-up</h2><p>When you send a message, your email service and the receiving email service handle its delivery. To ask about information you have emailed, request a correction or discuss deletion, contact <a href={`mailto:${company.email}`}>{company.email}</a>.</p></section>
                    <section><h2>Browser preferences and external services</h2><p>The website saves your light or dark theme preference in your browser’s local storage. The forms do not save your entries to local storage. Your browser may independently offer autofill.</p><p>The website requests fonts from Google Fonts. Hosting and font services receive the connection information needed to deliver their resources, such as an IP address. Links to external profiles, websites or maps take you to services with their own privacy practices.</p></section>
                </> : <>
                    <section id="training"><h2>Before enrolling in a program</h2><p>Ask for the current syllabus, prerequisites, instructor details, batch dates, class format and expected weekly commitment. Listed durations describe the program outline; confirm the schedule for your batch.</p><p>Request the total fee, what is included, payment milestones and any additional costs in writing. This website does not collect course payments.</p><h3>Fees, cancellation and refunds</h3><p>Ask for the applicable cancellation, rescheduling and refund terms before paying. This page does not set a universal refund period or refund amount. Those details need to be confirmed for the specific program and enrollment.</p></section>
                    <section><h2>Career support and outcomes</h2><p>Ask which project reviews, interview preparation and job-search activities are included in your program. Training and career guidance do not guarantee employment, a salary or an interview.</p></section>
                    <section><h2>Before starting a software project</h2><p>Confirm the scope, deliverables, timeline, price and payment schedule in a written proposal. Discuss ownership of code and assets, access to systems, confidentiality, change requests, handover and support before work begins.</p><p>The project examples on this website are labeled concepts. Their illustrations show possible directions and are not evidence of delivered client projects or measured client results.</p></section>
                    <section><h2>Careers and applications</h2><p>Only published vacancies represent advertised roles. A general introduction does not mean that a position is available or that an interview or offer will follow. Preparing a draft does not submit an application; send it from your email app when ready.</p></section>
                    <section><h2>Specific agreements</h2><p>This page helps you prepare for a conversation. It is not an enrollment confirmation, service contract or job offer. Request and review the specific written terms for the engagement you are considering.</p></section>
                </>}
                <div className="information-contact"><h2>Need to clarify something?</h2><p>Email <a href={`mailto:${company.email}`}>{company.email}</a> or <Link to="/#contact">prepare an inquiry</Link>.</p></div>
            </div>
        </main>
    );
}
