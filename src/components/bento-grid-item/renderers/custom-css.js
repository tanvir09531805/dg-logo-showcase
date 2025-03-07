// WordPress dependencies.
const { __ } = window?.vendor?.wp?.i18n;

import metadata from '../module.json';


const customCssFields = metadata.customCssFields;

customCssFields.contentContainer.label = __('Content Container', 'divi_flash');
customCssFields.title.label            = __('Title', 'divi_flash');
customCssFields.content.label          = __('Content', 'divi_flash');
customCssFields.icon.label             = __('Icon', 'divi_flash');

export const cssFields = { ...customCssFields };
