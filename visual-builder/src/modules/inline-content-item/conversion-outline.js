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
            default: "module.decoration.border"
        },
        box_shadow: {
            default: "module.decoration.boxShadow"
        },
        filters: {
            default: "module.decoration.filters"
        },
        margin_padding: "module.decoration.spacing"
    },
    module: {
        admin_label: "admin_label.innerContent.*",
        content_type: "content_type.innerContent.*",
        content_text: "content_text.innerContent.*",
        content_icon: "content_icon.innerContent.*",
        content_image: "content_image.innerContent.*",
        icon_color: "icon_color.innerContent.*",
        icon_size: "icon_size.innerContent.*",
        media_size: "media_size.innerContent.*"
    }
}
};
