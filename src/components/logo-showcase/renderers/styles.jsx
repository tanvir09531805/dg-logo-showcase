import React from "react";
import { gridLayoutStyleDeclaration } from "./styleDeclarations";
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
	const proImgSelector = `${orderClass} .difl_bento_grid__inner__image .__image`;

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