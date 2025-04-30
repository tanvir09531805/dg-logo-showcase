// External Dependencies
import React from 'react';

// Internal dependencies
import "./style.css";
import '../../../public/js/lib/popper.min.js';
import tippy from '../../../public/js/lib/tippy-bundle.min.js';
import lottie from "../../../public/js/lib/lottie";
import utility from '../../../scripts/df_scripts/utilities';

class IconListItem extends React.Component {
    static slug = 'difl_iconlistitem'
    static order_class = '%%order_class%%.difl_iconlistitem'
    static tooltip_class = ".tippy-box[data-theme~='%%order_class%%']";

    constructor(props) {
        super(props);

        this.state = {
            lottie: null
        }

        this.wrapperRef = React.createRef();
        this.containerRef = React.createRef();

        this.computed = [
            'tooltip_arrow', 'tooltip_placement', 'tooltip_animation', 'tooltip_trigger', 'tooltip_custom_maxwidth',
            'tooltip_follow_cursor', 'tooltip_interactive', 'tooltip_offset_enable'
        ];

        this.computedLottieOptions = [
            'list_item_icon_lottie_trigger_method',
            'list_item_icon_lottie_loop',
            'list_item_icon_lottie_speed',
            'list_item_icon_lottie_direction',
            'list_item_icon_lottie_renderer'
        ];

        this.play_tooltip_feature = this.play_tooltip_feature.bind(this);
    }

