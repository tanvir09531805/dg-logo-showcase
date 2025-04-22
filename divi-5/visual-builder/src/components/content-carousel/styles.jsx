import React from "react";
const { CommonStyle, StyleContainer } = window?.divi?.module;
const { StyleDeclarations } = window?.divi?.styleLibrary;


const dfBtnIconSizing = ({ attrValue, }) => {

	const sizeIcon = attrValue?.slice(0, -2); // Remove last 2 characters (e.g., 'px')
	let iconSize = '';

	if (attrValue && parseInt(sizeIcon) > 0) {
		iconSize = `
		font-size: ${attrValue} !important;
		line-height: 0 !important;
		position: relative;`;
	}

	return iconSize;
};

const dfBtnIconSpacing = ({ attrValue, }) => {

	let iconSpacing = '';

	if (attrValue && attrValue.margin) {
		iconSpacing = `
		top: ${attrValue.margin.top};
		right: ${attrValue.margin.right};
		left: ${attrValue.margin.left};
		bottom: ${attrValue.margin.bottom};`;
	}

	return iconSpacing;
};

const dfBtnFullWidth = ({ attrValue, }) => {

	const btnFullWidth = (attrValue === 'on') ? 'width: 100%;' : '';

	return btnFullWidth;
};
const dfCircleIcon = ({ attrValue, }) => {

	const iconRadius = (attrValue === 'on') ? 'border-radius: 50%;' : '';

	return iconRadius;
};
const dfLargeActiveDot = ({ attrValue, }) => {

	const largeDot = (attrValue === 'on') ? 'width: 40px; border-radius: 20px;' : '';

	return largeDot;
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

const dfIconSize = ({ attrValue }) => {
	// Remove the "px" unit and convert to a number
	const sizeIcon = parseInt(attrValue, 10);

	// Check if the size is valid and greater than 0
	const iconSize = sizeIcon > 0
		? `font-size: ${attrValue} !important;
		   line-height: 0 !important;
		   position: relative;`
		: '';

	return iconSize;
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
				attr={attrs?.arrows?.advanced}
				declarationFunction={dfArrowOpacity}
			/>
			<CommonStyle
				selector={`${orderClass} .df_cc_arrows`}
				attr={attrs?.arrows?.advanced ?? {}}
				declarationFunction={dfArrowPosStyles}
			/>
			<CommonStyle
				selector={`${orderClass} .df_cc_arrows`}
				attr={attrs?.arrows?.advanced ?? {}}
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

			<CommonStyle
				selector={`${orderClass} .df_cc_arrows div.swiper-button-next:after`}
				attr={attrs?.arrowNextIcon?.decoration?.sizing ?? {}}
				property='font-size'
			/>
			<CommonStyle
				selector={`${orderClass} .df_cc_arrows div.swiper-button-prev:after`}
				attr={attrs?.arrowPrevIcon?.decoration?.sizing ?? {}}
				property='font-size'
			/>
			{/* // dot navigation color. */}
			<CommonStyle
				selector={`${orderClass} .swiper-pagination span`}
				attr={attrs?.dotNavigation?.decoration?.dotsColor ?? {}}
				property='background'
			/>
			{/* // dot navigation active color. */}
			<CommonStyle
				selector={`${orderClass} .swiper-pagination span.swiper-pagination-bullet-active`}
				attr={attrs?.dotNavigation?.decoration?.activeDotsColor ?? {}}
				property='background'
			/>
			{/* // dot navigation large active dots. */}
			<CommonStyle
				selector={`${orderClass} .swiper-pagination span.swiper-pagination-bullet-active`}
				attr={attrs?.dotNavigation?.decoration?.largeActiveDots ?? {}}
				declarationFunction={dfLargeActiveDot}
			/>
			{/* // dot navigation alignment */}
			<CommonStyle
				selector={`${orderClass} .swiper-pagination`}
				attr={attrs?.dotNavigation?.decoration?.dotsAlignment ?? {}}
				property='text-align'
			/>
			{/* // dot navigation vertical position */}
			<CommonStyle
				selector={`${orderClass} .swiper-pagination`}
				attr={attrs?.dotNavigation?.decoration?.verticalPosition ?? {}}
				property='top'
			/>

			{/* carousel wrapper spacing */}
			{elements.style({
				attrName: 'carouselWPadding',
			})}
			{/* Item wrapper spacing */}
			{elements.style({
				attrName: 'itemWrapperSpacing',
			})}
			{/* Image wrapper spacing */}
			{elements.style({
				attrName: 'imageWrapperSpacing',
			})}
			{/* Image Margin */}
			{elements.style({
				attrName: 'cImageSpacing',
			})}
			{/* Title spacing */}
			{elements.style({
				attrName: 'cTitleSpacing',
			})}
			{/* Subtitle spacing */}
			{elements.style({
				attrName: 'cSubTitleSpacing',
			})}
			{/* Content spacing */}
			{elements.style({
				attrName: 'contentSpacing',
			})}

			{/* Element: Title */}
			{elements.style({
				attrName: 'title',
			})}
			{/* Element: subTitle */}
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

			<CommonStyle
				selector={`${orderClass} .df_cci_button`}
				attr={attrs?.button?.decoration?.fullWidth}
				declarationFunction={dfBtnFullWidth}
			/>
			<CommonStyle
				selector={`${orderClass} .df_cci_button:before, ${orderClass} .df_cci_button:after`}
				attr={attrs?.btnIconSizeMargin?.decoration?.sizing ?? {}}
				declarationFunction={dfBtnIconSizing}
			/>
			<CommonStyle
				selector={`${orderClass} .df_cci_button:before, ${orderClass} .df_cci_button:after`}
				attr={attrs?.btnIconSizeMargin?.decoration?.spacing ?? {}}
				declarationFunction={dfBtnIconSpacing}
			/>

		</StyleContainer>
	);
}