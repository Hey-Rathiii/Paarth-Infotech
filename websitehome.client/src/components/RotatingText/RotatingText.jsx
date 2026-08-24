import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import "./RotatingText.css";

function RotatingText({
    texts = [],
    interval = 2500,
    className = ""
}) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (texts.length <= 1) return;

        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % texts.length);
        }, interval);

        return () => clearInterval(timer);
    }, [texts, interval]);

    return (
        <div className={`rt-wrapper ${className}`}>

            <AnimatePresence mode="wait">

                <motion.div
                    key={index}
                    className="rt-word"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -50, opacity: 0 }}
                    transition={{
                        duration: .55,
                        ease: [0.22, 1, 0.36, 1]
                    }}
                >
                    {texts[index]}
                </motion.div>

            </AnimatePresence>

        </div>
    );
}

export default RotatingText;