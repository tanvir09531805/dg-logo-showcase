// External dependencies.
import React from 'react';

// Divi dependencies.
import {
	StyleContainer,
	CommonStyle,
	CssStyle
} from '@divi/module';
import {
	getAttrByMode,
} from '@divi/module-utils';

import { cssFields } from './custom-css';
import { CustomStyles } from "../../../helper/custom-styles";

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

	const column_template_ref = {
		'auto': {
			'gap': "10px",
			'display': "inline-flex",
			'flex-wrap': "wrap"
		},
		'one': {
			'display': "grid",
			'grid-template-columns': "repeat(1, 1fr)"
		},
		'two': {
			'display': "grid",
			'grid-template-columns': "repeat(2, 1fr)"
		},
		'three': {
			'display': "grid",
			'grid-template-columns': "repeat(3, 1fr)"
		},
		'four': {
			'display': "grid",
			'grid-template-columns': "repeat(4, 1fr)"
		},
		'five': {
			'display': "grid",
			'grid-template-columns': "repeat(5, 1fr)"
		},
		'six': {
			'display': "grid",
			'grid-template-columns': "repeat(6, 1fr)"
		}
	};

	const column_view = getAttrByMode( attrs?.settings?.innerContent?.column_view ) ?? 'auto';

	let css_key = 'justify-content';
	if([ 'column', 'column-reverse' ].includes( attrs?.icon?.decoration?.icon_position?.desktop?.value )){
		css_key = 'align-items';
	}

	// Icon Custom Padding
	const icon_custom_padding = getAttrByMode( attrs?.icon?.decoration?.spacing )?.padding ?? null;

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


			{elements.style( { attrName: 'settings' } )}
			{elements.style( { attrName: 'header' } )}
			{elements.style( { attrName: 'header_title' } )}
			{elements.style( { attrName: 'header_sub_title' } )}
			{elements.style( { attrName: 'header_container' } )}
			{elements.style( { attrName: 'icon' } )}
			{elements.style( { attrName: 'label' } )}
			{elements.style( { attrName: 'label_container' } )}

			<CustomStyles
				attr={attrs?.settings?.innerContent ?? {}}
				selector={`${orderClass} #difl-social-share-container.difl_social_share_container`}
				staticPropertyAndValue={column_template_ref[column_view]}
			/>

			<CommonStyle
				selector={`${orderClass} #difl-social-share-container.difl_social_share_container`}
				attr={attrs?.settings?.decoration?.columns_gap ?? {}}
				property="column-gap"
			/>
			<CommonStyle
				selector={`${orderClass} #difl-social-share-container.difl_social_share_container`}
				attr={attrs?.settings?.decoration?.rows_gap ?? {}}
				property="row-gap"
			/>
			<CommonStyle
				selector={`${orderClass} #difl-social-share-container.difl_social_share_container .difl_social_share_item_wrapper`}
				attr={attrs?.settings?.decoration?.button_height ?? {}}
				property="height"
			/>
			{
				([ 'column', 'column-reverse' ].includes( attrs?.icon?.decoration?.icon_position?.desktop?.value ) && "" !== attrs?.settings?.decoration?.button_height?.desktop?.value ) &&
				<CustomStyles
					attr={attrs?.settings?.innerContent ?? {}}
					selector={`${orderClass} #difl-social-share-container .difl_social_share_item_wrapper`}
					staticPropertyAndValue={{'justify-content': 'center'}}
				/>
			}

			{/* Content Alignment */}
			<CommonStyle
				selector={`${orderClass} > div:first-of-type`}
				attr={attrs?.alignment?.decoration?.content_alignment ?? {}}
				property="text-align"
			/>

			{/* Column Auto Child Content Alignment */}
			<CommonStyle
				selector={`${orderClass} .difl_social_share_container`}
				attr={attrs?.alignment?.decoration?.column_auto_child_item_alignment ?? {}}
				property="justify-content"
			/>

			{/* Child Content Alignment */}
			<CommonStyle
				selector={`${orderClass} #difl-social-share-container .difl_social_share_item_wrapper`}
				attr={attrs?.alignment?.decoration?.child_content_alignment ?? {}}
				property={css_key}
			/>

			{/* Icon Position */}
			<CommonStyle
				selector={`${orderClass} .difl_social_share_container`}
				attr={attrs?.icon?.decoration?.icon_position ?? {}}
				property="flex-direction"
			/>

			{/* Icon Alignment */}
			<CommonStyle
				selector={`${orderClass} #difl-social-share-container .difl_social_share_item_wrapper .difl_social_share_icon`}
				attr={attrs?.icon?.decoration?.icon_alignment ?? {}}
				property="align-self"
			/>

			{/*Icon Custom Padding*/}
			{
				icon_custom_padding &&
				<CustomStyles
					attr={attrs?.icon?.decoration?.spacing ?? {}}
					selector={`${orderClass} #difl-social-share-container.difl_social_share_container a.difl_social_share_item_wrapper .difl_social_share_icon`}
					staticPropertyAndValue={{'width': 'auto', 'height': 'auto'}}
				/>
			}

			{/* Header Icon Size */}
			{
				"on" === attrs?.header?.innerContent?.desktop?.value?.use_header_icon_font_size &&
				<CustomStyles
					attr={attrs?.header?.decoration?.header_icon_font_size ?? {}}
					selector={`${orderClass} #difl-social-share-header #difl-social-share-header-container.difl_social_share_header_container`}
					property="--df-header-icon-size"
				/>
			}
			{/* Header Icon Position */}
			<CommonStyle
				selector={`${orderClass} #difl-social-share-header-container.difl_social_share_header_container`}
				attr={attrs?.header?.decoration?.header_icon_position ?? {}}
				property="flex-direction"
			/>
			{/* Header Icon Alignment */}
			<CommonStyle
				selector={`${orderClass} #difl-social-share-header-container.difl_social_share_header_container .difl_social_share_header_icon`}
				attr={attrs?.header?.decoration?.header_icon_alignment ?? {}}
				property="align-self"
			/>
			{/* Header  Content Gap */}
			<CommonStyle
				selector={`${orderClass} #difl-social-share-header-container.difl_social_share_header_container`}
				attr={attrs?.header_container?.decoration?.header_content_gap ?? {}}
				property="gap"
			/>
			{/* Header Alignment */}
			<CommonStyle
				selector={`${orderClass} .difl_social_share_header`}
				attr={attrs?.header_container?.decoration?.header_alignment ?? {}}
				property="justify-content"
			/>

			<CssStyle
				selector={orderClass}
				attr={attrs.css}
				cssFields={cssFields}
			/>

		</StyleContainer>
	);
}