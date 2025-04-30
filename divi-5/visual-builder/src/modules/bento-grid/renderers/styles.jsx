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
		<StyleContainer mode={ mode } state={ state } noStyleTag={ noStyleTag }>
			{ elements.style( {
				attrName: 'module',
				styleProps: {
					disabledOn: {
						disabledModuleVisibility: settings?.disabledModuleVisibility,
					},
				},
			} ) }
			<CommonStyle
				selector={proImgSelector}
				attr={attrs?.profile?.decoration?.size ?? {}}
				property="width"
			/>
			<CommonStyle
				selector={proImgSelector}
				attr={attrs?.profile?.decoration?.size ?? {}}
				property="height"
			/>
			{/* Row/Column Span */}
			{/*<CommonStyle*/}
			{/*	selector={`${orderClass} .difl_bento_grid__inner`}*/}
			{/*	attr={attrs?.gridLayout?.decoration ?? {}}*/}
			{/*	declarationFunction={gridLayoutStyleDeclaration}*/}
			{/*/>*/}
			<CommonStyle
				selector={`${orderClass} .difl_bento_grid__inner`}
				attr={attrs?.gridLayoutField?.decoration ?? {}}
				declarationFunction={gridLayoutStyleDeclaration}
			/>
			{/* Description */}
			{/*{elements.style({*/}
			{/*  attrName:   'profile',*/}
			{/*  styleProps: {*/}
			{/*    advancedStyles: [*/}
			{/*      {*/}
			{/*        componentName: 'divi/css',*/}
			{/*        props:         {*/}
			{/*          selector:  `${orderClass} .difl_bento_grid_gallery__inner__image .__image`,*/}
			{/*          attr:      attrs?.profile?.innerContent?.desktop?.value?.profileSize,*/}
			{/*          property:  'width',*/}
			{/*          important: true,*/}
			{/*        },*/}
			{/*      },*/}
			{/*    ],*/}
			{/*  },*/}
			{/*})}*/}
		</StyleContainer>
	);
}