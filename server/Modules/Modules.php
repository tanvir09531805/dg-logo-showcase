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

use DIVIFLASH5\Modules\ScrollTextReveal\ScrollTextReveal;
use DIVIFLASH5\Modules\VerticalMenu\VerticalMenu;

add_action(
    'divi_module_library_modules_dependency_tree',
    function( $dependency_tree ) {
        $dependency_tree->add_dependency( new ScrollTextReveal() );
        $dependency_tree->add_dependency( new VerticalMenu() );
    }
);