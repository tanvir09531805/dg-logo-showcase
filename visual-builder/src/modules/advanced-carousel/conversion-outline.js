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
            cc_title: "cc_title.decoration.font",
            cc_subtitle: "cc_subtitle.decoration.font",
            cc_content: "cc_content.decoration.font",
            df_content_inherit: "df_content_inherit.decoration.font",
            button: "button.decoration.font",
            content_heading_1: "content_heading_1.decoration.font"
        },
        borders: {
            default: "module.decoration.border",
            arrow_icon_wrapper_border: "arrow_icon_wrapper_border.decoration.border",
            button: "button.decoration.border"
        },
        box_shadow: {
            default: "module.decoration.boxShadow"
        }
    },
    module: {
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
        use_lightbox: "use_lightbox.innerContent.*",
        use_lightbox_title: "use_lightbox_title.innerContent.*",
        coverflow_shadow: "coverflow_shadow.innerContent.*",
        coveflow_color_dark: "coveflow_color_dark.innerContent.*",
        coveflow_color_light: "coveflow_color_light.innerContent.*",
        coverflow_rotate: "coverflow_rotate.innerContent.*",
        coverflow_stretch: "coverflow_stretch.innerContent.*",
        coverflow_depth: "coverflow_depth.innerContent.*",
        coverflow_modifier: "coverflow_modifier.innerContent.*",
        image_order: "image_order.innerContent.*",
        title_order: "title_order.innerContent.*",
        subtitle_order: "subtitle_order.innerContent.*",
        content_order: "content_order.innerContent.*",
        button_order: "button_order.innerContent.*",
        df_title_bg: "df_title_bg.innerContent.*",
        df_subtitle_bg: "df_subtitle_bg.innerContent.*",
        df_content_bg: "df_content_bg.innerContent.*",
        arrow_color: "arrow_color.innerContent.*",
        arrow_background: "arrow_background.innerContent.*",
        arrow_position: "arrow_position.innerContent.*",
        arrow_align: "arrow_align.innerContent.*",
        arrow_opacity: "arrow_opacity.innerContent.*",
        arrow_opacity_disable: "arrow_opacity_disable.innerContent.*",
        arrow_circle: "arrow_circle.innerContent.*",
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
        dots_color: "dots_color.innerContent.*",
        active_dots_color: "active_dots_color.innerContent.*",
        large_active_dot: "large_active_dot.innerContent.*",
        dots_align: "dots_align.innerContent.*",
        dot_vertical_position: "dot_vertical_position.innerContent.*",
        cc_button_button_align: "cc_button_button_align.innerContent.*",
        cc_button_button_fullwidth: "cc_button_button_fullwidth.innerContent.*",
        df_button_bg: "df_button_bg.innerContent.*",
        button_wrapper_margin: "button_wrapper_margin.decoration.spacing.*.margin",
        button_wrapper_padding: "button_wrapper_padding.decoration.spacing.*.padding",
        button_margin: "button_margin.decoration.spacing.*.margin",
        button_padding: "button_padding.decoration.spacing.*.padding",
        wrapper_padding: "wrapper_padding.decoration.spacing.*.padding",
        item_wrapper_margin: "item_wrapper_margin.decoration.spacing.*.margin",
        item_wrapper_padding: "item_wrapper_padding.decoration.spacing.*.padding",
        image_wrapper_margin: "image_wrapper_margin.decoration.spacing.*.margin",
        image_wrapper_padding: "image_wrapper_padding.decoration.spacing.*.padding",
        image_margin: "image_margin.decoration.spacing.*.margin",
        title_margin: "title_margin.decoration.spacing.*.margin",
        title_padding: "title_padding.decoration.spacing.*.padding",
        subtitle_margin: "subtitle_margin.decoration.spacing.*.margin",
        subtitle_padding: "subtitle_padding.decoration.spacing.*.padding",
        content_margin: "content_margin.decoration.spacing.*.margin",
        content_padding: "content_padding.decoration.spacing.*.padding"
    },
    valueExpansionFunctionMap: {
        arrow_prev_margin: convertSpacing,
        arrow_prev_padding: convertSpacing,
        arrow_next_margin: convertSpacing,
        arrow_next_padding: convertSpacing,
        button_wrapper_margin: convertSpacing,
        button_wrapper_padding: convertSpacing,
        button_margin: convertSpacing,
        button_padding: convertSpacing,
        wrapper_padding: convertSpacing,
        item_wrapper_margin: convertSpacing,
        item_wrapper_padding: convertSpacing,
        image_wrapper_margin: convertSpacing,
        image_wrapper_padding: convertSpacing,
        image_margin: convertSpacing,
        title_margin: convertSpacing,
        title_padding: convertSpacing,
        subtitle_margin: convertSpacing,
        subtitle_padding: convertSpacing,
        content_margin: convertSpacing,
        content_padding: convertSpacing
    }
}
};
