import { D4ToD5Background, D4ToD5Icon, D4ToD5Spacing, D4ToD5RoundedCorner, D4ToD5CustomMargin } from '../../helper/conversion';


const processConversionOutlineData = () => {

	const processModuleData = () => {
		const general_field = {
			"field_image": "content_image.innerContent.field_image.*",
			"alt": "content_image.innerContent.alt.*",
			"title_text": "content_image.innerContent.title_text.*",
			"field_lightbox_enable": "content_link.innerContent.field_lightbox_enable.*",
			"field_link_url": "content_link.innerContent.field_link_url.*",
			"field_link_target": "content_link.innerContent.field_link_target.*",
			"field_reveal_directions": "content_reveal_animation.decoration.field_reveal_directions.*",
			"field_reveal_delay": "content_reveal_animation.decoration.field_reveal_delay.*",
			"field_reveal_animation_time": "content_reveal_animation.decoration.field_reveal_animation_time.*",
			"field_reveal_view_port": "content_reveal_animation.decoration.field_reveal_view_port.*",
			"field_rounded_corner": "content_placeholder.decoration.border.*",
			"field_overlay_enable": "content_overlay.innerContent.field_overlay_enable.*",
			"field_overlay_color": "content_overlay.decoration.field_overlay_color.*",
			"field_overlay_opacity": "content_overlay.decoration.field_overlay_opacity.*",
			"field_hover_overlay_enable": "content_hover_overlay.innerContent.field_hover_overlay_enable.*",
			"field_hover_overlay_color": "content_hover_overlay.decoration.field_hover_overlay_color.*",
			"field_hover_overlay_opacity": "content_hover_overlay.decoration.field_hover_overlay_opacity.*",
			"field_hover_overlay_arrive_from": "content_hover_overlay.innerContent.field_hover_overlay_arrive_from.*",
			"field_hover_overlay_content_arrive_from": "content_hover_overlay.innerContent.field_hover_overlay_content_arrive_from.*",
			"field_hover_overlay_transition_delay": "content_hover_overlay.decoration.field_hover_overlay_transition_delay.*",
			"field_hover_overlay_transition_time": "content_hover_overlay.decoration.field_hover_overlay_transition_time.*",
			"field_hover_overlay_content_enable": "content_hover_overlay.innerContent.field_hover_overlay_content_enable.*",
			"field_hover_overlay_content_placement": "content_hover_overlay.decoration.field_hover_overlay_content_placement.*",
			"field_hover_overlay_content_alignment": "content_hover_overlay.decoration.field_hover_overlay_content_alignment.*",
			"field_hover_overlay_container_padding": "field_hover_overlay_container_padding.decoration.spacing.*",
			"field_hover_image_effect_enable": "content_hover_overlay.innerContent.field_hover_image_effect_enable.*",
			"field_effect_style": "content_hover_overlay.innerContent.field_effect_style.*",
			"field_zoom_scale": "content_hover_overlay.decoration.field_zoom_scale.*",
			"field_zooming_time": "content_hover_overlay.decoration.field_zooming_time.*",
			"field_zooming_blur_out_time": "content_hover_overlay.decoration.field_zooming_blur_out_time.*",
			"field_zooming_blur_level": "content_hover_overlay.decoration.field_zooming_blur_level.*",
			"field_grayscale": "content_hover_overlay.decoration.field_grayscale.*",
			"field_Speed_curve": "content_hover_overlay.decoration.field_Speed_curve.*",
			"field_zoom_rotate": "content_hover_overlay.decoration.field_zoom_rotate.*",
			"align": "alignment.decoration.align.*",
			"force_fullwidth": "width.decoration.force_fullwidth.*",
			"field_caption_enable": "content_caption.innerContent.field_caption_enable.*",
			"field_caption_title": "content_caption.innerContent.field_caption_title.*",
			"field_caption_placement": "content_caption.innerContent.field_caption_placement.*",
			"field_caption_background": "content_caption.decoration.field_caption_background.*",
			"field_caption_padding": "content_caption.decoration.spacing.*",
			"field_reveal_effects": "content_reveal_animation.innerContent.field_reveal_effects.*",
			"field_reveal_effect_delay": "content_reveal_animation.decoration.field_reveal_effect_delay.*",
			"field_reveal_effect_animation_time": "content_reveal_animation.decoration.field_reveal_effect_animation_time.*"
		};

		const icon_bg_color = D4ToD5Background( 'reveal_color_bg', 'content_reveal_animation' );
		const field_placeholder_bg = D4ToD5Background( 'field_placeholder_bg', 'content_placeholder' );

		return { ...general_field, ...icon_bg_color, ...field_placeholder_bg };
	}

	return {
		advanced: {
			admin_label: "module.meta.adminLabel",
			animation: "module.decoration.animation",
			background: "module.decoration.background",
			disabled_on: "module.decoration.disabledOn",
			module: "module.advanced.htmlAttributes",
			overflow: "module.decoration.overflow",
			position_fields: "module.decoration.position",
			scroll: "module.decoration.scroll",
			sticky: "module.decoration.sticky",
			text: "module.advanced.text",
			transform: "module.decoration.transform",
			transition: "module.decoration.transition",
			z_index: "module.decoration.zIndex",
			max_width: "module.decoration.sizing",
			height: "module.decoration.sizing",
			link_options: "module.advanced.link",
			margin_padding: "module.decoration.spacing",
			fonts: {
				overlay_title: "design_hover_overlay_title.decoration.font",
				overlay_description: "design_hover_overlay_description.decoration.font",
				caption: "design_caption.decoration.font",
			},
			text_shadow: {
				default: "module.advanced.text.textShadow"
			},
			box_shadow: {
				default: "module.decoration.boxShadow",
				placeholder: "content_placeholder.decoration.boxShadow",
			},
			borders: {
				default: "module.decoration.border"
			},
			filters: {
				default: "module.decoration.filters",
			}
		},
		css: {
			after: 'css.*.after',
			before: 'css.*.before',
			main_element: 'css.*.mainElement',
			button_container: 'css.*.button_container',
			button_container_hover: 'css.*.button_container_hover',
			icon_image_container: 'css.*.icon_image_container',
			icon_image_container_hover: 'css.*.icon_image_container_hover',
			label_container: 'css.*.label_container',
			label_container_hover: 'css.*.label_container_hover',
			icon: 'css.*.icon',
			icon_hover: 'css.*.icon_hover',
			image: 'css.*.image',
			image_hover: 'css.*.image_hover',
			label: 'css.*.label',
			label_hover: 'css.*.label_hover'
		},
		module: processModuleData(),
		valueExpansionFunctionMap: {
			field_rounded_corner: D4ToD5RoundedCorner,
			field_hover_overlay_container_padding: D4ToD5Spacing,
			field_caption_padding: D4ToD5CustomMargin
		}
	};
}
export const conversionOutline = processConversionOutlineData();