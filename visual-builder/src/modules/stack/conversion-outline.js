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
            text_title: "text_title.decoration.font",
            text_subtitle: "text_subtitle.decoration.font",
            rating_label: "rating_label.decoration.font",
            tooltip_text_a: "tooltip_text_a.decoration.font",
            tooltip_text_h1: "tooltip_text_h1.decoration.font",
            tooltip_text_body: "tooltip_text_body.decoration.font"
        },
        borders: {
            default: "module.decoration.border",
            icon: "icon.decoration.border",
            media: "media.decoration.border",
            text: "text.decoration.border",
            rating: "rating.decoration.border",
            tooltips_border: "tooltips_border.decoration.border"
        },
        box_shadow: {
            default: "module.decoration.boxShadow"
        },
        margin_padding: "module.decoration.spacing"
    },
    module: {
        field_stack_spacing: "field_stack_spacing.innerContent.*",
        stack_animations: "stack_animations.innerContent.*",
        field_icon_color: "field_icon_color.innerContent.*",
        field_icon_size: "field_icon_size.innerContent.*",
        field_icon_background: "field_icon_background.innerContent.*",
        field_text_background: "field_text_background.innerContent.*",
        field_rating_position: "field_rating_position.innerContent.*",
        field_rating_alignment: "field_rating_alignment.innerContent.*",
        field_rating_icon_size: "field_rating_icon_size.innerContent.*",
        field_rating_color: "field_rating_color.innerContent.*",
        field_blank_color: "field_blank_color.innerContent.*",
        field_rating_background: "field_rating_background.innerContent.*",
        icon_container_margin: "icon_container_margin.decoration.spacing.*.margin",
        icon_container_padding: "icon_container_padding.decoration.spacing.*.padding",
        media_container_margin: "media_container_margin.decoration.spacing.*.margin",
        media_container_padding: "media_container_padding.decoration.spacing.*.padding",
        rating_container_margin: "rating_container_margin.decoration.spacing.*.margin",
        rating_container_padding: "rating_container_padding.decoration.spacing.*.padding",
        text_container_margin: "text_container_margin.decoration.spacing.*.margin",
        text_container_padding: "text_container_padding.decoration.spacing.*.padding",
        field_tooltip_enable: "field_tooltip_enable.innerContent.*",
        field_tooltip_arrow: "field_tooltip_arrow.innerContent.*",
        field_tooltip_placement: "field_tooltip_placement.innerContent.*",
        field_tooltip_animation: "field_tooltip_animation.innerContent.*",
        field_tooltip_trigger: "field_tooltip_trigger.innerContent.*",
        field_tooltip_interactive: "field_tooltip_interactive.innerContent.*",
        field_tooltip_interactive_border: "field_tooltip_interactive_border.innerContent.*",
        field_tooltip_content_delay: "field_tooltip_content_delay.innerContent.*",
        field_tooltip_interactive_debounce: "field_tooltip_interactive_debounce.innerContent.*",
        field_tooltip_follow_cursor: "field_tooltip_follow_cursor.innerContent.*",
        field_tooltip_custom_maxwidth: "field_tooltip_custom_maxwidth.innerContent.*",
        field_tooltip_offset_enable: "field_tooltip_offset_enable.innerContent.*",
        field_tooltip_offset_skidding: "field_tooltip_offset_skidding.innerContent.*",
        field_tooltip_offset_distance: "field_tooltip_offset_distance.innerContent.*",
        field_tooltip_arrow_color: "field_tooltip_arrow_color.innerContent.*",
        field_tooltip_background: "field_tooltip_background.innerContent.*",
        tooltips_padding: "tooltips_padding.decoration.spacing.*.padding"
    },
    valueExpansionFunctionMap: {
        icon_container_margin: convertSpacing,
        icon_container_padding: convertSpacing,
        media_container_margin: convertSpacing,
        media_container_padding: convertSpacing,
        rating_container_margin: convertSpacing,
        rating_container_padding: convertSpacing,
        text_container_margin: convertSpacing,
        text_container_padding: convertSpacing,
        tooltips_padding: convertSpacing
    }
}
};
