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
            on_sale_font: "on_sale_font.decoration.font",
            on_after_sale_font: "on_after_sale_font.decoration.font",
            on_suffix_sale_font: "on_suffix_sale_font.decoration.font"
        },
        borders: {
            item_outer: "item_outer.decoration.border",
            item: "item.decoration.border",
            on_sale_border: "on_sale_border.decoration.border",
            arrows: "arrows.decoration.border"
        }
    },
    module: {
        type: "type.innerContent.*",
        use_current_loop: "use_current_loop.innerContent.*",
        related: "related.innerContent.*",
        include_categories: "include_categories.innerContent.*",
        posts_number: "posts_number.innerContent.*",
        orderby: "orderby.innerContent.*",
        carousel_type: "carousel_type.innerContent.*",
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
        equal_height: "equal_height.innerContent.*",
        coverflow_shadow: "coverflow_shadow.innerContent.*",
        coveflow_color_dark: "coveflow_color_dark.innerContent.*",
        coveflow_color_light: "coveflow_color_light.innerContent.*",
        coverflow_rotate: "coverflow_rotate.innerContent.*",
        coverflow_stretch: "coverflow_stretch.innerContent.*",
        coverflow_depth: "coverflow_depth.innerContent.*",
        coverflow_modifier: "coverflow_modifier.innerContent.*",
        alignment: "alignment.innerContent.*",
        item_background: "item_background.innerContent.*",
        show_badge: "show_badge.innerContent.*",
        show_badge_in_image: "show_badge_in_image.innerContent.*",
        badge_placement: "badge_placement.innerContent.*",
        on_sale_text: "on_sale_text.innerContent.*",
        after_sale_text_enable: "after_sale_text_enable.innerContent.*",
        after_sale_text: "after_sale_text.innerContent.*",
        after_sale_text_type: "after_sale_text_type.innerContent.*",
        enable_custom_soldout_text: "enable_custom_soldout_text.innerContent.*",
        custom_soldout_text: "custom_soldout_text.innerContent.*",
        arrow_color: "arrow_color.innerContent.*",
        arrow_background: "arrow_background.innerContent.*",
        arrow_position: "arrow_position.innerContent.*",
        arrow_align: "arrow_align.innerContent.*",
        arrow_opacity: "arrow_opacity.innerContent.*",
        arrow_opacity_disable: "arrow_opacity_disable.innerContent.*",
        arrow_circle: "arrow_circle.innerContent.*",
        disable_arrow_design: "disable_arrow_design.innerContent.*",
        disable_arrow_color: "disable_arrow_color.innerContent.*",
        disable_arrow_background: "disable_arrow_background.innerContent.*",
        arrow_prev_icon_use_icon: "arrow_prev_icon_use_icon.innerContent.*",
        arrow_prev_icon_font_icon: "arrow_prev_icon_font_icon.innerContent.*",
        arrow_prev_icon_icon_size: "arrow_prev_icon_icon_size.innerContent.*",
        arrow_next_icon_use_icon: "arrow_next_icon_use_icon.innerContent.*",
        arrow_next_icon_font_icon: "arrow_next_icon_font_icon.innerContent.*",
        arrow_next_icon_icon_size: "arrow_next_icon_icon_size.innerContent.*",
        arrow_prev_margin: "arrow_prev_margin.decoration.spacing.*.margin",
        arrow_prev_padding: "arrow_prev_padding.decoration.spacing.*.padding",
        arrow_next_margin: "arrow_next_margin.decoration.spacing.*.margin",
        arrow_next_padding: "arrow_next_padding.decoration.spacing.*.padding",
        dots_align: "dots_align.innerContent.*",
        dots_position: "dots_position.innerContent.*",
        dots_style_type: "dots_style_type.innerContent.*",
        active_dot_border_style_enable: "active_dot_border_style_enable.innerContent.*",
        custom_dot_style_enable: "custom_dot_style_enable.innerContent.*",
        custom_dot_width: "custom_dot_width.innerContent.*",
        large_active_dot: "large_active_dot.innerContent.*",
        large_active_dot_width: "large_active_dot_width.innerContent.*",
        dots_color: "dots_color.innerContent.*",
        active_dots_color: "active_dots_color.innerContent.*",
        dots_wrapper_margin: "dots_wrapper_margin.decoration.spacing.*.margin",
        dots_wrapper_padding: "dots_wrapper_padding.decoration.spacing.*.padding",
        wrapper_margin: "wrapper_margin.decoration.spacing.*.margin",
        wrapper_padding: "wrapper_padding.decoration.spacing.*.padding",
        item_wrapper_padding: "item_wrapper_padding.decoration.spacing.*.padding",
        item_margin: "item_margin.decoration.spacing.*.margin",
        item_padding: "item_padding.decoration.spacing.*.padding",
        on_sale_margin: "on_sale_margin.decoration.spacing.*.margin",
        on_sale_padding: "on_sale_padding.decoration.spacing.*.padding",
        on_sale_background: "on_sale_background.innerContent.*",
        outer_wrpper_visibility: "outer_wrpper_visibility.innerContent.*",
        inner_wrpper_visibility: "inner_wrpper_visibility.innerContent.*"
    },
    valueExpansionFunctionMap: {
        arrow_prev_margin: D4ToD5Spacing,
        arrow_prev_padding: D4ToD5Spacing,
        arrow_next_margin: D4ToD5Spacing,
        arrow_next_padding: D4ToD5Spacing,
        dots_wrapper_margin: D4ToD5Spacing,
        dots_wrapper_padding: D4ToD5Spacing,
        wrapper_margin: D4ToD5Spacing,
        wrapper_padding: D4ToD5Spacing,
        item_wrapper_padding: D4ToD5Spacing,
        item_margin: D4ToD5Spacing,
        item_padding: D4ToD5Spacing,
        on_sale_margin: D4ToD5Spacing,
        on_sale_padding: D4ToD5Spacing
    }
}
};
