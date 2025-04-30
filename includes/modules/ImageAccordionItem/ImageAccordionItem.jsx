// External Dependencies
import React, { Component } from 'react';
import utility from '../../../scripts/df_scripts/utilities';
// Internal Dependencies
import './style.css';

class ImageAccordionlItem extends Component {
    static slug = 'difl_imageaccordionitem';
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            description: '',
        }
        this.wrapper = React.createRef();
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;

        if (this.wrapper.current) {
            const address = this.wrapper.current.parentNode.parentNode.dataset.address;
            const parent_address = this.wrapper.current.parentNode.parentNode.parentNode.dataset.address;
          
            if (address === parent_address) {
                this.wrapper.current.parentNode.parentNode.classList.add('df_ia_active');
                //this.wrapper.current.parentNode.parentNode.style.flex = 10;
            }

            if (this.props.description) {
                const descriptionText = this.props.description
                const newDescription = descriptionText.replace(/<p>(.*?)<\/p>/, '$1');
                this.setState({ description: newDescription })
            }

        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidUpdate(prevProps, prevState) {

    }

    static css(props) {
        const additionalCss = [];

        utility.df_process_bg({
            'props': props,
            'key': 'ia_image',
            'additionalCss': additionalCss,
            'selector': '.difl_imageaccordion %%order_class%%'
        });
        // overlay 
        utility.df_process_bg({
            'props': props,
            'additionalCss': additionalCss,
            'key': 'ia_overlay_background',
            'selector': '.difl_imageaccordion %%order_class%% .overlay_wrapper'
        });
        utility.df_process_btn_styles({
            'props': props,
            'additionalCss': additionalCss,
            'key': 'ia_btn',
            'selector': '%%order_class%% .df_ia_button',
            'align_container': '.difl_imageaccordion %%order_class%% .df_ia_button_wrapper'
        });
        //button background
        utility.df_process_bg({
            'props': props,
            'additionalCss': additionalCss,
            'key': 'ia_btn_background',
            'selector': '.difl_imageaccordion %%order_class%% .df_ia_button'
        });
        // Icon Design
        if(props.use_icon === 'on'){

            utility.df_process_bg({
                'props': props,
                'additionalCss': additionalCss,
                'key': 'icon_background',
                'selector': '.difl_imageaccordion %%order_class%% .df-image-accordion-icon'
            });   
            utility.process_range_value({
                'props': props,
                'key': 'icon_size',
                'additionalCss': additionalCss,
                'selector': '.difl_imageaccordion %%order_class%% .et-pb-icon.df-image-accordion-icon',
                'type': 'font-size',
                'important' : 'true'
            });
            utility.process_color({
                'props': props,
                'key': 'icon_color',
                'additionalCss': additionalCss,
                'selector': '.difl_imageaccordion %%order_class%% .et-pb-icon.df-image-accordion-icon',
                'type': 'color'
            })
            // Spacing
            utility.process_margin_padding({
                'props': props,
                'key': 'icon_margin',
                'additionalCss': additionalCss,
                'selector': '.difl_imageaccordion %%order_class%% .df-image-accordion-icon',
                'type': 'margin'
            });
            utility.process_margin_padding({
                'props': props,
                'key': 'icon_padding',
                'additionalCss': additionalCss,
                'selector': '.difl_imageaccordion %%order_class%% .df-image-accordion-icon',
                'type': 'padding'
            });  
        }
        utility.process_range_value({
            'props'             : props,
            'key'               : 'image_as_icon_width',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% img.df-image-accordion-icon',
            'type'              : 'width',
            'important'         : true
        });
        //content Alignment 
        utility.df_process_string_attr({
            'props': props,
            'key': 'content_alignment',
            'additionalCss': additionalCss,
            'selector': '.difl_imageaccordion %%order_class%% .content',
            'type': 'text-align',
        });
        // content spacing
        utility.process_margin_padding({
            'props': props,
            'key': 'content_margin',
            'additionalCss': additionalCss,
            'selector': '.difl_imageaccordion %%order_class%% .content',
            'type': 'margin'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'content_padding',
            'additionalCss': additionalCss,
            'selector': '.difl_imageaccordion %%order_class%% .content',
            'type': 'padding'
        });
        if (props.vertical_align) {
            additionalCss.push([{
                selector: '.difl_imageaccordion %%order_class%% .overlay_wrapper',
                declaration: `justify-content: ${props.vertical_align};`,
            }]);
        }
        // button spacing
        utility.process_margin_padding({
            'props': props,
            'key': 'button_margin',
            'additionalCss': additionalCss,
            'selector': '.difl_imageaccordion %%order_class%% .df_ia_button_wrapper',
            'type': 'margin'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'button_padding',
            'additionalCss': additionalCss,
            'selector': '.difl_imageaccordion %%order_class%% .df_ia_button',
            'type': 'padding'
        });
        utility.process_icon_font_style({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'font_icon',
            'selector'          : '%%order_class%% .et-pb-icon.df-image-accordion-icon'
        })
        return additionalCss;
    }

    // get transform values
    static df_transform_values(key = 'bottom') {
        const transfor_values = {
            'top': {
                'default': 'translateY(-60px)',
                'hover': 'translateY(0px)'
            },
            'bottom': {
                'default': 'translateY(60px)',
                'hover': 'translateY(0px)'
            },
            'left': {
                'default': 'translateX(-60px)',
                'hover': 'translateX(0px)'
            },
            'right': {
                'default': 'translateX(60px)',
                'hover': 'translateX(0px)'
            },
            'center': {
                'default': 'scale(0)',
                'hover': 'scale(1)'
            },
            'top_right': {
                'default': 'translateX(50px) translateY(-50px)',
                'hover': 'translateX(0px) translateY(0px)'
            },
            'top_left': {
                'default': 'translateX(-50px) translateY(-50px)',
                'hover': 'translateX(0px) translateY(0px)'
            },
            'bottom_right': {
                'default': 'translateX(50px) translateY(50px)',
                'hover': 'translateX(0px) translateY(0px)'
            },
            'bottom_left': {
                'default': 'translateX(-50px) translateY(50px)',
                'hover': 'translateX(0px) translateY(0px)'
            },
        };
        return transfor_values[key];
    }
    render_button(props, key) {
        const button_text = key + '_button_text';
        const button_url = key + '_button_url';

        if (props.dynamic[button_text].hasValue || props.dynamic[button_url].hasValue ) {
            return (
                <div className="df_ia_button_wrapper">
                    <a className="df_ia_button" href={utility._renderDynamicContent( props, button_url ,false)}>{utility._renderDynamicContent( props, button_text)}</a>
                </div>
            )
        } else return '';
    }
    render_image(props) {
        const utils = window.ET_Builder.API.Utils;
        let icon = '';
       
        if (props['use_icon'] && props['use_icon'] === 'on') {
          if (!props['font_icon'] || props['font_icon'] === '') {
            icon = '1'
          } else {
            icon = utils.processFontIcon(props['font_icon'])
          }
        }
    
        if (props['use_image_as_icon'] === 'on' && props['use_icon'] === 'on') {
            const image = props.dynamic.image_as_icon;
            if (image.loading) {
              // Let Divi render the loading placeholder.
              return image.render();
            }
            return ( <img className="df-image-accordion-icon" src={utility._renderDynamicContent( props, 'image_as_icon', false)} atl={this.props.image_alt_text} /> )
        } 
        else{
            return ( <span className="et-pb-icon df-image-accordion-icon">{icon}</span> )
        }
      }
    render_content(props) {
        if (this.state.description) {
            return { __html: this.state.description }
        }
    }

    handleClick(e) {
        const target = e.currentTarget;
        const address = target.parentNode.parentNode.dataset.address;
        const parent = target.parentNode.parentNode.parentNode;
        parent.dataset.address = address
    }

    render() {
        const props = this.props;
        const IconHtml = this.render_image(props);
        const TitleLevel = props.title_tag ? props.title_tag : 'h4';
        const SubTitleLevel = props.sub_title_tag ? props.sub_title_tag : 'h5';

        const Title =  props.dynamic.title.hasValue  ? <TitleLevel className="df_ia_title">{utility._renderDynamicContent( props, 'title')}</TitleLevel> : '';
        const SubTitle =  props.dynamic.sub_title.hasValue  ? <SubTitleLevel className="df_ia_sub_title">{utility._renderDynamicContent( props, 'sub_title')}</SubTitleLevel> : '';
        const Description = props.dynamic.description.hasValue ?
            //<div className="df_ia_description" dangerouslySetInnerHTML={this.render_content(props)} /> : '';
            <div className="df_ia_description"> {utility._renderDynamicContent( props, 'description')} </div> : '';

        const content = <div className="content">{IconHtml} {Title} {SubTitle} {Description} {this.render_button(props, 'ia_button')} </div>;
        const overlay_wrapper = <div className="overlay_wrapper">{content} </div>;

        const image = <div className="accordion-item"> <div className="overlay">{overlay_wrapper}</div> </div>;

        return (<div className="df_iai_container" ref={this.wrapper} onClick={(e) => this.handleClick(e)}>
            {image}
        </div>)
    }
}
export default ImageAccordionlItem;