import "./TechStack.css";

function TechStack() {

    const techs1 = [
        "ASP.NET Core",
        "React",
        "Azure",
        "SQL Server",
        "Dynamics 365",
        "Artificial Intelligence",
        "Cloud Computing",
        "Full Stack"
    ];

    const techs2 = [
        "C#",
        "MVC",
        "Web API",
        "Entity Framework",
        "Power Platform",
        "Copilot",
        "DevOps",
        "JavaScript"
    ];

    return (
        <section className="tech-stack">

            <div className="tech-header">

                <span className="tech-tag">
                    TECHNOLOGIES WE TEACH
                </span>

                <h2>
                    Learn The Skills
                    <span> Industry Demands</span>
                </h2>

            </div>

            <div className="marquee">

                <div className="marquee-track">

                    {[...techs1, ...techs1].map((tech, index) => (
                        <span key={index}>{tech}</span>
                    ))}

                </div>

            </div>

            <div className="marquee reverse">

                <div className="marquee-track">

                    {[...techs2, ...techs2].map((tech, index) => (
                        <span key={index}>{tech}</span>
                    ))}

                </div>

            </div>

        </section>
    );
}

export default TechStack;