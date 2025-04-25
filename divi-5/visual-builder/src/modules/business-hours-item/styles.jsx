import React from "react";
const { CssStyle, StyleContainer, CommonStyle } = window?.divi?.module;

export const ModuleStyles = ({
  attrs,
  elements,
  settings,
  orderClass,
  mode,
  state,
  noStyleTag,
}) => {

  return (
    <StyleContainer mode={mode} state={state} noStyleTag={noStyleTag}>
      {/* Element: Module */}
      {elements.style({
        attrName: "module",
        styleProps: {
          disabledOn: {
            disabledModuleVisibility:
              settings?.disabledModuleVisibility,
          },
        },
      })}
      
      {/* Font */}
      {elements.style({
        attrName: "time_div",
      })}
      
      {/* boxShadow */}
      {elements.style({
        attrName: "item",
      })}
      {elements.style({
        attrName: "day",
      })}

      {/* Border */}
      {elements.style({
        attrName: "item_border",
      })}
      {elements.style({
        attrName: "day_border",
      })}
      {elements.style({
        attrName: "time_border",
      })}
      {elements.style({
        attrName: "start_time_border",
      })}
      {elements.style({
        attrName: "end_time_border",
      })}
      {elements.style({
        attrName: "time_separetor_border",
      })}

      {/* Background day */}
      {elements.style({
        attrName: "day_background_color",
      })}
      {elements.style({
        attrName: "time_background_color",
      })}

      <CommonStyle
        selector={`.difl_businesshours ${orderClass} .df_bh_start_time`}
        attr={attrs?.start_time_background_color?.innerContent}
        property='background-color'
      />
      <CommonStyle
        selector={`.difl_businesshours ${orderClass} .df_bh_end_time`}
        attr={attrs?.end_time_background_color?.innerContent}
        property='background-color'
      />
      <CommonStyle
        selector={`.difl_businesshours ${orderClass} .df_bh_time_separetor`}
        attr={attrs?.time_separetor_background_color?.innerContent}
        property='background-color'
      />

      {/* Spacing */}
      {elements.style({
        attrName: "item_wrapper_spacing",
      })}
      {elements.style({
        attrName: "item_padding",
      })}
      {elements.style({
        attrName: "day_spacing",
      })}
      {elements.style({
        attrName: "time_spacing",
      })}
      {elements.style({
        attrName: "start_time_spacing",
      })}
      {elements.style({
        attrName: "end_time_spacing",
      })}
      {elements.style({
        attrName: "time_separetor_spacing",
      })}
      {elements.style({
        attrName: "day_time_separetor_margin",
      })}
      
      <CommonStyle
        selector={`.difl_businesshours ${orderClass} .df_bh_day_time_separator hr`}
        attr={attrs?.day_time_separator_color?.innerContent}
        property='border-color'
      />
      <CommonStyle
        selector={`.difl_businesshours ${orderClass} .df_bh_day_time_separator hr`}
        attr={attrs?.day_time_separator_hight?.innerContent}
        property='border-bottom-width'
      />
      <CommonStyle
        selector={`.difl_businesshours .difl_businesshoursitem${orderClass} .df_bh_day_time_separator hr`}
        attr={attrs?.day_time_separator_style?.innerContent}
        property='border-style'
      />
    </StyleContainer>
  );
};
