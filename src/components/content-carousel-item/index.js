import metadata from './module.json';
import { Edit } from "./edit";
import { conversionOutline } from './conversion-outline';

export const advancedCarouselItem = {
	metadata: metadata,
	settings: {},
	renderers: {
		edit: Edit,
	},
	parentsName: [ 'diviflash/content-carousel' ],
	conversionOutline,
};

function iconPickerVisible({
	attrs,
	attrName,
	responsiveMode,
	stateMode,
  }) {
	return 'on' === attrs?.imageIcon?.innerContent?.desktop?.value?.useIcon;
}
  
function iconPickerInvisible({
	attrs,
	attrName,
	responsiveMode,
	stateMode,
  }) {
	return ('on' === attrs?.imageIcon?.innerContent?.desktop?.value?.useIcon) ? false : true;
}
  
function imgFullWidth({ attrs, }) { 
	return ("on" === attrs.useImage?.decoration?.fullWidth?.desktop?.value) ? false : true;
}
  
function imageAltTextHas({
	attrs,
	attrName,
	responsiveMode,
	stateMode,
  }) { 
	let imageAlt  = attrs?.useImage?.innerContent?.items?.src?.desktop?.value?.alt;
	let imgSetAlt = attrs?.useImage?.innerContent?.items?.alt?.desktop?.value?.alt;
  
	return imgSetAlt ? imgSetAlt : imageAlt;
}
  
window.vendor.wp.hooks.addFilter('divi.moduleLibrary.moduleAttributes.diviflash.content-carousel-item', 'divi', (attributes, metadata) => {
  
	attributes.useIcon.settings.decoration.background.item.component.props.visible = iconPickerVisible;
	attributes.useIcon.settings.decoration.icon.items.icon.visible = iconPickerVisible;
	attributes.useIcon.settings.decoration.icon.items.iconAttributes.component.props.visible = iconPickerVisible;
	attributes.useIcon.settings.decoration.sizing.items.alignment.visible = iconPickerVisible;
	attributes.useIcon.settings.decoration.sizing.items.circleIcon.visible = iconPickerVisible;
	attributes.useIcon.settings.decoration.sizing.items.fontSize.visible = iconPickerVisible;
  
	attributes.useImage.settings.decoration.imageAlignment.item.visible = imgFullWidth;
	attributes.useImage.settings.decoration.maxWidth.item.visible = imgFullWidth;
  
	attributes.useImage.settings.innerContent.items.src.visible = iconPickerInvisible;
	attributes.useImage.settings.innerContent.items.alt.visible = iconPickerInvisible;
  
	return attributes;
	
});

  