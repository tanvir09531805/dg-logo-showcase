<?php

namespace DIFL\Server\Modules\ImageReveal;

use DIFL\D5\Helper\Styles;
use ET\Builder\Framework\DependencyManagement\Interfaces\DependencyInterface;
use ET\Builder\Framework\Utility\HTMLUtility;
use ET\Builder\FrontEnd\BlockParser\BlockParserStore;
use ET\Builder\FrontEnd\Module\Style;
use ET\Builder\Packages\IconLibrary\IconFont\Utils;
use ET\Builder\Packages\Module\Layout\Components\ModuleElements\ModuleElements;
use ET\Builder\Packages\Module\Layout\Components\MultiView\MultiViewScriptData;
use ET\Builder\Packages\Module\Layout\Components\StyleCommon\CommonStyle;
use ET\Builder\Packages\Module\Module;
use ET\Builder\Packages\Module\Options\Css\CssStyle;
use ET\Builder\Packages\Module\Options\Element\ElementComponents;
use ET\Builder\Packages\ModuleLibrary\ModuleRegistration;
use ET\Builder\Packages\StyleLibrary\Utils\StyleDeclarations;
use WP_Block;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

class ImageReveal implements DependencyInterface {

	public static function custom_css() {
		return \WP_Block_Type_Registry::get_instance()->get_registered( 'difl/image-reveal' )->customCssFields;
	}

