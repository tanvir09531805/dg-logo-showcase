<?php

namespace DIFL\Modules\ContentCarousel;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

use ET\Builder\FrontEnd\BlockParser\BlockParserStore;
use ET\Builder\Packages\Module\Module;
use ET\Builder\Packages\Module\Options\Element\ElementComponents;
use ET\Builder\Framework\Utility\HTMLUtility;
use DIFL\modules\ContentCarousel\ContentCarousel;

trait RenderCallback {
	use Classnames;
	use Styles;
	use ScriptData;

	public static function render_callback( $attrs, $content, $block, $elements ) {
		$children_ids = $block->parsed_block['innerBlocks'] ? array_map(
			function( $inner_block ) {
				return $inner_block['id'];
			},
			$block->parsed_block['innerBlocks']
		) : [];

		$parent       = BlockParserStore::get_parent( $block->parsed_block['id'], $block->parsed_block['storeInstance'] );
		$parent_attrs = $parent->attrs ?? [];

		// process data
		$order_number    = $block->parsed_block['orderIndex'];
		$arrowNavigation = $attrs['arrowNavigation']['advanced']['show']['desktop']['value']?"on":"off";
		$dotNavigation   = $attrs['dotNavigation']['advanced']['show']['desktop']['value']?"on":"off";

		$ccData = $attrs['settingCarousel']['innerContent'];
		$loop   = isset($ccData['desktop']['value']['loop']) && $ccData['desktop']['value']['loop'] === 'on' ? true : false; 
		$speed  = isset($ccData['desktop']['value']['speed']) ? $ccData['desktop']['value']['speed'] : '500';
		$carouselType 	= isset($ccData['desktop']['value']['carouselType']) ? $ccData['desktop']['value']['carouselType']: 'slide'; // coverflow
		$maxSlideDesktop= isset($ccData['desktop']['value']['maxSlide']) ? $ccData['desktop']['value']['maxSlide'] : '3';
		$maxSlideTablet = isset($ccData['tablet']['value']['maxSlide']) ? $ccData['tablet']['value']['maxSlide'] : $maxSlideDesktop;
		$maxSlidePhone  = isset($ccData['phone']['value']['maxSlide']) ? $ccData['phone']['value']['maxSlide'] : $maxSlideTablet; 
		$centerSlides 	= isset($ccData['desktop']['value']['centerSlides']) ? $ccData['desktop']['value']['centerSlides']: 'off'; 
		$useLightbox 	= isset($ccData['desktop']['value']['useLightbox']) ? $ccData['desktop']['value']['useLightbox'] : 'off'; 
		$titleLightbox  = isset($ccData['desktop']['value']['showTitleOnLightbox']) ? $ccData['desktop']['value']['showTitleOnLightbox'] : 'off';

		$auto_play = isset($ccData['desktop']['value']['autoplay']) ? $ccData['desktop']['value']['autoplay'] : 'off';
		$autoplay_tablet = isset($ccData['tablet']['value']['autoplay']) ? $ccData['tablet']['value']['autoplay'] : $auto_play;
		$autoplay_phone = isset($ccData['phone']['value']['autoplay']) ? $ccData['phone']['value']['autoplay'] : $auto_play;

		$pause_hover = isset($ccData['desktop']['value']['pauseOnHover']) ? $ccData['desktop']['value']['pauseOnHover'] : 'off';
		$pause_hover_tablet = isset($ccData['tablet']['value']['pauseOnHover']) ? $ccData['tablet']['value']['pauseOnHover'] : $pause_hover;
		$pause_hover_phone = isset($ccData['phone']['value']['pauseOnHover']) ? $ccData['phone']['value']['pauseOnHover'] : $pause_hover_tablet;

		$auto_delay = isset($ccData['desktop']['value']['autoplaySpeed']) ? $ccData['desktop']['value']['autoplaySpeed'] : '2000';
		$auto_delay_tablet = isset($ccData['tablet']['value']['autoplaySpeed']) ? $ccData['tablet']['value']['autoplaySpeed'] : $auto_delay;
		$auto_delay_phone = isset($ccData['phone']['value']['autoplaySpeed']) ? $ccData['phone']['value']['autoplaySpeed'] : $auto_delay_tablet;

		$item_spacing = isset($ccData['desktop']['value']['spacingPx']) ? $ccData['desktop']['value']['spacingPx'] : '30';
		$item_spacing_tablet = isset($ccData['tablet']['value']['spacingPx']) ? $ccData['tablet']['value']['spacingPx'] : $item_spacing;
		$item_spacing_phone = isset($ccData['phone']['value']['spacingPx']) ? $ccData['phone']['value']['spacingPx'] : $item_spacing_tablet;

		$difl_cc_dots  = '<div class="swiper-pagination cc-dots-'.$order_number.'"></div>';
		$difl_cc_arrow = '<div class="df_cc_arrows">
                <div class="swiper-button-next cc-next-'.$order_number.'" data-icon="5"></div>
                <div class="swiper-button-prev cc-prev-'.$order_number.'" data-icon="4"></div>
            </div>';
			// arrows.advanced.arrowPosition
		$classArrowPosition = 'arrow-middle';
		$equalHeightItem    = $ccData['desktop']['value']['equalHeightItem'] ?? 'off'; 
		
		if (isset($attrs['arrows']['advanced']['desktop']['value']['arrowPosition'])) {
			$classArrowPosition = 'arrow-'.$attrs['arrows']['advanced']['desktop']['value']['arrowPosition'];
		}

		if (isset($attrs['arrows']['advanced']['desktop']['value']['arrowAlignment'])) {
			$arrowAlignment = $attrs['arrows']['advanced']['desktop']['value']['arrowAlignment'];
		}else{
			$arrowAlignment = 'space-between';
		}
		
        $carouselSetting = [
            'effect' => $carouselType, // $this->props['carousel_type'],
            'desktop' => $maxSlideDesktop,
            'tablet' => $maxSlideTablet,
            'mobile' => $maxSlidePhone,
            'loop' => $loop,
            'item_spacing' => $item_spacing,
            'item_spacing_tablet' => $item_spacing_tablet,
            'item_spacing_phone' => $item_spacing_phone,
            'arrow' => $arrowNavigation,
            'dots' => $dotNavigation,
            'autoplay' => $auto_play,
            'autoplay_tablet' => $autoplay_tablet,
            'autoplay_phone' => $autoplay_phone,
            'auto_delay' => $auto_delay,
            'auto_delay_tablet' => $auto_delay_tablet,
            'auto_delay_phone' => $auto_delay_phone,
            'speed' => $speed,
            'pause_hover' => $pause_hover,
            'pause_hover_tablet' => $pause_hover_tablet,
            'pause_hover_phone' => $pause_hover_phone,
            'centeredSlides' => $centerSlides,
            'order' => $order_number,
            'use_lightbox' => $useLightbox,
            'use_lightbox_title' => $titleLightbox
        ];

		if ($carouselType === 'coverflow') {
			
			$ccAdvancedData = $attrs['addSettingCarousel']['innerContent'];
			$slideShadows   = isset($ccAdvancedData['desktop']['value']['slideShadows']) ? $ccAdvancedData['desktop']['value']['slideShadows'] : 'off';
			$rotateInDegrees= isset($ccAdvancedData['desktop']['value']['rotateInDegrees']) ? $ccAdvancedData['desktop']['value']['rotateInDegrees'] : '30';
			$stretchDepth   = isset($ccAdvancedData['desktop']['value']['stretchDepth']) ? $ccAdvancedData['desktop']['value']['stretchDepth'] : '20';
			$spaceBetween   = isset($ccAdvancedData['desktop']['value']['spaceBetween']) ? $ccAdvancedData['desktop']['value']['spaceBetween'] : '16';
			$effectMultipler= isset($ccAdvancedData['desktop']['value']['effectMultipler']) ? $ccAdvancedData['desktop']['value']['effectMultipler'] : '3';

            $carouselSetting['slideShadows'] = $slideShadows;
            $carouselSetting['rotate'] = $rotateInDegrees;
            $carouselSetting['stretch'] = $spaceBetween;
            $carouselSetting['depth'] = $stretchDepth;
            $carouselSetting['modifier'] = $effectMultipler;
        }

		$child_items = HTMLUtility::render(
			[
				'tag'               => 'div',
				'attributes'        => [
					'class'  => 'swiper-wrapper',
				],
				'childrenSanitizer' => 'et_core_esc_previously',
				'children'          => $content,
			]
		);

		$child_all_items = sprintf('<div class="df_cc_container %8$s" data-settings=\'%1$s\' data-item="%2$s" data-itemtablet="%3$s" data-itemphone="%4$s" >
                <div class="df_cc_inner_wrapper">
                    <div class="swiper-container">
						%5$s
                    </div>
					%6$s 
                </div>
					%7$s 
            </div>',
			wp_json_encode($carouselSetting),
			$maxSlideDesktop,
			$maxSlideTablet,
			$maxSlidePhone,
			$child_items,
			$difl_cc_arrow,
			$difl_cc_dots,
			$classArrowPosition
		);

		self::register_divi_assets();

		return Module::render(
			[
				// FE only.
				'orderIndex'          => $block->parsed_block['orderIndex'],
				'storeInstance'       => $block->parsed_block['storeInstance'],

				// VB equivalent.
				'id'                  => $block->parsed_block['id'],
				'name'                => $block->block_type->name,
				'moduleCategory'      => $block->block_type->category,
				'attrs'               => $attrs,
				'elements'            => $elements,
				'classnamesFunction'  => [ self::class, 'classnames' ],
				'scriptDataComponent' => [ self::class, 'script_data' ],
				'stylesComponent'     => [ self::class, 'styles' ],
				'parentAttrs'         => $parent_attrs,
				'parentId'            => $parent->id ?? '',
				'parentName'          => $parent->blockName ?? '',
				'children'            => ElementComponents::component(
						[
							'attrs'         => $attrs['module']['decoration'] ?? [],
							'id'            => $block->parsed_block['id'],

							// FE only.
							'orderIndex'    => $block->parsed_block['orderIndex'],
							'storeInstance' => $block->parsed_block['storeInstance'],
						]
					) . $child_all_items,
				'childrenIds'         => $children_ids,
			]
		);
	}
	
	public static function difl_load_required_divi_assets( $assets_list, $assets_args, $instance  ) {
	   
		$temp_url	  = get_template_directory_uri();
 		$icons_all 	  = $temp_url."/includes/builder/feature/dynamic-assets/assets/css/icons_all.css";
 		$icons_fa_all = $temp_url."/includes/builder/feature/dynamic-assets/assets/css/icons_fa_all.css";
 	
 		if ( ! isset( $assets_list['et_icons_all'] ) ) {
 			$assets_list['et_icons_all'] = [
 				'css' => $icons_all,
 			];
 		}
 
 		if ( ! isset( $assets_list['et_icons_fa'] ) ) {
 			$assets_list['et_icons_fa'] = [
 				'css' => $icons_fa_all,
 			];
 		}

		return $assets_list;
	}

	// Register the required Divi assets dynamically.
	public static function register_divi_assets() {
		
		add_filter(
			'divi_frontend_assets_dynamic_assets_global_assets_list',
			[ self::class, 'difl_load_required_divi_assets' ],
			10,
			3
		);
		add_filter(
			'divi_frontend_assets_dynamic_assets_late_global_assets_list',
			[ self::class, 'difl_load_required_divi_assets' ],
			10,
			3
		);
	}
}
