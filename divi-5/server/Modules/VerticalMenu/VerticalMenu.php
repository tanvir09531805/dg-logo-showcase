<?php
/**
 * Vertical Menu class.
 *
 * @package DIVIFLASH5\Modules\VerticalMenu;
 */

namespace DIVIFLASH5\Modules\VerticalMenu;


if (!defined('ABSPATH')) {
  die('Direct access forbidden.');
}

use ET\Builder\Framework\DependencyManagement\Interfaces\DependencyInterface;
use ET\Builder\Packages\ModuleLibrary\ModuleRegistration;
use DIVIFLASH5\Modules\VerticalMenu\VerticalMenuTraits;

/**
 * Class Vertical Menu
 *
 * @package DIVIFLASH5\Modules\VerticalMenu;
 */
class VerticalMenu implements DependencyInterface
{

  use VerticalMenuTraits\RenderCallbackTrait;
  use VerticalMenuTraits\ModuleClassnamesTrait;
  use VerticalMenuTraits\ModuleStylesTrait;
  use VerticalMenuTraits\ModuleScriptDataTrait;

  public function load()
  {
    $module_json_folder_path = DIFL5_JSON_PATH . '/vertical-menu';

    add_action(
      'init',
      function () use ($module_json_folder_path) {
        ModuleRegistration::register_module(
          $module_json_folder_path,
          [
            'render_callback' => [VerticalMenu::class, 'render_callback'],
          ]
        );
      }
    );
  }
}