import React, { useState } from 'react';
import { GroupContainer, GroupTabs } from '@divi/modal';

export const TabList = ( { tabs } ) => {
	const [ activeTab, setActiveTab ] = useState();
	if ( undefined === activeTab ) { setActiveTab( Object.keys( tabs )[ 0 ] ) }
	return (
		<>
			<GroupTabs
				tabs={tabs}
				showLabel={true}
				showIcon={true}
				activeTab={activeTab}
				onClick={( tab ) => {
					const tab_value = tab.target.value || tab.target.parentElement?.value
					// console.log( tab_value );
					setActiveTab( tab_value )
				}}
				onContextMenu={( menu ) => {
					// console.log( "menu", menu )
				}}
			/>
			{
				tabs[ activeTab ]?.component
			}
		</>
	)
}