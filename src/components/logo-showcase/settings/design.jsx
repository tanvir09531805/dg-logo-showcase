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
        <FontGroup
          attrName="title.decoration.font"
          groupLabel="Title Font"
        />
        <FontBodyGroup
          attrName="content.decoration.bodyFont"
          groupLabel="Content Font"
        />
        <SizingGroup />
        <SpacingGroup />
        <BorderGroup />
        <BoxShadowGroup />
        <FiltersGroup />
        <TransformGroup />
        <AnimationGroup />
    </React.Fragment>
)