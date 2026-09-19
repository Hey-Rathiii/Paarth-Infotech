// Edit business details here. Leave unknown details empty; they stay off the site.
// Publish people, reviews and vacancies only after checking the facts and consent.
export const company = {
    name: "Paarth Infotech",
    email: "info@phsolutions.in", // Existing address; confirm that this inbox is monitored.
    careersEmail: "", // Falls back to company.email.
    phone: "",
    address: "",
    mapUrl: "",
    legalName: "",
    registration: "",
    identityNote: "", // Explain any relationship with PH Solutions / PIE once confirmed.
    socialLinks: [] // { label: "LinkedIn", url: "https://www.linkedin.com/company/..." }
};

export const team = [];
// { name, role, bio, image: "/team/name.jpg", profileUrl, published: true }

// Add only approved quotes here; imported content is included in public browser bundles.
// Unapproved originals are preserved in content-drafts/testimonials.json (do not import it).
export const testimonials = [];

export const careerInterests = [
    "Software engineering", "Design & user experience", "Training & mentorship",
    "Internships & early careers", "Business & operations"
];

export const vacancies = [];
// Add only approved openings. The careers page renders these automatically.
// { id, title, location, type, summary, requirements: ["..."], published: true }

export const programDetails = {
    dotnet: { duration: "4 months", format: "Live mentoring + capstone" },
    "full-stack": { duration: "6 months", format: "Frontend + backend projects" },
    "dynamics-365": { duration: "3 months", format: "Enterprise workflow labs" },
    "ai-copilot": { duration: "2 months", format: "Automation workshops" }
};
