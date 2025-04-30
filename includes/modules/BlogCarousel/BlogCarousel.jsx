// External Dependencies
import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import _ from 'lodash';
import utility from '../../../scripts/df_scripts/utilities';
// import Swiper from '../../../assets/scripts/lib/swiper.min';
import Swiper from '../../../public/js/lib/swiper.min';
// Internal Dependencies
import './style.css';

var lodash = _.noConflict();


class BlogCarousel extends Component {
    static slug = 'difl_blogcarousel';
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            posts: '',
            loading: true,
            masonry: null,
            post_items: [],
            props: this.props
        }

        this.wrapper = React.createRef();
        this.get_posts = this.get_posts.bind(this);
        this.swiper_init = this.swiper_init.bind(this);
        this.render_output = this.render_output.bind(this);
        this.get_post_items = this.get_post_items.bind(this);
        this.df_bc_arrow = this.df_bc_arrow.bind(this);
        this.df_bc_dots = this.df_bc_dots.bind(this);
        this.computedType = ['posts_number', 'post_display', 'include_categories', 'include_tags',
        'orderby', 'offset_number', 'use_image_as_background', 'use_background_scale',
        'older_text', 'newer_text', 'equal_height'];
        this.computedTypeCarousel = ['item_spacing', 'item_desktop', 'speed', 
            'loop', 'arrow', 'dots', 'variable_width', 'item_height',
            'carousel_type', 'centeredSlides'
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
            setTimeout(_this.get_posts, 800)
        }

        _this.get_post_items();

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
     * Get all posts through ajax request
     * 
     */
    get_posts() {
        const _this = this;

        axios({
            method: 'post',
            url: window.ETBuilderBackend.ajaxUrl,
            params: {
                action : 'df_bc_posts'
            },
            data : {
                et_admin_load_nonce: window.et_fb_options.et_admin_load_nonce,
                postItems: _this.get_post_items().postItems,
                posts_number: _this.props.posts_number,
                offset_number: _this.props.offset_number,
                post_display: _this.props.post_display,
                include_categories: _this.props.include_categories,
                include_tags: _this.props.include_tags,
                orderby: _this.props.orderby,
                use_image_as_background: _this.props.use_image_as_background,
                use_background_scale: _this.props.use_background_scale,
                equal_height: _this.props.equal_height
            }
        })
        .then(function(response) {
            _this.setState({
                loading: false,
                posts: response.data.data
            })
        })
        .then(function(response){
            $(_this.wrapper.current).find('video').mediaelementplayer(window._wpmejsSettings)
        })
        
    }

    get_post_items() {
        const _this = this;
        const props = _this.props;
        const content = props.content;
        const postItems = {};
        const postItems_without_class = {};
        const inner = [];
        const inner_without_class = [];
        const outer = [];
        const outer_without_class = [];
        const posts_item_object = [];

        if (!content || content.length === 0) {
            if(!lodash.isEqual(postItems, _this.state.post_items)) {
                _this.setState({post_items: {}, loading: true});
            }
            return {
                'postItems': postItems,
                'posts_item_object': posts_item_object
            }
        }

        content.map((data, i) => {
            const utils = window.ET_Builder.API.Utils;
            const item_props = data.props.attrs;
            const type = item_props.type ? item_props.type : 'select';
            var object = {};

            object.type = type;

            if(type !== 'select') {
                
                // title
                object.title_tag = item_props.title_tag ? item_props.title_tag : 'h2';
                // content
                object.post_content = item_props.post_content ? item_props.post_content : 'excerpt';
                object.use_post_excrpt = item_props.use_post_excrpt ? item_props.use_post_excrpt : 'off';
                object.excerpt_length = item_props.excerpt_length ? item_props.excerpt_length : '270';
                // meta
                object.date_format = item_props.date_format ? item_props.date_format : 'M j, Y';
                object.show_author_image = item_props.show_author_image ? item_props.show_author_image : 'off';
                object.author_image_size = item_props.author_image_size ? item_props.author_image_size : '16';
                object.hide_author_text = item_props.hide_author_text ? item_props.hide_author_text : 'off';
                object.comment_text = item_props.comment_text ? item_props.comment_text : 'off';
                // read more
                object.read_more_text = item_props.read_more_text ? item_props.read_more_text : 'Read More';
                // icon
                object.image_icon = item_props.image_icon !== '' ? item_props.image_icon : '';      
                object.image_alt_text = item_props.image_alt_text !== '' ? item_props.image_alt_text : '';    
                object.use_icon = item_props.use_icon ? item_props.use_icon : 'off';       
                object.font_icon = item_props.font_icon ? utils.processFontIcon(item_props.font_icon) : '5';       
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
                object.overlay_font_icon = item_props.overlay_font_icon ? 
                    item_props.overlay_font_icon : '%%16%%';

                // class
                object.module_vb_class =  'et-module-' + data.props._key;
                object.class =  data.props.matching.slug + '_' +  data.props.shortcode_index;

                // background
                object.background_enable_mask_style = item_props.background_enable_mask_style ? item_props.background_enable_mask_style : 'off';
                object.background_enable_pattern_style = item_props.background_enable_pattern_style ? item_props.background_enable_pattern_style : 'off';

                // custom text
                object.custom_text = item_props.custom_text ? 
                    item_props.custom_text : '';
                object.use_custom_field = item_props.use_custom_field
                    ? item_props.use_custom_field
                    : "";
                object.custom_field = item_props.custom_field
                    ? item_props.custom_field
                    : "";
                object.custom_field_before_label = item_props.custom_field_before_label
                    ? item_props.custom_field_before_label
                    : "";
                object.custom_field_after_label = item_props.custom_field_after_label
                    ? item_props.custom_field_after_label
                    : "";
                // reading_time field
                if (item_props.type === "reading_time") {
                    object.reading_time_before_label = item_props.reading_time_before_label
                        ? item_props.reading_time_before_label
                        : "";
                    object.reading_time_after_label = item_props.reading_time_after_label
                        ? item_props.reading_time_after_label
                        : "";
                }
                // reading_time field
                if (item_props.type === "reading_time") {
                    object.reading_time_before_label = item_props.reading_time_before_label
                        ? item_props.reading_time_before_label
                        : "";
                    object.reading_time_after_label = item_props.reading_time_after_label
                        ? item_props.reading_time_after_label
                        : "";
                }
                      // acf field
                if(item_props.type === 'acf_fields') {
                    object.post_type_for_acf = item_props.post_type_for_acf ? item_props.post_type_for_acf : '';
                    object.acf_field = item_props.post_type_for_acf && item_props.post_type_for_acf !== 'select' ?
                        item_props[object.post_type_for_acf] : '';
                    object.acf_before_label = item_props.acf_before_label ?
                        item_props.acf_before_label : '';
                    object.acf_after_label = item_props.acf_after_label ?
                        item_props.acf_after_label : '';
                    object.acf_url_text = item_props.acf_url_text ? item_props.acf_url_text : '';
                    object.acf_url_new_window = item_props.acf_url_new_window ? item_props.acf_url_new_window : 'off';
                    object.acf_email_text = item_props.acf_email_text ? item_props.acf_email_text : '';
                }
                
                const element_before_after_depandancy = ['author', 'date', 'comments'];
                if(  element_before_after_depandancy.includes(item_props.type) ){
                    object.element_before_label = item_props.element_before_label ?
                        item_props.element_before_label : '';
                    object.element_after_label = item_props.element_after_label ?
                    item_props.element_after_label : '';
                }

                if (item_props.outside_wrapper === 'on') {
                    outer.push(object);
                    outer_without_class.push(lodash.omit(object, ['module_vb_class', 'class']));
                } else {
                    inner.push(object);
                    inner_without_class.push(lodash.omit(object, ['module_vb_class', 'class']));
                }
                posts_item_object.push(object);
            } 
        });

        postItems_without_class.inner = inner_without_class;
        postItems_without_class.outer = outer_without_class;

        postItems.inner = inner;
        postItems.outer = outer;

        const _postCombineItems = [...outer, ...inner];

        if(!lodash.isEqual(postItems_without_class, _this.state.post_items_without_class)) {
            _this.setState({
                post_items : postItems, 
                loading: true,
                post_items_without_class: postItems_without_class
            })
        }

        return {
            'postItems': postItems,
            'posts_item_object': _postCombineItems
        };

    }

    swiper_init() {
        if (this.state.loading === true) {
            // this.setState({loading: false})
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
            loop:  props.loop === 'on' ? true : false,
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

        var slider = new Swiper (selector, config);
        slider.init();

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
                selector:    '%%order_class%% .df-post-item',
                declaration: `align-self: auto;`,
            }]);
        }

        utility.df_process_string_attr({
            'props': props,
            'key': 'alignment',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-post-inner-wrap',
            'type': 'text-align'
        });

        // coverflow shadow color
        additionalCss.push([{
            selector:    '%%order_class%% .swiper-container-3d .swiper-slide-shadow-left',
            declaration: `background-image: linear-gradient(to left,${props.coveflow_color_dark},${props.coveflow_color_light}) !important;`,
        }]);
        additionalCss.push([{
            selector:    '%%order_class%% .swiper-container-3d .swiper-slide-shadow-right',
            declaration: `background-image: linear-gradient(to right,${props.coveflow_color_dark},${props.coveflow_color_light}) !important;`,
        }]);
        // spacing
        utility.process_margin_padding({
            'props': props,
            'key': 'item_wrapper_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-post-outer-wrap',
            'type': 'padding'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'item_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-post-inner-wrap',
            'type': 'margin'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'item_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-post-inner-wrap',
            'type': 'padding'
        });

        utility.process_margin_padding({
            'props': props,
            'key': 'wrapper_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-posts-wrap',
            'type': 'margin'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'wrapper_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-posts-wrap',
            'type': 'padding'
        });
        // background
        utility.df_process_bg({
            'props': props,
            'additionalCss': additionalCss,
            'key': 'item_background',
            'selector': '%%order_class%% .df-post-inner-wrap'
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
                selector:    '%%order_class%% .df_bc_arrows',
                declaration: BlogCarousel.df_arrow_pos_styles(pos),
                'device':'desktop',
            }]);
            additionalCss.push([{
                selector:    '%%order_class%% .df_bc_arrows',
                declaration: BlogCarousel.df_arrow_pos_styles(pos_tab),
                'device':'tablet',
            }]);
            additionalCss.push([{
                selector:    '%%order_class%% .df_bc_arrows',
                declaration: BlogCarousel.df_arrow_pos_styles(pos_ph),
                'device':'phone'
            }]);
            // alignment
            additionalCss.push([{
                selector:    '%%order_class%% .df_bc_arrows',
                declaration: `justify-content: ${a_align};`,
                'device':'desktop',
            }]);
            additionalCss.push([{
                selector:    '%%order_class%% .df_bc_arrows',
                declaration: `justify-content: ${a_align_tab};`,
                'device':'tablet',
            }]);
            additionalCss.push([{
                selector:    '%%order_class%% .df_bc_arrows',
                declaration: `justify-content: ${a_align_ph};`,
                'device':'phone'
            }]);
            if (props.arrow_circle === 'on') {
                additionalCss.push([{
                    selector:    '%%order_class%% .df_bc_arrows > div',
                    declaration: `border-radius: 50%;`,
                }]);
            }

            // arrow colors
            utility.process_color({
                'props'             : props,
                'key'               : 'arrow_color',
                'additionalCss'     : additionalCss,
                'selector'          : '%%order_class%% .df_bc_arrows div:after',
                'type'              : 'color',
            })
            utility.process_color({
                'props'             : props,
                'key'               : 'arrow_background',
                'additionalCss'     : additionalCss,
                'selector'          : '%%order_class%% .df_bc_arrows div',
                'type'              : 'background-color',
            })

            utility.process_range_value({
                'props'             : props,
                'key'               : 'arrow_opacity',
                'additionalCss'     : additionalCss,
                'selector'          : '%%order_class%% .df_bc_arrows div',
                'type'              : 'opacity',
            });
            if( 'on' !== props.loop){
                utility.process_range_value({
                    'props'             : props,
                    'key'               : 'arrow_opacity_disable',
                    'additionalCss'     : additionalCss,
                    'selector'          : '%%order_class%% .df_bc_arrows div.swiper-button-disabled',
                    'type'              : 'opacity',
                });
            }
            utility.process_margin_padding({
                'props' : props,
                'key':'arrow_prev_margin',
                'additionalCss' : additionalCss,
                'selector' : '%%order_class%% .df_bc_arrows .swiper-button-prev',
                'type'  : 'margin',
                'important' : false
            });
            utility.process_margin_padding({
                'props' : props,
                'key':'arrow_prev_padding',
                'additionalCss' : additionalCss,
                'selector' : '%%order_class%% .df_bc_arrows .swiper-button-prev',
                'type'  : 'padding',
                'important' : false
            });
            utility.process_margin_padding({
                'props' : props,
                'key':'arrow_next_margin',
                'additionalCss' : additionalCss,
                'selector' : '%%order_class%% .df_bc_arrows .swiper-button-next',
                'type'  : 'margin',
                'important' : false
            });
            utility.process_margin_padding({
                'props' : props,
                'key':'arrow_next_padding',
                'additionalCss' : additionalCss,
                'selector' : '%%order_class%% .df_bc_arrows .swiper-button-next',
                'type'  : 'padding',
                'important' : false
            });
            // arrow icon styles
            utility.process_icon_styles({
                'props' : props,
                'key':'arrow_prev_icon',
                'additionalCss' : additionalCss,
                'selector' : '%%order_class%% .df_bc_arrows div.swiper-button-prev:after'
            })
            utility.process_icon_styles({
                'props' : props,
                'key':'arrow_next_icon',
                'additionalCss' : additionalCss,
                'selector' : '%%order_class%% .df_bc_arrows div.swiper-button-next:after'
            })
        }
        // dots
        if(props.dots === 'on') {
            const dots_pos = props.dots_position ? props.dots_position : 'top';
            const dots_pos_tab = props.dots_position_tablet ? props.dots_position_tablet : dots_pos; 
            const dots_pos_ph = props.dots_position_phone ? props.dots_position_phone : dots_pos_tab; 

            additionalCss.push([{
                selector:    '%%order_class%% .swiper-pagination',
                declaration: BlogCarousel.df_arrow_pos_styles(dots_pos),
                'device':'desktop',
            }]);
            additionalCss.push([{
                selector:    '%%order_class%% .swiper-pagination',
                declaration: BlogCarousel.df_arrow_pos_styles(dots_pos_tab),
                'device':'tablet',
            }]);
            additionalCss.push([{
                selector:    '%%order_class%% .swiper-pagination',
                declaration: BlogCarousel.df_arrow_pos_styles(dots_pos_ph),
                'device':'phone'
            }]);

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
            utility.process_color({
                'props'             : props,
                'key'               : 'dots_color',
                'additionalCss'     : additionalCss,
                'selector'          : '%%order_class%% .swiper-pagination span',
                'type'              : 'background',
            });
            utility.process_color({
                'props'             : props,
                'key'               : 'active_dots_color',
                'additionalCss'     : additionalCss,
                'selector'          : '%%order_class%% .swiper-pagination span.swiper-pagination-bullet-active',
                'type'              : 'background',
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

    df_bc_arrow(order_number) {
        const utils = window.ET_Builder.API.Utils;
        const prev_icon = this.props.arrow_prev_icon_use_icon === 'on' &&  this.props.arrow_prev_icon_font_icon ?
            utils.processFontIcon(this.props.arrow_prev_icon_font_icon) : '4';
        const next_icon = this.props.arrow_next_icon_use_icon === 'on' &&  this.props.arrow_next_icon_font_icon ?
            utils.processFontIcon(this.props.arrow_next_icon_font_icon) : '5';

        return this.props.arrow === 'on' ?
            <div className="df_bc_arrows">
                <div className={"swiper-button-next bc-next-" + order_number} data-icon={next_icon}></div>
                <div className={"swiper-button-prev bc-prev-" + order_number} data-icon={prev_icon}></div>
            </div> : '';
    }

    df_bc_dots(order_number) {
        return this.props.dots === 'on' ?
            <div className={"swiper-pagination bc-dots-"+ order_number}></div> : '';
    }

    render_output() {
        const props = this.props;
        var content = this.state.posts;
        var parser = new DOMParser();
        var doc = parser.parseFromString(content, "text/html");
        var post_items = this.get_post_items().posts_item_object;

        $(doc).find('.df-post-outer-wrap').each(function(index, element){
            var item = $(element).find('.df-item-wrap');
            item.each(function(i,e){
                var classes = $.grep(this.className.split(" "), function(v, i){
                    return v.indexOf('difl_postitem') === 0;
                }).join();
                $(e).removeClass(classes);
                if (post_items[i]) {
                    $(e).addClass(post_items[i]['class'])
                }
            })
        })

        return {__html: doc.querySelector('body').outerHTML};
    }

    render() {
        const props = this.props;
        const order_number        = Number(props.moduleInfo.address.replace(/\D/g,''));

        return(
            <React.Fragment>
                {!this.state.loading ? 
                    <React.Fragment>
                        { props.content.length !== 0 ? <div style={{display: 'none'}}>{props.content}</div> : '' }
                        <div className="df_blogcarousel_container"  ref={this.wrapper}> 
                            <div className="swiper-container" dangerouslySetInnerHTML={this.render_output()}/>
                            {this.df_bc_arrow(order_number)}
                            
                        </div>
                        {this.df_bc_dots(order_number)}
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
export default BlogCarousel;
