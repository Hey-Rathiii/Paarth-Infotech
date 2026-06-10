import "./Testimonials.css";
import { FaStar } from "react-icons/fa";

function Testimonials() {

    const testimonials = [
        {
            name: "Anchal",
            role: "(Salesforce Developer)",
            company: "Cheetu Inc.",
            text: "PH Solutions helped me build strong technical foundations and gain practical experience through live projects. The mentorship and placement guidance played a key role in helping me secure my position at Cheetu."
        },
        {
            name: "Ayush Rathi",
            role: "(Full Stack Developer & Dynamics 365 Consultant)",
            company: "Paarth Infotech",
            text: "The training combined modern web development with enterprise technologies. Working on real-world projects gave me the confidence to start my professional journey at Paarth Infotech."
        },
        {
            name: "Aryan Anand",
            role: "(Java Full Stack Developer)",
            company: "QSpiders",
            text: "The structured learning path, interview preparation, and hands-on projects helped me improve my technical skills and secure opportunities through QSpiders."
        }
    ];

    return (
        <section className="testimonials">

            <div className="testimonials-header">

                <span className="testimonial-tag">
                    Student Success Stories
                </span>

                <h2>
                    What Our Students Say
                </h2>

                <p>
                    Hear from students who transformed
                    their careers with PH Solutions.
                </p>

            </div>

            <div className="testimonials-grid">

                {testimonials.map((item, index) => (

                    <div
                        className="testimonial-card"
                        key={index}
                    >

                        <h4 className="student-name">
                            {item.name}
                        </h4>

                        <div className="student-role">
                            {item.role} at {item.company}
                        </div>
                        <br/>
                        <div className="stars">
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                        </div>

                        <p className="testimonial-text">
                            "{item.text}"
                        </p>

                    </div>

                ))}

            </div>

        </section>
    );
}

export default Testimonials;