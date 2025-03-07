<?php
/**
 * Register all modules with dependency tree.
 *
 * @package MEE\Modules
 * @since ??
 */
namespace DIVIFLASH\Modules;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

use DIVIFLASH\Modules\BentoGrid\BentoGrid;
use DIVIFLASH\Modules\BentoGridItem\BentoGridItem;

add_action(
	'divi_module_library_modules_dependency_tree',
	function ( $dependency_tree ) {
		$dependency_tree->add_dependency( new BentoGrid() );
		$dependency_tree->add_dependency( new BentoGridItem() );
	}
);
