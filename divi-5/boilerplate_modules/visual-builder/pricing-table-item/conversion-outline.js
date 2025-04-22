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
            button_badge: "button_badge.decoration.font",
            heading_1: "heading_1.decoration.font",
            original_price: "original_price.decoration.font",
            regular_price_prefix: "regular_price_prefix.decoration.font",
            regular_price_suffix: "regular_price_suffix.decoration.font",
            sale_price_prefix: "sale_price_prefix.decoration.font",
            sale_price_suffix: "sale_price_suffix.decoration.font",
            feature_tooltip_font: "feature_tooltip_font.decoration.font"
        },
        borders: {
            default: "module.decoration.border",
            tooltip: "tooltip.decoration.border",
            tooltip_icon: "tooltip_icon.decoration.border",
            button_badge: "button_badge.decoration.border",
            image_icon: "image_icon.decoration.border"
        },
        box_shadow: {
            default: "module.decoration.boxShadow"
        },
        filters: {
            default: "module.decoration.filters"
        },
        margin_padding: "module.decoration.spacing"
    },
    module: {
        item_type: "item_type.innerContent.*",
        admin_label: "admin_label.innerContent.*",
        text_content: "text_content.innerContent.*",
        price: "price.innerContent.*",
        price_prefix: "price_prefix.innerContent.*",
        price_prefix_placement: "price_prefix_placement.innerContent.*",
        price_suffix: "price_suffix.innerContent.*",
        price_suffix_placement: "price_suffix_placement.innerContent.*",
        enable_original_price: "enable_original_price.innerContent.*",
        price_gap: "price_gap.innerContent.*",
        original_price_placement: "original_price_placement.innerContent.*",
        original_price: "original_price.innerContent.*",
        original_price_prefix: "original_price_prefix.innerContent.*",
        original_price_prefix_placement: "original_price_prefix_placement.innerContent.*",
        original_price_suffix: "original_price_suffix.innerContent.*",
        original_price_suffix_placement: "original_price_suffix_placement.innerContent.*",
        price_alignemnt: "price_alignemnt.innerContent.*",
        feature_text: "feature_text.innerContent.*",
        feature_text_tooltip: "feature_text_tooltip.innerContent.*",
        feature_text_tooltip_main_content: "feature_text_tooltip_main_content.innerContent.*",
        feature_icon: "feature_icon.innerContent.*",
        price_icon_gap: "price_icon_gap.innerContent.*",
        feature_icon_placement: "feature_icon_placement.innerContent.*",
        feature_icon_size: "feature_icon_size.innerContent.*",
        feature_icon_color: "feature_icon_color.innerContent.*",
        feature_icon_bg_color: "feature_icon_bg_color.innerContent.*",
        feature_tooltip_bg_color: "feature_tooltip_bg_color.innerContent.*",
        feature_tooltip_arrow_color: "feature_tooltip_arrow_color.innerContent.*",
        feature_tooltip_spacing_padding: "feature_tooltip_spacing_padding.decoration.spacing.*.padding",
        feature_icon_spacing_padding: "feature_icon_spacing_padding.decoration.spacing.*.padding",
        item_icon: "item_icon.innerContent.*",
        item_image: "item_image.innerContent.*",
        item_image_alt: "item_image_alt.innerContent.*",
        icon_color: "icon_color.innerContent.*",
        image_icon_background_color: "image_icon_background_color.innerContent.*",
        image_icon_width: "image_icon_width.innerContent.*",
        image_icon_alignment: "image_icon_alignment.innerContent.*",
        ribbon_type: "ribbon_type.innerContent.*",
        ribbon_text: "ribbon_text.innerContent.*",
        ribbon_orientation: "ribbon_orientation.innerContent.*",
        ribbon_spacing_margin: "ribbon_spacing_margin.decoration.spacing.*.margin",
        ribbon_spacing_padding: "ribbon_spacing_padding.decoration.spacing.*.padding",
        ribbon_icon: "ribbon_icon.innerContent.*",
        ribbon_icon_placement: "ribbon_icon_placement.innerContent.*",
        ribbon_icon_size: "ribbon_icon_size.innerContent.*",
        ribbon_icon_color: "ribbon_icon_color.innerContent.*",
        ribbon_icon_bg_color: "ribbon_icon_bg_color.innerContent.*",
        ribbon_icon_spacing_margin: "ribbon_icon_spacing_margin.decoration.spacing.*.margin",
        ribbon_icon_spacing_padding: "ribbon_icon_spacing_padding.decoration.spacing.*.padding",
        ribbon_image: "ribbon_image.innerContent.*",
        ribbon_image_alt: "ribbon_image_alt.innerContent.*",
        ribbon_image_width: "ribbon_image_width.innerContent.*",
        ribbon_transform_x: "ribbon_transform_x.innerContent.*",
        ribbon_transform_y: "ribbon_transform_y.innerContent.*",
        ribbon_position: "ribbon_position.innerContent.*",
        ribbon_animation: "ribbon_animation.innerContent.*",
        divider_height: "divider_height.innerContent.*",
        divider_color: "divider_color.innerContent.*",
        button_text: "button_text.innerContent.*",
        button_url: "button_url.innerContent.*",
        button_url_new_window: "button_url_new_window.innerContent.*",
        button_full_width: "button_full_width.innerContent.*",
        button_alignment: "button_alignment.innerContent.*",
        button_badge: "button_badge.innerContent.*",
        button_badge_text: "button_badge_text.innerContent.*",
        button_badge_position_vertically: "button_badge_position_vertically.innerContent.*",
        button_badge_position: "button_badge_position.innerContent.*",
        button_badge_animation: "button_badge_animation.innerContent.*",
        button_badge_bg: "button_badge_bg.innerContent.*",
        button_badge_spacing_margin: "button_badge_spacing_margin.decoration.spacing.*.margin",
        button_badge_spacing_padding: "button_badge_spacing_padding.decoration.spacing.*.padding",
        rating_number: "rating_number.innerContent.*",
        rating_enable_custom_icon: "rating_enable_custom_icon.innerContent.*",
        rating_icon: "rating_icon.innerContent.*",
        rating_label: "rating_label.innerContent.*",
        rating_icon_label_gap: "rating_icon_label_gap.innerContent.*",
        rating_icon_size: "rating_icon_size.innerContent.*",
        rating_icon_gap: "rating_icon_gap.innerContent.*",
        rating_color: "rating_color.innerContent.*",
        rating_color_inactive: "rating_color_inactive.innerContent.*",
        rating_alignment: "rating_alignment.innerContent.*"
    },
    valueExpansionFunctionMap: {
        feature_tooltip_spacing_padding: convertSpacing,
        feature_icon_spacing_padding: convertSpacing,
        ribbon_spacing_margin: convertSpacing,
        ribbon_spacing_padding: convertSpacing,
        ribbon_icon_spacing_margin: convertSpacing,
        ribbon_icon_spacing_padding: convertSpacing,
        button_badge_spacing_margin: convertSpacing,
        button_badge_spacing_padding: convertSpacing
    }
}
};
