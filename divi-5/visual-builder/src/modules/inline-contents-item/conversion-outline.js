const convertIcon = (value) => {
	value = value.split('|');
	value = {
		unicode: value[0],
		type: value[2],
		weight: value[4],
	};
	return value;
};
export const conversionOutline = {
	advanced: {
		admin_label: "module.meta.adminLabel",
		box_shadow: {
			default: "module.decoration.boxShadow"
		},
		text_shadow: {
			default: "module.advanced.text.textShadow"
		},
		transform: "module.decoration.transform",
		transition: "module.decoration.transition",
		height: "module.decoration.sizing",
		max_width: "module.decoration.sizing",
		background: "module.decoration.background",
		margin_padding: "module.decoration.spacing",
		borders: {
			default: "module.decoration.border"
		},
		fonts: {
			content_text: "content_text.decoration.font"
		},
		filters: {
			default: "module.decoration.filters"
		},
		link_options: "module.advanced.link"
	},
	css: {
		before: "css.*.before",
		main_element: "css.*.mainElement",
		after: "css.*.after",
		free_form: "css.*.freeForm"
	},
	module: {
		content_type: "content_main.innerContent.content_type.*",
		content_text: "content_main.innerContent.content_text.*",
		content_icon: "content_main.innerContent.content_icon.*",
		content_image: "content_main.innerContent.content_media.*.src",
		icon_color: "content_icon.decoration.font.font.*.color",
		icon_size: "content_icon.decoration.font.font.*.size",
		media_size: "content_media.decoration.media_size.*"
	},
	valueExpansionFunctionMap: {
		content_icon: convertIcon
	}
}