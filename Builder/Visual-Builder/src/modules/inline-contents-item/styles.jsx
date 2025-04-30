// External dependencies.
import React from 'react';

// Divi dependencies.
import {
	StyleContainer,
	CommonStyle,
	CssStyle
} from '@divi/module';

const icon_style_declaration = ( props ) => {
	const { attrValue } = props;
	const declarations = new StyleDeclarations( {
		returnType: 'string',
		important: {
			'font-family': true,
			'font-weight': true
		},
	} );

	const fontIcon = processFontIcon( attrValue );

	if ( fontIcon ) {
		const fontFamily = isFaIcon( attrValue ) ? 'FontAwesome' : 'ETmodules';
		declarations.add( 'font-family', `"${fontFamily}"` );
	}

	if ( attrValue.weight ) {
		declarations.add( 'font-weight', attrValue.weight );
	}

	return declarations.value;
}

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

	const content_type = attrs?.content_main?.innerContent?.content_type?.desktop?.value ?? "Text";

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

			{/* Text */}
			{ elements.style( { attrName: 'content_text', } ) }

			{/* Icon */}
			{
				elements.style( {
					attrName: 'content_icon',
				} )
			}
			{
				"Icon" === content_type &&
				<CommonStyle
					attr={attrs?.imageSettings?.innerContent?.fontIcon ?? {}}
					selector={`#difl-inline-contents-container ${orderClass}.difl_inline_contents_item.difl_inline_content_icon`}
					declarationFunction={icon_style_declaration}
				/>
			}
			{/* Image */}
			<CommonStyle
				selector={`#difl-inline-contents-container ${orderClass}.difl_inline_contents_item .difl_inline_content_image`}
				attr={attrs?.content_media?.decoration?.media_size ?? {}}
				property="width"
			/>

			<CssStyle
				selector={orderClass}
				attr={attrs.css}
			/>
		</StyleContainer>
	);
};