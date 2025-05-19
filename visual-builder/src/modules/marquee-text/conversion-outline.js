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
        },
        margin_padding: "module.decoration.spacing"
    },
    module: {
        ticker_hover: "ticker_hover.innerContent.*",
        ticker_loop: "ticker_loop.innerContent.*",
        ticker_gap: "ticker_gap.innerContent.*",
        ticker_speed: "ticker_speed.innerContent.*",
        ticker_direction: "ticker_direction.innerContent.*",
        text_background: "text_background.innerContent.*",
        text_media_bg: "text_media_bg.innerContent.*",
        text_icon_color: "text_icon_color.innerContent.*",
        text_icon_size: "text_icon_size.innerContent.*",
        text_image_width: "text_image_width.innerContent.*",
        marquee_text_margin: "marquee_text_margin.decoration.spacing.*.margin",
        marquee_text_padding: "marquee_text_padding.decoration.spacing.*.padding",
        marquee_text_media_margin: "marquee_text_media_margin.decoration.spacing.*.margin",
        marquee_text_media_padding: "marquee_text_media_padding.decoration.spacing.*.padding"
    },
    valueExpansionFunctionMap: {
        marquee_text_margin: D4ToD5Spacing,
        marquee_text_padding: D4ToD5Spacing,
        marquee_text_media_margin: D4ToD5Spacing,
        marquee_text_media_padding: D4ToD5Spacing
    }
}
};
