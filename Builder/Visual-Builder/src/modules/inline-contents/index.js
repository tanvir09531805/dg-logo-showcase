import metadata from './module.json';
import './styles.scss';
import { Edit } from "./edit";
import { conversionOutline } from "./conversion-outline";

export const inlineContents = {
	metadata: metadata,
	renderers: {
		edit: Edit,
	},
	childrenName: [ 'difl/inline-contents-item' ],
	conversionOutline
};