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
            primary_label_font: "primary_label_font.decoration.font",
            secondary_label_font: "secondary_label_font.decoration.font",
            active_label_font: "active_label_font.decoration.font",
            primary_button_font: "primary_button_font.decoration.font",
            secondary_button_font: "secondary_button_font.decoration.font",
            active_button_font: "active_button_font.decoration.font",
            primary_badge_font: "primary_badge_font.decoration.font",
            secondary_badge_font: "secondary_badge_font.decoration.font",
            text: "text.decoration.font",
            header: "header.decoration.font"
        },
        borders: {
            switcher_bar_border: "switcher_bar_border.decoration.border",
            switcher_content_border: "switcher_content_border.decoration.border",
            primary_button_border: "primary_button_border.decoration.border",
            secondary_button_border: "secondary_button_border.decoration.border",
            active_button_border: "active_button_border.decoration.border",
            badge_border: "badge_border.decoration.border",
            secondary_badge_border: "secondary_badge_border.decoration.border"
        },
        filters: {
            default: "module.decoration.filters"
        },
        margin_padding: "module.decoration.spacing"
    },
    module: {
        primary_label_title: "primary_label_title.innerContent.*",
        secondary_label_title: "secondary_label_title.innerContent.*",
        content_switcher_type: "content_switcher_type.innerContent.*",
        content: "content.innerContent.*",
        secondary_content: "secondary_content.innerContent.*",
        shortcode_primary_content: "shortcode_primary_content.innerContent.*",
        __shortcode_primary_content: "__shortcode_primary_content.innerContent.*",
        shortcode_secondary_content: "shortcode_secondary_content.innerContent.*",
        __shortcode_secondary_content: "__shortcode_secondary_content.innerContent.*",
        library_id_primary: "library_id_primary.innerContent.*",
        __library_content_primary: "__library_content_primary.innerContent.*",
        library_id_secondary: "library_id_secondary.innerContent.*",
        __library_content_secondary: "__library_content_secondary.innerContent.*",
        primary_content_selector: "primary_content_selector.innerContent.*",
        secondary_content_selector: "secondary_content_selector.innerContent.*",
        switcher_type: "switcher_type.innerContent.*",
        switcher_alignment: "switcher_alignment.innerContent.*",
        switcher_control_size: "switcher_control_size.innerContent.*",
        swicher_bar_width: "swicher_bar_width.innerContent.*",
        use_custom_spacing: "use_custom_spacing.innerContent.*",
        title_spacing: "title_spacing.innerContent.*",
        primary_title_use_icon: "primary_title_use_icon.innerContent.*",
        primary_title_font_icon: "primary_title_font_icon.innerContent.*",
        primary_title_icon_color: "primary_title_icon_color.innerContent.*",
        primary_title_icon_size: "primary_title_icon_size.innerContent.*",
        primary_title_image_align: "primary_title_image_align.innerContent.*",
        primary_title_full_width: "primary_title_full_width.innerContent.*",
        primary_icon_align: "primary_icon_align.innerContent.*",
        primary_icon_hide_on_mobile: "primary_icon_hide_on_mobile.innerContent.*",
        secondary_title_use_icon: "secondary_title_use_icon.innerContent.*",
        secondary_title_font_icon: "secondary_title_font_icon.innerContent.*",
        secondary_title_icon_color: "secondary_title_icon_color.innerContent.*",
        secondary_title_icon_size: "secondary_title_icon_size.innerContent.*",
        secondary_title_image_align: "secondary_title_image_align.innerContent.*",
        secondary_title_full_width: "secondary_title_full_width.innerContent.*",
        secondary_icon_align: "secondary_icon_align.innerContent.*",
        secondary_icon_hide_on_mobile: "secondary_icon_hide_on_mobile.innerContent.*",
        enable_active_icon_color: "enable_active_icon_color.innerContent.*",
        active_icon_color: "active_icon_color.innerContent.*",
        switcher_bar_bg: "switcher_bar_bg.innerContent.*",
        active_control_color: "active_control_color.innerContent.*",
        normal_control_color: "normal_control_color.innerContent.*",
        enable_animation: "enable_animation.innerContent.*",
        content_animation: "content_animation.innerContent.*",
        content_animation_duration: "content_animation_duration.innerContent.*",
        active_switcher_control_bg: "active_switcher_control_bg.innerContent.*",
        normal_switcher_control_bg: "normal_switcher_control_bg.innerContent.*",
        primary_button_bg: "primary_button_bg.innerContent.*",
        secondary_button_bg: "secondary_button_bg.innerContent.*",
        active_button_bg: "active_button_bg.innerContent.*",
        switcher_content_bg: "switcher_content_bg.innerContent.*",
        switcher_bar_margin: "switcher_bar_margin.decoration.spacing.*.margin",
        switcher_bar_padding: "switcher_bar_padding.decoration.spacing.*.padding",
        primary_icon_padding: "primary_icon_padding.decoration.spacing.*.padding",
        secondary_icon_padding: "secondary_icon_padding.decoration.spacing.*.padding",
        switcher_toggle_margin: "switcher_toggle_margin.decoration.spacing.*.margin",
        switcher_content_padding: "switcher_content_padding.decoration.spacing.*.padding",
        switcher_button_padding: "switcher_button_padding.decoration.spacing.*.padding",
        primary_badge_bg: "primary_badge_bg.innerContent.*",
        secondary_badge_bg: "secondary_badge_bg.innerContent.*",
        enable_primary_badge: "enable_primary_badge.innerContent.*",
        primary_badge_text: "primary_badge_text.innerContent.*",
        primary_badge_position: "primary_badge_position.innerContent.*",
        primary_badge_top_position: "primary_badge_top_position.innerContent.*",
        primary_badge_arrow_placement: "primary_badge_arrow_placement.innerContent.*",
        primary_badge_arrow_size: "primary_badge_arrow_size.innerContent.*",
        primary_badge_arrow_position: "primary_badge_arrow_position.innerContent.*",
        primary_badge_arrow_color: "primary_badge_arrow_color.innerContent.*",
        enable_secondary_badge: "enable_secondary_badge.innerContent.*",
        secondary_badge_text: "secondary_badge_text.innerContent.*",
        secondary_badge_position: "secondary_badge_position.innerContent.*",
        secondary_badge_top_position: "secondary_badge_top_position.innerContent.*",
        secondary_badge_arrow_placement: "secondary_badge_arrow_placement.innerContent.*",
        secondary_badge_arrow_size: "secondary_badge_arrow_size.innerContent.*",
        secondary_badge_arrow_position: "secondary_badge_arrow_position.innerContent.*",
        secondary_badge_arrow_color: "secondary_badge_arrow_color.innerContent.*",
        primary_badge_padding: "primary_badge_padding.decoration.spacing.*.padding",
        secondary_badge_padding: "secondary_badge_padding.decoration.spacing.*.padding"
    },
    valueExpansionFunctionMap: {
        switcher_bar_margin: D4ToD5Spacing,
        switcher_bar_padding: D4ToD5Spacing,
        primary_icon_padding: D4ToD5Spacing,
        secondary_icon_padding: D4ToD5Spacing,
        switcher_toggle_margin: D4ToD5Spacing,
        switcher_content_padding: D4ToD5Spacing,
        switcher_button_padding: D4ToD5Spacing,
        primary_badge_padding: D4ToD5Spacing,
        secondary_badge_padding: D4ToD5Spacing
    }
}
};
