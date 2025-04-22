import { convertBackground, convertIcon, convertSpacing } from '../../../scripts/content-carousel.js';

const conversionOutlineProcess = () => {
  const processModuleData = () =>{
    const general_field = {
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
      arrow_position: "arrows.advanced.*.arrowPosition",
      arrow_align: "arrows.advanced.*.arrowAlignment",

      df_title_bg: "title.decoration.background.*",
      df_subtitle_bg: "subTitle.decoration.background.*",
      df_content_bg: "content.decoration.background.*",

      arrow_opacity: "arrows.advanced.*.arrowOpacity",
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
      arrow_prev_margin: "arrowPrevIcon.decoration.spacing.*.margin",
      arrow_prev_padding: "arrowPrevIcon.decoration.spacing.*.padding",
      arrow_next_margin: "arrowNextIcon.decoration.spacing.*.margin",
      arrow_next_padding: "arrowNextIcon.decoration.spacing.*.padding",
      wrapper_padding: "carouselWPadding.decoration.spacing.*.padding",
      item_wrapper_margin: "itemWrapperSpacing.decoration.spacing.*.margin",
      item_wrapper_padding: "itemWrapperSpacing.decoration.spacing.*.padding",
      image_wrapper_margin: "imageWrapperSpacing.decoration.spacing.*.margin",
      image_wrapper_padding: "imageWrapperSpacing.decoration.spacing.*.padding",
      image_margin: "cImageSpacing.decoration.spacing.*.margin",
      title_margin: "cTitleSpacing.decoration.spacing.*.margin",
      title_padding: "cTitleSpacing.decoration.spacing.*.padding",
      subtitle_margin: "cSubTitleSpacing.decoration.spacing.*.margin",
      subtitle_padding: "cSubTitleSpacing.decoration.spacing.*.padding",
      content_margin: "contentSpacing.decoration.spacing.*.margin",
      content_padding: "contentSpacing.decoration.spacing.*.padding",
      btn_use_icon: "button.decoration.button.*.enable",
      btn_font_icon: "button.decoration.button.*.icon.settings",
      button_margin: "button.decoration.spacing.*.margin",
      button_padding: "button.decoration.spacing.*.padding",
      df_button_bg: "button.decoration.background.*",
      btn_icon_color: "button.decoration.button.*.icon.color",
      btn_icon_placement: "button.decoration.button.*.icon.placement",
      btn_icon_show_hover: "button.decoration.button.*.icon.onHover",
      btn_icon_font_size: "btnIconSizeMargin.decoration.sizing.*",
      btn_icon_margin: "btnIconSizeMargin.decoration.spacing.*.margin",
      cc_button_button_align: "button.decoration.button.*.alignment",
      cc_button_button_fullwidth: "button.decoration.fullWidth.*",
      button_wrapper_margin: "button.decoration.spacing.*.margin",
      button_wrapper_padding: "button.decoration.spacing.*.margin"

    }
    const title_background = convertBackground( 'df_title_bg', 'title' );
    const arrow_background = convertBackground( 'arrow_background', 'arrowBgColor' );
    return { 
      ...general_field, 
      ...title_background,
      ...arrow_background 
    };
  }
  
  return {
    advanced: {
      admin_label: "module.meta.adminLabel",
      background: "module.decoration.background",
      fonts: {
        cc_title: "title.decoration.font",
        cc_subtitle: "subTitle.decoration.font",
        cc_content: "content.decoration.font",
        button: "button.decoration.font",
        // df_content_inherit: "df_content_inherit.decoration.font",
        // content_heading_1: "content_heading_1.decoration.font"
      },
      borders: {
        default: "module.decoration.border",
        // arrow_icon_wrapper_border: "arrow_icon_wrapper_border.decoration.border",
        // button: "button.decoration.border"
      },
      box_shadow: {
        default: "module.decoration.boxShadow"
      },
      margin_padding: "module.decoration.spacing"
    },
    module: processModuleData(),
    valueExpansionFunctionMap: {
      arrow_prev_icon_font_icon: convertIcon,
      arrow_next_icon_font_icon: convertIcon,
      btn_font_icon: convertIcon,
      btn_icon_margin: convertSpacing,

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
}

export const conversionOutline = conversionOutlineProcess();

