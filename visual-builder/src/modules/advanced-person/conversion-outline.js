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
            name: "name.decoration.font",
            role: "role.decoration.font",
            description: "description.decoration.font",
            content: "content.decoration.font"
        },
        borders: {
            default: "module.decoration.border",
            name_border: "name_border.decoration.border",
            role_border: "role_border.decoration.border",
            description_border: "description_border.decoration.border",
            content_border: "content_border.decoration.border",
            photo_wrapper_border: "photo_wrapper_border.decoration.border",
            photo_border: "photo_border.decoration.border",
            social_container_border: "social_container_border.decoration.border",
            social_icon_border: "social_icon_border.decoration.border"
        },
        box_shadow: {
            default: "module.decoration.boxShadow"
        }
    },
    module: {
        style_type: "style_type.innerContent.*",
        ap_photo: "ap_photo.innerContent.*",
        photo_alt_text: "photo_alt_text.innerContent.*",
        enable_alternative_photo: "enable_alternative_photo.innerContent.*",
        ap_alternative_photo: "ap_alternative_photo.innerContent.*",
        alternative_photo_alt_text: "alternative_photo_alt_text.innerContent.*",
        enable_icon_on_overlay: "enable_icon_on_overlay.innerContent.*",
        anm_content_padding: "anm_content_padding.innerContent.*",
        content_position: "content_position.innerContent.*",
        always_show_icon: "always_show_icon.innerContent.*",
        icon_reveal_caption: "icon_reveal_caption.innerContent.*",
        image_wrapper_background: "image_wrapper_background.innerContent.*",
        image_wrapper_max_width: "image_wrapper_max_width.innerContent.*",
        image_wrapper_zindex: "image_wrapper_zindex.innerContent.*",
        image_alignment: "image_alignment.innerContent.*",
        image_force_to_fullwidth: "image_force_to_fullwidth.innerContent.*",
        image_scale_type: "image_scale_type.innerContent.*",
        image_scale_value: "image_scale_value.innerContent.*",
        overlay: "overlay.innerContent.*",
        ekip_overlay_background: "ekip_overlay_background.innerContent.*",
        default_overlay_background: "default_overlay_background.innerContent.*",
        anim_direction: "anim_direction.innerContent.*",
        overlay_transition_transition_duration: "overlay_transition_transition_duration.innerContent.*",
        overlay_transition_transition_delay: "overlay_transition_transition_delay.innerContent.*",
        overlay_transition_transition_curve: "overlay_transition_transition_curve.innerContent.*",
        border_anim: "border_anim.innerContent.*",
        anm_border_color: "anm_border_color.innerContent.*",
        anm_border_width: "anm_border_width.innerContent.*",
        anm_border_margin: "anm_border_margin.innerContent.*",
        border_anm_style: "border_anm_style.innerContent.*",
        ap_name: "ap_name.innerContent.*",
        ap_role: "ap_role.innerContent.*",
        ap_description: "ap_description.innerContent.*",
        ap_name_tag: "ap_name_tag.innerContent.*",
        ap_role_tag: "ap_role_tag.innerContent.*",
        name_background: "name_background.innerContent.*",
        role_background: "role_background.innerContent.*",
        description_background: "description_background.innerContent.*",
        content_background: "content_background.innerContent.*",
        content_zindex: "content_zindex.innerContent.*",
        ap_facebook: "ap_facebook.innerContent.*",
        ap_twitter: "ap_twitter.innerContent.*",
        ap_linkedin: "ap_linkedin.innerContent.*",
        ap_instagram: "ap_instagram.innerContent.*",
        ap_pinterest: "ap_pinterest.innerContent.*",
        ap_email: "ap_email.innerContent.*",
        ap_phone: "ap_phone.innerContent.*",
        social_section_align: "social_section_align.innerContent.*",
        make_vertical_icon: "make_vertical_icon.innerContent.*",
        make_full_with_icon: "make_full_with_icon.innerContent.*",
        icon_size: "icon_size.innerContent.*",
        icon_color: "icon_color.innerContent.*",
        icon_background: "icon_background.innerContent.*",
        social_wrapper_background: "social_wrapper_background.innerContent.*",
        facebook_icon_color: "facebook_icon_color.innerContent.*",
        facebook_background: "facebook_background.innerContent.*",
        twitter_icon_color: "twitter_icon_color.innerContent.*",
        twitter_background: "twitter_background.innerContent.*",
        linkedin_icon_color: "linkedin_icon_color.innerContent.*",
        linkedin_background: "linkedin_background.innerContent.*",
        instagram_icon_color: "instagram_icon_color.innerContent.*",
        instagram_background: "instagram_background.innerContent.*",
        pinterest_icon_color: "pinterest_icon_color.innerContent.*",
        pinterest_background: "pinterest_background.innerContent.*",
        email_icon_color: "email_icon_color.innerContent.*",
        email_background: "email_background.innerContent.*",
        phone_icon_color: "phone_icon_color.innerContent.*",
        phone_background: "phone_background.innerContent.*",
        module_wrapper_margin: "module_wrapper_margin.decoration.spacing.*.margin",
        module_wrapper_padding: "module_wrapper_padding.decoration.spacing.*.padding",
        image_wrapper_margin: "image_wrapper_margin.decoration.spacing.*.margin",
        image_wrapper_padding: "image_wrapper_padding.decoration.spacing.*.padding",
        content_margin: "content_margin.decoration.spacing.*.margin",
        content_padding: "content_padding.decoration.spacing.*.padding",
        details_wrapper_margin: "details_wrapper_margin.decoration.spacing.*.margin",
        details_wrapper_padding: "details_wrapper_padding.decoration.spacing.*.padding",
        social_wrapper_margin: "social_wrapper_margin.decoration.spacing.*.margin",
        social_wrapper_padding: "social_wrapper_padding.decoration.spacing.*.padding",
        name_margin: "name_margin.decoration.spacing.*.margin",
        name_padding: "name_padding.decoration.spacing.*.padding",
        role_margin: "role_margin.decoration.spacing.*.margin",
        role_padding: "role_padding.decoration.spacing.*.padding",
        description_margin: "description_margin.decoration.spacing.*.margin",
        description_padding: "description_padding.decoration.spacing.*.padding",
        image_margin: "image_margin.decoration.spacing.*.margin",
        image_padding: "image_padding.decoration.spacing.*.padding",
        social_margin: "social_margin.decoration.spacing.*.margin",
        social_padding: "social_padding.decoration.spacing.*.padding",
        first_social_margin: "first_social_margin.decoration.spacing.*.margin",
        last_social_margin: "last_social_margin.decoration.spacing.*.margin"
    },
    valueExpansionFunctionMap: {
        module_wrapper_margin: D4ToD5Spacing,
        module_wrapper_padding: D4ToD5Spacing,
        image_wrapper_margin: D4ToD5Spacing,
        image_wrapper_padding: D4ToD5Spacing,
        content_margin: D4ToD5Spacing,
        content_padding: D4ToD5Spacing,
        details_wrapper_margin: D4ToD5Spacing,
        details_wrapper_padding: D4ToD5Spacing,
        social_wrapper_margin: D4ToD5Spacing,
        social_wrapper_padding: D4ToD5Spacing,
        name_margin: D4ToD5Spacing,
        name_padding: D4ToD5Spacing,
        role_margin: D4ToD5Spacing,
        role_padding: D4ToD5Spacing,
        description_margin: D4ToD5Spacing,
        description_padding: D4ToD5Spacing,
        image_margin: D4ToD5Spacing,
        image_padding: D4ToD5Spacing,
        social_margin: D4ToD5Spacing,
        social_padding: D4ToD5Spacing,
        first_social_margin: D4ToD5Spacing,
        last_social_margin: D4ToD5Spacing
    }
}
};
