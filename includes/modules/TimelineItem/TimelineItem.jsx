import React, { Component } from "react";
import utility from "../../../scripts/df_scripts/utilities";
import DynamicField from './DynamicField';
// Internal Dependencies
import "./style.css";

class TimelineItem extends Component {
  static slug = "difl_timelineitem";

  constructor(props) {
    super(props);
    this.state = {
      parentData: null,
    }
    this.itemWrapper = React.createRef();
    this.contentArrow = React.createRef();
    this.marker = React.createRef();
    this.view_mode = window.ET_Builder.API.State.View_Mode.current;
  }

  componentDidMount() {
    if (this.itemWrapper.current) {
      const dataWrapper = this.itemWrapper.current.closest('.df_timeline_container').dataset.props;
      this.setState({ parentData: JSON.parse(dataWrapper) }, () => {
        this.df_tmln_layout(this.state.parentData);
        this.df_tmln_content_arrow(this.state.parentData);
        this.df_tmln_date_arrow(this.state.parentData);
        if ('phone' === this.view_mode) {
          this.df_marker_position_mobile(this.state.parentData);
        }
      })
    }
  }

  componentDidUpdate() {
    this.df_tmln_content_arrow(this.state.parentData);
  }

  static css(props) {
    var additionalCss = [];

    if ("" !== props.content_icon && 'icon' === props.content_media_type) {
      utility.process_icon_font_style({
        props: props,
        additionalCss: additionalCss,
        key: "content_icon",
        selector: "%%order_class%% .df_timeline_content_area .df_timeline_media .df_timeline_content_icon",
      });
    }

    if ("" !== props.button_font_icon) {
      utility.process_icon_font_style({
        props: props,
        additionalCss: additionalCss,
        key: "button_font_icon",
        selector: "%%order_class%% .df_timeline_content_area .df_timeline_button a .df_timeline_btn_icon",
      });
    }

    if ("" !== props.marker_icon) {
      utility.process_icon_font_style({
        props: props,
        additionalCss: additionalCss,
        key: "marker_icon",
        selector: "%%order_class%% .df_timeline_item .df_timeline_marker .df_timeline_marker_icon",
      });
    }

    utility.df_process_bg({
      props: props,
      key: 'item_wrapper_bg',
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_item .df_timeline_content_area .df_timeline_content",
    });

    utility.df_process_bg({
      props: props,
      key: 'title_bg',
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_item .df_timeline_content_area .df_timeline_title",
    });

    utility.df_process_bg({
      props: props,
      key: 'subtitle_bg',
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_item .df_timeline_content_area .df_timeline_subtitle",
    });

    utility.df_process_bg({
      props: props,
      key: 'content_text_bg',
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_item .df_timeline_content_area .df_timeline_desc",
    });

    utility.df_process_bg({
      props: props,
      key: 'content_media_bg',
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_item .df_timeline_content_area .df_timeline_media>*",
    });

    utility.df_process_bg({
      props: props,
      key: "content_button_bg",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_item .df_timeline_button a",
    });

    utility.df_process_bg({
      props: props,
      key: "marker_bg",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_item .df_timeline_marker",
      important: true,
    });

    utility.process_color({
      props: props,
      key: "marker_icon_color",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_item .df_timeline_marker .df_timeline_marker_icon",
      type: "color",
    });

    utility.process_color({
      props: props,
      key: "mobile_marker_icon_color",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_item .df_timeline_marker .df_timeline_marker_icon.marker_mobile",
      type: "color",
    });

    utility.process_range_value({
      props: props,
      key: "marker_icon_size",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_item .df_timeline_marker .df_timeline_marker_icon",
      type: "font-size",
    });

    utility.process_range_value({
      props: props,
      key: "mobile_marker_icon_size",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_item .df_timeline_marker .df_timeline_marker_icon.marker_mobile",
      type: "font-size",
    });

    utility.process_range_value({
      props: props,
      key: "marker_img_width",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_item .df_timeline_marker img",
      type: "width",
      default_value: '100%',
    });


    // content icon
    utility.process_color({
      props: props,
      key: "content_icon_color",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_content_area .df_timeline_media .df_timeline_content_icon",
      type: "color"
    });

    utility.process_range_value({
      props: props,
      key: "content_icon_size",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_content_area .df_timeline_media .df_timeline_content_icon",
      default_value: '30px',
      type: "font-size"
    });

    utility.process_color({
      props: props,
      key: "button_text_color",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_content_area .df_timeline_button a",
      type: "color",
    });

    utility.process_color({
      props: props,
      key: "button_icon_color",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_content_area .df_timeline_button a .df_timeline_btn_icon",
      type: "color",
    });

    // arrow color
    utility.process_color({
      'props': props,
      'key': 'arrow_color',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% div.df_timeline_item div.df_timeline_content_area div.timeline_arrow div.timeline_arrow_caret',
      'type': 'border-right-color',
      'important': true
    });

    utility.process_color({
      'props': props,
      'key': 'arrow_color',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% div.df_timeline_item div.df_timeline_content_area div.timeline_arrow span.timeline_arrow_icon',
      'type': 'color',
      'important': true
    });

    utility.process_color({
      'props': props,
      'key': 'arrow_color',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% div.df_timeline_item div.df_timeline_content_area div.timeline_arrow div.timeline_arrow_line',
      'type': 'border-color',
      'important': true
    });

    // date arrow color
    utility.process_color({
      'props': props,
      'key': 'date_arrow_color',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% div.df_timeline_item div.df_timeline_date_area div.df_timeline_date_content div.timeline_arrow div.timeline_arrow_caret',
      'type': 'border-right-color',
      'important': true
    });

    utility.process_color({
      'props': props,
      'key': 'date_arrow_color',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% div.df_timeline_item div.df_timeline_date_area div.df_timeline_date_content div.timeline_arrow span.timeline_arrow_icon',
      'type': 'color',
      'important': true
    });

    utility.process_color({
      'props': props,
      'key': 'date_arrow_color',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% div.df_timeline_item div.df_timeline_date_area div.df_timeline_date_content div.timeline_arrow div.timeline_arrow_line',
      'type': 'border-color',
      'important': true
    });

    utility.process_range_value({
      props: props,
      key: "button_icon_size",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_content_area .df_timeline_button a .df_timeline_btn_icon",
      type: "font-size",
    });

    utility.df_process_string_attr({
      props: props,
      key: "button_alignment",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_content_area .df_timeline_button",
      type: "text-align",
      default_value: 'left'
    });

    utility.df_process_bg({
      props: props,
      key: 'date_wrapper_bg',
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_item .df_timeline_date_area .df_timeline_date_content",
    });

    utility.process_margin_padding({
      props: props,
      key: "item_wrapper_padding",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_item .df_timeline_content_area .df_timeline_content",
      type: "padding",
    });

    utility.process_margin_padding({
      props: props,
      key: "timeline_title_margin",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_item .df_timeline_content_area .df_timeline_title",
      type: "margin",
    });

    utility.process_margin_padding({
      props: props,
      key: "timeline_title_padding",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_item .df_timeline_content_area .df_timeline_title",
      type: "padding",
    });

    utility.process_margin_padding({
      props: props,
      key: "timeline_subtitle_margin",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_item .df_timeline_content_area .df_timeline_subtitle",
      type: "margin",
    });

    utility.process_margin_padding({
      props: props,
      key: "timeline_subtitle_padding",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_item .df_timeline_content_area .df_timeline_subtitle",
      type: "padding",
    });

    utility.process_margin_padding({
      props: props,
      key: "timeline_media_item_margin",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_item .df_timeline_content_area .df_timeline_media",
      type: "margin",
    });

    utility.process_margin_padding({
      props: props,
      key: "timeline_media_item_padding",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_item .df_timeline_content_area .df_timeline_media>*",
      type: "padding",
    });

    utility.process_margin_padding({
      props: props,
      key: "timeline_content_margin",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_item .df_timeline_content_area .df_timeline_desc",
      type: "margin",
    });

    utility.process_margin_padding({
      props: props,
      key: "timeline_content_padding",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_item .df_timeline_content_area .df_timeline_desc",
      type: "padding",
    });

    utility.process_margin_padding({
      props: props,
      key: "timeline_button_margin",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_item .df_timeline_content_area .df_timeline_button a",
      type: "margin",
    });

    utility.process_margin_padding({
      props: props,
      key: "timeline_button_padding",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_item .df_timeline_content_area .df_timeline_button a",
      type: "padding",
    });

    utility.process_margin_padding({
      props: props,
      key: "date_wrapper_padding",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_item .df_timeline_date_content",
      type: "padding",
    });

    utility.process_margin_padding({
      props: props,
      key: "date_title_margin",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_item .df_timeline_date_content .df_timeline_date_title",
      type: "margin",
    });

    utility.process_margin_padding({
      props: props,
      key: "date_subtitle_margin",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_item .df_timeline_date_content .df_timeline_date_subtitle",
      type: "margin",
    });

    utility.df_process_string_attr({
      'props': props,
      'key': 'item_vertical_alignment',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_timeline_item',
      'type': 'align-items'
    });

    // settings
    utility.process_range_value({
      props: props,
      key: "item_vartical_position",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_item .df_timeline_content_area",
      type: "top",
    });

    utility.process_range_value({
      props: props,
      key: "date_vartical_position",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_item .df_timeline_date_area",
      type: "top",
    });
    // }


    utility.process_range_value({
      props: props,
      key: "content_image_width",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_content_area .df_timeline_media img",
      type: "width",
      default_value: '100%',
      important: true
    });

    // media alignment
    const mediaType = props.content_media_type !== undefined ? props.content_media_type : 'image';
    if ('icon' === mediaType) {
      utility.df_process_string_attr({
        props: props,
        key: "content_icon_alignment",
        additionalCss: additionalCss,
        selector: "%%order_class%% .df_timeline_content_area .df_timeline_media",
        type: "text-align",
        default_value: 'left'
      });
    } else {
      utility.df_process_string_attr({
        props: props,
        key: "content_image_alignment",
        additionalCss: additionalCss,
        selector: "%%order_class%% .df_timeline_content_area .df_timeline_media",
        type: "text-align",
        default_value: 'left'
      });
    }

    const imageFullWidthMobile = props.content_image_full_width_mobile !== undefined ? props.content_image_full_width_mobile : 'off'
    if ("on" === imageFullWidthMobile) {
      additionalCss.push([
        {
          selector: "%%order_class%% .df_timeline_content_area .df_timeline_media",
          declaration: "width: 100% !important;",
          device: "phone",
        },
      ]);
      additionalCss.push([
        {
          selector: "%%order_class%% .df_timeline_content_area .df_timeline_media img",
          declaration: "width: 100% !important;",
          device: "phone",
        },
      ]);
    }

    // Content
    if (!!props.design_content_text_ul_position) {
      additionalCss.push([
        {
          selector: "%%order_class%% .df_timeline_item .df_timeline_content_area .df_timeline_desc ul",
          declaration: `list-style-position: ${props.design_content_text_ul_position} !important;`,
        }
      ]);
    }
    if (!!props.design_content_text_ul_type) {
      additionalCss.push([
        {
          selector: "%%order_class%% .df_timeline_item .df_timeline_content_area .df_timeline_desc ul",
          declaration: `list-style-type: ${props.design_content_text_ul_type} !important;`,
        }
      ]);
    }

    // Button
    const display_btn = "on" === props.button_full_width ? "block" : "inline-flex";
    additionalCss.push([
      {
        selector: "%%order_class%% .df_timeline_content_area .df_timeline_button a",
        declaration: `display: ${display_btn};`,
      },
    ]);

    if ("on" === props.button_full_width) {
      additionalCss.push([
        {
          selector: "%%order_class%% .df_timeline_content_area .df_timeline_button a span",
          declaration: "vertical-align: middle;",
        },
      ]);
    }

    if ("left" === props.button_icon_placement) {
      utility.process_range_value({
        props: props,
        key: "button_icon_space",
        additionalCss: additionalCss,
        selector: "%%order_class%% .df_timeline_button a .df_timeline_btn_icon",
        type: "margin-right",
        important: true,
      });
    } else {
      utility.process_range_value({
        props: props,
        key: "button_icon_space",
        additionalCss: additionalCss,
        selector: "%%order_class%% .df_timeline_button a .df_timeline_btn_icon",
        type: "margin-left",
        important: true,
      });
    }

    utility.process_range_value({
      props: props,
      key: "marker_vertical_position",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_timeline_marker",
      type: "top",
    });

    return additionalCss;
  }

