import { useEffect, useRef } from "react";
import "./PointerAura.css";

const CONTROL_SELECTOR =
    "a, button, input, select, textarea, label, [role='button']";
const AMBIENT_SELECTOR = [
    ".about-card",
    ".service-card",
    ".program-card",
    ".programs-page__program-card",
    ".programs-page__project-card",
    ".testimonial-card",
    ".faq-item",
    ".contact-form-card",
    ".services-page-audience-card",
    ".services-page-capability",
    ".services-page-engagement-card",
    ".services-page-faq-list details",
    ".marquee-track span"
].join(", ");
const HIDE_SELECTOR = ".contact-map-card, iframe";

function PointerAura() {
    const auraRef = useRef(null);

    useEffect(() => {
        const aura = auraRef.current;
        const canHover = window.matchMedia(
            "(hover: hover) and (pointer: fine)"
        );
        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );

        if (!aura || !canHover.matches || reducedMotion.matches) {
            return undefined;
        }

        let frameId = 0;
        let hasPosition = false;
        let currentX = 0;
        let currentY = 0;
        let targetX = 0;
        let targetY = 0;

        const render = () => {
            currentX += (targetX - currentX) * 0.2;
            currentY += (targetY - currentY) * 0.2;
            aura.style.transform =
                `translate3d(${currentX}px, ${currentY}px, 0)`;

            if (
                Math.abs(targetX - currentX) > 0.1 ||
                Math.abs(targetY - currentY) > 0.1
            ) {
                frameId = window.requestAnimationFrame(render);
            } else {
                frameId = 0;
            }
        };

        const scheduleRender = () => {
            if (!frameId) {
                frameId = window.requestAnimationFrame(render);
            }
        };

        const handlePointerMove = (event) => {
            targetX = event.clientX;
            targetY = event.clientY;

            if (!hasPosition) {
                currentX = targetX;
                currentY = targetY;
                hasPosition = true;
            }

            const target = event.target instanceof Element
                ? event.target
                : null;
            const shouldHide = Boolean(target?.closest(HIDE_SELECTOR));

            aura.classList.toggle("is-hidden", shouldHide);
            aura.classList.toggle(
                "is-control",
                !shouldHide && Boolean(target?.closest(CONTROL_SELECTOR))
            );
            aura.classList.toggle(
                "is-ambient",
                !shouldHide &&
                    !target?.closest(CONTROL_SELECTOR) &&
                    Boolean(target?.closest(AMBIENT_SELECTOR))
            );
            aura.classList.add("is-visible");
            scheduleRender();
        };

        const hideAura = () => {
            aura.classList.remove(
                "is-visible",
                "is-control",
                "is-ambient",
                "is-pressed"
            );
        };

        const handlePointerDown = () => aura.classList.add("is-pressed");
        const handlePointerUp = () => aura.classList.remove("is-pressed");
        const handlePointerOut = (event) => {
            if (!event.relatedTarget) hideAura();
        };

        document.addEventListener("pointermove", handlePointerMove, {
            passive: true
        });
        document.addEventListener("pointerdown", handlePointerDown, {
            passive: true
        });
        document.addEventListener("pointerup", handlePointerUp, {
            passive: true
        });
        document.addEventListener("pointerout", handlePointerOut, {
            passive: true
        });
        window.addEventListener("blur", hideAura);

        return () => {
            document.removeEventListener("pointermove", handlePointerMove);
            document.removeEventListener("pointerdown", handlePointerDown);
            document.removeEventListener("pointerup", handlePointerUp);
            document.removeEventListener("pointerout", handlePointerOut);
            window.removeEventListener("blur", hideAura);
            window.cancelAnimationFrame(frameId);
        };
    }, []);

    return (
        <div className="pointer-aura" ref={auraRef} aria-hidden="true">
            <span className="pointer-aura-ring" />
            <span className="pointer-aura-dot" />
        </div>
    );
}

export default PointerAura;
