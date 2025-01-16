import { __ } from '@wordpress/i18n';

export const generalStyleTabs = [
	{ name: 'general', title: __('General', 'animated-text') },
	{ name: 'style', title: __('Style', 'animated-text') }
];

export const animateInOpt = [
	{ label: __('Char', 'animated-text'), value: 'char' },
	{ label: __('Word', 'animated-text'), value: 'word' }
];

export const effects = [
	{ label: __('Flash', 'animated-text'), value: 'flash' },
	{ label: __('Bounce', 'animated-text'), value: 'bounce' },
	{ label: __('Shake', 'animated-text'), value: 'shake' },
	{ label: __('Tada', 'animated-text'), value: 'tada' },
	{ label: __('Swing', 'animated-text'), value: 'swing' },
	{ label: __('Wobble', 'animated-text'), value: 'wobble' },
	{ label: __('Pulse', 'animated-text'), value: 'pulse' },
	{ label: __('Flip', 'animated-text'), value: 'flip' }
];

export const inEffects = [
	{ label: __('Fade In', 'animated-text'), value: 'fadeIn' },
	{ label: __('Flip In X', 'animated-text'), value: 'flipInX' },
	{ label: __('Flip In Y', 'animated-text'), value: 'flipInY' },
	{ label: __('Fade In Up', 'animated-text'), value: 'fadeInUp' },
	{ label: __('Fade In Down', 'animated-text'), value: 'fadeInDown' },
	{ label: __('Fade In Left', 'animated-text'), value: 'fadeInLeft' },
	{ label: __('Fade In Right', 'animated-text'), value: 'fadeInRight' },
	{ label: __('Fade In Up Big', 'animated-text'), value: 'fadeInUpBig' },
	{ label: __('Fade In Down Big', 'animated-text'), value: 'fadeInDownBig' },
	{ label: __('Fade In Left Big', 'animated-text'), value: 'fadeInLeftBig' },
	{ label: __('Fade In Right Big', 'animated-text'), value: 'fadeInRightBig' },
	{ label: __('Bounce In', 'animated-text'), value: 'bounceIn' },
	{ label: __('Bounce In Up', 'animated-text'), value: 'bounceInUp' },
	{ label: __('Bounce In Down', 'animated-text'), value: 'bounceInDown' },
	{ label: __('Bounce In Left', 'animated-text'), value: 'bounceInLeft' },
	{ label: __('Bounce In Right', 'animated-text'), value: 'bounceInRight' },
	{ label: __('Rotate In', 'animated-text'), value: 'rotateIn' },
	{ label: __('Rotate In Up Left', 'animated-text'), value: 'rotateInUpLeft' },
	{ label: __('Rotate In Up Right', 'animated-text'), value: 'rotateInUpRight' },
	{ label: __('Rotate In Down Left', 'animated-text'), value: 'rotateInDownLeft' },
	{ label: __('Rotate In Down Right', 'animated-text'), value: 'rotateInDownRight' },
	{ label: __('Roll In', 'animated-text'), value: 'rollIn' }
];

export const outEffects = [
	{ label: __('Fade Out', 'animated-text'), value: 'fadeOut' },
	{ label: __('Flip Out X', 'animated-text'), value: 'flipOutX' },
	{ label: __('Flip Out Y', 'animated-text'), value: 'flipOutY' },
	{ label: __('Fade Out Up', 'animated-text'), value: 'fadeOutUp' },
	{ label: __('Fade Out Down', 'animated-text'), value: 'fadeOutDown' },
	{ label: __('Fade Out Left', 'animated-text'), value: 'fadeOutLeft' },
	{ label: __('Fade Out Right', 'animated-text'), value: 'fadeOutRight' },
	{ label: __('Fade Out Up Big', 'animated-text'), value: 'fadeOutUpBig' },
	{ label: __('Fade Out Down Big', 'animated-text'), value: 'fadeOutDownBig' },
	{ label: __('Fade Out Left Big', 'animated-text'), value: 'fadeOutLeftBig' },
	{ label: __('Fade Out Right Big', 'animated-text'), value: 'fadeOutRightBig' },
	{ label: __('Bounce Out', 'animated-text'), value: 'bounceOut' },
	{ label: __('Bounce Out Up', 'animated-text'), value: 'bounceOutUp' },
	{ label: __('Bounce Out Down', 'animated-text'), value: 'bounceOutDown' },
	{ label: __('Bounce Out Left', 'animated-text'), value: 'bounceOutLeft' },
	{ label: __('Bounce Out Right', 'animated-text'), value: 'bounceOutRight' },
	{ label: __('Rotate Out', 'animated-text'), value: 'rotateOut' },
	{ label: __('Rotate Out Up Left', 'animated-text'), value: 'rotateOutUpLeft' },
	{ label: __('Rotate Out Up Right', 'animated-text'), value: 'rotateOutUpRight' },
	{ label: __('Rotate Out Down Left', 'animated-text'), value: 'rotateOutDownLeft' },
	{ label: __('Rotate Out Down Right', 'animated-text'), value: 'rotateOutDownRight' },
	{ label: __('Hinge', 'animated-text'), value: 'hinge' },
	{ label: __('Roll Out', 'animated-text'), value: 'rollOut' }
];

export const sequences = [
	{ label: __('Default', 'animated-text'), value: 'default' },
	{ label: __('Sync', 'animated-text'), value: 'sync' },
	{ label: __('Shuffle', 'animated-text'), value: 'shuffle' },
	{ label: __('Reverse', 'animated-text'), value: 'reverse' },
];

export const splitText = (element) => {
	const text = element.textContent;
	element.innerHTML = '';
	text.split('').forEach((char) => {
		const span = document.createElement('span');
		span.textContent = char === ' ' ? '\u00A0' : char; // Preserve spaces
		element.appendChild(span);
	});
};