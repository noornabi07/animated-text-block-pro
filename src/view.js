import { createRoot } from 'react-dom/client';
import './style.scss';
import Style from './Components/Common/Style';
import { prefix } from './utils/data';
import ThemeSwitch from './Components/Frontend/Themes/ThemeSwitch';

document.addEventListener('DOMContentLoaded', () => {
	const animatedTextEls = document.querySelectorAll('.wp-block-atb-animated-text');
	animatedTextEls.forEach(animatedTextEl => {
		const attributes = JSON.parse(animatedTextEl.dataset.attributes);

		const props = { attributes, id: animatedTextEl.id }
		const { options } = attributes;
		const { theme } = options;

		createRoot(animatedTextEl).render(<>
			<Style {...props} />

			<div className={`${prefix} ${theme}`}>
				<ThemeSwitch {...props} />
			</div>
		</>);

		animatedTextEl?.removeAttribute('data-attributes');
	});
});