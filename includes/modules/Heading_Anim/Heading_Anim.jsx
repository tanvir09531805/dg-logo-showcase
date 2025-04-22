// External Dependencies
import React, { Component } from 'react';
import utility from '../../../scripts/df_scripts/utilities';
// import anime from '../../../assets/scripts/lib/anime.js';
import anime from '../../../public/js/lib/anime.js';
// import '../../../assets/scripts/headline.js';
import '../../../public/js/headline.js';
// Internal Dependencies
import './style.css';


class Heading_Anim extends Component {

  static slug = 'dfadh_heading_anim';
  constructor(props) {
    super(props);
    this.heading = React.createRef();
    this.headlineAnim = null;
    window.anime = window.anime || anime;

  }

  static css (props) {
    const additionalCss = [];

    // display element
    utility.df_process_string_attr({
      'props'             : props,
      'key'               : 'title_prefix_block',
      'additionalCss'     : additionalCss,
      'selector'          : '%%order_class%% .headline-animation .prefix',
      'type'              : 'display',
      'default_value'     : 'inline-block'
    });
    utility.df_process_string_attr({
      'props'             : props,
      'key'               : 'title_infix_block',
      'additionalCss'     : additionalCss,
      'selector'          : '%%order_class%% .headline-animation .infix',
      'type'              : 'display',
      'default_value'     : 'inline-block'
    });
    utility.df_process_string_attr({
      'props'             : props,
      'key'               : 'title_suffix_block',
      'additionalCss'     : additionalCss,
      'selector'          : '%%order_class%% .headline-animation .suffix',
      'type'              : 'display',
      'default_value'     : 'inline-block'
    });

    // process max-width and alignemnt
    utility.df_process_maxwidth({
      'props'             : props,
      'key'               : 'prefix',
      'additionalCss'     : additionalCss,
      'selector'          : '%%order_class%% .headline-animation .prefix',
      'alignment'         : true
    });
    utility.df_process_maxwidth({
      'props'             : props,
      'key'               : 'infix',
      'additionalCss'     : additionalCss,
      'selector'          : '%%order_class%% .headline-animation .infix',
      'alignment'         : true
    });
    utility.df_process_maxwidth({
      'props'             : props,
      'key'               : 'suffix',
      'additionalCss'     : additionalCss,
      'selector'          : '%%order_class%% .headline-animation .suffix',
      'alignment'         : true
    });
    // heading spacing
    utility.process_margin_padding({
      'props'             : props,
      'key'               : 'heading_margin',
      'additionalCss'     : additionalCss,
      'selector'          : '%%order_class%% .headline-animation',
      'type'              : 'margin'
    });
    utility.process_margin_padding({
      'props'             : props,
      'key'               : 'heading_padding',
      'additionalCss'     : additionalCss,
      'selector'          : '%%order_class%% .headline-animation',
      'type'              : 'padding'
    });
    // prefix spacing
    utility.process_margin_padding({
      'props'             : props,
      'key'               : 'prefix_margin',
      'additionalCss'     : additionalCss,
      'selector'          : '%%order_class%% .headline-animation .prefix',
      'type'              : 'margin'
    });
    utility.process_margin_padding({
      'props'             : props,
      'key'               : 'prefix_padding',
      'additionalCss'     : additionalCss,
      'selector'          : '%%order_class%% .headline-animation .prefix',
      'type'              : 'padding'
    });
    // infix spacing
    utility.process_margin_padding({
      'props'             : props,
      'key'               : 'infix_margin',
      'additionalCss'     : additionalCss,
      'selector'          : '%%order_class%% .headline-animation .infix',
      'type'              : 'margin'
    });
    utility.process_margin_padding({
      'props'             : props,
      'key'               : 'infix_padding',
      'additionalCss'     : additionalCss,
      'selector'          : '%%order_class%% .headline-animation .infix',
      'type'              : 'padding'
    });
    // suffix spacing
    utility.process_margin_padding({
      'props'             : props,
      'key'               : 'suffix_margin',
      'additionalCss'     : additionalCss,
      'selector'          : '%%order_class%% .headline-animation .suffix',
      'type'              : 'margin'
    });
    utility.process_margin_padding({
      'props'             : props,
      'key'               : 'suffix_padding',
      'additionalCss'     : additionalCss,
      'selector'          : '%%order_class%% .headline-animation .suffix',
      'type'              : 'padding'
    });
    // background
    utility.df_process_bg({
      'props'         : props,
      'additionalCss' : additionalCss,
      'key'           : 'prefix_background',
      'selector'      : '%%order_class%% .headline-animation .prefix',
      'important'     : true
    });

    utility.df_process_bg({
      'props'         : props,
      'additionalCss' : additionalCss,
      'key'           : 'suffix_background',
      'selector'      : '%%order_class%% .headline-animation .suffix',
      'important'     : true
    });
    utility.df_process_bg({
      'props'         : props,
      'additionalCss' : additionalCss,
      'key'           : 'infix_background',
      'selector'      : '%%order_class%% .headline-animation .infix',
      'important'     : true
    });
    // fancy text overflow
    if ( props.fancy_text_overflow !== '' ) {
      additionalCss.push([{
          selector:    `%%order_class%% .headline-animation .infix`,
          declaration: `overflow: ${props.fancy_text_overflow};`,
      }]);
    }
    return additionalCss;
  }

