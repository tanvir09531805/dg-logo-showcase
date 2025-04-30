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
} from '@divi/module-utils';

import { CustomStyles } from '../../../helper/custom-styles';

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

			{/* Icon Color */}
			<CommonStyle
				selector={`${orderClass}#difl-social-share-item-wrapper.difl_temp_1.difl_temp_2.difl_social_share_item_wrapper .difl_social_share_icon i:before`}
				attr={attrs?.icon_color?.decoration ?? {}}
				property="color"
			/>

			{/* Icon Size */}
			{ 'on' === getAttrByMode(attrs?.use_icon_font_size?.innerContent) && (
				<CommonStyle
					selector={`${orderClass}#difl-social-share-item-wrapper.difl_temp_1.difl_temp_2.difl_social_share_item_wrapper`}
					attr={attrs?.icon_font_size?.decoration ?? {}}
					property="--df-ss-icon-font-size"
				/>
			)}

			{/* Icon */}
			{elements.style ( {
				attrName: 'icon',
			} )}


			{/* Label */}
			{elements.style ( {
				attrName: 'label',
			} )}

			{/* Label Container */}
			{elements.style ( {
				attrName: 'label_container',
			} )}

		</StyleContainer>
	);
}