  df_tmln_arrow = (type, icon) => {
    const utils = window.ET_Builder.API.Utils;
    const arrowType = !!type ? type : "arrow_caret";
    const arrowIcon = !!icon ?
      <span className='et-pb-icon timeline_arrow_icon'>{utils.processFontIcon(icon)}</span> :
      <span className='et-pb-icon timeline_arrow_icon'>&#x45;</span>;
    let arrow = ''

    switch (arrowType) {
      case 'arrow_caret':
        arrow = <div className="timeline_arrow_caret"></div>
        break;
      case 'arrow_icon':
        arrow = arrowIcon
        break;
      case 'arrow_line':
        arrow = <div className="timeline_arrow_line"></div>
        break;
    }

    return arrow;
  }

  df_tmln_layout = (data) => {
    const itemParent = this.itemWrapper.current.closest('.difl_timeline');
    const allItems = itemParent.querySelectorAll('.df_timeline_item');

    if (itemParent && allItems) {
      for (let index = 0; index < allItems.length; index++) {
        const element = allItems[index];
        element.style.opacity = 1 // prevent opacity affect on item on animation time
        if ('right' === data.layout_type) {
          element.classList.add("reverse")
        } else if ('middle' === data.layout_type) {
          if (index % 2 === 0) {
            element.classList.add("reverse")
          }
        }
      }
    }

  }

