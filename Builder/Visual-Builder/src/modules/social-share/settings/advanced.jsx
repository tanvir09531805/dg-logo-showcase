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
import { cssFields } from '../renderers/custom-css';

export const Advanced = () => (
	<React.Fragment>
		<IdClassesGroup />
		<CssGroup
			mainSelector=".difl__social_share"
			cssFields={cssFields}
		/>
		<AttributesGroup />
		<VisibilitySettingsGroup />
		<TransitionGroup />
		<PositionSettingsGroup />
		<ScrollSettingsGroup />
	</React.Fragment>
);
