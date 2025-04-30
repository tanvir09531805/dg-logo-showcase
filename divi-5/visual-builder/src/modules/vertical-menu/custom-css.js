import metadata from './module.json';

import { __ } from '@wordpress/i18n';

const customCssFields = metadata.customCssFields;

// Add labels to custom CSS fields for Visual Builder
customCssFields.main_menu.label   = __('Main Menu', 'divi_flash');

export const cssFields = { ...customCssFields };