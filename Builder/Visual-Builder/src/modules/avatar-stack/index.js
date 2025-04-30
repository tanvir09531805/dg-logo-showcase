import metadata from './module.json';

import { Edit } from "./edit";

import './styles.scss';
import { isEmpty } from "lodash";

import { conversionOutline } from "./conversion-outline";


const itemHoverTranslateFieldVisibleCallback = ({ attrs }) => "on" === ( attrs?.content_stack_animations?.decoration?.desktop?.value?.field_item_translate_enable ?? 'off');
const itemHoverRotateFieldVisibleCallback = ({ attrs }) => "on" === ( attrs?.content_stack_animations?.decoration?.desktop?.value?.field_item_rotate_enable ?? 'off');
const itemHoverScaleFieldVisibleCallback = ({ attrs }) => "on" === ( attrs?.content_stack_animations?.decoration?.desktop?.value?.field_item_scale_enable ?? 'off');
const itemHoverSkewFieldVisibleCallback = ({ attrs }) => "on" === ( attrs?.content_stack_animations?.decoration?.desktop?.value?.field_item_skew_enable ?? 'off');
const itemHoverTransFieldVisibleCallback = ({ attrs }) => "on" === ( attrs?.content_stack_animations?.decoration?.desktop?.value?.field_item_transition_enable ?? 'off');
const stackHoverTranslateFieldVisibleCallback = ({ attrs }) => "on" === ( attrs?.content_stack_animations?.decoration?.desktop?.value?.field_stack_translate_enable ?? 'off');
const stackHoverRotateFieldVisibleCallback = ({ attrs }) => "on" === ( attrs?.content_stack_animations?.decoration?.desktop?.value?.field_stack_rotate_enable ?? 'off');

const tooltipEnableFieldVisibleCallback = ({ attrs }) => "on" === ( attrs?.content_tooltip?.innerContent?.desktop?.value?.field_tooltip_enable ?? 'off');
const tooltipInteractiveEnableFieldVisibleCallback = ({ attrs }) => "on" === ( attrs?.content_tooltip?.innerContent?.desktop?.value?.field_tooltip_enable ?? 'off') && "on" === ( attrs?.content_tooltip?.innerContent?.desktop?.value?.field_tooltip_interactive_border ?? 'on');
const tooltipTriggerEnableFieldVisibleCallback = ({ attrs }) => "on" === ( attrs?.content_tooltip?.innerContent?.desktop?.value?.field_tooltip_enable ?? 'off') && "mouseenter focus" === ( attrs?.content_tooltip?.innerContent?.desktop?.value?.field_tooltip_trigger ?? 'mouseenter focus');
const tooltipOffsetEnableFieldVisibleCallback = ({ attrs }) => "on" === ( attrs?.content_tooltip?.innerContent?.desktop?.value?.field_tooltip_enable ?? 'off') && "on" === ( attrs?.content_tooltip?.innerContent?.desktop?.value?.field_tooltip_offset_enable ?? 'off');


