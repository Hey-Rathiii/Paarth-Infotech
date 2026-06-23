import "./Contact.css";

function Contact() {
    return (
        <section className="contact-section" id="contact">

            <div className="contact-wrapper">

                {/* FORM */}

                <div className="contact-form-card">

                    <span className="contact-tag">
                        Contact Us
                    </span>

                    <h2>
                        Let's Build Your
                        <span> Future Together</span>
                    </h2>

                    <p>
                        Have questions about our programs?
                        Send us a message.
                    </p>

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
                            <option>Select Technology</option>
                            <option>ASP.NET Core</option>
                            <option>Full Stack Development</option>
                            <option>Dynamics 365</option>
                            <option>Artificial Intelligence</option>
                        </select>

                        <textarea
                            rows="5"
                            placeholder="Your Message"
                        />

                        <button type="submit">
                            Book Consultation
                        </button>

                    </form>

                </div>

                {/* MAP */}

                <div className="contact-map-card">

                    <iframe
                        title="PH Solutions Location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d901.9433426499587!2d77.756166758771!3d29.001431481297907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390c7b3bf839de05%3A0xe1c4eb75918c33e!2sPaarth%20Institute%20of%20Education%20(PIE)!5e0!3m2!1sen!2sin!4v1781093904365!5m2!1sen!2sin"
                        loading="lazy"
                    />

                </div>

            </div>

        </section>
    );
}

export default Contact;