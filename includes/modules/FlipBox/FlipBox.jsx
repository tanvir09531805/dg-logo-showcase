// External Dependencies
import React, { Component } from 'react';
import utility from '../../../scripts/df_scripts/utilities';
// Internal Dependencies
import './style.css';


class FlipBox extends Component {
    static slug = 'difl_flipbox';
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            hover: false,
            hoverClass: '',
            height: null
        }
        this.wrapper = React.createRef();
        this.fb_animation_class = this.fb_animation_class.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    componentDidUpdate(prevProps, prevState) {
        const _this = this;
        if (prevProps !== _this.props) {
            if (_this.props.change_view === 'on') {
                _this.setState({hover: true, hoverClass: ' hover'})
            } else {
                _this.setState({hover: false, hoverClass: ''})
            }
        }  
        
    }

    static css(props) {
        const additionalCss = [];
        
        // flipbox height
        if(props.use_height === 'on') {
            utility.process_range_value({
                'props'             : props,
                'key'               : 'fb_height',
                'additionalCss'     : additionalCss,
                'selector'          : '%%order_class%% .df_flipbox_container',
                'type'              : 'height',
                'unit'              : 'px',
                'default_value'     : '500',
                'important'         : true
            });
            utility.process_range_value({
                'props'             : props,
                'key'               : 'fb_height',
                'additionalCss'     : additionalCss,
                'selector'          : '%%order_class%% .df_flipbox_container .df_fb_image_container',
                'type'              : 'max-height',
                'unit'              : 'px',
                'default_value'     : '500',
            });
        }
        // icon styles
        utility.process_icon_styles({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'image_front',
            'selector'          : '%%order_class%% .df_fb_front .et-pb-icon',
            'align_container'   : '%%order_class%% .df_fb_front .df_fb_image_container',
            'image_selector'    : '%%order_class%% .df_fb_front .df_fb_image_container img'
        });
        utility.process_icon_styles({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'image_back',
            'selector'          : '%%order_class%% .df_fb_back .et-pb-icon',
            'align_container'   : '%%order_class%% .df_fb_back .df_fb_image_container',
            'image_selector'    : '%%order_class%% .df_fb_back .df_fb_image_container img'
        });
        // background styles
        utility.df_process_bg({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'fb_background',
            'selector'          : '%%order_class%% .df_fb_front .fb_inner'
        });
        utility.df_process_bg({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'fb_back_background',
            'selector'          : '%%order_class%% .df_fb_back .fb_inner'
        });
        utility.df_process_bg({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'fb_button_background',
            'selector'          : '%%order_class%% .df_fb_back .df_fb_button'
        });
        // container spacing
        utility.process_margin_padding({
            'props' : props,
            'key':'container_margin',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% > div',
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'container_padding',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% > div',
            'type'  : 'padding'
        });
        // wrapper spacing
        utility.process_margin_padding({
            'props' : props,
            'key':'front_wrapper_padding',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_fb_front .fb_inner',
            'type'  : 'padding'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'back_wrapper_padding',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_fb_back .fb_inner',
            'type'  : 'padding'
        });
        // button spacing
        utility.process_margin_padding({
            'props' : props,
            'key':'button_wrapper_margin',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_fb_back .df_fb_button_wrapper',
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'button_wrapper_padding',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_fb_back .df_fb_button_wrapper',
            'type'  : 'padding'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'button_margin',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_fb_back .df_fb_button',
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'button_padding',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_fb_back .df_fb_button',
            'type'  : 'padding'
        });
        // image container spacing
        utility.process_margin_padding({
            'props' : props,
            'key':'img_container_front_margin',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_fb_front .df_fb_image_container',
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'img_container_front_padding',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_fb_front .df_fb_image_container',
            'type'  : 'padding'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'img_container_back_margin',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_fb_back .df_fb_image_container',
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'img_container_back_padding',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_fb_back .df_fb_image_container',
            'type'  : 'padding'
        });
        // icon spacing
        utility.process_margin_padding({
            'props' : props,
            'key':'icon_front_margin',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_fb_front .df_fb_image_container .et-pb-icon',
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'icon_front_padding',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_fb_front .df_fb_image_container .et-pb-icon',
            'type'  : 'padding'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'icon_back_margin',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_fb_back .df_fb_image_container .et-pb-icon',
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'icon_back_padding',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_fb_back .df_fb_image_container .et-pb-icon',
            'type'  : 'padding'
        });
        // title spacing
        utility.process_margin_padding({
            'props' : props,
            'key':'title_front_margin',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_fb_front .title',
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'title_front_padding',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_fb_front .title',
            'type'  : 'padding'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'title_back_margin',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_fb_back .title',
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'title_back_padding',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_fb_back .title',
            'type'  : 'padding'
        });
        // text spacing
        utility.process_margin_padding({
            'props' : props,
            'key':'text_front_margin',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_fb_front .fb-text',
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'text_front_padding',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_fb_front .fb-text',
            'type'  : 'padding'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'text_back_margin',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_fb_back .fb-text',
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'text_back_padding',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_fb_back .fb-text',
            'type'  : 'padding'
        });
        
        // button styles
        utility.df_process_btn_styles({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'fb_btn',
            'selector'          : '%%order_class%% .df_fb_back .df_fb_button',
            'align_container'   : '%%order_class%% .df_fb_back .df_fb_button_wrapper'
        });

        // for slide effect
        if (props.fb_animation === 'slide') {
            additionalCss.push([{
                selector:    '%%order_class%% > div',
                declaration: `overflow: hidden;`,
            }]);
        }
        // for rotate effect
        if (props.fb_animation === 'rotate' && props.fb_content_float === 'on') { 
            additionalCss.push([{
                selector:    '%%order_class%% .df_flipbox_container.rotate.fb_floating_content .df_fb_front .fb_inner_content',
                declaration: `transform: translateZ(${props.fb_cf_translate}) scale(${props.fb_cf_scale});`,
            }]);
            additionalCss.push([{
                selector:    '%%order_class%% .df_flipbox_container.rotate.fb_floating_content .df_fb_front .fb_inner',
                declaration: `overflow: visible;`,
            }]);
            additionalCss.push([{
                selector:    '%%order_class%% .df_flipbox_container.rotate.fb_floating_content .df_fb_back .fb_inner_content',
                declaration: `transform: translateZ(${props.fb_cf_translate}) scale(${props.fb_cf_scale});`,
            }]);
            additionalCss.push([{
                selector:    '%%order_class%% .df_flipbox_container.rotate.fb_floating_content .df_fb_back .fb_inner',
                declaration: `transform: visible;`,
            }]);
        }
        // custom transition
        utility.df_process_transition({
            'props'             : props,
            'key'               : 'fb',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .df_flipbox_body, %%order_class%% .df_fb_front, %%order_class%% .df_fb_back',
            'properties'        : ['opacity', 'transform']
        });
        // content alignment
        if ( props.fb_front_align) {
            additionalCss.push([{
                selector:    '%%order_class%% .df_fb_front .fb_inner',
                declaration: `align-items: ${props.fb_front_align};`,
            }]);
        }
        if ( props.fb_back_align) {
            additionalCss.push([{
                selector:    '%%order_class%% .df_fb_back .fb_inner',
                declaration: `align-items: ${props.fb_back_align};`,
            }]);
        }
        // icon font family
        utility.process_icon_font_style({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'image_front_font_icon',
            'selector'          : '%%order_class%% .et-pb-icon.img_front'
        })
        utility.process_icon_font_style({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'image_back_font_icon',
            'selector'          : '%%order_class%% .et-pb-icon.img_back'
        })

        return additionalCss;
    }

    render_image(props, key, adClass='') {
        const utils = window.ET_Builder.API.Utils;
        let icon = '';

        if (props[key + '_use_icon'] && props[key + '_use_icon'] === 'on') {
             if ( !props[key + '_font_icon'] || props[key + '_font_icon'] === '') {
                icon = '5'
             } else {
                 icon = utils.processFontIcon(props[key + '_font_icon'])
             }
        }
        if ( props[key + '_use_icon'] === 'on') {
            return (
                <div className="df_fb_image_container">
                    <span className={"et-pb-icon " + adClass}>{icon}</span>
                </div>
            )
        } else if ( props.dynamic[key + '_image'].hasValue){
            const ImageObject = utility.df_collect_dynamic_content(key + '_image', this.props);
            return utility.df_render_dynamic_image(ImageObject, function (ImageUrl) {
                return (
                    <div className="df_fb_image_container">
                        <img src={ImageUrl} alt={''} />
                    </div>
                );
            });
        } else {return null} 
    }

    render_button(props, key) {
        const button_text = key + '_button_text';
        const button_url = key + '_button_url';

        if (props.dynamic[button_text].hasValue || props.dynamic[button_url].hasValue ) {
            return (
                <div className="df_fb_button_wrapper">
                    <a className="df_fb_button" href={utility._renderDynamicContent( props, button_url ,false)}>{utility._renderDynamicContent( props, button_text)}</a>
                </div>
            )
        } else return '';
    }

    fb_animation_class() {
        const props = this.props;
        let animation_class = '';
        // rotate animation
        if (props.fb_animation && props.fb_animation === 'rotate' && props.fb_flip_direction) {
            animation_class = ' ' + animation_class + ' ' + props.fb_animation + ' ' + props.fb_flip_direction;
            if (props.fb_content_float === 'on') {
                animation_class = animation_class + ' ' + 'fb_floating_content';
            }
        }
        // slide animation
        if (props.fb_animation && props.fb_animation === 'slide' && props.fb_slide_direction) {
            animation_class = ' ' + animation_class + ' ' + props.fb_animation + ' ' + props.fb_slide_direction;
        }
        // zoom animation
        if (props.fb_animation && props.fb_animation === 'zoom' && props.fb_zoom_direction) {
            animation_class = ' ' + animation_class + ' ' + props.fb_animation + ' ' + props.fb_zoom_direction;
        }
        // fade animation
        if (props.fb_animation && props.fb_animation === 'fade') {
            animation_class = ' ' + animation_class + ' ' + props.fb_animation;
        }

        return animation_class;
    }

    render() {
        const props = this.props;

        // front content
        const FrontTitle = props.front_title_tag ? props.front_title_tag : 'h4';
        const fb_title = props.dynamic.title_front.hasValue ? 
            <FrontTitle className="title">
                {utility._renderDynamicContent(props , 'title_front')}
            </FrontTitle>
            : 
            null;
        const fb_content = props.dynamic.content_front.hasValue ? 
                <div className="fb-text" >
                    {utility._renderDynamicContent(props , 'content_front')}
                </div>
            : 
            null;

        // back content 
        const BackTitle = props.back_title_tag ? props.back_title_tag : 'h4';
        const fb_title_hover = props.dynamic.title_back.hasValue ?
            <BackTitle className="title">
                {utility._renderDynamicContent(props , 'title_back')}
            </BackTitle>
            : 
            null;
        const fb_content_hover = props.dynamic.content_back.hasValue ? 
                <div className="fb-text" >
                    {utility._renderDynamicContent(props , 'content_back')}
                </div>
            :
            null;

        return (
            <div className={"df_flipbox_container" + this.state.hoverClass + this.fb_animation_class()} ref={this.wrapper}>
                <div className="df_flipbox_body">
                <div className="df_fb_front">
                    <div className="fb_inner">
                        <div className="fb_inner_content">
                            {this.render_image(props, 'image_front', 'img_front')}
                            {fb_title}
                            {fb_content}
                        </div>
                    </div>
                </div>
                <div className="df_fb_back">
                    <div className="fb_inner">
                        <div className="fb_inner_content">
                            {this.render_image(props, 'image_back', 'img_back')}
                            {fb_title_hover}
                            {fb_content_hover}
                            {this.render_button(props, 'fb_btn')}
                        </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}
export default FlipBox;
