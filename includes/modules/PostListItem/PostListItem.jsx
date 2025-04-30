// External Dependencies
import React, { Component } from 'react';
import utility from '../../../scripts/df_scripts/utilities';
// Internal Dependencies
import './style.css';


class PostListItem extends Component {
    static slug = 'difl_postlistitem';
    _isMounted = false;

    static css(props) {
        const additionalCss = [];
        const meta = ['author', 'date', 'categories', 'comments', 'custom_text', 'tags', 'acf_fields','reading_time'];

        if(props.meta_before_text && '' !== props.meta_before_text) {
            additionalCss.push([{
                selector:    '%%order_class%%:before',
                declaration: `content: "${props.meta_before_text} ";`,
            }]);
        }
        if(meta.includes(props.type)) {
            const meta_display_props = props.meta_display ? props.meta_display : 'inline-flex';
            additionalCss.push([{
                selector:    '%%order_class%%',
                declaration: `display: ${meta_display_props};`,
            }]);

            if(meta_display_props === 'inline-block' || meta_display_props === 'inline-flex' || meta_display_props === 'inline'){
                utility.df_process_string_attr({
                    'props': props,
                    'key': 'meta_position',
                    'additionalCss': additionalCss,
                    'default_value'     : 'none',
                    'selector': '%%order_class%%',
                    'type': 'float'
                });
            }
        }

        utility.process_range_value({
            'props'             : props,
            'key'               : 'icon_image_width',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%%.df-item-wrap .df-icon-image',
            'type'              : 'width',
            'default_value'     : 'auto',
            'important'         : true
        });
        additionalCss.push([{
            selector:    '%%order_class%%.df-item-wrap .df-icon-image',
            declaration: `vertical-align: ${props.icon_image_verticle_align};`,
        }]);
        utility.process_range_value({
            'props'             : props,
            'key'               : 'icon_size',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%%.df-item-wrap .et-pb-icon',
            'type'              : 'font-size',
            'default_value'     : '12px',
            'important'         : true
        });
        if('on' === props.icon_vertical_alignment) {
            additionalCss.push([{
                selector:    '%%order_class%%.df-item-wrap .df-post-read-more',
                declaration: 'display: flex !important; align-items: center !important;',
            }]);
        }
        utility.process_color({
            'props'             : props,
            'key'               : 'icon_color',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%%.df-item-wrap .et-pb-icon',
            'type'              : 'color',
            'important'         : true
        });
        if(props.image_full_width === 'on') {
            additionalCss.push([{
                selector:    '%%order_class%% img',
                declaration: `width: 100%;`,
            }]);
        }

        if (props.image_scale === 'df-image-rotate-left') {
            additionalCss.push([{
                selector:    '.df-hover-trigger:hover %%order_class%% .df-image-rotate-left img, :focus.df-hover-trigger:hover %%order_class%% .df-image-rotate-left img',
                declaration: `transform: scale(${props.image_scale_hover}) rotate(-15deg);`,
            }]);
        }
        if (props.image_scale === 'df-image-rotate-right') {
            additionalCss.push([{
                selector:    '.df-hover-trigger:hover %%order_class%% .df-image-rotate-right img, :focus.df-hover-trigger:hover %%order_class%% .df-image-rotate-right img',
                declaration: `transform: scale(${props.image_scale_hover}) rotate(15deg);`,
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
                    ${secondary} 100%);`,
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
        }

        if(props.type === 'divider') {
            const divider_color_primary = props.divider_color_primary ? props.divider_color_primary : '#e02b20';
            const divider_color_secondary = props.divider_color_secondary ? props.divider_color_secondary : '#fc7069';
            const divider_color_direction = props.divider_color_direction ? props.divider_color_direction : '90deg';
            const divider_color_start = props.divider_color_start ? props.divider_color_start : '0%';
            const divider_color_end = props.divider_color_end ? props.divider_color_end : '100%';

            additionalCss.push([{
                selector:    '%%order_class%% .df-post-ele-divider',
                declaration: `background-image: linear-gradient(${divider_color_direction},
                    ${divider_color_primary} ${divider_color_start},
                    ${divider_color_secondary} ${divider_color_end});`,
            }]);
            utility.process_range_value({
                'props'             : props,
                'key'               : 'divider_line_height',
                'additionalCss'     : additionalCss,
                'selector'          : '%%order_class%%.df-item-wrap .df-post-ele-divider',
                'type'              : 'height',
                'important'         : true
            });
        }

        if ('on' === props.show_author_image) {
            utility.process_range_value({
                'props': props,
                'key': 'author_image_size',
                'default_value': '16px',
                'additionalCss': additionalCss,
                'selector': '%%order_class%%.df-item-wrap .author-image img',
                'type': 'width',
                'important': true
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
            'key': 'author_image_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .author-image',
            'type': 'margin'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'element_before_label_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%%.df-item-wrap .before-text',
            'type': 'margin'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'element_after_label_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%%.df-item-wrap .after-text',
            'type': 'margin'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'icon_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%%.df-item-wrap .df-icon-image, %%order_class%%.df-item-wrap .et-pb-icon',
            'type': 'margin'
        });

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
        // icon font family
        utility.process_icon_font_style({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'overlay_font_icon',
            'selector'          : '%%order_class%% .df-icon-overlay'
        })
        utility.process_icon_font_style({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'font_icon',
            'selector'          : '%%order_class%% .et-pb-icon'
        })

        // acf
        utility.process_range_value({
            'props'             : props,
            'key'               : 'acf_image_width',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%%.df-item-wrap img.df-acf-image',
            'type'              : 'max-width',
            'important'         : true
        });

        return additionalCss;
    }

    render() {
        return false;
    }
}
export default PostListItem;
