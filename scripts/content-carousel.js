
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

// imageIcon.innerContent
// const useIcon = attrs?.imageIcon?.innerContent?.desktop?.value?.useIcon;

window.vendor.wp.hooks.addFilter('divi.moduleLibrary.moduleAttributes.diviflash.content-carousel-item', 'divi', (attributes, metadata) => {
  attributes.useIcon = {
    type:     'object',
    selector: '{{selector}} .df_cci_image_container .et-pb-icon',
    settings: {
      innerContent: {
        groupType: 'group-items',
        items:     {
          icon: {
            groupSlug:   'contentImageIcon',
            attrName:    'icon.innerContent',
            subName:     'icon',
            label:       'Icon (Icon Picker)',
            description: 'Choose an icon to display.',
            priority:    20,
            render:      true,
            visible:     iconPickerVisible,
            features:    {
              sticky: false,
              preset: 'content',
            },
            component: {
              type: 'field',
              name: 'divi/icon-picker'
            },
          },
          
          iconColor: {
            groupSlug:   'contentImageIcon',
            attrName:    'iconColor.innerContent',
            subName:     'iconColor',
            label:       'Icon Color (Color Picker)',
            description: 'Choose a color for the icon.',
            priority:    20,
            render:      true,
            visible:     iconPickerVisible,
            features:    {
              dynamicContent: {
                  type: "text"
              },
              // preset: [ "html" ],
              responsive: false,
              hover: false,
              sticky: false,
            },
            component: {
              type: 'field',
              name: 'divi/color-picker',
            },
          },
          iconSize: {
            groupSlug:   'contentImageIcon',
            attrName:    'iconSize.innerContent',
            subName:     'iconSize',
            label:       'Icon Font Size (iconSize)',
            description: 'Controls the size of the icon by increasing or decreasing the font size.',
            priority:    20,
            render:      true,
            visible:     iconPickerVisible,
            features:    {
              responsive: true,
              hover: false,
              sticky: false,
            },
            component: {
              type: 'field',
              name: 'divi/range',
              props: {
                min: 1,
                max: 200,
                step: 1,
                unit: 'px',
              },
            },
          },
          iconAlign: {
            groupSlug:   'contentImageIcon',
            attrName:    'iconAlign.innerContent',
            subName:     'iconAlign',
            label:       'Icon Alignment (iconAlign)',
            description: 'Here you can define the Icon alignment.',
            priority:    20,
            render:      true,
            visible:     iconPickerVisible,
            features:    {
              responsive: true,
              hover: false,
              sticky: false,
            },
            component: {
              type: 'field',
              name: 'divi/button-options',
              props: {
                options: {
                  left: {
                    icon: "divi/align-left"
                  },
                  center: {
                    icon: "divi/align-center"
                  },
                  right: {
                    icon: "divi/align-right"
                  }
                }
              },
            },
          },
          iconBgColor: {
            groupSlug:   'contentImageIcon',
            attrName:    'iconBgColor.innerContent',
            subName:     'iconBgColor',
            label:       'Icon Background (Icon Bg)',
            description: 'Choose a color for the icon background.',
            priority:    20,
            render:      true,
            visible:     iconPickerVisible,
            features:    {
              dynamicContent: {
                  type: "text"
              },
              // preset: [ "html" ],
              responsive: false,
              hover: false,
              sticky: false,
            },
            component: {
              type: 'field',
              name: 'divi/color-picker',
            },
          },
          circleIcon: {
            groupSlug:   'contentImageIcon',
            attrName:    'circleIcon.innerContent',
            subName:     'circleIcon',
            label:       'Circle Icon (Icon Circle)',
            description: 'Choose whether or not the icon should be displayed in a circle.',
            priority:    30,
            render:      true,
            visible:     iconPickerVisible,
            features:    {
              hover:      false,
              sticky:     false,
              responsive: false,
              preset:     'content',
            },
            component: {
              type: 'field',
              name: 'divi/toggle',
            },
          },
          
        },
      },
      // ... `advanced` property is omitted for brevity.
      // ... existing code from the previous example: "Adding Custom Option Field to New Custom
      // Options Group on Module".
    },
  };

  
  // let hookImage = attrs?.useImage?.innerContent?.items?.src?.desktop?.value;
  attributes.useImage.settings.innerContent.items.src.visible = iconPickerInvisible;
  attributes.useImage.settings.innerContent.items.alt.visible = iconPickerInvisible;
  // attributes.useImage.settings.innerContent.items.alt.desktop.value.alt = imageAltTextHas;
  // attributes.useImage.settings.innerContent.items.alt.defaultValue = imageAltTextHas;
  // console.log('attributes img alt --- ', attributes.useImage.settings.innerContent.items.alt);

  console.log(' Use icon ===---', attributes.useIcon.settings);
  console.log(' Use Image ==-- ', attributes.useImage.settings);


  return attributes;
});

window.vendor.wp.hooks.addFilter('divi.moduleLibrary.moduleAttributes.diviflash.content-carousel', 'divi', (attributes, metadata) => {

  attributes.addSettingCarousel.settings.innerContent.items.shadowDarkColor.visible = enablesSlidesShadows;
  attributes.addSettingCarousel.settings.innerContent.items.shadowLightColor.visible = enablesSlidesShadows;

  attributes.settingCarousel.settings.innerContent.items.autoplaySpeed.visible = carouselSettingAutoplay;
  attributes.settingCarousel.settings.innerContent.items.pauseOnHover.visible = carouselSettingAutoplay;
  attributes.settingCarousel.settings.innerContent.items.showTitleOnLightbox.visible = carouselSettingLightbox;

  metadata.settings.groups.advancedSettings.component.props.visible = carouselTypeCoverFlow;

  // console.log('attributes Advanced Carousel setting', attributes.addSettingCarousel);
  return attributes;
});