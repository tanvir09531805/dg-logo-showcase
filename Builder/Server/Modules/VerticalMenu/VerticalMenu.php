<?php
/**
 * Vertical Menu class.
 *
 * @package DIFL\Server\Modules\VerticalMenu;
 */

namespace DIFL\Server\Modules\VerticalMenu;


if (!defined('ABSPATH')) {
  die('Direct access forbidden.');
}

use ET\Builder\Framework\DependencyManagement\Interfaces\DependencyInterface;
use ET\Builder\Packages\ModuleLibrary\ModuleRegistration;
use DIFL\Server\Modules\VerticalMenu\VerticalMenuTraits;

/**
 * Class Vertical Menu
 *
 * @package DIFL\Server\Modules\VerticalMenu;
 */
class VerticalMenu implements DependencyInterface
{

  use VerticalMenuTraits\RenderCallbackTrait;
  use VerticalMenuTraits\ModuleClassnamesTrait;
  use VerticalMenuTraits\ModuleStylesTrait;
  use VerticalMenuTraits\ModuleScriptDataTrait;

  public function load()
  {
    $module_json_folder_path = DIFL_MODULES_JSON_PATH . '/vertical-menu';

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