import metadata from './module.json';
import { conversionOutline } from './conversion-outline';
import { Edit } from "./edit";

export const advancedCarousel = {
	metadata: metadata,
	childrenName: ['difl/content-carousel-item'],
	settings: {},
	renderers: {
		edit: Edit,
	},
	conversionOutline
};


function enablesSlidesShadows({
	attrs,
	attrName,
	responsiveMode,
	stateMode,
  }) { 
	return ('on' === attrs.addSettingCarousel?.innerContent.desktop?.value?.slideShadows) ? true : false;
}

function carouselSettingAutoplay({
	attrs,
	attrName,
	responsiveMode,
	stateMode,
  }) {
	return ("on" === attrs.settingCarousel?.innerContent?.desktop?.value?.autoplay) ? true : false;
}

function carouselSettingLightbox({
	attrs,
	attrName,
	responsiveMode,
	stateMode,
  }) { 
	return ("on" === attrs.settingCarousel?.innerContent?.desktop?.value?.useLightbox) ? true : false;
}

function arrowIconPrev({ attrs, }) { 
	return ("on" === attrs.arrowPrevIcon?.innerContent?.desktop?.value) ? true : false;
}

function arrowIconNext({ attrs, }) { 
	return ("on" === attrs.arrowNextIcon?.innerContent?.desktop?.value) ? true : false;
}

function carouselTypeCoverFlow({
	attrs,
	attrName,
	responsiveMode,
	stateMode,
  }) { 

	return ("coverflow" === attrs.settingCarousel?.innerContent?.desktop?.value?.carouselType) ? true : false;
}

window.vendor.wp.hooks.addFilter('divi.moduleLibrary.moduleAttributes.difl.content-carousel', 'divi', (attributes, metadata) => {

	attributes.addSettingCarousel.settings.innerContent.items.shadowDarkColor.visible = enablesSlidesShadows;
	attributes.addSettingCarousel.settings.innerContent.items.shadowLightColor.visible = enablesSlidesShadows;
  
	attributes.settingCarousel.settings.innerContent.items.autoplaySpeed.visible = carouselSettingAutoplay;
	attributes.settingCarousel.settings.innerContent.items.pauseOnHover.visible = carouselSettingAutoplay;
	attributes.settingCarousel.settings.innerContent.items.showTitleOnLightbox.visible = carouselSettingLightbox;
  
	attributes.arrowPrevIcon.settings.decoration.icon.items.arrowPrevIcon.component.props.visible = arrowIconPrev;
	attributes.arrowPrevIcon.settings.decoration.sizing.item.visible = arrowIconPrev;
  
	attributes.arrowNextIcon.settings.decoration.icon.items.icon.visible = arrowIconNext;
	attributes.arrowNextIcon.settings.decoration.sizing.items.fontSize.visible = arrowIconNext;
  
	metadata.settings.groups.advancedSettings.component.props.visible = carouselTypeCoverFlow;
  
	return attributes;
});

