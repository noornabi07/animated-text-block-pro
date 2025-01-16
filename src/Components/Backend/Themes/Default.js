import React from 'react';
import { useEffect } from 'react';
const $ = jQuery;
import { textillateConfig } from '../../../utils/config';

const Default = ({ attributes, id }) => {
    const { loop, animateIn, inEffect, inSequence, outEffect, outSequence, content } = attributes;

    useEffect(() => {
        $(`#${id} .content`).textillate(textillateConfig(attributes));
    }, [loop, animateIn, inEffect, inSequence, outEffect, outSequence, content]);

    return <p className='content'>{content}</p>
};

export default Default;