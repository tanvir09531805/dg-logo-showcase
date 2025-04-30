import metadata from './module.json';

import { Edit } from "./edit";

import './styles.scss';
import { conversionOutline } from "./conversion-outline";

const updateAdminLabel = ({ attrs }) => attrs?.content_main?.innerContent?.content_type?.desktop?.value ?? 'Text';
const contentTextFieldVisibleCallback = ({ attrs }) => "Text" === ( attrs?.content_main?.innerContent?.content_type?.desktop?.value ?? 'Text');
const contentIconFieldVisibleCallback = ({ attrs }) => "Icon" === ( attrs?.content_main?.innerContent?.content_type?.desktop?.value ?? 'Text');
const contentImageFieldVisibleCallback = ({ attrs }) => "Image" === ( attrs?.content_main?.innerContent?.content_type?.desktop?.value ?? 'Text');
const contentLineBreakFieldVisibleCallback = ({ attrs }) => "Line_Break" === ( attrs?.content_main?.innerContent?.content_type?.desktop?.value ?? 'Text');

window.vendor.wp.hooks.addFilter( 'divi.moduleLibrary.moduleAttributes.difl.inline-contents-item', 'difl', ( attributes, metadata ) => {

	// attributes.module.meta.adminLabel.desktop.value = updateAdminLabel;
	attributes.content_main.settings.innerContent.items.content_text.visible = contentTextFieldVisibleCallback;
	attributes.content_main.settings.innerContent.items.content_icon.visible = contentIconFieldVisibleCallback;
	attributes.content_main.settings.innerContent.items.content_image.visible = contentImageFieldVisibleCallback;

	metadata.settings.groups.content_text.component.props.visible = contentTextFieldVisibleCallback;
	metadata.settings.groups.content_icon.component.props.visible = contentIconFieldVisibleCallback;
	metadata.settings.groups.content_media.component.props.visible = contentImageFieldVisibleCallback;

	return attributes;
})

export const inlineContentsItem = {
	metadata: metadata,
	renderers: {
		edit: Edit,
	},
	parentsName: [ 'difl/inline-contents' ],
	conversionOutline
};