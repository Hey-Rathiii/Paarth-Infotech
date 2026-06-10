import "./Programs.css";
import { FaCode, FaLaptopCode, FaCloud, FaRobot } from "react-icons/fa";

function Programs() {
    const programs = [
        {
            icon: <FaCode />,
            title: "ASP.NET Core Developer",
            duration: "4 Months",
            skills: [
                "C#",
                "ASP.NET Core",
                "Entity Framework",
                "SQL Server",
                "Web API",
                "Deployment"
            ]
        },
        {
            icon: <FaLaptopCode />,
            title: "Full Stack Development",
            duration: "6 Months",
            skills: [
                "HTML",
                "CSS",
                "JavaScript",
                "React",
                "ASP.NET Core",
                "SQL Server"
            ]
        },
        {
            icon: <FaCloud />,
            title: "Microsoft Dynamics 365",
            duration: "3 Months",
            skills: [
                "Finance & Operations",
                "X++",
                "Extensions",
                "SSRS Reports",
                "Integrations",
                "Power Platform"
            ]
        },
        {
            icon: <FaRobot />,
            title: "AI & Copilot",
            duration: "2 Months",
            skills: [
                "Prompt Engineering",
                "Azure AI",
                "Copilot Studio",
                "Automation",
                "Chatbots",
                "AI Workflows"
            ]
        }
    ];

    return (
        <section className="programs" id="programs">

            <div className="programs-header">
                <span className="program-tag">
                    Our Programs
                </span>

                <h2>
                    Choose The Right Path
                    <br />
                    For Your Career
                </h2>

                <p>
                    Industry-focused programs designed
                    to help students become job-ready
                    professionals.
                </p>
            </div>

            <div className="programs-grid">

                {programs.map((program, index) => (

                    <div
                        className="program-card"
                        key={index}
                    >
                        <div className="program-icon">
                            {program.icon}
                        </div>

                        <h3>{program.title}</h3>

                        <ul>

                            {program.skills.map((skill, i) => (
                                <li key={i}>
                                    ✓ {skill}
                                </li>
                            ))}

                        </ul>

                        <div className="program-footer">
                            {program.duration}
                        </div>
                    </div>

                ))}

            </div>

        </section>
    );
}

export default Programs;