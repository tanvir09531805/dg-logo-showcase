<?php

namespace DIFL\Server\Modules\AdvancedButton;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

use ET\Builder\Framework\DependencyManagement\Interfaces\DependencyInterface;
use ET\Builder\Framework\Utility\HTMLUtility;
use ET\Builder\FrontEnd\Module\Style;
use ET\Builder\Packages\IconLibrary\IconFont\Utils;
use ET\Builder\Packages\Module\Layout\Components\ModuleElements\ModuleElements;
use ET\Builder\Packages\Module\Layout\Components\MultiView\MultiViewScriptData;
use ET\Builder\Packages\Module\Layout\Components\StyleCommon\CommonStyle;
use ET\Builder\Packages\Module\Module;
use ET\Builder\Packages\Module\Options\Css\CssStyle;
use ET\Builder\Packages\Module\Options\Text\TextClassnames;
use ET\Builder\Packages\Module\Options\Element\ElementClassnames;
use ET\Builder\Packages\ModuleLibrary\ModuleRegistration;
use ET\Builder\Packages\StyleLibrary\Utils\StyleDeclarations;
use WP_Block;
use DIFL\D5\Helper\Styles;

class AdvancedButton implements DependencyInterface {

	public static function animation_transitions( array $params ): string {

		$style_declarations = new StyleDeclarations(
			[
				'returnType' => 'string',
				'important'  => false,
			]
		);

		if ( ! empty( $params['attrValue']['two_d_transition_duration'] ) ) {
			$style_declarations->add( '--dfab-two-d-animation-duration', $params['attrValue']['two_d_transition_duration'] . "s" );
		}
		if ( ! empty( $params['attrValue']['two_d_transition_delay'] ) ) {
			$style_declarations->add( '--dfab-two-d-animation-delay', $params['attrValue']['two_d_transition_delay'] . "s" );
		}

		if ( ! empty( $params['attrValue']['bg_transition_duration'] ) ) {
			$style_declarations->add( '--dfab-bg-hover-background-transtion-time', $params['attrValue']['bg_transition_duration'] . "s" );
		}
		if ( ! empty( $params['attrValue']['bg_transition_delay'] ) ) {
			$style_declarations->add( '--dfab-bg-hover-background-transtion-delay', $params['attrValue']['bg_transition_delay'] . "s" );
		}
		if ( ! empty( $params['attrValue']['bg_transition_timing_function'] ) ) {
			$style_declarations->add( '--dfab-bg-hover-background-transition-timimg-function', $params['attrValue']['bg_transition_timing_function'] );
		}

		if ( ! empty( $params['attrValue']['stroke_transition_duration'] ) ) {
			$style_declarations->add( '--dfab-border-hover-background-transtion-time', $params['attrValue']['stroke_transition_duration'] . "s" );
		}
		if ( ! empty( $params['attrValue']['stroke_transition_delay'] ) ) {
			$style_declarations->add( '--dfab-border-hover-background-transtion-delay', $params['attrValue']['stroke_transition_delay'] . "s" );
		}
		if ( ! empty( $params['attrValue']['stroke_transition_timing_function'] ) ) {
			$style_declarations->add( '--dfab-border-hover-background-transition-timimg-function', $params['attrValue']['stroke_transition_timing_function'] );
		}

		if ( ! empty( $params['attrValue']['media_transition_duration'] ) ) {
			$style_declarations->add( '--dfab-media-hover-transition-duration', $params['attrValue']['media_transition_duration'] . "s" );
		}
		if ( ! empty( $params['attrValue']['media_transition_delay'] ) ) {
			$style_declarations->add( '--dfab-media-hover-transition-delay', $params['attrValue']['media_transition_delay'] . "s" );
		}
		if ( ! empty( $params['attrValue']['media_transition_timing_function'] ) ) {
			$style_declarations->add( '--dfab-media-hover-transition-function', $params['attrValue']['media_transition_timing_function'] );
		}

		return $style_declarations->value();
	}

