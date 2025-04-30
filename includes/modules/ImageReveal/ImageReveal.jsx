// External Dependencies
import React, {Component} from 'react';

// Internal Dependencies
import './style.css';
import utility from '../../../scripts/df_scripts/utilities';

class ImageReveal extends Component {
  static slug = 'difl_imagereveal';

  constructor(props) {
    super(props);

  }

  static css(props) {
    const additionalCss = [];
    let view_mode = window.ET_Builder.API.State.View_Mode.current;
    const hex2rgba = (hex, alpha = 1) => {
      if(!isHexColor(hex)) return hex;
      const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));
      return `rgba(${r},${g},${b},${alpha})`;
    };
    const  isHexColor = (hex) => {
      let Reg_Exp = /^#[0-9A-F]{6}$/i;
      return Reg_Exp.test(hex);
    }
    // Overlay Container Class
    const __class__overlay_container = '%%order_class%% .difl__image_reveal_wrapper .difl__image_reveal_overlay';
    const __class__hover_overlay_content = '%%order_class%% .difl__image_reveal_wrapper .difl__image_reveal_hover_overlay .difl__image_reveal_hover_overlay_content';

    // Overlay field diclaretion
    const __field__overlay_enable = props.field_overlay_enable;
    const __field__overlay_color = props.field_overlay_color;
    const __field__overlay_opacity = props.field_overlay_opacity;
    const __field__reveal_directions = props.field_reveal_directions;

    //  Hover Overlay Field Declaration
    const __field__hover_overlay_enable = props.field_hover_overlay_enable;

    // Alignment Field Declaration
    const __field__alignment = props.align;
    const __field__alignment_phone = props.align_phone;
    const __field__alignment_tablet = props.align_tablet;

    // Caption Field Declaration
    const __field__caption_enable = props.field_caption_enable;
    const __field__caption_background = props.field_caption_background;
    const __field__caption_padding = props.field_caption_padding;

    // Reveal Effect Field Declaration
    const __field__reveal_effect_delay = props.field_reveal_effect_delay;
    const __field__reveal_effect_time = props.field_reveal_effect_animation_time;

    // Placeholder Field Declaration
    const __field__rounded_corner = props.field_rounded_corner;

    // Hover Zoom Effect Field Declaration
    const __field__hover_image_effect_enable = props.field_hover_image_effect_enable;
    const __field__hover_image_effect_style  = props.field_effect_style;
    const __field__zoom_scale                = props.field_zoom_scale;
    const __field__zooming_time              = props.field_zooming_time;
    const __field__Speed_curve               = props.field_Speed_curve;
    const __field__zoom_rotate               = props.field_zoom_rotate;
    const __field__zooming_blur_out_time     = props.field_zooming_blur_out_time;
    const __field__zooming_blur_level        = props.field_zooming_blur_level;
    const __field__zooming_grayscale         = props.field_grayscale;

    // Reveal Color
    if('on' === props.reveal_color_bg_use_gradient){
      additionalCss.push([
        {
          selector: '%%order_class%% .difl__image_reveal_wrapper .difl__image_reveal_element',
          declaration: 'background-color: transparent !important;',
        }]);
    }else{
      additionalCss.push([
        {
          selector: '%%order_class%% .difl__image_reveal_wrapper .difl__image_reveal_element',
          declaration: 'background-color: #ffffff',
        }]);
    }
    utility.df_process_bg({
      props: props,
      key: 'reveal_color_bg',
      additionalCss: additionalCss,
      selector: '%%order_class%% .difl__image_reveal_wrapper .difl__image_reveal_element',
    });

    // Placeholder Color
    utility.df_process_bg({
      props: props,
      key: 'field_placeholder_bg',
      additionalCss: additionalCss,
      selector: '%%order_class%% .difl__image_reveal_wrapper .difl__image_wrap',
    });

    // Placeholder Rounded Corner
    if ('undefined' !== typeof props.field_rounded_corner_phone && 'phone' ===
        view_mode) {
      var roundedCorner = props.field_rounded_corner_phone;
      var roundedCorner_devide = roundedCorner.split('|');
      additionalCss.push([
        {
          selector: '%%order_class%% .difl__image_reveal_wrapper .difl__image_wrap',
          declaration: `border-top-left-radius:${roundedCorner_devide[1]};border-top-right-radius:${roundedCorner_devide[2]};border-bottom-right-radius:${roundedCorner_devide[3]};border-bottom-left-radius:${roundedCorner_devide[4]};`,
        }]);
    } else if ('undefined' !== typeof props.field_rounded_corner_tablet &&
        'tablet' === view_mode) {
      var roundedCorner = props.field_rounded_corner_tablet;
      var roundedCorner_devide = roundedCorner.split('|');
      additionalCss.push([
        {
          selector: '%%order_class%% .difl__image_reveal_wrapper .difl__image_wrap',
          declaration: `border-top-left-radius:${roundedCorner_devide[1]};border-top-right-radius:${roundedCorner_devide[2]};border-bottom-right-radius:${roundedCorner_devide[3]};border-bottom-left-radius:${roundedCorner_devide[4]};`,
        }]);
    } else if ('undefined' !== typeof __field__rounded_corner) {
      var roundedCorner = props.field_rounded_corner;
      var roundedCorner_devide = roundedCorner.split('|');
      additionalCss.push([
        {
          selector: '%%order_class%% .difl__image_reveal_wrapper .difl__image_wrap',
          declaration: `border-top-left-radius:${roundedCorner_devide[1]};border-top-right-radius:${roundedCorner_devide[2]};border-bottom-right-radius:${roundedCorner_devide[3]};border-bottom-left-radius:${roundedCorner_devide[4]};`,
        }]);
    }

    // Force Full Width handler
    if ('on' === props.force_fullwidth) {
      additionalCss.push([
        {
          selector: '%%order_class%%',
          declaration: 'width: 100% !important; max-width: 100% !important;',
        }, {
          selector: '%%order_class%% .difl__image_wrap',
          declaration: 'width: 100% !important; max-width: 100% !important;',
        }, {
          selector: '%%order_class%% .difl__image_wrap img',
          declaration: 'width: 100% !important; max-width: 100% !important;',
        }]);
    }

    // Caption handler
    if ('undefined' !== typeof __field__caption_enable && 'on' ===
        __field__caption_enable) {
      const caption_bg = 'undefined' !== typeof __field__caption_background &&
      '' !== __field__caption_background ?
          __field__caption_background :
          'transparent';
      const caption_padding = 'undefined' !== typeof __field__caption_padding ?
          __field__caption_padding :
          '0px|0px|0px|0px';
      const caption_padding_devide = caption_padding.split('|');
      additionalCss.push([
        {
          selector: '%%order_class%% .difl__image_reveal_wrapper .difl__image_wrap .difl_caption',
          declaration: `
              background:${caption_bg};
              padding-top:${caption_padding_devide[0]};
              padding-right:${caption_padding_devide[1]};
              padding-bottom:${caption_padding_devide[2]};
              padding-left:${caption_padding_devide[3]};
            `,
        }]);
    }

    // Alignment handler
    if ('undefined' !== typeof __field__alignment && 'phone' === view_mode) {
      additionalCss.push([
        {
          selector: '%%order_class%%',
          declaration: `text-align:${__field__alignment_phone};margin-left:${__field__alignment_phone};margin-right:${__field__alignment_phone};margin-${__field__alignment_phone}:${'undefined' !==
          typeof __field__alignment_phone && 'center' !==
          __field__alignment_phone ? '0' : ''};`,
        }]);
    } else if ('undefined' !== typeof __field__alignment && 'tablet' ===
        view_mode) {
      additionalCss.push([
        {
          selector: '%%order_class%%',
          declaration: `text-align:${__field__alignment_tablet};margin-left:${__field__alignment_tablet};margin-right:${__field__alignment_tablet};margin-${__field__alignment_tablet}:${'undefined' !==
          typeof __field__alignment_tablet && 'center' !==
          __field__alignment_tablet ? '0' : ''};`,
        }]);
    } else if ('undefined' !== typeof __field__alignment) {
      additionalCss.push([
        {
          selector: '%%order_class%%',
          declaration: `text-align: ${__field__alignment};margin-${__field__alignment}: ${'undefined' !==
          typeof __field__alignment && 'center' !== __field__alignment ?
              '0' :
              ''};`,
        }]);
    }

    // Overlay Style handle
    if ('undefined' !== typeof __field__overlay_enable) {
      const color = hex2rgba(
          __field__overlay_color ? __field__overlay_color : '#FFFFFF',
          __field__overlay_opacity ? __field__overlay_opacity : 0.15);
      additionalCss.push([
        {
          selector: __class__overlay_container,
          declaration: `background:${color};`,
        }]);
    }

    // Reveal Animation Time, Delay Style handle
    if ('undefined' !== typeof __field__reveal_directions) {
      const additionalCssItems = [];
      const additionalCssItems2 = [];
      const additionalCssItems3 = [];
      const delay = props.field_reveal_delay ? props.field_reveal_delay : 0;
      const anim_time = props.field_reveal_animation_time ?
          props.field_reveal_animation_time :
          1;

      const reveal_in_anim    = parseFloat(anim_time) / 2.0;
      const reveal_out_anim = parseFloat(anim_time) / 2.0;
      const reveal_out_delay = parseFloat(delay) + parseFloat(reveal_in_anim);
      switch (__field__reveal_directions) {
        case 'reveal_ltr':
          additionalCssItems.push({
            selector: '%%order_class%% .difl__image_reveal_lr img',
            declaration: `
                            animation: fadeInImg ${anim_time}s ${reveal_out_delay}s forwards;
                            -webkit-animation: fadeInImg ${anim_time}s ${reveal_out_delay}s forwards;
                        `,
          });
          additionalCssItems2.push({
            selector: '%%order_class%% .difl__image_reveal_lr .difl__image_reveal_overlay',
            declaration: `
                            animation: fadeInImg ${anim_time}s ${reveal_out_delay}s linear forwards;
                            -webkit-animation: fadeInImg ${anim_time}s ${reveal_out_delay}s linear forwards;
                        `,
          });
          additionalCssItems3.push({
            selector: '%%order_class%% .difl__image_reveal_lr .difl__image_reveal',
            declaration: `
                            -webkit-animation: imageRevealLR ${reveal_in_anim}s ${delay}s, imageRevealOutLR ${reveal_out_anim}s ${reveal_out_delay}s;
                            animation: imageRevealLR ${reveal_in_anim}s ${delay}s, imageRevealOutLR ${reveal_out_anim}s ${reveal_out_delay}s;
                            -webkit-animation-fill-mode: forwards;
                            animation-fill-mode: forwards;
                        `,
          });
          break;
        case 'reveal_rtl':
          additionalCssItems.push({
            selector: '%%order_class%% .difl__image_reveal_rl img',
            declaration: `
                            animation: fadeInImg 0s ${reveal_out_delay}s forwards;
                            -webkit-animation: fadeInImg 0s ${reveal_out_delay}s forwards;
                        `,
          });
          additionalCssItems2.push({
            selector: '%%order_class%% .difl__image_reveal_rl .difl__image_reveal_overlay',
            declaration: `
                            animation: fadeInImg ${anim_time}s ${reveal_out_delay}s linear forwards;
                            -webkit-animation: fadeInImg ${anim_time}s ${reveal_out_delay}s linear forwards;
                        `,
          });
          additionalCssItems3.push({
            selector: '%%order_class%% .difl__image_reveal_rl .difl__image_reveal',
            declaration: `
                            -webkit-animation: imageRevealRL ${reveal_in_anim}s ${delay}s, imageRevealOutRL ${reveal_out_anim}s ${reveal_out_delay}s;
                            animation: imageRevealRL ${reveal_in_anim}s ${delay}s, imageRevealOutRL ${reveal_out_anim}s ${reveal_out_delay}s;
                            -webkit-animation-fill-mode: forwards;
                            animation-fill-mode: forwards;
                        `,
          });
          break;
        case 'reveal_ttb':
          additionalCssItems.push({
            selector: '%%order_class%% .difl__image_reveal_tb img',
            declaration: `
                            animation: fadeInImg 0s ${reveal_out_delay}s forwards;
                            -webkit-animation: fadeInImg 0s ${reveal_out_delay}s forwards;
                        `,
          });
          additionalCssItems2.push({
            selector: '%%order_class%% .difl__image_reveal_tb .difl__image_reveal_overlay',
            declaration: `
                            animation: fadeInImg ${anim_time}s ${reveal_out_delay}s linear forwards;
                            -webkit-animation: fadeInImg ${anim_time}s ${reveal_out_delay}s linear forwards;
                        `,
          });
          additionalCssItems3.push({
            selector: '%%order_class%% .difl__image_reveal_tb .difl__image_reveal',
            declaration: `
                            -webkit-animation: imageRevealTB ${reveal_in_anim}s ${delay}s, imageRevealOutTB ${reveal_out_anim}s ${reveal_out_delay}s;
                            animation: imageRevealTB ${reveal_in_anim}s ${delay}s, imageRevealOutTB ${reveal_out_anim}s ${reveal_out_delay}s;
                            -webkit-animation-fill-mode: forwards;
                            animation-fill-mode: forwards;
                        `,
          });
          break;
        case 'reveal_btt':
          additionalCssItems.push({
            selector: '%%order_class%% .difl__image_reveal_bt img',
            declaration: `
                            animation: fadeInImg 0s ${reveal_out_delay}s forwards;
                            -webkit-animation: fadeInImg 0s ${reveal_out_delay}s forwards;
                        `,
          });
          additionalCssItems2.push({
            selector: '%%order_class%% .difl__image_reveal_bt .difl__image_reveal_overlay',
            declaration: `
                            animation: fadeInImg ${anim_time}s ${reveal_out_delay}s linear forwards;
                            -webkit-animation: fadeInImg ${anim_time}s ${reveal_out_delay}s linear forwards;
                        `,
          });
          additionalCssItems3.push({
            selector: '%%order_class%% .difl__image_reveal_bt .difl__image_reveal',
            declaration: `
                            -webkit-animation: imageRevealBT ${reveal_in_anim}s ${delay}s, imageRevealOutBT ${reveal_out_anim}s ${reveal_out_delay}s;
                            animation: imageRevealBT ${reveal_in_anim}s ${delay}s, imageRevealOutBT ${reveal_out_anim}s ${reveal_out_delay}s;
                            -webkit-animation-fill-mode: forwards;
                            animation-fill-mode: forwards;
                        `,
          });
          break;
        default:
          additionalCssItems.push({
            selector: '%%order_class%% difl__image_reveal_lr img',
            declaration: `
                            animation: fadeInImg 0s 0.5s forwards;
                            -webkit-animation: fadeInImg 0s 0.5s forwards;
                        `,
          });
          additionalCssItems2.push({
            selector: '%%order_class%% .difl__image_reveal_lr .difl__image_reveal_overlay',
            declaration: `
                            animation: fadeInImg 0.25s 0.5s linear forwards;
                            -webkit-animation: fadeInImg 0.25s 0.5s linear forwards;
                        `,
          });
          additionalCssItems3.push({
            selector: '%%order_class%% .difl__image_reveal_lr .difl__image_reveal',
            declaration: `
                            -webkit-animation: imageRevealLR 0.25s 0s, imageRevealOutLR 0.5s 0.5s;
                            animation: imageRevealLR 0.25s 0s, imageRevealOutLR 0.5s 0.5s;
                            -webkit-animation-fill-mode: forwards;
                            animation-fill-mode: forwards;
                        `,
          });
      }
      additionalCss.push(additionalCssItems, additionalCssItems2,
          additionalCssItems3);
    }

    // Reveal Effect Style handler
    if ('undefined' !== typeof props.field_reveal_effects && 'none' !==
        props.field_reveal_effects) {
      const effect_delay = 'undefined' !==
      typeof __field__reveal_effect_delay && '' !==
      __field__reveal_effect_delay ? __field__reveal_effect_delay : 0;
      const effect_time = 'undefined' !== typeof __field__reveal_effect_time &&
      '' !== __field__reveal_effect_time ? __field__reveal_effect_time : 1;
      const reveal_delay = props.field_reveal_delay ? props.field_reveal_delay : 0;
      const effect_total_delay = parseFloat(effect_delay) + parseFloat(reveal_delay);
      additionalCss.push([
        {
          selector: '%%order_class%% .difl__image_reveal_wrapper .difl__animate',
          declaration: `
            -webkit-animation-duration: ${effect_time}s;
				    animation-duration: ${effect_time}s;
				    -webkit-animation-duration: ${effect_time}s;
				    animation-duration: ${effect_time}s;
				    animation-delay: ${effect_total_delay}s;
          `,
        }]);
    }

    // Hover Overlay Color, Opacity, Transition Delay, Transition Time
    if ('undefined' !== typeof __field__hover_overlay_enable && 'on' ===
        __field__hover_overlay_enable) {
      const ho_color = 'undefined' !== typeof props.field_hover_overlay_color ?
          props.field_hover_overlay_color :
          '#FFFFFF';
      const ho_opacity = 'undefined' !==
      typeof props.field_hover_overlay_opacity ?
          props.field_hover_overlay_opacity :
          0.3;
      additionalCss.push([
        {
          selector: __class__hover_overlay_content, declaration: `
                        background-color:${hex2rgba(ho_color, ho_opacity)};
                    `,
        }]);

      // Hover Overlay Animation Controll
      var ho_anim_time = 'undefined' !==
      typeof props.field_hover_overlay_transition_time ?
          props.field_hover_overlay_transition_time :
          '0.6s';
      ho_anim_time = ho_anim_time.slice(-1) !== 's' ?
          ho_anim_time + 's' :
          ho_anim_time;
      var ho_anim_delay = 'undefined' !==
      typeof props.field_hover_overlay_transition_delay ?
          props.field_hover_overlay_transition_delay :
          '0s';
      ho_anim_delay = ho_anim_delay.slice(-1) !== 's' ?
          ho_anim_delay + 's' :
          ho_anim_delay;
      const ho_arrive_from = 'undefined' !==
      typeof props.field_hover_overlay_arrive_from ?
          props.field_hover_overlay_arrive_from :
          'left';
      const additionalCssItems = [];
      switch (ho_arrive_from) {
        case 'left':
          additionalCssItems.push({
            selector: '%%order_class%% .difl__image_reveal_wrapper .difl__hover_overlay_lr:hover .difl__image_reveal_hover_overlay_content',
            declaration: `
                            -webkit-animation: imageRevealLR ${ho_anim_time} linear ${ho_anim_delay};
                            animation: imageRevealLR ${ho_anim_time} linear ${ho_anim_delay};
                            -webkit-animation-fill-mode: forwards;
                            animation-fill-mode: forwards;
                        `,
          });
          break;
        case 'right':
          additionalCssItems.push({
            selector: '%%order_class%% .difl__image_reveal_wrapper .difl__hover_overlay_rl:hover .difl__image_reveal_hover_overlay_content',
            declaration: `
                            -webkit-animation: imageRevealRL ${ho_anim_time} linear ${ho_anim_delay};
                            animation: imageRevealRL ${ho_anim_time} linear ${ho_anim_delay};
                            -webkit-animation-fill-mode: forwards;
                            animation-fill-mode: forwards;
                        `,
          });
          break;
        case 'top':
          additionalCssItems.push({
            selector: '%%order_class%% .difl__image_reveal_wrapper .difl__hover_overlay_tb:hover .difl__image_reveal_hover_overlay_content',
            declaration: `
                            -webkit-animation: imageRevealTB ${ho_anim_time} linear ${ho_anim_delay};
                            animation: imageRevealTB ${ho_anim_time} linear ${ho_anim_delay};
                            -webkit-animation-fill-mode: forwards;
                            animation-fill-mode: forwards;
                        `,
          });
          break;
        case 'bottom':
          additionalCssItems.push({
            selector: '%%order_class%% .difl__image_reveal_wrapper .difl__hover_overlay_bt:hover .difl__image_reveal_hover_overlay_content',
            declaration: `
                            -webkit-animation: imageRevealBT ${ho_anim_time} linear ${ho_anim_delay};
                            animation: imageRevealBT ${ho_anim_time} linear ${ho_anim_delay};
                            -webkit-animation-fill-mode: forwards;
                            animation-fill-mode: forwards;
                        `,
          });
          break;
        case 'linear':
          additionalCssItems.push({
            selector: '%%order_class%% .difl__image_reveal_wrapper .difl__hover_overlay_linear:hover .difl__image_reveal_hover_overlay_content',
            declaration: `
                            -webkit-animation: overlayViewer ${ho_anim_time} linear ${ho_anim_delay};
                            animation: overlayViewer ${ho_anim_time} linear ${ho_anim_delay};
                            -webkit-animation-fill-mode: both;
                            animation-fill-mode: both;
                        `,
          });
          break;
        case 'ease_in_out':
          additionalCssItems.push({
            selector: '%%order_class%% .difl__image_reveal_wrapper .difl__hover_overlay_ease_in_out:hover .difl__image_reveal_hover_overlay_content',
            declaration: `
                            -webkit-animation: overlayViewer ${ho_anim_time} ease-in-out ${ho_anim_delay};
                            animation: overlayViewer ${ho_anim_time} ease-in-out ${ho_anim_delay};
                            -webkit-animation-fill-mode: both;
                            animation-fill-mode: both;
                        `,
          });
          break;
        case 'ease':
          additionalCssItems.push({
            selector: '%%order_class%% .difl__image_reveal_wrapper .difl__hover_overlay_ease:hover .difl__image_reveal_hover_overlay_content',
            declaration: `
                            -webkit-animation: overlayViewer ${ho_anim_time} ease ${ho_anim_delay};
                            animation: overlayViewer ${ho_anim_time} ease ${ho_anim_delay};
                            -webkit-animation-fill-mode: both;
                            animation-fill-mode: both;
                        `,
          });
          break;
        case 'ease_in':
          additionalCssItems.push({
            selector: '%%order_class%% .difl__image_reveal_wrapper .difl__hover_overlay_ease_in:hover .difl__image_reveal_hover_overlay_content',
            declaration: `
                            -webkit-animation: overlayViewer ${ho_anim_time} ease-in ${ho_anim_delay};
                            animation: overlayViewer ${ho_anim_time} ease-in ${ho_anim_delay};
                            -webkit-animation-fill-mode: both;
                            animation-fill-mode: both;
                        `,
          });
          break;
        case 'ease_out':
          additionalCssItems.push({
            selector: '%%order_class%% .difl__image_reveal_wrapper .difl__hover_overlay_ease_out:hover .difl__image_reveal_hover_overlay_content',
            declaration: `
                            -webkit-animation: overlayViewer ${ho_anim_time} ease-out ${ho_anim_delay};
                            animation: overlayViewer ${ho_anim_time} ease-out ${ho_anim_delay};
                            -webkit-animation-fill-mode: both;
                            animation-fill-mode: both;
                        `,
          });
          break;
        default:
          additionalCssItems.push({
            selector: '%%order_class%% .difl__image_reveal_wrapper .difl__hover_overlay_lr:hover .difl__image_reveal_hover_overlay_content',
            declaration: `
                            -webkit-animation: imageRevealLR 0.5s linear 0s;
                            animation: imageRevealLR 0.5s linear 0s;
                            -webkit-animation-fill-mode: forwards;
                            animation-fill-mode: forwards;
                        `,
          });
      }
      additionalCssItems.push({
        selector: '%%order_class%% .difl__image_reveal_wrapper .difl__image_reveal_hover_overlay_content',
        declaration: 'animation-duration: 0.5s;',
      });
      additionalCss.push(additionalCssItems);



      // Hover Overlay Content Controll
      const ho_content_placement = 'undefined' !==
      typeof props.field_hover_overlay_content_placement ?
          props.field_hover_overlay_content_placement :
          'center';
      const ho_content_alignment = 'undefined' !==
      typeof props.field_hover_overlay_content_alignment ?
          props.field_hover_overlay_content_alignment :
          'center';
      const ho_content_padding = 'undefined' !==
      typeof props.field_hover_overlay_container_padding ?
          props.field_hover_overlay_container_padding :
          '0px|0px|0px|0px';
      const ho_padding_devide = ho_content_padding.split('|');
      additionalCss.push([
        {
          selector: __class__hover_overlay_content, declaration: `
                        justify-content: ${ho_content_placement};
                        align-items: ${ho_content_alignment};
                        padding-top:${ho_padding_devide[0]};
                        padding-right:${ho_padding_devide[1]};
                        padding-bottom:${ho_padding_devide[2]};
                        padding-left:${ho_padding_devide[3]};
                    `,
        }]);

      // Hover Overlay Contant Transition
      const ho_content_arrive_from = 'undefined' !==
      typeof props.field_hover_overlay_content_arrive_from ?
          props.field_hover_overlay_content_arrive_from :
          'left';
      const additionalCssItemsHOC = [];
      switch (ho_content_arrive_from) {
        case 'left':
          additionalCssItems.push({
            selector: '%%order_class%% .difl__image_reveal_hover_overlay_content .arrival',
            declaration: `
                            transition: all 1s ease-in-out ${ho_anim_delay} ;
                            transform: translateX(-2rem);
                        `,
          });
          break;
        case 'right':
          additionalCssItems.push({
            selector: '%%order_class%% .difl__image_reveal_hover_overlay_content .arrival',
            declaration: `
                            transition: all 1s ease-in-out ${ho_anim_delay} ;
                            transform: translateX(2rem);
                        `,
          });
          break;
        case 'top':
          additionalCssItems.push({
            selector: '%%order_class%% .difl__image_reveal_hover_overlay_content .arrival',
            declaration: `
                            transition: all 1s ease-in-out ${ho_anim_delay} ;
                            transform: translateY(-2rem);
                        `,
          });
          break;
        case 'bottom':
          additionalCssItems.push({
            selector: '%%order_class%% .difl__image_reveal_hover_overlay_content .arrival',
            declaration: `
                            transition: all 1s ease-in-out ${ho_anim_delay} ;
                            transform: translateY(2rem);
                        `,
          });
          break;
        default:
          additionalCssItems.push({
            selector: '%%order_class%% .difl__image_reveal_hover_overlay_content .arrival',
            declaration: `
                            transition: all 1s ease-in-out ${ho_anim_delay} ;
                            transform: translateX(-2rem);
                        `,
          });
      }
      additionalCss.push(additionalCssItemsHOC);

    }

    // Hover Zoom Effect
    if ('on' === __field__hover_image_effect_enable &&
        ('off' === __field__hover_overlay_enable || 'undefined' !==
            typeof __field__hover_overlay_enable)) {
      const h_effetc = 'undefined' !== typeof __field__hover_image_effect_style &&
      'none' !== __field__hover_image_effect_style ? __field__hover_image_effect_style : 'none';

      switch (h_effetc) {
        case 'zoom_in':
          const zoom_scale = 'undefined' !== typeof __field__zoom_scale &&
          '' !== __field__zoom_scale ? __field__zoom_scale : 1.5;
          const zooming_time = 'undefined' !==
          typeof __field__zooming_time && '' !== __field__zooming_time ?
              __field__zooming_time :
              0.25;
          const field_Speed_curve = 'undefined' !==
          typeof __field__Speed_curve && '' !== __field__Speed_curve ?
              __field__Speed_curve :
              'ease-in';
          additionalCss.push([
            {
              selector: '%%order_class%% .difl__image_reveal_wrapper .difl__image_reveal_content:hover img',
              declaration: `
                        transform-origin: center center;
                        transition: transform ${zooming_time}s, visibility ${parseFloat(zooming_time)/2}s ${field_Speed_curve};
                        -ms-transform:scale(${zoom_scale});
                        -webkit-transform: scale(${zoom_scale});
                        transform: scale(${zoom_scale});
                    `,
            }]);
          break;
        case 'zoom_n_rotate':
          const zoom_n_scale = 'undefined' !== typeof __field__zoom_scale &&
          '' !== __field__zoom_scale ? __field__zoom_scale : 1.5;
          const zoom_n_rotate = 'undefined' !==
          typeof __field__zoom_rotate && '' !== __field__zoom_rotate ?
              __field__zoom_rotate :
              '25';
          const zooming_n_time = 'undefined' !==
          typeof __field__zooming_time && '' !== __field__zooming_time ?
              __field__zooming_time :
              0.25;
          const field_z_n_Speed_curve = 'undefined' !==
          typeof __field__Speed_curve && '' !== __field__Speed_curve ?
              __field__Speed_curve :
              'ease-in';
          additionalCss.push([
            {
              selector: '%%order_class%% .difl__image_reveal_wrapper .difl__image_reveal_content:hover img',
              declaration: `
                        transform-origin: center center;
                        transition: transform ${zooming_n_time}s, visibility ${parseFloat(zooming_n_time)/2}s ${field_z_n_Speed_curve};
                        -ms-transform:scale(${zoom_n_scale}) rotate(${zoom_n_rotate}deg);
                        -webkit-transform: scale(${zoom_n_scale}) rotate(${zoom_n_rotate}deg);
                        transform: scale(${zoom_n_scale}) rotate(${zoom_n_rotate}deg);
                    `,
            }]);
          break;
        case 'blur_out_with_zooming_in':
          const zoom_bo_scale = 'undefined' !== typeof __field__zoom_scale &&
          '' !== __field__zoom_scale ? __field__zoom_scale : 1.5;
          const zooming_bo_time = 'undefined' !==
          typeof __field__zooming_time && '' !== __field__zooming_time ?
              __field__zooming_time :
              0.25;
          const field_bo_Speed_curve = 'undefined' !==
          typeof __field__Speed_curve && '' !== __field__Speed_curve ?
              __field__Speed_curve :
              'ease-in';
          const field_bo_blur_out_time = 'undefined' !==
          typeof __field__zooming_blur_out_time && '' !==
          __field__zooming_blur_out_time ?
              __field__zooming_blur_out_time :
              '.25';
          const field_bo_blur_level = 'undefined' !==
          typeof __field__zooming_blur_level && '' !==
          __field__zooming_blur_level ? __field__zooming_blur_level : '2';
          additionalCss.push([
            {
              selector: '%%order_class%% .difl__image_reveal_wrapper .difl__image_reveal_content img',
              declaration: `
                        transform: scale(${zoom_bo_scale});
                        transition: transform ${zooming_bo_time}s, filter ${field_bo_blur_out_time}s ${field_bo_Speed_curve};
                        filter: blur(${field_bo_blur_level}px);
                    `,
            }]);
          additionalCss.push([
            {
              selector: '%%order_class%% .difl__image_reveal_wrapper .difl__image_reveal_content:hover img',
              declaration: `
                        transform: scale(1);
                        filter: blur(0);
                    `,
            }]);
          break;
        case 'colorize_with_zooming_in':
          const zoom_c_scale = 'undefined' !== typeof __field__zoom_scale &&
          '' !== __field__zoom_scale ? __field__zoom_scale : 1.5;
          const zooming_c_time = 'undefined' !==
          typeof __field__zooming_time && '' !== __field__zooming_time ?
              __field__zooming_time :
              0.25;
          const field_c_Speed_curve = 'undefined' !==
          typeof __field__Speed_curve && '' !== __field__Speed_curve ?
              __field__Speed_curve :
              'ease-in';
          const field_c_field_grayscale = 'undefined' !==
          typeof __field__zooming_grayscale && '' !== __field__zooming_grayscale ?
              __field__zooming_grayscale :
              '100';
          additionalCss.push([
            {
              selector: '%%order_class%% .difl__image_reveal_wrapper .difl__image_reveal_content img',
              declaration: `
                        transition: transform ${zooming_c_time}s, filter ${zooming_c_time}s ${field_c_Speed_curve};
                        filter: grayscale(${field_c_field_grayscale}%);
                    `,
            }]);
          additionalCss.push([
            {
              selector: '%%order_class%% .difl__image_reveal_wrapper .difl__image_reveal_content:hover img',
              declaration: `
                        transform: scale(${zoom_c_scale});
                        filter: grayscale(0);
                    `,
            }]);
          break;
      }
    }

    return additionalCss;
  }

  processRenderElements = () => {
    const processor = {
      __class__reveal_effect: this.props.field_reveal_effects,
      __field__image: this.props.field_image,
      __field__caption_enable: this.props.field_caption_enable,
      __field__caption_placement: this.props.field_caption_placement,
      __field__caption_title: this.props.field_caption_title,
      __field__lightbox_enable: this.props.field_lightbox_enable,
      __field__link_url: this.props.field_link_url,
      __field__link_target: this.props.field_link_target,
      __field__reveal_directions: this.props.field_reveal_directions,
      __field__reveal_delay: this.props.field_hover_overlay_arrive_from,
      __field__reveal_animation_time: this.props.field_hover_content_title,
      __field__reveal_view_port: this.props.field_hover_content_desc_text,
      __field__hover_overlay_enable: this.props.field_hover_overlay_enable,
      __field__hover_overlay_content_enable: this.props.field_hover_overlay_content_enable,
      __field__hover_content_title: this.props.field_hover_content_title_text,
      __field__hover_content_desc: this.props.field_hover_content_desc_text,
      __field__hover_overlay_arrive_from: this.props.field_hover_overlay_arrive_from,

      init: () => {
        return processor.renderFinalOutput();
      },
      getRevealDirection: () => {
        switch (processor.__field__reveal_directions) {
          case 'reveal_ltr':
            return 'difl__image_reveal_lr';
          case 'reveal_rtl':
            return 'difl__image_reveal_rl';
          case 'reveal_ttb':
            return 'difl__image_reveal_tb';
          case 'reveal_btt':
            return 'difl__image_reveal_bt';
          default:
            return 'difl__image_reveal_lr';
        }
      },
      generateOverlay: () => {
        if ('undefined' !== typeof this.props.field_overlay_enable && 'on' ===
            this.props.field_overlay_enable) {
          return <div className="difl__image_reveal_overlay"></div>;
        }
        return '';
      },
      getHoverOverlayDirection: () => {
        switch (processor.__field__hover_overlay_arrive_from) {
          case 'left':
            return 'difl__hover_overlay_lr';
          case 'right':
            return 'difl__hover_overlay_rl';
          case 'top':
            return 'difl__hover_overlay_tb';
          case 'bottom':
            return 'difl__hover_overlay_bt';
          case 'linear':
            return 'difl__hover_overlay_linear';
          case 'ease_in_out':
            return 'difl__hover_overlay_ease_in_out';
          case 'ease':
            return 'difl__hover_overlay_ease';
          case 'ease_in':
            return 'difl__hover_overlay_ease_in';
          case 'ease_out':
            return 'difl__hover_overlay_ease_out';
          default:
            return 'difl__hover_overlay_lr';
        }
      },
      generateHoverOverlayContent: () => {
        if ('on' === processor.__field__hover_overlay_content_enable) {
          return <>
            <h3 className="title arrival">{('undefined' !==
                typeof processor.__field__hover_content_title &&
                processor.__field__hover_content_title.length > 0) ?
                processor.__field__hover_content_title :
                'Your Title Goes Here..'}</h3>
            <div
                className="description arrival"
                dangerouslySetInnerHTML={{
                  __html: ('undefined' !==
                      typeof processor.__field__hover_content_desc &&
                      processor.__field__hover_content_desc.length > 0) ?
                      processor.__field__hover_content_desc :
                      'Your Description Goes Here...',
                }}
            />
          </>;
        }
        return '';
      },
      generateHoverOverlay: () => {
        if ('on' === processor.__field__hover_overlay_enable) {
          return <div
              className={`difl__image_reveal_hover_overlay ${processor.getHoverOverlayDirection()}`}>
            <div className="difl__image_reveal_hover_overlay_content">
              {processor.generateHoverOverlayContent()}
            </div>
          </div>;
        }
        return '';
      },
      generateCaption: () => {
        if ('on' === processor.__field__caption_enable) {
          const caption = <div className="difl_caption">{processor.__field__caption_title}</div>;
          return caption;
        }
        return '';
      },
      getRevealEffect: () => {
        if ('undefined' !== typeof processor.__class__reveal_effect &&
            'none' !== processor.__class__reveal_effect) {
          return 'difl__animate ' + processor.__class__reveal_effect;
        }
        return '';
      },
      renderFinalOutput: () => {
        return <div
            className={`difl__image_reveal_wrapper ${processor.getRevealDirection()}`}>
                    <span
                        className={`difl__image_wrap ${processor.getRevealEffect()}`}>
                        <div className="difl__image_reveal_content"
                             style={{opacity: '1'}}>
                            <div className="difl__box_shadow_overlay"></div>
                          {'on' === processor.__field__caption_enable &&
                          'top' === processor.__field__caption_placement ?
                              processor.generateCaption() :
                              ''}
                          <img
                              decoding="async"
                              fetchpriority="high"
                              src={processor.__field__image}
                          />
                          {'on' === processor.__field__caption_enable &&
                          'bottom' === processor.__field__caption_placement ?
                              processor.generateCaption() :
                              ''}
                        </div>
                      {processor.generateOverlay()}
                      {processor.generateHoverOverlay()}
                      <div
                          className="difl__image_reveal_element difl__image_reveal"></div>
                    </span>
        </div>;
      },
    };
    return processor.init();
  };

  render() {
    return <React.Fragment>{this.processRenderElements()}</React.Fragment>;
  }
}

export default ImageReveal;