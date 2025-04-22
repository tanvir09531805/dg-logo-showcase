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
        post_type_arch: "post_type_arch.innerContent.*",
        post_type: "post_type.innerContent.*",
        posts_number: "posts_number.innerContent.*",
        post_display: "post_display.innerContent.*",
        tax_for_select: "tax_for_select.innerContent.*",
        tax_for_post: "tax_for_post.innerContent.*",
        tax_for_project: "tax_for_project.innerContent.*",
        post_terms_category: "post_terms_category.innerContent.*",
        post_terms_post_tag: "post_terms_post_tag.innerContent.*",
        post_terms_post_format: "post_terms_post_format.innerContent.*",
        project_terms_project_category: "project_terms_project_category.innerContent.*",
        project_terms_project_tag: "project_terms_project_tag.innerContent.*",
        orderby: "orderby.innerContent.*",
        offset_number: "offset_number.innerContent.*",
        on_scroll_load: "on_scroll_load.innerContent.*",
        show_pagination: "show_pagination.innerContent.*",
        use_number_pagination: "use_number_pagination.innerContent.*",
        use_icon_only_at_pagination: "use_icon_only_at_pagination.innerContent.*",
        older_text: "older_text.innerContent.*",
        newer_text: "newer_text.innerContent.*",
        use_image_as_background: "use_image_as_background.innerContent.*",
        use_background_scale: "use_background_scale.innerContent.*",
        entire_item_clickable: "entire_item_clickable.innerContent.*",
        enable_loader: "enable_loader.innerContent.*",
        loader_type: "loader_type.innerContent.*",
        loader_color: "loader_color.innerContent.*",
        loader_bg_color: "loader_bg_color.innerContent.*",
        loader_size: "loader_size.innerContent.*",
        loader_alignment: "loader_alignment.innerContent.*",
        loader_margin: "loader_margin.decoration.spacing.*.margin",
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
        pagination_padding: "pagination_padding.decoration.spacing.*.padding",
        pagination_number_margin: "pagination_number_margin.decoration.spacing.*.margin",
        pagination_number_padding: "pagination_number_padding.decoration.spacing.*.padding"
    },
    valueExpansionFunctionMap: {
        loader_margin: convertSpacing,
        wrapper_margin: convertSpacing,
        wrapper_padding: convertSpacing,
        item_wrapper_padding: convertSpacing,
        item_margin: convertSpacing,
        item_padding: convertSpacing,
        pagination_margin: convertSpacing,
        pagination_padding: convertSpacing,
        pagination_number_margin: convertSpacing,
        pagination_number_padding: convertSpacing
    }
}
};
