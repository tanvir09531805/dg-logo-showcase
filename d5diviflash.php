<?php
/*
Plugin Name: D5 DiviFlash
Plugin URI:  http://www.difl.com
Description: Most advanced Divi plugin with powerful Divi modules, extensions, and premade layouts.
Version:     1.0.2
Author:      DiviFlash
Author URI:  http://www.difl.com
License:     GPL2
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Text Domain: divi_flash
Domain Path: /languages
Tested up to: 6.6
Requires at least: 5.6
Requires PHP: 7.1
*/

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

if ( ! defined( 'DIFL_MAIN_DIR' ) ) {
	define( 'DIFL_MAIN_DIR', __DIR__ );
}
if ( ! defined( 'DIFL_MAIN_PATH' ) ) {
	define( 'DIFL_MAIN_PATH', plugin_dir_path( __FILE__ ) );
}
if ( ! defined( 'DIFL_MODULES_JSON_PATH' ) ) {
	define( 'DIFL_MODULES_JSON_PATH', DIFL_MAIN_PATH . 'modules-json/' );
}
if ( ! defined( 'DIFL_ADMIN_DIR' ) ) {
	define( 'DIFL_ADMIN_DIR', trailingslashit( plugin_dir_url( __FILE__ ) ) . 'admin/' );
}
if ( ! defined( 'DIFL_ADMIN_DIR_PATH' ) ) {
	define( 'DIFL_ADMIN_DIR_PATH', plugin_dir_path( __FILE__ ) . 'admin/' );
}
if ( ! defined( 'DIFL_PUBLIC_DIR' ) ) {
	define( 'DIFL_PUBLIC_DIR', trailingslashit( plugin_dir_url( __FILE__ ) ) . 'public/' );
}
if ( ! defined( 'DIFL_PUBLIC_DIR_PATH' ) ) {
	define( 'DIFL_PUBLIC_DIR_PATH', plugin_dir_path( __FILE__ ) . 'public/' );
}
if ( ! defined( 'DIFL_MAIN_FILE_PATH' ) ) {
	define( 'DIFL_MAIN_FILE_PATH', __FILE__ );
}
if ( ! defined( 'DIFL_VERSION' ) ) {
	define( 'DIFL_VERSION', '1.4.8' );
}

if ( ! defined( 'DIFL_BASENAME' ) ) {
	define( 'DIFL_BASENAME', plugin_basename( __FILE__ ) );
}

if ( ! defined( 'DIFL_PLACEHOLDER_LOGO' ) ) {
	define( 'DIFL_PLACEHOLDER_LOGO', "data:image/png;base64,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" );
}

/**
 * Requires Autoloader.
 */
require DIFL_MAIN_PATH . 'vendor/autoload.php';
require DIFL_MAIN_PATH . 'modules/Modules.php';

/**
 * Register all Divi 4 modules.
 *
 * @since ??
 */
function difl_module_initialize_d4_modules() {
//	require_once DIFL_MAIN_PATH . 'divi-4/modules/Divi4Module/Divi4Module.php';
//	require_once DIFL_MAIN_PATH . 'divi-4/modules/Divi4OnlyModule/Divi4OnlyModule.php';
}
add_action( 'et_builder_ready', 'difl_module_initialize_d4_modules' );

/**
 * Enqueue style and scripts of Module Extension Example for Visual Builder.
 *
 * @since ??
 */
