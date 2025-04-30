import metadata from './module.json';

import { Edit } from "./edit";

import './styles.scss';


import { conversionOutline } from "./conversion-outline";


const iconPickerVisibleCallback = ( {
	                                    attrs,
	                                    attrName,
	                                    responsiveMode,
	                                    stateMode
                                    } ) => 'icon' === ( attrs?.content_main?.innerContent?.field_content_type?.desktop?.value ?? 'icon' );
const imageVisibleCallback = ( {
	                               attrs,
	                               attrName,
	                               responsiveMode,
	                               stateMode
                               } ) => 'image' === ( attrs?.content_main?.innerContent?.field_content_type?.desktop?.value ?? 'icon' );

const ratingVisibleCallback = ( {
	                                attrs,
	                                attrName,
	                                responsiveMode,
	                                stateMode
                                } ) => 'rating' === ( attrs?.content_main?.innerContent?.field_content_type?.desktop?.value ?? 'icon' );
const textVisibleCallback = ( { attrs } ) => "text" === ( attrs?.content_main?.innerContent?.field_content_type?.desktop?.value ?? 'icon' );

const tooltipVisibleCallback = ( { attrs } ) => {
	console.log( "window?.divi?.moduleUtils", window?.divi?.moduleUtils )
	return true;
}

// window.vendor.wp.hooks.addFilter( 'divi.moduleLibrary.moduleAttributes.difl.avatar-stack', 'difl', ( attributes, metadata ) => {
// 	console.log( "tooltipVisibleCallback => ", attributes, metadata );
// 	attributes.content_main.settings.innerContent.items.field_subtitle_text.visible = textVisibleCallback;
// })

window.vendor.wp.hooks.addFilter( 'divi.moduleLibrary.moduleAttributes.difl.avatar-stack-item', 'difl', ( attributes, metadata ) => {
	attributes.content_main.settings.innerContent.items.field_font_icon.visible = iconPickerVisibleCallback;
	attributes.content_main.settings.innerContent.items.field_image_src.visible = imageVisibleCallback;
	attributes.design_rating.settings.innerContent.items.field_rating_number.visible = ratingVisibleCallback;
	attributes.design_rating.settings.innerContent.items.field_rating_label.visible = ratingVisibleCallback;
	attributes.design_rating.settings.innerContent.items.field_rating_position.visible = ratingVisibleCallback;
	attributes.content_main.settings.innerContent.items.field_title_text.visible = textVisibleCallback;
	attributes.content_main.settings.innerContent.items.field_subtitle_text.visible = textVisibleCallback;
	attributes.content_main.settings.innerContent.items.field_text_position.visible = textVisibleCallback;

	attributes.design_icon.settings.innerContent.items.field_icon_color.visible = iconPickerVisibleCallback;
	attributes.design_icon.settings.innerContent.items.field_icon_size.visible = iconPickerVisibleCallback;
	attributes.design_rating.settings.innerContent.items.field_rating_alignment.visible = ratingVisibleCallback;
	attributes.design_rating.settings.innerContent.items.field_rating_icon_size.visible = ratingVisibleCallback;
	attributes.design_rating.settings.innerContent.items.field_rating_color.visible = ratingVisibleCallback;
	attributes.design_rating.settings.innerContent.items.field_blank_color.visible = ratingVisibleCallback;

	metadata.settings.groups.design_icon.component.props.visible = iconPickerVisibleCallback;
	metadata.settings.groups.design_rating.component.props.visible = ratingVisibleCallback;
	metadata.settings.groups.design_text.component.props.visible = textVisibleCallback;
	// metadata.settings.groups.content_tooltip.component.props.visible = tooltipVisibleCallback;


	return attributes;
} );

export const avatarStackItem = {
	metadata: metadata,
	// settings: {
	// 	content: Content,
	// 	design: Design,
	// 	advanced: Advanced,
	// },
	renderers: {
		edit: Edit,
	},
	parentsName: [ 'difl/avatar-stack' ],
	conversionOutline
};