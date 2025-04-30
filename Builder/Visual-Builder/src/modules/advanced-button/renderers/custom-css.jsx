// External dependencies.
import React from 'react';
import { __ } from '@wordpress/i18n';

import metadata from "../module.json";

const customCssFields = metadata.customCssFields;

customCssFields.text.label              = __(customCssFields.text.label, 'divi_flash');
customCssFields.sub_text.label          = __(customCssFields.sub_text.label, 'divi_flash');
customCssFields.media_container.label   = __(customCssFields.media_container.label, 'divi_flash');
export const cssFields = { ...customCssFields };