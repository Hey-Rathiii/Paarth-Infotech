import { Link } from "react-router-dom";
import { company } from "../content/site";
import "./Logo.css";

export default function Logo() {
    return <Link to="/" className="pi-logo" aria-label={`${company.name} home`}><span className="brand-mark"><img src="/brand/paarth-mark.png" width="84" height="56" alt="" /></span><span className="brand-word"><strong>Paarth</strong><span>INFOTECH</span></span></Link>;
}
