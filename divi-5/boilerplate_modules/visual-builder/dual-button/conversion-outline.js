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
        fonts: {
            left_button: "left_button.decoration.font",
            right_button: "right_button.decoration.font",
            separator: "separator.decoration.font"
        },
        borders: {
            default: "module.decoration.border",
            left_button: "left_button.decoration.border",
            right_button: "right_button.decoration.border",
            separator: "separator.decoration.border",
            left_button_wrapper: "left_button_wrapper.decoration.border",
            right_button_wrapper: "right_button_wrapper.decoration.border"
        },
        box_shadow: {
            default: "module.decoration.boxShadow"
        },
        margin_padding: "module.decoration.spacing"
    },
    module: {
        btn_left_background: "btn_left_background.innerContent.*",
        use_left_button_icon: "use_left_button_icon.innerContent.*",
        btn_left_font_icon: "btn_left_font_icon.innerContent.*",
        btn_left_icon_color: "btn_left_icon_color.innerContent.*",
        btn_left_icon_font_size: "btn_left_icon_font_size.innerContent.*",
        btn_left_icon_placement: "btn_left_icon_placement.innerContent.*",
        btn_left_icon_gap: "btn_left_icon_gap.innerContent.*",
        btn_right_background: "btn_right_background.innerContent.*",
        use_right_button_icon: "use_right_button_icon.innerContent.*",
        btn_right_font_icon: "btn_right_font_icon.innerContent.*",
        btn_right_icon_color: "btn_right_icon_color.innerContent.*",
        btn_right_icon_font_size: "btn_right_icon_font_size.innerContent.*",
        btn_right_icon_placement: "btn_right_icon_placement.innerContent.*",
        btn_right_icon_gap: "btn_right_icon_gap.innerContent.*",
        left_button: "left_button.innerContent.*",
        left_button_url: "left_button_url.innerContent.*",
        left_button_target: "left_button_target.innerContent.*",
        right_button: "right_button.innerContent.*",
        right_button_url: "right_button_url.innerContent.*",
        right_button_target: "right_button_target.innerContent.*",
        button_separator: "button_separator.innerContent.*",
        separator_text: "separator_text.innerContent.*",
        use_icon: "use_icon.innerContent.*",
        font_icon: "font_icon.innerContent.*",
        icon_color: "icon_color.innerContent.*",
        use_icon_font_size: "use_icon_font_size.innerContent.*",
        icon_font_size: "icon_font_size.innerContent.*",
        separator_background: "separator_background.innerContent.*",
        left_button_wrapper_margin: "left_button_wrapper_margin.decoration.spacing.*.margin",
        left_button_wrapper_padding: "left_button_wrapper_padding.decoration.spacing.*.padding",
        right_button_wrapper_margin: "right_button_wrapper_margin.decoration.spacing.*.margin",
        right_button_wrapper_padding: "right_button_wrapper_padding.decoration.spacing.*.padding",
        left_button_margin: "left_button_margin.decoration.spacing.*.margin",
        left_button_padding: "left_button_padding.decoration.spacing.*.padding",
        right_button_margin: "right_button_margin.decoration.spacing.*.margin",
        right_button_padding: "right_button_padding.decoration.spacing.*.padding",
        button_separator_margin: "button_separator_margin.decoration.spacing.*.margin",
        button_separator_padding: "button_separator_padding.decoration.spacing.*.padding",
        button_style: "button_style.innerContent.*",
        alignment: "alignment.innerContent.*"
    },
    valueExpansionFunctionMap: {
        left_button_wrapper_margin: convertSpacing,
        left_button_wrapper_padding: convertSpacing,
        right_button_wrapper_margin: convertSpacing,
        right_button_wrapper_padding: convertSpacing,
        left_button_margin: convertSpacing,
        left_button_padding: convertSpacing,
        right_button_margin: convertSpacing,
        right_button_padding: convertSpacing,
        button_separator_margin: convertSpacing,
        button_separator_padding: convertSpacing
    }
}
};
