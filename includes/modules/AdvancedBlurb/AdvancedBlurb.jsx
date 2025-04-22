// External Dependencies
import React, { Component, Fragment } from 'react';
import utility from '../../../scripts/df_scripts/utilities';
// Internal Dependencies
import './style.css';

class AdvancedBlurb extends Component {

  static slug = 'difl_advanced_blurb';

  static df_ab_flex_direction(placement_slug) {
    let flex_direction = '';
    if (placement_slug === 'right') {
      flex_direction = 'row-reverse';
    } else if (placement_slug === 'top') {
      flex_direction = 'column';
    } else {
      flex_direction = 'row';
    }
    return flex_direction;
  }
  static css(props) {
    const utils = window.ET_Builder.API.Utils;
    const additionalCss = [];
    utility.process_range_value({
      'props': props,
      'key': 'content_width',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_ab_blurb_container',
      'type': 'max-width',
      'default_value': '540',
    });
    utility.process_range_value({
      'props': props,
      'key': 'image_width',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_ab_blurb_image_img',
      'type': 'max-width',
      'default_value': '100',
    });
    utility.process_range_value({
      'props': props,
      'key': 'blurb_img_zindex',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_ab_blurb_image',
      'type': 'z-index',
      'default_value': '0',
    });
    utility.process_range_value({
      'props': props,
      'key': 'badge_zindex',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_ab_blurb_badge_wrapper',
      'type': 'z-index',
      'default_value': '0',
    });
    utility.process_range_value({
      'props': props,
      'key': 'button_zindex',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_ab_blurb_button_wrapper',
      'type': 'z-index',
      'default_value': '0',
    });
    utility.process_range_value({
      'props': props,
      'key': 'title_zindex',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_ab_blurb_title',
      'type': 'z-index',
      'default_value': '0',
    });
    utility.process_range_value({
      'props': props,
      'key': 'sub_title_zindex',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_ab_blurb_sub_title',
      'type': 'z-index',
      'default_value': '0',
    });
    utility.process_range_value({
      'props': props,
      'key': 'content_zindex',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_ab_blurb_description',
      'type': 'z-index',
      'default_value': '0',
    });
    utility.df_process_string_attr({
      'props': props,
      'key': 'image_placement',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_ab_blurb_container',
      'type': 'flex-direction',
      'default_value': 'column'
    });

    // if (props.image_placement !== 'flex_top') {
    //   additionalCss.push([{
    //     selector: '%%order_class%% .df_ab_blurb_container',
    //     declaration: `flex-direction: column;`,
    //     'device': 'phone'
    //   }]);
    // }

    // Image or Icon alignment
    utility.df_process_string_attr({
      'props': props,
      'key': 'image_icon_alignment',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_ab_blurb_image',
      'type': 'text-align',
      'default_value': 'left'
    });

    // Image or Icon Item Align
    if (props.image_icon_container_position !== 'inside' && (props.image_placement === 'flex_left' || props.image_placement === 'flex_right')) {
      if (props['blurb_icon_enable'] === 'off') {
        utility.process_range_value({
          'props': props,
          'key': 'image_container_width',
          'additionalCss': additionalCss,
          'selector': '%%order_class%% .df_ab_blurb_image',
          'type': 'width',
          'default_value': '15%',
        });
      }
      const key = 'image_container_width';
      const type = 'width';
      const desktop = props[key] && props[key] !== '' ? props[key] : '20%';
      const tablet = props[key + '_tablet'] && props[key + '_tablet'] !== '' ? props[key + '_tablet'] : desktop;
      const phone = props[key + '_phone'] && props[key + '_phone'] !== '' ? props[key + '_phone'] : tablet;

      if (desktop && '' !== desktop) {
        additionalCss.push([{
          selector: "%%order_class%% .df_ab_blurb_content_container",
          declaration: `${type}:  calc(100% -  ${desktop});`,
        }]);
      }
      if (tablet && '' !== tablet && (props.image_placement_tablet === 'flex_left' || props.image_placement_tablet === 'flex_right')) {
        additionalCss.push([{
          selector: "%%order_class%% .df_ab_blurb_content_container",
          declaration: `${type}:  calc(100% -  ${tablet});`,
          'device': 'tablet',
        }]);
      }
      if (phone && '' !== phone) {

        additionalCss.push([{
          selector: "%%order_class%% .df_ab_blurb_content_container",
          declaration: `${type}:  100%;`,
          'device': 'phone'
        }]);
      }

      if (props.image_icon_item_align) {
        additionalCss.push([{
          selector: '%%order_class%% .df_ab_blurb_container',
          declaration: `align-items: ${props.image_icon_item_align};`,
        }]);
      }
    }
    // orders
    if (props.order_enable !== 'off') {
      utility.process_range_value({
        'props': props,
        'key': 'image_order',
        'additionalCss': additionalCss,
        'selector': '%%order_class%% .df_ab_blurb_image',
        'type': 'order',
        'default_value': '9',
      });
      utility.process_range_value({
        'props': props,
        'key': 'title_order',
        'additionalCss': additionalCss,
        'selector': '%%order_class%% .df_ab_blurb_title',
        'type': 'order',
        'default_value': '9',
      });
      utility.process_range_value({
        'props': props,
        'key': 'sub_title_order',
        'additionalCss': additionalCss,
        'selector': '%%order_class%% .df_ab_blurb_sub_title',
        'type': 'order',
        'default_value': '9',
      });
      utility.process_range_value({
        'props': props,
        'key': 'content_order',
        'additionalCss': additionalCss,
        'selector': '%%order_class%% .df_ab_blurb_description',
        'type': 'order',
        'default_value': '9',
      });
      utility.process_range_value({
        'props': props,
        'key': 'button_order',
        'additionalCss': additionalCss,
        'selector': '%%order_class%% .df_ab_blurb_button_wrapper',
        'type': 'order',
        'default_value': '9',
      });
      utility.process_range_value({
        'props': props,
        'key': 'badge_order',
        'additionalCss': additionalCss,
        'selector': '%%order_class%% .df_ab_blurb_badge_wrapper',
        'type': 'order',
        'default_value': '9',
      });
    }
    // Badge icon style
    utility.process_color({
      'props': props,
      'key': 'badge_icon_color',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_ab_blurb_badge .et-pb-icon',
      'type': 'color',
    })

    utility.process_range_value({
      'props': props,
      'key': 'badge_icon_size',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_ab_blurb_badge .et-pb-icon',
      'type': 'font-size',
    });
    // Icon style
    utility.process_color({
      'props': props,
      'key': 'blurb_icon_background_color',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .et-pb-icon.df-blurb-icon',
      'type': 'background-color',
    });
    utility.process_color({
      'props': props,
      'key': 'blurb_icon_color',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .et-pb-icon.df-blurb-icon',
      'type': 'color',
    })

    utility.process_range_value({
      'props': props,
      'key': 'icon_size',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .et-pb-icon.df-blurb-icon',
      'type': 'font-size',
    });
    // Image Style
    if (props.image) {
      utility.process_color({
        'props': props,
        'key': 'blurb_img_background_color',
        'additionalCss': additionalCss,
        'selector': '%%order_class%% .df_ab_blurb_image_img',
        'type': 'background-color',
      })
      utility.process_margin_padding({
        'props': props,
        'key': 'blurb_img_spacing',
        'additionalCss': additionalCss,
        'selector': '%%order_class%% .df_ab_blurb_image_img',
        'type': 'padding',
        'important': true
      });
    }

    if (props.blurb_img_margin) {
      utility.process_margin_padding({
        'props': props,
        'key': 'blurb_img_margin',
        'additionalCss': additionalCss,
        'selector': '%%order_class%% .df_ab_blurb_image',
        'type': 'margin',
        'important': false
      });
    }
    // content area background
    utility.df_process_bg({
      'props': props,
      'key': 'content_area_background',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_ab_blurb_content_container',
    });
    utility.df_process_bg({
      'props': props,
      'key': 'title_background',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_ab_blurb_title',
    });
    utility.df_process_bg({
      'props': props,
      'key': 'sub_title_background',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_ab_blurb_sub_title',
    });
    utility.df_process_bg({
      'props': props,
      'key': 'content_background',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_ab_blurb_description',
    });
    utility.df_process_bg({
      'props': props,
      'key': 'button_background',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_ab_blurb_button',
    });

    utility.df_process_bg({
      'props': props,
      'key': 'badge_background',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_ab_blurb_badge',
    });

    // list additional fields
    utility.df_process_string_attr({
      props: props,
      key: "ul_type",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_ab_blurb_description ul",
      type: "list-style-type",
      default_value: 'disc'
    });

    utility.df_process_string_attr({
      props: props,
      key: "ul_position",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_ab_blurb_description ul",
      type: "list-style-position",
      default_value: 'inside'
    });

    utility.df_process_string_attr({
      props: props,
      key: "ol_type",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_ab_blurb_description ol",
      type: "list-style-type",
      default_value: 'decimal'
    });

    utility.df_process_string_attr({
      props: props,
      key: "ol_position",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_ab_blurb_description ol",
      type: "list-style-position",
      default_value: 'inside'
    });

    // button Style
    if (props.button_full_width === 'on') {
      additionalCss.push([{
        selector: '%%order_class%% .df_ab_blurb_button',
        declaration: `display: block !important;`,
      }]);
    }

    if (props.button_full_width === 'off' && props.button_alignment !== '') {
      utility.df_process_string_attr({
        'props': props,
        'key': 'button_alignment',
        'additionalCss': additionalCss,
        'selector': '%%order_class%% .df_ab_blurb_button_wrapper',
        'type': 'text-align',
        'default_value': 'left'
      });
    }

    utility.process_margin_padding({
      'props': props,
      'key': 'button_wrapper_margin',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_ab_blurb_button_wrapper',
      'type': 'margin',
      'important': false
    });
    utility.process_margin_padding({
      'props': props,
      'key': 'button_wrapper_padding',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_ab_blurb_button_wrapper',
      'type': 'padding',
      'important': false
    });
    utility.process_margin_padding({
      'props': props,
      'key': 'button_margin',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_ab_blurb_button',
      'type': 'margin',
      'important': false
    });
    utility.process_margin_padding({
      'props': props,
      'key': 'button_padding',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_ab_blurb_button',
      'type': 'padding',
      'important': false
    });
    utility.process_margin_padding({
      'props': props,
      'key': 'button_icon_margin',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_ab_blurb_button .et-pb-icon.df-blurb-button-icon',
      'type': 'margin',
      'important': false
    });

    // Badge
    if ('on' === props.badge_enable && '' !== props.badge_alignment) {
      utility.df_process_string_attr({
        'props': props,
        'key': 'badge_alignment',
        'additionalCss': additionalCss,
        'selector': '%%order_class%% .df_ab_blurb_badge_wrapper',
        'type': 'text-align',
      });
    }

    additionalCss.push([{
      selector: '%%order_class%% .badge_text_1',
      declaration: `display: block !important;`,
    }]);
    additionalCss.push([{
      selector: '%%order_class%% .badge_text_2',
      declaration: `display: block !important;`,
    }]);

    utility.process_margin_padding({
      'props': props,
      'key': 'badge_wrapper_margin',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_ab_blurb_badge_wrapper',
      'type': 'margin',
      'important': false
    });
    utility.process_margin_padding({
      'props': props,
      'key': 'badge_margin',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_ab_blurb_badge',
      'type': 'margin',
      'important': false
    });
    utility.process_margin_padding({
      'props': props,
      'key': 'badge_padding',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_ab_blurb_badge',
      'type': 'padding',
      'important': false
    });
    utility.process_margin_padding({
      'props': props,
      'key': 'badge_icon_margin',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_ab_blurb_badge .et-pb-icon',
      'type': 'margin',
      'important': false
    });
    utility.process_margin_padding({
      'props': props,
      'key': 'badge_text_1_margin',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_ab_blurb_badge .badge_text_1 ',
      'type': 'margin',
      'important': false
    });
    utility.process_margin_padding({
      'props': props,
      'key': 'badge_text_1_padding',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_ab_blurb_badge .badge_text_1',
      'type': 'padding',
      'important': false
    });

    // wrapper spacing
    utility.process_margin_padding({
      'props': props,
      'key': 'wrapper_padding',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_ab_blurb_container',
      'type': 'padding',
      'important': false
    });
    utility.process_margin_padding({
      'props': props,
      'key': 'wrapper_margin',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_ab_blurb_container',
      'type': 'margin',
      'important': false
    });

    // Title , Sub title , content
    utility.df_process_string_attr({
      'props': props,
      'key': 'content_area_alignment',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_ab_blurb_content_container',
      'type': 'text-align',
      'default_value': 'left'
    });
    utility.process_margin_padding({
      'props': props,
      'key': 'content_area_margin',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_ab_blurb_content_container',
      'type': 'margin',
      'important': false
    });
    utility.process_margin_padding({
      'props': props,
      'key': 'content_area_padding',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_ab_blurb_content_container',
      'type': 'padding',
      'important': false
    });
    utility.process_margin_padding({
      'props': props,
      'key': 'title_margin',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_ab_blurb_title',
      'type': 'margin',
      'important': false
    });
    utility.process_margin_padding({
      'props': props,
      'key': 'title_padding',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_ab_blurb_title',
      'type': 'padding',
      'important': false
    });
    utility.process_margin_padding({
      'props': props,
      'key': 'sub_title_margin',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_ab_blurb_sub_title',
      'type': 'margin',
      'important': false
    });
    utility.process_margin_padding({
      'props': props,
      'key': 'sub_title_padding',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_ab_blurb_sub_title',
      'type': 'padding',
      'important': false
    });
    utility.process_margin_padding({
      'props': props,
      'key': 'content_margin',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_ab_blurb_description',
      'type': 'margin',
      'important': false
    });
    utility.process_margin_padding({
      'props': props,
      'key': 'content_padding',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_ab_blurb_description',
      'type': 'padding',
      'important': false
    });
    utility.process_margin_padding({
      'props': props,
      'key': 'blurb_icon_spacing',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .et-pb-icon.df-blurb-icon',
      'type': 'padding',
      'important': false
    });
    // icon font family
    utility.process_icon_font_style({
        'props'             : props,
        'additionalCss'     : additionalCss,
        'key'               : 'blurb_icon',
        'selector'          : '%%order_class%% .et-pb-icon.df-blurb-icon'
    })
    utility.process_icon_font_style({
        'props'             : props,
        'additionalCss'     : additionalCss,
        'key'               : 'badge_icon',
        'selector'          : '%%order_class%% .et-pb-icon.badge_icon'
    });
    // Button Icon Style

    utility.process_color({
      'props': props,
      'key': 'button_icon_color',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_ab_blurb_button .et-pb-icon.df-blurb-button-icon',
      'type': 'color',
    })

    utility.process_range_value({
      'props': props,
      'key': 'button_icon_size',
      'additionalCss': additionalCss,
      'default': '24px',
      'selector': '%%order_class%% .df_ab_blurb_button .et-pb-icon.df-blurb-button-icon',
      'type': 'font-size',
    });

    utility.process_icon_font_style({
      'props'             : props,
      'additionalCss'     : additionalCss,
      'key'               : 'button_font_icon',
      'selector'          : '%%order_class%% .et-pb-icon.df-blurb-button-icon'
    })

    return additionalCss;
  }


