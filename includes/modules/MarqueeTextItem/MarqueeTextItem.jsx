// External Dependencies
import React, { Component } from 'react';
import utility from "../../../scripts/df_scripts/utilities";
import DynamicField from './DynamicField';
// Internal Dependencies
import './style.css';

class MarqueeTextItem extends Component {
  static slug = 'difl_marqueetextitem';

  static css(props) {
    const additionalCss = [];

    const marqueTxtWrapper = "div.df_marqueetext_wrapper %%order_class%% div.df_marquee_text";

    if ('' !== props.text_icon && 'on' === props.enable_text_icon) {
      utility.process_icon_font_style({
        props: props,
        additionalCss: additionalCss,
        key: "text_icon",
        selector: `${marqueTxtWrapper} .df_marquee_text_icon`,
      });
    }

    utility.df_process_bg({
      'props': props,
      'additionalCss': additionalCss,
      'key': 'text_background',
      'selector': `${marqueTxtWrapper}>*:not(div.df_marquee_media)`,
      'important': true
    });

    utility.df_process_text_clip({
      'props': props,
      'additionalCss': additionalCss,
      'key': 'text_clip',
      'selector': `${marqueTxtWrapper}>*:not(div.df_marquee_media)`
    });

    utility.df_process_bg({
      props: props,
      key: "text_media_bg",
      additionalCss: additionalCss,
      selector: `${marqueTxtWrapper} div.df_marquee_media`,
    });

    utility.process_color({
      props: props,
      key: "text_icon_color",
      additionalCss: additionalCss,
      selector: `${marqueTxtWrapper} span.df_marquee_text_icon`,
      type: "color",
      important: true,
    });

    utility.process_range_value({
      props: props,
      key: "text_icon_size",
      additionalCss: additionalCss,
      selector: `${marqueTxtWrapper} span.df_marquee_text_icon`,
      type: "font-size",
    });

    utility.process_range_value({
      props: props,
      key: "text_image_width",
      additionalCss: additionalCss,
      selector: `${marqueTxtWrapper} div.df_marquee_media img.df_marquee_text_img`,
      type: "width",
    });

    utility.process_margin_padding({
      props: props,
      key: "item_wrapper_margin",
      additionalCss: additionalCss,
      selector: "%%order_class%%.et_pb_module",
      type: "margin",
    });

    utility.process_margin_padding({
      props: props,
      key: "item_wrapper_padding",
      additionalCss: additionalCss,
      selector: "%%order_class%%.et_pb_module",
      type: "padding",
    });


    utility.process_margin_padding({
      props: props,
      key: "marquee_text_margin",
      additionalCss: additionalCss,
      selector: `${marqueTxtWrapper}>*:not(div.df_marquee_media)`,
      type: "margin",
    });

    utility.process_margin_padding({
      props: props,
      key: "marquee_text_padding",
      additionalCss: additionalCss,
      selector: `${marqueTxtWrapper}>*:not(div.df_marquee_media)`,
      type: "padding",
    });

    utility.process_margin_padding({
      props: props,
      key: "marquee_text_media_margin",
      additionalCss: additionalCss,
      selector: `${marqueTxtWrapper} div.df_marquee_media`,
      type: "margin",
    });

    utility.process_margin_padding({
      props: props,
      key: "marquee_text_media_padding",
      additionalCss: additionalCss,
      selector: `${marqueTxtWrapper} div.df_marquee_media`,
      type: "padding",
    });

    return additionalCss;
  }

  render_image(props) {
    const image = props.dynamic.text_img;
    const imgAltTxt = props.text_img_alt_txt !== undefined ? props.text_img_alt_txt : ' ';

    if (image.loading) {
      return image.render();
    }

    if (!image.value) {
      return '';
    }

    return (
      <div className="df_marquee_media">
        <img src={utility._renderDynamicContent(props, 'text_img', false)}
          className='df_marquee_text_img'
          atl={imgAltTxt} />
      </div>
    )
  }

  /**
 * Render component output.
 *
 * @return {JSX.Element} Render as React.JS Component.
 */
  render() {

    const props = this.props;
    const utils = window.ET_Builder.API.Utils;
    const isContent = props.dynamic.text.hasValue
    const childItemDynamic = window.DF_Dynamics ? window.DF_Dynamics : {};

    const mediaAfterText = 'on' === props.set_media_after_text
    const imgHtml = this.render_image(props);

    const iconHtml = '' !== props.text_icon &&
      <div className="df_marquee_media">
        <span className="et-pb-icon df_marquee_text_icon">
          {utils.processFontIcon(props['text_icon'])}
        </span>
      </div>;

    const icon_image = 'on' === props.enable_text_icon ? iconHtml : imgHtml;

    let is_enable_text_clip = '';
    if (undefined !== props.text_clip_enable_clip
      && 'on' === props.text_clip_enable_clip) {
      is_enable_text_clip = 'enable_text_clip';
    }

    if (!isContent){
      return "Please add text."
    }

    return (
      <div className={`df_marquee_text ${is_enable_text_clip}`}>
        {!mediaAfterText && icon_image}
        <DynamicField
          data={childItemDynamic}
          indexClass={props.moduleInfo.orderClassName}
          _key="text"
          content={props.dynamic.text.value}
          tag={props.text_tag}
        />
        {mediaAfterText && icon_image}
      </div>
    )
  }
}
export default MarqueeTextItem;
