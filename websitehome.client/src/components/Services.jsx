function Services() {
    return (
        <section id="services" className="services-section">
            <div className="services-header">
                <span className="section-tag">Services</span>
                <h2>What We Do Best</h2>
                <p>Helping businesses build scalable, modern and cloud-ready solutions.</p>
            </div>
            <div className="services-grid">
                <div className="service-card">🌐<h3>Web Development</h3><p>Modern websites and enterprise applications.</p></div>
                <div className="service-card">☁<h3>Cloud Solutions</h3><p>Azure deployment and cloud optimization.</p></div>
                <div className="service-card">⚙<h3>Dynamics 365</h3><p>CRM and ERP automation solutions.</p></div>
                <div className="service-card">📱<h3>Mobile Apps</h3><p>Android and iOS application development.</p></div>
                <div className="service-card">🔐<h3>Cyber Security</h3><p>Secure and scalable architecture.</p></div>
                <div className="service-card">🚀<h3>Consulting</h3><p>Technology and business consulting.</p></div>
            </div>
        </section>
    );
}

export default Services;