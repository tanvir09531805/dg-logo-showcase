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
            title: "title.decoration.font"
        },
        borders: {
            icon_wrapper_border: "icon_wrapper_border.decoration.border"
        }
    },
    module: {
        image: "image.innerContent.*",
        alt: "alt.innerContent.*",
        title_text: "title_text.innerContent.*",
        use_icon: "use_icon.innerContent.*",
        font_icon: "font_icon.innerContent.*",
        title_tag: "title_tag.innerContent.*",
        overlay: "overlay.innerContent.*",
        overlay_primary: "overlay_primary.innerContent.*",
        overlay_secondary: "overlay_secondary.innerContent.*",
        overlay_direction: "overlay_direction.innerContent.*",
        border_anim: "border_anim.innerContent.*",
        anm_border_color: "anm_border_color.innerContent.*",
        anm_border_width: "anm_border_width.innerContent.*",
        anm_border_margin: "anm_border_margin.innerContent.*",
        border_anm_style: "border_anm_style.innerContent.*",
        anm_content_padding: "anm_content_padding.innerContent.*",
        content_position: "content_position.innerContent.*",
        image_scale: "image_scale.innerContent.*",
        image_scale_hover: "image_scale_hover.innerContent.*",
        always_show_title: "always_show_title.innerContent.*",
        content_reveal_title: "content_reveal_title.innerContent.*",
        title_anim_delay: "title_anim_delay.innerContent.*",
        always_show_icon: "always_show_icon.innerContent.*",
        icon_anim_delay: "icon_anim_delay.innerContent.*",
        content_reveal_icon: "content_reveal_icon.innerContent.*",
        icon_color: "icon_color.innerContent.*",
        icon_size: "icon_size.innerContent.*",
        icon_background_color: "icon_background_color.innerContent.*",
        title_margin: "title_margin.decoration.spacing.*.margin",
        icon_wrapper_margin: "icon_wrapper_margin.decoration.spacing.*.margin",
        icon_margin: "icon_margin.decoration.spacing.*.margin"
    },
    valueExpansionFunctionMap: {
        title_margin: D4ToD5Spacing,
        icon_wrapper_margin: D4ToD5Spacing,
        icon_margin: D4ToD5Spacing
    }
}
};
