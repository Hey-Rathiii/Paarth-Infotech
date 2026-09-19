import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function RouteScrollManager({ lenisRef }) {
    const { pathname, hash } = useLocation();
    const previousPathRef = useRef(null);

    useEffect(() => {
        const previous = window.history.scrollRestoration;
        window.history.scrollRestoration = "manual";
        return () => { window.history.scrollRestoration = previous; };
    }, []);

    useEffect(() => {
        const pathChanged = previousPathRef.current !== pathname;
        previousPathRef.current = pathname;
        let frame;
        let refreshFrame;
        let finished = false;
        let targetId = hash.slice(1);
        try { targetId = decodeURIComponent(targetId); } catch { /* Keep a malformed fragment literal. */ }

        const scrollWhenReady = () => {
            window.cancelAnimationFrame(frame);
            frame = window.requestAnimationFrame(() => {
                const main = document.getElementById("main-content");
                // Wait for a lazy route to actually replace its loading screen.
                if (finished || !main || !main.getClientRects().length) return;
                const target = targetId ? document.getElementById(targetId) : null;
                if (targetId && !target) return;
                const lenis = lenisRef.current;
                finished = true;
                observer.disconnect();
                ScrollTrigger.refresh();
                // Refresh the scroll limit after a short page is replaced by a long one.
                lenis?.resize();
                if (target) {
                    if (lenis) lenis.scrollTo(target, { offset: -90, immediate: pathChanged, force: true });
                    else target.scrollIntoView();
                } else if (!hash || pathChanged) {
                    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
                    else window.scrollTo(0, 0);
                }
                refreshFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh());
            });
        };
        // Observe rendering instead of giving slow connections a one-second deadline.
        const observer = new MutationObserver(scrollWhenReady);
        observer.observe(document.getElementById("root"), { childList: true, subtree: true });
        scrollWhenReady();
        return () => {
            observer.disconnect();
            window.cancelAnimationFrame(frame);
            window.cancelAnimationFrame(refreshFrame);
        };
    }, [hash, lenisRef, pathname]);

    return null;
}
