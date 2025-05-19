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
            default: "module.decoration.border",
            iamge: "iamge.decoration.border"
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
        fii_max_width: "fii_max_width.innerContent.*",
        fii_max_height: "fii_max_height.innerContent.*",
        image: "image.innerContent.*",
        alt_text: "alt_text.innerContent.*",
        horizontal_position: "horizontal_position.innerContent.*",
        vertical_position: "vertical_position.innerContent.*",
        animation_type: "animation_type.innerContent.*",
        vertical_anime_distance: "vertical_anime_distance.innerContent.*",
        horizontal_anime_distance: "horizontal_anime_distance.innerContent.*",
        duration: "duration.innerContent.*",
        delay: "delay.innerContent.*",
        animation_function: "animation_function.innerContent.*"
    }
}
};