window.vendor.wp.hooks.addFilter( 'divi.moduleLibrary.moduleAttributes.difl.avatar-stack', 'difl', ( attributes, metadata ) => {

	attributes.content_stack_animations.settings.innerContent.items.field_item_translate_x.visible = itemHoverTranslateFieldVisibleCallback;
	attributes.content_stack_animations.settings.innerContent.items.field_item_translate_y.visible = itemHoverTranslateFieldVisibleCallback;

	attributes.content_stack_animations.settings.innerContent.items.field_item_rotate_x.visible = itemHoverRotateFieldVisibleCallback;
	attributes.content_stack_animations.settings.innerContent.items.field_item_rotate_y.visible = itemHoverRotateFieldVisibleCallback;
	attributes.content_stack_animations.settings.innerContent.items.field_item_rotate_z.visible = itemHoverRotateFieldVisibleCallback;

	attributes.content_stack_animations.settings.innerContent.items.field_item_scale_x.visible = itemHoverScaleFieldVisibleCallback;
	attributes.content_stack_animations.settings.innerContent.items.field_item_scale_y.visible = itemHoverScaleFieldVisibleCallback;

	attributes.content_stack_animations.settings.innerContent.items.field_item_skew_x.visible = itemHoverSkewFieldVisibleCallback;
	attributes.content_stack_animations.settings.innerContent.items.field_item_skew_y.visible = itemHoverSkewFieldVisibleCallback;

	attributes.content_stack_animations.settings.innerContent.items.field_item_trans_duration.visible = itemHoverTransFieldVisibleCallback;
	attributes.content_stack_animations.settings.innerContent.items.field_item_trans_delay.visible = itemHoverTransFieldVisibleCallback;
	attributes.content_stack_animations.settings.innerContent.items.field_item_trans_easing.visible = itemHoverTransFieldVisibleCallback;

	attributes.content_stack_animations.settings.innerContent.items.field_stack_translate_x.visible = stackHoverTranslateFieldVisibleCallback;
	attributes.content_stack_animations.settings.innerContent.items.field_stack_translate_y.visible = stackHoverTranslateFieldVisibleCallback;

	attributes.content_stack_animations.settings.innerContent.items.field_stack_rotate_x.visible = stackHoverRotateFieldVisibleCallback;
	attributes.content_stack_animations.settings.innerContent.items.field_stack_rotate_y.visible = stackHoverRotateFieldVisibleCallback;
	attributes.content_stack_animations.settings.innerContent.items.field_stack_rotate_z.visible = stackHoverRotateFieldVisibleCallback;

	// Tooltip Visibility Control
	attributes.content_tooltip.settings.innerContent.items.field_tooltip_arrow.visible = tooltipEnableFieldVisibleCallback;
	attributes.content_tooltip.settings.innerContent.items.field_tooltip_placement.visible = tooltipEnableFieldVisibleCallback;
	attributes.content_tooltip.settings.innerContent.items.field_tooltip_animation.visible = tooltipEnableFieldVisibleCallback;
	attributes.content_tooltip.settings.innerContent.items.field_tooltip_trigger.visible = tooltipEnableFieldVisibleCallback;
	attributes.content_tooltip.settings.innerContent.items.field_tooltip_interactive.visible = tooltipEnableFieldVisibleCallback;
	attributes.content_tooltip.settings.innerContent.items.field_tooltip_interactive_border.visible = tooltipInteractiveEnableFieldVisibleCallback;
	attributes.content_tooltip.settings.innerContent.items.field_tooltip_content_delay.visible = tooltipEnableFieldVisibleCallback;
	attributes.content_tooltip.settings.innerContent.items.field_tooltip_interactive_debounce.visible = tooltipInteractiveEnableFieldVisibleCallback;
	attributes.content_tooltip.settings.innerContent.items.field_tooltip_follow_cursor.visible = tooltipTriggerEnableFieldVisibleCallback;
	attributes.content_tooltip.settings.innerContent.items.field_tooltip_custom_maxwidth.visible = tooltipEnableFieldVisibleCallback;
	attributes.content_tooltip.settings.innerContent.items.field_tooltip_offset_enable.visible = tooltipEnableFieldVisibleCallback;
	attributes.content_tooltip.settings.innerContent.items.field_tooltip_offset_skidding.visible = tooltipOffsetEnableFieldVisibleCallback;
	attributes.content_tooltip.settings.innerContent.items.field_tooltip_offset_distance.visible = tooltipOffsetEnableFieldVisibleCallback;

	metadata.settings.groups.design_tooltip.component.props.visible = tooltipEnableFieldVisibleCallback;
	metadata.settings.groups.design_tooltip_text.component.props.visible = tooltipEnableFieldVisibleCallback;
	metadata.settings.groups.design_tooltip_header.component.props.visible = tooltipEnableFieldVisibleCallback;


	return attributes;
})

export const avatarStack = {
	metadata: metadata,
	// settings: {
	// 	content: Content,
	// 	design: Design,
	// 	advanced: Advanced,
	// },
	renderers: {
		edit: Edit,
	},
	childrenName: [ 'difl/avatar-stack-item' ],
	conversionOutline
};