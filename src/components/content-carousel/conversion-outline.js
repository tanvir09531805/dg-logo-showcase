const convertInlineValue = (value) => {
  return _.isString(value) ? value.split(',') : [];
};

const convertIcon = (value) => {
  value = value.split('|');
  value = {
    unicode: value[0],
    type: value[2],
    weight: value[4],
  };
  return value;
};

const convertSpacing = (value) => {
  value = value.split('|');
  value = {
    top: value[0],
    right: value[1],
    bottom: value[2],
    left: value[3],
    syncHorizontal: value[4],
    syncVertical: value[5],
  };
  return value;
};

export const conversionOutline = {
  module: {
    advanced: {
      admin_label: "module.meta.adminLabel",
      background: "module.decoration.background",
      fonts: {
        cc_title: "cc_title.decoration.font",
        cc_subtitle: "cc_subtitle.decoration.font",
        cc_content: "cc_content.decoration.font",
        df_content_inherit: "df_content_inherit.decoration.font",
        button: "button.decoration.font",
        content_heading_1: "content_heading_1.decoration.font"
      },
      borders: {
        default: "module.decoration.border",
        arrow_icon_wrapper_border: "arrow_icon_wrapper_border.decoration.border",
        button: "button.decoration.border"
      },
      box_shadow: {
        default: "module.decoration.boxShadow"
      }
    },
    module: {
      carousel_type: "settingCarousel.innerContent.*.carouselType",
      item_desktop: "settingCarousel.innerContent.*.maxSlide",
      item_tablet: "settingCarousel.innerContent.*.maxSlide",
      item_mobile: "settingCarousel.innerContent.*.maxSlide",
      item_spacing: "settingCarousel.innerContent.*.spacingPx",
      speed: "settingCarousel.innerContent.*.speed",
      centered_slides: "settingCarousel.innerContent.*.centerSlides",
      loop: "settingCarousel.innerContent.*.loop",
      autoplay: "settingCarousel.innerContent.*.autoplay",
      autospeed: "settingCarousel.innerContent.*.autoplaySpeed",
      pause_hover: "settingCarousel.innerContent.*.pauseOnHover",
      arrow: "arrow.innerContent.*",
      dots: "dots.innerContent.*",
      equal_height: "settingCarousel.innerContent.*.equalHeightItem",
      use_lightbox: "settingCarousel.innerContent.*.useLightbox",
      use_lightbox_title: "settingCarousel.innerContent.*.showTitleOnLightbox",
      coverflow_shadow: "addSettingCarousel.innerContent.*.slideShadows",
      coveflow_color_dark: "addSettingCarousel.innerContent.*",
      coveflow_color_light: "addSettingCarousel.innerContent.shadowLightColor.*",
      coverflow_rotate: "addSettingCarousel.innerContent.*.rotateInDegrees",
      coverflow_stretch: "addSettingCarousel.innerContent.*.spaceBetween",
      coverflow_depth: "addSettingCarousel.innerContent.*.stretchDepth",
      coverflow_modifier: "addSettingCarousel.innerContent.*.effectMultipler",
      image_order: "imgOrder.innerContent.*",
      title_order: "titleOrder.innerContent.*",
      subtitle_order: "subTitleOrder.innerContent.*",
      content_order: "contentOrder.innerContent.*",
      button_order: "btnOrder.innerContent.*",
      arrow_color: "arrows.advanced.arrowIconColor.*",
      arrow_background: "arrows.advanced.arrowBgColor.*",
      arrow_position: "arrows.advanced.arrowPosition.*",
      arrow_align: "arrows.advanced.*.arrowAlignment",

      df_title_bg: "title.decoration.background.*",
      df_subtitle_bg: "subTitle.decoration.background.*",
      df_content_bg: "content.decoration.background.*",

      arrow_opacity: "arrows.advanced.arrowOpacity.*",
      arrow_opacity_disable: "arrowNavigation.advanced.show.*",
      arrow_circle: "arrows.advanced.circleArrow.*",
      arrow_prev_icon_use_icon: "arrowPrevIcon.innerContent.*",
      arrow_prev_icon_font_icon: "arrowPrevIcon.decoration.icon.*",
      arrow_prev_icon_icon_size: "arrowPrevIcon.decoration.sizing.*",
      arrow_next_icon_use_icon: "arrowNextIcon.innerContent.*",
      arrow_next_icon_font_icon: "arrowNextIcon.decoration.icon.*",
      arrow_next_icon_icon_size: "arrowNextIcon.decoration.sizing.*",
      dots_color: "dotNavigation.decoration.dotsColor.*",
      active_dots_color: "dotNavigation.decoration.activeDotsColor.*",
      large_active_dot: "dotNavigation.decoration.largeActiveDots.*",
      dots_align: "dotNavigation.decoration.dotsAlignment.*",
      dot_vertical_position: "dotNavigation.decoration.verticalPosition.*",
      cc_button_button_fullwidth: "button.decoration.fullWidth.*",


      arrow_prev_margin: "arrow_prev_margin.decoration.spacing.*.margin",
      arrow_prev_padding: "arrow_prev_padding.decoration.spacing.*.padding",
      arrow_next_margin: "arrow_next_margin.decoration.spacing.*.margin",
      arrow_next_padding: "arrow_next_padding.decoration.spacing.*.padding",
      cc_button_button_align: "cc_button_button_align.innerContent.*",
      df_button_bg: "df_button_bg.innerContent.*",
      button_wrapper_margin: "button_wrapper_margin.decoration.spacing.*.margin",
      button_wrapper_padding: "button_wrapper_padding.decoration.spacing.*.padding",
      button_margin: "button_margin.decoration.spacing.*.margin",
      button_padding: "button_padding.decoration.spacing.*.padding",
      wrapper_padding: "wrapper_padding.decoration.spacing.*.padding",
      item_wrapper_margin: "item_wrapper_margin.decoration.spacing.*.margin",
      item_wrapper_padding: "item_wrapper_padding.decoration.spacing.*.padding",
      image_wrapper_margin: "image_wrapper_margin.decoration.spacing.*.margin",
      image_wrapper_padding: "image_wrapper_padding.decoration.spacing.*.padding",
      image_margin: "image_margin.decoration.spacing.*.margin",
      title_margin: "title_margin.decoration.spacing.*.margin",
      title_padding: "title_padding.decoration.spacing.*.padding",
      subtitle_margin: "subtitle_margin.decoration.spacing.*.margin",
      subtitle_padding: "subtitle_padding.decoration.spacing.*.padding",
      content_margin: "content_margin.decoration.spacing.*.margin",
      content_padding: "content_padding.decoration.spacing.*.padding"
    },
    valueExpansionFunctionMap: {
      arrow_prev_margin: convertSpacing,
      arrow_prev_padding: convertSpacing,
      arrow_next_margin: convertSpacing,
      arrow_next_padding: convertSpacing,
      button_wrapper_margin: convertSpacing,
      button_wrapper_padding: convertSpacing,
      button_margin: convertSpacing,
      button_padding: convertSpacing,
      wrapper_padding: convertSpacing,
      item_wrapper_margin: convertSpacing,
      item_wrapper_padding: convertSpacing,
      image_wrapper_margin: convertSpacing,
      image_wrapper_padding: convertSpacing,
      image_margin: convertSpacing,
      title_margin: convertSpacing,
      title_padding: convertSpacing,
      subtitle_margin: convertSpacing,
      subtitle_padding: convertSpacing,
      content_margin: convertSpacing,
      content_padding: convertSpacing
    }
  }
};