	public static function custom_css() {
		return \WP_Block_Type_Registry::get_instance()->get_registered( 'difl/advanced-button' )->customCssFields;
	}

	public static function module_classnames( array $args ): void {
		$classnames_instance = $args['classnamesInstance'];
		$attrs               = $args['attrs'];

		// Text Options.
		$classnames_instance->add(
			TextClassnames::text_options_classnames(
				$attrs['module']['advanced']['text'] ?? [],
				[
					'orientation' => false,
				]
			),
			true
		);

		// Module.
		$classnames_instance->add(
			ElementClassnames::classnames(
				[
					'attrs' => array_merge(
						$attrs['module']['decoration'] ?? [],
						[
							'link' => $attrs['module']['advanced']['link'] ?? [],
						]
					),
				]
			)
		);
	}

	public static function module_script_data( array $args ): void {
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

		MultiViewScriptData::set(
			[
				'id'            => $id,
				'name'          => $name,
				'storeInstance' => $store_instance,
				'hoverSelector' => $selector,
				'setContent'    => [
					[
						'selector'      => $selector . ' .et-pb-icon.difl_adv_btn_icon,' . $selector . ' .et-pb-icon.difl_adv_btn_icon_hover',
						'data'          => $attrs['button_icon']['innerContent'] ?? [],
						'valueResolver' => function ( $value ) {
							return Utils::process_font_icon( $value );
						},
					],
				],
			]
		);
	}

