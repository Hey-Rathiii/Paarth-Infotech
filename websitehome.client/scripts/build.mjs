import { build } from "vite";
import { mkdir, readFile, writeFile, mkdtemp, rm } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { parseArgs } from "node:util";
import { SITE_URL, routeMetadata, renderSeoHead } from "../src/content/seo.js";

const { values } = parseArgs({ options: { outDir: { type: "string", default: "dist" } }, args: process.argv.slice(2).filter((arg) => arg !== "--") });
const outDir = path.resolve(values.outDir);
await build({ build: { outDir, manifest: true } });

// Keep the temporary server bundle inside this workspace so Node resolves the
// same dependencies as the client. Never ship it in the public output.
const temporaryRoot = path.resolve(".deployment-dist");
await mkdir(temporaryRoot, { recursive: true });
const serverDir = await mkdtemp(path.join(temporaryRoot, "prerender-"));
try {
    await build({
        build: { ssr: "src/entry-server.jsx", outDir: serverDir, copyPublicDir: false, manifest: false },
        ssr: { noExternal: ["gsap"] },
    });
    const { render } = await import(pathToFileURL(path.join(serverDir, "entry-server.js")).href);
    const template = await readFile(path.join(outDir, "index.html"), "utf8");
    const manifest = JSON.parse(await readFile(path.join(outDir, ".vite/manifest.json"), "utf8"));
    // CSS for lazy routes must be available before JS hydrates their HTML.
    const pageModules = {
        "/": "HomePage", "/programs": "ProgramsPage", "/services": "ServicesPage",
        "/portfolio": "PortfolioPage", "/technologies": "TechnologiesPage", "/about": "AboutPage",
        "/careers": "CareersPage", "/careers/apply": "CareerApplicationPage",
        "/privacy": "InformationPage", "/terms": "InformationPage", "/404": null,
    };
    function collectStyles(key, visited = new Set()) {
        if (visited.has(key)) return [];
        visited.add(key);
        const entry = manifest[key];
        if (!entry) throw new Error(`Missing client manifest entry: ${key}`);
        return [...(entry.imports ?? []).flatMap((dependency) => collectStyles(dependency, visited)), ...(entry.css ?? [])];
    }
    for (const route of [...Object.keys(routeMetadata), "/404"]) {
        if (!Object.hasOwn(pageModules, route)) throw new Error(`Missing page module for ${route}`);
        const moduleKey = pageModules[route] ? `src/pages/${pageModules[route]}.jsx` : "index.html";
        const extraStyles = [...new Set(collectStyles(moduleKey))].filter((file) => !template.includes(`/${file}`))
            .map((file) => `<link rel="stylesheet" href="/${file}" />`).join("\n");
        const body = await render(route);
        if (!body.includes('id="main-content"') || !body.includes("<h1")) throw new Error(`Incomplete HTML for ${route}`);
        const html = template
            .replace(/<title>[\s\S]*?<\/title>/i, "")
            .replace(/<meta\s+name="description"[^>]*>/i, "")
            .replace("</head>", `${renderSeoHead(route)}\n${extraStyles}\n</head>`)
            .replace('<div id="root"></div>', `<div id="root">${body}</div>`);
        const file = route === "/" ? "index.html" : `${route.slice(1)}.html`;
        await mkdir(path.dirname(path.join(outDir, file)), { recursive: true });
        await writeFile(path.join(outDir, file), html);
        console.log(`Prerendered ${route}`);
    }
    const urls = Object.entries(routeMetadata).filter(([, data]) => data.indexable)
        .map(([route]) => `  <url><loc>${SITE_URL}${route === "/" ? "/" : route}</loc></url>`).join("\n");
    await writeFile(path.join(outDir, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
    await writeFile(path.join(outDir, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
    // This internal manifest is used by the build only, never by visitors.
    await rm(path.join(outDir, ".vite"), { recursive: true, force: true });
} finally {
    // mkdtemp created this exact child directory above; no user files live here.
    if (path.dirname(serverDir) !== temporaryRoot) throw new Error("Unsafe temporary directory");
    await rm(serverDir, { recursive: true, force: true });
}
