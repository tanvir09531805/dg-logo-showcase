// External dependencies.
import React from 'react';
import { __ } from '@wordpress/i18n';

// Divi dependencies.
import {
	StyleContainer,
	CommonStyle,
	CssStyle
} from '@divi/module';
import {
	getAttrByMode,
} from '@divi/module-utils';

import {
	animationTransitions
} from './declarations';

import { CustomStyles } from '../../../helper/custom-styles';

import { cssFields } from './custom-css';
import { TooltipStylesHandler } from '../../../components/tooltip';

export const Styles = ( props ) => {
	const {
		attrs = {},
		elements,
		settings = {},
		orderClass,
		mode,
		state,
		noStyleTag,
	} = props;

	const isHoverEffectEnabled =
		attrs?.bg_hover_effect_hyper?.innerContent?.desktop?.value === 'on' &&
		['dfab_reveal', 'dfab_ripple'].includes(
			attrs?.bg_hover_effects?.innerContent?.desktop?.value
		);

	const isHoverBounceEffectEnabled =
		attrs?.bg_hover_effect_bounce?.innerContent?.desktop?.value === 'on' &&
		['dfab_reveal', 'dfab_door_open', 'dfab_skew', 'dfab_two_shade'].includes(
			attrs?.bg_hover_effects?.innerContent?.desktop?.value
		);



	return (
		<StyleContainer mode={mode} state={state} noStyleTag={noStyleTag}>
			{/* Module */}
			{elements.style({
				attrName: 'module',
				styleProps: {
					disabledOn: {
						disabledModuleVisibility: settings.disabledModuleVisibility,
					},
				},
			})}

			{/* Media Placement */}
			{ "media_right" === getAttrByMode(attrs?.media_placement?.decoration) && (
				<>
					<CustomStyles
						attr={attrs?.media_placement?.decoration ?? {}}
						selector={`${orderClass} .difl_adv_btn_wrapper .difl_adv_btn_media_wrapper`}
						property={`order`}
						value={'2'}
					/>
					<CustomStyles
						attr={attrs?.media_placement?.decoration ?? {}}
						selector={`${orderClass} .difl_adv_btn_wrapper .difl_adv_btn_text_wrapper`}
						property={`order`}
						value={'1'}
					/>
				</>
			)}

			{/* Media Placement */}
			{ "media_right" === getAttrByMode(attrs?.media_placement?.decoration, {  breakpoint: 'desktop',  state: 'hover', }) && (
				<>
					<CustomStyles
						attr={attrs?.media_placement?.decoration ?? {}}
						selector={`${orderClass} a.difl_advanced_button_container:hover .difl_adv_btn_wrapper .difl_adv_btn_media_wrapper`}
						property={`order`}
						value={'2'}
					/>
					<CustomStyles
						attr={attrs?.media_placement?.decoration ?? {}}
						selector={`${orderClass} a.difl_advanced_button_container:hover .difl_adv_btn_wrapper .difl_adv_btn_text_wrapper`}
						property={`order`}
						value={'1'}
					/>
				</>
			)}

			{/* Animation Transitions */}
			<CommonStyle
				selector={`${orderClass} a.difl_advanced_button_container`}
				attr={attrs?.buttonAnimationTransition?.decoration ?? {}}
				declarationFunction={animationTransitions}
			/>

			{/* Hover Effect Background */}
			<CustomStyles
				attr={attrs?.bg_hover_background_color?.decoration ?? {}}
				selector={`${orderClass} a.difl_advanced_button_container`}
				property={`--dfab-bg-hover-background-color`}
			/>

			{/* Hypen */}
			{isHoverEffectEnabled && (
				<CustomStyles
					selector={`${orderClass} a.difl_advanced_button_container`}
					attr={attrs?.bg_hover_hypen_color?.decoration ?? {}}
					property={`--dfab-bg-hover-hypen-color`}
				/>
			)}

			{/* Bounce */}
			{isHoverBounceEffectEnabled && (
				<CustomStyles
					selector={`${orderClass} a.difl_advanced_button_container`}
					attr={attrs?.bg_hover_effect_bounce?.innerContent ?? {}}
					property={`--dfab-bg-hover-background-transition-timimg-function`}
					value={'cubic-bezier(.52,1.64,.37,.66)'}
					important={true}
				/>
			)}

			{/* Two Shade Secondary */}
			{ 'dfab_two_shade' === getAttrByMode(attrs?.bg_hover_effects?.innerContent) && (
				<CustomStyles
					attr={attrs?.bg_hover_background_secondary_color?.decoration ?? {}}
					selector={`${orderClass} a.difl_advanced_button_container`}
					property={`--dfab-bg-hover-background-secondary-color`}
				/>
			)}

			{/* Hover Effect Stroke */}
			<CustomStyles
				attr={attrs?.border_hover_color?.decoration ?? {}}
				selector={`${orderClass} a.difl_advanced_button_container`}
				property={`--dfab-border-hover-background-color`}
			/>



			{/* Button Alignment */}
			<CommonStyle
				selector={`${orderClass}`}
				attr={attrs?.alignment?.decoration?.button_alignment ?? {}}
				property="text-align"
			/>

			{/* Button Content Alignment */}
			<CommonStyle
				selector={`${orderClass} a.difl_advanced_button_container .difl_adv_btn_wrapper`}
				attr={attrs?.alignment?.decoration?.button_content_alignment ?? {}}
				property="justify-content"
			/>

			{/* Text */}
			{elements.style ( {
				attrName: 'text',
			} )}

			{/* Sub Text */}
			{elements.style ( {
				attrName: 'sub_text',
			} )}

			{/* Icon Color */}
			<CommonStyle
				selector={`${orderClass} .difl_advanced_button_container .difl_adv_btn_wrapper .difl_adv_btn_icon, ${orderClass} .difl_advanced_button_container .difl_adv_btn_wrapper .difl_adv_btn_icon_hover`}
				attr={attrs?.design_media?.decoration?.icon_color ?? {}}
				property="color"
			/>

			{/* Icon Size */}
			<CommonStyle
				selector={`${orderClass} .difl_advanced_button_container .difl_adv_btn_wrapper .difl_adv_btn_icon, ${orderClass} .difl_advanced_button_container .difl_adv_btn_wrapper .difl_adv_btn_icon_hover`}
				attr={attrs?.design_media?.decoration?.button_icon_size ?? {}}
				property="font-size"
			/>

			{/* Media Background */}
			<CommonStyle
				selector={`${orderClass} .difl_advanced_button_container .difl_adv_btn_wrapper .difl_adv_btn_media_wrapper`}
				attr={attrs?.design_media?.decoration?.media_background_color ?? {}}
				property="background-color"
			/>

			{/* Media Width */}
			<CustomStyles
				attr={attrs?.design_media?.decoration?.media_wrapper_width ?? {}}
				selector={`${orderClass} a.difl_advanced_button_container`}
				property={`--dfab-media-wrapper-width`}
			/>

			{/* Media Height */}
			<CustomStyles
				attr={attrs?.design_media?.decoration?.media_wrapper_height ?? {}}
				selector={`${orderClass} a.difl_advanced_button_container`}
				property={`--dfab-media-wrapper-height`}
			/>

			{/* Media Border */}
			{elements.style ( {
				attrName: 'design_media',
			} )}

			{/* Content Container */}
			{elements.style ( {
				attrName: 'content_container_spacing',
			} )}

			{/* Tooltip */}
			<TooltipStylesHandler
				props={props}
			/>

			<CssStyle
				selector={orderClass}
				attr={attrs.css}
				cssFields={cssFields}
			/>
		</StyleContainer>
	);
};