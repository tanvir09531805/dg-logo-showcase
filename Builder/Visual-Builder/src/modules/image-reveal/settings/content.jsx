// External dependencies.
import React from 'react';

// WordPress dependencies
const { __ } = window?.vendor?.wp?.i18n;

// Divi dependencies.
import {
	AdminLabelGroup,
	BackgroundGroup, BorderGroup, BoxShadowGroup,
	FieldContainer,
	LinkGroup, SpacingGroup
} from '@divi/module';
import {
	GroupContainer
} from "@divi/modal";
import {
	ButtonOptionsContainer,
	ColorPickerContainer,
	RangeContainer, RichTextContainer,
	SelectContainer, TextAreaContainer,
	TextContainer, ToggleContainer,
	UploadContainer, WarningContainer,
} from '@divi/field-library';
import { isEmpty, uniqueId } from "lodash";
import { mergeAttrs } from "@divi/module-utils";
import { TabList } from '../../../components/tab-list'


export const Content = ( props ) => {
	const {
		attrs,
		defaultSettingsAttrs
	} = props;
	const attrsWithDefault = mergeAttrs({
		defaultAttrs: defaultSettingsAttrs?.asMutable({deep: true}) ?? {},
		attrs:        attrs.asMutable({deep: true}) ?? {},
	});

	return (
		<React.Fragment>
			<GroupContainer
				id="content_image"
				title={__( 'Image', 'divi_flash' )}
			>
				<FieldContainer
					attrName="content_image.innerContent.field_image"
					label={__( 'Image', 'divi_flash' )}
					description={__( 'Upload your desired image, or type in the URL to the image you would like to display.', 'divi_flash' )}
					features={{
						sticky: false,
						responsive:false,
						hover: false,
						preset: "content",
						dynamicContent: { type: "image" }
					}}
					defaultAttr={defaultSettingsAttrs?.content_image?.innerContent?.field_image}
				>
					<UploadContainer/>
				</FieldContainer>
				{
					!isEmpty(attrsWithDefault?.content_image?.innerContent?.image?.desktop?.value) &&
					<>
						<FieldContainer
							attrName="content.innerContent.alt"
							label={__( 'Alternative Text', 'divi_flash' )}
							description={__( 'This defines the HTML ALT text. A short description of your image can be placed here.', 'divi_flash' )}
							features={{
								sticky: false,
								responsive:false,
								hover: false,
								preset: "content",
								dynamicContent: { type: "text" }
							}}
							defaultAttr={defaultSettingsAttrs?.content_image?.innerContent?.alt}
						>
							<TextContainer/>
						</FieldContainer>
						<FieldContainer
							attrName="content_image.innerContent.title_text"
							label={__( 'Title Text', 'divi_flash' )}
							description={__( 'This defines the HTML Title Text.', 'divi_flash' )}
							features={{
								sticky: false,
								responsive:false,
								hover: false,
								preset: "content",
							}}
							defaultAttr={defaultSettingsAttrs?.content_image?.innerContent?.title_text}
						>
							<TextContainer/>
						</FieldContainer>
					</>
				}
			</GroupContainer>
			<GroupContainer
				id="content_reveal_animation"
				title={__("Reveal Amination",'divi_flash')}
			>
				<FieldContainer
					attrName="content_reveal_animation.decoration.field_reveal_directions"
					label={__( 'Direction', 'divi_flash' )}
					description={__( 'You can control the direction of Reveal Animation.', 'divi_flash' )}
					features={{
						sticky: false,
						responsive:false,
						hover: false,
					}}
					options={ {
						reveal_ltr: { label: __('Left to Right', 'divi_flash'), value: 'reveal_ltr' },
						reveal_rtl: { label: __('Right to Left', 'divi_flash'), value: 'reveal_rtl' },
						reveal_ttb: { label: __('Top to Bottom', 'divi_flash'), value: 'reveal_ttb' },
						reveal_btt: { label: __('Bottom to Top', 'divi_flash'), value: 'reveal_btt' }
					} }
					defaultAttr={defaultSettingsAttrs?.content_reveal_animation?.decoration?.field_reveal_directions}
				>
					<SelectContainer/>
				</FieldContainer>
				<BackgroundGroup
					attrName="content_reveal_animation.decoration.background"
					grouped={false}
					groupLabel="Color"
					fieldLabel="Reveal"
					hidePanels={['image','video','pattern','mask']}
					defaultGroupAttr={ defaultSettingsAttrs?.content_reveal_animation?.decoration?.background?.asMutable( { deep: true } ) ?? {} }
				/>
				<FieldContainer
					attrName="content_reveal_animation.decoration.field_reveal_delay"
					label={__( 'Delay (Sec)', 'divi_flash' )}
					description={__( 'You can control the delay of the Reveal Image Animation.', 'divi_flash' )}
					features={{
						sticky: false,
						hover: false,
						responsive: false
					}}
					defaultAttr={defaultSettingsAttrs?.content_reveal_animation?.decoration.field_reveal_delay}
					max={5}
					min={0}
					step={0.1}
					defaultUnit={""}
					allowedUnits={[]}
					minLimit={0}
				>
					<RangeContainer/>
				</FieldContainer>
				<FieldContainer
					attrName="content_reveal_animation.decoration.field_reveal_animation_time"
					label={__( 'Animation Time (Sec)', 'divi_flash' )}
					description={__( 'You can control the time of Animation to Reveal the Image.', 'divi_flash' )}
					features={{
						sticky: false,
						hover: false,
						responsive: false
					}}
					defaultAttr={defaultSettingsAttrs?.content_reveal_animation?.decoration.field_reveal_animation_time}
					max={5}
					min={0}
					step={0.05}
					defaultUnit={""}
					allowedUnits={[]}
					minLimit={0}
				>
					<RangeContainer/>
				</FieldContainer>
				<FieldContainer
					attrName="content_reveal_animation.decoration.field_reveal_view_port"
					label={__( 'Animate in Viewport (%)', 'divi_flash' )}
					description={__( 'You can control the time of Animation to Reveal the Image.', 'divi_flash' )}
					features={{
						sticky: false,
						hover: false,
						responsive: false
					}}
					defaultAttr={defaultSettingsAttrs?.content_reveal_animation?.decoration.field_reveal_view_port}
					max={100}
					min={1}
					step={5}
					defaultUnit={"%"}
					allowedUnits={['%']}
					minLimit={1}
				>
					<RangeContainer/>
				</FieldContainer>
				<FieldContainer
					attrName="content_reveal_animation.innerContent.field_reveal_effects"
					label={__( 'Effect', 'divi_flash' )}
					description={__( 'Set effect when Image Reveal.', 'divi_flash' )}
					features={{
						sticky: false,
						responsive:false,
						hover: false,
					}}
					options={ {
						none: { label: __('None', 'divi_flash'), value: 'none' },
						difl_bounce: { label: __('Bounce', 'divi_flash'), value: 'difl_bounce' },
						difl_flash: { label: __('Flash', 'divi_flash'), value: 'difl_flash' },
						difl_pulse: { label: __('Pulse', 'divi_flash'), value: 'difl_pulse' },
						difl_rubberBand: { label: __('Rubber Band', 'divi_flash'), value: 'difl_rubberBand' },
						difl_headShake: { label: __('Head Shake', 'divi_flash'), value: 'difl_headShake' },
						difl_swing: { label: __('Swing', 'divi_flash'), value: 'difl_swing' },
						difl_tada: { label: __('Tada', 'divi_flash'), value: 'difl_tada' },
						difl_wobble: { label: __('Wobble', 'divi_flash'), value: 'difl_wobble' },
						difl_jello: { label: __('Jello', 'divi_flash'), value: 'difl_jello' },
						difl_heartBeat: { label: __('Heart Beat', 'divi_flash'), value: 'difl_heartBeat' }
					} }
					defaultAttr={defaultSettingsAttrs?.content_reveal_animation?.innerContent?.field_reveal_effects}
				>
					<SelectContainer/>
				</FieldContainer>
				{
					"none" !== attrsWithDefault?.content_reveal_animation?.innerContent?.field_reveal_effects?.desktop?.value &&
					<>
						<FieldContainer
							attrName="content_reveal_animation.decoration.field_reveal_effect_delay"
							label={__( 'Effect Delay (Sec)', 'divi_flash' )}
							description={__( 'If you would like to add a delay before your animation runs you can designate that delay here in seconds. This can be useful when using multiple animated modules together.', 'divi_flash' )}
							features={{
								sticky: false,
								hover: false,
								responsive: false
							}}
							defaultAttr={defaultSettingsAttrs?.content_reveal_animation?.decoration.field_reveal_effect_delay}
							max={5}
							min={0}
							step={0.1}
							defaultUnit={""}
							allowedUnits={[]}
							minLimit={0}
						>
							<RangeContainer/>
						</FieldContainer>
						<FieldContainer
							attrName="content_reveal_animation.decoration.field_reveal_effect_animation_time"
							label={__( 'Effect Time (Sec)', 'divi_flash' )}
							description={__( 'If you would like to add a time of your animation runs you can designate that time here in seconds. This can be useful when using multiple animated modules together.', 'divi_flash' )}
							features={{
								sticky: false,
								hover: false,
								responsive: false
							}}
							defaultAttr={defaultSettingsAttrs?.content_reveal_animation?.decoration.field_reveal_effect_animation_time}
							max={5}
							min={0}
							step={0.05}
							defaultUnit={""}
							allowedUnits={[]}
							minLimit={0}
						>
							<RangeContainer/>
						</FieldContainer>
					</>
				}
			</GroupContainer>
			<GroupContainer
				id="content_placeholder"
				title={__("Placeholder",'divi_flash')}
			>
				<BackgroundGroup
					attrName="content_placeholder.decoration.background"
					grouped={false}
					groupLabel=""
					fieldLabel=""
					hidePanels={['video','pattern','mask']}
					defaultGroupAttr={ defaultSettingsAttrs?.content_placeholder?.decoration?.background?.asMutable( { deep: true } ) ?? {} }
				/>
				<BorderGroup
					attrName="content_placeholder.decoration.border"
					grouped={false}
					fields={{
						stylesTabNav:      { label: 'Border Styles', render: false },
						styles:            { label: '', render: false },
						stylesTabbedWidth: { label: 'Border Width', render: false },
						stylesTabbedColor: { label: 'Border Color', render: false },
						stylesTabbedStyle: { label: 'Border Style', render: false },
					}}
					defaultGroupAttr={ defaultSettingsAttrs?.content_placeholder?.decoration?.border?.asMutable( { deep: true } ) ?? {} }
				/>
				<BoxShadowGroup
					attrName="content_placeholder.decoration.boxShadow"
					grouped={false}
					defaultGroupAttr={ defaultSettingsAttrs?.content_placeholder?.decoration?.boxShadow?.asMutable( { deep: true } ) ?? {} }
				/>
			</GroupContainer>
			<GroupContainer
				id="content_overlay"
				title={__("Overlay",'divi_flash')}
			>
				<FieldContainer
					attrName="content_overlay.innerContent.field_overlay_enable"
					label={__( 'Enable', 'divi_flash' )}
					description={__( 'If enabled, user can set an overlay over the Image.', 'divi_flash' )}
					features={{
						sticky: false,
						responsive: false,
						hover: false,
					}}
					options={ {
						off: { label: __('No', 'divi_flash'), value: 'off' },
						on: { label: __('Yes', 'divi_flash'), value: 'on' }
					} }
					defaultAttr={defaultSettingsAttrs?.content_overlay?.innerContent?.field_overlay_enable}
				>
					<ToggleContainer/>
				</FieldContainer>
				{
					"on" === attrsWithDefault?.content_overlay?.innerContent?.field_overlay_enable?.desktop?.value &&
					<>
						<FieldContainer
							attrName="content_overlay.decoration.field_overlay_color"
							label={__( 'Color on Default', 'divi_flash' )}
							description={__( 'Set an overlay color, it will be visible over the Image.', 'divi_flash' )}
							features={{
								sticky: false,
								responsive: false,
								hover: false,
							}}
							defaultAttr={defaultSettingsAttrs?.content_overlay?.decoration?.field_overlay_color}
						>
							<ColorPickerContainer/>
						</FieldContainer>
						<FieldContainer
							attrName="content_overlay.decoration.field_overlay_opacity"
							label={__( 'Opacity', 'divi_flash' )}
							description={__( 'Define how transparent or opaque overlay color should be.', 'divi_flash' )}
							features={{
								sticky: false,
								hover: false,
								responsive: false
							}}
							defaultAttr={defaultSettingsAttrs?.content_overlay?.decoration.field_overlay_opacity}
							max={1}
							min={0}
							step={0.01}
							defaultUnit={""}
							allowedUnits={[]}
							minLimit={0}
						>
							<RangeContainer/>
						</FieldContainer>
					</>
				}
			</GroupContainer>
			<GroupContainer
				id="content_hover_overlay"
				title={__("Hover",'divi_flash')}
			>
				{
					"on" !== attrsWithDefault?.content_hover_overlay?.innerContent?.field_hover_image_effect_enable?.desktop?.value &&
					<>
						<FieldContainer
							attrName="content_hover_overlay.innerContent.field_hover_overlay_enable"
							label={__( 'Enable Overlay', 'divi_flash' )}
							description={__( 'If enabled, an overlay color will be displayed over the image when the mouse hovers.', 'divi_flash' )}
							features={{
								sticky: false,
								responsive: false,
								hover: false,
							}}
							options={ {
								off: { label: __('No', 'divi_flash'), value: 'off' },
								on: { label: __('Yes', 'divi_flash'), value: 'on' }
							} }
							defaultAttr={defaultSettingsAttrs?.content_hover_overlay?.innerContent?.field_hover_overlay_enable}
						>
							<ToggleContainer/>
						</FieldContainer>
						{
							"on" === attrsWithDefault?.content_hover_overlay?.innerContent?.field_hover_overlay_enable?.desktop?.value &&
							<>
								<FieldContainer
									attrName="content_hover_overlay.decoration.field_hover_overlay_color"
									label={__( 'Color', 'divi_flash' )}
									description={__( 'Set a color. This color will be visible when the mouse hovers over the image.', 'divi_flash' )}
									features={{
										sticky: false,
										responsive: false,
										hover: false,
									}}
									defaultAttr={defaultSettingsAttrs?.content_hover_overlay?.decoration?.field_hover_overlay_color}
								>
									<ColorPickerContainer/>
								</FieldContainer>
								<FieldContainer
									attrName="content_hover_overlay.decoration.field_hover_overlay_opacity"
									label={__( 'Opacity', 'divi_flash' )}
									description={__( 'Define how transparent or opaque hover overlay color should be.', 'divi_flash' )}
									features={{
										sticky: false,
										responsive: false,
										hover: false,
									}}
									defaultAttr={defaultSettingsAttrs?.content_hover_overlay?.decoration.field_hover_overlay_opacity}
									max={1}
									min={0}
									step={0.1}
									defaultUnit={""}
									allowedUnits={[]}
									minLimit={0}
								>
									<RangeContainer/>
								</FieldContainer>
								<FieldContainer
									attrName="content_hover_overlay.innerContent.field_hover_overlay_arrive_from"
									label={__( 'Styles', 'divi_flash' )}
									description={__( 'You can control the overlay style when the mouse hovers.', 'divi_flash' )}
									features={{
										sticky: false,
										responsive: false,
										hover: false,
									}}
									options={ {
										top: { label: __('Top to Bottom', 'divi_flash'), value: 'top' },
										right: { label: __('Right to Left', 'divi_flash'), value: 'right' },
										bottom: { label: __('Bottom to Top', 'divi_flash'), value: 'bottom' },
										left: { label: __('Left to Right', 'divi_flash'), value: 'left' },
										linear: { label: __('Linear', 'divi_flash'), value: 'linear' },
										ease_in_out: { label: __('Ease In Out', 'divi_flash'), value: 'ease_in_out' },
										ease: { label: __('Ease', 'divi_flash'), value: 'ease' },
										ease_in: { label: __('Ease In', 'divi_flash'), value: 'ease_in' },
										ease_out: { label: __('Ease Out', 'divi_flash'), value: 'ease_out' }
									} }
									defaultAttr={defaultSettingsAttrs?.content_hover_overlay?.innerContent?.field_hover_overlay_arrive_from}
								>
									<SelectContainer/>
								</FieldContainer>
								<FieldContainer
									attrName="content_hover_overlay.innerContent.field_hover_overlay_content_arrive_from"
									label={__( 'Text Content Reveal', 'divi_flash' )}
									description={__( 'You can control the Content when the mouse hovers.', 'divi_flash' )}
									features={{
										sticky: false,
										responsive: false,
										hover: false,
									}}
									options={ {
										top: { label: __('Top', 'divi_flash'), value: 'top' },
										right: { label: __('Right', 'divi_flash'), value: 'right' },
										bottom: { label: __('Bottom', 'divi_flash'), value: 'bottom' },
										left: { label: __('Left', 'divi_flash'), value: 'left' }
									} }
									defaultAttr={defaultSettingsAttrs?.content_hover_overlay?.innerContent?.field_hover_overlay_content_arrive_from}
								>
									<SelectContainer/>
								</FieldContainer>
								<FieldContainer
									attrName="content_hover_overlay.decoration.field_hover_overlay_transition_delay"
									label={__( 'Animation Delay', 'divi_flash' )}
									description={__( 'If you would like to add a delay before your animation runs you can designate that delay here in seconds. This can be useful when using multiple animated modules together.', 'divi_flash' )}
									features={{
										sticky: false,
										responsive: false,
										hover: false,
									}}
									defaultAttr={defaultSettingsAttrs?.content_hover_overlay?.decoration.field_hover_overlay_transition_delay}
									max={3}
									min={0}
									step={0.1}
									defaultUnit={"s"}
									allowedUnits={['s']}
									minLimit={0}
								>
									<RangeContainer/>
								</FieldContainer>
								<FieldContainer
									attrName="content_hover_overlay.decoration.field_hover_overlay_transition_time"
									label={__( 'Animation Delay', 'divi_flash' )}
									description={__( 'If you would like to add a delay before your animation runs you can designate that delay here in seconds. This can be useful when using multiple animated modules together.', 'divi_flash' )}
									features={{
										sticky: false,
										hover: false,
										responsive: false
									}}
									defaultAttr={defaultSettingsAttrs?.content_hover_overlay?.decoration.field_hover_overlay_transition_time}
									max={3}
									min={0}
									step={0.5}
									defaultUnit={"s"}
									allowedUnits={['s']}
									minLimit={0}
								>
									<RangeContainer/>
								</FieldContainer>
								<FieldContainer
									attrName="content_hover_overlay.innerContent.field_hover_overlay_content_enable"
									label={__( 'Content', 'divi_flash' )}
									description={__( 'If enabled, you can set content on the hover overlay, it will be displayed with hover overlay when the mouse hovers.', 'divi_flash' )}
									features={{
										sticky: false,
										hover: false,
										responsive: false
									}}
									options={ {
										off: { label: __('No', 'divi_flash'), value: 'off' },
										on: { label: __('Yes', 'divi_flash'), value: 'on' }
									} }
									defaultAttr={defaultSettingsAttrs?.content_hover_overlay?.innerContent?.field_hover_overlay_content_enable}
								>
									<ToggleContainer/>
								</FieldContainer>
								{
									"on" === attrsWithDefault?.content_hover_overlay?.innerContent?.field_hover_overlay_content_enable?.desktop?.value &&
									<>
										<TabList
											tabs={{
												hover_overlay_title_tab: {
													label: __( 'Title', 'divi_flash' ),
													component: <>
														<FieldContainer
															attrName="content_hover_overlay.innerContent.field_hover_content_title_text"
															label={__( 'Title Text', 'divi_flash' )}
															description={__( 'Set the title of the hover overlay content.', 'divi_flash' )}
															features={{
																sticky: false,
																responsive:false,
																hover: false,
															}}
															defaultAttr={defaultSettingsAttrs?.content_hover_overlay?.innerContent?.field_hover_content_title_text}
														>
															<TextContainer/>
														</FieldContainer>
													</>
												},
												hover_overlay_desc_tab: {
													label: __( 'Description', 'divi_flash' ),
													component: <>
														<FieldContainer
															attrName="content_hover_overlay.innerContent.field_hover_content_desc_text"
															label={__( 'Description Text', 'divi_flash' )}
															description={__( 'Set the description of the hover overlay content.', 'divi_flash' )}
															features={{
																sticky: false,
																responsive:false,
																hover: false,
															}}
															defaultAttr={defaultSettingsAttrs?.content_hover_overlay?.innerContent?.field_hover_content_desc_text}
														>
															<RichTextContainer/>
														</FieldContainer>
													</>
												}
											}}
										/>
										<FieldContainer
											attrName="content_hover_overlay.decoration.field_hover_overlay_content_placement"
											label={__( 'Content Placement', 'divi_flash' )}
											description={__( 'You can control the placement of the hover overlay content.', 'divi_flash' )}
											features={{
												sticky: false,
												hover: false,
												responsive: false
											}}
											options={ {
												start: { label: __('Top', 'divi_flash'), value: 'start' },
												center: { label: __('Center', 'divi_flash'), value: 'center' },
												end: { label: __('Bottom', 'divi_flash'), value: 'text' }
											} }
											defaultAttr={defaultSettingsAttrs?.content_hover_overlay?.decoration?.field_hover_overlay_content_placement}
										>
											<SelectContainer/>
										</FieldContainer>
										<FieldContainer
											attrName='content_hover_overlay.decoration.field_hover_overlay_content_alignment'
											label={__( 'Content Alignment', 'divi_flash' )}
											description={__( 'You can control the hover overlay content alignment.', 'divi_flash' )}
											features={{
												sticky: false,
												hover: false,
												responsive: false
											}}
											options={{
												"start": {
													"icon": "divi/align-left"
												},
												"center": {
													"icon": "divi/align-center"
												},
												"end": {
													"icon": "divi/align-right"
												}
											}
											}
											defaultAttr={defaultSettingsAttrs?.content_hover_overlay?.decoration?.field_hover_overlay_content_alignment}
										>
											<ButtonOptionsContainer
												showLabel={false}
											/>
										</FieldContainer>
										<SpacingGroup
											attrName="field_hover_overlay_container_padding.decoration.spacing"
											grouped={false}
											fields={{
												margin: {
													render: false,
												},
											}}
											defaultGroupAttr={ defaultSettingsAttrs?.field_hover_overlay_container_padding?.decoration?.spacing?.asMutable( { deep: true } ) ?? {} }
										/>
									</>
								}
							</>
						}
					</>
				}
				{
					"on" !== attrsWithDefault?.content_hover_overlay?.innerContent?.field_hover_overlay_enable?.desktop?.value &&
					<>
						<FieldContainer
							attrName="content_hover_overlay.innerContent.field_hover_image_effect_enable"
							label={__( 'Enable Image Effect', 'divi_flash' )}
							description={__( 'If enabled, you can set few effects on image,this effect will be display when mouse hover.', 'divi_flash' )}
							features={{
								sticky: false,
								hover: false,
								responsive: false
							}}
							options={ {
								off: { label: __('No', 'divi_flash'), value: 'off' },
								on: { label: __('Yes', 'divi_flash'), value: 'on' }
							} }
							defaultAttr={defaultSettingsAttrs?.content_hover_overlay?.innerContent?.field_hover_image_effect_enable}
						>
							<ToggleContainer/>
						</FieldContainer>
						{
							"on" === attrsWithDefault?.content_hover_overlay?.innerContent?.field_hover_image_effect_enable?.desktop?.value &&
							<>
								<FieldContainer
									attrName="content_hover_overlay.innerContent.field_effect_style"
									label={__( 'Effects', 'divi_flash' )}
									description={__( 'Choose an effect, its action will be visible when mouse hovers.', 'divi_flash' )}
									features={{
										sticky: false,
										hover: false,
										responsive: false
									}}
									options={ {
										none: { label: __('None', 'divi_flash'), value: 'none' },
										zoom_in: { label: __('Zoom In', 'divi_flash'), value: 'zoom_in' },
										zoom_n_rotate: { label: __('Zoom & Rotate', 'divi_flash'), value: 'zoom_n_rotate' },
										blur_out_with_zooming_in: { label: __('Blur Out with Zooming Out', 'divi_flash'), value: 'blur_out_with_zooming_in' },
										colorize_with_zooming_in: { label: __('Colorize with Zooming In', 'divi_flash'), value: 'colorize_with_zooming_in' }
									} }
									defaultAttr={defaultSettingsAttrs?.content_hover_overlay?.innerContent?.field_effect_style}
								>
									<SelectContainer/>
								</FieldContainer>
								{
									"none" !== attrsWithDefault?.content_hover_overlay?.innerContent?.field_effect_style?.desktop?.value &&
									<>
										<FieldContainer
											attrName="content_hover_overlay.decoration.field_zoom_scale"
											label={__( 'Zooming Range', 'divi_flash' )}
											description={__( 'You can control the transition time of the Effects.', 'divi_flash' )}
											features={{
												sticky: false,
												hover: true,
												responsive: true
											}}
											defaultAttr={defaultSettingsAttrs?.content_hover_overlay?.decoration.field_zoom_scale}
											max={5}
											min={1}
											step={0.1}
											defaultUnit={""}
											allowedUnits={[]}
											minLimit={1}
										>
											<RangeContainer/>
										</FieldContainer>
									</>
								}
								{
									"blur_out_with_zooming_in" === attrsWithDefault?.content_hover_overlay?.innerContent?.field_effect_style?.desktop?.value &&
									<>
										<FieldContainer
											attrName="content_hover_overlay.decoration.field_zooming_blur_out_time"
											label={__( 'Blur Out Animation Duration (Sec)', 'divi_flash' )}
											description={__( 'You can control the Animation Blur Out time of the Effect.', 'divi_flash' )}
											features={{
												sticky: false,
												hover: false,
												responsive: false
											}}
											defaultAttr={defaultSettingsAttrs?.content_hover_overlay?.decoration.field_zooming_blur_out_time}
											max={5}
											min={0}
											step={0.05}
											defaultUnit={""}
											allowedUnits={[]}
											minLimit={0}
										>
											<RangeContainer/>
										</FieldContainer>
										<FieldContainer
											attrName="content_hover_overlay.decoration.field_zooming_blur_level"
											label={__( 'Blur Level (px)', 'divi_flash' )}
											description={__( '', 'divi_flash' )}
											features={{
												sticky: false,
												hover: false,
												responsive: false
											}}
											defaultAttr={defaultSettingsAttrs?.content_hover_overlay?.decoration.field_zooming_blur_level}
											max={15}
											min={0}
											step={0.5}
											defaultUnit={""}
											allowedUnits={[]}
											minLimit={0}
										>
											<RangeContainer/>
										</FieldContainer>
									</>
								}
								{
									"colorize_with_zooming_in" === attrsWithDefault?.content_hover_overlay?.innerContent?.field_effect_style?.desktop?.value &&
									<>
										<FieldContainer
											attrName="content_hover_overlay.decoration.field_grayscale"
											label={__( 'Gray Scale Level (%)', 'divi_flash' )}
											description={__( 'You can control the Gray Scale of the Effect.', 'divi_flash' )}
											features={{
												sticky: false,
												hover: false,
												responsive: false
											}}
											defaultAttr={defaultSettingsAttrs?.content_hover_overlay?.decoration.field_grayscale}
											max={100}
											min={0}
											step={1}
											defaultUnit={""}
											allowedUnits={[]}
											minLimit={0}
										>
											<RangeContainer/>
										</FieldContainer>
									</>
								}
								{
									"zoom_n_rotate" === attrsWithDefault?.content_hover_overlay?.innerContent?.field_effect_style?.desktop?.value &&
									<>
										<FieldContainer
											attrName="content_hover_overlay.decoration.field_zoom_rotate"
											label={__( 'Rotate Range (Degree)', 'divi_flash' )}
											description={__( 'You can control the Gray Scale of the Effect.', 'divi_flash' )}
											features={{
												sticky: false,
												hover: true,
												responsive: true
											}}
											defaultAttr={defaultSettingsAttrs?.content_hover_overlay?.decoration.field_zoom_rotate}
											max={90}
											min={0}
											step={1}
											defaultUnit={""}
											allowedUnits={[]}
											minLimit={0}
										>
											<RangeContainer/>
										</FieldContainer>
									</>
								}
								{
									"none" !== attrsWithDefault?.content_hover_overlay?.innerContent?.field_effect_style?.desktop?.value &&
									<>
										<FieldContainer
											attrName="content_hover_overlay.decoration.field_zooming_time"
											label={__( 'Animation Duration (Sec)', 'divi_flash' )}
											description={__( 'You can control the Animation time of the Effect.', 'divi_flash' )}
											features={{
												sticky: false,
												hover: false,
												responsive: false
											}}
											defaultAttr={defaultSettingsAttrs?.content_hover_overlay?.decoration.field_zooming_time}
											max={5}
											min={0}
											step={0.05}
											defaultUnit={""}
											allowedUnits={[]}
											minLimit={0}
										>
											<RangeContainer/>
										</FieldContainer>
										<FieldContainer
											attrName="content_hover_overlay.decoration.field_Speed_curve"
											label={__( 'Animation Speed Curve', 'divi_flash' )}
											description={__( 'Here you can adjust the easing method of your animation. Easing your animation in and out will create a smoother effect when compared to a linear speed curve.', 'divi_flash' )}
											features={{
												sticky: false
											}}
											options={ {
												'ease-in-out': { label: __('Ease-In-Out', 'divi_flash'), value: 'ease-in-out' },
												'ease-in': { label: __('Ease-In', 'divi_flash'), value: 'ease-in' },
												'ease-out': { label: __('Ease-Out', 'divi_flash'), value: 'ease-out' },
												'linear': { label: __('Linear', 'divi_flash'), value: 'linear' }
											} }
											defaultAttr={defaultSettingsAttrs?.content_hover_overlay?.decoration?.field_Speed_curve}
										>
											<SelectContainer/>
										</FieldContainer>
									</>
								}
							</>
						}
					</>
				}

			</GroupContainer>
			<GroupContainer
				id="content_caption"
				title={__("Caption",'divi_flash')}
			>
				<FieldContainer
					attrName="content_caption.innerContent.field_caption_enable"
					label={__( 'Enable', 'divi_flash' )}
					description={__( 'If enabled, user can set a caption for the image.', 'divi_flash' )}
					features={{
						sticky: false
					}}
					options={ {
						off: { label: __('No', 'divi_flash'), value: 'off' },
						on: { label: __('Yes', 'divi_flash'), value: 'on' }
					} }
					defaultAttr={defaultSettingsAttrs?.content_caption?.innerContent?.field_caption_enable}
				>
					<ToggleContainer/>
				</FieldContainer>
				{
					"on" === attrsWithDefault?.content_caption?.innerContent?.field_caption_enable?.desktop?.value &&
					<>
						<FieldContainer
							attrName="content_caption.innerContent.field_caption_title"
							label={__( 'Text', 'divi_flash' )}
							description={__( 'Add caption for the image.', 'divi_flash' )}
							features={{
								sticky: false
							}}
							defaultAttr={defaultSettingsAttrs?.content_caption?.innerContent?.field_caption_title}
						>
							<TextContainer
								value="Your Caption Goes Here"
								defaultValue={"Your Caption Goes Here"}
							/>
						</FieldContainer>
						<FieldContainer
							attrName="content_caption.innerContent.field_caption_placement"
							label={__( 'Placement', 'divi_flash' )}
							description={__( 'You can control the placement of the caption.', 'divi_flash' )}
							features={{
								sticky: false
							}}
							options={ {
								top: { label: __('Top', 'divi_flash'), value: 'top' },
								bottom: { label: __('Bottom', 'divi_flash'), value: 'bottom' }
							} }
							defaultAttr={defaultSettingsAttrs?.content_caption?.innerContent?.field_caption_placement}
						>
							<SelectContainer/>
						</FieldContainer>
						<FieldContainer
							attrName="content_caption.decoration.field_caption_background"
							label={__( 'Background Color', 'divi_flash' )}
							description={__( 'Set background for the caption section.', 'divi_flash' )}
							features={{
								sticky: false
							}}
							defaultAttr={defaultSettingsAttrs?.content_caption?.decoration?.field_caption_background}
						>
							<ColorPickerContainer/>
						</FieldContainer>
						<SpacingGroup
							attrName="content_caption.decoration.spacing"
							fieldLabel=""
							grouped={false}
							fields={{
								margin: {
									render: false,
								},
							}}
							defaultGroupAttr={ defaultSettingsAttrs?.content_caption?.decoration?.spacing?.asMutable( { deep: true } ) ?? {} }
						/>
					</>
				}
			</GroupContainer>
			<GroupContainer
				id="content_link"
				title={__("Link",'divi_flash')}
			>
				<FieldContainer
					attrName="content_link.innerContent.field_lightbox_enable"
					label={__( 'Open in Lightbox', 'divi_flash' )}
					description={__( 'Here you can choose whether or not the image should open in Lightbox. Note: if you select to open the image in Lightbox, url options below will be ignored.', 'divi_flash' )}
					features={{
						sticky: false
					}}
					options={ {
						off: { label: __('No', 'divi_flash'), value: 'off' },
						on: { label: __('Yes', 'divi_flash'), value: 'on' }
					} }
					defaultAttr={defaultSettingsAttrs?.content_link?.innerContent?.field_lightbox_enable}
				>
					<ToggleContainer/>
				</FieldContainer>
				{
					"off" === attrsWithDefault?.content_link?.innerContent?.field_lightbox_enable?.desktop?.value &&
					<>
						<FieldContainer
							attrName="content_link.innerContent.field_link_url"
							label={__( 'Image Link URL', 'divi_flash' )}
							description={__( 'If you would like your image to be a link, input your destination URL here. No link will be created if this field is left blank.', 'divi_flash' )}
							features={{
								sticky: false
							}}
							defaultAttr={defaultSettingsAttrs?.content_link?.innerContent?.field_link_url}
						>
							<TextContainer/>
						</FieldContainer>
						<FieldContainer
							attrName="content_link.innerContent.field_link_target"
							label={__( 'Image Link Target', 'divi_flash' )}
							description={__( 'Here you can choose whether or not your link opens in a new window.', 'divi_flash' )}
							features={{
								sticky: false
							}}
							options={ {
								same_window: { label: __('In The Same Window', 'divi_flash'), value: 'same_window' },
								new_window: { label: __('In The New Tab', 'divi_flash'), value: 'new_window' }
							} }
							defaultAttr={defaultSettingsAttrs?.content_link?.innerContent?.field_link_target}
						>
							<SelectContainer/>
						</FieldContainer>
					</>
				}
			</GroupContainer>
			<BackgroundGroup
				defaultGroupAttr={ defaultSettingsAttrs?.module?.decoration?.background?.asMutable( { deep: true } ) ?? {} }
			/>
			<AdminLabelGroup
				defaultGroupAttr={ defaultSettingsAttrs?.module.meta?.adminLabel }
			/>
		</React.Fragment>
	);
}