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
        fonts: {
            title: "title.decoration.font",
            t_dual: "t_dual.decoration.font",
            t_prefix: "t_prefix.decoration.font",
            t_infix: "t_infix.decoration.font",
            t_suffix: "t_suffix.decoration.font"
        },
        borders: {
            default: "module.decoration.border",
            prefix_border: "prefix_border.decoration.border",
            infix_border: "infix_border.decoration.border",
            suffix_border: "suffix_border.decoration.border"
        },
        box_shadow: {
            default: "module.decoration.boxShadow"
        },
        margin_padding: "module.decoration.spacing"
    },
    module: {
        title_tag: "title_tag.innerContent.*",
        title_prefix: "title_prefix.innerContent.*",
        title_prefix_block: "title_prefix_block.innerContent.*",
        title_infix: "title_infix.innerContent.*",
        title_infix_block: "title_infix_block.innerContent.*",
        title_suffix: "title_suffix.innerContent.*",
        title_suffix_block: "title_suffix_block.innerContent.*",
        use_dual_text: "use_dual_text.innerContent.*",
        use_dual_text_custom: "use_dual_text_custom.innerContent.*",
        custom_text_input: "custom_text_input.innerContent.*",
        highlighter_type: "highlighter_type.innerContent.*",
        highlighter_color: "highlighter_color.innerContent.*",
        enable_gradient_color: "enable_gradient_color.innerContent.*",
        gradient_color_start: "gradient_color_start.innerContent.*",
        gradient_color_end: "gradient_color_end.innerContent.*",
        gradient_type: "gradient_type.innerContent.*",
        gradient_direction: "gradient_direction.innerContent.*",
        gradient_direction_radial: "gradient_direction_radial.innerContent.*",
        gradient_start_position: "gradient_start_position.innerContent.*",
        gradient_end_position: "gradient_end_position.innerContent.*",
        highlighter_stroke_width: "highlighter_stroke_width.innerContent.*",
        highlighter_size: "highlighter_size.innerContent.*",
        highlighter_opacity: "highlighter_opacity.innerContent.*",
        highlighter_position: "highlighter_position.innerContent.*",
        highlighter_vertical_position: "highlighter_vertical_position.innerContent.*",
        highlighter_horizontal_position: "highlighter_horizontal_position.innerContent.*",
        enable_animation: "enable_animation.innerContent.*",
        anim_start: "anim_start.innerContent.*",
        anim_start_viewport: "anim_start_viewport.innerContent.*",
        anim_easing: "anim_easing.innerContent.*",
        anim_duration: "anim_duration.innerContent.*",
        anim_delay: "anim_delay.innerContent.*",
        enable_loop: "enable_loop.innerContent.*",
        anim_iteration: "anim_iteration.innerContent.*",
        anim_iteration_gap: "anim_iteration_gap.innerContent.*",
        use_divider: "use_divider.innerContent.*",
        divider_position: "divider_position.innerContent.*",
        divider_style: "divider_style.innerContent.*",
        divider_color: "divider_color.innerContent.*",
        divider_height: "divider_height.innerContent.*",
        divider_border_radius: "divider_border_radius.innerContent.*",
        divider_width: "divider_width.innerContent.*",
        divider_alignment: "divider_alignment.innerContent.*",
        use_divider_icon: "use_divider_icon.innerContent.*",
        divider_icon: "divider_icon.innerContent.*",
        divider_icon_alignment: "divider_icon_alignment.innerContent.*",
        divider_icon_color: "divider_icon_color.innerContent.*",
        divider_icon_bgcolor: "divider_icon_bgcolor.innerContent.*",
        use_divider_icon_circle: "use_divider_icon_circle.innerContent.*",
        dvr_icon_font_size: "dvr_icon_font_size.innerContent.*",
        use_divider_image: "use_divider_image.innerContent.*",
        divider_image: "divider_image.innerContent.*",
        divider_image_alt_text: "divider_image_alt_text.innerContent.*",
        divider_image_width: "divider_image_width.innerContent.*",
        divider_image_alignment: "divider_image_alignment.innerContent.*",
        divider_image_bgcolor: "divider_image_bgcolor.innerContent.*",
        use_divider_image_circle: "use_divider_image_circle.innerContent.*",
        divider_background: "divider_background.innerContent.*",
        prefix_maxwidth: "prefix_maxwidth.innerContent.*",
        prefix_alignment: "prefix_alignment.innerContent.*",
        df_prefix_enable_clip: "df_prefix_enable_clip.innerContent.*",
        df_prefix_enable_bg_clip: "df_prefix_enable_bg_clip.innerContent.*",
        df_prefix_fill_color: "df_prefix_fill_color.innerContent.*",
        df_prefix_stroke_color: "df_prefix_stroke_color.innerContent.*",
        df_prefix_stroke_width: "df_prefix_stroke_width.innerContent.*",
        infix_maxwidth: "infix_maxwidth.innerContent.*",
        infix_alignment: "infix_alignment.innerContent.*",
        df_infix_enable_clip: "df_infix_enable_clip.innerContent.*",
        df_infix_enable_bg_clip: "df_infix_enable_bg_clip.innerContent.*",
        df_infix_fill_color: "df_infix_fill_color.innerContent.*",
        df_infix_stroke_color: "df_infix_stroke_color.innerContent.*",
        df_infix_stroke_width: "df_infix_stroke_width.innerContent.*",
        suffix_maxwidth: "suffix_maxwidth.innerContent.*",
        suffix_alignment: "suffix_alignment.innerContent.*",
        df_suffix_enable_clip: "df_suffix_enable_clip.innerContent.*",
        df_suffix_enable_bg_clip: "df_suffix_enable_bg_clip.innerContent.*",
        df_suffix_fill_color: "df_suffix_fill_color.innerContent.*",
        df_suffix_stroke_color: "df_suffix_stroke_color.innerContent.*",
        df_suffix_stroke_width: "df_suffix_stroke_width.innerContent.*",
        prefix_background: "prefix_background.innerContent.*",
        infix_background: "infix_background.innerContent.*",
        suffix_background: "suffix_background.innerContent.*",
        heading_margin: "heading_margin.decoration.spacing.*.margin",
        heading_padding: "heading_padding.decoration.spacing.*.padding",
        prefix_margin: "prefix_margin.decoration.spacing.*.margin",
        prefix_padding: "prefix_padding.decoration.spacing.*.padding",
        infix_margin: "infix_margin.decoration.spacing.*.margin",
        infix_padding: "infix_padding.decoration.spacing.*.padding",
        suffix_margin: "suffix_margin.decoration.spacing.*.margin",
        suffix_padding: "suffix_padding.decoration.spacing.*.padding",
        divider_container_margin: "divider_container_margin.decoration.spacing.*.margin",
        divider_container_padding: "divider_container_padding.decoration.spacing.*.padding",
        divider_margin: "divider_margin.decoration.spacing.*.margin",
        divider_padding: "divider_padding.decoration.spacing.*.padding",
        divider_icon_image_margin: "divider_icon_image_margin.decoration.spacing.*.margin",
        divider_icon_image_padding: "divider_icon_image_padding.decoration.spacing.*.padding",
        dual_text_margin: "dual_text_margin.decoration.spacing.*.margin",
        dual_text_padding: "dual_text_padding.decoration.spacing.*.padding"
    },
    valueExpansionFunctionMap: {
        heading_margin: D4ToD5Spacing,
        heading_padding: D4ToD5Spacing,
        prefix_margin: D4ToD5Spacing,
        prefix_padding: D4ToD5Spacing,
        infix_margin: D4ToD5Spacing,
        infix_padding: D4ToD5Spacing,
        suffix_margin: D4ToD5Spacing,
        suffix_padding: D4ToD5Spacing,
        divider_container_margin: D4ToD5Spacing,
        divider_container_padding: D4ToD5Spacing,
        divider_margin: D4ToD5Spacing,
        divider_padding: D4ToD5Spacing,
        divider_icon_image_margin: D4ToD5Spacing,
        divider_icon_image_padding: D4ToD5Spacing,
        dual_text_margin: D4ToD5Spacing,
        dual_text_padding: D4ToD5Spacing
    }
}
};
