import metadata from './module.json';

import { Content } from "./settings/content";
import { Design } from "./settings/design";
import { Advanced } from "./settings/advanced";

import { Edit } from "./renderers/edit";

import './styles.scss';

import { conversionOutline } from "./conversion-outline";

export const socialShare = {
	metadata: metadata,
	childrenName: ['difl/social-share-item'],
	settings: {
		content: Content,
		design: Design,
		advanced: Advanced,
	},
	renderers: {
		edit: Edit,
	},
	conversionOutline
};