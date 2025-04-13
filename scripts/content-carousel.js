
function iconPickerVisible({
  attrs,
  attrName,
  responsiveMode,
  stateMode,
}) {
  return 'on' === attrs?.imageIcon?.innerContent?.desktop?.value?.useIcon;
}
function iconPickerInvisible({
  attrs,
  attrName,
  responsiveMode,
  stateMode,
}) {
  return ('on' === attrs?.imageIcon?.innerContent?.desktop?.value?.useIcon) ? false : true;
}

function enablesSlidesShadows({
  attrs,
  attrName,
  responsiveMode,
  stateMode,
}) { 
  return ('on' === attrs.addSettingCarousel?.innerContent?.slideShadows.desktop?.value?.slideShadows) ? true : false;
}
function carouselTypeCoverFlow({
  attrs,
  attrName,
  responsiveMode,
  stateMode,
}) { 
  // attrs.settingCarousel?.innerContent?.carouselType?.desktop?.value?.carouselType
  return ("coverflow" === attrs.settingCarousel?.innerContent?.carouselType?.desktop?.value?.carouselType) ? true : false;
}
function carouselSettingAutoplay({
  attrs,
  attrName,
  responsiveMode,
  stateMode,
}) { 
  // ccData?.autoplay?.desktop?.value?.autoplay
  return ("on" === attrs.settingCarousel?.innerContent?.autoplay?.desktop?.value?.autoplay) ? true : false;
}
function carouselSettingLightbox({
  attrs,
  attrName,
  responsiveMode,
  stateMode,
}) { 
  // ccData?.autoplay?.desktop?.value?.autoplay
  return ("on" === attrs.settingCarousel?.innerContent?.useLightbox?.desktop?.value?.useLightbox) ? true : false;
}

function arrowIconPrev({ attrs, }) { 
  return ("on" === attrs.arrowPrevIcon?.innerContent?.desktop?.value) ? true : false;
}
function arrowIconNext({ attrs, }) { 
  // attrs.arrowNextIcon?.innerContent?.desktop?.value
  return ("on" === attrs.arrowNextIcon?.innerContent?.desktop?.value) ? true : false;
}


function imageAltTextHas({
  attrs,
  attrName,
  responsiveMode,
  stateMode,
}) { 
  // attrs.settingCarousel?.innerContent?.carouselType?.desktop?.value?.carouselType
  let imageAlt = attrs?.useImage?.innerContent?.items?.src?.desktop?.value?.alt;
  let imgSetAlt = attrs?.useImage?.innerContent?.items?.alt?.desktop?.value?.alt;
  return imgSetAlt ? imgSetAlt : imageAlt;
}

window.vendor.wp.hooks.addFilter('divi.moduleLibrary.moduleAttributes.diviflash.content-carousel-item', 'divi', (attributes, metadata) => {

  attributes.useIcon.settings.decoration.background.item.component.props.visible = iconPickerVisible;
  attributes.useIcon.settings.decoration.icon.items.icon.visible = iconPickerVisible;
  attributes.useIcon.settings.decoration.icon.items.iconAttributes.component.props.visible = iconPickerVisible;
  attributes.useIcon.settings.decoration.sizing.items.alignment.visible = iconPickerVisible;
  attributes.useIcon.settings.decoration.sizing.items.circleIcon.visible = iconPickerVisible;
  attributes.useIcon.settings.decoration.sizing.items.fontSize.visible = iconPickerVisible;

  attributes.useImage.settings.innerContent.items.src.visible = iconPickerInvisible;
  attributes.useImage.settings.innerContent.items.alt.visible = iconPickerInvisible;
  // attributes.useImage.settings.innerContent.items.alt.desktop.value.alt = imageAltTextHas;
  // attributes.useImage.settings.innerContent.items.alt.defaultValue = imageAltTextHas;

  return attributes;
  
});

window.vendor.wp.hooks.addFilter('divi.moduleLibrary.moduleAttributes.diviflash.content-carousel', 'divi', (attributes, metadata) => {

  attributes.addSettingCarousel.settings.innerContent.items.shadowDarkColor.visible = enablesSlidesShadows;
  attributes.addSettingCarousel.settings.innerContent.items.shadowLightColor.visible = enablesSlidesShadows;

  attributes.settingCarousel.settings.innerContent.items.autoplaySpeed.visible = carouselSettingAutoplay;
  attributes.settingCarousel.settings.innerContent.items.pauseOnHover.visible = carouselSettingAutoplay;
  attributes.settingCarousel.settings.innerContent.items.showTitleOnLightbox.visible = carouselSettingLightbox;

  // console.log('arrow next icon _ ', attributes.arrowNextIcon.settings.decoration.icon);
  
  attributes.arrowPrevIcon.settings.decoration.icon.items.arrowPrevIcon.component.props.visible = arrowIconPrev;
  attributes.arrowPrevIcon.settings.decoration.prevIconSize.item.visible = arrowIconPrev;

  attributes.arrowNextIcon.settings.decoration.icon.items.icon.visible = arrowIconNext;
  attributes.arrowNextIcon.settings.decoration.sizing.items.fontSize.visible = arrowIconNext;

  metadata.settings.groups.advancedSettings.component.props.visible = carouselTypeCoverFlow;


  return attributes;
});