    static css(props) {
        // const Utils = window.ET_Builder.API.Utils;
        const additionalCss = [];

        // list item text alignment
        utility.df_process_string_attr({
            'props': props,
            'key': 'list_item_text_orientation',
            'additionalCss': additionalCss,
            'selector': `${this.order_class} .item-elements .item-elements-group *:not(.difl_icon_item_icon_wrapper)`,
            'type': 'text-align',
            'important': true
        });

        // Icon wrapper background with default, responsive
        if (!!props['list_item_icon_bg_color']) {
            utility.process_color({
                'props': props,
                'key': 'list_item_icon_bg_color',
                'additionalCss': additionalCss,
                'selector': `${this.order_class} .item-elements .difl_icon_item_icon_wrapper .icon-element`,
                'type': 'background-color',
                'important': true
            })
        }

        if (!!props['list_item_icon_text_gap']) {
            utility.process_range_value({
                'props': props,
                'key': 'list_item_icon_text_gap',
                'additionalCss': additionalCss,
                'selector': `${this.order_class} .item-elements span.difl_icon_item_container`,
                'type': 'gap',
                'important': true
            })
        }

        // Icon title background with default, responsive
        utility.df_process_bg({
            'props': props,
            'key': 'list_item_title_background',
            'additionalCss': additionalCss,
            'selector': `${this.order_class} span.difl_icon_item_container .difl_icon_item_header`,
            'important': true
        });

        // Icon content background with default, responsive
        utility.df_process_bg({
            'props': props,
            'key': 'list_item_content_background',
            'additionalCss': additionalCss,
            'selector': `${this.order_class} div .item-elements .difl_icon_item_body`,
            'important': true
        });

        // Icon item wrapper background with default, responsive
        utility.df_process_bg({
            'props': props,
            'key': 'list_item_wrapper_background',
            'additionalCss': additionalCss,
            'selector': `${this.order_class} .item-elements`,
            'important': true
        });

        // process icon filter effect
        utility.df_iconlist_process_child_filter({
            'props': props,
            'additionalCss': additionalCss,
            'selector': `${this.order_class} .item-elements .difl_icon_item_icon_wrapper .icon-element`,
        });

        // Set margin and padding feature for icon item
        utility.process_margin_padding({
            'props': props,
            'key': 'list_item_icon_margin',
            'additionalCss': additionalCss,
            'selector': `${this.order_class} .item-elements .difl_icon_item_icon_wrapper .icon-element`,
            'type': 'margin',
            'important': true
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'list_item_icon_padding',
            'additionalCss': additionalCss,
            'selector': `${this.order_class} .item-elements .difl_icon_item_icon_wrapper .icon-element`,
            'type': 'padding',
            'important': true
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'list_item_title_icon_margin',
            'additionalCss': additionalCss,
            'selector': `${this.order_class} .item-elements span.difl_icon_item_container .difl_icon_item_header span.et-pb-icon`,
            'type': 'margin',
            'important': true
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'list_item_title_icon_padding',
            'additionalCss': additionalCss,
            'selector': `${this.order_class} .item-elements span.difl_icon_item_container .difl_icon_item_header span.et-pb-icon`,
            'type': 'padding',
            'important': true
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'list_item_icon_wrapper_padding',
            'additionalCss': additionalCss,
            'selector': `${this.order_class} .item-elements span.difl_icon_item_icon_wrapper`,
            'type': 'padding',
            'important': true
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'list_item_icon_wrapper_margin',
            'additionalCss': additionalCss,
            'selector': `${this.order_class} .item-elements span.difl_icon_item_icon_wrapper`,
            'type': 'margin',
            'important': true
        });

        utility.process_margin_padding({
            'props': props,
            'key': 'list_item_title_padding',
            'additionalCss': additionalCss,
            'selector': `${this.order_class} .item-elements span.difl_icon_item_container .difl_icon_item_header`,
            'type': 'padding',
            'important': true
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'list_item_title_margin',
            'additionalCss': additionalCss,
            'selector': `${this.order_class} .item-elements span.difl_icon_item_container .difl_icon_item_header`,
            'type': 'margin',
            'important': true
        });

        utility.process_margin_padding({
            'props': props,
            'key': 'list_item_content_padding',
            'additionalCss': additionalCss,
            'selector': `${this.order_class} .item-elements .item-elements-group .difl_icon_item_body`,
            'type': 'padding',
            'important': true
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'list_item_content_margin',
            'additionalCss': additionalCss,
            'selector': `${this.order_class} .item-elements .item-elements-group .difl_icon_item_body`,
            'type': 'margin',
            'important': true
        });

        utility.process_margin_padding({
            'props': props,
            'key': 'list_item_wrapper_padding',
            'additionalCss': additionalCss,
            'selector': `${this.order_class} div .item-elements`,
            'type': 'padding',
            'important': true
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'list_item_wrapper_margin',
            'additionalCss': additionalCss,
            'selector': `${this.order_class} div .item-elements`,
            'type': 'margin',
            'important': true
        });


        if (undefined === props['list_item_icon_type'] || props['list_item_icon_type'] === 'icon') {
            // list icon size with default, responsive, hover
            utility.process_icon_font_style({
                'props': props,
                'additionalCss': additionalCss,
                'key': 'list_item_icon',
                'selector': `${this.order_class} span.difl_icon_item_icon_wrapper span.et-pb-icon`,
                'important': true
            });

            utility.process_range_value({
                'props': props,
                'key': 'list_item_icon_size',
                'additionalCss': additionalCss,
                'selector': `${this.order_class} span.difl_icon_item_icon_wrapper span.et-pb-icon`,
                'type': 'font-size',
                'important': true
            });

            if (!!props['list_item_icon_color']) {
                utility.process_color({
                    'props': props,
                    'key': 'list_item_icon_color',
                    'additionalCss': additionalCss,
                    'selector': `${this.order_class} span.difl_icon_item_icon_wrapper span.et-pb-icon`,
                    'type': 'color',
                    'important': true
                })
            }
        }

        if (props['list_item_icon_type'] === 'image') {
            utility.process_range_value({
                'props': props,
                'key': 'list_item_image_width',
                'additionalCss': additionalCss,
                'selector': `${this.order_class} span.difl_icon_item_icon_wrapper img`,
                'type': 'width',
                'important': true,
            });

            utility.process_range_value({
                'props': props,
                'key': 'list_item_image_height',
                'additionalCss': additionalCss,
                'selector': `${this.order_class} span.difl_icon_item_icon_wrapper img`,
                'type': 'height',
                'important': true,
            });
        }

        if (props['list_item_icon_type'] === 'lottie') {
            if (!!props['list_item_icon_lottie_color']) {
                utility.process_color({
                    'props': props,
                    'key': 'list_item_icon_lottie_color',
                    'additionalCss': additionalCss,
                    'selector': `${this.order_class} span.difl_icon_item_icon_wrapper .difl_lottie_player svg path`,
                    'type': 'fill',
                    'important': true
                });
            }

            if (!!props['list_item_icon_lottie_background_color']) {
                utility.process_color({
                    'props': props,
                    'key': 'list_item_icon_lottie_background_color',
                    'additionalCss': additionalCss,
                    'selector': `${this.order_class} span.difl_icon_item_icon_wrapper .difl_lottie_player`,
                    'type': 'background-color',
                    'important': true
                });
            }

            if (!!props['list_item_icon_lottie_height']) {
                utility.process_range_value({
                    'props': props,
                    'key': 'list_item_icon_lottie_height',
                    'additionalCss': additionalCss,
                    'selector': `${this.order_class} span.difl_icon_item_icon_wrapper .difl_lottie_player`,
                    'type': 'width',
                    'important': true
                });
            }

            if (!!props['list_item_icon_lottie_width']) {
                utility.process_range_value({
                    'props': props,
                    'key': 'list_item_icon_lottie_width',
                    'additionalCss': additionalCss,
                    'selector': `${this.order_class} span.difl_icon_item_icon_wrapper .difl_lottie_player`,
                    'type': 'height',
                    'important': true
                });
            }
        }

        if (props['list_item_icon_only'] !== 'on') {
            utility.process_color({
                'props': props,
                'key': 'list_item_title_icon_color',
                'additionalCss': additionalCss,
                'selector': `${this.order_class} span.difl_icon_item_container .difl_icon_item_header span.et-pb-icon`,
                'type': 'color',
                'important': true
            });

            utility.process_range_value({
                'props': props,
                'key': 'list_item_title_icon_size',
                'additionalCss': additionalCss,
                'selector': `${this.order_class} span.difl_icon_item_container .difl_icon_item_header span.et-pb-icon`,
                'type': 'font-size',
                'important': true
            });

            // Icon placement with default, responsive, hover
            if (props['list_item_icon_placement'] !== 'inherit') {
                utility.df_process_string_attr({
                    'props': props,
                    'key': 'list_item_icon_placement',
                    'additionalCss': additionalCss,
                    'selector': `${this.order_class} .item-elements span.difl_icon_item_container`,
                    'type': 'flex-direction',
                    'important': true
                });
            }

            // Icon placement with default, responsive, hover
            if (props['list_item_icon_placement'] !== 'column'
                && props['list_item_icon_vertical_placement'] !== 'inherit'
                && !!props['list_item_icon_vertical_placement']) {
                additionalCss.push([{
                    'selector': `${this.order_class} .item-elements span.difl_icon_item_container .difl_icon_item_icon_wrapper`,
                    'declaration': `display:flex;`,
                }]);
                utility.df_process_string_attr({
                    'props': props,
                    'key': 'list_item_icon_vertical_placement',
                    'additionalCss': additionalCss,
                    'selector': `${this.order_class} .item-elements span.difl_icon_item_container .difl_icon_item_icon_wrapper`,
                    'type': 'align-items',
                    'important': true
                });
            }

            if (!!props['list_item_icon_placement'] && !['row', 'row-reverse'].includes(props['list_item_icon_placement'])) {
                additionalCss.push([{
                    'selector': `${this.order_class} .item-elements span.difl_icon_item_container .difl_icon_item_icon_wrapper`,
                    'declaration': `display: block;`
                }]);
            }

            if (props['list_item_icon_lottie_renderer'] !== 'html') {
                // Icon alignment with default, responsive, hover
                utility.df_process_string_attr({
                    'props': props,
                    'key': 'list_item_icon_alignment',
                    'additionalCss': additionalCss,
                    'selector': `${this.order_class} .item-elements span.difl_icon_item_container .difl_icon_item_icon_wrapper`,
                    'type': 'text-align',
                    'important': true
                });
            }

            // content width with default, responsive, hover
            utility.process_range_value({
                'props': props,
                'key': 'list_item_content_max_width',
                'additionalCss': additionalCss,
                'selector': `${this.order_class} span.item-elements`,
                'type': 'max-width',
                'important': true
            });
        } else {
            utility.df_process_string_attr({
                'props': props,
                'key': 'list_item_icon_alignment_alt',
                'additionalCss': additionalCss,
                'selector': `${this.order_class} .item-elements span.difl_icon_item_container`,
                'type': 'justify-content',
                'important': true
            });
        }

        // show icon on hover only
        if (props['list_item_icon_on_hover'] === 'on'
            && props['list_item_icon_type'] !== 'lottie'
            && props['list_item_icon_type'] !== 'text'
        ) {
            // icon margin for show on hover effect with default, responsive, hover
            utility.df_iconlist_show_icon_on_hover_styles({
                'props': props,
                'field': 'list_item_icon_placement',
                'trigger': 'list_item_icon_type',
                'dependsOn': {
                    'icon': 'list_item_icon_size',
                    'image': 'list_item_image_width',
                },
                'additionalCSS': additionalCss,
                'selector': `${this.order_class} span.difl_icon_item_icon_wrapper.show_on_hover`,
                'hover': `${this.order_class} .item-elements:hover span.difl_icon_item_icon_wrapper.show_on_hover`,
                'type': 'margin',
                'allowedUnits': ['%', 'em', 'rem', 'px', 'cm', 'mm', 'in', 'pt', 'pc', 'ex', 'vh', 'vw'],
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
        }


        // Tooltip
        if (props['list_item_use_tooltip'] === 'on') {
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
        }

        return additionalCss;
    }

    componentDidMount() {
        if (this.props['list_item_icon_type'] === 'lottie' && this.wrapperRef.current) {
            if (this.wrapperRef.current.querySelector('.difl_lottie_player.lottie-player-container')) {
                this.lottieInit(this.wrapperRef.current.querySelector('.difl_lottie_player.lottie-player-container'));
            }
        }

        if (this.props['list_item_use_tooltip'] === 'on' && this.wrapperRef.current) {
            this.play_tooltip_feature(this.wrapperRef.current);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // update lottie
        if (this.props['list_item_icon_type'] === 'lottie' && this.wrapperRef.current) {
            this.lottieDidUpdate(prevProps);
        }

        if (this.props['list_item_use_tooltip'] === 'on' && this.wrapperRef.current) {
            this.play_tooltip_feature(this.wrapperRef.current);
        }

        // preview for tooltip settings
        for (const index in prevProps) {
            if (prevProps[index] !== this.props[index]) {
                if (this.computed.includes(index)) {
                    if (this.props['list_item_use_tooltip'] === 'on' && this.wrapperRef.current) {
                        this.play_tooltip_feature(this.wrapperRef.current);
                    }
                }
            }
        }
    }

    lottieDidUpdate(prevProps) {
        const _this = this;
        const props = this.props;

        if (this.wrapperRef.current.querySelector('.difl_lottie_player.lottie-player-container')) {
            this.lottieInit(this.wrapperRef.current.querySelector('.difl_lottie_player.lottie-player-container'));
        }
        let lottieSrcProp = prevProps['list_item_icon_lottie_src_type'] === 'local' ? 'src_upload' : 'src_remote'

        if (
            (prevProps.list_item_icon_lottie_src_type !== props.list_item_icon_lottie_src_type) ||
            (prevProps[`list_item_icon_lottie_${lottieSrcProp}`] !== props[`list_item_icon_lottie_${lottieSrcProp}`])
        ) {
            _this.reInitLottie();
        }

        if (_this.state.lottie) {
            for (const property in prevProps) {
                if (prevProps[property] !== props[property]) {
                    if (_this.computedLottieOptions.includes(property)) {
                        _this.reInitLottie();
                    }
                }
            }

            if (!!props.list_item_icon_lottie_speed) {
                this.state.lottie.setSpeed(Number.parseFloat(props.list_item_icon_lottie_speed))
            } else {
                this.state.lottie.setSpeed(1)
            }

            if (props.list_item_icon_lottie_direction === 'on') {
                this.state.lottie.setDirection(-1)
            } else {
                this.state.lottie.setDirection(1)
            }
        }
    }

    lottieInit = (selector) => {
        const props = this.props;
        let path = '';

        if (this.state.lottie) return;

        if (props.list_item_icon_lottie_src_type !== 'local') {
            path = props.list_item_icon_lottie_src_remote;
        } else if (props.list_item_icon_lottie_src_upload !== '') {
            path = props.list_item_icon_lottie_src_upload;
        }

        const _lottie = lottie.loadAnimation({
            container: selector, // the dom element that will contain the animation
            renderer: props.list_item_icon_lottie_renderer || 'svg',
            loop: props.list_item_icon_lottie_loop === 'on' || false,
            autoplay: true,
            path: path // the path to the animation json
        });

        this.setState({lottie: _lottie})
    }

    reInitLottie = () => {
        this.state.lottie.destroy();
        this.setState({lottie: null})
    }

    /**
     * Render component output.
     *
     * @return {JSX.Element} Render as React.JS Component.
     */
    render() {
        const utils = window.ET_Builder.API.Utils;
        const props = this.props

        // Collect Child Component
        const list_item_icon = this.render_list_icon(utils);
        const list_icon_image = this.render_list_icon_image();
        const list_icon_text = this.render_list_icon_text();
        const list_icon_lottie = this.render_list_icon_lottie();
        const icon_item_title_text = this.render_icon_item_title_text();
        const icon_item_body_text = this.render_icon_item_body_text();
        const icon_item_tooltip_text = this.render_icon_item_tooltip_text();

        const item_icon_type = props['list_item_icon_type'];
        const item_icon_only = props['list_item_icon_only'];
        const item_icon_on_hover = props['list_item_icon_on_hover'];
        const content_outside_wrapper = props['list_item_content_outside_wrapper'];
        const item_use_tooltip = props['list_item_use_tooltip'];

        const IconImageWrapperClass = ['difl_icon_item_icon_wrapper'];

        if (item_icon_only === 'on') {
            IconImageWrapperClass.push('icon_only');
        }

        if (item_icon_on_hover === 'on' && item_icon_only !== 'on') {
            IconImageWrapperClass.push('show_on_hover');
        }

        return (
            <span className="item-elements et_pb_with_background" ref={this.wrapperRef}>
                <span className="item-elements-group">
                    <span className='difl_icon_item_container' ref={this.containerRef}>
                        {item_icon_type !== 'none'
                        && (!!list_item_icon || !!list_icon_image || !!list_icon_text || !!list_icon_lottie) ? (
                            <span className={IconImageWrapperClass.join(' ')}>
                                <span className="icon-element">
                                    {list_item_icon}
                                    {list_icon_image}
                                    {list_icon_text}
                                    {list_icon_lottie}
                                </span>
                            </span>
                        ) : null}
                        {item_icon_only !== 'on'
                        && (!!icon_item_title_text || (!!icon_item_body_text && content_outside_wrapper !== 'on')) ? (
                            <span className='difl_icon_item_content_wrapper'>
                                {icon_item_title_text}
                                {content_outside_wrapper !== 'on' ? icon_item_body_text : null}
                                </span>
                        ) : null}
                    </span>

                    {item_icon_only !== 'on' && content_outside_wrapper === 'on' ? (
                            <span className={'difl_icon_item_outer_wrapper'}>
                                {icon_item_body_text}
                            </span>
                        )
                        : null}
                </span>

                {item_use_tooltip === 'on' ? (
                    <span className="item-tooltip-data" style={{display: "none"}}>
                        {icon_item_tooltip_text}
                    </span>
                ) : null}
        </span>
        )
    }

    /**
     * Render title text with dynamic and multiview support for Icon list Item
     *
     * @since 1.0.0
     *
     * @return {*} Render button text
     */
    render_icon_item_title_text() {
        const HeadingTag = !!this.props['list_item_title_tag'] ? this.props['list_item_title_tag'] : 'h4';

        // Get rendered title text && url component
        const DynamicTitle = utility.df_collect_dynamic_content('list_item_title', this.props);
        const DynamicTitleUrl = utility.df_collect_dynamic_content('list_item_title_url', this.props);

        // Update dynamic title when set with url and title url is not empty
        if (!!DynamicTitle && !!DynamicTitleUrl.value && DynamicTitle.value.indexOf('href=') !== -1) {
            DynamicTitle.value = DynamicTitle.value.replace(/href="(.*?)"/i, DynamicTitleUrl.value);
        }

        // Icon for title
        const title_icon = this.render_list_item_title_icon(window.ET_Builder.API.Utils);

        return utility.df_render_dynamic_content(DynamicTitle, DynamicComponent => (
            <HeadingTag className='difl_icon_item_header et_pb_with_background'>
                {DynamicComponent}{title_icon}
            </HeadingTag>
        ));
    }

    /**
     * Render body text with dynamic and multiview support for Icon list Item
     *
     * @since 1.0.0
     *
     * @return {*} Render button text
     */
    render_icon_item_body_text() {
        // Get rendered component
        const DynamicContent = utility.df_collect_dynamic_content('content', this.props);

        return utility.df_render_dynamic_content(DynamicContent, DynamicComponent => (
            <span className='difl_icon_item_body et_pb_with_background'>
                    {DynamicComponent}
                </span>
        ), 'full');
    }

    /**
     * Render icon for icon list item
     *
     * @since 1.0.0
     *
     * @param {Object} utils Divi Utility Object for builder
     *
     * @return {*} Render button icon
     */
    render_list_icon(utils) {
        if (undefined === this.props['list_item_icon_type'] || this.props['list_item_icon_type'] === 'icon') {
            const DynamicIcon = utility.df_collect_dynamic_content('list_item_icon', this.props);
            const ItemIcon = utils.processFontIcon(!!DynamicIcon ? DynamicIcon : '&#x4e;||divi||400');
            return <span className='et-pb-icon difl_list_icon'>{ItemIcon}</span>;
        }

        return null;
    }

    /**
     * Render icon for icon list item title
     *
     * @since 1.0.0
     *
     * @param {Object} utils Divi Utility Object for builder
     *
     * @return {*} Render button icon
     */
    render_list_item_title_icon(utils) {
        if (this.props['list_item_title_icon_enable'] === 'on' && this.props['list_item_icon_only'] !== 'on') {

            const DynamicIcon = utility.df_collect_dynamic_content('list_item_title_icon', this.props);
            const ItemIcon = utils.processFontIcon(!!DynamicIcon ? DynamicIcon : '&#x49;||divi||400');

            const ItemIconClass = ['et-pb-icon', 'difl_list_title_icon'];

            if (this.props['list_item_title_icon_on_hover'] !== 'on') {
                ItemIconClass.push('always_show');
            }

            return <span className={ItemIconClass.join(' ')}>{ItemIcon}</span>;
        }

        return null;
    }

    /**
     * Render icon for icon list item
     *
     * @since 1.0.0
     *
     * @return {*} Render button icon
     */
    render_list_icon_image() {
        if (this.props['list_item_icon_type'] === 'image') {
            // Get rendered component
            const DynamicContent = utility.df_collect_dynamic_content('list_item_image', this.props);
            const DynamicImageAltText = utility.df_collect_dynamic_content('alt', this.props);

            if (DynamicImageAltText.hasValue) {
                DynamicImageAltText.value = DynamicImageAltText.value.replace(/<[^>]*>?/gm, '');
            }

            return utility.df_render_dynamic_image(DynamicContent, DynamicUrl => (
                <img src={DynamicUrl} alt={DynamicImageAltText.value} className="et_pb_image_wrap"/>
            ));
        }

        return null;
    }

    /**
     * Render lottie for icon list item
     *
     * @since 1.0.0
     *
     * @return {*} Render button icon
     */
    render_list_icon_lottie() {
        if (this.props['list_item_icon_type'] === 'lottie') {
            return <span className={'difl_lottie_player lottie-player-container'}></span>;
        }
        return null;
    }

    /**
     * Render text for icon list item
     *
     * @since 1.0.0
     *
     * @return {*} Render button text
     */
    render_list_icon_text() {
        if (this.props['list_item_icon_type'] === 'text') {
            // Get rendered component
            const DynamicContent = utility.df_collect_dynamic_content('list_item_icon_text', this.props);

            return utility.df_render_dynamic_content(DynamicContent, DynamicComponent => (
                <span className='difl_list_icon_text'>
                        {DynamicComponent}
                    </span>
            ));
        }
        return null;
    }

    /**
     * Render tooltip text with dynamic and multiview support for Icon list Item
     *
     * @since 1.0.0
     *
     * @return {*} Render button text
     */
    render_icon_item_tooltip_text() {
        // Get rendered component
        const DynamicContent = utility.df_collect_dynamic_content('list_item_tooltip_content', this.props);

        return utility.df_render_dynamic_content(DynamicContent, DynamicComponent => (
            <span className='difl_icon_item_tooltip_content'>
                    {DynamicComponent}
                </span>
        ), 'full');
    }

    /**
     * Play with tooltip
     *
     * @since 1.0.0
     *
     * @return void
     */
    play_tooltip_feature(selector) {
        const props = this.props;

        const tooltipOptions = {
            arrow: props['tooltip_arrow'] === 'on',
            animation: props['tooltip_animation'] ? props['tooltip_animation'] : 'fade',
            placement: props['tooltip_placement'] ? props['tooltip_placement'] : 'top',
            trigger: props['tooltip_trigger'] ? props['tooltip_trigger'] : 'mouseenter focus',
            followCursor: props['tooltip_follow_cursor'] === 'on' && !['click', 'mouseenter click'].includes(props['tooltip_trigger']),
            interactive: props['tooltip_interactive'] === 'on',
            interactiveBorder: props['tooltip_interactive_border'] ? parseInt(props['tooltip_interactive_border']) : 2,
            interactiveDebounce: props['tooltip_interactive_debounce'] ? parseInt(props['tooltip_interactive_debounce']) : 0,
            maxWidth: props['tooltip_custom_maxwidth'] ? parseInt(props['tooltip_custom_maxwidth']) : 350,
            offset: [
                props['tooltip_offset_skidding'] ? parseInt(props['tooltip_offset_skidding']) : 0,
                props['tooltip_offset_distance'] ? parseInt(props['tooltip_offset_distance']) : 10
            ],
            theme: `.${props.moduleInfo.orderClassName} difl_icon_item_tooltip`,
            allowHTML: true
        };

        const tooltipContentElement = selector.querySelector('.difl_icon_item_tooltip_content');
        if (!!tooltipContentElement && tooltipContentElement.innerHTML !== '') {
            tooltipOptions['content'] = tooltipContentElement.innerHTML;
            tooltipOptions['arrow'] = true;
            tippy(selector, tooltipOptions);
        }
    }
}

export default IconListItem;
