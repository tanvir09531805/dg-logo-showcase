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
            day_name: "day_name.decoration.font",
            time_div: "time_div.decoration.font",
            start_time: "start_time.decoration.font",
            end_time: "end_time.decoration.font",
            time_separetor: "time_separetor.decoration.font"
        },
        borders: {
            item_border: "item_border.decoration.border",
            day_border: "day_border.decoration.border",
            time_border: "time_border.decoration.border",
            start_time_border: "start_time_border.decoration.border",
            end_time_border: "end_time_border.decoration.border",
            time_separetor_border: "time_separetor_border.decoration.border"
        }
    },
    module: {
        admin_label: "admin_label.innerContent.*",
        day_name: "day_name.innerContent.*",
        off_day_enable: "off_day_enable.innerContent.*",
        off_day_text: "off_day_text.innerContent.*",
        time_structure_type: "time_structure_type.innerContent.*",
        time: "time.innerContent.*",
        start_time: "start_time.innerContent.*",
        end_time: "end_time.innerContent.*",
        time_separetor: "time_separetor.innerContent.*",
        day_background_color: "day_background_color.innerContent.*",
        time_background_color: "time_background_color.innerContent.*",
        start_time_background_color: "start_time_background_color.innerContent.*",
        end_time_background_color: "end_time_background_color.innerContent.*",
        time_separetor_background_color: "time_separetor_background_color.innerContent.*",
        item_padding: "item_padding.decoration.spacing.*.padding",
        day_margin: "day_margin.decoration.spacing.*.margin",
        day_padding: "day_padding.decoration.spacing.*.padding",
        time_margin: "time_margin.decoration.spacing.*.margin",
        time_padding: "time_padding.decoration.spacing.*.padding",
        start_time_margin: "start_time_margin.decoration.spacing.*.margin",
        start_time_padding: "start_time_padding.decoration.spacing.*.padding",
        end_time_margin: "end_time_margin.decoration.spacing.*.margin",
        end_time_padding: "end_time_padding.decoration.spacing.*.padding",
        time_separetor_margin: "time_separetor_margin.decoration.spacing.*.margin",
        time_separetor_padding: "time_separetor_padding.decoration.spacing.*.padding",
        item_wrapper_margin: "item_wrapper_margin.decoration.spacing.*.margin",
        item_wrapper_padding: "item_wrapper_padding.decoration.spacing.*.padding",
        on_separator_day_time: "on_separator_day_time.innerContent.*",
        day_time_separator_color: "day_time_separator_color.innerContent.*",
        day_time_separator_style: "day_time_separator_style.innerContent.*",
        day_time_separator_hight: "day_time_separator_hight.innerContent.*",
        day_time_separetor_margin: "day_time_separetor_margin.decoration.spacing.*.margin"
    },
    valueExpansionFunctionMap: {
        item_padding: D4ToD5Spacing,
        day_margin: D4ToD5Spacing,
        day_padding: D4ToD5Spacing,
        time_margin: D4ToD5Spacing,
        time_padding: D4ToD5Spacing,
        start_time_margin: D4ToD5Spacing,
        start_time_padding: D4ToD5Spacing,
        end_time_margin: D4ToD5Spacing,
        end_time_padding: D4ToD5Spacing,
        time_separetor_margin: D4ToD5Spacing,
        time_separetor_padding: D4ToD5Spacing,
        item_wrapper_margin: D4ToD5Spacing,
        item_wrapper_padding: D4ToD5Spacing,
        day_time_separetor_margin: D4ToD5Spacing
    }
}
};
