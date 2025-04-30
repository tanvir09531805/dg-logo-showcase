<?php

namespace DIFL\Server\Modules\InlineContentsItem;

use ET\Builder\Framework\DependencyManagement\Interfaces\DependencyInterface;
use ET\Builder\Framework\Utility\HTMLUtility;
use ET\Builder\FrontEnd\BlockParser\BlockParserStore;
use ET\Builder\FrontEnd\Module\Style;
use ET\Builder\Packages\IconLibrary\IconFont\Utils;
use ET\Builder\Packages\Module\Layout\Components\StyleCommon\CommonStyle;
use ET\Builder\Packages\Module\Module;
use ET\Builder\Packages\Module\Options\Css\CssStyle;
use ET\Builder\Packages\Module\Options\Element\ElementClassnames;
use ET\Builder\Packages\Module\Options\Text\TextClassnames;
use ET\Builder\Packages\ModuleLibrary\ModuleRegistration;
use ET\Builder\Packages\StyleLibrary\Utils\StyleDeclarations;

class InlineContentsItem implements DependencyInterface {

	public static function icon_style_declaration( array $params ): string {
		$icon_attr = $params['attrValue'];

		$style_declarations = new StyleDeclarations(
			[
				'returnType' => 'string',
				'important'  => [
					'font-family' => true,
					'font-weight' => true,
				],
			]
		);

		if ( isset( $icon_attr['type'] ) ) {
			$font_family = 'fa' === $icon_attr['type'] ? 'FontAwesome' : 'ETmodules';
			$style_declarations->add( 'font-family', $font_family );
		}

		if ( ! empty( $icon_attr['weight'] ) ) {
			$style_declarations->add( 'font-weight', $icon_attr['weight'] );
		}

		return $style_declarations->value();
	}

	public static function styles( array $args ): void {
		$attrs    = $args['attrs'] ?? [];
		$elements = $args['elements'];
		$settings = $args['settings'] ?? [];

		$content_type = $attrs['content_main']['innerContent']['content_type']['desktop']['value'] ?? "Text";

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

						/*----- Text -----*/
						$elements->style( [ 'attrName' => 'content_text', ] ),

						/*----- Icon -----*/
						$elements->style( [ 'attrName' => 'content_icon', ] ),
						( "Icon" === $content_type ) ?
							CommonStyle::style(
								[
									'selector'  => "#difl-inline-contents-container {$args['orderClass']}.difl_inline_contents_item.difl_inline_content_icon",
									'attr'      => $attrs['imageSettings']['innerContent']['fontIcon'] ?? [],
									'declarationFunction' => [ self::class, 'icon_style_declaration' ],
								]
							) : [],

						/*----- Image -----*/
						CommonStyle::style(
							[
								'selector'  => "#difl-inline-contents-container {$args['orderClass']}.difl_inline_contents_item .difl_inline_content_image",
								'attr'      => $attrs['content_media']['decoration']['media_size'] ?? [],
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

	public static function classnames( array $args ): void {
		$classnames_instance = $args['classnamesInstance'];
		$attrs               = $args['attrs'];

		$content_type = $attrs['content_main']['innerContent']['content_type']['desktop']['value'] ?? "Text";
		if ( "Text" === $content_type ) {
			$classnames_instance->add( "difl_inline_content_text" );
		}
		if ( "Icon" === $content_type ) {
			$classnames_instance->add( "et-pb-icon" );
			$classnames_instance->add( "difl_inline_content_icon" );
		}
		if ( "Line_Break" === $content_type ) {
			$classnames_instance->add( "df_break_line" );
		}
	}

	public static function process_text( $attrs ): string {
		return $attrs['content_main']['innerContent']['content_text']['desktop']['value'] ?? "";
	}

	public static function process_icon( $attrs ) {
		return Utils::process_font_icon(
			$attrs['content_main']['innerContent']['content_icon']['desktop']['value'] ??
			[
				"type"    => "divi",
				"unicode" => "&#xe08a;",
				"weight"  => "400"
			]
		);
	}

	public static function process_image( $attrs ) {
		$content_image = $attrs['content_main']['innerContent']['content_image']['desktop']['value']['src'] ?? "";
		if ( empty( $content_image ) ) {
			return "";
		}

		return HTMLUtility::render(
			[
				'tag'        => 'img',
				'attributes' => [
					'src'   => $content_image,
					'class' => "difl_inline_content_image",
					'alt'   => ''
				]
			]
		);
	}

	public static function render_callback( $attrs, $content, $block, $elements ) {

		$parent = BlockParserStore::get_parent( $block->parsed_block['id'], $block->parsed_block['storeInstance'] );

		$default_parent_attrs = ModuleRegistration::get_default_attrs( 'difl/inline-contents' );
		$parent_attrs         = array_replace_recursive( $default_parent_attrs, $parent->attrs ?? [] );

		$output = "";

		$content_type = $attrs['content_main']['innerContent']['content_type']['desktop']['value'] ?? "Text";

		if ( "Text" === $content_type ) {
			$output = self::process_text( $attrs );
		} else if ( "Icon" === $content_type ) {
			$output = self::process_icon( $attrs );
		} else if ( "Image" === $content_type ) {
			$output = self::process_image( $attrs );
		}


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
				'moduleClassName'     => '',
				'moduleCategory'      => $block->block_type->category,
				'hasModuleClassName'  => true,   // Add or remove et_pb_module class
				'classnamesFunction'  => [ self::class, 'classnames' ],
//				'scriptDataComponent' => [ self::class, 'script_data' ],
				'stylesComponent'     => [ self::class, 'styles' ],
				'tag'                 => 'span',
				'children'            => $output
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
					DIFL_MODULES_JSON_PATH . 'inline-contents-item/',
					[
						'render_callback' => [ self::class, 'render_callback' ],
					]
				);
			}
		);
	}
}