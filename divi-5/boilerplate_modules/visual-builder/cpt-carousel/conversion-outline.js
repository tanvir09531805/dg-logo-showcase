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
        borders: {
            item_outer: "item_outer.decoration.border",
            item: "item.decoration.border"
        }
    },
    module: {
        use_current_loop: "use_current_loop.innerContent.*",
        post_type_arch: "post_type_arch.innerContent.*",
        post_type: "post_type.innerContent.*",
        posts_number: "posts_number.innerContent.*",
        post_display: "post_display.innerContent.*",
        tax_for_select: "tax_for_select.innerContent.*",
        tax_for_post: "tax_for_post.innerContent.*",
        tax_for_project: "tax_for_project.innerContent.*",
        post_terms_category: "post_terms_category.innerContent.*",
        post_terms_post_tag: "post_terms_post_tag.innerContent.*",
        post_terms_post_format: "post_terms_post_format.innerContent.*",
        project_terms_project_category: "project_terms_project_category.innerContent.*",
        project_terms_project_tag: "project_terms_project_tag.innerContent.*",
        orderby: "orderby.innerContent.*",
        offset_number: "offset_number.innerContent.*",
        use_image_as_background: "use_image_as_background.innerContent.*",
        use_background_scale: "use_background_scale.innerContent.*",
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
        entire_item_clickable: "entire_item_clickable.innerContent.*",
        coverflow_shadow: "coverflow_shadow.innerContent.*",
        coveflow_color_dark: "coveflow_color_dark.innerContent.*",
        coveflow_color_light: "coveflow_color_light.innerContent.*",
        coverflow_rotate: "coverflow_rotate.innerContent.*",
        coverflow_stretch: "coverflow_stretch.innerContent.*",
        coverflow_depth: "coverflow_depth.innerContent.*",
        coverflow_modifier: "coverflow_modifier.innerContent.*",
        alignment: "alignment.innerContent.*",
        item_outer_background: "item_outer_background.innerContent.*",
        item_inner_background: "item_inner_background.innerContent.*",
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
        dots_align: "dots_align.innerContent.*",
        dots_position: "dots_position.innerContent.*",
        large_active_dot: "large_active_dot.innerContent.*",
        dots_color: "dots_color.innerContent.*",
        active_dots_color: "active_dots_color.innerContent.*",
        dots_wrapper_margin: "dots_wrapper_margin.decoration.spacing.*.margin",
        dots_wrapper_padding: "dots_wrapper_padding.decoration.spacing.*.padding",
        wrapper_margin: "wrapper_margin.decoration.spacing.*.margin",
        wrapper_padding: "wrapper_padding.decoration.spacing.*.padding",
        item_wrapper_padding: "item_wrapper_padding.decoration.spacing.*.padding",
        item_margin: "item_margin.decoration.spacing.*.margin",
        item_padding: "item_padding.decoration.spacing.*.padding"
    },
    valueExpansionFunctionMap: {
        arrow_prev_margin: convertSpacing,
        arrow_prev_padding: convertSpacing,
        arrow_next_margin: convertSpacing,
        arrow_next_padding: convertSpacing,
        dots_wrapper_margin: convertSpacing,
        dots_wrapper_padding: convertSpacing,
        wrapper_margin: convertSpacing,
        wrapper_padding: convertSpacing,
        item_wrapper_padding: convertSpacing,
        item_margin: convertSpacing,
        item_padding: convertSpacing
    }
}
};
