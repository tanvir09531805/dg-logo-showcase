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
            title: "title.decoration.font",
            sub_title: "sub_title.decoration.font",
            description: "description.decoration.font",
            button: "button.decoration.font"
        },
        borders: {
            default: "module.decoration.border",
            item_border: "item_border.decoration.border",
            content_border: "content_border.decoration.border",
            button_border: "button_border.decoration.border",
            icon_border: "icon_border.decoration.border"
        },
        box_shadow: {
            default: "module.decoration.boxShadow"
        }
    },
    module: {
        accordion_type: "accordion_type.innerContent.*",
        vertical_at_mobile: "vertical_at_mobile.innerContent.*",
        event_type: "event_type.innerContent.*",
        active_on_first_time: "active_on_first_time.innerContent.*",
        active_item_order_number: "active_item_order_number.innerContent.*",
        outer_click_close_item: "outer_click_close_item.innerContent.*",
        accordion_container_height: "accordion_container_height.innerContent.*",
        content_alignment: "content_alignment.innerContent.*",
        item_spacing: "item_spacing.innerContent.*",
        item_padding: "item_padding.decoration.spacing.*.padding",
        first_item_spacing: "first_item_spacing.innerContent.*",
        last_item_spacing: "last_item_spacing.innerContent.*",
        enable_animation: "enable_animation.innerContent.*",
        content_animation: "content_animation.innerContent.*",
        duration: "duration.innerContent.*",
        delay: "delay.innerContent.*",
        animation_function: "animation_function.innerContent.*",
        enable_stagger: "enable_stagger.innerContent.*",
        stagger: "stagger.innerContent.*",
        ia_overlay_background: "ia_overlay_background.innerContent.*",
        ia_active_overlay_background: "ia_active_overlay_background.innerContent.*",
        vertical_align: "vertical_align.innerContent.*",
        ia_content_background: "ia_content_background.innerContent.*",
        icon_margin: "icon_margin.decoration.spacing.*.margin",
        icon_padding: "icon_padding.decoration.spacing.*.padding",
        title_margin: "title_margin.decoration.spacing.*.margin",
        sub_title_margin: "sub_title_margin.decoration.spacing.*.margin",
        description_margin: "description_margin.decoration.spacing.*.margin",
        content_margin: "content_margin.decoration.spacing.*.margin",
        content_padding: "content_padding.decoration.spacing.*.padding",
        icon_background: "icon_background.innerContent.*",
        icon_color: "icon_color.innerContent.*",
        icon_size: "icon_size.innerContent.*",
        image_as_icon_width: "image_as_icon_width.innerContent.*",
        ia_btn_button_align: "ia_btn_button_align.innerContent.*",
        ia_btn_background: "ia_btn_background.innerContent.*",
        button_margin: "button_margin.decoration.spacing.*.margin",
        button_padding: "button_padding.decoration.spacing.*.padding"
    },
    valueExpansionFunctionMap: {
        item_padding: convertSpacing,
        icon_margin: convertSpacing,
        icon_padding: convertSpacing,
        title_margin: convertSpacing,
        sub_title_margin: convertSpacing,
        description_margin: convertSpacing,
        content_margin: convertSpacing,
        content_padding: convertSpacing,
        button_margin: convertSpacing,
        button_padding: convertSpacing
    }
}
};
