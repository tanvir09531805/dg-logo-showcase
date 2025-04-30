import { AdvancedDividerEdit } from './edit';
import metadata from './module.json';
import { conversionOutline } from './conversion-outline';
import { __ } from "@wordpress/i18n";

export const advancedDivider = {
  metadata: metadata,
  renderers: {
    edit: AdvancedDividerEdit,
  },
  conversionOutline,
};


//handle innerContent component show_if && show_if_not condition
window.vendor.wp.hooks.addFilter('divi.moduleLibrary.moduleAttributes.difl.divider', 'divi', (attributes, metadata) => {

  return attributes;
  
});
