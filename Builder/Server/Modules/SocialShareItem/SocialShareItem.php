<?php

namespace DIFL\Server\Modules\SocialShareItem;

use ET\Builder\Framework\DependencyManagement\Interfaces\DependencyInterface;
use ET\Builder\Framework\Utility\HTMLUtility;
use ET\Builder\FrontEnd\BlockParser\BlockParserStore;
use ET\Builder\FrontEnd\Module\Style;
use ET\Builder\Packages\Module\Layout\Components\StyleCommon\CommonStyle;
use ET\Builder\Packages\Module\Module;
use ET\Builder\Packages\ModuleLibrary\ModuleRegistration;
use WP_Block;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

class SocialShareItem implements DependencyInterface {
	public static $social_network_data = [];
	public static $fa_icons = [];

	public static function init() {
		self::$social_network_data = [
			''          => [
				'label' => __( "Select a Network", "divi_flash" ),
				'value' => "",
				'data'  => [ 'color' => "", 'url' => '%1$s' ]
			],
			"facebook"  => [
				"label" => __( "Facebook", "divi_flash" ),
				"value" => "facebook",
				"data"  => [ "color" => "#1877F2", "url" => 'https://www.facebook.com/sharer/sharer.php?u=%1$s' ]
			],
			"twitter"   => [
				"label" => __( "X", "divi_flash" ),
				"value" => "twitter",
				"data"  => [ "color" => "#000000", "url" => 'https://twitter.com/intent/tweet?text=%1$s' ]
			],
			"linkedin"  => [
				"label" => __( "LinkedIn", "divi_flash" ),
				"value" => "linkedin",
				"data"  => [
					"color" => "#007bb6",
					"url"   => 'https://www.linkedin.com/shareArticle?mini=true&url=%1$s/&title=&summary=&source='
				]
			],
			"pinterest" => [
				"label" => __( "Pinterest", "divi_flash" ),
				"value" => "pinterest",
				"data"  => [
					"color" => "#cb2027",
					"url"   => 'https://www.pinterest.com/pin/create/button/?url=%1$s&media='
				]
			],
			"reddit"    => [
				"label" => __( "Reddit", "divi_flash" ),
				"value" => "reddit",
				"data"  => [ "color" => "#ff4500", "url" => 'https://www.reddit.com/submit?url=%1$s&title=' ]
			],
			"vk"        => [
				"label" => __( "VK", "divi_flash" ),
				"value" => "vk",
				"data"  => [ "color" => "#45668e", "url" => 'https://vk.com/share.php?url=%1$s' ]
			],
			"tumblr"    => [
				"label" => __( "Tumblr", "divi_flash" ),
				"value" => "tumblr",
				"data"  => [ "color" => "#32506d", "url" => 'https://tumblr.com/share/link?url=%1$s' ]
			],
			"digg"      => [
				"label" => __( "Digg", "divi_flash" ),
				"value" => "digg",
				"data"  => [ "color" => "#005be2", "url" => 'https://digg.com/submit?url=%1$s' ]
			],
			"skype"     => [
				"label" => __( "Skype", "divi_flash" ),
				"value" => "skype",
				"data"  => [ "color" => "#12A5F4", "url" => 'https://web.skype.com/share?url=%1$s' ]
			],
			"whatsapp"  => [
				"label" => __( "WhatsApp", "divi_flash" ),
				"value" => "whatsapp",
				"data"  => [ "color" => "#25D366", "url" => 'https://api.whatsapp.com/send?text=**%1$s' ]
			],
			"email"     => [
				"label" => __( "Email", "divi_flash" ),
				"value" => "email",
				"data"  => [ "color" => "#ea4335", "url" => 'mailto:?body=%1$s' ]
			],
			"print"     => [
				"label" => __( "Print", "divi_flash" ),
				"value" => "print",
				"data"  => [ "color" => "#aaa", "url" => '%1$s' ]
			],
		];
		self::$fa_icons            = [
			"amazon",
			"bandcamp",
			"telegram",
			"bitbucket",
			"behance",
			"buffer",
			"codepen",
			"deviantart",
			"flipboard",
			"foursquare",
			"github",
			"goodreads",
			"google",
			"houzz",
			"itunes",
			"last_fm",
			"line",
			"medium",
			"meetup",
			"odnoklassniki",
			"patreon",
			"periscope",
			"quora",
			"researchgate",
			"reddit",
			"snapchat",
			"soundcloud",
			"spotify",
			"steam",
			"tripadvisor",
			"tiktok",
			"twitch",
			"vk",
			"weibo",
			"whatsapp",
			"xing",
			"yelp"
		];
	}

