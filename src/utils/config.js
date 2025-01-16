import { produce } from 'immer';

export const textillateConfig = (attributes) => {
	const { loop, animateIn, inEffect, inSequence, outEffect, outSequence } = attributes;

	return {
		loop,
		minDisplayTime: 2000, // each text before it is replaced
		initialDelay: 0,
		autoStart: true,
		inEffects: [], // Custom set of 'in' effects
		outEffects: ['hinge'], // Custom set of 'out' effects

		in: {
			effect: inEffect,
			delayScale: 1.5,
			delay: 50,
			sync: 'sync' === inSequence, // sequence of char/word
			shuffle: 'shuffle' === inSequence, // (doesn't make sense with sync = true)
			reverse: 'reverse' === inSequence // (doesn't make sense with sync = true)
		},

		out: {
			effect: outEffect,
			delayScale: 1.5,
			delay: 50,
			sync: 'sync' === outSequence,
			shuffle: 'shuffle' === outSequence,
			reverse: 'reverse' === outSequence
		},

		type: animateIn // Animate in type (available types: 'char' and 'word')
	}
};


export const themeSwitch = (theme = "default", attributes) => produce(attributes, (draft) => {
	draft['options']['theme'] = theme;

	switch (theme) {
		case 'default':
			draft['background']['color'] = '#0000';
			draft['color'] = '#333';
			draft['typography']['fontSize'] = { 'desktop': 22, 'tablet': 20, 'mobile': 18 }
			draft['typography']['textTransform'] = 'none';
			draft['typography']['fontWeight'] = 400;
			break;
		case 'type1':
			draft['background']['color'] = '#000';
			draft['color'] = '#fff';
			draft['typography']['fontSize'] = { 'desktop': 120, 'tablet': 100, 'mobile': 80 };
			draft['typography']['textTransform'] = 'uppercase';
			draft['typography']['fontWeight'] = 500;
			break;
	}
})