<?php
/**
 * AdvancedHeading Module class.
 *
 * @package DIFL\Modules\AdvancedHeading;
 */

namespace DIFL\Modules\AdvancedHeading;

if (!defined('ABSPATH')) {
    die('Direct access forbidden.');
}

use ET\Builder\Framework\DependencyManagement\Interfaces\DependencyInterface;
use ET\Builder\Packages\ModuleLibrary\ModuleRegistration;

/**
 * Class AdvancedHeading
 *
 * @package DIVIFLASH5\Modules\AdvancedHeading
 */
class AdvancedHeading implements DependencyInterface {
  
  use RenderCallback;
  
  public function load()
  {
    $module_json_folder_path = DIFL_MODULES_JSON_PATH . 'advanced-heading/';

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