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
            pages_font: "pages_font.decoration.font",
            home_font: "home_font.decoration.font",
            separator_text_font: "separator_text_font.decoration.font",
            active_page_font: "active_page_font.decoration.font"
        },
        borders: {
            default: "module.decoration.border",
            breadcrumbs_border: "breadcrumbs_border.decoration.border",
            pages_border: "pages_border.decoration.border",
            home_border: "home_border.decoration.border",
            separator_border: "separator_border.decoration.border",
            active_page_border: "active_page_border.decoration.border"
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
        separator_background: "separator_background.innerContent.*",
        separator_text: "separator_text.innerContent.*",
        use_separator_icon: "use_separator_icon.innerContent.*",
        separator_font_icon: "separator_font_icon.innerContent.*",
        separator_icon_color: "separator_icon_color.innerContent.*",
        separator_icon_font_size: "separator_icon_font_size.innerContent.*",
        use_icon_inner_item: "use_icon_inner_item.innerContent.*",
        inner_icon: "inner_icon.innerContent.*",
        inner_icon_color: "inner_icon_color.innerContent.*",
        inner_icon_font_size: "inner_icon_font_size.innerContent.*",
        inner_icon_spacing: "inner_icon_spacing.innerContent.*",
        breadcrumbs_background: "breadcrumbs_background.innerContent.*",
        pages_background: "pages_background.innerContent.*",
        home_background: "home_background.innerContent.*",
        active_page_background: "active_page_background.innerContent.*",
        home_text: "home_text.innerContent.*",
        use_home_icon: "use_home_icon.innerContent.*",
        home_font_icon: "home_font_icon.innerContent.*",
        home_icon_color: "home_icon_color.innerContent.*",
        home_icon_font_size: "home_icon_font_size.innerContent.*",
        home_icon_placement: "home_icon_placement.innerContent.*",
        enable_custom_page: "enable_custom_page.innerContent.*",
        page_title: "page_title.innerContent.*",
        use_page_custom_url: "use_page_custom_url.innerContent.*",
        page_custom_url: "page_custom_url.innerContent.*",
        page_custom_url_target: "page_custom_url_target.innerContent.*",
        search_title: "search_title.innerContent.*",
        error_404_title: "error_404_title.innerContent.*",
        alignment: "alignment.innerContent.*",
        show_on_front_page: "show_on_front_page.innerContent.*",
        show_title: "show_title.innerContent.*",
        enable_schema: "enable_schema.innerContent.*",
        breadcrumbs_margin: "breadcrumbs_margin.decoration.spacing.*.margin",
        breadcrumbs_padding: "breadcrumbs_padding.decoration.spacing.*.padding",
        home_margin: "home_margin.decoration.spacing.*.margin",
        home_padding: "home_padding.decoration.spacing.*.padding",
        home_icon_margin: "home_icon_margin.decoration.spacing.*.margin",
        separator_margin: "separator_margin.decoration.spacing.*.margin",
        separator_padding: "separator_padding.decoration.spacing.*.padding",
        pages_margin: "pages_margin.decoration.spacing.*.margin",
        pages_padding: "pages_padding.decoration.spacing.*.padding",
        active_page_margin: "active_page_margin.decoration.spacing.*.margin",
        active_page_padding: "active_page_padding.decoration.spacing.*.padding"
    },
    valueExpansionFunctionMap: {
        breadcrumbs_margin: D4ToD5Spacing,
        breadcrumbs_padding: D4ToD5Spacing,
        home_margin: D4ToD5Spacing,
        home_padding: D4ToD5Spacing,
        home_icon_margin: D4ToD5Spacing,
        separator_margin: D4ToD5Spacing,
        separator_padding: D4ToD5Spacing,
        pages_margin: D4ToD5Spacing,
        pages_padding: D4ToD5Spacing,
        active_page_margin: D4ToD5Spacing,
        active_page_padding: D4ToD5Spacing
    }
}
};
