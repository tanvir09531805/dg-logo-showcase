const convertInlineValue = (value) => {
	return _.isString(value) ? value.split(',') : [];
};

const convertIcon = (value) => {
	value = value.split('|');
	value = {
		unicode: value[0],
		type: value[2],
		weight: value[4],
	};
	return value;
};

const convertSpacing = (value) => {
	value = value.split('|');
	value = {
		top: value[0],
		right: value[1],
		bottom: value[2],
		left: value[3],
		syncHorizontal: value[4],
		syncVertical: value[5],
	};
	return value;
};

export const conversionOutline = {
	advanced: {
		admin_label: "module.meta.adminLabel",
		background: "module.decoration.background",
		fonts: {
			rating_label: "design_rating.decoration.font",
			text_title: "design_title_text.decoration.font",
			text_subtitle: "design_sub_title_text.decoration.font"
		},
		borders: {
			default: "module.decoration.border"
		},
		box_shadow: {
			default: "module.decoration.boxShadow"
		},
		margin_padding: "module.decoration.spacing"
	},
	module: {
		field_content_type: "content_main.innerContent.field_content_type.*",
		admin_label: "module.meta.adminLabel.*",
		field_font_icon: "content_main.innerContent.field_font_icon.*",
		field_icon_color: "design_icon.decoration.font.font.*.color",
		field_icon_size: "design_icon.decoration.font.font.*.size",
		field_image_src: "content_main.innerContent.field_image_src.*.src",
		field_rating_number: "content_main.innerContent.field_rating_number.*",
		field_rating_label: "content_main.innerContent.field_rating_label.*",
		field_rating_position: "design_rating.decoration.field_rating_position.*",
		field_rating_alignment: "design_rating.decoration.field_rating_alignment.*",
		field_rating_icon_size: "design_rating.decoration.field_rating_icon_size.*",
		field_rating_color: "design_rating.decoration.field_rating_color.*",
		field_blank_color: "design_rating.decoration.field_blank_color.*",
		field_title_text: "content_main.innerContent.field_title_text.*",
		field_subtitle_text: "content_main.innerContent.field_subtitle_text.*",
		field_text_position: "content_main.decoration.field_text_position.*",
		field_tooltip_content: "content_main.innerContent.field_content_tooltip.*",
		field_item_height: "module.decoration.*.height"
	},
	valueExpansionFunctionMap: {
		field_font_icon: convertIcon
	}
};
