import React, { useState } from 'react';
const { __ } = window?.vendor?.wp?.i18n;
import { GroupContainer, GroupTabs } from "@divi/modal";
import {
	BackgroundGroup,
	BorderGroup,
	BoxShadowGroup, CommonStyle,
	FieldContainer,
	FontBodyGroup,
	FontGroup,
	SpacingGroup
} from "@divi/module";
import {
	ColorPickerContainer,
	RangeContainer,
	RichTextContainer,
	SelectContainer,
	ToggleContainer
} from "@divi/field-library";

import   '../../../../../public/js/lib/popper.min.js';
import  '../../../../../public/js/lib/tippy-bundle.min.js';
import tippy from 'tippy.js';
import { CustomStyles } from '../../helper/custom-styles';

export const Tooltip = (args) => {
	const { props, defaultSettingsAttrs } = args;

	return <GroupContainer
		id="main_tooltip"
		title={__( 'Tooltip', 'divi_flash' )}
	>
		<FieldContainer
			attrName="main_tooltip.innerContent"
			subName="field_tooltip_enable"
			label={__( 'Tooltip', 'divi_flash' )}
			description={__( 'Tooltip On/ Off.', 'divi_flash' )}
			features={{
				sticky: false,
			}}
		>
			<ToggleContainer/>
		</FieldContainer>
		{
			"on" === props?.attrs?.main_tooltip?.innerContent?.desktop?.value?.field_tooltip_enable &&
			<FieldContainer
				attrName="main_tooltip.innerContent"
				subName="field_tooltip_content"
				label={__( 'Tooltip Content', 'divi_flash' )}
				description={__( 'Note: Html tags, shortcode are supported and shortcode will be view only frontend.', 'divi_flash' )}
				features={{
					"sticky": false,
					"dynamicContent": {
						"type": "text"
					}
				}}
			>
				<RichTextContainer/>
			</FieldContainer>
		}
	</GroupContainer>
}

