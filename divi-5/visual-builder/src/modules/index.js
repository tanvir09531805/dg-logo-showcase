import { addAction } from '@wordpress/hooks';

import { textReveal, textRevealMetadata } from "./text-reveal";
import { verticalMenu, verticalMenuMetadata } from "./vertical-menu";

const { registerModule } = window?.divi?.moduleLibrary;

import './module-icon';
import '../fields';
import {advancedPerson, advancedPersonMetadata} from "./advanced-person";
import {imageMask, imageMaskMetadata} from "./image-mask";
import {imageHover, imageHoverMetadata} from "./image-hover";



addAction('divi.moduleLibrary.registerModuleLibraryStore.after', 'difl', () => {
  registerModule(textRevealMetadata, textReveal);
  registerModule(verticalMenuMetadata, verticalMenu);
  registerModule(advancedPersonMetadata,advancedPerson);
  registerModule(imageMaskMetadata,imageMask);
  registerModule(imageHoverMetadata,imageHover)
});