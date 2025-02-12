import { __ } from '@wordpress/i18n';
import { InspectorControls, BlockControls } from '@wordpress/block-editor';
import { PanelBody, PanelRow, TabPanel, TextareaControl, ToggleControl, SelectControl, RangeControl, __experimentalUnitControl as UnitControl } from '@wordpress/components';

import { Label, Background, ColorControl, BtnGroup, Typography, HelpPanel, Device, ShadowControl } from '../../../../../bpl-tools/Components';
import { BorderControl, SpaceControl } from '../../../../../bpl-tools/Components/Deprecated';
import { tabController, updateData } from '../../../../../bpl-tools/utils/functions';
import { AboutProModal, SelectControlPro, BControlPro } from '../../../../../bpl-tools/ProControls';

import { pluginSlug, animatedTextDocs } from '../../../utils/data';
import { animateTypeOptions, generalStyleTabs } from '../../../utils/options';
import { animateInOpt, effects, inEffects, outEffects, sequences } from '../../../utils/options';
import { withSelect } from '@wordpress/data';
import { produce } from 'immer';
import { useState } from 'react';
import { themeSwitch } from '../../../utils/config';
import { ToolbarGroup } from '@wordpress/components';
import { DropdownMenu } from '@wordpress/components';

const Settings = ({ attributes, setAttributes, isPremium, siteURL }) => {
	const { loop, animateIn, inEffect, inSequence, outEffect, outSequence, background, content, typography, color, padding, border, options, gsapAnimation = {}, animatedSize = {}, textAlignment = "center", repeat = true, alignment } = attributes;

	const [device, setDevice] = useState('desktop');

	const [alertAnimationSpeed, setAlertAnimationSpeed] = useState(null);
	const [alertRandomColor, setAlertRandomColor] = useState(null);
	const [alertShadow, setAlertShadow] = useState(null);

	const siteLocation = `${siteURL}/wp-admin/edit.php?post_type=animated-text-block&page=atb_demo_page#/dashboard`;

	const [isProModalOpen, setIsProModalOpen] = useState(false);

	const premiumProps = { isPremium, setIsProModalOpen };


	// Define available easing options
	const easeOptions = [
		{ label: "Elastic", value: "elastic(0.3, 0.2)" },
		{ label: "Bounce", value: "bounce.out" }
	];

	const { theme = {} } = options;
	const { animationSpeed = 30, perspectiveDepth = 800, enableOscillation = true, repeatBehavior, repeatDelay = 2, animationEffect = "default", autoRepeat = true, transformOrigin = 400, randomColor = false, isTextShadow = false, textShadow = [], fontStretch = "200%", animationDuration = 1, waveEffect = 25, easeType = "elastic(0.3, 0.2)", scaleX = 1.5, scaleY = 0.5, typingSpeed, reStartTime = 1000, animateType = 'wave' } = gsapAnimation;

	return <>
		<InspectorControls>
			<TabPanel className='bPlTabPanel' activeClass='activeTab' tabs={generalStyleTabs} onSelect={tabController}>{tab => <>
				{'general' === tab.name && <>
					<HelpPanel slug={pluginSlug} docsLink={animatedTextDocs} />

					<PanelBody title={__("Animation Options:", "animated-text")} initialOpen={true}>
						<SelectControlPro
							label={__("Animation Styles:", "animated-text")}
							value={theme}
							options={[
								{ label: "Default", value: "default" },
								{ label: "Style 1", value: "type1" },
								{ label: "Style 2", value: "type2" },
								{ label: "Style 3", value: "type3" },
								{ label: "Style 4", value: "type4" },
								{ label: "Style 5", value: "type5" },
								{ label: "Style 6", value: "type6" },
								{ label: "Style 7", value: "type7" },
								{ label: "Style 8", value: "type8" },
								{ label: "Style 9", value: "type9" },
								{ label: "Style 10", value: "type10" },
							]}
							labelPosition="left"
							onChange={(val) => setAttributes(themeSwitch(val, attributes))}
							{...premiumProps}
							proValues={['type1', 'type2', 'type3', 'type4', 'type5', 'type6', 'type7', 'type8', 'type9', 'type10']}
						/>

						<SelectControlPro
							label="Text Alignment"
							labelPosition="left"
							value={textAlignment}
							options={[
								{ label: "Left", value: "left" },
								{ label: "Center", value: "center" },
								{ label: "Right", value: "right" }
							]}
							onChange={(newAlignment) =>
								setAttributes({ textAlignment: newAlignment }) // Update the attribute on change
							}
							{...premiumProps}
							proValues={['left', 'center', 'right']}
						/>

						<PanelRow>
							<Label className='mb5'>{__('Animated max width:', 'animated-text')}</Label>
							<Device onChange={val => setDevice(val)} />
						</PanelRow>

						<BControlPro
							className='mb5'
							value={animatedSize?.width[device]}
							onChange={val => setAttributes({ animatedSize: updateData(animatedSize, val, "width", device) })} beforeIcon='grid-view'
							step={1}
							max={100}
							min={1}
							Component={UnitControl}
							{...premiumProps}
						/>

						{
							("type1" === theme) && <>
								<PanelRow>
									<Label className='mb5'>{__('Animated min height:', 'animated-text')}</Label>
									<Device onChange={val => setDevice(val)} />
								</PanelRow>

								<BControlPro
									className='mb5'
									value={animatedSize?.height[device]}
									onChange={val => setAttributes({ animatedSize: updateData(animatedSize, val, "height", device) })}
									beforeIcon='grid-view'
									step={1}
									min={10}
									Component={UnitControl}
									{...premiumProps}
								/>
							</>
						}

					</PanelBody>


					<PanelBody className='bPlPanelBody' title={__('Animated Text Settings', 'animated-text')}>

						<Label className='mb5'>{__('Animate text:', 'animated-text')}</Label>
						<TextareaControl value={content} onChange={val => setAttributes({ content: val })} placeholder='Please type here' />
						{
							"type7" === theme && <>
								<p style={{ color: "#DF6D14" }}>Use a single-line text. Multiple lines do not animate properly.</p>
							</>
						}
						{
							("type4" === theme) && <p style={{ color: "#DF6D14" }}>Not working here white space for this animate</p>
						}
						{
							("type10" === theme) && <>
								{
									"wave" === animateType && <p style={{ color: "#DF6D14" }}>Not working here white space for this animate</p>
								}
							</>
						}


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
									<BControlPro
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
										Component={RangeControl}
										{...premiumProps}
									/>

									{/* perspectiveDepth Control */}
									<SelectControlPro
										label="Perspective Depth"
										labelPosition="left"
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
										{...premiumProps}
										proValues={['500', '800', '1200']}
									/>

									{/* transformOrigin Control */}
									<SelectControlPro
										label="TransformOrigin Fat"
										labelPosition="left"
										value={transformOrigin}
										options={[
											{ label: "Normal Fat (400)", value: 400 },
											{ label: "Medium Fat (800)", value: 800 },
											{ label: "Large Fat (1200)", value: 1200 },
										]}
										onChange={(value) => {
											const newFat = produce(gsapAnimation, draft => {
												draft.transformOrigin = parseInt(value, 10);
											})
											setAttributes({ gsapAnimation: newFat });
										}}
										help="Adjust the fat with your device"
										{...premiumProps}
										proValues={['400', '800', '1200']}
									/>

									{/* Enable Oscillation controller */}
									<BControlPro
										label="Enable Oscillation"
										checked={enableOscillation}
										onChange={(newValue) =>
											setAttributes({
												gsapAnimation: { ...gsapAnimation, enableOscillation: newValue },
											})
										}
										{...premiumProps}
										Component={ToggleControl}
									/>

									{/* repeatBehavior Control */}
									{
										enableOscillation && <SelectControlPro
											label="Repeat Behavior"
											labelPosition="left"
											className='mt10'
											value={repeatBehavior}
											options={[
												{ label: 'Infinite', value: -1 },
												{ label: '1 Time', value: 0 },
												{ label: '2 Times', value: 2 },
												{ label: '3 Times', value: 3 },
												{ label: '4 Times', value: 4 },
												{ label: '5 Times', value: 5 },
												{ label: '6 Times', value: 6 },
												{ label: '7 Times', value: 7 },
												{ label: '8 Times', value: 8 },
												{ label: '9 Times', value: 9 },
												{ label: '10 Times', value: 10 },
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
											{...premiumProps}
											proValues={['0', '1', '2,', '3', '4', '5', '6', '7', '8', '9', '10', '-1']}
										/>
									}
								</PanelBody>
							</>
						}

						{
							"type2" === theme && <>
								<PanelBody className='bPlPanelBody' title={__('Animation Control', 'animated-text')}>
									{/* Animation speed control */}
									<BControlPro
										label="Animation Speed (seconds)"
										value={animationSpeed}
										onChange={(val) => {
											const newSpeed = produce(gsapAnimation, draft => {
												draft.animationSpeed = val;
											})
											setAttributes({ gsapAnimation: newSpeed });
										}}
										min={0.5}
										max={3}
										step={0.1}
										help="Adjust the speed of the animation"
										{...premiumProps}
										Component={RangeControl}
									/>

									{/* Animation repeatDelay Control */}
									<BControlPro
										label="RepeatDelay Speed (seconds)"
										value={repeatDelay}
										onChange={(val) => {
											const newSpeed = produce(gsapAnimation, draft => {
												draft.repeatDelay = val;
											})
											setAttributes({ gsapAnimation: newSpeed });
										}}
										min={1}
										step={0.1}
										help="Adjust the speed of the repeatDelay animation"
										{...premiumProps}
										Component={RangeControl}
									/>

									<SelectControlPro
										label="Animation Effect"
										labelPosition="left"
										value={animationEffect}
										options={[
											{ label: "Default", value: "default" },
											{ label: "Fade", value: "fade" },
											{ label: "Zoom", value: "zoom" },
											{ label: "Rotate", value: "rotate" },
											{ label: "Slide", value: "slide" },
										]}
										onChange={val => {
											const newEffect = produce(gsapAnimation, draft => {
												draft.animationEffect = val;
											})
											setAttributes({ gsapAnimation: newEffect });
										}}
										help="Select the animation style for your text."
										{...premiumProps}
										proValues={['default', 'fade', 'zoom', 'rotate', 'slide']}
									/>

									{/* Auto Repeat Animation */}
									<BControlPro
										label="Auto Repeat Animation"
										checked={autoRepeat}
										onChange={val => {
											const newRepeat = produce(gsapAnimation, draft => {
												draft.autoRepeat = val;
											})
											setAttributes({ gsapAnimation: newRepeat });
										}}
										help={
											autoRepeat
												? "The animation will repeat infinitely."
												: "The animation will play only once."
										}
										{...premiumProps}
										Component={ToggleControl}
									/>
								</PanelBody>
							</>
						}

						{
							"type3" === theme && <>
								<PanelBody className='bPlPanelBody' title={__('Animation Control', 'animated-text')}>

									{/* Animation speed control */}
									<BControlPro
										label="Animation Speed (seconds)"
										value={animationSpeed}
										onChange={(val) => {
											const newSpeed = produce(gsapAnimation, draft => {
												draft.animationSpeed = val;
											})
											setAttributes({ gsapAnimation: newSpeed });
										}}
										min={0.5}
										max={10}
										step={0.1}
										help="Adjust the speed of the animation"
										{...premiumProps}
										Component={RangeControl}
									/>
								</PanelBody>

								{/* Repeat Count Animation */}
								<SelectControlPro
									label="Repeat Behavior"
									labelPosition="left"
									className='mt10'
									value={repeatBehavior}
									options={[
										{ label: 'Infinite', value: -1 },
										{ label: '1 Time', value: 0 },
										{ label: '2 Times', value: 2 },
										{ label: '3 Times', value: 3 },
										{ label: '4 Times', value: 4 },
										{ label: '5 Times', value: 5 },
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
									{...premiumProps}
									proValues={['-1', '0', '2', '3', '4', '5']}
								/>

								{/* Repeat Delay Control */}
								<BControlPro
									label="RepeatDelay Speed (seconds)"
									value={repeatDelay}
									onChange={(val) => {
										const newSpeed = produce(gsapAnimation, draft => {
											draft.repeatDelay = val;
										})
										setAttributes({ gsapAnimation: newSpeed });
									}}
									max={20}
									min={0.5}
									step={0.1}
									help="Adjust the speed of the repeatDelay animation"
									{...premiumProps}
									Component={RangeControl}
								/>

							</>
						}

						{
							"type4" === theme && <>
								<BControlPro
									label="Forward Font Stretch"
									value={parseInt(fontStretch)}
									onChange={(val) => {
										const newSpeed = produce(gsapAnimation, draft => {
											draft.fontStretch = `${val}%`;
										})
										setAttributes({ gsapAnimation: newSpeed });
									}}
									step={10}
									min={100}
									max={500}
									{...premiumProps}
									Component={RangeControl}
								/>

								<BControlPro
									label="Animation Duration"
									value={animationDuration}
									onChange={(val) => {
										const newSpeed = produce(gsapAnimation, draft => {
											draft.animationDuration = val;
										})
										setAttributes({ gsapAnimation: newSpeed });
									}}
									step={0.1}
									min={0.5}
									max={5}
									{...premiumProps}
									Component={RangeControl}
								/>

								<BControlPro
									label="Wave Effect Character"
									value={waveEffect}
									onChange={(val) => {
										const newSpeed = produce(gsapAnimation, draft => {
											draft.waveEffect = val;
										})
										setAttributes({ gsapAnimation: newSpeed });
									}}
									step={1}
									min={10}
									max={50}
									{...premiumProps}
									Component={RangeControl}
								/>
							</>
						}

						{
							"type5" === theme && <>
								<BControlPro
									label="Repeat Animation"
									value={repeatBehavior}
									onChange={(val) => {
										const newBehavior = produce(gsapAnimation, draft => {
											draft.repeatBehavior = val;
										})
										setAttributes({ gsapAnimation: newBehavior });
									}}
									step={1}
									min={-1}
									help="Choose how many times the animation should repeat. Set to 'Infinite (-1)' for a continuous loop, or specify a number for limited animation"
									{...premiumProps}
									Component={RangeControl}
								/>

								<BControlPro
									label="Animation Duration"
									value={animationDuration}
									onChange={(val) => {
										const newSpeed = produce(gsapAnimation, draft => {
											draft.animationDuration = val;
										})
										setAttributes({ gsapAnimation: newSpeed });
									}}
									step={0.1}
									min={0.5}
									max={5}
									{...premiumProps}
									Component={RangeControl}
								/>

								<BControlPro
									label="scaleX"
									value={scaleX}
									onChange={(val) => {
										const newSpeed = produce(gsapAnimation, draft => {
											draft.scaleX = val;
										})
										setAttributes({ gsapAnimation: newSpeed });
									}}
									step={0.1}
									min={0.5}
									max={10}
									{...premiumProps}
									Component={RangeControl}
								/>

								<BControlPro
									label="scaleY"
									value={scaleY}
									onChange={(val) => {
										const newSpeed = produce(gsapAnimation, draft => {
											draft.scaleY = val;
										})
										setAttributes({ gsapAnimation: newSpeed });
									}}
									step={0.1}
									min={0.1}
									max={5}
									{...premiumProps}
									Component={RangeControl}
								/>
							</>
						}

						{
							"type6" === theme && <>
								<SelectControlPro
									label="Select Ease Type"
									labelPosition="left"
									value={easeType}
									options={easeOptions}
									onChange={(val) => {
										const newEaseType = produce(gsapAnimation, draft => {
											draft.easeType = val;
										})
										setAttributes({ gsapAnimation: newEaseType });
									}}
									{...premiumProps}
									proValues={['elastic(0.3, 0.2)', 'bounce.out']}
								/>

								<BControlPro
									className='mt10'
									label={__('Auto Repeat', 'animated-text')}
									checked={repeat}
									onChange={val => setAttributes({ repeat: val })}
									{...premiumProps}
									Component={ToggleControl}
								/>
							</>
						}

						{
							"type7" === theme && <>
								<BControlPro
									label="Animation repeat infinitely"
									checked={autoRepeat}
									onChange={val => {
										const newRepeat = produce(gsapAnimation, draft => {
											draft.autoRepeat = val;
										})
										setAttributes({ gsapAnimation: newRepeat });
									}}
									help={
										autoRepeat
											? "The animation will repeat infinitely."
											: "The animation will play only once."
									}
									{...premiumProps}
									Component={ToggleControl}
								/>

								<BControlPro
									label="Animation Duration"
									value={animationDuration}
									onChange={(val) => {
										const newSpeed = produce(gsapAnimation, draft => {
											draft.animationDuration = val;
										})
										setAttributes({ gsapAnimation: newSpeed });
									}}
									step={0.1}
									min={0.1}
									max={5}
									{...premiumProps}
									Component={RangeControl}
								/>
							</>
						}

						{
							"type8" === theme && <>
								<BControlPro
									label="Typing Speed (MS)"
									value={typingSpeed}
									onChange={(val) => {
										const newSpeed = produce(gsapAnimation, draft => {
											draft.typingSpeed = val;
										})
										setAttributes({ gsapAnimation: newSpeed });
									}}
									step={1}
									min={10}
									max={500}
									help="Custom set typing speed milliseconds"
									{...premiumProps}
									Component={RangeControl}
								/>

								<BControlPro
									label="Typing repeat infinitely."
									checked={autoRepeat}
									onChange={val => {
										const newRepeat = produce(gsapAnimation, draft => {
											draft.autoRepeat = val;
										})
										setAttributes({ gsapAnimation: newRepeat });
									}}
									help={
										autoRepeat
											? "The animation will repeat infinitely."
											: "The animation will play only once."
									}
									{...premiumProps}
									Component={ToggleControl}
								/>

								<BControlPro
									label="Restart delay timing"
									value={reStartTime}
									onChange={(val) => {
										const newSpeed = produce(gsapAnimation, draft => {
											draft.reStartTime = val;
										})
										setAttributes({ gsapAnimation: newSpeed });
									}}
									step={500}
									min={500}
									max={5000}
									{...premiumProps}
									Component={RangeControl}
								/>


							</>
						}

						{
							"type9" === theme && <>

								<BControlPro
									className='mt10'
									label={__('Auto Repeat', 'animated-text')}
									checked={repeat}
									onChange={val => setAttributes({ repeat: val })}
									{...premiumProps}
									Component={ToggleControl}
								/>

								<BControlPro
									className='mt10'
									label="Animation Speed (MS)"
									value={typingSpeed}
									onChange={(val) => {
										const newSpeed = produce(gsapAnimation, (draft) => {
											draft.typingSpeed = val;
										});

										setAttributes({ gsapAnimation: newSpeed });

										// Calculate display time
										const duration = val * content?.length + 2000;
										setAlertAnimationSpeed(duration);

										// Hide after 'val' milliseconds dynamically
										setTimeout(() => {
											setAlertAnimationSpeed(null);
										}, duration);
									}}
									step={1}
									min={10}
									max={5000}
									help="Custom set typing speed milliseconds"
									{...premiumProps}
									Component={RangeControl}
									disabled={alertAnimationSpeed !== null}
								/>

								{/* Show typingSpeed dynamically for its duration */}
								{alertAnimationSpeed !== null && (
									<p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
										Please wait until the animation complete: {alertAnimationSpeed}ms
									</p>
								)}
							</>
						}

						{
							"type10" === theme && <>
								<SelectControlPro
									label="Animate Type"
									labelPosition="left"
									value={animateType}
									options={animateTypeOptions}
									onChange={(val) => {
										const newEaseType = produce(gsapAnimation, draft => {
											draft.animateType = val;
										})
										setAttributes({ gsapAnimation: newEaseType });
									}}
									{...premiumProps}
									proValues={['wave', 'bounce', 'glitch']}
								/>
							</>
						}
					</PanelBody>
				</>}


				{'style' === tab.name && <>
					<PanelBody className='bPlPanelBody' title={__('Animated Text', 'animated-text')}>
						<Background label={__('Background:', 'animated-text')} value={background} onChange={val => setAttributes({ background: val })} defaults={{ color: '#0000' }} />

						{
							"type7" === theme ? <Typography className='mt10' label={__('Typography:', 'animated-text')} value={typography} onChange={val => setAttributes({ typography: val })} defaults={{ fontSize: { desktop: 22, tablet: 20, mobile: 18 } }} isFamily={false} /> : <Typography className='mt10' label={__('Typography:', 'animated-text')} value={typography} onChange={val => setAttributes({ typography: val })} defaults={{ fontSize: { desktop: 22, tablet: 20, mobile: 18 } }} maxFontSize={300} />
						}

						{
							("default" === theme || "type1" === theme || "type2" === theme || "type4" === theme || "type5" === theme || "type6" === theme || "type7" === theme || "type8" === theme || "type10" === theme) && <ColorControl label={__('Color:', 'animated-text')} value={color} onChange={val => setAttributes({ color: val })} />
						}

						{
							("type3" === theme) && <>
								<BControlPro className='mt10' label={__('Random Color', 'animated-text')} checked={randomColor} onChange={val => {
									const newCustom = produce(gsapAnimation, draft => {
										draft.randomColor = val;
									})
									setAttributes({ gsapAnimation: newCustom });
								}}
									help={randomColor ? 'Default set automatic random color' : 'You set now custom color apply'}
									{...premiumProps}
									Component={ToggleControl}
								/>

								{
									randomColor ? "" : <ColorControl label={__('Color:', 'animated-text')} value={color} onChange={val => setAttributes({ color: val })} />
								}
							</>
						}

						{
							("type9" === theme) && <>
								<BControlPro className='mt10' label={__('Random Color', 'animated-text')} checked={randomColor} onChange={val => {
									const newCustom = produce(gsapAnimation, draft => {
										draft.randomColor = val;
									})
									setAttributes({ gsapAnimation: newCustom });
									// Calculate display time
									const duration = val * content?.length + 4000;
									setAlertRandomColor(duration);

									// Hide after 'val' milliseconds dynamically
									setTimeout(() => {
										setAlertRandomColor(null);
									}, duration);
								}}
									help={randomColor ? 'Default set automatic random color' : 'You set now custom color apply'}
									{...premiumProps}
									Component={ToggleControl}
									disabled={alertRandomColor !== null}
								/>

								{/* Show typingSpeed dynamically for its duration */}
								{alertRandomColor !== null && (
									<p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
										Please wait until the animation complete: {alertRandomColor}ms
									</p>
								)}


								{
									randomColor ? "" : <ColorControl label={__('Color:', 'animated-text')} value={color} onChange={val => setAttributes({ color: val })} />
								}
							</>
						}

						{
							"type9" === theme ? <>
								<BControlPro
									className='mt10'
									label={__('Text Shadow', 'animated-text')}
									checked={isTextShadow}
									onChange={val => {
										const newCustom = produce(gsapAnimation, draft => {
											draft.isTextShadow = val;
										})
										setAttributes({ gsapAnimation: newCustom });
										// Calculate display time
										const duration = val * content?.length + 4000;
										setAlertShadow(duration);

										// Hide after 'val' milliseconds dynamically
										setTimeout(() => {
											setAlertShadow(null);
										}, duration);
									}}
									{...premiumProps}
									Component={ToggleControl}
									disabled={alertShadow !== null}
								/>

								{/* Show typingSpeed dynamically for its duration */}
								{alertShadow !== null && (
									<p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
										Please wait until the animation complete: {alertShadow}ms
									</p>
								)}

								{
									isTextShadow &&
									<BControlPro
										type="text"
										label={__('Text Shadow', 'animated-text')}
										value={textShadow}
										onChange={val => {
											const newCustom = produce(gsapAnimation, draft => {
												draft.textShadow = val;
											})
											setAttributes({ gsapAnimation: newCustom });
										}}
										{...premiumProps}
										Component={ShadowControl}
									/>
								}
							</> : <>
								<BControlPro
									className='mt10'
									label={__('Text Shadow', 'animated-text')}
									checked={isTextShadow}
									onChange={val => {
										const newCustom = produce(gsapAnimation, draft => {
											draft.isTextShadow = val;
										})
										setAttributes({ gsapAnimation: newCustom });
									}}
									{...premiumProps}
									Component={ToggleControl}
								/>

								{
									isTextShadow &&
									<BControlPro
										type="text"
										label={__('Text Shadow', 'animated-text')}
										value={textShadow}
										onChange={val => {
											const newCustom = produce(gsapAnimation, draft => {
												draft.textShadow = val;
											})
											setAttributes({ gsapAnimation: newCustom });
										}}
										{...premiumProps}
										Component={ShadowControl}
									/>
								}
							</>
						}

						<SpaceControl className='mt20' label={__('Padding:', 'animated-text')} value={padding} onChange={val => setAttributes({ padding: val })} defaults={{ vertical: '15px', horizontal: '15px' }} />

						<BorderControl label={__('Border:', 'animated-text')} value={border} onChange={val => setAttributes({ border: val })} defaults={{ radius: '5px' }} />
					</PanelBody>
				</>}
			</>}</TabPanel>
		</InspectorControls >


		<BlockControls>
			<ToolbarGroup>
				<DropdownMenu
					icon="editor-alignleft"
					label="Text Alignment"
					controls={[
						{
							title: 'Align to Start', // Custom Text
							icon: 'editor-alignleft',
							onClick: () => setAttributes({ alignment: 'left' }),
							isActive: alignment === 'left',
						},
						{
							title: 'Align to Middle', // Custom Text
							icon: 'editor-aligncenter',
							onClick: () => setAttributes({ alignment: 'center' }),
							isActive: alignment === 'center',
						},
						{
							title: 'Align to End', // Custom Text
							icon: 'editor-alignright',
							onClick: () => setAttributes({ alignment: 'right' }),
							isActive: alignment === 'right',
						},
					]}
				/>
			</ToolbarGroup>
		</BlockControls>

		<AboutProModal isProModalOpen={isProModalOpen} setIsProModalOpen={setIsProModalOpen} link={siteLocation}>
			<li>&emsp;<strong>{__('Choose Your Preferred Theme: ', 'animated-text')}</strong>{__('Select the theme of your choice to personalize your experience and give your website the look and feel that suits your style.', 'animated-text')}</li>
			<li>&emsp;<strong>{__('Understanding Text Alignment: ', 'animated-text')}</strong>{__('Text alignment controls the positioning of text, improving readability and design balance.', 'animated-text')}</li>
			<li>&emsp;<strong>{__('Max-Width animation layouts: ', 'animated-text')}</strong>{__('Max-width sets the maximum width of an element, ensuring responsive and flexible layouts.', 'animated-text')}</li>
			<li>&emsp;<strong>{__('Enhancing Design with Text-Shadow: ', 'animated-text')}</strong>{__('Text-shadow adds depth and contrast to text by applying shadow effects, improving readability and aesthetics.', 'animated-text')}</li>
			<li>&emsp;<strong>{__('Optimizing Animation Speed: ', 'animated-text')}</strong>{__('Animation speed controls the duration of transitions, affecting user experience and visual smoothness.', 'animated-text')}</li>
			<li>&emsp;<strong>{__('Mastering Perspective Depth Control: ', 'animated-text')}</strong>{__('Perspective depth control adjusts the 3D depth effect, enhancing realism in visual designs.', 'animated-text')}</li>
			<li>&emsp;<strong>{__('Understanding Transform Origin: ', 'animated-text')}</strong>{__('Transform origin defines the pivot point for transformations, affecting scaling, rotation, and skewing.', 'animated-text')}</li>
			<li>&emsp;<strong>{__('Show/Hide Oscillation Effects: ', 'animated-text')}</strong>{__('Oscillation creates a smooth, back-and-forth movement, often used to add dynamic motion to elements in design.', 'animated-text')}</li>
			<li>&emsp;<strong>{__('Controlling Repeat Behavior in Animations: ', 'animated-text')}</strong>{__('Repeat behavior controls how animations loop, defining whether they restart, alternate, or stop after completing.', 'animated-text')}</li>
			<li>&emsp;<strong>{__('Adjusting Repeat Delay Speed: ', 'animated-text')}</strong>{__('Repeat delay speed sets the time interval between animation cycles, creating a pause before the animation restarts.', 'animated-text')}</li>
			<li>&emsp;<strong>{__('Exploring Animation Effects: ', 'animated-text')}</strong>{__('Animation effects enhance user interaction by adding dynamic movements and transitions to elements on a webpage or interface.', 'animated-text')}</li>
			<li>&emsp;<strong>{__('Applying Random Text Color: ', 'animated-text')}</strong>{__('Random text color changes the color of text dynamically, creating visual variety and interest in designs.', 'animated-text')}</li>
			<li>&emsp;<strong>{__('Applying Forward Font Stretch: ', 'animated-text')}</strong>{__('Forward font stretch adjusts the horizontal spacing of characters, making text wider or narrower for enhanced readability or style.', 'animated-text')}</li>
			<li>&emsp;<strong>{__('Adjusting Animation Duration: ', 'animated-text')}</strong>{__('Animation duration defines the length of time an animation takes to complete, influencing the speed and smoothness of the effect.', 'animated-text')}</li>
			<li>&emsp;<strong>{__('Show/Hide Animation Repeat: ', 'animated-text')}</strong>{__('Infinite animation repeat ensures an animation loops continuously, creating a never-ending effect without stopping.', 'animated-text')}</li>
		</AboutProModal>
	</>;
};


export default withSelect((select) => {
	const { getDeviceType } = select('core/editor');
	const { getSite } = select('core');

	return {
		device: getDeviceType()?.toLowerCase(),
		siteURL: getSite()?.url || ''
	}
})(Settings);