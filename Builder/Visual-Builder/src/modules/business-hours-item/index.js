import { BusinessHoursItemEdit } from './edit';
import metadata from './module.json';
import { conversionOutline } from './conversion-outline';
import { __ } from "@wordpress/i18n";
// Internal Dependencies
import "./styles.scss";

export const businessHoursItem = {
  metadata: metadata,
  renderers: {
    edit: BusinessHoursItemEdit,
  },
  conversionOutline,
};

const enableOffDay = ({ attrs, }) => 'on' === attrs?.off_day_enable?.innerContent?.desktop?.value;
const disabledOffDay = ({ attrs, }) => 'on' !== attrs?.off_day_enable?.innerContent?.desktop?.value;
const timeShowHide = ({ attrs, }) => {
  if ('on' !== attrs?.off_day_enable?.innerContent?.desktop?.value && 'default' === attrs?.time_structure_type?.innerContent?.desktop?.value) {
    return true;
  } else {
    return false;
  }
};
const startEndtimeShowHide = ({ attrs, }) => {
  if ('on' !== attrs?.off_day_enable?.innerContent?.desktop?.value && 'advanced' === attrs?.time_structure_type?.innerContent?.desktop?.value) {
    return true;
  } else {
    return false;
  }
};

const separatorDesignDayTime = ({ attrs }) => "on" === attrs.on_separator_day_time?.innerContent?.desktop?.value;

//handle innerContent component show_if && show_if_not condition
window.vendor.wp.hooks.addFilter('divi.moduleLibrary.moduleAttributes.difl.businesshoursitem', 'divi', (attributes, metadata) => {

	attributes.content_info.settings.innerContent.items.off_day_text.visible = enableOffDay;
	attributes.content_info.settings.innerContent.items.time_structure_type.visible = disabledOffDay;
	attributes.start_time.settings.innerContent.items.start_time.visible = startEndtimeShowHide;
	attributes.end_time.settings.innerContent.items.end_time.visible = startEndtimeShowHide;
	attributes.time_separetor.settings.innerContent.items.time_separetor.visible = startEndtimeShowHide;
	attributes.time.settings.innerContent.item.visible = timeShowHide;
  
  metadata.settings.groups.day_time_separetor_design.component.props.visible = separatorDesignDayTime;

  return attributes;

});


