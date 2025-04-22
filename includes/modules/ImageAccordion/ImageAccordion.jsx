// External Dependencies
import React, { Component } from 'react';
import _ from 'lodash';
import utility from '../../../scripts/df_scripts/utilities';
import $ from 'jquery';
// Internal Dependencies
import './style.css';

class ImageAccordion extends Component {
    static slug = 'difl_imageaccordion';
    _isMounted = false;
    // At first call constructor methode
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            props: this.props,
            active_address: '',
        }
        this.wrapper = React.createRef();
        this.item_content = React.createRef();
    }
    //call exactly after render methode(At render methode call all child lifecycle method) call only one time
    componentDidMount() {
        this._isMounted = true;
        if (this.state.loading === true) {
            this.setState({ loading: false })
        }
    }
    // Call only when component delete
    componentWillUnmount() {
        this._isMounted = false;
    }
    //call exact after every render methode(At render methode call all child lifecycle method) call.
    componentDidUpdate(prevProps, prevState) {
        const _this = this;
        var active_address = '';
        this.module_init();
        if (_this.item_content) {
            $('.difl_imageaccordionitem').on('click', function (e) {
                active_address = e.currentTarget.dataset.address;
                $('.difl_imageaccordionitem').removeClass('df_ia_active');
                if (_this.item_content.current.querySelector(`[data-address="${active_address}"]`)) {
                    _this.item_content.current.querySelector(`[data-address="${active_address}"]`).classList.add('df_ia_active');
                }

            })

        }

    }

    module_init() {
        if (this.state.loading === true) {
            this.setState({ loading: false })
            return;
        }

        const _this = this;
        const props = this.props;
        const unique_module_name = this.getUniqueClass(props.moduleInfo.type);
        const active_item = props.active_on_first_time === 'on' ? props.active_item_order_number : '';
        const active_item_phone = props.active_on_first_time === 'on' ? props.active_item_order_number_phone : '';
        const active_item_tablet = props.active_on_first_time === 'on' ? props.active_item_order_number_tablet : '';
        const active_item_order_number_last_edited = props.active_item_order_number_last_edited?props.active_item_order_number_last_edited:"off|desktop";

        const responsiveMode = active_item_order_number_last_edited.split('|')[0]

        let view_mode = window.ET_Builder.API.State.View_Mode.current;
        if ('' !== active_item) {
            let active_item_order = ''
            if ("on" === responsiveMode) {
                if (view_mode === "phone") {
                    if (typeof active_item_phone !== "undefined") {
                        active_item_order = ':eq(' + (active_item_phone - 1) + ')';
                    } else if (typeof active_item_tablet !== "undefined") {
                        active_item_order = ':eq(' + (active_item_tablet - 1) + ')';
                    } else if (typeof active_item !== "undefined") {
                        active_item_order = ':eq(' + (active_item - 1) + ')';
                    } else {
                        active_item_order = ':eq(0)';
                    }
                } else if (view_mode === "tablet") {
                    if (typeof active_item_tablet !== "undefined") {
                        active_item_order = ':eq(' + (active_item_tablet - 1) + ')';
                    } else if (typeof active_item !== "undefined") {
                        active_item_order = ':eq(' + (active_item - 1) + ')';

                    } else {
                        active_item_order = ':eq(0)';
                    }
                } else {
                    if (typeof active_item !== "undefined") {
                        active_item_order = ':eq(' + (active_item - 1) + ')';
                    } else {
                        active_item_order = ':eq(0)';
                    }
                }
            } else {
                active_item_order = ':eq(' + (active_item - 1) + ')';
            }
            const active_item_selector = '.' + unique_module_name + ' .difl_imageaccordionitem' + active_item_order;
            $('.' + unique_module_name + ' .difl_imageaccordionitem').removeClass('df_ia_active');
            $(active_item_selector).addClass("df_ia_active");

        } else {
            return;
        }
    }


    static css(props) {
        const additionalCss = [];

        if ('on' === props.vertical_at_mobile && 'horizontal' === props.accordion_type) {
            additionalCss.push([{
                selector: '%%order_class%% .item-wrapper.vertical_at_mobile',
                declaration: `flex-direction: column;`,
                'device': 'phone'
            }]);
        }

        additionalCss.push([{
            selector: '%%order_class%% .difl_imageaccordionitem.df_ia_active .content',
            declaration: `opacity: 1;
                visibility: visible;
                transform: scale(1);
                transform-origin: 100% 50%;`,
        }]);

        additionalCss.push([{
            selector: '%%order_class%% .item-wrapper',
            declaration: `display: flex;`,
        }]);

        utility.process_range_value({
            'props': props,
            'key': 'accordion_container_height',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .item-wrapper',
            'type': 'height',
            'default_value': '450px',
            'important': true
        });

        if (props.event_type == 'hover') {
            additionalCss.push([{
                selector: '%%order_class%% .difl_imageaccordionitem:hover',
                declaration: `flex: 10`
            }]);

        }

        // overlay 
        utility.df_process_bg({
            'props': props,
            'additionalCss': additionalCss,
            'key': 'ia_overlay_background',
            'selector': '%%order_class%% .difl_imageaccordionitem:before'
        });
        // overlay 
        utility.df_process_bg({
            'props': props,
            'additionalCss': additionalCss,
            'key': 'ia_active_overlay_background',
            'selector': '%%order_class%% .difl_imageaccordionitem.df_ia_active:before'
        });
        // button
        //content Alignment 
        utility.df_process_string_attr({
            'props': props,
            'key': 'content_alignment',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .content',
            'type': 'text-align',
            'default_value': 'center'
        });
        //content background
        utility.df_process_bg({
            'props': props,
            'additionalCss': additionalCss,
            'key': 'ia_content_background',
            'selector': '%%order_class%% .content'
        });

        utility.df_process_btn_styles({
            'props': props,
            'additionalCss': additionalCss,
            'key': 'ia_btn',
            'selector': '%%order_class%% .df_ia_button',
            'align_container': '%%order_class%% .df_ia_button_wrapper'
        });

        // Icon Design
        utility.df_process_bg({
            'props': props,
            'additionalCss': additionalCss,
            'key': 'icon_background',
            'selector': '%%order_class%% .df-image-accordion-icon'
        });
        
        utility.process_range_value({
            'props': props,
            'key': 'icon_size',
            'default':'50px',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .et-pb-icon.df-image-accordion-icon',
            'type': 'font-size'
        });

        utility.process_color({
            'props': props,
            'key': 'icon_color',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .et-pb-icon.df-image-accordion-icon',
            'type': 'color'
        })

            // Spacing
        utility.process_margin_padding({
            'props': props,
            'key': 'icon_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-image-accordion-icon',
            'type': 'margin'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'icon_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-image-accordion-icon',
            'type': 'padding'
        });  
        
        utility.process_range_value({
            'props'             : props,
            'key'               : 'image_as_icon_width',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% img.df-image-accordion-icon',
            'type'              : 'width',
            'default_value'     : '50px',
            'important'         : false
        });
        //button background
        utility.df_process_bg({
            'props': props,
            'additionalCss': additionalCss,
            'key': 'ia_btn_background',
            'selector': '%%order_class%% .df_ia_button'
        });

        // item spacing
        utility.process_margin_padding({
            'props': props,
            'key': 'item_spacing',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .difl_imageaccordionitem',
            'type': 'margin',
            'important': true
        });

        utility.process_margin_padding({
            'props': props,
            'key': 'item_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .difl_imageaccordionitem',
            'type': 'padding',
            'important': true
        });

        utility.process_margin_padding({
            'props': props,
            'key': 'first_item_spacing',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .difl_imageaccordionitem:first-child',
            'type': 'margin',
            'important': true
        });

        utility.process_margin_padding({
            'props': props,
            'key': 'last_item_spacing',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .difl_imageaccordionitem:last-child',
            'type': 'margin',
            'important': true
        });

        // content spacing
        utility.process_margin_padding({
            'props': props,
            'key': 'title_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df_ia_title',
            'type': 'margin'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'sub_title_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df_ia_sub_title',
            'type': 'margin',
            'important': false
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'description_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df_ia_description',
            'type': 'margin',
            'important': false
        });
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
            'selector': '%%order_class%% .df_ia_button_wrapper',
            'type': 'margin'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'button_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df_ia_button',
            'type': 'padding'
        });


        if (props.vertical_align) {
            additionalCss.push([{
                selector: '%%order_class%% .overlay_wrapper',
                declaration: `justify-content: ${props.vertical_align};`,
            }]);
        }

        return additionalCss;
    }
    getUniqueClass(slug) {
        const selector = '.' + slug + '[data-address="' + this.props.moduleInfo.address + '"]';
        const classesList = document.querySelector(selector).classList;
        var unique_module_name = ''
        for (var i = 0; i < classesList.length; i++) {
            var matches = /^difl_imageaccordion\_(.+)/.exec(classesList[i]);

            if (matches != null) {
                unique_module_name = matches[0];
            }
        }
        return unique_module_name;
    }

    contentOutput(props) {
        return props.content.length !== 0 ? props.content : '';
    }

    // Always render methode call on change any state
    render() {
        const props = this.props;
        const animation_data = {
            'content_animation': props.content_animation
        };

        let _class = '';
        if (props.accordion_type) {
            _class += ' ' + props.accordion_type;
        }
        if (props.vertical_at_mobile === 'on') {
            _class += ' vertical_at_mobile';
        }
        if (props.event_type) {
            _class += ' ' + props.event_type;
        }
        return (<div className={"df_ia_container"} data-animation={JSON.stringify(animation_data)} ref={this.wrapper}>
            {this.state.loading === false ?
                <React.Fragment>
                    <div className="df_ia_inner_wrapper">
                        <div className="item-container">
                            <div className={"item-wrapper" + _class} data-address="" ref={this.item_content}>
                                {this.contentOutput(props)}
                            </div>
                        </div>
                    </div>
                </React.Fragment> : <React.Fragment>Loading</React.Fragment>}
        </div>)
    }
}
export default ImageAccordion;