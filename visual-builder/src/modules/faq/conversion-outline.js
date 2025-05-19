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
            faq_item_wrapper_border: "faq_item_wrapper_border.decoration.border",
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
        faq_layout: "faq_layout.innerContent.*",
        faq_layout_grid: "faq_layout_grid.innerContent.*",
        faq_item_per_column: "faq_item_per_column.innerContent.*",
        faq_item_gap: "faq_item_gap.innerContent.*",
        faq_item_equal_width: "faq_item_equal_width.innerContent.*",
        faq_item_width: "faq_item_width.innerContent.*",
        faq_item_horizontal_alignment: "faq_item_horizontal_alignment.innerContent.*",
        activate_on_first_time: "activate_on_first_time.innerContent.*",
        active_item_order_number: "active_item_order_number.innerContent.*",
        disable_faq_icon: "disable_faq_icon.innerContent.*",
        faq_que_swap: "faq_que_swap.innerContent.*",
        faq_que_alignment: "faq_que_alignment.innerContent.*",
        enable_schema: "enable_schema.innerContent.*",
        output_html: "output_html.innerContent.*",
        close_faq_icon: "close_faq_icon.innerContent.*",
        faq_icon_bg: "faq_icon_bg.innerContent.*",
        close_icon_color: "close_icon_color.innerContent.*",
        close_icon_size: "close_icon_size.innerContent.*",
        open_faq_icon: "open_faq_icon.innerContent.*",
        active_faq_icon_bg: "active_faq_icon_bg.innerContent.*",
        open_icon_color: "open_icon_color.innerContent.*",
        open_icon_size: "open_icon_size.innerContent.*",
        que_img_bg: "que_img_bg.innerContent.*",
        active_que_img_bg: "active_que_img_bg.innerContent.*",
        close_que_img_size: "close_que_img_size.innerContent.*",
        open_que_img_size: "open_que_img_size.innerContent.*",
        faq_animation: "faq_animation.innerContent.*",
        faq_anime_duration: "faq_anime_duration.innerContent.*",
        icon_animation: "icon_animation.innerContent.*",
        que_img_animation: "que_img_animation.innerContent.*",
        content_animation_type: "content_animation_type.innerContent.*",
        content_anime_duration: "content_anime_duration.innerContent.*",
        faq_item_wrapper_bg: "faq_item_wrapper_bg.innerContent.*",
        default_que_wrapper_bg: "default_que_wrapper_bg.innerContent.*",
        active_que_wrapper_bg: "active_que_wrapper_bg.innerContent.*",
        ans_wrapper_bg: "ans_wrapper_bg.innerContent.*",
        faq_wrapper_margin: "faq_wrapper_margin.decoration.spacing.*.margin",
        faq_wrapper_padding: "faq_wrapper_padding.decoration.spacing.*.padding",
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
        ans_button_bg: "ans_button_bg.innerContent.*",
        button_text_color: "button_text_color.innerContent.*",
        button_icon_color: "button_icon_color.innerContent.*",
        button_icon_size: "button_icon_size.innerContent.*",
        button_alignment: "button_alignment.innerContent.*",
        ans_button_margin: "ans_button_margin.decoration.spacing.*.margin",
        ans_button_padding: "ans_button_padding.decoration.spacing.*.padding"
    },
    valueExpansionFunctionMap: {
        faq_wrapper_margin: D4ToD5Spacing,
        faq_wrapper_padding: D4ToD5Spacing,
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