	public static function styles( array $args ): void {
		$attrs    = $args['attrs'] ?? [];
		$elements = $args['elements'];
		$settings = $args['settings'] ?? [];

		// Overlay Container Class
		$__class__overlay_container     = $args['orderClass'] . ' .difl__image_reveal_wrapper .difl__image_reveal_overlay';
		$__class__hover_overlay_content = $args['orderClass'] . ' .difl__image_reveal_wrapper .difl__image_reveal_hover_overlay .difl__image_reveal_hover_overlay_content';

		// Hover Zoom Effect Classes
		$__class__hover_image_effect       = $args['orderClass'] . ' .difl__image_reveal_wrapper .difl__image_reveal_content img';
		$__class__hover_image_effect_hover = $args['orderClass'] . ' .difl__image_reveal_wrapper .difl__image_reveal_content:hover img';

		// Overlay field diclaretion
		$__field__overlay_enable    = $attrs['content_overlay']['innerContent']['field_overlay_enable']['desktop']['value'] ?? "off";
		$__field__overlay_color     = $attrs['content_overlay']['decoration']['field_overlay_color']['desktop']['value'] ?? "#ffffff";
		$__field__overlay_opacity   = $attrs['content_overlay']['decoration']['field_overlay_opacity']['desktop']['value'] ?? 0.15;
		$__field__reveal_directions = $attrs['content_reveal_animation']['decoration']['field_reveal_directions']['desktop']['value'] ?? "reveal_ltr";

		// Caption Field Declaration
		$__field__caption_enable = $attrs['content_caption']['innerContent']['field_caption_enable']['desktop']['value'] ?? "off";

		// Allignment, Force Full width Field Declaration
		$__field__force_full_width             = $attrs['width']['decoration']['force_fullwidth']['desktop']['value'] ?? 'off';

		// Reveal Animation Time, Delay Field Declaration
		$__field__reveal_animation_delay = $attrs['content_reveal_animation']['decoration']['field_reveal_delay']['desktop']['value'] ?? '0';
		$__field__reveal_animation_time  = $attrs['content_reveal_animation']['decoration']['field_reveal_animation_time']['desktop']['value'] ?? '1';

		// Reveal Effect Field Declaration
		$__field__reveal_effects      = $attrs['content_reveal_animation']['decoration']['field_reveal_effects']['desktop']['value'] ?? "none";
		$__field__reveal_effect_delay = $attrs['content_reveal_animation']['decoration']['field_reveal_effect_delay']['desktop']['value'] ?? 0;
		$__field__reveal_effect_time  = $attrs['content_reveal_animation']['decoration']['field_reveal_effect_animation_time']['desktop']['value'] ?? 1;

		// Hover Overlay Color, Opacity, Transition Delay, Transition Time Field Declaration
		$__field__hover_overlay_enable              = $attrs['content_hover_overlay']['innerContent']['field_hover_overlay_enable']['desktop']['value'] ?? "off";
		$__field__hover_overlay_color               = $attrs['content_hover_overlay']['decoration']['field_hover_overlay_color']['desktop']['value'] ?? "#ffffff";
		$__field__hover_overlay_opacity             = $attrs['content_hover_overlay']['decoration']['field_hover_overlay_opacity']['desktop']['value'] ?? 0.3;
		$__field__hover_overlay_transition_time     = $attrs['content_hover_overlay']['decoration']['field_hover_overlay_transition_time']['desktop']['value'] ?? 0.6;
		$__field__hover_overlay_transition_delay    = $attrs['content_hover_overlay']['decoration']['field_hover_overlay_transition_delay']['desktop']['value'] ?? 0;
		$__field__hover_overlay_arrive_from         = $attrs['content_hover_overlay']['innerContent']['field_hover_overlay_arrive_from']['desktop']['value'] ?? "right";
		$__field__hover_overlay_content_arrive_from = $attrs['content_hover_overlay']['innerContent']['field_hover_overlay_content_arrive_from']['desktop']['value'] ?? "right";
		$__field__hover_overlay_content_placement   = $attrs['content_hover_overlay']['decoration']['field_hover_overlay_content_placement']['desktop']['value'];
		$__field__hover_overlay_content_alignment   = $attrs['content_hover_overlay']['decoration']['field_hover_overlay_content_alignment']['desktop']['value'];

		// Hover Zoom Effect Field Declaration
		$__field__hover_image_effect_enable = $attrs['content_hover_overlay']['innerContent']['field_hover_image_effect_enable']['desktop']['value'] ?? "off";
		$__field__hover_image_effect_style  = $attrs['content_hover_overlay']['innerContent']['field_effect_style']['desktop']['value'] ?? "none";
		$__field__zoom_scale                = $attrs['content_hover_overlay']['decoration']['field_zoom_scale']['desktop']['value'] ?? 1.5;
		$__field__zooming_time              = $attrs['content_hover_overlay']['decoration']['field_zooming_time']['desktop']['value'] ?? 0.25;
		$__field__Speed_curve               = $attrs['content_hover_overlay']['decoration']['field_Speed_curve']['desktop']['value'] ?? "ease-in";
		$__field__zoom_rotate               = $attrs['content_hover_overlay']['decoration']['field_zoom_rotate']['desktop']['value'] ?? 25;
		$__field__zooming_blur_out_time     = $attrs['content_hover_overlay']['decoration']['field_zooming_blur_out_time']['desktop']['value'] ?? 25;
		$__field__zooming_blur_level        = $attrs['content_hover_overlay']['decoration']['field_zooming_blur_level']['desktop']['value'] ?? 2;
		$__field__zooming_grayscale         = $attrs['content_hover_overlay']['decoration']['field_grayscale']['desktop']['value'] ?? 100;


		$__field__reveal_color_bg_use_gradient = $attrs['content_reveal_animation']['decoration']['background']['desktop']['value']['gradient']['enabled'] ?? 'off';

		$reveal_in_anim                 = (float) $__field__reveal_animation_time / 2.0;
		$reveal_out_anim                = (float) $__field__reveal_animation_time / 2.0;
		$reveal_out_delay               = (float) $__field__reveal_animation_delay + (float) $reveal_in_anim;
		$img_anim_time                  = ( $__field__reveal_directions === 'reveal_ltr' ) ? $__field__reveal_animation_time : '0';

		$__class__reveal_direction = [
			'reveal_ltr' => [
				'class'         => 'difl__image_reveal_lr',
				'animation_in'  => 'imageRevealLR',
				'animation_out' => 'imageRevealOutLR',
			],
			'reveal_rtl' => [
				'class'         => 'difl__image_reveal_rl',
				'animation_in'  => 'imageRevealRL',
				'animation_out' => 'imageRevealOutRL',
			],
			'reveal_ttb' => [
				'class'         => 'difl__image_reveal_tb',
				'animation_in'  => 'imageRevealTB',
				'animation_out' => 'imageRevealOutTB',
			],
			'reveal_btt' => [
				'class'         => 'difl__image_reveal_bt',
				'animation_in'  => 'imageRevealBT',
				'animation_out' => 'imageRevealOutBT',
			],
		];

		$effect_total_delay = (float) $__field__reveal_effect_delay + (float) $__field__reveal_animation_delay;

		$ho_anim_time = $attrs['content_hover_overlay']['decoration']['field_hover_overlay_transition_time']['desktop']['value'] ?? '0.6s';
		if ( substr( $ho_anim_time, - 1 ) !== 's' ) {
			$ho_anim_time .= 's';
		}
		$ho_anim_delay = $attrs['content_hover_overlay']['decoration']['field_hover_overlay_transition_delay']['desktop']['value'] ?? '0s';
		if ( substr( $ho_anim_delay, - 1 ) !== 's' ) {
			$ho_anim_delay .= 's';
		}

		$__field__hover_overlay_arrive_from = $attrs['content_hover_overlay']['innerContent']['field_hover_overlay_arrive_from']['desktop']['value'] ?? 'left';

		$__class__hover_overlay_reveal_direction = [
			'left'        => [
				'class'          => 'difl__hover_overlay_lr',
				'animation_in'   => 'imageRevealLR',
				'animation_out'  => 'linear',
				'animation_mode' => 'forwards',
			],
			'right'       => [
				'class'          => 'difl__hover_overlay_rl',
				'animation_in'   => 'imageRevealRL',
				'animation_out'  => 'linear',
				'animation_mode' => 'forwards',
			],
			'top'         => [
				'class'          => 'difl__hover_overlay_tb',
				'animation_in'   => 'imageRevealTB',
				'animation_out'  => 'linear',
				'animation_mode' => 'forwards',
			],
			'bottom'      => [
				'class'          => 'difl__hover_overlay_bt',
				'animation_in'   => 'imageRevealBT',
				'animation_out'  => 'linear',
				'animation_mode' => 'forwards',
			],
			'linear'      => [
				'class'          => 'difl__hover_overlay_linear',
				'animation_in'   => 'overlayViewer',
				'animation_out'  => 'linear',
				'animation_mode' => 'both',
			],
			'ease_in_out' => [
				'class'          => 'difl__hover_overlay_ease_in_out',
				'animation_in'   => 'overlayViewer',
				'animation_out'  => 'ease-in-out',
				'animation_mode' => 'both',
			],
			'ease'        => [
				'class'          => 'difl__hover_overlay_ease',
				'animation_in'   => 'overlayViewer',
				'animation_out'  => 'ease',
				'animation_mode' => 'both',
			],
			'ease_in'     => [
				'class'          => 'difl__hover_overlay_ease_in',
				'animation_in'   => 'overlayViewer',
				'animation_out'  => 'ease-in',
				'animation_mode' => 'both',
			],
			'ease_out'    => [
				'class'          => 'difl__hover_overlay_ease_out',
				'animation_in'   => 'overlayViewer',
				'animation_out'  => 'ease-out',
				'animation_mode' => 'both',
			],
		];

		$__field__hover_overlay_content_placement = $attrs['content_hover_overlay']['decoration']['field_hover_overlay_content_placement']['desktop']['value'] ?? 'center';
		$__field__hover_overlay_content_alignment = $attrs['content_hover_overlay']['decoration']['field_hover_overlay_content_alignment']['desktop']['value'] ?? 'center';

		$__field__hover_overlay_content_arrive_from = $attrs['content_hover_overlay']['decoration']['field_hover_overlay_content_arrive_from']['desktop']['value'] ?? 'left';
		$__class__hover_overlay_content_arrive_from = [
			'left'   => [ 'transform' => 'translateX(-2rem)' ],
			'right'  => [ 'transform' => 'translateX(2rem)' ],
			'top'    => [ 'transform' => 'translateY(-2rem)' ],
			'bottom' => [ 'transform' => 'translateY(2rem)' ],
		];

		$full_width_styles = [];
		if ( "on" === $__field__force_full_width ) {
			$full_width_styles[] = Styles::custom_style( [
				'attr'                   => $attrs['width']['decoration']['force_fullwidth'] ?? [],
				'selector'               => $args['orderClass'],
				'staticPropertyAndValue' => [
					'width'     => '100%',
					'max-width' => '100%',
				],
				'important'              => true
			] );
			$full_width_styles[] = Styles::custom_style( [
				'attr'                   => $attrs['width']['decoration']['force_fullwidth'] ?? [],
				'selector'               => $args['orderClass'] . ' .difl__image_wrap',
				'staticPropertyAndValue' => [
					'width'     => '100%',
					'max-width' => '100%',
				],
				'important'              => true
			] );
			$full_width_styles[] = Styles::custom_style( [
				'attr'                   => $attrs['width']['decoration']['force_fullwidth'] ?? [],
				'selector'               => $args['orderClass'] . ' .difl__image_wrap img',
				'staticPropertyAndValue' => [
					'width'     => '100%',
					'max-width' => '100%',
				],
				'important'              => true
			] );
		}

		$__style__hover_zoom_effect = [];
		if ( 'on' === $__field__hover_image_effect_enable && 'off' === $__field__hover_overlay_enable ) {
			if ( "zoom_in" === $__field__hover_image_effect_style ) {
				$__style__hover_zoom_effect[] = Styles::custom_style( [
					'attr'                   => $attrs['content_hover_overlay']['innerContent']['field_effect_style'] ?? [],
					'selector'               => $args['orderClass'] . " .difl__image_reveal_wrapper .difl__image_reveal_content:hover img",
					'staticPropertyAndValue' => [
						'transform-origin'  => 'center center',
						'transition'        => sprintf( 'transform %1$ss, visibility %2$ss %3$s',
							$__field__zooming_time,
							(float) $__field__zooming_time / 2,
							$__field__Speed_curve
						),
						'-ms-transform'     => sprintf( 'scale(%1$s)', $__field__zoom_scale ),
						'-webkit-transform' => sprintf( 'scale(%1$s)', $__field__zoom_scale ),
						'transform'         => sprintf( 'scale(%1$s)', $__field__zoom_scale ),
					]
				] );
			}
			if ( "zoom_n_rotate" === $__field__hover_image_effect_style ) {
				$__style__hover_zoom_effect[] = Styles::custom_style( [
					'attr'                   => $attrs['content_hover_overlay']['innerContent']['field_effect_style'] ?? [],
					'selector'               => $args['orderClass'] . " .difl__image_reveal_wrapper .difl__image_reveal_content:hover img",
					'staticPropertyAndValue' => [
						'transform-origin'  => 'center center',
						'transition'        => sprintf( 'transform %1$ss, visibility %2$ss %3$s',
							$__field__zooming_time,
							(float) $__field__zooming_time / 2,
							$__field__Speed_curve
						),
						'-ms-transform'     => sprintf( 'scale(%1$s) rotate(%2$sdeg)', $__field__zoom_scale, $__field__zoom_rotate ),
						'-webkit-transform' => sprintf( 'scale(%1$s) rotate(%2$sdeg)', $__field__zoom_scale, $__field__zoom_rotate ),
						'transform'         => sprintf( 'scale(%1$s) rotate(%2$sdeg)', $__field__zoom_scale, $__field__zoom_rotate ),
					]
				] );
			}
			if ( "blur_out_with_zooming_in" === $__field__hover_image_effect_style ) {
				$__style__hover_zoom_effect[] = Styles::custom_style( [
					'attr'                   => $attrs['content_hover_overlay']['innerContent']['field_effect_style'] ?? [],
					'selector'               => $args['orderClass'] . " .difl__image_reveal_wrapper .difl__image_reveal_content img",
					'staticPropertyAndValue' => [
						'transform'  => sprintf( 'scale(%1$s)', $__field__zoom_scale ),
						'transition' => sprintf( 'transform %1$ss, filter %2$ss %3$s',
							$__field__zooming_time,
							$__field__zooming_blur_out_time,
							$__field__Speed_curve
						),
						'filter'     => sprintf( 'blur(%1$spx)', $__field__zooming_blur_level ),

					]
				] );
				$__style__hover_zoom_effect[] = Styles::custom_style( [
					'attr'                   => $attrs['content_hover_overlay']['innerContent']['field_effect_style'] ?? [],
					'selector'               => $args['orderClass'] . " .difl__image_reveal_wrapper .difl__image_reveal_content:hover img",
					'staticPropertyAndValue' => [
						'transform' => "scale(1)",
						'filter'    => "blur(0)",

					]
				] );
			}
			if ( "colorize_with_zooming_in" === $__field__hover_image_effect_style ) {
				$__style__hover_zoom_effect[] = Styles::custom_style( [
					'attr'                   => $attrs['content_hover_overlay']['innerContent']['field_effect_style'] ?? [],
					'selector'               => $args['orderClass'] . " .difl__image_reveal_wrapper .difl__image_reveal_content img",
					'staticPropertyAndValue' => [
						'transition' => sprintf( 'transform %1$ss, filter %2$ss %3$s',
							$__field__zooming_time,
							$__field__zooming_time,
							$__field__Speed_curve
						),
						'filter'     => sprintf( 'grayscale(%1$s%)', $__field__zooming_grayscale ),

					]
				] );
				$__style__hover_zoom_effect[] = Styles::custom_style( [
					'attr'                   => $attrs['content_hover_overlay']['innerContent']['field_effect_style'] ?? [],
					'selector'               => $args['orderClass'] . " .difl__image_reveal_wrapper .difl__image_reveal_content:hover img",
					'staticPropertyAndValue' => [
						'transform' => sprintf( 'scale(%1$s)', $__field__zoom_scale ),
						'filter'    => "grayscale(0)",

					]
				] );
			}
		}

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

						$elements->style( [ 'attrName' => 'content_placeholder', ] ),
						$elements->style( [ 'attrName' => 'field_hover_overlay_container_padding', ] ),
						( "on" === $__field__caption_enable ) ? $elements->style( [ 'attrName' => 'content_caption', ] ) : [],
						( "on" === $__field__caption_enable ) ? $elements->style( [ 'attrName' => 'design_caption', ] ) : [],
						$elements->style( [ 'attrName' => 'design_hover_overlay_title', ] ),
						$elements->style( [ 'attrName' => 'design_hover_overlay_description', ] ),
						$elements->style( [ 'attrName' => 'width', ] ),
						$elements->style( [ 'attrName' => 'content_reveal_animation', ] ),

						( "on" === $__field__reveal_color_bg_use_gradient ) ?
							Styles::custom_style( [
								'attr'      => $attrs['content_reveal_animation']['decoration']['background'] ?? [],
								'selector'  => $args['orderClass'] . " .difl__image_reveal_wrapper .difl__image_reveal_element",
								'property'  => "background-color",
								'value'     => "transparent",
								'important' => true
							] ) : [],

						( "off" === $__field__reveal_color_bg_use_gradient ) ?
							Styles::custom_style( [
								'attr'     => $attrs['content_reveal_animation']['decoration']['background'] ?? [],
								'selector' => $args['orderClass'] . " .difl__image_reveal_wrapper .difl__image_reveal_element",
								'property' => "background-color",
								'value'    => "#ffffff"
							] ) : [],


						CommonStyle::style(
							[
								'selector'            => $args['orderClass'],
								'attr'                => $attrs['alignment']['decoration']['align'] ?? [],
								'declarationFunction' => function ( $params ) {

									$style_declarations = new StyleDeclarations(
										[
											'returnType' => 'string',
											'important'  => $params['important'],
										]
									);

									if ( in_array( $params['breakpoint'], [ 'tablet', 'phone' ] ) ) {
										$style_declarations->add( 'margin-left', $params['attrValue'] );
										$style_declarations->add( 'margin-right', $params['attrValue'] );
									}

									$margin_value = 'center' !== $params['attrValue'] ? '0' : '';
									$style_declarations->add( 'margin-' . $params['attrValue'], $margin_value );

									return $style_declarations->value();
								},
							]
						),

						( "on" === $__field__overlay_enable ) ?
							CommonStyle::style(
								[
									'selector' => $args['orderClass'] . " #difl--social-share--container.difl__social_share__container",
									'attr'     => $attrs['content_overlay']['decoration']['field_overlay_color'] ?? [],
									'property' => 'background',
									'value'    => self::hexToRgba( $__field__overlay_color, $__field__overlay_opacity )
								]
							) : [],

						// Reveal Direction
						CommonStyle::style(
							[
								'selector'               => $args['orderClass'] . " " . $__class__reveal_direction[ $__field__reveal_directions ]['class'] . ' img',
								'attr'                   => $attrs['content_reveal_animation']['decoration']['field_reveal_directions'] ?? [],
								'staticPropertyAndValue' => [
									'animation'         => sprintf( 'fadeInImg %1$ss %2$ss forwards', $img_anim_time, $reveal_out_delay ),
									'-webkit-animation' => sprintf( 'fadeInImg %1$ss %2$ss forwards', $img_anim_time, $reveal_out_delay ),
								],
							]
						),
						CommonStyle::style(
							[
								'selector'               => $args['orderClass'] . " " . $__class__reveal_direction[ $__field__reveal_directions ]['class'] . ' .difl__image_reveal_overlay',
								'attr'                   => $attrs['content_reveal_animation']['decoration']['field_reveal_directions'] ?? [],
								'staticPropertyAndValue' => [
									'animation'         => sprintf( 'fadeInImg %1$ss %2$ss linear forwards', $__field__reveal_animation_time, $reveal_out_delay ),
									'-webkit-animation' => sprintf( 'fadeInImg %1$ss %2$ss linear forwards', $__field__reveal_animation_time, $reveal_out_delay ),
								],
							]
						),
						CommonStyle::style(
							[
								'selector'               => $args['orderClass'] . " " . $__class__reveal_direction[ $__field__reveal_directions ]['class'] . ' .difl__image_reveal',
								'attr'                   => $attrs['content_reveal_animation']['decoration']['field_reveal_directions'] ?? [],
								'staticPropertyAndValue' => [
									'animation'                   => sprintf( '%1$s %2$ss %3$s %4$s %5$ss %6$ss',
										$__class__reveal_direction[ $__field__reveal_directions ]['animation_in'],
										$reveal_in_anim,
										$__field__reveal_animation_delay,
										$__class__reveal_direction[ $__field__reveal_directions ]['animation_out'],
										$reveal_out_anim,
										$reveal_out_delay
									),
									'-webkit-animation'           => sprintf( '%1$s %2$ss %3$s %4$s %5$ss %6$ss',
										$__class__reveal_direction[ $__field__reveal_directions ]['animation_in'],
										$reveal_in_anim,
										$__field__reveal_animation_delay,
										$__class__reveal_direction[ $__field__reveal_directions ]['animation_out'],
										$reveal_out_anim,
										$reveal_out_delay
									),
									'animation-fill-mode'         => 'forwards',
									'-webkit-animation-fill-mode' => 'forwards',
								],
							]
						),

						// Reveal Effect Style handler
						( "none" !== $__field__reveal_effects ) ?
							Styles::custom_style( [
								'attr'                   => $attrs['content_reveal_animation']['decoration']['field_reveal_effects'] ?? [],
								'selector'               => $args['orderClass'] . " .difl__image_reveal_wrapper .difl__animate",
								'staticPropertyAndValue' => [
									'animation-duration'         => $__field__reveal_effect_time . 's',
									'-webkit-animation-duration' => $__field__reveal_effect_time . 's',
									'animation-delay'            => $effect_total_delay . 's',
									'-webkit-animation-delay'    => $effect_total_delay . 's',
								]
							] ) : [],

						// Hover Overlay Color, Opacity, Transition Delay, Transition Time
						( "on" === $__field__hover_overlay_enable ) ?
							Styles::custom_style( [
								'attr'     => $attrs['content_hover_overlay']['decoration']['field_hover_overlay_color'] ?? [],
								'selector' => $__class__hover_overlay_content,
								'property' => 'background-color',
								'value'    => self::hexToRgba( $__field__hover_overlay_color, $__field__hover_overlay_opacity ),
							] ) : [],

						// Hover Overlay Animation Control
						Styles::custom_style( [
							'attr'                   => $attrs['content_hover_overlay']['innerContent']['field_hover_overlay_arrive_from'] ?? [],
							'selector'               => $args['orderClass'] . ":hover" . " .difl__image_reveal_wrapper ." . $__class__hover_overlay_reveal_direction[ $__field__hover_overlay_arrive_from ]['class'] . " .difl__image_reveal_hover_overlay_content",
							'staticPropertyAndValue' => [
								'-webkit-animation'           => sprintf( '%1$s %2$s %3$s %4$s',
									$__class__hover_overlay_reveal_direction[ $__field__hover_overlay_arrive_from ]['animation_in'],
									$ho_anim_time,
									$__class__hover_overlay_reveal_direction[ $__field__hover_overlay_arrive_from ]['animation_out'],
									$ho_anim_delay
								),
								'animation'                   => sprintf( '%1$s %2$s %3$s %4$s',
									$__class__hover_overlay_reveal_direction[ $__field__hover_overlay_arrive_from ]['animation_in'],
									$ho_anim_time,
									$__class__hover_overlay_reveal_direction[ $__field__hover_overlay_arrive_from ]['animation_out'],
									$ho_anim_delay
								),
								'-webkit-animation-fill-mode' => $__class__hover_overlay_reveal_direction[ $__field__hover_overlay_arrive_from ]['animation_mode'],
								'animation-fill-mode'         => $__class__hover_overlay_reveal_direction[ $__field__hover_overlay_arrive_from ]['animation_mode'],
							]
						] ),

						Styles::custom_style( [
							'attr'     => $attrs['content_hover_overlay']['innerContent']['field_hover_overlay_arrive_from'] ?? [],
							'selector' => $args['orderClass'] . " .difl__image_reveal_wrapper .difl__image_reveal_hover_overlay_content",
							'property' => "animation-duration",
							'value'    => '0.5s'
						] ),

						// Hover Overlay Content Control
						Styles::custom_style( [
							'attr'     => $attrs['content_hover_overlay']['decoration']['field_hover_overlay_content_placement'] ?? [],
							'selector' => $__class__hover_overlay_content,
							'property' => "justify-content",
							'value'    => $__field__hover_overlay_content_placement
						] ),
						Styles::custom_style( [
							'attr'     => $attrs['content_hover_overlay']['decoration']['field_hover_overlay_content_alignment'] ?? [],
							'selector' => $__class__hover_overlay_content,
							'property' => "align-items",
							'value'    => $__field__hover_overlay_content_alignment
						] ),

						// Hover Overlay Content Transition
						Styles::custom_style( [
							'attr'                   => $attrs['content_hover_overlay']['decoration']['field_hover_overlay_content_arrive_from'] ?? [],
							'selector'               => $args['orderClass'] . " .difl__image_reveal_hover_overlay_content .arrival",
							'staticPropertyAndValue' => [
								'transition' => sprintf( 'all 1s ease-in-out %1$s', $ho_anim_delay ),
								'transform'  => $__class__hover_overlay_content_arrive_from[ $__field__hover_overlay_content_arrive_from ]['transform'],
							]
						] ),

						( "on" === $__field__caption_enable ) ?
							CommonStyle::style(
								[
									'selector' => $args['orderClass'] . " .difl__image_reveal_wrapper .difl__image_wrap .difl_caption",
									'attr'     => $attrs['content_caption']['decoration']['field_caption_background'] ?? [],
									'property' => 'background',
								]
							) : [],


						// Module - Only for Custom CSS.
						CssStyle::style(
							[
								'selector'  => $args['orderClass'],
								'attr'      => $attrs['css'] ?? [],
//								'cssFields' => self::custom_css(),
							]
						),
					],
					$full_width_styles,
					// Hover Zoom Effect
					$__style__hover_zoom_effect
				)
			]
		);
	}

	public static function script_data( array $args ): void {
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
						'selector'      => "{$selector} .difl__social_share__header",
						'data'          => $attrs['settings']['innerContent']['enable_header'] ?? [],
						'valueResolver' => function ( $value ) {
							return 'on' === ( $value ?? 'off' ) ? 'visible' : 'hidden';
						},
					],
				],
			]
		);
	}


	public static function classnames( array $args ): void {
		$classnames_instance = $args['classnamesInstance'];
		$attrs               = $args['attrs'];

		$enable_header = $attrs['settings']['innerContent']['enable_header']['desktop']['value'] ?? "off";

		if ( 'on' === $enable_header ) {
			$classnames_instance->add( "has_header" );
		}
	}

	public static function enqueue_user_script( $attrs ) {
//		$package_build = new DiviPackageBuild( [
//			'name'   => 'divi-icon-library',
//			'script' => [
//				'enqueue_top_window' => false,
//			],
//			'style'  => [
//				'enqueue_top_window' => true,
//				'defer'              => true,
//			],
//		] );
//		$package_build_properties = $package_build->get_properties();
//		PackageBuildManager::register($package_build_properties);
//		$field_tooltip_enable  = $attrs['main_tooltip']['innerContent']['desktop']['value']['field_tooltip_enable'] ?? 'off';
//		if ( 'on' === $field_tooltip_enable ) {
//			wp_enqueue_script( 'image-hotspot-popper-script' );
//			wp_enqueue_script( 'image-hotspot-tippy-bundle-script' );
//		}
		?>
        <script type="text/javascript">
			( function () {
				const generateObserver = ( reveal_width ) => {
					return new IntersectionObserver( ( entries, observer ) => {
						entries.forEach( ( entry ) => {
							if ( entry.isIntersecting ) {
								const ir_content_area = entry.target;

								const imageWrap = ir_content_area.querySelector( '.difl__image_wrap' );
								const revealWrapper = ir_content_area.querySelector( '.difl__image_reveal_wrapper' );
								const revealElement = ir_content_area.querySelector( '.difl__image_reveal_element' );
								const revealWrapperImg = ir_content_area.querySelector( '.difl__image_reveal_wrapper img' );
								const hoverOverlayContent = ir_content_area.querySelector( '.difl__image_reveal_hover_overlay_content' );

								const settings = JSON.parse( revealWrapper.dataset.settings );
								const { revealDirectionClass, revealEffect, revealDelay, animationTime } = settings;

								revealWrapper.classList.add( revealDirectionClass );
								revealElement.classList.add( 'difl__image_reveal' );

								if ( revealEffect ) {
									imageWrap.classList.add( 'difl__animate', revealEffect );
								}

								if ( hoverOverlayContent ) {
									setTimeout( () => hoverOverlayContent.style.animationDuration = animationTime, 2000 );
								}

								revealElement.style.transform = 'scale(0, 1)';
								revealElement.style.transformOrigin = '100% 50%';
								revealElement.style.opacity = '1';

								const noscriptContent = ir_content_area.querySelector( 'noscript' ).textContent;
								const tempElement = new DOMParser().parseFromString( noscriptContent, 'text/html' ).querySelector( 'img' ).src;

								setTimeout( () => {
									revealWrapperImg.parentElement.style.opacity = '1';
									imageWrap.style.background = 'none';
								}, revealDelay * 1000 );

								function loadImage( url, selector ) {
									selector.src = url;
								}

								loadImage( tempElement, revealWrapperImg );

								observer.unobserve( entry.target );
							}
						} );
					}, { rootMargin: `0px 0px -${reveal_width}px 0px` } );
				};

				window.addEventListener( 'load', function () {
					const revealItems = document.querySelectorAll( '.difl_imagereveal' );

					revealItems.forEach( item => {
						const settings = JSON.parse( item.querySelector( '.difl__image_reveal_wrapper' ).dataset.settings );
						const reveal_width = ( ( window.innerHeight - 40 ) / 100 ) * parseInt( settings.revealPosition );

						generateObserver( reveal_width ).observe( item );

						const target = settings.link_url_target;
						if ( settings.use_light_box === 'on' ) {
							const lightboxOptions = {
								enable_light_box: true,
								filter: false,
								filterValue: '',
								download: settings.use_lightbox_download === 'on'
							};

							df_ir_use_lightbox( item.querySelector( '.difl__image_reveal_wrapper' ), lightboxOptions );
						} else {
							df_ir_url_open( target, item );
						}
					} );
				} );

				function df_ir_use_lightbox( selector, options ) {
					if ( options.enable_light_box === 'on' ) {
						selector.style.cursor = 'pointer';
						const settings = {
							subHtmlSelectorRelative: true,
							addClass: 'df_si_lightbox',
							download: options.download,
						};

						lightGallery( selector, settings );
					}
				}

				function df_ir_url_open( target, ele ) {
					const elements = ele.querySelector( '.difl__image_reveal_content' );
					const url = elements.dataset.url;
					if ( url && url !== '' ) {
						ele.style.cursor = 'pointer';
						ele.addEventListener( 'click', function () {
							if ( target === 'same_window' ) {
								window.location = url;
							} else {
								window.open( url );
							}
						} );
					} else {
						const img = ele.querySelector( 'img' );
						if ( img ) img.style.cursor = 'default';
					}
				}
			} )();
        </script>
		<?php
	}

	/**
	 * @param $hex
	 * @param $alpha
	 *
	 * @return string RGBA(0,0,0,0.1)
	 */
	public static function hexToRgba( $hex, $alpha = 1.0 ) {
		if ( preg_match( '/^#[a-f0-9]{6}$/i', $hex ) ) {
			$hex = ltrim( $hex, '#' );
			if ( strlen( $hex ) === 3 ) {
				$hex = str_repeat( substr( $hex, 0, 1 ), 2 ) . str_repeat( substr( $hex, 1, 1 ), 2 ) . str_repeat( substr( $hex, 2, 1 ), 2 );
			}
			$r = hexdec( substr( $hex, 0, 2 ) );
			$g = hexdec( substr( $hex, 2, 2 ) );
			$b = hexdec( substr( $hex, 4, 2 ) );

			return "rgba($r, $g, $b, $alpha)";
		}

		return $hex;

	}

	public static function getRevealDirection( $direction ) {
		switch ( $direction ) {
			case 'reveal_ltr':
				return 'difl__image_reveal_lr';
			case 'reveal_rtl':
				return 'difl__image_reveal_rl';
			case 'reveal_ttb':
				return 'difl__image_reveal_tb';
			case 'reveal_btt':
				return 'difl__image_reveal_bt';
			default:
				return 'difl__image_reveal_lr';
		}
	}

	public static function getHoverOverlayDirection( $direction ) {
		switch ( $direction ) {
			case 'left':
				return 'difl__hover_overlay_lr';
			case 'right':
				return 'difl__hover_overlay_rl';
			case 'top':
				return 'difl__hover_overlay_tb';
			case 'bottom':
				return 'difl__hover_overlay_bt';
			case 'linear':
				return 'difl__hover_overlay_linear';
			case 'ease_in_out':
				return 'difl__hover_overlay_ease_in_out';
			case 'ease':
				return 'difl__hover_overlay_ease';
			case 'ease_in':
				return 'difl__hover_overlay_ease_in';
			case 'ease_out':
				return 'difl__hover_overlay_ease_out';
			default:
				return 'difl__hover_overlay_lr';
		}
	}

	public static function generateHoverOverlay( $attrs ) {
		$field_hover_overlay_enable = $attrs['content_hover_overlay']['innerContent']['field_hover_overlay_enable']['desktop']['value'] ?? 'off';
		if ( "off" === $field_hover_overlay_enable ) {
			return "";
		}
		$field_hover_overlay_content_enable = $attrs['content_hover_overlay']['innerContent']['field_hover_overlay_content_enable']['desktop']['value'] ?? 'off';
		$field_hover_content_title_text     = $attrs['content_hover_overlay']['innerContent']['field_hover_content_title_text']['desktop']['value'] ?? 'Your Title Goes Here..';
		$field_hover_content_desc_text      = $attrs['content_hover_overlay']['innerContent']['field_hover_content_desc_text']['desktop']['value'] ?? 'Your Title Goes Here..';
		$field_hover_overlay_arrive_from    = $attrs['content_hover_overlay']['innerContent']['field_hover_overlay_arrive_from']['desktop']['value'] ?? 'left';

		$hover_overlay_content_title = HTMLUtility::render(
			[
				'tag'               => 'h3',
				'attributes'        => [
					'class' => 'title arrival',
				],
//				'childrenSanitizer' => 'et_core_esc_previously',
				'childrenSanitizer' => 'esc_attr',
				'children'          => $field_hover_content_title_text,
			]
		);

		$hover_overlay_content_desc = HTMLUtility::render(
			[
				'tag'               => 'div',
				'attributes'        => [
					'class' => 'description arrival',
				],
//				'childrenSanitizer' => 'et_core_esc_previously',
				'childrenSanitizer' => 'esc_attr',
				'children'          => $field_hover_content_desc_text,
			]
		);


		return HTMLUtility::render(
			[
				'tag'               => 'div',
				'attributes'        => [
					'class' => 'difl__image_reveal_hover_overlay ' . self::getHoverOverlayDirection( $field_hover_overlay_arrive_from )
				],
				'childrenSanitizer' => 'et_core_esc_previously',
				'children'          => HTMLUtility::render(
					[
						'tag'               => 'div',
						'attributes'        => [
							'class' => 'difl__image_reveal_hover_overlay_content'
						],
						'childrenSanitizer' => 'et_core_esc_previously',
						'children'          => ( "on" === $field_hover_overlay_content_enable ) ? $hover_overlay_content_title . $hover_overlay_content_desc : "",
					]
				),
			]
		);
	}

	public static function generateCaption( $image_caption, $attrs ) {
		if ( 'on' === $attrs['content_caption']['innerContent']['field_caption_enable']['desktop']['value'] ?? 'off' ) {
			$__field__caption_title = $attrs['content_caption']['innerContent']['field_caption_title']['desktop']['value'] ?? "";
			$generate_caption       = sprintf(
				'<div class="difl_caption">%1$s</div>',
				$__field__caption_title
			);

			return HTMLUtility::render(
				[
					'tag'               => 'div',
					'attributes'        => [
						'class' => 'difl_caption',
					],
					'childrenSanitizer' => 'et_core_esc_previously',
					'children'          => $__field__caption_title,
				]
			);
		}

		return "";
	}

	public static function render_callback( array $attrs, string $content, WP_Block $block, ModuleElements $elements ): string {
		self::enqueue_user_script( $attrs );

		$__field__image                         = $attrs['content_image']['innerContent']['field_image']['desktop']['value'] ?? "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTA4MCIgaGVpZ2h0PSI1NDAiIHZpZXdCb3g9IjAgMCAxMDgwIDU0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZmlsbD0iI0VCRUJFQiIgZD0iTTAgMGgxMDgwdjU0MEgweiIvPgogICAgICAgIDxwYXRoIGQ9Ik00NDUuNjQ5IDU0MGgtOTguOTk1TDE0NC42NDkgMzM3Ljk5NSAwIDQ4Mi42NDR2LTk4Ljk5NWwxMTYuMzY1LTExNi4zNjVjMTUuNjItMTUuNjIgNDAuOTQ3LTE1LjYyIDU2LjU2OCAwTDQ0NS42NSA1NDB6IiBmaWxsLW9wYWNpdHk9Ii4xIiBmaWxsPSIjMDAwIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz4KICAgICAgICA8Y2lyY2xlIGZpbGwtb3BhY2l0eT0iLjA1IiBmaWxsPSIjMDAwIiBjeD0iMzMxIiBjeT0iMTQ4IiByPSI3MCIvPgogICAgICAgIDxwYXRoIGQ9Ik0xMDgwIDM3OXYxMTMuMTM3TDcyOC4xNjIgMTQwLjMgMzI4LjQ2MiA1NDBIMjE1LjMyNEw2OTkuODc4IDU1LjQ0NmMxNS42Mi0xNS42MiA0MC45NDgtMTUuNjIgNTYuNTY4IDBMMTA4MCAzNzl6IiBmaWxsLW9wYWNpdHk9Ii4yIiBmaWxsPSIjMDAwIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz4KICAgIDwvZz4KPC9zdmc+Cg==";
		$__field__alt                           = $attrs['content_image']['innerContent']['alt']['desktop']['value'] ?? "";
		$__field__title_text                    = $attrs['content_image']['innerContent']['title_text']['desktop']['value'] ?? "";
		$__field__reveal_directions             = $attrs['content_reveal_animation']['decoration']['field_reveal_directions']['desktop']['value'] ?? "reveal_ltr";
		$__field__caption_enable                = $attrs['content_caption']['innerContent']['field_caption_enable']['desktop']['value'] ?? "off";
		$__field__caption_placement             = $attrs['content_caption']['innerContent']['field_caption_placement']['desktop']['value'] ?? "bottom";
		$__field__hover_overlay_transition_time = $attrs['content_hover_overlay']['decoration']['field_hover_overlay_transition_time']['desktop']['value'] ?? "0.6s";
		// Reveal Animation Time, Delay Field Declaration
		$__field__reveal_effects         = $attrs['content_reveal_animation']['innerContent']['field_reveal_effects']['desktop']['value'] ?? "none";
		$__field__reveal_animation_delay = $attrs['content_reveal_animation']['decoration']['field_reveal_delay']['desktop']['value'] ?? 0;
		$__field__reveal_animation_time  = $attrs['content_reveal_animation']['decoration']['field_reveal_animation_time']['desktop']['value'] ?? 1;
		$__field__lightbox_enable        = $attrs['content_link']['innerContent']['field_lightbox_enable']['desktop']['value'] ?? "off";
		$__field__link_url               = $attrs['content_link']['innerContent']['field_link_url']['desktop']['value'] ?? "";
		$__field__link_target            = $attrs['content_link']['innerContent']['field_link_target']['desktop']['value'] ?? "same_window";
		$__field__overlay_enable         = $attrs['content_overlay']['innerContent']['field_overlay_enable']['desktop']['value'] ?? "off";

		$srcset_sizes = et_get_image_srcset_sizes( $__field__image );
		$srcset       = "";
		$sizes        = "";

		if (
			isset( $srcset_sizes["srcset"], $srcset_sizes["sizes"] ) &&
			$srcset_sizes["srcset"] &&
			$srcset_sizes["sizes"]
		) {
			$srcset = $srcset_sizes["srcset"];
			$sizes  = $srcset_sizes["sizes"];
		}

		$attachment_id = et_get_attachment_id_by_url( $__field__image );
		$image_caption = wp_get_attachment_caption( $attachment_id );
		$image_size    = wp_get_attachment_image_src( $attachment_id, 'full' );
		$image_width   = isset( $image_size[1] ) ? $image_size[1] : "";
		$image_height  = isset( $image_size[2] ) ? $image_size[2] : "";

		$empty_image = "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%200%200'%3E%3C/svg%3E";

		$reveal_in_anim   = (float) $__field__reveal_animation_time / 2.0;
		$reveal_out_delay = (float) $__field__reveal_animation_delay + $reveal_in_anim;
		$ho_anim_time     = substr( $__field__hover_overlay_transition_time, - 1 ) !== 's' ? $__field__hover_overlay_transition_time . "s" : $__field__hover_overlay_transition_time;

		$__field__reveal_view_port = $attrs['content_reveal_animation']['decoration']['field_reveal_view_port']['desktop']['value'] ?? "25%";

		$data_settings = [
			'revealDirectionClass' => self::getRevealDirection( $__field__reveal_directions ) ?? "difl__image_reveal_lr",
			'revealPosition'       => str_replace( "%", "", $__field__reveal_view_port ) ?? "25",
			'revealEffect'         => 'none' !== $__field__reveal_effects ? $__field__reveal_effects : "",
			'revealDelay'          => $reveal_out_delay,
			'use_light_box'        => $__field__lightbox_enable,
			'link_url'             => 'off' === $__field__lightbox_enable ? $__field__link_url : '',
			'link_url_target'      => $__field__link_target,
			'animationTime'        => $ho_anim_time,
		];

		$custom_url = $__field__lightbox_enable === 'off' && $__field__link_url !== '' ?
			sprintf( 'data-url="%1$s"', $__field__link_url )
			: '';


		return Module::render(
			[
				// FE only.
				'orderIndex'      => $block->parsed_block['orderIndex'],
				'storeInstance'   => $block->parsed_block['storeInstance'],

				// VB equivalent.
				'attrs'           => $attrs,
				'elements'        => $elements,
				'id'              => $block->parsed_block['id'],
				'moduleClassName' => 'et_pb_icon',
				'name'            => $block->block_type->name,
//				'classnamesFunction'  => [ self::class, 'classnames' ],
				'moduleCategory'  => $block->block_type->category,
//				'scriptDataComponent' => [ self::class, 'script_data' ],
				'stylesComponent' => [ self::class, 'styles' ],
				'children'        => sprintf(
					'<div class="difl__image_reveal_wrapper" data-settings=\'%10$s\'>
                    <span class="difl__image_wrap link_lightbox" data-src="%14$s">
                        <div class="difl__image_reveal_content" %15$s>
                            <div class="difl__box_shadow_overlay"></div>
                            %12$s
                            <img
                                decoding="async"
                                fetchpriority="high"
                                src="%1$s"
                                alt="%3$s"
                                title="%4$s"                                
                                sizes="%6$s"
                                width="%7$s"
                                height="%8$s"
                            />
                            %13$s
                            <noscript><img
                                decoding="async"
                                src="%2$s"
                                srcSet="%5$s"
                            />
                            </noscript>
                        </div>
                        %9$s
                        %11$s
                        <div class="difl__image_reveal_element"></div>                        
                    </span>
                </div>',
					$empty_image,
					$__field__image,
					$__field__alt,
					$__field__title_text,
					$srcset,
					$sizes,
					$image_width,
					$image_height,
					'on' === $__field__overlay_enable ? '<div class="difl__image_reveal_overlay"></div>' : "",
					esc_attr( wp_json_encode( $data_settings ) ),
					self::generateHoverOverlay( $attrs ),
					'on' === $__field__caption_enable && 'top' === $__field__caption_placement ? self::generateCaption( $image_caption, $attrs ) : '',
					'on' === $__field__caption_enable && 'bottom' === $__field__caption_placement ? self::generateCaption( $image_caption, $attrs ) : '',
					$__field__image,
					$custom_url
				),
			]
		);
	}

	public function load(): void {
//		add_filter( 'divi_conversion_presets_attrs_map', array( moduleNamePresetAttrsMap::class, 'get_map' ), 10, 2 );

		add_action(
			'init',
			function () {
				ModuleRegistration::register_module(
					DIFL_MODULES_JSON_PATH . 'image-reveal/',
					[
						'render_callback' => [ self::class, 'render_callback' ],
					]
				);
			}
		);
	}

}
