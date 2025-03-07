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
        <CssGroup
            mainSelector=".d5_logo_showcase_module"
            cssFields={groupConfiguration?.css?.component?.props?.cssFields || []}
        />
        <VisibilitySettingsGroup />
        <TransitionGroup />
        <PositionSettingsGroup />
        <ScrollSettingsGroup />
      </React.Fragment>
);
