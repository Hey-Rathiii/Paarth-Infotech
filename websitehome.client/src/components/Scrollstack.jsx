import { useLayoutEffect, useRef, useCallback } from 'react';
import './Scrollstack.css';

export const ScrollStackItem = ({
    children,
    itemClassName = ''
}) => (
    <div
        className={`scroll-stack-card ${itemClassName}`.trim()}
    >
        {children}
    </div>
);

const ScrollStack = ({
    children,
    className = '',
    itemDistance = 100,
    itemScale = 0.03,
    itemStackDistance = 30,
    stackPosition = '20%',
    scaleEndPosition = '10%',
    baseScale = 0.85,
    rotationAmount = 0,
    blurAmount = 0,
    useWindowScroll = true,
    onStackComplete
}) => {
    const scrollerRef = useRef(null);
    const stackCompletedRef = useRef(false);
    const cardsRef = useRef([]);
    const lastTransformsRef = useRef(new Map());
    const isUpdatingRef = useRef(false);

    const calculateProgress = useCallback(
        (scrollTop, start, end) => {
            if (scrollTop < start) return 0;
            if (scrollTop > end) return 1;

            return (scrollTop - start) / (end - start);
        },
        []
    );

    const parsePercentage = useCallback(
        (value, containerHeight) => {
            if (
                typeof value === 'string' &&
                value.includes('%')
            ) {
                return (
                    (parseFloat(value) / 100) *
                    containerHeight
                );
            }

            return parseFloat(value);
        },
        []
    );

    const getScrollData = useCallback(() => {
        if (useWindowScroll) {
            return {
                scrollTop: window.scrollY,
                containerHeight: window.innerHeight
            };
        }

        const scroller = scrollerRef.current;

        return {
            scrollTop: scroller.scrollTop,
            containerHeight: scroller.clientHeight
        };
    }, [useWindowScroll]);

    const getElementOffset = useCallback(
        element => {
            if (useWindowScroll) {
                const rect =
                    element.getBoundingClientRect();

                return rect.top + window.scrollY;
            }

            return element.offsetTop;
        },
        [useWindowScroll]
    );

    const updateCardTransforms = useCallback(() => {
        if (
            !cardsRef.current.length ||
            isUpdatingRef.current
        )
            return;

        isUpdatingRef.current = true;

        const { scrollTop, containerHeight } =
            getScrollData();

        const stackPositionPx = parsePercentage(
            stackPosition,
            containerHeight
        );

        const scaleEndPositionPx = parsePercentage(
            scaleEndPosition,
            containerHeight
        );

        const endElement = document.querySelector(
            '.scroll-stack-end'
        );

        const endElementTop = endElement
            ? getElementOffset(endElement)
            : 0;

        cardsRef.current.forEach((card, i) => {
            if (!card) return;

            const cardTop =
                getElementOffset(card);

            const triggerStart =
                cardTop -
                stackPositionPx -
                itemStackDistance * i;

            const triggerEnd =
                cardTop -
                scaleEndPositionPx;

            const pinStart =
                cardTop -
                stackPositionPx -
                itemStackDistance * i;

            const pinEnd =
                endElementTop -
                containerHeight / 2;

            const scaleProgress =
                calculateProgress(
                    scrollTop,
                    triggerStart,
                    triggerEnd
                );

            const targetScale =
                baseScale + i * itemScale;

            const scale =
                1 -
                scaleProgress *
                (1 - targetScale);

            const rotation =
                rotationAmount
                    ? i *
                    rotationAmount *
                    scaleProgress
                    : 0;

            let blur = 0;

            if (blurAmount) {
                let topCardIndex = 0;

                for (
                    let j = 0;
                    j < cardsRef.current.length;
                    j++
                ) {
                    const jCardTop =
                        getElementOffset(
                            cardsRef.current[j]
                        );

                    const jTriggerStart =
                        jCardTop -
                        stackPositionPx -
                        itemStackDistance * j;

                    if (
                        scrollTop >=
                        jTriggerStart
                    ) {
                        topCardIndex = j;
                    }
                }

                if (i < topCardIndex) {
                    const depthInStack =
                        topCardIndex - i;

                    blur =
                        depthInStack *
                        blurAmount;
                }
            }

            let translateY = 0;

            const isPinned =
                scrollTop >= pinStart &&
                scrollTop <= pinEnd;

            if (isPinned) {
                translateY =
                    scrollTop -
                    cardTop +
                    stackPositionPx +
                    itemStackDistance * i;
            } else if (scrollTop > pinEnd) {
                translateY =
                    pinEnd -
                    cardTop +
                    stackPositionPx +
                    itemStackDistance * i;
            }

            const transform = `
                translate3d(
                    0,
                    ${translateY}px,
                    0
                )
                scale(${scale})
                rotate(${rotation}deg)
            `;

            card.style.transform =
                transform;

            card.style.filter =
                blur > 0
                    ? `blur(${blur}px)`
                    : '';

            lastTransformsRef.current.set(
                i,
                {
                    translateY,
                    scale,
                    rotation,
                    blur
                }
            );

            if (
                i ===
                cardsRef.current.length - 1
            ) {
                const isInView =
                    scrollTop >= pinStart &&
                    scrollTop <= pinEnd;

                if (
                    isInView &&
                    !stackCompletedRef.current
                ) {
                    stackCompletedRef.current =
                        true;

                    onStackComplete?.();
                } else if (
                    !isInView &&
                    stackCompletedRef.current
                ) {
                    stackCompletedRef.current =
                        false;
                }
            }
        });

        isUpdatingRef.current = false;
    }, [
        itemScale,
        itemStackDistance,
        stackPosition,
        scaleEndPosition,
        baseScale,
        rotationAmount,
        blurAmount,
        onStackComplete,
        calculateProgress,
        parsePercentage,
        getScrollData,
        getElementOffset
    ]);

    const handleScroll = useCallback(() => {
        requestAnimationFrame(() => {
            updateCardTransforms();
        });
    }, [updateCardTransforms]);

    useLayoutEffect(() => {
        const lastTransforms = lastTransformsRef.current;
        const cards = Array.from(
            scrollerRef.current.querySelectorAll(
                ".scroll-stack-card"
            )
        );

        cardsRef.current = cards;

        cards.forEach((card, i) => {
            if (i < cards.length - 1) {
                card.style.marginBottom =
                    `${itemDistance}px`;
            }

            card.style.willChange =
                'transform, filter';

            card.style.transformOrigin =
                'top center';

            card.style.backfaceVisibility =
                'hidden';
        });

        updateCardTransforms();

        window.addEventListener(
            'scroll',
            handleScroll,
            { passive: true }
        );

        window.addEventListener(
            'resize',
            updateCardTransforms
        );

        return () => {
            window.removeEventListener(
                'scroll',
                handleScroll
            );

            window.removeEventListener(
                'resize',
                updateCardTransforms
            );

            cardsRef.current = [];
            lastTransforms.clear();

            stackCompletedRef.current =
                false;

            isUpdatingRef.current = false;
        };
    }, [
        itemDistance,
        handleScroll,
        updateCardTransforms
    ]);

    return (
        <div
            className={`scroll-stack-scroller ${className}`.trim()}
            ref={scrollerRef}
        >
            <div className="scroll-stack-inner">
                {children}

                <div className="scroll-stack-end" />
            </div>
        </div>
    );
};

export default ScrollStack;
