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
            caption: "caption.decoration.font",
            description: "description.decoration.font",
            more_btn: "more_btn.decoration.font",
            pagination: "pagination.decoration.font",
            active_pagination: "active_pagination.decoration.font"
        },
        borders: {
            default: "module.decoration.border",
            pg_more_br: "pg_more_br.decoration.border",
            item_border: "item_border.decoration.border",
            pagination: "pagination.decoration.border",
            active_pagination: "active_pagination.decoration.border"
        },
        box_shadow: {
            default: "module.decoration.boxShadow"
        },
        margin_padding: "module.decoration.spacing"
    },
    module: {
        gallery: "gallery.innerContent.*",
        pg_layout: "pg_layout.innerContent.*",
        keep_dsk_tab: "keep_dsk_tab.innerContent.*",
        tablet_view: "tablet_view.innerContent.*",
        mobile_view: "mobile_view.innerContent.*",
        space_between: "space_between.innerContent.*",
        load_more: "load_more.innerContent.*",
        init_count: "init_count.innerContent.*",
        image_count: "image_count.innerContent.*",
        load_more_text: "load_more_text.innerContent.*",
        show_pagination: "show_pagination.innerContent.*",
        pagination_img_count: "pagination_img_count.innerContent.*",
        use_number_pagination: "use_number_pagination.innerContent.*",
        use_icon_only_at_pagination: "use_icon_only_at_pagination.innerContent.*",
        older_text: "older_text.innerContent.*",
        newer_text: "newer_text.innerContent.*",
        use_url: "use_url.innerContent.*",
        url_target: "url_target.innerContent.*",
        use_lightbox: "use_lightbox.innerContent.*",
        use_lightbox_download: "use_lightbox_download.innerContent.*",
        use_lightbox_content: "use_lightbox_content.innerContent.*",
        overlay: "overlay.innerContent.*",
        overlay_primary: "overlay_primary.innerContent.*",
        overlay_secondary: "overlay_secondary.innerContent.*",
        overlay_direction: "overlay_direction.innerContent.*",
        border_anim: "border_anim.innerContent.*",
        anm_border_color: "anm_border_color.innerContent.*",
        anm_border_width: "anm_border_width.innerContent.*",
        anm_border_margin: "anm_border_margin.innerContent.*",
        anm_content_padding: "anm_content_padding.innerContent.*",
        border_anm_style: "border_anm_style.innerContent.*",
        show_caption: "show_caption.innerContent.*",
        always_show_title: "always_show_title.innerContent.*",
        content_reveal_caption: "content_reveal_caption.innerContent.*",
        show_description: "show_description.innerContent.*",
        always_show_description: "always_show_description.innerContent.*",
        content_reveal_description: "content_reveal_description.innerContent.*",
        content_position: "content_position.innerContent.*",
        caption_tag: "caption_tag.innerContent.*",
        description_tag: "description_tag.innerContent.*",
        more_btn_align: "more_btn_align.innerContent.*",
        spinner_color: "spinner_color.innerContent.*",
        more_btn_bg: "more_btn_bg.innerContent.*",
        title_padding: "title_padding.decoration.spacing.*.padding",
        description_padding: "description_padding.decoration.spacing.*.padding",
        load_more_margin: "load_more_margin.decoration.spacing.*.margin",
        load_more_padding: "load_more_padding.decoration.spacing.*.padding",
        more_btn_use_icon: "more_btn_use_icon.innerContent.*",
        more_btn_font_icon: "more_btn_font_icon.innerContent.*",
        more_btn_icon_size: "more_btn_icon_size.innerContent.*",
        pagination_align: "pagination_align.innerContent.*",
        next_prev_icon: "next_prev_icon.innerContent.*",
        pagination_background: "pagination_background.innerContent.*",
        active_pagination_background: "active_pagination_background.innerContent.*",
        pagination_margin: "pagination_margin.decoration.spacing.*.margin",
        pagination_padding: "pagination_padding.decoration.spacing.*.padding",
        pagination_number_margin: "pagination_number_margin.decoration.spacing.*.margin",
        pagination_number_padding: "pagination_number_padding.decoration.spacing.*.padding"
    },
    valueExpansionFunctionMap: {
        title_padding: D4ToD5Spacing,
        description_padding: D4ToD5Spacing,
        load_more_margin: D4ToD5Spacing,
        load_more_padding: D4ToD5Spacing,
        pagination_margin: D4ToD5Spacing,
        pagination_padding: D4ToD5Spacing,
        pagination_number_margin: D4ToD5Spacing,
        pagination_number_padding: D4ToD5Spacing
    }
}
};
