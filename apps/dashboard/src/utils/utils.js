import completedAnim from '../static/completed.json';
import { useLottie } from 'lottie-react';

const links = {
	support: 'https://diviflash.com/contact/',
	doc: 'https://diviflash.com/docs/',
	community: 'https://www.facebook.com/diviflash/',
	review:
		'https://www.diviflash.com' === diflSettings?.update_uri
			? 'https://www.trustpilot.com/evaluate/www.diviflash.com'
			: 'https://www.elegantthemes.com/marketplace/diviflash/reviews/leave-review',
	changelog: 'https://diviflash.com/changelog/',
	feature_request: 'https://diviflash.com/roadmap/',
	menu_page:
		`${ window.location.origin }${ window.location.pathname }`.replace(
			'admin.php',
			''
		) + 'nav-menus.php',
};
export const handleLink = ( link ) => {
	const url = links[ link ];
	window.open( url, '_blank' );
};
export const storeSettings = async ( settings, action, props ) => {
	let body, headers, error;
	try {
		const response = await fetch( diflSettings.ajaxUrl, {
			method: 'post',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: new URLSearchParams( {
				settings: JSON.stringify( settings ),
				action: action ?? diflSettings?.actions.settings,
				_wpnonce: diflSettings.nonce,
				...props,
			} ).toString(),
		} );
		const headerData = await response.headers;
		body = await response.json();

		headers = [];
		for ( const [ key, value ] of headerData ) {
			headers[ key ] = value;
		}
	} catch ( err ) {
		error = ( await err?.json ) ? err.json() : 'Something went wrong';
	}

	return [ body, headers, error ];
};

export const getLottie = ( options = {} ) => {
	const defaultOpt = {
		animationData: completedAnim,
		loop: true,
		className: 'icon',
	};
	const { View } = useLottie( { ...defaultOpt, ...options } );
	return View;
};
