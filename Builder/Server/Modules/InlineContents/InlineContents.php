<?php
namespace DIFL\Server\Modules\InlineContents;

use ET\Builder\Framework\DependencyManagement\Interfaces\DependencyInterface;
use ET\Builder\Framework\Utility\HTMLUtility;
use ET\Builder\FrontEnd\BlockParser\BlockParserStore;
use ET\Builder\FrontEnd\Module\Style;
use ET\Builder\Packages\Module\Layout\Components\StyleCommon\CommonStyle;
use ET\Builder\Packages\Module\Module;
use ET\Builder\Packages\Module\Options\Css\CssStyle;
use ET\Builder\Packages\Module\Options\Element\ElementComponents;
use ET\Builder\Packages\ModuleLibrary\ModuleRegistration;
use ET\Builder\Packages\StyleLibrary\Utils\StyleDeclarations;

class InlineContents implements DependencyInterface {

	public static function styles( array $args ): void {
		$attrs    = $args['attrs'] ?? [];
		$elements = $args['elements'];
		$settings = $args['settings'] ?? [];


		Style::add(
			[
				'id'            => $args['id'],
				'name'          => $args['name'],
				'orderIndex'    => $args['orderIndex'],
				'storeInstance' => $args['storeInstance'],
				'styles'        => array_merge(
					[
						// Module.
						$elements->style(
							[
								'attrName'   => 'module',
								'styleProps' => [
									'disabledOn' => [
										'disabledModuleVisibility' => $settings['disabledModuleVisibility'] ?? null,
									],
								],
							]
						),

						/*--------  Content --------*/
						CommonStyle::style(
							[
								'selector'  => $args['orderClass'] . " .difl_inline_contents_container",
								'attr'      => $attrs['content_main']['decoration']['column_gap'] ?? [],
								'property'  => "column-gap",
							]
						),
						CommonStyle::style(
							[
								'selector'  => $args['orderClass'] . " .difl_inline_contents_container",
								'attr'      => $attrs['content_main']['decoration']['row_gap'] ?? [],
								'property'  => "row-gap",
							]
						),

						/*--------   Alignment --------*/
						CommonStyle::style(
							[
								'selector'  => $args['orderClass'] . " .difl_inline_contents_container",
								'attr'      => $attrs['alignment']['decoration']['content_alignment'] ?? [],
								'property'  => "justify-content",
							]
						),
						CommonStyle::style(
							[
								'selector'  => $args['orderClass'] . " .difl_inline_contents_container",
								'attr'      => $attrs['alignment']['decoration']['items_position'] ?? [],
								'property'  => "align-items",
							]
						),

						/*----- Text -----*/
						$elements->style( [ 'attrName' => 'design_child_text', ] ),
						CommonStyle::style(
							[
								'selector'  => "{$args['orderClass']} .difl_inline_contents_container .difl_inline_contents_item.difl_inline_content_text",
								'attr'      => $attrs['design_child_text']['decoration']['text_bg_color'] ?? [],
								'property'  => 'background-color',
							]
						),


						/*----- Icon -----*/
						$elements->style( [ 'attrName' => 'design_child_icon', ] ),
						CommonStyle::style(
							[
								'selector'  => "{$args['orderClass']} .difl_inline_contents_container .difl_inline_contents_item.difl_inline_content_icon",
								'attr'      => $attrs['design_child_icon']['decoration']['icon_bg_color'] ?? [],
								'property'  => 'background-color',
							]
						),

						/*----- Image -----*/
						$elements->style( [ 'attrName' => 'design_child_media', ] ),
						CommonStyle::style(
							[
								'selector'  => "{$args['orderClass']} .difl_inline_contents_container .difl_inline_contents_item:has( .difl_inline_content_image )",
								'attr'      => $attrs['design_child_media']['decoration']['media_bg_color'] ?? [],
								'property'  => 'background-color',
							]
						),
						CommonStyle::style(
							[
								'selector'  => "{$args['orderClass']} .difl_inline_contents_container .difl_inline_contents_item .difl_inline_content_image",
								'attr'      => $attrs['design_child_media']['decoration']['media_size'] ?? [],
								'property'  => 'width',
							]
						),

						// Module - Only for Custom CSS.
						CssStyle::style(
							[
								'selector' => $args['orderClass'],
								'attr'     => $attrs['css'] ?? [],
							]
						),
					],
					[]
				),
			]
		);
	}

	public static function render_callback( $attrs, $content, $block, $elements ) {

		$children_ids = $block->parsed_block['innerBlocks'] ? array_map(
			function ( $inner_block ) {
				return $inner_block['id'];
			},
			$block->parsed_block['innerBlocks']
		) : [];

		$parent       = BlockParserStore::get_parent( $block->parsed_block['id'], $block->parsed_block['storeInstance'] );
		$parent_attrs = $parent->attrs ?? [];



		$child_items = HTMLUtility::render(
			[
				'tag'               => $attrs['content_main']['innerContent']['main_wrapper_tag']['desktop']['value'] ?? "div",
				'attributes'        => [
					'class'         => 'difl_inline_contents_container',
					'id'            => 'difl-inline-contents-container'
				],
				'childrenSanitizer' => 'et_core_esc_previously',
				'children'          => $content,
			]
		);


		return Module::render(
			[
				// FE only.
				'orderIndex'          => $block->parsed_block['orderIndex'],
				'storeInstance'       => $block->parsed_block['storeInstance'],

				// VB equivalent.
				'attrs'               => $attrs,
				'elements'            => $elements,
				'id'                  => $block->parsed_block['id'],
				'name'                => $block->block_type->name,
//				'moduleClassName'     => '',
				'moduleCategory'      => $block->block_type->category,
				'hasModuleClassName'  => true,   // Add or remove et_pb_module class
//				'classnamesFunction'  => [ self::class, 'classnames' ],
//				'scriptDataComponent' => [ self::class, 'script_data' ],
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
					) . $child_items,
				'childrenIds'         => $children_ids,
			]
		);
	}

	public function load() {
//		add_filter( 'divi_conversion_presets_attrs_map', array(
//			SocialShareItemPresetAttrsMap::class,
//			'get_map'
//		), 10, 2 );

		add_action(
			'init',
			function () {
				ModuleRegistration::register_module(
					DIFL_MODULES_JSON_PATH . 'inline-contents/',
					[
						'render_callback' => [ self::class, 'render_callback' ],
					]
				);
			}
		);
	}
}
