import { useBlockProps } from '@wordpress/block-editor';

import Settings from './Settings/Settings';
import Style from '../Common/Style';
import { prefix } from '../../utils/data';
import Default from './Themes/Default';
import TypeOne from './Themes/TypeOne';


const Edit = props => {
	const { attributes, setAttributes, clientId } = props;
	const { options } = attributes;
	const { theme } = options;
	const id = `${prefix}-${clientId}`;

	return <>
		<Settings attributes={attributes} setAttributes={setAttributes} />

		<div {...useBlockProps()} id={id}>
			<Style attributes={attributes} id={id} />

			<div className={`${prefix} ${theme}`}>
				<SwitchTheme {...{ attributes, id }} />
			</div>
		</div>
	</>;
};
export default Edit;

const SwitchTheme = ({ attributes, id }) => {
	const { options } = attributes;
	const { theme } = options;
	switch (theme) {
		case 'default':
			return <Default attributes={attributes} id={id} />;
		case 'type1':
			return <TypeOne attributes={attributes} />;
		case 'type2':
			return <p>Type 2</p>;
		case 'type3':
			return <p>Type 3</p>;
		default:
			return null;
	}
};