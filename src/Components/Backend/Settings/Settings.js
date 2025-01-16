import { __ } from '@wordpress/i18n';
import { InspectorControls, BlockControls, AlignmentToolbar } from '@wordpress/block-editor';
import { PanelBody, PanelRow, TabPanel, TextareaControl, ToggleControl, SelectControl, RangeControl } from '@wordpress/components';

import { Label, Background, ColorControl, BtnGroup, Typography, HelpPanel } from '../../../../../bpl-tools/Components';
import { BorderControl, SpaceControl } from '../../../../../bpl-tools/Components/Deprecated';
import { tabController } from '../../../../../bpl-tools/utils/functions';

import { pluginSlug, animatedTextDocs } from '../../../utils/data';
import { generalStyleTabs } from '../../../utils/options';
import { animateInOpt, effects, inEffects, outEffects, sequences } from '../../../utils/options';
import { produce } from 'immer';
import { themeSwitch } from '../../../utils/config';

const Settings = ({ attributes, setAttributes }) => {
	const { loop, animateIn, inEffect, inSequence, outEffect, outSequence, textAlign, background, content, typography, color, padding, border, options, gsapAnimation = {} } = attributes;

	const { theme = {} } = options;
	const { animationSpeed = 30, perspectiveDepth = 800, enableOscillation = true, repeatBehavior } = gsapAnimation;

	console.log(gsapAnimation);


	return <>
		<InspectorControls>
			<TabPanel className='bPlTabPanel' activeClass='activeTab' tabs={generalStyleTabs} onSelect={tabController}>{tab => <>
				{'general' === tab.name && <>
					<HelpPanel slug={pluginSlug} docsLink={animatedTextDocs} />

					<PanelBody title={__("Select Style Type", "animated-text")} initialOpen={true}>
						<SelectControl
							label={__("Select Type:", "animated-text")}
							value={theme}
							options={[
								{ label: "Default", value: "default" },
								{ label: "Type 1", value: "type1" },
								{ label: "Type 2", value: "type2" },
								{ label: "Type 3", value: "type3" },
							]}
							labelPosition="left"
							onChange={(val) => setAttributes(themeSwitch(val, attributes))}
						/>
					</PanelBody>


					<PanelBody className='bPlPanelBody' title={__('Animated Text Settings', 'animated-text')}>

						<Label className='mb5'>{__('Animate text:', 'animated-text')}</Label>
						<TextareaControl value={content} onChange={val => setAttributes({ content: val })} />

						{
							"default" === theme && <>
								<ToggleControl className='mt20' label={__('Loop', 'animated-text')} checked={loop} onChange={val => setAttributes({ loop: val })} />
								<small>{__('Loop will not work instantly in editor! you have to refresh the page.', 'animated-text')}</small>

								<PanelRow>
									<Label className=''>{__('Animate in:', 'animated-text')}</Label>
									<BtnGroup value={animateIn} onChange={val => setAttributes({ animateIn: val })} options={animateInOpt} />
								</PanelRow>

								<PanelRow>
									<Label className=''>{__('In Effect:', 'animated-text')}</Label>
									<SelectControl value={inEffect} onChange={val => setAttributes({ inEffect: val })} options={[...effects, ...inEffects]} />
								</PanelRow>

								<PanelRow>
									<Label className=''>{__('In Sequence:', 'animated-text')}</Label>
									<SelectControl value={inSequence} onChange={val => setAttributes({ inSequence: val })} options={sequences} />
								</PanelRow>

								{loop && <>
									<PanelRow>
										<Label className=''>{__('Out Effect:', 'animated-text')}</Label>
										<SelectControl value={outEffect} onChange={val => setAttributes({ outEffect: val })} options={[...effects, ...outEffects]} />
									</PanelRow>

									<PanelRow>
										<Label className=''>{__('Out Sequence:', 'animated-text')}</Label>
										<SelectControl value={outSequence} onChange={val => setAttributes({ outSequence: val })} options={sequences} />
									</PanelRow>
								</>}
							</>
						}

						{
							"type1" === theme && <>
								<PanelBody className='bPlPanelBody' title={__('Animation Control', 'animated-text')}>

									{/* Animation speed control */}
									<RangeControl
										label="Animation Speed (seconds)"
										value={animationSpeed}
										onChange={(val) => {
											const newSpeed = produce(gsapAnimation, draft => {
												draft.animationSpeed = val;
											})
											setAttributes({ gsapAnimation: newSpeed });
										}}
										min={5}
										max={40}
										step={1}
										help="Adjust the speed of the animation. Lower values mean faster rotation."
									/>

									{/* perspectiveDepth Control */}
									<SelectControl
										label="Perspective Depth"
										value={perspectiveDepth}
										options={[
											{ label: "Shallow (500px)", value: 500 },
											{ label: "Medium (800px)", value: 800 },
											{ label: "Deep (1200px)", value: 1200 },
										]}
										onChange={(value) => {
											const newDepth = produce(gsapAnimation, draft => {
												draft.perspectiveDepth = parseInt(value, 10);
											})
											setAttributes({ gsapAnimation: newDepth });
										}}
										help="Adjust the depth of the 3D animation perspective."
									/>

									{/* Enable Oscillation controller */}
									<ToggleControl
										label="Enable Oscillation"
										checked={enableOscillation}
										onChange={(newValue) =>
											setAttributes({
												gsapAnimation: { ...gsapAnimation, enableOscillation: newValue },
											})
										}
									/>

									{/* repeatBehavior Control */}
									{
										enableOscillation && <SelectControl
											label="Repeat Behavior"
											className='mt10'
											value={repeatBehavior}
											options={[
												{ label: 'Infinite', value: -1 },
												{ label: '1 Time', value: 0 },
												{ label: '2 Times', value: 2 },
												{ label: '3 Times', value: 3 },
											]}
											help="Choose how many times the animation should repeat. Set to 'Infinite' for a continuous loop, or specify a number for limited rotations."
											onChange={(newValue) =>
												setAttributes({
													gsapAnimation: {
														...gsapAnimation,
														repeatBehavior: parseInt(newValue, 10), // Ensure it's an integer
													},
												})
											}
										/>
									}
								</PanelBody>
							</>
						}
					</PanelBody>
				</>}


				{'style' === tab.name && <>
					<PanelBody className='bPlPanelBody' title={__('Animated Text', 'animated-text')}>
						<Background label={__('Background:', 'animated-text')} value={background} onChange={val => setAttributes({ background: val })} defaults={{ color: '#0000' }} />

						<Typography className='mt20' label={__('Typography:', 'animated-text')} value={typography} onChange={val => setAttributes({ typography: val })} defaults={{ fontSize: { desktop: 22, tablet: 20, mobile: 18 } }} />

						<ColorControl label={__('Color:', 'animated-text')} value={color} onChange={val => setAttributes({ color: val })} defaultColor='#333' />

						<SpaceControl className='mt20' label={__('Padding:', 'animated-text')} value={padding} onChange={val => setAttributes({ padding: val })} defaults={{ vertical: '15px', horizontal: '15px' }} />

						<BorderControl label={__('Border:', 'animated-text')} value={border} onChange={val => setAttributes({ border: val })} defaults={{ radius: '5px' }} />
					</PanelBody>
				</>}
			</>}</TabPanel>
		</InspectorControls>


		<BlockControls>
			<AlignmentToolbar value={textAlign} onChange={val => setAttributes({ textAlign: val })} />
		</BlockControls>
	</>;
};
export default Settings;