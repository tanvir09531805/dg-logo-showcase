// External dependencies.
import React from 'react';

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

import { cssFields } from './../renderers/custom-css';

export const Advanced = () => (
	<React.Fragment>
		<IdClassesGroup />
		<CssGroup
		  mainSelector=".difl_advanced_button"
		  cssFields={cssFields}
		/>
		<AttributesGroup />
		<VisibilitySettingsGroup />
		<TransitionGroup />
		<PositionSettingsGroup />
		<ScrollSettingsGroup />
	</React.Fragment>
);
