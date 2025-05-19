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
        box_shadow: {
            default: "module.decoration.boxShadow"
        },
        filters: {
            default: "module.decoration.filters"
        }
    },
    module: {
        lottie_file_options: "lottie_file_options.innerContent.*",
        external_file: "external_file.innerContent.*",
        upload: "upload.innerContent.*",
        json_ex_notice: "json_ex_notice.innerContent.*",
        animation_trigger: "animation_trigger.innerContent.*",
        scroll_effect: "scroll_effect.innerContent.*",
        stop_on_mouse_out: "stop_on_mouse_out.innerContent.*",
        threshold: "threshold.innerContent.*",
        loop: "loop.innerContent.*",
        speed: "speed.innerContent.*",
        direction_reverse: "direction_reverse.innerContent.*",
        renderer: "renderer.innerContent.*"
    }
}
};
