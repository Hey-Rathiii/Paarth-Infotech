import "./About.css";

function About() {
    return (
        <section id="about" className="about">

            <div className="about-container">

                <div className="about-left">

                    <span className="about-tag">
                        ABOUT PH SOLUTIONS
                    </span>

                    <h2 className="about-title">
                        Empowering Future Professionals Through
                        <span> Industry-Focused Learning</span>
                    </h2>

                    <p className="about-text">
                        At PH Solutions, we bridge the gap between academic
                        learning and industry requirements by providing
                        hands-on training, live projects, expert mentorship,
                        and career-focused programs.
                    </p>

                    <p className="about-text">
                        Our mission is to help students and professionals
                        gain practical experience in modern technologies
                        including Full Stack Development, .NET, Cloud,
                        Dynamics 365, Artificial Intelligence, and more.
                    </p>

                    <div className="about-buttons">

                        <button className="about-btn-primary">
                            Explore Courses
                        </button>

                        <button className="about-btn-secondary">
                            Learn More
                        </button>

                    </div>

                </div>

                <div className="about-right">

                    <div className="about-card">
                        <h3>10+</h3>
                        <p>Students Trained</p>
                    </div>

                    <div className="about-card">
                        <h3>10+</h3>
                        <p>Industry Projects</p>
                    </div>

                    <div className="about-card">
                        <h3>92%</h3>
                        <p>Placement Support</p>
                    </div>

                    <div className="about-card">
                        <h3>10+</h3>
                        <p>Technology Domains</p>
                    </div>

                </div>

            </div>

        </section>
    );
}

export default About;