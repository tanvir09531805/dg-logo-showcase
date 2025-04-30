// External dependencies.
import React from 'react';
import { __ } from '@wordpress/i18n';

// Divi dependencies.
import {
	StyleContainer,
	CommonStyle,
	CssStyle,
	TextShadowStyle
} from '@divi/module';
import {
	getAttrByMode,
	addMediaQuery,
	sortBreakpoints
} from '@divi/module-utils';
import { StyleDeclarations } from '@divi/style-library';

import { cssFields } from './custom-css';
import { CustomStyles } from "../../../helper/custom-styles";
import { isEmpty } from "lodash";

export const alignmentStyles = (props) => {
	const {
		attr,
		attrValue,
		breakpoint,
		defaultAttrValue,
		important,
		returnType,
		state
	} = props;
	const declarations = new StyleDeclarations( {
		returnType: 'string',
		important: important,
	} );
	declarations.add('text-align', `${attrValue}`);
	if(['tablet', 'phone'].includes(breakpoint)){
		declarations.add('margin-left', `${attrValue}`);
		declarations.add('margin-right', `${attrValue}`);
	}
	const margin_value = 'center' !== attrValue ? '0' : ''
	declarations.add(`margin-${attrValue}`, `${margin_value}`);

	return declarations.value;
}

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

	const hex2rgba = (hex, alpha = 1) => {
		if(!isHexColor(hex)) return hex;
		const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));
		return `rgba(${r},${g},${b},${alpha})`;
	};
	const  isHexColor = (hex) => {
		let Reg_Exp = /^#[0-9A-F]{6}$/i;
		return Reg_Exp.test(hex);
	}

	// Overlay Container Class
	const __class__overlay_container = `${orderClass} .difl__image_reveal_wrapper .difl__image_reveal_overlay`;
	const __class__hover_overlay_content = `${orderClass} .difl__image_reveal_wrapper .difl__image_reveal_hover_overlay .difl__image_reveal_hover_overlay_content`;

	// Overlay field diclaretion
	const __field__overlay_enable = attrs?.content_overlay?.innerContent?.field_overlay_enable?.desktop?.value ?? 'off';
	const __field__overlay_color = attrs?.content_overlay?.decoration?.field_overlay_color?.desktop?.value ?? '#ffffff';
	const __field__overlay_opacity = attrs?.content_overlay?.decoration?.field_overlay_opacity?.desktop?.value ?? 0.15;
	const __field__reveal_directions = attrs?.content_reveal_animation?.decoration?.field_reveal_directions?.desktop?.value ?? 'reveal_ltr';

	//  Hover Overlay Field Declaration
	const __field__hover_overlay_enable = attrs?.content_hover_overlay?.innerContent?.field_hover_overlay_enable.desktop?.value ?? 'off';
	const __field__hover_overlay_color = attrs?.content_hover_overlay?.decoration?.field_hover_overlay_color.desktop?.value ?? '#ffffff';
	const __field__hover_overlay_opacity = attrs?.content_hover_overlay?.decoration?.field_hover_overlay_opacity.desktop?.value ?? '0.3';

	// Caption Field Declaration
	const __field__caption_enable = attrs?.content_caption?.innerContent?.field_caption_enable?.desktop?.value ?? 'off';

	// Reveal Effect Field Declaration
	const __field__reveal_effects = attrs?.content_reveal_animation?.decoration?.field_reveal_effects?.desktop?.value ?? 'none';
	const __field__reveal_effect_delay = attrs?.content_reveal_animation?.decoration?.field_reveal_effect_delay?.desktop?.value ?? '0';
	const __field__reveal_effect_time = attrs?.content_reveal_animation?.decoration?.field_reveal_effect_animation_time?.desktop?.value ?? '1';


	// Hover Zoom Effect Field Declaration
	const __field__hover_image_effect_enable = attrs?.content_hover_overlay?.innerContent?.field_hover_image_effect_enable?.desktop?.value ?? 'off';
	const __field__hover_image_effect_style  = attrs?.content_hover_overlay?.innerContent?.field_effect_style?.desktop?.value ?? 'none';
	const __field__zoom_scale                = attrs?.content_hover_overlay?.decoration?.field_zoom_scale?.desktop?.value ?? '1.5';
	const __field__zooming_time              = attrs?.content_hover_overlay?.decoration?.field_zooming_time?.desktop?.value ?? '0.25';
	const __field__Speed_curve               = attrs?.content_hover_overlay?.decoration?.field_Speed_curve?.desktop?.value ?? 'ease-in';
	const __field__zoom_rotate               = attrs?.content_hover_overlay?.decoration?.field_zoom_rotate?.desktop?.value ?? '25';
	const __field__zooming_blur_out_time     = attrs?.content_hover_overlay?.decoration?.field_zooming_blur_out_time?.desktop?.value ?? '0.25';
	const __field__zooming_blur_level        = attrs?.content_hover_overlay?.decoration?.field_zooming_blur_level?.desktop?.value ?? '2';
	const __field__zooming_grayscale         = attrs?.content_hover_overlay?.decoration?.field_grayscale?.desktop?.value ?? '100';

	const __field__reveal_color_bg_use_gradient         = attrs?.content_reveal_animation?.decoration?.background?.desktop?.value?.gradient?.enabled ?? 'off';
	const __field__force_full_width          = attrs?.width?.decoration?.force_fullwidth?.desktop?.value ?? 'off';

	const __field__reveal_animation_time    = attrs?.content_reveal_animation?.decoration?.field_reveal_animation_time?.desktop?.value ?? '1';
	const __field__reveal_delay             = attrs?.content_reveal_animation?.decoration?.field_reveal_delay?.desktop?.value ?? '0';
	const reveal_in_anim    = parseFloat(__field__reveal_animation_time) / 2.0;
	const reveal_out_anim = parseFloat(__field__reveal_animation_time) / 2.0;
	const reveal_out_delay = parseFloat(__field__reveal_delay) + parseFloat(reveal_in_anim);
	const img_anim_time = "reveal_ltr" === __field__reveal_directions ? __field__reveal_animation_time : '0'

	const __class__reveal_direction = {
		reveal_ltr: {
			class: 'difl__image_reveal_lr',
			animation_in: 'imageRevealLR',
			animation_out: 'imageRevealOutLR',
		},
		reveal_rtl: {
			class: 'difl__image_reveal_rl',
			animation_in: 'imageRevealRL',
			animation_out: 'imageRevealOutRL',
		},
		reveal_ttb: {
			class: 'difl__image_reveal_tb',
			animation_in: 'imageRevealTB',
			animation_out: 'imageRevealOutTB',
		},
		reveal_btt: {
			class: 'difl__image_reveal_bt',
			animation_in: 'imageRevealBT',
			animation_out: 'imageRevealOutBT',
		},
	};

	const effect_total_delay = parseFloat(__field__reveal_effect_delay) + parseFloat(__field__reveal_delay);

	let ho_anim_time = attrs?.content_hover_overlay?.decoration?.field_hover_overlay_transition_time?.desktop?.value ?? '0.6s';
	ho_anim_time = ho_anim_time.toString().slice(-1) !== 's' ? ho_anim_time + 's' : ho_anim_time;
	let ho_anim_delay = attrs?.content_hover_overlay?.decoration?.field_hover_overlay_transition_delay?.desktop?.value ?? '0s';
	ho_anim_delay = ho_anim_delay.toString().slice(-1) !== 's' ? ho_anim_delay + 's' : ho_anim_delay;
	const __field__hover_overlay_arrive_from = attrs?.content_hover_overlay?.innerContent?.field_hover_overlay_arrive_from?.desktop?.value ?? 'left';

	const __class__hover_overlay_reveal_direction = {
		left: {
			class: 'difl__hover_overlay_lr',
			animation_in: 'imageRevealLR',
			animation_out: 'linear',
			animation_mode: 'forwards',
		},
		right: {
			class: 'difl__hover_overlay_rl',
			animation_in: 'imageRevealRL',
			animation_out: 'linear',
			animation_mode: 'forwards',
		},
		top: {
			class: 'difl__hover_overlay_tb',
			animation_in: 'imageRevealTB',
			animation_out: 'linear',
			animation_mode: 'forwards',
		},
		bottom: {
			class: 'difl__hover_overlay_bt',
			animation_in: 'imageRevealBT',
			animation_out: 'linear',
			animation_mode: 'forwards',
		},
		linear: {
			class: 'difl__hover_overlay_linear',
			animation_in: 'overlayViewer',
			animation_out: 'linear',
			animation_mode: 'both',
		},
		ease_in_out: {
			class: 'difl__hover_overlay_ease_in_out',
			animation_in: 'overlayViewer',
			animation_out: 'ease-in-out',
			animation_mode: 'both',
		},
		ease: {
			class: 'difl__hover_overlay_ease',
			animation_in: 'overlayViewer',
			animation_out: 'ease',
			animation_mode: 'both',
		},
		ease_in: {
			class: 'difl__hover_overlay_ease_in',
			animation_in: 'overlayViewer',
			animation_out: 'ease-in',
			animation_mode: 'both',
		},
		ease_out: {
			class: 'difl__hover_overlay_ease_out',
			animation_in: 'overlayViewer',
			animation_out: 'ease-out',
			animation_mode: 'both',
		},
	};

	const __field__hover_overlay_content_placement = attrs?.content_hover_overlay?.decoration?.field_hover_overlay_content_placement?.desktop?.value ?? 'center';
	const __field__hover_overlay_content_alignment = attrs?.content_hover_overlay?.decoration?.field_hover_overlay_content_alignment?.desktop?.value ?? 'center';

	const __field__hover_overlay_content_arrive_from = attrs?.content_hover_overlay?.decoration?.field_hover_overlay_content_arrive_from?.desktop?.value ?? 'left';
	const __class__hover_overlay_content_arrive_from = {
		left: {
			transform: "translateX(-2rem)"
		},
		right: {
			transform: "translateX(2rem)"
		},
		top: {
			transform: "translateY(-2rem)"
		},
		bottom: {
			transform: "translateY(2rem)"
		}
	};

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


			{elements.style( { attrName: 'content_placeholder' } )}
			{elements.style( { attrName: 'field_hover_overlay_container_padding' } )}
			{
				"on" === __field__caption_enable &&
				elements.style( { attrName: 'content_caption' } )
			}

			{elements.style( { attrName: 'design_hover_overlay_title' } )}
			{elements.style( { attrName: 'design_hover_overlay_description' } )}
			{
				"on" === __field__caption_enable &&
				elements.style( { attrName: 'design_caption' } )
			}
			{elements.style( { attrName: 'width' } )}
			{elements.style( { attrName: 'content_reveal_animation' } )}

			{
				"on" === __field__reveal_color_bg_use_gradient &&
				<CustomStyles
					attr={attrs?.content_reveal_animation?.decoration?.background ?? {}}
					selector={`${orderClass} .difl__image_reveal_wrapper .difl__image_reveal_element`}
					property="background-color"
					value="transparent"
					important={true}
				/>
			}
			{
				"off" === __field__reveal_color_bg_use_gradient &&
				<CustomStyles
					attr={attrs?.content_reveal_animation?.decoration?.background ?? {}}
					selector={`${orderClass} .difl__image_reveal_wrapper .difl__image_reveal_element`}
					property="background-color"
					value="#ffffff"
				/>
			}

			{
				"on" === __field__force_full_width &&
				<>
					<CustomStyles
						attr={attrs?.width?.decoration?.force_fullwidth ?? {}}
						selector={`${orderClass}`}
						staticPropertyAndValue={{width:'100%', 'max-width': '100%'}}
						important={true}
					/>
					<CustomStyles
						attr={attrs?.width?.decoration?.force_fullwidth ?? {}}
						selector={`${orderClass} .difl__image_wrap`}
						staticPropertyAndValue={{width:'100%', 'max-width': '100%'}}
						important={true}
					/>
					<CustomStyles
						attr={attrs?.width?.decoration?.force_fullwidth ?? {}}
						selector={`${orderClass} .difl__image_wrap img`}
						staticPropertyAndValue={{width:'100%', 'max-width': '100%'}}
						important={true}
					/>
				</>
			}

			<CommonStyle
				selector={`${orderClass}`}
				attr={attrs?.alignment?.decoration?.align ?? {}}
				declarationFunction={alignmentStyles}
			/>

			{
				"on" === __field__overlay_enable &&
				<CustomStyles
					attr={attrs?.content_overlay?.decoration?.field_overlay_color ?? {}}
					selector={`${__class__overlay_container}`}
					property="background"
					value={hex2rgba(__field__overlay_color,__field__overlay_opacity)}
				/>
			}

			{/*Reveal Direction*/}
			<>
				<CustomStyles
					attr={attrs?.content_reveal_animation?.decoration?.field_reveal_directions ?? {}}
					selector={`${orderClass} .${__class__reveal_direction[__field__reveal_directions].class} img`}
					staticPropertyAndValue={{
						'animation': `fadeInImg ${img_anim_time}s ${reveal_out_delay}s forwards`,
						'-webkit-animation': `fadeInImg ${img_anim_time}s ${reveal_out_delay}s forwards`
					}}
				/>
				<CustomStyles
					attr={attrs?.content_reveal_animation?.decoration?.field_reveal_directions ?? {}}
					selector={`${orderClass} .${__class__reveal_direction[__field__reveal_directions].class} .difl__image_reveal_overlay`}
					staticPropertyAndValue={{
						'animation': `fadeInImg ${__field__reveal_animation_time}s ${reveal_out_delay}s linear forwards`,
						'-webkit-animation': `fadeInImg ${__field__reveal_animation_time}s ${reveal_out_delay}s linear forwards`
					}}
				/>
				<CustomStyles
					attr={attrs?.content_reveal_animation?.decoration?.field_reveal_directions ?? {}}
					selector={`${orderClass} .${__class__reveal_direction[__field__reveal_directions].class} .difl__image_reveal`}
					staticPropertyAndValue={{
						'animation': `${__class__reveal_direction[__field__reveal_directions].animation_in} ${reveal_in_anim}s ${__field__reveal_delay}s, ${__class__reveal_direction[__field__reveal_directions].animation_out} ${reveal_out_anim}s ${reveal_out_delay}s`,
						'-webkit-animation': `${__class__reveal_direction[__field__reveal_directions].animation_in} ${reveal_in_anim}s ${__field__reveal_delay}s, ${__class__reveal_direction[__field__reveal_directions].animation_out} ${reveal_out_anim}s ${reveal_out_delay}s`,
						'animation-fill-mode': 'forwards',
						'-webkit-animation-fill-mode': 'forwards',
					}}
				/>
			</>
			{/*Reveal Effect Style handler*/}
			{
				"none" !== __field__reveal_effects &&
				<CustomStyles
					attr={attrs?.content_reveal_animation?.decoration?.field_reveal_effects ?? {}}
					selector={`${orderClass} .difl__image_reveal_wrapper .difl__animate`}
					staticPropertyAndValue={{
						'animation-duration': `${__field__reveal_effect_time}s`,
						'-webkit-animation-duration': `${__field__reveal_effect_time}s`,
						'animation-delay': `${effect_total_delay}s`,
						'-webkit-animation-delay': `${effect_total_delay}s`,
					}}
				/>
			}
			{/*Hover Overlay Color, Opacity, Transition Delay, Transition Time*/}
			{
				"on" === __field__hover_overlay_enable &&
				<CustomStyles
					attr={attrs?.content_hover_overlay?.decoration?.field_hover_overlay_color ?? {}}
					selector={`${__class__hover_overlay_content}`}
					property="background-color"
					value={hex2rgba(__field__hover_overlay_color,__field__hover_overlay_opacity)}
				/>
			}
			{/*Hover Overlay Animation Control*/}
			<CustomStyles
				attr={attrs?.content_hover_overlay?.innerContent?.field_hover_overlay_arrive_from ?? {}}
				selector={`${orderClass}.et_vb_hover .difl__image_reveal_wrapper .${__class__hover_overlay_reveal_direction[__field__hover_overlay_arrive_from].class} .difl__image_reveal_hover_overlay_content`}
				staticPropertyAndValue={{
					'-webkit-animation': `${__class__hover_overlay_reveal_direction[__field__hover_overlay_arrive_from].animation_in} ${ho_anim_time} ${__class__hover_overlay_reveal_direction[__field__hover_overlay_arrive_from].animation_out} ${ho_anim_delay}`,
					'animation': `${__class__hover_overlay_reveal_direction[__field__hover_overlay_arrive_from].animation_in} ${ho_anim_time} ${__class__hover_overlay_reveal_direction[__field__hover_overlay_arrive_from].animation_out} ${ho_anim_delay}`,
					'-webkit-animation-fill-mode': `${__class__hover_overlay_reveal_direction[__field__hover_overlay_arrive_from].animation_mode}`,
					'animation-fill-mode': `${__class__hover_overlay_reveal_direction[__field__hover_overlay_arrive_from].animation_mode}`,
				}}
			/>

			<CustomStyles
				attr={attrs?.content_hover_overlay?.innerContent?.field_hover_overlay_arrive_from ?? {}}
				selector={`${orderClass} .difl__image_reveal_wrapper .difl__image_reveal_hover_overlay_content`}
				property="animation-duration"
				value="0.5s"
			/>

			{/*Hover Overlay Content Controll*/}
			<CustomStyles
				attr={attrs?.content_hover_overlay?.decoration?.field_hover_overlay_content_placement ?? {}}
				selector={`${__class__hover_overlay_content}`}
				property="justify-content"
				value={`${__field__hover_overlay_content_placement}`}
			/>
			<CustomStyles
				attr={attrs?.content_hover_overlay?.decoration?.field_hover_overlay_content_alignment ?? {}}
				selector={`${__class__hover_overlay_content}`}
				property="align-items"
				value={`${__field__hover_overlay_content_alignment}`}
			/>

			{/*Hover Overlay Content Transition*/}
			<CustomStyles
				attr={attrs?.content_hover_overlay?.decoration?.field_hover_overlay_content_arrive_from ?? {}}
				selector={`${orderClass} .difl__image_reveal_hover_overlay_content .arrival`}
				staticPropertyAndValue={{
					'transition': `all 1s ease-in-out ${ho_anim_delay}`,
					'transform': `${__class__hover_overlay_content_arrive_from[__field__hover_overlay_content_arrive_from].transform}`,
				}}
			/>

			{/*Hover Zoom Effect*/}
			{
				( 'on' === __field__hover_image_effect_enable && 'off' === __field__hover_overlay_enable ) &&
				<>
					{
						"zoom_in" === __field__hover_image_effect_style &&
						<CustomStyles
							attr={attrs?.content_hover_overlay?.innerContent?.field_effect_style ?? {}}
							selector={`${orderClass} .difl__image_reveal_wrapper .difl__image_reveal_content:hover img`}
							staticPropertyAndValue={{
								'transform-origin': `center center`,
								'transition': `transform ${__field__zooming_time}s, visibility ${parseFloat(__field__zooming_time)/2}s ${__field__Speed_curve}`,
								'-ms-transform': `scale(${__field__zoom_scale})`,
								'-webkit-transform': `scale(${__field__zoom_scale})`,
								'transform': `scale(${__field__zoom_scale})`,
							}}
						/>
					}
					{
						"zoom_n_rotate" === __field__hover_image_effect_style &&
						<CustomStyles
							attr={attrs?.content_hover_overlay?.innerContent?.field_effect_style ?? {}}
							selector={`${orderClass} .difl__image_reveal_wrapper .difl__image_reveal_content:hover img`}
							staticPropertyAndValue={{
								'transform-origin': `center center`,
								'transition': `transform ${__field__zooming_time}s, visibility ${parseFloat(__field__zooming_time)/2}s ${__field__Speed_curve}`,
								'-ms-transform': `scale(${__field__zoom_scale}) rotate(${__field__zoom_rotate}deg)`,
								'-webkit-transform': `scale(${__field__zoom_scale}) rotate(${__field__zoom_rotate}deg)`,
								'transform': `scale(${__field__zoom_scale}) rotate(${__field__zoom_rotate}deg)`,
							}}
						/>
					}
					{
						"blur_out_with_zooming_in" === __field__hover_image_effect_style &&
						<>
							<CustomStyles
								attr={attrs?.content_hover_overlay?.innerContent?.field_effect_style ?? {}}
								selector={`${orderClass} .difl__image_reveal_wrapper .difl__image_reveal_content img`}
								staticPropertyAndValue={{
									'transform': `scale(${__field__zoom_scale})`,
									'transition': `transform ${__field__zooming_time}s, filter ${__field__zooming_blur_out_time}s ${__field__Speed_curve}`,
									'filter': `blur(${__field__zooming_blur_level}px)`,
								}}
							/>
							<CustomStyles
								attr={attrs?.content_hover_overlay?.innerContent?.field_effect_style ?? {}}
								selector={`${orderClass} .difl__image_reveal_wrapper .difl__image_reveal_content:hover img`}
								staticPropertyAndValue={{
									'transform': `scale(1)`,
									'filter': `blur(0)`,
								}}
							/>
						</>
					}
					{
						"colorize_with_zooming_in" === __field__hover_image_effect_style &&
						<>
							<CustomStyles
								attr={attrs?.content_hover_overlay?.innerContent?.field_effect_style ?? {}}
								selector={`${orderClass} .difl__image_reveal_wrapper .difl__image_reveal_content img`}
								staticPropertyAndValue={{
									'transition': `transform ${__field__zooming_time}s, filter ${__field__zooming_time}s ${__field__Speed_curve}`,
									'filter': `grayscale(${__field__zooming_grayscale}%)`,
								}}
							/>
							<CustomStyles
								attr={attrs?.content_hover_overlay?.innerContent?.field_effect_style ?? {}}
								selector={`${orderClass} .difl__image_reveal_wrapper .difl__image_reveal_content:hover img`}
								staticPropertyAndValue={{
									'transform': `scale(${__field__zoom_scale})`,
									'filter': `grayscale(0)`,
								}}
							/>
						</>
					}
				</>

			}
			{
				"on" === __field__caption_enable &&
				<CommonStyle
					selector={`${orderClass} .difl__image_reveal_wrapper .difl__image_wrap .difl_caption`}
					attr={attrs?.content_caption?.decoration?.field_caption_background ?? {}}
					property="background"
				/>
			}

			{/*<CustomStyles*/}
			{/*	attr={attrs?.settings?.innerContent ?? {}}*/}
			{/*	selector={`${orderClass} #difl--social-share--container.difl__social_share__container`}*/}
			{/*	staticPropertyAndValue={column_template_ref[column_view]}*/}
			{/*/>*/}
			{/*/!* Header Icon Position *!/*/}
			{/*<CommonStyle*/}
			{/*	selector={`${orderClass} #difl--social-share--header--container.difl__social_share__header__container`}*/}
			{/*	attr={attrs?.header?.decoration?.header_icon_position ?? {}}*/}
			{/*	property="flex-direction"*/}
			{/*/>*/}

			<CssStyle
				selector={orderClass}
				attr={attrs.css}
				// cssFields={cssFields}
			/>

		</StyleContainer>
	);
}