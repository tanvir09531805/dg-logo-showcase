// External dependencies.
import React from 'react';

// Divi dependencies.
import {
	StyleContainer,
	CommonStyle,
	CssStyle
} from '@divi/module';

export const Styles = ( props ) => {
	const {
		attrs = {},
		elements,
		settings = {},
		orderClass,
		mode,
		state,
		noStyleTag,
	} = props;


	return (
		<StyleContainer
			mode={mode}
			state={state}
			noStyleTag={noStyleTag}
		>
			{/* Module */}
			{elements.style( {
				attrName: 'module',
				styleProps: {
					disabledOn: {
						disabledModuleVisibility: settings.disabledModuleVisibility,
					},
				},
			} )}

			{/* Content */}
			<CommonStyle
				selector={`${orderClass} .difl_inline_contents_container`}
				attr={attrs?.content_main?.decoration?.column_gap ?? {}}
				property="column-gap"
			/>
			<CommonStyle
				selector={`${orderClass} .difl_inline_contents_container`}
				attr={attrs?.content_main?.decoration?.row_gap ?? {}}
				property="row-gap"
			/>

			{/* Alignment */}
			<CommonStyle
				selector={`${orderClass} .difl_inline_contents_container`}
				attr={attrs?.alignment?.decoration?.content_alignment ?? {}}
				property="justify-content"
			/>
			<CommonStyle
				selector={`${orderClass} .difl_inline_contents_container`}
				attr={attrs?.alignment?.decoration?.items_position ?? {}}
				property="align-items"
			/>

			{/* Text */}
			{
				elements.style( {
					attrName: 'design_child_text',
				} )
			}
			<CommonStyle
				selector={`${orderClass} .difl_inline_contents_container .difl_inline_contents_item.difl_inline_content_text`}
				attr={attrs?.design_child_text?.decoration?.text_bg_color ?? {}}
				property="background-color"
			/>

			{/* Icon */}
			{
				elements.style( {
					attrName: 'design_child_icon',
				} )
			}
			<CommonStyle
				selector={`${orderClass} .difl_inline_contents_container .difl_inline_contents_item.difl_inline_content_icon`}
				attr={attrs?.design_child_icon?.decoration?.icon_bg_color ?? {}}
				property="background-color"
			/>

			{/* Image */}
			{
				elements.style( {
					attrName: 'design_child_media',
				} )
			}
			<CommonStyle
				selector={`${orderClass} .difl_inline_contents_container .difl_inline_contents_item:has( .difl_inline_content_image )`}
				attr={attrs?.design_child_media?.decoration?.media_bg_color ?? {}}
				property="background-color"
			/>
			<CommonStyle
				selector={`${orderClass} .difl_inline_contents_container .difl_inline_contents_item .difl_inline_content_image`}
				selectorFunction={( props ) => {
					if ( "hover" === props.state ) {
						return `${orderClass} .difl_inline_contents_container .difl_inline_contents_item:hover .difl_inline_content_image`
					}
					return props.selector;
				}}
				attr={attrs?.design_child_media?.decoration?.media_size ?? {}}
				property="width"
			/>

			<CssStyle
				selector={orderClass}
				attr={attrs.css}
			/>
		</StyleContainer>
	);
};