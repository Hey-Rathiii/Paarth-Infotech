import test from "node:test";
import assert from "node:assert/strict";
import { SITE_URL, routeMetadata, getPageMetadata, renderSeoHead } from "../src/content/seo.js";

test("public routes have distinct search metadata and custom-domain canonicals", () => {
    const entries = Object.entries(routeMetadata);
    assert.equal(new Set(entries.map(([, page]) => page.title)).size, entries.length);
    assert.equal(new Set(entries.map(([, page]) => page.description)).size, entries.length);
    for (const [path] of entries) {
        const page = getPageMetadata(path);
        assert.equal(new URL(page.canonical).origin, SITE_URL);
        assert.equal(new URL(page.canonical).pathname, path);
        assert.equal((renderSeoHead(path).match(/rel="canonical"/g) || []).length, 1);
    }
});

test("tracking parameters and trailing slashes cannot change a canonical", () => {
    assert.equal(getPageMetadata("/programs/?utm_source=mail#dotnet").canonical, `${SITE_URL}/programs`);
    assert.equal(getPageMetadata("/?utm_source=mail").canonical, `${SITE_URL}/`);
});

test("missing pages cannot canonicalize to the homepage or be indexed", () => {
    for (const path of ["/missing-page", "/constructor", "/__proto__", "/<script>alert(1)</script>"]) {
        assert.equal(getPageMetadata(path).canonical, null);
        assert.equal(getPageMetadata(path).indexable, false);
        const head = renderSeoHead(path);
        assert.match(head, /content="noindex, follow"/);
        assert.doesNotMatch(head, /rel="canonical"|property="og:url"|alert\(1\)/);
    }
});

test("career introduction remains crawlable but is excluded from search results", () => {
    assert.equal(getPageMetadata("/careers").indexable, true);
    assert.equal(getPageMetadata("/careers/apply?role=engineering").indexable, false);
    assert.match(renderSeoHead("/careers/apply"), /content="noindex, follow"/);
});

test("rendered head escapes text and contains valid, restrained organization data", () => {
    const head = renderSeoHead("/");
    assert.match(head, /Software Training &amp; Development/);
    const json = head.match(/<script id="site-structured-data" type="application\/ld\+json">(.*?)<\/script>/)[1];
    const data = JSON.parse(json);
    assert.equal(data["@graph"][0].name, "Paarth Infotech");
    assert.equal(data["@graph"][0].url, `${SITE_URL}/`);
    assert.doesNotMatch(json, /aggregateRating|reviewCount|address|legalName|foundingDate/);
});
