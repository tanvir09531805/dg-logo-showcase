import React from "react";

const { CssStyle, StyleContainer, CommonStyle } = window?.divi?.module;

const dfDividerHeightCalc = ({ attrValue, }) => {

  const arg   = attrValue ? attrValue : '5px';
  const value = parseInt(arg) / 2;
  const unit  = arg.replace(parseInt(arg), "")
  const calcValue = value + unit;

	let dividerThickness = '';

	if (calcValue) {
		dividerThickness = `
		top:calc(50% - ${calcValue});`;
	}

	return dividerThickness;
};

const dfDividerAlignment = ({ attrValue, }) => {

	let dividerAli = '';
  if(attrValue === 'right'){
    dividerAli = 'margin: 0 0 0 auto;';
  }else if(attrValue === 'center'){
    dividerAli = 'margin: 0 auto;';
  }else{
    dividerAli = 'margin: 0;';
  }

	return dividerAli;
};
const dfDividerIconImgNot = ({ attrValue, }) => {
	return 'position: relative;';
};

const dfCircleIcon = ({ attrValue, }) => {

	const iconRadius = (attrValue === 'on') ? 'border-radius: 50%;' : '';

	return iconRadius;
};
const dfEnableClipBg = ({ attrValue, }) => {

	const bgClip = (attrValue === 'on') ? '-webkit-background-clip: text;' : '';

	return bgClip;
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
            disabledModuleVisibility: settings?.disabledModuleVisibility,
          },
        },
      })}
      
      
      {/* Background */}
      {elements.style({ attrName: "divider_background", })}
      {elements.style({ attrName: "prefix_background", })}
      {elements.style({ attrName: "infix_background", })}
      {elements.style({ attrName: "suffix_background", })}

      {/* Spacing */}
      {elements.style({ attrName: "heading_spacing", })}
      {elements.style({ attrName: "prefix_spacing", })}
      {elements.style({ attrName: "infix_spacing", })}
      {elements.style({ attrName: "suffix_spacing", })}
      {elements.style({ attrName: "divider_spacing", })}
      {elements.style({ attrName: "divider_container_spacing", })}
      {elements.style({ attrName: "divider_icon_image_spacing", })}
      {elements.style({ attrName: "dual_text_spacing", })}
      
      {
				attrs?.divider_style?.innerContent?.desktop?.value ? (
					<CommonStyle
						selector={`${orderClass} .df-heading-divider .df-divider-line::before`}
						attr={attrs?.divider_style?.innerContent}
						property='border-top-style'
					/>
				) : null
			}
      {
				attrs?.divider_color?.innerContent?.desktop?.value ? (
					<CommonStyle
						selector={`${orderClass} .df-heading-divider .df-divider-line::before`}
						attr={attrs?.divider_color?.innerContent}
						property='border-top-color'
					/>
				) : null
			}
      
      <CommonStyle
				selector={`${orderClass} .df-heading-divider .df-divider-line`}
				attr={attrs?.divider_height?.innerContent}
				declarationFunction={dfDividerHeightCalc}
			/>
      <CommonStyle
        selector={`${orderClass} .df-heading-divider .df-divider-line::before`}
        attr={attrs?.divider_height?.innerContent}
        property="border-top-width"
      />
      <CommonStyle
        selector={`${orderClass} .df-heading-divider .df-divider-line`}
        attr={attrs?.divider_height?.innerContent}
        property="height"
      />
      <CommonStyle
        selector={`${orderClass} .df-heading-divider`}
        attr={attrs?.divider_width?.innerContent}
        property="max-width"
      />
      
      {
				attrs?.divider_alignment?.innerContent?.desktop?.value ? (
					<CommonStyle
						selector={`${orderClass} .df-heading-divider`}
						attr={attrs?.divider_alignment?.innerContent}
            declarationFunction={dfDividerAlignment}
					/>
				) : null
			}
      {
				attrs?.use_divider_icon?.innerContent?.desktop?.value !== 'on' && attrs?.use_divider_image?.innerContent?.desktop?.value !== 'on' ? (
					<CommonStyle
						selector={`${orderClass} .df-heading-divider::before`}
						attr={attrs?.use_divider_icon?.innerContent}
            declarationFunction={dfDividerIconImgNot}
					/>
				) : null
			}
      <CommonStyle
				selector={`${orderClass} .df-heading-divider .et-pb-icon`}
				attr={attrs?.use_divider_icon_circle?.innerContent}
				declarationFunction={dfCircleIcon}
			/>
      <CommonStyle
				selector={`${orderClass} .df-heading-divider img`}
				attr={attrs?.use_divider_image_circle?.innerContent}
				declarationFunction={dfCircleIcon}
			/>

      <CommonStyle
        selector={`${orderClass} .df-heading-divider .df-divider-line:before`}
        attr={attrs?.divider_border_radius?.innerContent}
        property="border-radius"
      />
      <CommonStyle
        selector={`${orderClass} .df-heading-divider .df-divider-line`}
        attr={attrs?.divider_border_radius?.innerContent}
        property="border-radius"
      />
      <CommonStyle
        selector={`${orderClass} .df-heading-divider .et-pb-icon`}
        attr={attrs?.dvr_icon_font_size?.innerContent}
        property="font-size"
      />
      <CommonStyle
        selector={`${orderClass} .df-heading-divider .et-pb-icon`}
        attr={attrs?.divider_icon_bgcolor?.innerContent}
        property="background-color"
      />
      <CommonStyle
        selector={`${orderClass} .df-heading-divider img.divider-image`}
        attr={attrs?.divider_image_bgcolor?.innerContent}
        property="background-color"
      />
      {
				attrs?.divider_icon_alignment?.innerContent?.desktop?.value && attrs?.use_divider_icon?.innerContent?.desktop?.value === 'on' ? (
					<CommonStyle
            selector={`${orderClass} .df-heading-divider`}
            attr={attrs?.divider_icon_alignment?.innerContent}
            property="text-align"
          />
				) : null
			}
      <CommonStyle
        selector={`${orderClass} .df-heading-divider img`}
        attr={attrs?.divider_image_width?.innerContent}
        property="max-width"
      />
      {
				attrs?.divider_image_alignment?.innerContent?.desktop?.value && attrs?.use_divider_image?.innerContent?.desktop?.value === 'on' ? (
					<CommonStyle
            selector={`${orderClass} .df-heading-divider`}
            attr={attrs?.divider_image_alignment?.innerContent}
            property="text-align"
          />
				) : null
			}
      

      {elements.style({
        attrName: "t_dual",
      })}
      <CommonStyle
        selector={`${orderClass} .df-heading .prefix`}
        attr={attrs?.title_prefix_block?.innerContent}
        property="display"
      />
      <CommonStyle
        selector={`${orderClass} .df-heading .infix`}
        attr={attrs?.title_infix_block?.innerContent}
        property="display"
      />
      <CommonStyle
        selector={`${orderClass} .df-heading .suffix`}
        attr={attrs?.title_suffix_block?.innerContent}
        property="display"
      />

      <CommonStyle
        selector={`${orderClass} .df-heading .prefix`}
        attr={attrs?.prefix_maxwidth?.innerContent}
        property="max-width"
      />
      <CommonStyle
        selector={`${orderClass} .df-heading .infix`}
        attr={attrs?.infix_maxwidth?.innerContent}
        property="max-width"
      />
      <CommonStyle
        selector={`${orderClass} .df-heading .suffix`}
        attr={attrs?.suffix_maxwidth?.innerContent}
        property="max-width"
      />
    
      {
				attrs?.df_prefix_enable_clip?.innerContent?.desktop?.value === 'on' ? (
        <>
					<CommonStyle
            selector={`${orderClass} .df-heading .prefix`}
            attr={attrs?.df_prefix_enable_bg_clip?.innerContent}
				    declarationFunction={dfEnableClipBg}
          />
					<CommonStyle
            selector={`${orderClass} .df-heading .prefix`}
            attr={attrs?.df_prefix_fill_color?.innerContent}
            property="-webkit-text-fill-color"
          />
					<CommonStyle
            selector={`${orderClass} .df-heading .prefix`}
            attr={attrs?.df_prefix_stroke_color?.innerContent}
            property="-webkit-text-stroke-color"
          />
					<CommonStyle
            selector={`${orderClass} .df-heading .prefix`}
            attr={attrs?.df_prefix_stroke_width?.innerContent}
            property="-webkit-text-stroke-width"
          />
        </>
        ) : null
			}
      {
				attrs?.df_infix_enable_clip?.innerContent?.desktop?.value === 'on' ? (
        <>
					<CommonStyle
            selector={`${orderClass} .df-heading .infix`}
            attr={attrs?.df_infix_enable_bg_clip?.innerContent}
				    declarationFunction={dfEnableClipBg}
          />
					<CommonStyle
            selector={`${orderClass} .df-heading .infix`}
            attr={attrs?.df_infix_fill_color?.innerContent}
            property="-webkit-text-fill-color"
          />
					<CommonStyle
            selector={`${orderClass} .df-heading .infix`}
            attr={attrs?.df_infix_stroke_color?.innerContent}
            property="-webkit-text-stroke-color"
          />
					<CommonStyle
            selector={`${orderClass} .df-heading .infix`}
            attr={attrs?.df_infix_stroke_width?.innerContent}
            property="-webkit-text-stroke-width"
          />
        </>
        ) : null
			}
      {
				attrs?.df_suffix_enable_clip?.innerContent?.desktop?.value === 'on' ? (
        <>
					<CommonStyle
            selector={`${orderClass} .df-heading .suffix`}
            attr={attrs?.df_suffix_enable_bg_clip?.innerContent}
				    declarationFunction={dfEnableClipBg}
          />
					<CommonStyle
            selector={`${orderClass} .df-heading .suffix`}
            attr={attrs?.df_suffix_fill_color?.innerContent}
            property="-webkit-text-fill-color"
          />
					<CommonStyle
            selector={`${orderClass} .df-heading .suffix`}
            attr={attrs?.df_suffix_stroke_color?.innerContent}
            property="-webkit-text-stroke-color"
          />
					<CommonStyle
            selector={`${orderClass} .df-heading .suffix`}
            attr={attrs?.df_suffix_stroke_width?.innerContent}
            property="-webkit-text-stroke-width"
          />
        </>
        ) : null
			} 
    
      {/* Font */}
      {elements.style({ attrName: "title", })}
      {elements.style({ attrName: "t_prefix", })}
      {elements.style({ attrName: "t_infix", })}
      {elements.style({ attrName: "t_suffix", })}

      {/* Border */}
      {elements.style({ attrName: "prefix_border", })}
      {elements.style({ attrName: "infix_border", })}
      {elements.style({ attrName: "suffix_border", })}

      {/* BoxShadow */}
      {elements.style({ attrName: "prefix", })}
      {elements.style({ attrName: "infix", })}
      {elements.style({ attrName: "suffix", })}


      {/* Divider icon style. */}
      {elements.style({
        attrName: "divider_icon",
      })}


    </StyleContainer>
  );
};
