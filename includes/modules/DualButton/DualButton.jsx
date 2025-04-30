// External Dependencies
import React, { Component } from 'react';
import utility from '../../../scripts/df_scripts/utilities';
// Internal Dependencies
import './style.css';


class DualButton extends Component {
    static slug = 'difl_dual_button';

    static css (props) {
        const additionalCss = [];
        const alignment = {
            left: 'flex-start',
            center: 'center',
            right: 'flex-end',
            justified: 'space-between'
        }
        // Flex Director for responsiveness
        utility.df_process_string_attr({
            props: props,
            key: "button_style",
            additionalCss: additionalCss,
            selector: "%%order_class%% .df_button_container",
            type: "flex-direction",
            default_value: 'row'
        });

        if ( props.alignment ) {
            const css_property = props['button_style'] && props['button_style'] === 'column' ? 'align-items' : 'justify-content';
            const css_property_tablet = props['button_style_tablet'] && props['button_style_tablet'] === 'column' ? 'align-items' : css_property;
            const css_property_phone = props['button_style_phone'] && props['button_style_phone'] === 'column' ? 'align-items' : css_property_tablet;
            additionalCss.push([{
                selector:    `%%order_class%% .df_button_container`,
                declaration: `${css_property}: ${alignment[props.alignment]};`,
            }]);
            if (props.alignment_tablet) {
                additionalCss.push([{
                    selector:    `%%order_class%% .df_button_container`,
                    declaration: `${css_property_tablet}: ${alignment[props.alignment_tablet]};`,
                    'device':'tablet'
                }]);
            }
            if (props.alignment_phone) {
                additionalCss.push([{
                    selector:    `%%order_class%% .df_button_container`,
                    declaration: `${css_property_phone}: ${alignment[props.alignment_phone]};`,
                    'device':'phone'
                }]);
            } 
        }
        // custom background
        utility.df_process_bg({
            'props'         : props,
            'additionalCss' : additionalCss,
            'key'           : 'btn_left_background',
            'selector'      : `%%order_class%% .df_button_left`,
            'important'     : true
        });
        utility.df_process_bg({
            'props'         : props,
            'additionalCss' : additionalCss,
            'key'           : 'btn_right_background',
            'selector'      : `%%order_class%% .df_button_right`,
            'important'     : true
        });
        utility.df_process_bg({
            'props'         : props,
            'additionalCss' : additionalCss,
            'key'           : 'separator_background',
            'selector'      : `%%order_class%% .button-separator`,
            'important'     : true
        });

        // left button wrapper spacing
        utility.process_margin_padding({
            'props' : props,
            'key':'left_button_wrapper_margin',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_button_left_wrapper',
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'left_button_wrapper_padding',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_button_left_wrapper',
            'type'  : 'padding'
        });
        // right button wrapper spacing
        utility.process_margin_padding({
            'props' : props,
            'key':'right_button_wrapper_margin',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_button_right_wrapper',
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'right_button_wrapper_padding',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_button_right_wrapper',
            'type'  : 'padding'
        });
        // left button spacing
        utility.process_margin_padding({
            'props' : props,
            'key':'left_button_margin',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_button_left',
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'left_button_padding',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_button_left',
            'type'  : 'padding'
        });
        // right button spacing
        utility.process_margin_padding({
            'props' : props,
            'key':'right_button_margin',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_button_right',
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'right_button_padding',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_button_right',
            'type'  : 'padding'
        });
        // button separator spacing
        utility.process_margin_padding({
            'props' : props,
            'key':'button_separator_margin',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .button-separator',
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'button_separator_padding',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .button-separator',
            'type'  : 'padding'
        });
        if ( props.use_icon === 'on' && props.use_icon_font_size === 'on') {
            utility.apply_single_value({
                'props': props,
                'key': 'icon_font_size',
                'additionalCss': additionalCss,
                'selector': '%%order_class%% .button-separator .et-pb-icon',
                'type': 'font-size',
                'unit': 'px'
            });
        }

        if ( props.use_left_button_icon === 'on') {
            utility.apply_single_value({
                'props': props,
                'key': 'btn_left_icon_font_size',
                'additionalCss': additionalCss,
                'selector': '%%order_class%% .df_button_left .et-pb-icon',
                'type': 'font-size',
                'unit': 'px'
            });
            utility.apply_single_value({
                'props': props,
                'key': 'btn_left_icon_gap',
                'additionalCss': additionalCss,
                'selector': '%%order_class%% .df_button_left .et-pb-icon',
                'type':  props.btn_left_icon_placement === 'right' ? 'margin-left' : 'margin-right',
                'unit': 'px'
            });

        }

        if ( props.use_right_button_icon === 'on') {
            utility.apply_single_value({
                'props': props,
                'key': 'btn_right_icon_font_size',
                'additionalCss': additionalCss,
                'selector': '%%order_class%% .df_button_right .et-pb-icon',
                'type': 'font-size',
                'unit': 'px'
            });

            utility.apply_single_value({
                'props': props,
                'key': 'btn_right_icon_gap',
                'additionalCss': additionalCss,
                'selector': '%%order_class%% .df_button_right .et-pb-icon',
                'type':  props.btn_left_icon_placement === 'right' ? 'margin-left' : 'margin-right',
                'unit': 'px'
            });
        }

        // left button icon styles
        utility.process_color({
            'props': props,
            'key': 'btn_left_icon_color',
            'additionalCss': additionalCss,
            'type': 'color',
            'selector': '%%order_class%% .df_button_left .et-pb-icon'
        });
        // right button icon styles
        utility.process_color({
            'props': props,
            'key': 'btn_right_icon_color',
            'additionalCss': additionalCss,
            'type': 'color',
            'selector': '%%order_class%% .df_button_right .et-pb-icon'
        });

        // icon font family
        utility.process_icon_font_style({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'btn_left_font_icon',
            'selector'          : '%%order_class%% .et-pb-icon.df-left-btn-icon'
        })
        utility.process_icon_font_style({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'btn_right_font_icon',
            'selector'          : '%%order_class%% .et-pb-icon.df-right-btn-icon'
        })

        return additionalCss;
    }
    render_saparator_icon(props){
        const utils = window.ET_Builder.API.Utils;
        if(!props.font_icon) return;

        const fontData = utils.processIconFontData(props.font_icon);
        const icon = <span className={'et-pb-icon df-btn-saparator-icon'} 
                    style={{color:props.icon_color, fontFamily: fontData.iconFontFamily, fontWeight:fontData.iconFontWeight}}>
                    {utils.processFontIcon(props.font_icon)}</span>;
        return icon;
    }
    render() {
        const props = this.props;
        const utils = window.ET_Builder.API.Utils;
        let button_separator_content = '';
        if ('on' === props.button_separator && 'on' === props.use_icon) {
            button_separator_content = this.render_saparator_icon(props);
        } else {
            button_separator_content = props.dynamic.separator_text.hasValue ? utility._renderDynamicContent(props , 'separator_text') : '';
        }
        // left button icon
        const left_icon_pos_class = props.btn_left_icon_placement === 'left' ? ' icon-left' : '';
        const left_icon = props.btn_left_font_icon ? utils.processFontIcon(props.btn_left_font_icon) : '5';
        const left_button_icon = props.use_left_button_icon !== 'off' ? 
            <span className="et-pb-icon df-left-btn-icon">{left_icon}</span> : '';

        const rendered_left_button_url = props.dynamic.left_button_url.hasValue ? utility._renderDynamicContent(props , 'left_button_url', false) : '';
        const left_button_content = props.dynamic.left_button.hasValue ? (
            <div className="df_button_left_wrapper">
                <a href={rendered_left_button_url} className={"df_button_left" + left_icon_pos_class}>
                    {props.btn_left_icon_placement === 'left' ? left_button_icon : ''}
                    {utility._renderDynamicContent(props , 'left_button')}
                    {props.btn_left_icon_placement !== 'left' ? left_button_icon : ''}
                </a>
            </div>
        ) : '';

        // right button icon
        const right_icon_pos_class = props.btn_right_icon_placement === 'left' ? ' icon-left' : '';
        const right_icon = props.btn_right_font_icon ? utils.processFontIcon(props.btn_right_font_icon) : '5';
        const right_button_icon = props.use_right_button_icon !== 'off' ? 
            <span className="et-pb-icon df-right-btn-icon">{right_icon}</span> : '';

        // collect rendered data
        const rendered_right_button_url = props.dynamic.right_button_url.hasValue ? utility._renderDynamicContent(props , 'right_button_url', false) : '';
        const right_button_content = props.dynamic.right_button.hasValue ? (
            <div className="df_button_right_wrapper">
                <a href={rendered_right_button_url} className={"df_button_right" + right_icon_pos_class}>
                    {props.btn_right_icon_placement === 'left' ? right_button_icon : ''}
                    {utility._renderDynamicContent(props , 'right_button')}
                    {props.btn_right_icon_placement !== 'left' ? right_button_icon : ''}
                </a>
            </div>
        ) : '';

        return (
            <div className="df_button_container">
                {left_button_content}
                {(props.button_separator === 'on') ?
                    <div className="button-separator">
                        {button_separator_content}
                    </div> : null
                }
                {right_button_content}
            </div>
        );
    }
}

export default DualButton;