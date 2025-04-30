// External Dependencies
import React, { Component } from 'react';
import utility from '../../../scripts/df_scripts/utilities';
import '../../../public/js/lib/jquery.marquee.min.js';
// Internal Dependencies
import './style.css';

class MarqueeText extends Component {
    static slug = 'difl_marqueetext';
    _key = 0;

    constructor(props) {
        super(props);

        this.state = {
            viewMode: 'desktop',
            isLoading: false,
            config: {
                delayBeforeStart: 1000,
                pauseOnHover: 'on' === props.ticker_hover,
                gap: 0,
                direction: 'on' === props.ticker_direction ? "right" : "left",
                duplicated: 'on' === props.ticker_loop,
                startVisible: 'on' !== props.ticker_direction,
            }
        }

        this.wrapper = React.createRef();
        this.computedType = ['ticker_hover', 'ticker_speed', 'ticker_direction', 'ticker_loop', 'ticker_gap'];
    }

    async componentDidMount() {

        this.setState({ isLoading: true })

        const isChildEmpty = await this.props['content'] === ''|| await this.props['content'].length === 0;

        if (!this.wrapper.current) return;

        if (this.state.isLoading && !isChildEmpty) {
            this.marqueeTextUpdate();
        }
    }

    componentDidUpdate(prevProps) {
        const props = this.props
        const viewMode = window.ET_Builder.API.State.View_Mode.current;
        const isChildEmpty = props['content'] === '' || props['content'].length === 0;

        for (const index in prevProps) {
            if (prevProps[index] !== props[index]
                && this.computedType.includes(index)) {
                this.marqueeTextUpdate();
            }
        }

        if (this.state.isLoading
            && this.wrapper.current && !isChildEmpty) {
            this.marqueeTextUpdate();
        }

        if (viewMode !== this.state.viewMode) {
            this.setState({ viewMode: viewMode });
            this.marqueeTextUpdate();
        }
    }

    componentWillUnmount() {
        this.setState({ isLoading: false });
    }

    marqueeTextUpdate = () => {
        this._key++
        const $ = window.jQuery;
        const props = this.props
        const moduleClass = props.moduleInfo.orderClassName;
        const isChildEmpty = props['content'] === '' || props['content'].length === 0;
        const config = {
            ...this.state.config,
            duration: parseInt(props.ticker_speed),
            pauseOnHover: "on" === props.ticker_hover,
            direction: 'on' === props.ticker_direction ? "right" : "left",
            duplicated: 'on' === props.ticker_loop,
            startVisible: 'on' !== props.ticker_direction,
        }

        if ('on' === props.ticker_loop) {
            Object.assign(config, {
                gap: parseInt(props.ticker_gap)
            })
        }

        if (!this.wrapper.current|| false !== isChildEmpty) return;

        const selector = '.' + moduleClass + ' .' + this.wrapper.current.classList[0];

        $(selector)
            .on('resumed', () => { return true })
            .marquee(config);
    }

    static css(props) {
        const additionalCss = [];

        const marqueTxtWrapper = "%%order_class%% .df_marqueetext_wrapper .df_marquee_text";

        utility.df_process_bg({
            'props': props,
            'additionalCss': additionalCss,
            'key': 'text_background',
            'selector': `${marqueTxtWrapper}>*:not(.df_marquee_media)`,
            'important': true
        });

        utility.df_process_bg({
            props: props,
            key: "text_media_bg",
            additionalCss: additionalCss,
            selector: `${marqueTxtWrapper} .df_marquee_media`,
        });

        utility.process_color({
            props: props,
            key: "text_icon_color",
            additionalCss: additionalCss,
            selector: `${marqueTxtWrapper} .df_marquee_text_icon`,
            type: "color"
        });

        utility.process_range_value({
            props: props,
            key: "text_icon_size",
            additionalCss: additionalCss,
            selector: `${marqueTxtWrapper} .df_marquee_text_icon`,
            default_value: '14px',
            type: "font-size"
        });

        utility.process_range_value({
            props: props,
            key: "ticker_gap",
            additionalCss: additionalCss,
            selector: `%%order_class%% .df_marquee_list`,
            default_value: '10px',
            type: "gap",
        });

        utility.process_range_value({
            props: props,
            key: "text_image_width",
            additionalCss: additionalCss,
            selector: `${marqueTxtWrapper} .df_marquee_media .df_marquee_text_img`,
            default_value: '20px',
            type: "width",
        });

        utility.process_margin_padding({
            props: props,
            key: "marquee_text_margin",
            additionalCss: additionalCss,
            selector: `${marqueTxtWrapper}>*:not(.df_marquee_media)`,
            type: "margin",
        });

        utility.process_margin_padding({
            props: props,
            key: "marquee_text_padding",
            additionalCss: additionalCss,
            selector: `${marqueTxtWrapper}>*:not(.df_marquee_media)`,
            type: "padding",
        });

        utility.process_margin_padding({
            props: props,
            key: "marquee_text_media_margin",
            additionalCss: additionalCss,
            selector: `${marqueTxtWrapper} .df_marquee_media`,
            type: "margin",
            important: false
        });

        utility.process_margin_padding({
            props: props,
            key: "marquee_text_media_padding",
            additionalCss: additionalCss,
            selector: `${marqueTxtWrapper} .df_marquee_media`,
            type: "padding",
            important: false
        });

        additionalCss.push([
            {
                selector: "%%order_class%% .difl_marqueetextitem.et_pb_module",
                declaration: "margin-bottom: 0%;",
            }
        ]);

        return additionalCss;
    }

    /**
     * Render component output.
     *
     * @return {JSX.Element} Render as React.JS Component.
     */
    render() {

        if (this.props['content'] === '' || this.props['content'].length === 0) {
            return (<h2 className='df_marquee_notice'>
                Please <strong>Add New Item.</strong>
            </h2>);
        }

        return (
            <div className="df_marqueetext_wrapper" ref={this.wrapper}>
                <div className="df_marquee_animation" key={this._key}>
                    <div className="df_marquee_list">
                        {this.props.content}
                    </div>
                </div>
            </div>
        )
    }
}

export default MarqueeText;
