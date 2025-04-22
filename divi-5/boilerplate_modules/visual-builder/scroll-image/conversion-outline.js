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
        fonts: {
            badge_text: "badge_text.decoration.font",
            text: "text.decoration.font",
            header: "header.decoration.font"
        },
        borders: {
            default: "module.decoration.border",
            scroll_image_border: "scroll_image_border.decoration.border",
            link_border: "link_border.decoration.border",
            badge_border: "badge_border.decoration.border",
            caption_border: "caption_border.decoration.border"
        },
        box_shadow: {
            default: "module.decoration.boxShadow"
        },
        margin_padding: "module.decoration.spacing"
    },
    module: {
        scroll_image: "scroll_image.innerContent.*",
        image_min_height: "image_min_height.innerContent.*",
        image_scroll_type: "image_scroll_type.innerContent.*",
        enable_frame: "enable_frame.innerContent.*",
        frame_type: "frame_type.innerContent.*",
        overlay: "overlay.innerContent.*",
        overlay_primary: "overlay_primary.innerContent.*",
        overlay_secondary: "overlay_secondary.innerContent.*",
        overlay_direction: "overlay_direction.innerContent.*",
        caption_background: "caption_background.innerContent.*",
        enable_caption: "enable_caption.innerContent.*",
        caption_text: "caption_text.innerContent.*",
        use_light_box: "use_light_box.innerContent.*",
        use_different_lightbox_image: "use_different_lightbox_image.innerContent.*",
        different_lightbox_image: "different_lightbox_image.innerContent.*",
        enable_custom_link: "enable_custom_link.innerContent.*",
        link_url: "link_url.innerContent.*",
        link_url_target: "link_url_target.innerContent.*",
        enable_icon: "enable_icon.innerContent.*",
        use_image_as_icon: "use_image_as_icon.innerContent.*",
        link_icon: "link_icon.innerContent.*",
        link_icon_color: "link_icon_color.innerContent.*",
        icon_size: "icon_size.innerContent.*",
        image: "image.innerContent.*",
        image_container_width: "image_container_width.innerContent.*",
        alt_text: "alt_text.innerContent.*",
        link_position: "link_position.innerContent.*",
        show_on_hover: "show_on_hover.innerContent.*",
        hide_on_hover: "hide_on_hover.innerContent.*",
        icon_motion: "icon_motion.innerContent.*",
        link_icon_background: "link_icon_background.innerContent.*",
        badge_background: "badge_background.innerContent.*",
        enable_badge: "enable_badge.innerContent.*",
        badge_text: "badge_text.innerContent.*",
        badge_icon_enable: "badge_icon_enable.innerContent.*",
        badge_icon: "badge_icon.innerContent.*",
        badge_icon_placement: "badge_icon_placement.innerContent.*",
        badge_icon_color: "badge_icon_color.innerContent.*",
        badge_icon_size: "badge_icon_size.innerContent.*",
        badge_position: "badge_position.innerContent.*",
        badge_container_width: "badge_container_width.innerContent.*",
        show_badge_on_hover: "show_badge_on_hover.innerContent.*",
        hide_badge_on_hover: "hide_badge_on_hover.innerContent.*",
        scroll_transition_duration: "scroll_transition_duration.innerContent.*",
        scroll_transition_delay: "scroll_transition_delay.innerContent.*",
        scroll_transition_curve: "scroll_transition_curve.innerContent.*",
        link_icon_margin: "link_icon_margin.decoration.spacing.*.margin",
        link_icon_padding: "link_icon_padding.decoration.spacing.*.padding",
        caption_margin: "caption_margin.decoration.spacing.*.margin",
        caption_padding: "caption_padding.decoration.spacing.*.padding",
        badge_margin: "badge_margin.decoration.spacing.*.margin",
        badge_padding: "badge_padding.decoration.spacing.*.padding",
        badge_icon_margin: "badge_icon_margin.decoration.spacing.*.margin"
    },
    valueExpansionFunctionMap: {
        link_icon_margin: convertSpacing,
        link_icon_padding: convertSpacing,
        caption_margin: convertSpacing,
        caption_padding: convertSpacing,
        badge_margin: convertSpacing,
        badge_padding: convertSpacing,
        badge_icon_margin: convertSpacing
    }
}
};
