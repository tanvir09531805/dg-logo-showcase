import React, { Component } from "react";
import utility from "../../../scripts/df_scripts/utilities";
// Internal Dependencies
import "./style.css";

class Timeline extends Component {
  static slug = "difl_timeline";

  constructor(props) {
    super(props);
    this.itemsWrapper = React.createRef();
    this.line = React.createRef();
  }

  componentDidMount() {
    // this timeout only for line which working fine on responsive otherwise line will break
    setTimeout(() => {
      this.df_tmln_set_line();
    }, 700);
  }

  componentDidUpdate(prvProps, prvState) {
    const view_mode = window.ET_Builder.API.State.View_Mode.current;
    // this timeout only for line which working fine on responsive otherwise line will break
    setTimeout(() => {
      this.df_tmln_set_line();
    }, 700);

    // line top/bottom marker if date disable
    const itemsWrapper = this.itemsWrapper.current
    let df_tmln_markers;
    if (itemsWrapper) {
      df_tmln_markers = itemsWrapper.querySelectorAll('.df_timeline_marker');

      // line top bottom marker position
      setTimeout(() => {
        const lineTopMarker = itemsWrapper.previousSibling.firstElementChild;
        const lineBottomMarker = itemsWrapper.nextSibling.firstElementChild;
        const lineHalfWidth = parseInt(this.props.line_width) / 2;
        const markerTxtAlign = "middle" === this.props.layout_type_mobile ? "center" : this.props.layout_type_mobile;

        if (lineTopMarker) {
          const lineTopOffset = this.line.current.offsetLeft - lineTopMarker.offsetWidth / 2 + lineHalfWidth
          lineTopMarker.style.opacity = 1;
            lineTopMarker.style.left = lineTopOffset + "px";
        }
        if (lineBottomMarker) {
          const lineBottomOffset = this.line.current.offsetLeft - lineBottomMarker.offsetWidth / 2 + lineHalfWidth
          lineBottomMarker.style.opacity = 1
            lineBottomMarker.style.left = lineBottomOffset + "px";
        }

        if(view_mode === 'phone' && 'text' === this.props.line_top_marker_type){
          lineTopMarker.style.left = "auto"
          lineTopMarker.style.right = "auto"
          itemsWrapper.previousSibling.style.textAlign = markerTxtAlign;
        }

        if(view_mode === 'phone' && 'text' === this.props.line_bottom_marker_type){
          lineBottomMarker.style.left = "auto"
          lineBottomMarker.style.right = "auto"
          itemsWrapper.nextSibling.style.textAlign = markerTxtAlign;
        }
      }, 800)
    }
  }

