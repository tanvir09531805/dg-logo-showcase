<?php

// set NODE_ENV=development&& webpack -w --config webpack.config.js --progress
// "cross-env": "^7.0.3", || "devDependencies"

namespace DIFL\Modules\BusinessHours;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

use ET\Builder\FrontEnd\BlockParser\BlockParserStore;
use ET\Builder\Packages\Module\Module;
use ET\Builder\Packages\Module\Options\Element\ElementComponents;
use ET\Builder\Framework\Utility\HTMLUtility;
trait RenderCallback {
	use Classnames;
	use Styles;
	use Script;

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
		
		$difl_cc_dots  = '<div class="swiper-pagination cc-dots-'.$order_number.'"></div>';

		$child_items = HTMLUtility::render(
			[
				'tag'               => 'div',
				'attributes'        => [
					'class'  => 'item-wrapper',
				],
				'childrenSanitizer' => 'et_core_esc_previously',
				'children'          => $content,
			]
		);

		$child_all_items = sprintf('<div class="df_container">
        %1$s
        %2$s
      </div>',
			$child_items,
			$difl_cc_dots
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
				'scriptDataComponent' => [ self::class, 'script' ],
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