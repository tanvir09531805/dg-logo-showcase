// External dependencies.
import React from 'react';

// Divi dependencies.
import {
	CommonStyle,
} from '@divi/module';
import { StyleDeclarations } from '@divi/style-library';
import { isEmpty } from "lodash";

/**
 * Custom Styles.
 *
 * Render custom CSS.
 *
 * @since ??
 *
 * @param {object} props Component props.
 * @param {string} props.selector Selector for the style.
 * @param {string} props.attr Attribute for the style.
 * @param {string} props.property Property for the style.
 * @param {boolean} props.important Optional. Whether to add `!important` to the style or not. Defaults to `false`.
 * @param {boolean} props.asStyle Optional. Whether to return the style as a style or as a string. Defaults to `true`.
 * @param {Function} props.selectorFunction Optional. Selector function for the style.
 * @param {Function} props.declarationFunction Optional. Declaration function for the style.
 * @param {string} props.orderClass Optional. The selector class name.
 * @param {object} props.staticPropertyAndValue Static property and Value object props.
 *
 * @returns {ReactElement}
 */
export const CustomStyles = ( props ) => {
	const {
		selector,
		attr,
		property = "",
		value = "",
		staticPropertyAndValue = {},
		important = false
	} = props;
	// console.log("CustomStyles = ", props)

	const customDeclarationFunction = (declaretionProps) => {
		const { attrValue } = declaretionProps
		// console.log("customDeclarationFunction = ", declaretionProps);
		const declarations = new StyleDeclarations( {
			returnType: 'string',
			important: important,
		} );

		if(Object.keys(staticPropertyAndValue).length > 0){
			Object.entries(staticPropertyAndValue).map(([key, value]) => declarations.add(key, value))
		}
		if ( !isEmpty(property) ) {
			const styleValue = ! isEmpty(value) ? value : attrValue ?? "";
			declarations.add(property, `${styleValue}`);
			// console.log(property,styleValue)
		}
		return declarations.value;
	}

	return (
		<CommonStyle
			selector={selector}
			attr={attr}
			declarationFunction={customDeclarationFunction}
			important={ important }
		/>
	);
}
