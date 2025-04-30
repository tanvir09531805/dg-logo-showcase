const convertSpacing = ( value ) => {
	value = value.split( "|" );
	value = {
		top: value[ 0 ],
		right: value[ 1 ],
		bottom: value[ 2 ],
		left: value[ 3 ],
		syncHorizontal: value[ 4 ],
		syncVertical: value[ 5 ],
	}
	return value
}
export const conversionOutline = {
	advanced: {
		admin_label: "module.meta.adminLabel",
		animation: "module.decoration.animation",
		box_shadow: {
			default: "module.decoration.boxShadow",
			content_text: "design_child_text.decoration.boxShadow",
			content_icon: "design_child_icon.decoration.boxShadow",
			content_image: "design_child_media.decoration.boxShadow"
		},
		disabled_on: "module.decoration.disabledOn",
		module: "module.advanced.htmlAttributes",
		overflow: "module.decoration.overflow",
		position_fields: "module.decoration.position",
		scroll: "module.decoration.scroll",
		sticky: "module.decoration.sticky",
		text_shadow: {
			default: "module.advanced.text.textShadow"
		},
		transform: "module.decoration.transform",
		transition: "module.decoration.transition",
		z_index: "module.decoration.zIndex",
		fonts: {
			content_text: "design_child_text.decoration.font"
		},
		borders: {
			content_text: "design_child_text.decoration.border",
			content_icon: "design_child_icon.decoration.border",
			content_image: "design_child_media.decoration.border"
		},
		background: "module.decoration.background",
		max_width: "module.decoration.sizing",
		height: "module.decoration.sizing",
		margin_padding: "module.decoration.spacing",
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
		text_bg_color: "design_child_text.decoration.text_bg_color.*",
		icon_color: "design_child_icon.decoration.font.font.*.color",
		icon_bg_color: "design_child_icon.decoration.icon_bg_color.*",
		icon_size: "design_child_icon.decoration.font.font.*.size",
		media_size: "design_child_media.decoration.media_size.*",
		media_bg_color: "design_child_media.decoration.media_bg_color.*",
		content_alignment: "alignment.decoration.content_alignment.*",
		items_position: "alignment.decoration.items_position.*",
		main_wrapper_tag: "content_main.innerContent.main_wrapper_tag.*",
		column_gap: "content_main.decoration.column_gap.*",
		row_gap: "content_main.decoration.row_gap.*",
		icon_container_margin: "design_child_icon.decoration.spacing.*.margin",
		icon_container_padding: "design_child_icon.decoration.spacing.*.padding",
		media_container_margin: "design_child_media.decoration.spacing.*.margin",
		media_container_padding: "design_child_media.decoration.spacing.*.padding",
		text_container_margin: "design_child_text.decoration.spacing.*.margin",
		text_container_padding: "design_child_text.decoration.spacing.*.padding"
	},
	valueExpansionFunctionMap: {
		icon_container_margin: convertSpacing,
		icon_container_padding: convertSpacing,
		media_container_margin: convertSpacing,
		media_container_padding: convertSpacing,
		text_container_margin: convertSpacing,
		text_container_padding: convertSpacing
	}
};