export const TooltipSettings = (args) => {
	const { props, defaultSettingsAttrs } = args;

	return <>

		{
			"on" === props?.attrs?.main_tooltip?.innerContent?.desktop?.value?.field_tooltip_enable &&
			<GroupContainer
				id="main_tooltip_settings"
				title={__( 'Tooltip Settings', 'divi_flash' )}
			>
				<FieldContainer
					attrName="main_tooltip_settings.innerContent"
					subName="field_tooltip_disable_on_mobile"
					label={__( 'Disable on Mobile', 'divi_flash' )}
					description={__( '', 'divi_flash' )}
					features={{
						"sticky": false
					}}
					defaultAttr={defaultSettingsAttrs?.main_tooltip_settings?.innerContent}
				>
					<ToggleContainer/>
				</FieldContainer>
				<FieldContainer
					attrName="main_tooltip_settings.innerContent"
					subName="field_tooltip_arrow"
					label={__( 'Arrow', 'divi_flash' )}
					description={__( '', 'divi_flash' )}
					features={{
						"sticky": false
					}}
					defaultAttr={defaultSettingsAttrs?.main_tooltip_settings?.innerContent}
				>
					<ToggleContainer/>
				</FieldContainer>
				<FieldContainer
					attrName='main_tooltip_settings.innerContent'
					subName="field_tooltip_placement"
					label={__( 'Placement', 'divi_flash' )}
					description={__( '', 'divi_flash' )}
					features={{
						sticky: false,
					}}
					options={
						{
							'top': { label: __( 'Top', 'divi_flash' ), value: 'top' },
							'top-start': { label: __( 'Top Right', 'divi_flash' ), value: 'top-start' },
							'top-end': { label: __( 'Top End', 'divi_flash' ), value: 'top-end' },
							'right': { label: __( 'Right', 'divi_flash' ), value: 'right' },
							'right-start': { label: __( 'Right Start', 'divi_flash' ), value: 'right-start' },
							'right-end': { label: __( 'Right End', 'divi_flash' ), value: 'right-end' },
							'bottom': { label: __( 'Bottom', 'divi_flash' ), value: 'bottom' },
							'bottom-start': { label: __( 'Bottom Start', 'divi_flash' ), value: 'bottom-start' },
							'bottom-end': { label: __( 'Bottom End', 'divi_flash' ), value: 'bottom-end' },
							'left': { label: __( 'Left', 'divi_flash' ), value: 'left' },
							'left-start': { label: __( 'Left Start', 'divi_flash' ), value: 'left-start' },
							'left-end': { label: __( 'Left End', 'divi_flash' ), value: 'left-end' }
						}
					}
					defaultAttr={defaultSettingsAttrs?.main_tooltip_settings?.innerContent}
				>
					<SelectContainer/>
				</FieldContainer>
				<FieldContainer
					attrName='main_tooltip_settings.innerContent'
					subName="field_tooltip_animation"
					label={__( 'Animation', 'divi_flash' )}
					description={__( '', 'divi_flash' )}
					features={{
						sticky: false,
					}}
					options={
						{
							'fade': { label: __( 'Fade', 'divi_flash' ), value: 'fade' },
							'scale': { label: __( 'Scale', 'divi_flash' ), value: 'scale' },
							'rotate': { label: __( 'Rotate', 'divi_flash' ), value: 'rotate' },
							'shift-away': { label: __( 'Shift-away', 'divi_flash' ), value: 'shift-away' },
							'shift-toward': { label: __( 'Shift-toward', 'divi_flash' ), value: 'shift-toward' },
							'perspective': { label: __( 'Perspective', 'divi_flash' ), value: 'perspective' }
						}
					}
					defaultAttr={defaultSettingsAttrs?.main_tooltip_settings?.innerContent}
				>
					<SelectContainer/>
				</FieldContainer>
				<FieldContainer
					attrName='main_tooltip_settings.innerContent'
					subName="field_tooltip_trigger"
					label={__( 'Trigger', 'divi_flash' )}
					description={__( '', 'divi_flash' )}
					features={{
						sticky: false,
					}}
					options={
						{
							'mouseenter focus': { label: __( 'Hover', 'divi_flash' ), value: 'mouseenter focus' },
							'click': { label: __( 'Click', 'divi_flash' ), value: 'click' },
							'mouseenter click': { label: __( 'Hover And Click', 'divi_flash' ), value: 'mouseenter click' }
						}
					}
					defaultAttr={defaultSettingsAttrs?.main_tooltip_settings?.innerContent}
				>
					<SelectContainer/>
				</FieldContainer>
				<FieldContainer
					attrName="main_tooltip_settings.innerContent"
					subName="field_tooltip_interactive"
					label={__( 'Hover Over Tooltip', 'divi_flash' )}
					description={__( 'Tooltip allowing you to hover over and click inside it.', 'divi_flash' )}
					features={{
						"sticky": false
					}}
					defaultAttr={defaultSettingsAttrs?.main_tooltip_settings?.innerContent}
				>
					<ToggleContainer/>
				</FieldContainer>
				{
					"on" === props?.attrs?.main_tooltip_settings?.innerContent?.desktop?.value?.field_tooltip_interactive &&
					<FieldContainer
						attrName="main_tooltip_settings.innerContent"
						subName="field_tooltip_interactive_border"
						label={__( 'Tooltip Hover Area', 'divi_flash' )}
						description={__( 'Determines the size of the invisible border around the tooltip that will prevent it from hiding if the cursor left it.', 'divi_flash' )}
						features={{
							"sticky": false
						}}
						defaultAttr={defaultSettingsAttrs?.main_tooltip_settings?.innerContent}
					>
						<RangeContainer
							max={100}
							min={0}
							step={1}
							defaultUnit={"px"}
							minLimit={0}
						/>
					</FieldContainer>
				}
				<FieldContainer
					attrName="main_tooltip_settings.innerContent"
					subName="field_tooltip_content_delay"
					label={__( 'Tooltip Content Delay [ms]', 'divi_flash' )}
					description={__( 'Determines the time in ms to show the Tooltip content when triggger.', 'divi_flash' )}
					features={{
						"sticky": false
					}}
					defaultAttr={defaultSettingsAttrs?.main_tooltip_settings?.innerContent}
				>
					<RangeContainer
						min={0}
						step={100}
						allowedUnits={[]}
						minLimit={0}
					/>
				</FieldContainer>
				<FieldContainer
					attrName="main_tooltip_settings.innerContent"
					subName="field_tooltip_interactive_debounce"
					label={__( 'Tooltip Content Hide Delay', 'divi_flash' )}
					description={__( 'Determines the time in ms to debounce the Tooltip content hide handler when the cursor leaves.', 'divi_flash' )}
					features={{
						"sticky": false
					}}
					defaultAttr={defaultSettingsAttrs?.main_tooltip_settings?.innerContent}
				>
					<RangeContainer
						min={0}
						max={1000}
						step={10}
						allowedUnits={[]}
						minLimit={0}
					/>
				</FieldContainer>
				{
					"mouseenter focus" === props?.attrs?.main_tooltip_settings?.innerContent?.desktop?.value?.field_tooltip_trigger &&
					<FieldContainer
						attrName="main_tooltip_settings.innerContent"
						subName="field_tooltip_follow_cursor"
						label={__( 'Follow Cursor', 'divi_flash' )}
						description={__( 'Tooltip move with mouse courser.', 'divi_flash' )}
						features={{
							"sticky": false
						}}
						defaultAttr={defaultSettingsAttrs?.main_tooltip_settings?.innerContent}
					>
						<ToggleContainer/>
					</FieldContainer>
				}
				<FieldContainer
					attrName="main_tooltip_settings.innerContent"
					subName="field_tooltip_custom_maxwidth"
					label={__( 'Max Width', 'divi_flash' )}
					description={__( 'Specifies the maximum width of the tooltip. Useful to prevent it from being too horizontally wide to read.', 'divi_flash' )}
					features={{
						"sticky": false
					}}
					defaultAttr={defaultSettingsAttrs?.main_tooltip_settings?.innerContent}
				>
					<RangeContainer
						min={0}
						max={1000}
						step={1}
						allowedUnits={[]}
						minLimit={0}
					/>
				</FieldContainer>
				<FieldContainer
					attrName="main_tooltip_settings.innerContent"
					subName="field_tooltip_offset_enable"
					label={__( 'Tooltip Distance', 'divi_flash' )}
					description={__( 'Displaces the tippy from its reference element in pixels (skidding and distance).', 'divi_flash' )}
					features={{
						"sticky": false
					}}
					defaultAttr={defaultSettingsAttrs?.main_tooltip_settings?.innerContent}
				>
					<ToggleContainer/>
				</FieldContainer>
				{
					"on" === props?.attrs?.main_tooltip_settings?.innerContent?.desktop?.value?.field_tooltip_offset_enable &&
					<>
						<FieldContainer
							attrName="main_tooltip_settings.innerContent"
							subName="field_tooltip_offset_skidding"
							label={__( 'Tooltip Horizontal Position', 'divi_flash' )}
							description={__( 'Tooltip horizontal distance length from element to tooltip.', 'divi_flash' )}
							features={{
								"sticky": false
							}}
							defaultAttr={defaultSettingsAttrs?.main_tooltip_settings?.innerContent}
						>
							<RangeContainer
								min={0}
								max={1000}
								step={1}
								minLimit={0}
							/>
						</FieldContainer>
						<FieldContainer
							attrName="main_tooltip_settings.innerContent"
							subName="field_tooltip_offset_distance"
							label={__( 'Tooltip Vertical Position', 'divi_flash' )}
							description={__( 'Tooltip vertical distance length from spot to tooltip.', 'divi_flash' )}
							features={{
								"sticky": false
							}}
							defaultAttr={defaultSettingsAttrs?.main_tooltip_settings?.innerContent}
						>
							<RangeContainer
								min={0}
								max={100}
								step={1}
								minLimit={0}
							/>
						</FieldContainer>
					</>
				}
			</GroupContainer>
		}
	</>
}

