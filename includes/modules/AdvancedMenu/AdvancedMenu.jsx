// External Dependencies
import React, { Component, Fragment } from 'react';
import lodash from 'lodash';
import axios from 'axios';

import utility from '../../../scripts/df_scripts/utilities';

import MenuLayout from './MenuLayout';

// Internal Dependencies
import './style.css';

const jQuery = window.jQuery;

class AdvancedMenu extends Component {

    static slug = 'difl_advancedmenu';

    constructor(props) {
        super(props);

        this.state = {
          menuData: [],
          menuDataSmall: [],
          navMenus: {},
          _request: false,
          curentPageId:''
        }

        if(!window.DiviFlash) {
            window.DiviFlash = {}
        }
        if(window.DiviFlash && !window.DiviFlash.menus) {
            window.DiviFlash.menus = {}
        }
        if(!window.DF_Dynamics) {
            window.DF_Dynamics = {}
        }
    }

    componentDidMount() {
        if(window.ETBuilderBackend.postId){
            this.setState({curentPageId: window.ETBuilderBackend.postId})
        }
    }

    componentDidUpdate() {
        this.get_menu_items()
        if(this.state._request) {
            this.setState({_request: false});
        }
    }

    static css(props) {
        const utils = window.ET_Builder.API.Utils;
        const additionalCss = [];
        const menu_break_point = parseInt(props.break_point);

        const topRow = '%%order_class%% .top-row';
        const centerRow = '%%order_class%% .center-row';
        const bottomRow = '%%order_class%% .bottom-row';
        const menuItems = '%%order_class%% .df-normal-menu-wrap .df-menu-wrap .df-menu-nav>li.menu-item';
        additionalCss.push([{
            selector: menuItems,
            declaration: `overflow: visible;`,
        }]);   
        // break point
        if(window.ET_Builder.API.State.View_Mode.isDesktop()) {
            additionalCss.push([{
                selector: '%%order_class%% .df-mobile-menu-button:not(.df-am-item)',
                declaration: `display: none;`,
            }]);   
            additionalCss.push([{
                selector: '%%order_class%% .df-mobile-menu-wrap',
                declaration: `display: none;`,
            }]);
        }
         
        if(window.ET_Builder.API.State.View_Mode.isTablet() || 
            window.ET_Builder.API.State.View_Mode.isPhone()) {
            additionalCss.push([{
                selector: '%%order_class%% .df-normal-menu-wrap',
                declaration: `display: none;`,
            }]); 
            additionalCss.push([{
                selector: '%%order_class%% .hide_from_small',
                declaration: `display: none;`,
            }]);
        }  

        

        // background settings
        utility.process_new_background({
            'props': props,
            'base_name': 'top_row_bg',
            'context': 'top_row_bg_color',
            'additionalCSS': additionalCss,
            'selector': topRow
        });
        utility.process_new_background({
            'props': props,
            'base_name': 'center_row_bg',
            'context': 'center_row_bg_color',
            'additionalCSS': additionalCss,
            'selector': centerRow
        });
        utility.process_new_background({
            'props': props,
            'base_name': 'bottom_row_bg',
            'context': 'bottom_row_bg_color',
            'additionalCSS': additionalCss,
            'selector': bottomRow
        });
        utility.process_new_background({
            'props': props,
            'base_name': 'mslide_bg',
            'context': 'mslide_bg_color',
            'additionalCSS': additionalCss,
            'selector': '%%order_class%% .df-mobile-menu-wrap .df-mobile-menu'
        });
        // utility.df_process_bg({
        //     'props': props,
        //     'additionalCss': additionalCss,
        //     'key': 'top_row_background',
        //     'selector': topRow
        // });
        // utility.df_process_bg({
        //     'props': props,
        //     'additionalCss': additionalCss,
        //     'key': 'center_row_background',
        //     'selector': centerRow
        // });
        // utility.df_process_bg({
        //     'props': props,
        //     'additionalCss': additionalCss,
        //     'key': 'bottom_row_background',
        //     'selector': bottomRow
        // });
        // utility.df_process_bg({
        //     'props': props,
        //     'additionalCss': additionalCss,
        //     'key': 'mslide_background',
        //     'selector': '%%order_class%% .df-mobile-menu-wrap .df-mobile-menu'
        // });

        // spacing
        utility.process_margin_padding({
            'props': props,
            'key': 'top_row_margin',
            'additionalCss': additionalCss,
            'selector': topRow,
            'type': 'margin',
            'important': false
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'top_row_padding',
            'additionalCss': additionalCss,
            'selector': topRow,
            'type': 'padding',
            'important': false
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'center_row_margin',
            'additionalCss': additionalCss,
            'selector': centerRow,
            'type': 'margin',
            'important': false
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'center_row_padding',
            'additionalCss': additionalCss,
            'selector': centerRow,
            'type': 'padding',
            'important': false
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'bottom_row_margin',
            'additionalCss': additionalCss,
            'selector': bottomRow,
            'type': 'margin',
            'important': false
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'bottom_row_padding',
            'additionalCss': additionalCss,
            'selector': bottomRow,
            'type': 'padding',
            'important': false
        });

        // sizing
        utility.process_range_value({
            'props'             : props,
            'key'               : 'top_row_inner_width',
            'additionalCss'     : additionalCss,
            'selector'          : topRow + ' .row-inner',
            'type'              : 'max-width',
        });
        utility.process_range_value({
            'props'             : props,
            'key'               : 'center_row_inner_width',
            'additionalCss'     : additionalCss,
            'selector'          : centerRow + ' .row-inner',
            'type'              : 'max-width',
        });
        utility.process_range_value({
            'props'             : props,
            'key'               : 'bottom_row_inner_width',
            'additionalCss'     : additionalCss,
            'selector'          : bottomRow + ' .row-inner',
            'type'              : 'max-width',
        });


        return additionalCss;
    }

