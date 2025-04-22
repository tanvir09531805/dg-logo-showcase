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
            cc_title: "cc_title.decoration.font",
            cc_subtitle: "cc_subtitle.decoration.font",
            cc_content: "cc_content.decoration.font",
            df_content_inherit: "df_content_inherit.decoration.font",
            button: "button.decoration.font",
            content_heading_1: "content_heading_1.decoration.font"
        },
        borders: {
            default: "module.decoration.border",
            image_wrapper_border: "image_wrapper_border.decoration.border",
            icon_wrapper_border: "icon_wrapper_border.decoration.border",
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
        title: "title.innerContent.*",
        sub_title: "sub_title.innerContent.*",
        content: "content.innerContent.*",
        title_tag: "title_tag.innerContent.*",
        subtitle_tag: "subtitle_tag.innerContent.*",
        df_cci_image: "df_cci_image.innerContent.*",
        df_cci_alt_text: "df_cci_alt_text.innerContent.*",
        df_cci_use_icon: "df_cci_use_icon.innerContent.*",
        df_cci_font_icon: "df_cci_font_icon.innerContent.*",
        df_cci_icon_color: "df_cci_icon_color.innerContent.*",
        df_cci_icon_size: "df_cci_icon_size.innerContent.*",
        df_cci_icon_align: "df_cci_icon_align.innerContent.*",
        df_cci_image_align: "df_cci_image_align.innerContent.*",
        df_cci_full_width: "df_cci_full_width.innerContent.*",
        df_cci_max_width: "df_cci_max_width.innerContent.*",
        df_cci_icon_bg: "df_cci_icon_bg.innerContent.*",
        df_cci_circle_icon: "df_cci_circle_icon.innerContent.*",
        df_title_bg: "df_title_bg.innerContent.*",
        df_subtitle_bg: "df_subtitle_bg.innerContent.*",
        df_content_bg: "df_content_bg.innerContent.*",
        cc_button_button_text: "cc_button_button_text.innerContent.*",
        cc_button_button_url: "cc_button_button_url.innerContent.*",
        cc_button_button_url_new_window: "cc_button_button_url_new_window.innerContent.*",
        image_order: "image_order.innerContent.*",
        title_order: "title_order.innerContent.*",
        subtitle_order: "subtitle_order.innerContent.*",
        content_order: "content_order.innerContent.*",
        button_order: "button_order.innerContent.*",
        cc_button_button_align: "cc_button_button_align.innerContent.*",
        df_button_bg: "df_button_bg.innerContent.*",
        button_wrapper_margin: "button_wrapper_margin.decoration.spacing.*.margin",
        button_wrapper_padding: "button_wrapper_padding.decoration.spacing.*.padding",
        button_margin: "button_margin.decoration.spacing.*.margin",
        button_padding: "button_padding.decoration.spacing.*.padding",
        item_wrapper_margin: "item_wrapper_margin.decoration.spacing.*.margin",
        item_wrapper_padding: "item_wrapper_padding.decoration.spacing.*.padding",
        image_wrapper_margin: "image_wrapper_margin.decoration.spacing.*.margin",
        image_wrapper_padding: "image_wrapper_padding.decoration.spacing.*.padding",
        image_margin: "image_margin.decoration.spacing.*.margin",
        icon_wrapper_margin: "icon_wrapper_margin.decoration.spacing.*.margin",
        icon_wrapper_padding: "icon_wrapper_padding.decoration.spacing.*.padding",
        title_margin: "title_margin.decoration.spacing.*.margin",
        title_padding: "title_padding.decoration.spacing.*.padding",
        subtitle_margin: "subtitle_margin.decoration.spacing.*.margin",
        subtitle_padding: "subtitle_padding.decoration.spacing.*.padding",
        content_margin: "content_margin.decoration.spacing.*.margin",
        content_padding: "content_padding.decoration.spacing.*.padding"
    },
    valueExpansionFunctionMap: {
        button_wrapper_margin: convertSpacing,
        button_wrapper_padding: convertSpacing,
        button_margin: convertSpacing,
        button_padding: convertSpacing,
        item_wrapper_margin: convertSpacing,
        item_wrapper_padding: convertSpacing,
        image_wrapper_margin: convertSpacing,
        image_wrapper_padding: convertSpacing,
        image_margin: convertSpacing,
        icon_wrapper_margin: convertSpacing,
        icon_wrapper_padding: convertSpacing,
        title_margin: convertSpacing,
        title_padding: convertSpacing,
        subtitle_margin: convertSpacing,
        subtitle_padding: convertSpacing,
        content_margin: convertSpacing,
        content_padding: convertSpacing
    }
}
};
