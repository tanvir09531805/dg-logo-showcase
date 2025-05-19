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
        }
    },
    module: {
        lc_max_width: "lc_max_width.innerContent.*",
        lc_vertical: "lc_vertical.innerContent.*",
        equal_height: "equal_height.innerContent.*",
        item_desktop: "item_desktop.innerContent.*",
        item_tablet: "item_tablet.innerContent.*",
        item_mobile: "item_mobile.innerContent.*",
        item_width: "item_width.innerContent.*",
        item_spacing: "item_spacing.innerContent.*",
        speed: "speed.innerContent.*",
        loop: "loop.innerContent.*",
        autoplay: "autoplay.innerContent.*",
        autospeed: "autospeed.innerContent.*",
        pause_hover: "pause_hover.innerContent.*",
        arrow: "arrow.innerContent.*",
        dots: "dots.innerContent.*",
        ticker: "ticker.innerContent.*",
        ticker_hover: "ticker_hover.innerContent.*",
        ticker_speed: "ticker_speed.innerContent.*",
        arrow_icon_color: "arrow_icon_color.innerContent.*",
        arrow_bg_color: "arrow_bg_color.innerContent.*",
        arrow_opacity_disable: "arrow_opacity_disable.innerContent.*",
        active_dot_color: "active_dot_color.innerContent.*",
        dots_color: "dots_color.innerContent.*",
        wrapper_margin: "wrapper_margin.decoration.spacing.*.margin",
        wrapper_padding: "wrapper_padding.decoration.spacing.*.padding",
        arrow_prev_margin: "arrow_prev_margin.decoration.spacing.*.margin",
        arrow_next_margin: "arrow_next_margin.decoration.spacing.*.margin"
    },
    valueExpansionFunctionMap: {
        wrapper_margin: D4ToD5Spacing,
        wrapper_padding: D4ToD5Spacing,
        arrow_prev_margin: D4ToD5Spacing,
        arrow_next_margin: D4ToD5Spacing
    }
}
};
