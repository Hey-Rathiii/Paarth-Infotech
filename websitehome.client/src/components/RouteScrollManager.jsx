import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function RouteScrollManager({ lenisRef }) {
    const { pathname, hash } = useLocation();
    const previousPathRef = useRef(null);

    useEffect(() => {
        const previousRestoration = window.history.scrollRestoration;
        window.history.scrollRestoration = "manual";

        return () => {
            window.history.scrollRestoration = previousRestoration;
        };
    }, []);

    useEffect(() => {
        const pathChanged = previousPathRef.current !== pathname;
        previousPathRef.current = pathname;
        let firstFrame;
        let secondFrame;
        let refreshFrame;
        let retryTimer;

        firstFrame = window.requestAnimationFrame(() => {
            secondFrame = window.requestAnimationFrame(() => {
                const scrollToRouteTarget = (attempt = 0) => {
                    const lenis = lenisRef.current;
                    let targetId = "";

                    if (hash) {
                        try {
                            targetId = decodeURIComponent(hash.slice(1));
                        } catch {
                            targetId = hash.slice(1);
                        }
                    }

                    const target = targetId
                        ? document.getElementById(targetId)
                        : null;

                    if (hash && !target && attempt < 20) {
                        retryTimer = window.setTimeout(
                            () => scrollToRouteTarget(attempt + 1),
                            50
                        );
                        return;
                    }

                    ScrollTrigger.refresh();

                    if (target) {
                        if (lenis) {
                            lenis.scrollTo(target, {
                                offset: -90,
                                immediate: pathChanged,
                                force: true
                            });
                        } else {
                            target.scrollIntoView();
                        }
                    } else if (!hash || pathChanged) {
                        if (lenis) {
                            lenis.scrollTo(0, {
                                immediate: true,
                                force: true
                            });
                        } else {
                            window.scrollTo(0, 0);
                        }
                    }

                    refreshFrame = window.requestAnimationFrame(() => {
                        ScrollTrigger.refresh();
                    });
                };

                scrollToRouteTarget();
            });
        });

        return () => {
            window.cancelAnimationFrame(firstFrame);
            window.cancelAnimationFrame(secondFrame);
            window.cancelAnimationFrame(refreshFrame);
            window.clearTimeout(retryTimer);
        };
    }, [hash, lenisRef, pathname]);

    return null;
}

export default RouteScrollManager;
