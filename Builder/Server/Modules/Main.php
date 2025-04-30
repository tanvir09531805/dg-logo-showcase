<?php
namespace DIFL\Builder\Server\Modules;

use DIFL\Server\Modules\BusinessHours\BusinessHours;
use DIFL\Server\Modules\BusinessHoursItem\BusinessHoursItem;
use DIFL\Server\Modules\ContentCarousel\ContentCarousel;
use DIFL\Server\Modules\ContentCarouselItem\ContentCarouselItem;
use DIFL\Server\Modules\AdvancedHeading\AdvancedHeading;
use DIFL\Server\Modules\AdvancedPerson\AdvancedPerson;
use DIFL\Server\Modules\BentoGrid\BentoGrid;
use DIFL\Server\Modules\BentoGridItem\BentoGridItem;
use DIFL\Server\Modules\AdvancedButton\AdvancedButton;
use DIFL\Server\Modules\ImageHover\ImageHover;
use DIFL\Server\Modules\ImageMask\ImageMask;
use DIFL\Server\Modules\SocialShare\SocialShare;
use DIFL\Server\Modules\SocialShareItem\SocialShareItem;
use DIFL\Server\Modules\ImageReveal\ImageReveal;
use DIFL\Server\Modules\AvatarStack\AvatarStack;
use DIFL\Server\Modules\AvatarStackItem\AvatarStackItem;
use DIFL\Server\Modules\InlineContents\InlineContents;
use DIFL\Server\Modules\InlineContentsItem\InlineContentsItem;
use DIFL\Server\Modules\ACFGallery\ACFGallery;
use DIFL\Server\Modules\TextReveal\TextReveal;
use DIFL\Server\Modules\VerticalMenu\VerticalMenu;
class Main {
	public function __construct() {
		add_action( 'divi_module_library_modules_dependency_tree', [ $this, 'register_to_deps' ] );
	}

	public function register_to_deps( $dependency_tree ) {
		$dependency_tree->add_dependency( new ContentCarousel() );
		$dependency_tree->add_dependency( new ContentCarouselItem() );
    $dependency_tree->add_dependency( new BusinessHours() );
    $dependency_tree->add_dependency( new BusinessHoursItem() );
    $dependency_tree->add_dependency( new AdvancedHeading() );

		$dependency_tree->add_dependency( new TextReveal() );
		$dependency_tree->add_dependency( new VerticalMenu() );
		$dependency_tree->add_dependency( new AdvancedPerson() );
		$dependency_tree->add_dependency( new ImageMask() );
		$dependency_tree->add_dependency(new ImageHover());


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
}

new Main();