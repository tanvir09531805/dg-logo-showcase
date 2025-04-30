<?php

namespace DIFL\D5\Modules\SocialShare;

use DIFL\D5\Helper\Styles;
use ET\Builder\Framework\DependencyManagement\Interfaces\DependencyInterface;
use ET\Builder\Framework\Utility\HTMLUtility;
use ET\Builder\FrontEnd\BlockParser\BlockParserStore;
use ET\Builder\FrontEnd\Module\Style;
use ET\Builder\Packages\IconLibrary\IconFont\Utils;
use ET\Builder\Packages\Module\Layout\Components\MultiView\MultiViewScriptData;
use ET\Builder\Packages\Module\Layout\Components\StyleCommon\CommonStyle;
use ET\Builder\Packages\Module\Module;
use ET\Builder\Packages\Module\Options\Css\CssStyle;
use ET\Builder\Packages\Module\Options\Element\ElementComponents;
use ET\Builder\Packages\ModuleLibrary\ModuleRegistration;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

class SocialShare implements DependencyInterface {

	public static function custom_css() {
		return \WP_Block_Type_Registry::get_instance()->get_registered( 'difl/social-share' )->customCssFields;
	}

	public static function styles( $args ) {
		$attrs    = $args['attrs'] ?? [];
		$elements = $args['elements'];
		$settings = $args['settings'] ?? [];

		$column_template_ref = [
			'auto'  => [
				'gap'       => '10px',
				'display'   => 'inline-flex',
				'flex-wrap' => 'wrap'
			],
			'one'   => [
				'display'               => 'grid',
				'grid-template-columns' => 'repeat(1, 1fr)'
			],
			'two'   => [
				'display'               => 'grid',
				'grid-template-columns' => 'repeat(2, 1fr)'
			],
			'three' => [
				'display'               => 'grid',
				'grid-template-columns' => 'repeat(3, 1fr)'
			],
			'four'  => [
				'display'               => 'grid',
				'grid-template-columns' => 'repeat(4, 1fr)'
			],
			'five'  => [
				'display'               => 'grid',
				'grid-template-columns' => 'repeat(5, 1fr)'
			],
			'six'   => [
				'display'               => 'grid',
				'grid-template-columns' => 'repeat(6, 1fr)'
			]
		];

		$column_view = $attrs['settings']['innerContent']['column_view']['desktop']['value'] ?? 'auto';

		$css_key = 'justify-content';
		if ( in_array( $attrs['icon']['decoration']['icon_position']['desktop']['value'], [
			'column',
			'column-reverse'
		] ) ) {
			$css_key = 'align-items';
		}

		// Icon Custom Padding
		$icon_custom_padding       = $attrs['icon']['decoration']['spacing']['desktop']['value']['padding'] ?? null;
		$use_header_icon_font_size = $attrs['header']['innerContent']['desktop']['value']['use_header_icon_font_size'] ?? "off";

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

						$elements->style( [ 'attrName' => 'settings', ] ),
						$elements->style( [ 'attrName' => 'header', ] ),
						$elements->style( [ 'attrName' => 'header_title', ] ),
						$elements->style( [ 'attrName' => 'header_sub_title', ] ),
						$elements->style( [ 'attrName' => 'header_container', ] ),
						$elements->style( [ 'attrName' => 'icon', ] ),
						$elements->style( [ 'attrName' => 'label', ] ),
						$elements->style( [ 'attrName' => 'label_container', ] ),


						Styles::custom_style( [
							'attr'                   => $attrs['settings']['innerContent'] ?? [],
							'selector'               => $args['orderClass'] . " #difl-social-share-container.difl__social_share__container",
							'staticPropertyAndValue' => $column_template_ref[ $column_view ]
						] ),

						CommonStyle::style(
							[
								'selector' => $args['orderClass'] . " #difl-social-share-container.difl_social_share_container",
								'attr'     => $attrs['settings']['decoration']['columns_gap'] ?? [],
								'property' => 'column-gap',
							]
						),
						CommonStyle::style(
							[
								'selector' => $args['orderClass'] . " #difl-social-share-container.difl_social_share_container",
								'attr'     => $attrs['settings']['decoration']['rows_gap'] ?? [],
								'property' => 'row-gap',
							]
						),
						CommonStyle::style(
							[
								'selector' => $args['orderClass'] . " #difl-social-share-container.difl_social_share_container .difl_social_share_item_wrapper",
								'attr'     => $attrs['settings']['decoration']['button_height'] ?? [],
								'property' => 'height',
							]
						),

						( in_array( $attrs['icon']['decoration']['icon_position']['desktop']['value'], [
								'column',
								'column-reverse'
							] ) && ! empty( $attrs['settings']['decoration']['button_height']['desktop']['value'] ) ) ?
							Styles::custom_style( [
								'attr'                   => $attrs['settings']['innerContent'] ?? [],
								'selector'               => $args['orderClass'] . " #difl-social-share-container .difl_social_share_item_wrapper",
								'staticPropertyAndValue' => [ "justify-content" => "center" ]
							] )
							: [],

						/* Content Alignment */
						CommonStyle::style(
							[
								'selector' => $args['orderClass'] . " > div:first-of-type",
								'attr'     => $attrs['alignment']['decoration']['content_alignment'] ?? [],
								'property' => 'text-align',
							]
						),

						/* Column Auto Child Content Alignment */
						CommonStyle::style(
							[
								'selector' => $args['orderClass'] . " .difl_social_share_container",
								'attr'     => $attrs['alignment']['decoration']['column_auto_child_item_alignment'] ?? [],
								'property' => 'justify-content',
							]
						),

						/* Child Content Alignment */
						CommonStyle::style(
							[
								'selector' => $args['orderClass'] . " #difl-social-share-container .difl_social_share_item_wrapper",
								'attr'     => $attrs['alignment']['decoration']['child_content_alignment'] ?? [],
								'property' => $css_key,
							]
						),

						/* Icon Position */
						CommonStyle::style(
							[
								'selector' => $args['orderClass'] . " .difl_social_share_container",
								'attr'     => $attrs['icon']['decoration']['icon_position'] ?? [],
								'property' => "flex-direction",
							]
						),

						/* Icon Alignment */
						CommonStyle::style(
							[
								'selector' => $args['orderClass'] . " #difl-social-share-container .difl_social_share_item_wrapper .difl_social_share_icon",
								'attr'     => $attrs['icon']['decoration']['icon_alignment'] ?? [],
								'property' => "align-self",
							]
						),

						/*Icon Custom Padding*/
						( $icon_custom_padding ) ?
							Styles::custom_style( [
								'attr'                   => $attrs['icon']['decoration']['spacing'] ?? [],
								'selector'               => $args['orderClass'] . " #difl-social-share-container.difl_social_share_container a.difl_social_share_item_wrapper .difl_social_share_icon",
								'staticPropertyAndValue' => [ 'width' => 'auto', 'height' => 'auto' ]
							] )
							: [],

						/* Header Icon Size */
						( "on" === $use_header_icon_font_size ) ?
							Styles::custom_style( [
								'attr'     => $attrs['header']['decoration']['header_icon_font_size'] ?? [],
								'selector' => $args['orderClass'] . " #difl-social-share-header #difl-social-share-header-container.difl_social_share_header_container",
								'property' => "--df-header-icon-size"
							] )
							: [],

						/* Header Icon Position */
						CommonStyle::style(
							[
								'selector' => $args['orderClass'] . " #difl-social-share-header-container.difl_social_share_header_container",
								'attr'     => $attrs['header']['decoration']['header_icon_position'] ?? [],
								'property' => "flex-direction",
							]
						),

						/* Header Icon Alignment */
						CommonStyle::style(
							[
								'selector' => $args['orderClass'] . " #difl-social-share-header-container.difl_social_share_header_container .difl_social_share_header_icon",
								'attr'     => $attrs['header']['decoration']['header_icon_alignment'] ?? [],
								'property' => "align-self",
							]
						),

						/* Header Content Gap */
						CommonStyle::style(
							[
								'selector' => $args['orderClass'] . " #difl-social-share-header-container.difl_social_share_header_container",
								'attr'     => $attrs['header_container']['decoration']['header_content_gap'] ?? [],
								'property' => "gap",
							]
						),

						/* Header Alignment */
						CommonStyle::style(
							[
								'selector' => $args['orderClass'] . " .difl_social_share_header",
								'attr'     => $attrs['header_container']['decoration']['header_alignment'] ?? [],
								'property' => "justify-content",
							]
						),

						// Module - Only for Custom CSS.
						CssStyle::style(
							[
								'selector'  => $args['orderClass'],
								'attr'      => $attrs['css'] ?? [],
								'cssFields' => self::custom_css(),
							]
						),
					]
				)
			]
		);
	}

	public static function script_data( $args ) {
		$id             = $args['id'] ?? '';
		$name           = $args['name'] ?? '';
		$selector       = $args['selector'] ?? '';
		$attrs          = $args['attrs'] ?? [];
		$elements       = $args['elements'];
		$store_instance = $args['storeInstance'] ?? null;

		// Element Script Data Options.
		$elements->script_data(
			[
				'attrName' => 'module',
			]
		);

//		MultiViewScriptData::set(
//			[
//				'id'            => $id,
//				'name'          => $name,
//				'storeInstance' => $store_instance,
//				'selector'      => $selector,
//				'setClassName'  => [
//					[
//						'data'          => [
//							'has_header' => $attrs['settings']['innerContent']['enable_header'] ?? [],
//						],
//						'valueResolver' => function ( $value, $resolver_args ) {
//							return 'has_header' === $resolver_args['className'] && 'on' === ( $value ?? '' ) ? 'add' : 'remove';
//						},
//					],
//				],
//			]
//		);

		MultiViewScriptData::set(
			[
				'id'            => $id,
				'name'          => $name,
				'storeInstance' => $store_instance,
				'hoverSelector' => $selector,
				'setVisibility' => [
					[
						'selector'      => "{$selector} .difl_social_share_header",
						'data'          => $attrs['settings']['innerContent']['enable_header'] ?? [],
						'valueResolver' => function ( $value ) {
							return 'on' === ( $value ?? 'off' ) ? 'visible' : 'hidden';
						},
					],
				],
			]
		);
	}

	public static function classnames( $args ) {
		$classnames_instance = $args['classnamesInstance'];
		$attrs               = $args['attrs'];

		$enable_header = $attrs['settings']['innerContent']['enable_header']['desktop']['value'] ?? "off";

		if ( 'on' === $enable_header ) {
			$classnames_instance->add( "has_header" );
		}
	}

	public static function enqueue_user_script( $attrs ) {
		?>
        <script type="text/javascript">
			( () => {
				'use strict';
				window.addEventListener( 'load', () => {
					document.querySelectorAll( '.difl_social_share_item' ).forEach( function ( item ) {
						item.addEventListener( 'click', function ( event ) {
							if ( item.classList.contains( 'difl_print' ) ) {
								console.log( "clicked" )
								event.preventDefault();
								print();
							}
						} );
					} );
				} );
			} )();
        </script>
		<?php
	}

	public static function render_callback( $attrs, $content, $block, $elements ) {
		self::enqueue_user_script( $attrs );

		$children_ids = $block->parsed_block['innerBlocks'] ? array_map(
			function ( $inner_block ) {
				return $inner_block['id'];
			},
			$block->parsed_block['innerBlocks']
		) : [];

		$parent       = BlockParserStore::get_parent( $block->parsed_block['id'], $block->parsed_block['storeInstance'] );
		$parent_attrs = $parent->attrs ?? [];

		$header_content = function () use ( $attrs ) {
			$headerOutput  = '';
			$enable_header = $attrs['settings']['innerContent']['enable_header']['desktop']['value'] ?? "off";
			if ( "on" === $enable_header ) {
				$headerTitle    = $attrs['header_title']['innerContent']['desktop']['value'] ?? null;
				$headerSubTitle = $attrs['header_sub_title']['innerContent']['desktop']['value'] ?? null;
				$headerContent  = '';
				if ( $headerTitle || $headerSubTitle ) {
					$header_title     = $headerTitle ?
						HTMLUtility::render(
							[
								'tag'               => 'span',
								'attributes'        => [
									'class' => 'difl_social_share_header_title',
								],
								'childrenSanitizer' => 'esc_html',
								'children'          => $headerTitle,
							]
						)
						: "";
					$header_sub_title = $headerSubTitle ?
						HTMLUtility::render(
							[
								'tag'               => 'span',
								'attributes'        => [
									'class' => 'difl_social_share_header_sub_title',
								],
								'childrenSanitizer' => 'esc_html',
								'children'          => $headerSubTitle,
							]
						)
						: "";
					$headerContent    = HTMLUtility::render(
						[
							'tag'               => 'div',
							'attributes'        => [
								'class' => 'difl_social_share_header_content',
							],
							'childrenSanitizer' => 'et_core_esc_previously',
							'children'          => $header_title . $header_sub_title,
						]
					);
				}

				$headerIcon = $attrs['header']['innerContent']['desktop']['value']['header_icon'] ?? null;
				if ( $headerIcon ) {
					$headerIcon = HTMLUtility::render(
						[
							'tag'               => 'span',
							'attributes'        => [
								'class' => "et-pb-icon difl_social_share_header_icon",
							],
							'childrenSanitizer' => 'esc_html',
							'children'          => Utils::process_font_icon( $headerIcon ?? [] ),
						]
					);
				}

				$headerOutput = HTMLUtility::render(
					[
						'tag'               => 'div',
						'attributes'        => [
							'id'    => 'difl-social-share-header',
							'class' => 'difl_social_share_header'
						],
						'childrenSanitizer' => 'et_core_esc_previously',
						'children'          => HTMLUtility::render(
							[
								'tag'               => 'div',
								'attributes'        => [
									'id'    => 'difl-social-share-header-container',
									'class' => 'difl_social_share_header_container'
								],
								'childrenSanitizer' => 'et_core_esc_previously',
								'children'          => $headerIcon . $headerContent,
							]
						),
					]
				);

			}

			return $headerOutput;
		};

		$child_items = HTMLUtility::render(
			[
				'tag'               => 'div',
				'attributes'        => [
					'class' => 'difl_social_share_container',
					'id'    => 'difl-social-share-container'
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
					) . $header_content() . $child_items,
				'childrenIds'         => $children_ids,
			]
		);
	}

	public function load() {
		add_filter( 'divi_conversion_presets_attrs_map', array( SocialSharePresetAttrsMap::class, 'get_map' ), 10, 2 );

		add_action(
			'init',
			function () {
				ModuleRegistration::register_module(
					DIFL_MODULES_JSON_PATH . 'social-share/',
					[
						'render_callback' => [ self::class, 'render_callback' ],
					]
				);
			}
		);
	}

}
