import React, {
	Fragment
} from 'react';

const {
	ModuleScriptDataProps,
} = window?.divi?.module;


/**
 * Parent module's script data component.
 *
 * @since ??
 *
 * @param {ModuleScriptDataProps<ParentModuleAttrs>} props React component props.
 *
 * @returns {ReactElement}
 */
export const ScriptData = ({
	elements,
}) => (
	<Fragment>
		{elements.scriptData({
			attrName: 'module',
		})}
	</Fragment>
);

