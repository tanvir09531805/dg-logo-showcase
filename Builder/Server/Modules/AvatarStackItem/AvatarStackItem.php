<?php

namespace DIFL\Server\Modules\AvatarStackItem;

use ET\Builder\Framework\DependencyManagement\Interfaces\DependencyInterface;
use ET\Builder\Framework\Utility\HTMLUtility;
use ET\Builder\FrontEnd\BlockParser\BlockParserStore;
use ET\Builder\FrontEnd\Module\Style;
use ET\Builder\Packages\IconLibrary\IconFont\Utils;
use ET\Builder\Packages\Module\Layout\Components\StyleCommon\CommonStyle;
use ET\Builder\Packages\Module\Module;
use ET\Builder\Packages\Module\Options\Css\CssStyle;
use ET\Builder\Packages\ModuleLibrary\ModuleRegistration;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

class AvatarStackItem implements DependencyInterface {

	public static function process_icon( $attrs ) {
		$icon_classnames = [ 'et-pb-icon', 'difl_avatar_stack_icon' ];

		return HTMLUtility::render(
			[
				'tag'               => 'span',
				'attributes'        => [
					'class' => implode( ' ', $icon_classnames ),
				],
				'childrenSanitizer' => 'esc_html',
				'children'          => Utils::process_font_icon( $attrs['content_main']['innerContent']['field_font_icon']['desktop']['value'] ?? [ "type"    => "divi",
				                                                                                                                                    "unicode" => "&#xe08a;",
				                                                                                                                                    "weight"  => "400"
				] ),
			]
		);
	}

	public static function process_media( $attrs ) {
		$output          = "";
		$field_image_src = $attrs['content_main']['innerContent']['field_image_src']['desktop']['value']['src'] ?? "";
		$field_image_alt = $attrs['content_main']['innerContent']['field_image_src']['desktop']['value']['alt'] ?? "";
		if ( ! empty( $field_image_src ) ) {
			$output = HTMLUtility::render( [
				'tag'        => 'img',
				'attributes' => [
					'class' => "difl_avatar_stack_media",
					'alt'   => $field_image_alt,
					'src'   => $field_image_src,
				]
			] );
		}

		return $output;
	}

	public static function process_rating( $attrs ) {
		$rating_number = $attrs['content_main']['innerContent']['field_rating_number']['desktop']['value'] ?? "5";
		$rating_number = (int) $rating_number;

		$rating = '';
		for ( $i = 1; $i <= 5; $i ++ ) {
			if ( $i <= $rating_number ) {
				$rating .= HTMLUtility::render( [
					'tag'        => 'span',
					'attributes' => [
						'class' => "rate"
					]
				] );
			} else {
				$rating .= HTMLUtility::render( [
					'tag'        => 'span',
					'attributes' => [
						'class' => "blank"
					]
				] );
			}
		}

		$rating_label       = '';
		$field_rating_label = $attrs['content_main']['innerContent']['field_rating_label']['desktop']['value'] ?? '';
		if ( ! empty( $field_rating_label ) ) {
			$rating_label = HTMLUtility::render( [
				'tag'               => 'span',
				'attributes'        => [
					'class' => "difl_avatar_stack_rating_label"
				],
				'childrenSanitizer' => 'esc_html',
				'children'          => $field_rating_label,
			] );
		}

		return HTMLUtility::render( [
			'tag'               => 'div',
			'attributes'        => [
				'class' => "difl_avatar_stack_rating_container",
			],
			'childrenSanitizer' => 'et_core_esc_previously',
			'children'          => HTMLUtility::render(
					[
						'tag'               => 'div',
						'attributes'        => [
							'class' => "difl_avatar_stack_rating",
						],
						'childrenSanitizer' => 'et_core_esc_previously',
						'children'          => $rating
					]
				) . $rating_label,
		] );
	}

	public static function process_text( $attrs ) {
		$title            = '';
		$field_title_text = $attrs['content_main']['innerContent']['field_title_text']['desktop']['value'] ?? "";
		if ( ! empty( $field_title_text ) ) {
			$title = HTMLUtility::render( [
				'tag'               => 'h4',
				'attributes'        => [
					'class' => "difl_avatar_stack_text_title",
				],
				'childrenSanitizer' => 'esc_html',
				'children'          => $field_title_text
			] );
		}

		$subtitle            = '';
		$field_subtitle_text = $attrs['content_main']['innerContent']['field_subtitle_text']['desktop']['value'] ?? "";
		if ( ! empty( $field_subtitle_text ) ) {
			$subtitle = HTMLUtility::render( [
				'tag'               => 'h6',
				'attributes'        => [
					'class' => "difl_avatar_stack_text_subtitle",
				],
				'childrenSanitizer' => 'esc_html',
				'children'          => $field_subtitle_text
			] );
		}

		return HTMLUtility::render( [
			'tag'               => 'div',
			'attributes'        => [
				'class' => "difl_avatar_stack_text_container",
			],
			'childrenSanitizer' => 'et_core_esc_previously',
			'children'          => $title . $subtitle
		] );
	}

