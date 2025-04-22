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
            text: "text.decoration.font",
            prefix: "prefix.decoration.font",
            typed_text: "typed_text.decoration.font",
            suffix: "suffix.decoration.font"
        },
        borders: {
            default: "module.decoration.border",
            prefix_border: "prefix_border.decoration.border",
            typed_border: "typed_border.decoration.border",
            suffix_border: "suffix_border.decoration.border"
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
        prefix: "prefix.innerContent.*",
        typed_text_list: "typed_text_list.innerContent.*",
        suffix: "suffix.innerContent.*",
        main_wrap_tag: "main_wrap_tag.innerContent.*",
        df_link: "df_link.innerContent.*",
        df_link_target: "df_link_target.innerContent.*",
        speed: "speed.innerContent.*",
        deletespeed: "deletespeed.innerContent.*",
        next_delay: "next_delay.innerContent.*",
        cursor: "cursor.innerContent.*",
        cursorchar: "cursorchar.innerContent.*",
        cursor_use_icon: "cursor_use_icon.innerContent.*",
        cursor_font_icon: "cursor_font_icon.innerContent.*",
        cursor_icon_color: "cursor_icon_color.innerContent.*",
        cursor_font_size: "cursor_font_size.innerContent.*",
        cursor_distance_left: "cursor_distance_left.innerContent.*",
        loop: "loop.innerContent.*",
        alignment: "alignment.innerContent.*",
        display_props_prefix: "display_props_prefix.innerContent.*",
        display_props_typed: "display_props_typed.innerContent.*",
        display_props_suffix: "display_props_suffix.innerContent.*",
        prefix_background: "prefix_background.innerContent.*",
        typed_background: "typed_background.innerContent.*",
        suffix_background: "suffix_background.innerContent.*",
        prefix_clip_enable_clip: "prefix_clip_enable_clip.innerContent.*",
        prefix_clip_enable_bg_clip: "prefix_clip_enable_bg_clip.innerContent.*",
        prefix_clip_fill_color: "prefix_clip_fill_color.innerContent.*",
        prefix_clip_stroke_color: "prefix_clip_stroke_color.innerContent.*",
        prefix_clip_stroke_width: "prefix_clip_stroke_width.innerContent.*",
        typed_clip_enable_clip: "typed_clip_enable_clip.innerContent.*",
        typed_clip_enable_bg_clip: "typed_clip_enable_bg_clip.innerContent.*",
        typed_clip_fill_color: "typed_clip_fill_color.innerContent.*",
        typed_clip_stroke_color: "typed_clip_stroke_color.innerContent.*",
        typed_clip_stroke_width: "typed_clip_stroke_width.innerContent.*",
        suffix_clip_enable_clip: "suffix_clip_enable_clip.innerContent.*",
        suffix_clip_enable_bg_clip: "suffix_clip_enable_bg_clip.innerContent.*",
        suffix_clip_fill_color: "suffix_clip_fill_color.innerContent.*",
        suffix_clip_stroke_color: "suffix_clip_stroke_color.innerContent.*",
        suffix_clip_stroke_width: "suffix_clip_stroke_width.innerContent.*",
        prefix_margin: "prefix_margin.decoration.spacing.*.margin",
        prefix_padding: "prefix_padding.decoration.spacing.*.padding",
        typed_margin: "typed_margin.decoration.spacing.*.margin",
        typed_padding: "typed_padding.decoration.spacing.*.padding",
        suffix_margin: "suffix_margin.decoration.spacing.*.margin",
        suffix_padding: "suffix_padding.decoration.spacing.*.padding"
    },
    valueExpansionFunctionMap: {
        prefix_margin: convertSpacing,
        prefix_padding: convertSpacing,
        typed_margin: convertSpacing,
        typed_padding: convertSpacing,
        suffix_margin: convertSpacing,
        suffix_padding: convertSpacing
    }
}
};
