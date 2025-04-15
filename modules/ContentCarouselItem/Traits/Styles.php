<?php

namespace DIVIFLASH\Modules\ContentCarouselItem\Traits;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

use ET\Builder\FrontEnd\Module\Style;
use ET\Builder\Packages\Module\Options\Text\TextStyle;
use ET\Builder\Packages\Module\Options\Css\CssStyle;
use ET\Builder\Packages\Module\Layout\Components\StyleCommon\CommonStyle;
use ET\Builder\Packages\ModuleLibrary\ModuleRegistration;
use ET\Builder\Packages\IconLibrary\IconFont\Utils;
use ET\Builder\Packages\StyleLibrary\Utils\StyleDeclarations;
use DIVIFLASH\modules\ContentCarouselItem\ContentCarouselItem;
use Endroid\QrCode\Logo\Logo;

trait Styles {
	use CustomCss;
	use StyleDeclaration;

	public static function styles( $args ) {
		$attrs        = $args['attrs'] ?? [];
		$order_class  = $args['orderClass'];
		$elements     = $args['elements'];
		$settings     = $args['settings'] ?? [];
		$parent_attrs = $args['parentAttrs'] ?? [];

		$parent_default_attributes = ModuleRegistration::get_default_attrs( 'diviflash/bento-grid' );
		$parent_attrs_with_default = array_replace_recursive( $parent_default_attributes, $parent_attrs );

		$icon_selector              = "{$order_class} .df_cci_image_container .et-pb-icon";
		$content_container_selector = "{$order_class} .difl_bento_grid_item__content-container";
		$pro_img_selector = "{$order_class} .difl_bento_grid_item__image img";
		$child_item = "{$order_class}";

		Style::add(
			[
				'id'            => $args['id'],
				'name'          => $args['name'],
				'orderIndex'    => $args['orderIndex'],
				'storeInstance' => $args['storeInstance'],
				'styles'        => [
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
					TextStyle::style(
						[
							'selector' => $content_container_selector,
							'attr'     => $attrs['module']['advanced']['text'] ?? [],
						]
					),
					CssStyle::style(
						[
							'selector'  => $args['orderClass'],
							'attr'      => $attrs['css'] ?? [],
							'cssFields' => self::custom_css(),
						]
					),

					// Title.
					$elements->style(
						[
							'attrName' => 'title',
						]
					),

					// Sub Title.
					$elements->style(
						[
							'attrName' => 'subTitle',
						]
					),

					// Content.
					$elements->style(
						[
							'attrName' => 'content',
						]
					),

					// Button.
					$elements->style(
						[
							'attrName' => 'button',
						]
					),

					// icon style.
					$elements->style(
						[
							'attrName' => 'useIcon',
						]
					),

					
					// Icon.
					// CommonStyle::style(
					// 	[
					// 		'selector' => $icon_selector,
					// 		'attr'     => $attrs['useIcon']['decoration']['icon'] ?? [],
					// 		'declarationFunction' => [ self::class, 'icon_font_declaration' ],
					// 	]
					// ),
					CommonStyle::style(
						[
							'selector' => $icon_selector,
							'attr'     => $attrs['useIcon']['decoration']['circleIcon'] ?? [],
							'declarationFunction' => [ self::class, 'df_circle_icon' ],
						]
					),
					CommonStyle::style(
						[
							'selector' => "{$order_class} .df_cci_image_container",
							'attr'     => $attrs['useIcon']['decoration']['alignment'] ?? [],
							'declarationFunction' => [ self::class, 'df_icon_alignment' ],
						]
					),
					CommonStyle::style(
						[
							'selector' => $icon_selector,
							'attr'     => $attrs['useIcon']['decoration']['sizing'] ?? '',
							'property' => 'font-size',
						]
					),

					CommonStyle::style(
						[
							'selector' => ".difl_contentcarousel {$order_class} .df_cci_image_container",
							'attr'     => $attrs['imgOrder']['innerContent'] ?? '',
							'property' => 'order',
						]
					),
					CommonStyle::style(
						[
							'selector' => ".difl_contentcarousel {$order_class} .df_cc_title",
							'attr'     => $attrs['titleOrder']['innerContent'] ?? '',
							'property' => 'order',
						]
					),
					CommonStyle::style(
						[
							'selector' => ".difl_contentcarousel {$order_class} .df_cc_subtitle",
							'attr'     => $attrs['subTitleOrder']['innerContent'] ?? '',
							'property' => 'order',
						]
					),
					CommonStyle::style(
						[
							'selector' => ".difl_contentcarousel {$order_class} .df_cc_content",
							'attr'     => $attrs['contentOrder']['innerContent'] ?? '',
							'property' => 'order',
						]
					),
					CommonStyle::style(
						[
							'selector' => ".difl_contentcarousel {$order_class} .df_cci_button_wrapper",
							'attr'     => $attrs['btnOrder']['innerContent'] ?? '',
							'property' => 'order',
						]
					),


					/* Image Size */
					CommonStyle::style(
						[
							'selector' => $pro_img_selector,
							'attr'     => $attrs['image_size']['decoration']['size'] ?? $parent_attrs_with_default['image_size']['decoration']['size'] ?? [],
							'property' => 'width',
						]
					),
					CommonStyle::style(
						[
							'selector' => $pro_img_selector,
							'attr'     => $attrs['image_size']['decoration']['size'] ?? $parent_attrs_with_default['image_size']['decoration']['size'] ?? [],
							'property' => 'height',
						]
					),
					/* Row/Column Span */
					CommonStyle::style(
						[
							'selector' => $order_class,
							'attr'     => $attrs['gridLayout']['decoration'] ??  [],
							'declarationFunction' => [ ContentCarouselItem::class, 'grid_span_declaration' ],
						]
					),
					
					/* Image Style */
					$elements->style(
						[
							'attrName' => 'imageStyle',
						]
					),
					
				],
			]
		);
	}

	
	/**
     * Icon bg radius styles
     *
     * @param String test_log($args['attrValue']['circleIcon']);
     * @return String
     */
    public static function df_circle_icon(array $args ): string {

		$iconRadius = ($args['attrValue']['circleIcon'] === 'on') ? 'border-radius: 50%;' : '';
        
        return $iconRadius;
    }

