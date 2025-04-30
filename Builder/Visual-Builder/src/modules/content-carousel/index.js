import metadata from './module.json';
import  './styles.scss';
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

const enablesSlidesShadows = ({ attrs, }) => 'on' === attrs.addSettingCarousel?.innerContent.desktop?.value?.slideShadows;
const carouselSettingAutoplay = ({ attrs, }) => "on" === attrs.settingCarousel?.innerContent?.desktop?.value?.autoplay;
const carouselSettingLightbox = ({ attrs, }) => "on" === attrs.settingCarousel?.innerContent?.desktop?.value?.useLightbox;
const arrowIconPrev = ({ attrs }) => "on" === attrs.arrowPrevIcon?.innerContent?.desktop?.value;
const arrowIconNext = ({ attrs }) => "on" === attrs.arrowNextIcon?.innerContent?.desktop?.value;
const carouselTypeCoverFlow = ({ attrs, }) => "coverflow" === attrs.settingCarousel?.innerContent?.desktop?.value?.carouselType;

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

