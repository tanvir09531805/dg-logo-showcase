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
            title: "title.decoration.font",
            title_active: "title_active.decoration.font",
            subtitle: "subtitle.decoration.font",
            subtitle_active: "subtitle_active.decoration.font",
            text: "text.decoration.font",
            header: "header.decoration.font",
            button: "button.decoration.font"
        },
        borders: {
            default: "module.decoration.border",
            content_wrapper: "content_wrapper.decoration.border",
            button: "button.decoration.border",
            nav_wrapper: "nav_wrapper.decoration.border",
            nav_item: "nav_item.decoration.border",
            nav_item_active: "nav_item_active.decoration.border"
        },
        box_shadow: {
            default: "module.decoration.boxShadow"
        },
        filters: {
            default: "module.decoration.filters"
        }
    },
    module: {
        tab_event_type: "tab_event_type.innerContent.*",
        tab_animation: "tab_animation.innerContent.*",
        df_animation_duration: "df_animation_duration.innerContent.*",
        content_container: "content_container.innerContent.*",
        nav_container: "nav_container.innerContent.*",
        use_sticky_nav: "use_sticky_nav.innerContent.*",
        turn_off_sticky: "turn_off_sticky.innerContent.*",
        sticky_nav_distance: "sticky_nav_distance.innerContent.*",
        use_nav_width: "use_nav_width.innerContent.*",
        nav_min_width: "nav_min_width.innerContent.*",
        nav_max_width: "nav_max_width.innerContent.*",
        nav_height: "nav_height.innerContent.*",
        nav_place: "nav_place.innerContent.*",
        nav_align: "nav_align.innerContent.*",
        use_scroll_to_content: "use_scroll_to_content.innerContent.*",
        content_vertical_align: "content_vertical_align.innerContent.*",
        nav_item: "nav_item.innerContent.*",
        nav_item_active: "nav_item_active.innerContent.*",
        icon_color: "icon_color.innerContent.*",
        icon_color_active: "icon_color_active.innerContent.*",
        icon_size: "icon_size.innerContent.*",
        image_size: "image_size.innerContent.*",
        icon_size_active: "icon_size_active.innerContent.*",
        image_size_active: "image_size_active.innerContent.*",
        icon_placement: "icon_placement.innerContent.*",
        icon_align: "icon_align.innerContent.*",
        use_active_arrow: "use_active_arrow.innerContent.*",
        active_arrow_color: "active_arrow_color.innerContent.*",
        active_arrow_size: "active_arrow_size.innerContent.*",
        arrow_align: "arrow_align.innerContent.*",
        button_align: "button_align.innerContent.*",
        button: "button.innerContent.*",
        button_margin: "button_margin.decoration.spacing.*.margin",
        button_padding: "button_padding.decoration.spacing.*.padding",
        nav_wrapper_margin: "nav_wrapper_margin.decoration.spacing.*.margin",
        nav_wrapper_padding: "nav_wrapper_padding.decoration.spacing.*.padding",
        at_content_wrapper_margin: "at_content_wrapper_margin.decoration.spacing.*.margin",
        at_content_wrapper_padding: "at_content_wrapper_padding.decoration.spacing.*.padding",
        image_wrapper_margin: "image_wrapper_margin.decoration.spacing.*.margin",
        image_wrapper_padding: "image_wrapper_padding.decoration.spacing.*.padding",
        nav_item_margin: "nav_item_margin.decoration.spacing.*.margin",
        nav_item_padding: "nav_item_padding.decoration.spacing.*.padding",
        nav_item_first_margin: "nav_item_first_margin.decoration.spacing.*.margin",
        nav_item_last_margin: "nav_item_last_margin.decoration.spacing.*.margin",
        nav_item_active_margin: "nav_item_active_margin.decoration.spacing.*.margin",
        nav_item_active_padding: "nav_item_active_padding.decoration.spacing.*.padding",
        content_margin: "content_margin.decoration.spacing.*.margin",
        content_padding: "content_padding.decoration.spacing.*.padding",
        nav_icon_margin: "nav_icon_margin.decoration.spacing.*.margin",
        nav_title_margin: "nav_title_margin.decoration.spacing.*.margin",
        nav_description_margin: "nav_description_margin.decoration.spacing.*.margin"
    },
    valueExpansionFunctionMap: {
        button_margin: D4ToD5Spacing,
        button_padding: D4ToD5Spacing,
        nav_wrapper_margin: D4ToD5Spacing,
        nav_wrapper_padding: D4ToD5Spacing,
        at_content_wrapper_margin: D4ToD5Spacing,
        at_content_wrapper_padding: D4ToD5Spacing,
        image_wrapper_margin: D4ToD5Spacing,
        image_wrapper_padding: D4ToD5Spacing,
        nav_item_margin: D4ToD5Spacing,
        nav_item_padding: D4ToD5Spacing,
        nav_item_first_margin: D4ToD5Spacing,
        nav_item_last_margin: D4ToD5Spacing,
        nav_item_active_margin: D4ToD5Spacing,
        nav_item_active_padding: D4ToD5Spacing,
        content_margin: D4ToD5Spacing,
        content_padding: D4ToD5Spacing,
        nav_icon_margin: D4ToD5Spacing,
        nav_title_margin: D4ToD5Spacing,
        nav_description_margin: D4ToD5Spacing
    }
}
};
