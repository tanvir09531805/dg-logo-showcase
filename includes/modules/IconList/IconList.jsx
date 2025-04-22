// External Dependencies
import React, {Component} from 'react';

// Internal Dependencies
import "./style.css";
import utility from '../../../scripts/df_scripts/utilities';

class IconList extends Component {
    static slug = 'difl_iconlist'
    static order_class = '%%order_class%%.difl_iconlist'
    static tooltip_class = ".tippy-box[data-theme~='difl_icon_item_tooltip']";

    static css(props) {
        const additionalCss = [];
        let $default_alignment_selector = `${this.order_class} .difl_iconlistitem`;

        if (props['list_view_type'] === 'inline') {
            // List item per column with default, responsive
            this.df_iconlist_set_dynamic_grid_columns({
                'props': props,
                'key': 'list_item_per_column',
                'additionalCss': additionalCss,
                'selector': `${this.order_class} ul.difl_iconlist_container`
            });

            // List item vertical alignment with default, responsive
            utility.df_process_string_attr({
                'props': props,
                'key': 'list_item_vertical_alignment',
                'additionalCss': additionalCss,
                'selector': $default_alignment_selector,
                'type': 'align-items'
            });
        }

        if (props['list_item_equal_width'] === 'on') {
            $default_alignment_selector = `${this.order_class} .difl_iconlistitem .et_pb_module_inner, ${this.order_class} .difl_iconlistitem>div:first-child`;
            additionalCss.push([{
                'selector': `${$default_alignment_selector}, ${this.order_class} .item-elements`,
                'declaration': 'width:100%;',
            }]);
        }


        // list item horizontal alignment
        if (props['list_item_equal_width'] !== 'on' && ['list', 'inline'].includes(props['list_view_type'])) {
            utility.df_process_string_attr({
                'props': props,
                'key': 'list_item_horizontal_alignment',
                'additionalCss': additionalCss,
                'selector': $default_alignment_selector,
                'type': 'justify-content',
            });
        }
        if (props['list_item_equal_width'] === 'on' && props['list_view_type'] === 'list') {
            utility.df_process_string_attr({
                'props': props,
                'key': 'list_item_horizontal_alignment_after',
                'additionalCss': additionalCss,
                'selector': $default_alignment_selector,
                'type': 'justify-content',
            });
        }

        // List item gap with default, responsive
        utility.process_range_value({
            'props': props,
            'key': 'list_item_gap',
            'additionalCss': additionalCss,
            'selector': `${this.order_class} ul.difl_iconlist_container`,
            'type': 'gap',
        });

        // list item text alignment
        utility.df_process_string_attr({
            'props': props,
            'key': 'list_item_text_orientation',
            'additionalCss': additionalCss,
            'selector': `${this.order_class} .difl_iconlistitem *`,
            'type': 'text-align',
            'default_value': 'left'
        });

        // Icon wrapper background with default, responsive
        if (!!props['list_item_icon_bg_color']) {
            utility.process_color({
                'props': props,
                'key': 'list_item_icon_bg_color',
                'additionalCss': additionalCss,
                'selector': `${this.order_class} .item-elements .icon-element`,
                'type': 'background-color',
            })
        }

        // Icon item title background with default, responsive
        utility.df_process_bg({
            'props': props,
            'key': 'list_item_title_background',
            'additionalCss': additionalCss,
            'selector': `${this.order_class} .item-elements .difl_icon_item_header`
        });

        // Icon item content background with default, responsive
        utility.df_process_bg({
            'props': props,
            'key': 'list_item_content_background',
            'additionalCss': additionalCss,
            'selector': `${this.order_class} .item-elements .difl_icon_item_body`
        });

        // Icon item wrapper background with default, responsive
        utility.df_process_bg({
            'props': props,
            'key': 'list_item_wrapper_background',
            'additionalCss': additionalCss,
            'selector': `${this.order_class} .item-elements`
        });

        // Set margin and padding feature for icon item
        utility.process_margin_padding({
            'props': props,
            'key': 'list_item_icon_margin',
            'additionalCss': additionalCss,
            'selector': `${this.order_class} .item-elements .icon-element`,
            'type': 'margin'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'list_item_icon_padding',
            'additionalCss': additionalCss,
            'selector': `${this.order_class} .item-elements .icon-element`,
            'type': 'padding'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'list_item_icon_wrapper_margin',
            'additionalCss': additionalCss,
            'selector': `${this.order_class} .item-elements .difl_icon_item_icon_wrapper`,
            'type': 'margin'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'list_item_icon_wrapper_padding',
            'additionalCss': additionalCss,
            'selector': `${this.order_class} .item-elements .difl_icon_item_icon_wrapper`,
            'type': 'padding'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'list_item_title_padding',
            'additionalCss': additionalCss,
            'selector': `${this.order_class} .item-elements .difl_icon_item_header`,
            'type': 'padding'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'list_item_title_margin',
            'additionalCss': additionalCss,
            'selector': `${this.order_class} .item-elements .difl_icon_item_header`,
            'type': 'margin'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'list_item_content_padding',
            'additionalCss': additionalCss,
            'selector': `${this.order_class} .item-elements .difl_icon_item_body`,
            'type': 'padding'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'list_item_content_margin',
            'additionalCss': additionalCss,
            'selector': `${this.order_class} .item-elements .difl_icon_item_body`,
            'type': 'margin'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'list_item_wrapper_padding',
            'additionalCss': additionalCss,
            'selector': `${this.order_class} .item-elements`,
            'type': 'padding'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'list_item_wrapper_margin',
            'additionalCss': additionalCss,
            'selector': `${this.order_class} .item-elements`,
            'type': 'margin'
        });

        // process icon filter effect
        utility.df_iconlist_process_child_filter({
            'props': props,
            'additionalCss': additionalCss,
            'selector': `${this.order_class} .item-elements .icon-element`,
        });

        // list icon color with default, responsive
        utility.process_color({
            'props': props,
            'key': 'list_item_icon_color',
            'additionalCss': additionalCss,
            'selector': `${this.order_class} .item-elements .difl_icon_item_icon_wrapper .et-pb-icon`,
            'type': 'color',
        })

        // list icon size with default, responsive
        utility.process_range_value({
            'props': props,
            'key': 'list_item_icon_size',
            'additionalCss': additionalCss,
            'selector': `${this.order_class} .item-elements .difl_icon_item_icon_wrapper .et-pb-icon`,
            'type': 'font-size',
        });

        // Icon image width with default, hover and responsive
        utility.process_range_value({
            'props': props,
            'key': 'list_item_image_width',
            'additionalCss': additionalCss,
            'selector': `${this.order_class} .item-elements .difl_icon_item_icon_wrapper img`,
            'type': 'width',
        });

        // Icon image height with default, hover and responsive
        utility.process_range_value({
            'props': props,
            'key': 'list_item_image_height',
            'additionalCss': additionalCss,
            'selector': `${this.order_class} .item-elements .difl_icon_item_icon_wrapper img`,
            'type': 'height',
        });

        // gap between icon and text with default, hover and responsive
        utility.process_range_value({
            'props': props,
            'key': 'list_item_icon_text_gap',
            'additionalCss': additionalCss,
            'selector': `${this.order_class} .item-elements .difl_icon_item_container`,
            'type': 'gap',
        });

        // Icon lottie path color with default, hover and responsive
        if (!!props['list_item_icon_lottie_background_color']){
            utility.process_color({
                'props': props,
                'key': 'list_item_icon_lottie_color',
                'additionalCss': additionalCss,
                'selector': `${this.order_class} .item-elements .difl_icon_item_icon_wrapper .difl_lottie_player svg path`,
                'type': 'fill',
                'important': false
            });
        }

        if (!!props['list_item_icon_lottie_background_color']){
            utility.process_color({
                'props': props,
                'key': 'list_item_icon_lottie_background_color',
                'additionalCss': additionalCss,
                'selector': `${this.order_class} .item-elements .difl_icon_item_icon_wrapper .difl_lottie_player`,
                'type': 'background-color',
                'important': false
            });
        }
        if (!!props['list_item_icon_lottie_width']){
            utility.process_range_value({
                'props': props,
                'key': 'list_item_icon_lottie_width',
                'additionalCss': additionalCss,
                'selector': `${this.order_class} .item-elements .difl_icon_item_icon_wrapper .difl_lottie_player`,
                'type': 'width',
            });
        }
        if (!!props['list_item_icon_lottie_height']){
            utility.process_range_value({
                'props': props,
                'key': 'list_item_icon_lottie_height',
                'additionalCss': additionalCss,
                'selector': `${this.order_class} .item-elements .difl_icon_item_icon_wrapper .difl_lottie_player`,
                'type': 'width',
            });
        }

        // Icon placement with default, responsive, hover
        utility.df_process_string_attr({
            'props': props,
            'key': 'list_item_icon_placement',
            'additionalCss': additionalCss,
            'selector': `${this.order_class} .item-elements .difl_icon_item_container`,
            'type': 'flex-direction',
            'default_value': 'row'
        });

        // Icon alignment with default, responsive, hover
        utility.df_process_string_attr({
            'props': props,
            'key': 'list_item_icon_alignment',
            'additionalCss': additionalCss,
            'selector': `${this.order_class} .item-elements .difl_icon_item_icon_wrapper`,
            'type': 'text-align',
            'default_value': 'left'
        });

        if (props['list_item_icon_placement'] !== 'column' && props['list_item_icon_vertical_placement'] !== '') {
            additionalCss.push([{
                'selector': `${this.order_class} .item-elements .difl_icon_item_icon_wrapper`,
                'declaration': `display:flex;`,
            }]);

            // Icon placement with default, responsive
            utility.df_process_string_attr({
                'props': props,
                'key': 'list_item_icon_vertical_placement',
                'additionalCss': additionalCss,
                'selector': `${this.order_class} .item-elements .difl_icon_item_icon_wrapper`,
                'type': 'align-items',
                'default_value': 'flex-start'
            });
        }
        utility.process_range_value({
            'props': props,
            'key': 'list_item_content_max_width',
            'additionalCss': additionalCss,
            'selector': `${this.order_class} .item-elements`,
            'type': 'max-width',
            'default_value': '550',
        });

        // show icon on hover only
        // icon margin for show on hover effect with default, responsive, hover
        utility.df_iconlist_show_icon_on_hover_styles({
            'props': props,
            'field': 'list_item_icon_placement',
            'trigger': 'list_item_icon_type',
            'dependsOn': {
                'icon': 'list_item_icon_size',
                'image': 'list_item_image_width'
            },
            'additionalCSS': additionalCss,
            'selector': `${this.order_class} .item-elements .difl_icon_item_icon_wrapper.show_on_hover`,
            'hover': `${this.order_class} .item-elements:hover .difl_icon_item_icon_wrapper.show_on_hover`,
            'type': 'margin',
            'mappingValues': {
                'row': '0 #px 0 -#px',
                'row-reverse': '0 -#px 0 #px',
                'column': '-#px 0 #px 0',
                'column-reverse': '#px 0 -#px 0',
            },
            'defaults': {
                'icon': '40px',
                'image': '40px',
                'field': 'row'
            }
        });

        // Tooltip
        utility.df_process_bg({
            'props': props,
            'key': 'list_item_tooltip_background',
            'additionalCss': additionalCss,
            'selector': this.tooltip_class
        });

        utility.process_margin_padding({
            'props': props,
            'key': 'list_item_tooltip_padding',
            'additionalCss': additionalCss,
            'selector': this.tooltip_class,
            'type': 'padding'
        });

        utility.process_color({
            'props': props,
            'key': 'tooltip_arrow_color',
            'additionalCss': additionalCss,
            'selector': `${this.tooltip_class}[data-placement^='top'] > .tippy-arrow::before`,
            'type': 'border-top-color'
        });
        utility.process_color({
            'props': props,
            'key': 'tooltip_arrow_color',
            'additionalCss': additionalCss,
            'selector': `${this.tooltip_class}[data-placement^='bottom'] > .tippy-arrow::before`,
            'type': 'border-bottom-color'
        });
        utility.process_color({
            'props': props,
            'key': 'tooltip_arrow_color',
            'additionalCss': additionalCss,
            'selector': `${this.tooltip_class}[data-placement^='left'] > .tippy-arrow::before`,
            'type': 'border-left-color'
        });
        utility.process_color({
            'props': props,
            'key': 'tooltip_arrow_color',
            'additionalCss': additionalCss,
            'selector': `${this.tooltip_class}[data-placement^='right'] > .tippy-arrow::before`,
            'type': 'border-right-color'
        });

        return additionalCss;
    }

