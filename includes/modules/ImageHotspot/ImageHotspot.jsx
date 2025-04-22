// External Dependencies
import React, { Component, Fragment } from 'react';
import utility from '../../../scripts/df_scripts/utilities';
import $ from 'jquery';
import   '../../../public/js/lib/popper.min.js';
import  '../../../public/js/lib/tippy-bundle.min.js';
import tippy from 'tippy.js';
// Internal Dependencies
import './style.css';


class ImageHotspot extends Component {
    static slug = 'difl_imagehotspot';
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
        this.wrapper = React.createRef();
        this.image_hotspot_run = this.image_hotspot_run.bind(this);
        this.getModuleClass = this.getModuleClass.bind(this);
        this.computed = ['tooltip_arrow' , 'tooltip_placement', 'tooltip_animation', 'tooltip_trigger', 'tooltip_custom_maxwidth', 'tooltip_follow_cursor', 
                        'tooltip_interactive', 'tooltip_offset_enable']
    }

    componentDidMount() {
      this._isMounted = true;
      if (this.state.loading === true) {
          this.setState({ loading: false })
      }
     
      if (this.wrapper.current.querySelector('.difl_imagehotspotitem')) {
        this.image_hotspot_run(true, this.wrapper.current.querySelectorAll('.difl_imagehotspotitem'));
      }
    }
    
    componentWillUnmount() {
      this._isMounted = false;
    }
  
    componentDidUpdate(prevProps, prevState) {
      const _this = this;
     
      if (this.state.loading === true) {
        this.setState({ loading: false })
        return;
      }

      if(_this.wrapper.current) {          
        if (_this.wrapper.current.querySelector('.difl_imagehotspotitem')) {
            var  moduleClasses =_this.wrapper.current.parentNode.parentNode.classList;
            let singleClass ='';
            if(moduleClasses){
              singleClass =  _this.getModuleClass(moduleClasses); 
            }
             _this.image_hotspot_run(singleClass, _this.wrapper.current.querySelectorAll('.difl_imagehotspotitem'));          
        }   
      }
  
      for (const index in prevProps) {
        if (prevProps[index] !== _this.props[index]) {
          if (_this.computed.includes(index)) {
            this.setState({ loading: true });
            if(_this.wrapper.current) {
              
              if (_this.wrapper.current.querySelector('.difl_imagehotspotitem')) {
                var  moduleClasses =_this.wrapper.current.parentNode.parentNode.classList;
                let singleClass ='';
                if(moduleClasses){
                  singleClass =  _this.getModuleClass(moduleClasses); 
                }
                 _this.image_hotspot_run(singleClass, _this.wrapper.current.querySelectorAll('.difl_imagehotspotitem'));
              }  

            }  
          }
        }
      }
    }
    
    getModuleClass(moduleClassList= []){
      return Array.prototype.map.call( moduleClassList, ( classValue ) => {
        if ( classValue.indexOf( 'difl_imagehotspot_' ) !== -1 ) {
          return classValue;
        }
      } ).filter(element => element).join();       
    }
    
    image_hotspot_run(moduleClass = '' , selector = '') {
      const props = this.props;
      const _this = this;
      const content = props.content;
     
      // options
      const tooltipStatus = props.tooltip_enable === 'on' ? true : false;
      const tooltipArrow = props.tooltip_arrow === 'on' ? true : false;
      const tooltipAnimation = props.tooltip_animation ? props.tooltip_animation : 'fade'
      const tooltipPlacement = props.tooltip_placement ? props.tooltip_placement : 'top'
      const tooltipTrigger = props.tooltip_trigger ? props.tooltip_trigger : 'mouseenter focus'
      const tooltipFllowCursor = props.tooltip_follow_cursor === 'on' && props.tooltip_trigger ==='mouseenter focus' ? true : false;
      const tooltipInteractive = props.tooltip_interactive === 'on' ? true : false;
      const interactiveBorder = props.tooltip_interactive_border ? parseInt(props.tooltip_interactive_border) : 2;
      const interactiveBounce = props.tooltip_interactive_debounce ? parseInt(props.tooltip_interactive_debounce) : 0;
      const maxWidth = props.tooltip_custom_maxwidth ? parseInt(props.tooltip_custom_maxwidth) : 370;
      const offsetSkidding = props.tooltip_offset_skidding ? parseInt(props.tooltip_offset_skidding) : 0;
      const offsetDistance = props.tooltip_offset_distance ? parseInt(props.tooltip_offset_distance) : 10;
     
        if (selector && tooltipStatus) {
          const options = {
            // UI Theme Defaults
            arrow    : tooltipArrow,
            animation: tooltipAnimation,
            placement: tooltipPlacement,
            trigger  : tooltipTrigger,
            followCursor: tooltipFllowCursor,
            allowHTML: true,
            interactive: tooltipInteractive,
            interactiveBorder: interactiveBorder,
            interactiveDebounce: interactiveBounce,
            maxWidth: maxWidth,
            offset:[offsetSkidding , offsetDistance],
            theme: `.${moduleClass}`  // each module initiat every time create new theme
          };
          [].forEach.call(selector, function (itemSelector) {
              if(itemSelector){
                var hotspotClasses = itemSelector.classList;
                let mainClass ='';
                if(hotspotClasses){
                   mainClass =  Array.prototype.map.call( hotspotClasses, ( classValue ) => {
                    if ( classValue.indexOf( 'difl_imagehotspotitem_' ) !== -1 ) {
                      return classValue;
                    }
                  } ).filter(element => element).join();
                  
                }
                var tooltipContent = itemSelector.querySelector('.difl_marker').dataset.options;
              
                options['content'] =  tooltipContent
                if(undefined !== tooltipContent){
                  options['arrow'] = true;
                  tippy(`.${mainClass}`, options);
                }
                  
              }
          })
        }
    }

    static css(props) {
        const additionalCss = [];     

        utility.df_process_string_attr({
          'props': props,
          'key': 'hotsopt_image_alignment',
          'additionalCss': additionalCss,
          'selector': '%%order_class%% .difl_imagehotspot_container',
          'type': 'text-align'
      });

        // item spacing
        utility.process_margin_padding({
          'props': props,
          'key': 'wrapper_margin',
          'additionalCss': additionalCss,
          'selector': '%%order_class%% .difl_imagehotspot_wrapper',
          'type': 'margin',
          'important': true
         });
        utility.process_margin_padding({
            'props': props,
            'key': 'wrapper_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .difl_imagehotspot_wrapper',
            'type': 'padding'
        });
        utility.process_margin_padding({
          'props': props,
          'key': 'spots_padding',
          'additionalCss': additionalCss,
          'selector': "%%order_class%% .difl_imagehotspotitem",
          'type': 'padding'
        });
        utility.process_margin_padding({
          'props': props,
          'key': 'tooltips_padding',
          'additionalCss': additionalCss,
          'selector': '.tippy-box[data-theme~="%%order_class%%"]',
          'type': 'padding'
        });
    
        utility.df_process_bg({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'spots_background',
            'selector'          : '%%order_class%% .difl_imagehotspotitem'
            // 'important': true
        });   
  
        utility.process_color({
            'props'             : props,
            'key'               : 'spots_icon_color',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .et-pb-icon.df-image-hotspot-icon',
            'type'              : 'color'
        });

        utility.process_range_value({
          'props': props,
          'key': 'spots_icon_size',
          'additionalCss': additionalCss,
          'selector': '%%order_class%% .et-pb-icon.df-image-hotspot-icon',
          'type': 'font-size',
          'important': true
        });

        utility.df_process_bg({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'tooltips_background',
            'selector'          : '.tippy-box[data-theme~="%%order_class%%"]'
        });

        utility.process_color({
            'props'             : props,
            'key'               : 'tooltips_arrow_color',
            'additionalCss'     : additionalCss,
            'selector'          : ".tippy-box[data-theme~='%%order_class%%'][data-placement^='top'] > .tippy-arrow::before",
            'type'              : 'border-top-color'
        });
        utility.process_color({
          'props'             : props,
          'key'               : 'tooltips_arrow_color',
          'additionalCss'     : additionalCss,
          'selector'          : ".tippy-box[data-theme~='%%order_class%%'][data-placement^='bottom'] > .tippy-arrow::before",
          'type'              : 'border-bottom-color'
        });
        utility.process_color({
          'props'             : props,
          'key'               : 'tooltips_arrow_color',
          'additionalCss'     : additionalCss,
          'selector'          : ".tippy-box[data-theme~='%%order_class%%'][data-placement^='right'] > .tippy-arrow::before",
          'type'              : 'border-right-color'
        });
        utility.process_color({
          'props'             : props,
          'key'               : 'tooltips_arrow_color',
          'additionalCss'     : additionalCss,
          'selector'          : ".tippy-box[data-theme~='%%order_class%%'][data-placement^='left'] > .tippy-arrow::before",
          'type'              : 'border-left-color'
        });

        additionalCss.push([{
          selector: ".tippy-box[data-theme~='%%order_class%%'] .tippy-content p",
          declaration: `padding-bottom: 0px;`
      }]);

        return additionalCss;
    }

    contentOutput(props) {
        return props.content.length !== 0 ? props.content : '';
    }
    
    render_image(props, key) {
        const default_image = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTA4MCIgaGVpZ2h0PSI1NDAiIHZpZXdCb3g9IjAgMCAxMDgwIDU0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZmlsbD0iI0VCRUJFQiIgZD0iTTAgMGgxMDgwdjU0MEgweiIvPgogICAgICAgIDxwYXRoIGQ9Ik00NDUuNjQ5IDU0MGgtOTguOTk1TDE0NC42NDkgMzM3Ljk5NSAwIDQ4Mi42NDR2LTk4Ljk5NWwxMTYuMzY1LTExNi4zNjVjMTUuNjItMTUuNjIgNDAuOTQ3LTE1LjYyIDU2LjU2OCAwTDQ0NS42NSA1NDB6IiBmaWxsLW9wYWNpdHk9Ii4xIiBmaWxsPSIjMDAwIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz4KICAgICAgICA8Y2lyY2xlIGZpbGwtb3BhY2l0eT0iLjA1IiBmaWxsPSIjMDAwIiBjeD0iMzMxIiBjeT0iMTQ4IiByPSI3MCIvPgogICAgICAgIDxwYXRoIGQ9Ik0xMDgwIDM3OXYxMTMuMTM3TDcyOC4xNjIgMTQwLjMgMzI4LjQ2MiA1NDBIMjE1LjMyNEw2OTkuODc4IDU1LjQ0NmMxNS42Mi0xNS42MiA0MC45NDgtMTUuNjIgNTYuNTY4IDBMMTA4MCAzNzl6IiBmaWxsLW9wYWNpdHk9Ii4yIiBmaWxsPSIjMDAwIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz4KICAgIDwvZz4KPC9zdmc+Cg==';
       
        if ( props.dynamic[key].hasValue){
          const ImageObject = utility.df_collect_dynamic_content(key, props);
          return utility.df_render_dynamic_image(ImageObject, function (ImageUrl) {
              return (
                      <img className={"hotspot_image"} src={ImageUrl} alt={'Hotspot Image'} />
                    );
          });
        }else{
          return <img className={"hotspot_image"} src={default_image} alt="Hotspot Image"/>
        }

    }
    
    render() {
        const props = this.props;
        return (
            <Fragment>
              {this.state.loading === false ?
                <div className="difl_imagehotspot_container" ref={this.wrapper}>
                    <div className="difl_imagehotspot_wrapper">
                        <div className="difl_image_wrapper">
                            {this.render_image(props, 'hotsopt_image')}
                        </div>
                        {this.contentOutput(props)}
                    </div>
                </div>:
                <div className="et-fb-preloader et-fb-preloader__loading">
                    <div className="et-fb-loader"/>
                </div>
              }
            </Fragment>
        );
    }
}
export default ImageHotspot;