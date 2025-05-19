const convertInlineValue = (value) => {
  return _.isString(value) ? value.split(',') : [];
};

const D4ToD5Icon = (value) => {
  value = value.split('|');
  value = {
    unicode: value[0],
    type: value[2],
    weight: value[4],
  };
  return value;
};

const D4ToD5Spacing = (value) => {
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
            rating: "rating.decoration.font",
            rating_number: "rating_number.decoration.font",
            title: "title.decoration.font",
            design_content_text: "design_content_text.decoration.font",
            content_heading_1: "content_heading_1.decoration.font"
        },
        borders: {
            default: "module.decoration.border",
            rating_icon_border: "rating_icon_border.decoration.border",
            title_border: "title_border.decoration.border",
            content_border: "content_border.decoration.border"
        },
        box_shadow: {
            default: "module.decoration.boxShadow"
        },
        margin_padding: "module.decoration.spacing"
    },
    module: {
        rating_bg: "rating_bg.innerContent.*",
        rating_scale_type: "rating_scale_type.innerContent.*",
        rating_value_5: "rating_value_5.innerContent.*",
        rating_value_10: "rating_value_10.innerContent.*",
        enable_custom_icon: "enable_custom_icon.innerContent.*",
        rating_icon: "rating_icon.innerContent.*",
        rating_color_single: "rating_color_single.innerContent.*",
        rating_color_active: "rating_color_active.innerContent.*",
        rating_color_inactive: "rating_color_inactive.innerContent.*",
        enable_rating_number: "enable_rating_number.innerContent.*",
        rating_number_type: "rating_number_type.innerContent.*",
        rating_number_placement_left_right: "rating_number_placement_left_right.innerContent.*",
        enable_single_rating: "enable_single_rating.innerContent.*",
        enable_title: "enable_title.innerContent.*",
        title: "title.innerContent.*",
        rating_title_tag: "rating_title_tag.innerContent.*",
        title_display_type: "title_display_type.innerContent.*",
        title_placement_top_bottom: "title_placement_top_bottom.innerContent.*",
        title_placement_left_right: "title_placement_left_right.innerContent.*",
        rating_icon_align: "rating_icon_align.innerContent.*",
        rating_icon_size: "rating_icon_size.innerContent.*",
        rating_icon_space: "rating_icon_space.innerContent.*",
        rating_title_bg: "rating_title_bg.innerContent.*",
        rating_content_bg: "rating_content_bg.innerContent.*",
        enable_content: "enable_content.innerContent.*",
        content: "content.innerContent.*",
        enable_schema: "enable_schema.innerContent.*",
        rating_wrapper_margin: "rating_wrapper_margin.decoration.spacing.*.margin",
        rating_wrapper_padding: "rating_wrapper_padding.decoration.spacing.*.padding",
        rating_box_number_margin: "rating_box_number_margin.decoration.spacing.*.margin",
        rating_box_title_margin: "rating_box_title_margin.decoration.spacing.*.margin",
        rating_box_title_padding: "rating_box_title_padding.decoration.spacing.*.padding",
        rating_box_content_margin: "rating_box_content_margin.decoration.spacing.*.margin",
        rating_box_content_padding: "rating_box_content_padding.decoration.spacing.*.padding"
    },
    valueExpansionFunctionMap: {
        rating_wrapper_margin: D4ToD5Spacing,
        rating_wrapper_padding: D4ToD5Spacing,
        rating_box_number_margin: D4ToD5Spacing,
        rating_box_title_margin: D4ToD5Spacing,
        rating_box_title_padding: D4ToD5Spacing,
        rating_box_content_margin: D4ToD5Spacing,
        rating_box_content_padding: D4ToD5Spacing
    }
}
};
