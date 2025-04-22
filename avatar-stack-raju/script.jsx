import React, {
	Fragment, useEffect
} from 'react';

import {
	ModuleScriptDataProps,
} from '@divi/module';
import   '../../../../../public/js/lib/popper.min.js';
import  '../../../../../public/js/lib/tippy-bundle.min.js';
import tippy from 'tippy.js';
import $ from 'jquery';


/**
 * Parent module's script data component.
 *
 * @since ??
 *
 * @param {ModuleScriptDataProps<ParentModuleAttrs>} props React component props.
 *
 * @returns {ReactElement}
 */
export const ScriptData = ( props ) => {
	const {
		attrs,
		elements,
		selector,
		id
	} = props;

	useEffect(() => {
		process_tooltip()
	}, [
		attrs?.content_tooltip?.innerContent
	]);

	useEffect(() => {
		process_text_heading_level()
	}, [
		attrs?.design_child_text?.decoration?.font?.font?.desktop?.value?.headingLevel,
		attrs?.design_child_text_container?.decoration?.font?.font?.desktop?.value?.headingLevel
	]);

	const process_tooltip = () => {
		const tooltipStatus = "on" === ( attrs?.content_tooltip?.innerContent?.desktop?.value?.field_tooltip_enable ?? "off" );
		const tooltipOffsetStatus = "on" === ( attrs?.content_tooltip?.innerContent?.desktop?.value?.field_tooltip_offset_enable ?? "off" );
		const offsetSkidding = tooltipOffsetStatus && parseInt(attrs?.content_tooltip?.innerContent?.desktop?.value?.field_tooltip_offset_skidding ?? 0);
		const offsetDistance = tooltipOffsetStatus && parseInt(attrs?.content_tooltip?.innerContent?.desktop?.value?.field_tooltip_offset_distance ?? 10);
		if (tooltipStatus) {
			const field_tooltip_arrow = attrs?.content_tooltip?.innerContent?.desktop?.value?.field_tooltip_arrow ?? "on";
			const field_tooltip_animation = attrs?.content_tooltip?.innerContent?.desktop?.value?.field_tooltip_animation ?? "fade";
			const field_tooltip_placement = attrs?.content_tooltip?.innerContent?.desktop?.value?.field_tooltip_placement ?? "top";
			const field_tooltip_trigger = attrs?.content_tooltip?.innerContent?.desktop?.value?.field_tooltip_trigger ?? 'mouseenter focus';
			const field_tooltip_follow_cursor = attrs?.content_tooltip?.innerContent?.desktop?.value?.field_tooltip_follow_cursor ?? 'off';
			const field_tooltip_interactive = attrs?.content_tooltip?.innerContent?.desktop?.value?.field_tooltip_interactive ?? 'off';
			const field_tooltip_interactive_border = attrs?.content_tooltip?.innerContent?.desktop?.value?.field_tooltip_interactive_border ?? 2;
			const field_tooltip_interactive_debounce = attrs?.content_tooltip?.innerContent?.desktop?.value?.field_tooltip_interactive_debounce ?? 0;
			const field_tooltip_custom_maxwidth = attrs?.content_tooltip?.innerContent?.desktop?.value?.field_tooltip_custom_maxwidth ?? 350;
			const field_item_trans_duration = attrs?.content_tooltip?.innerContent?.desktop?.value?.field_tooltip_content_delay ?? 300;

			let options = {
				arrow: field_tooltip_arrow === 'on',
				animation: field_tooltip_animation,
				placement: field_tooltip_placement,
				trigger: field_tooltip_trigger,
				followCursor: field_tooltip_follow_cursor === 'on' && field_tooltip_trigger === 'mouseenter focus',
				allowHTML: true,
				interactive: field_tooltip_interactive === 'on',
				interactiveBorder: parseInt(field_tooltip_interactive_border),
				interactiveDebounce: parseInt(field_tooltip_interactive_debounce),
				maxWidth: parseInt(field_tooltip_custom_maxwidth),
				offset: [offsetSkidding, offsetDistance],
				delay: parseInt(field_item_trans_duration),
				theme: selector
			};

			$(selector).find('.difl_avatar_stack_item').each((index, item) => {
				const tooltipContent = $(item).find('noscript').html();
				if (tooltipContent !== undefined) {
					options['content'] = tooltipContent;
					tippy(item, options);
				}
			});
		}
	}

	const process_text_heading_level = () => {
		$(selector).find('.difl_avatar_stack_item .difl_avatar_stack_text_container').each((index, item) => {
			const title_field = $(item).find('.difl_avatar_stack_text_title').get(0);
			const text_title_level = attrs?.design_child_text?.decoration?.font?.font?.desktop?.value?.headingLevel ?? "h4";
			if (title_field) {
				const title_value = $(title_field).text();
				const new_title_field = $('<' + text_title_level + '>', {
					class: 'difl_avatar_stack_text_title',
					text: title_value
				});
				$(title_field).remove();
				$(item).append(new_title_field);
			}

			const subtitle_field = $(item).find('.difl_avatar_stack_text_subtitle').get(0);
			const text_subtitle_level = attrs?.design_child_text_container?.decoration?.font?.font?.desktop?.value?.headingLevel ?? "h6";
			if (subtitle_field) {
				const subtitle_value = $(subtitle_field).text();
				const new_subtitle_field = $('<' + text_subtitle_level + '>', {
					class: 'difl_avatar_stack_text_subtitle',
					text: subtitle_value
				});
				$(subtitle_field).remove();
				$(item).append(new_subtitle_field);
			}

		});
	}

	return (
		<Fragment>
			{elements.scriptData({
				attrName: 'module',
			})}
		</Fragment>
	);
};
