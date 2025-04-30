// External Dependencies
import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import _ from 'lodash';
import utility from '../../../scripts/df_scripts/utilities';
import Isotope from 'isotope-layout';
// Internal Dependencies
import './style.css';

var lodash = _.noConflict();

class ProductGrid extends Component {
    static slug = 'difl_productgrid';
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            products: '',
            loading: true,
            masonry: null,
            product_items: [],
            product_items_without_class: []
        }

        this.wrapper = React.createRef();
        this.get_products = this.get_products.bind(this);
        this.render_output = this.render_output.bind(this);
        this.get_product_items = this.get_product_items.bind(this);
        this.computedType = ['posts_number', 'type', 'include_categories', 'include_tags', 'orderby', 'offset_number', 'layout',
        'column', 'use_image_as_background', 'equal_height', 'show_pagination','show_badge', 'show_badge_in_image' , 'on_sale_text',
        'after_sale_text_enable', 'after_sale_text_type','after_sale_text', 'enable_custom_soldout_text', 'custom_soldout_text', 'next_prev_icon'];
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidUpdate(prevProps, prevState) {
        const _this = this;
        const utils = window.ET_Builder.API.Utils;
        if(_this.state.loading) {
            setTimeout(_this.get_products, 800)
        }

        if(_this.props.layout === 'masonry' && _this.state.masonry) {
            _this.state.masonry.layout()
        }

        _this.get_product_items();

        for (const index of _this.computedType) {
            if (prevProps[index] !== _this.props[index]) {
                if(_this.computedType.includes(index)){
                    _this.setState({loading: true})
                }
            }
        } 
        const prev_icon = ProductGrid.arrow_icon(_this.props['next_prev_icon'], 'prev');
        const next_icon = ProductGrid.arrow_icon(_this.props['next_prev_icon'], 'next');
        const icon =  utils.processFontIcon('5');
        const prev_icon_html = '<span class="et-pb-icon">'+ utils.processFontIcon(prev_icon)+'</span>';
        const next_icon_html = '<span class="et-pb-icon">'+ utils.processFontIcon(next_icon)+'</span>';

        if(_this.wrapper.current){
            if(_this.wrapper.current.querySelector(".woocommerce-pagination a.next.page-numbers")){
                var next_el = _this.wrapper.current.querySelector(".woocommerce-pagination a.next.page-numbers");
                 next_el.innerHTML = next_icon_html;
            }
      
            if(_this.wrapper.current.querySelector(".woocommerce-pagination a.prev.page-numbers")){
                 var prev_el = _this.wrapper.current.querySelector(".woocommerce-pagination a.prev.page-numbers");
                 prev_el.innerHTML = prev_icon_html;
            }
        }

        // fix builder css selector issue
        if(_this.wrapper.current) {
            utility.df_fix_builder_css_issue(
                _this.wrapper.current,
                _this.wrapper.current.parentElement
            )
        }
           
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
                action : 'df_pg_products'
            },
            data : {
                et_admin_load_nonce: window.et_fb_options.et_admin_load_nonce,
                productItems: _this.get_product_items().productItems,
                element_classes: _this.state.element_classes,
                posts_number: _this.props.posts_number,
                column: _this.props.column,
                type: _this.props.type,
                include_categories: _this.props.include_categories,
                include_tags: _this.props.include_tags,
                orderby: _this.props.orderby,
                layout: _this.props.layout,
                use_image_as_background: _this.props.use_image_as_background,
                equal_height: _this.props.equal_height,
                show_pagination: _this.props.show_pagination,
                show_badge: _this.props.show_badge,
                show_badge_in_image: _this.props.show_badge_in_image,
                on_sale_text: _this.props.on_sale_text,
                after_sale_text_enable: _this.props.after_sale_text_enable,
                after_sale_text_type: _this.props.after_sale_text_type,
                after_sale_text: _this.props.after_sale_text,
                enable_custom_soldout_text: _this.props.enable_custom_soldout_text,
                custom_soldout_text: _this.props.custom_soldout_text,
                show_rating: _this.props.show_rating,
                use_current_loop:_this.props.use_current_loop
            }
        })
        .then(function(response) {
            _this.setState({
                loading: false,
                products: response.data.data
            })
        })
        .then(function(response){
            if(_this.props.layout === 'masonry') {
                const selector = _this.wrapper.current.querySelector('.products');
                var masonry = new Isotope( selector, {
                    itemSelector: 'li.product'
                });
                masonry.layout();
                _this.setState({masonry: masonry})
            }
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

        if (!content || content.length === 0) {
            if(!lodash.isEqual(productItems, _this.state.product_items)) {
                _this.setState({
                    product_items : productItems, 
                    loading: true
                })
            }
            return {
                'productItems': productItems,
                'products_item_object': products_item_object
            };
        };

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
                object.image_alt_text = item_props.image_alt_text !== '' ? item_props.image_alt_text : '';
                object.image_as_icon_width = item_props.image_as_icon_width?item_props.image_as_icon_width: '20px';
                object.image_icon_placement = item_props.image_icon_placement?item_props.image_icon_placement: 'right';
               
                //Categories
                object.use_category_link = item_props.use_category_link?item_props.use_category_link: 'off';
                object.use_separator = item_props.use_separator?item_props.use_separator: 'off';
                object.category_separator = item_props.category_separator?item_props.category_separator: '|';
                object.category_open_new_tab = item_props.category_open_new_tab?item_props.category_open_new_tab: 'off';
                
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
                object.overlay_font_icon = item_props.overlay_icon ==='on' && item_props.overlay_font_icon ? item_props.overlay_font_icon : '5';

                // custom text
                object.custom_text = item_props.custom_text ? item_props.custom_text : '';
                object.add_to_cart_text = item_props.add_to_cart_text ? item_props.add_to_cart_text : 'Add To Cart';
                object.use_only_icon = item_props.use_only_icon ? item_props.use_only_icon : 'off';
                // class
                object.module_vb_class =  'et-module-' + data.props._key;
                object.class =  data.props.matching.slug + '_' +  data.props.shortcode_index;
                // background
                object.background_enable_mask_style = item_props.background_enable_mask_style ? item_props.background_enable_mask_style : 'off';
                object.background_enable_pattern_style = item_props.background_enable_pattern_style ? item_props.background_enable_pattern_style : 'off';
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

    static arrow_icon(set = 'set_1', type) {
        const icons = {
            set_1 : {
                next: '5',
                prev: '4'
            },
            set_2: {
                next: '$',
                prev: '#'
            },
            set_3: {
                next: '9',
                prev: '8'
            },
            set_4: {
                next: 'E',
                prev: 'D'
            },
        };
        return icons[set][type];
    }

    static css(props) {
        const additionalCss = [];
        if(props.show_badge ==='on'){
            additionalCss.push([{
                selector:    '%%order_class%% span.df-onsale:not(.df-sale-badge)',
                declaration: `display:none`
            }]);
        }
        if(props.show_pagination_result_count ==='off'){
            additionalCss.push([{
                selector:    '%%order_class%% .woocommerce .woocommerce-result-count',
                declaration: `display:none`
            }]);
        }
        if(props.show_pagination_sorting ==='off'){
            additionalCss.push([{
                selector:    '%%order_class%% .woocommerce .woocommerce-ordering',
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
            'selector': '%%order_class%% .woocommerce ul.products li.product .df-onsale',
            'type': 'margin'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'on_sale_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .woocommerce ul.products li.product .df-onsale',
            'type': 'padding'
        }); 
        utility.process_margin_padding({
            'props': props,
            'key': 'pagination_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .woocommerce nav.woocommerce-pagination ul .page-numbers',
            'type': 'margin'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'pagination_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .woocommerce nav.woocommerce-pagination ul .page-numbers',
            'type': 'padding'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'pagination_wrapper_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .woocommerce nav.woocommerce-pagination',
            'type': 'margin'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'pagination_wrapper_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .woocommerce nav.woocommerce-pagination',
            'type': 'padding'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'pagination_result_count_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .woocommerce .woocommerce-result-count',
            'type': 'margin'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'pagination_result_count_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .woocommerce .woocommerce-result-count',
            'type': 'padding'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'pagination_sorting_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .woocommerce .woocommerce-ordering select',
            'type': 'margin'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'pagination_sorting_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .woocommerce .woocommerce-ordering select',
            'type': 'padding'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'wrapper_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-products-wrap',
            'type': 'margin'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'wrapper_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-products-wrap',
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
            'selector': '%%order_class%% .woocommerce ul.products li.product .df-onsale ,%%order_class%% .woocommerce-page ul.products li.product .df-onsale',
            'important' : true
        });
        utility.df_process_bg({
            'props': props,
            'additionalCss': additionalCss,
            'key': 'pagination_wrapper_background',
            'selector': '%%order_class%% .woocommerce nav.woocommerce-pagination'
        });
        utility.df_process_bg({
            'props': props,
            'additionalCss': additionalCss,
            'key': 'pagination_background',
            'selector': '%%order_class%% .woocommerce nav.woocommerce-pagination ul li .page-numbers'
        });
        utility.df_process_bg({
            'props': props,
            'additionalCss': additionalCss,
            'key': 'pagination_result_count_background',
            'selector': '%%order_class%% .woocommerce .woocommerce-result-count'
        });
        utility.df_process_bg({
            'props': props,
            'additionalCss': additionalCss,
            'key': 'pagination_sorting_background',
            'selector': '%%order_class%% .woocommerce .woocommerce-ordering select'
        });
        utility.df_process_bg({
            'props': props,
            'additionalCss': additionalCss,
            'key': 'active_pagination_background',
            'selector': '%%order_class%% .woocommerce nav.woocommerce-pagination ul li span.current',
            'important' : true
        });
        // column
        if ( props.column && props.column !== '') {
            const column_desktop = (100 / parseInt(props.column)) + '%' ;
            additionalCss.push([{
                selector:    '%%order_class%% .woocommerce ul.products li.product',
                declaration: `width: ${column_desktop};`,
            }]);
        }
        if ( props.column_tablet && props.column_tablet !== '') {
            const column_tablet = (100 / parseInt(props.column_tablet)) + '%' ;
            additionalCss.push([{
                selector:    '%%order_class%% .woocommerce ul.products li.product',
                declaration: `width: ${column_tablet};`,
                'device':'tablet'
            }]);
        }
        if ( props.column_phone && props.column_phone !== '') {
            const column_phone = (100 / parseInt(props.column_phone)) + '%' ;
            additionalCss.push([{
                selector:    '%%order_class%% .woocommerce ul.products li.product',
                declaration: `width: ${column_phone};`,
                'device':'phone'
            }]);
        }

        additionalCss.push([{
            selector:    '%%order_class%% .woocommerce ul.products li.product, %%order_class%% .woocommerce-page ul.products li.product',
            declaration: `margin: 0px !important;`,
        }]);

        // gutter
        if ( props.gutter && props.gutter !== '') {
            const gutter_desktop = parseInt(props.gutter) / 2 ;
            additionalCss.push([{
                selector:    '%%order_class%% ul.products li.product',
                declaration: `padding-left: ${gutter_desktop}px; padding-right: ${gutter_desktop}px; padding-bottom: ${parseInt(props.gutter)}px;`,
            }]);
            additionalCss.push([{
                selector:    '%%order_class%% ul.products',
                declaration: `margin-left:-${gutter_desktop}px !important;margin-right:-${gutter_desktop}px !important;`
            }]);
        }
        // gutter tablet
        if ( props.gutter_tablet && props.gutter_tablet !== '') {
            const gutter_tablet = parseInt(props.gutter_tablet) / 2 ;
            additionalCss.push([{
                selector:    '%%order_class%% ul.products li.product',
                declaration: `padding-left: ${gutter_tablet}px; padding-right: ${gutter_tablet}px; padding-bottom: ${parseInt(props.gutter_tablet)}px;`,
                'device':'tablet'
            }]);
            additionalCss.push([{
                selector:    '%%order_class%% ul.products',
                declaration: `margin-left:-${gutter_tablet}px !important;margin-right:-${gutter_tablet}px !important;`,
                'device':'tablet'
            }]);
        }
        // gutter phone
        if ( props.gutter_phone && props.gutter_phone !== '') {
            const gutter_phone = parseInt(props.gutter_phone) / 2 ;
            additionalCss.push([{
                selector:    '%%order_class%% .df-product-item',
                declaration: `padding-left: ${gutter_phone}px; padding-right: ${gutter_phone}px; padding-bottom: ${parseInt(props.gutter_phone)}px;`,
                'device':'phone'
            }]);

            additionalCss.push([{
                selector:    '%%order_class%% ul.products',
                declaration: `margin-left:-${gutter_phone}px !important;margin-right:-${gutter_phone}px !important;`,
                'device':'phone'
            }]);
        }
        // pagination
        if(props.show_pagination === 'on'){
            utility.df_process_string_attr({
                'props'             : props,
                'key'               : 'pagination_align',
                'additionalCss'     : additionalCss,
                'selector'          : '%%order_class%% .woocommerce nav.woocommerce-pagination',
                'type'              : 'text-align',
                'default_value'     : 'center'
            });
    
            utility.process_color({
                'props': props,
                'key': 'next_prev_icon_color',
                'additionalCss': additionalCss,
                'selector': '%%order_class%% .woocommerce nav.woocommerce-pagination ul li span.et-pb-icon',
                'type': 'color',
            });
        
            utility.process_range_value({
                'props': props,
                'key': 'next_prev_icon_size',
                'additionalCss': additionalCss,
                'selector': '%%order_class%% .woocommerce nav.woocommerce-pagination ul li .page-numbers span.et-pb-icon',
                'type': 'font-size',
                'important' :true
            });
        }
       

        var translate_values = {
            'top_left' :  'top: 0px !important; left: 0 !important; transform: none !important;',
            'top_center' :  'top: 0px !important; left: 50% !important; transform: translateX(-50%) !important;',
            'top_right' :  'top:0px !important; left: 100% !important; transform: translate(-100%) !important;',   
            'center_left' :  'left: 0px !important; top: 50% !important; transform: translateY(-50%) !important;',
            'center_center' :  'left: 50% !important; top:50% !important; transform: translate(-50%, -50%) !important;',
            'center_right' :  'left: 100% !important; top: 50% !important; transform: translate(-100%, -50%) !important;',
            'bottom_left' :  'left:0px !important; top: 100% !important; transform: translateY(-100%) !important;',
            'bottom_center' :  'left: 50% !important; top:100% !important; transform: translate(-50% ,-100%) !important',
            'bottom_right' :  'left: 100% !important; top: 100% !important; transform: translate(-100% ,-100%) !important;',
        };
        const badge_placement = props.badge_placement ? props.badge_placement : 'top_left';
        utility.df_process_string_attr({
            'props'             : props,
            'key'               : 'badge_placement',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .woocommerce ul.products li.product .df-sale-badge.df-onsale',
            'type'              : 'text-align',
            'default_value'     : 'center'
        });
        additionalCss.push([{
            selector:    '%%order_class%% .woocommerce ul.products li.product .df-sale-badge.df-onsale',
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

    render_output() {
        const props = this.props;
        var content = this.state.products;
        var parser = new DOMParser();
        var doc = parser.parseFromString(content, "text/html");
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

        return(
            <React.Fragment>
            <div>
                {this.state.loading === false ? 
                    <React.Fragment>
                        { props.content.length !== 0 ? props.content : '' }
                        <div className="df_productgrid_container" ref={this.wrapper} > 
                            <div className="df-products-wrap" dangerouslySetInnerHTML={this.render_output()} /> 
                        </div>
                    </React.Fragment>
                    : 
                    <div className="et-fb-preloader et-fb-preloader__loading">
                        <div className="et-fb-loader"/>
                    </div>
                }
            </div>
            </React.Fragment>
        )
    }
}
export default ProductGrid;