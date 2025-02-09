import React, { useEffect } from "react";
import { gsap } from "gsap";

const TypeFour = ({ attributes }) => {
    const { gsapAnimation, content } = attributes;
    const { fontStretch = "200%", animationDuration = 1, waveEffect = 25 } = gsapAnimation;

    useEffect(() => {
        // Manually split text into characters
        document.querySelectorAll(".txt").forEach((textElement) => {
            const text = textElement.innerText;
            textElement.innerHTML = text
                .split("")
                .map((char) => `<span class="char">${char}</span>`)
                .join("");
        });

        // GSAP Timeline for wave-like effect
        let gtl = gsap.timeline({ yoyo: true, repeat: -1, delay: 0 });

        function animateText() {
            let tl = gsap.timeline()
                .to(".char", {
                    fontStretch,
                    ease: "sine.inOut",
                    duration: animationDuration,
                    stagger: {
                        each: 0.2, // Speed up the stagger to get more fluidity
                        yoyo: true, // Makes the animation reverse back after each cycle
                        repeat: -1, // Repeats the animation infinitely
                    },
                    opacity: 1, // Make the characters visible as they animate
                    x: (i) => Math.sin(i * 0.5) * waveEffect, // Moves characters left-right with sin function for wave effect
                })
                .to(".char", {
                    fontStretch: "100%", // Shrinks the fontStretch back
                    duration: 0.3, // Faster shrinking transition
                });

            return tl;
        }

        gsap.to(".content", {
            autoAlpha: 1, // Fade in the entire container
            duration: 4,
            ease: "none",
        });

        gtl.add(animateText()).seek(6).play();
    }, [fontStretch, animationDuration, waveEffect, content]);

    return (
        <div className="content">
            <div className="wrapper">
                <h1 className="txt">{content}</h1>
            </div>
        </div>
    );
};

export default TypeFour;