export const TooltipDesign = (args) => {
	const { props, defaultSettingsAttrs } = args;

	return <>
		{
			"on" === props?.attrs?.main_tooltip?.innerContent?.desktop?.value?.field_tooltip_enable &&
			<GroupContainer
				id="design_tooltip"
				title={__( 'Tooltip', 'divi_flash' )}
			>
				<FieldContainer
					attrName="design_tooltip.decoration.field_tooltip_arrow_color"
					label={__( 'Tooltip Arrow Color', 'divi_flash' )}
					description={__( '', 'divi_flash' )}
					features={{
						sticky: false,
						hover: false,
						responsive: false,
					}}
				>
					<ColorPickerContainer/>
				</FieldContainer>
				<FieldContainer
					attrName="design_tooltip.decoration.background"
					label={__( '', 'divi_flash' )}
					description={__( '', 'divi_flash' )}
					features={{
						sticky: false,
						hover: false,
						responsive: false,
					}}
				>
					<BackgroundGroup
						grouped={false}
						groupLabel={"Background"}
						hidePanels={['image','video','pattern','mask']}
					/>
				</FieldContainer>
				<BorderGroup
					attrName="design_tooltip.decoration.border"
					grouped={false}
					defaultGroupAttr={defaultSettingsAttrs?.design_tooltip?.decoration?.border?.asMutable( { deep: true } ) ?? {}}
				/>
				<BoxShadowGroup
					attrName="design_tooltip.decoration.boxShadow"
					grouped={false}
					defaultGroupAttr={defaultSettingsAttrs?.design_tooltip?.decoration?.boxShadow?.asMutable( { deep: true } ) ?? {}}
				/>
				<SpacingGroup
					attrName="design_tooltip.decoration.spacing"
					grouped={false}
					defaultGroupAttr={defaultSettingsAttrs?.design_tooltip?.decoration?.spacing?.asMutable( { deep: true } ) ?? {}}
					fields={{
						margin: {
							render: false,
						},
					}}
				/>
			</GroupContainer>
		}
	</>
}

