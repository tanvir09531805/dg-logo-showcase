import React from "react";
import { StyleDeclarations } from '@divi/style-library';
const {
	isFaIcon,
	escapeFontIcon,
	processFontIcon,
} = window?.divi?.iconLibrary;
const { CommonStyle, StyleContainer } = window?.divi?.module;
const iconFontDeclaration = ({ attrValue, }) => {

	const declarations = new StyleDeclarations({
		returnType: 'string',
		important: {
			'font-family': true,
			content: true,
		},
	});

	const fontIcon = processFontIcon(attrValue);

	if (fontIcon) {
		const fontFamily = isFaIcon(attrValue) ? 'FontAwesome' : 'ETmodules';
		declarations.add('content', `'${escapeFontIcon(fontIcon)}'`);
		declarations.add('font-family', `"${fontFamily}"`);
	}
	return declarations.value;
};

export const Styles = ( {
	                       attrs,
						   parentAttrs,
	                       elements,
	                       settings,
	                       orderClass,
	                       mode,
	                       state,
	                       noStyleTag,
                       } ) => {
	

	const iconSelector = `${orderClass} .df_cci_image_container .et-pb-icon`;

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
		
			{/* Element: Sub Title */}
			{elements.style({
				attrName: 'subTitle',
			})}
		
			{/* Element: Content */}
			{elements.style({
				attrName: 'content',
			})}

			{/* Element: button */}
			{elements.style({
				attrName: 'button',
			})}
{/* ?? parentAttrs?.icon?.innerContent */}
			<CommonStyle
				selector={iconSelector}
				attr={attrs?.useIcon?.decoration?.icon?.desktop?.value}
				declarationFunction={iconFontDeclaration}
			/>

		</StyleContainer>
	);
}