import { useEffect } from 'react';
const $ = jQuery;

import { textillateConfig } from '../../utils/config';
import { prefix } from '../../utils/data';

const AnimatedText = ({ attributes, id }) => {
	const { loop, animateIn, inEffect, inSequence, outEffect, outSequence, content } = attributes;

	useEffect(() => {
		$(`#${id} .content`).textillate(textillateConfig(attributes));
	}, [loop, animateIn, inEffect, inSequence, outEffect, outSequence]);

	return <div className={prefix}>
		<p className='content'>{content}</p>
	</div>
}
export default AnimatedText