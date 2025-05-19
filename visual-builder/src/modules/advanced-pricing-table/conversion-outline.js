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
        borders: {
            default: "module.decoration.border"
        },
        box_shadow: {
            default: "module.decoration.boxShadow"
        },
        filters: {
            default: "module.decoration.filters"
        }
    },
    module: {
        admin_label: "admin_label.innerContent.*",
        enable_animation: "enable_animation.innerContent.*",
        difl_animation_types: "difl_animation_types.innerContent.*",
        difl_animation_delay: "difl_animation_delay.innerContent.*",
        difl_animation_duration: "difl_animation_duration.innerContent.*",
        enable_feature_tooltip: "enable_feature_tooltip.innerContent.*",
        feature_text_tooltip_placement: "feature_text_tooltip_placement.innerContent.*",
        feature_text_tooltip_animation: "feature_text_tooltip_animation.innerContent.*",
        feature_text_tooltip_trigger: "feature_text_tooltip_trigger.innerContent.*",
        feature_text_tooltip_mouse_style: "feature_text_tooltip_mouse_style.innerContent.*",
        feature_text_tooltip_duration: "feature_text_tooltip_duration.innerContent.*",
        feature_text_tooltip_interactive: "feature_text_tooltip_interactive.innerContent.*",
        feature_text_tooltip_interactive_border: "feature_text_tooltip_interactive_border.innerContent.*",
        feature_text_tooltip_interactive_debounce: "feature_text_tooltip_interactive_debounce.innerContent.*",
        feature_text_tooltip_max_width: "feature_text_tooltip_max_width.innerContent.*",
        feature_text_tooltip_offset_distance_vertical: "feature_text_tooltip_offset_distance_vertical.innerContent.*",
        feature_text_tooltip_offset_distance: "feature_text_tooltip_offset_distance.innerContent.*"
    }
}
};
