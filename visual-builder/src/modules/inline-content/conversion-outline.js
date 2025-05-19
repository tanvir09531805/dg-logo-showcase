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
            content_text: "content_text.decoration.font"
        },
        borders: {
            content_text: "content_text.decoration.border",
            content_icon: "content_icon.decoration.border",
            content_image: "content_image.decoration.border"
        },
        filters: {
            default: "module.decoration.filters"
        },
        margin_padding: "module.decoration.spacing"
    },
    module: {
        text_bg_color: "text_bg_color.innerContent.*",
        icon_color: "icon_color.innerContent.*",
        icon_bg_color: "icon_bg_color.innerContent.*",
        icon_size: "icon_size.innerContent.*",
        media_size: "media_size.innerContent.*",
        media_bg_color: "media_bg_color.innerContent.*",
        content_alignment: "content_alignment.innerContent.*",
        items_position: "items_position.innerContent.*",
        main_wrapper_tag: "main_wrapper_tag.innerContent.*",
        column_gap: "column_gap.innerContent.*",
        row_gap: "row_gap.innerContent.*",
        icon_container_margin: "icon_container_margin.decoration.spacing.*.margin",
        icon_container_padding: "icon_container_padding.decoration.spacing.*.padding",
        media_container_margin: "media_container_margin.decoration.spacing.*.margin",
        media_container_padding: "media_container_padding.decoration.spacing.*.padding",
        text_container_margin: "text_container_margin.decoration.spacing.*.margin",
        text_container_padding: "text_container_padding.decoration.spacing.*.padding"
    },
    valueExpansionFunctionMap: {
        icon_container_margin: D4ToD5Spacing,
        icon_container_padding: D4ToD5Spacing,
        media_container_margin: D4ToD5Spacing,
        media_container_padding: D4ToD5Spacing,
        text_container_margin: D4ToD5Spacing,
        text_container_padding: D4ToD5Spacing
    }
}
};
