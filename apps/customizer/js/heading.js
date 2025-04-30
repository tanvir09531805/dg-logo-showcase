/**
 * Customizer order control.
 *
 * @package DIFL\Customizer\Controls
 */
( function ( $ ) {
	'use strict';
	wp.diflHeadingAccordion = {
		init: function () {
			this.handleToggle();
		},
		handleToggle: function () {
			$( '.customize-control-customizer-heading.accordion .difl-customizer-heading' ).on( 'click', function () {
				var accordion = $( this ).closest( '.accordion' );
				$( accordion ).toggleClass( 'expanded' );
				// return false;
			} );
		},
	};

	$( document ).ready(
		function () {
			wp.diflHeadingAccordion.init();
		}
	);
} )( jQuery );
