// Illustrative project concepts. Replace descriptions and imagery with real work when available.
// Do not add outcome metrics without evidence and permission to publish.
import { Braces, Cloud, Code2, GraduationCap, Sparkles, Workflow } from "lucide-react";
import {
    taskflowImage,
    learningProjectImage,
    cloudProjectImage,
    assistantProjectImage
} from "./imagery";

export const projects = [
    {
        number: "01",
        eyebrow: "Team productivity",
        title: "TaskFlow — Team Task Board",
        description:
            "A simple task board for a small team: assign an owner, set a due date and move work from To do to In progress to Done. A focused concept for keeping everyday projects organised.",
        image: taskflowImage,
        imageAlt:
            "AI-generated laptop scene showing the TaskFlow concept with task columns, statuses and due dates",
        accent: "blue",
        direction: "normal",
        tags: ["React", "ASP.NET Core", "SQL Server"],
        outcomes: [
            ["Clear", "task ownership"],
            ["Simple", "status tracking"]
        ],
        cardLabel: "Project status",
        cardValue: "Concept",
        Icon: Workflow
    },
    {
        number: "02",
        eyebrow: "Project learning platform",
        title: "Northstar Learning Lab",
        description:
            "An immersive learning environment where students move from guided foundations to reviewed, portfolio-ready product builds.",
        image: learningProjectImage,
        imageAlt:
            "AI-generated workspace with a learning dashboard showing courses and project progress",
        accent: "violet",
        direction: "reverse",
        tags: ["React", "Learning Paths", "Mentor Reviews", "Analytics"],
        outcomes: [
            ["Guided", "learning paths"],
            ["Practical", "project milestones"]
        ],
        cardLabel: "Project status",
        cardValue: "Concept",
        Icon: GraduationCap
    },
    {
        number: "03",
        eyebrow: "Cloud operations",
        title: "Nimbus Control",
        description:
            "A cloud command centre that gives delivery teams one calm view of deployments, environment health, incidents and cost signals.",
        image: cloudProjectImage,
        imageAlt:
            "AI-generated workstation displaying a cloud operations dashboard with deployment and service health panels",
        accent: "cyan",
        direction: "normal",
        tags: ["Azure", "DevOps", "Observability", "Automation"],
        outcomes: [
            ["Unified", "environment view"],
            ["Planned", "deployment workflow"]
        ],
        cardLabel: "Project status",
        cardValue: "Concept",
        Icon: Cloud
    },
    {
        number: "04",
        eyebrow: "AI learning assistant",
        title: "AURA Mentor",
        description:
            "A context-aware learning companion that turns questions into useful next steps while keeping mentors in control of the learning journey.",
        image: assistantProjectImage,
        imageAlt:
            "AI-generated laptop displaying a learning assistant conversation beside a notebook",
        accent: "magenta",
        direction: "reverse",
        tags: ["Azure AI", "Copilot", "RAG", "Responsible AI"],
        outcomes: [
            ["Contextual", "learning support"],
            ["Mentor-led", "review approach"]
        ],
        cardLabel: "Project status",
        cardValue: "Concept",
        Icon: Sparkles
    }
];
export const smallerProjects = [
    {
        Icon: Code2,
        type: "Enterprise portal",
        title: "Pulse Workflow",
        copy: "A role-based operations hub for approvals, reporting and team visibility.",
        image: taskflowImage,
        imageAlt: "AI-generated task board visual illustrating a proposed team workflow portal",
        className: "portfolio-more-card--wide"
    },
    {
        Icon: Workflow,
        type: "Automation system",
        title: "Flowline",
        copy: "Connected business processes that remove repetitive hand-offs.",
        image: cloudProjectImage,
        imageAlt: "AI-generated operations dashboard visual illustrating a proposed automation system",
        className: ""
    },
    {
        Icon: Braces,
        type: "Learning platform concept",
        title: "Project Foundry",
        copy: "A guided build space for turning technical learning into proof.",
        image: learningProjectImage,
        imageAlt: "AI-generated learning dashboard visual illustrating a proposed guided project platform",
        className: ""
    }
];
