// External dependencies.
import React, { ReactElement } from 'react';

// WordPress dependencies.
const { __ } = window?.vendor?.wp?.i18n;

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
	TransformGroup
} = window?.divi?.module;
const { GroupContainer } = window?.divi?.modal;
const {
	ColorPickerContainer,
	RangeContainer,
} = window?.divi?.fieldLibrary;
const { mergeAttrs } = window?.divi?.moduleUtils;

export const Design = ( {
	defaultSettingsAttrs
} ) => (
	<React.Fragment>
		<GroupContainer
			id="designContent"
			title={ __( 'Content', 'divi_flash' ) }
		>
			<FieldContainer
				attrName="icon.advanced.size"
				label={ __( 'Grid Size X', 'divi_flash' ) }
				description={ __( 'Input your value to action title here.', 'divi_flash' ) }
				features={ {
					sticky: false,
				} }
			>
				<RangeContainer/>
			</FieldContainer>
		</GroupContainer>
		<FontGroup/>
		<FontBodyGroup/>
		<SizingGroup/>
		<SpacingGroup/>
		<BorderGroup/>
		<BoxShadowGroup/>
		<FiltersGroup/>
		<TransformGroup/>
		<AnimationGroup/>
	</React.Fragment>
)