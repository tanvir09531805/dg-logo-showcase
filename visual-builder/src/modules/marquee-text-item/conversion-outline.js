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
            title: "title.decoration.font"
        },
        borders: {
            default: "module.decoration.border",
            text_media_border: "text_media_border.decoration.border"
        },
        box_shadow: {
            default: "module.decoration.boxShadow"
        }
    },
    module: {
        admin_title: "admin_title.innerContent.*",
        text: "text.innerContent.*",
        text_tag: "text_tag.innerContent.*",
        text_background: "text_background.innerContent.*",
        text_clip_enable_clip: "text_clip_enable_clip.innerContent.*",
        text_clip_enable_bg_clip: "text_clip_enable_bg_clip.innerContent.*",
        text_clip_fill_color: "text_clip_fill_color.innerContent.*",
        text_clip_stroke_color: "text_clip_stroke_color.innerContent.*",
        text_clip_stroke_width: "text_clip_stroke_width.innerContent.*",
        text_media_bg: "text_media_bg.innerContent.*",
        enable_text_icon: "enable_text_icon.innerContent.*",
        text_icon: "text_icon.innerContent.*",
        text_icon_color: "text_icon_color.innerContent.*",
        text_icon_size: "text_icon_size.innerContent.*",
        text_img: "text_img.innerContent.*",
        text_img_alt_txt: "text_img_alt_txt.innerContent.*",
        text_image_width: "text_image_width.innerContent.*",
        set_media_after_text: "set_media_after_text.innerContent.*",
        item_wrapper_margin: "item_wrapper_margin.decoration.spacing.*.margin",
        item_wrapper_padding: "item_wrapper_padding.decoration.spacing.*.padding",
        marquee_text_margin: "marquee_text_margin.decoration.spacing.*.margin",
        marquee_text_padding: "marquee_text_padding.decoration.spacing.*.padding",
        marquee_text_media_margin: "marquee_text_media_margin.decoration.spacing.*.margin",
        marquee_text_media_padding: "marquee_text_media_padding.decoration.spacing.*.padding"
    },
    valueExpansionFunctionMap: {
        item_wrapper_margin: D4ToD5Spacing,
        item_wrapper_padding: D4ToD5Spacing,
        marquee_text_margin: D4ToD5Spacing,
        marquee_text_padding: D4ToD5Spacing,
        marquee_text_media_margin: D4ToD5Spacing,
        marquee_text_media_padding: D4ToD5Spacing
    }
}
};
