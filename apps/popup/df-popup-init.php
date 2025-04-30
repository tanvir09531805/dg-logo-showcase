<?php
defined( 'ABSPATH' ) || die();

/**
 * Add an entry point for the gutenberg
 * settings page for the plugin.
 *
 * @return void
 */
function difl_popup_plugin_admin_scripts() {
	$dir = __DIR__;

	$df_dashboard_asset_path = "$dir/df-popup-panel/index.asset.php";
	if ( ! file_exists( $df_dashboard_asset_path ) ) {
		throw new Error(
			'You need to run `npm start` or `npm run build` for the "diviflash/diviflash-plugin" block first.'
		);
	}

	// dashboard script
	$df_dashboard_js     = 'df-popup-panel/index.js';
	$df_dashboard_script_asset = require( $df_dashboard_asset_path );
	wp_enqueue_script(
		'diviflash-plugin-admin-editor',
		plugins_url( $df_dashboard_js, __FILE__ ),
		$df_dashboard_script_asset['dependencies'],
		$df_dashboard_script_asset['version']
	);
	wp_set_script_translations( 'diviflash-plugin-block-editor', 'divi_flash' );

	wp_localize_script('diviflash-plugin-admin-editor', 'df_dashboard', array(
		'nonce' => wp_create_nonce('df_dashboard_settings')
	));

	// dashboard css
	$df_dashboard_css = 'df-popup-panel/index.css';
	wp_enqueue_style(
		'diviflash-plugin-admin',
		plugins_url( $df_dashboard_css, __FILE__ ),
		['wp-components'],
		filemtime( "$dir/$df_dashboard_css" )
	);

}
add_action( 'admin_enqueue_scripts', 'difl_popup_plugin_admin_scripts', 10 );



/**
 * All dashboard settings value for Import/Export
 *
 * @return Array
 */
function df_all_popup_settings_key() {
	return array(
		'popup_active',
		'popup_trigger_type',
		'popup_delay',
		'custom_css_selector',
		'clossing_css_selector',
		'remove_link',
		'close_on_overlay_click',
		'close_by_clicking_back_button',
		'role',
		'site_area',
		'specific_page',
		'content_width_type',
		'overlay_background',
		'animation_name',
		'hide_close_button',
		'close_button_border',
		'close_button_margin',
		'close_button_padding'
	);
}