	/**
     * Icon Alignment styles
     *
     * @param String test_log($args['attrValue']);
     * @return String
     */
    public static function df_icon_alignment(array $args ): string {
		$icon_attr = $args['attrValue'] ?? [];
		$style_declare = new StyleDeclarations(
			[
				'returnType' => 'string',
				'important'  => [
					'content'     => true,
				],
			]
		);

        if ( ! empty( $icon_attr ) ) {
			$iconAlign  = isset( $icon_attr['alignment'] ) ? $icon_attr['alignment'] : '';
			$style_declare->add( 'text-align', $iconAlign);
		}

		return $style_declare->value();
    }


	public static function icon_font_declaration(array $args ): string {
		$icon_attr = $args['attrValue'] ?? [];
		$style_declarations = new StyleDeclarations(
			[
				'returnType' => 'string',
				'important'  => [
					'font-family' => true,
					'content'     => true,
				],
			]
		);
		$font_icon = Utils::process_font_icon( $icon_attr );

		if ( ! empty( $icon_attr ) ) {
			$style_declarations->add( 'content', $font_icon );
			$font_family = isset( $icon_attr['type'] ) && 'fa' === $icon_attr['type'] ? 'FontAwesome' : 'ETmodules';
			// $iconColor   = isset( $icon_attr['color'] ) ? $icon_attr['color'] : '';

			$style_declarations->add( 'font-family', $font_family );
			// $style_declarations->add( 'color', $iconColor );
		}

		return $style_declarations->value();
	}

}