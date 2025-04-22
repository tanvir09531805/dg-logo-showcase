// divi-5/visual-builder/src/modules/avatar-stack/styles.jsx
// External dependencies.
import React from 'react';

// Divi dependencies.
import {
	StyleContainer,
	CommonStyle,
	CssStyle
} from '@divi/module';
import { StyleDeclarations } from "@divi/style-library";

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

	const animationData = ( props ) => {
		const { attrValue } = props
		const declarations = new StyleDeclarations( {
			returnType: 'string',
			important: false,
		} );

		const fieldRootTransition = {};
		const default_data = {
			'field_item_translate_x': '0px',
			'field_item_translate_y': '0px',
			'field_item_rotate_x': '0deg',
			'field_item_rotate_y': '0deg',
			'field_item_rotate_z': '0deg',
			'field_item_scale_x': '1',
			'field_item_scale_y': '1',
			'field_item_skew_x': '0deg',
			'field_item_skew_y': '0deg',
			'field_item_trans_duration': '300ms',
			'field_item_trans_delay': '0ms',
			'field_item_trans_easing': 'ease-out',
			'field_stack_translate_x': '0px',
			'field_stack_translate_y': '0px',
			'field_stack_rotate_x': '0deg',
			'field_stack_rotate_y': '0deg',
			'field_stack_rotate_z': '0deg',
		};

		if ( attrValue?.field_item_translate_enable && 'on' === attrValue?.field_item_translate_enable ) {
			fieldRootTransition.field_item_translate_x = '--df-avatarStack-item-trans-x-hover';
			fieldRootTransition.field_item_translate_y = '--df-avatarStack-item-trans-y-hover';
		}
		if ( attrValue?.field_item_rotate_enable && 'on' === attrValue?.field_item_rotate_enable ) {
			fieldRootTransition.field_item_rotate_x = '--df-avatarStack-item-rotate-x-hover';
			fieldRootTransition.field_item_rotate_y = '--df-avatarStack-item-rotate-y-hover';
			fieldRootTransition.field_item_rotate_z = '--df-avatarStack-item-rotate-z-hover';
		}
		if ( attrValue?.field_item_scale_enable && 'on' === attrValue?.field_item_scale_enable ) {
			fieldRootTransition.field_item_scale_x = '--df-avatarStack-item-scale-x-hover';
			fieldRootTransition.field_item_scale_y = '--df-avatarStack-item-scale-y-hover';
		}
		if ( attrValue?.field_item_skew_enable && 'on' === attrValue?.field_item_skew_enable ) {
			fieldRootTransition.field_item_skew_x = '--df-avatarStack-item-skew-x-hover';
			fieldRootTransition.field_item_skew_y = '--df-avatarStack-item-skew-y-hover';
		}
		if ( attrValue?.field_item_transition_enable && 'on' === attrValue?.field_item_transition_enable ) {
			fieldRootTransition.field_item_trans_duration = '--df-avatarStack-item-transition-duration';
			fieldRootTransition.field_item_trans_delay = '--df-avatarStack-item-transition-delay';
			fieldRootTransition.field_item_trans_easing = '--df-avatarStack-item-transition-easing';
		}
		if ( attrValue?.field_stack_translate_enable && 'on' === attrValue?.field_stack_translate_enable ) {
			fieldRootTransition.field_stack_translate_x = '--df-avatarStack-trans-x-normal';
			fieldRootTransition.field_stack_translate_y = '--df-avatarStack-trans-y-normal';
		}
		if ( attrValue?.field_stack_rotate_enable && 'on' === attrValue?.field_stack_rotate_enable ) {
			fieldRootTransition.field_stack_rotate_x = '--df-avatarStack-rotate-x-normal';
			fieldRootTransition.field_stack_rotate_y = '--df-avatarStack-rotate-y-normal';
			fieldRootTransition.field_stack_rotate_z = '--df-avatarStack-rotate-z-normal';
		}

		for ( let key in fieldRootTransition ) {
			let value = attrValue[ key ] ? attrValue[ key ] : default_data[ key ];
			if ( key === 'field_item_trans_duration' || key === 'field_item_trans_delay' ) {
				value += attrValue[ key ] ? 'ms' : '';
			}
			declarations.add( fieldRootTransition[ key ], value );
		}

		return declarations.value;
	}

	return (
		<StyleContainer
			mode={mode}
			state={state}
			noStyleTag={noStyleTag}
		>
			{/* Module */}
			{elements.style( {
				attrName: 'module',
				styleProps: {
					disabledOn: {
						disabledModuleVisibility: settings.disabledModuleVisibility,
					},
				},
			} )}

			{/* Stack Spacing */}
			<CommonStyle
				selector={`${orderClass} #difl-avatar-stack-container .difl_avatar_stack_item:not(:first-child)`}
				selectorFunction={( props ) => {
					if ( "hover" === props.state ) {
						return `${orderClass} #difl-avatar-stack-container.et_vb_hover .difl_avatar_stack_item:not(:first-child), ${orderClass} #difl-avatar-stack-container:hover .difl_avatar_stack_item:not(:first-child)`
					}
					return props.selector;
				}}
				attr={attrs?.content_main?.decoration?.field_stack_spacing ?? {}}
				property="margin-left"
			/>
			{/*--------   Stack Animation --------*/}
			<CommonStyle
				selector={`${orderClass}.difl_avatar_stack`}
				attr={attrs?.content_stack_animations?.decoration ?? {}}
				declarationFunction={animationData}
			/>

			{/*----- Icon -----*/}
			{elements.style( {
				attrName: 'design_child_icon'
			} )}
			<CommonStyle
				selector={`${orderClass} .difl_avatar_stack_item .difl_avatar_stack_item_wrapper.has_icon .difl_avatar_stack_icon`}
				selectorFunction={( props ) => {
					if ( "hover" === props.state ) {
						return `${orderClass} .difl_avatar_stack_item.et_vb_hover .difl_avatar_stack_item_wrapper.has_icon .difl_avatar_stack_icon, ${orderClass} .difl_avatar_stack_item:hover .difl_avatar_stack_item_wrapper.has_icon .difl_avatar_stack_icon`
					}
					return props.selector;
				}}
				attr={attrs?.design_child_icon?.decoration?.field_icon_size ?? {}}
				property="font-size"
			/>
			<CommonStyle
				selector={`${orderClass} .difl_avatar_stack_item .difl_avatar_stack_item_wrapper.has_icon .difl_avatar_stack_icon`}
				selectorFunction={( props ) => {
					if ( "hover" === props.state ) {
						return `${orderClass} .difl_avatar_stack_item.et_vb_hover .difl_avatar_stack_item_wrapper.has_icon .difl_avatar_stack_icon, ${orderClass} .difl_avatar_stack_item:hover .difl_avatar_stack_item_wrapper.has_icon .difl_avatar_stack_icon`;
					}
					return props.selector;
				}}
				attr={attrs?.design_child_icon?.decoration?.field_icon_color ?? {}}
				property="color"
			/>
			<CommonStyle
				selector={`${orderClass} .difl_avatar_stack_item .difl_avatar_stack_item_wrapper.has_icon`}
				selectorFunction={( props ) => {
					if ( "hover" === props.state ) {
						return `${orderClass} .difl_avatar_stack_item.et_vb_hover .difl_avatar_stack_item_wrapper.has_icon, ${orderClass} .difl_avatar_stack_item:hover .difl_avatar_stack_item_wrapper.has_icon`;
					}
					return props.selector;
				}}
				attr={attrs?.design_child_icon?.decoration?.field_icon_background ?? {}}
				property="background-color"
			/>

			{/*------ Media -------*/}
			{elements.style( { attrName: 'design_child_image' } )}

			{/*------ Text -------*/}
			{elements.style( { attrName: 'design_child_text' } )}
			{elements.style( { attrName: 'design_child_text_container' } )}
			<CommonStyle
				selector={`${orderClass} .difl_avatar_stack_item .difl_avatar_stack_item_wrapper.has_text`}
				selectorFunction={( props ) => {
					if ( "hover" === props.state ) {
						return `${orderClass} .difl_avatar_stack_item.et_vb_hover .difl_avatar_stack_item_wrapper.has_text, ${orderClass} .difl_avatar_stack_item:hover .difl_avatar_stack_item_wrapper.has_text`;
					}
					return props.selector;
				}}
				attr={attrs?.design_child_text?.decoration?.field_text_background ?? {}}
				property="background-color"
			/>

			{/*----- Rating -----*/}
			{elements.style( { attrName: 'design_child_rating' } )}
			<CommonStyle
				selector={`${orderClass} .difl_avatar_stack_item .difl_avatar_stack_item_wrapper.has_rating .difl_avatar_stack_rating_container .difl_avatar_stack_rating`}
				attr={attrs?.design_child_rating?.decoration?.field_rating_alignment ?? {}}
				property="text-align"
			/>
			<CommonStyle
				selector={`${orderClass} .difl_avatar_stack_item .difl_avatar_stack_item_wrapper.has_rating .difl_avatar_stack_rating_container`}
				attr={attrs?.design_child_rating?.decoration?.field_rating_position ?? {}}
				property="justify-content"
			/>
			<CommonStyle
				selector={`${orderClass} .difl_avatar_stack_item .difl_avatar_stack_item_wrapper.has_rating .difl_avatar_stack_rating_container .difl_avatar_stack_rating`}
				selectorFunction={( props ) => {
					if ( "hover" === props.state ) {
						return `${orderClass} .difl_avatar_stack_item.et_vb_hover .difl_avatar_stack_item_wrapper.has_rating .difl_avatar_stack_rating_container .difl_avatar_stack_rating, ${orderClass} .difl_avatar_stack_item:hover .difl_avatar_stack_item_wrapper.has_rating .difl_avatar_stack_rating_container .difl_avatar_stack_rating`;
					}
					return props.selector;
				}}
				attr={attrs?.design_child_rating?.decoration?.field_rating_icon_size ?? {}}
				property="font-size"
			/>
			<CommonStyle
				selector={`${orderClass} .difl_avatar_stack_item .difl_avatar_stack_item_wrapper.has_rating .difl_avatar_stack_rating_container .difl_avatar_stack_rating span.rate:before`}
				selectorFunction={( props ) => {
					if ( "hover" === props.state ) {
						return `${orderClass} .difl_avatar_stack_item.et_vb_hover .difl_avatar_stack_item_wrapper.has_rating .difl_avatar_stack_rating_container .difl_avatar_stack_rating span.rate:before, ${orderClass} .difl_avatar_stack_item:hover .difl_avatar_stack_item_wrapper.has_rating .difl_avatar_stack_rating_container .difl_avatar_stack_rating span.rate:before`;
					}
					return props.selector;
				}}
				attr={attrs?.design_child_rating?.decoration?.field_rating_color ?? {}}
				property="color"
			/>
			<CommonStyle
				selector={`${orderClass} .difl_avatar_stack_item .difl_avatar_stack_item_wrapper.has_rating .difl_avatar_stack_rating_container .difl_avatar_stack_rating span.blank:before`}
				selectorFunction={( props ) => {
					if ( "hover" === props.state ) {
						return `${orderClass} .difl_avatar_stack_item.et_vb_hover .difl_avatar_stack_item_wrapper.has_rating .difl_avatar_stack_rating_container .difl_avatar_stack_rating span.blank:before, ${orderClass} .difl_avatar_stack_item:hover .difl_avatar_stack_item_wrapper.has_rating .difl_avatar_stack_rating_container .difl_avatar_stack_rating span.blank:before`;
					}
					return props.selector;
				}}
				attr={attrs?.design_child_rating?.decoration?.field_blank_color ?? {}}
				property="color"
			/>
			<CommonStyle
				selector={`${orderClass} .difl_avatar_stack_item .difl_avatar_stack_item_wrapper.has_rating`}
				selectorFunction={( props ) => {
					if ( "hover" === props.state ) {
						return `${orderClass} .difl_avatar_stack_item.et_vb_hover .difl_avatar_stack_item_wrapper.has_rating, ${orderClass} .difl_avatar_stack_item:hover .difl_avatar_stack_item_wrapper.has_rating`;
					}
					return props.selector;
				}}
				attr={attrs?.design_child_rating?.decoration?.field_rating_background ?? {}}
				property="background-color"
			/>

			{/*------ Spacing ------*/}
			{elements.style( { attrName: 'design_child_icon_spacing' } )}
			{elements.style( { attrName: 'design_child_image_spacing' } )}
			{elements.style( { attrName: 'design_child_rating_spacing' } )}
			{elements.style( { attrName: 'design_child_text_spacing' } )}
			{elements.style( { attrName: 'design_spacing' } )}

			{/*------ Tooltip -------*/}
			{elements.style( { attrName: 'design_tooltip' } )}
			{elements.style( { attrName: 'design_tooltip_text' } )}
			{elements.style( { attrName: 'design_tooltip_header' } )}
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
				selector={`.tippy-box[data-theme~='${orderClass}'][data-placement^='left'] > .tippy-arrow::before`}
				attr={attrs?.design_tooltip?.decoration?.field_tooltip_arrow_color ?? {}}
				property="border-left-color"
			/>
			<CommonStyle
				selector={`.tippy-box[data-theme~='${orderClass}'][data-placement^='right'] > .tippy-arrow::before`}
				attr={attrs?.design_tooltip?.decoration?.field_tooltip_arrow_color ?? {}}
				property="border-right-color"
			/>
			<CommonStyle
				selector={`.tippy-box[data-theme~='${orderClass}'] .tippy-content p`}
				attr={attrs?.design_tooltip?.decoration?.field_tooltip_arrow_color ?? {}}
				declarationFunction={( props ) => "padding-bottom: 0px;"}
			/>

			<CssStyle
				selector={orderClass}
				attr={attrs.css}
			/>
		</StyleContainer>
	);
};