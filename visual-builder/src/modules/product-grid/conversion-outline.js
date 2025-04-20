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
            on_sale_font: "on_sale_font.decoration.font",
            on_after_sale_font: "on_after_sale_font.decoration.font",
            on_suffix_sale_font: "on_suffix_sale_font.decoration.font",
            pagination: "pagination.decoration.font",
            active_pagination: "active_pagination.decoration.font",
            pagination_result_count: "pagination_result_count.decoration.font",
            pagination_sorting: "pagination_sorting.decoration.font"
        },
        borders: {
            item_outer: "item_outer.decoration.border",
            item: "item.decoration.border",
            on_sale_border: "on_sale_border.decoration.border",
            pagination: "pagination.decoration.border",
            active_pagination: "active_pagination.decoration.border",
            pagination_result_count: "pagination_result_count.decoration.border",
            pagination_sorting_border: "pagination_sorting_border.decoration.border"
        }
    },
    module: {
        type: "type.innerContent.*",
        use_current_loop: "use_current_loop.innerContent.*",
        related: "related.innerContent.*",
        include_categories: "include_categories.innerContent.*",
        posts_number: "posts_number.innerContent.*",
        orderby: "orderby.innerContent.*",
        show_pagination: "show_pagination.innerContent.*",
        show_pagination_result_count: "show_pagination_result_count.innerContent.*",
        show_pagination_sorting: "show_pagination_sorting.innerContent.*",
        show_badge: "show_badge.innerContent.*",
        show_badge_in_image: "show_badge_in_image.innerContent.*",
        badge_placement: "badge_placement.innerContent.*",
        on_sale_text: "on_sale_text.innerContent.*",
        after_sale_text_enable: "after_sale_text_enable.innerContent.*",
        after_sale_text_type: "after_sale_text_type.innerContent.*",
        after_sale_text: "after_sale_text.innerContent.*",
        enable_custom_soldout_text: "enable_custom_soldout_text.innerContent.*",
        custom_soldout_text: "custom_soldout_text.innerContent.*",
        alignment: "alignment.innerContent.*",
        layout: "layout.innerContent.*",
        column: "column.innerContent.*",
        gutter: "gutter.innerContent.*",
        equal_height: "equal_height.innerContent.*",
        item_background: "item_background.innerContent.*",
        on_sale_background: "on_sale_background.innerContent.*",
        pagination_wrapper_background: "pagination_wrapper_background.innerContent.*",
        pagination_align: "pagination_align.innerContent.*",
        next_prev_icon: "next_prev_icon.innerContent.*",
        next_prev_icon_color: "next_prev_icon_color.innerContent.*",
        next_prev_icon_size: "next_prev_icon_size.innerContent.*",
        pagination_background: "pagination_background.innerContent.*",
        active_pagination_background: "active_pagination_background.innerContent.*",
        pagination_result_count_background: "pagination_result_count_background.innerContent.*",
        pagination_sorting_background: "pagination_sorting_background.innerContent.*",
        wrapper_margin: "wrapper_margin.decoration.spacing.*.margin",
        wrapper_padding: "wrapper_padding.decoration.spacing.*.padding",
        item_wrapper_padding: "item_wrapper_padding.decoration.spacing.*.padding",
        item_margin: "item_margin.decoration.spacing.*.margin",
        item_padding: "item_padding.decoration.spacing.*.padding",
        on_sale_margin: "on_sale_margin.decoration.spacing.*.margin",
        on_sale_padding: "on_sale_padding.decoration.spacing.*.padding",
        pagination_wrapper_margin: "pagination_wrapper_margin.decoration.spacing.*.margin",
        pagination_wrapper_padding: "pagination_wrapper_padding.decoration.spacing.*.padding",
        pagination_margin: "pagination_margin.decoration.spacing.*.margin",
        pagination_padding: "pagination_padding.decoration.spacing.*.padding",
        pagination_result_count_margin: "pagination_result_count_margin.decoration.spacing.*.margin",
        pagination_result_count_padding: "pagination_result_count_padding.decoration.spacing.*.padding",
        pagination_sorting_margin: "pagination_sorting_margin.decoration.spacing.*.margin",
        pagination_sorting_padding: "pagination_sorting_padding.decoration.spacing.*.padding",
        outer_wrpper_visibility: "outer_wrpper_visibility.innerContent.*",
        inner_wrpper_visibility: "inner_wrpper_visibility.innerContent.*"
    },
    valueExpansionFunctionMap: {
        wrapper_margin: convertSpacing,
        wrapper_padding: convertSpacing,
        item_wrapper_padding: convertSpacing,
        item_margin: convertSpacing,
        item_padding: convertSpacing,
        on_sale_margin: convertSpacing,
        on_sale_padding: convertSpacing,
        pagination_wrapper_margin: convertSpacing,
        pagination_wrapper_padding: convertSpacing,
        pagination_margin: convertSpacing,
        pagination_padding: convertSpacing,
        pagination_result_count_margin: convertSpacing,
        pagination_result_count_padding: convertSpacing,
        pagination_sorting_margin: convertSpacing,
        pagination_sorting_padding: convertSpacing
    }
}
};
