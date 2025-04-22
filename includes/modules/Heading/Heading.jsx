import React, { Component } from 'react';
import utility from '../../../scripts/df_scripts/utilities';
// Internal Dependencies
import './style.css';

class Heading extends Component {
    static slug = 'df_adh_heading';
    static css (props) {
      var additionalCss = [];
      utility.df_process_bg({
        'props'         : props,
        'additionalCss' : additionalCss,
        'key'           : 'divider_background',
        'selector'      : '%%order_class%% .df-heading-divider .df-divider-line',
        'important'     : true
      });
      utility.df_process_bg({
        'props'         : props,
        'additionalCss' : additionalCss,
        'key'           : 'prefix_background',
        'selector'      : '%%order_class%% .df-heading .prefix',
        'important'     : true
      });
      utility.df_process_bg({
        'props'         : props,
        'additionalCss' : additionalCss,
        'key'           : 'infix_background',
        'selector'      : '%%order_class%% .df-heading .infix',
        'important'     : true
      });
      utility.df_process_bg({
        'props'         : props,
        'additionalCss' : additionalCss,
        'key'           : 'suffix_background',
        'selector'      : '%%order_class%% .df-heading .suffix',
        'important'     : true
      });
      // heading spacing
      utility.process_margin_padding({
        'props'             : props,
        'key'               : 'heading_margin',
        'additionalCss'     : additionalCss,
        'selector'          : '%%order_class%% .df-heading',
        'type'              : 'margin'
      });
      utility.process_margin_padding({
        'props'             : props,
        'key'               : 'heading_padding',
        'additionalCss'     : additionalCss,
        'selector'          : '%%order_class%% .df-heading',
        'type'              : 'padding'
      });
      // prefix spacing
      utility.process_margin_padding({
        'props'             : props,
        'key'               : 'prefix_margin',
        'additionalCss'     : additionalCss,
        'selector'          : '%%order_class%% .df-heading .prefix',
        'type'              : 'margin'
      });
      utility.process_margin_padding({
        'props'             : props,
        'key'               : 'prefix_padding',
        'additionalCss'     : additionalCss,
        'selector'          : '%%order_class%% .df-heading .prefix',
        'type'              : 'padding'
      });
      // infix spacing
      utility.process_margin_padding({
        'props'             : props,
        'key'               : 'infix_margin',
        'additionalCss'     : additionalCss,
        'selector'          : '%%order_class%% .df-heading .infix',
        'type'              : 'margin'
      });
      utility.process_margin_padding({
        'props'             : props,
        'key'               : 'infix_padding',
        'additionalCss'     : additionalCss,
        'selector'          : '%%order_class%% .df-heading .infix',
        'type'              : 'padding'
      });
      // suffix spacing
      utility.process_margin_padding({
        'props'             : props,
        'key'               : 'suffix_margin',
        'additionalCss'     : additionalCss,
        'selector'          : '%%order_class%% .df-heading .suffix',
        'type'              : 'margin'
      });
      utility.process_margin_padding({
        'props'             : props,
        'key'               : 'suffix_padding',
        'additionalCss'     : additionalCss,
        'selector'          : '%%order_class%% .df-heading .suffix',
        'type'              : 'padding'
      });
      // divider spacing
      utility.process_margin_padding({
        'props'             : props,
        'key'               : 'divider_margin',
        'additionalCss'     : additionalCss,
        'selector'          : '%%order_class%% .df-heading-divider .df-divider-line',
        'type'              : 'margin'
      });
      utility.process_margin_padding({
        'props'             : props,
        'key'               : 'divider_padding',
        'additionalCss'     : additionalCss,
        'selector'          : '%%order_class%% .df-heading-divider .df-divider-line',
        'type'              : 'padding'
      });
      utility.process_margin_padding({
        'props'             : props,
        'key'               : 'divider_container_margin',
        'additionalCss'     : additionalCss,
        'selector'          : '%%order_class%% .df-heading-divider',
        'type'              : 'margin'
      });
      utility.process_margin_padding({
        'props'             : props,
        'key'               : 'divider_container_padding',
        'additionalCss'     : additionalCss,
        'selector'          : '%%order_class%% .df-heading-divider',
        'type'              : 'padding'
      });
      // divider image and icon spacing
      utility.process_margin_padding({
        'props'             : props,
        'key'               : 'divider_icon_image_margin',
        'additionalCss'     : additionalCss,
        'selector'          : '%%order_class%% .df-heading-divider span, %%order_class%% .df-heading-divider img',
        'type'              : 'margin'
      });
      utility.process_margin_padding({
        'props'             : props,
        'key'               : 'divider_icon_image_padding',
        'additionalCss'     : additionalCss,
        'selector'          : '%%order_class%% .df-heading-divider span, %%order_class%% .df-heading-divider img',
        'type'              : 'padding'
      });
      // dual_text text spacing
      utility.process_margin_padding({
        'props'             : props,
        'key'               : 'dual_text_margin',
        'additionalCss'     : additionalCss,
        'selector'          : '%%order_class%% .df-heading-dual_text',
        'type'              : 'margin'
      });
      utility.process_margin_padding({
        'props'             : props,
        'key'               : 'dual_text_padding',
        'additionalCss'     : additionalCss,
        'selector'          : '%%order_class%% .df-heading-dual_text',
        'type'              : 'padding'
      });

      // divider styles
      if ( props.divider_style ) {
        additionalCss.push([{
            selector:    `%%order_class%% .df-heading-divider .df-divider-line::before`,
            declaration: `border-top-style: ${props.divider_style};`,
        }]);
      }
      if ( props.divider_color ) {
        additionalCss.push([{
            selector:    `%%order_class%% .df-heading-divider .df-divider-line::before`,
            declaration: `border-top-color: ${props.divider_color};`,
        }]);
      }
  
      const divider_height = props.divider_height ? props.divider_height : '5px';
      additionalCss.push([{
          selector:    `%%order_class%% .df-heading-divider .df-divider-line`,
          declaration: `top:calc(50% - ${utility.df_get_div_value(divider_height)});`,
      }]);
      if (props.divider_height_tablet) {
        additionalCss.push([{
            selector:    `%%order_class%% .df-heading-divider .df-divider-line`,
            declaration: `top:calc(50% - ${utility.df_get_div_value(props.divider_height_tablet)});`,
            'device':'tablet'
        }]);
      }
      if (props.divider_height_phone) {
        additionalCss.push([{
            selector:    `%%order_class%% .df-heading-divider .df-divider-line`,
            declaration: `top:calc(50% - ${utility.df_get_div_value(props.divider_height_phone)});`,
            'device':'phone'
        }]);
      }
      utility.apply_single_value({
        'props'             : props,
        'key'               : 'divider_height',
        'additionalCss'     : additionalCss,
        'selector'          : '%%order_class%% .df-heading-divider .df-divider-line::before',
        'type'              : 'border-top-width',
        'unit'              : 'px',
        'default_value'     : '5'
      });
      utility.apply_single_value({
        'props'             : props,
        'key'               : 'divider_height',
        'additionalCss'     : additionalCss,
        'selector'          : '%%order_class%% .df-heading-divider .df-divider-line',
        'type'              : 'height',
        'unit'              : 'px',
        'default_value'     : '5'
      });

      utility.apply_single_value({
        'props'             : props,
        'key'               : 'divider_width',
        'additionalCss'     : additionalCss,
        'selector'          : '%%order_class%% .df-heading-divider',
        'type'              : 'max-width',
        'unit'              : '%',
        'default_value'     : '100'
      });
      if ( props.divider_alignment ) {
        if ( props.divider_alignment === 'center' ) {
          additionalCss.push([{
              selector:    `%%order_class%% .df-heading-divider`,
              declaration: `margin: 0 auto;`,
          }]);
        }
        if ( props.divider_alignment === 'right' ) {
          additionalCss.push([{
              selector:    `%%order_class%% .df-heading-divider`,
              declaration: `margin: 0 0 0 auto;`,
          }]);
        }
      }
      if ( props.use_divider_icon !== 'on' && props.use_divider_image !== 'on' ) {
        additionalCss.push([{
            selector:    `%%order_class%% .df-heading-divider::before`,
            declaration: `position: relative;`,
        }]);
      }
      if ( props.use_divider_icon_circle === 'on' ) {
        additionalCss.push([{
            selector:    `%%order_class%% .df-heading-divider .et-pb-icon`,
            declaration: `border-radius: 50%;`,
        }]);
      }
      if ( props.use_divider_image_circle === 'on' ) {
        additionalCss.push([{
            selector:    `%%order_class%% .df-heading-divider img`,
            declaration: `border-radius: 50%;`,
        }]);
      }
      utility.apply_single_value({
        'props'             : props,
        'key'               : 'divider_border_radius',
        'additionalCss'     : additionalCss,
        'selector'          : '%%order_class%% .df-heading-divider .df-divider-line:before',
        'type'              : 'border-radius',
        'unit'              : 'px',
        'default_value'     : '0'
      });
      utility.apply_single_value({
        'props'             : props,
        'key'               : 'divider_border_radius',
        'additionalCss'     : additionalCss,
        'selector'          : '%%order_class%% .df-heading-divider .df-divider-line',
        'type'              : 'border-radius',
        'unit'              : 'px',
        'default_value'     : '0'
      });
      utility.apply_single_value({
        'props'             : props,
        'key'               : 'dvr_icon_font_size',
        'additionalCss'     : additionalCss,
        'selector'          : '%%order_class%% .df-heading-divider .et-pb-icon',
        'type'              : 'font-size',
        'unit'              : 'px',
        'default_value'     : '18'
      });
      utility.process_color({
        'props'             : props,
        'key'               : 'divider_icon_color',
        'additionalCss'     : additionalCss,
        'selector'          : '%%order_class%% .df-heading-divider .et-pb-icon',
        'type'              : 'color',
        'important'         : false,
      });
      utility.process_color({
        'props'             : props,
        'key'               : 'divider_icon_bgcolor',
        'additionalCss'     : additionalCss,
        'selector'          : '%%order_class%% .df-heading-divider .et-pb-icon',
        'type'              : 'background-color',
        'important'         : false,
      });
      utility.process_color({
        'props'             : props,
        'key'               : 'divider_image_bgcolor',
        'additionalCss'     : additionalCss,
        'selector'          : '%%order_class%% .df-heading-divider img.divider-image',
        'type'              : 'background-color',
        'important'         : false,
      });
      if ( props.divider_icon_alignment && props.use_divider_icon === 'on') {
        additionalCss.push([{
            selector:    `%%order_class%% .df-heading-divider`,
            declaration: `text-align: ${props.divider_icon_alignment};`,
        }]);
      }
      utility.apply_single_value({
        'props'             : props,
        'key'               : 'divider_image_width',
        'additionalCss'     : additionalCss,
        'selector'          : '%%order_class%% .df-heading-divider img',
        'type'              : 'max-width',
        'unit'              : 'px',
        'default_value'     : '100'
      });
      if ( props.divider_image_alignment && props.use_divider_image === 'on') {
        additionalCss.push([{
            selector:    `%%order_class%% .df-heading-divider`,
            declaration: `text-align: ${props.divider_image_alignment};`,
        }]);
      }
      // dual_text default color
      if ( props.t_dual_text_color ) {
        additionalCss.push([{
            selector:    `%%order_class%% .df-heading-dual_text`,
            declaration: `color: ${props.t_dual_text_color};`,
        }]);
      }
      // Display element
      utility.df_process_string_attr({
        'props'             : props,
        'key'               : 'title_prefix_block',
        'additionalCss'     : additionalCss,
        'selector'          : '%%order_class%% .df-heading .prefix',
        'type'              : 'display',
        'default_value'     : 'inline-block'
      });
      utility.df_process_string_attr({
        'props'             : props,
        'key'               : 'title_infix_block',
        'additionalCss'     : additionalCss,
        'selector'          : '%%order_class%% .df-heading .infix',
        'type'              : 'display',
        'default_value'     : 'inline-block'
      });
      utility.df_process_string_attr({
        'props'             : props,
        'key'               : 'title_suffix_block',
        'additionalCss'     : additionalCss,
        'selector'          : '%%order_class%% .df-heading .suffix',
        'type'              : 'display',
        'default_value'     : 'inline-block'
      });

      // process max-width and alignemnt
      utility.df_process_maxwidth({
        'props'             : props,
        'key'               : 'prefix',
        'additionalCss'     : additionalCss,
        'selector'          : '%%order_class%% .df-heading .prefix',
        'alignment'         : true
      });
      utility.df_process_maxwidth({
        'props'             : props,
        'key'               : 'infix',
        'additionalCss'     : additionalCss,
        'selector'          : '%%order_class%% .df-heading .infix',
        'alignment'         : true
      });
      utility.df_process_maxwidth({
        'props'             : props,
        'key'               : 'suffix',
        'additionalCss'     : additionalCss,
        'selector'          : '%%order_class%% .df-heading .suffix',
        'alignment'         : true
      });
      //clip 
      utility.df_process_text_clip({
        'props'             : props,
        'additionalCss'     : additionalCss,
        'key'               : 'df_prefix',
        'selector'          : '%%order_class%% .df-heading .prefix'
      });
      utility.df_process_text_clip({
        'props'             : props,
        'additionalCss'     : additionalCss,
        'key'               : 'df_infix',
        'selector'          : '%%order_class%% .df-heading .infix'
      });
      utility.df_process_text_clip({
        'props'             : props,
        'additionalCss'     : additionalCss,
        'key'               : 'df_suffix',
        'selector'          : '%%order_class%% .df-heading .suffix'
      });

      // icon font family
      utility.process_icon_font_style({
        'props'             : props,
        'additionalCss'     : additionalCss,
        'key'               : 'divider_icon',
        'selector'          : '%%order_class%% .et-pb-icon'
      })

      return additionalCss;
    }
 