export const TooltipText = (args) => {
	const { props, defaultSettingsAttrs } = args;

	const [ activeTab, setActiveTab ] = useState()

	const TabList = ( { tabs } ) => {
		if ( undefined === activeTab ) { setActiveTab( Object.keys( tabs )[ 0 ] ) }
		return (
			<>
				<GroupTabs
					tabs={tabs}
					showLabel={false}
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
	return <>
		{
			"on" === props?.attrs?.main_tooltip?.innerContent?.desktop?.value?.field_tooltip_enable &&
			<GroupContainer
				id="design_tooltip_text"
				title={__( 'Tooltip Text', 'divi_flash' )}
			>
				<TabList
					tabs={{
						body: {
							label: __( 'P', 'divi_flash' ),
							icon: 'divi/text-align-justify',
							component: <>
								<FontGroup
									attrName="design_tooltip_text_body.decoration.font"
									defaultGroupAttr={defaultSettingsAttrs?.design_tooltip_text_body?.decoration?.font?.asMutable( { deep: true } ) ?? {}}
									fieldLabel={"Body"}
									grouped={false}
								/>
							</>
						},
						a: {
							label: __( 'Link', 'divi_flash' ),
							icon: 'divi/text-link',
							component: <>
								<FontGroup
									attrName="design_tooltip_text_a.decoration.font"
									defaultGroupAttr={defaultSettingsAttrs?.design_tooltip_text_a?.decoration?.font?.asMutable( { deep: true } ) ?? {}}
									fieldLabel={"Link"}
									grouped={false}
								/>
							</>
						},
						ul: {
							label: __( 'UL', 'divi_flash' ),
							icon: 'divi/list-unordered',
							component: <>
								<FontGroup
									attrName="design_tooltip_text_ul.decoration.font"
									defaultGroupAttr={defaultSettingsAttrs?.design_tooltip_text_ul?.decoration?.font?.asMutable( { deep: true } ) ?? {}}
									fieldLabel={"UL"}
									grouped={false}
								/>
							</>
						},
						ol: {
							label: __( 'OL', 'divi_flash' ),
							icon: 'divi/list-ordered',
							component: <>
								<FontGroup
									attrName="design_tooltip_text_ol.decoration.font"
									defaultGroupAttr={defaultSettingsAttrs?.design_tooltip_text_ol?.decoration?.font?.asMutable( { deep: true } ) ?? {}}
									fieldLabel={"OL"}
									grouped={false}
								/>
							</>
						},
						quote: {
							label: __( 'QUOTE', 'divi_flash' ),
							icon: 'divi/text-quote',
							component: <>
								<FontGroup
									attrName="design_tooltip_text_quota.decoration.font"
									defaultGroupAttr={defaultSettingsAttrs?.design_tooltip_text_quota?.decoration?.font?.asMutable( { deep: true } ) ?? {}}
									fieldLabel={"Quote"}
									grouped={false}
								/>
							</>
						}
					}}
				></TabList>
			</GroupContainer>
		}
	</>
}

export const TooltipHeadingText = (args) => {
	const { props, defaultSettingsAttrs } = args;

	const [ activeTab, setActiveTab ] = useState()

	const TabList = ( { tabs } ) => {
		if ( undefined === activeTab ) { setActiveTab( Object.keys( tabs )[ 0 ] ) }
		return (
			<>
				<GroupTabs
					tabs={tabs}
					showLabel={false}
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

	return <>
		{
			"on" === props?.attrs?.main_tooltip?.innerContent?.desktop?.value?.field_tooltip_enable &&
			<GroupContainer
				id="design_tooltip_header"
				title={__( 'Tooltip Heading Text', 'divi_flash' )}
			>
				<TabList
					tabs={{
						h1: {
							label: __( 'H1', 'divi_flash' ),
							icon: 'divi/h1',
							component: <>
								<FontGroup
									attrName="design_tooltip_header_h1.decoration.font"
									defaultGroupAttr={defaultSettingsAttrs?.design_tooltip_header_h1?.decoration?.font?.asMutable( { deep: true } ) ?? {}}
									fieldLabel={"H1"}
									grouped={false}
								/>
							</>
						},
						h2: {
							label: __( 'H2', 'divi_flash' ),
							icon: 'divi/h2',
							component: <>
								<FontGroup
									attrName="design_tooltip_header_h2.decoration.font"
									defaultGroupAttr={defaultSettingsAttrs?.design_tooltip_header_h2?.decoration?.font?.asMutable( { deep: true } ) ?? {}}
									fieldLabel={"H2"}
									grouped={false}
								/>
							</>
						},
						h3: {
							label: __( 'H3', 'divi_flash' ),
							icon: 'divi/h3',
							component: <>
								<FontGroup
									attrName="design_tooltip_header_h3.decoration.font"
									defaultGroupAttr={defaultSettingsAttrs?.design_tooltip_header_h3?.decoration?.font?.asMutable( { deep: true } ) ?? {}}
									fieldLabel={"H3"}
									grouped={false}
								/>
							</>
						},
						h4: {
							label: __( 'H4', 'divi_flash' ),
							icon: 'divi/h4',
							component: <>
								<FontGroup
									attrName="design_tooltip_header_h4.decoration.font"
									defaultGroupAttr={defaultSettingsAttrs?.design_tooltip_header_h4?.decoration?.font?.asMutable( { deep: true } ) ?? {}}
									fieldLabel={"H4"}
									grouped={false}
								/>
							</>
						},
						h5: {
							label: __( 'H5', 'divi_flash' ),
							icon: 'divi/h5',
							component: <>
								<FontGroup
									attrName="design_tooltip_header_h5.decoration.font"
									defaultGroupAttr={defaultSettingsAttrs?.design_tooltip_header_h5?.decoration?.font?.asMutable( { deep: true } ) ?? {}}
									fieldLabel={"H5"}
									grouped={false}
								/>
							</>
						},
						h6: {
							label: __( 'H6', 'divi_flash' ),
							icon: 'divi/h6',
							component: <>
								<FontGroup
									attrName="design_tooltip_header_h6.decoration.font"
									defaultGroupAttr={defaultSettingsAttrs?.design_tooltip_header_h6?.decoration?.font?.asMutable( { deep: true } ) ?? {}}
									fieldLabel={"H6"}
									grouped={false}
								/>
							</>
						}
					}}
				></TabList>
			</GroupContainer>
		}
	</>
}

export const processTooltip = ( selector, tooltip_data ) => {
	let newTooltip = null;
	const advanced_button_container = document.querySelector(selector);
	if (advanced_button_container && tooltip_data.tooltipStatus) {
		const options = {
			arrow    : 'on' === tooltip_data.arrow,
			animation: tooltip_data.animation ?? 'fade',
			placement: tooltip_data.placement ?? 'top',
			trigger  : tooltip_data.trigger ?? 'mouseenter focus',
			followCursor: tooltip_data.followCursor ?? false,
			allowHTML: tooltip_data.allowHTML ?? true,
			interactive: 'on' === tooltip_data.interactive,
			interactiveBorder: tooltip_data.interactiveBorder ? parseInt(tooltip_data.interactiveBorder) : 2,
			maxWidth: tooltip_data.maxWidth ? parseInt(tooltip_data.maxWidth) : 370,
			offset:[tooltip_data.offsetSkidding , tooltip_data.offsetDistance],
			delay: [tooltip_data.showDelay, tooltip_data.hideDelay],
			theme: tooltip_data.order_class
		};
		if("" !== tooltip_data.content){
			options['content'] =  tooltip_data.content;
			newTooltip = tippy(advanced_button_container, options);
			return newTooltip;
		}
	}
	return newTooltip;
}

export const TooltipStylesHandler = ({props}) => {
	const {
		attrs = {},
		elements,
		settings = {},
		orderClass,
		mode,
		state,
		noStyleTag,
	} = props;
	return (
		<>
			{/* Design Tooltip */}
			{elements.style ( {
				attrName: 'design_tooltip',
			} )}

			{/* Arrow Color */}
			<CommonStyle
				selector={`.tippy-box[data-theme~='${orderClass}'][data-placement^='top'] > .tippy-arrow::before`}
				attr={attrs?.design_tooltip?.decoration?.field_tooltip_arrow_color ?? {}}
				property="border-top-color"
			/>
			<CommonStyle
				selector={`.tippy-box[data-theme~='${orderClass}'][data-placement^='bottom'] > .tippy-arrow::before`}
				attr={attrs?.design_tooltip?.decoration?.field_tooltip_arrow_color ?? {}}
				property="border-bottom-color"
			/>
			<CommonStyle
				selector={`.tippy-box[data-theme~='${orderClass}'][data-placement^='right'] > .tippy-arrow::before`}
				attr={attrs?.design_tooltip?.decoration?.field_tooltip_arrow_color ?? {}}
				property="border-right-color"
			/>
			<CommonStyle
				selector={`.tippy-box[data-theme~='${orderClass}'][data-placement^='left'] > .tippy-arrow::before`}
				attr={attrs?.design_tooltip?.decoration?.field_tooltip_arrow_color ?? {}}
				property="border-left-color"
			/>
			<CustomStyles
				attr={attrs?.design_tooltip?.decoration ?? {}}
				selector={`.tippy-box[data-theme~='${orderClass}'] .tippy-content p`}
				property={`padding-bottom`}
				value={'0px'}
			/>

			{/*Tooltip Text*/}
			{elements.style(
				{
					attrName: 'design_tooltip_text_body',
				},
				{
					attrName: 'design_tooltip_text_a',
				},
				{
					attrName: 'design_tooltip_text_ul',
				},
				{
					attrName: 'design_tooltip_text_ol',
				},
				{
					attrName: 'design_tooltip_text_quota',
				}
			)}


			{/*Tooltip Text*/}
			{elements.style(
				{
					attrName: 'design_tooltip_header_h1',
				},
				{
					attrName: 'design_tooltip_header_h2',
				},
				{
					attrName: 'design_tooltip_header_h3',
				},
				{
					attrName: 'design_tooltip_header_h4',
				},
				{
					attrName: 'design_tooltip_header_h5',
				},
				{
					attrName: 'design_tooltip_header_h6',
				}
			)}
		</>
	);
}