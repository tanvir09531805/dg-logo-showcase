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
            sub_title: "sub_title.decoration.font",
            content_body: "content_body.decoration.font",
            content_link: "content_link.decoration.font",
            content_unorder_list: "content_unorder_list.decoration.font",
            content_order_list: "content_order_list.decoration.font",
            content_quote: "content_quote.decoration.font",
            button_text: "button_text.decoration.font",
            badge_text: "badge_text.decoration.font",
            badge_text_1: "badge_text_1.decoration.font",
            badge_text_2: "badge_text_2.decoration.font",
            content_heading_1: "content_heading_1.decoration.font"
        },
        borders: {
            default: "module.decoration.border",
            title_border: "title_border.decoration.border",
            sub_title_border: "sub_title_border.decoration.border",
            content_border: "content_border.decoration.border",
            button_border: "button_border.decoration.border",
            badge_border: "badge_border.decoration.border",
            badge_text_1_border: "badge_text_1_border.decoration.border",
            badge_text_2_border: "badge_text_2_border.decoration.border",
            icon_border: "icon_border.decoration.border",
            image_border: "image_border.decoration.border",
            content_area_border: "content_area_border.decoration.border"
        },
        box_shadow: {
            default: "module.decoration.boxShadow"
        },
        margin_padding: "module.decoration.spacing"
    },
    module: {
        title: "title.innerContent.*",
        sub_title: "sub_title.innerContent.*",
        content: "content.innerContent.*",
        badge_enable: "badge_enable.innerContent.*",
        ul_type: "ul_type.innerContent.*",
        ul_position: "ul_position.innerContent.*",
        ol_type: "ol_type.innerContent.*",
        ol_position: "ol_position.innerContent.*",
        button_background: "button_background.innerContent.*",
        button_text: "button_text.innerContent.*",
        button_url: "button_url.innerContent.*",
        button_url_new_window: "button_url_new_window.innerContent.*",
        button_full_width: "button_full_width.innerContent.*",
        button_alignment: "button_alignment.innerContent.*",
        use_button_icon: "use_button_icon.innerContent.*",
        button_font_icon: "button_font_icon.innerContent.*",
        button_icon_size: "button_icon_size.innerContent.*",
        button_icon_color: "button_icon_color.innerContent.*",
        button_icon_placement: "button_icon_placement.innerContent.*",
        badge_background: "badge_background.innerContent.*",
        badge: "badge.innerContent.*",
        badge_text_2: "badge_text_2.innerContent.*",
        badge_icon_enable: "badge_icon_enable.innerContent.*",
        badge_icon: "badge_icon.innerContent.*",
        badge_alignment: "badge_alignment.innerContent.*",
        badge_icon_color: "badge_icon_color.innerContent.*",
        badge_icon_size: "badge_icon_size.innerContent.*",
        blurb_icon_enable: "blurb_icon_enable.innerContent.*",
        blurb_icon: "blurb_icon.innerContent.*",
        blurb_icon_color: "blurb_icon_color.innerContent.*",
        icon_size: "icon_size.innerContent.*",
        blurb_icon_background_color: "blurb_icon_background_color.innerContent.*",
        blurb_img_background_color: "blurb_img_background_color.innerContent.*",
        image: "image.innerContent.*",
        image_icon_container_position: "image_icon_container_position.innerContent.*",
        image_placement: "image_placement.innerContent.*",
        image_icon_alignment: "image_icon_alignment.innerContent.*",
        image_icon_item_align: "image_icon_item_align.innerContent.*",
        image_container_width: "image_container_width.innerContent.*",
        alt_text: "alt_text.innerContent.*",
        title_url: "title_url.innerContent.*",
        title_url_new_tab: "title_url_new_tab.innerContent.*",
        title_background: "title_background.innerContent.*",
        sub_title_background: "sub_title_background.innerContent.*",
        content_background: "content_background.innerContent.*",
        content_area_alignment: "content_area_alignment.innerContent.*",
        content_area_background: "content_area_background.innerContent.*",
        order_enable: "order_enable.innerContent.*",
        image_order: "image_order.innerContent.*",
        title_order: "title_order.innerContent.*",
        sub_title_order: "sub_title_order.innerContent.*",
        content_order: "content_order.innerContent.*",
        button_order: "button_order.innerContent.*",
        badge_order: "badge_order.innerContent.*",
        blurb_img_zindex: "blurb_img_zindex.innerContent.*",
        title_zindex: "title_zindex.innerContent.*",
        sub_title_zindex: "sub_title_zindex.innerContent.*",
        content_zindex: "content_zindex.innerContent.*",
        badge_zindex: "badge_zindex.innerContent.*",
        button_zindex: "button_zindex.innerContent.*",
        content_width: "content_width.innerContent.*",
        image_width: "image_width.innerContent.*",
        wrapper_margin: "wrapper_margin.decoration.spacing.*.margin",
        wrapper_padding: "wrapper_padding.decoration.spacing.*.padding",
        blurb_img_margin: "blurb_img_margin.decoration.spacing.*.margin",
        blurb_icon_spacing: "blurb_icon_spacing.innerContent.*",
        blurb_img_spacing: "blurb_img_spacing.innerContent.*",
        button_wrapper_margin: "button_wrapper_margin.decoration.spacing.*.margin",
        button_wrapper_padding: "button_wrapper_padding.decoration.spacing.*.padding",
        badge_wrapper_margin: "badge_wrapper_margin.decoration.spacing.*.margin",
        content_area_margin: "content_area_margin.decoration.spacing.*.margin",
        content_area_padding: "content_area_padding.decoration.spacing.*.padding",
        title_margin: "title_margin.decoration.spacing.*.margin",
        title_padding: "title_padding.decoration.spacing.*.padding",
        sub_title_margin: "sub_title_margin.decoration.spacing.*.margin",
        sub_title_padding: "sub_title_padding.decoration.spacing.*.padding",
        content_margin: "content_margin.decoration.spacing.*.margin",
        content_padding: "content_padding.decoration.spacing.*.padding",
        button_margin: "button_margin.decoration.spacing.*.margin",
        button_padding: "button_padding.decoration.spacing.*.padding",
        button_icon_margin: "button_icon_margin.decoration.spacing.*.margin",
        badge_margin: "badge_margin.decoration.spacing.*.margin",
        badge_padding: "badge_padding.decoration.spacing.*.padding",
        badge_icon_margin: "badge_icon_margin.decoration.spacing.*.margin",
        badge_text_1_margin: "badge_text_1_margin.decoration.spacing.*.margin",
        badge_text_1_padding: "badge_text_1_padding.decoration.spacing.*.padding"
    },
    valueExpansionFunctionMap: {
        wrapper_margin: convertSpacing,
        wrapper_padding: convertSpacing,
        blurb_img_margin: convertSpacing,
        button_wrapper_margin: convertSpacing,
        button_wrapper_padding: convertSpacing,
        badge_wrapper_margin: convertSpacing,
        content_area_margin: convertSpacing,
        content_area_padding: convertSpacing,
        title_margin: convertSpacing,
        title_padding: convertSpacing,
        sub_title_margin: convertSpacing,
        sub_title_padding: convertSpacing,
        content_margin: convertSpacing,
        content_padding: convertSpacing,
        button_margin: convertSpacing,
        button_padding: convertSpacing,
        button_icon_margin: convertSpacing,
        badge_margin: convertSpacing,
        badge_padding: convertSpacing,
        badge_icon_margin: convertSpacing,
        badge_text_1_margin: convertSpacing,
        badge_text_1_padding: convertSpacing
    }
}
};
