<?php
// Require php files.
require_once DIFL5_MODULE_PATH . 'divi-5/vendor/autoload.php';
require_once DIFL5_MODULE_PATH . 'divi-5/server/Modules/Modules.php';
require_once(DIFL_MAIN_DIR . '/includes/classes/df-vertical-menu-walker.php');

/**
 * Enqueue Divi 5 Visual Builder Assets
 *
 * @since 1.0.0    
 */
if (!defined('DIFL5_JSON_PATH')) {
  define('DIFL5_JSON_PATH', DIFL5_MODULE_PATH . 'divi-5/visual-builder/modules-json/');
}

function difl_module_enqueue_visual_builder_assets()
{
  if (et_core_is_fb_enabled() && et_builder_d5_enabled()) {
    // Enqueue the JavaScript file
    wp_enqueue_script(
      'difl-module-visual-builder-js',
      DIFL5_MODULE_URL . 'divi-5/visual-builder/build/diviflash-5-modules.min.js',
      array('react', 'jquery-core', 'divi-module-library', 'wp-hooks', 'divi-rest'),
      '1.0.0',
      true
    );

    // Enqueue the CSS file (ensure the path is correct)
    wp_enqueue_style(
      'difl-module-visual-builder-css',
      DIFL5_MODULE_URL . 'divi-5/visual-builder/build/diviflash-5-modules.min.css',
      array(), // No dependencies for this stylesheet
      '1.0.0'   // Version of the CSS
    );
  }
}

add_action('divi_visual_builder_assets_before_enqueue_scripts', 'difl_module_enqueue_visual_builder_assets');

function difl_enqueue_frontend_styles()
{
  wp_enqueue_style(
    'difl-module-visual-builder-css',
    DIFL5_MODULE_URL . 'divi-5/visual-builder/build/diviflash-5-modules.min.css',
    array(), // No dependencies for this stylesheet
    '1.0.0'   // Version of the CSS
  );
}
add_action('wp_enqueue_scripts', 'difl_enqueue_frontend_styles');
