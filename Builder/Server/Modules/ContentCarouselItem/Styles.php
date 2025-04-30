<?php

namespace DIFL\Server\Modules\ContentCarouselItem;

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
use DIFL\Server\Modules\ContentCarouselItem\ContentCarouselItem;
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

		$parent_default_attributes = ModuleRegistration::get_default_attrs( 'difl/bento-grid' );
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
					/* Image Spacing */
					$elements->style(
						[
							'attrName' => 'useImage',
						]
					),
					
					// Icon.
					CommonStyle::style(
						[
							'selector' => $icon_selector,
							'attr'     => $attrs['useIcon']['decoration'] ?? [],
							'declarationFunction' => [ self::class, 'df_circle_icon' ],
						]
					),
					CommonStyle::style(
						[
							'selector' => "{$order_class} .df_cci_image_container",
							'attr'     => $attrs['useIcon']['decoration'] ?? [],
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

					// useImage.decoration.fullWidth
					($attrs['useImage']['decoration']['fullWidth']['desktop']['value'] ?? "off") ==='off' ? 
					CommonStyle::style(
						[
							'selector' => "{$order_class} .df_cci_image_container img",
							'attr'     => $attrs['useImage']['decoration']['maxWidth'] ?? '',
							'property' => 'max-width',
						]
					) : [],
					($attrs['useImage']['decoration']['fullWidth']['desktop']['value'] ?? "off") ==='off' ? 
					CommonStyle::style(
						[
							'selector' => "{$order_class} .df_cci_image_container",
							'attr'     => $attrs['useImage']['decoration']['imageAlignment'] ?? '',
							'property' => 'text-align',
						]
					) : [],
					
					CommonStyle::style(
						[
							'selector' => "{$order_class} .df_cci_image_container img",
							'attr'     => $attrs['useImage']['decoration']['fullWidth'] ?? '',
							'declarationFunction' => [ self::class, 'df_img_force_full_width' ],
						]
					),
					CommonStyle::style(
						[
							'selector' => ".difl_contentcarousel {$order_class} .df_cci_button:before, .difl_contentcarousel {$order_class} .df_cci_button:after",
							'attr'     => $attrs['btnIconSizeMargin']['decoration']['sizing'] ?? [],
							'declarationFunction' => [ self::class, 'df_btn_icon_sizing' ],
						]
					),
					CommonStyle::style(
						[
							'selector' => ".difl_contentcarousel {$order_class} .df_cci_button:before, .difl_contentcarousel {$order_class} .df_cci_button:after",
							'attr'     => $attrs['btnIconSizeMargin']['decoration']['spacing'] ?? [],
							'declarationFunction' => [ self::class, 'df_btn_icon_spacing' ],
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
					
					/* Item Wrapper Spacing */
					$elements->style(
						[
							'attrName' => 'cWrapItem',
						]
					),
					/* Image Wrapper Spacing */
					$elements->style(
						[
							'attrName' => 'cWrapImage',
						]
					),
					
					// CommonStyle::style(
					// 	[
					// 		'selector' => $icon_selector,
					// 		'attr'     => $attrs['useIcon']['decoration']['icon'] ?? [],
					// 		'declarationFunction' => [ self::class, 'icon_font_declaration' ],
					// 	]
					// ),
					
				],
			]
		);
	}
	
	/**
     * Button Icon size
     *
     * @param String 
     * @return String
     */
    public static function df_btn_icon_sizing(array $args ): string {

		$sizeIcon = substr($args['attrValue'], 0, -2);
		$iconSize = ( isset( $args['attrValue'] ) && (int)$sizeIcon>0 ) ? 
			'font-size: '.$args['attrValue'].' !important;
			line-height: 0 !important;
			position: relative;' : '';
        return $iconSize;
    }

	/**
     * Button Icon spacing
     *
     * @param String 
     * @return String
     */
    public static function df_btn_icon_spacing(array $args ): string {

		$top 	= isset( $args['attrValue']['margin']['top'] ) ? $args['attrValue']['margin']['top'] : '';
		$right  = isset( $args['attrValue']['margin']['right'] ) ? $args['attrValue']['margin']['right'] : '';
		$left   = isset( $args['attrValue']['margin']['left'] ) ? $args['attrValue']['margin']['left'] : '';
		$bottom = isset( $args['attrValue']['margin']['bottom'] ) ? $args['attrValue']['margin']['bottom'] : '';

		$iconSpacing = isset( $args['attrValue']['margin'] ) ? 
			'top: '.$top.';
			right: '.$right.';
			left: '.$left.';
			bottom: '.$bottom.'; ' : '';
        return $iconSpacing;
    }

	/**
     * Icon bg radius styles
     *
     * @param String 
     * @return String
     */
    public static function df_circle_icon(array $args ): string {
		$iconRadius = ( isset($args['attrValue']['circleIcon']) && $args['attrValue']['circleIcon'] === 'on') ? 'border-radius: 50%;' : '';
        return $iconRadius;
    }

	/**
     * Force Full Width image styles
     *
     * @param String
     * @return String
     */
    public static function df_img_force_full_width(array $args ): string {
		$imgFullWidth = ($args['attrValue'] === 'on') ? 'width: 100%;' : '';
        return $imgFullWidth;
    }

	/**
     * Icon Alignment styles
     *
     * @param String 
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