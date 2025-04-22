import React, { Component } from "react";
import utility from "../../../scripts/df_scripts/utilities";
// Internal Dependencies
import "./style.css";

class RatingBox extends Component {
  static slug = "difl_ratingbox";

  static css(props) {
    var additionalCss = [];

    utility.df_process_bg({
      props: props,
      key: "rating_bg",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_rating_icon",
    });

    utility.df_process_bg({
      props: props,
      key: "rating_title_bg",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_rating_title",
    });

    utility.df_process_bg({
      props: props,
      key: "rating_content_bg",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_rating_content",
    });

    // Custom Icon
    if (props.enable_custom_icon === "on") {
      additionalCss.push([
        {
          selector: `%%order_class%% .df_rating_icon_empty::after`,
          declaration: `display:none !important;`,
        },
      ]);
      additionalCss.push([
        {
          selector: `%%order_class%% .df_rating_icon span.df_rating_icon_fill::before`,
          declaration: `content: attr(data-icon) !important;`,
        },
      ]);
      additionalCss.push([
        {
          selector: `%%order_class%% .df_rating_icon span.et-pb-icon`,
          declaration: `margin-top: -3px;`,
        },
      ]);

      utility.process_color({
        props: props,
        key: "rating_color_inactive",
        additionalCss: additionalCss,
        selector: "%%order_class%% .df_rating_icon span.et-pb-icon",
        type: "color",
        important: false,
      });

      utility.process_color({
        props: props,
        key: "rating_color_active",
        additionalCss: additionalCss,
        selector: "%%order_class%% .df_rating_icon_fill::before",
        type: "color",
        important: true,
      });
    } else {
      utility.process_color({
        props: props,
        key: "rating_color_active",
        additionalCss: additionalCss,
        selector: "%%order_class%% .df_rating_icon .df_rating_icon_fill, %%order_class%% .df_rating_icon .df_rating_icon_fill::before",
        type: "color",
        important: false,
      });

      utility.process_color({
        props: props,
        key: "rating_color_inactive",
        additionalCss: additionalCss,
        selector: "%%order_class%% .df_rating_icon .df_rating_icon_empty, %%order_class%% .df_rating_icon .df_rating_icon_empty::after",
        type: "color",
        important: false,
      });
    }

    // Single Rating
    if (props.enable_single_rating === "on") {
      utility.process_color({
        props: props,
        key: "rating_color_single",
        additionalCss: additionalCss,
        selector: "%%order_class%% .df_rating_icon span.et-pb-icon, %%order_class%% .df_rating_icon span.df_rating_icon_fill::before",
        type: "color",
        important: true,
      });
    }

    // Rating Icon (+ before) Size
    utility.process_range_value({
      props: props,
      key: "rating_icon_size",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_rating_icon span.et-pb-icon, %%order_class%% .df_rating_icon span.df_rating_icon_fill::before, %%order_class%% .df_rating_icon span.df_rating_icon_empty::after",
      type: "font-size",
      important: true,
    });

    // Rating icon spacing
    utility.process_range_value({
      props: props,
      key: "rating_icon_space",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_rating_icon span.et-pb-icon:not(:first-child)",
      type: "margin-left",
      unit: "px",
    });

    utility.process_margin_padding({
      props: props,
      key: "rating_wrapper_margin",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_rating_icon",
      type: "margin",
    });

    utility.process_margin_padding({
      props: props,
      key: "rating_wrapper_padding",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_rating_icon",
      type: "padding",
    });

    utility.process_margin_padding({
      props: props,
      key: "rating_box_number_margin",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_rating_number",
      type: "margin",
      important: true,
    });

    utility.process_margin_padding({
      props: props,
      key: "rating_box_title_margin",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_rating_title",
      type: "margin",
    });

    utility.process_margin_padding({
      props: props,
      key: "rating_box_title_padding",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_rating_title",
      type: "padding",
    });

    utility.process_margin_padding({
      props: props,
      key: "rating_box_content_margin",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_rating_content",
      type: "margin",
    });

    utility.process_margin_padding({
      props: props,
      key: "rating_box_content_padding",
      additionalCss: additionalCss,
      selector: "%%order_class%% .df_rating_content",
      type: "padding",
    });

    if (props.enable_custom_icon === "on") {
      utility.process_icon_font_style({
        props: props,
        additionalCss: additionalCss,
        key: "rating_icon",
        selector: `%%order_class%% .df_rating_icon span.et-pb-icon`,
        important: true,
      });
    }

    // Title Placement
    if (props.title_display_type === "inline") {
      if (props.title_placement_left_right === "right") {
        additionalCss.push([
          {
            selector: `%%order_class%%  .df_rating_title`,
            declaration: `margin-left: 5px;`,
          },
        ]);
      } else {
        additionalCss.push([
          {
            selector: `%%order_class%%  .df_rating_title`,
            declaration: `margin-right: 5px;`,
          },
        ]);
      }
    } else {
      additionalCss.push([
        {
          selector: `%%order_class%%  .df_rating_title`,
          declaration: `display: block; width: 100%;`,
        },
      ]);
    }

    // Rating number default
    if (props.enable_rating_number === "on") {
      if (props.rating_number_placement_left_right === "right") {
        additionalCss.push([
          {
            selector: `%%order_class%%  .df_rating_number`,
            declaration: `margin-left: 5px;`,
          },
        ]);
      } else {
        additionalCss.push([
          {
            selector: `%%order_class%%  .df_rating_number`,
            declaration: `margin-right: 5px;`,
          },
        ]);
      }
    }

    if (props.title_display_type === "block") {
      this.df_set_flex_position({
        props: props,
        key: "rating_icon_align",
        additionalCss: additionalCss,
        selector: "%%order_class%% .df_rating_wrapper",
        type: "align-items",
      });

      if (props.title_placement_top_bottom === "top") {
        additionalCss.push([
          {
            selector: `%%order_class%% .df_rating_wrapper`,
            declaration: `flex-direction: column-reverse;`,
          },
        ]);
      } else {
        additionalCss.push([
          {
            selector: `%%order_class%% .df_rating_wrapper`,
            declaration: `flex-direction: column;`,
          },
        ]);
      }

      // inline
    } else {
      this.df_set_flex_position({
        props: props,
        key: "rating_icon_align",
        additionalCss: additionalCss,
        selector: "%%order_class%% .df_rating_wrapper",
        type: "justify-content",
        css: "align-items: center",
      });

      additionalCss.push([
        {
          selector: `%%order_class%% .df_rating_icon`,
          declaration: `display: flex; align-items: center;`,
        },
      ]);

      if (props.title_placement_left_right === "left") {
        additionalCss.push([
          {
            selector: `%%order_class%% .df_rating_wrapper`,
            declaration: `flex-direction: row-reverse;`,
          },
        ]);
      } else if (props.title_placement_left_right === "right") {
        additionalCss.push([
          {
            selector: `%%order_class%% .df_rating_wrapper`,
            declaration: `flex-direction: row;`,
          },
        ]);
      }

      // (Mobile) Set display type block on mobile
      additionalCss.push([
        {
          selector: `%%order_class%% .df_rating_wrapper`,
          declaration: `flex-direction: column-reverse !important;`,
          device: "phone",
        },
      ]);
    }

    if ("" !== props.title_text_align_phone) {
      const title_align_mob = props.title_text_align_phone ? props.title_text_align_phone : props.title_text_align_tablet;
      additionalCss.push([
        {
          selector: `%%order_class%% .df_rating_title`,
          declaration: `width: 100%; margin-right:0px; margin-left:0px; text-align: ${title_align_mob};`,
          device: "phone",
        },
      ]);
    }

    const rating_align_mob = props.rating_icon_align_phone ? props.rating_icon_align_phone
      : props.rating_icon_align_tablet ? props.rating_icon_align_tablet : props.rating_icon_align;
    additionalCss.push([
      {
        selector: `%%order_class%% .df_rating_icon`,
        declaration: `width: 100%; justify-content: ${rating_align_mob};`,
        device: "phone",
      },
    ]);

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

  df_render_rating_wrapper() {
    const props = this.props;
    const utils = window.ET_Builder.API.Utils;

    // Rating scale type
    const rating_scale_type = props.enable_single_rating === "off"
        ? props.rating_scale_type !== "" ? parseInt(props.rating_scale_type)
          : 5 : 1;

    const rating_value = rating_scale_type === 5
        ? props.rating_value_5 <= 5 && props.rating_value_5 >= 0
          ? props.rating_value_5
          : 5
        : props.rating_value_10 <= 10 && props.rating_value_10 >= 0
        ? props.rating_value_10
        : 10;

    // Get only Icon
    const dynamicIcon = utility.df_collect_dynamic_content("rating_icon",this.props);
    const icon = props.enable_custom_icon === "on" ? utils.processFontIcon(dynamicIcon) : "☆";

    // Set Rating Icon
    const rating_icon = [];
    let rating_active_class = "";
    const get_float =
      typeof rating_value === "string" && rating_value.includes(".")
        ? rating_value.split(".")
        : parseInt(rating_value);

    // Display rating Icon
    for (let i = 1; i <= rating_scale_type; i++) {
      if (typeof rating_value === "undefined") {
        rating_active_class = "";
      } else if ([] !== get_float && i <= get_float) {
        rating_active_class = "df_rating_icon_fill";
      } else if (
        i <= parseInt(get_float[0]) ||
        (1 < parseInt(get_float[1]) &&
          parseInt(get_float[0]) + parseInt(1) == i)
      ) {
        if (i <= parseInt(get_float[0])) {
          rating_active_class = "df_rating_icon_fill";
        } else {
          rating_active_class = `df_rating_icon_fill df_rating_icon_empty df_fraction_reverse df_fill_${get_float[1]}`;
        }
      } else {
        rating_active_class = "df_rating_icon_empty";
      }

      // Render rating loop
      rating_icon.push(
        <span className={"et-pb-icon " + rating_active_class} key={i} data-icon={icon}>
          {icon}
        </span>
      );
    }

    // Get single rating value
    const rating_value_single = parseInt(props.rating_scale_type) === 5 ? props.rating_value_5 : props.rating_value_10;

    // Show rating number/text
    let ratingNumber = ""
    if(props.enable_rating_number === "on"){
      if(props.enable_single_rating !== "on"){
        if(props.rating_number_type === "number_with_bracket"){
          ratingNumber = <span className="df_rating_number">
            {`(${rating_value}/${rating_scale_type})`}
          </span>
        }else if(props.rating_number_type === "number_without_bracket"){
          ratingNumber = <span className="df_rating_number">{`${rating_value}/${rating_scale_type}`}</span>
        }else{
          ratingNumber = <span className="df_rating_number">{rating_value_single}</span>
        }
      }else{
        ratingNumber = <span className="df_rating_number">{rating_value_single}</span>
      }
    }else{
      ratingNumber = ""
    }

    // Render icon wrapper
    const isLeftNum = props.rating_number_placement_left_right === "left" ? true : false
    const iconWrapper = (
      <div className={"df_rating_icon"}>
        {isLeftNum ? ratingNumber : ""} {rating_icon} {!isLeftNum ? ratingNumber : ""}
      </div>
    );

    // Rating Title Wrapper
    const HeadingTag = props.rating_title_tag !== "" ? props.rating_title_tag : "h4";
    const titleWrapper = props.enable_title === "on" && props.title !== "" ? (
        <HeadingTag className="df_rating_title">
          {props.dynamic.title.hasValue !== ""? utility._renderDynamicContent(props, "title") : ""}
        </HeadingTag>
      ) : ("");

    // Return Rating Icon wrapper
    return (
      <div className="df_rating_wrapper">
        {iconWrapper}
        {titleWrapper}
      </div>
    );
  }
  // Rating Content
  df_render_content() {
    const content = this.props.enable_content === "on" && this.props.content() !== "" ? (
        <div className={"df_rating_content"}>
          {this.props.dynamic.content.hasValue !== "" ? utility._renderDynamicContent(this.props, "content") : ""}
        </div>
      ) : ("");

    return content;
  }

  render() {
    return (
      <>
        <div className="df_rating_box_container">
          {this.df_render_rating_wrapper()}
          {this.df_render_content()}
        </div>
      </>
    );
  }
}

export default RatingBox;
