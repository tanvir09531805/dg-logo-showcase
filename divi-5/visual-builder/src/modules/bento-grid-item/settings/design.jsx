// External dependencies.
import React from 'react';

// WordPress dependencies.
import { __ } from '@wordpress/i18n';

// Divi dependencies.
const {
	AnimationGroup,
	BorderGroup,
	BoxShadowGroup,
	FieldContainer,
	FiltersGroup,
	FontGroup,
	FontBodyGroup,
	SizingGroup,
	SpacingGroup,
	TextGroup,
	TransformGroup,
	ButtonGroupContainer,
	ButtonIconGroup
} = window?.divi?.module;
const { GroupContainer } = window?.divi?.modal;
const {
	ColorPickerContainer,
	RangeContainer,
	BorderRadiusContainer
} = window?.divi?.fieldLibrary;
const { mergeAttrs } = window?.divi?.moduleUtils;

export const Design = ( {
	                        defaultSettingsAttrs,
	                        parentAttrs,
                        } ) => {

	const defaultIconAttrs = mergeAttrs ( {
		defaultAttrs: defaultSettingsAttrs?.icon?.advanced?.asMutable ( { deep: true } ) ?? {},
		attrs: parentAttrs?.icon?.advanced?.asMutable ( { deep: true } ) ?? {},
	} );

	const defaultTextAttrs = mergeAttrs ( {
		defaultAttrs: defaultSettingsAttrs?.module?.advanced?.asMutable ( { deep: true } )?.text,
		attrs: parentAttrs?.module?.advanced?.asMutable ( { deep: true } )?.text,
	} );

	const defaultTitleFontAttrs = mergeAttrs ( {
		defaultAttrs: defaultSettingsAttrs?.title?.decoration?.font?.asMutable ( { deep: true } ) ?? {},
		attrs: parentAttrs?.title?.decoration?.font?.asMutable ( { deep: true } ) ?? {},
	} );

	const defaultBodyFontAttrs = mergeAttrs ( {
		defaultAttrs: defaultSettingsAttrs?.content?.decoration?.bodyFont?.asMutable ( { deep: true } ) ?? {},
		attrs: parentAttrs?.content?.decoration?.bodyFont?.asMutable ( { deep: true } ) ?? {},
	} );

	const defaultProBorderAttrs = mergeAttrs ( {
		defaultAttrs: defaultSettingsAttrs?.imageStyle?.advanced?.asMutable ( { deep: true } ) ?? {},
		attrs: parentAttrs?.imageStyle?.advanced?.asMutable ( { deep: true } ) ?? {},
	} );

	return (
		<React.Fragment>
			<GroupContainer id="icon" title={__ ( 'Icon Style', 'divi_flash' )}>
				<FieldContainer
					attrName="icon.advanced.color"
					label={__ ( 'Icon Color', 'divi_flash' )}
					description={__ ( 'Input your value to action title here.', 'divi_flash' )}
					features={{
						sticky: false,
					}}
					defaultAttr={defaultIconAttrs}
				>
					<ColorPickerContainer/>
				</FieldContainer>
				<FieldContainer
					attrName="icon.advanced.size"
					label={__ ( 'Icon Size', 'divi_flash' )}
					description={__ ( 'Input your value to action title here.', 'divi_flash' )}
					features={{
						sticky: false,
					}}
					defaultAttr={defaultIconAttrs}
				>
					<RangeContainer/>
				</FieldContainer>
			</GroupContainer>
			<TextGroup
				defaultGroupAttr={defaultTextAttrs}
				fields={{
					color: {
						render: false,
					},
				}}
			/>
			<FontGroup
				groupLabel={__ ( 'Title Text', 'divi_flash' )}
				attrName="title.decoration.font"
				fieldLabel={__ ( 'Title', 'divi_flash' )}
				defaultGroupAttr={defaultTitleFontAttrs}
			/>
			<FontBodyGroup
				attrName="content.decoration.bodyFont"
				defaultGroupAttr={defaultBodyFontAttrs}
			/>
			<GroupContainer
				id="imageStyle"
				title={__ ( 'Image Style', 'divi_flash' )}
			>
				<BorderGroup
					attrName='imageStyle.decoration.border'
					grouped={ false }
					fieldLabel={ __( 'Image', 'divi_flash' ) }
				/>
				<BoxShadowGroup
					attrName='imageStyle.decoration.boxShadow'
					grouped={ false }
					fieldLabel={ __( 'Image', 'divi_flash' ) }
				/>
			</GroupContainer>
			<ButtonGroupContainer
				attrName='button'
			/>
			<SizingGroup/>
			<SpacingGroup/>
			<BorderGroup/>
			<BoxShadowGroup/>
			<FiltersGroup/>
			<TransformGroup/>
			<AnimationGroup/>
		</React.Fragment>
	);
};