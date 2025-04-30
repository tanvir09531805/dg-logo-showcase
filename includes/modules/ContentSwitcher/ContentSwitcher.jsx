// External Dependencies
import React, { Component, Fragment } from 'react';
import utility from '../../../scripts/df_scripts/utilities';
import axios from 'axios';
import $ from 'jquery';
// Internal Dependencies
import './style.css';

class ContentSwitcher extends Component {

  static slug = 'difl_contentswitcher';

  _isMounted = false;

  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
    this.state = {
      loading: false,
      primary_library_content: '',
      secondary_library_content: '',
      isActive: false,
      isButtonActive: false
    }

    this.wrapper = React.createRef();
    this.handleClick = this.handleClick.bind(this);
    this.buttonClick = this.buttonClick.bind(this);
    this.toggleControl = this.toggleControl.bind(this);
    
    this.computedType = ['content_switcher_type' , 'switcher_type' , 'library_id_primary', 'library_id_secondary','primary_badge_arrow_placement' ,'secodary_badge_arrow_placement'];
  }

  componentDidMount() {
    this._isMounted = true;  
  }

  componentWillUnmount() {
    this._isMounted = false;   
  }

  static css(props) {
    const utils = window.ET_Builder.API.Utils;
    const additionalCss = [];

    additionalCss.push([{
        selector:    '.difl_contentswitcher%%order_class%% .df-cs-switch.active .df-cs-icon-wrapper .et-pb-icon',
        declaration: `font-familty: ETmodules`,
        important : true
    }]);

    utility.df_process_bg({
      'props'             : props,
      'additionalCss'     : additionalCss,
      'key'               : 'switcher_content_bg',
      'selector'          : '%%order_class%% .df-cs-content-section , %%order_class%% .notice'
    });

    utility.df_process_bg({
      'props'             : props,
      'additionalCss'     : additionalCss,
      'key'               : 'switcher_bar_bg',
      'selector'          : '%%order_class%% .df-cs-switch-wrapper'
    });

    utility.df_process_bg({
      'props'             : props,
      'additionalCss'     : additionalCss,
      'key'               : 'normal_switcher_control_bg',
      'selector'          : '%%order_class%% .df-input-label .df-cs-slider'
    });
    utility.df_process_bg({
      'props'             : props,
      'additionalCss'     : additionalCss,
      'key'               : 'active_switcher_control_bg',
      'selector'          : '%%order_class%% .df-input-label input:checked+.df-cs-slider'
    });

    utility.df_process_bg({
      'props'             : props,
      'additionalCss'     : additionalCss,
      'key'               : 'primary_button_bg',
      'selector'          : '%%order_class%% .df-cs-switch-wrapper .df-cs-button.primary'
    });

    utility.df_process_bg({
      'props'             : props,
      'additionalCss'     : additionalCss,
      'key'               : 'secondary_button_bg',
      'selector'          : '%%order_class%% .df-cs-switch-wrapper .df-cs-button.secondary'
    });

    utility.df_process_bg({
      'props'             : props,
      'additionalCss'     : additionalCss,
      'key'               : 'active_button_bg',
      'selector'          : '%%order_class%% .df-cs-switch-wrapper .df-cs-button.active'
    });
    utility.df_process_bg({
      'props'             : props,
      'additionalCss'     : additionalCss,
      'key'               : 'primary_badge_bg',
      'selector'          : '%%order_class%% .df-cs-primary-badge'
    });
    utility.df_process_bg({
      'props'             : props,
      'additionalCss'     : additionalCss,
      'key'               : 'secondary_badge_bg',
      'selector'          : '%%order_class%% .df-cs-secondary-badge'
    });

    utility.df_process_string_attr({
      'props': props,
      'key': 'switcher_alignment',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df-cs-switch-wrapper',
      'type': 'justify-content',
      'default_value': 'center'
    });

     // icon font family
     utility.process_icon_font_style({
      'props'             : props,
      'additionalCss'     : additionalCss,
      'key'               : 'font_icon',
      'selector'          : '%%order_class%% .et-pb-icon.df-tab-nav-icon'
  })
  
    utility.process_icon_styles({
      'props'             : props,
      'additionalCss'     : additionalCss,
      'key'               : 'primary_title',
      'selector'          : '%%order_class%% .df-cs-icon-wrapper .et-pb-icon.df-primary-label-icon',
      'image_selector'    : '%%order_class%% .df-cs-icon-wrapper img'     
    });

    utility.process_icon_styles({
      'props'             : props,
      'additionalCss'     : additionalCss,
      'key'               : 'secondary_title',
      'selector'          : '%%order_class%% .df-cs-icon-wrapper .et-pb-icon.df-secondary-label-icon',
      'image_selector'    : '%%order_class%% .df-cs-icon-wrapper img'    
    });

    utility.process_icon_font_style({
      'props'             : props,
      'additionalCss'     : additionalCss,
      'key'               : 'primary_title_font_icon',
      'selector'          : '%%order_class%% .df-cs-icon-wrapper .et-pb-icon.df-primary-label-icon',
      'image_selector'    : '%%order_class%% .df-cs-icon-wrapper img'     
    });

    utility.process_icon_font_style({
      'props'             : props,
      'additionalCss'     : additionalCss,
      'key'               : 'secondary_title_font_icon',
      'selector'          : '%%order_class%% .df-cs-icon-wrapper .et-pb-icon.df-secondary-label-icon',
      'image_selector'    : '%%order_class%% .df-cs-icon-wrapper img'    
    });

    if( props.primary_icon_hide_on_mobile && props.primary_icon_hide_on_mobile === 'on'){
        additionalCss.push([{
          selector:    '%%order_class%% .df-cs-switch-wrapper .primary .df-cs-icon-wrapper',
          declaration: `display: none`,
          'device':'phone'
      }]);
    }

    if( props.secondary_icon_hide_on_mobile && props.secondary_icon_hide_on_mobile === 'on'){
      additionalCss.push([{
        selector:    '%%order_class%% .df-cs-switch-wrapper .secondary .df-cs-icon-wrapper',
        declaration: `display: none`,
        'device':'phone'
    }]);
  }

    utility.process_color({
      'props': props,
      'key': 'active_title_color',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df-cs-switch.active span.title',
      'type': 'color'
    });

    utility.process_color({
      'props': props,
      'key': 'normal_title_color',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df-cs-switch span.title',
      'type': 'color'
    });
    
    // Primary Badges style
    if( props.enable_primary_badge && props.enable_primary_badge === 'on'){
      const primary_badge_arrow_placement = props['primary_badge_arrow_placement'] ? props['primary_badge_arrow_placement'] : 'arrow-bottom';
      utility.process_range_value({
        'props': props,
        'key': 'primary_badge_position',
        'additionalCss': additionalCss,
        'selector': '%%order_class%% .df-cs-primary-badge',
        'type': 'left',
        'important' : 'true'
      });
      utility.process_range_value({
        'props': props,
        'key': 'primary_badge_top_position',
        'additionalCss': additionalCss,
        'selector': '%%order_class%% .df-cs-primary-badge',
        'type': 'top',
        'important' : 'true'
      });

      utility.process_range_value({
        'props': props,
        'key': 'primary_badge_arrow_size',
        'additionalCss': additionalCss,
        'selector': '%%order_class%% .df-cs-primary-badge.'+ primary_badge_arrow_placement +'::after',
        'type': 'border-width',
        'important' : 'true'
      });

      utility.process_range_value({
        'props': props,
        'key': 'primary_badge_arrow_position',
        'additionalCss': additionalCss,
        'selector': '%%order_class%% .df-cs-primary-badge.'+ primary_badge_arrow_placement +'::after',
        'type': (primary_badge_arrow_placement ==='arrow-bottom' || primary_badge_arrow_placement ==='arrow-top') ?  'left' : 'bottom',
        'important' : 'true'
      });

      if(props['primary_badge_arrow_position']){
      
        utility.process_transform_props({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'oposite'           : (primary_badge_arrow_placement ==='arrow-bottom' || primary_badge_arrow_placement ==='arrow-top') ? true : false,
            'selector'          : '%%order_class%% .df-cs-primary-badge.'+ primary_badge_arrow_placement +'::after',
            'important'         :true,
            'transforms'        : [
                {
                    'type' : (primary_badge_arrow_placement ==='arrow-bottom' || primary_badge_arrow_placement ==='arrow-top') ? 'translateX' : 'translateY',
                    'key'  : 'primary_badge_arrow_position',
                    'unit' : '%',
                    'default_value': '-50%'
                }
            ]
        });
      }

      
      let arrow_border_props = ''//getArrowBorderPoperty('arrow-bottom');
      if(primary_badge_arrow_placement === 'arrow-left'){
        arrow_border_props = 'border-right-color';
      }else if(primary_badge_arrow_placement === 'arrow-top'){
        arrow_border_props = 'border-bottom-color';
      }else if(primary_badge_arrow_placement === 'arrow-right'){
        arrow_border_props = 'border-left-color';
      }else{
        arrow_border_props = 'border-top-color';
      }
   

      utility.process_color({
        'props': props,
        'key': 'primary_badge_arrow_color',
        'additionalCss': additionalCss,
        'selector': '%%order_class%% .df-cs-primary-badge.'+primary_badge_arrow_placement+'::after',
        'type': arrow_border_props
      });
      
    }
    // Secondary Badges style
    if( props.enable_secondary_badge && props.enable_secondary_badge === 'on'){
      const secondary_badge_arrow_placement = props.secondary_badge_arrow_placement ? props.secondary_badge_arrow_placement : 'arrow-bottom';
      utility.process_range_value({
        'props': props,
        'key': 'secondary_badge_position',
        'additionalCss': additionalCss,
        'selector': '%%order_class%% .df-cs-secondary-badge',
        'type': 'left',
        'important' : 'true'
      });
      utility.process_range_value({
        'props': props,
        'key': 'secondary_badge_top_position',
        'additionalCss': additionalCss,
        'selector': '%%order_class%% .df-cs-secondary-badge',
        'type': 'top',
        'important' : 'true'
      });
      utility.process_range_value({
        'props': props,
        'key': 'secondary_badge_arrow_size',
        'additionalCss': additionalCss,
        'selector': '%%order_class%% .df-cs-secondary-badge.'+secondary_badge_arrow_placement+'::after',
        'type': 'border-width',
        'important' : 'true'
      });
      utility.process_range_value({
        'props': props,
        'key': 'secondary_badge_arrow_position',
        'additionalCss': additionalCss,
        'selector': '%%order_class%% .df-cs-secondary-badge.'+secondary_badge_arrow_placement+'::after',
        'type': (secondary_badge_arrow_placement ==='arrow-bottom' || secondary_badge_arrow_placement ==='arrow-top') ?  'left' : 'bottom',
        'important' : 'true'
      });
  
      
      if(props['secondary_badge_arrow_position']){
          
        utility.process_transform_props({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'oposite'           : (secondary_badge_arrow_placement ==='arrow-bottom' || secondary_badge_arrow_placement ==='arrow-top') ? true : false,
            'selector'          : '%%order_class%% .df-cs-secondary-badge.'+secondary_badge_arrow_placement+'::after',
            'important'         :true,
            'transforms'        : [
                {
                    'type' : (secondary_badge_arrow_placement ==='arrow-bottom' || secondary_badge_arrow_placement ==='arrow-top') ? 'translateX' : 'translateY',
                    'key'  : 'secondary_badge_arrow_position',
                    'unit' : '%',
                    'default_value': '-50%'
                }
            ]
        });
      }

      
      let border_props = ''//getArrowBorderPoperty('arrow-bottom');
      if(secondary_badge_arrow_placement === 'arrow-left'){
        border_props = 'border-right-color';
      }else if(secondary_badge_arrow_placement === 'arrow-top'){
        border_props = 'border-bottom-color';
      }else if(secondary_badge_arrow_placement === 'arrow-right'){
        border_props = 'border-left-color';
      }else{
        border_props = 'border-top-color';
      }
 
      utility.process_color({
        'props': props,
        'key': 'secondary_badge_arrow_color',
        'additionalCss': additionalCss,
        'selector': '%%order_class%% .df-cs-secondary-badge.'+secondary_badge_arrow_placement+'::after',
        'type': border_props
      });
    }

  
    utility.process_color({
      'props': props,
      'key': 'normal_control_color',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df-input-label .df-cs-slider:before',
      'type': 'background-color'
    });

    utility.process_color({
      'props': props,
      'key': 'active_control_color',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df-input-label input:checked+.df-cs-slider:before',
      'type': 'background-color'
    });
    if(props.enable_active_icon_color){
      utility.process_color({
        'props': props,
        'key': 'active_icon_color',
        'additionalCss': additionalCss,
        'selector': '%%order_class%% .df-cs-switch.active .df-cs-icon-wrapper .et-pb-icon , %%order_class%% .df-cs-button.active .df-cs-icon-wrapper .et-pb-icon',
        'type': 'color'
      });
    }
   
    utility.process_range_value({
      'props': props,
      'key': 'switcher_control_size',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% label.df-cs-switch.df-input-label',
      'type': 'font-size',
      'default_value': '18px'
    });

    if(props['use_custom_spacing'] && props['use_custom_spacing'] ==='on'){
      utility.process_range_value({
        'props': props,
        'key': 'title_spacing',
        'additionalCss': additionalCss,
        'selector': '%%order_class%% .df-cs-switch-wrapper .df-cs-switch.primary , %%order_class%% .df-cs-switch-wrapper .df-cs-button:not(:last-of-type)',
        'type': 'margin-right',
        'default_value': '20px',
        'important': true
      });
      utility.process_range_value({
        'props': props,
        'key': 'title_spacing',
        'additionalCss': additionalCss,
        'selector': '%%order_class%% .df-cs-switch-wrapper .df-cs-switch.secondary',
        'type': 'margin-left',
        'default_value': '20px',
        'important': true
      });
    }
    utility.process_range_value({
      'props': props,
      'key': 'swicher_bar_width',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df-cs-switch-wrapper',
      'type': 'width',
      'default_value': '100%',
      'important': true
    });
    
    utility.process_margin_padding({
      'props': props,
      'key': 'primary_icon_padding',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df-cs-icon-wrapper .et-pb-icon.df-primary-label-icon',
      'type': 'padding'
    });

    utility.process_margin_padding({
      'props': props,
      'key': 'secondary_icon_padding',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df-cs-icon-wrapper .et-pb-icon.df-secondary-label-icon',
      'type': 'padding'
    });

    utility.process_margin_padding({
      'props': props,
      'key': 'switcher_bar_padding',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df-cs-switch-wrapper',
      'type': 'padding'
    });

    utility.process_margin_padding({
      'props': props,
      'key': 'switcher_bar_margin',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df-cs-switch-wrapper',
      'type': 'margin'
    });

    utility.process_margin_padding({
      'props': props,
      'key': 'switcher_content_padding',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df-cs-content-section',
      'type': 'padding'
    });

    utility.process_margin_padding({
      'props': props,
      'key': 'switcher_toggle_margin',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% label.df-cs-switch.df-input-label',
      'type': 'margin'
    });
    
    utility.process_margin_padding({
      'props': props,
      'key': 'switcher_button_padding',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df-cs-switch-wrapper .df-cs-button',
      'type': 'padding'
    });

    utility.process_margin_padding({
      'props': props,
      'key': 'primary_badge_padding',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df-cs-primary-badge',
      'type': 'padding'
    });
    utility.process_margin_padding({
      'props': props,
      'key': 'primary_badge_margin',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df-cs-primary-badge',
      'type': 'margin'
    });
    utility.process_margin_padding({
      'props': props,
      'key': 'secondary_badge_padding',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df-cs-secondary-badge',
      'type': 'padding'
    });
    utility.process_margin_padding({
      'props': props,
      'key': 'secondary_badge_margin',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df-cs-secondary-badge',
      'type': 'margin'
    });

    const content_animation = ['slide_left', 'slide_right', 'slide_up', 'slide_down'];
    if('on' === props['enable_animation']  && content_animation.includes(props.content_animation) ){
        additionalCss.push([{
          selector: '%%order_class%% .df-cs-content-container',
          declaration: `overflow: hidden;`,
        }]);
    }
    return additionalCss;
  }
  get_the_container() {
    if (this._isMounted && this.wrapper.current && this.container === '') {
      this.container = this.wrapper.current.firstChild;
    }
  }

  render_icon_image(props, key, adClass = '') {
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
            <div className="df-cs-icon-wrapper">
                <span className={"et-pb-icon " + adClass}>{icon}</span>
            </div>
        )
    } else if ( props[key + '_image'] && props[key + '_image'] !== '' ){
        return (
            <div className="df-cs-icon-wrapper">
                <img src={props[key + '_image']} />
            </div>
        )
    } else {return null} 
  }

  toggleControl(selector, eventState = false, button = false){
    
    const input = button === false ? selector.find('input.df-cs-toggle-switch') : '';

    const primarySwitcher = button === false ? selector.find('.df-cs-switch.primary') : selector.find('.df-cs-button.primary');
    const secondarySwitcher = button === false ? selector.find('.df-cs-switch.secondary') : selector.find('.df-cs-button.secondary')

    const primaryContent = selector.find('.df-cs-content-section.primary');
    const secondaryContent = selector.find('.df-cs-content-section.secondary');
    
    if(eventState){  
      if(button === false) {
        input.prop('checked', true);
      }
     
      primarySwitcher.removeClass('active');
      secondarySwitcher.addClass('active');

      primaryContent.removeClass('active');
      secondaryContent.addClass('active');	
      if(this.props.content_switcher_type ==='class_base'){			
        $("." + this.props.primary_content_selector).hide();
        $("." + this.props.secondary_content_selector).show();
      }
    }else {
      if(button === false) {
      input.prop('checked', false);
      }
      secondarySwitcher.removeClass('active');
      primarySwitcher.addClass('active');

      secondaryContent.removeClass('active');
      primaryContent.addClass('active');

      if(this.props.content_switcher_type ==='class_base'){			
        $("." + this.props.primary_content_selector).show();
        $("." + this.props.secondary_content_selector).hide();
      }
    }	
  }
  handleClick = (e) => {
    e.preventDefault();
    this.setState({ isActive: !this.state.isActive }) 
    const target = e.currentTarget.parentNode;
    const selector = $(target.parentNode.parentNode);
    if(selector){
      this.toggleControl(selector, this.state.isActive, false)
    }
  }
  buttonClick (event){ 
    event.preventDefault();
    this.setState({ isButtonActive: !this.state.isButtonActive });
    const target = event.currentTarget.parentNode;
    const selector = $(target.parentNode);
    if(selector){
      this.toggleControl(selector, this.state.isButtonActive, true)
    }  
  }

  render_primary_content(props){
    let htmlContent ='';
    if(props.content_switcher_type === 'shortcode_base') {
      htmlContent = props.content_switcher_type === 'shortcode_base' && props.shortcode_primary_content && props.shortcode_primary_content !== '' && props.__shortcode_primary_content ?
                      `${props.__shortcode_primary_content}`: '';
    }
    else if( props.content_switcher_type === 'library_base'){
    htmlContent = props.content_switcher_type === 'library_base' && props.library_id_primary && props.library_id_primary !== 'none' && props.__library_content_primary ?
                `${props.__library_content_primary}`: '';
    }
    else if(props.content_switcher_type === 'class_base'){
      if(!/^[a-z_-][a-z\d_-]*$/i.test( props.primary_content_selector) && '' !== props.primary_content_selector){
          return `<div class="class_base_content"> Must begin with letters (A-Za-z), digits (0-9), hyphens ("-"), and underscores ("_") </div>`;
      }
      const _selector =  props.primary_content_selector &&  props.primary_content_selector !=='' ?  "." + props.primary_content_selector : '';
      const primary_content =  undefined !== $(_selector).html() ? $(_selector).html(): '';
      htmlContent =`<div class="class_base_content"> ${primary_content} </div>`;  
    }
    return htmlContent;  
  }

  render_secondary_content(props){
    let htmlContent ='';
      if(props.content_switcher_type === 'shortcode_base') {
      htmlContent = props.content_switcher_type === 'shortcode_base' && props.shortcode_secondary_content && props.shortcode_secondary_content !== '' && props.__shortcode_secondary_content ?
                            `${props.__shortcode_secondary_content}`: '';
      }
      else if( props.content_switcher_type === 'library_base'){
      htmlContent = props.content_switcher_type === 'library_base' && props.library_id_secondary && props.library_id_secondary !== 'none' && props.__library_content_secondary ?
                    `${props.__library_content_secondary}`: '';
      }
      else if(props.content_switcher_type === 'class_base'){
        if(!/^[a-z_-][a-z\d_-]*$/i.test( props.secondary_content_selector) && '' !== props.secondary_content_selector){
            return `<div class="class_base_content"> Must begin with letters (A-Za-z), digits (0-9), hyphens ("-"), and underscores ("_") </div>`;
        }
        const _selector =  props.secondary_content_selector &&  props.secondary_content_selector !=='' ?  "." + props.secondary_content_selector : '';
        const secondary_content =  undefined !== $(_selector).html() ? $(_selector).html(): '';
        htmlContent =`<div class="class_base_content"> ${secondary_content} </div>`;  
      }
      return htmlContent;
  }
  
  render() {
    const props = this.props;
    const switch_control_type = props['switcher_type'] && props['switcher_type'] !=='' ? props['switcher_type'] : 'round';

    // const primary_label = props['primary_label_title'] && props['primary_label_title'] !=='' ? props['primary_label_title'] : switch_control_type !=='button' ? '' : 'Primary';
    // const secondary_label = props['secondary_label_title'] && props['secondary_label_title'] !=='' ? props['secondary_label_title'] : switch_control_type !=='button' ? '' : 'Secondary';
    const primary_label = props.dynamic.primary_label_title.hasValue ?
      utility._renderDynamicContent(props, 'primary_label_title') : switch_control_type !=='button' ? '' : 'Primary';

    const secondary_label = props.dynamic.secondary_label_title.hasValue ?
      utility._renderDynamicContent(props, 'secondary_label_title') : switch_control_type !=='button' ? '' : 'Secondary';
    const primary_icon_position = props['primary_icon_align'] && props['primary_icon_align'] !=='' ? props['primary_icon_align'] : 'left'; // left or center or right
    const secondary_icon_position = props['secondary_icon_align'] && props['secondary_icon_align'] !=='' ? props['secondary_icon_align'] : 'left'; // left or center or right
    const primary_button_icon_position = switch_control_type ==='button' && props['primary_icon_align'] && props['primary_icon_align'] !=='' ? props['primary_icon_align'] : 'left'; // left or center or right
    const secondary_button_icon_position = switch_control_type ==='button' && props['secondary_icon_align'] && props['secondary_icon_align'] !=='' ? props['secondary_icon_align'] : 'left'; // left or center or right
    
    const primary_badge_text = props.dynamic.primary_badge_text.hasValue  ? utility._renderDynamicContent(props, 'primary_badge_text') : 'Popular';
    const primary_badge_arrow_placement = undefined !== props['primary_badge_arrow_placement']  ? props['primary_badge_arrow_placement'] : 'arrow-bottom';
    const primaryBadgeHtml = 'on' === props['enable_primary_badge'] ?<div className={"df-cs-primary-badge "+ primary_badge_arrow_placement}>{primary_badge_text}</div> : '';
    
    const secondary_badge_text =  props.dynamic.secondary_badge_text.hasValue  ? utility._renderDynamicContent(props, 'secondary_badge_text') : 'Popular';
    const secondary_badge_arrow_placement = props['secondary_badge_arrow_placement'] ? props['secondary_badge_arrow_placement'] : 'arrow-bottom';
    const secondaryBadgeHtml = 'on' === props['enable_secondary_badge'] ? 
                            <div className={"df-cs-secondary-badge "+ secondary_badge_arrow_placement}>{secondary_badge_text}</div>
                            :
                            '';
    const switchHtml = props.switcher_type && props.switcher_type !== 'button' ?

      <>
        <div className={`df-cs-switch primary df-cs-icon-`+ primary_icon_position + " active"}>  
        {primaryBadgeHtml}
        {this.render_icon_image(props, 'primary_title' , 'df-primary-label-icon')}           
          <span className="title">{primary_label}</span>
        </div>

        <label className='df-cs-switch df-input-label' onClick={this.handleClick} >
          <input className='df-cs-toggle-switch' type='checkbox'/>
          <span className={'df-cs-slider df-cs-' + switch_control_type} ></span>
        </label>

      <div className={`df-cs-switch secondary df-cs-icon-`+secondary_icon_position }>
        {secondaryBadgeHtml}
      {this.render_icon_image(props, 'secondary_title' , 'df-secondary-label-icon')}
        <span className="title">{secondary_label}</span>
      </div>
      </>
      :   
      <>
        <button className={"df-cs-button primary df-cs-icon-" + primary_button_icon_position + " active"}>
          {primaryBadgeHtml}                         
          {this.render_icon_image(props, 'primary_title' , 'df-primary-label-icon')}                
          <span className="title">{primary_label}</span>
        </button>

        <button className={"df-cs-button secondary df-cs-icon-" + secondary_button_icon_position}>
          {secondaryBadgeHtml}
          {this.render_icon_image(props, 'secondary_title' , 'df-secondary-label-icon')}   
          <span className="title">{secondary_label}</span>
        </button>
      </>
      ;
    const primary_content  =  props.dynamic.content.hasValue ?
    utility._renderDynamicContent(props, 'content'): '';
    const secondary_content =  props.dynamic.secondary_content.hasValue ? 
      <div className="secondary-content" >{utility._renderDynamicContent(props, 'secondary_content')}  </div>: '';
    return (
      <Fragment>
        <div className={"df-content-switcher-wrapper df-cs-design-" + switch_control_type} ref={this.wrapper}>
          <div className="df-cs-switch-container">
              <div className="df-cs-switch-wrapper" onClick={(e) => this.buttonClick(e)}>
                  {switchHtml}
              </div>
          </div>

          {this.state.loading === false ?             
              <>
               { this.props.content_switcher_type !=='class_base'?  
                  <div className="df-cs-content-container">
                    <div className="df-cs-content-wrapper">
                      {
                        props.content_switcher_type === 'content_base' ? 
                        <>
                          <div className="df-cs-content-section primary active">
                            {primary_content}
                          </div>
                          <div className="df-cs-content-section secondary ">
                            {secondary_content}
                          </div> 
                        </>
                        : 
                        <>
                          <div className="df-cs-content-section primary active" dangerouslySetInnerHTML ={{ __html: this.render_primary_content(props) }} />
                          <div className="df-cs-content-section secondary" dangerouslySetInnerHTML ={{ __html: this.render_secondary_content(props) }} />
                        </>
                      }

                    </div>
                  </div>
                  : 
                  ''
                }
              </>      
            :
            <div className="et-fb-preloader et-fb-preloader__loading">
              <div className="et-fb-loader"/>
            </div>
          }
        </div>
      </Fragment>      
    );
  }
}

export default ContentSwitcher;
