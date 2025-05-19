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
            top_row: "top_row.decoration.border",
            center_row: "center_row.decoration.border",
            bottom_row: "bottom_row.decoration.border"
        },
        box_shadow: {
            default: "module.decoration.boxShadow"
        },
        filters: {
            default: "module.decoration.filters"
        }
    },
    module: {
        break_point: "break_point.innerContent.*",
        mslide_bg_color: "mslide_bg_color.innerContent.*",
        mslide_bg_image_width: "mslide_bg_image_width.innerContent.*",
        mslide_bg_image_height: "mslide_bg_image_height.innerContent.*",
        mslide_bg_horizontal_offset: "mslide_bg_horizontal_offset.innerContent.*",
        mslide_bg_vertical_offset: "mslide_bg_vertical_offset.innerContent.*",
        __video_mslide_bg: "__video_mslide_bg.innerContent.*",
        show_mobile_slide: "show_mobile_slide.innerContent.*",
        trow_hide_on_sticky: "trow_hide_on_sticky.innerContent.*",
        top_row_bg_color: "top_row_bg_color.innerContent.*",
        top_row_bg_image_width: "top_row_bg_image_width.innerContent.*",
        top_row_bg_image_height: "top_row_bg_image_height.innerContent.*",
        top_row_bg_horizontal_offset: "top_row_bg_horizontal_offset.innerContent.*",
        top_row_bg_vertical_offset: "top_row_bg_vertical_offset.innerContent.*",
        __video_top_row_bg: "__video_top_row_bg.innerContent.*",
        top_row_inner_width: "top_row_inner_width.innerContent.*",
        top_row_margin: "top_row_margin.decoration.spacing.*.margin",
        top_row_padding: "top_row_padding.decoration.spacing.*.padding",
        crow_hide_on_sticky: "crow_hide_on_sticky.innerContent.*",
        center_row_bg_color: "center_row_bg_color.innerContent.*",
        center_row_bg_image_width: "center_row_bg_image_width.innerContent.*",
        center_row_bg_image_height: "center_row_bg_image_height.innerContent.*",
        center_row_bg_horizontal_offset: "center_row_bg_horizontal_offset.innerContent.*",
        center_row_bg_vertical_offset: "center_row_bg_vertical_offset.innerContent.*",
        __video_center_row_bg: "__video_center_row_bg.innerContent.*",
        center_row_inner_width: "center_row_inner_width.innerContent.*",
        center_row_margin: "center_row_margin.decoration.spacing.*.margin",
        center_row_padding: "center_row_padding.decoration.spacing.*.padding",
        brow_hide_on_sticky: "brow_hide_on_sticky.innerContent.*",
        bottom_row_bg_color: "bottom_row_bg_color.innerContent.*",
        bottom_row_bg_image_width: "bottom_row_bg_image_width.innerContent.*",
        bottom_row_bg_image_height: "bottom_row_bg_image_height.innerContent.*",
        bottom_row_bg_horizontal_offset: "bottom_row_bg_horizontal_offset.innerContent.*",
        bottom_row_bg_vertical_offset: "bottom_row_bg_vertical_offset.innerContent.*",
        __video_bottom_row_bg: "__video_bottom_row_bg.innerContent.*",
        bottom_row_inner_width: "bottom_row_inner_width.innerContent.*",
        bottom_row_margin: "bottom_row_margin.decoration.spacing.*.margin",
        bottom_row_padding: "bottom_row_padding.decoration.spacing.*.padding"
    },
    valueExpansionFunctionMap: {
        top_row_margin: D4ToD5Spacing,
        top_row_padding: D4ToD5Spacing,
        center_row_margin: D4ToD5Spacing,
        center_row_padding: D4ToD5Spacing,
        bottom_row_margin: D4ToD5Spacing,
        bottom_row_padding: D4ToD5Spacing
    }
}
};
