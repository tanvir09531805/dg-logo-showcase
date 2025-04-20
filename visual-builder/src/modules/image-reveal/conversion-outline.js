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
            overlay_title: "overlay_title.decoration.font",
            overlay_description: "overlay_description.decoration.font",
            caption: "caption.decoration.font"
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
        field_image: "field_image.innerContent.*",
        alt: "alt.innerContent.*",
        title_text: "title_text.innerContent.*",
        field_lightbox_enable: "field_lightbox_enable.innerContent.*",
        field_link_url: "field_link_url.innerContent.*",
        field_link_target: "field_link_target.innerContent.*",
        field_reveal_directions: "field_reveal_directions.innerContent.*",
        reveal_color_bg: "reveal_color_bg.innerContent.*",
        field_reveal_delay: "field_reveal_delay.innerContent.*",
        field_reveal_animation_time: "field_reveal_animation_time.innerContent.*",
        field_reveal_view_port: "field_reveal_view_port.innerContent.*",
        field_placeholder_bg: "field_placeholder_bg.innerContent.*",
        field_rounded_corner: "field_rounded_corner.innerContent.*",
        field_overlay_enable: "field_overlay_enable.innerContent.*",
        field_overlay_color: "field_overlay_color.innerContent.*",
        field_overlay_opacity: "field_overlay_opacity.innerContent.*",
        field_hover_overlay_enable: "field_hover_overlay_enable.innerContent.*",
        field_hover_overlay_color: "field_hover_overlay_color.innerContent.*",
        field_hover_overlay_opacity: "field_hover_overlay_opacity.innerContent.*",
        field_hover_overlay_arrive_from: "field_hover_overlay_arrive_from.innerContent.*",
        field_hover_overlay_content_arrive_from: "field_hover_overlay_content_arrive_from.innerContent.*",
        field_hover_overlay_transition_delay: "field_hover_overlay_transition_delay.innerContent.*",
        field_hover_overlay_transition_time: "field_hover_overlay_transition_time.innerContent.*",
        field_hover_overlay_content_enable: "field_hover_overlay_content_enable.innerContent.*",
        field_hover_overlay_content_field: "field_hover_overlay_content_field.innerContent.*",
        field_hover_overlay_content_placement: "field_hover_overlay_content_placement.innerContent.*",
        field_hover_overlay_content_alignment: "field_hover_overlay_content_alignment.innerContent.*",
        field_hover_overlay_container_padding: "field_hover_overlay_container_padding.decoration.spacing.*.padding",
        field_hover_image_effect_enable: "field_hover_image_effect_enable.innerContent.*",
        field_effect_style: "field_effect_style.innerContent.*",
        field_zoom_scale: "field_zoom_scale.innerContent.*",
        field_zooming_time: "field_zooming_time.innerContent.*",
        field_zooming_blur_out_time: "field_zooming_blur_out_time.innerContent.*",
        field_zooming_blur_level: "field_zooming_blur_level.innerContent.*",
        field_grayscale: "field_grayscale.innerContent.*",
        field_Speed_curve: "field_Speed_curve.innerContent.*",
        field_zoom_rotate: "field_zoom_rotate.innerContent.*",
        align: "align.innerContent.*",
        force_fullwidth: "force_fullwidth.innerContent.*",
        field_caption_enable: "field_caption_enable.innerContent.*",
        field_caption_title: "field_caption_title.innerContent.*",
        field_caption_placement: "field_caption_placement.innerContent.*",
        field_caption_background: "field_caption_background.innerContent.*",
        field_caption_padding: "field_caption_padding.decoration.spacing.*.padding",
        field_reveal_effects: "field_reveal_effects.innerContent.*",
        field_reveal_effect_delay: "field_reveal_effect_delay.innerContent.*",
        field_reveal_effect_animation_time: "field_reveal_effect_animation_time.innerContent.*"
    },
    valueExpansionFunctionMap: {
        field_hover_overlay_container_padding: convertSpacing,
        field_caption_padding: convertSpacing
    }
}
};
