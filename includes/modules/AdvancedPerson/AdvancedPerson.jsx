// External Dependencies
import React, { Component, Fragment } from 'react';
import utility from '../../../scripts/df_scripts/utilities';
// Internal Dependencies
import './style.css';

class AdvancedPerson extends Component {

  static slug = 'difl_advanced_person';

  static css(props) {
    const utils = window.ET_Builder.API.Utils;
    const additionalCss = [];

    utility.df_process_string_attr({
      'props': props,
      'key': 'image_alignment',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_person_photo_wrapper',
      'type': 'margin',
    });

    utility.df_process_string_attr({
      'props': props,
      'key': 'social_section_align',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_person_socail_wrapper',
      'type': 'text-align',
      'default_value': 'center'
    });

    if (props['image_scale_type'] === 'c4-image-rotate-left') {
      additionalCss.push([{
        'selector': '%%order_class%% .df_ap_person_container:hover .c4-image-rotate-left img.person_photo, %%order_class%% .df_ap_person_container:focus.c4-image-rotate-left img.person_photo',
        'declaration': `transform: scale(${props.image_scale_value}) rotate(-15deg);`
      }]);
    }
    if (props['image_scale_type'] === 'c4-image-rotate-right') {
      additionalCss.push([{
        'selector': '%%order_class%% .df_ap_person_container:hover .c4-image-rotate-right img.person_photo, %%order_class%% .df_ap_person_container:focus.c4-image-rotate-right img.person_photo',
        'declaration': `transform: scale(${props.image_scale_value}) rotate(15deg);`
      }]);
    }

    if (props.overlay === 'on' && props.style_type === 'default_style') {

      utility.df_process_bg({
        'props': props,
        'key': 'default_overlay_background',
        'additionalCss': additionalCss,
        'selector': '%%order_class%% .c4-izmir .df-overlay',
      });
    }

    utility.process_range_value({
      'props': props,
      'key': 'image_wrapper_max_width',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_person_photo_wrapper',
      'type': 'max-width',
      'unit': '%'
    });
    utility.process_range_value({
      'props': props,
      'key': 'content_zindex',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_ap_person_desc_wrapper',
      'type': 'z-index',
      'default_value': '0',
      'important': true
    });

    utility.process_range_value({
      'props': props,
      'key': 'image_wrapper_zindex',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_person_photo_wrapper',
      'type': 'z-index',
      'default_value': '0',
      'important': true
    });
    // Border Animation
    if (props.border_anim === 'on') {
      additionalCss.push([{
        selector: '%%order_class%% .c4-izmir',
        declaration: `--border-color: ${props.anm_border_color};`,
      }]);

      utility.process_range_value({
        'props': props,
        'key': 'anm_border_width',
        'additionalCss': additionalCss,
        'selector': '%%order_class%% .c4-izmir',
        'type': '--border-width',
        'unit': 'px'
      });
      utility.process_range_value({
        'props': props,
        'key': 'anm_border_margin',
        'additionalCss': additionalCss,
        'selector': '%%order_class%% .c4-izmir',
        'type': '--border-margin',
        'unit': 'px'
      });
    }
    if (props.image_force_to_fullwidth === 'on' && props.enable_alternative_photo ==='off') {
      additionalCss.push([{
        selector: '%%order_class%% .c4-izmir',
        declaration: `display: block;`
      }]);
    }
    if (props.make_full_with_icon === 'on') {
      additionalCss.push([{
        selector: '%%order_class%% .df_person_socail_wrapper',
        declaration: `display: flex;`
      }]);

      additionalCss.push([{
        selector: '%%order_class%% .df_person_socail_wrapper .df_person_social_icon',
        declaration: `flex-grow: 1;
                    margin: 0px;`
      }]);
    }
    utility.process_range_value({
      'props': props,
      'key': 'anm_content_padding',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .c4-izmir',
      'type': '--padding',
      'unit': 'em'
    });

    // transform styles
    additionalCss.push([{
      selector: '%%order_class%% .df_ap_person_container .df_ap_person_desc',
      declaration: `transform: ${AdvancedPerson.df_transform_values(props.anim_direction).hover};`,
    }]);
    additionalCss.push([{
      selector: '%%order_class%% .df_ap_person_container:hover .df_ap_person_desc',
      declaration: `transform: ${AdvancedPerson.df_transform_values(props.anim_direction).default};`,
    }]);


    utility.df_process_string_attr({
      'props': props,
      'key': 'social_section_align',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_person_socail_wrapper',
      'type': 'text-align',
      'default_value': 'left'
    });
    // Background 
    utility.df_process_bg({
      'props': props,
      'key': 'name_background',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_person_name',
    });
    utility.df_process_bg({
      'props': props,
      'key': 'role_background',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_person_role',
    });
    utility.df_process_bg({
      'props': props,
      'key': 'description_background',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_person_description',
    });
    // if (props.style_type === 'default_style') {
    utility.df_process_bg({
      'props': props,
      'key': 'content_background',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_ap_person_desc_wrapper',
    });
    //}
    if (props.style_type === 'ekip_style_2') {
      utility.df_process_bg({
        'props': props,
        'key': 'desc_wrapper_background',
        'additionalCss': additionalCss,
        'selector': '%%order_class%% .df_ap_person_desc_wrapper',
      });
    }

    utility.df_process_bg({
      'props': props,
      'key': 'ekip_overlay_background',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_person_overlay',
    });
    utility.df_process_bg({
      'props': props,
      'key': 'image_wrapper_background',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_person_photo_wrapper',
    });
    utility.df_process_bg({
      'props': props,
      'key': 'social_wrapper_background',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_person_socail_wrapper',
    });

    utility.df_process_bg({
      'props': props,
      'key': 'icon_background',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_person_social_icon',
    });

    utility.df_process_bg({
      'props': props,
      'key': 'facebook_background',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_person_social_icon.facebook',
    });

    utility.df_process_bg({
      'props': props,
      'key': 'twitter_background',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_person_social_icon.twitter',
    });

    utility.df_process_bg({
      'props': props,
      'key': 'linkedin_background',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_person_social_icon.linkedin',
    });

    utility.df_process_bg({
      'props': props,
      'key': 'instagram_background',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_person_social_icon.instagram',
    });

    utility.df_process_bg({
      'props': props,
      'key': 'pinterest_background',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_person_social_icon.pinterest',
    });

    utility.df_process_bg({
      'props': props,
      'key': 'email_background',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_person_social_icon.email',
    });

    utility.df_process_bg({
      'props': props,
      'key': 'phone_background',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_person_social_icon.phone',
    });
    // Icon Size
    utility.process_range_value({
      'props': props,
      'key': 'icon_size',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_person_social_icon .et-pb-icon',
      'type': 'font-size',
    });
    // Icon Color
    utility.process_color({
      'props': props,
      'key': 'icon_color',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_person_social_icon .et-pb-icon',
      'type': 'color',
    });

    utility.process_color({
      'props': props,
      'key': 'facebook_icon_color',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_person_social_icon.facebook .et-pb-icon',
      'type': 'color',
    });

    utility.process_color({
      'props': props,
      'key': 'twitter_icon_color',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_person_social_icon.twitter .et-pb-icon',
      'type': 'color',
    })

    utility.process_color({
      'props': props,
      'key': 'linkedin_icon_color',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_person_social_icon.linkedin .et-pb-icon',
      'type': 'color',
    })

    utility.process_color({
      'props': props,
      'key': 'instagram_icon_color',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_person_social_icon.instagram .et-pb-icon',
      'type': 'color',
    })

    utility.process_color({
      'props': props,
      'key': 'pinterest_icon_color',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_person_social_icon.pinterest .et-pb-icon',
      'type': 'color',
    })

    utility.process_color({
      'props': props,
      'key': 'email_icon_color',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_person_social_icon.email .et-pb-icon',
      'type': 'color',
    })

    utility.process_color({
      'props': props,
      'key': 'phone_icon_color',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_person_social_icon.phone .et-pb-icon',
      'type': 'color',
    })

    // Padding Margin
    utility.process_margin_padding({
      'props': props,
      'key': 'module_wrapper_margin',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_ap_person_wrapper',
      'type': 'margin',
      'important': false
    });
    utility.process_margin_padding({
      'props': props,
      'key': 'module_wrapper_padding',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_ap_person_wrapper',
      'type': 'padding',
      'important': false
    });

    utility.process_margin_padding({
      'props': props,
      'key': 'image_wrapper_margin',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_person_photo_wrapper',
      'type': 'margin',
      'important': false
    });
    utility.process_margin_padding({
      'props': props,
      'key': 'image_wrapper_padding',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_person_photo_wrapper',
      'type': 'padding',
      'important': false
    });

    utility.process_margin_padding({
      'props': props,
      'key': 'content_margin',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_ap_person_desc_wrapper',
      'type': 'margin',
      'important': false
    });

    utility.process_margin_padding({
      'props': props,
      'key': 'content_padding',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_ap_person_desc_wrapper',
      'type': 'padding',
      'important': false
    });

    utility.process_margin_padding({
      'props': props,
      'key': 'details_wrapper_margin',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_person_details',
      'type': 'margin',
      'important': false
    });
    utility.process_margin_padding({
      'props': props,
      'key': 'details_wrapper_padding',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_person_details',
      'type': 'padding',
      'important': false
    });

    utility.process_margin_padding({
      'props': props,
      'key': 'social_wrapper_margin',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_person_socail_wrapper',
      'type': 'margin',
      'important': false
    });
    utility.process_margin_padding({
      'props': props,
      'key': 'social_wrapper_padding',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_person_socail_wrapper',
      'type': 'padding',
      'important': false
    });

    utility.process_margin_padding({
      'props': props,
      'key': 'name_margin',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_person_name',
      'type': 'margin',
      'important': false
    });
    utility.process_margin_padding({
      'props': props,
      'key': 'name_padding',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_person_name',
      'type': 'padding',
      'important': false
    });

    utility.process_margin_padding({
      'props': props,
      'key': 'role_margin',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_person_role',
      'type': 'margin',
      'important': false
    });
    utility.process_margin_padding({
      'props': props,
      'key': 'role_padding',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_person_role',
      'type': 'padding',
      'important': false
    });

    utility.process_margin_padding({
      'props': props,
      'key': 'description_margin',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_person_description',
      'type': 'margin',
      'important': false
    });
    utility.process_margin_padding({
      'props': props,
      'key': 'description_padding',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_person_description',
      'type': 'padding',
      'important': false
    });
    utility.process_margin_padding({
      'props': props,
      'key': 'image_margin',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_person_photo',
      'type': 'margin',
      'important': false
    });
    utility.process_margin_padding({
      'props': props,
      'key': 'image_padding',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_person_photo',
      'type': 'padding',
      'important': false
    });

    utility.process_margin_padding({
      'props': props,
      'key': 'social_margin',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_person_socail_wrapper .df_person_social_icon',
      'type': 'margin',
      'important': false
    });
    utility.process_margin_padding({
      'props': props,
      'key': 'social_padding',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_person_social_icon',
      'type': 'padding',
      'important': false
    });

    utility.process_margin_padding({
      'props': props,
      'key': 'first_social_margin',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_person_social_icon:first-child',
      'type': 'margin',
      'important': true
    });

    utility.process_margin_padding({
      'props': props,
      'key': 'last_social_margin',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_person_social_icon:last-child',
      'type': 'margin',
      'important': true
    });
    // Z index
    utility.process_range_value({
      'props': props,
      'key': 'image_zindex',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_person_photo_wrapper',
      'type': 'z-index',
      'default_value': '0',
    });
    utility.process_range_value({
      'props': props,
      'key': 'name_zindex',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_person_name',
      'type': 'z-index',
      'default_value': '0',
    });
    utility.process_range_value({
      'props': props,
      'key': 'role_zindex',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_person_role',
      'type': 'z-index',
      'default_value': '0',
    });
    utility.process_range_value({
      'props': props,
      'key': 'description_zindex',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_person_descrption',
      'type': 'z-index',
      'default_value': '0',
    });
    utility.process_range_value({
      'props': props,
      'key': 'social_zindex',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_person_socail_wrapper ',
      'type': 'z-index',
      'default_value': '0',
    });
    // custom transition
    utility.df_process_transition({
      'props': props,
      'key': 'overlay_transition',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_person_overlay , %%order_class%% .df_ap_person_container.df_ap_ekip_style_2 .df_ap_person_desc',
      'properties': ['opacity', 'transform']
    });

    return additionalCss;
  }
  render_content(props) { // Depricated from 1.2.3 version

    if (props.dynamic.ap_description) {
      return { __html: props.ap_description }
    }

  }
  render_image(props, key, customClass = '') {
    const image = props.dynamic[key]
    if (image.loading) {
      // Let Divi render the loading placeholder.
      return image.render();
    }

    var imageHtml = <img className={"person_photo " + customClass} src={ utility._renderDynamicContent(props , key, false)} alt="person_photo" />;

    return imageHtml;
  }

