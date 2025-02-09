import { mobileBreakpoint, tabBreakpoint } from '../../../../bpl-tools/utils/data';
import { getBackgroundCSS, getBorderCSS, getMultiShadowCSS, getSpaceCSS, getTypoCSS, isValidCSS } from '../../../../bpl-tools/utils/getCSS';
import { prefix } from '../../utils/data';

const Style = ({ attributes, id }) => {
	const { options, textAlign, background, typography, color, padding, border, animatedSize = {}, textAlignment = "center", gsapAnimation = {} } = attributes;


	const { textShadow = [], isTextShadow = false } = gsapAnimation;

	const animatedTextSl = `#${id} .${prefix}`;
	const defaultSl = `${animatedTextSl}.default`;
	const typeOneSl = `${animatedTextSl}.type1`;
	const typeTwoSl = `${animatedTextSl}.type2`;
	const typeThreeSl = `${animatedTextSl}.type3`;
	const typeFourSl = `${animatedTextSl}.type4`;
	const typeFourTxtSl = `${typeFourSl} .content .wrapper`;
	const typeFiveSl = `${animatedTextSl}.type5`;
	const typeFiveTxtSl = `${typeFiveSl} .content .wrapper`;
	const typeSixSl = `${animatedTextSl}.type6`;
	const typeSevenSl = `${animatedTextSl}.type7`;
	const typeEightSl = `${animatedTextSl}.type8`;
	const cursorSl = `${typeEightSl} .content .stage .cursor`;
	const typeNineSl = `${animatedTextSl}.type9`;
	const typeTenSl = `${animatedTextSl}.type10`;


	return <style dangerouslySetInnerHTML={{
		__html: `
		${getTypoCSS('', typography)?.googleFontLink}
		${getTypoCSS(`${animatedTextSl} .content`, typography, options?.theme === 'type7' ? false : true)?.styles}

		${animatedTextSl}{
			text-align: ${textAlign};
			${getBackgroundCSS(background)}
			padding: ${getSpaceCSS(padding)};
			${getBorderCSS(border)}
		}
		${animatedTextSl} .content{
			color: ${color};
			text-align: ${textAlignment};
			${isTextShadow ? `text-shadow: ${getMultiShadowCSS(textShadow, 'text')};` : ""}
		}
		${typeFourSl},
		${typeFiveSl}{
			justify-content: ${textAlignment};
		}
		${typeFourTxtSl} .txt{
			color: ${color};
		}
		${typeFiveTxtSl} .txt{
			color: ${color};
		}
		${cursorSl}{
			background-color: ${color};
		}
		${typeSixSl},
		${typeSevenSl},
		${typeEightSl},
		${typeNineSl},
		${typeTenSl}{
			justify-content: ${textAlignment};
		}
		${typeSevenSl ? `@font-face {
			font-family: "Anybody";
			src: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/61488/ETCAnybodyPB.woff2") format("woff2-variations");
			font-display: block;
			font-style: normal italic;
			font-weight: 100 900;
			font-stretch: 10% 400%;
		}` : ""}
		
		${defaultSl},
		${typeOneSl},
		${typeTwoSl},
		${typeThreeSl},
		${typeFourSl},
		${typeFiveSl},
		${typeSixSl},
		${typeSevenSl},
		${typeEightSl},
		${typeNineSl},
		${typeTenSl}{
			${isValidCSS('width', animatedSize?.width['desktop'])}
		}

		${typeOneSl}{
			${isValidCSS('height', animatedSize?.height['desktop'])}
		}

		${tabBreakpoint}{
			${typeOneSl},
			${typeTwoSl},
			${typeThreeSl},
			${typeFourSl},
			${typeFiveSl},
			${typeSixSl},
			${typeSevenSl},
			${typeEightSl},
			${typeNineSl},
			${typeTenSl}{
				${isValidCSS('width', animatedSize?.width['tablet'])}
			}
		}

		${tabBreakpoint}{
			${typeOneSl}{
				${isValidCSS('height', animatedSize?.height['tablet'])}
			}
		}

		${mobileBreakpoint}{
			${typeOneSl},
			${typeTwoSl},
			${typeThreeSl},
			${typeFourSl},
			${typeFiveSl},
			${typeSixSl},
			${typeSevenSl},
			${typeEightSl},
			${typeNineSl},
			${typeTenSl}{
				${isValidCSS('height', animatedSize?.width['mobile'])}
			}
		}

		${tabBreakpoint}{
			${typeOneSl}{
				${isValidCSS('height', animatedSize?.height['mobile'])}
			}
		}
		

		`.replace(/\s+/g, ' ')
	}} />
}
export default Style;