import { registerBlockType, createBlock } from '@wordpress/blocks';

import './editor.scss';
import metadata from './block.json';
import Edit from './Components/Backend/Edit';
import { animationIcon } from './utils/icons';

registerBlockType(metadata, {
	icon: animationIcon,

	transforms: {
		from: [
			{
				type: 'block', blocks: ['core/paragraph'], transform: ({ content, align }) => {
					return createBlock('atb/animated-text', { content, textAlign: align });
				}
			},
			{
				type: 'block', blocks: ['core/heading'], transform: ({ content, textAlign }) => {
					return createBlock('atb/animated-text', { content, textAlign });
				}
			},
			{ type: 'prefix', prefix: 'animated-text', transform: () => createBlock('atb/animated-text') }
		],

		to: [
			{
				type: 'block', blocks: ['core/paragraph'], isMatch: ({ content }) => {
					if (content) return true;
					return false;
				}, transform: ({ content, textAlign }) => {
					return createBlock('core/paragraph', { content, align: textAlign });
				}
			},
			{
				type: 'block', blocks: ['core/heading'], isMatch: ({ content }) => {
					if (content) return true;
					return false;
				}, transform: ({ content, textAlign }) => {
					return createBlock('core/heading', { content, textAlign });
				}
			}
		]
	},

	// Build in Functions
	edit: Edit,

	save: () => null
});