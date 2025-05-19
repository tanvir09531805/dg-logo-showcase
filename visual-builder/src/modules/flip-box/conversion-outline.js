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
            title_back: "title_back.decoration.font",
            content_back: "content_back.decoration.font",
            button: "button.decoration.font"
        },
        borders: {
            default: "module.decoration.border",
            button_b: "button_b.decoration.border",
            front: "front.decoration.border",
            back: "back.decoration.border",
            image_f: "image_f.decoration.border",
            image_b: "image_b.decoration.border"
        },
        box_shadow: {
            default: "module.decoration.boxShadow"
        },
        margin_padding: "module.decoration.spacing"
    },
    module: {
        title_front: "title_front.innerContent.*",
        content_front: "content_front.innerContent.*",
        title_back: "title_back.innerContent.*",
        content_back: "content_back.innerContent.*",
        change_view: "change_view.innerContent.*",
        fb_front_align: "fb_front_align.innerContent.*",
        fb_back_align: "fb_back_align.innerContent.*",
        front_title_tag: "front_title_tag.innerContent.*",
        back_title_tag: "back_title_tag.innerContent.*",
        use_height: "use_height.innerContent.*",
        fb_height: "fb_height.innerContent.*",
        fb_btn_button_text: "fb_btn_button_text.innerContent.*",
        fb_btn_button_url: "fb_btn_button_url.innerContent.*",
        fb_btn_button_url_new_window: "fb_btn_button_url_new_window.innerContent.*",
        fb_btn_button_align: "fb_btn_button_align.innerContent.*",
        image_front_image: "image_front_image.innerContent.*",
        image_front_alt_text: "image_front_alt_text.innerContent.*",
        image_front_use_icon: "image_front_use_icon.innerContent.*",
        image_front_font_icon: "image_front_font_icon.innerContent.*",
        image_front_icon_color: "image_front_icon_color.innerContent.*",
        image_front_icon_size: "image_front_icon_size.innerContent.*",
        image_front_icon_align: "image_front_icon_align.innerContent.*",
        image_front_image_align: "image_front_image_align.innerContent.*",
        image_front_full_width: "image_front_full_width.innerContent.*",
        image_front_max_width: "image_front_max_width.innerContent.*",
        image_front_icon_bg: "image_front_icon_bg.innerContent.*",
        image_front_circle_icon: "image_front_circle_icon.innerContent.*",
        fb_animation: "fb_animation.innerContent.*",
        fb_flip_direction: "fb_flip_direction.innerContent.*",
        fb_slide_direction: "fb_slide_direction.innerContent.*",
        fb_zoom_direction: "fb_zoom_direction.innerContent.*",
        fb_content_float: "fb_content_float.innerContent.*",
        fb_cf_translate: "fb_cf_translate.innerContent.*",
        fb_cf_scale: "fb_cf_scale.innerContent.*",
        fb_transition_duration: "fb_transition_duration.innerContent.*",
        fb_transition_delay: "fb_transition_delay.innerContent.*",
        fb_transition_curve: "fb_transition_curve.innerContent.*",
        image_back_image: "image_back_image.innerContent.*",
        image_back_alt_text: "image_back_alt_text.innerContent.*",
        image_back_use_icon: "image_back_use_icon.innerContent.*",
        image_back_font_icon: "image_back_font_icon.innerContent.*",
        image_back_icon_color: "image_back_icon_color.innerContent.*",
        image_back_icon_size: "image_back_icon_size.innerContent.*",
        image_back_icon_align: "image_back_icon_align.innerContent.*",
        image_back_image_align: "image_back_image_align.innerContent.*",
        image_back_full_width: "image_back_full_width.innerContent.*",
        image_back_max_width: "image_back_max_width.innerContent.*",
        image_back_icon_bg: "image_back_icon_bg.innerContent.*",
        image_back_circle_icon: "image_back_circle_icon.innerContent.*",
        fb_background: "fb_background.innerContent.*",
        fb_back_background: "fb_back_background.innerContent.*",
        fb_button_background: "fb_button_background.innerContent.*",
        container_margin: "container_margin.decoration.spacing.*.margin",
        container_padding: "container_padding.decoration.spacing.*.padding",
        front_wrapper_padding: "front_wrapper_padding.decoration.spacing.*.padding",
        back_wrapper_padding: "back_wrapper_padding.decoration.spacing.*.padding",
        img_container_front_margin: "img_container_front_margin.decoration.spacing.*.margin",
        img_container_front_padding: "img_container_front_padding.decoration.spacing.*.padding",
        icon_front_margin: "icon_front_margin.decoration.spacing.*.margin",
        icon_front_padding: "icon_front_padding.decoration.spacing.*.padding",
        img_container_back_margin: "img_container_back_margin.decoration.spacing.*.margin",
        img_container_back_padding: "img_container_back_padding.decoration.spacing.*.padding",
        icon_back_margin: "icon_back_margin.decoration.spacing.*.margin",
        icon_back_padding: "icon_back_padding.decoration.spacing.*.padding",
        title_front_margin: "title_front_margin.decoration.spacing.*.margin",
        title_front_padding: "title_front_padding.decoration.spacing.*.padding",
        title_back_margin: "title_back_margin.decoration.spacing.*.margin",
        title_back_padding: "title_back_padding.decoration.spacing.*.padding",
        text_front_margin: "text_front_margin.decoration.spacing.*.margin",
        text_front_padding: "text_front_padding.decoration.spacing.*.padding",
        text_back_margin: "text_back_margin.decoration.spacing.*.margin",
        text_back_padding: "text_back_padding.decoration.spacing.*.padding",
        button_wrapper_margin: "button_wrapper_margin.decoration.spacing.*.margin",
        button_wrapper_padding: "button_wrapper_padding.decoration.spacing.*.padding",
        button_margin: "button_margin.decoration.spacing.*.margin",
        button_padding: "button_padding.decoration.spacing.*.padding"
    },
    valueExpansionFunctionMap: {
        container_margin: D4ToD5Spacing,
        container_padding: D4ToD5Spacing,
        front_wrapper_padding: D4ToD5Spacing,
        back_wrapper_padding: D4ToD5Spacing,
        img_container_front_margin: D4ToD5Spacing,
        img_container_front_padding: D4ToD5Spacing,
        icon_front_margin: D4ToD5Spacing,
        icon_front_padding: D4ToD5Spacing,
        img_container_back_margin: D4ToD5Spacing,
        img_container_back_padding: D4ToD5Spacing,
        icon_back_margin: D4ToD5Spacing,
        icon_back_padding: D4ToD5Spacing,
        title_front_margin: D4ToD5Spacing,
        title_front_padding: D4ToD5Spacing,
        title_back_margin: D4ToD5Spacing,
        title_back_padding: D4ToD5Spacing,
        text_front_margin: D4ToD5Spacing,
        text_front_padding: D4ToD5Spacing,
        text_back_margin: D4ToD5Spacing,
        text_back_padding: D4ToD5Spacing,
        button_wrapper_margin: D4ToD5Spacing,
        button_wrapper_padding: D4ToD5Spacing,
        button_margin: D4ToD5Spacing,
        button_padding: D4ToD5Spacing
    }
}
};
