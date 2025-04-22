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
            "text-body": "text-body.decoration.font",
            header: "header.decoration.font"
        },
        borders: {
            default: "module.decoration.border"
        },
        box_shadow: {
            default: "module.decoration.boxShadow"
        },
        margin_padding: "module.decoration.spacing"
    },
    module: {
        settings__content: "settings__content.innerContent.*",
        settings__trigger_type: "settings__trigger_type.innerContent.*",
        settings__split_content: "settings__split_content.innerContent.*",
        settings__reveal_by: "settings__reveal_by.innerContent.*",
        settings__reveal_color: "settings__reveal_color.innerContent.*",
        settings__reveal_duration: "settings__reveal_duration.innerContent.*",
        settings__reveal_delay: "settings__reveal_delay.innerContent.*",
        settings__reveal_initial_opacity: "settings__reveal_initial_opacity.innerContent.*",
        settings__reveal_viewport_offset_value_top: "settings__reveal_viewport_offset_value_top.innerContent.*",
        settings__reveal_viewport_offset_value_bottom: "settings__reveal_viewport_offset_value_bottom.innerContent.*"
    }
}
};
