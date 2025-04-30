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

	const loadMoreUseIcon = attrs?.more_btn?.innerContent?.more_btn_use_icon?.desktop?.value ?? "off";


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
			{ elements.style( { attrName: 'more_btn', } ) }
			<CommonStyle
				attr={attrs?.more_btn?.decoration?.more_btn_align ?? {}}
				selector={`${orderClass} .df_acf_gallery_button_container`}
				property="text-align"
			/>
			<CommonStyle
				attr={attrs?.more_btn?.decoration?.spinner_color ?? {}}
				selector={`${orderClass} .df-acf-gallery-load-more-btn .spinner svg`}
				property="fill"
			/>
			{
				"on" === loadMoreUseIcon &&
				<CommonStyle
					attr={attrs?.more_btn?.innerContent?.more_btn_font_icon ?? {}}
					selector={`${orderClass} .df-acf-gallery-load-more-btn.has_icon .df-acf-gallery-load-more-icon`}
					declarationFunction={icon_style_declaration}
				/>
			}
			{
				"on" === loadMoreUseIcon &&
				<CommonStyle
					attr={attrs?.more_btn?.decoration?.more_btn_icon_size ?? {}}
					selector={`${orderClass} .df-acf-gallery-load-more-btn.has_icon .df-acf-gallery-load-more-icon`}
					property="font-size"
				/>
			}


			{ elements.style( { attrName: 'image', } ) }
			{ elements.style( { attrName: 'caption_style', } ) }
			{ elements.style( { attrName: 'description_style', } ) }
			{ elements.style( { attrName: 'pagination', } ) }
			{ elements.style( { attrName: 'active_pagination', } ) }

			<CssStyle
				selector={orderClass}
				attr={attrs.css}
			/>
		</StyleContainer>
	);
};