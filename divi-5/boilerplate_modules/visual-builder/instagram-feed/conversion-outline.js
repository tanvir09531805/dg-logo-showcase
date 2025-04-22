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
            instagram_username: "instagram_username.decoration.font",
            instagram_post_date: "instagram_post_date.decoration.font",
            more_btn: "more_btn.decoration.font"
        },
        borders: {
            default: "module.decoration.border",
            image: "image.decoration.border",
            instagram_user_profile_picture_border: "instagram_user_profile_picture_border.decoration.border",
            user_info_border: "user_info_border.decoration.border",
            morebtn_border: "morebtn_border.decoration.border"
        },
        box_shadow: {
            default: "module.decoration.boxShadow"
        }
    },
    module: {
        image_to_display: "image_to_display.innerContent.*",
        layout_mode: "layout_mode.innerContent.*",
        item_gutter: "item_gutter.innerContent.*",
        load_more: "load_more.innerContent.*",
        init_count: "init_count.innerContent.*",
        image_count: "image_count.innerContent.*",
        load_more_text: "load_more_text.innerContent.*",
        use_url: "use_url.innerContent.*",
        url_target: "url_target.innerContent.*",
        instagram_user_token: "instagram_user_token.innerContent.*",
        item_limit: "item_limit.innerContent.*",
        instagram_post_only_image: "instagram_post_only_image.innerContent.*",
        autoplay_video: "autoplay_video.innerContent.*",
        show_instagram_user_info: "show_instagram_user_info.innerContent.*",
        instagram_user_profile_picture: "instagram_user_profile_picture.innerContent.*",
        instagram_username_text: "instagram_username_text.innerContent.*",
        date_formate: "date_formate.innerContent.*",
        instagram_icon_enable: "instagram_icon_enable.innerContent.*",
        instagram_icon: "instagram_icon.innerContent.*",
        cache_time: "cache_time.innerContent.*",
        cache_time_type: "cache_time_type.innerContent.*",
        user_info_bg: "user_info_bg.innerContent.*",
        user_info_show_at_bottom: "user_info_show_at_bottom.innerContent.*",
        instagram_user_section_width: "instagram_user_section_width.innerContent.*",
        user_profile_picture_width: "user_profile_picture_width.innerContent.*",
        instagram_icon_alignment: "instagram_icon_alignment.innerContent.*",
        instagram_icon_position: "instagram_icon_position.innerContent.*",
        instagram_icon_size: "instagram_icon_size.innerContent.*",
        instagram_icon_color: "instagram_icon_color.innerContent.*",
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
        use_icon: "use_icon.innerContent.*",
        hover_icon: "hover_icon.innerContent.*",
        show_caption: "show_caption.innerContent.*",
        always_show_title: "always_show_title.innerContent.*",
        content_reveal_caption: "content_reveal_caption.innerContent.*",
        hover_icon_size: "hover_icon_size.innerContent.*",
        hover_icon_color: "hover_icon_color.innerContent.*",
        caption_tag: "caption_tag.innerContent.*",
        instagram_username_align: "instagram_username_align.innerContent.*",
        instagram_post_date_align: "instagram_post_date_align.innerContent.*",
        more_btn_align: "more_btn_align.innerContent.*",
        instagram_user_info_padding: "instagram_user_info_padding.decoration.spacing.*.padding",
        instagram_user_profile_picture_margin: "instagram_user_profile_picture_margin.decoration.spacing.*.margin",
        instagram_user_profile_picture_padding: "instagram_user_profile_picture_padding.decoration.spacing.*.padding",
        instagram_user_name_margin: "instagram_user_name_margin.decoration.spacing.*.margin",
        instagram_post_date_margin: "instagram_post_date_margin.decoration.spacing.*.margin",
        instagram_icon_margin: "instagram_icon_margin.decoration.spacing.*.margin",
        spinner_color: "spinner_color.innerContent.*",
        more_btn_bg: "more_btn_bg.innerContent.*",
        title_padding: "title_padding.decoration.spacing.*.padding",
        load_more_margin: "load_more_margin.decoration.spacing.*.margin",
        load_more_padding: "load_more_padding.decoration.spacing.*.padding"
    },
    valueExpansionFunctionMap: {
        instagram_user_info_padding: convertSpacing,
        instagram_user_profile_picture_margin: convertSpacing,
        instagram_user_profile_picture_padding: convertSpacing,
        instagram_user_name_margin: convertSpacing,
        instagram_post_date_margin: convertSpacing,
        instagram_icon_margin: convertSpacing,
        title_padding: convertSpacing,
        load_more_margin: convertSpacing,
        load_more_padding: convertSpacing
    }
}
};