    render_heading_text() {
      const props = this.props;
      // const HeadingPrefix = utility.df_collect_dynamic_content('title_prefix', props);
      // const HeadingInfix = utility.df_collect_dynamic_content('title_infix', props);
      // const HeadingSuffix = utility.df_collect_dynamic_content('title_suffix', props);

      const HeadingTag = props.title_level !== '' ? props.title_level : 'h3';
    //   const RenderedHeadingPrefix = utility.df_render_dynamic_content(HeadingPrefix, function (PrefixComponent) {
    //     return (
    //         <span className={'prefix'}>{PrefixComponent}</span>
    //     );
    // }, 'full');
    //   const RenderedHeadingInfix = utility.df_render_dynamic_content(HeadingInfix, function (InfixComponent) {
    //     return (
    //         <span className={'infix'}>{InfixComponent}</span>
    //     );
    // }, 'full');
    //   const RenderedHeadingSuffix = utility.df_render_dynamic_content(HeadingSuffix, function (SuffixComponent) {
    //     return (
    //         <span className={'suffix'}>{SuffixComponent}</span>
    //     );
    // }, 'full');

    const RenderedHeadingPrefix =  props.dynamic.title_prefix.hasValue ? 
          <span className={'prefix'}>{utility._renderDynamicContent( props, 'title_prefix')}</span> : '';
    const RenderedHeadingInfix = props.dynamic.title_infix.hasValue ? 
        <span className={'infix'}>{utility._renderDynamicContent( props, 'title_infix')}</span> : '';
    const RenderedHeadingSuffix = props.dynamic.title_suffix.hasValue ? 
        <span className={'suffix'}>{utility._renderDynamicContent( props, 'title_suffix')}</span> : '';

      return (
          <HeadingTag className={'df-heading'}>
              {RenderedHeadingPrefix} {RenderedHeadingInfix} {RenderedHeadingSuffix}
          </HeadingTag>
      );
  }

