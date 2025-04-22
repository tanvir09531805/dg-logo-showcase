import { SettingsHeader } from '../../pages/settings';
import { __ } from '@wordpress/i18n';
import { DownArrow, UpArrow } from '../../icons/icons';
import { useState } from '@wordpress/element';
import { Button, FormFileUpload } from '@wordpress/components';
import { saveAs } from 'file-saver';
import { storeSettings } from '../../utils/utils';
import { Toaster } from '../common/Toaster';

export const ImportExport = () => {
	const handleExport = async () => {
		const response = await fetch( diflSettings.ajaxUrl, {
			method: 'post',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: new URLSearchParams( {
				action: 'df_export_dashboard_settings',
				_wpnonce: diflSettings.nonce,
			} ).toString(),
		} );
		const responseData = await response.json();
		const fileName = 'df_dashboard_settings.json';
		const file = new Blob( [ responseData.data ], {
			type: 'application/json',
		} );
		saveAs( file, fileName );
	};

	const Export = () => {
		return (
			<div>
				<button onClick={ handleExport }>
					<UpArrow /> Export Settings
				</button>
			</div>
		);
	};
	const Import = () => {
		const [ settings, setSettings ] = useState( '' );
		const [ fileName, setFileName ] = useState( '' );
		const [ message, setMessage ] = useState( '' );
		const handleImport = async ( settings ) => {
			const [ body, headers, error ] = await storeSettings(
				settings,
				'df_import_dashboard_settings'
			);
			if ( body?.success ) {
				setMessage(
					__( 'Settings imported successfully', 'divi_flash' )
				);
				setSettings( '' );
				setFileName( '' );
			}
		};
		return (
			<>
				{ message !== '' && (
					<Toaster
						message={ message }
						messageHandler={ setMessage }
						status="success"
					/>
				) }
				<div>
					<FormFileUpload
						accept="json/*"
						onChange={ ( e ) => {
							const file = e.target.files[ 0 ];
							setFileName( file?.name );
							const reader = new FileReader();
							reader.onload = ( event ) => {
								setSettings( {
									importFile: JSON.parse(
										event.target.result
									),
								} );
							};
							reader.readAsText( file );
						} }
					>
						{ fileName
							? fileName
							: __( 'Choose File', 'divi_flash' ) }
					</FormFileUpload>
					<Button
						disabled={ ! fileName }
						onClick={ () => handleImport( settings?.importFile ) }
					>
						<DownArrow /> Import Settings
					</Button>
				</div>
			</>
		);
	};
	const settings = [
		{
			id: 'export_settings',
			label: __( 'Export Settings', 'divi_flash' ),
			type: 'download',
			help_text: __(
				'Click the button to generate and download the export file',
				'divi_flash'
			),
			component: <Export />,
		},
		{
			id: 'import_settings',
			label: __( 'Import Settings', 'divi_flash' ),
			type: 'upload',
			component: <Import />,
		},
	];
	return (
		<>
			<SettingsHeader title={ __( 'Export / Import', 'divi_flash' ) } />
			{ settings.map( ( setting ) => {
				if (
					setting.hasOwnProperty( 'show_if' ) &&
					! settings.find( ( s ) => s.id === setting.show_if ).value
				)
					return;
				return (
					<div className="settings-content" key={ setting.id }>
						<div className="label">{ setting.label }</div>
						<div className="control">
							<div className="export-import">
								{ setting.component }
							</div>
							<p className="help-text">{ setting.help_text }</p>
						</div>
					</div>
				);
			} ) }
		</>
	);
};
