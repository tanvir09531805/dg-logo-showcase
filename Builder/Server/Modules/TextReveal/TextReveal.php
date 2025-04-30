<?php
/**
 * TextReveal Module class.
 *
 * @package DIFL\Server\Modules\TextReveal;
 */

namespace DIFL\Server\Modules\TextReveal;

if ( ! defined( 'ABSPATH' ) ) {
    die( 'Direct access forbidden.' );
}

use ET\Builder\Framework\DependencyManagement\Interfaces\DependencyInterface;
use ET\Builder\Packages\ModuleLibrary\ModuleRegistration;
use DIFL\Server\Modules\TextReveal\TextRevealTraits;

/**
 * Class TextReveal
 *
 * @package DIFL\Server\Modules\TextReveal
 */
class TextReveal implements DependencyInterface {

  use TextRevealTraits\RenderCallbackTrait;
  use TextRevealTraits\ModuleClassnamesTrait;
  use TextRevealTraits\ModuleStylesTrait;
  use TextRevealTraits\ModuleScriptDataTrait;

  public function load() {
    $module_json_folder_path = DIFL_MODULES_JSON_PATH . '/text-reveal';

    add_action(
      'init',
      function() use ( $module_json_folder_path ) {
        ModuleRegistration::register_module(
          $module_json_folder_path,
          [
            'render_callback' => [ TextReveal::class, 'render_callback' ],
          ]
        );
      }
    );
  }
}