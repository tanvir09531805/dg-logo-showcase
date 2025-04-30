// External Dependencies
import React, { Component } from 'react';
import utility from '../../../scripts/df_scripts/utilities';

import lodash from 'lodash';

// import Swiper from '../../../assets/scripts/lib/swiper.min';
import Swiper from '../../../public/js/lib/swiper.min';
// Internal Dependencies
import './style.css';


class ContentCarousel extends Component {
    static slug = 'difl_contentcarousel';
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
        this.df_cc_arrow = this.df_cc_arrow.bind(this);
        this.df_cc_dots = this.df_cc_dots.bind(this);
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
        if ( this.state.loading === true ) {
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
                nextEl: '.cc-next-'+order_number,
                prevEl: '.cc-prev-'+order_number
            }
        }

        // dot pagination
        if (props.dots === 'on') {
            config['pagination'] = {
                el: '.cc-dots-'+order_number
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

        // orders
        utility.process_range_value({
            'props'             : props,
            'key'               : 'image_order',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .df_cci_image_container',
            'type'              : 'order',
            'default_value'     : '9',
        });
        utility.process_range_value({
            'props'             : props,
            'key'               : 'title_order',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .df_cc_title',
            'type'              : 'order',
            'default_value'     : '9',
        });
        utility.process_range_value({
            'props'             : props,
            'key'               : 'subtitle_order',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .df_cc_subtitle',
            'type'              : 'order',
            'default_value'     : '9',
        });
        utility.process_range_value({
            'props'             : props,
            'key'               : 'content_order',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .df_cc_content',
            'type'              : 'order',
            'default_value'     : '9',
        });
        utility.process_range_value({
            'props'             : props,
            'key'               : 'button_order',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .df_cci_button_wrapper',
            'type'              : 'order',
            'default_value'     : '9',
        });

        // coverflow shadow color
        additionalCss.push([{
            selector:    '%%order_class%% .swiper-container-3d .swiper-slide-shadow-left',
            declaration: `background-image: linear-gradient(to left,${props.coveflow_color_dark},${props.coveflow_color_light});`,
        }]);
        additionalCss.push([{
            selector:    '%%order_class%% .swiper-container-3d .swiper-slide-shadow-right',
            declaration: `background-image: linear-gradient(to right,${props.coveflow_color_dark},${props.coveflow_color_light});`,
        }]);

        // dots
        if(props.large_active_dot === 'on') {
            additionalCss.push([{
                selector:    '%%order_class%% .swiper-pagination .swiper-pagination-bullet-active',
                declaration: `width: 40px; border-radius: 20px;`,
            }]);
        }
        if(props.dots_align) {
            additionalCss.push([{
                selector:    '%%order_class%% .swiper-pagination',
                declaration: `text-align: ${props.dots_align};`,
            }]);
        }
        utility.process_range_value({
            'props'             : props,
            'key'               : 'dot_vertical_position',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .swiper-pagination',
            'type'              : 'top',
            'default_value'     : '0px',
        });
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
        //equal height
        if (props.equal_height === 'on') {
            additionalCss.push([{
                selector:    '%%order_class%% .difl_contentcarouselitem',
                declaration: `align-self: auto;`,
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
                selector:    '%%order_class%% .df_cc_arrows',
                declaration: ContentCarousel.df_arrow_pos_styles(pos),
                'device':'desktop',
            }]);
            additionalCss.push([{
                selector:    '%%order_class%% .df_cc_arrows',
                declaration: ContentCarousel.df_arrow_pos_styles(pos_tab),
                'device':'tablet',
            }]);
            additionalCss.push([{
                selector:    '%%order_class%% .df_cc_arrows',
                declaration: ContentCarousel.df_arrow_pos_styles(pos_ph),
                'device':'phone'
            }]);
            // alignment
            additionalCss.push([{
                selector:    '%%order_class%% .df_cc_arrows',
                declaration: `justify-content: ${a_align};`,
                'device':'desktop',
            }]);
            additionalCss.push([{
                selector:    '%%order_class%% .df_cc_arrows',
                declaration: `justify-content: ${a_align_tab};`,
                'device':'tablet',
            }]);
            additionalCss.push([{
                selector:    '%%order_class%% .df_cc_arrows',
                declaration: `justify-content: ${a_align_ph};`,
                'device':'phone'
            }]);
            if (props.arrow_circle === 'on') {
                additionalCss.push([{
                    selector:    '%%order_class%% .df_cc_arrows > div',
                    declaration: `border-radius: 50%;`,
                }]);
            }

            // arrow colors
            utility.process_color({
                'props'             : props,
                'key'               : 'arrow_color',
                'additionalCss'     : additionalCss,
                'selector'          : '%%order_class%% .df_cc_arrows div:after',
                'type'              : 'color',
            })
            utility.process_color({
                'props'             : props,
                'key'               : 'arrow_background',
                'additionalCss'     : additionalCss,
                'selector'          : '%%order_class%% .df_cc_arrows div',
                'type'              : 'background-color',
            })

            utility.process_range_value({
                'props'             : props,
                'key'               : 'arrow_opacity',
                'additionalCss'     : additionalCss,
                'selector'          : '%%order_class%% .df_cc_arrows div',
                'type'              : 'opacity',
            });
            if( 'on' !== props.loop){
                utility.process_range_value({
                    'props'             : props,
                    'key'               : 'arrow_opacity_disable',
                    'additionalCss'     : additionalCss,
                    'selector'          : '%%order_class%% .df_cc_arrows div.swiper-button-disabled',
                    'type'              : 'opacity',
                });
            }
            utility.process_margin_padding({
                'props' : props,
                'key':'arrow_prev_margin',
                'additionalCss' : additionalCss,
                'selector' : '%%order_class%% .df_cc_arrows .swiper-button-prev',
                'type'  : 'margin',
                'important' : false
            });
            utility.process_margin_padding({
                'props' : props,
                'key':'arrow_prev_padding',
                'additionalCss' : additionalCss,
                'selector' : '%%order_class%% .df_cc_arrows .swiper-button-prev',
                'type'  : 'padding',
                'important' : false
            });
            utility.process_margin_padding({
                'props' : props,
                'key':'arrow_next_margin',
                'additionalCss' : additionalCss,
                'selector' : '%%order_class%% .df_cc_arrows .swiper-button-next',
                'type'  : 'margin',
                'important' : false
            });
            utility.process_margin_padding({
                'props' : props,
                'key':'arrow_next_padding',
                'additionalCss' : additionalCss,
                'selector' : '%%order_class%% .df_cc_arrows .swiper-button-next',
                'type'  : 'padding',
                'important' : false
            });
            // arrow icon styles
            utility.process_icon_styles({
                'props' : props,
                'key':'arrow_prev_icon',
                'additionalCss' : additionalCss,
                'selector' : '%%order_class%% .df_cc_arrows div.swiper-button-prev:after'
            })
            utility.process_icon_styles({
                'props' : props,
                'key':'arrow_next_icon',
                'additionalCss' : additionalCss,
                'selector' : '%%order_class%% .df_cc_arrows div.swiper-button-next:after'
            })
        }
        // button
        utility.df_process_bg({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'df_button_bg',
            'selector'          : '%%order_class%% .df_cci_button'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'button_wrapper_margin',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_cci_button_wrapper',
            'type'  : 'margin',
            'important' : false
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'button_wrapper_padding',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_cci_button_wrapper',
            'type'  : 'padding',
            'important' : false
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'button_margin',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_cci_button',
            'type'  : 'margin',
            'important' : false
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'button_padding',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_cci_button',
            'type'  : 'padding',
            'important' : false
        });
        // button styles
        utility.df_process_btn_styles({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'cc_button',
            'selector'          : "%%order_class%% .df_cci_button",
            'align_container'   : "%%order_class%% .df_cci_button_wrapper"
        });

        utility.process_margin_padding({
            'props' : props,
            'key':'btn_icon_margin',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_cci_button .df_cci_btn_icon.df_cci_btn_hover_off, %%order_class%% .df_cci_button:hover .df_cci_btn_icon.df_cci_btn_hover_on',
            'type'  : 'margin'
        });
        utility.process_range_value({
            'props'             : props,
            'key'               : 'btn_icon_font_size',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .df_cci_button .df_cci_btn_icon.df_cci_btn_hover_off, %%order_class%% .df_cci_button:hover .df_cci_btn_icon.df_cci_btn_hover_on',
            'type'              : 'font-size'
        });
        utility.process_color({
            'props': props,
            'key': 'btn_icon_color',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df_cci_button .df_cci_btn_icon',
            'type': 'color',
        });
        utility.process_icon_font_style({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'btn_font_icon',
            'selector'          : '%%order_class%% .df_cci_button_wrapper .df_cci_btn_icon'
        });

        // content area background
        utility.df_process_bg({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'df_title_bg',
            'selector'          : '%%order_class%% .df_cc_title'
        });
        utility.df_process_bg({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'df_subtitle_bg',
            'selector'          : '%%order_class%% .df_cc_subtitle'
        });
        utility.df_process_bg({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'df_content_bg',
            'selector'          : '%%order_class%% .df_cc_content'
        });

        // spacing
        utility.process_margin_padding({
            'props' : props,
            'key':'wrapper_padding',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .swiper-container',
            'type'  : 'padding',
            'important' : false
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'item_wrapper_margin',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .difl_contentcarouselitem .df_cci_container',
            'type'  : 'margin',
            'important' : false
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'item_wrapper_padding',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .difl_contentcarouselitem .df_cci_container',
            'type'  : 'padding',
            'important' : false
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'image_wrapper_margin',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_cci_image_container',
            'type'  : 'margin',
            'important' : false
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'image_wrapper_padding',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_cci_image_container',
            'type'  : 'padding',
            'important' : false
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'image_margin',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_cci_image_container img',
            'type'  : 'margin',
            'important' : false
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'title_margin',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_cc_title',
            'type'  : 'margin',
            'important' : false
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'title_padding',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_cc_title',
            'type'  : 'padding',
            'important' : false
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'subtitle_margin',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_cc_subtitle',
            'type'  : 'margin',
            'important' : false
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'subtitle_padding',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_cc_subtitle',
            'type'  : 'padding',
            'important' : false
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'content_margin',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_cc_content',
            'type'  : 'margin',
            'important' : false
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'content_padding',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_cc_content',
            'type'  : 'padding',
            'important' : false
        });

        // Button Full Width
        if (props.cc_button_button_fullwidth === 'on' && props.btn_use_icon === 'on') {

            let btnTextAlign = props.button_text_align?props.button_text_align:'center';
            let textIconP = btnTextAlign;
            if(btnTextAlign==='right'){
                textIconP = 'flex-end';
            } else if (btnTextAlign === 'left'){
                textIconP = 'flex-start';
            }
            additionalCss.push([{
                selector:    '%%order_class%% .df_cci_btn_text_icon_wrap',
                declaration: `justify-content: ${textIconP};`,
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

    df_cc_arrow(order_number) {
        const utils = window.ET_Builder.API.Utils;
        const prev_icon = this.props.arrow_prev_icon_use_icon === 'on' &&  this.props.arrow_prev_icon_font_icon ?
            utils.processFontIcon(this.props.arrow_prev_icon_font_icon) : '4';
        const next_icon = this.props.arrow_next_icon_use_icon === 'on' &&  this.props.arrow_next_icon_font_icon ?
            utils.processFontIcon(this.props.arrow_next_icon_font_icon) : '5';

        return this.props.arrow === 'on' ?
            <div className="df_cc_arrows">
                <div className={"swiper-button-next cc-next-" + order_number} data-icon={next_icon}></div>
                <div className={"swiper-button-prev cc-prev-" + order_number} data-icon={prev_icon}></div>
            </div> : '';
    }

    df_cc_dots(order_number) {
        return this.props.dots === 'on' ?
            <div className={"swiper-pagination cc-dots-"+order_number}></div> : '';
    }

    contentOutput(props){
       
        if (props['content'] === '' || props['content'].length === 0) {
            const notice_style = {
                backgroundColor: "#eeeeee",
                padding: "10px 20px"
            };
            return <h2 style={notice_style} >Please <strong>Add New Item.</strong></h2>;
        }
        
        return props.content
    }

    render() {
        const props = this.props;
        window.ETBuilderBackend.i18n.modules.dfBtnIcon = {
            df_btn_full_width: props.cc_button_button_fullwidth ? props.cc_button_button_fullwidth : 'off',
            df_btn_icon_yes: props.btn_use_icon ? props.btn_use_icon : 'off',
            df_btn_icon : props.btn_font_icon ? props.btn_font_icon : '&#x35;||divi||400',
            df_btn_place : props.btn_icon_placement ? props.btn_icon_placement : 'right',
            df_btn_show : props.btn_icon_show_hover ? props.btn_icon_show_hover : 'off',
        };
        const order_number        = Number(props.moduleInfo.address.replace(/\D/g,''));

        return(<div className="df_cc_container" ref={this.wrapper}>
            {this.state.loading === false ?
            <React.Fragment>
                <div className="df_cc_inner_wrapper">
                    <div className="swiper-container">
                        <div className="swiper-wrapper">
                            {this.contentOutput(props)}
                        </div>
                    </div>
                    {this.df_cc_arrow(order_number)}
                </div>
            {this.df_cc_dots(order_number)}
            </React.Fragment> : <React.Fragment>Loading</React.Fragment>}
        </div>)
    }
}
export default ContentCarousel;
