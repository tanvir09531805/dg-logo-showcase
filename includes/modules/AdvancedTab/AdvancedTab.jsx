// External Dependencies
import React, { Component } from 'react';
import _ from 'lodash';
// import _ from 'lodash';
import $ from 'jquery';
import utility from '../../../scripts/df_scripts/utilities';
// import hcSticky from '../../../assets/scripts/lib/hc-sticky.js';
import hcSticky from '../../../public/js/lib/hc-sticky.js';
import '../../../public/js/advancedTabNavigationLinkController'
// Internal Dependencies
import './style.css';

var lodash = _.noConflict();


class AdvancedTab extends Component {
    static slug = 'difl_advancedtab';
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            active_child_content: '',
            active_child: {},
            library_item_data: {
                content_id: '',
                content: '',
                sticky: null,

            },
            child_tab_image : '',
            child_title : '',
            child_subtitle: ''
        }
        this.wrap = React.createRef();
        this.content_wrapper = React.createRef();
        this.navwrap = React.createRef();
        this.get_active_child = this.get_active_child.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);
        this.df_at_sticky = this.df_at_sticky.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        if(this._isMounted) {
            this.get_active_child(this.get_default_active_child_index());
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidUpdate(prevProps, prevState) {
        const _this = this;
        const props = _this.props;
        if (_this._isMounted === true) {
            if (lodash.isEmpty(this.state.active_child)) {
                _this.get_active_child(0);
            }
        }
        _this.df_at_sticky();

    }

    df_at_sticky(){
        const props = this.props;
        if (this.wrap.current) {
            const sticky_selector = this.wrap.current.querySelector('.df_at_nav_wrap');
            const sticky_container = this.wrap.current;

            const distance          = props.sticky_nav_distance ?
                                    props.sticky_nav_distance : 55;
            const distance_tablet   = props.sticky_nav_distance_tablet ?
                                    props.sticky_nav_distance_tablet : distance;
            const distance_phone    = props.sticky_nav_distance_phone ?
                                    props.sticky_nav_distance_phone : distance_tablet;

            if(this.props.use_sticky_nav === 'on' && !this.state.sticky) {
                var Sticky = new hcSticky(sticky_selector, {
                    stickTo: sticky_container,
                    top: parseInt(distance),
                    responsive: {
                        980: {
                            top: parseInt(distance_tablet)
                        },
                        767: {
                            top: parseInt(distance_phone)
                        }
                    }
                });
                this.setState({sticky : Sticky});
            }  else if (this.props.use_sticky_nav === 'on' && this.state.sticky) {
                this.state.sticky.refresh();
            }

            if (this.state.sticky && this.props.use_sticky_nav !== 'on') {
                this.state.sticky.destroy();
            }
        }
    }

    static css(props) {
        const additionalCss = [];
        var view_mode = window.ET_Builder.API.State.View_Mode.current;
        const alignment = {
            'left' : 'flex-start',
            'right' : 'flex-end',
            'center' : 'center'
        }
        const vertical_align = {
            'flex_start'        : '',
            'flex_center'       : 'margin-top: auto; margin-bottom: auto;',
            'flex_end'          : 'margin-top:auto; margin-bottom:0;'
        };
        // active arrow style
        if(props.use_active_arrow === 'on') {
            additionalCss.push([{
                selector:    '%%order_class%% .df_at_nav',
                declaration: `overflow: visible !important;`
            }]);
        }
        utility.process_color({
            'props'             : props,
            'key'               : 'active_arrow_color',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .df_at_nav svg',
            'type'              : 'fill'
        });

        var translate_values = {
            'flex_left' : 'top: 50%; transform: translateX(0px) translateY(-50%);',
            'flex_right' : 'top: 50%; transform: translateX(-100%) translateY(-50%);',
            'flex_bottom' : 'left: 50%; transform: translateY(-100%) translateX(-50%);',
            'flex_top' : 'left: 50%; transform: translateX(-50%);'
        };
        const nav_placement = props.nav_placement ? props.nav_placement : 'flex_top';
        if(props.nav_placement === 'flex_left' || props.nav_placement === 'flex_right') {
            additionalCss.push([{
                selector:    '%%order_class%% .df_at_nav svg',
                declaration: `height: ${props.active_arrow_size}; width: auto;`
            }]);
            if(props.arrow_align === 'center') {
                additionalCss.push([{
                    selector:    '%%order_class%% .df_at_nav svg',
                    declaration: translate_values[nav_placement]
                }]);
            } else if(props.arrow_align === 'end') {
                additionalCss.push([{
                    selector:    '%%order_class%% .df_at_nav svg',
                    declaration: `top: auto; bottom:0px;`
                }]);
            }
            if ('auto' === props.nav_align) {
                additionalCss.push([ {
                    selector: '%%order_class%% .df_at_nav',
                    declaration: `height: 100%; width: auto;`
                } ]);
            }
        } else {
            additionalCss.push([{
                selector:    '%%order_class%% .df_at_nav svg',
                declaration: `width: ${props.active_arrow_size}; height: auto;`
            }]);

            if(props.arrow_align === 'center') {
                additionalCss.push([{
                    selector:    '%%order_class%% .df_at_nav svg',
                    declaration: translate_values[nav_placement]
                }]);
            } else if(props.arrow_align === 'end') {
                additionalCss.push([{
                    selector:    '%%order_class%% .df_at_nav svg',
                    declaration: `left: auto; right: 0;`
                }]);
            }
        }


        utility.process_color({
            'props'             : props,
            'key'               : 'icon_color',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .df_at_nav .et-pb-icon',
            'type'              : 'color'
        });
        utility.process_color({
            'props'             : props,
            'key'               : 'icon_color_active',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .df_at_nav.df_at_nav_active .et-pb-icon',
            'type'              : 'color',
            'important'         : true
        });
        utility.process_range_value({
            'props'             : props,
            'key'               : 'icon_size',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .df_at_nav .et-pb-icon',
            'type'              : 'font-size',
            'unit'              : 'px'
        });
        utility.process_range_value({
            'props'             : props,
            'key'               : 'image_size',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .df_at_nav .at_image_wrap img',
            'type'              : 'max-width',
            'unit'              : 'px'
        });
        utility.process_range_value({
            'props'             : props,
            'key'               : 'icon_size_active',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .df_at_nav.df_at_nav_active .et-pb-icon',
            'type'              : 'font-size',
            'unit'              : 'px'
        });
        utility.process_range_value({
            'props'             : props,
            'key'               : 'image_size_active',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .df_at_nav.df_at_nav_active .at_image_wrap img',
            'type'              : 'max-width',
            'unit'              : 'px'
        });
        utility.df_process_string_attr({
            'props'             : props,
            'key'               : 'icon_placement',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .df_at_nav',
            'type'              : 'flex-direction'
        })
        if(props.use_nav_width === 'on') {
            utility.process_range_value({
                'props'             : props,
                'key'               : 'nav_min_width',
                'additionalCss'     : additionalCss,
                'selector'          : '%%order_class%% .df_at_nav',
                'type'              : 'min-width'
            });
            utility.process_range_value({
                'props'             : props,
                'key'               : 'nav_max_width',
                'additionalCss'     : additionalCss,
                'selector'          : '%%order_class%% .df_at_nav',
                'type'              : 'max-width'
            });
            utility.process_range_value({
                'props'             : props,
                'key'               : 'nav_height',
                'additionalCss'     : additionalCss,
                'selector'          : '%%order_class%% .df_at_nav_container .df_at_nav',
                'type'              : 'height'
            });
        }

        utility.df_process_string_attr({
            'props'             : props,
            'key'               : 'nav_align',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .df_at_nav_wrap',
            'type'              : 'align-self'
        })
        utility.df_process_string_attr({
            'props'             : props,
            'key'               : 'nav_align',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .df_at_nav_wrap',
            'type'              : 'justify-content'
        })

        utility.df_process_string_attr({
            'props'             : props,
            'key'               : 'nav_align',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .df_at_nav_container',
            'type'              : 'justify-content'
        })
        utility.df_process_string_attr({
            'props'             : props,
            'key'               : 'nav_align',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .df_at_nav_container',
            'type'              : 'align-items'
        })

        // nav placement
        additionalCss.push([{
            selector:    '%%order_class%% .df_at_container',
            declaration: `flex-direction: ${utility.process_values(props.nav_placement)};`,
            'device':'desktop'
        }]);
        const nav_placement_tablet = props.nav_placement_tablet ? props.nav_placement_tablet : 'flex_top';
        additionalCss.push([{
            selector:    '%%order_class%% .df_at_container',
            declaration: `flex-direction: ${utility.process_values(nav_placement_tablet)};`,
            'device':'tablet'
        }]);
        const nav_placement_phone = props.nav_placement_phone ? props.nav_placement_phone : 'flex_top';
        additionalCss.push([{
            selector:    '%%order_class%% .df_at_container',
            declaration: `flex-direction: ${utility.process_values(nav_placement_phone)};`,
            'device':'phone'
        }]);

        if(props.nav_placement === 'flex_left' || props.nav_placement === 'flex_right') {
            additionalCss.push([{
                selector:    '%%order_class%% .df_at_nav_container',
                declaration: `flex-direction: column;`,
                'device':'desktop'
            }]);
        }
        if(props.nav_placement_tablet === 'flex_left' || props.nav_placement_tablet === 'flex_right') {
            additionalCss.push([{
                selector:    '%%order_class%% .df_at_nav_container',
                declaration: `flex-direction: column;`,
                'device':'tablet'
            }]);
        }
        if(props.nav_placement_phone === 'flex_left' || props.nav_placement_phone === 'flex_right') {
            additionalCss.push([{
                selector:    '%%order_class%% .df_at_nav_container',
                declaration: `flex-direction: column;`,
                'device':'phone'
            }]);
        }

        if (view_mode === 'desktop' && ( props.nav_placement === 'flex_left' || props.nav_placement === 'flex_right' ) ) {
            const nav_container_width = props.nav_container_width && props.nav_container_width !== '' ?
                props.nav_container_width : '20%';

            additionalCss.push([{
                selector:    '%%order_class%% .df_at_nav_wrap',
                declaration: `width: ${nav_container_width};`
            }]);
            additionalCss.push([{
                selector:    '%%order_class%% .df_at_all_tabs_wrap',
                declaration: `width: calc(100% - ${nav_container_width});`
            }]);
            additionalCss.push([{
                selector:    '%%order_class%% .et_pb_module',
                declaration: `height: 100%;`
            }]);
            // additionalCss.push([{
            //     selector:    '%%order_class%% .df_at_all_tabs',
            //     declaration: `display: flex; align-items: ${utility.process_values(props.content_vertical_align)};`
            // }]);
            additionalCss.push([{
                selector:    '%%order_class%% .df_ati_container',
                declaration: `${vertical_align[props.content_vertical_align]};`
            }]);
        } else {
            additionalCss.push([{
                selector:    '%%order_class%% .df_ati_container',
                declaration: `align-items: ${utility.process_values(props.content_vertical_align)};`
            }]);
        }
        if (view_mode === 'tablet' && ( props.nav_placement_tablet === 'flex_left' || props.nav_placement_tablet === 'flex_right' ) ) {
            const nav_container_width_tablet = props.nav_container_width_tablet && props.nav_container_width_tablet !== '' ?
                props.nav_container_width_tablet : '20%';

            additionalCss.push([{
                selector:    '%%order_class%% .df_at_nav_wrap',
                declaration: `width: ${nav_container_width_tablet};`,
                'device':'tablet'
            }]);
            additionalCss.push([{
                selector:    '%%order_class%% .df_at_all_tabs_wrap',
                declaration: `width: calc(100% - ${nav_container_width_tablet});`,
                'device':'tablet'
            }]);
            additionalCss.push([{
                selector:    '%%order_class%% .et_pb_module',
                declaration: `height: 100%;`,
                'device':'tablet'
            }]);
            // additionalCss.push([{
            //     selector:    '%%order_class%% .df_at_all_tabs',
            //     declaration: `display: flex; align-items: ${utility.process_values(props.content_vertical_align)};`
            // }]);
            additionalCss.push([{
                selector:    '%%order_class%% .df_ati_container',
                declaration: `${vertical_align[props.content_vertical_align]};`
            }]);
        }
        if (view_mode === 'phone' && ( props.nav_placement_phone === 'flex_left' || props.nav_placement_phone === 'flex_right' ) ) {
            const nav_container_width_phone = props.nav_container_width_phone && props.nav_container_width_phone !== '' ?
                props.nav_container_width_phone : '20%';

            additionalCss.push([{
                selector:    '%%order_class%% .df_at_nav_wrap',
                declaration: `width: ${nav_container_width_phone};`,
                'device':'phone'
            }]);
            additionalCss.push([{
                selector:    '%%order_class%% .df_at_all_tabs_wrap',
                declaration: `width: calc(100% - ${nav_container_width_phone});`,
                'device':'phone'
            }]);
            additionalCss.push([{
                selector:    '%%order_class%% .et_pb_module',
                declaration: `height: 100%;`,
                'device':'phone'
            }]);
            // additionalCss.push([{
            //     selector:    '%%order_class%% .df_at_all_tabs',
            //     declaration: `display: flex; align-items: ${utility.process_values(props.content_vertical_align)};`
            // }]);
            additionalCss.push([{
                selector:    '%%order_class%% .df_ati_container',
                declaration: `${vertical_align[props.content_vertical_align]};`
            }]);
        }

        if(props.use_nav_width === 'on') {
            additionalCss.push([{
                selector:    '%%order_class%% .df_at_nav_container',
                declaration: `flex-wrap: wrap;`
            }]);
            additionalCss.push([{
                selector:    '%%order_class%% .df_at_nav',
                declaration: `height: auto;`
            }]);
        }

        // icon width on top and bottom position
        AdvancedTab.icon_wrapper_width(additionalCss, props);
        AdvancedTab.icon_alignment_styles(additionalCss, props);

        additionalCss.push([{
            selector:    '%%order_class%% .df_at_button_wrapper',
            declaration: `text-align: ${props.button_align}`,
        }]);

        // process background
        utility.df_process_bg({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'button',
            'selector'          : '%%order_class%% .df_at_button'
        });
        utility.df_process_bg({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'content_container',
            'selector'          : '%%order_class%% .df_at_all_tabs_wrap'
        });
        utility.df_process_bg({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'nav_container',
            'selector'          : '%%order_class%% .df_at_nav_wrap'
        });
        utility.df_process_bg({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'nav_item',
            'selector'          : '%%order_class%% .df_at_nav'
        });
        utility.df_process_bg({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'nav_item_active',
            'selector'          : '%%order_class%% .df_at_nav.df_at_nav_active'
        });

        // spacing
        utility.process_margin_padding({
            'props' : props,
            'key':'nav_wrapper_margin',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_at_nav_container',
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'nav_wrapper_padding',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_at_nav_container',
            'type'  : 'padding'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'at_content_wrapper_margin',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_at_all_tabs',
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'at_content_wrapper_padding',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_at_all_tabs',
            'type'  : 'padding'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'image_wrapper_margin',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_at_image_wrapper',
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'image_wrapper_padding',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_at_image_wrapper',
            'type'  : 'padding'
        });

        utility.process_margin_padding({
            'props' : props,
            'key':'nav_item_margin',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_at_nav',
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'nav_item_padding',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_at_nav',
            'type'  : 'padding'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'nav_item_first_margin',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_at_nav:first-child',
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'nav_item_last_margin',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_at_nav:last-child',
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'nav_item_active_margin',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_at_nav_active.df_at_nav',
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'nav_item_active_padding',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_at_nav_active.df_at_nav',
            'type'  : 'padding'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'content_margin',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_at_content_wrapper',
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'content_padding',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_at_content_wrapper',
            'type'  : 'padding'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'button_margin',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_at_button',
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'button_padding',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_at_button',
            'type'  : 'padding'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'nav_icon_margin',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .at_icon_wrap , %%order_class%% .at_image_wrap',
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'nav_title_margin',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_at_title',
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'nav_description_margin',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_at_subtitle',
            'type'  : 'margin'
        });

        return additionalCss;
    }

    static icon_wrapper_width(additionalCss, props) {
        const icon_wrapper_width = {
            'flex_top' : '100%',
            'flex_bottom' : '100%',
            'flex_left' : 'auto',
            'flex_right' : 'auto'
        }
        const dektop = props.icon_placement && props.icon_placement !== '' ?
            props.icon_placement : 'flex_top';
        const tablet = props.icon_placement_tablet && props.icon_placement_tablet !== '' ?
            props.icon_placement_tablet : dektop;
        const phone = props.icon_placement_phone && props.icon_placement_phone !== '' ?
            props.icon_placement_phone : tablet;

        additionalCss.push([{
            selector:    '%%order_class%% .at_icon_wrap , %%order_class%% .at_image_wrap',
            declaration: `width: ${icon_wrapper_width[dektop]};`,
        }]);
        additionalCss.push([{
            selector:    '%%order_class%% .at_icon_wrap , %%order_class%% .at_image_wrap',
            declaration: `width: ${icon_wrapper_width[tablet]};`,
            'device':'tablet'
        }]);
        additionalCss.push([{
            selector:    '%%order_class%% .at_icon_wrap , %%order_class%% .at_image_wrap',
            declaration: `width: ${icon_wrapper_width[phone]};`,
            'device':'phone'
        }]);
    }

    /**
     * Icon alignment on left/right
     *
     */
    static icon_alignment_styles(additionalCss, props) {
        var view_mode = window.ET_Builder.API.State.View_Mode.current;
        var align = props.icon_align ? props.icon_align : 'left';
        var flex_style = {
            'left' : 'flext-start',
            'center' : 'center',
            'right' : 'flex-end'
        }
        var flex_style_reverse = {
            'left' : 'flex-end',
            'center' : 'center',
            'right' : 'flext-start'
        }
        additionalCss.push([{
            selector:    '%%order_class%% .at_icon_wrap , %%order_class%% .at_image_wrap',
            declaration: `text-align: ${align}`,
        }]);
        if (view_mode === 'desktop') {
            additionalCss.push([{
                selector:    '%%order_class%% .lr_left .at_nav_content, %%order_class%% .lr_right .at_nav_content',
                declaration: `width: auto;`,
            }]);
            additionalCss.push([{
                selector:    '%%order_class%% .df_at_nav.lr_left',
                declaration: `justify-content: ${flex_style[align]};`,
            }]);
            additionalCss.push([{
                selector:    '%%order_class%% .df_at_nav.lr_right',
                declaration: `justify-content: ${flex_style_reverse[align]};`,
            }]);
        }
        if (view_mode === 'tablet') {
            additionalCss.push([{
                selector:    '%%order_class%% .md_left .at_nav_content, %%order_class%% .md_right .at_nav_content',
                declaration: `width: auto;`,
            }]);
            additionalCss.push([{
                selector:    '%%order_class%% .df_at_nav.md_left',
                declaration: `justify-content: ${flex_style[align]};`,
            }]);
            additionalCss.push([{
                selector:    '%%order_class%% .df_at_nav.md_right',
                declaration: `justify-content: ${flex_style_reverse[align]};`,
            }]);
        }
        if (view_mode === 'phone') {
            additionalCss.push([{
                selector:    '%%order_class%% .sm_left .at_nav_content, %%order_class%% .sm_right .at_nav_content',
                declaration: `width: auto;`,
            }]);
            additionalCss.push([{
                selector:    '%%order_class%% .df_at_nav.sm_left',
                declaration: `justify-content: ${flex_style[align]};`,
            }]);
            additionalCss.push([{
                selector:    '%%order_class%% .df_at_nav.sm_right',
                declaration: `justify-content: ${flex_style_reverse[align]};`,
            }]);
        }


    }

    contentOutput(props) {
        if (props['content'] === '' || props['content'].length === 0) {
            const notice_style = {
                backgroundColor: "#eeeeee",
                padding: "10px 20px"
            };
            return <h2 style={notice_style} >Please <strong>Add New Tab Item.</strong></h2>;
        }
        return props.content
    }

    get_default_active_child_index() {
        const props = this.props;
        let active_index = 0;
        if (props.content.length > 0) {
            props.content.map(function (data, i) {
                const item_props = data.props;
                if ('on' === item_props.attrs.default_active) {
                    active_index = i;
                }
            });
        }
        return active_index;
    }

    /**
     * Get the active child data
     *
     * @param {int} index
     */
    get_active_child(index = 0) {
        const _this = this;
        const props = this.props;
        var active_child = {};


        if(!props.content[index]) return

        new Promise((resolve, reject) => {
            active_child = {
                parent_address: _this.props.moduleInfo.address,
                address: props.content[index].props.address,
                order_class: '.' + props.content[index].props.matching.slug + '_' + props.content[index].props.shortcode_index,
                first_child: index === 0 ? true : false,
                index: index
            }
            utility.active_child[_this.props.moduleInfo.address] = {
                address: props.content[index].props.address
            }
            resolve();
        })
        .then((res) => {
            if((lodash.isEqual(_this.state.active_child, active_child) === false)) {
                _this.setState({active_child : active_child});
            }
            $(this.content_wrapper.current)
                .find('.difl_advancedtabitem')
                .css('display', 'none');
            $('.df_at_all_tabs [data-address="' + active_child.address + '"]')
                .css('display', 'block');
        })
        return active_child;
    }


    difference(object, base) {
        function changes(object, base) {
            return lodash.transform(object, function(result, value, key) {
                if (!lodash.isEqual(value, base[key])) {
                    result[key] = (lodash.isObject(value) && lodash.isObject(base[key])) ? changes(value, base[key]) : value;
                }
            });
        }
        return changes(object, base);
    }

    /**
     * Handle the tab navigation click event
     *
     * @param {object} e
     * @param {int} index
     */
    handleOnClick(e, index) {
        $(this.content_wrapper.current)
            .find('.difl_advancedtabitem')
            .css('display', 'none');
        this.get_active_child(index);
    }

    /**
     * Handle dynamic content ajax request
     *
     * @param {object} dynamicJsonObject
     */

    async ajaxRequest(dynamicJsonObject){
        return window.jQuery.ajax({
            type: "POST",
            url: window.ETBuilderBackend.ajaxUrl,
            dataType: "json",
            data: {
                action: "df_builder_resolve_post_content",
                nonce: window.ETBuilderBackend.nonces.resolvePostContent,
                post_id: window.ETBuilderBackend.currentPage.id,
                groups: {
                    [window.btoa(dynamicJsonObject.content)]: {
                        group: 'dynamic',
                        field: dynamicJsonObject.content,
                        //attribute: `${options.base_name}_image`
                    }
                },
                overrides: {
                    post_title: window.ETBuilderBackend.currentPage.title,
                    post_excerpt: '',
                    post_featured_image: 0,
                    post_categories: '',
                    post_tags: ''
                }
            },
            success: function (response) {
               // resolve(Object.values(response.data).join())
               return response.data.value;
                // /return response.data.value
            },
            error: function (error) {
                //reject(error)
            },
        })
    }
    /**
     * Still Not Use
     * Handle dynamic content ajax request
     *
     * @param {object} dynamicAttr
     * @param {string) propsKey
     */
    async resolve_dynamic_content(dynamicAttr, propsKey){

        const regex = new RegExp(/^@ET-DC@(.*?)@$/g);
        let mainValue = '';
        if (regex.test(dynamicAttr)) {
            let dynamicJson = dynamicAttr.replace(/^@ET-DC@/i, '').replace(/@$/i, '');
            let dynamicJsonObject = JSON.parse(window.atob(dynamicJson));

            let response = await this.ajaxRequest(dynamicJsonObject);

             mainValue = response.data.value

        } else {
            mainValue = dynamicAttr;
        }

        return mainValue;
    }

    get_child_props_value(dynamicAttr){
        var data =[]
        const regex = new RegExp(/^@ET-DC@(.*?)@$/g);
        if (regex.test(dynamicAttr)) {
            let dynamicJson = dynamicAttr.replace(/^@ET-DC@/i, '').replace(/@$/i, '');
            let dynamicJsonObject = JSON.parse(window.atob(dynamicJson));

            data.value = dynamicJsonObject.content;
            data.dynamic_content = dynamicJsonObject.dynamic;

        } else {
            data.value = dynamicAttr;
            data.dynamic_content = false;
        }
        return data;
    }
    /**
     * Render tab navigation
     *
     * @param {object} props
     */
    df_at_render_nav(props) {
        const _this = this;
        const at_nav = props.content;
        const utils = window.ET_Builder.API.Utils;
        let active_class = '';
        const nav_placement = props.nav_placement && props.nav_placement !== '' ? props.nav_placement : 'flex_top';
        const placement = {
            'flex_top' : 'top',
            'flex_bottom' : 'bottom',
            'flex_left' : 'left',
            'flex_right' : 'right'
        }
        const arrows = {
            'flex_top'      : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 255 127.5" width="30px" height="auto"><g><polygon points="0 0 127.5 127.5 255 0 0 0"/></g></svg>,
            'flex_bottom'   : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 255 127.5" width="30px" height="auto"><g><polygon points="255 127.5 127.5 0 0 127.5 255 127.5"/></g></svg>,
            'flex_left'     : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 127.5 255" height="30px" width="auto"><g><polygon points="0 255 127.5 127.5 0 0 0 255"/></g></svg>,
            'flex_right'    : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 127.5 255" height="30px" width="auto"><g><polygon points="127.5 0 0 127.5 127.5 255 127.5 0"/></g></svg>
        };
        const arrow = props.use_active_arrow === 'on' ? arrows[nav_placement] : '';
        const arrow_class = ' arrow_' + placement[nav_placement];

        if (!at_nav) return


        const desktop = props.icon_placement ? placement[props.icon_placement] : 'top';
        const tablet = props.icon_placement_tablet ? placement[props.icon_placement_tablet] : desktop;
        const phone = props.icon_placement_phone ? placement[props.icon_placement_phone] : tablet;

        const large = 'lr_' + desktop ;
        const medium = 'md_' + tablet;
        const small = 'sm_' + phone;

        const icon_placement_class =  ' ' + large + ' ' + medium + ' ' + small;
        const TitleLevel = props.title_level ? props.title_level : 'h4';
        return at_nav.map( function(data, i) {
            const item_props = data.props;

            const default_image = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIyMCIgdmlld0JveD0iMCAwIDMwMCAyMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xMzQuODE4IDE2NS4zNDhDMTMxLjAyMiAxNjguNjY5IDEyNS4zNTQgMTY4LjY2OSAxMjEuNTU5IDE2NS4zNDhMODQuODU3OCAxMzMuMjM1TDAuMDAwMTA3NzY1IDE5OS4yMzZMMC4wMDAyMzEyNjYgMjIwSDMwMEMzMDAgMjIwIDMwMCAyMTkuODI2IDMwMCAyMTguMTc0VjE2Ny4yOTdMMjE0LjI1MyA5NS44NDE2TDEzNC44MTggMTY1LjM0OFoiIGZpbGw9InVybCgjcGFpbnQwX2xpbmVhcl8yNDVfMjA1MykiLz4KPHBhdGggZD0iTTMwMCAwSDBDMC4wMDI0OTYyNCA4IDcuNjI5MzllLTA2IDUuNTUwMzQgNy42MjkzOWUtMDYgMjIuMjAxM1YxNzMuNzI4TDc5LjA1NDQgMTEyLjI0MkM4Mi44NjMxIDEwOS4yOCA4OC4yMzU2IDEwOS40MzYgOTEuODY0NCAxMTIuNjEyTDEyOC4xODggMTQ0LjM5NUwyMDcuNDY1IDc1LjAyNzVDMjExLjE5MSA3MS43Njc4IDIxNi43MzUgNzEuNyAyMjAuNTM4IDc0Ljg2OThMMzAwIDE0MS4wODhWMjIuMjAxM0MzMDAgNS41NTAzNCAzMDAgMCAzMDAgMFpNMTI4LjE4OCA5Mi42NzExQzEwNy44MzQgOTIuNjcxMSA5MS4yNzUyIDc2LjExMjEgOTEuMjc1MiA1NS43NTg0QzkxLjI3NTIgMzUuNDA0NyAxMDcuODM0IDE4Ljg0NTYgMTI4LjE4OCAxOC44NDU2QzE0OC41NDIgMTguODQ1NiAxNjUuMTAxIDM1LjQwNDcgMTY1LjEwMSA1NS43NTg0QzE2NS4xMDEgNzYuMTEyMSAxNDguNTQyIDkyLjY3MTEgMTI4LjE4OCA5Mi42NzExWiIgZmlsbD0idXJsKCNwYWludDFfbGluZWFyXzI0NV8yMDUzKSIvPgo8cGF0aCBkPSJNMTI4IDcwQzEzNi4yODQgNzAgMTQzIDYzLjI4NDMgMTQzIDU1QzE0MyA0Ni43MTU3IDEzNi4yODQgNDAgMTI4IDQwQzExOS43MTYgNDAgMTEzIDQ2LjcxNTcgMTEzIDU1QzExMyA2My4yODQzIDExOS43MTYgNzAgMTI4IDcwWiIgZmlsbD0idXJsKCNwYWludDJfbGluZWFyXzI0NV8yMDUzKSIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDBfbGluZWFyXzI0NV8yMDUzIiB4MT0iMjA0IiB5MT0iMjIwIiB4Mj0iMy45MzY2OGUtMDYiIHkyPSItMy42NTAzN2UtMDYiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iIzREMjBBOSIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiM4NTQ1REQiLz4KPC9saW5lYXJHcmFkaWVudD4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDFfbGluZWFyXzI0NV8yMDUzIiB4MT0iMjA0IiB5MT0iMjIwIiB4Mj0iMy45MzY2OGUtMDYiIHkyPSItMy42NTAzN2UtMDYiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iIzREMjBBOSIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiM4NTQ1REQiLz4KPC9saW5lYXJHcmFkaWVudD4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDJfbGluZWFyXzI0NV8yMDUzIiB4MT0iMjA0IiB5MT0iMjIwIiB4Mj0iMy45MzY2OGUtMDYiIHkyPSItMy42NTAzN2UtMDYiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iIzREMjBBOSIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiM4NTQ1REQiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4K';
            const title_value = _this.get_child_props_value(item_props.attrs.title);
            const title_child = title_value.dynamic_content === false ? title_value.value: title_value.value.replace("_", " ");

            const subtitle_value = _this.get_child_props_value(item_props.attrs.subtitle);
            const subtitle_child = subtitle_value.dynamic_content === false ? subtitle_value.value: subtitle_value.value.replace("_", " ");

            const tab_image_value = _this.get_child_props_value(item_props.attrs.tab_image);
            const title = item_props.attrs.title !== '' ?
                <TitleLevel className="df_at_title">{title_child}</TitleLevel> : '';
            const subtitle = item_props.attrs.subtitle !== '' ?
                <div className="df_at_subtitle" dangerouslySetInnerHTML={{__html: subtitle_child}}></div> : '';
            const image = item_props.attrs.use_icon !== 'on' && item_props.attrs.tab_image !== undefined ?
                (
                    tab_image_value.dynamic_content === false ?
                    <span className="at_image_wrap">
                        <img src={item_props.attrs.tab_image} />
                    </span>
                    :
                    <span className="at_image_wrap">
                        <img src={default_image} />
                    </span>
                )
                : '';
            const icon = item_props.attrs.use_icon && item_props.attrs.use_icon === 'on' ?
                !item_props.attrs.font_icon || item_props.attrs.font_icon === '' ?
                <span className="at_icon_wrap">
                    <span className="et-pb-icon df-tab-nav-icon">5</span>
                </span> :
                <span className="at_icon_wrap ">
                    <span className="et-pb-icon df-tab-nav-icon">{utils.processFontIcon(item_props.attrs.font_icon)}</span>
                </span> : image;


                if(_this.state.active_child &&
                    _this.state.active_child.address === item_props.address) {
                    active_class = ' df_at_nav_active';
                } else {
                    active_class = '';
                }
                if (lodash.isEmpty(_this.state.active_child) && i === 0) {
                    active_class = ' df_at_nav_active';
                }
            const eventTypeAttr = props.tab_event_type === 'click' ? {onClick :(e)=> _this.handleOnClick(e, i) } : {onMouseOver :(e)=> _this.handleOnClick(e, i)  }
            return (
                <div data-hash={item_props.matching.slug + '_' + item_props.shortcode_index} className={item_props.matching.slug + '_' + item_props.shortcode_index + active_class + ' df_at_nav' +  icon_placement_class + arrow_class}
                    key={item_props.address} index={i} {...eventTypeAttr}>
                    {icon}
                    <span className="at_nav_content">
                        {title}
                        {subtitle}
                    </span>
                    {arrow}
                </div>
            );
        })
    }

    /**
     * Render the button markup
     *
     * @param {object} props
     * @param {string} key
     */
    render_button(props, key) {
        const button_text = key + '_button_text';
        const button_url = key + '_button_url';

        if (props.dynamic[button_text].hasValue || props.dynamic[button_url].hasValue ) {
            return (
                <div className="df_at_button_wrapper">
                    <a className="df_at_button" href={utility._renderDynamicContent( props, button_url ,false)}>{utility._renderDynamicContent( props, button_text)}</a>
                </div>
            )
        } else return '';
    }

    render_content(content){
        return {__html: content};
    }

    render() {
        const props = this.props;
        const nav_output = this.df_at_render_nav(props);

        const sticky_nav_class = props.use_sticky_nav === 'on' ? ' df_has_sticky_nav' : '';
        const data_sticky = props.use_sticky_nav === 'on' ? true : false;
        const data_sticky_wrap = props.use_sticky_nav === 'on' ? true : false;

        const data = {
            'use_sticky_nav'            : props.use_sticky_nav,
            'sticky_nav_distance'       : props.sticky_nav_distance,
            'tab_animation'             : props.tab_animation
        };

        const data_active = this.state.active_child ? this.state.active_child.address : '';

        return(<React.Fragment>
            <div className={"df_at_container" + sticky_nav_class} data-settings={JSON.stringify(data)} data-sticky-container ref={this.wrap}>
                <div className="df_at_nav_wrap" ref={this.navwrap}>
                    <div className="df_at_nav_container" data-sticky={data_sticky} data-sticky-wrap={data_sticky_wrap} data-sticky-class="is-sticky">
                        {nav_output}
                    </div>
                </div>
                <div className="df_at_all_tabs_wrap">
                    <div className="df_at_all_tabs" ref={this.content_wrapper} data-active={data_active}>
                        {this.contentOutput(props)}
                    </div>
                </div>
            </div>
        </React.Fragment>
        )
    }
}

export default AdvancedTab;



