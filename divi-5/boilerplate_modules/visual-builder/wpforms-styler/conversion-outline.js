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
            label: "label.decoration.font",
            sub_label: "sub_label.decoration.font",
            description: "description.decoration.font",
            input_text: "input_text.decoration.font",
            radio_text: "radio_text.decoration.font",
            dropdown: "dropdown.decoration.font",
            submit: "submit.decoration.font"
        },
        borders: {
            default: "module.decoration.border",
            input: "input.decoration.border",
            submit: "submit.decoration.border",
            dropdown: "dropdown.decoration.border"
        }
    },
    module: {
        checkbox_radio_color: "checkbox_radio_color.innerContent.*",
        wpforms: "wpforms.innerContent.*",
        dorpdown_height: "dorpdown_height.innerContent.*",
        submit_align: "submit_align.innerContent.*",
        input_bg: "input_bg.innerContent.*",
        submit_bg: "submit_bg.innerContent.*",
        label_margin: "label_margin.decoration.spacing.*.margin",
        label_padding: "label_padding.decoration.spacing.*.padding",
        input_margin: "input_margin.decoration.spacing.*.margin",
        input_padding: "input_padding.decoration.spacing.*.padding",
        radio_margin: "radio_margin.decoration.spacing.*.margin",
        radio_padding: "radio_padding.decoration.spacing.*.padding",
        checkbox_margin: "checkbox_margin.decoration.spacing.*.margin",
        checkbox_padding: "checkbox_padding.decoration.spacing.*.padding",
        submit_margin: "submit_margin.decoration.spacing.*.margin",
        submit_padding: "submit_padding.decoration.spacing.*.padding",
        drop_bg: "drop_bg.innerContent.*"
    },
    valueExpansionFunctionMap: {
        label_margin: convertSpacing,
        label_padding: convertSpacing,
        input_margin: convertSpacing,
        input_padding: convertSpacing,
        radio_margin: convertSpacing,
        radio_padding: convertSpacing,
        checkbox_margin: convertSpacing,
        checkbox_padding: convertSpacing,
        submit_margin: convertSpacing,
        submit_padding: convertSpacing
    }
}
};
