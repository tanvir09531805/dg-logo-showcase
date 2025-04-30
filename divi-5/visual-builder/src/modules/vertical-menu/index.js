import { VerticalMenuEdit } from './edit';
import metadata from './module.json';
import { conversionOutline } from './conversion-outline';
import { SettingsAdvanced } from './settings-advanced';
import { SettingsContent } from './settings-content';
import { SettingsDesign } from './settings-design';

export const verticalMenuMetadata = metadata;

export const verticalMenu = {
    renderers: {
        edit: VerticalMenuEdit,
    },
    settings: {
        content: SettingsContent,
        design: SettingsDesign,
        advanced: SettingsAdvanced,
    },
    conversionOutline,
};