<?php
/**
 * All modules.
 *
 * @package DIVIFLASH5\Modules;
 */

namespace DIVIFLASH5\Modules;

if ( ! defined( 'ABSPATH' ) ) {
  die( 'Direct access forbidden.' );
}

use DIFL\Server\Modules\ScrollTextReveal\ScrollTextReveal;
use DIFL\Server\Modules\VerticalMenu\VerticalMenu;

add_action(
    'divi_module_library_modules_dependency_tree',
    function( $dependency_tree ) {
        $dependency_tree->add_dependency( new ScrollTextReveal() );
        $dependency_tree->add_dependency( new VerticalMenu() );
    }
);