  static css(props) {
    var additionalCss = [];
    let view_mode = window.ET_Builder.API.State.View_Mode.current;

    if ("" !== props.arrow_icon) {
      utility.process_icon_font_style({
        props: props,
        additionalCss: additionalCss,
        key: "arrow_icon",
        selector: "%%order_class%% .df_timeline_content_area .timeline_arrow_icon",
      });
    }

    if ("" !== props.date_arrow_icon) {
      utility.process_icon_font_style({
        props: props,
        additionalCss: additionalCss,
        key: "date_arrow_icon",
        selector: "%%order_class%% .df_timeline_date_area .timeline_arrow_icon",
      });
    }

    if ("" !== props.line_top_icon) {
      utility.process_icon_font_style({
        props: props,
        additionalCss: additionalCss,
        key: "line_top_icon",
        selector: "%%order_class%% .df_timeline_top .df_timeline_top_icon",
      });
    }

    if ("" !== props.line_bottom_icon) {
      utility.process_icon_font_style({
        props: props,
        additionalCss: additionalCss,
        key: "line_bottom_icon",
        selector: "%%order_class%% .df_timeline_bottom .df_timeline_bottom_icon",
      });
    }

    utility.df_process_bg({
      props: props,
      key: 'item_wrapper_bg',
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_content_area .df_timeline_content",
    });

    utility.df_process_bg({
      props: props,
      key: 'line_top_bg',
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_top .df_line_marker",
    });

    utility.df_process_bg({
      props: props,
      key: 'line_bottom_bg',
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_bottom .df_line_marker",
    });

    utility.df_process_bg({
      props: props,
      key: 'title_bg',
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_content_area .df_timeline_title",
    });

    utility.df_process_bg({
      props: props,
      key: 'subtitle_bg',
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_content_area .df_timeline_subtitle",
    });

    utility.df_process_bg({
      props: props,
      key: 'content_text_bg',
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_content_area .df_timeline_desc",
    });

    utility.df_process_bg({
      props: props,
      key: 'content_media_bg',
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_content_area .df_timeline_media>*",
    });

    utility.df_process_bg({
      props: props,
      key: "content_button_bg",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_button a",
    });

    utility.process_color({
      props: props,
      key: "button_text_color",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_button a",
      type: "color",
    });

    utility.process_color({
      props: props,
      key: "button_icon_color",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_button .df_timeline_btn_icon",
      type: "color",
    });

    utility.process_range_value({
      props: props,
      key: "button_icon_size",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_btn_icon",
      type: "font-size",
    });

    // marker
    utility.df_process_bg({
      props: props,
      key: 'marker_bg',
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_item .df_timeline_marker",
    });

    utility.df_process_bg({
      props: props,
      key: 'active_marker_bg',
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_item .df_timeline_marker.active",
      important: true
    });

    utility.process_color({
      props: props,
      key: "active_marker_color",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_item .df_timeline_marker.active, %%order_class%% .difl_timelineitem .df_timeline_marker.active .df_timeline_marker_icon",
      type: "color",
    });

    utility.process_color({
      props: props,
      key: "marker_icon_color",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_item .df_timeline_marker_icon",
      type: "color",
    });

    utility.process_range_value({
      props: props,
      key: "marker_icon_size",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_marker .df_timeline_marker_icon",
      type: "font-size",
    });

    utility.df_process_bg({
      props: props,
      key: 'date_wrapper_bg',
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_date_area .df_timeline_date_content",
    });

    utility.process_margin_padding({
      props: props,
      key: "item_wrapper_margin",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_content_area .df_timeline_content",
      type: "margin",
    });

    utility.process_margin_padding({
      props: props,
      key: "item_wrapper_padding",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_content_area .df_timeline_content",
      type: "padding",
    });

    utility.process_margin_padding({
      props: props,
      key: "timeline_title_margin",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_content_area .df_timeline_title",
      type: "margin",
    });

    utility.process_margin_padding({
      props: props,
      key: "timeline_title_padding",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_content_area .df_timeline_title",
      type: "padding",
    });

    utility.process_margin_padding({
      props: props,
      key: "timeline_subtitle_margin",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_content_area .df_timeline_subtitle",
      type: "margin",
    });

    utility.process_margin_padding({
      props: props,
      key: "timeline_subtitle_padding",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_content_area .df_timeline_subtitle",
      type: "padding",
    });

    utility.process_margin_padding({
      props: props,
      key: "timeline_content_margin",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_content_area .df_timeline_desc",
      type: "margin",
    });

    utility.process_margin_padding({
      props: props,
      key: "timeline_content_padding",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_content_area .df_timeline_desc",
      type: "padding",
    });

    utility.process_margin_padding({
      props: props,
      key: "timeline_media_item_margin",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_content_area .df_timeline_media",
      type: "margin",
    });

    utility.process_margin_padding({
      props: props,
      key: "timeline_media_item_padding",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_content_area .df_timeline_media>*",
      type: "padding",
    });

    utility.process_margin_padding({
      props: props,
      key: "timeline_content_padding",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_content_area .df_timeline_desc",
      type: "padding",
    });

    utility.process_margin_padding({
      props: props,
      key: "timeline_button_margin",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_content_area .df_timeline_button a",
      type: "margin",
    });

    utility.process_margin_padding({
      props: props,
      key: "timeline_button_padding",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_content_area .df_timeline_button a",
      type: "padding",
    });

    utility.process_margin_padding({
      props: props,
      key: "date_wrapper_margin",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_date_content",
      type: "margin",
    });

    utility.process_margin_padding({
      props: props,
      key: "date_wrapper_padding",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_date_content",
      type: "padding",
    });

    utility.process_margin_padding({
      props: props,
      key: "date_title_margin",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_date_content .df_timeline_date_title",
      type: "margin",
    });

    utility.process_margin_padding({
      props: props,
      key: "date_subtitle_margin",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_date_content .df_timeline_date_subtitle",
      type: "margin",
    });

    utility.process_margin_padding({
      props: props,
      key: "line_top_wrapper_margin",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_top .df_line_marker",
      type: "margin",
    });

    utility.process_margin_padding({
      props: props,
      key: "line_top_wrapper_padding",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_top .df_line_marker",
      type: "padding",
    });

    utility.process_margin_padding({
      props: props,
      key: "line_bottom_wrapper_margin",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_bottom .df_line_marker",
      type: "margin",
    });

    utility.process_margin_padding({
      props: props,
      key: "line_bottom_wrapper_padding",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_bottom .df_line_marker",
      type: "padding",
    });

    utility.df_process_string_attr({
      'props': props,
      'key': 'item_vertical_alignment',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_timeline_item',
      'type': 'align-items'
    });

    utility.df_process_string_attr({
      'props': props,
      'key': 'item_horizontal_alignment',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_timeline_item',
      'type': 'justify-content'
    });

    utility.process_range_value({
      props: props,
      key: "marker_width",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_item .df_timeline_marker",
      type: "width",
      default_value: '50px'
    });

    utility.process_range_value({
      props: props,
      key: "marker_height",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_item .df_timeline_marker",
      type: "height",
      default_value: '50px'
    });

    const item_horizontal_gap_tablet = props.item_horizontal_gap_tablet ? props.item_horizontal_gap_tablet : props.item_horizontal_gap;

    additionalCss.push([{
      selector: '%%order_class%% .df_timeline_item',
      declaration: `column-gap: ${props.item_horizontal_gap};`,
    }]);

    if (props.item_horizontal_gap_tablet) {
      additionalCss.push([{
        selector: '%%order_class%% .df_timeline_item',
        declaration: `column-gap: ${item_horizontal_gap_tablet};`,
        device: "tablet",
      }]);
    }

    utility.process_range_value({
      props: props,
      key: 'item_vertical_gap',
      default_value: '50px',
      additionalCss: additionalCss,
      selector: '%%order_class%% .difl_timelineitem:not(:first-child)',
      type: 'margin-top',
      important: true
    });

    if ('middle' === props.layout_type) {
      let unit = "%";
      if (props.module_area_width.includes("px")) {
        unit = props.module_area_width.replace(/\d+/g, '');
      }

      additionalCss.push([{
        selector: '%%order_class%% .df_timeline_date_area, %%order_class%% .df_timeline_content_area',
        declaration: `flex-basis: ${parseInt(props.module_area_width) / 2 + unit};`
      }]);

      utility.process_range_value({
        'props': props,
        'key': 'date_area_width',
        // 'default_value': '40%',
        'additionalCss': additionalCss,
        'selector': '%%order_class%% .df_timeline_date_area .df_timeline_date_content',
        'type': 'width'
      });
    } else {
      utility.process_range_value({
        'props': props,
        'key': 'blurb_area_width',
        'default_value': '50%',
        'additionalCss': additionalCss,
        'selector': '%%order_class%%  .df_timeline_content_area',
        'type': 'flex-basis'
      });

      utility.process_range_value({
        'props': props,
        'key': 'date_area_width',
        'default_value': '40%',
        'additionalCss': additionalCss,
        'selector': '%%order_class%% .df_timeline_date_area',
        'type': 'flex-basis'
      });

      additionalCss.push([{
        selector: '%%order_class%% .df_timeline_date_area .df_timeline_date_content',
        declaration: `width: 100%;`,
      }]);
    }

    if (!!props.date_area_width_phone) {
      additionalCss.push([{
        selector: '%%order_class%% .df_timeline_date_area .df_timeline_date_content',
        declaration: `width: ${props.date_area_width_phone} !important;`,
        device: "phone",
      }]);
    } else {
      additionalCss.push([{
        selector: '%%order_class%% .df_timeline_date_area .df_timeline_date_content',
        declaration: `width: 90% !important;`,
        device: "phone",
      }]);
    }

    if ('on' === props.disable_date || 'on' === props.disable_date_mobile) {
      additionalCss.push([{
        selector: '%%order_class%% .df_timeline_date_area',
        declaration: `display: none;`,
        device: "phone",
      }]);
    }

    // line
    utility.process_color({
      'props': props,
      'key': 'line_color',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_timeline_line',
      'type': 'background-color'
    })

    utility.process_color({
      'props': props,
      'key': 'line_top_icon_color',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_timeline_top .df_timeline_top_icon',
      'type': 'color'
    })

    utility.process_color({
      'props': props,
      'key': 'line_bottom_icon_color',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_timeline_bottom .df_timeline_bottom_icon',
      'type': 'color'
    })

    // line
    utility.process_range_value({
      'props': props,
      'key': 'line_width',
      'default_value': '3px',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_timeline_line',
      'type': 'width'
    });

    if ('off' !== props.enable_line_top_marker) {
      utility.process_range_value({
        'props': props,
        'key': 'line_top_marker_vertical_position',
        'default_value': '0px',
        'additionalCss': additionalCss,
        'selector': '%%order_class%% .df_timeline_top > *',
        'type': 'bottom'
      });

      utility.process_range_value({
        'props': props,
        'key': 'line_top_icon_size',
        'default_value': '24px',
        'additionalCss': additionalCss,
        'selector': '%%order_class%% .df_timeline_top .df_timeline_top_icon',
        'type': 'font-size'
      });

      utility.process_range_value({
        'props': props,
        'key': 'line_top_img_width',
        'default_value': '30px',
        'additionalCss': additionalCss,
        'selector': '%%order_class%% .df_timeline_top img',
        'type': 'width'
      });
    }

    // Content
    if (!!props.design_content_text_ul_position && "inside" === props.design_content_text_ul_position) {
      additionalCss.push([
        {
          selector: "%%order_class%% .df_timeline_content_area .df_timeline_desc ul",
          declaration: `list-style-position: ${props.design_content_text_ul_position};`,
        }
      ]);
    } else {
      additionalCss.push([
        {
          selector: "%%order_class%% .df_timeline_content_area .df_timeline_desc ul",
          declaration: `list-style-position: outside !important; margin-left: 4px !important;`,
        }
      ]);
    }

    if (!!props.design_content_text_ol_position && "inside" === props.design_content_text_ol_position) {
      additionalCss.push([
        {
          selector: "%%order_class%% .df_timeline_content_area .df_timeline_desc ol",
          declaration: `list-style-position: ${props.design_content_text_ul_position}; margin-left: 4px !important;`,
        }
      ]);
    } else {
      additionalCss.push([
        {
          selector: "%%order_class%% .df_timeline_content_area .df_timeline_desc ol",
          declaration: `list-style-position: outside !important; margin-left: 15px !important;`,
        }
      ]);
    }

    if (!!props.design_content_text_ul_type) {
      additionalCss.push([
        {
          selector: "%%order_class%% .df_timeline_content_area .df_timeline_desc ul",
          declaration: `list-style-type: ${props.design_content_text_ul_type};`,
        }
      ]);
    }

    if ('off' !== props.enable_line_bottom_marker) {
      utility.process_range_value({
        'props': props,
        'key': 'line_bottom_marker_vertical_position',
        'default_value': '0px',
        'additionalCss': additionalCss,
        'selector': '%%order_class%% .df_timeline_bottom > *',
        'type': 'top'
      });

      utility.process_range_value({
        'props': props,
        'key': 'line_bottom_icon_size',
        'default_value': '24px',
        'additionalCss': additionalCss,
        'selector': '%%order_class%% .df_timeline_bottom .df_timeline_bottom_icon',
        'type': 'font-size'
      });

      utility.process_range_value({
        'props': props,
        'key': 'line_bottom_img_width',
        'default_value': '30px',
        'additionalCss': additionalCss,
        'selector': '%%order_class%% .df_timeline_bottom img',
        'type': 'width'
      });
    }

    // content arrow
    if ('arrow_caret' === props.arrow_type) {
      utility.process_range_value({
        'props': props,
        'key': 'arrow_size',
        'default_value': '30px',
        'additionalCss': additionalCss,
        'selector': '%%order_class%% .df_timeline_item .df_timeline_content_area .timeline_arrow_caret',
        'type': 'border-width'
      });

      additionalCss.push([{
        selector: '%%order_class%% .df_timeline_item .df_timeline_content_area .timeline_arrow_caret',
        declaration: 'border-left-width: 0px !important;'
      }]);

      utility.process_color({
        'props': props,
        'key': 'arrow_color',
        'additionalCss': additionalCss,
        'selector': '%%order_class%% .df_timeline_item .df_timeline_content_area .timeline_arrow_caret',
        'type': 'border-right-color'
      });

    }

    if ('arrow_icon' === props.arrow_type) {
      utility.process_range_value({
        'props': props,
        'key': 'arrow_size',
        'default_value': '30px',
        'additionalCss': additionalCss,
        'selector': '%%order_class%% .df_timeline_item .df_timeline_content_area .timeline_arrow_icon',
        'type': 'font-size'
      });

      utility.process_color({
        'props': props,
        'key': 'arrow_color',
        'additionalCss': additionalCss,
        'selector': '%%order_class%% .df_timeline_item .df_timeline_content_area .timeline_arrow_icon',
        'type': 'color'
      });
    }

    if ('arrow_line' === props.arrow_type) {
      utility.df_process_string_attr({
        'props': props,
        'key': 'arrow_line_type',
        'additionalCss': additionalCss,
        'selector': '%%order_class%% .df_timeline_item .df_timeline_content_area .timeline_arrow_line',
        'type': 'border-style'
      });

      utility.process_range_value({
        'props': props,
        'key': 'arrow_size',
        'default_value': '20px',
        'additionalCss': additionalCss,
        'selector': '%%order_class%% .df_timeline_item .df_timeline_content_area .timeline_arrow_line',
        'type': 'width'
      });

      utility.process_range_value({
        'props': props,
        'key': 'arrow_thick',
        'default_value': '3px',
        'additionalCss': additionalCss,
        'selector': '%%order_class%% .df_timeline_item .df_timeline_content_area .timeline_arrow_line',
        'type': 'border-top-width'
      });

      utility.process_color({
        'props': props,
        'key': 'arrow_color',
        'additionalCss': additionalCss,
        'selector': '%%order_class%% .df_timeline_item .df_timeline_content_area .timeline_arrow_line',
        'type': 'border-color'
      });
    }

    if ('right' === props.layout_type) {
      if ('left' === props.layout_type_mobile) {
        additionalCss.push([{
          selector: '%%order_class%% .df_timeline_content_area .timeline_arrow_icon',
          declaration: `transform: rotate(180deg) !important;`,
          device: "phone",
        }]);
      } else {
        additionalCss.push([{
          selector: '%%order_class%% .df_timeline_date_area .timeline_arrow_icon',
          declaration: `transform: rotate(180deg) !important;`,
          device: "phone",
        }]);
      }
    } else if ('left' === props.layout_type) {
      if ('left' === props.layout_type_mobile) {
        additionalCss.push([{
          selector: '%%order_class%% .df_timeline_date_area .timeline_arrow_icon',
          declaration: `transform: rotate(0deg) !important;`,
          device: "phone",
        }]);
      } else {
        additionalCss.push([{
          selector: '%%order_class%% .df_timeline_content_area .timeline_arrow_icon',
          declaration: `transform: rotate(180deg) !important;`,
          device: "phone",
        }]);
      }
    }

    // content arrow horizontal position
    utility.process_range_value({
      'props': props,
      'key': 'arrow_horizontal_position',
      'default_value': '0px',
      'additionalCss': additionalCss,
      'selector': `%%order_class%% .df_timeline_item .df_timeline_content_area .timeline_arrow_caret, 
                   %%order_class%% .df_timeline_item .df_timeline_content_area .timeline_arrow_icon,
                   %%order_class%% .df_timeline_item .df_timeline_content_area .timeline_arrow_line`,
      'type': 'margin-right'
    });


    if ("arrow_icon" === props.arrow_type && "on" === props.reverse_arrow) {
      if (parseInt(props.arrow_horizontal_position) > 0) {
        utility.process_range_value({
          'props': props,
          'key': 'arrow_horizontal_position',
          'default_value': props.arrow_size,
          'additionalCss': additionalCss,
          'selector': `%%order_class%% .df_timeline_item.reverse .df_timeline_content_area .timeline_arrow_icon`,
          'type': 'margin-left'
        });
      } else {
        additionalCss.push([{
          selector: '%%order_class%% .df_timeline_item.reverse .df_timeline_content_area .timeline_arrow_icon',
          declaration: `margin-left: ${props.arrow_size};`
        }]);
      }
    } else {
      utility.process_range_value({
        'props': props,
        'key': 'arrow_horizontal_position',
        'default_value': '0px',
        'additionalCss': additionalCss,
        'selector': `%%order_class%% .df_timeline_item.reverse .df_timeline_content_area .timeline_arrow_icon`,
        'type': 'margin-left'
      });
    }

    utility.process_range_value({
      'props': props,
      'key': 'arrow_horizontal_position',
      'default_value': '0px',
      'additionalCss': additionalCss,
      'selector': `%%order_class%% .df_timeline_item.reverse .df_timeline_content_area .timeline_arrow_caret,
                   %%order_class%% .df_timeline_item.reverse .df_timeline_content_area .timeline_arrow_line`,
      'type': 'margin-left',
      'important': true
    });

    if ("on" === props.disable_arrow_mobile) {
      additionalCss.push([{
        selector: '%%order_class%% .df_timeline_content_area .timeline_arrow',
        declaration: `display: none;`,
        device: "phone",
      }]);
    }

    // date arrow
    if ('arrow_caret' === props.date_arrow_type) {
      utility.process_range_value({
        'props': props,
        'key': 'date_arrow_size',
        'default_value': '10px',
        'additionalCss': additionalCss,
        'selector': '%%order_class%% .df_timeline_item .df_timeline_date_area .timeline_arrow_caret',
        'type': 'border-width'
      });

      additionalCss.push([{
        selector: '%%order_class%% .df_timeline_item .df_timeline_date_area .timeline_arrow_caret',
        declaration: 'border-left-width: 0px !important;'
      }]);

      utility.process_color({
        'props': props,
        'key': 'date_arrow_color',
        'additionalCss': additionalCss,
        'selector': '%%order_class%% .df_timeline_item .df_timeline_date_area .timeline_arrow_caret',
        'type': 'border-right-color'
      });

    }

    if ('arrow_icon' === props.date_arrow_type) {
      utility.process_range_value({
        'props': props,
        'key': 'date_arrow_size',
        'default_value': '20px',
        'additionalCss': additionalCss,
        'selector': '%%order_class%% .df_timeline_item .df_timeline_date_area .timeline_arrow_icon',
        'type': 'font-size'
      });

      utility.process_color({
        'props': props,
        'key': 'date_arrow_color',
        'additionalCss': additionalCss,
        'selector': '%%order_class%% .df_timeline_item .df_timeline_date_area .timeline_arrow_icon',
        'type': 'color'
      });
    }

    if ('arrow_line' === props.date_arrow_type) {
      utility.df_process_string_attr({
        'props': props,
        'key': 'date_arrow_line_type',
        'additionalCss': additionalCss,
        'selector': '%%order_class%% .df_timeline_item .df_timeline_date_area .timeline_arrow_line',
        'type': 'border-style'
      });

      utility.process_range_value({
        'props': props,
        'key': 'date_arrow_size',
        'default_value': '20px',
        'additionalCss': additionalCss,
        'selector': '%%order_class%% .df_timeline_item .df_timeline_date_area .timeline_arrow_line',
        'type': 'width'
      });

      utility.process_range_value({
        'props': props,
        'key': 'date_arrow_thick',
        'default_value': '2px',
        'additionalCss': additionalCss,
        'selector': '%%order_class%% .df_timeline_item .df_timeline_date_area .timeline_arrow_line',
        'type': 'border-top-width'
      });

      utility.process_color({
        'props': props,
        'key': 'date_arrow_color',
        'additionalCss': additionalCss,
        'selector': '%%order_class%% .df_timeline_item .df_timeline_date_area .timeline_arrow_line',
        'type': 'border-color'
      });
    }

    // date arrow horizontal position
    utility.process_range_value({
      'props': props,
      'key': 'date_arrow_horizontal_position',
      'default_value': '0px',
      'additionalCss': additionalCss,
      'selector': `%%order_class%% .df_timeline_item .df_timeline_date_area .timeline_arrow_caret, 
                   %%order_class%% .df_timeline_item .df_timeline_date_area .timeline_arrow_icon,
                   %%order_class%% .df_timeline_item .df_timeline_date_area .timeline_arrow_line`,
      'type': 'margin-left'
    });

    utility.process_range_value({
      'props': props,
      'key': 'date_arrow_horizontal_position',
      'default_value': '0px',
      'additionalCss': additionalCss,
      'selector': `%%order_class%% .df_timeline_item.reverse .df_timeline_date_area .timeline_arrow_caret, 
                   %%order_class%% .df_timeline_item.reverse .df_timeline_date_area .timeline_arrow_icon,
                   %%order_class%% .df_timeline_item.reverse .df_timeline_date_area .timeline_arrow_line`,
      'type': 'margin-right',
      'important': true
    });

    if ("on" === props.disable_date_arrow_mobile) {
      additionalCss.push([{
        selector: '%%order_class%% .df_timeline_date_area .timeline_arrow',
        declaration: `display: none;`,
        device: "phone",
      }]);
    }

    if (view_mode !== 'phone') {
      additionalCss.push([{
        selector: '%%order_class%% .df_timeline_top, %%order_class%% .df_timeline_bottom',
        declaration: `text-align: left !important`
      }]);

      additionalCss.push([{
        selector: '%%order_class%% .df_timeline_top, %%order_class%% .df_timeline_bottom',
        declaration: `text-align: left !important`,
        device: "tablet",
      }]);
    }

    if (view_mode === 'phone') {
      const marginString = "0px|80px|0px|80px|false|false";
      const item_wrapper_margin = props.item_wrapper_margin_phone ? props.item_wrapper_margin_phone
        : props.item_wrapper_margin_tablet ? props.item_wrapper_margin_tablet : props.item_wrapper_margin;
      const date_wrapper_margin = props.date_wrapper_margin_phone ? props.date_wrapper_margin_phone
        : props.date_wrapper_margin_tablet ? props.date_wrapper_margin_tablet : props.date_wrapper_margin;
      const itemMargin = !!item_wrapper_margin ? item_wrapper_margin.split('|') : marginString.split('|');
      const dateMargin = !!date_wrapper_margin ? date_wrapper_margin.split('|') : marginString.split('|');
      const defaultMargin = 'on' === props.enable_date_in_blurb ? "0px" : "80px";
      const dateArrowHorizontalPosition = props.date_arrow_horizontal_position_phone ? props.date_arrow_horizontal_position_phone
        : props.date_arrow_horizontal_position_tablet ? props.date_arrow_horizontal_position_tablet : props.date_arrow_horizontal_position;

      const contentArrowHorizontalPosition = props.arrow_horizontal_position_phone ? props.arrow_horizontal_position_phone
        : props.arrow_horizontal_position_tablet ? props.arrow_horizontal_position_tablet : props.arrow_horizontal_position;


      if ('on' === props.disable_date_mobile) {
        additionalCss.push([{
          selector: '%%order_class%% .df_timeline_item .df_timeline_date_area',
          declaration: `display: none;`,
          device: "phone",
        }]);
      }

      additionalCss.push([{
        selector: '%%order_class%% .df_timeline_item .df_timeline_marker',
        declaration: ` position: absolute;`,
        device: "phone",
      }]);

      if ('left' === props.layout_type_mobile) {
        const item_horizontal_gap = itemMargin[3] ? itemMargin[3] : defaultMargin;
        const date_horizontal_gap = dateMargin[3] ? dateMargin[3] : defaultMargin;

        if ('on' === props.enable_date_in_blurb) {
          additionalCss.push([{
            selector: '%%order_class%% .df_timeline_container.layout_left .df_timeline_date_area',
            declaration: `justify-content: ${props.date_horizontal_alignment};`,
            device: "phone",
          }]);

          additionalCss.push([{
            selector: '%%order_class%% .df_timeline_container.layout_left .df_timeline_item .df_timeline_content_area .timeline_arrow>*',
            declaration: `margin-left: ${parseInt(itemMargin[3] ? itemMargin[3] : "80px") - parseInt(props.arrow_size)}px !important; left: calc(0% - ${contentArrowHorizontalPosition}) !important;`,
            device: "phone",
          }]);

          additionalCss.push([{
            selector: '%%order_class%% .df_timeline_content_area .df_timeline_date_content .timeline_arrow',
            declaration: `opacity: 0 !important;`,
            device: "phone",
          }]);
        } else {
          additionalCss.push([{
            selector: '%%order_class%% .df_timeline_container.layout_left .df_timeline_item .df_timeline_content_area .timeline_arrow>*',
            declaration: `margin-left: ${parseInt(item_horizontal_gap) - parseInt(props.arrow_size)}px !important; left: calc(0% - ${contentArrowHorizontalPosition}) !important;`,
            device: "phone",
          }]);
        }
        additionalCss.push([{
          selector: '%%order_class%% .df_timeline_container.layout_left .df_timeline_date_area',
          declaration: 'justify-content: start;',
        }]);

        let arrowIconGap = parseInt(item_horizontal_gap);
        if ("on" === props.reverse_arrow) {
          arrowIconGap = parseInt(item_horizontal_gap) - parseInt(props.arrow_size);
        }

        additionalCss.push([{
          selector: '%%order_class%% .df_timeline_container.layout_left .df_timeline_item .df_timeline_content_area .timeline_arrow .timeline_arrow_icon',
          declaration: `margin-left: ${arrowIconGap}px !important;`,
          device: "phone",
        }]);

        let dateArrowIconGap = parseInt(item_horizontal_gap);
        if ("on" === props.reverse_date_arrow) {
          dateArrowIconGap = parseInt(date_horizontal_gap) - parseInt(props.date_arrow_size);
        }

        additionalCss.push([{
          selector: '%%order_class%% .df_timeline_container.layout_left .df_timeline_item .df_timeline_date_area .timeline_arrow>*',
          declaration: `margin-left: ${dateArrowIconGap}px !important; left: calc(0% - ${dateArrowHorizontalPosition}) !important;`,
          device: "phone",
        }]);

        additionalCss.push([{
          selector: '%%order_class%% .df_timeline_container.layout_left .df_timeline_item .df_timeline_date_area .timeline_arrow_caret',
          declaration: `margin-left: ${parseInt(date_horizontal_gap) - parseInt(props.date_arrow_size)}px !important; left: calc(0% - ${dateArrowHorizontalPosition}) !important;`,
          device: "phone",
        }]);

        additionalCss.push([{
          selector: '%%order_class%% .df_timeline_container.layout_left .df_timeline_item .df_timeline_date_area .timeline_arrow_icon',
          declaration: `margin-left: ${parseInt(date_horizontal_gap) - parseInt(props.date_arrow_size * 2)}px;`,
          device: "phone",
        }]);

        additionalCss.push([{
          selector: '%%order_class%% .df_timeline_container.layout_left .df_timeline_item .df_timeline_date_area .timeline_arrow_line',
          declaration: `margin-left: ${parseInt(date_horizontal_gap) - parseInt(props.date_arrow_size)}px !important;`,
          device: "phone",
        }]);

        additionalCss.push([{
          selector: '%%order_class%% .df_timeline_container.layout_left .df_timeline_marker',
          declaration: `left: 0% !important;`,
        }]);

      } else if ('right' === props.layout_type_mobile) {
        const item_horizontal_gap = itemMargin[1] ? itemMargin[1] : "80px";
        const date_horizontal_gap = dateMargin[1] ? dateMargin[1] : defaultMargin;

        if ('on' === props.enable_date_in_blurb) {
          additionalCss.push([{
            selector: '%%order_class%% .df_timeline_container.layout_right .df_timeline_date_area',
            declaration: `justify-content: ${props.date_horizontal_alignment};`,
            device: "phone",
          }]);
        }

        additionalCss.push([{
          selector: '%%order_class%% .df_timeline_container.layout_right .df_timeline_item .df_timeline_content_area .timeline_arrow>*',
          declaration: `margin-left: -${item_horizontal_gap} !important; left: calc(100% + ${contentArrowHorizontalPosition});`,
          device: "phone",
        }]);

        additionalCss.push([{
          selector: '%%order_class%% .df_timeline_container.layout_right .df_timeline_item .df_timeline_date_area .timeline_arrow>*',
          declaration: `margin-left: -${date_horizontal_gap}; left: calc(100% + ${dateArrowHorizontalPosition});`,
        }]);

        const marker_width = props.marker_width_phone ? props.marker_width_phone
          : props.marker_width_tablet ? props.marker_width_tablet : props.marker_width;

        additionalCss.push([{
          selector: '%%order_class%% .df_timeline_container.layout_right .df_timeline_marker',
          declaration: `left: calc(100% - ${marker_width}) !important;`,
        }]);

      } else {
        if ('on' === props.enable_date_in_blurb) {
          additionalCss.push([{
            selector: '%%order_class%% .df_timeline_container.layout_middle .df_timeline_date_area',
            declaration: `justify-content: ${props.date_horizontal_alignment};`,
          }]);

          additionalCss.push([{
            selector: '%%order_class%% .df_timeline_container.layout_middle .df_timeline_date_area .df_timeline_date_content',
            declaration: 'margin-left: 0;',
          }]);
        }
      }
    }

    // arrow reverse
    if ("on" === props.enable_arrow) {
      if ("on" === props.reverse_arrow) {
        // caret
        additionalCss.push([{
          selector: '%%order_class%% .df_timeline_item .df_timeline_content_area .timeline_arrow_caret',
          declaration: 'transform: rotate(180deg) !important;',
        }]);

        additionalCss.push([{
          selector: '%%order_class%% .df_timeline_item.reverse .df_timeline_content_area .timeline_arrow_caret',
          declaration: 'transform: rotate(0deg) !important;',
        }]);

        // icon
        additionalCss.push([{
          selector: '%%order_class%% .df_timeline_item .df_timeline_content_area .timeline_arrow_icon',
          declaration: 'transform: rotate(0deg) !important;',
        }]);

        additionalCss.push([{
          selector: '%%order_class%% .df_timeline_item.reverse .df_timeline_content_area .timeline_arrow_icon',
          declaration: 'transform: rotate(180deg) !important;',
        }]);
      }

      if ("left" === props.layout_type_mobile) {
        additionalCss.push([{
          selector: '%%order_class%% .df_timeline_container.layout_left .df_timeline_content_area .timeline_arrow_icon',
          declaration: 'transform: rotate(180deg) !important;',
          device: "phone"
        }]);
      } else if ("right" === props.layout_type_mobile) {
        additionalCss.push([{
          selector: '%%order_class%% .df_timeline_container.layout_right .df_timeline_content_area .timeline_arrow_icon',
          declaration: 'transform: rotate(0deg) !important;',
          device: "phone"
        }]);
      }

      if ("on" === props.reverse_arrow && "left" === props.layout_type_mobile) {
        additionalCss.push([{
          selector: '%%order_class%% .df_timeline_container.layout_left .df_timeline_content_area .timeline_arrow_caret',
          declaration: 'transform: rotate(180deg) !important;',
          device: "phone"
        }]);

        additionalCss.push([{
          selector: '%%order_class%% .df_timeline_container.layout_left .df_timeline_content_area .timeline_arrow_icon',
          declaration: 'transform: rotate(0deg) !important;',
          device: "phone"
        }]);

      } else if ("on" === props.reverse_arrow && "right" === props.layout_type_mobile) {
        additionalCss.push([{
          selector: '%%order_class%% .df_timeline_container.layout_right .df_timeline_content_area .timeline_arrow_caret',
          declaration: 'transform: rotate(0deg) !important;',
          device: "phone"
        }]);

        additionalCss.push([{
          selector: '%%order_class%% .df_timeline_container.layout_right .df_timeline_content_area .timeline_arrow_icon',
          declaration: 'transform: rotate(180deg) !important;',
          device: "phone"
        }]);
      }
    }

    if ("on" === props.enable_date_arrow) {
      if ("on" === props.reverse_date_arrow) {
        // caret
        additionalCss.push([{
          selector: '%%order_class%% .df_timeline_item .df_timeline_date_area .timeline_arrow_caret',
          declaration: 'transform: rotate(0deg) !important;',
        }]);

        additionalCss.push([{
          selector: '%%order_class%% .df_timeline_item.reverse .df_timeline_date_area .timeline_arrow_caret',
          declaration: 'transform: rotate(180deg) !important;',
        }]);

        // icon
        additionalCss.push([{
          selector: '%%order_class%% .df_timeline_item .df_timeline_date_area .timeline_arrow_icon',
          declaration: 'transform: rotate(180deg) !important;',
        }]);

        additionalCss.push([{
          selector: '%%order_class%% .df_timeline_item.reverse .df_timeline_date_area .timeline_arrow_icon',
          declaration: 'transform: rotate(0deg) !important;',
        }]);
      }

      if ("left" === props.layout_type_mobile) {
        additionalCss.push([{
          selector: '%%order_class%% .df_timeline_container.layout_left .df_timeline_date_area .timeline_arrow .timeline_arrow_icon',
          declaration: 'transform: rotate(180deg) !important;',
          device: "phone"
        }]);
      } else if ("right" === props.layout_type_mobile) {
        additionalCss.push([{
          selector: '%%order_class%% .df_timeline_container.layout_right .df_timeline_date_area .timeline_arrow .timeline_arrow_icon',
          declaration: 'transform: rotate(0deg) !important;',
          device: "phone"
        }]);
      }

      if ("on" === props.reverse_date_arrow && "left" === props.layout_type_mobile) {
        additionalCss.push([{
          selector: '%%order_class%% .df_timeline_container.layout_left .df_timeline_date_area .timeline_arrow_caret',
          declaration: 'transform: rotate(180deg) !important;',
          device: "phone"
        }]);

        additionalCss.push([{
          selector: '%%order_class%% .df_timeline_container.layout_left .df_timeline_date_area .timeline_arrow .timeline_arrow_icon',
          declaration: 'transform: rotate(0deg) !important;',
          device: "phone"
        }]);

      } else if ("on" === props.reverse_date_arrow && "right" === props.layout_type_mobile) {
        additionalCss.push([{
          selector: '%%order_class%% .df_timeline_container.layout_right .df_timeline_date_area .timeline_arrow_caret',
          declaration: 'transform: rotate(0deg) !important;',
          device: "phone"
        }]);

        additionalCss.push([{
          selector: '%%order_class%% .df_timeline_container.layout_right .df_timeline_date_area .timeline_arrow .timeline_arrow_icon',
          declaration: 'transform: rotate(180deg) !important;',
          device: "phone"
        }]);
      }
    }

    // orders
    if (props.order_enable !== 'off') {
      if ("on" === props.enable_date_in_blurb && "phone" === view_mode) {
        utility.process_range_value({
          'props': props,
          'key': 'date_order',
          'additionalCss': additionalCss,
          'selector': '%%order_class%% .df_timeline_content_area .df_timeline_date_area',
          'type': 'order',
          'default_value': '-1',
          'important': true,
        });
      }
      utility.process_range_value({
        'props': props,
        'key': 'title_order',
        'additionalCss': additionalCss,
        'selector': '%%order_class%% .df_timeline_content_area .df_timeline_title',
        'type': 'order',
        'default_value': '9',
      });
      utility.process_range_value({
        'props': props,
        'key': 'sub_title_order',
        'additionalCss': additionalCss,
        'selector': '%%order_class%% .df_timeline_content_area .df_timeline_subtitle',
        'type': 'order',
        'default_value': '9',
      });
      utility.process_range_value({
        'props': props,
        'key': 'media_order',
        'additionalCss': additionalCss,
        'selector': '%%order_class%% .df_timeline_content_area .df_timeline_media',
        'type': 'order',
        'default_value': '9',
      });
      utility.process_range_value({
        'props': props,
        'key': 'content_order',
        'additionalCss': additionalCss,
        'selector': '%%order_class%% .df_timeline_content_area .df_timeline_desc',
        'type': 'order',
        'default_value': '9',
      });
      utility.process_range_value({
        'props': props,
        'key': 'button_order',
        'additionalCss': additionalCss,
        'selector': '%%order_class%% .df_timeline_content_area .df_timeline_button',
        'type': 'order',
        'default_value': '9',
      });
    } else {
      if ("on" === props.enable_date_in_blurb && "phone" === view_mode) {
        utility.process_range_value({
          'props': props,
          'key': 'date_order',
          'additionalCss': additionalCss,
          'selector': '%%order_class%% .df_timeline_content_area .df_timeline_date_area',
          'type': 'order',
          'default_value': '-1',
          'important': true,
        });
      }
    }

    return additionalCss;
  }

