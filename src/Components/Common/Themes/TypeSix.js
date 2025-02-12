import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const TypeSix = ({ attributes }) => {
    const { gsapAnimation, content, textAlignment, repeat = true } = attributes;
    const { easeType = "elastic(0.3, 0.2)" } = gsapAnimation;

    const stageRef = useRef(null);
    const textRef = useRef(null);
    const [chars, setChars] = useState([]);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [mouseInitialY, setMouseInitialY] = useState(0);
    const [charIndexSelected, setCharIndexSelected] = useState(0);
    const [dragYScale, setDragYScale] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const text = content; // Customize your text here
        setChars(text.split("")); // Split text into individual characters
    }, [easeType, content, textAlignment]);

    useEffect(() => {
        if (chars.length > 0 && !isAnimating) {
            initAnimation();
        }
    }, [chars]);

    useEffect(() => {
        if (repeat) {
            const interval = setInterval(() => {
                if (!isAnimating) {
                    initAnimation()
                }
            }, 2000 + chars.length * 1000);

            return () => {
                clearInterval(interval);
            }
        }
    }, [repeat, chars, content])

    const initAnimation = () => {
        setIsAnimating(true);
        setTimeout(() => {
            setIsAnimating(false)
        }, 2000 + 500);

        gsap.set(stageRef.current, { autoAlpha: 1 });
        gsap.set(".char", { fontSize: "inherit" });
        animateTextIn();
    };

    const animateTextIn = () => {
        gsap.from(".char", {
            duration: 2, // Slower animation
            y: -500,
            fontWeight: 700,
            fontStretch: 80,
            scaleY: 2,
            ease: easeType,
            delay: 0.5,
            stagger: { each: 0.1, from: "random" },
        });
    };

    useEffect(() => {
        const handleMouseUpEvent = () => {
            handleMouseUp();
        };

        window.addEventListener("mouseup", handleMouseUpEvent);
        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mouseup", handleMouseUpEvent);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [isMouseDown]);

    const handleMouseDown = (e, index) => {
        setMouseInitialY(e.clientY);
        setCharIndexSelected(index);
        setIsMouseDown(true);
    };

    const handleMouseUp = () => {
        setIsMouseDown(false);
        snapBackText();
    };

    const handleMouseMove = (e) => {
        if (isMouseDown) {
            let distY = mouseInitialY - e.clientY;
            setDragYScale(distY / 100);
            setFontDragDimensions();
        }
    };

    const setFontDragDimensions = () => {
        gsap.to(".char", {
            y: (index) => (index === charIndexSelected ? dragYScale * -50 : 0),
            fontWeight: 600 - dragYScale * 200,
            fontStretch: 150 - dragYScale * 70,
            scaleY: 1 + dragYScale,
            ease: "power4",
            duration: 0.6,
        });
    };

    const snapBackText = () => {
        gsap.to(".char", {
            duration: 1,
            y: 0,
            fontWeight: 600,
            fontStretch: 150,
            scale: 1,
            ease: easeType,
            stagger: { each: 0.03, from: charIndexSelected },

        });
    };

    return (
        <div ref={stageRef} className='content'>
            <p ref={textRef} className="txt">
                {chars.map((char, index) => (
                    <span
                        key={index}
                        className="char"
                        style={{ fontSize: "8rem" }}
                        onMouseDown={(e) => handleMouseDown(e, index)}
                    >
                        {char}
                    </span>
                ))}
            </p>
        </div>
    );
};

export default TypeSix;