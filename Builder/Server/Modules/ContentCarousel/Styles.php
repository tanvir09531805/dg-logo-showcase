<?php

namespace DIFL\Server\Modules\ContentCarousel;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

use ET\Builder\FrontEnd\Module\Style;
use ET\Builder\Packages\Module\Layout\Components\StyleCommon\CommonStyle;
use ET\Builder\Packages\Module\Options\Css\CssStyle;
use ET\Builder\Packages\StyleLibrary\Utils\StyleDeclarations;
use DIFL\Server\ModulesContentCarousel\ContentCarousel;

trait Styles {
	use CustomCss;

	public static function styles( $args ) {
		$attrs        = $args['attrs'] ?? [];
		$parent_attrs = $args['parentAttrs'] ?? [];
		$order_class  = $args['orderClass'];
		$elements     = $args['elements'];
		$settings     = $args['settings'] ?? [];
		$icon_selector= "{$order_class} .et-pb-icon";

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
					
					CommonStyle::style(
						[
							'selector' => "{$order_class} .df_cci_image_container",
							'attr'     => $attrs['imgOrder']['innerContent'] ?? '',
							'property' => 'order',
						]
					),
					CommonStyle::style(
						[
							'selector' => "{$order_class} .df_cc_title",
							'attr'     => $attrs['titleOrder']['innerContent'] ?? '',
							'property' => 'order',
						]
					),
					CommonStyle::style(
						[
							'selector' => "{$order_class} .df_cc_subtitle",
							'attr'     => $attrs['subTitleOrder']['innerContent'] ?? '',
							'property' => 'order',
						]
					),
					CommonStyle::style(
						[
							'selector' => "{$order_class} .df_cc_content",
							'attr'     => $attrs['contentOrder']['innerContent'] ?? '',
							'property' => 'order',
						]
					),
					CommonStyle::style(
						[
							'selector' => "{$order_class} .df_cci_button_wrapper",
							'attr'     => $attrs['btnOrder']['innerContent'] ?? '',
							'property' => 'order',
						]
					),

					CommonStyle::style(
						[
							'selector' => "{$order_class} .df_cc_arrows div:after",
							'attr'     => $attrs['arrows']['advanced']['arrowIconColor'] ?? '',
							'property' => 'color',
						]
					),
					CommonStyle::style(
						[
							'selector' => "{$order_class} .df_cc_arrows div",
							'attr'     => $attrs['arrows']['advanced']['arrowBgColor'] ?? '',
							'property' => 'background-color',
						]
					),

					CommonStyle::style(
						[
							'selector' => "{$order_class} .df_cc_arrows>div",
							'attr'     => $attrs['arrows']['advanced']['circleArrow'] ?? [],
							'declarationFunction' => [ self::class, 'df_circle_icon' ],
						]
					),

					CommonStyle::style(
						[
							'selector' => "{$order_class} .df_cc_arrows div",
							'attr'     => $attrs['arrows']['advanced'] ?? [],
							'declarationFunction' => [ self::class, 'df_arrow_opacity' ],
						]
					),
					CommonStyle::style(
						[
							'selector'  		  => "{$order_class} .df_cc_arrows",
							'attr'                => $attrs['arrows']['advanced'] ?? [],
							'declarationFunction' => [ self::class, 'df_arrow_pos_styles' ], 
						]
					),
					CommonStyle::style(
						[
							'selector'  		  => "{$order_class} .df_cc_arrows",
							'attr'                => $attrs['arrows']['advanced'] ?? [],
							'declarationFunction' => [ self::class, 'df_arrow_alignment_styles' ], 
						]
					),
					
					// Prev icon style.
					$elements->style(
						[
							'attrName' => 'arrowPrevIcon',
						]
					),
					// Next icon style.
					$elements->style(
						[
							'attrName' => 'arrowNextIcon',
						]
					),
					
					CommonStyle::style(
						[
							'selector' => "{$order_class} .df_cc_arrows div.swiper-button-next:after",
							'attr'     => $attrs['arrowNextIcon']['decoration']['sizing'] ?? '',
							'property' => 'font-size',
						]
					),
					CommonStyle::style(
						[
							'selector' => "{$order_class} .df_cc_arrows div.swiper-button-prev:after",
							'attr'     => $attrs['arrowPrevIcon']['decoration']['sizing'] ?? '',
							'property' => 'font-size',
						]
					),

					// dot navigation color.
					CommonStyle::style(
						[
							'selector' => "{$order_class} .swiper-pagination span",
							'attr'     => $attrs['dotNavigation']['decoration']['dotsColor'] ?? '',
							'property' => 'background',
						]
					),
					// dot navigation active color.
					CommonStyle::style(
						[
							'selector' => "{$order_class} .swiper-pagination span.swiper-pagination-bullet-active",
							'attr'     => $attrs['dotNavigation']['decoration']['activeDotsColor'] ?? '',
							'property' => 'background',
						]
					),
					// dot navigation large active dots.
					CommonStyle::style(
						[
							'selector' => "{$order_class} .swiper-pagination span.swiper-pagination-bullet-active",
							'attr'     => $attrs['dotNavigation']['decoration']['largeActiveDots'] ?? [],
							'declarationFunction' => [ self::class, 'df_large_active_dot' ], 
						]
					),
					// dot navigation alignment
					CommonStyle::style(
						[
							'selector' => "{$order_class} .swiper-pagination",
							'attr'     => $attrs['dotNavigation']['decoration']['dotsAlignment'] ?? '',
							'property' => 'text-align',
						]
					),
					// dot navigation vertical position
					CommonStyle::style(
						[
							'selector' => "{$order_class} .swiper-pagination",
							'attr'     => $attrs['dotNavigation']['decoration']['verticalPosition'] ?? '',
							'property' => 'top',
						]
					),

					// carousel wrapper spacing
					$elements->style(
						[
							'attrName' => 'carouselWPadding',
						]
					),
					// Item wrapper spacing
					$elements->style(
						[
							'attrName' => 'itemWrapperSpacing',
						]
					),
					// Image wrapper spacing
					$elements->style(
						[
							'attrName' => 'imageWrapperSpacing',
						]
					),
					// Image Margin
					$elements->style(
						[
							'attrName' => 'cImageSpacing',
						]
					),
					// Title spacing
					$elements->style(
						[
							'attrName' => 'cTitleSpacing',
						]
					),
					// Subtitle spacing
					$elements->style(
						[
							'attrName' => 'cSubTitleSpacing',
						]
					),
					// Content spacing
					$elements->style(
						[
							'attrName' => 'contentSpacing',
						]
					),

					// Title
					$elements->style(
						[
							'attrName' => 'title',
						]
					),
					// SubTitle
					$elements->style(
						[
							'attrName' => 'subTitle',
						]
					),
					// Content
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
					CommonStyle::style(
						[
							'selector' => "{$order_class} .df_cci_button",
							'attr'     => $attrs['button']['decoration']['fullWidth'] ?? '',
							'declarationFunction' => [ self::class, 'df_btn_full_width' ],
						]
					),
					CommonStyle::style(
						[
							'selector' => "{$order_class} .df_cci_button:before, {$order_class} .df_cci_button:after",
							'attr'     => $attrs['btnIconSizeMargin']['decoration']['sizing'] ?? [],
							'declarationFunction' => [ self::class, 'df_btn_icon_sizing' ],
						]
					),
					CommonStyle::style(
						[
							'selector' => "{$order_class} .df_cci_button:before, {$order_class} .df_cci_button:after",
							'attr'     => $attrs['btnIconSizeMargin']['decoration']['spacing'] ?? [],
							'declarationFunction' => [ self::class, 'df_btn_icon_spacing' ],
						]
					),

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
     * Force Full Width image styles
     *
     * @param String 
     * @return String
     */
    public static function df_btn_full_width(array $args ): string {
		$btnFullWidth = ($args['attrValue'] === 'on') ? 'width: 100%;' : '';
        return $btnFullWidth;
    }

	public static function df_circle_icon(array $args ): string {
		$iconRadius = ($args['attrValue'] === 'on') ? 'border-radius: 50%;' : '';
        return $iconRadius;
    }

	public static function df_large_active_dot(array $args ): string {
		$large_dot = ($args['attrValue'] === 'on') ? 'width: 40px; border-radius: 20px;' : '';
        return $large_dot;
    }
	public static function df_arrow_opacity(array $args ): string {

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
			$arrowOpacity  = isset( $icon_attr['arrowOpacity'] ) ? $icon_attr['arrowOpacity'] : '';
			$style_declare->add( 'opacity', $arrowOpacity);
		}

		return $style_declare->value();
    }

	/**
     * Arrow Position styles
     *
     * @param String | position
     * @return String
     */
    public static function df_arrow_pos_styles(array $args ): string {

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

	/**
     * Arrow Alignment styles
     *
     * @param String | Alignment
     * @return String
     */
    public static function df_arrow_alignment_styles(array $args ): string {

		$arrowAlign = $args['attrValue']['arrowAlignment']?:'space-between'; // default value
		$style_set  = new StyleDeclarations(
			[
				'returnType' => 'string',
				'important'  => false,
			]
		);
        
		$style_set->add( 'justify-content', $arrowAlign );
		
		return $style_set->value();
    }
	
}