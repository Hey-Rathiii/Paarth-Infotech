import { ArrowUpRight, Mail, MessageSquare, Phone } from "lucide-react";
import { company } from "../content/site";
import InquiryForm from "./InquiryForm";
import "./Contact.css";

export default function Contact() {
    return (
        <section className="contact-section" id="contact" aria-labelledby="contact-title">
            <div className="contact-wrapper">
                <div className="contact-intro">
                    <span className="contact-tag">Start a conversation</span>
                    <h2 id="contact-title">A useful next step<br /><span>starts here.</span></h2>
                    <p>Exploring a training program or planning a software project? Tell us what you have in mind.</p>
                    <a className="contact-email" href={`mailto:${company.email}`}><Mail size={20} aria-hidden="true" />{company.email}<ArrowUpRight size={18} aria-hidden="true" /></a>
                    {company.phone && <a className="contact-email" href={`tel:${company.phone.replace(/[^+\d]/g, "")}`}><Phone size={18} aria-hidden="true" />{company.phone}</a>}
                    {company.address && <p>{company.address}</p>}
                    {company.mapUrl && <a className="contact-email" href={company.mapUrl} target="_blank" rel="noopener noreferrer">View location <ArrowUpRight size={18} aria-hidden="true" /></a>}
                    <div className="contact-expectations"><MessageSquare size={24} aria-hidden="true" /><h3>Give the conversation a head start.</h3><p>For training, include your current experience and preferred program. For a project, include the problem, your priorities and any target timeline.</p><span>Prefer email? You can write to us directly.</span></div>
                </div>
                <div className="contact-form-card"><h3>What are you working towards?</h3><InquiryForm /></div>
            </div>
        </section>
    );
}
