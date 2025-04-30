import React from "react";

const { CssStyle, StyleContainer, CommonStyle } = window?.divi?.module;

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

      {/* Element: Content */}
      {elements.style({
        attrName: "settings__content",
      })}
      <CommonStyle
        selector={`${orderClass} .df_text_reveal_main_container`}
        attr={attrs?.settings__reveal_color?.decoration}
        property="--secondary-reveal-color"
      />
    </StyleContainer>
  );
};
