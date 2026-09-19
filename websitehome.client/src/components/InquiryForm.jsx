import { useId, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Copy, Mail } from "lucide-react";
import { company, careerInterests } from "../content/site";
import { buildEmailDraft } from "../lib/emailDraft";
import "./InquiryForm.css";

const inquiryTopics = ["Training programs", "Software development", "Cloud & Dynamics 365", "Something else"];

export default function InquiryForm({ careers = false, role = "" }) {
    const id = useId();
    const [draft, setDraft] = useState(null);
    const [status, setStatus] = useState("");
    const previewRef = useRef(null);
    const recipient = careers && company.careersEmail ? company.careersEmail : company.email;
    const topics = careers ? (role ? [role] : careerInterests) : inquiryTopics;

    function prepareEmail(event) {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
        for (const field of ["name", "message"]) {
            const input = form.elements.namedItem(field);
            input.setCustomValidity(String(data.get(field)).trim() ? "" : "Please enter a few words here.");
        }
        if (!form.reportValidity()) return;
        setDraft(buildEmailDraft(recipient,
            `${careers ? (role ? "Role inquiry" : "Career introduction") : "Website inquiry"} — ${data.get("topic")}`,
            [
                ["Name", data.get("name")], ["Email", data.get("email")],
                [careers ? "Area of interest" : "Topic", data.get("topic")],
                [careers ? "Experience" : "Phone (optional)", data.get(careers ? "experience" : "phone")],
                ["Portfolio / profile", data.get("portfolio")], ["Message", data.get("message")]
            ]));
        setStatus("Your draft is ready to review. Nothing has been sent.");
    }

    async function copyDraft() {
        try {
            await navigator.clipboard.writeText(`To: ${recipient}\nSubject: ${draft.subject}\n\n${draft.body}`);
            setStatus("Draft copied. Paste it into your email app and send when ready.");
        } catch {
            previewRef.current?.focus();
            previewRef.current?.select();
            setStatus("Automatic copying is unavailable. Select and copy the draft below, then email it to the address shown.");
        }
    }

    return (
        <form className="inquiry-form" onSubmit={prepareEmail} onChange={(event) => {
            event.target.setCustomValidity?.("");
            setDraft(null);
            setStatus("");
        }}>
            <div className="inquiry-form__row">
                <label htmlFor={`${id}-name`}>Your name <input id={`${id}-name`} name="name" autoComplete="name" maxLength={100} required /></label>
                <label htmlFor={`${id}-email`}>Email address <input id={`${id}-email`} type="email" name="email" autoComplete="email" maxLength={180} required /></label>
            </div>
            <label htmlFor={`${id}-topic`}>{careers ? "Area of interest" : "What would you like to discuss?"}
                <select id={`${id}-topic`} name="topic" defaultValue={role || ""} required>
                    <option value="" disabled>Choose an option</option>
                    {topics.map((topic) => <option key={topic} value={topic}>{topic}</option>)}
                </select>
            </label>
            {careers ? <div className="inquiry-form__row">
                <label htmlFor={`${id}-experience`}>Experience <span>(optional)</span><select id={`${id}-experience`} name="experience" defaultValue=""><option value="">Choose an option</option><option>Student / starting out</option><option>Less than 2 years</option><option>2–5 years</option><option>More than 5 years</option></select></label>
                <label htmlFor={`${id}-portfolio`}>Portfolio or profile <span>(optional)</span><input id={`${id}-portfolio`} name="portfolio" type="url" placeholder="https://" maxLength={300} /></label>
            </div> : <label htmlFor={`${id}-phone`}>Phone number <span>(optional)</span><input id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" maxLength={40} /></label>}
            <label htmlFor={`${id}-message`}>{careers ? "Tell us about yourself and what you would like to work on" : "Tell us a little about your goal"}<textarea id={`${id}-message`} name="message" rows={5} maxLength={1500} required aria-describedby={`${id}-hint`} /></label>
            <p className="inquiry-form__hint" id={`${id}-hint`}>{careers ? "A short introduction and a link to your work are enough. You can attach a résumé in your email app." : "Share your learning goals or project needs. Please leave out passwords and confidential project data."}</p>
            <p className="inquiry-form__privacy">This prepares an email to <a href={`mailto:${recipient}`}>{recipient}</a>. You review and send it in your email app. <Link to="/privacy">How your information is handled</Link>.</p>
            <button type="submit" className="inquiry-form__submit">Prepare email <ArrowUpRight size={18} aria-hidden="true" /></button>
            <p className="inquiry-form__status" role="status">{status}</p>
            {draft && <section className="email-draft" aria-label="Review your email draft">
                <h3>Review, then send</h3>
                <p>To: <strong>{recipient}</strong></p>
                <p>Subject: {draft.subject}</p>
                <label htmlFor={`${id}-draft`}>Your message<textarea ref={previewRef} id={`${id}-draft`} readOnly value={draft.body} rows={7} /></label>
                <div className="email-draft__actions"><a href={draft.href}><Mail size={17} aria-hidden="true" /> Open email app</a><button type="button" onClick={copyDraft}><Copy size={17} aria-hidden="true" /> Copy draft</button></div>
                <p>If an email app does not open, copy this draft into your usual email service. Preparing or copying a draft does not submit an inquiry.</p>
            </section>}
        </form>
    );
}
