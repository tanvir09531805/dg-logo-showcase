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
            input: "input.decoration.font",
            dropdown: "dropdown.decoration.font",
            submit: "submit.decoration.font"
        },
        borders: {
            input: "input.decoration.border",
            dropdown: "dropdown.decoration.border",
            submit: "submit.decoration.border",
            default: "module.decoration.border"
        },
        box_shadow: {
            default: "module.decoration.boxShadow"
        }
    },
    module: {
        cf7_forms: "cf7_forms.innerContent.*",
        input_text_width: "input_text_width.innerContent.*",
        input_email_width: "input_email_width.innerContent.*",
        input_textarea_width: "input_textarea_width.innerContent.*",
        input_select_width: "input_select_width.innerContent.*",
        input_background: "input_background.innerContent.*",
        dropdown_margin: "dropdown_margin.decoration.spacing.*.margin",
        dropdown_padding: "dropdown_padding.decoration.spacing.*.padding",
        select_background: "select_background.innerContent.*",
        submit_background: "submit_background.innerContent.*",
        input_margin: "input_margin.decoration.spacing.*.margin",
        input_padding: "input_padding.decoration.spacing.*.padding",
        submit_margin: "submit_margin.decoration.spacing.*.margin",
        submit_padding: "submit_padding.decoration.spacing.*.padding",
        submit_button_align: "submit_button_align.innerContent.*",
        input_submit_width: "input_submit_width.innerContent.*"
    },
    valueExpansionFunctionMap: {
        dropdown_margin: convertSpacing,
        dropdown_padding: convertSpacing,
        input_margin: convertSpacing,
        input_padding: convertSpacing,
        submit_margin: convertSpacing,
        submit_padding: convertSpacing
    }
}
};
