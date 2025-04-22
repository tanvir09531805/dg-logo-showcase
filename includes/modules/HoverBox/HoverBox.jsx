// External Dependencies
import React, { Component } from 'react';
import utility from '../../../scripts/df_scripts/utilities';
// Internal Dependencies
import './style.css';


class HoverBox extends Component {
    static slug = 'difl_hoverbox';
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            hoverClass: ''
        }

        this.hb_content = this.hb_content.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            if (this.props.change_view === 'on') {
                this.setState({hover: true, hoverClass: ' hover'})
            } else {
                this.setState({hover: false, hoverClass: ''})
            }
        }  
    }

    static css(props) {
        const additionalCss = [];

        // background
        utility.df_process_bg({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'hb_background',
            'selector'          : '%%order_class%% .df_hb_background'
        });
        utility.df_process_bg({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'title_bg',
            'selector'          : '%%order_class%% .title'
        });
        utility.df_process_bg({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'subtitle_bg',
            'selector'          : '%%order_class%% .subtitle'
        });
        utility.df_process_bg({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'content_bg',
            'selector'          : '%%order_class%% .content'
        });
        // button styles
        utility.df_process_btn_styles({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'hb_btn',
            'selector'          : '%%order_class%% .df_hb_button',
            'align_container'   : '%%order_class%% .df_hb_button_wrapper'
        });
        //button background
        utility.df_process_bg({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'hb_btn_background',
            'selector'          : '%%order_class%% .df_hb_button'
        });
        // wrapper spacing
        utility.process_margin_padding({
            'props' : props,
            'key':'wrapper_margin',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_hb_container',
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'wrapper_padding',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_hb_container',
            'type'  : 'padding'
        });
        // button wrapper spacing
        utility.process_margin_padding({
            'props' : props,
            'key':'button_wrapper_margin',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_hb_button_wrapper',
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'button_wrapper_padding',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_hb_button_wrapper',
            'type'  : 'padding'
        });
        // title spacing
        utility.process_margin_padding({
            'props' : props,
            'key':'title_margin',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .title',
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'title_padding',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .title',
            'type'  : 'padding'
        });
        // subtitle spacing
        utility.process_margin_padding({
            'props' : props,
            'key':'subtitle_margin',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .subtitle',
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'subtitle_padding',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .subtitle',
            'type'  : 'padding'
        });
        // content spacing
        utility.process_margin_padding({
            'props' : props,
            'key':'content_margin',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .content',
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'content_padding',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .content',
            'type'  : 'padding'
        });
        // button spacing
        utility.process_margin_padding({
            'props' : props,
            'key':'button_margin',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_hb_button',
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'button_padding',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_hb_button',
            'type'  : 'padding'
        });

        if (props.background_scale && props.background_scale === 'on') {
            additionalCss.push([{
                selector:    '%%order_class%%:hover .df_hb_background',
                declaration: `transform: scale(1.06);`,
            }]);
            additionalCss.push([{
                selector:    '%%order_class%%',
                declaration: `overflow: hidden !important;`,
            }]);
        }
        if (props.vertical_align) {
            additionalCss.push([{
                selector:    '%%order_class%% .df_hb_inner',
                declaration: `justify-content: ${props.vertical_align};`,
            }]);
        }
        // transform styles
        if (props.anim_direction) {
            additionalCss.push([{
                selector:    '%%order_class%% .df_hb_def_content',
                declaration: `transform: ${HoverBox.df_transform_values(props.anim_direction).default};`,
            }]);
            additionalCss.push([{
                selector:    '%%order_class%% .df_hb_def_content_hover',
                declaration: `transform: ${HoverBox.df_transform_values(props.anim_direction).hover};`,
            }]);
            additionalCss.push([{
                selector:    '%%order_class%%:hover .df_hb_def_content',
                declaration: `transform: ${HoverBox.df_transform_values(props.anim_direction).hover};`,
            }]);
            additionalCss.push([{
                selector:    '%%order_class%%:hover .df_hb_def_content_hover',
                declaration: `transform: ${HoverBox.df_transform_values(props.anim_direction).default};`,
            }]);
        }

        return additionalCss;
    }

    // get transform values
    static df_transform_values(key = 'bottom') {
        const transfor_values = {
            'top'           : {
                'default'   : 'translateY(0px)',
                'hover'     : 'translateY(-60px)'
            },
            'bottom'        : {
                'default'   : 'translateY(0px)',
                'hover'     : 'translateY(60px)'
            },
            'left'          : {
                'default'   : 'translateX(0px)',
                'hover'     : 'translateX(-60px)'
            },
            'right'         : {
                'default'   : 'translateX(0px)',
                'hover'     : 'translateX(60px)'
            },
            'center'        : {
                'default'   : 'scale(1)',
                'hover'     : 'scale(0)'
            },
            'top_right'     : {
                'default'   : 'translateX(0px) translateY(0px)',
                'hover'     : 'translateX(50px) translateY(-50px)'
            },
            'top_left'      : {
                'default'   : 'translateX(0px) translateY(0px)',
                'hover'     : 'translateX(-50px) translateY(-50px)'
            },
            'bottom_right'  : {
                'default'   : 'translateX(0px) translateY(0px)',
                'hover'     : 'translateX(50px) translateY(50px)'
            },
            'bottom_left'   : {
                'default'   : 'translateX(0px) translateY(0px)',
                'hover'     : 'translateX(-50px) translateY(50px)'
            },
        };
        return transfor_values[key];
    }

    render_button(props, key) {
        const button_text = key + '_button_text';
        const button_url = key + '_button_url';

        if (props.dynamic[button_text].hasValue || props.dynamic[button_url].hasValue ) {
            return (
                <div className="df_hb_button_wrapper">
                    <a className="df_hb_button" href={utility._renderDynamicContent( props, button_url ,false)}>{utility._renderDynamicContent( props, button_text)}</a>
                </div>
            )
        } else return '';
    }

    hb_content() {
        const props = this.props;
        var content_default = '';
        var content_hover = '';
        const TitleTag = props.title_tag && props.title_tag !== '' ? props.title_tag : 'h4';
        const SubTitleTag = props.subtitle_tag && props.subtitle_tag !== '' ? props.subtitle_tag : 'h6';
       
        const title = props.dynamic.title.hasValue ? (
            <TitleTag className="title">
                {utility._renderDynamicContent(props , 'title')}
            </TitleTag>
        ) : '';
        const sub_title = props.dynamic.sub_title.hasValue ? (
            <SubTitleTag className="subtitle">
                {utility._renderDynamicContent(props , 'sub_title')}
            </SubTitleTag>
        ) : '';
        const content = props.dynamic.content.hasValue ? (
            <div className="content">
                {utility._renderDynamicContent(props , 'content')}
            </div>
        ) : '';

        if (props.title_on_hover === 'on') {
            content_hover = <React.Fragment>{content_hover}{title}</React.Fragment>
        } else {
            content_default = <React.Fragment>{content_default}{title}</React.Fragment>
        }

        if (props.subtitle_on_hover === 'on') {
            content_hover = <React.Fragment>{content_hover}{sub_title}</React.Fragment>
        } else {
            content_default = <React.Fragment>{content_default}{sub_title}</React.Fragment>
        }

        if(props.content_on_hover === 'on') {
            content_hover = <React.Fragment>{content_hover}{content}</React.Fragment>
        } else {
            content_default = <React.Fragment>{content_default}{content}</React.Fragment>
        }

        if (props.button_on_hover === 'on') {
            content_hover = <React.Fragment>{content_hover}{this.render_button(props, 'hb_btn')}</React.Fragment>
        } else {
            content_default = <React.Fragment>{content_default}{this.render_button(props, 'hb_btn')}</React.Fragment>
        }

        const content_default_container = content_default !== '' ?
            <div className="df_hb_def_content">{content_default}</div> : '';

        const content_hover_container = content_hover !== '' ?
            <div className="df_hb_def_content_hover">{content_hover}</div> : '';
        
        return (
            <div className="df_hb_inner">
                {content_default_container}
                {content_hover_container}
            </div>
        );
    }

    render() {
        const props = this.props;

        return(
            <div className={"df_hb_container " + this.state.hoverClass}>
                <div className="df_hb_background"></div>
                <div className="df_hb_inner">
                    {this.hb_content()}
                </div>
            </div>
        )
    }
}
export default HoverBox;