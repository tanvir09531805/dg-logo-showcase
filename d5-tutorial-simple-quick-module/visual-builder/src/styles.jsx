/**
 * Simple Quick Module's style components.
 */
const ModuleStyles = ({
    attrs,
    elements,
    settings,
    orderClass,
    mode,
    state,
    noStyleTag,
  }) => (
    <StyleContainer mode={mode} state={state} noStyleTag={noStyleTag}>
      {/* Element: Module */}
      {elements.style({
        attrName:   'module',
        styleProps: {
          disabledOn: {
            disabledModuleVisibility: settings?.disabledModuleVisibility,
          },
        },
      })}
  
      {/* Element: Title */}
      {elements.style({
        attrName: 'title',
      })}
  
      {/* Element: Content */}
      {elements.style({
        attrName: 'content',
      })}
  
      <CssStyle
        selector={orderClass}
        attr={attrs.css}
        orderClass={orderClass}
        cssFields={elements?.moduleMetadata?.customCssFields}
      />
    </StyleContainer>
  );