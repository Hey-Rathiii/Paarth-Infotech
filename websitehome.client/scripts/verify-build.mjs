import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import path from "node:path";
import { SITE_URL, routeMetadata } from "../src/content/seo.js";

const outDir = path.resolve(process.argv[2] || "dist");
const assets = new Set();
for (const [route, metadata] of Object.entries(routeMetadata)) {
    const file = route === "/" ? "index.html" : `${route.slice(1)}.html`;
    const html = await readFile(path.join(outDir, file), "utf8");
    assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `${route}: one visible page heading in source`);
    assert.ok(html.includes('id="main-content"'), `${route}: prerendered main content`);
    assert.equal((html.match(/<title>/g) || []).length, 1, `${route}: one title`);
    assert.equal((html.match(/name="description"/g) || []).length, 1, `${route}: one description`);
    assert.ok(html.includes(`rel="canonical" href="${SITE_URL}${route}"`), `${route}: production canonical`);
    assert.ok(html.includes(`content="${metadata.indexable ? "index" : "noindex"}, follow"`), `${route}: correct indexing directive`);
    assert.ok(!html.includes("Switched to client rendering"), `${route}: SSR must not silently fall back`);
    const schema = html.match(/<script id="site-structured-data" type="application\/ld\+json">([\s\S]*?)<\/script>/);
    assert.ok(JSON.parse(schema[1])["@graph"].length === 2, `${route}: valid structured data`);
    for (const [, asset] of html.matchAll(/(?:src|href)="(\/[^"?#]+\.(?:js|css|png|webp|svg|ico))"/g)) assets.add(asset);
}
for (const asset of assets) await access(path.join(outDir, asset.slice(1)));
const missing = await readFile(path.join(outDir, "404.html"), "utf8");
assert.ok(missing.includes("404 · Page not found") && missing.includes("noindex, follow"));
assert.ok(!missing.includes('rel="canonical"'));
const sitemap = await readFile(path.join(outDir, "sitemap.xml"), "utf8");
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
assert.deepEqual(urls, Object.entries(routeMetadata).filter(([, value]) => value.indexable).map(([route]) => `${SITE_URL}${route}`));
const robots = await readFile(path.join(outDir, "robots.txt"), "utf8");
assert.ok(robots.includes(`Sitemap: ${SITE_URL}/sitemap.xml`) && !robots.includes("<html"));
console.log(`Verified ${Object.keys(routeMetadata).length} prerendered pages, ${assets.size} local asset references, sitemap, robots and 404 HTML.`);