  render_image(props) {
    const utils = window.ET_Builder.API.Utils;
    let icon = '';

    if (props['blurb_icon_enable'] && props['blurb_icon_enable'] === 'on') {
      if (!props['blurb_icon'] || props['blurb_icon'] === '') {
        icon = '5'
      } else {
        icon = utils.processFontIcon(props['blurb_icon'])
      }
    }
    if (props['blurb_icon_enable'] === 'on') {
      return (
        <span className="et-pb-icon df-blurb-icon">{icon}</span>
      )
    }

    if (props['blurb_icon_enable'] === 'off') {
        const image = props.dynamic.image;
        if (image.loading) {
          // Let Divi render the loading placeholder.
          return image.render();
        }

      return (
        <img className="df_ab_blurb_image_img " src={ utility._renderDynamicContent(props , 'image' , false) } atl={props.alt_text} />
      )

    }
  }
  render_badge_icon(props) {
    const utils = window.ET_Builder.API.Utils;
    let icon = '';

    if (props['badge_icon_enable'] && props['badge_icon_enable'] === 'on') {
      if (!props['badge_icon'] || props['badge_icon'] === '') {
        icon = '5'
      } else {
        icon = utils.processFontIcon(props['badge_icon'])
      }
    }
    if (props['badge_icon_enable'] === 'on') {
      return (
        <span className="et-pb-icon badge_icon">{icon}</span>
      )
    }

    else {
      return null
    }
  }

