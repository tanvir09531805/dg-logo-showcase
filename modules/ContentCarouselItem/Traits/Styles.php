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


					// Icon.
					CommonStyle::style(
						[
							'selector' => $icon_selector,
							'attr'     => $attrs['useIcon']['decoration']['icon'] ?? [],
							'declarationFunction' => [ self::class, 'icon_font_declaration' ],
						]
					),
					CommonStyle::style(
						[
							'selector' => $icon_selector,
							'attr'     => isset($attrs['useIcon']['decoration']['icon']) ? (string) $attrs['useIcon']['decoration']['icon'] : '',
							'property' => 'color',
						]
					),
					CommonStyle::style(
						[
							'selector' => "{$order_class} .df_cci_image_container",
							'attr'     => $attrs['icon']['advanced']['color'] ?? $parent_attrs_with_default['icon']['advanced']['color'] ?? [],
							'property' => 'color',
						]
					),
					CommonStyle::style(
						[
							'selector' => $icon_selector,
							'attr'     => $attrs['useIcon']['decoration']['sizing']  ?? [],
							'property' => 'font-size',
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
     * Arrow Position styles
     *
     * @param String | position
     * @return String
     */
    public static function df_use_icon(array $args ): string {

		$arrowPosition = $args['attrValue']['arrowPosition']?:'middle'; // default value
		
        $options = array(
            'top' 	 => 'position: relative;
						top: auto;
						left: auto;
						right: auto;
						transform: translateY(0);
						order: 0;',
            'middle' => 'position: absolute;
						top: 50%;
						left: 0;
						right: 0;
						transform: translateY(-50%);',
            'bottom' => 'position: relative;
						top: auto;
						left: auto;
						right: auto;
						transform: translateY(0);
						order: 2;',
        );
        return $options[$arrowPosition];
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

		if ( ! empty( $icon_attr ) ) {
			$style_declarations->add( 'content', '"' . Utils::process_font_icon( $icon_attr ) . '"' );
			$font_family = isset( $icon_attr['type'] ) && 'fa' === $icon_attr['type'] ? 'FontAwesome' : 'ETmodules';
			$style_declarations->add( 'font-family', $font_family );
		}

		return $style_declarations->value();
	}

}