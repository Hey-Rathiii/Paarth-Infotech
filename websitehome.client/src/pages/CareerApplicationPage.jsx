import { useSyncExternalStore } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, FileText, Mail } from "lucide-react";
import { vacancies } from "../content/site";
import InquiryForm from "../components/InquiryForm";
import "./CareersPage.css";

const subscribe = () => () => {};
const getServerRole = () => null;

export default function CareerApplicationPage() {
    const [params] = useSearchParams();
    // Query-specific content is resolved after the shared static page hydrates.
    const requestedRole = useSyncExternalStore(subscribe, () => params.get("role"), getServerRole);
    const role = vacancies.find((item) => item.published && item.id === requestedRole);
    return (
        <main id="main-content" tabIndex={-1} className="careers-page career-application">
            <div className="careers-shell"><Link className="career-back" to="/careers"><ArrowLeft size={16} aria-hidden="true" /> Back to careers</Link><div className="career-application__grid">
                <div><span className="careers-eyebrow">{role ? "Role application" : "An open introduction"}</span><h1>{role ? role.title : <>Your story.<br /><em>Your next step.</em></>}</h1><p>{role ? `${role.type} · ${role.location}` : "Tell us what you enjoy doing, what you have worked on and where you would like to grow."}</p>
                    {requestedRole && !role && <p className="career-application__notice">That role is not currently listed. You can still send a general introduction below.</p>}
                    <div className="career-application__note"><FileText size={22} aria-hidden="true" /><h2>A few useful details</h2><p>A short introduction, your area of interest and a link to something you have made or contributed to. A learning project is welcome too.</p></div>
                    <div className="career-application__note"><Mail size={22} aria-hidden="true" /><h2>You review before sending</h2><p>The form prepares an email. Add a résumé in your email app if you wish, then send it when you are ready.</p></div>
                    {!role && <p className="career-application__fine">This is a general expression of interest. It does not imply an available role, interview or offer.</p>}
                </div>
                <div className="career-application__form"><h2>{role ? "Apply for this role" : "Introduce yourself"}</h2><p>A short, thoughtful message is a good place to start.</p><InquiryForm key={role?.id || "general"} careers role={role?.title || ""} /></div>
            </div></div>
        </main>
    );
}
