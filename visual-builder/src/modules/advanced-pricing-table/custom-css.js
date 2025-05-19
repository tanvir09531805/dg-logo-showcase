import metadata from './module.json';

import { __ } from '@wordpress/i18n';

const customCssFields = metadata.customCssFields;
export const cssFields = { ...customCssFields };