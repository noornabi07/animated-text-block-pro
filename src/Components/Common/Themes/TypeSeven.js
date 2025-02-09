import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const TypeSeven = ({ attributes }) => {
    const { gsapAnimation, content } = attributes;
    const { animationDuration, autoRepeat } = gsapAnimation;

    const repeatAnimate = autoRepeat ? -1 : 1;


    const textRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const textElement = textRef.current;
        const content = contentRef.current;

        if (textElement) {
            // Custom SplitText Function
            const splitTextIntoChars = (element) => {
                const text = element.innerText;
                element.innerHTML = "";
                text.split("").forEach((char) => {
                    const span = document.createElement("span");
                    span.className = "char";
                    span.textContent = char;
                    element.appendChild(span);
                });
            };

            // Apply custom SplitText
            splitTextIntoChars(textElement);

            let gtl = gsap.timeline({ yoyo: true, repeat: repeatAnimate, delay: 0 });

            const animateText = () => {
                return gsap.timeline().to(".char", {
                    fontStretch: "10%",
                    ease: "sine.inOut",
                    duration: animationDuration,
                    stagger: {
                        each: 0.4,
                        yoyo: true,
                        repeat: repeatAnimate,
                    },
                });
            }

            gsap.to(content, {
                autoAlpha: 1,
                duration: 4,
                ease: "none",
            });

            gtl.add(animateText()).seek(6).play();
        }
    }, [animationDuration, repeatAnimate, content]);

    return (
        <div className="content" ref={contentRef}>
            <p ref={textRef} className="txt">{content}</p>
        </div>
    );
};

export default TypeSeven;
