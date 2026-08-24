import "./Logo.css";
import { Link } from "react-router-dom";

function Logo() {
    return (
        <Link to="/" className="pi-logo">

            <div className="pi-icon">

                <div className="pi-dot"></div>

                <span className="pi-text">
                    PI
                </span>

            </div>

            <div className="pi-brand">

                <span className="pi-title">
                    Paarth
                </span>

                <span className="pi-subtitle">
                    INFOTECH
                </span>

            </div>

        </Link>
    );
}

export default Logo;
