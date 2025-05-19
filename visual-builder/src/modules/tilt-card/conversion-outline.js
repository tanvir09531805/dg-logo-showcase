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
            title: "title.decoration.font",
            content: "content.decoration.font",
            button: "button.decoration.font"
        },
        borders: {
            default: "module.decoration.border",
            button: "button.decoration.border",
            image: "image.decoration.border"
        },
        box_shadow: {
            default: "module.decoration.boxShadow"
        }
    },
    module: {
        title: "title.innerContent.*",
        content: "content.innerContent.*",
        image_image: "image_image.innerContent.*",
        image_alt_text: "image_alt_text.innerContent.*",
        image_use_icon: "image_use_icon.innerContent.*",
        image_font_icon: "image_font_icon.innerContent.*",
        image_icon_color: "image_icon_color.innerContent.*",
        image_icon_size: "image_icon_size.innerContent.*",
        image_icon_align: "image_icon_align.innerContent.*",
        image_image_align: "image_image_align.innerContent.*",
        image_full_width: "image_full_width.innerContent.*",
        image_max_width: "image_max_width.innerContent.*",
        image_icon_bg: "image_icon_bg.innerContent.*",
        image_circle_icon: "image_circle_icon.innerContent.*",
        tc_btn_button_text: "tc_btn_button_text.innerContent.*",
        tc_btn_button_url: "tc_btn_button_url.innerContent.*",
        tc_btn_button_url_new_window: "tc_btn_button_url_new_window.innerContent.*",
        tc_btn_button_align: "tc_btn_button_align.innerContent.*",
        tc_button_background: "tc_button_background.innerContent.*",
        tc_content_float: "tc_content_float.innerContent.*",
        tc_translate: "tc_translate.innerContent.*",
        tc_scale: "tc_scale.innerContent.*",
        tc_reverse: "tc_reverse.innerContent.*",
        tc_max: "tc_max.innerContent.*",
        tc_perspective: "tc_perspective.innerContent.*",
        tc_glare: "tc_glare.innerContent.*",
        tc_glare_opacity: "tc_glare_opacity.innerContent.*",
        tc_card_scale: "tc_card_scale.innerContent.*",
        tc_speed: "tc_speed.innerContent.*",
        tc_full_page: "tc_full_page.innerContent.*",
        wrapper_margin: "wrapper_margin.decoration.spacing.*.margin",
        wrapper_padding: "wrapper_padding.decoration.spacing.*.padding",
        content_wrapper_margin: "content_wrapper_margin.decoration.spacing.*.margin",
        content_wrapper_padding: "content_wrapper_padding.decoration.spacing.*.padding",
        img_wrapper_margin: "img_wrapper_margin.decoration.spacing.*.margin",
        img_wrapper_padding: "img_wrapper_padding.decoration.spacing.*.padding",
        btn_wrapper_margin: "btn_wrapper_margin.decoration.spacing.*.margin",
        btn_wrapper_padding: "btn_wrapper_padding.decoration.spacing.*.padding",
        icon_padding: "icon_padding.decoration.spacing.*.padding",
        image_margin: "image_margin.decoration.spacing.*.margin",
        title_margin: "title_margin.decoration.spacing.*.margin",
        title_padding: "title_padding.decoration.spacing.*.padding",
        content_margin: "content_margin.decoration.spacing.*.margin",
        content_padding: "content_padding.decoration.spacing.*.padding",
        button_margin: "button_margin.decoration.spacing.*.margin",
        button_padding: "button_padding.decoration.spacing.*.padding"
    },
    valueExpansionFunctionMap: {
        wrapper_margin: D4ToD5Spacing,
        wrapper_padding: D4ToD5Spacing,
        content_wrapper_margin: D4ToD5Spacing,
        content_wrapper_padding: D4ToD5Spacing,
        img_wrapper_margin: D4ToD5Spacing,
        img_wrapper_padding: D4ToD5Spacing,
        btn_wrapper_margin: D4ToD5Spacing,
        btn_wrapper_padding: D4ToD5Spacing,
        icon_padding: D4ToD5Spacing,
        image_margin: D4ToD5Spacing,
        title_margin: D4ToD5Spacing,
        title_padding: D4ToD5Spacing,
        content_margin: D4ToD5Spacing,
        content_padding: D4ToD5Spacing,
        button_margin: D4ToD5Spacing,
        button_padding: D4ToD5Spacing
    }
}
};
