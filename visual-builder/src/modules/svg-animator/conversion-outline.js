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
        svg_src: "svg_src.innerContent.*",
        notice: "notice.innerContent.*",
        alignment: "alignment.innerContent.*",
        svg_color: "svg_color.innerContent.*",
        svg_width: "svg_width.innerContent.*",
        svg_height: "svg_height.innerContent.*",
        svg_weight: "svg_weight.innerContent.*",
        animation_type: "animation_type.innerContent.*",
        delay_animation: "delay_animation.innerContent.*",
        duration_animation: "duration_animation.innerContent.*",
        animation_timing_func: "animation_timing_func.innerContent.*",
        enable_loop: "enable_loop.innerContent.*",
        loop_infinite: "loop_infinite.innerContent.*",
        loop_time: "loop_time.innerContent.*",
        path_timing_func: "path_timing_func.innerContent.*",
        animation_start: "animation_start.innerContent.*",
        enable_replay: "enable_replay.innerContent.*",
        replay_type: "replay_type.innerContent.*",
        __svg_animator: "__svg_animator.innerContent.*"
    }
}
};
