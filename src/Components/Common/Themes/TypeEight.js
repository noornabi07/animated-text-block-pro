import React, { useState, useEffect } from 'react';

const TypeEight = ({ attributes }) => {
    const { content, textAlignment, gsapAnimation } = attributes;
    const { typingSpeed = 100, autoRepeat = true, reStartTime = 1000 } = gsapAnimation; // Extract autoRepeat with default value

    const [displayText, setDisplayText] = useState('');
    const [iteration, setIteration] = useState(0);
    const fullText = content;

    useEffect(() => {
        let index = 0;
        let typingInterval;

        const startTyping = () => {
            setDisplayText('');
            typingInterval = setInterval(() => {
                if (index < fullText.length) {
                    setDisplayText(() => fullText.slice(0, index + 1));
                    index += 1;
                } else {
                    clearInterval(typingInterval);
                    setTimeout(() => {
                        if (autoRepeat || iteration < 1) {
                            setIteration((prev) => prev + 1);
                        }
                    }, reStartTime);
                }
            }, typingSpeed);
        };

        startTyping();

        return () => clearInterval(typingInterval);
    }, [content, textAlignment, typingSpeed, iteration, autoRepeat, reStartTime]);

    return (
        <div className='content'>
            <div className='stage'>
                <p>{displayText}</p>
                <h2 className="cursor"></h2>
            </div>
        </div>
    );
};

export default TypeEight;


