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
            head_text: "head_text.decoration.font",
            row_text: "row_text.decoration.font",
            no_match_text: "no_match_text.decoration.font",
            search_lebel_text: "search_lebel_text.decoration.font",
            search_input_text: "search_input_text.decoration.font",
            pagination_disable_button_text: "pagination_disable_button_text.decoration.font",
            pagination_current_button_text: "pagination_current_button_text.decoration.font",
            paging_text: "paging_text.decoration.font",
            info_text: "info_text.decoration.font",
            link_text: "link_text.decoration.font"
        },
        borders: {
            default: "module.decoration.border",
            table_border: "table_border.decoration.border",
            head_border: "head_border.decoration.border",
            row_border: "row_border.decoration.border",
            search_input_border: "search_input_border.decoration.border",
            info_border: "info_border.decoration.border",
            pagination_button_border: "pagination_button_border.decoration.border",
            link_border: "link_border.decoration.border",
            image_border: "image_border.decoration.border",
            icon_border: "icon_border.decoration.border"
        },
        box_shadow: {
            default: "module.decoration.boxShadow"
        },
        margin_padding: "module.decoration.spacing"
    },
    module: {
        table_type: "table_type.innerContent.*",
        csv_upload_data: "csv_upload_data.innerContent.*",
        import_table_data: "import_table_data.innerContent.*",
        database_tables_list: "database_tables_list.innerContent.*",
        table_press_list: "table_press_list.innerContent.*",
        google_api_key: "google_api_key.innerContent.*",
        google_sheet_id: "google_sheet_id.innerContent.*",
        google_sheet_range: "google_sheet_range.innerContent.*",
        google_cache_remove: "google_cache_remove.innerContent.*",
        keep_line_break: "keep_line_break.innerContent.*",
        adt_search: "adt_search.innerContent.*",
        adt_paging: "adt_paging.innerContent.*",
        show_entries: "show_entries.innerContent.*",
        adt_order: "adt_order.innerContent.*",
        sorting_icon_color: "sorting_icon_color.innerContent.*",
        adt_info: "adt_info.innerContent.*",
        multi_lang_enable: "multi_lang_enable.innerContent.*",
        multi_lang_name: "multi_lang_name.innerContent.*",
        search_input_background: "search_input_background.innerContent.*",
        table_background: "table_background.innerContent.*",
        head_background: "head_background.innerContent.*",
        row_background: "row_background.innerContent.*",
        row_odd_background: "row_odd_background.innerContent.*",
        row_even_background: "row_even_background.innerContent.*",
        paging_button_background: "paging_button_background.innerContent.*",
        paging_active_button_background: "paging_active_button_background.innerContent.*",
        pagination_dot_size: "pagination_dot_size.innerContent.*",
        pagination_dot_color: "pagination_dot_color.innerContent.*",
        info_select_background: "info_select_background.innerContent.*",
        table_wrapper_padding: "table_wrapper_padding.decoration.spacing.*.padding",
        search_padding: "search_padding.decoration.spacing.*.padding",
        paging_info_padding: "paging_info_padding.decoration.spacing.*.padding",
        paging_bottom_info_padding: "paging_bottom_info_padding.decoration.spacing.*.padding",
        pagination_button_padding: "pagination_button_padding.decoration.spacing.*.padding",
        pagination_spacing: "pagination_spacing.innerContent.*",
        table_padding: "table_padding.decoration.spacing.*.padding",
        head_cell_padding: "head_cell_padding.decoration.spacing.*.padding",
        body_cell_padding: "body_cell_padding.decoration.spacing.*.padding",
        search_input_padding: "search_input_padding.decoration.spacing.*.padding",
        search_lebel_spacing: "search_lebel_spacing.innerContent.*",
        between_button_spacing: "between_button_spacing.innerContent.*",
        make_head_cell_equal_border: "make_head_cell_equal_border.innerContent.*",
        make_row_cell_equal_border: "make_row_cell_equal_border.innerContent.*",
        make_row_last_cell_border_right_0: "make_row_last_cell_border_right_0.innerContent.*",
        make_row_first_cell_border_left_0: "make_row_first_cell_border_left_0.innerContent.*",
        make_first_row_all_cell_border_top_0: "make_first_row_all_cell_border_top_0.innerContent.*",
        make_last_row_all_cell_border_bottom_0: "make_last_row_all_cell_border_bottom_0.innerContent.*",
        image_size: "image_size.innerContent.*",
        icon_color: "icon_color.innerContent.*",
        icon_size: "icon_size.innerContent.*",
        link_background: "link_background.innerContent.*",
        link_padding: "link_padding.decoration.spacing.*.padding"
    },
    valueExpansionFunctionMap: {
        table_wrapper_padding: D4ToD5Spacing,
        search_padding: D4ToD5Spacing,
        paging_info_padding: D4ToD5Spacing,
        paging_bottom_info_padding: D4ToD5Spacing,
        pagination_button_padding: D4ToD5Spacing,
        table_padding: D4ToD5Spacing,
        head_cell_padding: D4ToD5Spacing,
        body_cell_padding: D4ToD5Spacing,
        search_input_padding: D4ToD5Spacing,
        link_padding: D4ToD5Spacing
    }
}
};