	public static function process_image_icon( $attrs ) {
		$image_element = "";

		if ( ! empty( $attrs['src']['innerContent']['desktop']['value'] ) ) {
			$image_element = HTMLUtility::render(
				[
					'tag'        => 'img',
					'attributes' => [
						'src'   => $attrs['src']['innerContent']['desktop']['value'] ?? "",
						'class' => "difl_custom_image_icon",
						'alt'   => "",
					]
				]
			);
		}

		return $image_element;
	}

	public static function generate_share_link( $social_network ) {
		$encoded_url   = urlencode( get_permalink() );
		$encoded_title = urlencode( wp_get_document_title() ?: 'Check this out!' );

		return sprintf( self::$social_network_data[ $social_network ]['data']['url'], $encoded_url );
	}

	public static function classnames( $args ) {
		$classnames_instance = $args['classnamesInstance'];
		$attrs               = $args['attrs'];

		$social_network_name = $attrs['social_network']['innerContent']['desktop']['value'] ?? '';


		$classnames_instance->add( "difl_social_share_item_wrapper" );
		if ( 'print' === $social_network_name ) {
			$classnames_instance->add( "difl_print" );
		}
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

						CommonStyle::style(
							[
								'selector' => $args['orderClass'] . "#difl-social-share-item-wrapper.difl_social_share_item_wrapper .difl_social_share_icon i:before",
								'attr'     => $attrs['icon_color']['decoration'] ?? [],
								'property' => 'color',
							]
						),

						( "on" === $attrs['use_icon_font_size']['innerContent']['desktop']['value'] ) ?
							CommonStyle::style(
								[
									'selector' => $args['orderClass'] . "#difl-social-share-item-wrapper.difl_social_share_item_wrapper",
									'attr'     => $attrs['icon_color']['decoration'] ?? [],
									'property' => 'color',
								] ) : [],

						$elements->style( [ 'attrName' => 'icon', ] ),
						$elements->style( [ 'attrName' => 'label', ] ),
						$elements->style( [ 'attrName' => 'label_container', ] ),
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

		$default_parent_attrs = ModuleRegistration::get_default_attrs( 'difl/social-share' );
		$parent_attrs         = array_replace_recursive( $default_parent_attrs, $parent->attrs ?? [] );

		$item_view      = $parent_attrs['settings']['innerContent']['item_view']['desktop']['value'] ?? 'iconAndText';
		$url_new_window = $parent_attrs['settings']['innerContent']['url_new_window']['desktop']['value'] ?? 'iconAndText';
		$target         = HTMLUtility::link_target( $url_new_window );

		$social_network_name   = $attrs['social_network']['innerContent']['desktop']['value'] ?? '';
		$use_custom_image_icon = $attrs['use_custom_image_icon']['innerContent']['desktop']['value'] ?? 'off';
		$social_icon_class     = ! empty( $social_network_name ) ? "df-social-share-{$social_network_name}" : "";
		$is_fa_icon_class      = ! empty( $social_network_name ) && in_array( $social_network_name, self::$fa_icons, true ) ? ' df-social-share-fa-icon' : '';
		$share_content_title   = $attrs['custom_label']['innerContent']['desktop']['value'] ?? self::$social_network_data[ $social_network_name ]['label'];

		$share_icon    = '';
		$share_content = '';

		if ( 'iconAndText' === $item_view ) {
			if ( "on" === $use_custom_image_icon && ! empty( $social_network_name ) ) {
				$share_icon = HTMLUtility::render(
					[
						'tag'               => 'div',
						'attributes'        => [
							'class' => "difl_social_share_icon",
						],
						'childrenSanitizer' => 'esc_html',
						'children'          => self::process_image_icon( $attrs ),
					]
				);
			} else {
				$share_icon = HTMLUtility::render(
					[
						'tag'               => 'div',
						'attributes'        => [
							'class' => "difl_social_share_icon",
						],
						'childrenSanitizer' => 'et_core_esc_previously',
						'children'          => HTMLUtility::render(
							[
								'tag'               => 'i',
								'attributes'        => [
									'class' => $is_fa_icon_class . $social_icon_class,
								],
								'childrenSanitizer' => 'esc_html',
								'children'          => self::process_image_icon( $attrs ),
							]
						),
					]
				);
			}
			$share_content = HTMLUtility::render(
				[
					'tag'               => 'div',
					'attributes'        => [
						'class' => "difl_social_share_content_container",
					],
					'childrenSanitizer' => 'et_core_esc_previously',
					'children'          => HTMLUtility::render(
						[
							'tag'               => 'div',
							'attributes'        => [
								'class' => "difl_social_share_content",
							],
							'childrenSanitizer' => 'et_core_esc_previously',
							'children'          => HTMLUtility::render(
								[
									'tag'               => 'span',
									'attributes'        => [
										'class' => "difl_social_share_text",
									],
									'childrenSanitizer' => 'esc_html',
									'children'          => $share_content_title,
								]
							),
						]
					),
				]
			);
		}

		if ( 'icon' === $item_view ) {
			if ( "on" === $use_custom_image_icon && ! empty( $social_network_name ) ) {
				$share_icon = HTMLUtility::render( [
					'tag'               => 'div',
					'attributes'        => [
						'class' => "difl_social_share_icon",
					],
					'childrenSanitizer' => 'esc_html',
					'children'          => self::process_image_icon( $attrs ),
				] );
			} else {
				$share_icon = HTMLUtility::render( [
					'tag'               => 'div',
					'attributes'        => [
						'class' => "difl_social_share_icon",
					],
					'childrenSanitizer' => 'et_core_esc_previously',
					'children'          => HTMLUtility::render(
						[
							'tag'        => 'i',
							'attributes' => [
								'class' => $is_fa_icon_class . $social_icon_class,
							]
						]
					),
				] );
			}
		}

		if ( 'text' === $item_view ) {
			$share_content = HTMLUtility::render( [
				'tag'               => 'div',
				'attributes'        => [
					'class' => "difl_social_share_content_container",
				],
				'childrenSanitizer' => 'et_core_esc_previously',
				'children'          => HTMLUtility::render(
					[
						'tag'               => 'div',
						'attributes'        => [
							'class' => "difl_social_share_content",
						],
						'childrenSanitizer' => 'et_core_esc_previously',
						'children'          => HTMLUtility::render( [
							'tag'               => 'div',
							'attributes'        => [
								'class' => "difl_social_share_text",
							],
							'childrenSanitizer' => 'esc_attr',
							'children'          => $share_content_title,
						] ),
					]
				),
			] );
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
//				'moduleClassName'     => '',
				'moduleCategory'      => $block->block_type->category,
				'hasModuleClassName'  => true,   // Add or remove et_pb_module class
				'classnamesFunction'  => [ self::class, 'classnames' ],
				'scriptDataComponent' => [ self::class, 'script_data' ],
				'stylesComponent'     => [ self::class, 'styles' ],
				'tag'                 => 'a',
				'htmlAttrs'           => [
					'id'     => 'difl-social-share-item-wrapper',
					'href'   => self::generate_share_link( $social_network_name ),
					'target' => $target,
					'title'  => self::$social_network_data[ $social_network_name ]['label'],
					'rel'    => 'noopener noreferrer',
				],
				'children'            => $share_icon . $share_content
			]
		);
	}

	public function load() {
		self::init();
		add_filter( 'divi_conversion_presets_attrs_map', array(
			SocialShareItemPresetAttrsMap::class,
			'get_map'
		), 10, 2 );

		add_action(
			'init',
			function () {
				ModuleRegistration::register_module(
					DIFL_MODULES_JSON_PATH . 'social-share-item/',
					[
						'render_callback' => [ self::class, 'render_callback' ],
					]
				);
			}
		);
	}
}