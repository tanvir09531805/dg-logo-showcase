import React from "react";
import { StyleDeclarations } from '@divi/style-library';
const {
	isFaIcon,
	escapeFontIcon,
	processFontIcon,
} = window?.divi?.iconLibrary;
const { CommonStyle, StyleContainer } = window?.divi?.module;

const dfCircleIcon = ({ attrValue, }) => {

	const iconRadius = (attrValue.circleIcon === 'on') ? 'border-radius: 50%;' : '';

	return iconRadius;
};
const dfImgForceFullWidth = ({ attrValue, }) => {

	const imgForceFullWidth = (attrValue === 'on') ? 'width: 100%;' : '';

	return imgForceFullWidth;
};

const dfIconAlignment = ({ attrValue, }) => {

	const declarations = new StyleDeclarations({
		returnType: 'string',
		important: {
			content: true,
		},
	});

	if (attrValue.alignment) {
		declarations.add('text-align', `${attrValue.alignment}`);
	}

	return declarations.value;
};

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
	const iconAliSelect = `${orderClass} .df_cci_image_container`;

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
			{/* Element: icon style */}
			{elements.style({
				attrName: 'useIcon',
			})}
			{/* Image Spacing */}
			{elements.style({
				attrName: 'useImage',
			})}

			{/* ?? parentAttrs?.icon?.innerContent */}
			{/* <CommonStyle
				selector={iconSelector}
				attr={attrs?.useIcon?.decoration?.icon?.desktop?.value}
				declarationFunction={iconFontDeclaration}
			/> */}
			<CommonStyle
				selector={iconSelector}
				attr={attrs?.useIcon?.decoration?.circleIcon}
				declarationFunction={dfCircleIcon}
			/>
			<CommonStyle
				selector={iconAliSelect}
				attr={attrs?.useIcon?.decoration?.alignment}
				declarationFunction={dfIconAlignment}
			/>

			<CommonStyle
				selector={iconSelector}
				attr={attrs?.useIcon?.decoration?.sizing}
				property='font-size'
			/>
			
			<CommonStyle
				selector={`.difl_contentcarousel ${orderClass} .df_cci_image_container`}
				attr={attrs?.imgOrder?.innerContent}
				property='order'
			/>

			<CommonStyle
				selector={`.difl_contentcarousel ${orderClass} .df_cc_title`}
				attr={attrs?.titleOrder?.innerContent}
				property='order'
			/>

			<CommonStyle
				selector={`.difl_contentcarousel ${orderClass} .df_cc_subtitle`}
				attr={attrs?.subTitleOrder?.innerContent}
				property='order'
			/>

			<CommonStyle
				selector={`.difl_contentcarousel ${orderClass} .df_cc_content`}
				attr={attrs?.contentOrder?.innerContent}
				property='order'
			/>

			<CommonStyle
				selector={`.difl_contentcarousel ${orderClass} .df_cci_button_wrapper`}
				attr={attrs?.btnOrder?.innerContent}
				property='order'
			/>
{
	attrs?.useImage?.decoration?.fullWidth?.desktop?.value === 'off' ? (
		<CommonStyle
			selector={`${orderClass} .df_cci_image_container img`}
			attr={attrs?.useImage?.decoration?.maxWidth}
			property='max-width'
		/>
	) : null
}
{
	attrs?.useImage?.decoration?.fullWidth?.desktop?.value === 'off' ? (
		<CommonStyle
			selector={`${orderClass} .df_cci_image_container`}
			attr={attrs?.useImage?.decoration?.imageAlignment}
			property='text-align'
		/>
	) : null
}
			{/* <CommonStyle
				selector={`${orderClass} .df_cci_image_container img`}
				attr={attrs?.useImage?.decoration?.maxWidth}
				property='max-width'
			/>
			<CommonStyle
				selector={`${orderClass} .df_cci_image_container`}
				attr={attrs?.useImage?.decoration?.imageAlignment}
				property='text-align'
			/> */}

			<CommonStyle
				selector={`${orderClass} .df_cci_image_container img`}
				attr={attrs?.useImage?.decoration?.fullWidth}
				declarationFunction={dfImgForceFullWidth}
			/>
			{/* Item Wrapper Spacing */}
			{elements.style({
				attrName: 'cWrapItem',
			})}
			{/* Image Wrapper Spacing */}
			{elements.style({
				attrName: 'cWrapImage',
			})}
			

		</StyleContainer>
	);
}