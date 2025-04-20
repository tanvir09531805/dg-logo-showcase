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
            title: "title.decoration.font",
            sub_title: "sub_title.decoration.font",
            description: "description.decoration.font",
            button: "button.decoration.font"
        },
        borders: {
            default: "module.decoration.border",
            icon: "icon.decoration.border",
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
        icon_background: "icon_background.innerContent.*",
        use_icon: "use_icon.innerContent.*",
        use_image_as_icon: "use_image_as_icon.innerContent.*",
        image_as_icon: "image_as_icon.innerContent.*",
        image_alt_text: "image_alt_text.innerContent.*",
        image_as_icon_width: "image_as_icon_width.innerContent.*",
        font_icon: "font_icon.innerContent.*",
        icon_color: "icon_color.innerContent.*",
        icon_size: "icon_size.innerContent.*",
        admin_label: "admin_label.innerContent.*",
        ia_image: "ia_image.innerContent.*",
        title: "title.innerContent.*",
        sub_title: "sub_title.innerContent.*",
        description: "description.innerContent.*",
        title_tag: "title_tag.innerContent.*",
        sub_title_tag: "sub_title_tag.innerContent.*",
        ia_button_button_text: "ia_button_button_text.innerContent.*",
        ia_button_button_url: "ia_button_button_url.innerContent.*",
        ia_button_button_url_new_window: "ia_button_button_url_new_window.innerContent.*",
        ia_btn_button_align: "ia_btn_button_align.innerContent.*",
        ia_btn_background: "ia_btn_background.innerContent.*",
        vertical_align: "vertical_align.innerContent.*",
        content_alignment: "content_alignment.innerContent.*",
        content_margin: "content_margin.decoration.spacing.*.margin",
        content_padding: "content_padding.decoration.spacing.*.padding",
        button_margin: "button_margin.decoration.spacing.*.margin",
        button_padding: "button_padding.decoration.spacing.*.padding",
        icon_margin: "icon_margin.decoration.spacing.*.margin",
        icon_padding: "icon_padding.decoration.spacing.*.padding"
    },
    valueExpansionFunctionMap: {
        content_margin: convertSpacing,
        content_padding: convertSpacing,
        button_margin: convertSpacing,
        button_padding: convertSpacing,
        icon_margin: convertSpacing,
        icon_padding: convertSpacing
    }
}
};
