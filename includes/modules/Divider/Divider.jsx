// External Dependencies
import React, { Component } from 'react';
import utility from '../../../scripts/df_scripts/utilities';
import lottie from '../../../public/js/lib/lottie.js';
// Internal Dependencies
import './style.css';


class Divider extends Component {
    static slug = 'difl_divider';

    constructor(props) {
        super(props);

        this.state = {
            lottie: null
        }
        this.wrapper = React.createRef();
        this.computed = [ 'autoplay', 'loop', 'renderer', 'separetor_type', 'icon_image_alignment' ];
    }
    componentDidUpdate(prevProps, prevState) {
        const _this = this;
        const props = _this.props;
  
        if(props.separetor_type === 'lottie'){
            if( this.wrapper.current.querySelector( '.difl-divider-lottie-image' ) ) {
                this.lottieInit( this.wrapper.current.querySelector( '.difl-divider-lottie-image' ) );
            }
            if( 
                ( prevProps.lottie_file_options !== props.lottie_file_options ) || 
                ( prevProps.external_file !== props.external_file) ||
                ( prevProps.upload !== props.upload )
            ) {
                _this.reInitLottie();
            }
    
            if( _this.state.lottie ) {
                for (const index in prevProps) {
                    if (prevProps[index] !== props[index]) {
                        if (_this.computed.includes(index)) {
                            _this.reInitLottie();
                        }
                    }
                }
                
                this.state.lottie.setSpeed( parseInt( props.speed ) )
                
                if( props.direction_reverse === 'on' ) {
                    this.state.lottie.setDirection( -1 )
                } else {
                    this.state.lottie.setDirection( 1 )
                }
            }
        }   
    }

    lottieInit = ( selector ) => {
        const props = this.props;
        let path = '';
        if( this.state.lottie ) return;

        if( props.lottie_file_options !== 'media') {
            path = props.external_file;
        } else if ( props.upload !== '' ) {
            path = props.upload;
        }
        const _lottie = lottie.loadAnimation({
            container: selector, // the dom element that will contain the animation
            renderer: props.renderer ? props.renderer : 'svg',
            loop: props.loop === 'on' ? true : false,
            autoplay: true,
            path: path // the path to the animation json
        });

        this.setState( { lottie: _lottie } )
    }

