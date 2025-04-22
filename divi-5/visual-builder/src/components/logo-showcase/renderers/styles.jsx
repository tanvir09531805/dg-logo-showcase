import React from "react";
const { CommonStyle, StyleContainer } = window?.divi?.module;

export const Styles = ( {
	                       attrs,
	                       elements,
	                       settings,
	                       orderClass,
	                       mode,
	                       state,
	                       noStyleTag,
                       } ) => {

	return (
		
		<StyleContainer mode={mode} state={state} noStyleTag={noStyleTag}>
			{/* Element: Module */}
			{elements.style({
			attrName: 'module',
			styleProps: {
				disabledOn: {
				disabledModuleVisibility: settings?.disabledModuleVisibility
				}
			}
			})}
		
			{/* Element: Title */}
			{elements.style({
			attrName: 'title',
			})}
		
			{/* Element: Content */}
			{elements.style({
			attrName: 'content',
			})}
		</StyleContainer>
	);
}