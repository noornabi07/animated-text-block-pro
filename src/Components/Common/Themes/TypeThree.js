import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { getMultiShadowCSS } from '../../../../../bpl-tools/utils/getCSS';

const TypeThree = ({ attributes }) => {
    const { textAlignment, gsapAnimation, content } = attributes;
    const { animationSpeed = 1, repeatDelay = 1, repeatBehavior, randomColor, color, textShadow = [], isTextShadow = false } = gsapAnimation;



    const textRef = useRef(null);

    useEffect(() => {
        if (!content) return;

        const container = textRef.current;

        // Clear existing content
        container.innerHTML = "";

        // Regex for identifying sentence end
        const sentenceEndRegex = /[.!?]$/g;

        // Split content into words
        const words = content.split(" ");

        const timeline = gsap.timeline({
            repeat: repeatBehavior, // Repeats animation twice
            repeatDelay, // Delay between repetitions
        });

        let time = 0;

        // Define alignment styles dynamically
        const alignmentStyles = {
            center: {
                left: "50%",
                transform: "translate(-50%, -50%)",
            },
            left: {
                left: "10%",
                transform: "translate(0, -50%)",
            },
            right: {
                left: "90%",
                transform: "translate(-100%, -50%)",
            },
        };

        words.forEach((word) => {
            const isSentenceEnd = sentenceEndRegex.test(word);
            const duration = Math.max(0.5, word.length * 0.08 * animationSpeed) + (isSentenceEnd ? 0.6 : 0);

            const wordElement = document.createElement("span");

            wordElement.textContent = word;
            wordElement.style.position = "absolute";
            wordElement.style.top = "50%";
            wordElement.style.visibility = "hidden";
            wordElement.style.color = color; // Default color
            wordElement.style.textShadow = isTextShadow && getMultiShadowCSS(textShadow, 'text');

            // Apply alignment styles dynamically
            Object.assign(wordElement.style, alignmentStyles[textAlignment]);
            container.appendChild(wordElement);

            // Set initial animation properties
            gsap.set(wordElement, { autoAlpha: 0, scale: 0 });

            // Add to timeline
            timeline
                .to(
                    wordElement,
                    {
                        duration,
                        scale: 1.2,
                        autoAlpha: 1,
                        ease: "slow(0.25, 0.9, true)", // SlowMo ease with yoyo effect
                        color: randomColor ? getRandomColor() : color // Random color
                    },
                    time
                )
                .to(
                    wordElement,
                    {
                        duration,
                        autoAlpha: 0,
                        scale: 0,
                        ease: "slow(0.25, 0.9, true)",
                    },
                    time + duration - 0.05
                );

            time += duration - 0.05;

            if (isSentenceEnd) {
                time += 0.6; // Add the custom pause after each sentence
            }
        });

        return () => {
            timeline.kill(); // Cleanup on unmount
        };
    }, [content, textAlignment, animationSpeed, repeatBehavior, repeatDelay, randomColor, textShadow, isTextShadow]);

    // Function to generate random colors
    const getRandomColor = () => {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    return (
        <div className="content" ref={textRef}></div>
    );
};

export default TypeThree;