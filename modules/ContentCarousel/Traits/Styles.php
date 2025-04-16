<?php

namespace DIVIFLASH\Modules\ContentCarousel\Traits;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

use ET\Builder\FrontEnd\Module\Style;
use ET\Builder\Packages\Module\Layout\Components\StyleCommon\CommonStyle;
use ET\Builder\Packages\Module\Options\Css\CssStyle;
use ET\Builder\Packages\StyleLibrary\Utils\StyleDeclarations;
use DIVIFLASH\Modules\ContentCarousel\ContentCarousel;

trait Styles {
	use CustomCss;

	/**
	 * Child Module's style components.
	 *
	 * This function is equivalent of JS function ModuleStyles located in
	 * src/components/parent-module/styles.tsx.
	 *
	 * @param array $args {
	 *     An array of arguments.
	 *
	 * @type string $id Module ID. In VB, the ID of module is UUIDV4. In FE, the ID is order index.
	 * @type string $name Module name.
	 * @type string $attrs Module attributes.
	 * @type string $parentAttrs Parent attrs.
	 * @type string $orderClass Selector class name.
	 * @type string $parentOrderClass Parent selector class name.
	 * @type string $wrapperOrderClass Wrapper selector class name.
	 * @type string $settings Custom settings.
	 * @type string $state Attributes state.
	 * @type string $mode Style mode.
	 * @type ModuleElements $elements ModuleElements instance.
	 * }
	 * @since ??
	 */
	public static function styles( $args ) {
		$attrs        = $args['attrs'] ?? [];
		$parent_attrs = $args['parentAttrs'] ?? [];
		$order_class  = $args['orderClass'];
		$elements     = $args['elements'];
		$settings     = $args['settings'] ?? [];

		$icon_selector  = "{$order_class} .et-pb-icon";
		$proImgSelector = "{$order_class} .difl_bento_grid__inner__image .__image";

		
		// error_log(print_r( '$settingskjkkkkk', true));
		// test_log('parent mosule settings');

		// $attrs['arrows']['advanced']['arrowPosition']['desktop']['value']['arrowPosition']
		// test_log($attrs['settingCarousel']['arrows']['advanced']);


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

					// Profile Image Size
					CommonStyle::style(
						[
							'selector' => $proImgSelector,
							'attr'     => $attrs['profile']['innerContent']['size'] ?? [],
							'property' => 'width',
						]
					),
					CommonStyle::style(
						[
							'selector' => $proImgSelector,
							'attr'     => $attrs['profile']['innerContent']['size'] ?? [],
							'property' => 'height',
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
							'attr'     => $attrs['arrows']['advanced']['arrowOpacity'] ?? [],
							'declarationFunction' => [ self::class, 'df_arrow_opacity' ],
						]
					),
					CommonStyle::style(
						[
							'selector'  		  => "{$order_class} .df_cc_arrows",
							'attr'                => $attrs['arrows']['advanced']['arrowPosition'] ?? [],
							'declarationFunction' => [ self::class, 'df_arrow_pos_styles' ], 
						]
					),
					CommonStyle::style(
						[
							'selector'  		  => "{$order_class} .df_cc_arrows",
							'attr'                => $attrs['arrows']['advanced']['arrowAlignment'] ?? [],
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

					/*
					 * We need to add CssStyle at the very bottom of other
					 * components so that custom css can override module styles
					 * till we find a more elegant solution.
					 
						CssStyle::style(
							[
								// 'atRules'   => '@media only screen and (max-width: 767px)', // false,
								'atRules'   => false,
								'selector'  => "{$order_class} .df_cc_arrows",
								'declaration' => self::df_arrow_pos_styles($pos), // 'color: red;'
							]
						),
					*/

					/* Row/Column Span */
					CommonStyle::style(
						[
							'selector'            => "{$order_class} .difl_bento_grid__inner",
							'attr'                => $attrs['gridLayout']['decoration'] ?? [],
							'declarationFunction' => [ self::class, 'grid_layout_style_declaration' ],
						]
					),
				],
			]
		);
	}

	public static function df_circle_icon(array $args ): string {

		// test_log($args['attrValue']);

		$iconRadius = ($args['attrValue'] === 'on') ? 'border-radius: 50%;' : '';
        
        return $iconRadius;
    }
	public static function df_large_active_dot(array $args ): string {

		// test_log($args['attrValue']);

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


	public static function grid_layout_style_declaration( array $args ): string {
		$columnCount = $args['attrValue']['columnCount'] ?? [];
		$rowCount    = $args['attrValue']['rowCount'] ?? [];
		$gridGap     = $args['attrValue']['gridGap'] ?? [];

		$style_declarations = new StyleDeclarations(
			[
				'returnType' => 'string',
				'important'  => false,
			]
		);

		if ( $columnCount ) {
			$style_declarations->add( 'grid-template-columns', "repeat({$columnCount}, 1fr)" );
		}
		if ( $rowCount ) {
			$style_declarations->add( 'grid-template-rows', "repeat({$rowCount}, 1fr)" );
		}
		if ( $gridGap ) {
			$style_declarations->add( 'gap', $gridGap );
		}

		return $style_declarations->value();
	}
}