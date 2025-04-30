<?php
/**
 * All modules.
 *
 * @package DIVIFLASH5\Modules;
 */

namespace DIVIFLASH5\Modules;

if ( !defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

use DIVIFLASH5\Modules\AdvancedPerson\AdvancedPerson;
use DIVIFLASH5\Modules\ImageHover\ImageHover;
use DIVIFLASH5\Modules\ImageMask\ImageMask;
use DIVIFLASH5\Modules\TextReveal\TextReveal;
use DIVIFLASH5\Modules\VerticalMenu\VerticalMenu;

 * Register all modules with dependency tree.
 *
 * @package MEE\Modules
 * @since ??
 */
namespace DIFL\Modules;
namespace DIFL\D5\Modules;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

use DIFL\Modules\LogoShowcase\LogoShowcase;
use DIFL\Modules\ContentCarousel\ContentCarousel;
use DIFL\Modules\ContentCarouselItem\ContentCarouselItem;
use DIFL\D5\Modules\BentoGrid\BentoGrid;
use DIFL\D5\Modules\BentoGridItem\BentoGridItem;
use DIFL\D5\Modules\AdvancedButton\AdvancedButton;
use DIFL\D5\Modules\SocialShare\SocialShare;
use DIFL\D5\Modules\SocialShareItem\SocialShareItem;
use DIFL\D5\Modules\ImageReveal\ImageReveal;
use DIFL\D5\Modules\AvatarStack\AvatarStack;
use DIFL\D5\Modules\AvatarStackItem\AvatarStackItem;
use DIFL\D5\Modules\InlineContents\InlineContents;
use DIFL\D5\Modules\InlineContentsItem\InlineContentsItem;
use DIFL\D5\Modules\ACFGallery\ACFGallery;

add_action(
	'divi_module_library_modules_dependency_tree',
	function ( $dependency_tree ) {
    	$dependency_tree->add_dependency( new LogoShowcase() );
    	$dependency_tree->add_dependency( new ContentCarousel() );
    	$dependency_tree->add_dependency( new ContentCarouselItem() );

		$dependency_tree->add_dependency( new TextReveal() );
		$dependency_tree->add_dependency( new VerticalMenu() );
		$dependency_tree->add_dependency( new AdvancedPerson() );
		$dependency_tree->add_dependency( new ImageMask() );
		$dependency_tree->add_dependency(new ImageHover());
	}
);

		$dependency_tree->add_dependency( new BentoGrid() );
		$dependency_tree->add_dependency( new BentoGridItem() );
		$dependency_tree->add_dependency( new AdvancedButton() );
		$dependency_tree->add_dependency( new SocialShare() );
		$dependency_tree->add_dependency( new SocialShareItem() );
		$dependency_tree->add_dependency( new ImageReveal() );
		$dependency_tree->add_dependency( new AvatarStack() );
		$dependency_tree->add_dependency( new AvatarStackItem() );
		$dependency_tree->add_dependency( new InlineContents() );
		$dependency_tree->add_dependency( new InlineContentsItem() );
		$dependency_tree->add_dependency( new ACFGallery() );
	}
);
