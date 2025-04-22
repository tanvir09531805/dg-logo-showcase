// External Dependencies
import React, { Component } from 'react';
import utility from '../../../scripts/df_scripts/utilities';
// Internal Dependencies
import './style.css';


class ImageCarouselItem extends Component {
    static slug = 'difl_imagecarouselitem';
    _isMounted = false;

    constructor(props) {
        super(props);

        this.wrapper = React.createRef();
        this.add_wrapper_class = this.add_wrapper_class.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        this.add_wrapper_class();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidUpdate(prevProps, prevState) {

    }

    static css(props) {
        const additionalCss = [];

        // overlay
        utility.df_process_bg({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'ic_overlay_background',
            'selector'          : '.difl_imagecarousel %%order_class%% .overlay_wrapper'
        });
        // button
        // button styles
        utility.df_process_btn_styles({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'ic_btn',
            'selector'          : '.difl_imagecarousel %%order_class%% .df_ic_button',
            'align_container'   : '.difl_imagecarousel %%order_class%% .df_ic_button_wrapper'
        });
        //button background
        utility.df_process_bg({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'ic_btn_background',
            'selector'          : '.difl_imagecarousel %%order_class%% .df_ic_button'
        });
        // wrapper spacing
        utility.process_margin_padding({
            'props' : props,
            'key':'wrapper_margin',
            'additionalCss' : additionalCss,
            'selector' : '.difl_imagecarousel %%order_class%%.difl_imagecarouselitem > div',
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'wrapper_padding',
            'additionalCss' : additionalCss,
            'selector' : '.difl_imagecarousel %%order_class%%.difl_imagecarouselitem > div',
            'type'  : 'padding'
        });
        // content spacing
        utility.process_margin_padding({
            'props' : props,
            'key':'content_margin',
            'additionalCss' : additionalCss,
            'selector' : '.difl_imagecarousel %%order_class%% .content',
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'content_padding',
            'additionalCss' : additionalCss,
            'selector' : '.difl_imagecarousel %%order_class%% .content',
            'type'  : 'padding'
        });
        // caption spacing
        utility.process_margin_padding({
            'props' : props,
            'key':'caption_margin',
            'additionalCss' : additionalCss,
            'selector' : '.difl_imagecarousel %%order_class%% .ic_caption',
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'caption_padding',
            'additionalCss' : additionalCss,
            'selector' : '.difl_imagecarousel %%order_class%% .ic_caption',
            'type'  : 'padding'
        });
        // button spacing
        utility.process_margin_padding({
            'props' : props,
            'key':'button_margin',
            'additionalCss' : additionalCss,
            'selector' : '.difl_imagecarousel %%order_class%% .df_ic_button',
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'button_padding',
            'additionalCss' : additionalCss,
            'selector' : '.difl_imagecarousel %%order_class%% .df_ic_button',
            'type'  : 'padding'
        });
        // vertical align
        if (props.vertical_align) {
            additionalCss.push([{
                selector:    '.difl_imagecarousel %%order_class%% .overlay_wrapper',
                declaration: `justify-content: ${props.vertical_align};`,
            }]);
        }

        // transform styles
        if (props.content_hover === 'on') {
            const anim_direction = props.anim_direction ? props.anim_direction : 'top';
            additionalCss.push([{
                selector:    '.difl_imagecarousel %%order_class%% .content',
                declaration: `opacity: 0; transform: ${ImageCarouselItem.df_transform_values(anim_direction).default};`,
            }]);
            additionalCss.push([{
                selector:    '.difl_imagecarousel %%order_class%%:hover .content',
                declaration: `opacity: 1; transform: ${ImageCarouselItem.df_transform_values(anim_direction).hover};`,
            }]);
        }

        return additionalCss;
    }

    // get transform values
    static df_transform_values(key = 'bottom') {
        const transfor_values = {
            'top'           : {
                'default'   : 'translateY(-60px)',
                'hover'     : 'translateY(0px)'
            },
            'bottom'        : {
                'default'   : 'translateY(60px)',
                'hover'     : 'translateY(0px)'
            },
            'left'          : {
                'default'   : 'translateX(-60px)',
                'hover'     : 'translateX(0px)'
            },
            'right'         : {
                'default'   : 'translateX(60px)',
                'hover'     : 'translateX(0px)'
            },
            'center'        : {
                'default'   : 'scale(0)',
                'hover'     : 'scale(1)'
            },
            'top_right'     : {
                'default'   : 'translateX(50px) translateY(-50px)',
                'hover'     : 'translateX(0px) translateY(0px)'
            },
            'top_left'      : {
                'default'   : 'translateX(-50px) translateY(-50px)',
                'hover'     : 'translateX(0px) translateY(0px)'
            },
            'bottom_right'  : {
                'default'   : 'translateX(50px) translateY(50px)',
                'hover'     : 'translateX(0px) translateY(0px)'
            },
            'bottom_left'   : {
                'default'   : 'translateX(-50px) translateY(50px)',
                'hover'     : 'translateX(0px) translateY(0px)'
            },
        };
        return transfor_values[key];
    }

    render_button(props, key) {
        const button_text = key + '_button_text';
        const button_url = key + '_button_url';

        if (props.dynamic[button_text].hasValue || props.dynamic[button_url].hasValue ) {
            return (
                <div className="df_ic_button_wrapper">
                    <a className="df_ic_button" href={utility._renderDynamicContent( props, button_url ,false)}>{utility._renderDynamicContent( props, button_text)}</a>
                </div>
            )
        } else return '';
    }

    add_wrapper_class() {
        this.wrapper.current.parentElement.parentElement.classList.add('swiper-slide');
    }

    render() {
        const props = this.props;
        const ImageObject = utility.df_collect_dynamic_content('image', props);
        const image = utility.df_render_dynamic_image(ImageObject, function (ImageUrl) {
            return (
                <div className="ic_image_wrapper">
                    <img className="df-ic-image" src={ImageUrl} alt={props.alt_text} />
                </div>
            );
        });

        const CaptionTag = props.caption_tag ? props.caption_tag : 'h4';
        const caption = props.dynamic.caption.hasValue &&  props.dynamic.caption.value  !== '' ?
            <CaptionTag className="ic_caption">{utility._renderDynamicContent(props , 'caption')}</CaptionTag>
            : '';
        const content = caption !== '' || this.render_button(props, 'ic_button') !== '' ?
            <div className="content">{caption} {this.render_button(props, 'ic_button')}</div> : '';
        const overlay_wrapper = <div className="overlay_wrapper">{content}</div>;

        return(<>
            <span className="et_pb_background_pattern"></span>
            <span className="et_pb_background_mask"></span>
            <div className="df_ici_container" ref={this.wrapper}>
                <span className="et_pb_background_pattern"></span>
                <span className="et_pb_background_mask"></span>
                {image} {overlay_wrapper}
            </div>
        </>)
    }
}
export default ImageCarouselItem;