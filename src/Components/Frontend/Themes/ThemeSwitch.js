import React from 'react';
import Default from './Default';
import TypeOne from '../../Common/Themes/TypeOne';
import TypeTwo from '../../Common/Themes/TypeTwo';
import TypeThree from '../../Common/Themes/TypeThree';
import TypeFour from '../../Common/Themes/TypeFour';
import TypeFive from '../../Common/Themes/TypeFive';
import TypeSix from '../../Common/Themes/TypeSix';
import TypeSeven from '../../Common/Themes/TypeSeven';
import TypeEight from '../../Common/Themes/TypeEight';
import TypeNine from '../../Common/Themes/TypeNine';
import TypeTen from '../../Common/Themes/TypeTen';

const ThemeSwitch = (props) => {
    const { attributes, id } = props;
    const { options } = attributes;
    const { theme } = options;

    switch (theme) {
        case 'default':
            return <Default attributes={attributes} id={id} />
        case 'type1':
            return <TypeOne attributes={attributes} />
        case 'type2':
            return <TypeTwo attributes={attributes} />
        case 'type3':
            return <TypeThree attributes={attributes} />
        case 'type4':
            return <TypeFour attributes={attributes} />
        case 'type5':
            return <TypeFive attributes={attributes} />
        case 'type6':
            return <TypeSix attributes={attributes} />
        case 'type7':
            return <TypeSeven attributes={attributes} />
        case 'type8':
            return <TypeEight attributes={attributes} />
        case 'type9':
            return <TypeNine attributes={attributes} />
        case 'type10':
            return <TypeTen attributes={attributes} />
        default:
            return null
    }
};
export default ThemeSwitch;