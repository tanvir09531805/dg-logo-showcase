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
        use_image_as_background: "use_image_as_background.innerContent.*",
        use_background_scale: "use_background_scale.innerContent.*",
        alignment: "alignment.innerContent.*",
        layout: "layout.innerContent.*",
        column: "column.innerContent.*",
        gutter: "gutter.innerContent.*",
        equal_height: "equal_height.innerContent.*",
        item_background: "item_background.innerContent.*",
        pagination_align: "pagination_align.innerContent.*",
        next_prev_icon: "next_prev_icon.innerContent.*",
        outer_wrpper_visibility: "outer_wrpper_visibility.innerContent.*",
        inner_wrpper_visibility: "inner_wrpper_visibility.innerContent.*",
        pagination_background: "pagination_background.innerContent.*",
        active_pagination_background: "active_pagination_background.innerContent.*",
        wrapper_margin: "wrapper_margin.decoration.spacing.*.margin",
        wrapper_padding: "wrapper_padding.decoration.spacing.*.padding",
        item_wrapper_padding: "item_wrapper_padding.decoration.spacing.*.padding",
        item_margin: "item_margin.decoration.spacing.*.margin",
        item_padding: "item_padding.decoration.spacing.*.padding",
        pagination_margin: "pagination_margin.decoration.spacing.*.margin",
        pagination_padding: "pagination_padding.decoration.spacing.*.padding"
    },
    valueExpansionFunctionMap: {
        wrapper_margin: D4ToD5Spacing,
        wrapper_padding: D4ToD5Spacing,
        item_wrapper_padding: D4ToD5Spacing,
        item_margin: D4ToD5Spacing,
        item_padding: D4ToD5Spacing,
        pagination_margin: D4ToD5Spacing,
        pagination_padding: D4ToD5Spacing
    }
}
};
