import React from "react";

import { cssFields } from "./custom-css";

const { CssStyle, StyleContainer, CommonStyle } = window?.divi?.module;

const dfDayWidthCalc = ({ attrValue, }) => {

	// const sizeIcon = attrValue?.slice(0, -2);
	let timeWidthCal = '';

	if (attrValue) {
		timeWidthCal = `
		max-width: calc(100% - ${attrValue});`;
	}

	return timeWidthCal;
};



/**
 * Module style component for static module
 */
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
      <CssStyle
        selector={orderClass}
        attr={attrs.css}
        cssFields={cssFields}
      />

      <CommonStyle
				selector={`${orderClass} .df_bh_time`}
				attr={attrs?.day_width?.innerContent}
				declarationFunction={dfDayWidthCalc}
			/>

      <CommonStyle
        selector={`${orderClass} .df_bh_day`}
        attr={attrs?.day_width?.innerContent}
        property="max-width"
      />

      {/* boxShadow */}
      {elements.style({
        attrName: "day",
      })}
      {elements.style({
        attrName: "time",
      })}
      {elements.style({
        attrName: "title",
      })}
      {elements.style({
        attrName: "item",
      })}

      {/* Border */}
      {elements.style({
        attrName: "item_border",
      })}
      {elements.style({
        attrName: "title_border",
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

      {/* Font title */}
      {elements.style({
        attrName: "day_name",
      })}
      {elements.style({
        attrName: "time_div",
      })}
      {elements.style({
        attrName: "heading_title_text",
      })}
      {/* Font & boxShadow */}
      {elements.style({
        attrName: "start_time",
      })}
      {elements.style({
        attrName: "end_time",
      })}
      {elements.style({
        attrName: "time_separetor",
      })}

      {/* Background */}
      {elements.style({
        attrName: "df_title_bg",
      })}
      {elements.style({
        attrName: "df_items_bg",
      })}
      {elements.style({
        attrName: "day_background_color",
      })}
      {elements.style({
        attrName: "time_background_color",
      })}

      <CommonStyle
        selector={`${orderClass} .df_bh_start_time`}
        attr={attrs?.start_time_background_color?.innerContent}
        property="background-color"
      />
      <CommonStyle
        selector={`${orderClass} .df_bh_end_time`}
        attr={attrs?.end_time_background_color?.innerContent}
        property="background-color"
      />
      <CommonStyle
        selector={`${orderClass} .df_bh_time_separetor`}
        attr={attrs?.time_separetor_background_color?.innerContent}
        property="background-color"
      />

      {/* Spacing */}
      {elements.style({
        attrName: "title_spacing",
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
        attrName: "main_wrapper_spacing",
      })}
      {elements.style({
        attrName: "item_wrapper_spacing",
      })}
      {elements.style({
        attrName: "title_wrapper_spacing",
      })}
      {elements.style({
        attrName: "day_time_separetor_margin",
      })}

      <CommonStyle
        selector={`${orderClass} .df_bh_day_time_separator hr`}
        attr={attrs?.day_time_separator_color?.innerContent}
        property="border-color"
      />
      <CommonStyle
        selector={`${orderClass} .df_bh_day_time_separator hr`}
        attr={attrs?.day_time_separator_hight?.innerContent}
        property="border-bottom-width"
      />
      <CommonStyle
        selector={`.difl_businesshours${orderClass} .df_bh_day_time_separator hr`}
        attr={attrs?.day_time_separator_style?.innerContent}
        property="border-style"
      />
      
    </StyleContainer>
  );
};
