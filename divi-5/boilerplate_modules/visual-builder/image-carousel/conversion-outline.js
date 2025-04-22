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
            caption: "caption.decoration.font",
            button: "button.decoration.font"
        },
        borders: {
            default: "module.decoration.border",
            button: "button.decoration.border"
        },
        box_shadow: {
            default: "module.decoration.boxShadow"
        }
    },
    module: {
        carousel_type: "carousel_type.innerContent.*",
        variable_width: "variable_width.innerContent.*",
        item_height: "item_height.innerContent.*",
        item_desktop: "item_desktop.innerContent.*",
        item_tablet: "item_tablet.innerContent.*",
        item_mobile: "item_mobile.innerContent.*",
        item_spacing: "item_spacing.innerContent.*",
        speed: "speed.innerContent.*",
        centered_slides: "centered_slides.innerContent.*",
        loop: "loop.innerContent.*",
        autoplay: "autoplay.innerContent.*",
        autospeed: "autospeed.innerContent.*",
        pause_hover: "pause_hover.innerContent.*",
        arrow: "arrow.innerContent.*",
        dots: "dots.innerContent.*",
        use_lightbox: "use_lightbox.innerContent.*",
        use_lightbox_caption: "use_lightbox_caption.innerContent.*",
        coverflow_shadow: "coverflow_shadow.innerContent.*",
        coverflow_rotate: "coverflow_rotate.innerContent.*",
        coverflow_stretch: "coverflow_stretch.innerContent.*",
        coverflow_depth: "coverflow_depth.innerContent.*",
        coverflow_modifier: "coverflow_modifier.innerContent.*",
        coveflow_color_dark: "coveflow_color_dark.innerContent.*",
        coveflow_color_light: "coveflow_color_light.innerContent.*",
        ic_max_width: "ic_max_width.innerContent.*",
        ic_img_align: "ic_img_align.innerContent.*",
        ic_vertical: "ic_vertical.innerContent.*",
        ic_equal_height: "ic_equal_height.innerContent.*",
        ic_full_width: "ic_full_width.innerContent.*",
        ic_content_background: "ic_content_background.innerContent.*",
        ic_overlay_background: "ic_overlay_background.innerContent.*",
        arrow_prev_icon_use_icon: "arrow_prev_icon_use_icon.innerContent.*",
        arrow_prev_icon_font_icon: "arrow_prev_icon_font_icon.innerContent.*",
        arrow_prev_icon_icon_size: "arrow_prev_icon_icon_size.innerContent.*",
        arrow_next_icon_use_icon: "arrow_next_icon_use_icon.innerContent.*",
        arrow_next_icon_font_icon: "arrow_next_icon_font_icon.innerContent.*",
        arrow_next_icon_icon_size: "arrow_next_icon_icon_size.innerContent.*",
        arrow_color: "arrow_color.innerContent.*",
        arrow_background: "arrow_background.innerContent.*",
        arrow_position: "arrow_position.innerContent.*",
        arrow_align: "arrow_align.innerContent.*",
        arrow_opacity: "arrow_opacity.innerContent.*",
        arrow_opacity_disable: "arrow_opacity_disable.innerContent.*",
        arrow_prev_margin: "arrow_prev_margin.decoration.spacing.*.margin",
        arrow_prev_padding: "arrow_prev_padding.decoration.spacing.*.padding",
        arrow_next_margin: "arrow_next_margin.decoration.spacing.*.margin",
        arrow_next_padding: "arrow_next_padding.decoration.spacing.*.padding",
        dots_color: "dots_color.innerContent.*",
        active_dots_color: "active_dots_color.innerContent.*",
        large_active_dot: "large_active_dot.innerContent.*",
        dots_align: "dots_align.innerContent.*",
        dots_gap: "dots_gap.innerContent.*",
        vertical_align: "vertical_align.innerContent.*",
        image_scale: "image_scale.innerContent.*",
        image_scale_value: "image_scale_value.innerContent.*",
        content_hover: "content_hover.innerContent.*",
        anim_direction: "anim_direction.innerContent.*",
        item_overflow: "item_overflow.innerContent.*",
        ic_btn_button_align: "ic_btn_button_align.innerContent.*",
        ic_btn_background: "ic_btn_background.innerContent.*",
        wrapper_margin: "wrapper_margin.decoration.spacing.*.margin",
        wrapper_padding: "wrapper_padding.decoration.spacing.*.padding",
        item_wrapper_margin: "item_wrapper_margin.decoration.spacing.*.margin",
        item_wrapper_padding: "item_wrapper_padding.decoration.spacing.*.padding",
        content_margin: "content_margin.decoration.spacing.*.margin",
        content_padding: "content_padding.decoration.spacing.*.padding",
        caption_margin: "caption_margin.decoration.spacing.*.margin",
        caption_padding: "caption_padding.decoration.spacing.*.padding",
        button_margin: "button_margin.decoration.spacing.*.margin",
        button_padding: "button_padding.decoration.spacing.*.padding"
    },
    valueExpansionFunctionMap: {
        arrow_prev_margin: convertSpacing,
        arrow_prev_padding: convertSpacing,
        arrow_next_margin: convertSpacing,
        arrow_next_padding: convertSpacing,
        wrapper_margin: convertSpacing,
        wrapper_padding: convertSpacing,
        item_wrapper_margin: convertSpacing,
        item_wrapper_padding: convertSpacing,
        content_margin: convertSpacing,
        content_padding: convertSpacing,
        caption_margin: convertSpacing,
        caption_padding: convertSpacing,
        button_margin: convertSpacing,
        button_padding: convertSpacing
    }
}
};
