import React, { Component } from "react";
import lodash from 'lodash';

import utility from "../../../scripts/df_scripts/utilities";
// Internal Dependencies
import "./style.css";

class FaqItem extends Component {
  static slug = "difl_faqitem";

  static css(props) {
    var additionalCss = [];

    utility.df_process_bg({
      props: props,
      additionalCss: additionalCss,
      key: 'default_que_wrapper_bg',
      selector: "%%order_class%% div.df_faq_item .faq_question_wrapper"
    });

    utility.df_process_bg({
      props: props,
      additionalCss: additionalCss,
      key: 'active_que_wrapper_bg',
      selector: "%%order_class%% div.df_faq_item.active div.faq_question_wrapper"
    });

    utility.df_process_bg({
      props: props,
      additionalCss: additionalCss,
      key: 'ans_wrapper_bg',
      selector: "%%order_class%% div.faq_answer_area"
    });

    utility.process_color({
      props: props,
      key: "faq_icon_bg",
      additionalCss: additionalCss,
      selector: "%%order_class%% div.df_faq_item div.faq_icon",
      type: "background-color"
    });

    utility.process_color({
      props: props,
      key: "active_faq_icon_bg",
      additionalCss: additionalCss,
      selector: "%%order_class%% div.df_faq_item.active .faq_icon",
      type: "background-color"
    });

    utility.process_color({
      props: props,
      key: "que_img_bg",
      additionalCss: additionalCss,
      selector: "%%order_class%% div.df_faq_item div.faq_question_image",
      type: "background-color"
    });

    utility.process_color({
      props: props,
      key: "active_que_img_bg",
      additionalCss: additionalCss,
      selector: "%%order_class%% div.df_faq_item.active .faq_question_image",
      type: "background-color"
    });

    utility.process_color({
      props: props,
      key: "close_icon_color",
      additionalCss: additionalCss,
      selector: "%%order_class%% div.faq_question_wrapper div.faq_icon div.close_icon span.et-pb-icon, %%order_class%% div.faq_question_wrapper div.faq_icon div.open_icon span.et-pb-icon",
      type: "color"
    });

    utility.process_color({
      props: props,
      key: "open_icon_color",
      additionalCss: additionalCss,
      selector: "%%order_class%% div.faq_question_wrapper div.faq_icon div.open_icon span.et-pb-icon",
      type: "color",
      important: true
    });

    utility.df_process_bg({
      props: props,
      key: 'ans_button_bg',
      additionalCss: additionalCss,
      selector: "%%order_class%% div.faq_button a",
      // important: true
    });

    utility.process_color({
      props: props,
      key: "button_text_color",
      additionalCss: additionalCss,
      selector: "%%order_class%% div.faq_button a",
      type: "color",
      // important: true
    });

    utility.process_margin_padding({
      props: props,
      key: "faq_item_wrapper_margin",
      additionalCss: additionalCss,
      selector: "%%order_class%% div.df_faq_item",
      type: "margin",
    });

    utility.process_margin_padding({
      props: props,
      key: "faq_item_wrapper_padding",
      additionalCss: additionalCss,
      selector: "%%order_class%% div.df_faq_item ",
      type: "padding",
    });

    utility.process_margin_padding({
      props: props,
      key: "que_wrapper_margin",
      additionalCss: additionalCss,
      selector: "%%order_class%% div.faq_question_wrapper",
      type: "margin",
    });

    utility.process_margin_padding({
      props: props,
      key: "que_wrapper_padding",
      additionalCss: additionalCss,
      selector: "%%order_class%% div.faq_question_wrapper",
      type: "padding",
    });

    utility.process_margin_padding({
      props: props,
      key: "que_text_margin",
      additionalCss: additionalCss,
      selector: "%%order_class%% div.faq_question_wrapper .faq_question_title",
      type: "margin",
    });

    utility.process_margin_padding({
      props: props,
      key: "que_icon_margin",
      additionalCss: additionalCss,
      selector: "%%order_class%% div.faq_icon",
      type: "margin",
    });

    utility.process_margin_padding({
      props: props,
      key: "que_icon_padding",
      additionalCss: additionalCss,
      selector: "%%order_class%% div.faq_icon",
      type: "padding",
    });

    utility.process_margin_padding({
      props: props,
      key: "que_img_margin",
      additionalCss: additionalCss,
      selector: "%%order_class%% div.faq_question_image",
      type: "margin",
    });

    utility.process_margin_padding({
      props: props,
      key: "que_img_padding",
      additionalCss: additionalCss,
      selector: "%%order_class%% div.faq_question_image",
      type: "padding",
    });

    utility.process_margin_padding({
      props: props,
      key: "ans_wrapper_margin",
      additionalCss: additionalCss,
      selector: "%%order_class%% div.faq_answer_wrapper div.faq_answer_area",
      type: "margin",
    });

    utility.process_margin_padding({
      props: props,
      key: "ans_wrapper_padding",
      additionalCss: additionalCss,
      selector: "%%order_class%% div.faq_answer_wrapper div.faq_answer_area",
      type: "padding",
    });

    utility.process_margin_padding({
      props: props,
      key: "ans_text_padding",
      additionalCss: additionalCss,
      selector: "%%order_class%% div.faq_answer",
      type: "padding"
    });

    utility.process_margin_padding({
      props: props,
      key: "ans_img_padding",
      additionalCss: additionalCss,
      selector: "%%order_class%% div.faq_answer_image img",
      type: "padding"
    });

    utility.process_margin_padding({
      props: props,
      key: "ans_btn_icon_margin",
      additionalCss: additionalCss,
      selector: "%%order_class%% div.faq_button_icon",
      type: "margin"
    });

    utility.process_margin_padding({
      props: props,
      key: "ans_button_margin",
      additionalCss: additionalCss,
      selector: "%%order_class%% div.faq_button a",
      type: "margin"
    });

    utility.process_margin_padding({
      props: props,
      key: "ans_button_padding",
      additionalCss: additionalCss,
      selector: "%%order_class%% div.faq_button a",
      type: "padding"
    });


    if ("" !== props.button_font_icon) {
      utility.process_icon_font_style({
        props: props,
        additionalCss: additionalCss,
        key  : "button_font_icon",
        selector: "%%order_class%% .faq_answer_wrapper .et-pb-icon",
      });
    }

    // Button icon
    if ("on" === props.use_button_icon) {
      utility.process_color({
        props: props,
        key  : "button_icon_color",
        additionalCss: additionalCss,
        selector: "%%order_class%% .faq_answer_wrapper .faq_button a .faq_button_icon",
        type : "color",
        important: true
      });

      utility.process_range_value({
        props: props,
        key  : "button_icon_size",
        additionalCss: additionalCss,
        default: "18px",
        selector: "%%order_class%% .faq_answer_wrapper .faq_button a .faq_button_icon",
        type : "font-size",
      });

      const button_icon_placement = !!props.button_icon_placement ? props.button_icon_placement : "right"
      
      // show icon on hover
      if ('on' === props.show_icon_hover) {
        const icon_size = props.button_icon_size ? props.button_icon_size : 18;
        const icon_space = props.button_icon_space ? props.button_icon_space : 0;
        
        if ('right' === button_icon_placement) {
          additionalCss.push([
            {
              selector: "%%order_class%% div.faq_answer_wrapper div.faq_button.icon_show_hover .faq_button_icon",
              declaration: `margin: 0px; margin-right: -${parseInt(icon_size)+ parseInt(icon_space)}px!important; opacity: 1 !important;`,
            },
          ]);
          additionalCss.push([
            {
              selector: "%%order_class%% .faq_answer_wrapper .faq_button.icon_show_hover:hover .faq_button_icon",
              declaration: "margin-right: 0px!important; opacity: 1!important;",
            },
          ]);
        } else {
          additionalCss.push([
            {
              selector: "%%order_class%% .faq_answer_wrapper .faq_button.icon_show_hover .faq_button_icon",
              declaration: `margin-left: -${parseInt(icon_size) + parseInt(icon_space)}px!important; opacity: 0!important;`,
            },
          ]);
          additionalCss.push([
            {
              selector: "%%order_class%% .faq_answer_wrapper .faq_button.icon_show_hover:hover .faq_button_icon",
              declaration: "margin: 0px; margin-left: 0px!important; opacity: 1!important;",
            },
          ]);
        }
      }
    }

    if ("left" === props.button_icon_placement) {
      utility.process_range_value({
        props: props,
        key: "button_icon_space",
        additionalCss: additionalCss,
        selector: "%%order_class%% .faq_button .faq_button_icon",
        type: "margin-right",
        important: true,
      });
    } else {
      utility.process_range_value({
        props: props,
        key: "button_icon_space",
        additionalCss: additionalCss,
        selector: "%%order_class%% .faq_button .faq_button_icon",
        type: "margin-left",
        important: true,
      });
    }

    // question image placement
    if ("inherit" !== props.question_image_placement) {
      utility.df_process_string_attr({
        props: props,
        key  : "question_image_placement",
        additionalCss: additionalCss,
        selector: "%%order_class%% .faq_question_area",
        type : "flex-direction",
        default_value: "row",
      });
    }

    // answer image placement
    utility.df_process_string_attr({
      props: props,
      key: "answer_image_placement",
      additionalCss: additionalCss,
      selector: "%%order_class%% .faq_content",
      type: "flex-flow",
    });

    // answer image width
      if('row-reverse' === props.answer_image_placement || 'row' === props.answer_image_placement){
        const img_width = !!props.answer_image_width ? props.answer_image_width : 50 
        utility.process_range_value({
          props: props,
          key: "answer_image_width",
          additionalCss: additionalCss,
          selector: "%%order_class%% .faq_answer_image",
          type: "width",
          default_value: '50%',
        });

        additionalCss.push([
          {
            selector: "%%order_class%% .faq_answer",
            declaration: `width: ${100 - parseInt(img_width)}%;`,
          },
        ]);
      }else{
        utility.process_range_value({
          props: props,
          key: "answer_image_width",
          additionalCss: additionalCss,
          selector: "%%order_class%% .faq_answer_image",
          type: "width",
          default_value: '100%',
        });

        utility.process_range_value({
          props: props,
          key: "answer_image_width_top_bottom",
          additionalCss: additionalCss,
          selector: "%%order_class%% .faq_answer_image",
          type: "width",
          default_value: '100%',
        });

        additionalCss.push([
          {
            selector: "%%order_class%% .faq_answer, %%order_class%% .faq_answer_image img",
            declaration: "width: 100%;",
          },
        ]);
      }

    if('row-reverse' === props.answer_image_placement || 'row' === props.answer_image_placement){
      additionalCss.push([
        {
          selector: "%%order_class%% .faq_content",
          declaration: "align-items: start;",
        },
      ]);
    }else{
      this.df_set_flex_position({
        props: props,
        key: "answer_image_alignment",
        additionalCss: additionalCss,
        selector: "%%order_class%% .faq_content",
        type: "align-items",
      });
    }

    if ("on" === props.answer_image_full_width_mobile){
      additionalCss.push([
        {
          selector: "%%order_class%% .faq_content",
          declaration: "flex-flow: column-reverse !important;",
          device: "phone",
        },
      ]);
      additionalCss.push([
        {
          selector: "%%order_class%% .faq_answer",
          declaration: "width: 100% !important;",
          device: "phone",
        },
      ]);
      additionalCss.push([
        {
          selector: "%%order_class%% .faq_answer_image",
          declaration: "width: 100% !important;",
          device: "phone",
        },
      ]);
    }

    if("on" !== props.enable_answer_image){
      additionalCss.push([
        {
          selector: "%%order_class%% .faq_answer",
          declaration: "width: 100% !important;"
        },
      ]);
    }

    const display_btn = "on" === props.button_full_width ? "block" : "inline-flex";
    additionalCss.push([
      {
        selector: "%%order_class%% div.faq_button a",
        declaration: `display: ${display_btn};`,
      },
    ]);


    if ("on" === props.button_full_width){
      additionalCss.push([
        {
          selector: "%%order_class%% span.faq_button_icon",
          declaration: "vertical-align: middle;",
        },
      ]);
    }

    if ("on" !== props.button_full_width && "" !== props.button_alignment) {
      utility.df_process_string_attr({
        props: props,
        key: "button_alignment",
        additionalCss: additionalCss,
        selector: "%%order_class%% div.faq_button",
        type: "text-align"
      });
    }

    return additionalCss;
  }

