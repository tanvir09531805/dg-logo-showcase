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
            child_icon_text: "child_icon_text.decoration.font",
            child_title_text: "child_title_text.decoration.font",
            child_content_text: "child_content_text.decoration.font",
            content_heading_1: "content_heading_1.decoration.font",
            child_tooltip_text: "child_tooltip_text.decoration.font"
        },
        borders: {
            default: "module.decoration.border",
            child_image_icon: "child_image_icon.decoration.border",
            child_title_element: "child_title_element.decoration.border",
            child_content_element: "child_content_element.decoration.border",
            child_wrapper_element: "child_wrapper_element.decoration.border",
            child_tooltip_element: "child_tooltip_element.decoration.border"
        },
        box_shadow: {
            default: "module.decoration.boxShadow"
        },
        margin_padding: "module.decoration.spacing"
    },
    module: {
        list_item_title: "list_item_title.innerContent.*",
        content: "content.innerContent.*",
        list_item_title_tag: "list_item_title_tag.innerContent.*",
        list_item_use_tooltip: "list_item_use_tooltip.innerContent.*",
        list_item_tooltip_content: "list_item_tooltip_content.innerContent.*",
        list_item_title_background: "list_item_title_background.innerContent.*",
        list_item_content_background: "list_item_content_background.innerContent.*",
        list_item_wrapper_background: "list_item_wrapper_background.innerContent.*",
        list_item_tooltip_background: "list_item_tooltip_background.innerContent.*",
        list_item_text_orientation: "list_item_text_orientation.innerContent.*",
        list_item_content_max_width: "list_item_content_max_width.innerContent.*",
        list_item_icon_type: "list_item_icon_type.innerContent.*",
        list_item_icon: "list_item_icon.innerContent.*",
        list_item_image: "list_item_image.innerContent.*",
        alt: "alt.innerContent.*",
        list_item_icon_text: "list_item_icon_text.innerContent.*",
        list_item_icon_lottie_src_type: "list_item_icon_lottie_src_type.innerContent.*",
        list_item_icon_lottie_src_remote: "list_item_icon_lottie_src_remote.innerContent.*",
        list_item_icon_lottie_src_upload: "list_item_icon_lottie_src_upload.innerContent.*",
        json_ex_notice: "json_ex_notice.innerContent.*",
        list_item_icon_lottie_trigger_method: "list_item_icon_lottie_trigger_method.innerContent.*",
        list_item_icon_lottie_mouseout_action: "list_item_icon_lottie_mouseout_action.innerContent.*",
        list_item_icon_lottie_scroll_effect: "list_item_icon_lottie_scroll_effect.innerContent.*",
        list_item_icon_lottie_delay: "list_item_icon_lottie_delay.innerContent.*",
        list_item_icon_lottie_loop: "list_item_icon_lottie_loop.innerContent.*",
        list_item_icon_lottie_speed: "list_item_icon_lottie_speed.innerContent.*",
        list_item_icon_lottie_direction: "list_item_icon_lottie_direction.innerContent.*",
        list_item_icon_lottie_renderer: "list_item_icon_lottie_renderer.innerContent.*",
        list_item_icon_lottie_color: "list_item_icon_lottie_color.innerContent.*",
        list_item_icon_lottie_background_color: "list_item_icon_lottie_background_color.innerContent.*",
        list_item_icon_lottie_width: "list_item_icon_lottie_width.innerContent.*",
        list_item_icon_lottie_height: "list_item_icon_lottie_height.innerContent.*",
        list_item_icon_only: "list_item_icon_only.innerContent.*",
        list_item_icon_on_hover: "list_item_icon_on_hover.innerContent.*",
        list_item_title_icon_enable: "list_item_title_icon_enable.innerContent.*",
        list_item_title_icon: "list_item_title_icon.innerContent.*",
        list_item_title_icon_on_hover: "list_item_title_icon_on_hover.innerContent.*",
        list_item_icon_color: "list_item_icon_color.innerContent.*",
        list_item_icon_bg_color: "list_item_icon_bg_color.innerContent.*",
        list_item_title_icon_color: "list_item_title_icon_color.innerContent.*",
        list_item_icon_size: "list_item_icon_size.innerContent.*",
        list_item_title_icon_size: "list_item_title_icon_size.innerContent.*",
        list_item_image_width: "list_item_image_width.innerContent.*",
        list_item_image_height: "list_item_image_height.innerContent.*",
        list_item_icon_text_gap: "list_item_icon_text_gap.innerContent.*",
        list_item_icon_placement: "list_item_icon_placement.innerContent.*",
        list_item_icon_alignment: "list_item_icon_alignment.innerContent.*",
        list_item_icon_alignment_alt: "list_item_icon_alignment_alt.innerContent.*",
        list_item_icon_vertical_placement: "list_item_icon_vertical_placement.innerContent.*",
        list_item_content_outside_wrapper: "list_item_content_outside_wrapper.innerContent.*",
        tooltip_arrow: "tooltip_arrow.innerContent.*",
        tooltip_placement: "tooltip_placement.innerContent.*",
        tooltip_animation: "tooltip_animation.innerContent.*",
        tooltip_trigger: "tooltip_trigger.innerContent.*",
        tooltip_interactive: "tooltip_interactive.innerContent.*",
        tooltip_interactive_border: "tooltip_interactive_border.innerContent.*",
        tooltip_interactive_debounce: "tooltip_interactive_debounce.innerContent.*",
        tooltip_follow_cursor: "tooltip_follow_cursor.innerContent.*",
        tooltip_custom_maxwidth: "tooltip_custom_maxwidth.innerContent.*",
        tooltip_offset_enable: "tooltip_offset_enable.innerContent.*",
        tooltip_offset_skidding: "tooltip_offset_skidding.innerContent.*",
        tooltip_offset_distance: "tooltip_offset_distance.innerContent.*",
        tooltip_arrow_color: "tooltip_arrow_color.innerContent.*",
        list_item_title_url: "list_item_title_url.innerContent.*",
        list_item_title_url_new_window: "list_item_title_url_new_window.innerContent.*",
        list_item_icon_margin: "list_item_icon_margin.innerContent.*",
        list_item_icon_padding: "list_item_icon_padding.innerContent.*",
        list_item_icon_wrapper_margin: "list_item_icon_wrapper_margin.innerContent.*",
        list_item_icon_wrapper_padding: "list_item_icon_wrapper_padding.innerContent.*",
        list_item_title_margin: "list_item_title_margin.innerContent.*",
        list_item_title_padding: "list_item_title_padding.innerContent.*",
        list_item_title_icon_margin: "list_item_title_icon_margin.innerContent.*",
        list_item_title_icon_padding: "list_item_title_icon_padding.innerContent.*",
        list_item_content_margin: "list_item_content_margin.innerContent.*",
        list_item_content_padding: "list_item_content_padding.innerContent.*",
        list_item_wrapper_margin: "list_item_wrapper_margin.innerContent.*",
        list_item_wrapper_padding: "list_item_wrapper_padding.innerContent.*",
        list_item_tooltip_padding: "list_item_tooltip_padding.innerContent.*",
        admin_label: "admin_label.innerContent.*"
    }
}
};
