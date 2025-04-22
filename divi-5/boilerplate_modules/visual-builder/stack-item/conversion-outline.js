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
    module: {
    advanced: {
        admin_label: "module.meta.adminLabel",
        background: "module.decoration.background",
        fonts: {
            rating_label: "rating_label.decoration.font",
            text_title: "text_title.decoration.font",
            text_subtitle: "text_subtitle.decoration.font"
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
        field_content_type: "field_content_type.innerContent.*",
        admin_label: "admin_label.innerContent.*",
        field_font_icon: "field_font_icon.innerContent.*",
        field_icon_color: "field_icon_color.innerContent.*",
        field_icon_size: "field_icon_size.innerContent.*",
        field_image_src: "field_image_src.innerContent.*",
        field_rating_number: "field_rating_number.innerContent.*",
        field_rating_label: "field_rating_label.innerContent.*",
        field_rating_position: "field_rating_position.innerContent.*",
        field_rating_alignment: "field_rating_alignment.innerContent.*",
        field_rating_icon_size: "field_rating_icon_size.innerContent.*",
        field_rating_color: "field_rating_color.innerContent.*",
        field_blank_color: "field_blank_color.innerContent.*",
        field_title_text: "field_title_text.innerContent.*",
        field_subtitle_text: "field_subtitle_text.innerContent.*",
        field_text_position: "field_text_position.innerContent.*",
        field_tooltip_content: "field_tooltip_content.innerContent.*",
        field_item_height: "field_item_height.innerContent.*"
    }
}
};
