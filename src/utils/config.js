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
			draft['content'] = "Animated text for animation";
			draft['background']['color'] = '#0000';
			draft['padding'] = { "vertical": "15px", "horizontal": "15px" };
			draft['color'] = '#333';
			draft['typography']['lineHeight'] = "135%";
			draft['typography']['fontSize'] = { 'desktop': 22, 'tablet': 20, 'mobile': 18 }
			draft['typography']['textTransform'] = 'none';
			draft['typography']['fontWeight'] = 400;
			draft['animatedSize']['width'] = { 'desktop': '100%', 'tablet': '', 'mobile': '' };
			draft['animatedSize']['height'] = { 'desktop': '', 'tablet': '', 'mobile': '' };
			draft['gsapAnimation']['animationSpeed'] = 0;
			draft['gsapAnimation']['repeatDelay'] = 0;
			draft['gsapAnimation']['repeatBehavior'] = -1;
			draft['gsapAnimation']['isTextShadow'] = false;
			draft['gsapAnimation']['textShadow'] = [{ "blur": "5px", "color": "#A4A4A4", "hOffset": "2px", "isInset": false, "spreed": "0px", "vOffset": "-1px" }];
			break;
		case 'type1':
			draft['content'] = "Animated text for animation";
			draft['background']['color'] = '#000';
			draft['padding'] = { "vertical": "15px", "horizontal": "15px" };
			draft['color'] = '#fff';
			draft['typography']['lineHeight'] = "135%";
			draft['typography']['fontSize'] = { 'desktop': 120, 'tablet': 100, 'mobile': 80 };
			draft['typography']['textTransform'] = 'uppercase';
			draft['typography']['fontWeight'] = 500;
			draft['gsapAnimation']['repeatBehavior'] = -1;
			draft['animatedSize']['width'] = { 'desktop': '100%', 'tablet': '', 'mobile': '' };
			draft['animatedSize']['height'] = { 'desktop': '500px', 'tablet': '', 'mobile': '' };
			draft['gsapAnimation']['animationSpeed'] = 30;
			draft['gsapAnimation']['repeatDelay'] = 0;
			draft['gsapAnimation']['isTextShadow'] = false;
			draft['gsapAnimation']['textShadow'] = [{ "blur": "19px", "color": "rgba(39, 195, 130, 1)", "hOffset": "4px", "isInset": false, "spreed": "0px", "vOffset": "1px" }];
			break;

		case 'type2':
			draft['content'] = "Animated text for animation";
			draft['background']['color'] = '#000';
			draft['padding'] = { "vertical": "15px", "horizontal": "15px" };
			draft['color'] = '#fff';
			draft['typography']['lineHeight'] = "135%";
			draft['typography']['fontSize'] = { 'desktop': 20, 'tablet': 18, 'mobile': 14 };
			draft['typography']['textTransform'] = 'none';
			draft['typography']['fontWeight'] = 400;
			draft['animatedSize']['width'] = { 'desktop': '100%', 'tablet': '', 'mobile': '' };
			draft['gsapAnimation']['animationSpeed'] = 2;
			draft['gsapAnimation']['repeatBehavior'] = -1;
			draft['gsapAnimation']['repeatDelay'] = 2;
			draft['gsapAnimation']['isTextShadow'] = false;
			draft['gsapAnimation']['textShadow'] = [{ "blur": "7px", "color": "rgba(39, 195, 130, 1)", "hOffset": "4px", "isInset": false, "spreed": "0px", "vOffset": "1px" }];
			break;

		case 'type3':
			draft['content'] = "Animated text for animation";
			draft['background']['color'] = '#000';
			draft['padding'] = { "vertical": "30px", "horizontal": "15px" };
			draft['color'] = '#fff';
			draft['typography']['lineHeight'] = "0%";
			draft['typography']['fontSize'] = { 'desktop': 30, 'tablet': 26, 'mobile': 20 };
			draft['typography']['textTransform'] = 'none';
			draft['gsapAnimation']['repeatBehavior'] = -1;
			draft['typography']['fontWeight'] = 600;
			draft['animatedSize']['width'] = { 'desktop': '100%', 'tablet': '', 'mobile': '' };
			draft['gsapAnimation']['animationSpeed'] = 1;
			draft['gsapAnimation']['repeatDelay'] = 1;
			draft['gsapAnimation']['randomColor'] = false,
				draft['gsapAnimation']['customColor'] = false;
			draft['gsapAnimation']['isTextShadow'] = true;
			draft['gsapAnimation']['textShadow'] = [{ "blur": "5px", "color": "rgba(39, 195, 130, 1)", "hOffset": "4px", "isInset": false, "spreed": "0px", "vOffset": "1px" }];
			break;
		case 'type4':
			draft['content'] = "Animation";
			draft['background']['color'] = '#000';
			draft['padding'] = { "vertical": "15px", "horizontal": "15px" };
			draft['color'] = '#fff';
			draft['typography']['fontSize'] = { 'desktop': 65, 'tablet': 55, 'mobile': 45 };
			draft['typography']['textTransform'] = 'uppercase';
			draft['typography']['lineHeight'] = "135%";
			draft['typography']['fontWeight'] = 700;
			draft['gsapAnimation']['repeatBehavior'] = -1;
			draft['animatedSize']['width'] = { 'desktop': '100%', 'tablet': '', 'mobile': '' };
			draft['gsapAnimation']['animationSpeed'] = 1;
			draft['gsapAnimation']['repeatDelay'] = 1;
			draft['gsapAnimation']['customColor'] = false;
			draft['gsapAnimation']['isTextShadow'] = true;
			draft['gsapAnimation']['textShadow'] = [{ "blur": "5px", "color": "rgba(39, 195, 130, 1)", "hOffset": "4px", "isInset": false, "spreed": "0px", "vOffset": "1px" }];
			draft['gsapAnimation']['animationDuration'] = 1;
			break;
		case 'type5':
			draft['content'] = "Animated text";
			draft['background']['color'] = '#000';
			draft['color'] = '#fff';
			draft['gsapAnimation']['repeatBehavior'] = -1;
			draft['padding'] = { "vertical": "15px", "horizontal": "15px" };
			draft['typography']['fontSize'] = { 'desktop': 45, 'tablet': 35, 'mobile': 25 };
			draft['typography']['textTransform'] = 'uppercase';
			draft['typography']['fontWeight'] = 700;
			draft['typography']['lineHeight'] = "135%";
			draft['animatedSize']['width'] = { 'desktop': '100%', 'tablet': '', 'mobile': '' };
			draft['gsapAnimation']['animationSpeed'] = 1;
			draft['gsapAnimation']['repeatDelay'] = 1;
			draft['gsapAnimation']['customColor'] = false;
			draft['gsapAnimation']['isTextShadow'] = true;
			draft['gsapAnimation']['textShadow'] = [{ "blur": "7px", "color": "rgba(39, 195, 130, 1)", "hOffset": "4px", "isInset": false, "spreed": "0px", "vOffset": "1px" }];
			draft['gsapAnimation']['animationDuration'] = 1.2;
			break;
		case 'type6':
			draft['content'] = "Jello";
			draft['background']['color'] = '#FF7F99';
			draft['color'] = '#fff';
			draft['gsapAnimation']['repeatBehavior'] = -1;
			draft['padding'] = { "vertical": "15px", "horizontal": "15px" };
			draft['typography']['fontSize'] = { 'desktop': 160, 'tablet': 100, 'mobile': 80 };
			draft['typography']['textTransform'] = 'none';
			draft['typography']['lineHeight'] = "135%";
			draft['typography']['fontWeight'] = 700;
			draft['animatedSize']['width'] = { 'desktop': '100%', 'tablet': '', 'mobile': '' };
			draft['gsapAnimation']['animationSpeed'] = 1;
			draft['gsapAnimation']['repeatDelay'] = 1;
			draft['gsapAnimation']['customColor'] = false;
			draft['gsapAnimation']['isTextShadow'] = true;
			draft['gsapAnimation']['textShadow'] = [{ "blur": "0px", "color": "rgba(224, 107, 134, 1)", "hOffset": "3px", "isInset": false, "spreed": "0px", "vOffset": "3px" }, { "hOffset": "6px", "vOffset": "6px", "blur": "0px", "spreed": "0px", "color": "rgba(212, 91, 118, 1)", "isInset": false }, { "hOffset": "9px", "vOffset": "9px", "blur": "0px", "spreed": "0px", "color": "rgba(197, 75, 102, 1)", "isInset": false }];
			draft['gsapAnimation']['animationDuration'] = 2;
			draft['repeat'] = true;
			break;
		case 'type7':
			draft['content'] = "ETC ETC ETC";
			draft['background']['color'] = '#000';
			draft['color'] = '#fff';
			draft['padding'] = { "vertical": "15px", "horizontal": "15px" };
			draft['typography']['fontSize'] = { 'desktop': 65, 'tablet': 45, 'mobile': 35 };
			draft['typography']['textTransform'] = 'uppercase';
			draft['typography']['lineHeight'] = "0%";
			draft['typography']['fontWeight'] = 900;
			draft['gsapAnimation']['autoRepeat'] = true;
			draft['gsapAnimation']['repeatBehavior'] = -1;
			draft['animatedSize']['width'] = { 'desktop': '100%', 'tablet': '', 'mobile': '' };
			draft['gsapAnimation']['animationSpeed'] = 1;
			draft['gsapAnimation']['repeatDelay'] = 1;
			draft['gsapAnimation']['customColor'] = false;
			draft['gsapAnimation']['isTextShadow'] = false;
			draft['gsapAnimation']['textShadow'] = [{ "blur": "5px", "color": "rgba(39, 195, 130, 1)", "hOffset": "4px", "isInset": false, "spreed": "0px", "vOffset": "1px" }];
			draft['gsapAnimation']['animationDuration'] = 0.8;
			break;
		case 'type8':
			draft['content'] = "Animated text for animation";
			draft['background']['color'] = '#22292C';
			draft['color'] = '#fff';
			draft['padding'] = { "vertical": "15px", "horizontal": "15px" };
			draft['typography']['fontSize'] = { 'desktop': 30, 'tablet': 25, 'mobile': 18 };
			draft['typography']['textTransform'] = 'none';
			draft['typography']['lineHeight'] = "135%";
			draft['typography']['fontWeight'] = 400;
			draft['gsapAnimation']['autoRepeat'] = true;
			draft['gsapAnimation']['repeatBehavior'] = -1;
			draft['animatedSize']['width'] = { 'desktop': '100%', 'tablet': '', 'mobile': '' };
			draft['gsapAnimation']['animationSpeed'] = 1;
			draft['gsapAnimation']['repeatDelay'] = 1;
			draft['gsapAnimation']['customColor'] = false;
			draft['gsapAnimation']['isTextShadow'] = false;
			draft['gsapAnimation']['textShadow'] = [{ "blur": "19px", "color": "rgba(39, 195, 130, 1)", "hOffset": "4px", "isInset": false, "spreed": "0px", "vOffset": "1px" }];
			draft['gsapAnimation']['animationDuration'] = 0.8;
			draft['gsapAnimation']['typingSpeed'] = 100;
			break;
		case 'type9':
			draft['content'] = "bPlugins";
			draft['background']['color'] = '#22292C';
			draft['color'] = '#FFFFFF';
			draft['padding'] = { "vertical": "15px", "horizontal": "15px" };
			draft['typography']['fontSize'] = { 'desktop': 80, 'tablet': 60, 'mobile': 40 };
			draft['typography']['textTransform'] = 'none';
			draft['typography']['lineHeight'] = "135%";
			draft['typography']['letterSpace'] = "2px";
			draft['typography']['fontWeight'] = 700;
			draft['gsapAnimation']['autoRepeat'] = false;
			draft['gsapAnimation']['repeatBehavior'] = -1;
			draft['animatedSize']['width'] = { 'desktop': '100%', 'tablet': '', 'mobile': '' };
			draft['gsapAnimation']['animationSpeed'] = 1;
			draft['gsapAnimation']['repeatDelay'] = 1;
			draft['gsapAnimation']['randomColor'] = true,
				draft['gsapAnimation']['customColor'] = false;
			draft['gsapAnimation']['isTextShadow'] = false;
			draft['gsapAnimation']['textShadow'] = [{ "blur": "19px", "color": "rgba(39, 195, 130, 1)", "hOffset": "4px", "isInset": false, "spreed": "0px", "vOffset": "1px" }];
			draft['gsapAnimation']['animationDuration'] = 0.8;
			draft['gsapAnimation']['typingSpeed'] = 300;
			draft['repeat'] = false;
			break;
		case 'type10':
			draft['content'] = "Animated text for animation";
			draft['background']['color'] = '#22292C';
			draft['color'] = '#FFFFFF';
			draft['padding'] = { "vertical": "15px", "horizontal": "15px" };
			draft['typography']['fontSize'] = { 'desktop': 30, 'tablet': 25, 'mobile': 18 };
			draft['typography']['textTransform'] = 'none';
			draft['typography']['lineHeight'] = "135%";
			draft['typography']['letterSpace'] = "0px";
			draft['typography']['fontWeight'] = 400;
			draft['gsapAnimation']['autoRepeat'] = false;
			draft['gsapAnimation']['repeatBehavior'] = -1;
			draft['animatedSize']['width'] = { 'desktop': '100%', 'tablet': '', 'mobile': '' };
			draft['gsapAnimation']['animationSpeed'] = 1;
			draft['gsapAnimation']['repeatDelay'] = 1;
			draft['gsapAnimation']['randomColor'] = true,
				draft['gsapAnimation']['customColor'] = false;
			draft['gsapAnimation']['isTextShadow'] = false;
			draft['gsapAnimation']['textShadow'] = [{ "blur": "5px", "color": "rgba(39, 195, 130, 1)", "hOffset": "4px", "isInset": false, "spreed": "0px", "vOffset": "1px" }];
			draft['gsapAnimation']['animationDuration'] = 0.8;
			draft['gsapAnimation']['typingSpeed'] = 300;
			break;
	}
})