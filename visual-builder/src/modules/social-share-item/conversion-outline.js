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
            label: "label.decoration.font",
            icon: "icon.decoration.font"
        },
        borders: {
            default: "module.decoration.border",
            icon: "icon.decoration.border",
            label: "label.decoration.border"
        },
        box_shadow: {
            default: "module.decoration.boxShadow"
        },
        margin_padding: "module.decoration.spacing"
    },
    module: {
        admin_label: "admin_label.innerContent.*",
        social_network: "social_network.innerContent.*",
        use_custom_image_icon: "use_custom_image_icon.innerContent.*",
        src: "src.innerContent.*",
        alt: "alt.innerContent.*",
        title_text: "title_text.innerContent.*",
        custom_label: "custom_label.innerContent.*",
        icon_color: "icon_color.innerContent.*",
        use_icon_font_size: "use_icon_font_size.innerContent.*",
        icon_font_size: "icon_font_size.innerContent.*",
        icon_container_margin: "icon_container_margin.decoration.spacing.*.margin",
        icon_container_padding: "icon_container_padding.decoration.spacing.*.padding",
        label_container_margin: "label_container_margin.decoration.spacing.*.margin",
        label_container_padding: "label_container_padding.decoration.spacing.*.padding",
        icon_bg_color: "icon_bg_color.innerContent.*",
        text_container_bg_color: "text_container_bg_color.innerContent.*",
        field_tooltip_content: "field_tooltip_content.innerContent.*"
    },
    valueExpansionFunctionMap: {
        icon_container_margin: D4ToD5Spacing,
        icon_container_padding: D4ToD5Spacing,
        label_container_margin: D4ToD5Spacing,
        label_container_padding: D4ToD5Spacing
    }
}
};
