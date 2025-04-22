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
        fonts: {
            title: "title.decoration.font",
            sub_title: "sub_title.decoration.font",
            content: "content.decoration.font",
            button: "button.decoration.font"
        },
        borders: {
            default: "module.decoration.border",
            button: "button.decoration.border",
            title: "title.decoration.border",
            subtitle: "subtitle.decoration.border",
            content: "content.decoration.border"
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
        change_view: "change_view.innerContent.*",
        title: "title.innerContent.*",
        sub_title: "sub_title.innerContent.*",
        content: "content.innerContent.*",
        hb_btn_button_text: "hb_btn_button_text.innerContent.*",
        hb_btn_button_url: "hb_btn_button_url.innerContent.*",
        hb_btn_button_url_new_window: "hb_btn_button_url_new_window.innerContent.*",
        hb_btn_button_align: "hb_btn_button_align.innerContent.*",
        title_on_hover: "title_on_hover.innerContent.*",
        subtitle_on_hover: "subtitle_on_hover.innerContent.*",
        content_on_hover: "content_on_hover.innerContent.*",
        button_on_hover: "button_on_hover.innerContent.*",
        background_scale: "background_scale.innerContent.*",
        anim_direction: "anim_direction.innerContent.*",
        hb_btn_background: "hb_btn_background.innerContent.*",
        hb_background: "hb_background.innerContent.*",
        vertical_align: "vertical_align.innerContent.*",
        title_tag: "title_tag.innerContent.*",
        subtitle_tag: "subtitle_tag.innerContent.*",
        wrapper_margin: "wrapper_margin.decoration.spacing.*.margin",
        wrapper_padding: "wrapper_padding.decoration.spacing.*.padding",
        button_wrapper_margin: "button_wrapper_margin.decoration.spacing.*.margin",
        button_wrapper_padding: "button_wrapper_padding.decoration.spacing.*.padding",
        title_margin: "title_margin.decoration.spacing.*.margin",
        title_padding: "title_padding.decoration.spacing.*.padding",
        subtitle_margin: "subtitle_margin.decoration.spacing.*.margin",
        subtitle_padding: "subtitle_padding.decoration.spacing.*.padding",
        content_margin: "content_margin.decoration.spacing.*.margin",
        content_padding: "content_padding.decoration.spacing.*.padding",
        button_margin: "button_margin.decoration.spacing.*.margin",
        button_padding: "button_padding.decoration.spacing.*.padding",
        title_bg: "title_bg.innerContent.*",
        subtitle_bg: "subtitle_bg.innerContent.*",
        content_bg: "content_bg.innerContent.*"
    },
    valueExpansionFunctionMap: {
        wrapper_margin: convertSpacing,
        wrapper_padding: convertSpacing,
        button_wrapper_margin: convertSpacing,
        button_wrapper_padding: convertSpacing,
        title_margin: convertSpacing,
        title_padding: convertSpacing,
        subtitle_margin: convertSpacing,
        subtitle_padding: convertSpacing,
        content_margin: convertSpacing,
        content_padding: convertSpacing,
        button_margin: convertSpacing,
        button_padding: convertSpacing
    }
}
};
