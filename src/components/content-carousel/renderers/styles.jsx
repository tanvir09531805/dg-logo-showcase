import React from "react";
const { CommonStyle, StyleContainer } = window?.divi?.module;
const { StyleDeclarations } = window?.divi?.styleLibrary;

const dfArrowPosStyles = ({ attrValue }) => {
	const arrowPosition = attrValue?.arrowPosition ?? 'middle';
	const options = {
		top: 	`position: relative;
				top: auto;
				left: auto;
				right: auto;
				transform: translateY(0);
				order: 0;`,
		middle: `position: absolute;
				top: 50%;
				left: 0;
				right: 0;
				transform: translateY(-50%);`,
		bottom: `position: relative;
				top: auto;
				left: auto;
				right: auto;
				transform: translateY(0);
				order: 2;`,
	};

	return options[arrowPosition];
};

const dfArrowAlignmentStyles = ({ attrValue }) => {

	const arrowAlign   = attrValue?.arrowAlignment ?? 'space-between';

	const declarations = new StyleDeclarations({
		returnType: 'string',
		important:  false,
	});

	declarations.add('justify-content', arrowAlign);
	
	return declarations.value;
};


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

			<CommonStyle
				selector={`${orderClass} .df_cc_arrows`}
				attr={attrs?.arrows?.advanced?.arrowPosition ?? {}}
				declarationFunction={dfArrowPosStyles}
			/>
			<CommonStyle
				selector={`${orderClass} .df_cc_arrows`}
				attr={attrs?.arrows?.advanced?.arrowAlignment ?? {}}
				declarationFunction={dfArrowAlignmentStyles}
			/>
		</StyleContainer>
	);
}