function difl_module_enqueue_vb_scripts() {
	if ( et_builder_d5_enabled() && et_core_is_fb_enabled() ) {
		$plugin_dir_url = plugin_dir_url( __FILE__ );

		wp_enqueue_script( 'dofl-modules-builder-bundle-script', "{$plugin_dir_url}scripts/bundle.js",
			array(
				'divi-module-library',
				'divi-vendor-wp-hooks',
			), '1.0.0', true
		);
		// wp_enqueue_script( 'difl-swiper-script', "{$plugin_dir_url}scripts/swiper.min.js", array(), '1.0.0', true );
		// wp_enqueue_script( 'difl-contentcarousel-script', "{$plugin_dir_url}scripts/contentcarousel.js", array(), '1.0.0', true );

		wp_enqueue_style( 'difl-modules-builder-vb-bundle-style', "{$plugin_dir_url}styles/bundle.css", array(), '1.0.0' );
		wp_localize_script('dofl-modules-builder-bundle-script', 'DiviFlash', array(
			'nonce' => wp_create_nonce('wp_rest')
		));

		\ET\Builder\VisualBuilder\Assets\PackageBuildManager::register_package_build(
			[
				'name'     => 'content-carousel',
				'version'  => null,
				'script'   => [
					'src'  => "{$plugin_dir_url}scripts/content-carousel.js",
					'deps' => [
						'lodash',
						'divi-vendor-wp-hooks'
					],
					'enqueue_top_window' => false,
					'enqueue_app_window' => true,
					'args'               => [
						'in_footer' => false,
					],
				],
			]
		);
	}
}
add_action( 'divi_visual_builder_assets_before_enqueue_scripts', 'difl_module_enqueue_vb_scripts' );

/**
 * Enqueue style and scripts of Module Extension Example
 *
 * @since ??
 */
function difl_module_enqueue_frontend_scripts() {
	$version = time();
	$plugin_dir_url = plugin_dir_url( __FILE__ );
	wp_enqueue_style( 'difl-modules-builder-bundle-style', "{$plugin_dir_url}styles/bundle.css", array(), '1.0.0' );
	wp_enqueue_style( 'difl-modules-logo-showcase-style', "{$plugin_dir_url}styles/logo-showcase-style.css", array(), '1.0.0' );
	wp_enqueue_style( 'difl-modules-content-carousel-style', "{$plugin_dir_url}styles/content-carousel.css", array(), '1.0.0' );

	wp_enqueue_script( 'lightbox', $plugin_dir_url . 'scripts/lightgallery.js', array('jquery'), $version, true );
	// Swiper Load
	wp_enqueue_script( 'swiper', $plugin_dir_url . 'scripts/swiper.min.js', array('jquery'), $version, true );
	wp_enqueue_script( 'swiper-content-carousel', $plugin_dir_url . 'scripts/contentcarousel.js', array('jquery', 'swiper'), $version, true );
}
add_action( 'wp_enqueue_scripts', 'difl_module_enqueue_frontend_scripts' );


if(!function_exists('dgls_custom_attachment_fields_to_edit')) {

	// Add custom fields to the media attachment edit screen
	function dgls_custom_attachment_fields_to_edit($form_fields, $post) {
		// Add Color Field
		$form_fields['dgls_color'] = [
			'label' => 'DGLS Color',
			'input' => 'html', // Use custom HTML for input
			'html'  => '<input type="color" name="attachments[' . $post->ID . '][dgls_color]" value="' . esc_attr(get_post_meta($post->ID, 'dgls_color', true)) . '">',
			'helps' => 'Choose a color for this attachment.',
		];

		// Add Outside URL Field
		$form_fields['dgls_outside_url'] = [
			'label' => 'DGLS Outside URL',
			'input' => 'url', // URL input field
			'value' => get_post_meta($post->ID, 'dgls_outside_url', true),
			'helps' => 'Enter an external URL related to this attachment.',
		];

		return $form_fields;
	}
}
add_filter('attachment_fields_to_edit', 'dgls_custom_attachment_fields_to_edit', 10, 2);

if(!function_exists('dgls_custom_attachment_fields_to_save')){
	// Save custom fields when the attachment is saved
	function dgls_custom_attachment_fields_to_save($post, $attachment) {
		if (isset($attachment['dgls_color'])) {
			update_post_meta($post['ID'], 'dgls_color', sanitize_text_field($attachment['dgls_color']));
		}

		if (isset($attachment['dgls_outside_url'])) {
			update_post_meta($post['ID'], 'dgls_outside_url', esc_url_raw($attachment['dgls_outside_url']));
		}

		return $post;
	}
}
add_filter('attachment_fields_to_save', 'dgls_custom_attachment_fields_to_save', 10, 2);

add_action('wp_footer', 'tanvir_md_al_amin_footer');
function tanvir_md_al_amin_footer(){

	// $assets_prefix  = et_get_dynamic_assets_path();

	// echo ' TTTTTTTTTTT '.$assets_prefix;
}