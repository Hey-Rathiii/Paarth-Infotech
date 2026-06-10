import "./Contact.css";
import {
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt,
    FaClock
} from "react-icons/fa";

function Contact() {
    return (
        <section className="contact-section" id="contact">

            <div className="contact-header">

                <span className="contact-tag">
                    Contact Us
                </span>

                <h2>
                    Let's Build Your
                    <span> Future Together</span>
                </h2>

                <p>
                    Have questions about our programs or services?
                    We'd love to hear from you.
                </p>

            </div>

            <div className="contact-container">

                {/* LEFT */}

                <div className="contact-info">

                    <div className="info-card">
                        <FaPhoneAlt />
                        <div>
                            <h4>Phone</h4>
                            <p>+91 XXXXX XXXXX</p>
                        </div>
                    </div>

                    <div className="info-card">
                        <FaEnvelope />
                        <div>
                            <h4>Email</h4>
                            <p>contact@phsolutions.in</p>
                        </div>
                    </div>

                    <div className="info-card">
                        <FaMapMarkerAlt />
                        <div>
                            <h4>Location</h4>
                            <p>Ghaziabad, Uttar Pradesh</p>
                        </div>
                    </div>

                    <div className="info-card">
                        <FaClock />
                        <div>
                            <h4>Working Hours</h4>
                            <p>Mon - Sat | 9 AM - 7 PM</p>
                        </div>
                    </div>

                </div>

                {/* RIGHT */}

                <form className="contact-form">

                    <input
                        type="text"
                        placeholder="Your Name"
                    />

                    <input
                        type="email"
                        placeholder="Your Email"
                    />

                    <input
                        type="tel"
                        placeholder="Phone Number"
                    />

                    <select>
                        <option>
                            Select Technology
                        </option>

                        <option>
                            ASP.NET Core
                        </option>

                        <option>
                            Full Stack Development
                        </option>

                        <option>
                            Dynamics 365
                        </option>

                        <option>
                            Azure Cloud
                        </option>

                        <option>
                            Artificial Intelligence
                        </option>
                    </select>

                    <textarea
                        rows="5"
                        placeholder="Tell us about your goals..."
                    ></textarea>

                    <button type="submit">
                        Book Free Consultation
                    </button>

                </form>

            </div>

        </section>
    );
}

export default Contact;