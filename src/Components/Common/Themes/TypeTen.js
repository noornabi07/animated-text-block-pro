import React from 'react';

const TypeTen = ({ attributes }) => {
    const { content, gsapAnimation } = attributes;
    const { animateType } = gsapAnimation;

    return (
        <>
            {/* wave animation */}
            {
                "wave" === animateType && <div className='content'>
                    {`${content}`.split('').map((letter, i) => (
                        <span
                            key={i}
                            className="animate-wave"
                            style={{ animationDelay: `${i * 0.1}s` }}
                        >
                            {letter}
                        </span>
                    ))}
                </div>
            }



            {/* Bounce Animation */}
            {
                "bounce" === animateType && <div className="content animate-bounce-text">
                    {content}
                </div>
            }

            {/* Glitch Effect  */}
            {
                "glitch" === animateType && <div className="content animate-glitch">
                    {content}
                    <span className="animate-glitch-1">{content}</span>
                    <span className="animate-glitch-2">{content}</span>
                </div>
            }

        </>
    );
};

export default TypeTen;