// External dependencies.
import { __ } from '@wordpress/i18n';

import metadata from "../module.json";

const customCssFields = metadata.customCssFields;
customCssFields.button_container.label              = __( 'Share Button', 'divi_flash' );
customCssFields.button_container_hover.label        = __( 'Share Button Hover', 'divi_flash' );
customCssFields.icon_image_container.label          = __( 'Icon/Image Container', 'divi_flash' );
customCssFields.icon_image_container_hover.label    = __( 'Icon/Image Container Hover', 'divi_flash' );
customCssFields.label_container.label               = __( 'Label Container', 'divi_flash' );
customCssFields.label_container_hover.label         = __( 'Label Container Hover', 'divi_flash' );
customCssFields.icon.label                          = __( 'Icon', 'divi_flash' );
customCssFields.icon_hover.label                    = __( 'Icon Hover', 'divi_flash' );
customCssFields.image.label                         = __( 'Image', 'divi_flash' );
customCssFields.image_hover.label                   = __( 'Image Hover', 'divi_flash' );
customCssFields.label.label                         = __( 'Label', 'divi_flash' );
customCssFields.label_hover.label                   = __( 'Label Hover', 'divi_flash' );

export const cssFields = { ...customCssFields };