	public static function styles( $args ) {
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

						/* Design Icon */
						$elements->style( [ 'attrName' => 'design_icon', ] ),

						/* Design Rating */
						$elements->style( [ 'attrName' => 'design_rating', ] ),

						CommonStyle::style(
							[
								'selector' => ".difl_avatar_stack #difl-avatar-stack-container ".$args['orderClass'] . ".difl_avatar_stack_item .difl_avatar_stack_item_wrapper.has_rating .difl_avatar_stack_rating_container .difl_avatar_stack_rating",
								'attr'     => $attrs['design_rating']['decoration']['field_rating_alignment'] ?? [],
								'property' => 'text-align',
							]
						),
						CommonStyle::style(
							[
								'selector' => ".difl_avatar_stack #difl-avatar-stack-container ".$args['orderClass'] . ".difl_avatar_stack_item .difl_avatar_stack_item_wrapper.has_rating .difl_avatar_stack_rating_container",
								'attr'     => $attrs['design_rating']['decoration']['field_rating_position'] ?? [],
								'property' => 'justify-content',
							]
						),
						CommonStyle::style(
							[
								'selector' => ".difl_avatar_stack #difl-avatar-stack-container ".$args['orderClass'] . ".difl_avatar_stack_item .difl_avatar_stack_item_wrapper.has_rating .difl_avatar_stack_rating_container .difl_avatar_stack_rating",
								'attr'     => $attrs['design_rating']['decoration']['field_rating_icon_size'] ?? [],
								'property' => 'font-size',
							]
						),
						CommonStyle::style(
							[
								'selector' => ".difl_avatar_stack #difl-avatar-stack-container ".$args['orderClass'] . ".difl_avatar_stack_item .difl_avatar_stack_item_wrapper.has_rating .difl_avatar_stack_rating_container .difl_avatar_stack_rating span.rate:before",
								'attr'     => $attrs['design_rating']['decoration']['field_rating_color'] ?? [],
								'property' => 'color',
							]
						),
						CommonStyle::style(
							[
								'selector' => ".difl_avatar_stack #difl-avatar-stack-container ".$args['orderClass'] . ".difl_avatar_stack_item .difl_avatar_stack_item_wrapper.has_rating .difl_avatar_stack_rating_container .difl_avatar_stack_rating span.blank:before",
								'attr'     => $attrs['design_rating']['decoration']['field_blank_color'] ?? [],
								'property' => 'color',
							]
						),

						/* Design Text */
						$elements->style( [ 'attrName' => 'design_title_text', ] ),
						$elements->style( [ 'attrName' => 'design_sub_title_text', ] ),
						CommonStyle::style(
							[
								'selector' => ".difl_avatar_stack #difl-avatar-stack-container ".$args['orderClass'] . ".difl_avatar_stack_item .difl_avatar_stack_item_wrapper.has_text .difl_avatar_stack_text_container",
								'attr'     => $attrs['content_main']['decoration']['field_text_position'] ?? [],
								'property' => 'justify-content',
							]
						),

						// Module - Only for Custom CSS.
						CssStyle::style(
							[
								'selector'  => $args['orderClass'],
								'attr'      => $attrs['css'] ?? [],
//								'cssFields' => self::custom_css(),
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
	}

	public static function render_callback( $attrs, $content, $block, $elements ) {

		$parent = BlockParserStore::get_parent( $block->parsed_block['id'], $block->parsed_block['storeInstance'] );

		$default_parent_attrs = ModuleRegistration::get_default_attrs( 'difl/avatar-stack' );
		$parent_attrs         = array_replace_recursive( $default_parent_attrs, $parent->attrs ?? [] );

		$output       = "";
		$output_class = 'has_icon';

		$field_content_type = $attrs['content_main']['innerContent']['field_content_type']['desktop']['value'] ?? "has_icon";

		if ( "image" === $field_content_type ) {
			$output_class = 'has_media';
			$output       = self::process_media( $attrs );
		} else if ( "rating" === $field_content_type ) {
			$output_class = 'has_rating';
			$output       = self::process_rating( $attrs );
		} else if ( "text" === $field_content_type ) {
			$output_class = 'has_text';
			$output       = self::process_text( $attrs );
		} else {
			$output_class = 'has_icon';
			$output       = self::process_icon( $attrs );
		}

		$classes = ['difl_avatar_stack_item_wrapper',$output_class ];

		$tooltip_content = "";
		$field_content_tooltip = $attrs['content_main']['innerContent']['field_content_tooltip']['desktop']['value'] ?? "";

		if (!empty($field_content_tooltip)) {
			$tooltip_content = sprintf('<noscript id="difl-avatar-stack-item-tooltip-content">%1$s</noscript>',$field_content_tooltip);
		}

		return Module::render(
			[
				// FE only.
				'orderIndex'         => $block->parsed_block['orderIndex'],
				'storeInstance'      => $block->parsed_block['storeInstance'],

				// VB equivalent.
				'attrs'              => $attrs,
				'elements'           => $elements,
				'id'                 => $block->parsed_block['id'],
				'name'               => $block->block_type->name,
				'moduleClassName'     => '',
				'moduleCategory'     => $block->block_type->category,
				'hasModuleClassName' => true,   // Add or remove et_pb_module class
//				'classnamesFunction'  => [ self::class, 'classnames' ],
				'scriptDataComponent' => [ self::class, 'script_data' ],
				'stylesComponent'     => [ self::class, 'styles' ],
				'tag'                => 'div',
				'children'           => [
					$tooltip_content,
					HTMLUtility::render(
						[
							'tag'        => 'div',
							'attributes' => [
								'class' => implode( ' ', $classes ),
							],
							'childrenSanitizer' => 'et_core_esc_previously',
							'children'   => $output,
						]
					)
				]
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
					DIFL_MODULES_JSON_PATH . 'avatar-stack-item/',
					[
						'render_callback' => [ self::class, 'render_callback' ],
					]
				);
			}
		);
	}
}