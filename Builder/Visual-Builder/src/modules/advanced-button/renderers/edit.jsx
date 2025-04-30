// External Dependencies.
import React, { useMemo, useState, useEffect } from 'react';
import classNames from 'classnames';

// Divi Dependencies.
import {
	ModuleContainer,
	ElementComponents
} from '@divi/module';

const { useFetch } = window?.divi?.rest;
import {
	getAttrByMode,
} from '@divi/module-utils';
import { map, isEmpty } from 'lodash';

const { __ } = window?.vendor?.wp?.i18n;
import { processFontIcon } from '@divi/icon-library';
// const { processFontIcon } = window?.divi?.iconLibrary;

import { ScriptData } from "./script";
// import { Classnames } from "./classnames";
import { Styles } from "./styles";

import { processTooltip } from '../../../components/tooltip';

export const Edit = ( props ) => {
	const {
		attrs,
		id,
		name,
		elements
	} = props;

	const tooltip_data = {
		tooltipStatus: attrs?.main_tooltip?.innerContent?.desktop?.value?.field_tooltip_enable ?? 'off',
		tooltipOffsetStatus: attrs?.main_tooltip_settings?.innerContent?.desktop?.value?.field_tooltip_offset_enable ?? 'off',
		offsetSkidding: attrs?.main_tooltip_settings?.innerContent?.desktop?.value?.field_tooltip_offset_skidding ?? "0",
		offsetDistance: attrs?.main_tooltip_settings?.innerContent?.desktop?.value?.field_tooltip_offset_distance ?? "10",
		showDelay: attrs?.main_tooltip_settings?.innerContent?.desktop?.value?.field_tooltip_content_delay ?? "300",
		hideDelay: attrs?.main_tooltip_settings?.innerContent?.desktop?.value?.field_tooltip_interactive_debounce ?? "0",
		animation: attrs?.main_tooltip_settings?.innerContent?.desktop?.value?.field_tooltip_animation ?? "fade",
		arrow: attrs?.main_tooltip_settings?.innerContent?.desktop?.value?.field_tooltip_arrow ?? "on",
		placement: attrs?.main_tooltip_settings?.innerContent?.desktop?.value?.field_tooltip_placement ?? "top",
		interactive: attrs?.main_tooltip_settings?.innerContent?.desktop?.value?.field_tooltip_interactive ?? "on",
		interactiveBorder: attrs?.main_tooltip_settings?.innerContent?.desktop?.value?.field_tooltip_interactive_border ?? "2",
		maxWidth: attrs?.main_tooltip_settings?.innerContent?.desktop?.value?.field_tooltip_custom_maxwidth ?? "350",
		order_class: `.difl_advanced_button_${id}`,
		content: attrs?.main_tooltip?.innerContent?.desktop?.value?.field_tooltip_content ?? ''
	}
	const [tooltip, setTooltip] = useState(null);

	useEffect(() => {
		if (!tooltip_data.tooltipStatus || tooltip_data.tooltipStatus === 'off') {
			return;
		}
		if (tooltip) {
			tooltip.destroy(); // Destroy the tooltip if disabled
			setTooltip(null);
		}
		// const new_tooltip = process_tooltip( tooltip_data );
		const new_tooltip = processTooltip( `${tooltip_data.order_class} .difl_advanced_button_container`, tooltip_data );
		setTooltip(new_tooltip);
	},[
		tooltip_data.tooltipStatus,
		tooltip_data.tooltipOffsetStatus,
		tooltip_data.offsetSkidding,
		tooltip_data.offsetDistance,
		tooltip_data.showDelay,
		tooltip_data.hideDelay,
		tooltip_data.animation,
		tooltip_data.arrow,
		tooltip_data.placement,
		tooltip_data.interactive,
		tooltip_data.interactiveBorder,
		tooltip_data.maxWidth,
		tooltip_data.content
	]);


	const process_button_markup = () => {
		const getAttr = (attr, declaration = 'innerContent', options = {}) =>
			getAttrByMode(props?.attrs?.[attr]?.[declaration], options) ?? '';

		/* Effects */
		let classes = ''
		// Media Placement
		const media_placement = props?.attrs?.media_placement?.decoration?.desktop?.value ?? 'media_left';
		if ( "" !== media_placement ) {
			classes += " " + media_placement;
		}

		// Background Effect
		const background_hover_effect = props?.attrs?.bg_hover_effects?.innerContent?.desktop?.value ?? '';
		let background_hover_effect_markup = '';
		if ( !isEmpty(background_hover_effect) && "dfab_none" !== background_hover_effect ) {
			classes += " " + background_hover_effect;
			background_hover_effect_markup = <span className="difl_adv_btn_bg_anim"></span>;
		}
		if ( !isEmpty(background_hover_effect) && [ 'dfab_reveal', 'dfab_reveal_with_hypen', 'dfab_two_shade' ].includes( background_hover_effect ) ) {
			const background_hover_effect_direction = props?.attrs?.bg_hover_effect_directions?.innerContent?.desktop?.value ?? 'dfab_left';
			classes += " " + background_hover_effect_direction;
		}

		// Hypen
		const bg_hover_effect_hyper = props?.attrs?.bg_hover_effect_hyper?.innerContent?.desktop?.value ?? 'off';
		if ( 'on' === bg_hover_effect_hyper && [ 'dfab_reveal', 'dfab_ripple' ].includes( background_hover_effect ) ) {
			classes += " dfab_hypen"
		}
		let ripple_position_aware = "";
		if ( 'dfab_ripple_position_aware' === background_hover_effect ) {
			ripple_position_aware = <span className='dfab_position_aware_bg'></span>;

		}
		if ( 'dfab_skew' === background_hover_effect ) {
			const bg_hover_skew_effect_directions = getAttr( 'bg_hover_skew_effect_directions' ) || "dfab_top_left";
			classes += " " + bg_hover_skew_effect_directions
		}

		// Border Effect
		const border_hover_effect = getAttr( 'border_hover_effects' ) ?? "";
		let border_hover_effect_markup = "";
		if ( "" !== border_hover_effect && "dfab_none" !== border_hover_effect ) {
			classes += " " + border_hover_effect;
			border_hover_effect_markup = <><span className="difl_adv_btn_border_anim"></span>
				<span className="difl_adv_btn_border_anim_2"></span></>;
		}

		// 2D Effects
		const two_d_hover_effect = getAttr( 'two_d_hover_effects' ) || "";
		if ( "" !== two_d_hover_effect && "dfab_none" !== two_d_hover_effect ) {
			classes += " " + two_d_hover_effect + " dfab__animate";
		}

		/* Media Effects */
		// Media show on hover
		const media_hover_effects = getAttr( 'media_hover_effects' ) || "";
		if ( "" !== media_hover_effects && "dfab_none" !== media_hover_effects ) {
			classes += " " + media_hover_effects;
		}
		if ( [ 'dfab_media_reveal', 'dfab_media_slide' ].includes( media_hover_effects ) ) {
			const media_hover_effect_directions = getAttr( 'media_hover_effect_directions' ) || "dfab_mr_left";
			classes += " " + media_hover_effect_directions;
		}

		// Sub Text Hover
		let btn_sub_text_hover = '';
		const sub_text_hover_value = getAttr( 'button_sub_text', 'innerContent',{
			breakpoint: 'desktop',
			state: 'hover',
		} );
		if ( sub_text_hover_value && "" !== sub_text_hover_value ) {
			btn_sub_text_hover = <span className="difl_adv_btn_sub_text_hover">{sub_text_hover_value}</span>;
		}

		// Sub Text
		let sub_text_markup = "";
		let sub_text_markup_outside = "";
		const sub_text_placement = getAttr( 'sub_text_placement' ) || "off";
		const button_sub_text = getAttr( 'button_sub_text' );
		if ( 'on' === sub_text_placement && button_sub_text.length > 0 ) {
			sub_text_markup_outside = <><span
				className="difl_adv_btn_sub_text">{button_sub_text}</span>{btn_sub_text_hover}</>;
		} else {
			sub_text_markup = <><span className="difl_adv_btn_sub_text">{button_sub_text}</span>{btn_sub_text_hover}</>;
		}

		// Text
		const button_text_field = getAttr( 'button_text' ) || '';
		const button_text__hover = getAttr( 'button_text', 'innerContent', {
			breakpoint: 'desktop',
			state: 'hover',
		} ) ?? '';
		const btn_text = !isEmpty( button_text_field ) ? button_text_field : "Click Here";
		let btn_text_hover = '';
		if ( !isEmpty( button_text__hover ) ) {
			btn_text_hover = <span className="difl_adv_btn_text_hover">{button_text__hover}</span>;
		}

		// Media
		let btn_media_markup = '';
		const use_button_icon = getAttr( 'use_button_icon' );
		if ( "on" === use_button_icon ) {
			// const button_icon_data = getAttr( 'button_icon' );
			const button_icon_data = props?.attrs?.button_icon?.innerContent?.desktop?.value ?? null;
			const button_icon = processFontIcon( button_icon_data ?? [] );
			let font_icon_hover = '';
			const button_icon__hover = props?.attrs?.button_icon?.innerContent?.desktop?.hover ?? null;
			if ( button_icon__hover ) {
				const button_icon_hover = processFontIcon( button_icon__hover ?? [] );
				font_icon_hover =
					<span className="et-pb-icon difl_adv_btn_media difl_adv_btn_icon_hover">{button_icon_hover}</span>;
			}
			btn_media_markup = <><span
				className="et-pb-icon difl_adv_btn_media difl_adv_btn_icon">{button_icon}</span>{font_icon_hover}</>;
		}

		const button_image = props?.attrs?.button_image?.innerContent?.desktop?.value ?? '';
		const button_image__hover = props?.attrs?.button_image?.innerContent?.desktop?.hover ?? '';
		if ( "on" !== use_button_icon && !isEmpty( button_image ) ) {
			let button_image_hover = '';
			if ( !isEmpty( button_image__hover ) && !isEmpty( button_image ) ) {
				button_image_hover =
					<img className="difl_adv_btn_media difl_adv_btn_img_hover" src={button_image__hover} alt="Advanced Button"
					     title=""/>;
			}
			btn_media_markup = <><img className="difl_adv_btn_media difl_adv_btn_img" src={button_image}
			                          alt="Advanced Button"/>{button_image_hover}</>;
		}

		const field_tooltip_content = props?.attrs?.main_tooltip?.innerContent?.desktop?.value?.field_tooltip_content ?? '';
		const tooltip_content = !isEmpty( field_tooltip_content ) ? field_tooltip_content.replace( /<p[^>]*>(?:\s|&nbsp;)*<\/p>/g, '' ) : null;

		let hover_state = ""

		return (
			<a className={`difl_advanced_button_container${classes}${hover_state} builder_view`} href="#">
					<span className="difl_adv_btn_wrapper">
                        {"" !== btn_media_markup ?
	                        <span className="difl_adv_btn_media_wrapper">{btn_media_markup}</span> : ''
						}
						<span className="difl_adv_btn_text_wrapper">
							<span className="difl_adv_btn_text">{btn_text}</span>
							{btn_text_hover}
							{sub_text_markup}
					    </span>
					</span>
				{sub_text_markup_outside}
				{ripple_position_aware}
				{background_hover_effect_markup}
				{border_hover_effect_markup}
			</a>
		);
	}

	return (
		<ModuleContainer
			attrs={attrs}
			elements={elements}
			id={id}
			name={name}
			stylesComponent={Styles}
			// classnamesFunction={moduleClassnames}
			scriptDataComponent={ScriptData}
			tag="div"

		>
			{elements.styleComponents( {
				attrName: 'module',
			} )}

			<ElementComponents
				attrs={attrs?.module?.decoration ?? {}}
				id={id}
			/>
			{
				process_button_markup()
			}
		</ModuleContainer>
	);
}