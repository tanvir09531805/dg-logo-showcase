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
            caption: "caption.decoration.font",
            button: "button.decoration.font"
        },
        borders: {
            default: "module.decoration.border",
            button: "button.decoration.border"
        },
        box_shadow: {
            default: "module.decoration.boxShadow"
        },
        filters: {
            default: "module.decoration.filters"
        }
    },
    module: {
        admin_label: "admin_label.innerContent.*",
        image: "image.innerContent.*",
        alt_text: "alt_text.innerContent.*",
        caption: "caption.innerContent.*",
        caption_tag: "caption_tag.innerContent.*",
        ic_overlay_background: "ic_overlay_background.innerContent.*",
        vertical_align: "vertical_align.innerContent.*",
        content_hover: "content_hover.innerContent.*",
        anim_direction: "anim_direction.innerContent.*",
        ic_button_button_text: "ic_button_button_text.innerContent.*",
        ic_button_button_url: "ic_button_button_url.innerContent.*",
        ic_button_button_url_new_window: "ic_button_button_url_new_window.innerContent.*",
        ic_btn_button_align: "ic_btn_button_align.innerContent.*",
        ic_btn_background: "ic_btn_background.innerContent.*",
        wrapper_margin: "wrapper_margin.decoration.spacing.*.margin",
        wrapper_padding: "wrapper_padding.decoration.spacing.*.padding",
        content_margin: "content_margin.decoration.spacing.*.margin",
        content_padding: "content_padding.decoration.spacing.*.padding",
        caption_margin: "caption_margin.decoration.spacing.*.margin",
        caption_padding: "caption_padding.decoration.spacing.*.padding",
        button_margin: "button_margin.decoration.spacing.*.margin",
        button_padding: "button_padding.decoration.spacing.*.padding"
    },
    valueExpansionFunctionMap: {
        wrapper_margin: D4ToD5Spacing,
        wrapper_padding: D4ToD5Spacing,
        content_margin: D4ToD5Spacing,
        content_padding: D4ToD5Spacing,
        caption_margin: D4ToD5Spacing,
        caption_padding: D4ToD5Spacing,
        button_margin: D4ToD5Spacing,
        button_padding: D4ToD5Spacing
    }
}
};
