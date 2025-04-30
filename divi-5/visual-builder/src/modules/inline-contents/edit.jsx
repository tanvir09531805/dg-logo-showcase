import React from 'react';
import {
	ModuleContainer,
	ElementComponents,
	ChildModulesContainer
} from '@divi/module';
import { WarningContainer } from "@divi/field-library";

import { Styles } from './styles';
// import { ScriptData } from './script';

export const Edit = ( props ) => {
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
			// scriptDataComponent={ScriptData}
			tag="div"
		>
			{elements.styleComponents ( {
				attrName: 'module',
			} )}

			<ElementComponents
				attrs={attrs?.module?.decoration ?? {}}
				id={id}
			/>
			{React.createElement(
				attrs?.content_main?.innerContent?.main_wrapper_tag?.desktop?.value ?? "div",
				{
					id: "difl-inline-contents-container",
					className: "difl_inline_contents_container"
				},
				childrenIds.length !== 0
					? <ChildModulesContainer ids={childrenIds} />
					: <WarningContainer name="no-data" value="Add Content" />
			)}
		</ModuleContainer>
	);
}