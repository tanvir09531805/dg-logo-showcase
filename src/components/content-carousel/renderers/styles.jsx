import React from "react";
const { CommonStyle, StyleContainer } = window?.divi?.module;
const { StyleDeclarations } = window?.divi?.styleLibrary;

const dfCircleIcon = ({ attrValue, }) => {

	const iconRadius = (attrValue === 'on') ? 'border-radius: 50%;' : '';

	return iconRadius;
};

const dfArrowOpacity = ({ attrValue, }) => {

	const declarations = new StyleDeclarations({
		returnType: 'string',
		important: {
			content: true,
		},
	});

	if (attrValue.arrowOpacity) {
		declarations.add('opacity', `${attrValue.arrowOpacity}`);
	}

	return declarations.value;
};

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
			{
				elements.style({
					attrName: 'module',
					styleProps: {
						disabledOn: {
						disabledModuleVisibility: settings?.disabledModuleVisibility
						}
					}
				})
			}
		
			<CommonStyle
				selector={`${orderClass} .df_cci_image_container`}
				attr={attrs?.imgOrder?.innerContent}
				property='order'
			/>

			<CommonStyle
				selector={`${orderClass} .df_cc_title`}
				attr={attrs?.titleOrder?.innerContent}
				property='order'
			/>

			<CommonStyle
				selector={`${orderClass} .df_cc_subtitle`}
				attr={attrs?.subTitleOrder?.innerContent}
				property='order'
			/>

			<CommonStyle
				selector={`${orderClass} .df_cc_content`}
				attr={attrs?.contentOrder?.innerContent}
				property='order'
			/>

			<CommonStyle
				selector={`${orderClass} .df_cci_button_wrapper`}
				attr={attrs?.btnOrder?.innerContent}
				property='order'
			/>

			<CommonStyle
				selector={`${orderClass} .df_cc_arrows div:after`}
				attr={attrs?.arrows?.advanced?.arrowIconColor ?? {}}
				property='color'
			/>
			<CommonStyle
				selector={`${orderClass} .df_cc_arrows div`}
				attr={attrs?.arrows?.advanced?.arrowBgColor ?? {}}
				property='background-color'
			/>
			<CommonStyle
				selector={`${orderClass} .df_cc_arrows>div`}
				attr={attrs?.arrows?.advanced?.circleArrow}
				declarationFunction={dfCircleIcon}
			/>
			<CommonStyle
				selector={`${orderClass} .df_cc_arrows div`}
				attr={attrs?.arrows?.advanced?.arrowOpacity}
				declarationFunction={dfArrowOpacity}
			/>
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
			
			{/* Element: Prev icon style. */}
			{elements.style({
				attrName: 'arrowPrevIcon',
			})}
			{/* Element: Next icon style. */}
			{elements.style({
				attrName: 'arrowNextIcon',
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