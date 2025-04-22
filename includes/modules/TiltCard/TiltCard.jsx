// External Dependencies
import React, { Component } from 'react';
import utility from '../../../scripts/df_scripts/utilities';
// import '../../../assets/scripts/lib/vanilla-tilt.min';
import '../../../public/js/lib/vanilla-tilt.min';
// Internal Dependencies
import './style.css';

class TiltCard extends Component {
    static slug = 'difl_tiltcard';
    _isMounted = false;

    constructor(props) {
        super(props);

        this.wrapper = React.createRef();
        this.get_the_container = this.get_the_container.bind(this);
        this.tilt_effect = this.tilt_effect.bind(this);
        this.container = '';
        this.computed = ['tc_reverse', 'tc_max', 'tc_perspective', 'tc_glare', 'tc_card_scale', 'tc_speed', 'tc_full_page']
    }

    componentDidMount() {
        this._isMounted = true;
        this.get_the_container();
        this.tilt_effect(this.props);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
    componentDidUpdate(prevProps, prevState) {
        const _this = this;
        this.get_the_container();

        for (const index in prevProps) {
            if (prevProps[index] !== _this.props[index]) {
                if (_this.computed.includes(index)) {
                    this.tilt_effect(true, index);
                } else {
                    this.tilt_effect(false, index);
                }
            }
        }
    }

    static css(props) {
        const additionalCss = [];

        // content float
        if (props.tc_content_float === 'on') {
            additionalCss.push([{
                selector: '%%order_class%% > div:first-child, .et-fb-component-settings.et-fb-component-settings--module',
                declaration: `transform: translateZ(${props.tc_translate}) scale(${props.tc_scale});`,
            }]);
            additionalCss.push([{
                selector: '%%order_class%%, %%order_class%%:hover',
                declaration: `overflow: visible;`,
            }]);
        }
        // icon styles
        utility.process_icon_styles({
            'props': props,
            'additionalCss': additionalCss,
            'key': 'image',
            'selector': '%%order_class%% .df_tc_image_container .et-pb-icon',
            'align_container': '%%order_class%% .df_tc_image_container',
            'image_selector': '%%order_class%% .df_tc_image_container img'
        });
        // button styles
        utility.df_process_btn_styles({
            'props': props,
            'additionalCss': additionalCss,
            'key': 'tc_btn',
            'selector': '%%order_class%% .df_tc_button',
            'align_container': '%%order_class%% .df_tc_button_wrapper'
        });
        //button background
        utility.df_process_bg({
            'props': props,
            'additionalCss': additionalCss,
            'key': 'tc_button_background',
            'selector': '%%order_class%% .df_tc_button'
        });
        // wrapper spacing
        utility.process_margin_padding({
            'props': props,
            'key': 'wrapper_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df_tc_container',
            'type': 'margin'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'wrapper_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df_tc_container',
            'type': 'padding'
        });
        // content wrapper spacing
        utility.process_margin_padding({
            'props': props,
            'key': 'content_wrapper_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df_tc_content_container',
            'type': 'margin'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'content_wrapper_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df_tc_content_container',
            'type': 'padding'
        });
        // image wrapper spacing
        utility.process_margin_padding({
            'props': props,
            'key': 'img_wrapper_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df_tc_image_container',
            'type': 'margin'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'img_wrapper_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df_tc_image_container',
            'type': 'padding'
        });
        // button wrapper spacing
        utility.process_margin_padding({
            'props': props,
            'key': 'btn_wrapper_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df_tc_button_wrapper',
            'type': 'margin'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'btn_wrapper_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df_tc_button_wrapper',
            'type': 'padding'
        });
        // icon spacing
        utility.process_margin_padding({
            'props': props,
            'key': 'icon_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .et-pb-icon',
            'type': 'padding'
        });
        // image spacing
        utility.process_margin_padding({
            'props': props,
            'key': 'image_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df_tc_image_container img',
            'type': 'margin'
        });
        // title spacing
        utility.process_margin_padding({
            'props': props,
            'key': 'title_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .title',
            'type': 'margin'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'title_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .title',
            'type': 'padding'
        });
        // content spacing
        utility.process_margin_padding({
            'props': props,
            'key': 'content_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .content',
            'type': 'margin'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'content_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .content',
            'type': 'padding'
        });
        // button spacing
        utility.process_margin_padding({
            'props': props,
            'key': 'button_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df_tc_button',
            'type': 'margin'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'button_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df_tc_button',
            'type': 'padding'
        });

        // icon font family
        utility.process_icon_font_style({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'image_font_icon',
            'selector'          : '%%order_class%% .et-pb-icon'
        })

        return additionalCss;
    }

    get_the_container() {
        if (this._isMounted && this.wrapper.current && this.container === '') {
            this.container = this.wrapper.current.parentNode.parentNode;
        }
    }

    tilt_effect(reset = false, index) {
        const VanillaTilt = window.VanillaTilt;
        const props = this.props;

        // options
        const reverse = props.tc_reverse === 'on' ? true : false;
        const max = props.tc_max ? props.tc_max : 35;
        const perspective = props.tc_perspective ? props.tc_perspective : 1000;
        const glare = props.tc_glare == 'on' ? true : false;
        const scale = props.tc_card_scale ? props.tc_card_scale : 1;
        const speed = props.tc_speed ? props.tc_speed : 300;
        const tc_full_page = props.tc_full_page === 'on' ? true : false;
        const tc_glare_opacity = props.tc_glare_opacity ? props.tc_glare_opacity : 1;


        if (VanillaTilt) {
            var box = this.container;
            var _dataset = box.dataset;
            var tilt_options = {
                reverse: reverse,  // reverse the tilt direction
                max: max,     // max tilt rotation (degrees)
                startX: 0,      // the starting tilt on the X axis, in degrees.
                startY: 0,      // the starting tilt on the Y axis, in degrees.
                perspective: perspective,   // Transform perspective, the lower the more extreme the tilt gets.
                scale: scale,      // 2 = 200%, 1.5 = 150%, etc..
                speed: speed,    // Speed of the enter/exit transition
                transition: true,   // Set a transition on enter/exit.
                axis: null,   // What axis should be disabled. Can be X or Y.
                reset: true,    // If the tilt effect has to be reset on exit.
                easing: "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
                glare: glare,   // it should have a "glare" effect
                "max-glare": tc_glare_opacity,      // the maximum "glare" opacity (1 = 100%, 0.5 = 50%)
                "glare-prerender": false,  // false = VanillaTilt creates the glare elements for you, otherwise
                // you need to add .js-tilt-glare>.js-tilt-glare-inner by yourself
                "mouse-event-element": null,    // css-selector or link to HTML-element what will be listen mouse events
                // you need to add .js-tilt-glare>.js-tilt-glare-inner by yourself
                gyroscope: true,    // Boolean to enable/disable device orientation detection,
                gyroscopeMinAngleX: -45,     // This is the bottom limit of the device angle on X axis, meaning that a device rotated at this angle would tilt the element as if the mouse was on the left border of the element;
                gyroscopeMaxAngleX: 45,      // This is the top limit of the device angle on X axis, meaning that a device rotated at this angle would tilt the element as if the mouse was on the right border of the element;
                gyroscopeMinAngleY: -45,     // This is the bottom limit of the device angle on Y axis, meaning that a device rotated at this angle would tilt the element as if the mouse was on the top border of the element;
                gyroscopeMaxAngleY: 45,      // This is the top limit of the device angle on Y axis, meaning that a device rotated at this angle would tilt the element as if the mouse was on the bottom border of the element;
                "full-page-listening": tc_full_page
            };

            VanillaTilt.init(box, tilt_options);
            if (reset) {
                box.vanillaTilt.destroy();
                VanillaTilt.init(box, tilt_options);
            }
        }
    }

    render_image(props, key) {
        const utils = window.ET_Builder.API.Utils;
        let icon = '';

        if (props[key + '_use_icon'] && props[key + '_use_icon'] === 'on') {
            if (!props[key + '_font_icon'] || props[key + '_font_icon'] === '') {
                icon = '5'
            } else {
                icon = utils.processFontIcon(props[key + '_font_icon'])
            }
        }
        if (props[key + '_use_icon'] === 'on') {
            return (
                <div className="df_tc_image_container">
                    <span className="et-pb-icon">{icon}</span>
                </div>
            )
        } else if (props.dynamic[key + '_image'].hasValue) {
            const ImageObject = utility.df_collect_dynamic_content(key + '_image', this.props);
            return utility.df_render_dynamic_image(ImageObject, function (ImageUrl) {
                return (
                    <div className="df_tc_image_container">
                        <img src={ImageUrl} alt={''} />
                    </div>
                );
            });
        } else { return null }
    }

    render_button(props, key) {

        const button_text = key + '_button_text';
        const button_url = key + '_button_url';

        if (props.dynamic[button_text].hasValue || props.dynamic[button_url].hasValue ) {
            return (
                <div className="df_tc_button_wrapper">
                    <a className="df_tc_button" href={utility._renderDynamicContent( props, button_url ,false)}>{utility._renderDynamicContent( props, button_text)}</a>
                </div>
            )
        } else return '';
        
    }

    render() {
        const props = this.props;

        const title = props.dynamic.title.hasValue ? (
            <h4 className="title">
                {utility._renderDynamicContent(props, 'title')}
            </h4>
        ) : '';
        const content = props.dynamic.content.hasValue ? (
            <div className="content">
                {utility._renderDynamicContent(props, 'content')}
            </div>
        ) : '';
        const content_wrapper = title !== '' || content !== '' ?
            <div className="df_tc_content_container">
                {title} {content}
            </div> : '';

        return (<div className="df_tc_container" ref={this.wrapper}>
                    {this.render_image(props, 'image')}
                    {content_wrapper}
                    {this.render_button(props, 'tc_btn')}
                </div>)
    }
}
export default TiltCard;