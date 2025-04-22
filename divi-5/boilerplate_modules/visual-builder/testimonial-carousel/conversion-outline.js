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
            name: "name.decoration.font",
            title: "title.decoration.font",
            company: "company.decoration.font",
            body: "body.decoration.font"
        },
        borders: {
            default: "module.decoration.border",
            logo: "logo.decoration.border",
            author_image: "author_image.decoration.border",
            author_box: "author_box.decoration.border"
        },
        box_shadow: {
            default: "module.decoration.boxShadow"
        }
    },
    module: {
        quote_order: "quote_order.innerContent.*",
        logo_order: "logo_order.innerContent.*",
        text_order: "text_order.innerContent.*",
        author_order: "author_order.innerContent.*",
        rating_order: "rating_order.innerContent.*",
        author_image_position: "author_image_position.innerContent.*",
        auther_alignhr: "auther_alignhr.innerContent.*",
        info_align: "info_align.innerContent.*",
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
        coverflow_rotate: "coverflow_rotate.innerContent.*",
        coverflow_stretch: "coverflow_stretch.innerContent.*",
        coverflow_depth: "coverflow_depth.innerContent.*",
        coverflow_modifier: "coverflow_modifier.innerContent.*",
        coveflow_color_dark: "coveflow_color_dark.innerContent.*",
        coveflow_color_light: "coveflow_color_light.innerContent.*",
        author_image_width: "author_image_width.innerContent.*",
        brand_align: "brand_align.innerContent.*",
        brand_width: "brand_width.innerContent.*",
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
        arrow_circle: "arrow_circle.innerContent.*",
        arrow_prev_margin: "arrow_prev_margin.decoration.spacing.*.margin",
        arrow_prev_padding: "arrow_prev_padding.decoration.spacing.*.padding",
        arrow_next_margin: "arrow_next_margin.decoration.spacing.*.margin",
        arrow_next_padding: "arrow_next_padding.decoration.spacing.*.padding",
        dots_align: "dots_align.innerContent.*",
        large_active_dot: "large_active_dot.innerContent.*",
        dots_color: "dots_color.innerContent.*",
        active_dots_color: "active_dots_color.innerContent.*",
        rating_color: "rating_color.innerContent.*",
        rating_align: "rating_align.innerContent.*",
        rating_size: "rating_size.innerContent.*",
        rating_space: "rating_space.innerContent.*",
        qoute_align: "qoute_align.innerContent.*",
        quote_icon_size: "quote_icon_size.innerContent.*",
        quote_icon_color: "quote_icon_color.innerContent.*",
        quote_icon_bgcolor: "quote_icon_bgcolor.innerContent.*",
        quote_image_max: "quote_image_max.innerContent.*",
        quote_opacity: "quote_opacity.innerContent.*",
        quote_z_index: "quote_z_index.innerContent.*",
        wrapper_margin: "wrapper_margin.decoration.spacing.*.margin",
        wrapper_padding: "wrapper_padding.decoration.spacing.*.padding",
        item_wrapper_margin: "item_wrapper_margin.decoration.spacing.*.margin",
        item_wrapper_padding: "item_wrapper_padding.decoration.spacing.*.padding",
        author_box_margin: "author_box_margin.decoration.spacing.*.margin",
        author_box_padding: "author_box_padding.decoration.spacing.*.padding",
        rating_margin: "rating_margin.decoration.spacing.*.margin",
        rating_padding: "rating_padding.decoration.spacing.*.padding",
        text_margin: "text_margin.decoration.spacing.*.margin",
        text_padding: "text_padding.decoration.spacing.*.padding",
        logo_margin: "logo_margin.decoration.spacing.*.margin",
        author_image_margin: "author_image_margin.decoration.spacing.*.margin",
        quote_icon_margin: "quote_icon_margin.decoration.spacing.*.margin",
        quote_icon_padding: "quote_icon_padding.decoration.spacing.*.padding",
        text_bg: "text_bg.innerContent.*",
        author_bg: "author_bg.innerContent.*",
        rating_bg: "rating_bg.innerContent.*",
        quote_wrapper_margin: "quote_wrapper_margin.decoration.spacing.*.margin",
        quote_wrapper_padding: "quote_wrapper_padding.decoration.spacing.*.padding"
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
        author_box_margin: convertSpacing,
        author_box_padding: convertSpacing,
        rating_margin: convertSpacing,
        rating_padding: convertSpacing,
        text_margin: convertSpacing,
        text_padding: convertSpacing,
        logo_margin: convertSpacing,
        author_image_margin: convertSpacing,
        quote_icon_margin: convertSpacing,
        quote_icon_padding: convertSpacing,
        quote_wrapper_margin: convertSpacing,
        quote_wrapper_padding: convertSpacing
    }
}
};