  df_tmln_marker = () => {
    const props = this.props
    const utils = window.ET_Builder.API.Utils;
    const markerType = !!props.marker_type ? props.marker_type : "icon";
    const markerIcon = !!props['marker_icon'] ? utils.processFontIcon(props['marker_icon']) : utils.processFontIcon("&#xe00a;||divi||400");
    const markerIconMobile = !!props['mobile_marker_icon'] ? utils.processFontIcon(props['mobile_marker_icon']) : utils.processFontIcon("&#xe00a;||divi||400");
    const viewMode = window.ET_Builder.API.State.View_Mode.current;
    const isMarkerMobile = 'phone' === viewMode && "on" === props.enable_marker_icon_mobile;

    let marker = '';
    switch (markerType) {
      case 'icon':
        return marker = (<span className={`et-pb-icon df_timeline_marker_icon ${isMarkerMobile ? "marker_mobile" : ""}`}>{isMarkerMobile ? markerIconMobile : markerIcon}</span>);
      case 'image':
        return marker = (<img src={!!props['marker_img'] ? props['marker_img'] : ''} alt={!!props['marker_img_alt_txt'] ? props['marker_img_alt_txt'] : ""} />);
      case 'text':
        return marker = !!props['marker_txt'] && props['marker_txt'];
    }

    return marker;
  }

