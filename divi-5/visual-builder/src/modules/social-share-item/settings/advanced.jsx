// External dependencies.
import React from 'react';

// Divi dependencies.
import {
	AttributesGroup,
	CssGroup,
	IdClassesGroup,
	PositionSettingsGroup,
	ScrollSettingsGroup,
	TransitionGroup,
	VisibilitySettingsGroup,
} from '@divi/module';

import metadata from '../module.json';

export const Advanced = () => (
	<React.Fragment>
		<IdClassesGroup />
		<AttributesGroup />
		<VisibilitySettingsGroup />
		<TransitionGroup />
		<PositionSettingsGroup />
		<ScrollSettingsGroup />
	</React.Fragment>
);
