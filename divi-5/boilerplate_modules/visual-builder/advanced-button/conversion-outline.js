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
            button_text: "button_text.decoration.font",
            button_sub_text: "button_sub_text.decoration.font",
            tooltip_text_a: "tooltip_text_a.decoration.font",
            tooltip_text_h1: "tooltip_text_h1.decoration.font",
            tooltip_text_body: "tooltip_text_body.decoration.font"
        },
        borders: {
            default: "module.decoration.border",
            media: "media.decoration.border",
            tooltips_border: "tooltips_border.decoration.border"
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
        button_text: "button_text.innerContent.*",
        button_sub_text: "button_sub_text.innerContent.*",
        use_button_icon: "use_button_icon.innerContent.*",
        button_icon: "button_icon.innerContent.*",
        button_image: "button_image.innerContent.*",
        button_link_type: "button_link_type.innerContent.*",
        button_link_url: "button_link_url.innerContent.*",
        button_link_download: "button_link_download.innerContent.*",
        button_link_email: "button_link_email.innerContent.*",
        button_link_phone: "button_link_phone.innerContent.*",
        button_url_new_window: "button_url_new_window.innerContent.*",
        media_placement: "media_placement.innerContent.*",
        sub_text_placement: "sub_text_placement.innerContent.*",
        icon_color: "icon_color.innerContent.*",
        button_icon_size: "button_icon_size.innerContent.*",
        media_background_color: "media_background_color.innerContent.*",
        button_alignment: "button_alignment.innerContent.*",
        button_content_alignment: "button_content_alignment.innerContent.*",
        media_wrapper_width: "media_wrapper_width.innerContent.*",
        media_wrapper_height: "media_wrapper_height.innerContent.*",
        preview_btn: "preview_btn.innerContent.*",
        main_hover: "main_hover.innerContent.*",
        field_tooltip_enable: "field_tooltip_enable.innerContent.*",
        field_tooltip_content: "field_tooltip_content.innerContent.*",
        field_tooltip_disable_on_mobile: "field_tooltip_disable_on_mobile.innerContent.*",
        field_tooltip_arrow: "field_tooltip_arrow.innerContent.*",
        field_tooltip_placement: "field_tooltip_placement.innerContent.*",
        field_tooltip_animation: "field_tooltip_animation.innerContent.*",
        field_tooltip_interactive: "field_tooltip_interactive.innerContent.*",
        field_tooltip_interactive_border: "field_tooltip_interactive_border.innerContent.*",
        field_tooltip_content_delay: "field_tooltip_content_delay.innerContent.*",
        field_tooltip_interactive_debounce: "field_tooltip_interactive_debounce.innerContent.*",
        field_tooltip_custom_maxwidth: "field_tooltip_custom_maxwidth.innerContent.*",
        field_tooltip_offset_enable: "field_tooltip_offset_enable.innerContent.*",
        field_tooltip_offset_skidding: "field_tooltip_offset_skidding.innerContent.*",
        field_tooltip_offset_distance: "field_tooltip_offset_distance.innerContent.*",
        content_container_margin: "content_container_margin.decoration.spacing.*.margin",
        content_container_padding: "content_container_padding.decoration.spacing.*.padding",
        text_margin: "text_margin.decoration.spacing.*.margin",
        text_padding: "text_padding.decoration.spacing.*.padding",
        sub_text_margin: "sub_text_margin.decoration.spacing.*.margin",
        sub_text_padding: "sub_text_padding.decoration.spacing.*.padding",
        field_tooltip_arrow_color: "field_tooltip_arrow_color.innerContent.*",
        field_tooltip_background: "field_tooltip_background.innerContent.*",
        tooltips_padding: "tooltips_padding.decoration.spacing.*.padding"
    },
    valueExpansionFunctionMap: {
        content_container_margin: convertSpacing,
        content_container_padding: convertSpacing,
        text_margin: convertSpacing,
        text_padding: convertSpacing,
        sub_text_margin: convertSpacing,
        sub_text_padding: convertSpacing,
        tooltips_padding: convertSpacing
    }
}
};
