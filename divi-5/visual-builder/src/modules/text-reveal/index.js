import { TextRevealEdit } from './edit';
import metadata from './module.json';
import { conversionOutline } from './conversion-outline';
import { SettingsAdvanced } from './settings-advanced';
import { SettingsContent } from './settings-content';
import { SettingsDesign } from './settings-design';
import placeholderContent from './placeholderContent';

export const textRevealMetadata = metadata;

export const textReveal = {
  renderers: {
    edit: TextRevealEdit,
  },
  settings: {
    content: SettingsContent,
    design: SettingsDesign,
    advanced: SettingsAdvanced,
  },
  placeholderContent:placeholderContent,
  conversionOutline,
};