  render_image(props) {
    const image = props.dynamic.content_image;
    const imgAltTxt = props.content_image_alt_text !== undefined ? props.content_image_alt_text : ' ';
    if (image.loading) {
      return image.render();
    }

    return (
      <img src={utility._renderDynamicContent(props, 'content_image', false)} atl={imgAltTxt} />
    )
  }

  df_render_media = () => {
    const props = this.props
    const utils = window.ET_Builder.API.Utils;
    const mediaType = props.content_media_type !== undefined ? props.content_media_type : 'image';
    const ImgHtml = props.dynamic.content_image.hasValue ? this.render_image(props) : '';
    const iconHtml = !!props.content_icon ?
      <span className="et-pb-icon df_timeline_content_icon">{utils.processFontIcon(props['content_icon'])}</span> :
      <span className='et-pb-icon df_timeline_content_icon'>&#xe00a;</span>;

    return "image" === mediaType ? ImgHtml : iconHtml
  }

  render_button() {
    const props = this.props;
    const utils = window.ET_Builder.API.Utils;
    const button_text = props.button_text ? utility._renderDynamicContent(props, 'button_text') : 'Button';
    const button_url = props.button_url ? props.button_url : '#';
    const button_font_icon = props.button_font_icon ? utils.processFontIcon(props.button_font_icon) : '5';
    const button_icon_pos = props.button_icon_placement ? props.button_icon_placement : 'right';

    const button_icon = 'on' === props.use_button_icon ?
      <span className={'et-pb-icon df_timeline_btn_icon'}>
        {button_font_icon}</span>
      : '';

    return (
      'on' === props.enable_content_button ?
        <div className={`df_timeline_button ${'left' !== button_icon_pos ? "right" : "left"}`}>
          <a href={button_url}> {button_icon_pos === 'left' ? button_icon : ''} {button_text} {button_icon_pos === 'right' ? button_icon : ''} </a>
        </div> : ""
    )
  }

