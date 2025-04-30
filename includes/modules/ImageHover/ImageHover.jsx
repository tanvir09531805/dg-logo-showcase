// External Dependencies
import React, { Component } from 'react';
import utility from '../../../scripts/df_scripts/utilities';
// Internal Dependencies
import './style.css';


class ImageHover extends Component {
    static slug = 'difl_imagehover';
    _isMounted = false;

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidUpdate(prevProps, prevState) {

    }

    static css(props) {
        const additionalCss = [];

        if(props.overlay !== 'on') {
            additionalCss.push([{
                selector:    '%%order_class%% .c4-izmir',
                declaration: `--image-opacity: 1;`,
            }]);
        }
        if(props.overlay === 'on') {
            additionalCss.push([{
                selector:    '%%order_class%% .c4-izmir .df-overlay',
                declaration: `background-image: linear-gradient(${props.overlay_direction},  
                    ${props.overlay_primary} 0, 
                    ${props.overlay_secondary} 100%);`,
            }]);
        }

        if(props.border_anim === 'on') {
            additionalCss.push([{
                selector:    '%%order_class%% .c4-izmir',
                declaration: `--border-color: ${props.anm_border_color};`,
            }]);
            utility.process_range_value({
                'props'             : props,
                'key'               : 'anm_border_width',
                'additionalCss'     : additionalCss,
                'selector'          : '%%order_class%% .c4-izmir',
                'type'              : '--border-width',
                'unit'              : 'px'
            });
            utility.process_range_value({
                'props'             : props,
                'key'               : 'anm_border_margin',
                'additionalCss'     : additionalCss,
                'selector'          : '%%order_class%% .c4-izmir',
                'type'              : '--border-margin',
                'unit'              : 'px'
            });
        }
        utility.process_range_value({
            'props'             : props,
            'key'               : 'anm_content_padding',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .c4-izmir',
            'type'              : '--padding',
            'unit'              : 'em'
        });
        if (props.image_scale === 'c4-image-rotate-left') {
            additionalCss.push([{
                selector:    '%%order_class%% .c4-image-rotate-left:hover img, %%order_class%% :focus.c4-image-rotate-left img',
                declaration: `transform: scale(${props.image_scale_hover}) rotate(-15deg);`,
            }]);
        }
        if (props.image_scale === 'c4-image-rotate-right') {
            additionalCss.push([{
                selector:    '%%order_class%% .c4-image-rotate-right:hover img, %%order_class%% :focus.c4-image-rotate-right img',
                declaration: `transform: scale(${props.image_scale_hover}) rotate(15deg);`,
            }]);
        }

        // icon
        utility.process_color({
            'props'             : props,
            'key'               : 'icon_color',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .et-pb-icon',
            'type'              : 'color'
        });
        utility.process_range_value({
            'props'             : props,
            'key'               : 'icon_size',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .et-pb-icon',
            'type'              : 'font-size',
            'unit'              : 'px'
        });
        if(props.use_icon !== 'off' && props.icon_background_color !== ''){
            utility.df_process_bg({
                'props': props,
                'key': 'icon_background_color',
                'additionalCss': additionalCss,
                'selector': '%%order_class%% .ihb_icon_wrap',
                'type': 'background-color',
                })
        }
    
        if (props.title_anim_delay && props.title_anim_delay !== '0' && props.always_show_title !== 'on') {
            additionalCss.push([{
                selector:    '%%order_class%% .ihb_title_wrap, %%order_class%% .ihb_title_wrap > *',
                declaration: `transition-delay: ${props.title_anim_delay}ms;`,
            }]);
        }
        if (props.icon_anim_delay && props.icon_anim_delay !== '0' && props.always_show_icon !== 'on') {
            additionalCss.push([{
                selector:    '%%order_class%% .ihb_icon_wrap, %%order_class%% .ihb_icon_wrap > *',
                declaration: `transition-delay: ${props.icon_anim_delay}ms;`,
            }]);
        }

        // spacing: title
        utility.process_margin_padding({
            'props' : props,
            'key':'title_margin',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_ihb_title',
            'type'  : 'margin'
        });
         // spacing: icon wrapper
         utility.process_margin_padding({
            'props' : props,
            'key':'icon_wrapper_margin',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .ihb_icon_wrap',
            'type'  : 'margin'
        });
        // spacing: icon
        utility.process_margin_padding({
            'props' : props,
            'key':'icon_margin',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .et-pb-icon',
            'type'  : 'margin'
        });
        // icon font family
        utility.process_icon_font_style({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'font_icon',
            'selector'          : '%%order_class%% .et-pb-icon'
        })
        
        return additionalCss;
    }

    render() {
        const props = this.props;
        const utils = window.ET_Builder.API.Utils;
        const title_reveal_class = props.always_show_title === 'on' ?
            'always-show-title c4-fade-up' : props.content_reveal_title;
        const icon_reveal_class = props.always_show_icon === 'on' ?
            'always-show-title c4-fade-up' : props.content_reveal_icon;
        const TitleTag = props.title_tag ? props.title_tag : 'h3';
        const image = '' !== props.image ?
            <img src={props.image} alt={props.alt} /> : '';

        const title = '' !== props.image ?
            <div className={"ihb_title_wrap " + title_reveal_class}>
                <TitleTag className="df_ihb_title">{props.title_text}</TitleTag>
            </div> : '';
        const icon = props.use_icon && props.use_icon === 'on' ? 
            !props.font_icon || props.font_icon === '' ? 
            <div className={"ihb_icon_wrap " + icon_reveal_class}>
                <span className="et-pb-icon">5</span>
            </div> :
            <div className={"ihb_icon_wrap " + icon_reveal_class}>
                <span className="et-pb-icon">{utils.processFontIcon(props['font_icon'])}</span>
            </div> : '';

        const border_anm_style = props.border_anim === 'on' ? props.border_anm_style : '';

        return(<div className={"df_ihb_container " + props.image_scale}>
            <figure className={"c4-izmir df_ihb_image_wrap " + border_anm_style}>
                {props.overlay === 'on' ? <span className="df-overlay"></span> : ''}
                {image}
                <figcaption className={"df_ihb_content " + props.content_position}>
                    {icon}
                    {title}
                </figcaption>
            </figure>
        </div>)
    }
}
export default ImageHover;