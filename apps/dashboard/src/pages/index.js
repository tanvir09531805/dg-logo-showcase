import { applyFilters } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import { Welcome } from './welcome';
import { Layouts } from './layouts';
import { Modules } from './modules';
import { Settings } from './settings';

export default function () {
	return applyFilters( 'difl.pages', {
		welcome: {
			label: __( 'Getting Started', 'divi_flash' ),
			component: Welcome,
		},
		layout: {
			label: __( 'Layouts', 'divi_flash' ),
			component: Layouts,
			tab: 'layouts',
		},
		modules: {
			label: __( 'Modules', 'divi_flash' ),
			component: Modules,
			tab: 'modules',
		},
		settings: {
			label: __( 'Settings', 'divi_flash' ),
			component: Settings,
			tab: 'settings',
		},
	} );
}