  df_render_date = (dataParent) => {
    const props = this.props
    const hasDateTitle = props.dynamic.date_title.hasValue;
    const DateTitleLevel = props.date_title_tag ? props.date_title_tag : 'h3';
    const hasDateSubTitle = props.dynamic.date_sub_title.hasValue;
    const DateSubTitleLevel = props.date_sub_title_tag ? props.date_sub_title_tag : 'h4';
    const layoutType = dataParent.layout_type ? dataParent.layout_type : "middle";
    const dateArrow = this.df_tmln_arrow(dataParent.date_arrow_type, dataParent.date_arrow_icon);
    const disableDate = 'off' !== dataParent.disable_date;
    const hasDateElement = !!hasDateTitle || !!hasDateSubTitle;

    return (
      <div className={`df_timeline_date_area 
      ${disableDate && 'middle' === layoutType ? "df_hide_section" : ""}
      ${disableDate && 'middle' !== layoutType ? "df_disable_section" : ""}
    `}>
        <div className={`df_timeline_date_content ${!hasDateElement ? 'df_hide_section' : ''}`}>
          {'on' === dataParent.enable_date_arrow &&
            <div className="timeline_arrow">{dateArrow}</div>}
          {hasDateTitle && <DateTitleLevel className="df_timeline_date_title">{utility._renderDynamicContent(props, 'date_title')}</DateTitleLevel>}
          {hasDateSubTitle && <DateSubTitleLevel className="df_timeline_date_subtitle">{utility._renderDynamicContent(props, 'date_sub_title')}</DateSubTitleLevel>}
        </div>
      </div>
    );
  }

  df_tmln_content_arrow = (data) => {
    const itemWrapper = this.itemWrapper.current;
    const contentArea = itemWrapper.querySelector('.df_timeline_content');

    if (!!itemWrapper && "on" === data.enable_arrow) {
      let contentArrowSettings;
      if ('phone' === this.view_mode) {
        contentArrowSettings = {
          'vertical_align': data.arrow_marker_vertical_align,
          'vertical_position': 0,
          'context': 'content'
        };
      } else {
        contentArrowSettings = {
          'vertical_align': data.arrow_vertical_alignment,
          'vertical_position': data.arrow_vertical_position,
          'context': 'content'
        };
      }

      this.df_tmln_arrow_position(contentArea, contentArrowSettings);
    }
  }

  df_tmln_date_arrow = (data) => {
    const itemWrapper = this.itemWrapper.current
    const dateArea = itemWrapper.querySelector('.df_timeline_date_content')

    if (!!itemWrapper && "on" === data.enable_date_arrow) {
      let dateArrowSettings;
      if ('phone' === this.view_mode) {
        dateArrowSettings = {
          'vertical_align': data.arrow_marker_vertical_align,
          'vertical_position': 0,
          'context': 'date'
        };
      } else {
        dateArrowSettings = {
          'vertical_align': data.date_arrow_vertical_align,
          'vertical_position': data.date_arrow_vertical_position,
          'context': 'date'
        };
      }

      this.df_tmln_arrow_position(dateArea, dateArrowSettings);
    }
  }

