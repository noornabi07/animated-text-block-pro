import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const TypeFive = ({ attributes }) => {
    const { gsapAnimation, content } = attributes;
    const { animationDuration = 1, repeatBehavior = -1, scaleX = 1.5, scaleY = 0.2 } = gsapAnimation;
    const textRef = useRef(null);
    const gtlRef = useRef(null);

    useEffect(() => {
        const textElement = textRef.current;

        if (!textElement) return;

        // **Purono `.char` remove kore notun text set**
        const text = textElement.innerText;
        textElement.innerHTML = ""; // **Purono content remove**

        text.split("").forEach((char) => {
            const span = document.createElement("span");
            span.className = "char";
            span.innerHTML = char === " " ? "&nbsp;" : char; // Handle spaces properly
            textElement.appendChild(span);
        });

        gsap.set(".char", { opacity: 1 });

        gsap.to(".content", {
            autoAlpha: 1,
            duration: animationDuration,
            ease: "none",
        });

        // **Purono animation clear**
        if (gtlRef.current) {
            gtlRef.current.kill();
        }

        let gtl = gsap.timeline({ yoyo: true, repeat: repeatBehavior, delay: 0 });

        function animateText() {
            return gsap.timeline().to(".char", {
                scaleX,
                scaleY,
                fontStretch: "10%",
                ease: "sine.inOut",
                duration: animationDuration,
                stagger: {
                    each: 0.2,
                    yoyo: true,
                    repeat: repeatBehavior,
                },
            });
        }

        gtl.add(animateText()).seek(0).play();
        gtlRef.current = gtl;
    }, [animationDuration, repeatBehavior, content, scaleX, scaleY]);

    return (
        <div className="content">
            <div className="wrapper">
                <h1 className="txt" ref={textRef}>{content}</h1>
            </div>
        </div>
    );
};

export default TypeFive;
