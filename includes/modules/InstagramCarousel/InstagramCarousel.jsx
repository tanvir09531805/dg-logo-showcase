// External Dependencies
import React, { Component } from 'react';
import axios from 'axios';
import utility from '../../../scripts/df_scripts/utilities';

// import Swiper from '../../../assets/scripts/lib/swiper.min';
import Swiper from '../../../public/js/lib/swiper.min';
// Internal Dependencies
import './style.css';


class InstagramCarousel extends Component {
    static slug = 'difl_instagramcarousel';
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            slider: null,
            loading: true,
            items: null,
            images: '',
            props: this.props,
            error: false,
            error_msg: ''
        }
        this.wrapper = React.createRef();
        this.swiper_init = this.swiper_init.bind(this);
        this.df_ic_arrow = this.df_ic_arrow.bind(this);
        this.contentOutput = this.contentOutput.bind(this);
        this.requestInstagramItems = this.requestInstagramItems.bind(this);
        this.loading_data = this.loading_data.bind(this);
        this.df_ic_dots = this.df_ic_dots.bind(this);
        this.computedType = ['item_limit', 'instagram_client_id', 'instagram_client_secret', 'instagram_user_token',
            'instagram_post_only_image', 'autoplay_video', 'item_spacing', 'item_desktop', 'speed', 'loop', 'arrow',
            'dots', 'variable_width', 'item_height', 'carousel_type', 'centeredSlides', 'coverflow_effect', 'use_icon', 
            'hover_icon', 'always_show_icon'
        ]
    }

    componentDidMount() {
        this._isMounted = true;
        if (this.state.loading === true) {
            this.setState({ loading: false });
            this.requestInstagramItems();
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidUpdate(prevProps, prevState) {
        this.swiper_init();
        const _this = this;
        var user_token_changed = false;


        if (this.props.instagram_user_token !== this.state.props.instagram_user_token) {
            this.loading_data(true);
        }
        if (this.props.instagram_user_token !== this.state.props.instagram_user_token) {
            this.loading_data();
        }
        for (const index in _this.state.props) {
            if (_this.state.props[index] !== _this.props[index]) {
                if (_this.computedType.includes(index)) {
                    _this.loading_data()
                }
            }
        }

    }
    loading_data(user_token_changed = false) {
        this.setState({
            props: this.props,
            loading: true,
            error: false
        })
        this.requestInstagramItems(user_token_changed);
    }
    getUniqueClass(slug) {
        const selector = '.' + slug + '[data-address="' + this.props.moduleInfo.address + '"]';
        const classesList = document.querySelector(selector).classList;
        var unique_module_name = ''
        for (var i = 0; i < classesList.length; i++) {
            var matches = /^difl_instagramcarousel\_(.+)/.exec(classesList[i]);

            if (matches != null) {
                unique_module_name = matches[0];
            }
        }
        return unique_module_name;
    }
    requestInstagramItems(user_token_changed) {
        const _this = this;
        const order_number = this.props.moduleInfo.address.replace(/\D/g, '');
        const unique_module_name = this.getUniqueClass(this.props.moduleInfo.type);
        axios({
            method: 'post',
            url: window.ETBuilderBackend.ajaxUrl,
            params: {
                action: 'df_inc_render_items'
            },
            data: {
                et_admin_load_nonce: window.et_fb_options.et_admin_load_nonce,
                instagramClientID: _this.props.instagram_client_id,
                instagramClientSecret: _this.props.instagram_client_secret,
                instagramUserToken: _this.props.instagram_user_token,
                item_limit: _this.props.item_limit,
                instagram_post_only_image: _this.props.instagram_post_only_image,
                cache_time: _this.props.cache_time ? _this.props.cache_time : '-1',
                cache_time_type: _this.props.cache_time_type ? _this.props.cache_time_type : 'minute',
                unique_module_name: unique_module_name,
                user_token_changed: user_token_changed
            }
        })
            .then((response) => {
                if (_this._isMounted) {
                    if (response.data.data !== undefined) {
                        _this.setState({
                            items: response.data.data
                        });
                    }

                    if (response.data.data.error) {
                        _this.setState({
                            error: true,
                            error_msg: response.data.data.error
                        });
                    }

                }
            })
            .then((res) => {
                if (_this._isMounted) {
                    _this.setState({ loading: false });
                }
            })
    }
    swiper_init() {
        if (this.state.loading === true) {
            this.setState({ loading: false })
            return;
        }
        const _this = this;
        const props = this.props;
        const selector = this.wrapper.current.querySelector('.swiper-container');
        const order_number = Number(props.moduleInfo.address.replace(/\D/g, ''));

        const item_spacing_tablet = props.item_spacing_tablet ? props.item_spacing_tablet : props.item_spacing;
        const item_spacing_phone = props.item_spacing_phone ? props.item_spacing_phone : item_spacing_tablet;

        var config = {
            init: false,
            speed: parseInt(props.speed),
            loop: props.loop === 'on' ? true : false,
            effect: 'slide',
            // autoHeight: true,
        }

        // arrow navigation
        if (props.arrow === 'on') {
            config['navigation'] = {
                nextEl: '.inc-next-' + order_number,
                prevEl: '.inc-prev-' + order_number
            }
        }

        // dot pagination
        if (props.dots === 'on') {
            config['pagination'] = {
                el: '.inc-dots-' + order_number
            }
        }

        // effect
        if (props.carousel_type === 'cube') {
            config['effect'] = props.carousel_type;
            config['slidesPerView'] = 1;
            config['cubeEffect'] = {
                slideShadows: true,
                shadow: false,
                shadowOffset: 20,
                shadowScale: 0.3
            };
        } else if (props.carousel_type === 'flip') {
            config['effect'] = props.carousel_type;
            config['slidesPerView'] = 1;
            config['flipEffect'] = {
                rotate: 30,
                slideShadows: true,
            }
        } else {
            config['effect'] = props.carousel_type;
            config['slidesPerView'] = props.variable_width !== 'on' ? parseInt(props.item_desktop) : 'auto';
            config['spaceBetween'] = parseInt(props.item_spacing);
            config['centeredSlides'] = props.centered_slides === 'on' ? true : false;
            config['breakpoints'] = {
                // desktop
                981: {
                    slidesPerView: props.variable_width !== 'on' ? parseInt(props.item_desktop) : 'auto',
                    spaceBetween: parseInt(props.item_spacing)
                },
                // tablet
                768: {
                    slidesPerView: props.variable_width !== 'on' ? parseInt(props.item_tablet) : 'auto',
                    spaceBetween: parseInt(item_spacing_tablet)
                },
                // mobile
                1: {
                    slidesPerView: props.variable_width !== 'on' ? parseInt(props.item_mobile) : 'auto',
                    spaceBetween: parseInt(item_spacing_phone)
                },
            }
            // coverflwo settings
            if (props.carousel_type === 'coverflow') {
                config['coverflowEffect'] = {
                    slideShadows: props.coverflow_shadow === 'on' ? true : false,
                    rotate: parseInt(props.coverflow_rotate),
                    stretch: parseInt(props.coverflow_stretch),
                    depth: parseInt(props.coverflow_depth),
                    modifier: parseInt(props.coverflow_modifier)
                };
            }
        }

        var slider = new Swiper(selector, config);
        slider.init();

        for (const index in _this.state.props) {
            if (_this.state.props[index] !== _this.props[index]) {
                if (_this.computedType.includes(index)) {
                    slider.destroy();
                    _this.setState({ props: _this.props, loading: true })
                }
            }
        }
    }

    static css(props) {
        const additionalCss = [];

        // Builder Slide count fix
        if( !(props.carousel_type === 'cube' && props.loop === 'on') ){ // Checking for Cube and loop on because it make issue at builder.
            additionalCss.push([{
                selector:    '%%order_class%% .swiper-wrapper',
                declaration: `width: fit-content;`,
            }]);
        }


        // image settings
        if (props.ic_full_width !== 'on') {
            utility.process_range_value({
                'props': props,
                'key': 'ic_max_width',
                'additionalCss': additionalCss,
                'selector': '%%order_class%% .media_item img',
                'type': 'max-width',
                'default_value': '100%'
            });
            additionalCss.push([{
                selector: '%%order_class%% .media_item .inc_image_wrapper',
                declaration: `text-align: ${props.ic_img_align};`,
            }]);
        }

        // variable_width alignment
        if (props.variable_width && props.variable_width === 'on') {
            utility.process_range_value({
                'props': props,
                'key': 'item_height',
                'additionalCss': additionalCss,
                'selector': '%%order_class%% .media_item img , %%order_class%% .media_item iframe',
                'type': 'height',
                'default_value': 'px'
            });
        }
        if (props.ic_equal_height === 'on') {
            additionalCss.push([{
                selector: '%%order_class%% .media_item',
                declaration: `height:auto;`,
            }]);
        }
        if (props.ic_equal_height !== 'on' && props.ic_vertical) {
            additionalCss.push([{
                selector: '%%order_class%% .media_item',
                declaration: `align-self:${props.ic_vertical};`,
            }]);
        }
        if (props.ic_full_width === 'on') {
            additionalCss.push([{
                selector: '%%order_class%% .inc_image_wrapper, %%order_class%% .inc_image_wrapper im',
                declaration: `align-self:${props.ic_vertical};`,
            }]);
        }
        // coverflow shadow color
        additionalCss.push([{
            selector: '%%order_class%% .swiper-container-3d .swiper-slide-shadow-left',
            declaration: `background-image: linear-gradient(to left,${props.coveflow_color_dark},${props.coveflow_color_light});`,
        }]);
        additionalCss.push([{
            selector: '%%order_class%% .swiper-container-3d .swiper-slide-shadow-right',
            declaration: `background-image: linear-gradient(to right,${props.coveflow_color_dark},${props.coveflow_color_light});`,
        }]);
        // overlay 
        utility.df_process_bg({
            'props': props,
            'additionalCss': additionalCss,
            'key': 'ic_overlay_background',
            'selector': '%%order_class%% .media_item .overlay_wrapper'
        });
        if (props.use_icon === 'on') {

            utility.df_process_string_attr({
                'props': props,
                'key': 'hover_icon_alignment',
                'additionalCss': additionalCss,
                'selector': '%%order_class%% .et-pb-icon.hover_icon',
                'type': 'text-align',
                'default_value': 'center'
            });

            utility.process_color({
                'props': props,
                'key': 'hover_icon_color',
                'additionalCss': additionalCss,
                'selector': '%%order_class%% .et-pb-icon.hover_icon',
                'type': 'color'
            });

            utility.process_range_value({
                'props': props,
                'key': 'hover_icon_size',
                'additionalCss': additionalCss,
                'selector': "%%order_class%% .et-pb-icon.hover_icon",
                'type': 'font-size',
                'unit': 'px'
            });
        }
        //content background
        utility.df_process_bg({
            'props': props,
            'additionalCss': additionalCss,
            'key': 'inc_content_background',
            'selector': '%%order_class%% .content'
        });

        // wrapper spacing
        utility.process_margin_padding({
            'props': props,
            'key': 'wrapper_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .swiper-container',
            'type': 'margin'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'wrapper_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .swiper-container',
            'type': 'padding'
        });
        // item wrapper spacing
        utility.process_margin_padding({
            'props': props,
            'key': 'item_wrapper_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .media_item > div',
            'type': 'margin'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'item_wrapper_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .media_item > div',
            'type': 'padding'
        });

        // caption spacing
        utility.process_margin_padding({
            'props': props,
            'key': 'caption_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .content',
            'type': 'margin'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'caption_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .content',
            'type': 'padding'
        });

        // arrow colors
        utility.process_color({
            'props': props,
            'key': 'arrow_color',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df_inc_arrows div:after',
            'type': 'color',
        })
        utility.process_color({
            'props': props,
            'key': 'arrow_background',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df_inc_arrows div',
            'type': 'background-color',
        })
        // dots colors
        utility.process_color({
            'props': props,
            'key': 'dots_color',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .swiper-pagination span',
            'type': 'background',
        })
        utility.process_color({
            'props': props,
            'key': 'active_dots_color',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .swiper-pagination span.swiper-pagination-bullet-active',
            'type': 'background',
        })

        if (props.vertical_align) {
            additionalCss.push([{
                selector: '%%order_class%% .overlay_wrapper',
                declaration: `justify-content: ${props.vertical_align};`,
            }]);
        }
        if (props.image_scale === 'on') {
            additionalCss.push([{
                selector: '%%order_class%% .media_item:hover img',
                declaration: `transform: scale(${props.image_scale_value});`,
            }]);
        }
        // transform styles
        if (props.always_show_content === 'on') {

            additionalCss.push([{
                selector: '%%order_class%% .media_item .content',
                declaration: `opacity: 1;`
            }]);

        } else {

            additionalCss.push([{
                selector: '%%order_class%% .media_item .content',
                declaration: `opacity: 0;`
            }]);
        }

        if (props.use_icon === 'on' && props.icon_anim_direction) {
            const icon_anim_direction = props.icon_anim_direction ? props.icon_anim_direction : 'top';
            additionalCss.push([{
                selector: '%%order_class%% .media_item .content',
                declaration: `display: none;`
            }]);
            additionalCss.push([{
                selector: '%%order_class%% .media_item .et-pb-icon.hover_icon',
                declaration: `opacity: 0; transform: ${InstagramCarousel.df_transform_values(icon_anim_direction).default};`,
            }]);

            additionalCss.push([{
                selector: '%%order_class%% .media_item:hover .et-pb-icon.hover_icon',
                declaration: `opacity: 1; transform: ${InstagramCarousel.df_transform_values(icon_anim_direction).hover};`,
            }]);


        }

        if (props.always_show_content === 'off' && props.content_hover === 'on') {
            const anim_direction = props.anim_direction ? props.anim_direction : 'top';
            additionalCss.push([{
                selector: '%%order_class%% .media_item .content',
                declaration: `opacity: 0; transform: ${InstagramCarousel.df_transform_values(anim_direction).default};`,
            }]);
            additionalCss.push([{
                selector: '%%order_class%% .media_item:hover .content',
                declaration: `opacity: 1; transform: ${InstagramCarousel.df_transform_values(anim_direction).hover};`,
            }]);
        }
        if (props.use_icon === 'on' && props.always_show_icon === 'on'){
            additionalCss.push([{
                selector: '%%order_class%% .media_item .et-pb-icon.hover_icon',
                declaration: `opacity: 1; transform: none;`,
            }]);
        }
        if (props.item_overflow === 'on') {
            additionalCss.push([{
                selector: '%%order_class%% .media_item > div',
                declaration: `overflow: hidden;`,
            }]);
        }
        if (props.dots_align) {
            additionalCss.push([{
                selector: '%%order_class%% .swiper-pagination',
                declaration: `text-align: ${props.dots_align};`,
            }]);
        }
        // arrow position
        if (props.arrow === 'on') {
            const pos = props.arrow_position ? props.arrow_position : 'middle';
            const pos_tab = props.arrow_position_tablet ? props.arrow_position_tablet : pos;
            const pos_ph = props.arrow_position_phone ? props.arrow_position_phone : pos_tab;
            const a_align = props.arrow_align ? props.arrow_align : 'space-between';
            const a_align_tab = props.arrow_align_tablet ? props.arrow_align_tablet : a_align;
            const a_align_ph = props.arrow_align_phone ? props.arrow_align_phone : a_align_tab;

            additionalCss.push([{
                selector: '%%order_class%% .df_inc_arrows',
                declaration: InstagramCarousel.df_arrow_pos_styles(pos),
                'device': 'desktop',
            }]);
            additionalCss.push([{
                selector: '%%order_class%% .df_inc_arrows',
                declaration: InstagramCarousel.df_arrow_pos_styles(pos_tab),
                'device': 'tablet',
            }]);
            additionalCss.push([{
                selector: '%%order_class%% .df_inc_arrows',
                declaration: InstagramCarousel.df_arrow_pos_styles(pos_ph),
                'device': 'phone'
            }]);
            // alignment
            additionalCss.push([{
                selector: '%%order_class%% .df_inc_arrows',
                declaration: `justify-content: ${a_align};`,
                'device': 'desktop',
            }]);
            additionalCss.push([{
                selector: '%%order_class%% .df_inc_arrows',
                declaration: `justify-content: ${a_align_tab};`,
                'device': 'tablet',
            }]);
            additionalCss.push([{
                selector: '%%order_class%% .df_inc_arrows',
                declaration: `justify-content: ${a_align_ph};`,
                'device': 'phone'
            }]);
            utility.process_range_value({
                'props': props,
                'key': 'arrow_opacity',
                'additionalCss': additionalCss,
                'selector': '%%order_class%% .df_inc_arrows div',
                'type': 'opacity',
            });
            if( 'on' !== props.loop){
                utility.process_range_value({
                    'props'             : props,
                    'key'               : 'arrow_opacity_disable',
                    'additionalCss'     : additionalCss,
                    'selector'          : '%%order_class%% .df_inc_arrows div.swiper-button-disabled',
                    'type'              : 'opacity',
                });
            }
            utility.process_margin_padding({
                'props': props,
                'key': 'arrow_prev_margin',
                'additionalCss': additionalCss,
                'selector': '%%order_class%% .df_inc_arrows .swiper-button-prev',
                'type': 'margin'
            });
            utility.process_margin_padding({
                'props': props,
                'key': 'arrow_prev_padding',
                'additionalCss': additionalCss,
                'selector': '%%order_class%% .df_inc_arrows .swiper-button-prev',
                'type': 'padding'
            });
            utility.process_margin_padding({
                'props': props,
                'key': 'arrow_next_margin',
                'additionalCss': additionalCss,
                'selector': '%%order_class%% .df_inc_arrows .swiper-button-next',
                'type': 'margin'
            });
            utility.process_margin_padding({
                'props': props,
                'key': 'arrow_next_padding',
                'additionalCss': additionalCss,
                'selector': '%%order_class%% .df_inc_arrows .swiper-button-next',
                'type': 'padding'
            });
            // arrow icon styles
            utility.process_icon_styles({
                'props': props,
                'key': 'arrow_prev_icon',
                'additionalCss': additionalCss,
                'selector': '%%order_class%% .df_inc_arrows div.swiper-button-prev:after'
            })
            utility.process_icon_styles({
                'props': props,
                'key': 'arrow_next_icon',
                'additionalCss': additionalCss,
                'selector': '%%order_class%% .df_inc_arrows div.swiper-button-next:after'
            })
        }

        // icon font family
        utility.process_icon_font_style({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'arrow_prev_icon_font_icon',
            'selector'          : '%%order_class%% .swiper-button-prev:after'
        })
        utility.process_icon_font_style({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'arrow_next_icon_font_icon',
            'selector'          : '%%order_class%% .swiper-button-next:after'
        })
        utility.process_icon_font_style({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'hover_icon',
            'selector'          : '%%order_class%% .et-pb-icon.hover_icon'
        })

        return additionalCss;
    }

    static df_arrow_pos_styles(value) {
        const options = {
            top: `position: relative; 
                top: auto;
                left: auto;
                right: auto;
                transform: translateY(0);
                order: 0;`,
            middle: `position: absolute; 
                    top: 50%;
                    left: 0;
                    right: 0;
                    transform: translateY(-50%);`,
            bottom: `position: relative; 
                    top: auto;
                    left: auto;
                    right: auto;
                    transform: translateY(0);
                    order: 2;`
        }
        return options[value];
    }

    df_ic_arrow(order_number) {
        const utils = window.ET_Builder.API.Utils;
        const prev_icon = this.props.arrow_prev_icon_use_icon === 'on' && this.props.arrow_prev_icon_font_icon ?
            utils.processFontIcon(this.props.arrow_prev_icon_font_icon) : '4';
        const next_icon = this.props.arrow_next_icon_use_icon === 'on' && this.props.arrow_next_icon_font_icon ?
            utils.processFontIcon(this.props.arrow_next_icon_font_icon) : '5';

        return this.props.arrow === 'on' ?
            <div className="df_inc_arrows">
                <div className={"swiper-button-next inc-next-" + order_number} data-icon={next_icon}></div>
                <div className={"swiper-button-prev inc-prev-" + order_number} data-icon={prev_icon}></div>
            </div> : '';
    }

    df_ic_dots(order_number) {
        return this.props.dots === 'on' ?
            <div className={"swiper-pagination inc-dots-" + order_number}></div> : '';
    }

    contentOutput(props) {
        const utils = window.ET_Builder.API.Utils;
        const always_show_icon = ( props.use_icon === 'on' && props.always_show_icon ==='on' ) ? ' always_show_icon' : '';
        const hover_icon = props.use_icon === 'on' && props.hover_icon ?
            <span className={"et-pb-icon hover_icon" + always_show_icon} >{utils.processFontIcon(this.props.hover_icon)} </span> : '';
        if (this.state.items !== null) {
            let totalItem = this.state.items//.filter(item => item.media_type === 'IMAGE');
            const error = this.state.error;
            if (!totalItem.error) {
                if ('on' == props.instagram_post_only_image) {
                    totalItem = totalItem.filter(function (itemData) {
                        return itemData.media_type.indexOf('IMAGE') > -1

                    });
                }


            }
            const moduleError = props.instagram_user_token === '' ?
                <div className="instagram-carousel-error">Please Enter Access token </div>
                :
                <div className="instagram-carousel-error">{this.state.error_msg}</div>;
            let HtmlCode = '';

            if (props.instagram_user_token !== '' && !totalItem.error) {
                HtmlCode = totalItem.map(function (item) {
                    const Content = item.caption ? <div className="content">{item.caption}</div> : '';
                    const overlay_wrapper = ('VIDEO' == item.media_type) ? '' : <div className="overlay_wrapper">{hover_icon}{Content}</div>;
                    const ItemType = ('VIDEO' == item.media_type) ? 'video' : 'img';
                    const autoplay_vedio = props.autoplay_video === 'on' ? true : false;
                    const MediaHtml = ('VIDEO' !== item.media_type) ?
                        <div className="inc_image_wrapper">
                            <ItemType src={item.media_url} atl={item.username} />
                        </div>

                        :
                        <div className="inc_image_wrapper">
                            <video  src={item.media_url} controls autoPlay={autoplay_vedio} ></video>
                        </div>
                    return <div className="media_item swiper-slide" key={item.id}>
                        <div>
                            <div className="df_inci_container">
                                {MediaHtml}
                                {overlay_wrapper}
                            </div>
                        </div>
                    </div>;
                });
            } else {
                HtmlCode = moduleError;
            }


            return HtmlCode;
        }

    }

    // get transform values
    static df_transform_values(key = 'bottom') {
        const transfor_values = {
            'top': {
                'default': 'translateY(-60px)',
                'hover': 'translateY(0px)'
            },
            'bottom': {
                'default': 'translateY(60px)',
                'hover': 'translateY(0px)'
            },
            'left': {
                'default': 'translateX(-60px)',
                'hover': 'translateX(0px)'
            },
            'right': {
                'default': 'translateX(60px)',
                'hover': 'translateX(0px)'
            },
            'center': {
                'default': 'scale(0)',
                'hover': 'scale(1)'
            },
            'top_right': {
                'default': 'translateX(50px) translateY(-50px)',
                'hover': 'translateX(0px) translateY(0px)'
            },
            'top_left': {
                'default': 'translateX(-50px) translateY(-50px)',
                'hover': 'translateX(0px) translateY(0px)'
            },
            'bottom_right': {
                'default': 'translateX(50px) translateY(50px)',
                'hover': 'translateX(0px) translateY(0px)'
            },
            'bottom_left': {
                'default': 'translateX(-50px) translateY(50px)',
                'hover': 'translateX(0px) translateY(0px)'
            },
        };
        return transfor_values[key];
    }

    render() {
        const props = this.props;
        let _class = '';
        const order_number = Number(props.moduleInfo.address.replace(/\D/g, ''));

        if (props.variable_width && props.variable_width === 'on') {
            _class = _class + ' variable-width';
        }

        return (<div className={"df_inc_container" + _class} ref={this.wrapper}>
            {this.state.loading === false ?
                <React.Fragment>
                    <div className="df_inc_inner_wrapper">
                        <div className="swiper-container">
                            <div className="swiper-wrapper">
                                {this.contentOutput(props)}
                            </div>
                        </div>
                        {this.df_ic_arrow(order_number)}
                    </div>
                    {this.df_ic_dots(order_number)}
                </React.Fragment> : <React.Fragment>Loading</React.Fragment>}
        </div>)
    }
}
export default InstagramCarousel;
