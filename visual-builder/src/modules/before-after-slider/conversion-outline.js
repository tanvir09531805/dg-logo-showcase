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
            before_text: "before_text.decoration.font",
            after_text: "after_text.decoration.font"
        },
        borders: {
            default: "module.decoration.border",
            before_text_border: "before_text_border.decoration.border",
            after_text_border: "after_text_border.decoration.border"
        },
        box_shadow: {
            default: "module.decoration.boxShadow"
        }
    },
    module: {
        before_image: "before_image.innerContent.*",
        before_image_alt_text: "before_image_alt_text.innerContent.*",
        after_image: "after_image.innerContent.*",
        after_image_alt_text: "after_image_alt_text.innerContent.*",
        cm_sarting_point: "cm_sarting_point.innerContent.*",
        cm_vertical_mode: "cm_vertical_mode.innerContent.*",
        cm_control_hover: "cm_control_hover.innerContent.*",
        cm_control_color: "cm_control_color.innerContent.*",
        cm_control_shadow: "cm_control_shadow.innerContent.*",
        cm_add_circle: "cm_add_circle.innerContent.*",
        cm_add_circle_blur: "cm_add_circle_blur.innerContent.*",
        cm_smoothing: "cm_smoothing.innerContent.*",
        cm_smoothing_amount: "cm_smoothing_amount.innerContent.*",
        cm_enable_show_lebel: "cm_enable_show_lebel.innerContent.*",
        cm_before_lebel_text: "cm_before_lebel_text.innerContent.*",
        cm_after_lebel_text: "cm_after_lebel_text.innerContent.*",
        cm_level_show_on_hover: "cm_level_show_on_hover.innerContent.*",
        use_lebel_top_position: "use_lebel_top_position.innerContent.*",
        lebel_top_position: "lebel_top_position.innerContent.*",
        use_lebel_left_position: "use_lebel_left_position.innerContent.*",
        lebel_left_position: "lebel_left_position.innerContent.*",
        df_before_background: "df_before_background.innerContent.*",
        df_after_background: "df_after_background.innerContent.*",
        before_text_margin: "before_text_margin.decoration.spacing.*.margin",
        before_text_padding: "before_text_padding.decoration.spacing.*.padding",
        after_text_margin: "after_text_margin.decoration.spacing.*.margin",
        after_text_padding: "after_text_padding.decoration.spacing.*.padding"
    },
    valueExpansionFunctionMap: {
        before_text_margin: D4ToD5Spacing,
        before_text_padding: D4ToD5Spacing,
        after_text_margin: D4ToD5Spacing,
        after_text_padding: D4ToD5Spacing
    }
}
};
