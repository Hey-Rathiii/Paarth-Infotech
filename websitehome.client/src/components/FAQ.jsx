import "./FAQ.css";
import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

function FAQ() {

    const faqs = [
        {
            question: "Do I need prior coding experience?",
            answer: "No. Our programs are designed for beginners as well as professionals looking to upskill."
        },
        {
            question: "Will I work on live projects?",
            answer: "Yes. Students gain hands-on experience through practical assignments and real-world projects."
        },
        {
            question: "Which technologies do you teach?",
            answer: "We provide training in ASP.NET Core, React, Dynamics 365, Azure, SQL Server, AI, and other modern technologies."
        },
        {
            question: "Do you provide certificates?",
            answer: "Yes. Students receive a certificate upon successful completion of the program."
        },
        {
            question: "How are the classes conducted?",
            answer: "Classes can be conducted online, offline, or in hybrid mode depending on the program."
        },
        {
            question: "Can working professionals join?",
            answer: "Absolutely. Our flexible learning approach is suitable for students and working professionals."
        }
    ];

    const [active, setActive] = useState(null);

    const toggleFAQ = (index) => {
        setActive(active === index ? null : index);
    };

    return (
        <section className="faq-section" id="faq">

            <div className="faq-header">

                <span className="faq-tag">
                    Frequently Asked Questions
                </span>

                <h2>
                    Got Questions?
                    <br />
                    We've Got Answers
                </h2>

                <p>
                    Everything you need to know about our training programs and learning experience.
                </p>

            </div>

            <div className="faq-container">

                {faqs.map((faq, index) => (

                    <div
                        className={`faq-item ${active === index ? "active" : ""}`}
                        key={index}
                    >

                        <button
                            className="faq-question"
                            onClick={() => toggleFAQ(index)}
                        >
                            {faq.question}

                            {active === index ?
                                <FaMinus /> :
                                <FaPlus />
                            }
                        </button>

                        <div
                            className={`faq-answer ${active === index ? "show" : ""}`}
                        >
                            <p>{faq.answer}</p>
                        </div>

                    </div>

                ))}

            </div>

        </section>
    );
}

export default FAQ;