<?php

namespace DIVIFLASH\Modules\ContentCarousel\Traits;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

// phpcs:disable ET.Sniffs.ValidVariableName.UsedPropertyNotSnakeCase -- WP use snakeCase in \WP_Block_Parser_Block

use ET\Builder\FrontEnd\BlockParser\BlockParserStore;
use ET\Builder\Packages\Module\Module;
use ET\Builder\Packages\Module\Options\Element\ElementComponents;
use ET\Builder\Framework\Utility\HTMLUtility;
use DIVIFLASH\modules\ContentCarousel\ContentCarousel;

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

		// $order_number    = str_replace('_', '', str_replace($this->slug, '', $order_class));
		$order_number  = $block->parsed_block['orderIndex'];

		$arrowNavigation = $attrs['arrowNavigation']['advanced']['show']['desktop']['value']?"on":"off";
		$dotNavigation = $attrs['dotNavigation']['advanced']['show']['desktop']['value']?"on":"off";

		$ccData = $attrs['settingCarousel']['innerContent'];
		$loop   = isset($ccData['loop']['desktop']['value']['loop']) && $ccData['loop']['desktop']['value']['loop'] === 'on' ? true : false; 
		$speed  = isset($ccData['speed']['desktop']['value']['speed']) ? $ccData['speed']['desktop']['value']['speed'] : '500';
		$carouselType 	= isset($ccData['carouselType']['desktop']['value']['carouselType']) ? $ccData['carouselType']['desktop']['value']['carouselType']: 'slide'; // coverflow
		$maxSlideDesktop= isset($ccData['maxSlide']['desktop']['value']['maxSlide']) ? $ccData['maxSlide']['desktop']['value']['maxSlide'] : '3';
		$maxSlideTablet = isset($ccData['maxSlide']['tablet']['value']['maxSlide']) ? $ccData['maxSlide']['tablet']['value']['maxSlide'] : $maxSlideDesktop;
		$maxSlidePhone  = isset($ccData['maxSlide']['phone']['value']['maxSlide']) ? $ccData['maxSlide']['phone']['value']['maxSlide'] : $maxSlideTablet; 
		$centerSlides 	= isset($ccData['centerSlides']['desktop']['value']['centerSlides']) ? $ccData['centerSlides']['desktop']['value']['centerSlides']: 'off'; 
		$useLightbox 	= isset($ccData['useLightbox']['desktop']['value']['useLightbox']) ? $ccData['useLightbox']['desktop']['value']['useLightbox'] : 'off'; 
		$titleLightbox  = isset($ccData['showTitleOnLightbox']['desktop']['value']['showTitleOnLightbox']) ? $ccData['showTitleOnLightbox']['desktop']['value']['showTitleOnLightbox'] : 'off';

		$auto_play = isset($ccData['autoplay']['desktop']['value']['autoplay']) ? $ccData['autoplay']['desktop']['value']['autoplay'] : 'off';
		$autoplay_tablet = isset($ccData['autoplay']['tablet']['value']['autoplay']) ? $ccData['autoplay']['tablet']['value']['autoplay'] : $auto_play;
		$autoplay_phone = isset($ccData['autoplay']['phone']['value']['autoplay']) ? $ccData['autoplay']['phone']['value']['autoplay'] : $auto_play;

		$pause_hover = isset($ccData['pauseOnHover']['desktop']['value']['pauseOnHover']) ? $ccData['pauseOnHover']['desktop']['value']['pauseOnHover'] : 'off';
		$pause_hover_tablet = isset($ccData['pauseOnHover']['tablet']['value']['pauseOnHover']) ? $ccData['pauseOnHover']['tablet']['value']['pauseOnHover'] : $pause_hover;
		$pause_hover_phone = isset($ccData['pauseOnHover']['phone']['value']['pauseOnHover']) ? $ccData['pauseOnHover']['phone']['value']['pauseOnHover'] : $pause_hover_tablet;

		$auto_delay = isset($ccData['autoplaySpeed']['desktop']['value']['autoplaySpeed']) ? $ccData['autoplaySpeed']['desktop']['value']['autoplaySpeed'] : '2000';
		$auto_delay_tablet = isset($ccData['autoplaySpeed']['tablet']['value']['autoplaySpeed']) ? $ccData['autoplaySpeed']['tablet']['value']['autoplaySpeed'] : $auto_delay;
		$auto_delay_phone = isset($ccData['autoplaySpeed']['phone']['value']['autoplaySpeed']) ? $ccData['autoplaySpeed']['phone']['value']['autoplaySpeed'] : $auto_delay_tablet;

		$item_spacing = isset($ccData['spacingPx']['desktop']['value']['spacingPx']) ? $ccData['spacingPx']['desktop']['value']['spacingPx'] : '30';
		$item_spacing_tablet = isset($ccData['spacingPx']['tablet']['value']['spacingPx']) ? $ccData['spacingPx']['tablet']['value']['spacingPx'] : $item_spacing;
		$item_spacing_phone = isset($ccData['spacingPx']['phone']['value']['spacingPx']) ? $ccData['spacingPx']['phone']['value']['spacingPx'] : $item_spacing_tablet;

		$difl_cc_dots  = '<div class="swiper-pagination cc-dots-0"></div>';
		$difl_cc_arrow = '<div class="df_cc_arrows">
                <div class="swiper-button-next cc-next-0" data-icon="5"></div>
                <div class="swiper-button-prev cc-prev-0" data-icon="4"></div>
            </div>';
			// arrows.advanced.arrowPosition
		$classArrowPosition = 'arrow-middle';
		$equalHeightItem    = $ccData['equalHeightItem']['desktop']['value']['equalHeightItem'] ?? 'off'; 
		
		if (isset($attrs['arrows']['advanced']['arrowPosition']['desktop']['value']['arrowPosition'])) {
			$classArrowPosition = 'arrow-'.$attrs['arrows']['advanced']['arrowPosition']['desktop']['value']['arrowPosition'];
		}

		if (isset($attrs['arrows']['advanced']['arrowAlignment']['desktop']['value']['arrowAlignment'])) {
			$arrowAlignment = $attrs['arrows']['advanced']['arrowAlignment']['desktop']['value']['arrowAlignment'];
		}else{
			$arrowAlignment = 'space-between';
		}
		echo '<pre>';
			var_dump($attrs['arrows']['advanced']['circleArrow']);
		echo '</pre>';

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

		// attrs.addSettingCarousel?.innerContent?.slideShadows.desktop?.value?.slideShadows
		

		if ($carouselType === 'coverflow') {
			$ccAdvancedData = $attrs['addSettingCarousel']['innerContent'];
			$slideShadows   = isset($ccAdvancedData['slideShadows']['desktop']['value']['slideShadows']) ? $ccAdvancedData['slideShadows']['desktop']['value']['slideShadows'] : 'off';
			$rotateInDegrees   = isset($ccAdvancedData['rotateInDegrees']['desktop']['value']['rotateInDegrees']) ? $ccAdvancedData['rotateInDegrees']['desktop']['value']['rotateInDegrees'] : '30';
			$stretchDepth   = isset($ccAdvancedData['stretchDepth']['desktop']['value']['stretchDepth']) ? $ccAdvancedData['stretchDepth']['desktop']['value']['stretchDepth'] : '20';
			$spaceBetween   = isset($ccAdvancedData['spaceBetween']['desktop']['value']['spaceBetween']) ? $ccAdvancedData['spaceBetween']['desktop']['value']['spaceBetween'] : '16';
			$effectMultipler   = isset($ccAdvancedData['effectMultipler']['desktop']['value']['effectMultipler']) ? $ccAdvancedData['effectMultipler']['desktop']['value']['effectMultipler'] : '3';

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

		
		// data-my="{&quot;effect&quot;:&quot;coverflow&quot;,&quot;desktop&quot;:&quot;5&quot;,&quot;tablet&quot;:&quot;3&quot;,&quot;mobile&quot;:&quot;1&quot;,&quot;loop&quot;:true,&quot;item_spacing&quot;:&quot;30px&quot;,&quot;item_spacing_tablet&quot;:&quot;30px&quot;,&quot;item_spacing_phone&quot;:&quot;30px&quot;,&quot;arrow&quot;:&quot;on&quot;,&quot;dots&quot;:&quot;on&quot;,&quot;autoplay&quot;:&quot;off&quot;,&quot;autoplay_tablet&quot;:&quot;off&quot;,&quot;autoplay_phone&quot;:&quot;off&quot;,&quot;auto_delay&quot;:&quot;2000&quot;,&quot;auto_delay_tablet&quot;:&quot;2000&quot;,&quot;auto_delay_phone&quot;:&quot;2000&quot;,&quot;speed&quot;:&quot;500&quot;,&quot;pause_hover&quot;:&quot;off&quot;,&quot;pause_hover_tablet&quot;:&quot;off&quot;,&quot;pause_hover_phone&quot;:&quot;off&quot;,&quot;centeredSlides&quot;:&quot;off&quot;,&quot;order&quot;:&quot;0&quot;,&quot;use_lightbox&quot;:&quot;on&quot;,&quot;use_lightbox_title&quot;:&quot;off&quot;,&quot;slideShadows&quot;:&quot;on&quot;,&quot;rotate&quot;:&quot;30&quot;,&quot;stretch&quot;:&quot;20&quot;,&quot;depth&quot;:&quot;16&quot;,&quot;modifier&quot;:&quot;3&quot;}"
				
		
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
}
