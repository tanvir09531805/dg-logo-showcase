<?php

namespace DIFL\Modules\BusinessHoursItem;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

use ET\Builder\Packages\Module\Module;
use ET\Builder\Framework\Utility\HTMLUtility;
use ET\Builder\FrontEnd\BlockParser\BlockParserStore;
use ET\Builder\Packages\IconLibrary\IconFont\Utils;
use ET\Builder\Packages\Module\Options\Element\ElementComponents;

trait RenderCallback {
	
	use Styles;

	// Child module render callback which outputs server side rendered HTML on the Front-End.

	public static function render_callback( $attrs, $content, $block, $elements ) {
		$parent = BlockParserStore::get_parent( $block->parsed_block['id'], $block->parsed_block['storeInstance'] );

		$parent_attrs = $parent->attrs ?? [];
    
		// Title.
		$day_name = $elements->render(
			[
				'attrName'   => 'day_name',
				'attributes' => [
					'class' => 'df_bh_title',
				],
			]
		);

    // echo '<pre>';
    // var_dump($attrs['off_day_enable']['innerContent']['desktop']['value']);
    // echo '</pre>';

    $day_tiem_separator_on = $attrs['on_separator_day_time']['innerContent']['desktop']['value'] === 'on' ? 'day_tiem_separator_on' : '';
    $offDayClass = $attrs['off_day_enable']['innerContent']['desktop']['value'] === 'on' ? 'off_day_true' : '';
    
		$difl_content_carousel_item = '
			<div class="'.$day_tiem_separator_on.' df_bh_item '.$offDayClass.'">
				'.$day_name.'
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