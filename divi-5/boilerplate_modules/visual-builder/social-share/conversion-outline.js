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
            label: "label.decoration.font",
            icon: "icon.decoration.font",
            header_title: "header_title.decoration.font",
            header_sub_title: "header_sub_title.decoration.font",
            tooltip_text_a: "tooltip_text_a.decoration.font",
            tooltip_text_h1: "tooltip_text_h1.decoration.font",
            tooltip_text_body: "tooltip_text_body.decoration.font"
        },
        borders: {
            default: "module.decoration.border",
            icon: "icon.decoration.border",
            label: "label.decoration.border",
            header_container: "header_container.decoration.border",
            share_button: "share_button.decoration.border",
            tooltips_border: "tooltips_border.decoration.border"
        },
        box_shadow: {
            default: "module.decoration.boxShadow"
        },
        margin_padding: "module.decoration.spacing"
    },
    module: {
        item_view: "item_view.innerContent.*",
        column_view: "column_view.innerContent.*",
        columns_gap: "columns_gap.innerContent.*",
        rows_gap: "rows_gap.innerContent.*",
        button_height: "button_height.innerContent.*",
        url_new_window: "url_new_window.innerContent.*",
        icon_color: "icon_color.innerContent.*",
        use_icon_font_size: "use_icon_font_size.innerContent.*",
        icon_font_size: "icon_font_size.innerContent.*",
        icon_position: "icon_position.innerContent.*",
        icon_alignment: "icon_alignment.innerContent.*",
        content_alignment: "content_alignment.innerContent.*",
        column_auto_child_item_alignment: "column_auto_child_item_alignment.innerContent.*",
        child_content_alignment: "child_content_alignment.innerContent.*",
        enable_header: "enable_header.innerContent.*",
        header_title: "header_title.innerContent.*",
        header_sub_title: "header_sub_title.innerContent.*",
        header_icon: "header_icon.innerContent.*",
        header_icon_color: "header_icon_color.innerContent.*",
        use_header_icon_font_size: "use_header_icon_font_size.innerContent.*",
        header_icon_font_size: "header_icon_font_size.innerContent.*",
        header_icon_position: "header_icon_position.innerContent.*",
        header_icon_alignment: "header_icon_alignment.innerContent.*",
        header_content_gap: "header_content_gap.innerContent.*",
        header_alignment: "header_alignment.innerContent.*",
        field_tooltip_enable: "field_tooltip_enable.innerContent.*",
        field_tooltip_arrow: "field_tooltip_arrow.innerContent.*",
        field_tooltip_disable_on_mobile: "field_tooltip_disable_on_mobile.innerContent.*",
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
        tooltips_padding: "tooltips_padding.decoration.spacing.*.padding",
        icon_container_margin: "icon_container_margin.decoration.spacing.*.margin",
        icon_container_padding: "icon_container_padding.decoration.spacing.*.padding",
        label_container_margin: "label_container_margin.decoration.spacing.*.margin",
        label_container_padding: "label_container_padding.decoration.spacing.*.padding",
        header_container_margin: "header_container_margin.decoration.spacing.*.margin",
        header_container_padding: "header_container_padding.decoration.spacing.*.padding",
        header_text_container_margin: "header_text_container_margin.decoration.spacing.*.margin",
        header_text_container_padding: "header_text_container_padding.decoration.spacing.*.padding",
        share_button_margin: "share_button_margin.decoration.spacing.*.margin",
        share_button_padding: "share_button_padding.decoration.spacing.*.padding",
        icon_bg_color: "icon_bg_color.innerContent.*",
        text_container_bg_color: "text_container_bg_color.innerContent.*",
        header_container_bg_color: "header_container_bg_color.innerContent.*"
    },
    valueExpansionFunctionMap: {
        tooltips_padding: convertSpacing,
        icon_container_margin: convertSpacing,
        icon_container_padding: convertSpacing,
        label_container_margin: convertSpacing,
        label_container_padding: convertSpacing,
        header_container_margin: convertSpacing,
        header_container_padding: convertSpacing,
        header_text_container_margin: convertSpacing,
        header_text_container_padding: convertSpacing,
        share_button_margin: convertSpacing,
        share_button_padding: convertSpacing
    }
}
};
