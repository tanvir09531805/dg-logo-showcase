import { __ } from '@wordpress/i18n';
import {
	Doc_Reverse,
	Feature_Request,
	General as General_Icon,
	MenuCustomization as MenuCustomization_Icon,
	ImportExportIcon,
	Settings as Settings_Icon,
	Help,
	Info as Info_Icon,
} from '../icons/icons';
import { General as General_Settings } from '../components/settings/General';
import { MenuCustomization } from '../components/settings/MenuCustomization';
import { License } from '../components/settings/License';
import { TabList } from '../components/common/TabList';
import { handleLink } from '../utils/utils';
import { ImportExport } from '../components/settings/ImportExport';

export const SettingsHeader = ( { title } ) => {
	return (
		<div className="settings-header">
			<p className="title">{ title }</p>
			<div className="info-wrapper">
				<div className="info">
					<div className="icon">
						<Info_Icon />
					</div>
				</div>
				<div className="links">
					<div className="item help">
						<Help />
						<div
							className="label"
							onClick={ () => handleLink( 'support' ) }
						>
							{ __( 'Need Help?', 'divi_flash' ) }
						</div>
					</div>
					<div className="item docs">
						<Doc_Reverse />
						<div
							className="label"
							onClick={ () => handleLink( 'doc' ) }
						>
							{ __( 'Documentation', 'divi_flash' ) }
						</div>
					</div>
					<div className="item feature-request">
						<Feature_Request />
						<div
							className="label"
							onClick={ () => handleLink( 'feature_request' ) }
						>
							{ __( 'Feature Request', 'divi_flash' ) }
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export const Settings = () => {
	const settings = [
		{
			id: 'general',
			label: __( 'General', 'divi_flash' ),
			icon: <General_Icon />,
			content: <General_Settings />,
		},
		{
			id: 'menu_customization',
			label: __( 'Menu Customization', 'divi_flash' ),
			icon: <MenuCustomization_Icon />,
			content: <MenuCustomization />,
		},
		{
			id: 'export_import',
			label: __( 'Import / Export', 'divi_flash' ),
			icon: <ImportExportIcon />,
			content: <ImportExport />,
		},
	];
	const license = {
		id: 'settings',
		label: __( 'License', 'divi_flash' ),
		icon: <Settings_Icon />,
		content: <License />,
	};

	if ( 'https://www.diviflash.com' === diflSettings.update_uri ) {
		settings.push( license );
	}
	const getTabDetails = ( id, key ) => {
		const tab = settings.find( ( tab ) => tab.id === id );
		return tab[ key ];
	};

	return (
		<>
			<TabList
				className="settings"
				tabIds={ settings.map( ( tab ) => tab.id ) }
				getData={ getTabDetails }
			/>
		</>
	);
};
