<?php
/**
 * BusinessHoursItem Module class.
 *
 * @package DIFL\Modules\BusinessHoursItem;
 */

namespace DIFL\Modules\BusinessHoursItem;

if (!defined('ABSPATH')) {
    die('Direct access forbidden.');
}

use ET\Builder\Framework\DependencyManagement\Interfaces\DependencyInterface;
use ET\Builder\Packages\ModuleLibrary\ModuleRegistration;

/**
 * Class BusinessHoursItem
 *
 * @package DIVIFLASH5\Modules\BusinessHoursItem
 */
class BusinessHoursItem implements DependencyInterface {

  public static function custom_css()
  {
    return \WP_Block_Type_Registry::get_instance()->get_registered('difl/businesshoursitem')->customCssFields;
  }

  public function load()
  {
    $module_json_folder_path = DIFL_MODULES_JSON_PATH . 'business-hours-item/';

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