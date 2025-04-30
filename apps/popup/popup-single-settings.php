<?php
/**
 * Plugin Name:       Diviflash Popup Single Settings
 * Description:       Example block written with ESNext standard and JSX support – build step required.
 * Requires at least: 5.7
 * Requires PHP:      7.0
 * Version:           0.0.1
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       diviflash_popup
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/writing-your-first-block-type/
 */

// function create_block_diviflash_dashboard_block_init() {
// 	register_block_type_from_metadata( __DIR__ );
// }
// add_action( 'init', 'create_block_diviflash_dashboard_block_init' );


require_once (plugin_dir_path( __FILE__ ) . '/df-popup-init.php' );


/**
 * Add the dashboard dashboard
 * page for the plugin.
 *
 * @return void
 */
function diviflash_plugin_dashboard_page() {
	add_menu_page(
		__( 'Diviflash Dashboard', 'divi_flash' ),
		__( 'Diviflash Dashboard', 'divi_flash' ),
		'manage_options',
		'diviflash_plugin_dashboard',
		function() {
			?>
			<div id="diviflash-plugin-dashboard"></div>
			<?php
		}
	);
}
add_action( 'admin_menu', 'diviflash_plugin_dashboard_page', 10 );


add_filter('register_taxonomy_args', 'my_function', 10, 2);

function my_function ($args, $taxonomy)
{
    if ( in_array( $taxonomy, array('wp_role' ) ) )
    {
        $args['show_in_rest'] = true;
    }

    return $args;
}
