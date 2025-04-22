import { Fragment, useEffect, useRef, useState } from '@wordpress/element';
import classnames from 'classnames';
import getPages from '../pages';
import { Announcement as Announcement_Icon, Logo } from '../icons/icons';
import {
	__experimentalDivider as Divider,
	Button,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { handleLink } from '../utils/utils';

const useAnimatedMount = ( isMounted, delayTime ) => {
	const [ showDiv, setShowDiv ] = useState( false );
	useEffect( () => {
		let timeoutId;
		if ( isMounted && ! showDiv ) {
			setShowDiv( true );
		} else if ( ! isMounted && showDiv ) {
			timeoutId = setTimeout( () => setShowDiv( false ), delayTime );
		}
		return () => clearTimeout( timeoutId );
	}, [ isMounted, delayTime, showDiv ] );
	return showDiv;
};
const ChangeLog = ( { handleClose, ...props } ) => {
	const ref = useRef();
	const changelog = JSON.parse( JSON.stringify( diflSettings?.changelog ) );
	const version = changelog?.version ?? '';
	const date = changelog?.date ?? '';
	const handleOutsideClick = ( e ) => {
		if ( ! ref.current.contains( e.target ) ) {
			handleClose();
		}
	};
	useEffect( () => {
		document.addEventListener( 'click', handleOutsideClick );
		return () => {
			document.removeEventListener( 'click', handleOutsideClick );
		};
	} );
	return (
		<div className="difl-changelog" { ...props } ref={ ref }>
			<div className="top">
				<h2>{ __( "What's New?", 'divi_flash' ) }</h2>
				<div
					className="close dashicons dashicons-no-alt"
					onClick={ handleClose }
				></div>
			</div>
			<Divider style={ { color: '#D0D5DD' } } />
			<div className="version">
				<h3>{ version }</h3>
				<p className="date">{ date }</p>
				<div className="log">
					{ Object.keys( diflSettings?.changelog )
						.slice( 2 )
						.map( ( type ) => {
							const data = diflSettings?.changelog[ type ];
							return (
								<Fragment key={ type }>
									<h3>{ type }</h3>
									<ul>
										{ data.map( ( log ) => {
											return <li key={ log }>{ log }</li>;
										} ) }
									</ul>
								</Fragment>
							);
						} ) }
				</div>
			</div>
			<Button
				onClick={ () => handleLink( 'changelog' ) }
				className="read-more"
			>
				{ __( 'Read More', 'divi_flash' ) }
			</Button>
		</div>
	);
};

const mountedStyle = { animation: 'inAnimation .5s ease-out' };
const unmountedStyle = {
	animation: 'outAnimation .5s ease-out',
	animationFillMode: 'forwards',
};
export const Container = () => {
	const ref = useRef();
	const pages = getPages();
	let queryParams = new URLSearchParams( window.location.search );
	let currentTab =
		queryParams.get( 'tab' ) === null
			? Object.keys( pages )[ 0 ]
			: queryParams.get( 'tab' );
	const [ showLog, setShowLog ] = useState( false );
	const [ activePage, setActivePage ] = useState( currentTab );
	const showDiv = useAnimatedMount( showLog, 500 );

	const toggleChangeLog = () => {
		setShowLog( ! showLog );
	};
	const onTabClick = ( tab ) => {
		window.history.replaceState( null, null, '?page=diviflash&tab=' + tab );

		queryParams = new URLSearchParams( window.location.search );
		currentTab = queryParams.get( 'tab' ) ?? Object.keys( pages )[ 0 ];

		setActivePage( currentTab );
	};

	const tablist = [];

	Object.keys( pages ).forEach( ( page ) => {
		tablist.push(
			<li key={ page } onClick={ () => onTabClick( page ) }>
				<button
					className={
						`${ page }-page ` +
						classnames( { active: page === activePage } )
					}
				>
					{ pages[ page ].label }
				</button>
			</li>
		);
	} );
	let ActiveContent = '';
	if ( activePage && pages[ activePage ] && pages[ activePage ].component ) {
		let TabContent = pages[ activePage ].component;
		ActiveContent = (
			<>
				<TabContent />
			</>
		);
	}
	return (
		<div className="difl-container" ref={ ref }>
			<div className="difl-overlay"></div>
			{ showDiv && (
				<ChangeLog
					handleClose={ toggleChangeLog }
					style={ showLog ? mountedStyle : unmountedStyle }
				/>
			) }
			<div className="header">
				<div className="top">
					<div className="logo">
						<Logo />
					</div>
					<div className="right">
						<div className="version">
							{ `v${ diflSettings?.version }` ?? 1.4 }
						</div>
						<div className="seperator"></div>
						<div
							className="announcement"
							onClick={ toggleChangeLog }
						>
							<Announcement_Icon />
						</div>
					</div>
				</div>
				<div className="bottom">
					<ul>{ tablist }</ul>
				</div>
			</div>
			<div className="content">{ ActiveContent }</div>
		</div>
	);
};
