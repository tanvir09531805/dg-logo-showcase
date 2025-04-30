// External Dependencies
import React, { Component, Fragment } from 'react';
import utility from '../../../scripts/df_scripts/utilities';
// import ImageCompare from '../../../assets/scripts/lib/image-compare-viewer.min.js';
import ImageCompare from '../../../public/js/lib/image-compare-viewer.min.js';
// Internal Dependencies
import './style.css';

class CompareImage extends Component {

  static slug = 'difl_compareimage';

  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      loading: false
    }

    this.wrapper = React.createRef();
    this.get_the_container = this.get_the_container.bind(this);
    this.compare_image_effect = this.compare_image_effect.bind(this);
    this.container = '';
    this.computed = ['before_image', 'after_image', 'cm_vertical_mode', 'cm_sarting_point', 'cm_control_hover', 'cm_add_circle', 'cm_add_circle_blur', 'cm_control_color',
      'cm_enable_show_lebel', 'cm_level_show_on_hover', 'cm_before_lebel_text', 'cm_after_lebel_text']
    //this.computed = ['before_mage', 'after_image', 'cm_vertical_mode', 'cm_sarting_point'];
  }

  componentDidMount() {
    this._isMounted = true;
    this.get_the_container();
    this.compare_image_effect(false);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate(prevProps, prevState) {
    const _this = this;
    for (const index in prevProps) {
      if (prevProps[index] !== _this.props[index]) {
        if (_this.computed.includes(index)) {
          this.setState({ loading: true });
        }
      }
    }

    var compare = new Promise((resolve, reject) => {
      if (_this.state.loading === true) {
        this.setState({ loading: false })
        resolve();
      }
    })

    compare
      .then(() => {
        if(_this.wrapper.current) {
          if (_this.wrapper.current.querySelector('.df_cm_content')) {
            _this.compare_image_effect(true, _this.wrapper.current.querySelector('.df_cm_content'));
          }
        }
        
      })
  }
  static css(props) {
    const utils = window.ET_Builder.API.Utils;
    const additionalCss = [];
    utility.df_process_bg({
      'props': props,
      'additionalCss': additionalCss,
      'key': 'df_before_background',
      'selector': '%%order_class%% .df_cm_content span.icv__label-before'
    });

    utility.df_process_bg({
      'props': props,
      'additionalCss': additionalCss,
      'key': 'df_after_background',
      'selector': '%%order_class%% .df_cm_content span.icv__label-after'
    });

    // Spacing
    utility.process_margin_padding({
      'props': props,
      'key': 'before_text_margin',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_cm_content span.icv__label-before',
      'type': 'margin'
    });
    utility.process_margin_padding({
      'props': props,
      'key': 'before_text_padding',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_cm_content span.icv__label-before',
      'type': 'padding'
    });

    utility.process_margin_padding({
      'props': props,
      'key': 'after_text_margin',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_cm_content span.icv__label-after',
      'type': 'margin'
    });
    utility.process_margin_padding({
      'props': props,
      'key': 'after_text_padding',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_cm_content span.icv__label-after',
      'type': 'padding'
    });

    if (props.cm_vertical_mode !== 'on' && props.use_lebel_top_position === 'on') {
      utility.process_range_value({
        'props': props,
        'key': 'lebel_top_position',
        'additionalCss': additionalCss,
        'selector': '%%order_class%% .df_cm_content.icv__icv--horizontal span.icv__label',
        'type': 'top',
      });
    } else if(props.cm_vertical_mode !== 'on') {
      additionalCss.push([{
          selector: '%%order_class%% .df_cm_content.icv__icv--horizontal span.icv__label',
          declaration: `transform: translateY(-50%);`,
      }]);
    }
    if (props.cm_vertical_mode === 'on' && props.use_lebel_left_position === 'on') {
      utility.process_range_value({
        'props': props,
        'key': 'lebel_left_position',
        'additionalCss': additionalCss,
        'selector': '%%order_class%% .df_cm_content.icv__icv--vertical span.icv__label.vertical',
        'type': 'left',
      });
    } else if(props.cm_vertical_mode === 'on') {
      additionalCss.push([{
          selector: '%%order_class%% .df_cm_content.icv__icv--vertical span.icv__label.vertical',
          declaration: `transform: translateX(-50%);`,
      }]);
    }

    return additionalCss;
  }
  get_the_container() {
    if (this._isMounted && this.wrapper.current && this.container === '') {
      this.container = this.wrapper.current.firstChild;
    }
  }

  compare_image_effect(reset = false, selector = '') {
    const props = this.props;
    const _this = this;
    // options
    const cm_vertical_mode = props.cm_vertical_mode === 'on' ? true : false;
    const cm_sarting_point = props.cm_sarting_point ? props.cm_sarting_point : 50;
    const cm_control_hover = props.cm_control_hover == 'on' ? true : false;
    const cm_control_color = props.cm_control_color ? props.cm_control_color : "#333333";
    const cm_control_shadow = props.cm_control_shadow == 'on' ? true : false;
    const cm_add_circle = props.cm_add_circle == 'on' ? true : false;
    const cm_add_circle_blur = props.cm_add_circle_blur == 'on' ? true : false;
    const cm_smoothing = props.cm_smoothing == 'on' ? true : false;
    const cm_enable_show_lebel = props.cm_enable_show_lebel == 'on' ? true : false;
    const cm_before_lebel_text = props.dynamic.cm_before_lebel_text.hasValue  ? utility._renderDynamicContent( props, 'cm_before_lebel_text',false) : 'Before';
    const cm_after_lebel_text = props.dynamic.cm_after_lebel_text.hasValue  ? utility._renderDynamicContent( props, 'cm_after_lebel_text',false) : 'After';
    const cm_smoothing_amount = props.cm_smoothing_amount ? props.cm_smoothing_amount : 100;
    const cm_level_show_on_hover = props.cm_level_show_on_hover === 'on' ? true : false;
    const cm_fluid_mode = false;
    if (ImageCompare) {
      var compareElement = selector === '' ? this.container : selector;

      if (compareElement) {
        const options = {
          // UI Theme Defaults
          controlColor: cm_control_color,
          controlShadow: cm_control_shadow,
          addCircle: cm_add_circle,
          addCircleBlur: cm_add_circle_blur,

          // Label Defaults
          showLabels: cm_enable_show_lebel,
          labelOptions: {
            before: cm_before_lebel_text,
            after: cm_after_lebel_text,
            onHover: cm_level_show_on_hover
          },

          // Smoothing
          smoothing: cm_smoothing,
          smoothingAmount: cm_smoothing_amount,

          // Other options
          hoverStart: cm_control_hover,
          verticalMode: cm_vertical_mode,
          startingPoint: cm_sarting_point,
          fluidMode: cm_fluid_mode
        };

        const compareObj = new ImageCompare(compareElement, options);
        compareObj.mount();
      }

    }

  }
  render_image(props,key){
    const image = props.dynamic[key];
    if (image.loading) {
      // Let Divi render the loading placeholder.
      return image.render();
    }

    return utility._renderDynamicContent(props , key , false)
  }
  render_before_after_image(props, key , imageUrl) {
    if (props[key] && props[key] !== '') {
      const alt_text = '' !== props[key + '_alt_text'] ? props[key + '_alt_text'] : key;
      return (
        <img className={key} src={imageUrl} alt={alt_text} />
      )
    } else { return null }
  }

  render() {
    const props = this.props;
    const beforeImageUrl = this.render_image(props,'before_image');
    const afterImageUrl = this.render_image(props,'after_image');
    const beforeImage = this.render_before_after_image(props, 'before_image', beforeImageUrl);
    const afterImage = this.render_before_after_image(props, 'after_image', afterImageUrl);
    const content = (beforeImage !== null && afterImage !== null) ?
      <div className={"df_cm_content"}>
        {beforeImage}
        {afterImage}
      </div> : '';

    return (
      <Fragment>
        {
          content !== '' ?
          <div className="df_cm_container" ref={this.wrapper}>
            {this.state.loading === false ? content : ''}
          </div> :
          ''
        }
        {
          (!props.before_image || !props.after_image) &&  (props.before_image === '' || props.after_image === '') ?
            <h2>Please select both images.</h2> : ''
        }
      </Fragment>
      
    );
  }
}

export default CompareImage;
