// External dependencies.
import React, { ReactElement } from 'react';

// Divi dependencies.
const {
	AttributesGroup,
	CssGroup,
	IdClassesGroup,
	PositionSettingsGroup,
	ScrollSettingsGroup,
	TransitionGroup,
	VisibilitySettingsGroup,
} = window?.divi?.module;
// import { cssFields } from './custom-css';

export const Advanced = () => (
	<React.Fragment>
		<IdClassesGroup />
		{/*<CssGroup*/}
		{/*  mainSelector=".example_d4_module"*/}
		{/*  cssFields={cssFields}*/}
		{/*/>*/}
		<AttributesGroup />
		<VisibilitySettingsGroup />
		<TransitionGroup />
		<PositionSettingsGroup />
		<ScrollSettingsGroup />
	</React.Fragment>
);
