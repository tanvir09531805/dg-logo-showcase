// External Dependencies.
import React from 'react';

// Divi Dependencies.
import {
	ModuleContainer,
	ElementComponents,
	ChildModulesContainer
} from '@divi/module';
import {
	getAttrByMode,
} from '@divi/module-utils';


import { ScriptData } from "./script";
// import { Classnames } from "./classnames";
import { Styles } from "./styles";
import { processFontIcon } from "@divi/icon-library";

import { Empty } from '../../../components/empty'


export const Edit = ( props ) => {
	const {
		attrs,
		id,
		name,
		elements,
		childrenIds
	} = props;

	const processHeader = (attrs) => {
		let headerOutput = '';
		const enable_header = getAttrByMode(attrs?.settings?.innerContent?.enable_header) ?? "off";
		if ("on" === enable_header) {
			const headerTitle = attrs?.header_title?.innerContent?.desktop?.value ?? null;
			const headerSubTitle = attrs?.header_sub_title?.innerContent?.desktop?.value ?? null;

			let headerContent = '';
			if (headerTitle || headerSubTitle) {
				headerContent = (
					<div className="difl_social_share_header_content">
						{headerTitle && <span className="difl_social_share_header_title">{headerTitle}</span>}
						{headerSubTitle && <span className="difl_social_share_header_sub_title">{headerSubTitle}</span>}
					</div>
				);
			}

			let headerIcon = attrs?.header?.innerContent?.desktop?.value?.header_icon ?? null;
			if(headerIcon){
				const ItemIcon = processFontIcon( headerIcon ?? [] );
				headerIcon =  <span className='et-pb-icon difl_social_share_header_icon'>{ItemIcon}</span>;
			}

			headerOutput = (
				<div id="difl-social-share-header" className="difl_social_share_header">
					<div id="difl-social-share-header-container" className="difl_social_share_header_container">
						{headerIcon}
						{headerContent}
					</div>
				</div>
			);
		}

		return headerOutput;
	}

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
			{processHeader(attrs)}
			<div id="difl-social-share-container" className="difl_social_share_container">
				{childrenIds.length !== 0 ?
					<ChildModulesContainer ids={childrenIds}/>
					:
					<Empty message="Add Social Share Item" />
				}
			</div>
		</ModuleContainer>
	);
}