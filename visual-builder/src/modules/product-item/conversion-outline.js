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
            product_font_style: "product_font_style.decoration.font",
            product_regular_price_style: "product_regular_price_style.decoration.font",
            product_off_price_style: "product_off_price_style.decoration.font"
        },
        borders: {
            default: "module.decoration.border"
        },
        box_shadow: {
            default: "module.decoration.boxShadow"
        },
        filters: {
            default: "module.decoration.filters"
        }
    },
    module: {
        type: "type.innerContent.*",
        admin_label: "admin_label.innerContent.*",
        title_tag: "title_tag.innerContent.*",
        price_tag: "price_tag.innerContent.*",
        custom_text: "custom_text.innerContent.*",
        add_to_cart_text: "add_to_cart_text.innerContent.*",
        meta_display: "meta_display.innerContent.*",
        rating_size: "rating_size.innerContent.*",
        rating_color: "rating_color.innerContent.*",
        disable_rating_color: "disable_rating_color.innerContent.*",
        show_rating_all_item: "show_rating_all_item.innerContent.*",
        use_product_excrpt: "use_product_excrpt.innerContent.*",
        excerpt_length: "excerpt_length.innerContent.*",
        read_more_text: "read_more_text.innerContent.*",
        use_icon: "use_icon.innerContent.*",
        use_image_as_icon: "use_image_as_icon.innerContent.*",
        image_as_icon: "image_as_icon.innerContent.*",
        image_alt_text: "image_alt_text.innerContent.*",
        image_as_icon_width: "image_as_icon_width.innerContent.*",
        font_icon: "font_icon.innerContent.*",
        icon_color: "icon_color.innerContent.*",
        icon_size: "icon_size.innerContent.*",
        use_only_icon: "use_only_icon.innerContent.*",
        only_icon_position: "only_icon_position.innerContent.*",
        text_show_on_hover: "text_show_on_hover.innerContent.*",
        image_icon_placement: "image_icon_placement.innerContent.*",
        space_btw_text_icon: "space_btw_text_icon.innerContent.*",
        display_type: "display_type.innerContent.*",
        always_show_on_mobile: "always_show_on_mobile.innerContent.*",
        overlay: "overlay.innerContent.*",
        overlay_primary: "overlay_primary.innerContent.*",
        overlay_secondary: "overlay_secondary.innerContent.*",
        overlay_direction: "overlay_direction.innerContent.*",
        overlay_icon: "overlay_icon.innerContent.*",
        overlay_font_icon: "overlay_font_icon.innerContent.*",
        overlay_icon_color: "overlay_icon_color.innerContent.*",
        overlay_icon_size: "overlay_icon_size.innerContent.*",
        overlay_icon_reveal: "overlay_icon_reveal.innerContent.*",
        image_scale: "image_scale.innerContent.*",
        image_scale_hover: "image_scale_hover.innerContent.*",
        overlay_off_at_mobile: "overlay_off_at_mobile.innerContent.*",
        divider_line_height: "divider_line_height.innerContent.*",
        divider_color_primary: "divider_color_primary.innerContent.*",
        divider_color_secondary: "divider_color_secondary.innerContent.*",
        divider_color_direction: "divider_color_direction.innerContent.*",
        divider_color_start: "divider_color_start.innerContent.*",
        divider_color_end: "divider_color_end.innerContent.*",
        element_margin: "element_margin.decoration.spacing.*.margin",
        element_padding: "element_padding.decoration.spacing.*.padding",
        button_margin: "button_margin.decoration.spacing.*.margin",
        button_padding: "button_padding.decoration.spacing.*.padding",
        divider_margin: "divider_margin.decoration.spacing.*.margin",
        divider_padding: "divider_padding.decoration.spacing.*.padding",
        image_margin: "image_margin.decoration.spacing.*.margin",
        icon_margin: "icon_margin.decoration.spacing.*.margin",
        use_separator: "use_separator.innerContent.*",
        category_separator: "category_separator.innerContent.*",
        use_category_link: "use_category_link.innerContent.*",
        category_open_new_tab: "category_open_new_tab.innerContent.*",
        outside_wrapper: "outside_wrapper.innerContent.*"
    },
    valueExpansionFunctionMap: {
        element_margin: D4ToD5Spacing,
        element_padding: D4ToD5Spacing,
        button_margin: D4ToD5Spacing,
        button_padding: D4ToD5Spacing,
        divider_margin: D4ToD5Spacing,
        divider_padding: D4ToD5Spacing,
        image_margin: D4ToD5Spacing,
        icon_margin: D4ToD5Spacing
    }
}
};
