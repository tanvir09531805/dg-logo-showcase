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
            subtitle: "subtitle.decoration.font",
            design_content_text: "design_content_text.decoration.font",
            content_button: "content_button.decoration.font",
            marker_txt: "marker_txt.decoration.font",
            date_title: "date_title.decoration.font",
            date_subtitle: "date_subtitle.decoration.font"
        },
        borders: {
            default: "module.decoration.border",
            item_wrapper_border: "item_wrapper_border.decoration.border",
            title_border: "title_border.decoration.border",
            subtitle_border: "subtitle_border.decoration.border",
            content_text_wrapper_border: "content_text_wrapper_border.decoration.border",
            content_media_border: "content_media_border.decoration.border",
            content_button_border: "content_button_border.decoration.border",
            marker_wrapper_border: "marker_wrapper_border.decoration.border",
            date_wrapper_border: "date_wrapper_border.decoration.border"
        },
        box_shadow: {
            default: "module.decoration.boxShadow"
        }
    },
    module: {
        admin_label: "admin_label.innerContent.*",
        title_bg: "title_bg.innerContent.*",
        subtitle_bg: "subtitle_bg.innerContent.*",
        content_media_bg: "content_media_bg.innerContent.*",
        title: "title.innerContent.*",
        title_tag: "title_tag.innerContent.*",
        sub_title: "sub_title.innerContent.*",
        sub_title_tag: "sub_title_tag.innerContent.*",
        content: "content.innerContent.*",
        enable_content_media: "enable_content_media.innerContent.*",
        content_media_type: "content_media_type.innerContent.*",
        content_icon: "content_icon.innerContent.*",
        content_icon_color: "content_icon_color.innerContent.*",
        content_icon_size: "content_icon_size.innerContent.*",
        content_icon_alignment: "content_icon_alignment.innerContent.*",
        content_image: "content_image.innerContent.*",
        content_image_alt_text: "content_image_alt_text.innerContent.*",
        content_image_width: "content_image_width.innerContent.*",
        content_image_alignment: "content_image_alignment.innerContent.*",
        content_image_full_width_mobile: "content_image_full_width_mobile.innerContent.*",
        content_button_bg: "content_button_bg.innerContent.*",
        enable_content_button: "enable_content_button.innerContent.*",
        button_text: "button_text.innerContent.*",
        button_url: "button_url.innerContent.*",
        button_url_new_window: "button_url_new_window.innerContent.*",
        button_full_width: "button_full_width.innerContent.*",
        button_alignment: "button_alignment.innerContent.*",
        use_button_icon: "use_button_icon.innerContent.*",
        button_font_icon: "button_font_icon.innerContent.*",
        button_icon_placement: "button_icon_placement.innerContent.*",
        button_icon_color: "button_icon_color.innerContent.*",
        button_icon_size: "button_icon_size.innerContent.*",
        button_icon_space: "button_icon_space.innerContent.*",
        timeline_button_margin: "timeline_button_margin.decoration.spacing.*.margin",
        timeline_button_padding: "timeline_button_padding.decoration.spacing.*.padding",
        marker_type: "marker_type.innerContent.*",
        marker_img: "marker_img.innerContent.*",
        marker_img_alt_txt: "marker_img_alt_txt.innerContent.*",
        marker_img_width: "marker_img_width.innerContent.*",
        marker_icon: "marker_icon.innerContent.*",
        marker_icon_color: "marker_icon_color.innerContent.*",
        marker_icon_size: "marker_icon_size.innerContent.*",
        enable_marker_icon_mobile: "enable_marker_icon_mobile.innerContent.*",
        mobile_marker_icon: "mobile_marker_icon.innerContent.*",
        mobile_marker_icon_color: "mobile_marker_icon_color.innerContent.*",
        mobile_marker_icon_size: "mobile_marker_icon_size.innerContent.*",
        marker_txt: "marker_txt.innerContent.*",
        marker_bg: "marker_bg.innerContent.*",
        arrow_color: "arrow_color.innerContent.*",
        date_arrow_color: "date_arrow_color.innerContent.*",
        date_title: "date_title.innerContent.*",
        date_title_tag: "date_title_tag.innerContent.*",
        date_sub_title: "date_sub_title.innerContent.*",
        date_sub_title_tag: "date_sub_title_tag.innerContent.*",
        item_wrapper_bg: "item_wrapper_bg.innerContent.*",
        item_vartical_position: "item_vartical_position.innerContent.*",
        date_vartical_position: "date_vartical_position.innerContent.*",
        child_arrow_vertical_position: "child_arrow_vertical_position.innerContent.*",
        child_date_arrow_vertical_position: "child_date_arrow_vertical_position.innerContent.*",
        marker_vertical_position: "marker_vertical_position.innerContent.*",
        content_text_bg: "content_text_bg.innerContent.*",
        date_wrapper_bg: "date_wrapper_bg.innerContent.*",
        timeline_title_margin: "timeline_title_margin.decoration.spacing.*.margin",
        timeline_title_padding: "timeline_title_padding.decoration.spacing.*.padding",
        timeline_subtitle_margin: "timeline_subtitle_margin.decoration.spacing.*.margin",
        timeline_subtitle_padding: "timeline_subtitle_padding.decoration.spacing.*.padding",
        item_wrapper_padding: "item_wrapper_padding.decoration.spacing.*.padding",
        timeline_media_item_margin: "timeline_media_item_margin.decoration.spacing.*.margin",
        timeline_media_item_padding: "timeline_media_item_padding.decoration.spacing.*.padding",
        timeline_content_margin: "timeline_content_margin.decoration.spacing.*.margin",
        timeline_content_padding: "timeline_content_padding.decoration.spacing.*.padding",
        date_wrapper_padding: "date_wrapper_padding.decoration.spacing.*.padding",
        date_title_margin: "date_title_margin.decoration.spacing.*.margin",
        date_subtitle_margin: "date_subtitle_margin.decoration.spacing.*.margin"
    },
    valueExpansionFunctionMap: {
        timeline_button_margin: convertSpacing,
        timeline_button_padding: convertSpacing,
        timeline_title_margin: convertSpacing,
        timeline_title_padding: convertSpacing,
        timeline_subtitle_margin: convertSpacing,
        timeline_subtitle_padding: convertSpacing,
        item_wrapper_padding: convertSpacing,
        timeline_media_item_margin: convertSpacing,
        timeline_media_item_padding: convertSpacing,
        timeline_content_margin: convertSpacing,
        timeline_content_padding: convertSpacing,
        date_wrapper_padding: convertSpacing,
        date_title_margin: convertSpacing,
        date_subtitle_margin: convertSpacing
    }
}
};
