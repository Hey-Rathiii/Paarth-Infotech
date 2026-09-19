import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Bot, Clock3, Code2, Layers3, Workflow } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { programDetails } from "../content/site";
import "./Programs.css";

gsap.registerPlugin(ScrollTrigger);

const programs = [
    {
        id: "dotnet",
        Icon: Code2,
        title: "ASP.NET Core Developer",
        level: "Foundations to projects",
        project: "Build and deploy a secure business-management web application.",
        skills: ["C#", "ASP.NET Core", "Entity Framework", "SQL Server", "Web API", "Deployment"]
    },
    {
        id: "full-stack",
        Icon: Layers3,
        title: "Full Stack Development",
        level: "Career track",
        project: "Create a complete React commerce dashboard with an ASP.NET API.",
        skills: ["HTML", "CSS", "JavaScript", "React", "ASP.NET Core", "SQL Server"]
    },
    {
        id: "dynamics-365",
        Icon: Workflow,
        title: "Microsoft Dynamics 365",
        level: "Specialist track",
        project: "Extend a finance and operations workflow around a business scenario.",
        skills: ["Finance & Operations", "X++", "Extensions", "SSRS Reports", "Integrations", "Power Platform"]
    },
    {
        id: "ai-copilot",
        Icon: Bot,
        title: "AI & Copilot",
        level: "Fast track",
        project: "Build a Copilot-powered support assistant with automated workflows.",
        skills: ["Prompt Engineering", "Azure AI", "Copilot Studio", "Automation", "Chatbots", "AI Workflows"]
    }
].map((program) => ({ ...program, ...programDetails[program.id] }));

function Programs() {
    const programsRef = useRef(null);

    useLayoutEffect(() => {
        const media = gsap.matchMedia();
        media.add("(prefers-reduced-motion: no-preference)", () => {
            gsap.from(".programs-header > *", {
                y: 24,
                opacity: 0,
                duration: 0.65,
                stagger: 0.08,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: programsRef.current,
                    start: "top 82%",
                    once: true
                }
            });

            gsap.utils.toArray(".program-card").forEach((card) => {
                gsap.from(card, {
                    y: 24,
                    opacity: 0,
                    duration: 0.6,
                    ease: "power2.out",
                    scrollTrigger: { trigger: card, start: "top 92%", once: true }
                });
            });
        }, programsRef);
        return () => media.revert();
    }, []);

    return (
        <section ref={programsRef} className="programs" id="programs" aria-labelledby="home-programs-heading">
            <div className="programs-header">
                <span className="program-tag">Our Programs</span>
                <h2 id="home-programs-heading">Build skills.<br />Create something real.</h2>
                <p>Choose a focused learning track, explore the tools, and see what you could build along the way.</p>
                <Link className="programs-browse" to="/programs#programs">
                    Compare all programs <ArrowRight size={18} aria-hidden="true" />
                </Link>
            </div>

            <div className="programs-grid">
                {programs.map((program) => {
                    const Icon = program.Icon;
                    return (
                        <article className="program-card" data-program={program.id} key={program.id} aria-labelledby={`home-program-${program.id}`}>
                            <div className="program-card-heading">
                                <div className="program-icon"><Icon size={24} aria-hidden="true" /></div>
                                <span className="program-level">{program.level}</span>
                                <span className="program-duration"><Clock3 size={15} aria-hidden="true" />{program.duration}</span>
                            </div>

                            <h3 id={`home-program-${program.id}`}>{program.title}</h3>

                            <div className="program-build">
                                <span>What you’ll build</span>
                                <p>{program.project}</p>
                            </div>

                            <ul className="program-skills" aria-label={`${program.title} skills`}>
                                {program.skills.map((skill) => <li key={skill}>{skill}</li>)}
                            </ul>

                            <div className="program-card-footer">
                                <span>{program.format}</span>
                                <Link to={`/programs#${program.id}`} aria-label={`View ${program.title} curriculum`}>
                                    View curriculum <ArrowRight size={18} aria-hidden="true" />
                                </Link>
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}

export default Programs;
