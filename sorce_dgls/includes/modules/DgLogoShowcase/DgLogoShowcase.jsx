// External Dependencies
import React, { Component } from 'react';
// import axios from 'axios';
import $ from 'jquery';
// import dgls_process_bg from '../../../scripts/dgls_process_bg';
// Internal Dependencies
import './style.css';


class DgLogoShowcase extends Component {

  static slug = 'dgls_logo_showcase';
  _isMounted = false;

  constructor(props){
    super(props);

    this.state = {
      loading: true,
      props: this.props,
      images: '',
      logos: ''
    }
    
    this.wrapper       = React.createRef();
    this.requestlogos  = this.requestlogos.bind(this);
    this.renderLogos   = this.renderLogos.bind(this);
    this.contentOutput = this.contentOutput.bind(this);
    // this.computedType = ['logo_size', 
    //     'image_count', 'show_caption', 'ini_count', 'logos',
    //     'show_description'
    // ];
    
  }
  dgsh_logo_oriantation(){

    document.querySelectorAll('.dgl-showcase').forEach((element) => {
      const width = element.offsetWidth; // Get the width of the element
      const landscapeHeight = width / (16 / 9); // Landscape aspect ratio 16:9
      const portraitHeight = width / (9 / 16); // Portrait aspect ratio 9:16
    
      if(this.props.use_logo_orientation==='on'){
        // Apply heights based on aspect ratios
        if (element.closest('.landscape')) {
          element.style.height = `${landscapeHeight}px`;
        }
      
        if (element.closest('.portrait')) {
          element.style.height = `${portraitHeight}px`;
        }
      
        if (element.closest('.square')) {
          element.style.height = `${width}px`;
        }
      }
    
      // Apply width to images in logo-full-width
      if (element.closest('.logo-full-width') && this.props.logo_force_full_width==='on') {
        const img = element.querySelector('img');
        if (img) {
          img.style.width = `${width}px`;
        }
      }
    });

  }
  dgls_bg_color_to_each_logo(){

    if(this.props.logo_bg_color==='off'){
      document.querySelectorAll('.dgl-showcase').forEach((element) => {
        // const width = element.offsetWidth; // Get the width of the element
        
        let bgColorToEachLogo = this.props.dgl_bg_gradient_bgcolor;
      
        if(this.props.dgl_bg_gradient_use_gradient==='on'){
          
          let gColor1      = this.props.dgl_bg_gradient_color_gradient_1;
          let gColor1Start = this.props.dgl_bg_gradient_start_position?this.props.dgl_bg_gradient_start_position:'0%';
          let gColor2      = this.props.dgl_bg_gradient_color_gradient_2;
          let gColor2End   = this.props.dgl_bg_gradient_end_position?this.props.dgl_bg_gradient_end_position: '100%';

          let gLinearDirection = this.props.dgl_bg_gradient_gradient_direction?this.props.dgl_bg_gradient_gradient_direction:'180deg';
          let gRadialDirection = this.props.dgl_bg_gradient_radial_direction ? this.props.dgl_bg_gradient_radial_direction : "center";

          if(this.props.dgl_bg_gradient_gradient_type==='radial'){

            let radialDirection = '';
            if(gRadialDirection==='top_left' || gRadialDirection==='top_right' || gRadialDirection==='bottom_left' || gRadialDirection==='bottom_right'){
              const gRadialD = gRadialDirection.split('_');
              radialDirection = `${gRadialD[0]} ${gRadialD[1]}`;
            }else{
              radialDirection = gRadialDirection;
            }
            element.style.backgroundImage = `radial-gradient(circle at ${radialDirection}, ${gColor1} ${gColor1Start}, ${gColor2} ${gColor2End})`;
            
          }else{
            element.style.backgroundImage = `linear-gradient(${gLinearDirection}, ${gColor1} ${gColor1Start}, ${gColor2} ${gColor2End})`;
          }
          element.style.backgroundColor = '';
        }else{
          element.style.backgroundImage = '';
          element.style.backgroundColor = `${bgColorToEachLogo}`;

          // console.log('Gradient Off');
        }
        // console.log('Change background color each logo');
      });
    }
  }