  render_socail_icon(key) {
    const utils = window.ET_Builder.API.Utils;
    let icon = '';
    if (key) {
      icon = utils.processFontIcon(key)
      return (
        <span className="et-pb-icon socail_icon">{icon}</span>
      )
    } else {
      return null
    }
  }
  // get transform values
  static df_transform_values(key = 'bottom') {
    const transfor_values = {
      'top': {
        'default': 'translateY(0px)',
        'hover': 'translateY(-100%)'
      },
      'bottom': {
        'default': 'translateY(0px)',
        'hover': 'translateY(100%)'
      },
      'left': {
        'default': 'translateX(0px)',
        'hover': 'translateX(-100%)'
      },
      'right': {
        'default': 'translateX(0px)',
        'hover': 'translateX(100%)'
      },
      'center': {
        'default': 'scale(1)',
        'hover': 'scale(0)'
      },
      'top_right': {
        'default': 'translateX(0px) translateY(0px)',
        'hover': 'translateX(100%) translateY(-100%)'
      },
      'top_left': {
        'default': 'translateX(0px) translateY(0px)',
        'hover': 'translateX(-100%) translateY(-100%)'
      },
      'bottom_right': {
        'default': 'translateX(0px) translateY(0px)',
        'hover': 'translateX(100%) translateY(100%)'
      },
      'bottom_left': {
        'default': 'translateX(0px) translateY(0px)',
        'hover': 'translateX(-100%) translateY(100%)'
      },
    };
    return transfor_values[key];
  }
  render() {
    const props = this.props;


    const TitleLevel = props.ap_name_tag ? props.ap_name_tag : 'h4';
    const SubTitleLevel = props.ap_role_tag ? props.ap_role_tag : 'h5';

    const NameHtml = props.dynamic.ap_name.hasValue ?
      <TitleLevel className="df_person_name">{ utility._renderDynamicContent(props , 'ap_name')}</TitleLevel> : '';

    const RoleHtml = props.ap_role && props.dynamic.ap_name.hasValue ?
      <SubTitleLevel className="df_person_role">{ utility._renderDynamicContent(props , 'ap_role')} </SubTitleLevel> : '';

      const content = props.dynamic.ap_description.hasValue ?
        <div className="df_person_description">  { utility._renderDynamicContent(props , 'ap_description')} </div>: '';
      

    const detailHtml = (NameHtml !== '' || RoleHtml !== '' || content !== '') ?
      <div className="df_person_details">
        {NameHtml}
        {RoleHtml}
        {content}
      </div> : '';
    // const fb = props.dynamic.ap_facebook;
    // if (fb.loading) {
    //   // Let Divi render the loading placeholder.
    //   return fb.render();
    // }
    const facebook = props.dynamic.ap_facebook.hasValue ?
      <a href={ utility._renderDynamicContent(props , 'ap_facebook', false)} className="df_person_social_icon facebook" target="_blank" df-tooltip="Facebook" title="" aria-expanded="false"> {this.render_socail_icon('%%291%%')} </a> : '';
    const twitter = props.dynamic.ap_twitter.hasValue?
      <a href= { utility._renderDynamicContent(props , 'ap_twitter', false)} className="df_person_social_icon twitter" target="_blank" df-tooltip="Twitter" title="" aria-expanded="false"> {this.render_socail_icon('%%292%%')} </a> : '';
    const linkedin = props.dynamic.ap_linkedin.hasValue ?
      <a href={ utility._renderDynamicContent(props , 'ap_linkedin', false)} className="df_person_social_icon linkedin" target="_blank" df-tooltip="Linkedin" title="" aria-expanded="false"> {this.render_socail_icon('%%301%%')}  </a> : '';
    const instagram = props.dynamic.ap_instagram.hasValue ?
      <a href={ utility._renderDynamicContent(props , 'ap_instagram', false)} className="df_person_social_icon instagram" target="_blank" df-tooltip="Instagram" title="" aria-expanded="false">{this.render_socail_icon('%%298%%')} </a> : '';
    const pinterest = props.dynamic.ap_pinterest.hasValue ?
      <a href={ utility._renderDynamicContent(props , 'ap_pinterest', false)} className="df_person_social_icon pinterest" target="_blank" df-tooltip="Pinterest" title="" aria-expanded="false"> {this.render_socail_icon('%%293%%')} </a> : '';
    const email =props.dynamic.ap_email.hasValue ?
      <a href={ utility._renderDynamicContent(props , 'ap_email', false)} className="df_person_social_icon email" target="_blank" df-tooltip="Email" title="" aria-expanded="false"> {this.render_socail_icon('%%238%%')}  </a> : '';
    const phone = props.dynamic.ap_phone.hasValue ?
      <a href={ utility._renderDynamicContent(props , 'ap_phone', false)} className="df_person_social_icon phone" target="_blank" df-tooltip="Phone" title="" aria-expanded="false">{this.render_socail_icon('%%264%%')} </a> : '';


    const border_anim_class = (this.props['border_anim'] === 'on' && this.props['style_type'] === 'default_style') ? this.props['border_anm_style'] : '';
    const make_vertical_icon_class = ('on' === this.props['make_vertical_icon'] && this.props['style_type'] === 'default_style') ? 'vertical' : '';

    const socailHtml = ('' !== facebook || '' !== twitter || '' !== linkedin || '' !== instagram || '' !== pinterest || '' !== email || '' !== phone) ?
      <div className={"df_person_socail_wrapper " + make_vertical_icon_class}>
        {facebook}
        {twitter}
        {linkedin}
        {instagram}
        {pinterest}
        {email}
        {phone}
      </div> : '';
    // icon animation
    const icon_reveal_class = this.props['always_show_icon'] === 'on' ? 'always-show-title' : this.props['icon_reveal_caption'];

    const overlay_social = this.props['enable_icon_on_overlay'] === 'on' ?
      <div className={icon_reveal_class}>{socailHtml}</div> : '';

    const content_position_class = this.props['content_position'] !== '' ? this.props['content_position'] : '';

    const overlay_content = (this.props['style_type'] === 'default_style' && this.props['enable_icon_on_overlay'] === 'on') ?
      <figcaption className={"df_ap_person_content " + content_position_class}>
        {overlay_social ? overlay_social : ''}
      </figcaption> :
      <figcaption className="df_ap_person_content"></figcaption>;
    const c4_izmir_class = (props['overlay'] === 'on' || props['border_anim'] === 'on' || props['enable_alternative_photo'] === 'on' || props['enable_icon_on_overlay'] === 'on') ? 'c4-izmir' : 'c4-izmir';
    // Photo Element 

    const alterImage = (props.enable_alternative_photo === 'on' && props.ap_alternative_photo !== ''  && props.style_type === 'default_style') ?
      <div className="alter_image">
        {this.render_image(props, 'ap_photo')}
        {this.render_image(props, 'ap_alternative_photo', 'img-top')}
      </div>
      :
      this.render_image(props, 'ap_photo');
    const imageHtml = props.ap_photo ?
      <div className={"df_person_photo_wrapper "}>
        <div className={c4_izmir_class + " " + border_anim_class}>
          {(props.overlay === 'on' && props.enable_alternative_photo !== 'on') ? <span className="df-overlay"></span> : ''}
          <div className="df_person_photo">
            {alterImage}
          </div>
          {overlay_content}
        </div>
      </div> : '';

    let HtmlCode = "";
    if (this.props.style_type === 'default_style') {
      HtmlCode = <div className="df_ap_person_container">
        <div className={"df_ap_person_wrapper " + this.props.image_scale_type}>
          {imageHtml}
          <div className="df_ap_person_desc_wrapper">
            <div className="df_person_details">
              {props.enable_name_on_overlay !== 'on' ? NameHtml : ''}
              {props.enable_role_on_overlay !== 'on' ? RoleHtml : ''}
              {content}
            </div>
            {props.enable_icon_on_overlay !== 'on' || this.props['enable_icon_on_overlay'] !== 'on' ? socailHtml : ''}
          </div>
        </div>
      </div>;
    } else if (this.props.style_type === 'ekip_style') {
      const overlay_class = 'df_person_overlay';
      HtmlCode = <div className="df_ap_person_container df_ap_ekip_style">
        <div className="df_ap_person_wrapper">

          {imageHtml}
          <div className={"df_ap_person_desc " + overlay_class}>
            <div className="df_ap_person_desc_wrapper">
              {detailHtml}
              {socailHtml}
            </div>
          </div>

        </div>
      </div>;
    }

    else if (this.props.style_type === 'ekip_style_2') {
      HtmlCode = <div className="df_ap_person_container df_ap_ekip_style_2">
        <div className={"df_ap_person_wrapper " + this.props.image_scale_type}>
          {imageHtml}
          <div className="df_ap_person_desc">
            <div className="df_ap_person_desc_wrapper">
              {detailHtml}
              {socailHtml}
            </div>
          </div>

        </div>
      </div>;
    }

    return (
      <Fragment>
        {HtmlCode}
      </Fragment >
    );
  }
}

export default AdvancedPerson;
