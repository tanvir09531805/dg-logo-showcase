import React from 'react';
import {
	ModuleContainer,
	ElementComponents,
	ChildModulesContainer
} from '@divi/module';

import { Styles } from './styles';
import { ScriptData } from './script';

export const Edit = ( props ) => {
	console.log("A-S Edit => ",props);
	const {
		attrs,
		id,
		name,
		elements,
		childrenIds
	} = props;

	return (
		<ModuleContainer
			attrs={attrs}
			elements={elements}
			id={id}
			name={name}
			stylesComponent={Styles}
			// classnamesFunction={Classnames}
			scriptDataComponent={ScriptData}
			tag="div"
		>
			{elements.styleComponents ( {
				attrName: 'module',
			} )}

			<ElementComponents
				attrs={attrs?.module?.decoration ?? {}}
				id={id}
			/>
			<div id="difl-avatar-stack-container" className="difl_avatar_stack_container">
				{childrenIds.length !== 0 ?
					<ChildModulesContainer ids={childrenIds}/>
					:
					<h4 className="difl_avatar_stack_empty_content"> Add Stack Item </h4>
				}
			</div>
		</ModuleContainer>
	);
}