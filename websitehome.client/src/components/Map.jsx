import "./Map.css";

function Map() {
    return (
        <section className="map-section">

            <div className="map-header">

                <span className="map-tag">
                    Find Us
                </span>

                <h2>
                    Visit Our Location
                </h2>

                <p>
                    Meet us, discuss your career goals,
                    and explore the right learning path.
                </p>

            </div>

            <div className="map-wrapper">

                <iframe
                    title="Paarth Infotech Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d901.9433426499587!2d77.756166758771!3d29.001431481297907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390c7b3bf839de05%3A0xe1c4eb75918c33e!2sPaarth%20Institute%20of%20Education%20(PIE)!5e0!3m2!1sen!2sin!4v1781093904365!5m2!1sen!2sin"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>

            </div>

        </section>
    );
}

export default Map;