  df_send_data_props = () => {
    const dataProps = {
      layout_type: this.props.layout_type,
      layout_type_mobile: this.props.layout_type_mobile,
      arrow_marker_vertical_align: this.props.arrow_marker_vertical_align,
      enable_arrow: this.props.enable_arrow,
      disable_arrow_mobile: this.props.disable_arrow_mobile,
      arrow_type: this.props.arrow_type,
      arrow_icon: this.props.arrow_icon,
      arrow_vertical_alignment: this.props.arrow_vertical_alignment,
      arrow_vertical_position: this.props.arrow_vertical_position,
      enable_date_in_blurb: this.props.enable_date_in_blurb,
      disable_date: this.props.disable_date,
      disable_date_mobile: this.props.disable_date_mobile,
      disable_date_arrow_mobile: this.props.disable_date_arrow_mobile,
      enable_date_arrow: this.props.enable_date_arrow,
      date_arrow_type: this.props.date_arrow_type,
      date_arrow_icon: this.props.date_arrow_icon,
      date_arrow_vertical_align: this.props.date_arrow_vertical_align,
      date_arrow_vertical_position: this.props.date_arrow_vertical_position,
      marker_postion_mobile: this.props.marker_postion_mobile,
    }

    return JSON.stringify(dataProps);
  }
  // Set horizontal line position
  df_tmln_set_line = () => {
    const setLine = () => {
      const props = this.props
      const itemsWrapper = this.itemsWrapper.current
      const line = this.line.current
      let view_mode = window.ET_Builder.API.State.View_Mode.current;

      let df_tmln_markers;
      if (itemsWrapper && itemsWrapper.querySelectorAll('.df_timeline_marker')) {
        df_tmln_markers = itemsWrapper.querySelectorAll('.df_timeline_marker')
      }

      if (line && df_tmln_markers) {
        line.style.opacity = 1;
        let firstMarkerWidth = null;
        if (df_tmln_markers.length) {
          firstMarkerWidth = df_tmln_markers[0].offsetWidth;
        }
        const markerOffsetSide = df_tmln_markers[0].offsetLeft + (firstMarkerWidth / 2) - (line.offsetWidth / 2) + 'px';
        line.style.right = "auto";
        line.style.left = markerOffsetSide;

        if (view_mode === 'phone') {
          if ("middle" === this.props.layout_type_mobile) {
            line.style.left = markerOffsetSide
          } else if ("left" === this.props.layout_type_mobile) {
            line.style.left = `calc(0% + ${(firstMarkerWidth / 2) - (line.offsetWidth / 2)}px)`
          } else if ("right" === this.props.layout_type_mobile) {
            line.style.left = `calc(100% - ${(firstMarkerWidth / 2) + (line.offsetWidth / 2)}px)`
          }

        }

        const lastContent = itemsWrapper.querySelectorAll('.df_timeline_content');
        if ('first_marker' === props.line_start_from) {
          if (df_tmln_markers.length > 0) {
            const firstMarker = df_tmln_markers[0];
            const firstMarkerRect = firstMarker.getBoundingClientRect();
            line.style.top = firstMarker.offsetTop + firstMarkerRect.height + 'px'; // position
            if (df_tmln_markers.length > 1) {
              const lastMarker = df_tmln_markers[df_tmln_markers.length - 1];
              let lastContentRect = 0;
              let lineBottom = 0;
              if (view_mode === 'phone') {
                if (lastContent.length > 1) {
                  lastContentRect = lastContent[lastContent.length - 1].getBoundingClientRect();
                }
                lineBottom = "middle" === props.layout_type_mobile ? lastContentRect.bottom : lastMarker.getBoundingClientRect().bottom
              } else {
                lineBottom = lastMarker.getBoundingClientRect().bottom
              }
              const markerDistance = lineBottom - firstMarkerRect.bottom;
              line.style.height = markerDistance + 'px';
            } else {
              const itemWrapperHeight = firstMarker.parentElement.offsetHeight;
              if ('start' === this.props.item_vertical_alignment) {
                line.style.height = itemWrapperHeight - firstMarkerRect.height + 'px';
              } else if ('center' === this.props.item_vertical_alignment) {
                line.style.height = itemWrapperHeight / 2 - firstMarkerRect.height / 2 + 'px';
              } else {
                line.style.height = 0 + 'px';
              }
            }
          } else {
            line.style.height = 0 + 'px';
          }
        } else {
          if (df_tmln_markers.length > 0) {
              if (df_tmln_markers.length > 1) {
                const line_top_marker_space = "on" === props.enable_line_top_marker ? parseInt(props.line_top_marker_vertical_position) : 0;
                const line_bottom_marker_space = "on" === props.enable_line_bottom_marker ? parseInt(props.line_bottom_marker_vertical_position) : 0;
                line.style.height = `calc(100% + ${line_top_marker_space + line_bottom_marker_space}px)`;
                line.style.top = -line_top_marker_space + 'px';
              } else {
                line.style.height = 200 + 'px';
              }
          }
        }
      }
    }

    setTimeout(() => {
      setLine();
      window.addEventListener('resize', setLine);
      return () => {
        window.removeEventListener('resize', setLine);
      }
    }, 100)
  }

