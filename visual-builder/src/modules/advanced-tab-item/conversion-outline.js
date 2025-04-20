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
        background: "module.decoration.background",
        fonts: {
            title: "title.decoration.font",
            subtitle: "subtitle.decoration.font",
            text: "text.decoration.font",
            header: "header.decoration.font",
            button: "button.decoration.font"
        },
        borders: {
            default: "module.decoration.border",
            button: "button.decoration.border",
            image: "image.decoration.border",
            textarea_border: "textarea_border.decoration.border"
        },
        box_shadow: {
            default: "module.decoration.boxShadow"
        },
        margin_padding: "module.decoration.spacing"
    },
    module: {
        admin_label: "admin_label.innerContent.*",
        title: "title.innerContent.*",
        subtitle: "subtitle.innerContent.*",
        content_type: "content_type.innerContent.*",
        content: "content.innerContent.*",
        library_item: "library_item.innerContent.*",
        __libraryShortcode: "__libraryShortcode.innerContent.*",
        use_icon: "use_icon.innerContent.*",
        font_icon: "font_icon.innerContent.*",
        icon_color: "icon_color.innerContent.*",
        icon_size: "icon_size.innerContent.*",
        tab_image: "tab_image.innerContent.*",
        image: "image.innerContent.*",
        alt: "alt.innerContent.*",
        iamge_place: "iamge_place.innerContent.*",
        image_z_index: "image_z_index.innerContent.*",
        image_size_maxwidth: "image_size_maxwidth.innerContent.*",
        image_size_alignment: "image_size_alignment.innerContent.*",
        default_active: "default_active.innerContent.*",
        navigation_link: "navigation_link.innerContent.*",
        at_button_button_text: "at_button_button_text.innerContent.*",
        at_button_button_url: "at_button_button_url.innerContent.*",
        at_button_button_url_new_window: "at_button_button_url_new_window.innerContent.*",
        button_align: "button_align.innerContent.*",
        text_area: "text_area.innerContent.*",
        button: "button.innerContent.*",
        button_margin: "button_margin.decoration.spacing.*.margin",
        button_padding: "button_padding.decoration.spacing.*.padding",
        image_wrapper_margin: "image_wrapper_margin.decoration.spacing.*.margin",
        image_wrapper_padding: "image_wrapper_padding.decoration.spacing.*.padding",
        content_margin: "content_margin.decoration.spacing.*.margin",
        content_padding: "content_padding.decoration.spacing.*.padding"
    },
    valueExpansionFunctionMap: {
        button_margin: convertSpacing,
        button_padding: convertSpacing,
        image_wrapper_margin: convertSpacing,
        image_wrapper_padding: convertSpacing,
        content_margin: convertSpacing,
        content_padding: convertSpacing
    }
}
};
