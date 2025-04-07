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
					/* Row/Column Span */
					CommonStyle::style(
						[
							'selector'            => "{$order_class} .difl_bento_grid__inner",
							'attr'                => $attrs['gridLayout']['decoration'] ?? [],
							'declarationFunction' => [ self::class, 'grid_layout_style_declaration' ],
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
					// CommonStyle::style(
					// 	[
					// 		'selector'  		  => "{$order_class} .df_cc_arrows",
					// 		'attr'                => $attrs['arrows']['advanced']['arrowAlignment'] ?? [], 
					// 		'property'			  => 'justify-content',
					// 	]
					// ),


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