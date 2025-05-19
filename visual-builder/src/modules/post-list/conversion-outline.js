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
            pagination: "pagination.decoration.font",
            active_pagination: "active_pagination.decoration.font"
        },
        borders: {
            featured_image: "featured_image.decoration.border",
            post_item: "post_item.decoration.border",
            item_outer: "item_outer.decoration.border",
            item: "item.decoration.border",
            pagination: "pagination.decoration.border",
            active_pagination: "active_pagination.decoration.border"
        }
    },
    module: {
        use_current_loop: "use_current_loop.innerContent.*",
        related_posts: "related_posts.innerContent.*",
        posts_number: "posts_number.innerContent.*",
        post_display: "post_display.innerContent.*",
        include_categories: "include_categories.innerContent.*",
        include_tags: "include_tags.innerContent.*",
        orderby: "orderby.innerContent.*",
        offset_number: "offset_number.innerContent.*",
        show_pagination: "show_pagination.innerContent.*",
        use_number_pagination: "use_number_pagination.innerContent.*",
        older_text: "older_text.innerContent.*",
        newer_text: "newer_text.innerContent.*",
        alignment: "alignment.innerContent.*",
        use_breakpoint: "use_breakpoint.innerContent.*",
        breakpoint: "breakpoint.innerContent.*",
        layout_device_settings: "layout_device_settings.innerContent.*",
        item_background: "item_background.innerContent.*",
        post_item_margin: "post_item_margin.decoration.spacing.*.margin",
        post_item_padding: "post_item_padding.decoration.spacing.*.padding",
        use_iamge: "use_iamge.innerContent.*",
        image_size: "image_size.innerContent.*",
        image_scale: "image_scale.innerContent.*",
        use_icon: "use_icon.innerContent.*",
        icon_image: "icon_image.innerContent.*",
        icon_size: "icon_size.innerContent.*",
        icon_color: "icon_color.innerContent.*",
        icon_margin: "icon_margin.decoration.spacing.*.margin",
        icon_padding: "icon_padding.decoration.spacing.*.padding",
        icon_background: "icon_background.innerContent.*",
        outer_wrapper_background: "outer_wrapper_background.innerContent.*",
        item_outer_margin: "item_outer_margin.decoration.spacing.*.margin",
        item_outer_padding: "item_outer_padding.decoration.spacing.*.padding",
        inner_wrapper_background: "inner_wrapper_background.innerContent.*",
        item_inner_margin: "item_inner_margin.decoration.spacing.*.margin",
        item_inner_padding: "item_inner_padding.decoration.spacing.*.padding",
        pagination_align: "pagination_align.innerContent.*",
        next_prev_icon: "next_prev_icon.innerContent.*",
        pagination_background: "pagination_background.innerContent.*",
        pagination_margin: "pagination_margin.decoration.spacing.*.margin",
        pagination_padding: "pagination_padding.decoration.spacing.*.padding",
        outer_wrpper_visibility: "outer_wrpper_visibility.innerContent.*",
        inner_wrpper_visibility: "inner_wrpper_visibility.innerContent.*",
        featured_image_index: "featured_image_index.innerContent.*",
        content_wrapper_index: "content_wrapper_index.innerContent.*",
        active_pagination_background: "active_pagination_background.innerContent.*"
    },
    valueExpansionFunctionMap: {
        post_item_margin: D4ToD5Spacing,
        post_item_padding: D4ToD5Spacing,
        icon_margin: D4ToD5Spacing,
        icon_padding: D4ToD5Spacing,
        item_outer_margin: D4ToD5Spacing,
        item_outer_padding: D4ToD5Spacing,
        item_inner_margin: D4ToD5Spacing,
        item_inner_padding: D4ToD5Spacing,
        pagination_margin: D4ToD5Spacing,
        pagination_padding: D4ToD5Spacing
    }
}
};
