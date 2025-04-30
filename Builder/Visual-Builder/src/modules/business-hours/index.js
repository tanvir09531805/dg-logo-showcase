
import metadata from './module.json';
import { conversionOutline } from './conversion-outline';
import { BusinessHoursEdit } from './edit';
import "./styles.scss";

export const businessHours = {
    metadata: metadata,
    childrenName: ['difl/businesshoursitem'],
    settings: {},
    renderers: {
        edit: BusinessHoursEdit,
    },
    conversionOutline,
};

const titleOnOff = ({ attrs, }) => 'on' === attrs?.title_on_off?.innerContent?.desktop?.value;

//handle innerContent component show_if && show_if_not condition
window.vendor.wp.hooks.addFilter('divi.moduleLibrary.moduleAttributes.difl.businesshours', 'divi', (attributes, metadata) => {

	attributes.heading_title_text.settings.innerContent.item.visible = titleOnOff;
	attributes.title_wrapper_spacing.settings.decoration.spacing.item.visible = titleOnOff;
  
  return attributes;
});
