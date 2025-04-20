<?php

namespace DIVIFLASH\Modules\ContentCarouselItem;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

use ET\Builder\Packages\Module\Module;
use ET\Builder\Framework\Utility\HTMLUtility;
use ET\Builder\FrontEnd\BlockParser\BlockParserStore;
use ET\Builder\Packages\IconLibrary\IconFont\Utils;
use ET\Builder\Packages\Module\Options\Element\ElementComponents;
use ET\Builder\Packages\ModuleLibrary\ModuleRegistration;
use ET\Builder\Packages\ModuleLibrary\Button\ButtonModuleUtils;
use DIVIFLASH\modules\ContentCarouselItem\ContentCarouselItem;

trait RenderCallback {
	
	use Styles;

	// Child module render callback which outputs server side rendered HTML on the Front-End.

	public static function render_callback( $attrs, $content, $block, $elements ) {
		$parent = BlockParserStore::get_parent( $block->parsed_block['id'], $block->parsed_block['storeInstance'] );

		$parent_attrs = $parent->attrs ?? [];
		// Icon. 
		$icon_value   = isset($attrs['useIcon']['decoration']['icon']['desktop']['value']) ? $attrs['useIcon']['decoration']['icon']['desktop']['value'] : '';
		$iconHasValue = isset($attrs['imageIcon']['innerContent']['desktop']['value']['useIcon']) ? $attrs['imageIcon']['innerContent']['desktop']['value']['useIcon']: 'off';
		
		// btn 
		$btn 	   =  isset($attrs['button']['innerContent']['desktop']['value'])?$attrs['button']['innerContent']['desktop']['value']:$attrs;
  		$linkTarget= (isset($btn['linkTarget']) && 'on' === $btn['linkTarget']) ? '_blank':'_self';
		$btnMarkup = isset($btn['text']) ?
				'<div class="df_cci_button_wrapper">
					<a href="'.$btn['linkUrl'].'" class="df_cci_button" target="'.$linkTarget.'">'.$btn['text'].'</a>
				</div>' : '';
		// Image
		$image 	   = $attrs['useImage']['innerContent']['items']['src']['desktop']['value'] ?? "";
		$imgSetAlt = $attrs['useImage']['innerContent']['items']['alt']['desktop']['value']['alt'] ?? "";
		$imgAltText= $imgSetAlt?:$image['alt'];
		
		$image_markup = "";
		if ( is_array($image) && !empty($image['src']) ) {
			$image_markup = HTMLUtility::render(
				[
					'tag'               => 'div',
					'childrenSanitizer' => 'et_core_esc_previously',
					'children'          => "<img src='{$image['src']}' alt='{$imgAltText}' title='{$image['titleText']}' />",
					'attributes'        => [
						'class'    => 'df_cci_image_container',
						'data-src' => $image['src'],
					],
				]
			);
		}

		if( !empty($icon_value) && $iconHasValue==='on'){
			$processIcon  = Utils::process_font_icon( $icon_value );
			$image_markup = '<div class="df_cci_image_container"><span class="et-pb-icon">'.$processIcon.'</span></div>';
		}

		// Title.
		$title = $elements->render(
			[
				'attrName'   => 'title',
				'attributes' => [
					'class' => 'df_cc_title',
				],
			]
		);

		// Sub Title.
		$subTitle = $elements->render(
			[
				'attrName'   => 'subTitle',
				'attributes' => [
					'class' => 'df_cc_subtitle',
				],
			]
		);

		// Content.
		$content = $elements->render(
			[
				'attrName'   => 'content',
				'tag'        => 'div',
				'attributes' => [
					'class' => 'df_cc_content',
				],
			]
		);
		
		$difl_content_carousel_item = '
			<div class="df_cci_container" data-src="'.$image['src'].'">
				' . $image_markup . '
				'.$title.'
				'.$subTitle.'
				' . $content . '
				' . $btnMarkup . '
			</div>
		';

		return Module::render(
			[
				// FE only.
				'orderIndex'         => $block->parsed_block['orderIndex'],
				'storeInstance'      => $block->parsed_block['storeInstance'],

				// VB equivalent.
				'id'                 => $block->parsed_block['id'],
				'name'               => $block->block_type->name,
				'moduleCategory'     => $block->block_type->category,
				'attrs'              => $attrs,
				'elements'           => $elements,
				'classnamesFunction' => [ self::class, 'classnames' ],
				'stylesComponent'    => [ self::class, 'styles' ],
				'parentAttrs'        => $parent_attrs,
				'parentId'           => $parent->id ?? '',
				'parentName'         => $parent->blockName ?? '',
				'children'           => ElementComponents::component(
					[
						'attrs'         => $attrs['module']['decoration'] ?? [],
						'id'            => $block->parsed_block['id'],

						// FE only.
						'orderIndex'    => $block->parsed_block['orderIndex'],
						'storeInstance' => $block->parsed_block['storeInstance'],
					]
				) .$difl_content_carousel_item,
			]
		);
	}
}