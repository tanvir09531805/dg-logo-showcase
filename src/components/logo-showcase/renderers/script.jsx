import React, {
	Fragment,
	useState, 
	useEffect
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
}) => {
	
    //   console.log('useState 555:', useState);

    //   const [imageUrls, setImageUrls] = useState('');
	// console.log('Tanvir Hasan', useState);
	
	return (
	<Fragment>
		{elements.scriptData({
			attrName: 'module',
		})}
	</Fragment>
)};