	public static function module_styles( array $args ): void {
		$attrs    = $args['attrs'] ?? [];
		$elements = $args['elements'];
		$settings = $args['settings'] ?? [];

		$media_placement       = $attrs['media_placement']['decoration']['desktop']['value'] ?? "media_left";
		$media_placement_style = [];
		if ( "media_right" === $media_placement ) {
			$media_placement_style[] = Styles::custom_style( [
				'attr'     => $attrs['media_placement']['decoration'] ?? [],
				'selector' => $args['orderClass'] . " .difl_adv_btn_wrapper .difl_adv_btn_media_wrapper",
				'property' => "order",
				'value'    => "2"
			] );
			$media_placement_style[] = Styles::custom_style( [
				'attr'     => $attrs['media_placement']['decoration'] ?? [],
				'selector' => $args['orderClass'] . " .difl_adv_btn_wrapper .difl_adv_btn_text_wrapper",
				'property' => "order",
				'value'    => "1"
			] );
		}

		$media_placement_hover       = $attrs['media_placement']['decoration']['desktop']['hover'] ?? "media_left";
		$media_placement_hover_style = [];
		if ( "media_right" === $media_placement_hover ) {
			$media_placement_hover_style[] = Styles::custom_style( [
				'attr'     => $attrs['media_placement']['decoration'] ?? [],
				'selector' => $args['orderClass'] . " a.difl_advanced_button_container:hover .difl_adv_btn_wrapper .difl_adv_btn_media_wrapper",
				'property' => "order",
				'value'    => "2"
			] );
			$media_placement_hover_style[] = Styles::custom_style( [
				'attr'     => $attrs['media_placement']['decoration'] ?? [],
				'selector' => $args['orderClass'] . " a.difl_advanced_button_container:hover .difl_adv_btn_wrapper .difl_adv_btn_text_wrapper",
				'property' => "order",
				'value'    => "1"
			] );
		}

		$hypen_style           = [];
		$bg_hover_effects      = $attrs['bg_hover_effects']['innerContent']['desktop']['value'] ?? "";
		$bg_hover_effect_hyper = $attrs['bg_hover_effect_hyper']['innerContent']['desktop']['value'] ?? "off";
		if ( "on" === $bg_hover_effect_hyper && in_array( $bg_hover_effects, [
				'dfab_reveal',
				'dfab_ripple'
			] ) ) {
			$hypen_style = Styles::custom_style( [
				'attr'     => $attrs['bg_hover_hypen_color']['decoration'] ?? [],
				'selector' => $args['orderClass'] . " a.difl_advanced_button_container",
				'property' => "--dfab-bg-hover-hypen-color"
			] );
		}

		$bounce_style           = [];
		$bg_hover_effect_bounce = $attrs['bg_hover_effect_bounce']['innerContent']['desktop']['value'] ?? "off";
		if ( "on" === $bg_hover_effect_bounce && in_array( $bg_hover_effects, [
				'dfab_reveal',
				'dfab_door_open',
				'dfab_skew',
				'dfab_two_shade'
			] ) ) {
			$bounce_style = Styles::custom_style( [
				'attr'      => $attrs['bg_hover_effect_bounce']['decoration'] ?? [],
				'selector'  => $args['orderClass'] . " a.difl_advanced_button_container",
				'property'  => "--dfab-bg-hover-background-transition-timimg-function",
				'value'     => "cubic-bezier(.52,1.64,.37,.66)",
				'important' => true
			] );
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

						// Animation Transitions
						CommonStyle::style(
							[
								'selector'            => $args['orderClass'] . " a.difl_advanced_button_container",
								'attr'                => $attrs['buttonAnimationTransition']['decoration'] ?? [],
								'declarationFunction' => [ self::class, 'animation_transitions' ],
							]
						),

						// Hover Effect Background
						Styles::custom_style( [
							'attr'     => $attrs['bg_hover_background_color']['decoration'] ?? [],
							'selector' => $args['orderClass'] . "a.difl_advanced_button_container",
							'property' => "--dfab-bg-hover-background-color"
						] ),

						// Hypen
						$hypen_style,

						// Bounce
						$bounce_style,

						// Two Shade Secondary
						( "dfab_two_shade" === $attrs['bg_hover_effects']['innerContent']['desktop']['value'] ) ? Styles::custom_style( [
							'attr'     => $attrs['bg_hover_background_secondary_color']['decoration'] ?? [],
							'selector' => $args['orderClass'] . "a.difl_advanced_button_container",
							'property' => "--dfab-bg-hover-background-secondary-color"
						] ) : [],

						// Hover Effect Stroke
						Styles::custom_style( [
							'attr'     => $attrs['border_hover_color']['decoration'] ?? [],
							'selector' => $args['orderClass'] . " a.difl_advanced_button_container",
							'property' => "--dfab-border-hover-background-color"
						] ),

						// Button Alignment
						CommonStyle::style(
							[
								'selector' => $args['orderClass'],
								'attr'     => $attrs['alignment']['decoration']['button_alignment'] ?? [],
								'property' => 'text-align',
							]
						),

						// Button Content Alignment
						CommonStyle::style(
							[
								'selector' => $args['orderClass'] . " a.difl_advanced_button_container .difl_adv_btn_wrapper",
								'attr'     => $attrs['alignment']['decoration']['button_content_alignment'] ?? [],
								'property' => 'justify-content',
							]
						),

						// Text.
						$elements->style(
							[
								'attrName' => 'text',
							]
						),

						// Sub Text.
						$elements->style(
							[
								'attrName' => 'sub_text',
							]
						),

						// Icon Color
						CommonStyle::style(
							[
								'selector' => $args['orderClass'] . " .difl_advanced_button_container .difl_adv_btn_wrapper .difl_adv_btn_icon," . $args['orderClass'] . " .difl_advanced_button_container .difl_adv_btn_wrapper .difl_adv_btn_icon_hover",
								'attr'     => $attrs['design_media']['decoration']['icon_color'] ?? [],
								'property' => 'color',
							]
						),

						// Icon Size
						CommonStyle::style(
							[
								'selector' => $args['orderClass'] . " .difl_advanced_button_container .difl_adv_btn_wrapper .difl_adv_btn_icon," . $args['orderClass'] . " .difl_advanced_button_container .difl_adv_btn_wrapper .difl_adv_btn_icon_hover",
								'attr'     => $attrs['design_media']['decoration']['button_icon_size'] ?? [],
								'property' => 'font-size',
							]
						),

						// Media Background
						CommonStyle::style(
							[
								'selector' => $args['orderClass'] . " .difl_advanced_button_container .difl_adv_btn_wrapper .difl_adv_btn_media_wrapper",
								'attr'     => $attrs['design_media']['decoration']['media_background_color'] ?? [],
								'property' => 'background-color',
							]
						),

						// Media Width
						Styles::custom_style( [
							'attr'     => $attrs['design_media']['decoration']['media_wrapper_width'] ?? [],
							'selector' => $args['orderClass'] . " a.difl_advanced_button_container",
							'property' => "--dfab-media-wrapper-width"
						] ),

						// Media Height
						Styles::custom_style( [
							'attr'     => $attrs['design_media']['decoration']['media_wrapper_height'] ?? [],
							'selector' => $args['orderClass'] . " a.difl_advanced_button_container",
							'property' => "--dfab-media-wrapper-height"
						] ),

						// Media Border
						$elements->style(
							[
								'attrName' => 'design_media',
							]
						),

						// Module - Only for Custom CSS.
						CssStyle::style(
							[
								'selector'  => $args['orderClass'],
								'attr'      => $attrs['css'] ?? [],
								'cssFields' => self::custom_css(),
							]
						),
					],
					// Media Placement
					$media_placement_style,
					$media_placement_hover_style,

					// Tooltip
					Styles::tooltip_style( $args )
				),
			]
		);
	}

	public static function process_tooltip_data( array $attrs ): array {
		$field_tooltip_enable               = $attrs['main_tooltip']['innerContent']['desktop']['value']['field_tooltip_enable'] ?? 'off';
		$field_tooltip_disable_on_mobile    = $attrs['main_tooltip_settings']['innerContent']['desktop']['value']['field_tooltip_disable_on_mobile'] ?? 'off';
		$field_tooltip_arrow                = $attrs['main_tooltip_settings']['innerContent']['desktop']['value']['field_tooltip_arrow'] ?? 'on';
		$field_tooltip_interactive          = $attrs['main_tooltip_settings']['innerContent']['desktop']['value']['field_tooltip_interactive'] ?? 'off';
		$field_tooltip_interactive_border   = $attrs['main_tooltip_settings']['innerContent']['desktop']['value']['field_tooltip_interactive_border'] ?? 2;
		$field_tooltip_interactive_debounce = $attrs['main_tooltip_settings']['innerContent']['desktop']['value']['field_tooltip_interactive_debounce'] ?? 0;
		$field_tooltip_offset_enable        = $attrs['main_tooltip_settings']['innerContent']['desktop']['value']['field_tooltip_offset_enable'] ?? 'off';
		$field_tooltip_offset_skidding      = $attrs['main_tooltip_settings']['innerContent']['desktop']['value']['field_tooltip_offset_skidding'] ?? 0;
		$field_tooltip_offset_distance      = $attrs['main_tooltip_settings']['innerContent']['desktop']['value']['field_tooltip_offset_distance'] ?? 10;
		$field_tooltip_content_delay        = $attrs['main_tooltip_settings']['innerContent']['desktop']['value']['field_tooltip_content_delay'] ?? 300;

		$data_settings = [
			'tooltip_enable'      => $field_tooltip_enable === 'on',
			'disable_on_mobile'   => $field_tooltip_disable_on_mobile === 'on',
			'arrow'               => $field_tooltip_arrow === 'on',
			'interactive'         => $field_tooltip_interactive === 'on',
			'interactiveBorder'   => $field_tooltip_interactive === 'on' ? $field_tooltip_interactive_border : 2,
			'interactiveDebounce' => $field_tooltip_interactive === 'on' ? $field_tooltip_interactive_debounce : 0,
			'animation'           => $attrs['main_tooltip_settings']['innerContent']['desktop']['value']['field_tooltip_animation'] ?? 'fade',
			'placement'           => $attrs['main_tooltip_settings']['innerContent']['desktop']['value']['field_tooltip_placement'] ?? 'top',
			'trigger'             => 'mouseenter focus',
			'followCursor'        => false,
			'maxWidth'            => $attrs['main_tooltip_settings']['innerContent']['desktop']['value']['field_tooltip_custom_maxwidth'] ?? 350,
			'offsetEnable'        => $field_tooltip_offset_enable === 'on',
			'offsetSkidding'      => $field_tooltip_offset_enable === 'on' ? $field_tooltip_offset_skidding : 0,
			'offsetDistance'      => $field_tooltip_offset_enable === 'on' ? $field_tooltip_offset_distance : 10,
			'delay'               => $field_tooltip_enable === 'on' ? $field_tooltip_content_delay : 300,
		];

		return $data_settings;
	}

	public static function process_button_markup( array $attrs ): string {
		/* Effects */
		$classes = '';
		// Media Placement
		$media_placement = $attrs['media_placement']['decoration']['desktop']['value'] ?? "media_left";
		if ( ! empty( $media_placement ) ) {
			$classes .= " " . $media_placement;
		}

		// Background Effect
		$background_hover_effect        = $attrs['bg_hover_effects']['innerContent']['desktop']['value'] ?? "";
		$background_hover_effect_markup = '';
		if ( ! empty( $background_hover_effect ) && "dfab_none" !== $background_hover_effect ) {
			$classes                        .= " " . $background_hover_effect;
			$background_hover_effect_markup = HTMLUtility::render(
				[
					'tag'        => 'span',
					'attributes' => [
						'class' => 'difl_adv_btn_bg_anim',
					],
				]
			);
		}
		if ( ! empty( $background_hover_effect ) && in_array( $background_hover_effect, [
				'dfab_reveal',
				'dfab_reveal_with_hypen',
				'dfab_two_shade'
			] ) ) {
			$background_hover_effect_direction = $attrs['bg_hover_effect_directions']['innerContent']['desktop']['value'] ?? "dfab_left";
			$classes                           .= " " . $background_hover_effect_direction;
		}

		// Hypen
		$bg_hover_effect_hyper = $attrs['bg_hover_effect_hyper']['innerContent']['desktop']['value'] ?? "off";
		if ( 'on' === $bg_hover_effect_hyper && in_array( $background_hover_effect, [
				'dfab_reveal',
				'dfab_ripple'
			] ) ) {
			$classes .= " dfab_hypen";
		}
		$ripple_position_aware = "";
		if ( 'dfab_ripple_position_aware' === $background_hover_effect ) {
			$ripple_position_aware = HTMLUtility::render(
				[
					'tag'        => 'span',
					'attributes' => [
						'class' => 'dfab_position_aware_bg',
					],
				]
			);

		}
		if ( 'dfab_skew' === $background_hover_effect ) {
			$bg_hover_skew_effect_directions = $attrs['bg_hover_skew_effect_directions']['innerContent']['desktop']['value'] ?? "dfab_top_left";
			$classes                         .= " " . $bg_hover_skew_effect_directions;
		}

		// Border Effect
		$border_hover_effect        = $attrs['border_hover_effects']['innerContent']['desktop']['value'] ?? "";
		$border_hover_effect_markup = "";
		if ( "" !== $border_hover_effect && "dfab_none" !== $border_hover_effect ) {
			$classes                    .= " " . $border_hover_effect;
			$border_hover_effect_markup = HTMLUtility::render(
				[
					'tag'        => 'span',
					'attributes' => [
						'class' => 'difl_adv_btn_border_anim',
					],
				]
			);
			$border_hover_effect_markup .= HTMLUtility::render(
				[
					'tag'        => 'span',
					'attributes' => [
						'class' => 'difl_adv_btn_border_anim_2',
					],
				]
			);
		}

		// 2D Effects
		$two_d_hover_effect = $attrs['two_d_hover_effects']['innerContent']['desktop']['value'] ?? "";
		if ( "" !== $two_d_hover_effect && "dfab_none" !== $two_d_hover_effect ) {
			$classes .= " " . $two_d_hover_effect . " dfab__animate";
		}

		/* Media Effects */
		// Media show on hover
		$media_hover_effects = $attrs['media_hover_effects']['innerContent']['desktop']['value'] ?? "";
		if ( "" !== $media_hover_effects && "dfab_none" !== $media_hover_effects ) {
			$classes .= " " . $media_hover_effects;
		}
		if ( in_array( $media_hover_effects, [ 'dfab_media_reveal', 'dfab_media_slide' ] ) ) {
			$media_hover_effect_directions = $attrs['media_hover_effect_directions']['innerContent']['desktop']['value'] ?? "dfab_mr_left";
			$classes                       .= " " . $media_hover_effect_directions;
		}

		// Sub Text Hover
		$btn_sub_text_hover   = '';
		$sub_text_hover_value = $attrs['button_sub_text']['innerContent']['desktop']['hover'] ?? "";
		if ( $sub_text_hover_value && "" !== $sub_text_hover_value ) {
			$btn_sub_text_hover = HTMLUtility::render(
				[
					'tag'               => 'span',
					'attributes'        => [
						'class' => 'difl_adv_btn_sub_text_hover',
					],
					'childrenSanitizer' => 'et_core_esc_previously',
					'children'          => $sub_text_hover_value,
				]
			);
		}

		// Sub Text
		$sub_text_markup         = "";
		$sub_text_markup_outside = "";
		$sub_text_placement      = $attrs['sub_text_placement']['innerContent']['desktop']['value'] ?? "off";
		$button_sub_text         = $attrs['button_sub_text']['innerContent']['desktop']['value'] ?? "";
		if ( 'on' === $sub_text_placement && strlen( $button_sub_text ) > 0 ) {
			$sub_text_markup_outside = HTMLUtility::render(
				[
					'tag'               => 'span',
					'attributes'        => [
						'class' => 'difl_adv_btn_sub_text',
					],
					'childrenSanitizer' => 'et_core_esc_previously',
					'children'          => $button_sub_text,
				]
			);
			$sub_text_markup_outside .= $btn_sub_text_hover;
		} else {
			$sub_text_markup = HTMLUtility::render(
				[
					'tag'               => 'span',
					'attributes'        => [
						'class' => 'difl_adv_btn_sub_text',
					],
					'childrenSanitizer' => 'et_core_esc_previously',
					'children'          => $button_sub_text,
				]
			);
			$sub_text_markup .= $btn_sub_text_hover;
		}

		// Text
		$button_text_field  = $attrs['button_text']['innerContent']['desktop']['value'] ?? "";
		$button_text__hover = $attrs['button_text']['innerContent']['desktop']['hover'] ?? "";
		$btn_text           = ! empty( $button_text_field ) ? $button_text_field : "Click Here";
		$btn_text_hover     = '';
		if ( ! empty( $button_text__hover ) ) {
			$btn_text_hover = HTMLUtility::render(
				[
					'tag'               => 'span',
					'attributes'        => [
						'class' => 'difl_adv_btn_text_hover',
					],
					'childrenSanitizer' => 'et_core_esc_previously',
					'children'          => $button_text__hover,
				]
			);
		}

		// Media
		$btn_media_markup = '';
		$use_button_icon  = $attrs['use_button_icon']['innerContent']['desktop']['value'] ?? "on";
		if ( "off" !== $use_button_icon ) {
			$button_icon_data   = $attrs['button_icon']['innerContent']['desktop']['value'] ?? [];
			$button_icon        = Utils::process_font_icon( $button_icon_data ?? [] );
			$font_icon_hover    = '';
			$button_icon__hover = $attrs['button_icon']['innerContent']['desktop']['hover'] ?? [];
			if ( $button_icon__hover ) {
				$button_icon_hover = Utils::process_font_icon( $button_icon__hover ?? [] );
				$font_icon_hover   = HTMLUtility::render(
					[
						'tag'               => 'span',
						'attributes'        => [
							'class' => "et-pb-icon difl_adv_btn_media difl_adv_btn_icon_hover",
						],
						'childrenSanitizer' => 'esc_html',
						'children'          => $button_icon_hover,
					]
				);
			}
			$btn_media_markup = HTMLUtility::render(
				[
					'tag'               => 'span',
					'attributes'        => [
						'class' => "et-pb-icon difl_adv_btn_media difl_adv_btn_icon",
					],
					'childrenSanitizer' => 'esc_html',
					'children'          => $button_icon,
				]
			);
			$btn_media_markup .= $font_icon_hover;
		}
		$button_image        = $attrs['button_image']['innerContent']['desktop']['value'] ?? '';
		$button_image__hover = $attrs['button_image']['innerContent']['desktop']['hover'] ?? '';
		if ( "on" !== $use_button_icon && ! empty( $button_image ) ) {
			$button_image_hover = '';
			if ( ! empty( $button_image__hover ) && ! empty( $button_image ) ) {
				$button_image_hover = HTMLUtility::render(
					[
						'tag'        => 'img',
						'attributes' => [
							'class' => "difl_adv_btn_media difl_adv_btn_img_hover",
							'src'   => $button_image__hover,
							'alt'   => "Advanced Button",
							'title' => "",
						],
					]
				);
			}
			$btn_media_markup = HTMLUtility::render(
				[
					'tag'        => 'img',
					'attributes' => [
						'class' => "difl_adv_btn_media difl_adv_btn_img",
						'src'   => $button_image,
						'alt'   => "Advanced Button",
						'title' => "",
					],
				]
			);
			$btn_media_markup .= $button_image_hover;
		}

		$btn_media_wrapper = HTMLUtility::render(
			[
				'tag'               => 'span',
				'attributes'        => [
					'class' => "difl_adv_btn_media_wrapper",
				],
				'childrenSanitizer' => 'et_core_esc_previously',
				'children'          => $btn_media_markup,
			]
		);

		/*-------- Tooltip --------*/
		$data_settings   = self::process_tooltip_data( $attrs );
		$tooltip_content = $attrs['main_tooltip']['innerContent']['desktop']['value']['field_tooltip_content'] ?? '';
		if ( ! empty( $tooltip_content ) ) {
			$tooltip_content = preg_replace( "/<p[^>]*>(?:\s|&nbsp;)*<\/p>/", '', $tooltip_content );
		}

		return sprintf(
			'<a class="difl_advanced_button_container%1$s" data-settings=\'%10$s\' href="#">
				<span class="difl_adv_btn_wrapper">
					%2$s
					<span class="difl_adv_btn_text_wrapper">
						<span class="difl_adv_btn_text">%3$s</span>
						%4$s
						%5$s
					</span>
				</span>
				%6$s
				%7$s
				%8$s
				%9$s
				<noscript class="difl_advanced_button_tooltip_content">%11$s</noscript>
			</a>',
			$classes,
			( ! empty( $btn_media_markup ) ) ? $btn_media_wrapper : '',
			et_core_sanitized_previously( $btn_text ),
			et_core_sanitized_previously( $btn_text_hover ),
			et_core_sanitized_previously( $sub_text_markup ),
			et_core_sanitized_previously( $sub_text_markup_outside ),
			et_core_sanitized_previously( $ripple_position_aware ),
			et_core_sanitized_previously( $background_hover_effect_markup ),
			et_core_sanitized_previously( $border_hover_effect_markup ),
			wp_json_encode( $data_settings ),
			et_core_sanitized_previously( $tooltip_content )
		);
	}

	public static function enqueue_user_script(array $attrs) {
		$field_tooltip_enable  = $attrs['main_tooltip']['innerContent']['desktop']['value']['field_tooltip_enable'] ?? 'off';
		if ( 'on' === $field_tooltip_enable ) {
			wp_enqueue_script( 'image-hotspot-popper-script' );
			wp_enqueue_script( 'image-hotspot-tippy-bundle-script' );
		}
		?>
		<script type="text/javascript">
			(() => {
				'use strict';
				window.addEventListener('load', () => {
					const listAdvancedButtons = document.querySelectorAll('.difl_advanced_button');

					listAdvancedButtons.forEach((advancedButton, index) => {
						processTooltip(index, advancedButton);

						const listPositionAwareBg = advancedButton.querySelector(".dfab_position_aware_bg");

						advancedButton.addEventListener("mouseenter", handleMouseEvent);
						advancedButton.addEventListener("mouseleave", handleMouseEvent);

						function handleMouseEvent(event) {
							if (event.target.classList.contains("dfab_ripple_position_aware")) {
								const ripplePositionAwareContainer = advancedButton.getBoundingClientRect();
								const left = event.pageX - ripplePositionAwareContainer.left;
								const top = event.pageY - ripplePositionAwareContainer.top;
								listPositionAwareBg.style.top = `${top}px`;
								listPositionAwareBg.style.left = `${left}px`;
							}
						}
					});

					function processTooltip(index, advancedButton) {
						const tooltipContainer = advancedButton.querySelector('.difl_advanced_button_container');
						const settings = tooltipContainer?.dataset.settings ? JSON.parse(tooltipContainer.dataset.settings) : {};
						const tooltipStatus = settings.tooltip_enable;
						const disableOnMobile = settings.disable_on_mobile && window.innerWidth < 768;

						if (tooltipStatus && !disableOnMobile) {
							const options = {
								arrow: settings.arrow,
								animation: settings.animation,
								placement: settings.placement,
								trigger: settings.trigger,
								allowHTML: true,
								followCursor: false,
								interactive: settings.interactive,
								interactiveBorder: parseInt(settings.interactiveBorder),
								maxWidth: parseInt(settings.maxWidth),
								offset: [parseInt(settings.offsetSkidding), parseInt(settings.offsetDistance)],
								theme: `.difl_advanced_button_${index}`,
								delay: [parseInt(settings.delay), parseInt(settings.interactiveDebounce)]
							};

							const tooltipContent = advancedButton.querySelector('noscript')?.textContent.trim();
							if (tooltipContent === '') {
								tippy(tooltipContainer, options).disable();
							} else {
								options.content = tooltipContent;
								tippy(tooltipContainer, options);
							}
						}
					}
				});
			})();
		</script>
		<?php
	}

	public static function render_callback( array $attrs, string $content, WP_Block $block, ModuleElements $elements ): string {
		self::enqueue_user_script($attrs);
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
				'classnamesFunction'  => [ self::class, 'module_classnames' ],
				'scriptDataComponent' => [ self::class, 'module_script_data' ],
				'stylesComponent'     => [ self::class, 'module_styles' ],
				'children'            => self::process_button_markup( $attrs )
			]
		);
	}

	public function load(): void {
		$module_json_folder_path = DIFL_MODULES_JSON_PATH . 'advanced-button/';

		add_action(
			'init',
			function () use ( $module_json_folder_path ) {
				ModuleRegistration::register_module(
					$module_json_folder_path,
					[
						'render_callback' => [ self::class, 'render_callback' ],
					]
				);
			}
		);
	}
}