    reInitLottie = () => {
        this.state.lottie.destroy();
        this.setState( { lottie: null } )
    }
    static css (props) {
        const additionalCss = [];
        utility.df_process_string_attr({
            'props': props,
            'key': 'line_alignment',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .difl-divider-wrapper-separator .difl-divider-wrapper-separator-divider',
            'type': 'text-align',
          });
        if(props.separetor_type && 'no' !== props.separetor_type){
            utility.df_process_string_attr({
                'props': props,
                'key': 'line_placement',
                'additionalCss': additionalCss,
                'selector': '%%order_class%% .difl-divider-content-wrapper',
                'type': 'align-items',
                'default_value': 'center'
            });
        }
    
         // Icon Design
         utility.df_process_bg({
            'props': props,
            'additionalCss': additionalCss,
            'key': 'icon_background',
            'selector': '%%order_class%% .difl-divider-icon'
        }); 
        // Spacing
        utility.process_margin_padding({
            'props': props,
            'key': 'separetor_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .difl-divider-icon',
            'type': 'margin'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'separetor_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .difl-divider-icon',
            'type': 'padding'
        }); 
  
        if(props.separetor_type === 'icon'){
            utility.process_range_value({
                'props': props,
                'key': 'icon_size',
                'additionalCss': additionalCss,
                'selector': '%%order_class%% .et-pb-icon.difl-divider-icon',
                'type': 'font-size',
                'important' : 'true'
            });
            utility.process_color({
                'props': props,
                'key': 'icon_color',
                'additionalCss': additionalCss,
                'selector': '%%order_class%% .et-pb-icon.difl-divider-icon',
                'type': 'color'
            }) 
        }
        utility.process_range_value({
            'props'             : props,
            'key'               : 'image_as_icon_width',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .difl-divider-icon img',
            'type'              : 'width',
            'important'         : true
        });

        utility.process_range_value({
            'props'             : props,
            'key'               : 'lottie_image_width',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .difl-divider-lottie-image.difl-divider-icon',
            'type'              : 'width',
            'default_value'     : '80px',
            'important'         : true
        });

        const divider_type = props.divider_type ?  props.divider_type : 'solid'; 
        let border_size_value = '';
        if(divider_type === 'gradient' ||  divider_type === 'custom'){
            border_size_value = 'height';
        }else if(divider_type === 'curvedtop'){
            border_size_value = 'border-bottom-width';
        }else{
            border_size_value = 'border-top-width';
        }

        utility.process_range_value({
            'props': props,
            'key': 'divider_line_width',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .difl-divider-wrapper-separator .difl-divider-wrapper-separator-divider .difl-divider-left-side hr, %%order_class%% .difl-divider-wrapper-separator .difl-divider-wrapper-separator-divider .difl-divider-right-side hr',
            'type': border_size_value,
            'important' : 'true'
        });

        if( !('gradient' === divider_type  ||  'custom' === divider_type ) ){
            utility.process_color({
                'props': props,
                'key': 'divider_line_color',
                'additionalCss': additionalCss,
                'selector': '%%order_class%% .difl-divider-wrapper-separator .difl-divider-wrapper-separator-divider .difl-divider-left-side hr, %%order_class%% .difl-divider-wrapper-separator .difl-divider-wrapper-separator-divider .difl-divider-right-side hr',
                'type': divider_type === 'curvedtop' ? 'border-bottom-color' : 'border-top-color'
            })
            utility.process_color({
                'props': props,
                'key': 'divider_right_line_color',
                'additionalCss': additionalCss,
                'selector': '%%order_class%% .difl-divider-wrapper-separator .difl-divider-wrapper-separator-divider .difl-divider-right-side hr',
                'type': divider_type === 'curvedtop' ? 'border-bottom-color' : 'border-top-color'
            })
        }

        //if(( 'no' !==props.separetor_type )){
            utility.process_range_value({
                'props': props,
                'key': 'divider_left_line_width',
                'additionalCss': additionalCss,
                'selector': '%%order_class%%  .difl-divider-wrapper-separator .difl-divider-wrapper-separator-divider .difl-divider-left-side',
                'type': 'width',
                'important' : 'true'
            });
            utility.process_range_value({
                'props': props,
                'key': 'divider_right_line_width',
                'additionalCss': additionalCss,
                'selector': '%%order_class%%  .difl-divider-wrapper-separator .difl-divider-wrapper-separator-divider .difl-divider-right-side',
                'type': 'width',
                'important' : 'true'
            });
        //}
       
        //if('no'!== props.separetor_type){
            utility.process_range_value({
                'props': props,
                'key': 'divider_line_spacing',
                'additionalCss': additionalCss,
                'selector': '%%order_class%% .difl-divider-wrapper-separator .difl-divider-wrapper-separator-divider .difl-divider-left-side',
                'type': 'padding-right',
                'important' : 'true'
            });
            utility.process_range_value({
                'props': props,
                'key': 'divider_line_spacing',
                'additionalCss': additionalCss,
                'selector': '%%order_class%% .difl-divider-wrapper-separator .difl-divider-wrapper-separator-divider .difl-divider-right-side',
                'type': 'padding-left',
                'important' : 'true'
            });
        //}
        if( 'no' !== props['use_multiple_line'] ){
            utility.process_range_value({
                'props': props,
                'key': 'multiple_line_gap',
                'additionalCss': additionalCss,
                'selector': '%%order_class%% .difl-divider-wrapper-separator .difl-divider-left hr:not(:last-child), %%order_class%% .difl-divider-wrapper-separator .difl-divider-right hr:not(:last-child)',
                'type': 'margin-bottom',
                'important' : 'true'
            });
        }


        if('gradient' ===  divider_type || 'custom' === divider_type ){
            utility.df_process_bg({
                'props'             : props,
                'additionalCss'     : additionalCss,
                'key'               : 'divider_line_bg',
                'selector'          : '%%order_class%% .difl-divider-'+ divider_type +' .difl-divider-left-side hr, %%order_class%% .difl-divider-'+ divider_type +' .difl-divider-right-side hr'
            });
            utility.df_process_bg({
                'props'             : props,
                'additionalCss'     : additionalCss,
                'key'               : 'divider_right_line_bg',
                'selector'          : '%%order_class%% .difl-divider-'+ divider_type +' .difl-divider-right-side hr'
            });
        }

        // icon font family
        utility.process_icon_font_style({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'font_icon',
            'selector'          : '%%order_class%% .et-pb-icon.difl-divider-icon'
        })
        utility.process_range_value({
            'props': props,
            'key': 'divider_width',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .difl-divider-wrapper-separator .difl-divider-wrapper-separator-divider .difl-divider-inner',
            'type': 'width',
            'default_value': '400px',
          });
        return additionalCss;
    }

