import React from "react";

import { cssFields } from "./custom-css";

const { CssStyle, StyleContainer, CommonStyle } = window?.divi?.module;

/**
 * Module style component for static module
 */
export const ModuleStyles = ({
    attrs,
    elements,
    settings,
    orderClass,
    mode,
    state,
    noStyleTag,
}) => {
    const main_css_element = `${orderClass}.df_vertical_menu_main_container .df-vertical-menu-nav-wrap  ul.df-vertical-menu-nav`;

    const active_menu_item_icon_selector = `${main_css_element} li[class*='current'] .df_vertical_menu_item_elements_wrapper>.df-vertical-menu-icon`;
    const active_menu_item_icon_hover_selector = `${main_css_element} li[class*='current']>.df_vertical_menu_item_elements_wrapper:hover>.df-vertical-menu-icon`;
    const active_sub_menu_item_icon_selector = `${main_css_element} .df-vertical-sub-menu:not(.df-vertical-col-added):not(.df-vertical-col-added>ul):not(.df-vertical-inside-mega-menu)>li[class*='current']>.df_vertical_menu_item_elements_wrapper>.df-vertical-menu-icon`;
    const active_sub_menu_item_icon_hover_selector = `${main_css_element} .df-vertical-sub-menu:not(.df-vertical-col-added):not(.df-vertical-col-added>ul):not(.df-vertical-inside-mega-menu)>li[class*='current']>a:hover>.df-vertical-menu-icon`;
    const active_mega_menu_item_icon_selector = `${main_css_element}  ul.df-vertical-sub-menu.df-vertical-col-added  li[class*='current'] > .df_vertical_menu_item_elements_wrapper .df-vertical-menu-icon`;
    const active_mega_menu_item_icon_hover_selector = `${main_css_element}  ul.df-vertical-sub-menu.df-vertical-col-added  li[class*='current'] > .df_vertical_menu_item_elements_wrapper:hover .df-vertical-menu-icon`;

    // Dom Selector
    const active_menu_item_selector = `${main_css_element} li[class*='current'] .df_vertical_menu_item_elements_wrapper`;
    const active_menu_item_hover_selector = `${main_css_element} li[class*='current'] a:hover`;
    const active_sub_menu_item_selector = `${main_css_element} ul.df-vertical-sub-menu:not(.df-vertical-col-added):not(.df-vertical-inside-mega-menu) > li[class*='current'] > .df_vertical_menu_item_elements_wrapper`;
    const active_sub_menu_item_hover_selector = `${main_css_element}  ul.df-vertical-sub-menu:not(.df-vertical-col-added):not(.df-vertical-inside-mega-menu) > li[class*='current'] > .df_vertical_menu_item_elements_wrapper:hover`;
    const active_mega_menu_item_selector = `${main_css_element}  ul.df-vertical-sub-menu.df-vertical-col-added  li[class*='current'] > .df_vertical_menu_item_elements_wrapper`;
    const active_mega_menu_item_hover_selector = `${main_css_element}  ul.df-vertical-sub-menu.df-vertical-col-added  li[class*='current'] > .df_vertical_menu_item_elements_wrapper:hover`;

    return (
        <StyleContainer mode={mode} state={state} noStyleTag={noStyleTag}>
            {/* Element: Module */}
            {elements.style({
                attrName: "module",
                styleProps: {
                    disabledOn: {
                        disabledModuleVisibility:
                            settings?.disabledModuleVisibility,
                    },
                },
            })}

            <CssStyle
                selector={orderClass}
                attr={attrs.css}
                cssFields={cssFields}
            />

            {/* Element: Menu Item */}
            {elements.style({
                attrName: "style_settings__menu__item",
            })}
            {/* Element: Menu Item Icon */}
            {elements.style({
                attrName: "style_settings__menu__item_icon",
            })}

            {/* Element: Sub Menu Item */}
            {elements.style({
                attrName: "style_settings__sub_menu__item",
            })}
            {/* Element: Sub Menu Item Icon */}
            {elements.style({
                attrName: "style_settings__sub_menu__item_icon",
            })}

            {/* Element: Mega Menu Item */}
            {elements.style({
                attrName: "style_settings__mega_menu__item",
            })}
            {/* Element: Mega Menu Item Icon */}
            {elements.style({
                attrName: "style_settings__mega_menu__item_icon",
            })}

            {/* Element: Sub Menu Wrapper */}
            {elements.style({
                attrName: "style_settings__sub_menu__wrapper",
            })}

            {/* Element: Mega Menu Wrapper */}
            {elements.style({
                attrName: "style_settings__mega_menu__wrapper",
            })}

            {/* Element: Mega Menu Parent Item */}
            {elements.style({
                attrName: "style_settings__mega_menu__parent",
            })}

            {/* Element: Menu Active Item */}
            {elements.style({
                attrName: "style_settings__menu__active__state_item",
            })}

            {/* Element: Menu Active Item Icon */}
            {elements.style({
                attrName: "style_settings__menu__active__state_item_icon",
            })}

            {/* Element: Menu SubMenu Item */}
            {elements.style({
                attrName: "style_settings__sub_menu__active__state_item",
            })}

            {/* Element: Menu SubMenu Item Icon*/}
            {elements.style({
                attrName: "style_settings__sub_menu__active__state_item_icon",
            })}

            {/* Element: Menu MegaMenu Item Icon*/}
            {elements.style({
                attrName: "style_settings__mega_menu__active__state_item",
            })}

            {/* Element: Menu MegaMenu Item Icon*/}
            {elements.style({
                attrName: "style_settings__mega_menu__active__state_item_icon",
            })}

            {/* Element: Menu Badge*/}
            {elements.style({
                attrName: "style_settings__menu__badge",
            })}

            {/* Element: Sub Menu Badge*/}
            {elements.style({
                attrName: "style_settings__sub_menu__badge",
            })}

            {/* Element: Menu Tooltip*/}
            {elements.style({
                attrName: "style_settings__menu__tooltip",
            })}

            {/* Element: Sub Menu Tooltip*/}
            {elements.style({
                attrName: "style_settings__sub_menu__tooltip",
            })}

            <CommonStyle
                selector={`${main_css_element}  li:not(:first-child),${main_css_element} .df-vertical-inside-mega-menu li:first-child`}
                attr={attrs?.style_settings__menu__item_gap?.decoration}
                property="margin-top"
                important={true}
            />
            <CommonStyle
                selector={`${main_css_element}  .df-vertical-sub-menu:not(.df-vertical-col-added):not(.df-vertical-inside-mega-menu) > li:not(:first-child)`}
                attr={attrs?.style_settings__sub_menu__item_gap?.decoration}
                property="margin-top"
                important={true}
            />
            <CommonStyle
                selector={`${main_css_element}  li.df-vertical-menu-item .df-vertical-sub-menu.df-vertical-col-added .df-vertical-sub-menu li`}
                attr={attrs?.style_settings__mega_menu__item_gap?.decoration}
                property="margin-top"
                important={true}
            />
            <CommonStyle
                selector={`${main_css_element} li.df-vertical-menu-item .df-vertical-sub-menu.df-vertical-col-added`}
                attr={attrs?.style_settings__mega_menu__column_gap?.decoration}
                property="gap"
                important={true}
            />
            <CommonStyle
                selector={`${main_css_element} li.df-vertical-menu-item .df-vertical-sub-menu.df-vertical-col-added`}
                attr={attrs?.style_settings__mega_menu__columns?.decoration}
                property="gap"
                important={true}
            />
            <CommonStyle
                selector={`${orderClass}.df_vertical_menu_main_container.df_enable_sub_menu__tree_view .df-vertical-menu-nav-wrap  ul.df-vertical-menu-nav .df-vertical-sub-menu:not(.df-vertical-col-added):not(.df-vertical-inside-mega-menu):not(.df-vertical-mega-menu-item):not(.df-vertical-menu-nav-level-1)`}
                attr={
                    attrs?.style_settings__sub_menu__tree_view_spacing
                        ?.innerContent
                }
                property="padding-left"
                important={true}
            />
            <CommonStyle
                selector={`${main_css_element} li.df-vertical-menu-item > a .df_vertical_border_hover_effect:after, ${main_css_element} li.df-vertical-menu-item > a .df_vertical_border_hover_effect:before`}
                attr={attrs?.settings__select_animation_color?.decoration}
                property="background"
                important={true}
            />
            <CommonStyle
                selector={`${main_css_element} li.df-vertical-menu-item > a .df_vertical_border_hover_effect:after, ${main_css_element} li.df-vertical-menu-item > a .df_vertical_border_hover_effect:before`}
                attr={attrs?.settings__animation__line_weight?.innerContent}
                property="height"
                important={true}
            />
        </StyleContainer>
    );
};
