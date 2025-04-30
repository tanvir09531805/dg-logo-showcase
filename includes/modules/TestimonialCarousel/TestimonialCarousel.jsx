// External Dependencies
import React, { Component } from 'react';
import utility from '../../../scripts/df_scripts/utilities';
import $ from 'jquery';

// import Swiper from '../../../assets/scripts/lib/swiper.min';
import Swiper from '../../../public/js/lib/swiper.min';

// Internal Dependencies
import './style.css';


class TestimonialCarousel extends Component {
    static slug = 'difl_testimonialcarousel';
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            slider: null,
            loading: true,
            props: this.props
        }
        this.wrapper = React.createRef();
        this.swiper_init = this.swiper_init.bind(this);
        this.df_tc_arrow = this.df_tc_arrow.bind(this);
        this.df_tc_dots = this.df_tc_dots.bind(this);
        this.computedType = ['item_spacing', 'item_desktop', 'speed',
            'loop', 'arrow', 'dots', 'variable_width', 'item_height',
            'carousel_type', 'centeredSlides'
        ]
    }

    componentDidMount() {
        this._isMounted = true;

        if (this.state.loading === true) {
            this.setState({loading: false})
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidUpdate(prevProps, prevState) {
        this.swiper_init();
    }

    swiper_init() {
        if (this.state.loading === true) {
            this.setState({loading: false})
            return;
        }
        const _this = this;
        const props = this.props;
        const selector = this.wrapper.current.querySelector('.swiper-container');
        const order_number = Number(props.moduleInfo.address.replace(/\D/g,''));

        const item_spacing_tablet = props.item_spacing_tablet ? props.item_spacing_tablet : props.item_spacing;
        const item_spacing_phone = props.item_spacing_phone ? props.item_spacing_phone : item_spacing_tablet;

        var config = {
            init: false,
            speed: parseInt(props.speed),
            loop: props.loop === 'on' ? true : false,
            effect: props.carousel_type,
            centeredSlides: props.centered_slides === 'on' ? true : false,
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

        // arrow navigation
        if (props.arrow === 'on') {
            config['navigation'] = {
                nextEl: '.tc-next-'+order_number,
                prevEl: '.tc-prev-'+order_number
            }
        }

        // dot pagination
        if (props.dots === 'on') {
            config['pagination'] = {
                el: '.tc-dots-'+order_number
            }
        }

        // effect
        if (props.carousel_type === 'coverflow') {
            config['coverflowEffect'] = {
                slideShadows: props.coverflow_shadow === 'on' ? true : false,
                rotate: parseInt(props.coverflow_rotate),
                stretch: parseInt(props.coverflow_stretch),
                depth: parseInt(props.coverflow_depth),
                modifier: parseInt(props.coverflow_modifier)
            };
        }

        var slider = new Swiper (selector, config);
        slider.init();

        for (const index in _this.state.props) {
            if (_this.state.props[index] !== _this.props[index]) {
                if(_this.computedType.includes(index)){
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

        // coverflow shadow color
        additionalCss.push([{
            selector:    '%%order_class%% .swiper-container-3d .swiper-slide-shadow-left',
            declaration: `background-image: linear-gradient(to left,${props.coveflow_color_dark},${props.coveflow_color_light});`,
        }]);
        additionalCss.push([{
            selector:    '%%order_class%% .swiper-container-3d .swiper-slide-shadow-right',
            declaration: `background-image: linear-gradient(to right,${props.coveflow_color_dark},${props.coveflow_color_light});`,
        }]);
        // orders
        utility.process_range_value({
            'props'             : props,
            'key'               : 'quote_order',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .df_tc_quote_image',
            'type'              : 'order',
            'default_value'     : '9',
        });
        utility.process_range_value({
            'props'             : props,
            'key'               : 'logo_order',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .df_tc_company_logo',
            'type'              : 'order',
            'default_value'     : '9',
        });
        utility.process_range_value({
            'props'             : props,
            'key'               : 'text_order',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .df_tc_content',
            'type'              : 'order',
            'default_value'     : '9',
        });
        utility.process_range_value({
            'props'             : props,
            'key'               : 'author_order',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .df_tc_author_box',
            'type'              : 'order',
            'default_value'     : '9',
        });
        utility.process_range_value({
            'props'             : props,
            'key'               : 'rating_order',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .df_tc_ratings',
            'type'              : 'order',
            'default_value'     : '9',
        });
        // author box
        // author image position
        if (props.author_image_position === 'top') {
            additionalCss.push([{
                selector:    '%%order_class%% .df_tc_author_box',
                declaration: `flex-direction: column;`,
            }]);
            additionalCss.push([{
                selector:    '%%order_class%% .df_tc_author_image',
                declaration: `margin-left:0;margin-right:0;`,
            }]);
        }
        if (props.author_image_position === 'bottom') {
            additionalCss.push([{
                selector:    '%%order_class%% .df_tc_author_box',
                declaration: `flex-direction: column;`,
            }]);
            additionalCss.push([{
                selector:    '%%order_class%% .df_tc_author_image',
                declaration: `order: 2; margin-left:0;margin-right:0;`,
            }]);
        }
        if (props.author_image_position === 'right') {
            additionalCss.push([{
                selector:    '%%order_class%% .df_tc_author_image',
                declaration: `order: 2;margin-left:0; margin-right:10px;`,
            }]);
        }
        if (props.auther_alignhr) {
            if (props.author_image_position === 'top' || props.author_image_position === 'bottom') {
                additionalCss.push([{
                    selector:    '%%order_class%% .df_tc_author_box',
                    declaration: `align-items: ${props.auther_alignhr};`,
                }]);
            } else {
                additionalCss.push([{
                    selector:    '%%order_class%% .df_tc_author_box',
                    declaration: `justify-content: ${props.auther_alignhr};`,
                }]);
            }
        }
        if (props.info_align) {
            additionalCss.push([{
                selector:    '%%order_class%% .df_tc_author_info',
                declaration: `text-align: ${props.info_align};`,
            }]);
        }

        // dots colors
        if(props.large_active_dot === 'on') {
            additionalCss.push([{
                selector:    '%%order_class%% .swiper-pagination .swiper-pagination-bullet-active',
                declaration: `width: 40px; border-radius: 20px;`,
            }]);
        }
        utility.process_color({
            'props'             : props,
            'key'               : 'dots_color',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .swiper-pagination span',
            'type'              : 'background',
        })
        utility.process_color({
            'props'             : props,
            'key'               : 'active_dots_color',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .swiper-pagination span.swiper-pagination-bullet-active',
            'type'              : 'background',
        })
        if(props.dots_align) {
            additionalCss.push([{
                selector:    '%%order_class%% .swiper-pagination',
                declaration: `text-align: ${props.dots_align};`,
            }]);
        }
        if(props.dots_align_tablet) {
            additionalCss.push([{
                selector:    '%%order_class%% .swiper-pagination',
                declaration: `text-align: ${props.dots_align_tablet};`,
                'device':'tablet'
            }]);
        }
        if(props.dots_align_phone) {
            additionalCss.push([{
                selector:    '%%order_class%% .swiper-pagination',
                declaration: `text-align: ${props.dots_align_phone};`,
                'device':'phone'
            }]);
        }

        // arrow
        if (props.arrow === 'on') {
            const pos = props.arrow_position ? props.arrow_position : 'middle';
            const pos_tab = props.arrow_position_tablet ? props.arrow_position_tablet : pos;
            const pos_ph = props.arrow_position_phone ? props.arrow_position_phone : pos_tab;
            const a_align = props.arrow_align ? props.arrow_align : 'space-between';
            const a_align_tab = props.arrow_align_tablet ? props.arrow_align_tablet : a_align;
            const a_align_ph = props.arrow_align_phone ? props.arrow_align_phone : a_align_tab;

            additionalCss.push([{
                selector:    '%%order_class%% .df_tc_arrows',
                declaration: TestimonialCarousel.df_arrow_pos_styles(pos),
                'device':'desktop',
            }]);
            additionalCss.push([{
                selector:    '%%order_class%% .df_tc_arrows',
                declaration: TestimonialCarousel.df_arrow_pos_styles(pos_tab),
                'device':'tablet',
            }]);
            additionalCss.push([{
                selector:    '%%order_class%% .df_tc_arrows',
                declaration: TestimonialCarousel.df_arrow_pos_styles(pos_ph),
                'device':'phone'
            }]);
            // alignment
            additionalCss.push([{
                selector:    '%%order_class%% .df_tc_arrows',
                declaration: `justify-content: ${a_align};`,
                'device':'desktop',
            }]);
            additionalCss.push([{
                selector:    '%%order_class%% .df_tc_arrows',
                declaration: `justify-content: ${a_align_tab};`,
                'device':'tablet',
            }]);
            additionalCss.push([{
                selector:    '%%order_class%% .df_tc_arrows',
                declaration: `justify-content: ${a_align_ph};`,
                'device':'phone'
            }]);
            if (props.arrow_circle === 'on') {
                additionalCss.push([{
                    selector:    '%%order_class%% .df_tc_arrows > div',
                    declaration: `border-radius: 50%;`,
                }]);
            }

            // arrow colors
            utility.process_color({
                'props'             : props,
                'key'               : 'arrow_color',
                'additionalCss'     : additionalCss,
                'selector'          : '%%order_class%% .df_tc_arrows div:after',
                'type'              : 'color',
            })
            utility.process_color({
                'props'             : props,
                'key'               : 'arrow_background',
                'additionalCss'     : additionalCss,
                'selector'          : '%%order_class%% .df_tc_arrows div',
                'type'              : 'background-color',
            })

            utility.process_range_value({
                'props'             : props,
                'key'               : 'arrow_opacity',
                'additionalCss'     : additionalCss,
                'selector'          : '%%order_class%% .df_tc_arrows div',
                'type'              : 'opacity',
            });
            if( 'on' !== props.loop){
                utility.process_range_value({
                    'props'             : props,
                    'key'               : 'arrow_opacity_disable',
                    'additionalCss'     : additionalCss,
                    'selector'          : '%%order_class%% .df_tc_arrows div.swiper-button-disabled',
                    'type'              : 'opacity',
                });
            }
            utility.process_margin_padding({
                'props' : props,
                'key':'arrow_prev_margin',
                'additionalCss' : additionalCss,
                'selector' : '%%order_class%% .df_tc_arrows .swiper-button-prev',
                'type'  : 'margin'
            });
            utility.process_margin_padding({
                'props' : props,
                'key':'arrow_prev_padding',
                'additionalCss' : additionalCss,
                'selector' : '%%order_class%% .df_tc_arrows .swiper-button-prev',
                'type'  : 'padding'
            });
            utility.process_margin_padding({
                'props' : props,
                'key':'arrow_next_margin',
                'additionalCss' : additionalCss,
                'selector' : '%%order_class%% .df_tc_arrows .swiper-button-next',
                'type'  : 'margin'
            });
            utility.process_margin_padding({
                'props' : props,
                'key':'arrow_next_padding',
                'additionalCss' : additionalCss,
                'selector' : '%%order_class%% .df_tc_arrows .swiper-button-next',
                'type'  : 'padding'
            });
            // arrow icon styles
            utility.process_icon_styles({
                'props' : props,
                'key':'arrow_prev_icon',
                'additionalCss' : additionalCss,
                'selector' : '%%order_class%% .df_tc_arrows div.swiper-button-prev:after'
            })
            utility.process_icon_styles({
                'props' : props,
                'key':'arrow_next_icon',
                'additionalCss' : additionalCss,
                'selector' : '%%order_class%% .df_tc_arrows div.swiper-button-next:after'
            })
        }

        // rating
        utility.process_color({
            'props'             : props,
            'key'               : 'rating_color',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .df_tc_ratings span.et-pb-icon.df_rating_icon_fill',
            'type'              : 'color',
        });
        if (props.rating_align) {
            additionalCss.push([{
                selector:    '%%order_class%% .df_tc_ratings',
                declaration: `justify-content: ${props.rating_align};`
            }]);
        }
        if (props.rating_size) {
            additionalCss.push([{
                selector:    '%%order_class%% .df_tc_ratings span.et-pb-icon',
                declaration: `font-size: ${props.rating_size};`
            }]);
        }
        if (props.rating_space) {
            additionalCss.push([{
                selector:    '%%order_class%% .df_tc_ratings span',
                declaration: `margin-right: ${props.rating_space};`
            }]);
            additionalCss.push([{
                selector:    '%%order_class%% .df_tc_ratings span:last-child',
                declaration: `margin-right: 0;`
            }]);
        }

        // image settings
        if (props.brand_align) {
            additionalCss.push([{
                selector:    '%%order_class%% .df_tc_company_logo',
                declaration: `text-align: ${props.brand_align};`
            }]);
        }
        utility.process_range_value({
            'props'             : props,
            'key'               : 'brand_width',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .df_tc_company_logo img',
            'type'              : 'max-width',
        });
        utility.process_range_value({
            'props'             : props,
            'key'               : 'author_image_width',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .df_tc_author_image',
            'type'              : 'max-width',
        });

        // spacing
        // wrapper spacing
        utility.process_margin_padding({
            'props' : props,
            'key':'wrapper_margin',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .swiper-container',
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'wrapper_padding',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .swiper-container',
            'type'  : 'padding'
        });
        // item wrapper spacing
        utility.process_margin_padding({
            'props' : props,
            'key':'item_wrapper_margin',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_tci_container',
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'item_wrapper_padding',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_tci_container',
            'type'  : 'padding'
        });
        // author box spacing
        utility.process_margin_padding({
            'props' : props,
            'key':'author_box_margin',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_tc_author_box',
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'author_box_padding',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_tc_author_box',
            'type'  : 'padding'
        });
        // rating spacing
        utility.process_margin_padding({
            'props' : props,
            'key':'rating_margin',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_tc_ratings',
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'rating_padding',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_tc_ratings',
            'type'  : 'padding'
        });
        // text spacing
        utility.process_margin_padding({
            'props' : props,
            'key':'text_margin',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_tc_content',
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'text_padding',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_tc_content',
            'type'  : 'padding'
        });
        // imgage spacing
        utility.process_margin_padding({
            'props' : props,
            'key':'logo_margin',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_tc_company_logo img',
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'author_image_margin',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_tc_author_image img',
            'type'  : 'margin'
        });
        // quote icon
        if (props.qoute_align) {
            additionalCss.push([{
                selector:    '%%order_class%% .df_tc_quote_image',
                declaration: `text-align: ${props.qoute_align};`
            }]);
        }
        utility.process_range_value({
            'props'             : props,
            'key'               : 'quote_icon_size',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .df_tc_quote_icon',
            'type'              : 'font-size',
        });
        utility.process_range_value({
            'props'             : props,
            'key'               : 'quote_image_max',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .df_tc_quote_image img',
            'type'              : 'max-width',
        });
        utility.process_range_value({
            'props'             : props,
            'key'               : 'quote_z_index',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .df_tc_quote_image, %%order_class%% .df_tc_quote_icon',
            'type'              : 'z-index',
        });
        utility.process_color({
            'props'             : props,
            'key'               : 'quote_icon_color',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .df_tci_container .df_tc_quote_icon',
            'type'              : 'color',
        });
        utility.process_color({
            'props'             : props,
            'key'               : 'quote_icon_bgcolor',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .df_tci_container .df_tc_quote_icon',
            'type'              : 'background-color',
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'quote_icon_margin',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_tc_quote_image span',
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'quote_icon_padding',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_tc_quote_image span',
            'type'  : 'padding'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'quote_icon_margin',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_tc_quote_image img',
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'quote_icon_padding',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_tc_quote_image img',
            'type'  : 'padding'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'quote_wrapper_margin',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_tc_quote_image',
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'quote_wrapper_padding',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_tc_quote_image',
            'type'  : 'padding'
        });
        // background
        utility.df_process_bg({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'text_bg',
            'selector'          : '%%order_class%% .df_tc_content'
        });
        utility.df_process_bg({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'author_bg',
            'selector'          : '%%order_class%% .df_tc_author_box'
        });
        utility.df_process_bg({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'rating_bg',
            'selector'          : '%%order_class%% .df_tc_ratings'
        });
        //equal height
        if (props.equal_height === 'on') {
            additionalCss.push([{
                selector:    '%%order_class%% .difl_testimonialcarouselitem.et_pb_module',
                declaration: `align-self: auto;`,
            }]);
        }
        //quote opacity
        if (props.quote_opacity) {
            additionalCss.push([{
                selector:    '%%order_class%% .df_tc_quote_icon',
                declaration: `opacity: ${props.quote_opacity};`,
            }]);
            additionalCss.push([{
                selector:    '%%order_class%% .df_tc_quote_image',
                declaration: `opacity: ${props.quote_opacity};`,
            }]);
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
                    order: 2;`
        }
        return options[value];
    }

    df_tc_arrow(order_number) {
        const utils = window.ET_Builder.API.Utils;
        const prev_icon = this.props.arrow_prev_icon_use_icon === 'on' &&  this.props.arrow_prev_icon_font_icon ?
            utils.processFontIcon(this.props.arrow_prev_icon_font_icon) : '4';
        const next_icon = this.props.arrow_next_icon_use_icon === 'on' &&  this.props.arrow_next_icon_font_icon ?
            utils.processFontIcon(this.props.arrow_next_icon_font_icon) : '5';

        return this.props.arrow === 'on' ?
            <div className="df_tc_arrows">
                <div className={"swiper-button-next tc-next-" + order_number} data-icon={next_icon}></div>
                <div className={"swiper-button-prev tc-prev-" + order_number} data-icon={prev_icon}></div>
            </div> : '';
    }

    df_tc_dots(order_number) {
        return this.props.dots === 'on' ?
            <div className={"swiper-pagination tc-dots-"+order_number}></div> : '';
    }

    contentOutput(props){
        if (props['content'] === '' || props['content'].length === 0) {
            const notice_style = {
                backgroundColor: "#eeeeee",
                padding: "10px 20px"
            };
       
            return <h2 style={notice_style} >Please <strong>Add New Testimonial Item.</strong></h2>;
            
        }
        $(document).ready(() => {
            const author_info = $(this.wrapper.current).find('.df_tc_author_info');
            const author_tag = props.name_level ? props.name_level : 'h4';
            if (author_info.length > 0) {
                author_info.each((index, author_fields) => {
                    const author_field = $(author_fields).find('.author_name');
                    if(author_field.length === 0){return;}
                    const author_name = author_field.text();
                    const new_author_field = $('<' + author_tag + '>', {
                        class: 'author_name',
                        text: author_name
                    });
                    author_field.remove();
                    $(author_fields).prepend(new_author_field);
                });
            }
        });
        return props.content
    }

    render() {
        const props = this.props;
        let _class = '';
        const order_number        = Number(props.moduleInfo.address.replace(/\D/g,''));

        return(<div className={"df_tc_container" + _class} ref={this.wrapper}>
            {this.state.loading === false ?
            <React.Fragment>
                <div className="df_tc_inner_wrapper">
                    <div className="swiper-container">
                        <div className="swiper-wrapper">
                            {this.contentOutput(props)}
                        </div>
                    </div>
                    {this.df_tc_arrow(order_number)}
                </div>
            {this.df_tc_dots(order_number)}
            </React.Fragment> : <React.Fragment>Loading</React.Fragment>}
        </div>)
    }
}
export default TestimonialCarousel;
