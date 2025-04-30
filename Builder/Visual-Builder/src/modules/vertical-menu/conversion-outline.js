const convertSpacing = (value) => {
    value = value.split("|");
    value = {
      top:value[0],
      right:value[1],
      bottom:value[2],
      left:value[3],
      syncHorizontal:value[4],
      syncVertical:value[5],
    }
    return value
};

export const conversionOutline = {
    advanced: {
        admin_label: "module.meta.adminLabel",
        animation: "module.decoration.animation",
        background: "module.decoration.background",
        disabled_on: "module.decoration.disabledOn",
        module: "module.advanced.htmlAttributes",
        overflow: "module.decoration.overflow",
        position_fields: "module.decoration.position",
        scroll: "module.decoration.scroll",
        sticky: "module.decoration.sticky",
        text: "module.advanced.text",
        transform: "module.decoration.transform",
        transition: "module.decoration.transition",
        z_index: "module.decoration.zIndex",
        max_width: "module.decoration.sizing",
        height: "module.decoration.sizing",
        link_options: "module.advanced.link",
        margin_padding: "module.decoration.spacing",
        fonts: {
            style_settings__menu__typography:"style_settings__menu__item.decoration.font",
            style_settings__menu__badge__typography:"style_settings__menu__badge.decoration.font",
            style_settings__sub_menu__badge__typography:"style_settings__sub_menu__badge.decoration.font",
            style_settings__menu__tooltip__typography:"style_settings__menu__tooltip.decoration.font",
            style_settings__sub_menu__tooltip__typography:"style_settings__sub_menu__tooltip.decoration.font",
            style_settings__mega_menu__parent__typography:"style_settings__mega_menu__parent.decoration.font",
            style_settings__mega_menu__typography:"style_settings__mega_menu__item.decoration.font",
            style_settings__sub_menu__typography:"style_settings__sub_menu__item.decoration.font",
        },
        text_shadow: {
            default: "module.advanced.text.textShadow",
            style_settings__menu__item: "style_settings__menu__item.decoration.font",
        },
        box_shadow: {
            default: "module.decoration.boxShadow",
            style_settings__menu__items_box_shadow: "style_settings__menu__item.decoration.boxShadow",
            style_settings__sub_menu__items_box_shadow: "style_settings__sub_menu__item.decoration.boxShadow",
            style_settings__mega_menu__items_box_shadow: "style_settings__mega_menu__item.decoration.boxShadow",
        },
        borders: {
            default: "module.decoration.border",
            style_settings__menu__items_border:"style_settings__menu__item.decoration.border",
            style_settings__sub_menu__wrapper_border:"style_settings__sub_menu__wrapper.decoration.border",
            style_settings__sub_menu__item_border:"style_settings__sub_menu__item.decoration.border",
            toggle_key__mega_menu_border:"style_settings__mega_menu__wrapper.decoration.border",
            toggle_key__mega_menu__item_border:"style_settings__mega_menu__item.decoration.border",
        },
        filters: {
            default: "module.decoration.filters",
        },
    },
    css: {
        after: "css.*.after",
        before: "css.*.before",
        main_element: "css.*.mainElement",
        title: "css.*.title",
        content: "css.*.content",
    },
    module: {
        settings__select_menu_slug: "settings__select_menu_slug.innerContent.*",
        settings__builder_visiblity:
            "settings__builder_visiblity.innerContent.*",
        settings__submenu_reveal_type:
            "settings__submenu_reveal_type.innerContent.*",
        settings__submenu_reveal_dir:
            "settings__submenu_reveal_dir.innerContent.*",
        settings__clicked_menu_element_style:
            "settings__clicked_menu_element_style.innerContent.*",
        settings__badge_visiblity: "settings__badge_visiblity.innerContent.*",
        settings__tooltip_visiblity:
            "settings__tooltip_visiblity.innerContent.*",
        settings__menu_item_hover_animation:
            "settings__menu_item_hover_animation.innerContent.*",
        settings__select_animation_type:
            "settings__select_animation_type.innerContent.*",
        settings__select_animation_color:
            "settings__select_animation_color.decoration.*",
        settings__animation__line_weight:
            "settings__animation__line_weight.innerContent.*",
        style_settings__menu__item_gap: "style_settings__menu__item_gap.decoration.*",
        style_settings__mega_menu__item_gap: "style_settings__mega_menu__item_gap.decoration.*",
        style_settings__mega_menu__columns: "style_settings__mega_menu__column_gap.decoration.*",
        style_settings__menu__icon_font_size:"style_settings__menu__item_icon.decoration.font.*.size",
        style_settings__menu__item_bg:"style_settings__menu__item.decoration.background.*.color",
        style_settings__sub_menu__item__bg:"style_settings__sub_menu__item.decoration.background.*.color",
        style_settings__mega_menu__items_bg:"style_settings__mega_menu__item.decoration.background.*.color",
        style_settings__sub_menu__wrapper__bg:"style_settings__sub_menu__wrapper.decoration.background.*.color",
        style_settings__mega_menu__wrapper_bg:"style_settings__mega_menu__wrapper.decoration.background.*.color",
        style_settings__sub_menu__wrapper_spacing_padding:"style_settings__sub_menu__wrapper.decoration.spacing.*.padding",
        style_settings__mega_menu__wrapper_spacing_padding:"style_settings__mega_menu__wrapper.decoration.spacing.*.padding",
        style_settings__menu__item_spacing_padding: "style_settings__menu__item.decoration.spacing.*.padding",
        style_settings__mega_menu__items_spacing_padding: "style_settings__mega_menu__item.decoration.spacing.*.padding",
        style_settings__sub_menu__item_spacing_padding: "style_settings__sub_menu__item.decoration.spacing.*.padding",
        style_settings__menu__item_icon_spacing_margin: "style_settings__menu__item_icon.decoration.spacing.*.margin",
        style_settings__sub_menu__item_icon_spacing_margin: "style_settings__sub_menu__item_icon.decoration.spacing.*.margin",
        style_settings__mega_menu__items_icon_spacing_margin: "style_settings__mega_menu__item_icon.decoration.spacing.*.margin",
        style_settings__sub_menu__icon_color: "style_settings__sub_menu__item_icon.decoration.font.*.color",
        style_settings__mega_menu__icon_color: "style_settings__mega_menu__item_icon.decoration.font.*.color",
        style_settings__sub_menu__item_gap: "style_settings__sub_menu__item_gap.decoration.*",
        style_settings__sub_menu__tree_view:"style_settings__sub_menu__tree_view.innerContent.*",
        style_settings__sub_menu__tree_view_spacing:"style_settings__sub_menu__tree_view_spacing.decoration.*",
        style_settings__menu__active__font_color:"style_settings__menu__active__state_item.decoration.font.*.color",
        style_settings__sub_menu__active__font_color:"style_settings__sub_menu__active__state_item.decoration.font.*.color",
        style_settings__mega_menu__active__font_color:"style_settings__mega_menu__active__state_item.decoration.font.*.color",
        style_settings__menu__active__item_bg:"style_settings__menu__active__state_item.decoration.background.*.color",
        style_settings__sub_menu__active__bg:"style_settings__sub_menu__active__state_item.decoration.background.*.color",
        style_settings__mega_menu__active__items_bg:"style_settings__mega_menu__active__state_item.decoration.background.*.color",
        style_settings__menu__active__icon_color:"style_settings__menu__active__state_item_icon.decoration.font.*.color",
        style_settings__sub_menu__active__icon_color:"style_settings__sub_menu__active__state_item_icon.decoration.font.*.color",
        style_settings__mega_menu__active__icon_color:"style_settings__mega_menu__active__state_item_icon.decoration.font.*.color",
        //badge
        style_settings__menu__badge_bg:"style_settings__menu__badge.decoration.background.*.color",
        style_settings__sub_menu__badge_bg:"style_settings__sub_menu__badge.decoration.background.*.color",
        style_settings__badge__alignment:"style_settings__menu__badge.innerContent.*",

        //tooltip
        style_settings__menu__tooltip_bg:"style_settings__menu__tooltip.decoration.background.*.color",
        style_settings__sub_menu__tooltip_bg:"style_settings__sub_menu__tooltip.decoration.background.*.color",
    },
    valueExpansionFunctionMap: {
        style_settings__sub_menu__wrapper_spacing_padding: convertSpacing,
        style_settings__menu__item_spacing_padding: convertSpacing,
        style_settings__sub_menu__item_spacing_padding: convertSpacing,
        style_settings__menu__item_icon_spacing_margin: convertSpacing,
        style_settings__sub_menu__item_icon_spacing_margin: convertSpacing,
        style_settings__mega_menu__wrapper_spacing_padding: convertSpacing,
        style_settings__mega_menu__items_spacing_padding: convertSpacing,
    },
};
