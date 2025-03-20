
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


  attributes.useImage = {
    type:     'object',
    selector: '{{selector}} .df_cci_image_container img',
    elementType: 'imageLink',
    settings: {
      innerContent: {
        groupType: 'group-items',
        items:     {
          image: {
            groupSlug:   'contentImageIcon',
            attrName:    'image.innerContent',
            subName:     'image',
            label:       'Image (Image Upload)',
            description: 'Upload an image to display.',
            render:      true,
            priority:    10,
            visible:     iconPickerInvisible,
            features:    {
              dynamicContent: {
                  type: "image"
              },
              responsive: true,
              hover: true,
              sticky: false,
              preset: "content",
            },
            component: {
              type: 'field',
              name: 'divi/upload',
              props: {
                syncImageData: true
              }
            },
          },
          alt: {
            groupSlug:   'contentImageIcon',
            attrName:    'alt.innerContent',
            subName:     'alt',
            label:       'Alt (Image Alternative Text)',
            description: 'This defines the HTML ALT text. A short description of your image can be placed here.',
            priority:    10,
            render:      true,
            visible:     iconPickerInvisible,
            features:    {
              dynamicContent: {
                  type: "text"
              },
              responsive: false,
              hover: false,
              sticky: false,
              preset: [ "html" ],
            },
            component: {
              type: 'field',
              name: 'divi/text'
            },
          },
        },
      },
      decoration: {
          border: {},
          boxShadow: {}
      }
      // ... `advanced` property is omitted for brevity.
      // ... existing code from the previous example: "Adding Custom Option Field to New Custom
      // Options Group on Module".
    },
    styleProps: {
        selector: "{{selector}} img, {{selector}} .et_overlay",
        border: {
            selector: "{{selector}} .et_pb_image_wrap"
        },
        boxShadow: {
            selector: "{{selector}} .et_pb_image_wrap",
            useOverlay: true
        }
    },
    styleComponentsProps: {
        background: false,
        boxShadow: {
            settings: {
                overlay: true
            }
        }
    }
  };

  console.log('attributes', attributes);

  return attributes;
});