    get_the_menu = (menu_id) => {
        if( !menu_id ) return;

        const _this = this;
        axios({
            method: 'post',
            url: window.ETBuilderBackend.ajaxUrl,
            params: {
                action : 'df_am_menu'
            },
            data : {
                et_admin_load_nonce: window.et_fb_options.et_admin_load_nonce,
                menu_id: menu_id
            }
        })
        .then((response) => {
            let menus = _this.state.navMenus;
            if(!window.DiviFlash.menus) {
                window.DiviFlash.menus = {};
            }
            window.DiviFlash.menus[menu_id] = response.data.data;
            menus[menu_id] = response.data.data;
            _this.setState({navMenus: menus});
        })
        .then(() => {
            _this.setState({_request: true});
        })
        
    }

    get_menu_items = () => {
        const { content } = this.props;

        const { processFontIcon } = window.ET_Builder.API.Utils;

        let menu = {
            top_left: [],
            top_center: [],
            top_right: [],
            center_left: [],
            center_center: [],
            center_right: [],
            bottom_left: [],
            bottom_center: [],
            bottom_right: [],
            // offcanvas: [],
            mobile_slide: []
        }
        let menuSmall = {
            top_left: [],
            top_center: [],
            top_right: [],
            center_left: [],
            center_center: [],
            center_right: [],
            bottom_left: [],
            bottom_center: [],
            bottom_right: [],
        }

        if( !content ) return;

        lodash.map(content, (item, key) => {
            const object = {};

            const item_props = item.props.attrs;
            const childIndex = item.props.matching.slug + '_' +  item.props.shortcode_index;
            
            if( item_props && item_props !== 'select' ) {
                object.type = item_props.type;
                object.module_vb_class =  'et-module-' + item.props._key;
                object._class =  childIndex;
                object.indexClass = object._class;
                object._class =  item_props.hide_from_small && item_props.hide_from_small === 'on' ?
                    object._class + ' hide_from_small' : object._class;

                // woo cart
                object.cart_icon = item_props.cart_icon ? processFontIcon(item_props.cart_icon) : '';
                object.use_cart_count = item_props.use_cart_count ?
                    item_props.use_cart_count : 'off';
                object.use_cart_total = item_props.use_cart_total ?
                    item_props.use_cart_total : 'off';

                // social
                object.social = item_props.social && item_props.social;

                // content
                object.content = item.props.content && item.props.content;

                // search
                object.search_style = item_props.search_style && item_props.search_style;
                object.placeholder = item_props.placeholder && item_props.placeholder;
                object.search_icon = item_props.search_icon ? processFontIcon(item_props.search_icon) : 'U';
                object.search_tr_icon = item_props.search_tr_icon ? processFontIcon(item_props.search_tr_icon) : 'U';
                
                // button icon
                object.icon_btn_font_icon = item_props.icon_btn_font_icon ? processFontIcon(item_props.icon_btn_font_icon) : '9';
                object.icon_link_title = item_props.icon_link_title && item_props.icon_link_title;
                object.icon_box_url = item_props.icon_box_url && item_props.icon_box_url;
                object.icon_box_url_new_window = item_props.icon_box_url_new_window && item_props.icon_box_url_new_window;

                // Logo
                object.logo_upload = item_props.logo_upload && item_props.logo_upload;
                object.logo_url = item_props.logo_url && item_props.logo_url;
                object.sticky_logo = item_props.sticky_logo && item_props.sticky_logo;

                // button
                object.button_text = item_props.button_text && item_props.button_text;
                object.button_url = item_props.button_url && item_props.button_url;
                object.use_button_icon = item_props.use_button_icon && item_props.use_button_icon;
                object.button_font_icon = item_props.button_font_icon && processFontIcon(item_props.button_font_icon);
                object.button_icon_on_left = item_props.button_icon_on_left && item_props.button_icon_on_left;
                object.button_show_icon_on_hover = item_props.button_show_icon_on_hover && item_props.button_show_icon_on_hover;

                // mobile slide button
                if(item_props.use_mslide_btn === 'on') {
                    object.use_mslide_btn = item_props.use_mslide_btn && item_props.use_mslide_btn;
                    object.mslide_button_text = item_props.mslide_button_text && item_props.mslide_button_text;
                    object.mslide_button_url = item_props.mslide_button_url && item_props.mslide_button_url;
                    object.mslide_button_url_new_window = item_props.mslide_button_url_new_window && item_props.mslide_button_url_new_window;
                    object.mslide_use_button_icon = item_props.mslide_use_button_icon && item_props.mslide_use_button_icon;
                    object.mslide_button_font_icon = item_props.mslide_button_font_icon && processFontIcon(item_props.mslide_button_font_icon);
                    object.mslide_button_icon_on_left = item_props.mslide_button_icon_on_left && item_props.mslide_button_icon_on_left;
                }

                object.mm_trigger_icon = item_props.mm_trigger_icon && processFontIcon(item_props.mm_trigger_icon);
                
                if( item_props.type === 'menu' && item_props.menu !== 'custom' ) {
                    object.menu_id = item_props.menu_id;
                    object.desktop_menu = item_props.desktop_menu;
                    object.mobile_menu = item_props.mobile_menu;
                    object.use_item_hover = item_props.use_item_animation ? item_props.use_item_animation : 'off';
                    object.item_hover = item_props.menu_item_hover_anim ? item_props.menu_item_hover_anim : 'item-hover-1';
                    // if the id is not in the window object
                    // make an ajax call
                    if(!window.DiviFlash.menus || !window.DiviFlash.menus[item_props.menu_id]) {
                        this.get_the_menu(item_props.menu_id);
                    }
                }

                if(item_props.type === 'menu') {
                    menu = { 
                        ...menu, 
                        mobile_slide: [...menu.mobile_slide, object]
                    }
                }
                // arranging the items with position key
                if( item_props.menu_item_position ) {
                    menu = { 
                        ...menu, 
                        [item_props.menu_item_position]: [...menu[item_props.menu_item_position], object]
                    }
                    
                } else {
                    menu = { 
                        ...menu, 
                        center_left: [...menu.center_left, object]
                    }
                }
                // arranging the items with position key for small device
                if( item_props.menu_item_position_small ) {
                    menuSmall = { 
                        ...menuSmall, 
                        [item_props.menu_item_position_small]: [...menuSmall[item_props.menu_item_position_small], object]
                    }
                } else if (!item_props.menu_item_position_small) {
                    menuSmall = { 
                        ...menuSmall, 
                        center_left: [...menuSmall.center_left, object]
                    }
                }
            }
  
        })

        if(!lodash.isEqual(this.state.menuData, menu)) {
            this.setState({menuData: menu})
        }
        if(!lodash.isEqual(this.state.menuDataSmall, menuSmall)) {
            this.setState({ menuDataSmall: menuSmall})
        }
    }

    render() {
        const props = this.props;
        return(
            <React.Fragment>
                <MenuLayout 
                    dynamicData ={window.DF_Dynamics ? window.DF_Dynamics : {}}
                    menuData={this.state.menuData} 
                    menuDataSmall={this.state.menuDataSmall} 
                    _navMenus={this.state.navMenus}
                    _request={this.state._request}
                    showMobileSlide={this.props.show_mobile_slide}
                    menuIndex={ props.moduleInfo.orderClassName } 
                    data={props}
                />
                { props.content.length !== 0 ? props.content : '' }
            </React.Fragment>
        )
    }
}

export default AdvancedMenu;