    /* Custom functions for icon list module */
    static df_iconlist_set_dynamic_grid_columns(options = {}) {
        const defaults = {
            'props': {},
            'key': '',
            'additionalCss': '',
            'selector': '',
        };
        const settings = utility.extend(defaults, options);
        const {props, key, additionalCss, selector} = settings;

        const desktop_column = props[key];
        const tablet = utility.df_check_values(desktop_column, props[key + '_tablet']);
        const phone = utility.df_check_values(desktop_column, props[key + '_phone']);

        additionalCss.push([{
            'selector': selector,
            'declaration': `grid-template-columns:repeat(${desktop_column}, 1fr);`,
        }]);
        additionalCss.push([{
            'selector': selector,
            'declaration': `grid-template-columns:repeat(${tablet}, 1fr);`,
            'device': 'tablet',
        }]);
        additionalCss.push([{
            'selector': selector,
            'declaration': `grid-template-columns:repeat(${phone}, 1fr);`,
            'device': 'phone'
        }]);
    }

    render() {
        const props = this.props;
        // Show a notice message in Visual Builder if the list item is empty.
        if (props['content'] === '' || props['content'].length === 0) {
            return <div className='difl_iconlist_notice'>Add one or more list items.</div>;
        }

        return <ul className={"difl_iconlist_container"}>{props['content']}</ul>;
    }
}

export default IconList;