  render_button(props) {
    const utils = window.ET_Builder.API.Utils;
    // const button_text = props['button_text'] ?<span>{props['button_text'] }</span> : '';
    // const button_url = props['button_url'] ? props['button_url'] : '';
    const button_font_icon  = props['button_font_icon'] ? props['button_font_icon'] : '5';
    const button_icon_pos   = props['button_icon_placement'];

    const button_icon =  'off' !== props['use_button_icon'] ?
        <span className={'et-pb-icon df-blurb-button-icon'}>
        {utils.processFontIcon(button_font_icon)}</span>
     : '';

    if ( props.dynamic.button_text.hasValue  || props.dynamic.button_url.hasValue  ) {
      return (
        <div className="df_ab_blurb_button_wrapper">
          <a className="df_ab_blurb_button" href={utility._renderDynamicContent( props, 'button_url', false)}>
            {button_icon_pos === 'left' ? button_icon : ''}
            <span>{utility._renderDynamicContent( props, 'button_text')}</span>
            {button_icon_pos === 'right' ? button_icon : ''}
          </a>
        </div>
      )
    } else return '';
  }


  render() {
    const props = this.props;
    const content = props.dynamic.content.hasValue  ?
      <div className="df_ab_blurb_description">{utility._renderDynamicContent( props, 'content')}</div> : '';

    const PlacementClass = (props.image_placement !== '' && props.blurb_icon_enable === 'off') ? 'placement_image_' + props.image_placement : 'placement_icon_' + props.image_placement;
    const iconAvailableClass = (props.blurb_icon_enable === 'on') ? 'icon' : 'image';

    const SubTitle_level = props.sub_title_level;
    const TitleLevel = props.title_level;

    const title_url = props.dynamic.title_url.hasValue ? utility._renderDynamicContent(props , 'title_url',false) : '';
    const title_element_with_link =  props.dynamic.title.hasValue ?
      <a href={ title_url } className="df_ab_title_link" >{utility._renderDynamicContent(props , 'title')}</a> : '';

    const TitleHtml = props.dynamic.title.hasValue ?
      <TitleLevel className="df_ab_blurb_title">{title_url !== '' ? title_element_with_link : utility._renderDynamicContent(props, 'title')}</TitleLevel> : '';

    const SubTitleHtml = props.dynamic.sub_title.hasValue ?
      <SubTitle_level className="df_ab_blurb_sub_title">{utility._renderDynamicContent(props , 'sub_title')}</SubTitle_level> : '';

    const ImageHtml = ('off' !== props.blurb_icon_enable && 'top' === props.image_placement) ?
      <div className={"df_ab_blurb_image " + iconAvailableClass + " " + PlacementClass}> {this.render_image(props)}</div>
      :
      <div className={"df_ab_blurb_image " + PlacementClass}> {this.render_image(props)}</div>;

    const BadgeText1 = (props.badge_enable === 'on' && props.dynamic.badge.hasValue ) ?
      <span className="badge_text_1">{utility._renderDynamicContent(props , 'badge')} </span> : '';

    const BadgeText2 = (props.badge_enable === 'on' && props.dynamic.badge_text_2.hasValue ) ?
      <span className="badge_text_2">{utility._renderDynamicContent(props , 'badge_text_2')}</span> : '';

    const BadgeTextHtml = (props.badge && props.badge !== '' && props.badge_icon_enable !== 'on') ?
      <span className="badge_text_wrapper">{BadgeText1} {BadgeText2}</span> : '';

    const BadgeHtml = (props.badge_enable === 'on') ?
      <div className="df_ab_blurb_badge_wrapper"> <div className="df_ab_blurb_badge">{this.render_badge_icon(props)} {BadgeTextHtml}</div></div> : '';

    const HtmlCode = ('outside' !== props.image_icon_container_position) ?
      <div className="df_ab_blurb_container">
        <div className="df_ab_blurb_content_container">
          {ImageHtml}
          {TitleHtml}{SubTitleHtml}{content}{this.render_button(props)} {BadgeHtml}
        </div>
      </div>
      :
      <div className="df_ab_blurb_container">
        {ImageHtml}
        <div className="df_ab_blurb_content_container"> {TitleHtml}{SubTitleHtml}{content}{this.render_button(props)}{BadgeHtml}</div>
      </div>
    return (
      <Fragment>
        {HtmlCode}
      </Fragment >
    );
  }
}

export default AdvancedBlurb;
