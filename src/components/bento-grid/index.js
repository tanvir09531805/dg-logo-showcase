import metadata from './module.json';

import { Content } from "./settings/content";
import { Design } from "./settings/design";
import { Advanced } from "./settings/advanced";

import { Edit } from "./renderers/edit";

import './styles.scss';

export const bentoGrid = {
	metadata: metadata,
	childrenName: ['diviflash/bento-grid-item'],
	settings: {
		content: Content,
		design: Design,
		advanced: Advanced,
	},
	renderers: {
		edit: Edit,
	},
};