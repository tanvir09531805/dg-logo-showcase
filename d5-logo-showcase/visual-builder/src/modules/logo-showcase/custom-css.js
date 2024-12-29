import metadata from './module.json';

import { __ } from '@wordpress/i18n';

const customCssFields = metadata.customCssFields;

// Add labels to custom CSS fields for Visual Builder
customCssFields.title.label   = __('Title', 'd5-logo-showcase-module-conversion');
customCssFields.content.label = __('Content', 'd5-logo-showcase-module-conversion');

export const cssFields = { ...customCssFields };