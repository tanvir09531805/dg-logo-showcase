<?php
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

    // echo '<pre>';
    // var_dump($attrs['title_on_off']);
    // echo '</pre>';

		$title_on_off = isset($attrs['title_on_off']['innerContent']['desktop']['value'])?$attrs['title_on_off']['innerContent']['desktop']['value']:"off";
		$title_text = isset($attrs['heading_title_text']['innerContent']['desktop']['value'])?$attrs['heading_title_text']['innerContent']['desktop']['value']:"";
		
    $heading_title = ('on' === $title_on_off) ? '<div class="df_bh_header"><h2 class="df_bh_title"> '.$title_text.'</h2></div>' : '';

		$child_items = HTMLUtility::render(
			[
				'tag'               => 'div',
				'attributes'        => [
					'class'  => 'difl_businesshoursitem',
				],
				'childrenSanitizer' => 'et_core_esc_previously',
				'children'          => $content,
			]
		);

		$child_all_items = sprintf('
      <div class="df_bh_container">
        <div class="df_bh_wrapper">
          %1$s
          %2$s
        </div>
      </div>
      ',
			$heading_title,
			$child_items
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