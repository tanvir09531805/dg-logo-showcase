// External library dependencies.
import React from 'react';
import metadata from './module.json';
import { Edit } from "./editor/Edit"

import { Content } from "./Settings";
import { Design } from "./Settings";
import { Advanced } from "./Settings";

const {
	addAction, addFilter,
} = window?.vendor?.wp?.hooks;

import './style.scss'
import './vb.scss'
import { conversionOutline } from "./conversion-outline";
console.log("window?.divi?.moduleUtils", window?.divi?.moduleUtils)

export const getPanel = ( panel = 'content' ) => {
	const { settings: { groups } } = metadata;
	const contentPanel = [];
	Object.keys( groups ).forEach( slug => {
		if ( groups[slug].panel === panel ) {
			contentPanel.push( groups[slug] )
		}
	} );
	return contentPanel;
}

export const getPropValue = ( key, props ) => {
	let { attrs, defaultSettingsAttrs } = props;
	const parts = key.split( "." );
	let value = null;

	for ( const part of parts ) {
		if ( ! attrs ) return null;
		attrs = attrs[part];
	}

	value = attrs?.desktop?.value ?? attrs?.value ?? null;

	if ( value === null ) {
		for ( const part of parts ) {
			if ( ! defaultSettingsAttrs ) return null;
			defaultSettingsAttrs = defaultSettingsAttrs[part];
		}

		value = defaultSettingsAttrs?.desktop?.value ?? defaultSettingsAttrs?.value ?? null;
	}

	return value;
}

// const HandleIconVisibility = ( { attrs, defaultSettingsAttrs, attrName, responsiveMode, stateMode, } ) => {
// 	console.log( "defaultSettingsAttrs", defaultSettingsAttrs )
// 	return 'on' === attrs?.icon_image?.innerContent?.desktop?.value?.blurb_icon_enable ?? defaultSettingsAttrs?.icon_image?.innerContent;
// }
// const HandleImageVisibility = ( { attrs, attrName, responsiveMode, stateMode, } ) => {
// 	console.log( "defaultSettingsAttrs", defaultSettingsAttrs )
// 	return 'off' === attrs?.icon_image?.innerContent?.desktop?.value?.blurb_icon_enable;
// }
//
// addFilter( 'divi.moduleLibrary.moduleAttributes.difl.advanced-blurb', 'difl', ( attributes, metadata ) => {
// 	attributes.icon_image = {
// 		"type": "object",
// 		"settings": {
// 			"innerContent": {
// 				"groupType": "group-items",
// 				"items": {
// 					"blurb_icon_enable": { ...attributes.icon_image.settings.innerContent.items.blurb_icon_enable },
// 					"image": {
// 						...attributes.icon_image.settings.innerContent.items.image,
// 						"visible": HandleImageVisibility
// 					},
// 					"icon": {
// 						...attributes.icon_image.settings.innerContent.items.icon,
// 						"visible": HandleIconVisibility,
// 					}
// 				}
// 			},
// 			"decoration": { ...attributes.icon_image.decoration }
// 		}
// 	}
//
// 	return attributes;
// } );


// window.vendor.wp.hooks.addFilter('divi.moduleLibrary.moduleMapping', 'difl', modules => {
// 	console.log("modules", modules);
//
// 	return modules;
// });

const getPanelFields = ( panel = 'content' ) => {
	const { attributes } = metadata;
	return {}
}

const HandleIconVisibility = ( { attrs, attrName, responsiveMode, stateMode, ...props } ) => {
	return 'on' === (attrs?.icon_image?.innerContent?.desktop?.value?.blurb_icon_enable ?? 'off');
}
const HandleImageVisibility = ( { attrs, attrName, responsiveMode, stateMode, ...props } ) => {
	return 'off' === (attrs?.icon_image?.innerContent?.desktop?.value?.blurb_icon_enable ?? 'off');
}

const HandleBadgeVisibility = ( { attrs, attrName, responsiveMode, stateMode, ...props } ) => {
	return 'on' === (attrs?.badge?.innerContent?.desktop?.value?.badge_enable ?? 'off');
}

const HandleBadgeIconVisibility = ( { attrs, attrName, responsiveMode, stateMode, ...props } ) => {
	return 'on' === (attrs?.badge?.innerContent?.desktop?.value?.badge_icon_enable ?? 'off') && 'on' === (attrs?.badge?.innerContent?.desktop?.value?.badge_enable ?? 'off');
}

const HandleItemOrderVisibility = ( { attrs, attrName, responsiveMode, stateMode, ...props } ) => {
	return 'on' === (attrs?.item_order?.innerContent?.desktop?.value?.order_enable ?? 'off');
}

const HandleButtonWidthAlignmentVisibility	= ( { attrs, attrName, responsiveMode, stateMode, ...props } ) => {
	return 'off' === (attrs?.button_width_alignment?.innerContent?.desktop?.value?.button_full_width ?? 'off');
}
addFilter( 'divi.moduleLibrary.moduleAttributes.difl.advanced-blurb', 'difl', ( attributes, metadata ) => {
	attributes.icon_image.settings.innerContent.items.image.visible = HandleImageVisibility;
	attributes.icon_image.settings.innerContent.items.icon.visible = HandleIconVisibility;

	attributes.badge.settings.innerContent.items.badge_text_1.visible = HandleBadgeVisibility;
	attributes.badge.settings.innerContent.items.badge_text_2.visible = HandleBadgeVisibility;
	attributes.badge.settings.innerContent.items.badge_icon_enable.visible = HandleBadgeVisibility;
	attributes.badge.settings.innerContent.items.badge_icon.visible = HandleBadgeIconVisibility;

	attributes.item_order.settings.innerContent.items.title_order.visible = HandleItemOrderVisibility;
	attributes.item_order.settings.innerContent.items.sub_title_order.visible = HandleItemOrderVisibility;
	attributes.item_order.settings.innerContent.items.content_order.visible = HandleItemOrderVisibility;
	attributes.item_order.settings.innerContent.items.button_order.visible = HandleItemOrderVisibility;
	attributes.item_order.settings.innerContent.items.badge_order.visible = HandleItemOrderVisibility;

	attributes.button_width_alignment.settings.innerContent.items.button_alignment.visible = HandleButtonWidthAlignmentVisibility;

	return attributes;
} );

export const Advanced_Blurb = {
	settings: {
		content: Content,
		design: Design,
		advanced: Advanced,
	},
	renderers: {
		edit: Edit,
	},
	conversionOutline
}

export const BlurbMetadata = metadata;