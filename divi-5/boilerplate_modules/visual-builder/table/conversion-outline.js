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
            head_text: "head_text.decoration.font",
            row_text: "row_text.decoration.font",
            row_first_column_text: "row_first_column_text.decoration.font",
            row_last_column_text: "row_last_column_text.decoration.font",
            footer_text: "footer_text.decoration.font",
            link_text: "link_text.decoration.font"
        },
        borders: {
            default: "module.decoration.border",
            table_border: "table_border.decoration.border",
            head_border: "head_border.decoration.border",
            row_border: "row_border.decoration.border",
            row_first_column_border: "row_first_column_border.decoration.border",
            row_last_column_border: "row_last_column_border.decoration.border",
            footer_border: "footer_border.decoration.border",
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
        responsive_mode: "responsive_mode.innerContent.*",
        make_head_cell_equal_border: "make_head_cell_equal_border.innerContent.*",
        make_row_cell_equal_border: "make_row_cell_equal_border.innerContent.*",
        make_foot_cell_equal_border: "make_foot_cell_equal_border.innerContent.*",
        make_row_last_cell_border_right_0: "make_row_last_cell_border_right_0.innerContent.*",
        make_row_first_cell_border_left_0: "make_row_first_cell_border_left_0.innerContent.*",
        head_background: "head_background.innerContent.*",
        row_background: "row_background.innerContent.*",
        row_odd_background: "row_odd_background.innerContent.*",
        row_even_background: "row_even_background.innerContent.*",
        row_first_column_background: "row_first_column_background.innerContent.*",
        row_last_column_background: "row_last_column_background.innerContent.*",
        footer_background: "footer_background.innerContent.*",
        icon_color: "icon_color.innerContent.*",
        icon_size: "icon_size.innerContent.*",
        image_size: "image_size.innerContent.*",
        link_background: "link_background.innerContent.*",
        link_padding: "link_padding.decoration.spacing.*.padding",
        exclude_head_foot: "exclude_head_foot.innerContent.*",
        exclude_head_foot_last_col: "exclude_head_foot_last_col.innerContent.*",
        table_padding: "table_padding.decoration.spacing.*.padding",
        head_cell_padding: "head_cell_padding.decoration.spacing.*.padding",
        body_cell_padding: "body_cell_padding.decoration.spacing.*.padding",
        foot_cell_padding: "foot_cell_padding.decoration.spacing.*.padding",
        image_margin: "image_margin.decoration.spacing.*.margin",
        icon_margin: "icon_margin.decoration.spacing.*.margin"
    },
    valueExpansionFunctionMap: {
        link_padding: convertSpacing,
        table_padding: convertSpacing,
        head_cell_padding: convertSpacing,
        body_cell_padding: convertSpacing,
        foot_cell_padding: convertSpacing,
        image_margin: convertSpacing,
        icon_margin: convertSpacing
    }
}
};
