<?php
    /*
    Plugin Name: DiviFlash menu dashboard
    Plugin URI:  http://www.diviflash.com
    Description: Menu Dashboard settings for DiviFlash.
    Version:     1.0.1
    Author:      DiviFlash
    Author URI:  http://www.diviflash.com
    License:     GPL2
    License URI: https://www.gnu.org/licenses/gpl-2.0.html
    Text Domain: divi_flash
    Domain Path: /languages
    */


// add_action('admin_footer', 'df_add_menu_dashboard');
// function df_add_menu_dashboard() {
//     echo '<div id="df-menu-dashboard">
		
// 	</div>';
// }
/**
 * Add an entry point for the gutenberg
 * settings page for the plugin.
 *
 * @return void
 */
function diviflash_menu_dashboard_admin_scripts() {
	$dir = __DIR__;

	$df_dashboard_asset_path = "$dir/df-menu-dashboard/index.asset.php";
	if ( ! file_exists( $df_dashboard_asset_path ) ) {
		throw new Error(
			'You need to run `npm start` or `npm run build` for the "diviflash/diviflash-plugin" block first.'
		);
	}

	// dashboard script
	$df_dashboard_js     = 'df-menu-dashboard/index.js';
	$df_dashboard_script_asset = require( $df_dashboard_asset_path );
	wp_enqueue_script(
		'diviflash-menu-dashboard-admin-editor',
		plugins_url( $df_dashboard_js, __FILE__ ),
		$df_dashboard_script_asset['dependencies'],
		$df_dashboard_script_asset['version'],
        true
	);
	wp_set_script_translations( 'diviflash-menu-dashboard-admin-editor', 'divi_flash' );

	wp_localize_script('diviflash-menu-dashboard-admin-editor', 'df_menu', array(
		'nonce' => wp_create_nonce('df_menu_settings'),
		'layouts' => json_encode(df_get_lin_items_for_menu()),
		'site_url' => get_site_url()
	));

	// dashboard css
	$df_dashboard_css = 'df-menu-dashboard/index.css';
	wp_enqueue_style(
		'diviflash-menu-dashboard-admin',
		plugins_url( $df_dashboard_css, __FILE__ ),
		['wp-components', 'wp-editor'],
		filemtime( "$dir/$df_dashboard_css" )
	);
}
// add_action( 'admin_enqueue_scripts', 'diviflash_menu_dashboard_admin_scripts', 99 );


function df_get_lin_items_for_menu() {
    $args = array(
        'post_type'      => 'et_pb_layout',
        'posts_per_page' => -1,
    );
	$item_array = array(
		array('label' => 'Select Layout', 'value' => 'none')
	);
    $lib_items = get_posts( $args );
	foreach ( $lib_items as $lib_item ) {
		$new_layout = array();
		$new_layout['value'] = $lib_item->ID;
		$new_layout['label'] = $lib_item->post_title;
		$item_array[] = $new_layout;
	}
	return $item_array;
}

