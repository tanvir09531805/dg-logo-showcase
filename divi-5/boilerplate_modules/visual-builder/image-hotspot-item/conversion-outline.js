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
            spot_item_font: "spot_item_font.decoration.font"
        },
        borders: {
            default: "module.decoration.border",
            spot_image_border: "spot_image_border.decoration.border"
        },
        box_shadow: {
            default: "module.decoration.boxShadow"
        }
    },
    module: {
        admin_label: "admin_label.innerContent.*",
        spot_type: "spot_type.innerContent.*",
        spot_text: "spot_text.innerContent.*",
        use_image_as_icon: "use_image_as_icon.innerContent.*",
        image_as_icon: "image_as_icon.innerContent.*",
        image_alt_text: "image_alt_text.innerContent.*",
        image_as_icon_width: "image_as_icon_width.innerContent.*",
        font_icon: "font_icon.innerContent.*",
        icon_color: "icon_color.innerContent.*",
        icon_size: "icon_size.innerContent.*",
        left_position: "left_position.innerContent.*",
        top_position: "top_position.innerContent.*",
        variable_width: "variable_width.innerContent.*",
        spot_width: "spot_width.innerContent.*",
        spot_animation: "spot_animation.innerContent.*",
        spot_animation_style: "spot_animation_style.innerContent.*",
        animation_color: "animation_color.innerContent.*",
        spot_background: "spot_background.innerContent.*",
        content: "content.innerContent.*",
        spot_padding: "spot_padding.decoration.spacing.*.padding"
    },
    valueExpansionFunctionMap: {
        spot_padding: convertSpacing
    }
}
};