  get_string_value(content) {
      if (content !== undefined) {
          let string_value = '';

          if (typeof content === 'string') {
              string_value = content;
          }

          if (typeof content === 'object' && content.hasValue) {
              string_value = content.value;
          }

          return string_value.replace(/(<([^>]+)>)/ig, '');
      }

      return '';
  }

  render_heading_dual_text() {
      const props = this.props;
      const HeadingTitles = [];

      if (props.use_dual_text === 'on') {
          const HeadingPrefix = utility.df_collect_dynamic_content('title_prefix', props);
          const HeadingInfix = utility.df_collect_dynamic_content('title_infix', props);
          const HeadingSuffix = utility.df_collect_dynamic_content('title_suffix', props);
          const DualText = utility.df_collect_dynamic_content('custom_text_input', props);

          if (props.use_dual_text_custom !== 'on') {
              HeadingTitles.push(
                  this.get_string_value(HeadingPrefix),
                  this.get_string_value(HeadingInfix),
                  this.get_string_value(HeadingSuffix)
              );
          } else {
              HeadingTitles.push(this.get_string_value(DualText));
          }

          return (
              <div className="df-heading-dual_text" data-title={HeadingTitles.join(' ')}></div>
          );
      }

      return null;
  }

  render_heading_divider() {
      const utils = window.ET_Builder.API.Utils;
      const props = this.props;
      let divider_icon = '';

      if (props.use_divider === 'on') {
          if (props.use_divider_icon === 'on') {
              let processed_icon = utils.processFontIcon(props.divider_icon) ? utils.processFontIcon(props.divider_icon) : '1';
              divider_icon = <span className="et-pb-icon">{processed_icon}</span>;
          }

          if (props.use_divider_image === 'on' && props.divider_image !== '') {
              divider_icon = <img src={props.divider_image} className="divider-image" alt={props.divider_image_alt_text}/>;
          }

          return (
              <div className={'df-heading-divider'}>
                  <div className={'df-divider-line'}></div>
                  {divider_icon}
              </div>
          );
      }

      return null;
  }

  render() {
      const props = this.props;
      let heading_classes = ['df-heading-container'];

      let heading_text = this.render_heading_text();
      let heading_dual_text = this.render_heading_dual_text();
      let heading_divider = this.render_heading_divider();

      if (props.use_dual_text === 'on') {
          heading_classes.push('has-dual-text');
      }

      return (
          <div className={heading_classes.join(' ')}>
              {heading_dual_text}
              {props.use_divider === 'on' ? (
                  props.divider_position !== 'top' ? (
                      <>{heading_text} {heading_divider}</>
                  ) : (
                      <>{heading_divider} {heading_text}</>
                  )
              ) : heading_text}
          </div>
      )
  }
}

export default Heading;
