import { D4ToD5Background, D4ToD5Icon, D4ToD5Spacing } from '../../helper/conversion';

export const processConversionOutlineData = () => {

	const processModuleData = () => {
		const general_field = {
			social_network: "social_network.innerContent.*",
			use_custom_image_icon: "use_custom_image_icon.innerContent.*",
			src: "src.innerContent.*",
			alt: "src.innerContent.alt.*",
			title_text: "src.innerContent.title_text.*",
			custom_label: "custom_label.innerContent.*",
			icon_color: "icon_color.decoration.*",
			use_icon_font_size: "use_icon_font_size.innerContent.*",
			icon_font_size: "icon_font_size.decoration.*",

			icon_container_margin: "icon.decoration.spacing.*.margin",
			icon_container_padding: "icon.decoration.spacing.*.padding",
			label_container_margin: "label_container.decoration.spacing.*.margin",
			label_container_padding: "label_container.decoration.spacing.*.padding",
			custom_margin: "custom_label.decoration.spacing.*.margin",
			custom_padding: "custom_label.decoration.spacing.*.padding"
		};

		const icon_bg_color = D4ToD5Background( 'icon_bg_color', 'icon' );
		const text_container_bg_color = D4ToD5Background( 'text_container_bg_color', 'label_container' );

		return { ...general_field, ...icon_bg_color, ...text_container_bg_color };
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
			},
			text_shadow: {
				default: "module.advanced.text.textShadow"
			},
			box_shadow: {
				default: "module.decoration.boxShadow",
				icon: "icon.decoration.boxShadow",
				label: "label_container.decoration.boxShadow",
			},
			borders: {
				default: "module.decoration.border",
				icon: "icon.decoration.border",
				label: "label_container.decoration.border",
			},
			filters: {
				default: "module.decoration.filters",
			}
		},
		css: {
			after: 'css.*.after',
			before: 'css.*.before',
			main_element: 'css.*.mainElement',
		},
		module: processModuleData(),
		valueExpansionFunctionMap: {
			icon_container_margin: D4ToD5Spacing,
			icon_container_padding: D4ToD5Spacing,
			label_container_margin: D4ToD5Spacing,
			label_container_padding: D4ToD5Spacing,
			custom_margin: D4ToD5Spacing,
			custom_padding: D4ToD5Spacing
		}
	};
}

export const conversionOutline = processConversionOutlineData();