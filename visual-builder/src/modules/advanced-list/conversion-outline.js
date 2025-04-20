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
            child_icon_text: "child_icon_text.decoration.font",
            child_title_text: "child_title_text.decoration.font",
            child_content_text: "child_content_text.decoration.font",
            content_heading_1: "content_heading_1.decoration.font",
            child_tooltip_text: "child_tooltip_text.decoration.font"
        },
        borders: {
            default: "module.decoration.border",
            child_image_icon: "child_image_icon.decoration.border",
            child_title_element: "child_title_element.decoration.border",
            child_content_element: "child_content_element.decoration.border",
            child_wrapper_element: "child_wrapper_element.decoration.border",
            child_tooltip_element: "child_tooltip_element.decoration.border"
        },
        box_shadow: {
            default: "module.decoration.boxShadow"
        },
        margin_padding: "module.decoration.spacing"
    },
    module: {
        list_view_type: "list_view_type.innerContent.*",
        list_item_per_column: "list_item_per_column.innerContent.*",
        list_item_gap: "list_item_gap.innerContent.*",
        list_item_horizontal_alignment: "list_item_horizontal_alignment.innerContent.*",
        list_item_equal_width: "list_item_equal_width.innerContent.*",
        list_item_vertical_alignment: "list_item_vertical_alignment.innerContent.*",
        list_item_elements_align: "list_item_elements_align.innerContent.*",
        list_item_title_background: "list_item_title_background.innerContent.*",
        list_item_content_background: "list_item_content_background.innerContent.*",
        list_item_wrapper_background: "list_item_wrapper_background.innerContent.*",
        list_item_tooltip_background: "list_item_tooltip_background.innerContent.*",
        list_item_text_orientation: "list_item_text_orientation.innerContent.*",
        list_item_content_max_width: "list_item_content_max_width.innerContent.*",
        list_item_icon_color: "list_item_icon_color.innerContent.*",
        list_item_icon_bg_color: "list_item_icon_bg_color.innerContent.*",
        list_item_icon_size: "list_item_icon_size.innerContent.*",
        list_item_image_width: "list_item_image_width.innerContent.*",
        list_item_image_height: "list_item_image_height.innerContent.*",
        list_item_icon_text_gap: "list_item_icon_text_gap.innerContent.*",
        list_item_icon_placement: "list_item_icon_placement.innerContent.*",
        list_item_icon_alignment: "list_item_icon_alignment.innerContent.*",
        list_item_icon_vertical_placement: "list_item_icon_vertical_placement.innerContent.*",
        list_item_icon_lottie_color: "list_item_icon_lottie_color.innerContent.*",
        list_item_icon_lottie_background_color: "list_item_icon_lottie_background_color.innerContent.*",
        list_item_icon_lottie_width: "list_item_icon_lottie_width.innerContent.*",
        list_item_icon_lottie_height: "list_item_icon_lottie_height.innerContent.*",
        tooltip_arrow_color: "tooltip_arrow_color.innerContent.*",
        list_item_icon_margin: "list_item_icon_margin.innerContent.*",
        list_item_icon_padding: "list_item_icon_padding.innerContent.*",
        list_item_icon_wrapper_margin: "list_item_icon_wrapper_margin.innerContent.*",
        list_item_icon_wrapper_padding: "list_item_icon_wrapper_padding.innerContent.*",
        list_item_title_margin: "list_item_title_margin.innerContent.*",
        list_item_title_padding: "list_item_title_padding.innerContent.*",
        list_item_content_margin: "list_item_content_margin.innerContent.*",
        list_item_content_padding: "list_item_content_padding.innerContent.*",
        list_item_wrapper_margin: "list_item_wrapper_margin.innerContent.*",
        list_item_wrapper_padding: "list_item_wrapper_padding.innerContent.*",
        list_item_tooltip_padding: "list_item_tooltip_padding.innerContent.*"
    }
}
};
