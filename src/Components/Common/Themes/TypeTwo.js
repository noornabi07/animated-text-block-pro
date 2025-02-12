import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const TypeTwo = ({ attributes }) => {
    const { gsapAnimation, content } = attributes;
    const { animationSpeed = 2, repeatDelay = 2, animationEffect = "default", autoRepeat = true } = gsapAnimation;
    const textRef = useRef(null);

    useEffect(() => {
        if (!content) return;

        const textElement = textRef.current;

        // Split content into words and characters
        const words = content.split(" ").map((word) => {
            const wordSpan = document.createElement("span");
            wordSpan.style.display = "inline-block";
            wordSpan.style.marginRight = "8px"; // Add spacing between words

            const chars = word.split("").map((char) => {
                const charSpan = document.createElement("span");
                charSpan.textContent = char;
                charSpan.style.display = "inline-block";
                return charSpan;
            });

            wordSpan.append(...chars);
            return wordSpan;
        });


        // Clear existing content and append new spans
        textElement.innerHTML = "";
        textElement.append(...words);

        const chars = Array.from(textElement.querySelectorAll("span span")); // All character spans

        // Initialize GSAP timeline
        const timeline = gsap.timeline({
            repeat: autoRepeat ? -1 : 0, // Infinite repeat
            repeatDelay, // Delay between repetitions (in seconds)
        });


        // Apply selected animation effect
        switch (animationEffect) {
            case "default":
                timeline.from(chars, {
                    duration: animationSpeed || 2,
                    opacity: 0,
                    scale: 0,
                    y: 80,
                    rotationX: 180,
                    transformOrigin: "0% 50% -50",
                    ease: "back",
                    stagger: 0.01,
                });
                break;
            case "fade":
                timeline.from(chars, {
                    duration: animationSpeed,
                    opacity: 0,
                    stagger: 0.05,
                    ease: "power1.inOut",
                });
                break;

            case "zoom":
                timeline.from(chars, {
                    duration: animationSpeed,
                    scale: 0,
                    opacity: 0,
                    stagger: 0.05,
                    ease: "back.out(1.7)",
                });
                break;

            case "rotate":
                timeline.from(chars, {
                    duration: animationSpeed,
                    rotationX: 180,
                    opacity: 0,
                    stagger: 0.05,
                    transformOrigin: "50% 50% -50",
                    ease: "power2.out",
                });
                break;

            case "slide":
                timeline.from(chars, {
                    duration: animationSpeed,
                    y: 50,
                    opacity: 0,
                    stagger: 0.05,
                    ease: "power3.out",
                });
                break;
            default:
                timeline.from(chars, {
                    duration: animationSpeed,
                    opacity: 0,
                    stagger: 0.05,
                    ease: "power1.inOut",
                });
                break;
        }

        return () => {
            timeline.kill(); // Cleanup on unmount
        };
    }, [content, animationSpeed, repeatDelay, animationEffect, autoRepeat]);

    return (
        <div className="content">
            <div id="quote" ref={textRef}>
                {content}
            </div>
        </div>
    );
};

export default TypeTwo;