  df_marker_position_mobile = (settings) => {
    const marker = this.marker.current;
    if (marker) {
      let isDisableDate = false;
      let markerFromDate = "on" !== settings.marker_postion_mobile;
      if ("on" !== settings.disable_date) {
        if ("on" !== settings.disable_date_mobile) {
          isDisableDate = true;
        }
      }

      const contentWrapper = marker.nextElementSibling.firstChild
      let dateWrapper;
      if (!marker.previousElementSibling && "on" === settings.enable_date_in_blurb) {
        dateWrapper = contentWrapper.firstChild.firstChild;
      } else {
        dateWrapper = marker.previousElementSibling.firstChild;
      }

      const contentMargin = parseInt(getComputedStyle(contentWrapper).marginTop, 10);
      const dateMargin = parseInt(getComputedStyle(dateWrapper).marginTop, 10);
      const gapBetweenDateBlurb = 'middle' !== settings.layout_type_mobile && "on" !== settings.enable_date_in_blurb ? parseInt(contentMargin) : 0;
      const isDisableGap = isDisableDate ? gapBetweenDateBlurb : 0;
      const markerMargin = markerFromDate ? 'top' : 'marginTop';
      const markerOffsetHeight = marker.offsetHeight / 2;
      const itemVerticalAlign = settings.arrow_marker_vertical_align;

      let wrapperHeight;
      let markerOffset;
      if (markerFromDate && isDisableDate) {
        if (marker.previousElementSibling || "on" !== settings.enable_date_in_blurb) {
          wrapperHeight = marker.previousElementSibling.firstChild.offsetHeight;
        } else {
          wrapperHeight = marker.nextElementSibling.firstChild.offsetHeight;
        }
      } else {
        wrapperHeight = marker.nextElementSibling.firstChild.offsetHeight;
      }

      if (markerFromDate && isDisableDate) {
        if ("top" === itemVerticalAlign) {
          markerOffset = 0 + "px";
        } else if ("middle" === itemVerticalAlign) {
          markerOffset = (wrapperHeight / 2) - markerOffsetHeight + 'px';
        } else {
          markerOffset = wrapperHeight - marker.offsetHeight + 'px'
        }
      } else {
        markerOffset = isDisableGap + (wrapperHeight / 2) - markerOffsetHeight + 'px';

        if ("top" === itemVerticalAlign) {
          markerOffset = isDisableGap + 0 + "px";
        } else if ("bottom" === itemVerticalAlign) {
          markerOffset = isDisableGap + wrapperHeight - marker.offsetHeight + 'px';
        }
      }

      if ('middle' !== settings.layout_type_mobile) {
        if ("on" === settings.enable_date_in_blurb) {
          marker.style[markerMargin] = parseInt(markerOffset) + gapBetweenDateBlurb + "px"
        } else {
          marker.style[markerMargin] = parseInt(markerOffset) + dateMargin + "px"
        }
      }
    }
  }

  df_tmln_arrow_position = (wrapper, settings) => {
    let arrow;
    if ('content' === settings.context) {
      arrow = wrapper.nextElementSibling.firstChild;
    } else {
      arrow = wrapper.querySelector(".timeline_arrow > *");
    }
    if (arrow === null) return
    const wrapperHeight = wrapper.offsetHeight;
    const wrapperBorderTop = parseInt(getComputedStyle(wrapper).borderTopWidth, 10);
    const arrowHeight = arrow.offsetHeight;
    const isIcon = arrow.classList.contains('timeline_arrow_icon');
    const isReverse = wrapper.closest(".df_timeline_item").classList.contains("reverse");
    const isCArrowPosition = !!this.props.child_arrow_vertical_position;
    const isCDateArrowPosition = !!this.props.child_date_arrow_vertical_position;
    const contentArrVertical = isCArrowPosition ? this.props.child_arrow_vertical_position : 0;
    const dateArrVertical = isCDateArrowPosition ? this.props.child_date_arrow_vertical_position : 0;
    const hasMargin = parseInt(getComputedStyle(wrapper).marginTop);

    // custom vertical position
    let arrowOffset = "";
    let arrVerticalPos = null;
    if ('content' === settings.context) {
      if (isCArrowPosition) {
        arrVerticalPos = parseInt(contentArrVertical)
      } else {
        arrVerticalPos = parseInt(settings.vertical_position)
      }
    } else if ('date' === settings.context) {
      if (isCDateArrowPosition) {
        arrVerticalPos = parseInt(dateArrVertical)
      } else {
        arrVerticalPos = parseInt(settings.vertical_position)
      }
    }

    if (typeof arrVerticalPos != "undefined") {
      var arrowVerticalPosPercent = wrapperHeight * arrVerticalPos / 100;
      var arrowSizeOffsetPercent = arrowHeight * arrVerticalPos / 100;
    }

    var customOffset = arrowVerticalPosPercent - arrowSizeOffsetPercent;
    // get border radius default/reverse
    let offsetBorderRadi = 0;
    const wrapperBorderRadi = this.get_border_radius(wrapper)
    if ("top" === settings.vertical_align || 0 === arrVerticalPos) {
      offsetBorderRadi = isReverse ? wrapperBorderRadi[0].TopRight : wrapperBorderRadi[0].TopLeft;
    } else if ("bottom" === settings.vertical_align || 100 === arrVerticalPos) {
      offsetBorderRadi = isReverse ? wrapperBorderRadi[0].BottomRight : wrapperBorderRadi[0].BottomLeft;
    }

    const verticalTop = !isIcon ? offsetBorderRadi + hasMargin : - wrapperBorderTop / 2 + (offsetBorderRadi / 2) + hasMargin
    const verticalMid = ((wrapperHeight - arrowHeight) / 2) + wrapperBorderTop / 2 + hasMargin;
    const verticalBot = wrapperHeight - arrowHeight - offsetBorderRadi + hasMargin;

    switch (settings.vertical_align) {
      case "top":
         arrowOffset = verticalTop;
         break;
      case "middle":
         arrowOffset = verticalMid;
         break;
      case "bottom":
         arrowOffset = !isIcon ? verticalBot : verticalBot + wrapperBorderTop / 2;
         break;
      case "custom":
         if (typeof arrVerticalPos != "undefined") {
            arrowOffset = customOffset
         }
         break;
   }

    if ('content' === settings.context && isCArrowPosition) {
      arrow.style.top = `${customOffset}px`
    } else if ('date' === settings.context && isCDateArrowPosition) {
      arrow.style.top = `${customOffset}px`
    } else {
      arrow.style.top = `${arrowOffset}px`
    }
  }

