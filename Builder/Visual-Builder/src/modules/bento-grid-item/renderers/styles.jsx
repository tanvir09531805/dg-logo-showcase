// External dependencies.
import React from 'react';

// Divi dependencies.
const {
	StyleContainer,
	StylesProps,
	CssStyle,
	TextStyle,
	CommonStyle,
} = window?.divi?.module;
const { StyleDeclarations } = window?.divi?.styleLibrary;

// Local dependencies.
import { cssFields } from './custom-css';
import { iconFontDeclaration, gridSpanStyleDeclaration } from './declarations';

/**
 * Child Module's style components.
 *
 * @since ??
 */
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
	const iconSelector = `${orderClass} .difl_bento_grid_item__icon.et-pb-icon`;
	const contentContainerSelector = `${orderClass} .difl_bento_grid_item__content-container`;
	const proImgSelector = `${orderClass} .difl_bento_grid_item__image img`;
	const childItem = `${orderClass}`;

	return (
		<StyleContainer mode={mode} state={state} noStyleTag={noStyleTag}>
			{/* Module */}
			{elements.style ( {
				attrName: 'module',
				styleProps: {
					disabledOn: {
						disabledModuleVisibility: settings?.disabledModuleVisibility,
					},
				},
			} )}
			<TextStyle
				selector={contentContainerSelector}
				attr={attrs?.module?.advanced?.text}
			/>
			{/* Custom CSS Tab */}
			<CssStyle
				selector={orderClass}
				attr={attrs.css}
				cssFields={cssFields}
			/>

			{/* Title */}
			{elements.style ( {
				attrName: 'title',
			} )}

			{/* Content */}
			{elements.style ( {
				attrName: 'content',
			} )}

			{/* Button */}
			{elements.style ( {
				attrName: 'button',
			} )}

			{/* Icon */}
			<CommonStyle
				selector={iconSelector}
				attr={attrs?.icon?.innerContent ?? parentAttrs?.icon?.innerContent}
				declarationFunction={iconFontDeclaration}
			/>
			<CommonStyle
				selector={iconSelector}
				attr={attrs?.icon?.advanced?.color ?? parentAttrs?.icon?.advanced?.color}
				property="color"
			/>
			<CommonStyle
				selector={iconSelector}
				attr={attrs?.icon?.advanced?.size ?? parentAttrs?.icon?.advanced?.size}
				property="font-size"
			/>
			{/* Image Size */}
			<CommonStyle
				selector={proImgSelector}
				attr={attrs?.image_size?.decoration?.size ?? {}}
				property="width"
			/>
			<CommonStyle
				selector={proImgSelector}
				attr={attrs?.image_size?.decoration?.size ?? {}}
				property="height"
			/>
			{/* Row/Column Span */}
			{/*<CommonStyle*/}
			{/*	selector={childItem}*/}
			{/*	attr={attrs?.gridLayout?.decoration ?? {}}*/}
			{/*	declarationFunction={gridSpanStyleDeclaration}*/}
			{/*/>*/}
			<CommonStyle
				selector={childItem}
				attr={attrs?.gridLayoutField?.decoration ?? {}}
				declarationFunction={gridSpanStyleDeclaration}
			/>

			{/* Image Style */}
			{elements.style ( {
				attrName: 'imageStyle',
			}
			)}

		</StyleContainer>
	);
};
