// External Dependencies
import React, { Component } from 'react';
import utility from '../../../scripts/df_scripts/utilities';
// Internal Dependencies
import './style.css';

class ImageHotspotItem extends Component {
    static slug = 'difl_imagehotspotitem';
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            animated_style :'',
            pulse_class : ''
          }
        this.wrapper = React.createRef();
        this.add_class_child_div = this.add_class_child_div.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;   
        this.add_class_child_div(); 
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidUpdate(prevProps, prevState) {
    
        this.add_class_child_div()
        if (prevProps !== this.props) {
            
            this.add_class_child_div()
        
        } 
    }
    add_class_child_div() {
        const props = this.props;
        if(props.spot_animation_style){
        
            let animation_class='';
            if (props.spot_animation === 'on' && props.spot_animation_style === 'style_1'){
                animation_class = 'pulsating';
            }
            if (props.spot_animation === 'on' && props.spot_animation_style === 'style_2'){
                animation_class = 'pulsating_2';
            }
            if (props.spot_animation === 'on' && props.spot_animation_style === 'style_3'){
                animation_class = 'pulse';
            }
            if (props.spot_animation === 'on' && props.spot_animation_style === 'style_4'){
                animation_class = 'pulse_2';
            }
            if (props.spot_animation === 'on' && props.spot_animation_style === 'style_5'){
                animation_class ='web_pulse-1';
            }    
            if (props.spot_animation === 'on' && props.spot_animation_style === 'style_6'){
                animation_class ='pulse_key';
            }        
            if(animation_class){
                this.wrapper.current.parentElement.parentElement.classList.add(animation_class); 
            }   
        }
    }

    static css(props) {
        const additionalCss = [];

        utility.df_process_bg({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'spot_background',
            'selector'          : '.difl_imagehotspot %%order_class%%',
            'important': true
        });  

        if ('text' === props['spot_type']) {
            additionalCss.push([{
                selector: ".difl_imagehotspot %%order_class%%",
                declaration: `width: auto; height:auto`
            }]);
        }

        if(props['spot_animation'] === 'on'){
            const spot_animation_style = props.spot_animation_style ? props.spot_animation_style : 'style_1';
            if( 'style_1' === spot_animation_style ||'style_2' ===  spot_animation_style  ){
                utility.process_color({
                    'props': props,
                    'key': 'animation_color',
                    'additionalCss': additionalCss,
                    'selector': '.difl_imagehotspot %%order_class%% , .difl_imagehotspot %%order_class%%.pulsating:before , .difl_imagehotspot %%order_class%%.pulsating_2:before',
                    'type': 'background-color',
                    'important': true
                })

            }

            if( 'style_3' === spot_animation_style ){
                utility.process_color({
                    'props': props,
                    'key': 'animation_color',
                    'additionalCss': additionalCss,
                    'selector': '.difl_imagehotspot %%order_class%%.pulse:before , .difl_imagehotspot %%order_class%%.pulse:after',
                    'type': 'border-color',
                    'important': true
                })
            }

            if( 'style_4' === spot_animation_style  || 'style_5' === spot_animation_style ){
                utility.process_color({
                    'props': props,
                    'key': 'animation_color',
                    'additionalCss': additionalCss,
                    'selector': '.difl_imagehotspot %%order_class%%.pulse_2 , .difl_imagehotspot %%order_class%%.web_pulse-1',
                    'type': 'color'
                })
            }
            // Assuming hex is a string containing a color in various formats (e.g., "#RRGGBB", "RRGGBB", "#RGB", "RGB")
            const hex = props['animation_color'];

            // Regular expression to match a valid color string
            const colorRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;

            // Use RegExp.exec to extract the RGB values
            const match = colorRegex.exec(hex);



            if( 'style_7' === spot_animation_style ){
                utility.process_color({
                    'props': props,
                    'key': 'animation_color',
                    'additionalCss': additionalCss,
                    'selector': '.difl_imagehotspot %%order_class%% .wheel:before',
                    'type': 'background-color',
                    'important': true
                })
                utility.process_color({
                    'props': props,
                    'key': 'animation_color',
                    'additionalCss': additionalCss,
                    'selector': '.difl_imagehotspot %%order_class%% .wheel',
                    'type': 'border-color',
                    'important': true
                })
                if (match) {
                    const r = parseInt(match[1], 16);
                    const g = parseInt(match[2], 16);
                    const b = parseInt(match[3], 16);
                    additionalCss.push([{
                        selector: ".difl_imagehotspot %%order_class%% .wheel",
                        declaration: `box-shadow: inset 0 0 4px 2px rgba(${r},${g}, ${b} , 0.6);`
                    }]);
                }
             

            }

            if( 'style_8' === spot_animation_style ){
                utility.process_color({
                    'props': props,
                    'key': 'animation_color',
                    'additionalCss': additionalCss,
                    'selector': '.difl_imagehotspot %%order_class%% .sq',
                    'type': 'background-color',
                    'important': true
                })

                if (match) {
                    const r = parseInt(match[1], 16);
                    const g = parseInt(match[2], 16);
                    const b = parseInt(match[3], 16);
                    additionalCss.push([{
                        selector: ".difl_imagehotspot %%order_class%% .sq",
                        declaration: `box-shadow: inset 0 0 8px 6px rgba(${r},${g}, ${b} , 0.6);`
                    }]);
                }

              

            }
      
        }

        utility.process_range_value({
            'props': props,
            'key': 'left_position',
            'additionalCss': additionalCss,
            'selector': '.difl_imagehotspot %%order_class%%',
            'type': 'left',
            'important' : 'true'
        });
        utility.process_range_value({
            'props': props,
            'key': 'top_position',
            'additionalCss': additionalCss,
            'selector': '.difl_imagehotspot %%order_class%%',
            'type': 'top',
            'important' : 'true'
        });
      
        if(props['left_position'] || props['top_position']){
            
            utility.process_transform_props({
                'props'             : props,
                'additionalCss'     : additionalCss,
                'oposite'           : true,
                'selector'          : '.difl_imagehotspot %%order_class%%',
                'important'         :true,
                'transforms'        : [
                    {
                        'type' : 'translateX',
                        'key'  : 'left_position',
                        'unit' : '%',
                        'default_value': '-50%'
                    },
                    {
                        'type' : 'translateY',
                        'key'  : 'top_position',
                        'unit' : '%',
                        'default_value': '-30%'
                    }
                ]
            });
        }
        const variable_width = props.variable_width ? props.variable_width : 'on';

        if(variable_width === 'on'){
            utility.process_range_value({
                'props': props,
                'key': 'spot_width',
                'additionalCss': additionalCss,
                'selector': '.difl_imagehotspot %%order_class%%',
                'type': 'width',
                'default_value': '50px',
                'important' : 'true'
            });
            utility.process_range_value({
                'props': props,
                'key': 'spot_width',
                'additionalCss': additionalCss,
                'selector': '.difl_imagehotspot %%order_class%%',
                'type': 'height',
                'default_value': '50px',
                'important' : 'true'
            });
        }
         // Icon Design
         const spotType = props.spot_type ? props.spot_type : 'icon';
         if(  spotType === 'icon'){
            utility.process_range_value({
                'props': props,
                'key': 'icon_size',
                'additionalCss': additionalCss,
                'selector': '.difl_imagehotspot %%order_class%% .et-pb-icon.df-image-hotspot-icon',
                'type': 'font-size',
                'important': true
            });
            utility.process_color({
                'props': props,
                'key': 'icon_color',
                'additionalCss': additionalCss,
                'selector': '.difl_imagehotspot %%order_class%% .et-pb-icon.df-image-hotspot-icon',
                'type': 'color',
                'important': true
            })
           
        }
        utility.process_range_value({
            'props'             : props,
            'key'               : 'image_as_icon_width',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% img.df-image-hotspot-icon',
            'type'              : 'width',
            'important'         : true
        });

        utility.process_range_value({
            'props'             : props,
            'key'               : 'image_as_icon_width',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% img.df-image-hotspot-icon',
            'type'              : 'height',
            'important'         : true
        });

        utility.process_margin_padding({
            'props': props,
            'key': 'spot_padding',
            'additionalCss': additionalCss,
            'selector': '.difl_imagehotspot %%order_class%%',
            'type': 'padding'
        });

        utility.process_icon_font_style({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'font_icon',
            'selector'          : '%%order_class%% .et-pb-icon.df-image-hotspot-icon'
        })

        return additionalCss;
    }
    render_icon_or_image(props) {
        const utils = window.ET_Builder.API.Utils;
        let icon = '';
        const spotType = props['spot_type'] ? props['spot_type'] : 'icon'
        if (spotType === 'icon') {
          if (!props['font_icon'] || props['font_icon'] === '') {
            icon = 'P'
          } else {
            icon = utils.processFontIcon(props['font_icon'])
          }
        }
        if (spotType === 'icon' && props.use_image_as_icon === 'on') {
            const image = props.dynamic.image_as_icon;
            if (image.loading) {
              // Let Divi render the loading placeholder.
              return image.render();
            }
            const default_image = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTA4MCIgaGVpZ2h0PSI1NDAiIHZpZXdCb3g9IjAgMCAxMDgwIDU0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZmlsbD0iI0VCRUJFQiIgZD0iTTAgMGgxMDgwdjU0MEgweiIvPgogICAgICAgIDxwYXRoIGQ9Ik00NDUuNjQ5IDU0MGgtOTguOTk1TDE0NC42NDkgMzM3Ljk5NSAwIDQ4Mi42NDR2LTk4Ljk5NWwxMTYuMzY1LTExNi4zNjVjMTUuNjItMTUuNjIgNDAuOTQ3LTE1LjYyIDU2LjU2OCAwTDQ0NS42NSA1NDB6IiBmaWxsLW9wYWNpdHk9Ii4xIiBmaWxsPSIjMDAwIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz4KICAgICAgICA8Y2lyY2xlIGZpbGwtb3BhY2l0eT0iLjA1IiBmaWxsPSIjMDAwIiBjeD0iMzMxIiBjeT0iMTQ4IiByPSI3MCIvPgogICAgICAgIDxwYXRoIGQ9Ik0xMDgwIDM3OXYxMTMuMTM3TDcyOC4xNjIgMTQwLjMgMzI4LjQ2MiA1NDBIMjE1LjMyNEw2OTkuODc4IDU1LjQ0NmMxNS42Mi0xNS42MiA0MC45NDgtMTUuNjIgNTYuNTY4IDBMMTA4MCAzNzl6IiBmaWxsLW9wYWNpdHk9Ii4yIiBmaWxsPSIjMDAwIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz4KICAgIDwvZz4KPC9zdmc+Cg==';
       
            return ( <img className="df-image-hotspot-icon" src={ props.dynamic.image_as_icon.hasValue  ? utility._renderDynamicContent(props , 'image_as_icon', false) : default_image } atl={this.props.image_alt_text} /> )
        } 
        else{
            return ( <span className="et-pb-icon df-image-hotspot-icon">{icon}</span> )
        }
    }

    render() {
        const props = this.props;
        const spotText = props.dynamic.spot_text.hasValue  ? utility._renderDynamicContent( props, 'spot_text') : '';
        const IconHtml = this.render_icon_or_image(props);
        const tooltip_content = props.content().props.content && props.content().props.content !== '' ? props.content().props.content.replace(/<p[^>]*>(?:\s|&nbsp;)*<\/p>/g, '') : null;
        const spot_type_class =  props['spot_type'] ? 'spot_type_' + props['spot_type'] : '';
        const spot_ani_style_class =  props['spot_animation'] === 'on' && (props['spot_animation_style'] === 'style_7') ? ' wheel' : props['spot_animation'] === 'on' && props['spot_animation_style'] === 'style_8'? ' sq':'' ;
        return (
            <div className={"difl_marker " + spot_type_class + spot_ani_style_class} data-options={tooltip_content} ref={this.wrapper}>
                { 
                    ('text' === props['spot_type'] ) ?
                    <div className={"difl_marker_wrapper difl_image_marker"}> {spotText} </div>
                    : 
                    <div className={"difl_marker_wrapper difl_image_marker"}> {IconHtml} </div> 
                }
                 
            </div>      
        )
    }

}
export default ImageHotspotItem;