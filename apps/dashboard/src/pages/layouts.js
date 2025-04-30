import { Button, CheckboxControl, Modal } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';
import {
	Angle,
	Download,
	Info_Menu,
	Right_Mark,
	Wrong_Mark,
} from '../icons/icons';
import { getLottie, handleLink, storeSettings } from '../utils/utils';
import { Loading } from '../components/common/Loading';
import { WrongIcon, RightIcon } from '../icons/icons';
import { DIFL_Modal } from '../components/common/Modal';

const OptionCheckbox = ( { option, handler, ...props } ) => {
	const [ isChecked, setChecked ] = useState( true );
	const handleToggle = ( value ) => {
		setChecked( value );
		handler( { ...option, isChecked: value } );
	};
	return (
		<CheckboxControl
			label={ option.label }
			checked={ isChecked }
			onChange={ ( value ) => handleToggle( value ) }
			{ ...props }
		/>
	);
};

export const Layouts = () => {
	const [ search, setSearch ] = useState( '' );
	const [ layouts, setLayouts ] = useState( diflSettings.layouts );
	const [ steps, setSteps ] = useState( [] );
	const importOptions = [
		{
			key: 'plugin',
			isChecked: true,
			label: __( 'Depend plugins', 'divi_flash' ),
			help: __( 'Depends plugins will be download', 'divi_flash' ),
		},
		{
			key: 'content',
			isChecked: true,
			label: __( 'Content', 'divi_flash' ),
			help: __( 'Help text', 'divi_flash' ),
		},
		{
			key: 'widgets',
			isChecked: true,
			label: __( 'Widget', 'divi_flash' ),
			help: __( 'Help text', 'divi_flash' ),
		},
		{
			key: 'customizer',
			isChecked: true,
			label: __( 'Customizer', 'divi_flash' ),
			help: __( 'Help text', 'divi_flash' ),
		},
		{
			key: 'divi-options',
			isChecked: true,
			label: __( 'Divi Options', 'divi_flash' ),
			help: __( 'Help text', 'divi_flash' ),
		},
		{
			key: 'diviflash-options',
			isChecked: true,
			label: __( 'DiviFlash Options', 'divi_flash' ),
			help: __( 'Help text', 'divi_flash' ),
		},
		{
			key: 'builder-templates',
			isChecked: true,
			label: __( 'Theme builder templates', 'divi_flash' ),
			help: __( 'Help text', 'divi_flash' ),
		},
	];
	const [ layoutOptions, setLayoutOptions ] = useState( importOptions );
	const [ showModal, setShowModal ] = useState( false );
	const [ currentLayout, setCurrentLayout ] = useState( layouts[ 0 ] );

	const handleOnSearch = ( value ) => {
		setSearch( value );
		setLayouts(
			diflSettings.layouts.filter( ( layout ) =>
				layout.package_name.toLowerCase().includes( value )
			)
		);
	};
	const handleOptions = ( option ) => {
		const updatedOption = layoutOptions.map( ( opt ) => {
			if ( opt.key !== option.key ) {
				return opt;
			}
			return { ...opt, isChecked: option.isChecked };
		} );

		setLayoutOptions( updatedOption );
	};

	const initiateImport = ( name ) => {
		setCurrentLayout( name );
		setShowModal( ! showModal );
	};

	const ProgressModalContent = () => {
		const layout = currentLayout;

		return (
			<div className="layout-modal">
				<h1 className="heading">{ layout.package_name }</h1>
				<div className="options content">
					<div className="importing">
						{ steps?.length &&
							steps.map( ( step ) => (
								<div className="step" key={ step.task }>
									{ step?.isDone === false ? (
										<Loading />
									) : step?.success ? (
										<RightIcon />
									) : (
										<WrongIcon />
									) }
									<p>{ step?.message ?? step.label }</p>
								</div>
							) ) }
					</div>
				</div>
				<div className="action">
					<Button
						className="cancel"
						disabled={ true }
						onClick={ () => setShowModal( false ) }
					>
						{ __( 'Cancel', 'divi_flash' ) }
					</Button>
				</div>
			</div>
		);
	};

	const CompletedModalContent = () => {
		const layout = currentLayout;
		const View = getLottie();

		return (
			<div className="layout-modal">
				<h1 className="heading">{ layout.package_name }</h1>
				<div className="options content">
					<div className="completed">
						{ View }
						<h4 className="">
							{ __( 'Completed', 'divi_flash' ) }
						</h4>
						<div className="menu-instruction">
							<div className="header">
								<Info_Menu />
								<h3>
									{ __(
										'Need to Menu Customize!',
										'divi_flash'
									) }
								</h3>
							</div>
							{ layout?.menu_instruction && (
								<div className="list">
									<h4>
										{ __( 'List Of Menus', 'divi_flash' ) }
									</h4>
									{ layout?.menu_instruction?.list }
									{ layout?.menu_instruction?.classes && (
										<>
											<h4>
												{ __(
													'Associate with menus',
													'divi_flash'
												) }
											</h4>
											{
												layout?.menu_instruction
													?.classes
											}
										</>
									) }
								</div>
							) }
						</div>
					</div>
				</div>
				<div className="action">
					<Button
						className="cancel"
						onClick={ () => setShowModal( false ) }
					>
						{ __( 'Back To Layouts', 'divi_flash' ) }
					</Button>
					<Button
						className="menu-create"
						onClick={ () => handleLink( 'menu_page' ) }
					>
						{ __( 'Menu Customize', 'divi_flash' ) }
					</Button>
				</div>
			</div>
		);
	};
	const InitialModalContent = () => {
		const layout = currentLayout;
		return (
			<div className="layout-modal">
				<h1 className="heading">{ layout.package_name }</h1>
				<div className="options content">
					<div className="options">
						<p>Import { layout.package_name } template.</p>
						<p>
							This action will <strong>override</strong> the
							following settings
						</p>
						{ layoutOptions.map( ( option ) => (
							<OptionCheckbox
								option={ option }
								handler={ handleOptions }
								key={ option.key }
								disabled={ true }
							/>
						) ) }
					</div>
					<div className="info">
						<h3>{ __( 'Server Requirements', 'divi_flash' ) }</h3>
						<ul>
							{ diflSettings.server_directive.map(
								( directive ) => (
									<div
										className="directive-list"
										key={ directive.key }
									>
										{ directive.passed ? (
											<Right_Mark />
										) : (
											<Wrong_Mark />
										) }
										<div className="title">{ `${
											directive.key
										}: ${ __(
											'Required',
											'divi_flash'
										) }-- ${ directive.value } \& ${ __(
											'Currently',
											'divi_flash'
										) }-- ${ directive.current }` }</div>
									</div>
								)
							) }
						</ul>
						<p className="notice">
							We suggest you to meet all the requirement above.
							there might be chance to be failed during import due
							to require server configuration
						</p>
					</div>
				</div>
				<div className="action">
					<Button
						className="cancel"
						onClick={ () => setShowModal( false ) }
					>
						{ __( 'Cancel', 'divi_flash' ) }
					</Button>
					<Button
						className="import"
						onClick={ () => processImport() }
					>
						{ __( 'Start Importing', 'divi_flash' ) }
					</Button>
				</div>
			</div>
		);
	};
	const modalContents = {
		InitialModalContent,
		ProgressModalContent,
		CompletedModalContent,
	};
	const [ modalContent, setModalContent ] = useState( null );
	const ModalContent = () => {
		return modalContents[ modalContent ]
			? modalContents[ modalContent ]()
			: null;
	};
	const processImport = async () => {
		setModalContent( 'ProgressModalContent' );
		const steps = [
			{
				task: 'init',
				isDone: false,
				label: __( 'Initializing', 'divi_flash' ),
				success: false,
			},
			{
				task: 'download',
				isDone: false,
				label: __( 'Downloading Layout Package', 'divi_flash' ),
				success: false,
			},
			{
				task: 'content',
				isDone: false,
				label: __( 'Importing Content', 'divi_flash' ),
				success: false,
			},
			{
				task: 'divi_options',
				isDone: false,
				label: __( 'Importing Divi Options', 'divi_flash' ),
				success: false,
			},
			{
				task: 'df_options',
				isDone: false,
				label: __( 'Importing DiviFlash Settings', 'divi_flash' ),
				success: false,
			},
			{
				task: 'customizer',
				isDone: false,
				label: __( 'Importing Customizer', 'divi_flash' ),
				success: false,
			},
			{
				task: 'builder_templates',
				isDone: false,
				label: __( 'Importing Theme Builder Templates', 'divi_flash' ),
				success: false,
			},
			{
				task: 'template_library',
				isDone: false,
				label: __( 'Importing Library Layout', 'divi_flash' ),
				success: false,
			},
		];
		for ( const step of steps ) {
			setSteps( ( prevStep ) => [ ...prevStep, step ] );
			const [ body, headers, error ] = await storeSettings(
				currentLayout,
				diflSettings.actions.layout,
				step
			);
			step.message = body?.data?.message ?? step.label;
			step.success = body?.data?.success ?? false;
			step.isDone = true;
		}
		setModalContent( 'CompletedModalContent' );
	};

	const handleImport = async () => {
		setReqOption( {
			url: apiSettings.ajaxUrl,
			method: 'POST',
			data: {
				...currentLayout,
				action: apiSettings.action,
				_wpnonce: apiSettings.nonce,
			},
		} );
		processImport();
		setModalContent( 'ProgressModalContent' );
		const [ body, headers, error ] = await storeSettings(
			currentLayout,
			diflSettings.actions.layout
		);
		setModalContent( 'CompletedModalContent' );
	};
	const resetModalContent = () => {
		if ( showModal ) return;
		setModalContent( null );
	};
	useEffect( resetModalContent, [ showModal ] );
	return (
		<>
			{ showModal && (
				<DIFL_Modal
					setShowModal={ setShowModal }
					className="diviflash-modal"
					shouldCloseOnClickOutside={ false }
				>
					{ modalContent === null ? (
						<InitialModalContent />
					) : (
						<ModalContent />
					) }
				</DIFL_Modal>
			) }
			<div className="layouts">
				<div className="top">
					<div className="heading">
						<p className="title">
							{ __( 'Divi Layouts Library', 'divi_flash' ) }
						</p>
						<p className="details">
							DiviFlash offers free divi layouts to build websites
							for every niche within a few minutes.
						</p>
					</div>
					<div className="search">
						<input
							type="text"
							value={ search }
							onChange={ ( e ) =>
								handleOnSearch( e.target.value.toLowerCase() )
							}
							placeholder={ __(
								'Search for layouts',
								'divi_flash'
							) }
						/>
					</div>
				</div>
				<div className="list">
					{ layouts.map( ( layout ) => {
						return (
							<div className="list-item" key={ layout.slug }>
								<div
									className="top"
									style={ {
										backgroundImage: `url(${ layout.thumb })`,
										backgroundRepeat: 'no-repeat',
										backgroundPosition: 'center',
										height: '272px',
									} }
								>
									{ '1.0.0' !== layout.version && (
										<div className="version">
											V{ layout.version }
										</div>
									) }

									<div className="external-link">
										<div
											className="doc"
											onClick={ () =>
												window.open( layout.doc_link )
											}
										>
											<Angle />
										</div>
										<div
											className="download"
											onClick={ () =>
												window.open(
													layout.download_url
												)
											}
										>
											<Download />
										</div>
									</div>
									<div className="action">
										<a
											className="import"
											onClick={ () =>
												initiateImport( layout )
											}
										>
											{ __(
												'Import Layout',
												'divi_flash'
											) }
										</a>
										<a
											className="demo"
											href={ layout.demo_url }
											target="_blank"
										>
											{ __(
												'Live Preview',
												'divi_flash'
											) }
										</a>
									</div>
									<div className="overlay"></div>
								</div>
								<div className="bottom">
									<h3 className="heading">
										{ layout[ 'name' ] }
									</h3>
									<p className="sub-heading">
										{ layout[ 'description' ] }
									</p>
								</div>
							</div>
						);
					} ) }
				</div>
			</div>
		</>
	);
};
