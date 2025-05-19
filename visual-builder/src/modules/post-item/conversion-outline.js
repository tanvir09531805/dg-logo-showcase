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
            post_font_style: "post_font_style.decoration.font",
            before_after: "before_after.decoration.font"
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
        post_type_for_acf: "post_type_for_acf.innerContent.*",
        comment_text: "comment_text.innerContent.*",
        acf_before_label: "acf_before_label.innerContent.*",
        acf_after_label: "acf_after_label.innerContent.*",
        outside_wrapper: "outside_wrapper.innerContent.*",
        admin_label: "admin_label.innerContent.*",
        title_tag: "title_tag.innerContent.*",
        show_author_image: "show_author_image.innerContent.*",
        author_image_size: "author_image_size.innerContent.*",
        hide_author_text: "hide_author_text.innerContent.*",
        date_format: "date_format.innerContent.*",
        custom_text: "custom_text.innerContent.*",
        meta_display: "meta_display.innerContent.*",
        meta_position: "meta_position.innerContent.*",
        post_content: "post_content.innerContent.*",
        use_post_excrpt: "use_post_excrpt.innerContent.*",
        excerpt_length: "excerpt_length.innerContent.*",
        read_more_text: "read_more_text.innerContent.*",
        acf_url_text: "acf_url_text.innerContent.*",
        acf_url_new_window: "acf_url_new_window.innerContent.*",
        acf_email_text: "acf_email_text.innerContent.*",
        acf_image_width: "acf_image_width.innerContent.*",
        use_icon: "use_icon.innerContent.*",
        font_icon: "font_icon.innerContent.*",
        icon_color: "icon_color.innerContent.*",
        icon_size: "icon_size.innerContent.*",
        icon_vertical_alignment: "icon_vertical_alignment.innerContent.*",
        image_icon: "image_icon.innerContent.*",
        image_alt_text: "image_alt_text.innerContent.*",
        icon_image_width: "icon_image_width.innerContent.*",
        icon_image_verticle_align: "icon_image_verticle_align.innerContent.*",
        image_size: "image_size.innerContent.*",
        image_full_width: "image_full_width.innerContent.*",
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
        divider_line_height: "divider_line_height.innerContent.*",
        divider_color_primary: "divider_color_primary.innerContent.*",
        divider_color_secondary: "divider_color_secondary.innerContent.*",
        divider_color_direction: "divider_color_direction.innerContent.*",
        divider_color_start: "divider_color_start.innerContent.*",
        divider_color_end: "divider_color_end.innerContent.*",
        element_margin: "element_margin.decoration.spacing.*.margin",
        element_padding: "element_padding.decoration.spacing.*.padding",
        author_image_margin: "author_image_margin.decoration.spacing.*.margin",
        button_margin: "button_margin.decoration.spacing.*.margin",
        button_padding: "button_padding.decoration.spacing.*.padding",
        divider_margin: "divider_margin.decoration.spacing.*.margin",
        divider_padding: "divider_padding.decoration.spacing.*.padding",
        icon_margin: "icon_margin.decoration.spacing.*.margin"
    },
    valueExpansionFunctionMap: {
        element_margin: D4ToD5Spacing,
        element_padding: D4ToD5Spacing,
        author_image_margin: D4ToD5Spacing,
        button_margin: D4ToD5Spacing,
        button_padding: D4ToD5Spacing,
        divider_margin: D4ToD5Spacing,
        divider_padding: D4ToD5Spacing,
        icon_margin: D4ToD5Spacing
    }
}
};
