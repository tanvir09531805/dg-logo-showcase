<?php
/*
Plugin Name: D5 Logo Showcase Module
Plugin URI:  https://vir-za.com/wp/
Description: Divi 5 Logo Showcase module.
Version:     1.0.0
Author:      Tanvir
Author URI:  https://bd.linkedin.com/in/1mdalamin1
License:     GPL2
License URI: https://www.gnu.org/licenses/gpl-2.0.html
*/

if ( ! defined( 'ABSPATH' ) ) {
  die( 'Direct access forbidden.' );
}

// Setup constants.
define( 'D5LS_PATH', plugin_dir_path( __FILE__ ) );
define( 'D5LS_URL', plugin_dir_url( __FILE__ ) );

// Load Divi 5 modules.
require_once D5LS_PATH . 'server/index.php';

/**
 * Enqueue Divi 5 Visual Builder Assets
 */
function d5ls_enqueue_visual_builder_assets() {
  if ( et_core_is_fb_enabled() && et_builder_d5_enabled() ) {
    wp_enqueue_script(
      'd5-ls-module-visual-builder',
      D5LS_URL . 'visual-builder/build/d5-ls-module.js',
      [
        'react',
        'jquery',
        'divi-module-library',
        'wp-hooks',
        'divi-rest',
      ],
      '1.0.0',
      true
    );
  }
}

add_action( 'divi_visual_builder_assets_before_enqueue_packages', 'd5ls_enqueue_visual_builder_assets' );

// require_once  D5LS_PATH . 'd5ls-add-custom-options-group-and-field.php';
/**
 * Enqueue a custom d5custom script.
 * plugins_url( '/d5custom.js', __FILE__ ),
 */
function enqueue_my_d5custom_script() {
  // Enqueue the 'd5custom-script' located in the plugin directory from the main plugin file.
  wp_enqueue_script(
    'd5custom-script',
    D5LS_URL . 'd5custom.js',
    [
      'lodash',
      'divi-vendor-wp-hooks'
    ],
    null,
    true
  );
}
add_action( 'wp_enqueue_scripts', 'enqueue_my_d5custom_script' );

