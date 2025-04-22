// External Dependencies
import React, { Component, Fragment } from 'react';
import lodash from 'lodash';
import utility from '../../../scripts/df_scripts/utilities';
// Internal Dependencies
import './style.css';

class AdvancedMenuItem extends Component {

    static slug = 'difl_advancedmenuitem';

    static get_disabled_device(disabled) {
        if(disabled) {
            const devices = disabled.split("|");
            return devices;
        } return ['off', 'off', 'off'];
    }
    static processSubmitWidth(props, additionalCss) {
        const submitFontSize = props.search_icon_size ? props.search_icon_size : '14px';
        const containerSize = parseInt(submitFontSize) + 20;
        additionalCss.push([{
            selector: '%%order_class%% .df_am_searchsubmit',
            declaration: `
            width: ${containerSize}px;
            min-width: ${containerSize}px;
            height: ${containerSize}px;
            min-height: ${containerSize}px;`
        }]);
    }
    static css(props) {
        const utils = window.ET_Builder.API.Utils;
        const additionalCss = [];
        const disabled_on = AdvancedMenuItem.get_disabled_device(props.df_disabled_on);

        const manu_container = '%%order_class%% .df-normal-menu-wrap .df-menu-nav';
        const menu_item = '%%order_class%% .df-normal-menu-wrap .df-menu-nav>li>a';
        const menu_item_icon = '%%order_class%% .df-normal-menu-wrap .df-menu-nav>li>a .df-menu-icon';

        const submenu_container = '%%order_class%% .df-normal-menu-wrap .df-menu-wrap li:not(.df-mega-menu) ul:not(.df-inside-mega-menu)';
        const submenu_item = '%%order_class%% .df-normal-menu-wrap li:not(.df-mega-menu) .sub-menu:not(.df-custom-submenu):not(.df-inside-mega-menu) li.menu-item>a';
        const submenu_item_icon = '%%order_class%% .df-normal-menu-wrap li:not(.df-mega-menu) .sub-menu:not(.df-custom-submenu) .df-menu-icon';

        const mega_menu_contianer = "%%order_class%% .df-normal-menu-wrap .df-menu-wrap .df-menu-nav>li.df-mega-menu>ul";
        const mega_menu_item = "%%order_class%% .df-normal-menu-wrap .df-menu-wrap .df-menu-nav>li.df-mega-menu ul.df-inside-mega-menu li>a";
        const mega_menu_item_icon = '%%order_class%% .df-normal-menu-wrap li.df-mega-menu>ul.sub-menu:not(.df-custom-submenu) .df-menu-icon';

        const first_level_parent_icon        = "%%order_class%% .df-normal-menu-wrap .df-menu-wrap ul.df-menu-nav-level-0:not(.df-menu-nav-level-1) > li.menu-item-has-children > a > .df-menu-icon";
        const second_level_parent_icon       = "%%order_class%% .df-normal-menu-wrap .df-menu-wrap ul.df-menu-nav-level-1:not(.df-menu-nav-level-2) > div > li.menu-item-has-children > a > .df-menu-icon, %%order_class%% .df-normal-menu-wrap .df-menu-wrap ul.df-menu-nav-level-1:not(.df-menu-nav-level-2) > li.menu-item-has-children > a > .df-menu-icon";
        const third_level_parent_icon        = "%%order_class%% .df-normal-menu-wrap .df-menu-wrap ul.df-menu-nav-level-2:not(.df-menu-nav-level-3) > li.menu-item-has-children > a > .df-menu-icon";

        const first_level_child_icon        = "%%order_class%% .df-normal-menu-wrap .df-menu-wrap ul.df-menu-nav-level-1:not(.df-menu-nav-level-2) > li:not(.menu-item-has-children) > a > .df-menu-icon, .df-normal-menu-wrap .df-menu-wrap ul.df-menu-nav-level-1:not(.df-menu-nav-level-2) > div > li:not(.menu-item-has-children) > a > .df-menu-icon";
        const second_level_child_icon       = "%%order_class%% .df-normal-menu-wrap .df-menu-wrap ul.df-menu-nav-level-2:not(.df-menu-nav-level-3) > li:not(.menu-item-has-children) > a > .df-menu-icon";
        const third_level_child_icon        = "%%order_class%% .df-normal-menu-wrap .df-menu-wrap ul.df-menu-nav-level-3 > li:not(.menu-item-has-children) > a > .df-menu-icon";

        const mslide_item = '.df-mobile-menu %%order_class%% li.menu-item>a';
        const mslide_item_icon = '.df-mobile-menu %%order_class%% li.menu-item>a .df-menu-icon';
        const mslide_trigger_button = '%%order_class%% .df-mobile-menu-button';
        const mslide_button = '%%order_class%%_mslide_btn';
        let url ='';
        if(window.ETBuilderBackend.currentPage.permalink){
            url = window.ETBuilderBackend.currentPage.permalink;
        }
        // Original URL
       //var url = window.ETBuilderBackend.currentPage.permalink;

        // Remove everything after the question mark
        const currentPage = url.split('?')[0];
        const currentPageSelector = "%%order_class%% .df-normal-menu-wrap .df-menu-nav>li>a[href='"+currentPage+"']";
        const submenuPageSelector = "%%order_class%% .df-normal-menu-wrap li:not(.df-mega-menu) .sub-menu:not(.df-custom-submenu):not(.df-inside-mega-menu)>li>a[href='"+currentPage+"'], %%order_class%% .df-normal-menu-wrap .df-menu-wrap .df-menu-nav>li.df-mega-menu li>a[href='"+currentPage+"']";
        // background
        utility.process_new_background({
            'props': props,
            'base_name': 'menu_item_bg',
            'context': 'menu_item_bg_color',
            'additionalCSS': additionalCss,
            'selector': menu_item
        });
        utility.process_new_background({
            'props': props,
            'base_name': 'submenu_container_bg',
            'context': 'submenu_container_bg_color',
            'additionalCSS': additionalCss,
            'selector': submenu_container,
            'important': true
        });
        utility.process_new_background({
            'props': props,
            'base_name': 'submenu_item_bg',
            'context': 'submenu_item_bg_color',
            'additionalCSS': additionalCss,
            'selector': submenu_item,
            'important': true
        });
        utility.process_new_background({
            'props': props,
            'base_name': 'mslide_item_bg',
            'context': 'mslide_item_bg_color',
            'additionalCSS': additionalCss,
            'selector': mslide_item,
            'important': true
        });
        utility.process_new_background({
            'props': props,
            'base_name': 'mslide_button_bg',
            'context': 'mslide_button_bg_color',
            'additionalCSS': additionalCss,
            'selector': mslide_button,
            'important': true
        });
        utility.process_new_background({
            'props': props,
            'base_name': 'mm_trigger_bg',
            'context': 'mm_trigger_bg_color',
            'additionalCSS': additionalCss,
            'selector': mslide_trigger_button,
            'important': true
        });
        utility.process_new_background({
            'props': props,
            'base_name': 'mega_menu_bg',
            'context': 'mega_menu_bg_color',
            'additionalCSS': additionalCss,
            'selector': mega_menu_contianer,
            'important': true
        });
        utility.process_new_background({
            'props': props,
            'base_name': 'mega_menuitem_bg',
            'context': 'mega_menuitem_bg_color',
            'additionalCSS': additionalCss,
            'selector': mega_menu_item,
            'important': true
        });

        // mega menu
        additionalCss.push([{
            selector: mega_menu_contianer,
            declaration: `gap: ${props.maga_menu_columgap} !important;`
        }]);
        utility.process_color({
            'props': props,
            'key': 'megamenu_item_icon_color',
            'additionalCss': additionalCss,
            'selector': mega_menu_item_icon,
            'type': 'color',
        });
        utility.process_range_value({
            'props': props,
            'key': 'megamenu_item_icon_size',
            'additionalCss': additionalCss,
            'default': '14px',
            'selector': mega_menu_item_icon,
            'type': 'font-size',
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'megamenu_container_padding',
            'additionalCss': additionalCss,
            'selector': mega_menu_contianer,
            'type': 'padding',
            'important': true
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'megamenu_item_padding',
            'additionalCss': additionalCss,
            'selector': mega_menu_item,
            'type': 'padding',
            'important': true
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'megamenu_item_margin',
            'additionalCss': additionalCss,
            'selector': mega_menu_item,
            'type': 'margin',
            'important': true
        });

        // Menu Parents Icon start
        utility.process_color({
            'props': props,
            'key': 'menu_1st_parent_icon_color',
            'additionalCss': additionalCss,
            'selector': first_level_parent_icon,
            'type': 'color',
            'important': true,
        });
        utility.process_color({
            'props': props,
            'key': 'menu_2nd_parent_icon_color',
            'additionalCss': additionalCss,
            'selector': second_level_parent_icon,
            'type': 'color',
            'important': true,
        });
        utility.process_color({
            'props': props,
            'key': 'menu_3rd_parent_icon_color',
            'additionalCss': additionalCss,
            'selector': third_level_parent_icon,
            'type': 'color',
            'important': true,
        });

        utility.process_color({
            'props': props,
            'key': 'menu_1st_parent_icon_background',
            'additionalCss': additionalCss,
            'selector': first_level_parent_icon,
            'type': 'background-color',
            'important': true,
        });
        utility.process_color({
            'props': props,
            'key': 'menu_2nd_parent_icon_background',
            'additionalCss': additionalCss,
            'selector': second_level_parent_icon,
            'type': 'background-color',
            'important': true,
        });
        utility.process_color({
            'props': props,
            'key': 'menu_3rd_parent_icon_background',
            'additionalCss': additionalCss,
            'selector': third_level_parent_icon,
            'type': 'background-color',
            'important': true,
        });

        utility.process_range_value({
            'props': props,
            'key': 'menu_1st_parent_icon_size',
            'additionalCss': additionalCss,
            'default': '14px',
            'selector': first_level_parent_icon,
            'type': 'font-size',
        });
        utility.process_range_value({
            'props': props,
            'key': 'menu_2nd_parent_icon_size',
            'additionalCss': additionalCss,
            'default': '14px',
            'selector': second_level_parent_icon,
            'type': 'font-size',
        });
        utility.process_range_value({
            'props': props,
            'key': 'menu_3rd_parent_icon_size',
            'additionalCss': additionalCss,
            'default': '14px',
            'selector': third_level_parent_icon,
            'type': 'font-size',
        });

        utility.process_margin_padding({
            'props': props,
            'key': 'menu_1st_parent_icon_margin',
            'additionalCss': additionalCss,
            'selector': first_level_parent_icon,
            'type': 'margin',
            'important': true
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'menu_2nd_parent_icon_margin',
            'additionalCss': additionalCss,
            'selector': second_level_parent_icon,
            'type': 'margin',
            'important': true
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'menu_3rd_parent_icon_margin',
            'additionalCss': additionalCss,
            'selector': third_level_parent_icon,
            'type': 'margin',
            'important': true
        });

        utility.process_margin_padding({
            'props': props,
            'key': 'menu_1st_parent_icon_padding',
            'additionalCss': additionalCss,
            'selector': first_level_parent_icon,
            'type': 'padding',
            'important': true
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'menu_2nd_parent_icon_padding',
            'additionalCss': additionalCss,
            'selector': second_level_parent_icon,
            'type': 'padding',
            'important': true
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'menu_3rd_parent_icon_padding',
            'additionalCss': additionalCss,
            'selector': third_level_parent_icon,
            'type': 'padding',
            'important': true
        });
        // Menu Parents Icon end

        // Menu Childs Icon start
        utility.process_color({
            'props': props,
            'key': 'menu_1st_child_icon_color',
            'additionalCss': additionalCss,
            'selector': first_level_child_icon,
            'type': 'color',
            'important': true,
        });
        utility.process_color({
            'props': props,
            'key': 'menu_2nd_child_icon_color',
            'additionalCss': additionalCss,
            'selector': second_level_child_icon,
            'type': 'color',
            'important': true,
        });
        utility.process_color({
            'props': props,
            'key': 'menu_3rd_child_icon_color',
            'additionalCss': additionalCss,
            'selector': third_level_child_icon,
            'type': 'color',
            'important': true,
        });

        utility.process_color({
            'props': props,
            'key': 'menu_1st_child_icon_background',
            'additionalCss': additionalCss,
            'selector': first_level_child_icon,
            'type': 'background-color',
            'important': true,
        });
        utility.process_color({
            'props': props,
            'key': 'menu_2nd_child_icon_background',
            'additionalCss': additionalCss,
            'selector': second_level_child_icon,
            'type': 'background-color',
            'important': true,
        });
        utility.process_color({
            'props': props,
            'key': 'menu_3rd_child_icon_background',
            'additionalCss': additionalCss,
            'selector': third_level_child_icon,
            'type': 'background-color',
            'important': true,
        });

        utility.process_range_value({
            'props': props,
            'key': 'menu_1st_child_icon_size',
            'additionalCss': additionalCss,
            'default': '14px',
            'selector': first_level_child_icon,
            'type': 'font-size',
        });
        utility.process_range_value({
            'props': props,
            'key': 'menu_2nd_child_icon_size',
            'additionalCss': additionalCss,
            'default': '14px',
            'selector': second_level_child_icon,
            'type': 'font-size',
        });
        utility.process_range_value({
            'props': props,
            'key': 'menu_3rd_child_icon_size',
            'additionalCss': additionalCss,
            'default': '14px',
            'selector': third_level_child_icon,
            'type': 'font-size',
        });

        utility.process_margin_padding({
            'props': props,
            'key': 'menu_1st_child_icon_margin',
            'additionalCss': additionalCss,
            'selector': first_level_child_icon,
            'type': 'margin',
            'important': true
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'menu_2nd_child_icon_margin',
            'additionalCss': additionalCss,
            'selector': second_level_child_icon,
            'type': 'margin',
            'important': true
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'menu_3rd_child_icon_margin',
            'additionalCss': additionalCss,
            'selector': third_level_child_icon,
            'type': 'margin',
            'important': true
        });

        utility.process_margin_padding({
            'props': props,
            'key': 'menu_1st_child_icon_padding',
            'additionalCss': additionalCss,
            'selector': first_level_child_icon,
            'type': 'padding',
            'important': true
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'menu_2nd_child_icon_padding',
            'additionalCss': additionalCss,
            'selector': second_level_child_icon,
            'type': 'padding',
            'important': true
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'menu_3rd_child_icon_padding',
            'additionalCss': additionalCss,
            'selector': third_level_child_icon,
            'type': 'padding',
            'important': true
        });
        // Menu Childs Icon end

        if(disabled_on[0] == 'on' && window.ET_Builder.API.State.View_Mode.isDesktop()) {
            additionalCss.push([{
                selector: '%%order_class%%',
                declaration: `opacity: .3 !important;`
            }]);
        }
        if(disabled_on[1] == 'on' && (window.ET_Builder.API.State.View_Mode.isTablet() ||
        window.ET_Builder.API.State.View_Mode.isPhone())) {
            additionalCss.push([{
                selector: '%%order_class%%',
                declaration: `opacity: .3 !important;`
            }]);
        }

        if(props.submenu_distance_desktop && props.submenu_distance_desktop !== '') {
            additionalCss.push([{
                selector: '%%order_class%% .df-menu-nav>li>.sub-menu',
                declaration: `margin-top: ${props.submenu_distance_desktop};`
            }]);
            additionalCss.push([{
                selector: '%%order_class%% .df-menu-nav>li>.sub-menu:after',
                declaration: `height: ${props.submenu_distance_desktop}; top: -${props.submenu_distance_desktop};`
            }]);
        }

        // search styles
        utility.process_icon_font_style({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'search_icon',
            'selector'          : '%%order_class%% .df_am_searchsubmit'
        })
        utility.process_color({
            'props': props,
            'key': 'search_icon_color',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df_am_searchsubmit',
            'type': 'color',
        })
        utility.process_color({
            'props': props,
            'key': 'search_icon_bg',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df_am_searchsubmit',
            'type': 'background-color',
        })
        utility.process_color({
            'props': props,
            'key': 'search_input_bgcolor',
            'additionalCss': additionalCss,
            'selector': '%%order_class%%',
            'type': 'background-color',
        })
        utility.process_range_value({
            'props': props,
            'key': 'search_icon_size',
            'additionalCss': additionalCss,
            'default': '2px',
            'selector': '%%order_class%% .df_am_searchsubmit',
            'type': 'font-size',
        });
        AdvancedMenuItem.processSubmitWidth(props, additionalCss);

        // style 5
        utility.process_icon_font_style({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'search_tr_icon',
            'selector'          : '%%order_class%%.df-am-search-button'
        })
        utility.process_color({
            'props': props,
            'key': 'search_tr_icon_color',
            'additionalCss': additionalCss,
            'selector': '%%order_class%%.df-am-search-button',
            'type': 'color',
        })
        utility.process_color({
            'props': props,
            'key': 'search_tr_icon_bg',
            'additionalCss': additionalCss,
            'selector': '%%order_class%%.df-am-search-button',
            'type': 'background-color',
        })
        utility.process_range_value({
            'props': props,
            'key': 'search_tr_icon_size',
            'additionalCss': additionalCss,
            'default': '14px',
            'selector': '%%order_class%%.df-am-search-button',
            'type': 'font-size',
        });
        // search popup
        utility.process_color({
            'props': props,
            'key': 'search_popup_bg',
            'additionalCss': additionalCss,
            'selector': '%%order_class%%_modal.df-searchbox-style-5',
            'type': 'background-color',
        })
        utility.process_color({
            'props': props,
            'key': 'search_popup_icon_color',
            'additionalCss': additionalCss,
            'selector': '%%order_class%%_modal.df-searchbox-style-5 .df_am_searchsubmit',
            'type': 'color',
        })
        utility.process_color({
            'props': props,
            'key': 'search_popup_close_color',
            'additionalCss': additionalCss,
            'selector': '%%order_class%%_modal.df-searchbox-style-5 .serach-box-close',
            'type': 'color',
        })
        utility.process_color({
            'props': props,
            'key': 'search_popup_input_color',
            'additionalCss': additionalCss,
            'selector': '%%order_class%%_modal.df-searchbox-style-5 [type="text"]',
            'type': 'color',
        })
        utility.process_color({
            'props': props,
            'key': 'search_popup_line_color',
            'additionalCss': additionalCss,
            'selector': '%%order_class%%_modal.df-searchbox-style-5 form',
            'type': 'border-color',
            'important': true
        })

        // menu item animation
        if(props.use_item_animation === 'on') {
            // line hover 1
            if(props.menu_item_hover_anim === 'item-hover-1' || !props.menu_item_hover_anim) {
                additionalCss.push([{
                    selector: '%%order_class%%.has-item-animation.item-hover-1 .menu-item>a:after',
                    declaration: `height: ${props.line_weight};`
                }]);
                additionalCss.push([{
                    selector: '%%order_class%%.has-item-animation.item-hover-1 .df-menu-nav > .menu-item>a:after',
                    declaration: `background-color: ${props.line_color};`
                }]);
            }
            // line hover 2
            if(props.menu_item_hover_anim === 'item-hover-2') {
                additionalCss.push([{
                    selector: `%%order_class%%.has-item-animation.item-hover-2 .menu-item>a:before,
                        %%order_class%%.has-item-animation.item-hover-2 .menu-item>a:after`,
                    declaration: `height: ${props.line_weight};`
                }]);
                additionalCss.push([{
                    selector: `%%order_class%%.has-item-animation.item-hover-2 .df-menu-nav > .menu-item>a:before,
                    %%order_class%%.has-item-animation.item-hover-2 .df-menu-nav > .menu-item>a:after`,
                    declaration: `background-color: ${props.line_color};`
                }]);
            }
            // line hover 3
            if(props.menu_item_hover_anim === 'item-hover-3') {
                additionalCss.push([{
                    selector: `%%order_class%%.has-item-animation.item-hover-3 .menu-item>a:before,
                        %%order_class%%.has-item-animation.item-hover-3 .menu-item>a:after`,
                    declaration: `height: ${props.line_weight};`
                }]);
                additionalCss.push([{
                    selector: `%%order_class%%.has-item-animation.item-hover-3 .df-menu-nav > .menu-item>a:before,
                    %%order_class%%.has-item-animation.item-hover-3 .df-menu-nav > .menu-item>a:after`,
                    declaration: `background-color: ${props.line_color};`
                }]);
            }
            // line hover 4
            if(props.menu_item_hover_anim === 'item-hover-4') {
                additionalCss.push([{
                    selector: `%%order_class%%.has-item-animation.item-hover-4 .menu-item>a:before,
                        %%order_class%%.has-item-animation.item-hover-4 .menu-item>a:after`,
                    declaration: `width: ${props.line_weight};`
                }]);
                additionalCss.push([{
                    selector: `%%order_class%%.has-item-animation.item-hover-4 .df-menu-nav > .menu-item>a:before,
                    %%order_class%%.has-item-animation.item-hover-4 .df-menu-nav > .menu-item>a:after`,
                    declaration: `background-color: ${props.line_color};`
                }]);
                // Line Space Between Item.
                const line_space_between_item = props.line_space_between_item ? props.line_space_between_item : '7px';
                additionalCss.push([{
                    selector: `%%order_class%%.has-item-animation.item-hover-4 .df-menu-nav>.menu-item.df-hover>a:before`,
                    declaration: `left: -${line_space_between_item};`
                }]);
                additionalCss.push([{
                    selector: `%%order_class%%.has-item-animation.item-hover-4 .df-menu-nav>.menu-item.df-hover>a:after`,
                    declaration: `right: -${line_space_between_item};`
                }]);
            }
            // line hover 5
            if(props.menu_item_hover_anim === 'item-hover-5') {
                additionalCss.push([{
                    selector: `%%order_class%%.has-item-animation.item-hover-5 .df-menu-nav > .menu-item>a:before,
                    %%order_class%%.has-item-animation.item-hover-5 .df-menu-nav > .menu-item>a:after`,
                    declaration: `background-color: ${props.line_color};`
                }]);
                const line_space_between_item = props.line_space_between_item ? props.line_space_between_item : '7px';
                additionalCss.push([{
                    selector: `%%order_class%%.has-item-animation.item-hover-5 .df-menu-nav>.menu-item.df-hover>a:before`,
                    declaration: `left: -${line_space_between_item};`
                }]);
                additionalCss.push([{
                    selector: `%%order_class%%.has-item-animation.item-hover-5 .df-menu-nav>.menu-item.df-hover>a:after`,
                    declaration: `right: -${line_space_between_item};`
                }]);
            }
        }

        // divider
        utility.process_range_value({
            'props': props,
            'key': 'divider_width',
            'additionalCss': additionalCss,
            'default': '2px',
            'selector': '%%order_class%%.df-vr-divider',
            'type': 'width',
        });
        utility.process_color({
            'props': props,
            'key': 'divider_color',
            'additionalCss': additionalCss,
            'selector': '%%order_class%%.df-vr-divider',
            'type': 'background-color',
        });
        // icon box
        utility.process_color({
            'props': props,
            'key': 'icon_btn_icon_color',
            'additionalCss': additionalCss,
            'selector': '%%order_class%%.df-icon-button',
            'type': 'color',
            'important': true
        });
        if( "icon_box" === props.type ){
            additionalCss.push([{
                selector: `%%order_class%%`,
                declaration: `overflow: visible !important;`
            }]);
        }
        if( "icon_box" === props.type && ( props.icon_btn_icon_color__sticky_enabled && props.icon_btn_icon_color__sticky_enabled.includes('on|') )){
            const sticky_icon_color = props.icon_btn_icon_color__sticky ? props.icon_btn_icon_color__sticky : "#000000";
            additionalCss.push([{
                selector: `.et_pb_sticky %%order_class%%.df-icon-button`,
                declaration: `color: ${sticky_icon_color} !important;`
            }]);
        }
        utility.process_range_value({
            'props': props,
            'key': 'icon_btn_icon_size',
            'additionalCss': additionalCss,
            'default': '18px',
            'selector': '%%order_class%%.df-icon-button',
            'type': 'font-size',
            'important': true
        });
        // cart styles
        utility.process_icon_font_style({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'cart_icon',
            'selector'          : '%%order_class%% .df-cart-info span.cart-icon'
        });
        utility.process_color({
            'props': props,
            'key': 'cart_icon_color',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-cart-info span.cart-icon',
            'type': 'color',
        });
        utility.process_range_value({
            'props': props,
            'key': 'cart_icon_size',
            'additionalCss': additionalCss,
            'default': '32px',
            'selector': '%%order_class%% .df-cart-info span.cart-icon',
            'type': 'font-size',
        });
        utility.process_color({
            'props': props,
            'key': 'cart_count_color',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-cart-info span.cart-item-count',
            'type': 'color',
        });
        utility.process_color({
            'props': props,
            'key': 'cart_count_bg',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-cart-info span.cart-item-count',
            'type': 'background-color',
        });
        utility.process_color({
            'props': props,
            'key': 'cart_total_color',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-cart-info span.cart-total',
            'type': 'color',
        });
        // mobile button
        if(props.mslide_button_icon_on_left === 'on') {
            additionalCss.push([{
                selector: '%%order_class%%_mslide_btn .df-mslide-button-icon',
                declaration: `margin-right: 5px;`
            }]);
        } else {
            additionalCss.push([{
                selector: '%%order_class%%_mslide_btn .df-mslide-button-icon',
                declaration: `margin-left: 5px;`
            }]);
        }
        utility.process_icon_font_style({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'mslide_button_font_icon',
            'selector'          : '%%order_class%%_mslide_btn .df-mslide-button-icon'
        })
        utility.process_margin_padding({
            'props': props,
            'key': 'mslide_button_padding',
            'additionalCss': additionalCss,
            'selector': mslide_button,
            'type': 'padding',
            'important': true
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'mslide_button_margin',
            'additionalCss': additionalCss,
            'selector': mslide_button,
            'type': 'margin',
            'important': true
        });

        // button icons
        if(props.button_icon_on_left === 'on') {
            additionalCss.push([{
                selector: '%%order_class%% .df-am-button-icon',
                declaration: `margin-right: 5px;`
            }]);
        } else {
            additionalCss.push([{
                selector: '%%order_class%% .df-am-button-icon',
                declaration: `margin-left: 5px;`
            }]);
        }

        // show icon on hover
        if ('off' !== props.button_show_icon_on_hover) {
            const icon_size = "" !== props.content_body_font_size ? props.content_body_font_size : "14px";

            if ('on' !== props.button_icon_on_left ){
                additionalCss.push([{
                    selector: '%%order_class%%.df-menu-button.show_icon_on_hover .df-am-button-icon',
                    declaration: `margin: 0px; margin-right: -${parseInt(icon_size)}px !important; opacity: 0 !important;`,
                }]);
                additionalCss.push([{
                    selector: '%%order_class%%.df-menu-button.show_icon_on_hover:hover .df-am-button-icon',
                    declaration: `margin-right:0px !important; opacity: 1 !important;`
                }]);


            }
            else {
                additionalCss.push([{
                    selector: '%%order_class%%.df-menu-button.show_icon_on_hover .df-am-button-icon',
                    declaration: `margin: 0px; margin-left: -${parseInt(icon_size)}px !important; opacity: 0 !important;`,
                }]);
                additionalCss.push([{
                    selector: '%%order_class%%.df-menu-button.show_icon_on_hover:hover .df-am-button-icon',
                    declaration: `margin-left:0px !important; opacity: 1 !important;`
                }]);
            }
            additionalCss.push([{
                selector: '.df-am-container .df-am-col.show_icon_on_hover',
                declaration: `min-width: 140px;`,
            }]);
        }

        utility.process_icon_font_style({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'button_font_icon',
            'selector'          : '%%order_class%% .df-am-button-icon'
        })
        utility.process_icon_font_style({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'icon_btn_font_icon',
            'selector'          : '%%order_class%%.df-icon-button span'
        })

        utility.process_icon_font_style({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'search_icon',
            'selector'          : '%%order_class%% .df_am_searchsubmit, %%order_class%%_modal .df_am_searchsubmit'
        })

        utility.process_icon_font_style({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'mm_trigger_icon',
            'selector'          : mslide_trigger_button
        })

        utility.process_color({
            'props': props,
            'key': 'mm_icon_color',
            'additionalCss': additionalCss,
            'selector': mslide_trigger_button,
            'type': 'color',
            'important': true
        });
        utility.process_range_value({
            'props': props,
            'key': 'mm_icon_size',
            'additionalCss': additionalCss,
            'default': '32px',
            'selector': mslide_trigger_button,
            'type': 'font-size',
        });

        additionalCss.push([{
            selector: '%%order_class%%.et_pb_module',
            declaration: `display: none;`
        }]);

        // menu items
        utility.process_range_value({
            'props': props,
            'key': 'menu_item_gap',
            'additionalCss': additionalCss,
            'default': '20px',
            'selector': manu_container,
            'type': 'gap',
            'important': true
        });
        utility.process_color({
            'props': props,
            'key': 'menu_icon_color',
            'additionalCss': additionalCss,
            'selector': menu_item_icon,
            'type': 'color'
        });
        utility.process_range_value({
            'props': props,
            'key': 'menu_item_icon_size',
            'additionalCss': additionalCss,
            'default': '14px',
            'selector': menu_item_icon,
            'type': 'font-size',
            'important': true
        });
        utility.process_range_value({
            'props': props,
            'key': 'menu_item_icon_size',
            'additionalCss': additionalCss,
            'default': '14px',
            'selector': menu_item_icon,
            'type': 'font-size',
            'important': true
        });

        utility.process_margin_padding({
            'props': props,
            'key': 'menu_item_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-normal-menu-wrap .df-menu-nav>li>a',
            'type': 'margin',
            'important': true
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'menu_item_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-normal-menu-wrap .df-menu-nav>li>a',
            'type': 'padding',
            'important': true
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'mmenu_trigger_padding',
            'additionalCss': additionalCss,
            'selector': mslide_trigger_button,
            'type': 'padding',
            'important': true
        });
        // submenu items
        utility.process_color({
            'props': props,
            'key': 'submenu_icon_color',
            'additionalCss': additionalCss,
            'selector': submenu_item_icon,
            'type': 'color'
        });
        utility.process_range_value({
            'props': props,
            'key': 'submenu_item_icon_size',
            'additionalCss': additionalCss,
            'default': '14px',
            'selector': submenu_item_icon,
            'type': 'font-size',
            'important': true
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'submenu_item_margin',
            'additionalCss': additionalCss,
            'selector': submenu_item,
            'type': 'margin',
            'important': true
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'submenu_item_padding',
            'additionalCss': additionalCss,
            'selector': submenu_item,
            'type': 'padding',
            'important': true
        });

        // active state
        utility.process_color({
            'props': props,
            'key': 'top_level_menu_active_color',
            'additionalCss': additionalCss,
            'selector': currentPageSelector,
            'type': 'color',
            'important': true
        });

        utility.process_new_background({
            'props': props,
            'base_name': 'top_lebel_menu_active_link_bg',
            'context': 'top_lebel_menu_active_link_bg_color',
            'additionalCSS': additionalCss,
            'selector': currentPageSelector
        });

        utility.process_color({
            'props': props,
            'key': 'top_level_menu_active_border_color',
            'additionalCss': additionalCss,
            'selector': currentPageSelector,
            'type': 'border-color',
            'important': true
        });

        utility.process_color({
            'props': props,
            'key': 'sub_menu_active_color',
            'additionalCss': additionalCss,
            'selector': submenuPageSelector,
            'type': 'color',
            'important': true
        });

        utility.process_new_background({
            'props': props,
            'base_name': 'sub_menu_active_link_bg',
            'context': 'sub_menu_active_link_bg_color',
            'additionalCSS': additionalCss,
            'selector': submenuPageSelector
        });

        utility.process_color({
            'props': props,
            'key': 'sub_menu_active_border_color',
            'additionalCss': additionalCss,
            'selector': submenuPageSelector,
            'type': 'border-color',
            'important': true
        });

        // mobile slide
        utility.process_color({
            'props': props,
            'key': 'mm_item_icon_color',
            'additionalCss': additionalCss,
            'selector': mslide_item_icon,
            'type': 'color'
        });
        utility.process_range_value({
            'props': props,
            'key': 'mm_item_icon_size',
            'additionalCss': additionalCss,
            'default': '14px',
            'selector': mslide_item_icon,
            'type': 'font-size',
            'important': true
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'mslide_item_margin',
            'additionalCss': additionalCss,
            'selector': mslide_item,
            'type': 'margin',
            'important': true
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'mslide_item_padding',
            'additionalCss': additionalCss,
            'selector': mslide_item,
            'type': 'padding',
            'important': true
        });

        // fix the divider height for the VB
        if(props.type === 'divider') {
            if(!props.height) {
                additionalCss.push([{
                    selector: '%%order_class%%',
                    declaration: `height: 100% !important;`
                }]);
            }
        }

        return additionalCss;
    }

    render() {
        const moduleIndex = this.props.moduleInfo.orderClassName;

        if(!window.DF_Dynamics[moduleIndex]) {
            window.DF_Dynamics[moduleIndex] = {}
        }
        window.DF_Dynamics[moduleIndex] = {
            ...window.DF_Dynamics[moduleIndex],
            ...this.props.dynamic
        };
        return false;
    }
}

export default AdvancedMenuItem;
