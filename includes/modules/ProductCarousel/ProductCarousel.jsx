// External Dependencies
import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import _ from 'lodash';
import utility from '../../../scripts/df_scripts/utilities';
import Swiper from '../../../public/js/lib/swiper.min';
// Internal Dependencies
import './style.css';

var lodash = _.noConflict();


class ProductCarousel extends Component {
    static slug = 'difl_product_carousel';
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            products: '',
            loading: true,
            masonry: null,
            product_items: [],
            product_items_without_class: [],
            props: this.props
        }

        this.wrapper = React.createRef();
        this.get_products = this.get_products.bind(this);
        this.swiper_init = this.swiper_init.bind(this);
        this.render_output = this.render_output.bind(this);
        this.get_product_items = this.get_product_items.bind(this);
        this.df_pc_arrow = this.df_pc_arrow.bind(this);
        this.df_pc_dots = this.df_pc_dots.bind(this);
        this.computedType = ['posts_number', 'type', 'include_categories', 'include_tags',
        'orderby', 'offset_number', 'use_image_as_background','use_background_scale',
        'equal_height', 'show_badge', 'show_badge_in_image' , 'on_sale_text','after_sale_text_enable', 'after_sale_text_type', 'after_sale_text', 'enable_custom_soldout_text' , 'custom_soldout_text' ];
        this.computedTypeCarousel = ['item_spacing', 'item_desktop', 'speed',
            'loop', 'arrow', 'dots', 'variable_width', 'item_height',
            'carousel_type', 'centeredSlides' , 'coverflow_shadow'
        ]

    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidUpdate(prevProps, prevState) {
        const _this = this;

        if(_this.state.loading) {
            setTimeout(_this.get_products, 800)
        }

        _this.get_product_items();

        for (const index of _this.computedType) {
            if (prevProps[index] !== _this.props[index]) {
                if(_this.computedType.includes(index)){
                    _this.setState({loading: true})
                }
            }
        }
        _this.swiper_init();

    }


    /**
     * Get all products through ajax request
     *
     */
    get_products() {
        const _this = this;
        if(_this.get_product_items() == undefined){
           return ;
        }

        axios({
            method: 'post',
            url: window.ETBuilderBackend.ajaxUrl,
            params: {
                action : 'df_carousel_products'
            },

            data : {
                et_admin_load_nonce: window.et_fb_options.et_admin_load_nonce,
                productItems: _this.get_product_items().productItems,
               //element_classes: _this.state.element_classes,
                //module_type : 'carousel',
                posts_number: _this.props.posts_number,
                type: _this.props.type,
                include_categories: _this.props.include_categories,
                include_tags: _this.props.include_tags,
                orderby: _this.props.orderby,
                layout: _this.props.layout,
                //use_image_as_background: _this.props.use_image_as_background,
                use_background_scale: _this.props.use_background_scale,
                equal_height: _this.props.equal_height,
                show_badge: _this.props.show_badge,
                show_badge_in_image: _this.props.show_badge_in_image,
                on_sale_text: _this.props.on_sale_text,
                after_sale_text_enable: _this.props.after_sale_text_enable,
                after_sale_text_type: _this.props.after_sale_text_type,
                after_sale_text: _this.props.after_sale_text,
                enable_custom_soldout_text: _this.props.enable_custom_soldout_text,
                custom_soldout_text: _this.props.custom_soldout_text
            }
        })
        .then(function(response) {
            _this.setState({
                loading: false,
                products: response.data.data
            })
        })

    }

    get_product_items() {
        const _this = this;
        const props = _this.props;
        const content = props.content;
        const productItems = {};
        const productItems_without_class = {};
        const inner = [];
        const inner_without_class = [];
        const outer = [];
        const outer_without_class = [];
        const products_item_object = [];

        if (!content) return;

        content.map((data, i) => {
            const utils = window.ET_Builder.API.Utils;
            const item_props = data.props.attrs;
            const type = item_props.type ? item_props.type : 'select';
            var object = {};

            object.type = type;

            if(type !== 'select') {

                // title
                object.title_tag = item_props.title_tag ? item_props.title_tag : 'h2';
                object.price_tag = item_props.price_tag ? item_props.price_tag : 'span';
                object.product_link = item_props.product_link ? item_props.product_link : 'off';
                // content
                object.use_product_excrpt = item_props.use_product_excrpt ? item_props.use_product_excrpt : 'off';
                object.excerpt_length = item_props.excerpt_length ? item_props.excerpt_length : '100';

                // read more
                object.read_more_text = item_props.read_more_text ? item_props.read_more_text : 'Read More';

                // rating
                object.show_rating_all_item = item_props.show_rating_all_item ? item_props.show_rating_all_item : 'off';
                // icon
                object.use_icon = item_props.use_icon ? item_props.use_icon : 'off';
                object.font_icon = item_props.font_icon ? utils.processFontIcon(item_props.font_icon) : '5';
                object.use_image_as_icon = item_props.use_image_as_icon?item_props.use_image_as_icon: 'off';
                object.image_as_icon = item_props.image_as_icon?item_props.image_as_icon: '';
                object.image_as_icon_width = item_props.image_as_icon_width?item_props.image_as_icon_width: '20px';
                object.image_icon_placement = item_props.image_icon_placement?item_props.image_icon_placement: 'right';

                //Categories
                object.use_category_link = item_props.use_category_link?item_props.use_category_link: 'off';
                object.use_separator = item_props.use_separator ? item_props.use_separator: 'off';
                object.category_separator = item_props.category_separator ? item_props.category_separator: '|';
                object.category_open_new_tab = item_props.category_open_new_tab ? item_props.category_open_new_tab: 'off';

                // image
                object.image_size = item_props.image_size ? item_props.image_size : 'mid';

                // placement
                object.placement = item_props.outside_wrapper ? item_props.outside_wrapper : 'off';

                // hover
                object.image_scale = item_props.image_scale ? item_props.image_scale : 'no-image-scale';
                object.overlay = item_props.overlay ? item_props.overlay : 'off';

                // overlay icon
                object.overlay_icon = item_props.overlay_icon ? item_props.overlay_icon : 'off';
                object.overlay_icon_reveal = item_props.overlay_icon_reveal ? item_props.overlay_icon_reveal : 'df-fade-up';
                object.overlay_font_icon =item_props.overlay_icon ==='on' && item_props.overlay_font_icon ? item_props.overlay_font_icon : '5';

                // custom text
                object.custom_text = item_props.custom_text ? item_props.custom_text : '';
                object.add_to_cart_text = item_props.add_to_cart_text ? item_props.add_to_cart_text : 'Add To Cart';
                object.use_only_icon = item_props.use_only_icon ? item_props.use_only_icon : 'off';
                // background
                object.background_enable_mask_style = item_props.background_enable_mask_style ? item_props.background_enable_mask_style : 'off';
                object.background_enable_pattern_style = item_props.background_enable_pattern_style ? item_props.background_enable_pattern_style : 'off';
                // class
                object.module_vb_class =  'et-module-' + data.props._key;
                object.class =  data.props.matching.slug + '_' +  data.props.shortcode_index;

                if (item_props.outside_wrapper === 'on') {
                    outer.push(object);
                    outer_without_class.push(lodash.omit(object, ['module_vb_class', 'class']));
                } else {
                    inner.push(object);
                    inner_without_class.push(lodash.omit(object, ['module_vb_class', 'class']));
                }
                products_item_object.push(object);
            }
        });

        productItems_without_class.inner = inner_without_class;
        productItems_without_class.outer = outer_without_class;

        productItems.inner = inner;
        productItems.outer = outer;

        const _productCombineItems = [...outer, ...inner];

        if(!lodash.isEqual(productItems_without_class, _this.state.product_items_without_class)) {
            _this.setState({
                product_items : productItems,
                loading: true,
                product_items_without_class: productItems_without_class
            })
        }

        return {
            'productItems': productItems,
            'products_item_object': _productCombineItems
        };
    }

    swiper_init() {
        if (this.state.loading === true) {
             //this.setState({loading: false})
            return;
        }
        const _this = this;
        const props = this.props;
        const selector = this.wrapper.current.querySelector('.swiper-container');
        const order_number = Number(props.moduleInfo.address.replace(/\D/g,''));
        const item_spacing_tablet = props.item_spacing_tablet ? props.item_spacing_tablet : props.item_spacing;
        const item_spacing_phone = props.item_spacing_phone ? props.item_spacing_phone : item_spacing_tablet;
        $(selector).find('.products').addClass('df-products').addClass('swiper-wrapper');
        $(selector).find('.products').removeClass('products');

        var config = {
            init: false,
            speed: parseInt(props.speed),
            loop:  props.loop === 'on' ? true : false,
            effect: props.carousel_type,
            centeredSlides: props.centered_slides === 'on' ? true : false,
            slideClass: 'swiper-slide',
            wrapperClass : 'df-products',
            breakpoints: {
                // desktop
                981: {
                    slidesPerView: parseInt(props.item_desktop),
                    spaceBetween : parseInt(props.item_spacing)
                },
                // tablet
                768: {
                    slidesPerView: parseInt(props.item_tablet),
                    spaceBetween : parseInt(item_spacing_tablet)
                },
                // mobile
                1: {
                    slidesPerView: parseInt(props.item_mobile),
                    spaceBetween : parseInt(item_spacing_phone)
                },
            }
        }

        //arrow navigation
        if (props.arrow === 'on') {
            config['navigation'] = {
                nextEl: '.bc-next-'+order_number,
                prevEl: '.bc-prev-'+order_number
            }
        }

        // dot pagination
        if (props.dots === 'on') {
            config['pagination'] = {
                el: '.bc-dots-'+order_number
            }
        }

        // // effect
        if (props.carousel_type === 'coverflow') {
            config['coverflowEffect'] = {
                slideShadows: props.coverflow_shadow === 'on' ? true : false,
                rotate: parseInt(props.coverflow_rotate),
                stretch: parseInt(props.coverflow_stretch),
                depth: parseInt(props.coverflow_depth),
                modifier: parseInt(props.coverflow_modifier)
            };
        }
        if(selector){
            var slider = new Swiper (selector, config);
            slider.init();
        }


        for (const index in _this.state.props) {
            if (_this.state.props[index] !== _this.props[index]) {
                if(_this.computedTypeCarousel.includes(index)){
                    slider.destroy();
                    _this.setState({props: _this.props, loading: true})
                }
            }
        }

    }

    static css(props) {
        const additionalCss = [];

        // Builder Slide count fix
        additionalCss.push([{
            selector:    '%%order_class%% .swiper-wrapper',
            declaration: `width: fit-content;`,
        }]);
        //equal height
        if (props.equal_height === 'on') {
            additionalCss.push([{
                selector:    '%%order_class%% ul li.df-equal-height',
                declaration: `align-self: auto;
                              height: auto;`,
            }]);
        }

        // coverflow shadow color
        if (props.coverflow_shadow === 'on') {
            additionalCss.push([{
                selector:    '%%order_class%% .swiper-container-3d .swiper-slide-shadow-left',
                declaration: `background-image: linear-gradient(to left,${props.coveflow_color_dark},${props.coveflow_color_light}) !important;`,
            }]);
            additionalCss.push([{
                selector:    '%%order_class%% .swiper-container-3d .swiper-slide-shadow-right',
                declaration: `background-image: linear-gradient(to right,${props.coveflow_color_dark},${props.coveflow_color_light}) !important;`,
            }]);
        }
        if(props.show_badge ==='on'){
            additionalCss.push([{
                selector:    '%%order_class%% span.df-onsale:not(.df-sale-badge)',
                declaration: `display:none`
            }]);
        }

        utility.df_process_string_attr({
            'props': props,
            'key': 'alignment',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-product-inner-wrap',
            'type': 'text-align'
        });

        // spacing
        utility.process_margin_padding({
            'props': props,
            'key': 'item_wrapper_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-product-outer-wrap',
            'type': 'padding'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'item_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-product-inner-wrap',
            'type': 'margin'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'item_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-product-inner-wrap',
            'type': 'padding'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'on_sale_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .woocommerce ul.df-products li.product .df-onsale',
            'type': 'margin'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'on_sale_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .woocommerce ul.df-products li.product .df-onsale',
            'type': 'padding'
        });

        utility.process_margin_padding({
            'props': props,
            'key': 'wrapper_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-products',
            'type': 'margin'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'wrapper_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-products',
            'type': 'padding'
        });
        // background
        utility.df_process_bg({
            'props': props,
            'additionalCss': additionalCss,
            'key': 'item_background',
            'selector': '%%order_class%% .df-product-inner-wrap'
        });
        utility.df_process_bg({
            'props': props,
            'additionalCss': additionalCss,
            'key': 'on_sale_background',
            'selector': '%%order_class%% .woocommerce ul.df-products li.product .df-onsale ,%%order_class%% .woocommerce-page ul.df-products li.product .df-onsale',
            'important' : true
        });

         // arrow
         if (props.arrow === 'on') {
            const pos = props.arrow_position ? props.arrow_position : 'middle';
            const pos_tab = props.arrow_position_tablet ? props.arrow_position_tablet : pos;
            const pos_ph = props.arrow_position_phone ? props.arrow_position_phone : pos_tab;
            const a_align = props.arrow_align ? props.arrow_align : 'space-between';
            const a_align_tab = props.arrow_align_tablet ? props.arrow_align_tablet : a_align;
            const a_align_ph = props.arrow_align_phone ? props.arrow_align_phone : a_align_tab;

            additionalCss.push([{
                selector:    '%%order_class%% .df_pc_arrows',
                declaration: ProductCarousel.df_arrow_pos_styles(pos),
                'device':'desktop',
            }]);
            additionalCss.push([{
                selector:    '%%order_class%% .df_pc_arrows',
                declaration: ProductCarousel.df_arrow_pos_styles(pos_tab),
                'device':'tablet',
            }]);
            additionalCss.push([{
                selector:    '%%order_class%% .df_pc_arrows',
                declaration: ProductCarousel.df_arrow_pos_styles(pos_ph),
                'device':'phone'
            }]);
            // alignment
            additionalCss.push([{
                selector:    '%%order_class%% .df_pc_arrows',
                declaration: `justify-content: ${a_align};`,
                'device':'desktop',
            }]);
            additionalCss.push([{
                selector:    '%%order_class%% .df_pc_arrows',
                declaration: `justify-content: ${a_align_tab};`,
                'device':'tablet',
            }]);
            additionalCss.push([{
                selector:    '%%order_class%% .df_pc_arrows',
                declaration: `justify-content: ${a_align_ph};`,
                'device':'phone'
            }]);
            if (props.arrow_circle === 'on') {
                additionalCss.push([{
                    selector:    '%%order_class%% .df_pc_arrows > div',
                    declaration: `border-radius: 50%;`,
                }]);
            }

            // arrow colors
            utility.process_color({
                'props'             : props,
                'key'               : 'arrow_color',
                'additionalCss'     : additionalCss,
                'selector'          : '%%order_class%% .df_pc_arrows div:after',
                'type'              : 'color',
            })
            utility.process_color({
                'props'             : props,
                'key'               : 'arrow_background',
                'additionalCss'     : additionalCss,
                'selector'          : '%%order_class%% .df_pc_arrows div',
                'type'              : 'background-color',
            })
            //disable arrow colors
            if(props.disable_arrow_design === 'on'){
                utility.process_color({
                    'props'             : props,
                    'key'               : 'disable_arrow_color',
                    'additionalCss'     : additionalCss,
                    'selector'          : '%%order_class%% .df_pc_arrows div.swiper-button-disabled:after',
                    'type'              : 'color',
                })
                utility.process_color({
                    'props'             : props,
                    'key'               : 'disable_arrow_background',
                    'additionalCss'     : additionalCss,
                    'selector'          : '%%order_class%% .df_pc_arrows div.swiper-button-disabled',
                    'type'              : 'background-color',
                })
            }

            utility.process_range_value({
                'props'             : props,
                'key'               : 'arrow_opacity',
                'additionalCss'     : additionalCss,
                'selector'          : '%%order_class%% .df_pc_arrows div',
                'type'              : 'opacity',
            });
            if( 'on' !== props.loop){
                utility.process_range_value({
                    'props'             : props,
                    'key'               : 'arrow_opacity_disable',
                    'additionalCss'     : additionalCss,
                    'selector'          : '%%order_class%% .df_pc_arrows div.swiper-button-disabled',
                    'type'              : 'opacity',
                });
            }
            utility.process_margin_padding({
                'props' : props,
                'key':'arrow_prev_margin',
                'additionalCss' : additionalCss,
                'selector' : '%%order_class%% .df_pc_arrows .swiper-button-prev',
                'type'  : 'margin',
                'important' : false
            });
            utility.process_margin_padding({
                'props' : props,
                'key':'arrow_prev_padding',
                'additionalCss' : additionalCss,
                'selector' : '%%order_class%% .df_pc_arrows .swiper-button-prev',
                'type'  : 'padding',
                'important' : false
            });
            utility.process_margin_padding({
                'props' : props,
                'key':'arrow_next_margin',
                'additionalCss' : additionalCss,
                'selector' : '%%order_class%% .df_pc_arrows .swiper-button-next',
                'type'  : 'margin',
                'important' : false
            });
            utility.process_margin_padding({
                'props' : props,
                'key':'arrow_next_padding',
                'additionalCss' : additionalCss,
                'selector' : '%%order_class%% .df_pc_arrows .swiper-button-next',
                'type'  : 'padding',
                'important' : false
            });
            // arrow icon styles
            utility.process_icon_styles({
                'props' : props,
                'key':'arrow_prev_icon',
                'additionalCss' : additionalCss,
                'selector' : '%%order_class%% .df_pc_arrows div.swiper-button-prev:after'
            })
            utility.process_icon_styles({
                'props' : props,
                'key':'arrow_next_icon',
                'additionalCss' : additionalCss,
                'selector' : '%%order_class%% .df_pc_arrows div.swiper-button-next:after'
            })
        }
        // dots
        if(props.dots === 'on') {
            const dots_pos = props.dots_position ? props.dots_position : 'top';
            const dots_pos_tab = props.dots_position_tablet ? props.dots_position_tablet : dots_pos;
            const dots_pos_ph = props.dots_position_phone ? props.dots_position_phone : dots_pos_tab;

            additionalCss.push([{
                selector:    '%%order_class%% .swiper-pagination',
                declaration: ProductCarousel.df_arrow_pos_styles(dots_pos),
                'device':'desktop',
            }]);
            additionalCss.push([{
                selector:    '%%order_class%% .swiper-pagination',
                declaration: ProductCarousel.df_arrow_pos_styles(dots_pos_tab),
                'device':'tablet',
            }]);
            additionalCss.push([{
                selector:    '%%order_class%% .swiper-pagination',
                declaration: ProductCarousel.df_arrow_pos_styles(dots_pos_ph),
                'device':'phone'
            }]);

            if(props.large_active_dot === 'on') {
                additionalCss.push([{
                    selector:    '%%order_class%% .swiper-pagination:not(.dots_style_square_rotate) .swiper-pagination-bullet-active',
                    declaration: `width: 40px; border-radius: 20px;`
                }]);
                utility.process_range_value({
                    'props': props,
                    'key': 'large_active_dot_width',
                    'additionalCss': additionalCss,
                    'selector': '%%order_class%% .swiper-pagination:not(.dots_style_square_rotate) .swiper-pagination-bullet-active',
                    'type': 'width',
                    'default_value': '40px',
                    'important': true
                });
            }

            if(props.custom_dot_style_enable === 'on'){
                utility.process_range_value({
                    'props': props,
                    'key': 'custom_dot_width',
                    'additionalCss': additionalCss,
                    'selector': '%%order_class%% .swiper-pagination:not(.dots_style_square_rotate) .swiper-pagination-bullet',
                    'type': 'width',
                    'important': false
                });

                if (props.dots_style_type === 'default' || props.dots_style_type === 'square') {
                    utility.process_range_value({
                        'props': props,
                        'key': 'custom_dot_width',
                        'additionalCss': additionalCss,
                        'selector': '%%order_class%% .swiper-pagination:not(.dots_style_square_rotate) .swiper-pagination-bullet',
                        'type': 'height',
                        'default_value': '12px',
                        'important': true
                    });
                }

                if (props.active_dot_border_style_enable === 'on') {
                    utility.process_range_value({
                        'props': props,
                        'key': 'custom_dot_width',
                        'additionalCss': additionalCss,
                        'selector': '%%order_class%% .swiper-pagination:not(.dots_style_square_rotate) .swiper-pagination-bullet',
                        'type': 'margin-right',
                        'important': true
                    });
                }

            }
            if(props.dots_align) {
                additionalCss.push([{
                    selector:    '%%order_class%% .swiper-pagination',
                    declaration: `text-align: ${props.dots_align};`,
                }]);
            }
            utility.process_color({
                'props'             : props,
                'key'               : 'dots_color',
                'additionalCss'     : additionalCss,
                'selector'          : '%%order_class%% .swiper-pagination span',
                'type'              : 'background'
            });
            utility.process_color({
                'props'             : props,
                'key'               : 'active_dots_color',
                'additionalCss'     : additionalCss,
                'selector'          : '%%order_class%% .swiper-pagination span.swiper-pagination-bullet-active',
                'type'              : 'background'
            });
            utility.process_color({
                'props'             : props,
                'key'               : 'active_dots_color',
                'additionalCss'     : additionalCss,
                'selector'          : '%%order_class%% .swiper-pagination span.swiper-pagination-bullet-active:before',
                'type'              : 'border-color',
                'important'         : true
            });
            utility.process_margin_padding({
                'props' : props,
                'key':'dots_wrapper_margin',
                'additionalCss' : additionalCss,
                'selector' : '%%order_class%% .swiper-pagination',
                'type'  : 'margin',
                'important' : false
            });
            utility.process_margin_padding({
                'props' : props,
                'key':'dots_wrapper_padding',
                'additionalCss' : additionalCss,
                'selector' : '%%order_class%% .swiper-pagination',
                'type'  : 'padding',
                'important' : false
            });
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

        var translate_values = {
            'top_left' :  'top: 0px !important; left: 0 !important; transform: none !important;',
            'top_center' :  'top: 0px !important; left: 50% !important; transform: translateX(-50%) !important;',
            'top_right' :  'top:0px !important; left: 100% !important; transform: translate(-100%) !important;',
            'center_left' :  'left: 0px !important; top: 50% !important; transform: translateY(-50%) !important;',
            'center_center' :  'left: 50% !important; top:50% !important; transform: translate(-50%, -50%) !important;',
            'center_right' :  'left: 100% !important; top: 50% !important; transform: translate(-100%, -50%) !important;',
            'bottom_left' :  'left:0px !important; top: 100% !important; transform: translateY(-100%) !important;',
            'bottom_center' :  'left: 50% !important; top:100% !important; transform: translate(-50% ,-100%) !important',
            'bottom_right' :  'left: 100% !important; top: 100% !important; transform: translate(-100% ,-100%) !important;'
        };
        const badge_placement = props.badge_placement ? props.badge_placement : 'top_left';
        utility.df_process_string_attr({
            'props'             : props,
            'key'               : 'badge_placement',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .woocommerce ul.df-products li.product .df-sale-badge.df-onsale',
            'type'              : 'text-align',
            'default_value'     : 'center'
        });
        additionalCss.push([{
            selector:    '%%order_class%% .woocommerce ul.df-products li.product .df-sale-badge.df-onsale',
            declaration: translate_values[badge_placement],
        }]);

        // overflow
        if( props.outer_wrpper_visibility && props.outer_wrpper_visibility !== 'default' ) {
            utility.df_process_string_attr({
                'props'             : props,
                'key'               : 'outer_wrpper_visibility',
                'additionalCss'     : additionalCss,
                'selector'          : '%%order_class%% .df-product-outer-wrap',
                'type'              : 'overflow'
            });
        }
        if( props.inner_wrpper_visibility && props.inner_wrpper_visibility !== 'default' ) {
            utility.df_process_string_attr({
                'props'             : props,
                'key'               : 'inner_wrpper_visibility',
                'additionalCss'     : additionalCss,
                'selector'          : '%%order_class%% .df-product-inner-wrap',
                'type'              : 'overflow'
            });
        }

        return additionalCss;
    }

    static df_arrow_pos_styles (value) {
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
                    order: 1;`
        }
        return options[value];
    }

    df_pc_arrow(order_number) {
        const utils = window.ET_Builder.API.Utils;
        const prev_icon = this.props.arrow_prev_icon_use_icon === 'on' &&  this.props.arrow_prev_icon_font_icon ?
            utils.processFontIcon(this.props.arrow_prev_icon_font_icon) : '4';
        const next_icon = this.props.arrow_next_icon_use_icon === 'on' &&  this.props.arrow_next_icon_font_icon ?
            utils.processFontIcon(this.props.arrow_next_icon_font_icon) : '5';

        return this.props.arrow === 'on' ?
            <div className="df_pc_arrows">
                <div className={"swiper-button-next bc-next-" + order_number} data-icon={next_icon}></div>
                <div className={"swiper-button-prev bc-prev-" + order_number} data-icon={prev_icon}></div>
            </div> : '';
    }

    df_pc_dots(order_number) {
        var dosts_style_class = '';
        var active_dot_border_style = '';
        if(this.props['dots_style_type'] && this.props['dots_style_type'] !== ''){
            dosts_style_class = 'dots_style_'+ this.props['dots_style_type'];
        }
        if(this.props['active_dot_border_style_enable'] && this.props['active_dot_border_style_enable'] === 'on'){
            active_dot_border_style += 'active_dot_border_style';
        }
        return this.props.dots === 'on' ?
            <div className={"swiper-pagination bc-dots-"+ order_number + " " + dosts_style_class + " " + active_dot_border_style}></div> : '';
    }

    render_output() {
        const props = this.props;
        var content = this.state.products;
        var parser = new DOMParser();
        var doc = parser.parseFromString(content, "text/html");

        if(this.get_product_items() == undefined){
            var shop_msg = '<h2 style="background:#eee; padding: 10px 20px;">Please add a new product item.</h2>';
            return {__html: shop_msg};
         }
        var product_items = this.get_product_items().products_item_object;
        $(doc).find('.df-product-outer-wrap').each(function(index, element){
            var item = $(element).find('.df-item-wrap');
            item.each(function(i,e){
                var classes = $.grep(this.className.split(" "), function(v, i){
                    return v.indexOf('difl_productitem') === 0;
                }).join();
                $(e).removeClass(classes);
                if (product_items[i]) {
                    $(e).addClass(product_items[i]['class'])
                }
            })
        })

        return {__html: doc.querySelector('body').outerHTML};
    }

    render() {
        const props = this.props;
        const order_number = Number(props.moduleInfo.address.replace(/\D/g,''));

        return(
            <React.Fragment>
                {this.state.loading === false  ?
                    <React.Fragment>
                        { props.content.length !== 0 ? <div style={{display: 'none'}}>{props.content}</div> : '' }
                        <div className="df_product_carousel_container"  ref={this.wrapper} dangerouslySetInnerHTML={this.render_output()}/>

                            {this.df_pc_arrow(order_number)}

                        {this.df_pc_dots(order_number)}
                    </React.Fragment>
                    :
                    <div className="et-fb-preloader et-fb-preloader__loading">
                        <div className="et-fb-loader"/>
                    </div>
                }
            </React.Fragment>
        )
    }
}
export default ProductCarousel;
