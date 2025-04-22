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
            separator: "separator.decoration.font"
        },
        borders: {
            default: "module.decoration.border",
            custom_divider_border: "custom_divider_border.decoration.border",
            icon_border: "icon_border.decoration.border"
        },
        box_shadow: {
            default: "module.decoration.boxShadow"
        },
        filters: {
            default: "module.decoration.filters"
        },
        margin_padding: "module.decoration.spacing"
    },
    module: {
        divider_type: "divider_type.innerContent.*",
        use_multiple_line: "use_multiple_line.innerContent.*",
        line_number: "line_number.innerContent.*",
        multiple_line_gap: "multiple_line_gap.innerContent.*",
        separetor_type: "separetor_type.innerContent.*",
        icon_background: "icon_background.innerContent.*",
        title: "title.innerContent.*",
        title_tag: "title_tag.innerContent.*",
        lottie_file_options: "lottie_file_options.innerContent.*",
        external_file: "external_file.innerContent.*",
        upload: "upload.innerContent.*",
        json_ex_notice: "json_ex_notice.innerContent.*",
        animation_trigger: "animation_trigger.innerContent.*",
        stop_on_mouse_out: "stop_on_mouse_out.innerContent.*",
        threshold: "threshold.innerContent.*",
        loop: "loop.innerContent.*",
        speed: "speed.innerContent.*",
        direction_reverse: "direction_reverse.innerContent.*",
        renderer: "renderer.innerContent.*",
        use_image_as_icon: "use_image_as_icon.innerContent.*",
        image_as_icon: "image_as_icon.innerContent.*",
        image_alt_text: "image_alt_text.innerContent.*",
        image_as_icon_width: "image_as_icon_width.innerContent.*",
        lottie_image_width: "lottie_image_width.innerContent.*",
        font_icon: "font_icon.innerContent.*",
        icon_image_alignment: "icon_image_alignment.innerContent.*",
        icon_color: "icon_color.innerContent.*",
        icon_size: "icon_size.innerContent.*",
        divider_line_bg: "divider_line_bg.innerContent.*",
        divider_right_line_bg: "divider_right_line_bg.innerContent.*",
        divider_line_color: "divider_line_color.innerContent.*",
        divider_right_line_color: "divider_right_line_color.innerContent.*",
        divider_line_width: "divider_line_width.innerContent.*",
        divider_width: "divider_width.innerContent.*",
        line_alignment: "line_alignment.innerContent.*",
        divider_left_line_width: "divider_left_line_width.innerContent.*",
        divider_right_line_width: "divider_right_line_width.innerContent.*",
        divider_line_spacing: "divider_line_spacing.innerContent.*",
        line_placement: "line_placement.innerContent.*",
        separetor_margin: "separetor_margin.decoration.spacing.*.margin",
        separetor_padding: "separetor_padding.decoration.spacing.*.padding"
    },
    valueExpansionFunctionMap: {
        separetor_margin: convertSpacing,
        separetor_padding: convertSpacing
    }
}
};
