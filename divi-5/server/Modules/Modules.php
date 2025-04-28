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

use DIFL\Modules\BusinessHours\BusinessHours;
use DIFL\Modules\BusinessHoursItem\BusinessHoursItem;
use DIFL\Modules\LogoShowcase\LogoShowcase;
use DIFL\Modules\ContentCarousel\ContentCarousel;
use DIFL\Modules\ContentCarouselItem\ContentCarouselItem;
use DIFL\Modules\AdvancedHeading\AdvancedHeading;

add_action(
	'divi_module_library_modules_dependency_tree',
	function ( $dependency_tree ) {
    	$dependency_tree->add_dependency( new LogoShowcase() );
    	$dependency_tree->add_dependency( new ContentCarousel() );
    	$dependency_tree->add_dependency( new ContentCarouselItem() );
    	$dependency_tree->add_dependency( new BusinessHours() );
    	$dependency_tree->add_dependency( new BusinessHoursItem() );
    	$dependency_tree->add_dependency( new AdvancedHeading() );
	}
);
