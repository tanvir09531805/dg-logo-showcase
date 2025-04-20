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
            style_settings__menu__typography: "style_settings__menu__typography.decoration.font",
            style_settings__menu__badge__typography: "style_settings__menu__badge__typography.decoration.font",
            style_settings__sub_menu__typography: "style_settings__sub_menu__typography.decoration.font",
            style_settings__sub_menu__badge__typography: "style_settings__sub_menu__badge__typography.decoration.font",
            style_settings__menu__tooltip__typography: "style_settings__menu__tooltip__typography.decoration.font",
            style_settings__sub_menu__tooltip__typography: "style_settings__sub_menu__tooltip__typography.decoration.font",
            style_settings__hamburger_typography: "style_settings__hamburger_typography.decoration.font",
            style_settings__mega_menu__parent__typography: "style_settings__mega_menu__parent__typography.decoration.font"
        },
        borders: {
            default: "module.decoration.border",
            style_settings__menu__items_border: "style_settings__menu__items_border.decoration.border",
            style_settings__sub_menu__wrapper_border: "style_settings__sub_menu__wrapper_border.decoration.border",
            style_settings__sub_menu__item_border: "style_settings__sub_menu__item_border.decoration.border",
            toggle_key__mega_menu_border: "toggle_key__mega_menu_border.decoration.border",
            toggle_key__mega_menu__item_border: "toggle_key__mega_menu__item_border.decoration.border"
        },
        box_shadow: {
            default: "module.decoration.boxShadow"
        },
        margin_padding: "module.decoration.spacing"
    },
    module: {
        style_settings__sub_menu__tooltip_bg: "style_settings__sub_menu__tooltip_bg.innerContent.*",
        style_settings__menu__tooltip_bg: "style_settings__menu__tooltip_bg.innerContent.*",
        style_settings__sub_menu__badge_bg: "style_settings__sub_menu__badge_bg.innerContent.*",
        style_settings__menu__badge_bg: "style_settings__menu__badge_bg.innerContent.*",
        settings__select_menu_slug: "settings__select_menu_slug.innerContent.*",
        settings__builder_visiblity: "settings__builder_visiblity.innerContent.*",
        settings__submenu_reveal_type: "settings__submenu_reveal_type.innerContent.*",
        settings__submenu_reveal_dir: "settings__submenu_reveal_dir.innerContent.*",
        settings__clicked_menu_element_style: "settings__clicked_menu_element_style.innerContent.*",
        settings__badge_visiblity: "settings__badge_visiblity.innerContent.*",
        settings__tooltip_visiblity: "settings__tooltip_visiblity.innerContent.*",
        settings__menu_item_hover_animation: "settings__menu_item_hover_animation.innerContent.*",
        settings__select_animation_type: "settings__select_animation_type.innerContent.*",
        settings__use_hamburger_for_mobile: "settings__use_hamburger_for_mobile.innerContent.*",
        settings__hamburger_menu_reveal_type: "settings__hamburger_menu_reveal_type.innerContent.*",
        settings__hamburger_text: "settings__hamburger_text.innerContent.*",
        settings__hamburger_icon_preset: "settings__hamburger_icon_preset.innerContent.*",
        settings__hamburger_icon_color: "settings__hamburger_icon_color.innerContent.*",
        style_settings__hamburger_icon_font_size: "style_settings__hamburger_icon_font_size.innerContent.*",
        style_settings__hamburger__wrapper_spacing_margin: "style_settings__hamburger__wrapper_spacing_margin.decoration.spacing.*.margin",
        style_settings__hamburger__wrapper_spacing_padding: "style_settings__hamburger__wrapper_spacing_padding.decoration.spacing.*.padding",
        style_settings__hamburger__wrapper__bg: "style_settings__hamburger__wrapper__bg.innerContent.*",
        settings__select_animation_color: "settings__select_animation_color.innerContent.*",
        settings__animation__line_weight: "settings__animation__line_weight.innerContent.*",
        style_settings__alignment: "style_settings__alignment.innerContent.*",
        style_settings__menu__item_gap: "style_settings__menu__item_gap.innerContent.*",
        style_settings__menu__icon_color: "style_settings__menu__icon_color.innerContent.*",
        style_settings__menu__icon_font_size: "style_settings__menu__icon_font_size.innerContent.*",
        style_settings__menu__item_bg: "style_settings__menu__item_bg.innerContent.*",
        style_settings__menu__item_spacing_padding: "style_settings__menu__item_spacing_padding.decoration.spacing.*.padding",
        style_settings__menu__item_icon_spacing_margin: "style_settings__menu__item_icon_spacing_margin.decoration.spacing.*.margin",
        style_settings__sub_menu__item_gap: "style_settings__sub_menu__item_gap.innerContent.*",
        style_settings__sub_menu__icon_color: "style_settings__sub_menu__icon_color.innerContent.*",
        style_settings__sub_menu__item__bg: "style_settings__sub_menu__item__bg.innerContent.*",
        style_settings__sub_menu__item_spacing_padding: "style_settings__sub_menu__item_spacing_padding.decoration.spacing.*.padding",
        style_settings__sub_menu__item_icon_spacing_margin: "style_settings__sub_menu__item_icon_spacing_margin.decoration.spacing.*.margin",
        style_settings__sub_menu__wrapper__bg: "style_settings__sub_menu__wrapper__bg.innerContent.*",
        style_settings__sub_menu__tree_view: "style_settings__sub_menu__tree_view.innerContent.*",
        style_settings__sub_menu__tree_view_spacing: "style_settings__sub_menu__tree_view_spacing.innerContent.*",
        style_settings__sub_menu__wrapper_spacing_padding: "style_settings__sub_menu__wrapper_spacing_padding.decoration.spacing.*.padding",
        style_settings__mega_menu__columns: "style_settings__mega_menu__columns.innerContent.*",
        style_settings__mega_menu__wrapper_bg: "style_settings__mega_menu__wrapper_bg.innerContent.*",
        style_settings__mega_menu__wrapper_spacing_padding: "style_settings__mega_menu__wrapper_spacing_padding.decoration.spacing.*.padding",
        style_settings__mega_menu__item_gap: "style_settings__mega_menu__item_gap.innerContent.*",
        style_settings__mega_menu__icon_color: "style_settings__mega_menu__icon_color.innerContent.*",
        style_settings__mega_menu__items_bg: "style_settings__mega_menu__items_bg.innerContent.*",
        style_settings__mega_menu__items_spacing_padding: "style_settings__mega_menu__items_spacing_padding.decoration.spacing.*.padding",
        style_settings__mega_menu__items_icon_spacing_margin: "style_settings__mega_menu__items_icon_spacing_margin.decoration.spacing.*.margin",
        style_settings__menu__active__font_color: "style_settings__menu__active__font_color.innerContent.*",
        style_settings__menu__active__icon_color: "style_settings__menu__active__icon_color.innerContent.*",
        style_settings__menu__active__item_bg: "style_settings__menu__active__item_bg.innerContent.*",
        style_settings__sub_menu__active__font_color: "style_settings__sub_menu__active__font_color.innerContent.*",
        style_settings__sub_menu__active__icon_color: "style_settings__sub_menu__active__icon_color.innerContent.*",
        style_settings__sub_menu__active__bg: "style_settings__sub_menu__active__bg.innerContent.*",
        style_settings__mega_menu__active__font_color: "style_settings__mega_menu__active__font_color.innerContent.*",
        style_settings__mega_menu__active__icon_color: "style_settings__mega_menu__active__icon_color.innerContent.*",
        style_settings__mega_menu__active__items_bg: "style_settings__mega_menu__active__items_bg.innerContent.*",
        style_settings__badge__alignment: "style_settings__badge__alignment.innerContent.*"
    },
    valueExpansionFunctionMap: {
        style_settings__hamburger__wrapper_spacing_margin: convertSpacing,
        style_settings__hamburger__wrapper_spacing_padding: convertSpacing,
        style_settings__menu__item_spacing_padding: convertSpacing,
        style_settings__menu__item_icon_spacing_margin: convertSpacing,
        style_settings__sub_menu__item_spacing_padding: convertSpacing,
        style_settings__sub_menu__item_icon_spacing_margin: convertSpacing,
        style_settings__sub_menu__wrapper_spacing_padding: convertSpacing,
        style_settings__mega_menu__wrapper_spacing_padding: convertSpacing,
        style_settings__mega_menu__items_spacing_padding: convertSpacing,
        style_settings__mega_menu__items_icon_spacing_margin: convertSpacing
    }
}
};