  get_border_radius = (element) => {
    const borderRadiusValues = [];
    const computedStyle = getComputedStyle(element);
    const TopLeft = parseInt(computedStyle.borderTopLeftRadius, 10) || 0;
    const TopRight = parseInt(computedStyle.borderTopRightRadius, 10) || 0;
    const BottomRight = parseInt(computedStyle.borderBottomRightRadius, 10) || 0;
    const BottomLeft = parseInt(computedStyle.borderBottomLeftRadius, 10) || 0;

    borderRadiusValues.push({
      TopLeft,
      TopRight,
      BottomRight,
      BottomLeft
    });

    return borderRadiusValues
  }

  render() {
    const props = this.props
    const childItemDynamic = window.DF_Dynamics ? window.DF_Dynamics : {};
    const dataParent = !!this.itemWrapper.current ? this.state.parentData : ""; // get parent props data
    const title = props.dynamic.title.hasValue ? utility._renderDynamicContent(props, 'title') : '';
    const TitleLevel = props.title_tag ? props.title_tag : 'h3';
    const subtitle = props.dynamic.sub_title.hasValue ? utility._renderDynamicContent(props, 'sub_title') : '';
    const SubTitleLevel = props.sub_title_tag ? props.sub_title_tag : 'h4';

    const contentBtn = 'on' === props.enable_content_button ? this.render_button() : '';
    const content = props.dynamic.content.hasValue
    const contentArrow = this.df_tmln_arrow(dataParent.arrow_type, dataParent.arrow_icon);

    const markerHtml = this.df_tmln_marker();
    const hasMedia = props.enable_content_media !== undefined ? props.enable_content_media : 'on';
    const mediaHtml = this.df_render_media(props)
    const dateArea = this.df_render_date(dataParent)

    const hasContentElement = !!title || !!subtitle || 'on' === hasMedia || !!content || '' !== contentBtn;

    return (
      <div className="df_timeline_item" key={props.moduleInfo.order} ref={this.itemWrapper}>
        {"phone" !== this.view_mode ? dateArea : ""}
        {"phone" === this.view_mode && "on" !== dataParent.enable_date_in_blurb ? dateArea : ""}
        <div className="df_timeline_marker" ref={this.marker}>{markerHtml}</div>
        <div className={` df_timeline_content_area ${!hasContentElement ? 'df_hide_section' : ''}`}>
          <div className="df_timeline_content">
            {"phone" === this.view_mode && "on" === dataParent.enable_date_in_blurb ? dateArea : ""}
            {title && <TitleLevel className="df_timeline_title">{title}</TitleLevel>}
            {subtitle && <SubTitleLevel className="df_timeline_subtitle">{subtitle}</SubTitleLevel>}
            {'on' === hasMedia && <div className="df_timeline_media">{mediaHtml}</div>}
            {content &&
              <DynamicField
                data={childItemDynamic}
                indexClass={props.moduleInfo.orderClassName}
                _key="content"
                content={props.dynamic.content.value}
              />
            }

            {contentBtn}
            
          </div>
          {'on' === dataParent.enable_arrow &&
            <div className="timeline_arrow">{contentArrow}</div>}
        </div>
      </div>
    );
  }
}

export default TimelineItem;
