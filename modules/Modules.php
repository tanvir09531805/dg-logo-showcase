<?php
/**
 * Register all modules with dependency tree.
 *
 * @package MEE\Modules
 * @since ??
 */
namespace DIFL\Modules;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

use DIFL\Modules\LogoShowcase\LogoShowcase;
use DIFL\Modules\ContentCarousel\ContentCarousel;
use DIFL\Modules\ContentCarouselItem\ContentCarouselItem;

add_action(
	'divi_module_library_modules_dependency_tree',
	function ( $dependency_tree ) {
    	$dependency_tree->add_dependency( new LogoShowcase() );
    	$dependency_tree->add_dependency( new ContentCarousel() );
    	$dependency_tree->add_dependency( new ContentCarouselItem() );
	}
);