  componentDidMount() {
    if (this.props.fency_text_list) {
      const heading = this.heading.current;
      // const selector = heading.querySelector('.headline-animation');
      this.headlineAnim = window.dfadh_animation(heading);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props !== prevProps && this.props.fency_text_list) {
      const fency_text_list = JSON.parse(this.props.fency_text_list)
      if (fency_text_list[0].value !== '') {
        const heading = this.heading.current;
        // const selector = heading.querySelector('.headline-animation');
        if ( this.headlineAnim === null ) {
          this.headlineAnim = window.dfadh_animation(heading);
        } else {
          var showAnim = this.headlineAnim.showAnim;
          if (showAnim !== null ) {
            this.headlineAnim.anim_restart();
          }
          this.headlineAnim = window.dfadh_animation(heading);
        }
      }
    }
  }

  warpChar(props, word, key) {
    if('undefined' === typeof word) return
    var _char = word.split('');
    var newword = '';
    if (props.fancy_text_anim.includes('letter')) {
      for ( var i in _char) {
        const ch = _char[i];
        if ( ch !== ' ') {
          if ( key === 0) {
            newword = newword + '<span class="in">'+ ch +'</span>';
          } else {
            newword = newword + '<span class="out">'+ ch +'</span>';
          }
        } else {
          newword = newword + ' ';
        }
      }
    } else {
      newword = word;
    }
    return newword;
  }

  fancy_text(props, animation_type) {
    const list = props.fency_text_list ? JSON.parse(props.fency_text_list) : {};
    let fancy_text = '';
    fancy_text = fancy_text + '<span class="infix words-wrapper '+animation_type[props.fancy_text_anim]+'_wrapper">';
    for(var i = 0; i < list.length; i++) {
      var word = this.warpChar(props, list[i].value, i);
      if ( i === 0) {
        fancy_text = fancy_text + '<span class="is-visible">' + word + '</span>';
      } else {
        fancy_text = fancy_text + '<span class="is-hidden">' + word + '</span>';
      }
    }
    fancy_text = fancy_text + '</span>';

    return fancy_text;
  }



  render() {
    const props = this.props;
    const animation_classes = {
      'type-word-rotate'        : 'word type-word-rotate',
      'type-word-slide-top'     : 'word type-word-slide-top',
      'type-word-slide-left'    : 'word type-word-slide-left',
      'type-word-scale'         : 'word type-word-scale',
      'type-letter-flip'        : 'letter type-letter-flip',
      'type-letter-scale'       : 'letter type-letter-scale',
      'type-letter-wave'        : 'letter type-letter-wave',
      'type-letter-stand'       : 'letter type-letter-stand',
      'type-letter-slide'       : 'letter type-letter-slide',
    }
    const animation_type = {
      'type-word-rotate'        : 'word',
      'type-word-slide-top'     : 'word',
      'type-word-slide-left'    : 'word',
      'type-word-scale'         : 'word',
      'type-letter-flip'        : 'letter',
      'type-letter-scale'       : 'letter',
      'type-letter-wave'        : 'letter',
      'type-letter-stand'       : 'letter',
      'type-letter-slide'       : 'letter',
    }
    const title_prefix = props.title_prefix ?
     (props.dynamic.title_prefix.dynamic=== false ? `<span class="prefix">${props.title_prefix}</span>` : `<span class="prefix">${props.dynamic.title_prefix.value}</span>` ) : '';

    const title_suffix = props.title_suffix ?
    (props.dynamic.title_suffix.dynamic=== false ? `<span class="suffix">${props.title_suffix}</span>` : `<span class="suffix">${props.dynamic.title_prefix.value}</span>` )  : '';

    let title_infix = this.fancy_text(props, animation_classes);
    const title = `${title_prefix} ${title_infix}  ${title_suffix}`;
    const fancy_text_class = 'headline-animation ' + animation_classes[props.fancy_text_anim];

    const data_attr = {
      'transition_type'           : animation_type[props['fancy_text_anim']],
      'animation_type'            : props['fancy_text_anim'],
      'delay'                     : parseInt(props['anim_delay']),
      'duration'                  : parseInt(props['anim_duration']),
      'easing'                    : props['easing'] === 'on' ? props['anim_easing'] : 'none',
      'mass'                      : parseInt(props['spring_anim_mass']),
      'stiffness'                 : parseInt(props['spring_anim_stiffness']),
      'damping'                   : parseInt(props['spring_anim_damping']),
      'velocity'                  : parseInt(props['spring_anim_velocity'])
    }

    return (
      <div ref={this.heading} className="df-anim-heading-container"
        dangerouslySetInnerHTML=
          {utility.process_header_level(title, props.title_level, fancy_text_class)} data-anmi={JSON.stringify(data_attr)} />
    );
  }
}

export default Heading_Anim;

