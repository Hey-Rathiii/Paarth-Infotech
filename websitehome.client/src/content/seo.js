export const SITE_URL = "https://www.paarthinfotech.com";
export const SITE_NAME = "Paarth Infotech";
export const SITE_IMAGE = `${SITE_URL}/icon-512.png`;

// Keep this list aligned with public routes. It also drives the production sitemap.
export const routeMetadata = {
    "/": {
        title: "Paarth Infotech | Software Training & Development",
        description: "Build practical software skills or bring your business idea to life with Paarth Infotech. Explore .NET, React, Dynamics 365 training and development services.",
        indexable: true
    },
    "/programs": {
        title: "Software Training Programs & Projects | Paarth Infotech",
        description: "Explore practical training in ASP.NET Core, full-stack development, Dynamics 365 and AI Copilot, with mentoring, technical foundations and capstone projects.",
        indexable: true
    },
    "/services": {
        title: "Web, Cloud & Enterprise Software Services | Paarth Infotech",
        description: "Explore web and application development, Azure cloud solutions, Dynamics 365 and business automation services. Discuss your software project with Paarth Infotech.",
        indexable: true
    },
    "/portfolio": {
        title: "Software Project Concepts & Demos | Paarth Infotech",
        description: "Explore illustrative software project concepts from Paarth Infotech, including a team task board, learning portal, cloud dashboard and AI assistant.",
        indexable: true
    },
    "/technologies": {
        title: ".NET, React, Azure & Dynamics 365 Technologies | Paarth Infotech",
        description: "Explore the technologies behind Paarth Infotech training and software projects, from C# and React to Azure, SQL Server, Dynamics 365 and AI tools.",
        indexable: true
    },
    "/about": {
        title: "About Our Training & Software Work | Paarth Infotech",
        description: "Learn how Paarth Infotech approaches practical technical education and software development through project work, clear communication and responsible engineering.",
        indexable: true
    },
    "/careers": {
        title: "Careers in Software, Design & Training | Paarth Infotech",
        description: "Explore working with Paarth Infotech in software, design and technical education. View published opportunities or introduce yourself and your interests.",
        indexable: true
    },
    "/careers/apply": {
        title: "Introduce Yourself | Careers at Paarth Infotech",
        description: "Prepare an email introduction with your experience, interests and portfolio for Paarth Infotech. Review your details before sending from your email app.",
        indexable: false
    },
    "/privacy": {
        title: "Website Privacy | Paarth Infotech",
        description: "Read how the Paarth Infotech website handles email drafts, browser preferences and contact information, and how to ask a privacy question.",
        indexable: true
    },
    "/terms": {
        title: "Working with Us | Paarth Infotech",
        description: "Understand what to clarify before enrolling in a Paarth Infotech training program or starting a software project, including scope, fees and support.",
        indexable: true
    }
};

export function getPageMetadata(pathname) {
    const path = (pathname || "/").split(/[?#]/, 1)[0].replace(/\/+$/, "") || "/";
    const page = Object.hasOwn(routeMetadata, path) ? routeMetadata[path] : null;

    return page
        ? { ...page, canonical: `${SITE_URL}${path === "/" ? "/" : path}` }
        : {
            title: "Page Not Found | Paarth Infotech",
            description: "This page could not be found. Explore Paarth Infotech software training programs, development services and project concepts.",
            indexable: false,
            canonical: null
        };
}

export function getSiteStructuredData() {
    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": `${SITE_URL}/#organization`,
                name: SITE_NAME,
                url: `${SITE_URL}/`,
                logo: `${SITE_URL}/icon-512.png`,
                description: "Practical software training and web, cloud and enterprise software development."
            },
            {
                "@type": "WebSite",
                "@id": `${SITE_URL}/#website`,
                name: SITE_NAME,
                url: `${SITE_URL}/`,
                publisher: { "@id": `${SITE_URL}/#organization` },
                inLanguage: "en"
            }
        ]
    };
}

export function getSeoTags(pathname) {
    const page = getPageMetadata(pathname);
    return {
        ...page,
        meta: [
            { name: "description", content: page.description },
            { name: "robots", content: page.indexable ? "index, follow" : "noindex, follow" },
            { property: "og:type", content: "website" },
            { property: "og:site_name", content: SITE_NAME },
            { property: "og:title", content: page.title },
            { property: "og:description", content: page.description },
            ...(page.canonical ? [{ property: "og:url", content: page.canonical }] : []),
            { property: "og:image", content: SITE_IMAGE },
            { property: "og:image:width", content: "512" },
            { property: "og:image:height", content: "512" },
            { property: "og:image:alt", content: "Paarth Infotech logo" },
            { name: "twitter:card", content: "summary" },
            { name: "twitter:title", content: page.title },
            { name: "twitter:description", content: page.description },
            { name: "twitter:image", content: SITE_IMAGE },
            { name: "twitter:image:alt", content: "Paarth Infotech logo" }
        ]
    };
}

function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (character) => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[character]);
}

export function renderSeoHead(pathname) {
    const page = getSeoTags(pathname);
    const structuredData = JSON.stringify(getSiteStructuredData()).replace(/</g, "\\u003c");
    return [
        `<title>${escapeHtml(page.title)}</title>`,
        ...page.meta.map((tag) => `<meta ${tag.name ? "name" : "property"}="${escapeHtml(tag.name || tag.property)}" content="${escapeHtml(tag.content)}" data-route-meta="true">`),
        ...(page.canonical ? [`<link rel="canonical" href="${escapeHtml(page.canonical)}" data-route-meta="true">`] : []),
        `<script id="site-structured-data" type="application/ld+json">${structuredData}</script>`
    ].join("\n");
}
