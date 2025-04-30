/* jshint esversion: 6 */

import FontFamilyComponent from './FontFamilyComponent';
import { ControlWithLink } from '@difl-wp/components';
import { render } from '@wordpress/element';

export const FontFamilyControl = wp.customize.Control.extend({
	renderContent: function renderContent() {
		render(<FontFamilyComponent control={this} />, this.container[0]);
	},
});
