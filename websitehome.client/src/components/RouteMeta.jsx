import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getSeoTags, getSiteStructuredData } from "../content/seo.js";

export default function RouteMeta() {
    const { pathname } = useLocation();

    useEffect(() => {
        const page = getSeoTags(pathname);
        document.title = page.title;

        // Reuse the pre-rendered head, including the original description tag.
        for (const tag of page.meta) {
            const key = tag.name ? "name" : "property";
            const value = tag[key];
            const matches = document.head.querySelectorAll(`meta[${key}="${value}"]`);
            const element = matches[0] || document.createElement("meta");
            element.setAttribute(key, value);
            element.setAttribute("content", tag.content);
            element.dataset.routeMeta = "true";
            if (!element.parentNode) document.head.append(element);
            for (const duplicate of Array.from(matches).slice(1)) duplicate.remove();
        }

        const canonicalLinks = document.head.querySelectorAll('link[rel="canonical"]');
        if (page.canonical) {
            const canonical = canonicalLinks[0] || document.createElement("link");
            canonical.rel = "canonical";
            canonical.href = page.canonical;
            canonical.dataset.routeMeta = "true";
            if (!canonical.parentNode) document.head.append(canonical);
            for (const duplicate of Array.from(canonicalLinks).slice(1)) duplicate.remove();
        } else {
            for (const canonical of canonicalLinks) canonical.remove();
            for (const url of document.head.querySelectorAll('meta[property="og:url"]')) url.remove();
        }

        const structuredData = document.getElementById("site-structured-data") || document.createElement("script");
        structuredData.id = "site-structured-data";
        structuredData.type = "application/ld+json";
        structuredData.textContent = JSON.stringify(getSiteStructuredData());
        if (!structuredData.parentNode) document.head.append(structuredData);
    }, [pathname]);

    return null;
}
