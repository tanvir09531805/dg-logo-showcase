import { D4ToD5Background, D4ToD5Icon, D4ToD5Spacing } from '../../helper/conversion';


const processConversionOutlineData = () => {

	const processModuleData = () => {
		const general_field = {
			item_view: "settings.innerContent.item_view.*",
			column_view: "settings.innerContent.column_view.*",
			columns_gap: "settings.decoration.columns_gap.*",
			rows_gap: "settings.decoration.rows_gap.*",
			button_height: "settings.decoration.button_height.*",
			url_new_window: "settings.innerContent.url_new_window.*",
			icon_color: "icon.decoration.font.font.*.color",
			use_icon_font_size: "icon.innerContent.*.use_icon_font_size",
			icon_font_size: "icon.decoration.font.font.*.size",
			icon_position: "icon.decoration.icon_position.*",
			icon_alignment: "icon.decoration.icon_alignment.*",
			content_alignment: "alignment.decoration.content_alignment.*",
			column_auto_child_item_alignment: "alignment.decoration.column_auto_child_item_alignment.*",
			child_content_alignment: "alignment.decoration.child_content_alignment.*",
			enable_header: "settings.innerContent.enable_header.*",
			header_title: "header_title.innerContent.*",
			header_sub_title: "header_sub_title.innerContent.*",
			header_icon: "header.innerContent.*.header_icon",
			header_icon_color: "header.decoration.font.font.*.color",
			use_header_icon_font_size: "header.innerContent.*.use_header_icon_font_size",
			header_icon_font_size: "header.decoration.header_icon_font_size.*",
			header_icon_position: "header.decoration.header_icon_position.*",
			header_icon_alignment: "header.decoration.header_icon_alignment.*",
			header_content_gap: "header_container.decoration.header_content_gap.*",
			header_alignment: "header_container.decoration.header_alignment.*",


			icon_container_margin: "icon.decoration.spacing.*.margin",
			icon_container_padding: "icon.decoration.spacing.*.padding",
			label_container_margin: "label_container.decoration.spacing.*.margin",
			label_container_padding: "label_container.decoration.spacing.*.padding",
			header_container_margin: "header_container.decoration.spacing.*.margin",
			header_container_padding: "header_container.decoration.spacing.*.padding",
			header_text_container_margin: "header.decoration.spacing.*.margin",
			header_text_container_padding: "header.decoration.spacing.*.padding",
			share_button_margin: "settings.decoration.spacing.*.margin",
			share_button_padding: "settings.decoration.spacing.*.padding",
		};

		const icon_bg_color = D4ToD5Background( 'icon_bg_color', 'icon' );
		const text_container_bg_color = D4ToD5Background( 'text_container_bg_color', 'label_container' );
		const header_container_bg_color = D4ToD5Background( 'header_container_bg_color', 'header_container' );

		return { ...general_field, ...icon_bg_color, ...text_container_bg_color, ...header_container_bg_color };
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
				label: "label.decoration.font",
				icon: "icon.decoration.font",
				header_title: "header_title.decoration.font",
				header_sub_title: "header_sub_title.decoration.font",
			},
			text_shadow: {
				default: "module.advanced.text.textShadow"
			},
			box_shadow: {
				default: "module.decoration.boxShadow",
				icon: "icon.decoration.boxShadow",
				label: "label_container.decoration.boxShadow",
				header_container: "header_container.decoration.boxShadow",
				share_button: "settings.decoration.boxShadow",
			},
			borders: {
				default: "module.decoration.border",
				icon: "icon.decoration.border",
				label: "label_container.decoration.border",
				header_container: "header_container.decoration.border",
				share_button: "settings.decoration.border",
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
			icon_container_margin: D4ToD5Spacing,
			icon_container_padding: D4ToD5Spacing,
			label_container_margin: D4ToD5Spacing,
			label_container_padding: D4ToD5Spacing,
			header_container_margin: D4ToD5Spacing,
			header_container_padding: D4ToD5Spacing,
			header_text_container_margin: D4ToD5Spacing,
			header_text_container_padding: D4ToD5Spacing,
			share_button_margin: D4ToD5Spacing,
			share_button_padding: D4ToD5Spacing,
			header_icon: D4ToD5Icon
		}
	};
}
export const conversionOutline = processConversionOutlineData();