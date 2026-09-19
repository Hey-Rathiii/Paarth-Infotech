import { cp, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { routeMetadata } from "../src/content/seo.js";

// Run after build + verify-build. This stages output only; it does not publish.
const source = path.resolve(process.argv[2] || "dist");
const stage = path.resolve(process.argv[3] || ".deployment-dist/vercel-seo");
const output = path.join(stage, ".vercel/output");
await mkdir(stage, { recursive: false });
await mkdir(path.join(output, "static"), { recursive: true });
await cp(source, path.join(output, "static"), { recursive: true });
await writeFile(path.join(stage, ".vercel/project.json"), JSON.stringify({
    projectId: "prj_h1MiV2wRZs3j6SrKyFm7x8YLJQuY", orgId: "team_TMCUdSFsJFhJ5PeD6Bpf3v38", projectName: "paarthinfotech",
}));
const routes = [
    { src: "^/index\\.html$", headers: { Location: "/" }, status: 308 },
    { src: "^/(.+)/$", headers: { Location: "/$1" }, status: 308 },
];
const overrides = {};
for (const route of Object.keys(routeMetadata)) {
    const file = route === "/" ? "/index.html" : `${route}.html`;
    if (route !== "/") routes.push({ src: `^${route}\\.html$`, headers: { Location: route }, status: 308 });
    if (route !== "/") overrides[file.slice(1)] = { path: route.slice(1) };
}
routes.push({ handle: "filesystem" }, { src: "/.*", dest: "/404", status: 404 });
overrides["404.html"] = { path: "404" };
await writeFile(path.join(output, "config.json"), JSON.stringify({ version: 3, routes, overrides }, null, 2));
console.log(`Staged Vercel output at ${stage}`);
