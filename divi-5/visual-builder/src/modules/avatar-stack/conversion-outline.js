import { D4ToD5Background, D4ToD5Icon, D4ToD5Spacing } from '../../helper/conversion';

const processConversionOutlineData = () => {

	const processModuleData = () => {
		const general_field = {
			field_stack_spacing: "content_main.decoration.field_stack_spacing.*",
			field_icon_color: "design_child_icon.decoration.field_icon_color.*",
			field_icon_size: "design_child_icon.decoration.field_icon_size.*",
			field_icon_background: "design_child_icon.decoration.field_icon_background.*",
			field_text_background: "design_child_text.decoration.field_text_background.*",
			field_rating_position: "design_child_rating.decoration.field_rating_position.*",
			field_rating_alignment: "design_child_rating.decoration.field_rating_alignment.*",
			field_rating_icon_size: "design_child_rating.decoration.field_rating_icon_size.*",
			field_rating_color: "design_child_rating.decoration.field_rating_color.*",
			field_blank_color: "design_child_rating.decoration.field_blank_color.*",
			field_rating_background: "design_child_rating.decoration.field_rating_background.*",
			icon_container_margin: "design_child_icon_spacing.decoration.spacing.*.margin",
			icon_container_padding: "design_child_icon_spacing.decoration.spacing.*.padding",
			media_container_margin: "design_child_image_spacing.decoration.spacing.*.margin",
			media_container_padding: "design_child_image_spacing.decoration.spacing.*.padding",
			rating_container_margin: "design_child_rating_spacing.decoration.spacing.*.margin",
			rating_container_padding: "design_child_rating_spacing.decoration.spacing.*.padding",
			text_container_margin: "design_child_text_spacing.decoration.spacing.*.margin",
			text_container_padding: "design_child_text_spacing.decoration.spacing.*.padding",
			icon_height: "design_child_icon.decoration.sizing.*.height",
			icon_width: "design_child_icon.decoration.sizing.*.width",
			media_height: "design_child_image.decoration.sizing.*.height",
			media_width: "design_child_image.decoration.sizing.*.width",
			rating_height: "design_child_rating.decoration.sizing.*.height",
			rating_width: "design_child_rating.decoration.sizing.*.width",
			text_height: "design_child_text_container.decoration.sizing.*.height",
			text_width: "design_child_text_container.decoration.sizing.*.width",
			field_tooltip_enable: "content_tooltip.innerContent.innerContent.*.field_tooltip_enable",
			field_tooltip_arrow: "content_tooltip.innerContent.innerContent.*.field_tooltip_arrow",
			field_tooltip_placement: "content_tooltip.innerContent.innerContent.innerContent.*.field_tooltip_placement",
			field_tooltip_animation: "content_tooltip.innerContent.innerContent.innerContent.*.field_tooltip_animation",
			field_tooltip_trigger: "content_tooltip.innerContent.innerContent.innerContent.*.field_tooltip_trigger",
			field_tooltip_interactive: "content_tooltip.innerContent.innerContent.innerContent.*.field_tooltip_interactive",
			field_tooltip_interactive_border: "content_tooltip.innerContent.innerContent.innerContent.*.field_tooltip_interactive_border",
			field_tooltip_content_delay: "content_tooltip.innerContent.innerContent.innerContent.*.field_tooltip_content_delay",
			field_tooltip_interactive_debounce: "content_tooltip.innerContent.innerContent.innerContent.*.field_tooltip_interactive_debounce",
			field_tooltip_follow_cursor: "content_tooltip.innerContent.innerContent.innerContent.*.field_tooltip_follow_cursor",
			field_tooltip_custom_maxwidth: "content_tooltip.innerContent.innerContent.innerContent.*.field_tooltip_custom_maxwidth",
			field_tooltip_offset_enable: "content_tooltip.innerContent.innerContent.innerContent.*.field_tooltip_offset_enable",
			field_tooltip_offset_skidding: "content_tooltip.innerContent.innerContent.innerContent.*.field_tooltip_offset_skidding",
			field_tooltip_offset_distance: "content_tooltip.innerContent.innerContent.innerContent.*.field_tooltip_offset_distance",
			field_tooltip_arrow_color: "design_tooltip.decoration.field_tooltip_arrow_color.*",
			tooltips_padding: "design_tooltip.decoration.spacing.*.padding"
		};

		const field_tooltip_background = D4ToD5Background( 'field_tooltip_background', 'design_tooltip' );

		return { ...general_field, ...field_tooltip_background };
	}

	return {
		advanced: {
			admin_label: "module.meta.adminLabel",
			background: "module.decoration.background",
			fonts: {
				text_title: "design_child_text.decoration.font",
				text_subtitle: "design_child_text_container.decoration.font",
				rating_label: "design_child_rating.decoration.font",
				tooltip_text_h1: "design_tooltip_header.decoration.headingFont.h1.font",
				tooltip_text_h2: "design_tooltip_header.decoration.headingFont.h2.font",
				tooltip_text_h3: "design_tooltip_header.decoration.headingFont.h3.font",
				tooltip_text_h4: "design_tooltip_header.decoration.headingFont.h4.font",
				tooltip_text_h5: "design_tooltip_header.decoration.headingFont.h5.font",
				tooltip_text_h6: "design_tooltip_header.decoration.headingFont.h6.font",
				tooltip_text_a: "design_tooltip_text.decoration.bodyFont.link.font",
				tooltip_text_ul: "design_tooltip_text.decoration.bodyFont.ul.font",
				tooltip_text_ol: "design_tooltip_text.decoration.bodyFont.ol.font",
				tooltip_text_body: "design_tooltip_text.decoration.bodyFont.body.font",
				tooltip_text_quote: "design_tooltip_text.decoration.bodyFont.quote.font"
			},
			borders: {
				default: "module.decoration.border",
				icon: "design_child_icon.decoration.border",
				media: "design_child_image.decoration.border",
				text: "design_child_text_container.decoration.border",
				rating: "design_child_rating.decoration.border",
				tooltips_border: "design_tooltip.decoration.border"
			},
			box_shadow: {
				default: "module.decoration.boxShadow"
			},
			margin_padding: "module.decoration.spacing"
		},
		module: processModuleData(),
		valueExpansionFunctionMap: {
			icon_container_margin: D4ToD5Spacing,
			icon_container_padding: D4ToD5Spacing,
			media_container_margin: D4ToD5Spacing,
			media_container_padding: D4ToD5Spacing,
			rating_container_margin: D4ToD5Spacing,
			rating_container_padding: D4ToD5Spacing,
			text_container_margin: D4ToD5Spacing,
			text_container_padding: D4ToD5Spacing,
			tooltips_padding: D4ToD5Spacing
		}
	}
}

export const conversionOutline = processConversionOutlineData();