  componentDidMount() {
    
    this._isMounted = true;

    if (this.state.loading === true) {
        this.requestlogos();
    }

  }
  
  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate(prevProps) {
    
    // Define the list of props to monitor for changes
    const monitoredProps = [
      'logos',
      'logo_info',
      'content_position',
      'show_description',
      'show_caption',
      'use_custom_link',
      'logo_size',
      'logo_bg_color',
      'horizontal_alignment',
      'vertical_alignment',
      'hover_effects',
      'enable_stagger_animation',
      'enable_stagger_animation_types',
      'logo_spacing_padding',
      'logo_spacing_margin',
      'logo_force_full_width',
      'logo_size_percentage',
      'use_logo_orientation',
      'logo_orientation',
    ];

    // Check if any monitored prop has changed
    const hasPropsChanged = monitoredProps.some(
      (prop) => this.props[prop] !== prevProps[prop]
    );

    if (hasPropsChanged) {
      // Trigger the requestlogos function
      this.requestlogos();
    }

    // Check if relevant props have changed, and reload logos if necessary
    if (this.props.logos !== prevProps.logos) {
      this.requestlogos();
    }
    
    // Orientation function
    this.dgsh_logo_oriantation();
    this.dgls_bg_color_to_each_logo();

  }

  // render child content
  contentOutput(props){
      return ((props.logos.length !== 0) ? props.logos : '');
  }
  
  requestlogos() {
    const _this = this;
  
    // Assume `_this.props.logos` contains the image IDs in a string like "177,5,25,6,13".
    // const imageIds = _this.props.logos.split(',').map(id => id.trim()).filter(id => id);
    const imageIds = _this.props.logos;
  
    if (!imageIds.length) {
      console.warn('No valid image IDs provided');
      _this.setState({ loading: false });
      return;
    }

    let use_logo_orientation = _this.props.use_logo_orientation;
    let orientationLogo   = _this.props.logo_orientation;
    let logo_orientation  = use_logo_orientation==='on'?(orientationLogo?orientationLogo:'landscape'):"";

    let stagger_animation = _this.props.enable_stagger_animation==='on'?_this.props.enable_stagger_animation_types : ""; 
    let logoPadding       = _this.props.logo_spacing_padding; 
    let logoMargin        = _this.props.logo_spacing_margin; 
    // const logoMargin = '11px|17px|13px|15px|false|false'; // 
    // const logoPadding = '10px|16px|12px|14px|false|false'; // 
    
    let logo_margin = '';
    if (logoMargin) {
        const logoMargins = logoMargin.split('|');
        logo_margin = `${logoMargins[0]} ${logoMargins[1]} ${logoMargins[2]} ${logoMargins[3]}`;
    }

    let logo_padding = '';
    if (logoPadding) {
        const paddingLogos = logoPadding.split('|');
        logo_padding = `${paddingLogos[0]} ${paddingLogos[1]} ${paddingLogos[2]} ${paddingLogos[3]}`;
    }

    let logo_width  = '';
    let logo_height = '';

    let logo_force_full_width =  _this.props.logo_force_full_width
    // let logo_full_width = (logo_force_full_width==='on') ? 'logo-full-width' :'';
    if(logo_force_full_width==="off"){
        let logo_size_percentage =  _this.props.logo_size_percentage
        if(use_logo_orientation==='on'){
            if(logo_orientation==='portrait'){
                logo_width = logo_size_percentage?logo_size_percentage+'%':'';
            }else{
                logo_height = logo_size_percentage?logo_size_percentage+'%':'';
            }
        }else{
            logo_width = logo_size_percentage?logo_size_percentage+'%':'';
        }
    }
  
    $.ajax({
      url: `${window.ETBuilderBackend.ajaxUrl}`,
      method: 'POST',
      dataType: 'json',
      data: {
        action: 'dgls_render_image', // Replace with your WordPress handler action name.
        image_ids: imageIds,
        logo_info: _this.props.logo_info,
        logo_info_position: _this.props.content_position,
        show_description: _this.props.show_description,
        show_caption: _this.props.show_caption,
        custom_link: _this.props.use_custom_link,
        logo_size: _this.props.logo_size,
        logo_bg_color: _this.props.logo_bg_color,
        logo_width: logo_width,
        logo_height: logo_height,
        logo_padding: logo_padding,
        logo_margin: logo_margin,
        target_link: _this.props.url_target,
        h_alignment: _this.props.horizontal_alignment,
        v_alignment: _this.props.vertical_alignment,
        hover_effects: _this.props.hover_effects,
        stagger_animation: stagger_animation,
      },
      success(response) {
        
        
        if (_this._isMounted) {
          _this.setState({
            logos: response.data, // Assuming the response contains HTML or relevant data.
            images: _this.props.logos,
            loading: false,
          });
        }
        
      },
      error(error) {
        // console.error('Error fetching image data:', error);
        if (_this._isMounted) {
          _this.setState({ loading: false });
        }
      },
    });
  }
  
