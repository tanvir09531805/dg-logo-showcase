// External dependencies.
import React from 'react';
import { __ } from '@wordpress/i18n';

import metadata from "../module.json";

const customCssFields = metadata.customCssFields;
// customCssFields.button_container.label              = __( 'Share Button', 'divi_flash' );

export const cssFields = { ...customCssFields };