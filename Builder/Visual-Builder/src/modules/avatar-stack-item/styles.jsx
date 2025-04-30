// External dependencies.
import React from 'react';
import { __ } from '@wordpress/i18n';

// Divi dependencies.
import {
	StyleContainer,
	CommonStyle,
	CssStyle
} from '@divi/module';
import { getAttrByMode } from '@divi/module-utils';


import { CustomStyles } from '../../helper/custom-styles';
import { animationTransitions } from "../advanced-button/renderers/declarations";

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

			{/* Design Icon */}
			{elements.style( {
				attrName: 'design_icon',
			} )}

			{/* Design Rating */}
			{
				elements.style( {
					attrName: 'design_rating',
				} )
			}
			<CommonStyle
				selector={`${orderClass} .difl_avatar_stack_item_wrapper.has_rating .difl_avatar_stack_rating_container .difl_avatar_stack_rating`}
				attr={attrs?.design_rating?.decoration?.field_rating_alignment ?? {}}
				property="text-align"
			/>
			<CommonStyle
				selector={`${orderClass} .difl_avatar_stack_item_wrapper.has_rating .difl_avatar_stack_rating_container`}
				attr={attrs?.design_rating?.decoration?.field_rating_position ?? {}}
				property="justify-content"
			/>
			<CommonStyle
				selector={`${orderClass} .difl_avatar_stack_item_wrapper.has_rating .difl_avatar_stack_rating_container .difl_avatar_stack_rating`}
				attr={attrs?.design_rating?.decoration?.field_rating_icon_size ?? {}}
				property="font-size"
			/>
			<CommonStyle
				selector={`${orderClass} .difl_avatar_stack_item_wrapper.has_rating .difl_avatar_stack_rating_container .difl_avatar_stack_rating span.rate:before`}
				attr={attrs?.design_rating?.decoration?.field_rating_color ?? {}}
				property="color"
			/>
			<CommonStyle
				selector={`${orderClass} .difl_avatar_stack_item_wrapper.has_rating .difl_avatar_stack_rating_container .difl_avatar_stack_rating span.blank:before`}
				attr={attrs?.design_rating?.decoration?.field_blank_color ?? {}}
				property="color"
			/>

			{/* Design Text */}
			{
				elements.style( {
					attrName: 'design_title_text',
				} )
			}
			{
				elements.style( {
					attrName: 'design_sub_title_text',
				} )
			}
			<CommonStyle
				selector={`${orderClass} .difl_avatar_stack_item_wrapper.has_text .difl_avatar_stack_text_container`}
				attr={attrs?.content_main?.decoration?.field_text_position ?? {}}
				property="justify-content"
			/>

			<CssStyle
				selector={orderClass}
				attr={attrs.css}
			/>
		</StyleContainer>
	);
};