  renderLogos() {
      // console.log(this.state.logos);
      return {__html: this.state.logos};
  }

  /*
  static css(props) {
    const additionalCss = [];
    
    additionalCss.push([{
        selector:    '%%order_class%% .c4-izmir',
        declaration: `--border-radius: 0px;`,
    }]);

    if(props.use_logo_orientation !== 'on') {
      additionalCss.push([{
          selector:    '%%order_class%% .c4-izmir',
          declaration: `--image-opacity: 1;`,
      }]);
    }
    
      
    const defaults = {
        'props': props,
        'key': '',
        'additionalCss': additionalCss,
        'selector': '',
        'hover': '',
        'important': false,
    }
    // const settings = this.extend(defaults, options);

    const background = new dgls_process_bg(defaults);
    // background.set_style();

      if(props.logo_bg_color !== 'on') {
        additionalCss.push([{
            selector:    '%%order_class%% .dgl-showcase',
            declaration: background.set_style(), //`--image-opacity: 1;`,
        }]);
      }
      return additionalCss;

  }
  */

  render() {
    
    // const Content = this.props.content;
    const props= this.props;

    // window.ETBuilderBackend.i18n.modules.dgshShowcase = {
    //   v_scroller_duration: props.transition_duration_v_scroll ? props.transition_duration_v_scroll : '12',
    //   v_scroller_effect : (props.v_scroller_effect==="on") ? true : false,
    // };

    // let logo_size = props.logo_size ? props.logo_size : 'medium';
    let logo_count = props.logos_in_a_row ? props.logos_in_a_row : 'logo_5';
    let h_alignment = props.horizontal_alignment;
    let v_alignment = props.vertical_alignment;
    
    let use_logo_orientation = props.use_logo_orientation;
    let orientationLogo = props.logo_orientation;
    let orientation = use_logo_orientation==='on'?(orientationLogo?orientationLogo:'landscape'):"";
    // let orientation = props.logo_orientation;
  
    let full_width = props.logo_force_full_width==='on'?'logo-full-width':'';
    let h_gap = props.horizontal_gap;
    let v_gap = props.vertical_gap;

    // Orientation function
    this.dgsh_logo_oriantation();
    this.dgls_bg_color_to_each_logo();

    return (
      <div className="dg-logo-showcase-wrap">
        <div className="dg-logo-showcase-container">
          {/* {this.contentOutput(props)} */}
          <div 
            className={`dg-logos ${logo_count} ${h_alignment} ${v_alignment} ${orientation} ${full_width}`}
            style={{
              columnGap: `${h_gap}px`,
              rowGap: `${v_gap}px`,
            }} 
            dangerouslySetInnerHTML={this.renderLogos()} 
          />
        </div>
      </div>
    );
  }
}
export default DgLogoShowcase;

