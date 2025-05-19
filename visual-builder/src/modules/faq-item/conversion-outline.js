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
            question_text: "question_text.decoration.font",
            active_design_question_text: "active_design_question_text.decoration.font",
            design_answer_text: "design_answer_text.decoration.font",
            ans_button: "ans_button.decoration.font",
            content_heading_1: "content_heading_1.decoration.font"
        },
        borders: {
            default: "module.decoration.border",
            que_wrapper_border: "que_wrapper_border.decoration.border",
            active_que_wrapper_border: "active_que_wrapper_border.decoration.border",
            que_img_border: "que_img_border.decoration.border",
            active_que_img_border: "active_que_img_border.decoration.border",
            que_icon_wrapper_border: "que_icon_wrapper_border.decoration.border",
            active_que_icon_wrapper_border: "active_que_icon_wrapper_border.decoration.border",
            ans_wrapper_border: "ans_wrapper_border.decoration.border",
            ans_img_border: "ans_img_border.decoration.border",
            ans_button_border: "ans_button_border.decoration.border"
        },
        box_shadow: {
            default: "module.decoration.boxShadow"
        },
        filters: {
            default: "module.decoration.filters"
        },
        margin_padding: "module.decoration.spacing"
    },
    module: {
        question: "question.innerContent.*",
        question_title_tag: "question_title_tag.innerContent.*",
        enable_question_image: "enable_question_image.innerContent.*",
        close_question_image: "close_question_image.innerContent.*",
        close_que_img_alt_txt: "close_que_img_alt_txt.innerContent.*",
        open_question_image: "open_question_image.innerContent.*",
        open_que_img_alt_txt: "open_que_img_alt_txt.innerContent.*",
        question_image_placement: "question_image_placement.innerContent.*",
        content: "content.innerContent.*",
        enable_answer_image: "enable_answer_image.innerContent.*",
        answer_image: "answer_image.innerContent.*",
        answer_image_alt_text: "answer_image_alt_text.innerContent.*",
        answer_image_placement: "answer_image_placement.innerContent.*",
        answer_image_width: "answer_image_width.innerContent.*",
        answer_image_width_top_bottom: "answer_image_width_top_bottom.innerContent.*",
        answer_image_full_width_mobile: "answer_image_full_width_mobile.innerContent.*",
        answer_image_alignment: "answer_image_alignment.innerContent.*",
        faq_icon_bg: "faq_icon_bg.innerContent.*",
        active_faq_icon_bg: "active_faq_icon_bg.innerContent.*",
        close_icon_color: "close_icon_color.innerContent.*",
        open_icon_color: "open_icon_color.innerContent.*",
        que_img_bg: "que_img_bg.innerContent.*",
        active_que_img_bg: "active_que_img_bg.innerContent.*",
        default_que_wrapper_bg: "default_que_wrapper_bg.innerContent.*",
        active_que_wrapper_bg: "active_que_wrapper_bg.innerContent.*",
        ans_wrapper_bg: "ans_wrapper_bg.innerContent.*",
        ans_button_bg: "ans_button_bg.innerContent.*",
        enable_answer_button: "enable_answer_button.innerContent.*",
        button_text: "button_text.innerContent.*",
        button_url: "button_url.innerContent.*",
        button_url_new_window: "button_url_new_window.innerContent.*",
        button_text_color: "button_text_color.innerContent.*",
        button_full_width: "button_full_width.innerContent.*",
        button_alignment: "button_alignment.innerContent.*",
        use_button_icon: "use_button_icon.innerContent.*",
        button_font_icon: "button_font_icon.innerContent.*",
        button_icon_placement: "button_icon_placement.innerContent.*",
        show_icon_hover: "show_icon_hover.innerContent.*",
        button_icon_color: "button_icon_color.innerContent.*",
        button_icon_size: "button_icon_size.innerContent.*",
        button_icon_space: "button_icon_space.innerContent.*",
        hide_faq_item: "hide_faq_item.innerContent.*",
        faq_item_wrapper_margin: "faq_item_wrapper_margin.decoration.spacing.*.margin",
        faq_item_wrapper_padding: "faq_item_wrapper_padding.decoration.spacing.*.padding",
        que_wrapper_margin: "que_wrapper_margin.decoration.spacing.*.margin",
        que_wrapper_padding: "que_wrapper_padding.decoration.spacing.*.padding",
        que_text_margin: "que_text_margin.decoration.spacing.*.margin",
        que_icon_margin: "que_icon_margin.decoration.spacing.*.margin",
        que_icon_padding: "que_icon_padding.decoration.spacing.*.padding",
        que_img_margin: "que_img_margin.decoration.spacing.*.margin",
        que_img_padding: "que_img_padding.decoration.spacing.*.padding",
        ans_wrapper_margin: "ans_wrapper_margin.decoration.spacing.*.margin",
        ans_wrapper_padding: "ans_wrapper_padding.decoration.spacing.*.padding",
        ans_text_padding: "ans_text_padding.decoration.spacing.*.padding",
        ans_img_padding: "ans_img_padding.decoration.spacing.*.padding",
        admin_label: "admin_label.innerContent.*",
        ans_button_margin: "ans_button_margin.decoration.spacing.*.margin",
        ans_button_padding: "ans_button_padding.decoration.spacing.*.padding"
    },
    valueExpansionFunctionMap: {
        faq_item_wrapper_margin: D4ToD5Spacing,
        faq_item_wrapper_padding: D4ToD5Spacing,
        que_wrapper_margin: D4ToD5Spacing,
        que_wrapper_padding: D4ToD5Spacing,
        que_text_margin: D4ToD5Spacing,
        que_icon_margin: D4ToD5Spacing,
        que_icon_padding: D4ToD5Spacing,
        que_img_margin: D4ToD5Spacing,
        que_img_padding: D4ToD5Spacing,
        ans_wrapper_margin: D4ToD5Spacing,
        ans_wrapper_padding: D4ToD5Spacing,
        ans_text_padding: D4ToD5Spacing,
        ans_img_padding: D4ToD5Spacing,
        ans_button_margin: D4ToD5Spacing,
        ans_button_padding: D4ToD5Spacing
    }
}
};
