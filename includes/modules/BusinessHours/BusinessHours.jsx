// External Dependencies
import React, { Component, Fragment } from 'react';
import utility from '../../../scripts/df_scripts/utilities';

// Internal Dependencies
import './style.css';


class BusinessHours extends Component {
    static slug = 'difl_businesshours';
    _isMounted = false;

    constructor(props) {
        super(props);


    }


    static css(props) {
        const additionalCss = [];
        // content area background
        utility.df_process_bg({
            'props': props,
            'additionalCss': additionalCss,
            'key': 'df_title_bg',
            'selector': '%%order_class%% .df_bh_title'
        });
        utility.df_process_bg({
            'props': props,
            'additionalCss': additionalCss,
            'key': 'df_items_bg',
            'selector': '%%order_class%% .difl_businesshoursitem'
        });


        utility.df_process_bg({
            'props': props,
            'key': 'day_background_color',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df_bh_day',
        });

        utility.df_process_bg({
            'props': props,
            'key': 'time_background_color',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df_bh_time',
        });
        // Background Color
        utility.process_color({
            'props': props,
            'key': 'start_time_background_color',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df_bh_start_time',
            'type': 'background-color',
        });
        utility.process_color({
            'props': props,
            'key': 'end_time_background_color',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df_bh_end_time',
            'type': 'background-color',
        });
        utility.process_color({
            'props': props,
            'key': 'time_separetor_background_color',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df_bh_time_separetor',
            'type': 'background-color',
        });


        // spacing
        utility.process_margin_padding({
            'props': props,
            'key': 'title_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df_bh_title',
            'type': 'margin',
            'important': false
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'title_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df_bh_title',
            'type': 'padding',
            'important': false
        });


        utility.process_margin_padding({
            'props': props,
            'key': 'day_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df_bh_day',
            'type': 'margin',
            'important': false
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'day_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df_bh_day',
            'type': 'padding',
            'important': false
        });

        utility.process_margin_padding({
            'props': props,
            'key': 'time_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df_bh_time',
            'type': 'margin',
            'important': false
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'time_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df_bh_time',
            'type': 'padding',
            'important': false
        });

        utility.process_margin_padding({
            'props': props,
            'key': 'start_time_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df_bh_start_time',
            'type': 'margin',
            'important': false
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'start_time_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df_bh_start_time',
            'type': 'padding',
            'important': false
        });

        utility.process_margin_padding({
            'props': props,
            'key': 'end_time_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df_bh_end_time',
            'type': 'margin',
            'important': false
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'end_time_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df_bh_end_time',
            'type': 'padding',
            'important': false
        });

        utility.process_margin_padding({
            'props': props,
            'key': 'time_separetor_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df_bh_time_separetor',
            'type': 'margin',
            'important': false
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'time_separetor_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df_bh_time_separetor',
            'type': 'padding',
            'important': false
        });

        utility.process_margin_padding({
            'props': props,
            'key': 'main_wrapper_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df_bh_wrapper',
            'type': 'margin',
            'important': true
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'main_wrapper_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df_bh_wrapper',
            'type': 'padding',
            'important': false
        });

        utility.process_margin_padding({
            'props': props,
            'key': 'item_wrapper_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .difl_businesshoursitem',
            'type': 'margin',
            'important': true
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'item_wrapper_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .difl_businesshoursitem',
            'type': 'padding',
            'important': false
        });

        utility.process_margin_padding({
            'props': props,
            'key': 'title_wrapper_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df_bh_header',
            'type': 'margin',
            'important': false
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'title_wrapper_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df_bh_header',
            'type': 'padding',
            'important': false
        });

        utility.process_margin_padding({
            'props': props,
            'key': 'day_time_separetor_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df_bh_day_time_separator hr',
            'type': 'margin',
            'important': false
        });

        utility.process_color({
            'props': props,
            'key': 'day_time_separator_color',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df_bh_day_time_separator hr',
            'type': 'border-color',
            'important': false
        });

        utility.process_range_value({
            'props': props,
            'key': 'day_time_separator_hight',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df_bh_day_time_separator hr',
            'type': 'border-bottom-width',
            'default_value': '1',
            'important': false
        });

        utility.df_process_string_attr({
            'props': props,
            'key': 'day_time_separator_style',
            'additionalCss': additionalCss,
            'selector': '.difl_businesshours%%order_class%% .df_bh_day_time_separator hr',
            'type': 'border-style',
            'default_value': 'solid'
        });
        utility.process_range_value({
            'props': props,
            'key': 'day_width',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df_bh_day',
            'type': 'max-width',
            'default_value': '50%',
        });

        const key = 'day_width';
        const type = 'max-width';
        const desktop = props[key] && props[key] !== '' ? props[key] : '50%';
        const tablet = props[key + '_tablet'] && props[key + '_tablet'] !== '' ? props[key + '_tablet'] : desktop;
        const phone = props[key + '_phone'] && props[key + '_phone'] !== '' ? props[key + '_phone'] : tablet;


        if (desktop && '' !== desktop) {
            additionalCss.push([{
                selector: "%%order_class%% .df_bh_time",
                declaration: `${type}:  calc(100% -  ${desktop});`,
            }]);
        }
        if (tablet && '' !== tablet) {
            additionalCss.push([{
                selector: "%%order_class%% .df_bh_time",
                declaration: `${type}:  calc(100% -  ${tablet});`,
                'device': 'tablet',
            }]);
        }
        if (phone && '' !== phone) {
            additionalCss.push([{
                selector: "%%order_class%% .df_bh_time",
                declaration: `${type}:  100%;`,
                'device': 'phone'
            }]);
        }

        return additionalCss;
    }

    contentOutput(props) {
        return props.content.length !== 0 ? props.content : '';
    }
    render() {
        const props = this.props;

        const TitleTag = props.title_text_level;
        const heading_title_text = ('off' !== props.title_on_off && props.dynamic.heading_title_text.hasValue) ?
            <div className="df_bh_header"> <TitleTag className="df_bh_title"> {utility._renderDynamicContent(props , 'heading_title_text')}  </TitleTag></div> : '';

        return (
            <Fragment>
                <div className="df_bh_container">
                    <div className="df_bh_wrapper">
                        {heading_title_text}
                        {this.contentOutput(props)}
                    </div>
                </div>
            </Fragment>
        );
    }
}
export default BusinessHours;