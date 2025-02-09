import React from 'react';
import { useEffect } from 'react';
const $ = jQuery;
import { textillateConfig } from '../../../utils/config';

const Default = ({ attributes, id }) => {
    const { loop, animateIn, inEffect, inSequence, outEffect, outSequence, content } = attributes;

    const contentSl = `#${id} .content`;

    useEffect(() => {
        const intersectionObserver = new IntersectionObserver((entries) => {
            if (entries[0].intersectionRatio <= 0) return;

            $(contentSl).textillate(textillateConfig(attributes));

            intersectionObserver.unobserve(entries[0].target); // Remove if use multiple
        });
        intersectionObserver.observe(document.querySelector(contentSl));
    }, [loop, animateIn, inEffect, inSequence, outEffect, outSequence]);

    return <p className='content'>{content}</p>
};
export default Default;