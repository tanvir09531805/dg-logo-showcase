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
        fonts: {
            row_text: "row_text.decoration.font",
            link_text: "link_text.decoration.font",
            badge_text: "badge_text.decoration.font"
        },
        borders: {
            link_border: "link_border.decoration.border",
            icon_border: "icon_border.decoration.border",
            badge_border: "badge_border.decoration.border"
        }
    },
    module: {
        admin_label: "admin_label.innerContent.*",
        enable_row_merge: "enable_row_merge.innerContent.*",
        body_row_span_item: "body_row_span_item.innerContent.*",
        body_row_span_item_value: "body_row_span_item_value.innerContent.*",
        enable_column_merge: "enable_column_merge.innerContent.*",
        body_col_span_item: "body_col_span_item.innerContent.*",
        body_col_span_item_value: "body_col_span_item_value.innerContent.*",
        row: "row.innerContent.*",
        row_type: "row_type.innerContent.*",
        badge_enable: "badge_enable.innerContent.*",
        badge: "badge.innerContent.*",
        badge_position: "badge_position.innerContent.*",
        row_background: "row_background.innerContent.*",
        badge_background: "badge_background.innerContent.*",
        full_width_badge: "full_width_badge.innerContent.*",
        badge_alignment: "badge_alignment.innerContent.*",
        badge_margin: "badge_margin.decoration.spacing.*.margin",
        badge_padding: "badge_padding.decoration.spacing.*.padding",
        icon_color: "icon_color.innerContent.*",
        icon_size: "icon_size.innerContent.*",
        icon_margin: "icon_margin.decoration.spacing.*.margin",
        link_background: "link_background.innerContent.*",
        link_padding: "link_padding.decoration.spacing.*.padding"
    },
    valueExpansionFunctionMap: {
        badge_margin: D4ToD5Spacing,
        badge_padding: D4ToD5Spacing,
        icon_margin: D4ToD5Spacing,
        link_padding: D4ToD5Spacing
    }
}
};
