// External Dependencies
import React, { Component } from 'react';
import utility from '../../../scripts/df_scripts/utilities';
// Internal Dependencies
import './style.css';

class ProductItem extends Component {
    static slug = 'difl_productitem';
    _isMounted = false;

    static css(props) {
        const additionalCss = [];
        const meta = ['rating', 'add_to_cart', 'button', 'price', 'categories','tags', 'custom_text']; 

        if(meta.includes(props.type)) {
            const meta_display_props = props.meta_display ? props.meta_display : 'block';

            additionalCss.push([{
                selector:    '%%order_class%%',
                declaration: `display: ${meta_display_props};`,
            }]);

            if(props.meta_display === 'inline-flex'){
                additionalCss.push([{
                    selector:    '%%order_class%%',
                    declaration: `vertical-align: middle;`,
                }]);
            }


            if(props.text_show_on_hover ==='on' ) {
                additionalCss.push([{
                    selector:    '%%order_class%%.df-item-wrap.df-product-add-to-cart-wrap a.df_button',
                    declaration: `font-size: 0px;`,
                }]);
                additionalCss.push([{
                    selector:    '%%order_class%%.df-item-wrap.df-product-add-to-cart-wrap a.df_button:hover',
                    declaration: `font-size: inherit;`,
                }]);
        
            } 

        }

        if(props.type === 'button' && props.meta_display === 'block'){
            additionalCss.push([{
                selector:    '%%order_class%%.df-product-button-wrap a.df-product-read-more',
                declaration: `display: block`,
            }]);
        }

       // Icon Design Setting
        if(props['use_icon'] ==='on' || props['use_image_as_icon'] === 'on'){
            const poperty_type = props['image_icon_placement'] === 'left' ? 'margin-right' : 'margin-left';
            if(props['use_only_icon'] === 'off'){
                utility.process_range_value({
                    'props'             : props,
                    'key'               : 'space_btw_text_icon',
                    'additionalCss'     : additionalCss,
                    'selector'          : '%%order_class%%.df-item-wrap a.df_button span.et-pb-icon, %%order_class%%.df-item-wrap a.df_button img.df_product_icon_image',
                    'type'              : poperty_type,
                    'default_value'     : '10px',
                    'important'         : true
                });
            }
        }
        if( props['use_image_as_icon'] === 'on'){
            utility.process_range_value({
                'props'             : props,
                'key'               : 'image_as_icon_width',
                'additionalCss'     : additionalCss,
                'selector'          : '%%order_class%%.df-item-wrap a.df_button img',
                'type'              : 'width',
                'default_value'     : '20px',
                'important'         : true
            });
            utility.process_range_value({
                'props'             : props,
                'key'               : 'image_as_icon_width',
                'additionalCss'     : additionalCss,
                'selector'          : '%%order_class%%.df-product-add-to-cart-wrap a.added_to_cart.wc-forward::after, %%order_class%%.df-product-add-to-cart-wrap a.added_to_cart.wc-forward::before',
                'type'              : 'font-size',
                'default_value'     : '20px',
            });
        }
        utility.df_process_string_attr({
            'props': props,
            'key': 'image_icon_placement',
            'additionalCss': additionalCss,
            'selector': '%%order_class%%.df-item-wrap:not(.only_icon_in_cart) a.df_button img',
            'type': 'float',
            'default_value': 'right',
            'important': true
        });
        const meta_display_type = props.meta_display ? props.meta_display : 'block';
        if(props.use_only_icon === 'on' && props.use_image_as_icon === 'on' && meta_display_type === 'block') {
    
            if(props['only_icon_position'] === 'center'){
                additionalCss.push([{
                    selector:    '%%order_class%%.df-item-wrap.only_icon_in_cart a img.df_product_icon_image',
                    declaration: `display:block; margin:0px auto !important;`,
                }]);
    
            }
            else{
                utility.df_process_string_attr({
                    'props': props,
                    'key': 'only_icon_position',
                    'additionalCss': additionalCss,
                    'selector': '%%order_class%%.df-item-wrap.only_icon_in_cart a img.df_product_icon_image',
                    'type': 'float',
                    'default_value': 'left',
                    'important': true
                });
    
            }
            utility.df_process_string_attr({
                'props': props,
                'key': 'only_icon_position',
                'additionalCss': additionalCss,
                'selector': '%%order_class%%.df-item-wrap.only_icon_in_cart a.added_to_cart.wc-forward',
                'type': 'text-align',
                'default_value': 'left',
                'important': true
            });
            
            
        }

        if(props.display_type ==='show_on_hover'){
          
            additionalCss.push([{
                selector:    '.df-item-wrap%%order_class%%',
                declaration: `opacity: 0;`
            }]);

            additionalCss.push([{
                selector:    '.df-product-outer-wrap:hover .df-item-wrap%%order_class%%',
                declaration: `opacity: 1;`
            }]);
            if(props.always_show_on_mobile ==='on'){
                additionalCss.push([{
                    selector:    '.df-item-wrap%%order_class%%',
                    declaration: `opacity: 1;`,
                    'device':'phone'
                }]);
                additionalCss.push([{
                    selector:    '.df-item-wrap%%order_class%%',
                    declaration: `opacity: 1;`,
                    'device':'tablet'
                }]);
            }
        }

        if(props.display_type ==='hide_on_hover'){
          
            additionalCss.push([{
                selector:    '.df-item-wrap%%order_class%%',
                declaration: `opacity: 1;`
            }]);

            additionalCss.push([{
                selector:    '.df-product-outer-wrap:hover .df-item-wrap%%order_class%%',
                declaration: `opacity: 0;`
            }]);

            if(props.always_show_on_mobile ==='on'){
                additionalCss.push([{
                    selector:    '.df-product-outer-wrap:hover .df-item-wrap%%order_class%%',
                    declaration: `opacity: 1;`,
                    'device':'phone'
                }]);
                additionalCss.push([{
                    selector:    '.df-product-outer-wrap:hover .df-item-wrap%%order_class%%',
                    declaration: `opacity: 1;`,
                    'device':'tablet'
                }]);
            }
       
        }

        if(props.type ==='rating'){
  
            utility.process_color({
                'props': props,
                'key': 'rating_color',
                'additionalCss': additionalCss,
                'selector': '%%order_class%% .star-rating span::before',
                'type': 'color'
            });
            utility.process_color({
                'props': props,
                'key': 'disable_rating_color',
                'additionalCss': additionalCss,
                'selector': '%%order_class%% .star-rating::before',
                'type': 'color',
                'important': true
            })       
            utility.process_range_value({
                'props': props,
                'key': 'rating_size',
                'additionalCss': additionalCss,
                'selector': '%%order_class%% .star-rating',
                'type': 'font-size',
                'important': true
            });
        }

        utility.process_range_value({
            'props'             : props,
            'key'               : 'icon_size',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%%.df-item-wrap .et-pb-icon',
            'type'              : 'font-size',
            'default_value'     : '12px',
            'important'         : true
        });
        utility.process_color({
            'props'             : props,
            'key'               : 'icon_color',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%%.df-item-wrap .et-pb-icon',
            'type'              : 'color',
            'important'         : true
        });

        if (props.image_scale === 'df-image-rotate-left') {
            additionalCss.push([{
                selector:    '.df-hover-trigger:hover %%order_class%% .df-image-rotate-left img, :focus.df-hover-trigger:hover %%order_class%% .df-image-rotate-left img',
                declaration: `transform: scale(${props.image_scale_hover}) rotate(-15deg);`
            }]);
        }
        if (props.image_scale === 'df-image-rotate-right') {
            additionalCss.push([{
                selector:    '.df-hover-trigger:hover %%order_class%% .df-image-rotate-right img, :focus.df-hover-trigger:hover %%order_class%% .df-image-rotate-right img',
                declaration: `transform: scale(${props.image_scale_hover}) rotate(15deg);`
            }]);
        }
        // overlay
        if(props.overlay === 'on') {
            const direction = props.overlay_direction ? props.overlay_direction : '180deg';
            const primary = props.overlay_primary ? props.overlay_primary : '#00b4db';
            const secondary = props.overlay_secondary ? props.overlay_secondary : '#0083b0';
    
            additionalCss.push([{
                selector:    '%%order_class%% .df-hover-effect .df-overlay',
                declaration: `background-image: linear-gradient(${direction},  
                    ${primary} 0, 
                    ${secondary} 100%);`
            }]);   
            utility.process_range_value({
                'props'             : props,
                'key'               : 'overlay_icon_size',
                'additionalCss'     : additionalCss,
                'selector'          : '%%order_class%%.df-item-wrap .df-icon-overlay',
                'type'              : 'font-size',
                'important'         : true
            });
            utility.process_color({
                'props'             : props,
                'key'               : 'overlay_icon_color',
                'additionalCss'     : additionalCss,
                'selector'          : '%%order_class%%.df-item-wrap .df-icon-overlay',
                'type'              : 'color',
                'important'         : true
            });

            if(props.overlay_off_at_mobile && props.overlay_off_at_mobile ==='on' ){
                additionalCss.push([{
                    selector:    '%%order_class%% .df-hover-effect .df-overlay',
                    declaration: `display:none;`,
                    'device':'phone'
                }]);
            }
        }

        if(props.type === 'divider') {
            const divider_color_primary = props.divider_color_primary ? props.divider_color_primary : '#e02b20';
            const divider_color_secondary = props.divider_color_secondary ? props.divider_color_secondary : '#fc7069';
            const divider_color_direction = props.divider_color_direction ? props.divider_color_direction : '90deg';
            const divider_color_start = props.divider_color_start ? props.divider_color_start : '0%';
            const divider_color_end = props.divider_color_end ? props.divider_color_end : '100%';

            additionalCss.push([{
                selector:    '%%order_class%% .df-product-ele-divider',
                declaration: `background-image: linear-gradient(${divider_color_direction},  
                    ${divider_color_primary} ${divider_color_start}, 
                    ${divider_color_secondary} ${divider_color_end});`
            }]);
            utility.process_range_value({
                'props'             : props,
                'key'               : 'divider_line_height',
                'additionalCss'     : additionalCss,
                'selector'          : '%%order_class%%.df-item-wrap .df-product-ele-divider',
                'type'              : 'height',
                'important'         : true
            });
        }

        // spacing
        utility.process_margin_padding({
            'props': props,
            'key': 'element_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%%',
            'type': 'margin'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'element_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%%',
            'type': 'padding'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'button_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% a',
            'type': 'margin'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'button_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% a',
            'type': 'padding'
        });

        utility.process_margin_padding({
            'props': props,
            'key': 'icon_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%%.df-item-wrap a.df_button img.df_product_icon_image, %%order_class%%.df-item-wrap .et-pb-icon',
            'type': 'margin'
        });

        if (props.type === 'image') {
            utility.process_margin_padding({
                'props': props,
                'key': 'image_margin',
                'additionalCss': additionalCss,
                'selector': '.woocommerce ul li.product %%order_class%% a.df-hover-effect img',
                'type': 'margin'
            });
        }

        if (props.type === 'divider') {
            utility.process_margin_padding({
                'props': props,
                'key': 'divider_margin',
                'additionalCss': additionalCss,
                'selector': '%%order_class%% span',
                'type': 'margin'
            });
            utility.process_margin_padding({
                'props': props,
                'key': 'divider_padding',
                'additionalCss': additionalCss,
                'selector': '%%order_class%% span',
                'type': 'padding'
            });
        }

        utility.process_icon_font_style({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'font_icon',
            'selector'          : '%%order_class%% .et-pb-icon'
        })
        if(props.overlay_icon === 'on'){
            utility.process_icon_font_style({
                'props'             : props,
                'additionalCss'     : additionalCss,
                'key'               : 'overlay_font_icon',
                'selector'          : '%%order_class%% .df-icon-overlay'
            })
        } 
        
        return additionalCss;
    }

    render() {
        return false;
    }
}
export default ProductItem;