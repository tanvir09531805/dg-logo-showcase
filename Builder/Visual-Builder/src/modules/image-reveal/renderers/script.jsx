import React, {
	Fragment
} from 'react';

import {
	ModuleScriptDataProps,
} from '@divi/module';


/**
 * Parent module's script data component.
 *
 * @since ??
 *
 * @param {ModuleScriptDataProps<ParentModuleAttrs>} props React component props.
 *
 * @returns {ReactElement}
 */
export const ScriptData = ( props ) => {
	const { elements } = props;
	return (
		<Fragment>
			{elements.scriptData({
				attrName: 'module',
			})}
		</Fragment>
	);
};