    render_image_icon(props) {
        const utils = window.ET_Builder.API.Utils;
        let icon = '';
       
        if (props['separetor_type'] === 'icon') {
          if (!props['font_icon'] || props['font_icon'] === '') {
            icon = '1'
          } else {
            icon = utils.processFontIcon(props['font_icon'])
          }
        }
    
        if (props['use_image_as_icon'] === 'on' && props['separetor_type'] === 'icon') {
    
            return ( <div className="difl-divider-icon"><img className="separator-image-icon" src={this.props.image_as_icon} atl={this.props.image_alt_text} /></div> )
        } 
        else{
            return ( <span className="et-pb-icon difl-divider-icon">{icon}</span> )
        }
      }

    render() {
        const props = this.props;
        const utils = window.ET_Builder.API.Utils;
        
        const divider_type = props.divider_type ?  props.divider_type : 'solid'; 
        const IconHtml = this.render_image_icon(props);

        const TitleLevel = props.title_tag ? props.title_tag : 'h3';
        const Title = props.separetor_type === 'text' && props.dynamic.title.hasValue ?  <div className="difl-divider-icon"><TitleLevel className="difl-divider-icon-text">{utility._renderDynamicContent(props , 'title')}</TitleLevel></div> : <div className="difl-divider-icon"><TitleLevel className="difl-divider-icon-text">Title</TitleLevel></div>;
        
        let ContentHtml = '';
        if(props.separetor_type === 'text'){
            ContentHtml = Title;
        }else if(props.separetor_type === 'icon'){
            ContentHtml = IconHtml;
        }else if(props.separetor_type === 'lottie'){  
            ContentHtml = <div className="difl-divider-lottie-image difl-divider-icon"></div>;    
        }else{
            ContentHtml = '';
        }

        ContentHtml = '' !== ContentHtml ? <div className="difl-divider-icon-container">
                                                <div className="difl-divider-icon-wrap">
                                                    {ContentHtml} 
                                                </div>
                                            </div>: ''
        const icon_image_alignment = props.icon_image_alignment && '' !== props.icon_image_alignment ? props.icon_image_alignment : 'center';                                   
        let hr_content ='';                                                                   
   
        const line_number =  'on' ===  props.use_multiple_line && props.line_number ? props.line_number: 1 ;
        
        for(var i=1; i<=line_number; i++){
            hr_content += '<hr/>';
        }  
        
        return  ( <div className={"difl-divider-container difl-divider-" + divider_type} ref={this.wrapper}>
                    <div className="difl-divider-wrapper">
                            <div className="difl-divider-wrapper-separator">
                                <div className="difl-divider-wrapper-separator-divider">
                                    <div className="difl-divider-inner">
                                        
                                        <div className={"difl-divider-content-wrapper icon-type-" + props.separetor_type }>
                                            {'left' === icon_image_alignment ? ContentHtml : ''}
                                            <div className="difl-divider-left difl-divider-left-side" dangerouslySetInnerHTML={{__html: hr_content}}/>
                                        
                                             {'center' === icon_image_alignment ? ContentHtml : ''}

                                            <div className="difl-divider-right difl-divider-right-side"dangerouslySetInnerHTML={{__html: hr_content}}/>
                                            {'right' === icon_image_alignment ? ContentHtml : ''}
                                        </div>
                                    
                                    </div>

                                </div>

                            </div>

                        <div className="difl-clearfix"></div>

                    </div>

                </div>
            );
    }
}

export default Divider;