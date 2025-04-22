import { conversionOutline } from './conversion-outline';
import { Edit } from './Edit';
import metadata from './module.json';

const {
	addAction, addFilter,
} = window?.vendor?.wp?.hooks;


const HandleContentVisibility = ( { attrs, attrName, responsiveMode, stateMode, ...props } ) => {
	return 'content_base' === (attrs?.content_switcher_type?.innerContent?.desktop?.value ?? 'content_base');
}
const HandleShortcodeContentVisibility = ( { attrs, attrName, responsiveMode, stateMode, ...props } ) => {
	return 'shortcode_base' === (attrs?.content_switcher_type?.innerContent?.desktop?.value ?? 'content_base');
}
const HandleLibraryContentVisibility = ( { attrs, attrName, responsiveMode, stateMode, ...props } ) => {
	return 'library_base' === (attrs?.content_switcher_type?.innerContent?.desktop?.value ?? 'content_base');
}
const HandleClassContentVisibility = ( { attrs, attrName, responsiveMode, stateMode, ...props } ) => {
	return 'class_base' === (attrs?.content_switcher_type?.innerContent?.desktop?.value ?? 'content_base');
}
const HandlePrimaryTitleIconVisibility = ( { attrs, attrName, responsiveMode, stateMode, ...props } ) => {
	return 'on' === (attrs?.primary_title_use_icon?.innerContent?.desktop?.value ?? 'off');
}
const HandleSecondaryTitleIconVisibility = ( { attrs, attrName, responsiveMode, stateMode, ...props } ) => {
	return 'on' === (attrs?.secondary_title_use_icon?.innerContent?.desktop?.value ?? 'off');
}
const HandleActiveIconColorVisibility = ( { attrs, attrName, responsiveMode, stateMode, ...props } ) => {
	return 'on' === (attrs?.enable_active_icon_color?.innerContent?.desktop?.value ?? 'off');
}
const HandleSwitcherControlSizeVisibility = ( { attrs, attrName, responsiveMode, stateMode, ...props } ) => {
	return 'button' !== (attrs?.switcher_type?.innerContent?.desktop?.value ?? 'round');
}
const HandlePrimaryBadgeVisibility = ( { attrs, attrName, responsiveMode, stateMode, ...props } ) => {
	return 'on' === (attrs?.enable_primary_badge?.innerContent?.desktop?.value ?? 'off');
}
const HandleSecondaryBadgeVisibility = ( { attrs, attrName, responsiveMode, stateMode, ...props } ) => {
	return 'on' === (attrs?.enable_secondary_badge?.innerContent?.desktop?.value ?? 'off');
}
const HandleContentAnimationVisibility = ( { attrs, attrName, responsiveMode, stateMode, ...props } ) => {
	return 'on' === (attrs?.enable_animation?.innerContent?.desktop?.value ?? 'off');
}
addFilter( "divi.moduleLibrary.moduleSettings.groups.difl.contentswitcher", "difl", ( groups, metadata ) => {
	groups.primary_control.component.props.visible = HandleSwitcherControlSizeVisibility;
	groups.secondary_control.component.props.visible = HandleSwitcherControlSizeVisibility;
	return groups;
} );

addFilter( 'divi.moduleLibrary.moduleAttributes.difl.contentswitcher', 'difl', ( attributes, metadata ) => {
	attributes.content.settings.innerContent.item.visible = HandleContentVisibility;
	attributes.secondary_content.settings.innerContent.item.visible = HandleContentVisibility;
	attributes.shortcode_primary_content.settings.innerContent.item.visible = HandleShortcodeContentVisibility;
	attributes.shortcode_secondary_content.settings.innerContent.item.visible = HandleShortcodeContentVisibility;
	attributes.library_id_primary.settings.innerContent.item.visible = HandleLibraryContentVisibility;
	attributes.library_id_secondary.settings.innerContent.item.visible = HandleLibraryContentVisibility;
	attributes.primary_content_selector.settings.innerContent.item.visible = HandleClassContentVisibility;
	attributes.secondary_content_selector.settings.innerContent.item.visible = HandleClassContentVisibility;

	const title_icons = [
		{ prefix: 'primary', handler: HandlePrimaryTitleIconVisibility },
		{ prefix: 'secondary', handler: HandleSecondaryTitleIconVisibility }
	];

	title_icons.forEach( icon => {
		[ 'title_font_icon', 'title_icon_color', 'title_icon_size', 'icon_align', 'icon_hide_on_mobile' ].forEach( item => {
			attributes[`${ icon.prefix }_title_icon`].settings.innerContent.items[`${ icon.prefix }_${ item }`].visible = icon.handler;
		} );
	} );

	attributes.switcher_control_size.settings.innerContent.item.visible = HandleSwitcherControlSizeVisibility;
	attributes.active_icon_color.settings.innerContent.item.visible = HandleActiveIconColorVisibility;

	const badges = [
		{ prefix: 'primary', handler: HandlePrimaryBadgeVisibility },
		{ prefix: 'secondary', handler: HandleSecondaryBadgeVisibility }
	];

	badges.forEach( badge => {
		[ 'badge_text', 'badge_position', 'badge_top_position', 'badge_arrow_placement', 'badge_arrow_size', 'badge_arrow_position', 'badge_arrow_color' ].forEach( item => {
			attributes[`${ badge.prefix }_badge`].settings.innerContent.items[`${ badge.prefix }_${ item }`].visible = badge.handler;
		} );
	} );

	attributes.content_animation.settings.innerContent.items.content_animation_type.visible = HandleContentAnimationVisibility;
	attributes.content_animation.settings.innerContent.items.content_animation_duration.visible = HandleContentAnimationVisibility;
	console.log("attributes.primary_button_design.settings.decoration.background", attributes.primary_button_design.settings.decoration.background)
	// attributes.primary_button_design.settings.decoration.background.item.visible = false;
	// attributes.secondary_button_design.settings.decoration.background.item.visible = HandleSwitcherControlSizeVisibility;

	attributes.library_id_primary.settings.innerContent.item.component.props.options = diflVBLocalData.library_item;
	attributes.library_id_secondary.settings.innerContent.item.component.props.options = diflVBLocalData.library_item;
	return attributes;
} );
export const ContentToggle = {
	renderers: {
		edit: Edit,
	},
	conversionOutline,
}

export const ContentToggleMetadata = metadata;