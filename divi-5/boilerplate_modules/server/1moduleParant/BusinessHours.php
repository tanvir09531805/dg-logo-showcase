<?php

/**
 * BusinessHours Module class.
 *
 * @package DIVIFLASH5\Modules\BusinessHours;
 */

namespace DIFL\Modules\BusinessHours;

if (!defined('ABSPATH')) {
  die('Direct access forbidden.');
}

use ET\Builder\Framework\DependencyManagement\Interfaces\DependencyInterface;
use ET\Builder\Packages\ModuleLibrary\ModuleRegistration;


/**
 * Class BusinessHours
 *
 * @package DIFL\Modules\BusinessHours
 */
class BusinessHours implements DependencyInterface
{
  use RenderCallback;

  public static function custom_css()
  {
    return \WP_Block_Type_Registry::get_instance()->get_registered('difl/businesshours')->customCssFields;
  }

  
	/**
	 * Loads `ParentModule` and registers Front-End render callback and REST API Endpoints.
	 *
	 * @since ??
	 *
	 * @return void
	 */
  public function load()
  {
    $module_json_folder_path = DIFL_MODULES_JSON_PATH . 'business-hours/';

    add_action(
      'init',
      function () use ($module_json_folder_path) {
        ModuleRegistration::register_module(
          $module_json_folder_path,
          [
            'render_callback' => [self::class, 'render_callback'],
          ]
        );
      }
    );
  }
}
