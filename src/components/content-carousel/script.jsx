import React, {
	Fragment,
	useState, 
	useEffect
} from 'react';

import {
  ModuleScriptDataProps,
} from '@divi/module'

export const ScriptData = ({
	elements,
}) => {
	
	return (
	<Fragment>
		{elements.scriptData({
			attrName: 'module',
		})}
	</Fragment>
)};