  static df_set_flex_position(options = {}) {
    const defaults = {
      props: {},
      key: "",
      additionalCss: "",
      selector: "",
      type: "",
      css: ""
    };
    const settings = utility.extend(defaults, options);
    const {props,key,additionalCss,selector,type,css} = settings;

    const desktop = props[key];
    const tablet  = utility.df_check_values(desktop, props[key + "_tablet"]);
    const phone  = utility.df_check_values(desktop, props[key + "_phone"]);

    const get_values = ["center", "left", "right"];
    const set_values = ["center", "start", "end"];
    const values = {};

    for (let i in get_values) {
      values[get_values[i]] = set_values[i];
    }

    additionalCss.push([
      {
        selector: selector,
        declaration: `display: flex; ${type}:${values[desktop]}; ${css};`,
      },
    ]);

    additionalCss.push([
      {
        selector: selector,
        declaration: `display: flex; ${type}:${values[tablet]};${css};`,
        device: "tablet",
      },
    ]);

    additionalCss.push([
      {
        selector: selector,
        declaration: `display: flex; ${type}:${values[phone]};${css};`,
        device: "phone",
      },
    ]);

  }


  render() {
    const moduleIndex = this.props.moduleInfo.orderClassName;
    
    if(!window.DF_Dynamics[moduleIndex]) {
      window.DF_Dynamics[moduleIndex] = {}
    }

    window.DF_Dynamics[moduleIndex] = {
      ...window.DF_Dynamics[moduleIndex],
        ...this.props.dynamic
    };
     
    return false;
  }
}

export default FaqItem;
