import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
// import './TypeOne.scss';

const TypeOne = ({ attributes }) => {
    const textRef = useRef(null);
    const { content, gsapAnimation } = attributes;
    const { animationSpeed, perspectiveDepth, enableOscillation, repeatBehavior } = gsapAnimation;

    useEffect(() => {
        const textElement = textRef.current;

        // Split text into spans
        const chars = textElement.textContent.split("").map((char) => {
            const span = document.createElement("span");
            span.textContent = char === " " ? "\u00A0" : char; // Preserve spaces
            span.style.display = "inline-block"; // Ensure proper alignment
            span.style.letterSpacing = "-8px"; // Adjust letter spacing as needed
            return span;
        });

        // Clear original text and append spans
        textElement.innerHTML = "";
        textElement.append(...chars);

        // GSAP Animation
        const timeline = gsap.timeline();
        timeline
            .set(chars, {
                x: 0,
                left: "30%",
                transformPerspective: perspectiveDepth || 800,
                transformOrigin: "50% 50% -400px",
                position: "absolute",
            })
            .fromTo(
                chars,
                {
                    rotationY: (i) => (i / chars.length) * 360, // Start positions
                },
                {
                    rotationY: "-=360", // Rotate circularly
                    duration: animationSpeed || 16, // Use animationSpeed from settings or default
                    ease: "none",
                    repeat: -1,
                }
            );

        if (enableOscillation) {
            timeline
                .fromTo(
                    chars,
                    { rotationX: -9 },
                    {
                        rotationX: 12, // Oscillation along X-axis
                        duration: 6,
                        ease: "power3.inOut",
                        yoyo: true,
                        repeat: repeatBehavior || -1,
                    },
                    0
                )
                .fromTo(
                    textElement,
                    { rotation: 20 }, // Oscillate the entire text
                    { rotation: -10, duration: 10, ease: "power2.inOut", yoyo: true, repeat: -1 },
                    0
                );
        }

        return () => {
            timeline.kill(); // Clean up on unmount
        };
    }, [content, animationSpeed, perspectiveDepth, enableOscillation, repeatBehavior]);

    return (
        <div ref={textRef} className="content">
            {content}
        </div>
    );
};

export default TypeOne;

