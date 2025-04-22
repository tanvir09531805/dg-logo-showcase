import { useState, useEffect } from '@wordpress/element';
import { Right_Arrow } from '../../icons/icons';
import { storeSettings } from '../../utils/utils';

export const TabList = ( { tabIds, getData, ...props } ) => {
	const [ selectedTab, setSelectedTab ] = useState( tabIds[ 0 ] );
	const handleSelectedTab = ( tab, e ) => {
		setSelectedTab( tab );
	};
	const getIcon = ( tabId ) => getData( tabId, 'icon' );
	const contentHeader = ( tabId ) => getData( tabId, 'label' );
	const renderContent = ( tabId ) => getData( tabId, 'content' );
	const getSettings = async () => {
		let body, error;
		try {
			const response = await fetch( diflSettings.ajaxUrl, {
				method: 'post',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: new URLSearchParams( {
					action: 'difl_get_options',
				} ).toString(),
			} );
			body = await response.json();
			if ( body ) {
				diflSettings = body;
			}
		} catch ( err ) {
			error = await err.json();
		}
	};
	useEffect( () => {
		getSettings();
	}, [ selectedTab ] );
	const TabItem = ( tab ) => (
		<div
			className={
				'header-item ' + ( tab === selectedTab ? 'active' : '' )
			}
			key={ tab }
			id={ tab }
			onClick={ ( e ) => handleSelectedTab( tab, e ) }
		>
			{ getIcon( tab ) }
			<div className="label">{ contentHeader( tab ) }</div>
			{ selectedTab === tab ? (
				<div className="active-arrow">
					<Right_Arrow />
				</div>
			) : (
				''
			) }
		</div>
	);
	return (
		<div className="tablist" { ...props }>
			<header className="tab-header">
				{ tabIds.map( ( tab ) => TabItem( tab ) ) }
			</header>

			<div className="tab-content">{ renderContent( selectedTab ) }</div>
		</div>
	);
};
