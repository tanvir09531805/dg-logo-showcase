import { __ } from '@wordpress/i18n';
import { useState, useRef, forwardRef, useEffect } from '@wordpress/element';
import { TextControl, Button } from '@wordpress/components';
import { SettingsHeader } from '../../pages/settings';
import { Demo, License_Lock } from '../../icons/icons';
import { storeSettings } from '../../utils/utils';
import { Toaster } from '../common/Toaster';
import { Loading } from '../common/Loading';

const InputField = forwardRef( ( { ...props }, ref ) => {
	const [ className, setClassName ] = useState( '' );

	return (
		<TextControl
			ref={ ref }
			value={ className }
			onChange={ ( value ) => setClassName( value ) }
			{ ...props }
		/>
	);
} );
const InputWrapperField = ( { children } ) => {
	return <>{ children }</>;
};
export const License = () => {
	const [ isActivating, setIsActivating ] = useState( false );
	const [ isDeactivating, setIsDeactivating ] = useState( false );
	const [ message, setMessage ] = useState( '' );
	const [ license, setLicense ] = useState( !! diflSettings.license );
	const [ licenseKey, setlicenseKey ] = useState( '' );
	const [ useFallback, setUseFallback ] = useState( false );
	const [ fallbackParams, setfallbackParams ] = useState( '' );
	const actions = {
		activate: 'difl_license_activate',
		deactivate: 'difl_license_deactivate',
		fallback_update: 'difl_license_handle_fallback',
	};
	const passwordRef = useRef();
	const removeNotice = ()=>{
		document.querySelector( '.notice.difl-license-notice ' ).remove();
	}
	const deactivate = async () => {
		setIsDeactivating( true );
		const [ body, headers, error ] = await storeSettings(
			license,
			actions[ 'deactivate' ]
		);
		if ( body.success ) {
			setLicense( false );
		}
		if ( body.use_fallback ) {
			setfallbackParams( body.fallback_params );
			setUseFallback( true );
		}
		setIsDeactivating( false );
	};

	const activate = async () => {
		setIsActivating( true );
		const [ body, headers, error ] = await storeSettings(
			{
				license: license,
				key: passwordRef.current?.value,
			},
			actions[ 'activate' ]
		);

		if ( body?.success ) {
			setLicense( true );
			removeNotice();
		}
		if ( body.use_fallback ) {
			setfallbackParams( body.fallback_params );
			setUseFallback( true );
		}
		if ( ! body.success ) {
			setMessage( body?.message ?? '' );
		}
		setIsActivating( false );
	};

	const showPassword = () => {
		passwordRef.current.type = 'text';
		setTimeout( () => {
			passwordRef.current.type = 'password';
		}, 3000 );
	};

	const handleFallbackUpdate = async (extra_params) => {
		const [ body, headers, error ] = await storeSettings(
			{
				...fallbackParams,
				...extra_params,
			},
			actions[ 'fallback_update' ]
		);

		if ( 'deactivate_license' === fallbackParams.edd_action ) {
			setLicense( false );
		} else {
			setLicense( true );
			removeNotice();
		}
	};
	const handleUseFallback = async () => {
		let body;
		try {
			const response = await fetch( fallbackParams?.fallback_url, {
				method: 'post',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: new URLSearchParams( {
					edd_action: fallbackParams?.edd_action,
					item_id: fallbackParams?.item_id,
					license:
						licenseKey === ''
							? fallbackParams?.license
							: licenseKey,
					url: fallbackParams?.url,
				} ).toString(),
			} );

			body = await response.json();
			if ( body.success ) {
				setfallbackParams( ( prevParams ) => ( {
					...prevParams,
					status: body.license,
				} ) );
				setUseFallback( false );
				handleFallbackUpdate({status: body.license});
			}
			if (
				! body.success &&
				'deactivate_license' === fallbackParams?.edd_action
			) {
				setUseFallback( false );
				handleFallbackUpdate();
			}
		} catch ( error ) {
			console.log( 'error', error );
		}
	};

	useEffect( () => {
		if ( ! useFallback ) {
			return;
		}

		handleUseFallback();
	}, [ useFallback ] );

	return (
		<>
			{ message !== '' && (
				<Toaster
					message={ message }
					messageHandler={ setMessage }
					status="error"
				/>
			) }
			<SettingsHeader title={ __( 'Settings', 'divi_flash' ) } />
			<div className="settings-content license">
				<div className="heading">
					<License_Lock />
					<p className="title">
						{ __( 'Your License', 'divi_flash' ) }
					</p>
				</div>
				<div className="label">
					<p className="msg">
						{ __(
							'Activate DiviFlash to get professional support and automatic updates from your WordPress dashboard',
							'divi_flash'
						) }
					</p>
				</div>
				<div className="control">
					<div className="label">
						{ __( 'Your key', 'divi_flash' ) }
					</div>
					<div className="action">
						{ license ? (
							<>
								<InputField
									placeholder={
										license ? '#'.repeat( 30 ) : ''
									}
									disabled={ true }
								/>
								<Button className="activated" disabled={ true }>
									{ __( 'Activate' ) }
								</Button>
							</>
						) : (
							<>
								<InputWrapperField>
									<InputField
										type="password"
										ref={ passwordRef }
										value={ licenseKey }
										onChange={ ( value ) =>
											setlicenseKey( value )
										}
										placeholder={ __(
											'Paste your license key here',
											'divi_flash'
										) }
									/>
									<div className="license-icon"></div>
									<div
										className="check-type-icon"
										onClick={ showPassword }
									>
										<Demo />
									</div>
								</InputWrapperField>
								<Button
									onClick={ activate }
									className="activate"
									disabled={ licenseKey === '' }
								>
									{ isActivating ? (
										<Loading />
									) : (
										__( 'Activate' )
									) }
								</Button>
							</>
						) }
					</div>
					<p className="label">
						{ __( 'License Status', 'divi_flash' ) }
					</p>
					{ ! license ? (
						<div className="inactive">
							<p>
								{ __( 'LICENSE IS NOT ACTIVE', 'divi_flash' ) }
							</p>
						</div>
					) : (
						<div className="active">
							<p>{ __( 'ACTIVE', 'divi_flash' ) }</p>
							{ isDeactivating ? (
								<Loading />
							) : (
								<a onClick={ deactivate }>
									{ __( 'Deactivate License', 'divi_flash' ) }
								</a>
							) }
						</div>
					) }
				</div>
			</div>
		</>
	);
};
