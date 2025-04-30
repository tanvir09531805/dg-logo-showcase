// External dependencies.
import React, { useState } from 'react';

// WordPress dependencies
const { __ } = window?.vendor?.wp?.i18n;

// Divi dependencies.
import {
	AdminLabelGroup,
	BackgroundGroup,
	FieldContainer,
} from "@divi/module";
import { GroupContainer, GroupTabs, TabContainer, Tab, Tabs } from "@divi/modal";
import {
	IconPickerContainer,
	RangeContainer,
	RichTextContainer,
	TextContainer,
	UploadContainer,
	ToggleContainer,
	SelectContainer,
	ColorPickerContainer,
} from "@divi/field-library";

import { Tooltip, TooltipSettings } from "../../../components/tooltip";

export const Content = ( props ) => {
	const { attrs, defaultSettingsAttrs } = props
	const [ activeTab, setActiveTab ] = useState()

	const innerContentValue = ( field_id, device ) => attrs?.[ field_id ]?.innerContent?.[ device ]?.value || null;

	const TabList = ( { tabs } ) => {
		if ( undefined === activeTab ) { setActiveTab( Object.keys( tabs )[ 0 ] ) }
		return (
			<>
				<GroupTabs
					tabs={tabs}
					showLabel={true}
					showIcon={true}
					activeTab={activeTab}
					onClick={( tab ) => {
						const tab_value = tab.target.value || tab.target.parentElement?.value
						// console.log( tab_value );
						setActiveTab( tab_value )
					}}
					onContextMenu={( menu ) => {
						// console.log( "menu", menu )
					}}
				/>
				{
					tabs[ activeTab ]?.component
				}
			</>
		)
	}

	const generate_transition_fields = (prefix, labelPrefix, args = {}) => {
		return <>
			{
				(!args.exclude?.includes('duration')) &&
				<FieldContainer
					label={__(`${labelPrefix} Transition Duration [Sec]`,'divi_flash')}
					description={__('','divi_flash')}
					attrName='buttonAnimationTransition.decoration'
					subName={`${prefix}_transition_duration`}
					defaultAttr={defaultSettingsAttrs?.buttonAnimationTransition?.decoration}
				>
					<RangeContainer
						max={10.0}
						min={1.0}
						step={0.1}
						defaultUnit={""}
						allowedUnits={[]}
						minLimit={0.0}
					/>
				</FieldContainer>
			}
			{
				(!args.exclude?.includes('delay')) &&
				<FieldContainer
					label={__(`${labelPrefix} Transition Delay [Sec]`,'divi_flash')}
					description={__('','divi_flash')}
					attrName='buttonAnimationTransition.decoration'
					subName={`${prefix}_transition_delay`}
					defaultAttr={defaultSettingsAttrs?.buttonAnimationTransition?.decoration}
				>
					<RangeContainer
						max={10.0}
						min={1.0}
						step={0.1}
						defaultUnit={""}
						allowedUnits={[]}
						minLimit={0}
					/>
				</FieldContainer>
			}
			{
				(!args.exclude?.includes('timing_function')) &&
				<FieldContainer
					label={__(`${labelPrefix} Transition Timing Function`,'divi_flash')}
					description={__('','divi_flash')}
					attrName='buttonAnimationTransition.decoration'
					subName={`${prefix}_transition_timing_function`}
					options={
						{
							'ease': { label: __( 'Ease', 'divi_flash' ), value: 'ease' },
							'linear': { label: __( 'Linear', 'divi_flash' ), value: 'linear' },
							'ease-in': { label: __( 'Ease In', 'divi_flash' ), value: 'ease-in' },
							'ease-out': { label: __( 'Ease Out', 'divi_flash' ), value: 'ease-out' },
							'ease-in-out': { label: __( 'Ease In Out', 'divi_flash' ), value: 'ease-in-out' },
						}
					}
					defaultAttr={defaultSettingsAttrs?.buttonAnimationTransition?.decoration}
				>
					<SelectContainer/>
				</FieldContainer>
			}
		</>
	}

	return (
		<React.Fragment>
			<GroupContainer
				id="main_content"
				title={__( 'Content', 'divi_flash' )}
			>
				<FieldContainer
					attrName="button_text.innerContent"
					label={__( 'Text', 'divi_flash' )}
					description={__( 'Input your desired button text.', 'divi_flash' )}
					features={{
						sticky: false,
						hover: true,
						responsive: false,
						dynamicContent: {
							type: "text"
						}
					}}
					defaultAttr={defaultSettingsAttrs?.button_text?.innerContent}
				>
					<TextContainer/>
				</FieldContainer>
				<FieldContainer
					attrName="button_sub_text.innerContent"
					label={__( 'Sub Text', 'divi_flash' )}
					description={__( 'Input your desired button sub text.', 'divi_flash' )}
					features={{
						sticky: false,
						hover: true,
						responsive: false,
						dynamicContent: {
							type: "text"
						}
					}}
				>
					<TextContainer/>
				</FieldContainer>
				<FieldContainer
					attrName="use_button_icon.innerContent"
					label={__( 'Use Button Icon', 'divi_flash' )}
					description={__( '', 'divi_flash' )}
					defaultAttr={defaultSettingsAttrs?.use_button_icon?.innerContent}
					features={{
						sticky: false,
						hover: false,
						responsive: false,
					}}
				>
					<ToggleContainer/>
				</FieldContainer>
				{
					attrs?.use_button_icon?.innerContent?.desktop?.value !== 'off' &&
					<FieldContainer
						attrName='button_icon.innerContent'
						label={__( 'Icon', 'divi_flash' )}
						description={__( '', 'divi_flash' )}
						defaultAttr={defaultSettingsAttrs?.button_icon?.innerContent}
						features={{
							sticky: false,
							hover: true,
							responsive: false,
						}}
					>
						<IconPickerContainer/>
					</FieldContainer>
				}
				{
					attrs?.use_button_icon?.innerContent?.desktop?.value === 'off' &&
					<FieldContainer
						attrName='button_image.innerContent'
						label={__( 'Image', 'divi_flash' )}
						description={__( '', 'divi_flash' )}
						features={{
							sticky: false,
							hover: true,
							responsive: false,
							"dynamicContent": {
								"type": "image"
							}
						}}
					>
						<UploadContainer/>
					</FieldContainer>
				}
			</GroupContainer>
			<GroupContainer
				id="main_settings"
				title={__( 'Settings', 'divi_flash' )}
			>
				<FieldContainer
					attrName='media_placement.decoration'
					label={__( 'Media Placement', 'divi_flash' )}
					description={__( '', 'divi_flash' )}
					features={{
						sticky: false,
						responsive: false
					}}
					options={
						{
							'media_left': { label: __( 'Left', 'divi_flash' ), value: 'media_left' },
							'media_right': { label: __( 'Right', 'divi_flash' ), value: 'media_right' }
						}
					}
					defaultAttr={defaultSettingsAttrs?.media_placement?.decoration}
				>
					<SelectContainer/>
				</FieldContainer>
				<FieldContainer
					attrName='sub_text_placement.innerContent'
					label={__( 'Sub Text Outside', 'divi_flash' )}
					description={__( '', 'divi_flash' )}
					features={{
						sticky: false,
					}}
				>
					<ToggleContainer/>
				</FieldContainer>
			</GroupContainer>
			<GroupContainer
				id="main_hover"
				title={__( 'Hover', 'divi_flash' )}
			>
				<TabList tabs={{
					twoD_hover_elements: {
						label: __( '2D', 'divi_flash' ),
						component: <>
							<FieldContainer
								attrName='two_d_hover_effects.innerContent'
								label={__( 'Select 2D Effect', 'divi_flash' )}
								description={__( '', 'divi_flash' )}
								features={{
									sticky: false,
								}}
								options={
									{
										'dfab_none': { label: __( 'Select Effect', 'divi_flash' ), value: 'dfab_none' },
										'dfab_bounce': { label: __( 'Bounce', 'divi_flash' ), value: 'dfab_bounce' },
										'dfab_flash': { label: __( 'Flash', 'divi_flash' ), value: 'dfab_flash' },
										'dfab_pulse': { label: __( 'Pulse', 'divi_flash' ), value: 'dfab_pulse' },
										'dfab_rubberBand': { label: __( 'Rubber Band', 'divi_flash' ), value: 'dfab_rubberBand' },
										'dfab_headShake': { label: __( 'Head Shake', 'divi_flash' ), value: 'dfab_headShake' },
										'dfab_swing': { label: __( 'Swing', 'divi_flash' ), value: 'dfab_swing' },
										'dfab_tada': { label: __( 'Tada', 'divi_flash' ), value: 'dfab_tada' },
										'dfab_wobble': { label: __( 'Wobble', 'divi_flash' ), value: 'dfab_wobble' },
										'dfab_jello': { label: __( 'Jello', 'divi_flash' ), value: 'dfab_jello' },
										'dfab_heartBeat': { label: __( 'Heart Beat', 'divi_flash' ), value: 'dfab_heartBeat' },
									}
								}
								defaultAttr={defaultSettingsAttrs?.two_d_hover_effects?.innerContent}
							>
								<SelectContainer/>
							</FieldContainer>
							{
								[
									'dfab_bounce',
									'dfab_flash',
									'dfab_pulse',
									'dfab_rubberBand',
									'dfab_headShake',
									'dfab_swing',
									'dfab_tada',
									'dfab_wobble',
									'dfab_jello',
									'dfab_heartBeat'
								].includes(innerContentValue( 'two_d_hover_effects', 'desktop' )) &&
								generate_transition_fields('two_d', "2D", {exclude:['timing_function']})
							}
						</>
					},
					bg_hover_elements: {
						label: __( 'BG', 'divi_flash' ),
						component: <>
							<FieldContainer
								attrName='bg_hover_effects.innerContent'
								label={__( 'Select Hover Background Effect', 'divi_flash' )}
								description={__( '', 'divi_flash' )}
								features={{
									sticky: false,
								}}
								options={
									{
										'dfab_none': { label: __( 'Select Effect', 'divi_flash' ), value: 'dfab_none' },
										'dfab_reveal': { label: __( 'Reveal', 'divi_flash' ), value: 'dfab_reveal' },
										'dfab_ripple': { label: __( 'Ripple', 'divi_flash' ), value: 'dfab_ripple' },
										'dfab_ripple_position_aware': { label: __( 'Ripple Position Aware', 'divi_flash' ), value: 'dfab_ripple_position_aware' },
										'dfab_ripple_two_dot': { label: __( 'Ripple Two Dot', 'divi_flash' ), value: 'dfab_ripple_two_dot' },
										'dfab_door_open': { label: __( 'Door Open', 'divi_flash' ), value: 'dfab_door_open' },
										'dfab_skew': { label: __( 'Skew', 'divi_flash' ), value: 'dfab_skew' },
										'dfab_two_shade': { label: __( 'Two Shade', 'divi_flash' ), value: 'dfab_two_shade' },
									}
								}
								defaultAttr={defaultSettingsAttrs?.bg_hover_effects?.innerContent}
							>
								<SelectContainer/>
							</FieldContainer>
							{
								( attrs?.bg_hover_effects?.innerContent?.desktop?.value === "dfab_reveal" || attrs?.bg_hover_effects?.innerContent?.desktop?.value === "dfab_two_shade" ) &&
								<FieldContainer
									attrName='bg_hover_effect_directions.innerContent'
									label={__( 'Select Hover Background Effect Direction', 'divi_flash' )}
									description={__( '', 'divi_flash' )}
									features={{
										sticky: false,
									}}
									options={
										{
											'dfab_left': { label: __( 'From Left', 'divi_flash' ), value: 'dfab_left' },
											'dfab_right': { label: __( 'From Right', 'divi_flash' ), value: 'dfab_right' },
											'dfab_top': { label: __( 'From Top', 'divi_flash' ), value: 'dfab_top' },
											'dfab_bottom': { label: __( 'From Bottom', 'divi_flash' ), value: 'dfab_bottom' },
										}
									}
									defaultAttr={defaultSettingsAttrs?.bg_hover_effect_directions?.innerContent}
								>
									<SelectContainer/>
								</FieldContainer>
							}
							{
								attrs?.bg_hover_effects?.innerContent?.desktop?.value === "dfab_skew" &&
								<FieldContainer
									attrName='bg_hover_skew_effect_directions.innerContent'
									label={__( 'Select Hover Background Effect Direction', 'divi_flash' )}
									description={__( '', 'divi_flash' )}
									features={{
										sticky: false,
									}}
									options={
										{
											'dfab_top_left': { label: __( 'From Top Left', 'divi_flash' ), value: 'dfab_top_left' },
											'dfab_top_right': { label: __( 'From Top Right', 'divi_flash' ), value: 'dfab_top_right' },
											'dfab_bottom_left': { label: __( 'From Bottom Left', 'divi_flash' ), value: 'dfab_bottom_left' },
											'dfab_bottom_right': { label: __( 'From Bottom Right', 'divi_flash' ), value: 'dfab_bottom_right' },
										}
									}
									defaultAttr={defaultSettingsAttrs?.bg_hover_skew_effect_directions?.innerContent}
								>
									<SelectContainer/>
								</FieldContainer>
							}
							{
								( attrs?.bg_hover_effects?.innerContent?.desktop?.value === "dfab_reveal" || attrs?.bg_hover_effects?.innerContent?.desktop?.value === "dfab_ripple" ) &&
								<FieldContainer
									attrName='bg_hover_effect_hyper.innerContent'
									label={__( 'Add Hypen', 'divi_flash' )}
									description={__( '', 'divi_flash' )}
									features={{
										sticky: false,
									}}
								>
									<ToggleContainer/>
								</FieldContainer>
							}
							{
								( ( attrs?.bg_hover_effects?.innerContent?.desktop?.value === "dfab_reveal" || attrs?.bg_hover_effects?.innerContent?.desktop?.value === "dfab_ripple" ) && attrs?.bg_hover_effect_hyper?.innerContent?.desktop?.value === "on" ) &&
								<FieldContainer
									attrName='bg_hover_hypen_color.decoration'
									label={__( 'Hover Hypen Color', 'divi_flash' )}
									description={__( 'Here you can define a custom hover hypen color.', 'divi_flash' )}
									features={{
										sticky: false,
									}}
								>
									<ColorPickerContainer/>
								</FieldContainer>
							}
							{
								[
									'dfab_reveal',
									'dfab_door_open',
									'dfab_skew',
									'dfab_two_shade'
								].includes( attrs?.bg_hover_effects?.innerContent?.desktop?.value ) &&
								<FieldContainer
									attrName='bg_hover_effect_bounce.innerContent'
									label={__( 'Add Bounce Effect', 'divi_flash' )}
									description={__( '', 'divi_flash' )}
									features={{
										sticky: false,
									}}
								>
									<ToggleContainer/>
								</FieldContainer>
							}
							{
								[
									'dfab_reveal',
									'dfab_ripple',
									'dfab_ripple_position_aware',
									'dfab_ripple_two_dot',
									'dfab_door_open',
									'dfab_skew',
									'dfab_two_shade'
								].includes( attrs?.bg_hover_effects?.innerContent?.desktop?.value ) &&
								<FieldContainer
									attrName='bg_hover_background_color.decoration'
									label={__( 'Hover Background Color', 'divi_flash' )}
									description={__( 'Here you can define a custom hover background color.', 'divi_flash' )}
									features={{
										sticky: false,
									}}
								>
									<ColorPickerContainer/>
								</FieldContainer>
							}
							{
								attrs?.bg_hover_effects?.innerContent?.desktop?.value === 'dfab_two_shade' &&
								<FieldContainer
									attrName='bg_hover_background_secondary_color.decoration'
									label={__( 'Hover Background Secondary Color', 'divi_flash' )}
									description={__( 'Here you can define a custom background color for your icon.', 'divi_flash' )}
									features={{
										sticky: false,
									}}
								>
									<ColorPickerContainer/>
								</FieldContainer>
							}
							{
								[
									'dfab_reveal',
									'dfab_ripple',
									'dfab_ripple_position_aware',
									'dfab_ripple_two_dot',
									'dfab_door_open',
									'dfab_skew',
									'dfab_two_shade'
								].includes(innerContentValue( 'bg_hover_effects', 'desktop' )) &&
								generate_transition_fields('bg', "BG", {})
							}
						</>
					},
					stroke_hover_elements: {
						label: __( 'Stroke', 'divi_flash' ),
						component: <>
							<FieldContainer
								attrName='border_hover_effects.innerContent'
								label={__( 'Select Hover Stroke Effect', 'divi_flash' )}
								description={__( '', 'divi_flash' )}
								features={{
									sticky: false,
								}}
								options={
									{
										'dfab_none': {
											label: __( 'Select Effect', 'divi_flash' ),
											value: 'dfab_none'
										},
										'dfab_border_slide_left': {
											label: __( 'Slide Left', 'divi_flash' ),
											value: 'dfab_border_slide_left'
										},
										'dfab_border_slide_right': {
											label: __( 'Slide Right', 'divi_flash' ),
											value: 'dfab_border_slide_right'
										},
										'dfab_border_outline_center': {
											label: __( 'Outline Anim From Center', 'divi_flash' ),
											value: 'dfab_border_outline_center'
										},
										'dfab_border_outline_left': {
											label: __( 'Outline Anim From Left', 'divi_flash' ),
											value: 'dfab_border_outline_left'
										},
										'dfab_border_outline_right': {
											label: __( 'Outline Anim From Right', 'divi_flash' ),
											value: 'dfab_border_outline_right'
										},
										'dfab_border_outline_top': {
											label: __( 'Outline Anim From Top', 'divi_flash' ),
											value: 'dfab_border_outline_top'
										},
										'dfab_border_outline_bottom': {
											label: __( 'Outline Anim From Bottom', 'divi_flash' ),
											value: 'dfab_border_outline_bottom'
										},
										'dfab_border_outline_vertical': {
											label: __( 'Outline Anim Horizontal', 'divi_flash' ),
											value: 'dfab_border_outline_vertical'
										},
										'dfab_border_outline_horizontal': {
											label: __( 'Outline Anim Vertical', 'divi_flash' ),
											value: 'dfab_border_outline_horizontal'
										},
										'dfab_border_outline_top_left': {
											label: __( 'Outline Anim From Top Left', 'divi_flash' ),
											value: 'dfab_border_outline_top_left'
										},
										'dfab_border_outline_top_right': {
											label: __( 'Outline Anim From top Right', 'divi_flash' ),
											value: 'dfab_border_outline_top_right'
										},
										'dfab_border_outline_bottom_left': {
											label: __( 'Outline Anim From Bottom Left', 'divi_flash' ),
											value: 'dfab_border_outline_bottom_left'
										},
										'dfab_border_outline_bottom_right': {
											label: __( 'Outline Anim From Bottom Right', 'divi_flash' ),
											value: 'dfab_border_outline_bottom_right'
										},
										'dfab_border_outline_1': {
											label: __( 'Outline Anim CC 1', 'divi_flash' ),
											value: 'dfab_border_outline_1'
										},
										'dfab_border_outline_12': {
											label: __( 'Outline Anim CC 2', 'divi_flash' ),
											value: 'dfab_border_outline_12'
										},
										'dfab_border_outline_2': {
											label: __( 'Outline Anim CC 3', 'divi_flash' ),
											value: 'dfab_border_outline_2'
										},
										'dfab_border_outline_22': {
											label: __( 'Outline Anim CC 4', 'divi_flash' ),
											value: 'dfab_border_outline_22'
										},
										'dfab_border_outline_3': {
											label: __( 'Outline Anim CC 5', 'divi_flash' ),
											value: 'dfab_border_outline_3'
										},
										'dfab_border_outline_32': {
											label: __( 'Outline Anim CC 6', 'divi_flash' ),
											value: 'dfab_border_outline_32'
										},
										'dfab_border_outline_4': {
											label: __( 'Outline Anim Corner 1', 'divi_flash' ),
											value: 'dfab_border_outline_4'
										},
										'dfab_border_outline_42': {
											label: __( 'Outline Anim Corner 2', 'divi_flash' ),
											value: 'dfab_border_outline_42'
										}
									}
								}
								defaultAttr={defaultSettingsAttrs?.border_hover_effects?.innerContent}
							>
								<SelectContainer/>
							</FieldContainer>
							{
								[
									'dfab_border_ripple_in',
									'dfab_border_ripple_out',
									'dfab_border_slide_left',
									'dfab_border_slide_right',
									'dfab_border_outline_center',
									'dfab_border_outline_left',
									'dfab_border_outline_right',
									'dfab_border_outline_top',
									'dfab_border_outline_bottom',
									'dfab_border_outline_vertical',
									'dfab_border_outline_horizontal',
									'dfab_border_outline_top_left',
									'dfab_border_outline_top_right',
									'dfab_border_outline_bottom_left',
									'dfab_border_outline_bottom_right',
									'dfab_border_outline_1',
									'dfab_border_outline_12',
									'dfab_border_outline_2',
									'dfab_border_outline_22',
									'dfab_border_outline_3',
									'dfab_border_outline_32',
									'dfab_border_outline_4',
									'dfab_border_outline_42'
								].includes(innerContentValue( 'border_hover_effects', 'desktop' )) &&
								<FieldContainer
									attrName='border_hover_color.decoration'
									label={__( 'Hover Border Color', 'divi_flash' )}
									description={__( 'Here you can define a custom hover border color.', 'divi_flash' )}
									features={{
										sticky: false,
									}}
								>
									<ColorPickerContainer/>
								</FieldContainer>
							}
							{
								[
									'dfab_border_ripple_in',
									'dfab_border_ripple_out',
									'dfab_border_slide_left',
									'dfab_border_slide_right',
									'dfab_border_outline_center',
									'dfab_border_outline_left',
									'dfab_border_outline_right',
									'dfab_border_outline_top',
									'dfab_border_outline_bottom',
									'dfab_border_outline_vertical',
									'dfab_border_outline_horizontal',
									'dfab_border_outline_top_left',
									'dfab_border_outline_top_right',
									'dfab_border_outline_bottom_left',
									'dfab_border_outline_bottom_right',
									'dfab_border_outline_1',
									'dfab_border_outline_12',
									'dfab_border_outline_2',
									'dfab_border_outline_22',
									'dfab_border_outline_3',
									'dfab_border_outline_32',
									'dfab_border_outline_4',
									'dfab_border_outline_42'
								].includes(innerContentValue( 'border_hover_effects', 'desktop' )) &&
								generate_transition_fields('stroke', "Stroke", {})
							}
						</>
					},
					media_hover_elements: {
						label: __( 'Media', 'divi_flash' ),
						component: <>
							<FieldContainer
								attrName='media_hover_effects.innerContent'
								label={__( 'Select Hover Media Effect', 'divi_flash' )}
								description={__( '', 'divi_flash' )}
								features={{
									sticky: false,
								}}
								options={
									{
										'dfab_none': { label: __( 'Select Effect', 'divi_flash' ), value: 'dfab_none' },
										'dfab_hover_media': { label: __( 'Show on Hover', 'divi_flash' ), value: 'dfab_hover_media' },
										'dfab_media_reveal': { label: __( 'Reveal', 'divi_flash' ), value: 'dfab_media_reveal' },
										'dfab_media_slide': { label: __( 'Slide', 'divi_flash' ), value: 'dfab_media_slide' },
									}
								}
								defaultAttr={defaultSettingsAttrs?.media_hover_effects?.innerContent}
							>
								<SelectContainer/>
							</FieldContainer>
							{
								[
									'dfab_media_reveal',
									'dfab_media_slide'
								].includes(innerContentValue( 'media_hover_effects', 'desktop' )) &&
								<FieldContainer
									attrName='media_hover_effect_directions.innerContent'
									label={__( 'Select Hover Effect Direction', 'divi_flash' )}
									description={__( '', 'divi_flash' )}
									features={{
										sticky: false,
									}}
									options={
										{
											'dfab_mr_left': { label: __( 'From Left', 'divi_flash' ), value: 'dfab_mr_left' },
											'dfab_mr_right': { label: __( 'From Right', 'divi_flash' ), value: 'dfab_mr_right' },
											'dfab_mr_top': { label: __( 'From Top', 'divi_flash' ), value: 'dfab_mr_top' },
											'dfab_mr_bottom': { label: __( 'From Bottom', 'divi_flash' ), value: 'dfab_mr_bottom' },
										}
									}
									defaultAttr={defaultSettingsAttrs?.media_hover_effect_directions?.innerContent}
								>
									<SelectContainer/>
								</FieldContainer>
							}
							{
								[
									'dfab_hover_media',
									'dfab_media_reveal',
									'dfab_media_slide'
								].includes(innerContentValue( 'media_hover_effects', 'desktop' )) &&
								generate_transition_fields('media', "Media", {})
							}
						</>
					}
				}}
				>

				</TabList>

			</GroupContainer>
			<Tooltip
				props={props}
				defaultSettingsAttrs={defaultSettingsAttrs}
			/>
			<TooltipSettings
				props={props}
				defaultSettingsAttrs={defaultSettingsAttrs}
			/>
			<GroupContainer
				id="button_link"
				title={__( 'Link', 'divi_flash' )}
			>
				<FieldContainer
					attrName="button_link.innerContent"
					subName="button_link_type"
					label={__( 'Button Link Type', 'divi_flash' )}
					description={__( '', 'divi_flash' )}
					features={{
						sticky: false,
						hover: false,
						responsive: false,
					}}
					options={
						{
							'link_url': { label: __( 'Link URL', 'divi_flash' ), value: 'link_url' },
							'download': { label: __( 'Download', 'divi_flash' ), value: 'download' },
							'email': { label: __( 'Email', 'divi_flash' ), value: 'email' },
							'phone': { label: __( 'Phone', 'divi_flash' ), value: 'phone' },
						}
					}
					defaultAttr={defaultSettingsAttrs?.button_link?.innerContent}
				>
					<SelectContainer/>
				</FieldContainer>
				{
					!['download', 'email', 'phone'].includes(attrs?.button_link?.innerContent?.desktop?.value?.button_link_type ?? "link_url") &&
					<FieldContainer
						attrName='button_link.innerContent'
						subName="button_link_url"
						label={__( 'Button Link URL', 'divi_flash' )}
						description={__( 'Input the destination URL for your button.', 'divi_flash' )}
						features={{
							sticky: false,
							hover: false,
							responsive: false,
							dynamicContent: {
								type: "url"
							}
						}}
					>
						<TextContainer/>
					</FieldContainer>
				}
				{
					attrs?.button_link?.innerContent?.desktop?.value?.button_link_type === 'download' &&
					<FieldContainer
						attrName='button_link.innerContent'
						subName="button_link_download"
						label={__( 'Button Link Download URL', 'divi_flash' )}
						description={__( 'Input the destination URL for your button to download.', 'divi_flash' )}
						features={{
							sticky: false,
							hover: false,
							responsive: false,
							dynamicContent: {
								type: "url"
							}
						}}
					>
						<TextContainer/>
					</FieldContainer>
				}
				{
					attrs?.button_link?.innerContent?.desktop?.value?.button_link_type === 'email' &&
					<FieldContainer
						attrName='button_link.innerContent'
						subName="button_link_email"
						label={__( 'Button Link Email', 'divi_flash' )}
						description={__( 'Input the destination URL for your button.', 'divi_flash' )}
						features={{
							sticky: false,
							hover: false,
							responsive: false,
							dynamicContent: {
								type: "email"
							}
						}}
					>
						<TextContainer/>
					</FieldContainer>
				}
				{
					attrs?.button_link?.innerContent?.desktop?.value?.button_link_type === 'phone' &&
					<FieldContainer
						attrName='button_link.innerContent'
						subName="button_link_phone"
						label={__( 'Button Link Contact No.', 'divi_flash' )}
						description={__( 'Input the destination Contact No. for your button action.', 'divi_flash' )}
						features={{
							sticky: false,
							hover: false,
							responsive: false,
							dynamicContent: {
								type: "phone"
							}
						}}
					>
						<TextContainer/>
					</FieldContainer>
				}
				{
					!['download', 'email', 'phone'].includes(attrs?.button_link?.innerContent?.desktop?.value?.button_link_type ?? "link_url") &&
					<FieldContainer
						attrName='button_link.innerContent'
						subName="button_url_new_window"
						label={__( 'Button Link URL', 'divi_flash' )}
						description={__( 'Input the destination URL for your button.', 'divi_flash' )}
						features={{
							sticky: false,
							hover: false,
							responsive: false
						}}
						options={
							{
								'off': { label: __( 'In The Same Window', 'divi_flash' ), value: 'off' },
								'on': { label: __( 'In The New Tab', 'divi_flash' ), value: 'on' },
							}
						}
						defaultAttr={defaultSettingsAttrs?.button_link?.innerContent}
					>
						<SelectContainer/>
					</FieldContainer>
				}

			</GroupContainer>

			<BackgroundGroup
				defaultGroupAttr={defaultSettingsAttrs?.module?.decoration?.background?.asMutable( { deep: true } ) ?? {}}
				hidePanels={['mask', 'pattern', 'video']}
			/>
			<AdminLabelGroup
				defaultGroupAttr={defaultSettingsAttrs?.module.meta?.adminLabel}
			/>
		</React.Fragment>
	)
}