  df_tmln_top_bottom_marker = (str) => {
    const utils = window.ET_Builder.API.Utils;
    const props = this.props;
    const markerType = !!props[`line_${str}_marker_type`] ? props[`line_${str}_marker_type`] : "icon";
    const markerIcon = !!props[`line_${str}_icon`] ? utils.processFontIcon(props[`line_${str}_icon`]) : utils.processFontIcon('\e00a');

    let marker = '';
    switch (markerType) {
      case 'icon':
        return marker = !!props[`line_${str}_icon`] && (<span className={`et-pb-icon df_timeline_${str}_icon`}>{markerIcon}</span>);
      case 'image':
        return marker = !!props[`line_${str}_image`] && (<img src={!!props[`line_${str}_image`] ? props[`line_${str}_image`] : ''} alt={!!props[`line_${str}_img_alt_txt`] ? props[`line_${str}_img_alt_txt`] : ""} />);
      case 'text':
        return marker = !!props[`line_${str}_txt`] ? props[`line_${str}_txt`] : "Marker Text";
    }

    return marker;
  }

  contentOutput(props) {
    return props.content.length !== 0 ? props.content : '';
  }

  render() {
    const props = this.props;
    const dataProps = this.df_send_data_props();
    const enable_top_marker = !!props.enable_line_top_marker ? props.enable_line_top_marker : 'off';
    const enable_bottom_marker = !!props.enable_line_bottom_marker ? props.enable_line_bottom_marker : 'off';
    const lineTopMarker = this.df_tmln_top_bottom_marker('top');
    const lineBottomMarker = this.df_tmln_top_bottom_marker('bottom');

    if (this.props['content'] === '' || this.props['content'].length === 0) {
      return <h2 className='df_timeline_notice' >Please <strong>Add New Timeline Item.</strong></h2>;
    }

    return (
      <>
        <div className={`df_timeline_container layout_${props.layout_type_mobile}`} data-props={dataProps}>
          {'on' === enable_top_marker && 'custom' === props.line_start_from ?
            <div className="df_timeline_top">
              <div className="df_line_marker">
                {lineTopMarker}
              </div>
            </div> : ""}
          <div className="df_timeline_items" ref={this.itemsWrapper}>
            {this.contentOutput(props)}
            <div className="df_timeline_line" ref={this.line}></div>
          </div>
          {'on' === enable_bottom_marker && 'custom' === props.line_start_from ?
            <div className="df_timeline_bottom">
              <div className="df_line_marker">
                {lineBottomMarker}
              </div>
            </div> : ""}
        </div>
      </>
    );
  }
}

export default Timeline;
