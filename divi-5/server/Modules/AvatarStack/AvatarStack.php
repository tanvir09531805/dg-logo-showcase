<?php

namespace DIFL\D5\Modules\AvatarStack;

use ET\Builder\Framework\DependencyManagement\Interfaces\DependencyInterface;
use ET\Builder\Framework\Utility\HTMLUtility;
use ET\Builder\FrontEnd\BlockParser\BlockParserStore;
use ET\Builder\FrontEnd\Module\Style;
use ET\Builder\Packages\Module\Layout\Components\StyleCommon\CommonStyle;
use ET\Builder\Packages\Module\Module;
use ET\Builder\Packages\Module\Options\Css\CssStyle;
use ET\Builder\Packages\Module\Options\Element\ElementComponents;
use ET\Builder\Packages\ModuleLibrary\ModuleRegistration;
use ET\Builder\Packages\StyleLibrary\Utils\StyleDeclarations;

class AvatarStack implements DependencyInterface {

	public static function styles( array $args ): void {
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

						/*--------   Stack Spacing --------*/
						CommonStyle::style(
							[
								'selector'  => $args['orderClass'] . " #difl-avatar-stack-container .difl_avatar_stack_item:not(:first-child)",
								'selectors' => [
									'desktop' => [
										'value' => "{$args['orderClass']} #difl-avatar-stack-container .difl_avatar_stack_item:not(:first-child)",
										'hover' => "{$args['orderClass']} #difl-avatar-stack-container:hover .difl_avatar_stack_item:not(:first-child)",
									],
								],
								'attr'      => $attrs['content_main']['decoration']['field_stack_spacing'] ?? [],
								'property'  => "margin-left",
							]
						),

						/*--------   Stack Animation --------*/
						CommonStyle::style(
							[
								'selector'            => $args['orderClass'] . ".difl_avatar_stack",
								'attr'                => $attrs['content_stack_animations']['decoration'] ?? [],
								'declarationFunction' => function ( array $params ) {
									$style_declarations    = new StyleDeclarations(
										[
											'returnType' => 'string',
											'important'  => false,
										]
									);
									$default               = [
										'field_item_translate_x'    => '0px',
										'field_item_translate_y'    => '0px',
										'field_item_rotate_x'       => '0deg',
										'field_item_rotate_y'       => '0deg',
										'field_item_rotate_z'       => '0deg',
										'field_item_scale_x'        => '1',
										'field_item_scale_y'        => '1',
										'field_item_skew_x'         => '0deg',
										'field_item_skew_y'         => '0deg',
										'field_item_trans_duration' => '300ms',
										'field_item_trans_delay'    => '0ms',
										'field_item_trans_easing'   => 'ease-out',
										'field_stack_translate_x'   => '0px',
										'field_stack_translate_y'   => '0px',
										'field_stack_rotate_x'      => '0deg',
										'field_stack_rotate_y'      => '0deg',
										'field_stack_rotate_z'      => '0deg',
									];
									$field_root_transition = [];
									if ( ! empty( $params['attrValue']['field_item_translate_enable'] ) && 'on' === $params['attrValue']['field_item_translate_enable'] ) {
										$field_root_transition['field_item_translate_x'] = '--df-avatarStack-item-trans-x-hover';
										$field_root_transition['field_item_translate_y'] = '--df-avatarStack-item-trans-y-hover';
									}
									if ( ! empty( $params['attrValue']['field_item_rotate_enable'] ) && 'on' === $params['attrValue']['field_item_rotate_enable'] ) {
										$field_root_transition['field_item_rotate_x'] = '--df-avatarStack-item-rotate-x-hover';
										$field_root_transition['field_item_rotate_y'] = '--df-avatarStack-item-rotate-y-hover';
										$field_root_transition['field_item_rotate_z'] = '--df-avatarStack-item-rotate-z-hover';
									}
									if ( ! empty( $params['attrValue']['field_item_scale_enable'] ) && 'on' === $params['attrValue']['field_item_scale_enable'] ) {
										$field_root_transition['field_item_scale_x'] = '--df-avatarStack-item-scale-x-hover';
										$field_root_transition['field_item_scale_y'] = '--df-avatarStack-item-scale-y-hover';
									}
									if ( ! empty( $params['attrValue']['field_item_skew_enable'] ) && 'on' === $params['attrValue']['field_item_skew_enable'] ) {
										$field_root_transition['field_item_skew_x'] = '--df-avatarStack-item-skew-x-hover';
										$field_root_transition['field_item_skew_y'] = '--df-avatarStack-item-skew-y-hover';
									}
									if ( ! empty( $params['attrValue']['field_item_transition_enable'] ) && 'on' === $params['attrValue']['field_item_transition_enable'] ) {
										$field_root_transition['field_item_trans_duration'] = '--df-avatarStack-item-transition-duration';
										$field_root_transition['field_item_trans_delay']    = '--df-avatarStack-item-transition-delay';
										$field_root_transition['field_item_trans_easing']   = '--df-avatarStack-item-transition-easing';
									}
									if ( ! empty( $params['attrValue']['field_stack_translate_enable'] ) && 'on' === $params['attrValue']['field_stack_translate_enable'] ) {
										$field_root_transition['field_stack_translate_x'] = '--df-avatarStack-trans-x-normal';
										$field_root_transition['field_stack_translate_y'] = '--df-avatarStack-trans-y-normal';
									}
									if ( ! empty( $params['attrValue']['field_stack_rotate_enable'] ) && 'on' === $params['attrValue']['field_stack_rotate_enable'] ) {
										$field_root_transition['field_stack_rotate_x'] = '--df-avatarStack-rotate-x-normal';
										$field_root_transition['field_stack_rotate_y'] = '--df-avatarStack-rotate-y-normal';
										$field_root_transition['field_stack_rotate_z'] = '--df-avatarStack-rotate-z-normal';
									}

									foreach ( $field_root_transition as $key => $cssProperty ) {
										$value = $params['attrValue'][ $key ] ?? $default[ $key ];

										if ( $key === 'field_item_trans_duration' || $key === 'field_item_trans_delay' ) {
											$value .= isset( $params['attrValue'][ $key ] ) ? 'ms' : '';
										}

										$style_declarations->add( $cssProperty, $value );
									}

									return $style_declarations->value();
								},
							]
						),


						/*----- Icon -----*/
						$elements->style( [ 'attrName' => 'design_child_icon', ] ),
						CommonStyle::style(
							[
								'selector'  => "{$args['orderClass']} .difl_avatar_stack_item .difl_avatar_stack_item_wrapper.has_icon .difl_avatar_stack_icon",
								'selectors' => [
									'desktop' => [
										'value' => "{$args['orderClass']} .difl_avatar_stack_item .difl_avatar_stack_item_wrapper.has_icon .difl_avatar_stack_icon",
										'hover' => "{$args['orderClass']} .difl_avatar_stack_item:hover .difl_avatar_stack_item_wrapper.has_icon .difl_avatar_stack_icon",
									],
								],
								'attr'      => $attrs['design_child_icon']['decoration']['field_icon_size'] ?? [],
								'property'  => 'font-size',
							]
						),
						CommonStyle::style(
							[
								'selector'  => "{$args['orderClass']} .difl_avatar_stack_item .difl_avatar_stack_item_wrapper.has_icon .difl_avatar_stack_icon",
								'selectors' => [
									'desktop' => [
										'value' => "{$args['orderClass']} .difl_avatar_stack_item .difl_avatar_stack_item_wrapper.has_icon .difl_avatar_stack_icon",
										'hover' => "{$args['orderClass']} .difl_avatar_stack_item:hover .difl_avatar_stack_item_wrapper.has_icon .difl_avatar_stack_icon",
									],
								],
								'attr'      => $attrs['design_child_icon']['decoration']['field_icon_color'] ?? [],
								'property'  => 'color',
							]
						),
						CommonStyle::style(
							[
								'selector'  => "{$args['orderClass']} .difl_avatar_stack_item .difl_avatar_stack_item_wrapper.has_icon .difl_avatar_stack_icon",
								'selectors' => [
									'desktop' => [
										'value' => "{$args['orderClass']} .difl_avatar_stack_item .difl_avatar_stack_item_wrapper.has_icon",
										'hover' => "{$args['orderClass']} .difl_avatar_stack_item:hover .difl_avatar_stack_item_wrapper.has_icon",
									],
								],
								'attr'      => $attrs['design_child_icon']['decoration']['field_icon_background'] ?? [],
								'property'  => 'background-color',
							]
						),

						/*----- Media -----*/
						$elements->style( [ 'attrName' => 'design_child_image', ] ),

						/*----- Text -----*/
						$elements->style( [ 'attrName' => 'design_child_text', ] ),
						$elements->style( [ 'attrName' => 'design_child_text_container', ] ),
						CommonStyle::style(
							[
								'selector'  => "{$args['orderClass']} .difl_avatar_stack_item .difl_avatar_stack_item_wrapper.has_text",
								'selectors' => [
									'desktop' => [
										'value' => "{$args['orderClass']} .difl_avatar_stack_item .difl_avatar_stack_item_wrapper.has_text",
										'hover' => "{$args['orderClass']} .difl_avatar_stack_item:hover .difl_avatar_stack_item_wrapper.has_text",
									],
								],
								'attr'      => $attrs['design_child_text']['decoration']['field_text_background'] ?? [],
								'property'  => 'background-color',
							]
						),

						/*----- Rating -----*/
						$elements->style( [ 'attrName' => 'design_child_rating', ] ),
						// alignment
						CommonStyle::style(
							[
								'selector' => "{$args['orderClass']} .difl_avatar_stack_item .difl_avatar_stack_item_wrapper.has_rating .difl_avatar_stack_rating_container .difl_avatar_stack_rating",
								'attr'     => $attrs['design_child_rating']['decoration']['field_rating_alignment'] ?? [],
								'property' => 'text-align',
							]
						),
						// position
						CommonStyle::style(
							[
								'selector' => "{$args['orderClass']} .difl_avatar_stack_item .difl_avatar_stack_item_wrapper.has_rating .difl_avatar_stack_rating_container",
								'attr'     => $attrs['design_child_rating']['decoration']['field_rating_position'] ?? [],
								'property' => 'justify-content',
							]
						),
						// icon size
						CommonStyle::style(
							[
								'selector'  => "{$args['orderClass']} .difl_avatar_stack_item .difl_avatar_stack_item_wrapper.has_rating .difl_avatar_stack_rating_container .difl_avatar_stack_rating",
								'selectors' => [
									'desktop' => [
										'value' => "{$args['orderClass']} .difl_avatar_stack_item .difl_avatar_stack_item_wrapper.has_rating .difl_avatar_stack_rating_container .difl_avatar_stack_rating",
										'hover' => "{$args['orderClass']} .difl_avatar_stack_item:hover .difl_avatar_stack_item_wrapper.has_rating .difl_avatar_stack_rating_container .difl_avatar_stack_rating",
									],
								],
								'attr'      => $attrs['design_child_rating']['decoration']['field_rating_icon_size'] ?? [],
								'property'  => 'font-size',
							]
						),
						// rating color
						CommonStyle::style(
							[
								'selector'  => "{$args['orderClass']} .difl_avatar_stack_item .difl_avatar_stack_item_wrapper.has_rating .difl_avatar_stack_rating_container .difl_avatar_stack_rating span.rate:before",
								'selectors' => [
									'desktop' => [
										'value' => "{$args['orderClass']} .difl_avatar_stack_item .difl_avatar_stack_item_wrapper.has_rating .difl_avatar_stack_rating_container .difl_avatar_stack_rating span.rate:before",
										'hover' => "{$args['orderClass']} .difl_avatar_stack_item:hover .difl_avatar_stack_item_wrapper.has_rating .difl_avatar_stack_rating_container .difl_avatar_stack_rating span.rate:before",
									],
								],
								'attr'      => $attrs['design_child_rating']['decoration']['field_rating_color'] ?? [],
								'property'  => 'color',
							]
						),
						// blank color
						CommonStyle::style(
							[
								'selector'  => "{$args['orderClass']} .difl_avatar_stack_item .difl_avatar_stack_item_wrapper.has_rating .difl_avatar_stack_rating_container .difl_avatar_stack_rating span.blank:before",
								'selectors' => [
									'desktop' => [
										'value' => "{$args['orderClass']} .difl_avatar_stack_item .difl_avatar_stack_item_wrapper.has_rating .difl_avatar_stack_rating_container .difl_avatar_stack_rating span.blank:before",
										'hover' => "{$args['orderClass']} .difl_avatar_stack_item:hover .difl_avatar_stack_item_wrapper.has_rating .difl_avatar_stack_rating_container .difl_avatar_stack_rating span.blank:before",
									],
								],
								'attr'      => $attrs['design_child_rating']['decoration']['field_blank_color'] ?? [],
								'property'  => 'color',
							]
						),
						// Background
						CommonStyle::style(
							[
								'selector'  => "{$args['orderClass']} .difl_avatar_stack_item .difl_avatar_stack_item_wrapper.has_rating",
								'selectors' => [
									'desktop' => [
										'value' => "{$args['orderClass']} .difl_avatar_stack_item .difl_avatar_stack_item_wrapper.has_rating",
										'hover' => "{$args['orderClass']} .difl_avatar_stack_item:hover .difl_avatar_stack_item_wrapper.has_rating",
									],
								],
								'attr'      => $attrs['design_child_rating']['decoration']['field_rating_background'] ?? [],
								'property'  => 'background-color',
							]
						),

						/*------ Spacing ------*/
						$elements->style( [ 'attrName' => 'design_child_icon_spacing', ] ),
						$elements->style( [ 'attrName' => 'design_child_image_spacing', ] ),
						$elements->style( [ 'attrName' => 'design_child_rating_spacing', ] ),
						$elements->style( [ 'attrName' => 'design_child_text_spacing', ] ),
						$elements->style( [ 'attrName' => 'design_spacing', ] ),

						/*------ Tooltip -------*/
						$elements->style( [ 'attrName' => 'design_tooltip', ] ),
						$elements->style( [ 'attrName' => 'design_tooltip_text', ] ),
						$elements->style( [ 'attrName' => 'design_tooltip_header', ] ),
						CommonStyle::style(
							[
								'selector'  => ".tippy-box[data-theme~='{$args['orderClass']}'][data-placement^='top'] > .tippy-arrow::before",
								'selectors' => [
									'desktop' => [
										'value' => ".tippy-box[data-theme~='{$args['orderClass']}'][data-placement^='top'] > .tippy-arrow::before",
										'hover' => ".tippy-box[data-theme~='{$args['orderClass']}'][data-placement^='top']:hover > .tippy-arrow::before",
									],
								],
								'attr'      => $attrs['design_tooltip']['decoration']['field_tooltip_arrow_color'] ?? [],
								'property'  => 'border-top-color',
							]
						),
						CommonStyle::style(
							[
								'selector'  => ".tippy-box[data-theme~='{$args['orderClass']}'][data-placement^='bottom'] > .tippy-arrow::before",
								'selectors' => [
									'desktop' => [
										'value' => ".tippy-box[data-theme~='{$args['orderClass']}'][data-placement^='bottom'] > .tippy-arrow::before",
										'hover' => ".tippy-box[data-theme~='{$args['orderClass']}'][data-placement^='bottom']:hover > .tippy-arrow::before",
									],
								],
								'attr'      => $attrs['design_tooltip']['decoration']['field_tooltip_arrow_color'] ?? [],
								'property'  => 'border-bottom-color',
							]
						),
						CommonStyle::style(
							[
								'selector'  => ".tippy-box[data-theme~='{$args['orderClass']}'][data-placement^='left'] > .tippy-arrow::before",
								'selectors' => [
									'desktop' => [
										'value' => ".tippy-box[data-theme~='{$args['orderClass']}'][data-placement^='left'] > .tippy-arrow::before",
										'hover' => ".tippy-box[data-theme~='{$args['orderClass']}'][data-placement^='left']:hover > .tippy-arrow::before",
									],
								],
								'attr'      => $attrs['design_tooltip']['decoration']['field_tooltip_arrow_color'] ?? [],
								'property'  => 'border-left-color',
							]
						),
						CommonStyle::style(
							[
								'selector'  => ".tippy-box[data-theme~='{$args['orderClass']}'][data-placement^='right'] > .tippy-arrow::before",
								'selectors' => [
									'desktop' => [
										'value' => ".tippy-box[data-theme~='{$args['orderClass']}'][data-placement^='right'] > .tippy-arrow::before",
										'hover' => ".tippy-box[data-theme~='{$args['orderClass']}'][data-placement^='right']:hover > .tippy-arrow::before",
									],
								],
								'attr'      => $attrs['design_tooltip']['decoration']['field_tooltip_arrow_color'] ?? [],
								'property'  => 'border-right-color',
							]
						),

						CommonStyle::style(
							[
								'selector'            => ".tippy-box[data-theme~='{$args['orderClass']}'] .tippy-content p",
								'attr'                => $attrs['design_tooltip']['decoration']['field_tooltip_arrow_color'] ?? [],
								'declarationFunction' => function ( array $params ) {
									return "padding-bottom: 0px;";
								},
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

	public static function process_tooltip_data( $attrs ) {
		$tooltipStatus       = ( $attrs['content_tooltip']['innerContent']['desktop']['value']['field_tooltip_enable'] ?? 'off' ) === 'on';
		$tooltipOffsetStatus = ( $attrs['content_tooltip']['innerContent']['desktop']['value']['field_tooltip_offset_enable'] ?? 'off' ) === 'on';

		$offsetSkidding = $tooltipOffsetStatus ? (int) ( $attrs['content_tooltip']['innerContent']['desktop']['value']['field_tooltip_offset_skidding'] ?? 0 ) : 0;
		$offsetDistance = $tooltipOffsetStatus ? (int) ( $attrs['content_tooltip']['innerContent']['desktop']['value']['field_tooltip_offset_distance'] ?? 10 ) : 10;

		$field_tooltip_arrow                = $attrs['content_tooltip']['innerContent']['desktop']['value']['field_tooltip_arrow'] ?? 'on';
		$field_tooltip_animation            = $attrs['content_tooltip']['innerContent']['desktop']['value']['field_tooltip_animation'] ?? 'fade';
		$field_tooltip_placement            = $attrs['content_tooltip']['innerContent']['desktop']['value']['field_tooltip_placement'] ?? 'top';
		$field_tooltip_trigger              = $attrs['content_tooltip']['innerContent']['desktop']['value']['field_tooltip_trigger'] ?? 'mouseenter focus';
		$field_tooltip_follow_cursor        = $attrs['content_tooltip']['innerContent']['desktop']['value']['field_tooltip_follow_cursor'] ?? 'off';
		$field_tooltip_interactive          = $attrs['content_tooltip']['innerContent']['desktop']['value']['field_tooltip_interactive'] ?? 'off';
		$field_tooltip_interactive_border   = $attrs['content_tooltip']['innerContent']['desktop']['value']['field_tooltip_interactive_border'] ?? 2;
		$field_tooltip_interactive_debounce = $attrs['content_tooltip']['innerContent']['desktop']['value']['field_tooltip_interactive_debounce'] ?? 0;
		$field_tooltip_custom_maxwidth      = $attrs['content_tooltip']['innerContent']['desktop']['value']['field_tooltip_custom_maxwidth'] ?? 350;
		$field_tooltip_content_delay        = $attrs['content_tooltip']['innerContent']['desktop']['value']['field_tooltip_content_delay'] ?? 300;

//		$data_settings = [
//			'tooltip_enable'      => 'on' === $props['field_tooltip_enable'],
//			'arrow'               => 'on' === $props['field_tooltip_arrow'],
//			'interactive'         => 'on' === $props['field_tooltip_interactive'],
//			'interactiveBorder'   => 'on' === $props['field_tooltip_interactive'] && isset( $props['field_tooltip_interactive_border'] ) ? $props['field_tooltip_interactive_border'] : 2,
//			'interactiveDebounce' => 'on' === $props['field_tooltip_interactive'] && isset( $props['field_tooltip_interactive_debounce'] ) ? $props['field_tooltip_interactive_debounce'] : 0,
//			'animation'           => isset( $props['field_tooltip_animation'] ) ? $props['field_tooltip_animation'] : 'fade',
//			'placement'           => isset( $props['field_tooltip_placement'] ) ? $props['field_tooltip_placement'] : 'top',
//			'trigger'             => isset( $props['field_tooltip_trigger'] ) ? $props['field_tooltip_trigger'] : 'focus',
//			'followCursor'        => 'on' === $props['field_tooltip_follow_cursor'],
//			'maxWidth'            => isset( $props['field_tooltip_custom_maxwidth'] ) ? $props['field_tooltip_custom_maxwidth'] : 350,
//			'offsetEnable'        => 'on' === $props['field_tooltip_offset_enable'],
//			'offsetSkidding'      => 'on' === $props['field_tooltip_offset_enable'] && isset( $props['field_tooltip_offset_skidding'] ) ? $props['field_tooltip_offset_skidding'] : 0,
//			'offsetDistance'      => 'on' === $props['field_tooltip_offset_enable'] && isset( $props['field_tooltip_offset_distance'] ) ? $props['field_tooltip_offset_distance'] : 10,
//			'delay' => 'on' === $props['field_tooltip_enable'] && isset($props['field_tooltip_content_delay']) ? $props['field_tooltip_content_delay'] : 300
//		];
		$data_settings = [
			'tooltip_enable'      => $tooltipStatus,
			'arrow'               => 'on' === $field_tooltip_arrow,
			'interactive'         => 'on' === $field_tooltip_interactive,
			'interactiveBorder'   => 'on' === $field_tooltip_interactive && $field_tooltip_interactive_border,
			'interactiveDebounce' => 'on' === $field_tooltip_interactive && $field_tooltip_interactive_debounce,
			'animation'           => $field_tooltip_animation,
			'placement'           => $field_tooltip_placement,
			'trigger'             => $field_tooltip_trigger,
			'followCursor'        => 'on' === $field_tooltip_follow_cursor && 'mouseenter focus' === $field_tooltip_trigger,
			'maxWidth'            => $field_tooltip_custom_maxwidth,
			'offsetEnable'        => $tooltipOffsetStatus,
			'offsetSkidding'      => $offsetSkidding,
			'offsetDistance'      => $offsetDistance,
			'delay'               => $field_tooltip_content_delay
		];

		return $data_settings;
	}

	public static function enqueue_user_script( array $args ) {
		$selector = $args['selector'] ?? '';
		$attrs    = $args['attrs'] ?? [];

		$tooltipStatus = ( $attrs['content_tooltip']['innerContent']['desktop']['value']['field_tooltip_enable'] ?? 'off' ) === 'on';
		if ( $tooltipStatus ) {
			$tooltipOffsetStatus = ( $attrs['content_tooltip']['innerContent']['desktop']['value']['field_tooltip_offset_enable'] ?? 'off' ) === 'on';

			$offsetSkidding = $tooltipOffsetStatus ? (int) ( $attrs['content_tooltip']['innerContent']['desktop']['value']['field_tooltip_offset_skidding'] ?? 0 ) : 0;
			$offsetDistance = $tooltipOffsetStatus ? (int) ( $attrs['content_tooltip']['innerContent']['desktop']['value']['field_tooltip_offset_distance'] ?? 10 ) : 10;

			$field_tooltip_arrow                = $attrs['content_tooltip']['innerContent']['desktop']['value']['field_tooltip_arrow'] ?? 'on';
			$field_tooltip_animation            = $attrs['content_tooltip']['innerContent']['desktop']['value']['field_tooltip_animation'] ?? 'fade';
			$field_tooltip_placement            = $attrs['content_tooltip']['innerContent']['desktop']['value']['field_tooltip_placement'] ?? 'top';
			$field_tooltip_trigger              = $attrs['content_tooltip']['innerContent']['desktop']['value']['field_tooltip_trigger'] ?? 'mouseenter focus';
			$field_tooltip_follow_cursor        = $attrs['content_tooltip']['innerContent']['desktop']['value']['field_tooltip_follow_cursor'] ?? 'off';
			$field_tooltip_interactive          = $attrs['content_tooltip']['innerContent']['desktop']['value']['field_tooltip_interactive'] ?? 'off';
			$field_tooltip_interactive_border   = $attrs['content_tooltip']['innerContent']['desktop']['value']['field_tooltip_interactive_border'] ?? 2;
			$field_tooltip_interactive_debounce = $attrs['content_tooltip']['innerContent']['desktop']['value']['field_tooltip_interactive_debounce'] ?? 0;
			$field_tooltip_custom_maxwidth      = $attrs['content_tooltip']['innerContent']['desktop']['value']['field_tooltip_custom_maxwidth'] ?? 350;
			$field_tooltip_content_delay        = $attrs['content_tooltip']['innerContent']['desktop']['value']['field_tooltip_content_delay'] ?? 300;

			$data_settings = [
				'tooltip_enable'      => $tooltipStatus,
				'arrow'               => 'on' === $field_tooltip_arrow,
				'interactive'         => 'on' === $field_tooltip_interactive,
				'interactiveBorder'   => 'on' === $field_tooltip_interactive && $field_tooltip_interactive_border,
				'interactiveDebounce' => 'on' === $field_tooltip_interactive && $field_tooltip_interactive_debounce,
				'animation'           => $field_tooltip_animation,
				'placement'           => $field_tooltip_placement,
				'trigger'             => $field_tooltip_trigger,
				'followCursor'        => 'on' === $field_tooltip_follow_cursor && 'mouseenter focus' === $field_tooltip_trigger,
				'maxWidth'            => $field_tooltip_custom_maxwidth,
				'offsetEnable'        => $tooltipOffsetStatus,
				'offsetSkidding'      => $offsetSkidding,
				'offsetDistance'      => $offsetDistance,
				'delay'               => $field_tooltip_content_delay
			];
		}

		?>
        <script type="text/javascript">
			( function () {
				window.addEventListener( 'load', function () {
					const avatar_stack = document.querySelector( "<?php echo $selector; ?>" );

					process_text_tag_level( avatar_stack );
					<?php
					if($tooltipStatus){
					?>
					avatar_stack_tooltip( avatar_stack );

					function avatar_stack_tooltip(avatar_stack) {
						const container = avatar_stack.querySelector('.difl_avatar_stack_container');
						const settings = container && container.dataset.settings ? JSON.parse(container.dataset.settings) : null;
						const avatar_stack_items = avatar_stack.querySelectorAll('.difl_avatar_stack_item');

						if (!settings) return;

						if (avatar_stack_items.length > 0 && settings.tooltip_enable) {
							avatar_stack_items.forEach(avatar_stack_item => {
								const noscript = avatar_stack_item.querySelector('noscript');
								const tooltipContent = noscript ? noscript.textContent.trim() : '';

								const options = {
									arrow: settings.arrow,
									animation: settings.animation,
									placement: settings.placement,
									trigger: settings.trigger,
									allowHTML: true,
									followCursor: (settings.trigger === 'mouseenter focus') ? settings.followCursor : false,
									interactive: settings.interactive,
									interactiveBorder: parseInt(settings.interactiveBorder),
									interactiveDebounce: parseInt(settings.interactiveDebounce),
									maxWidth: parseInt(settings.maxWidth),
									offset: [parseInt(settings.offsetSkidding), parseInt(settings.offsetDistance)],
									theme: "<?php echo $selector; ?>", // ensure this is rendered by PHP if needed
									delay: parseInt(settings.delay),
									content: tooltipContent
								};

								const instance = tippy(avatar_stack_item, options);

								if (!tooltipContent) {
									instance.disable();
								}
							});
						}
					}
					<?php
					}
					?>

					function process_text_tag_level( avatar_stack ) {
						const container = avatar_stack.querySelector( '.difl_avatar_stack_container' );
						const tag_attr = container ? container.dataset.tagAttr && JSON.parse( container.dataset.tagAttr ) : null;
						const text_info = avatar_stack.querySelectorAll( '.difl_avatar_stack_item .difl_avatar_stack_text_container' );

						if ( !tag_attr ) return;

						text_info.forEach( text_container => {
							const title_field = text_container.querySelector( '.difl_avatar_stack_text_title' );
							if ( title_field ) {
								const title_value = title_field.textContent;
								const new_title_field = document.createElement( tag_attr.title_tag );
								new_title_field.className = 'difl_avatar_stack_text_title';
								new_title_field.textContent = title_value;
								title_field.remove();
								text_container.appendChild( new_title_field );
							}

							const subtitle_field = text_container.querySelector( '.difl_avatar_stack_text_subtitle' );
							if ( subtitle_field ) {
								const subtitle_value = subtitle_field.textContent;
								const new_subtitle_field = document.createElement( tag_attr.subtitle_tag );
								new_subtitle_field.className = 'difl_avatar_stack_text_subtitle';
								new_subtitle_field.textContent = subtitle_value;
								subtitle_field.remove();
								text_container.appendChild( new_subtitle_field );
							}
						} );
					}
				} );
			} )();
        </script>
		<?php
	}

	public static function script_data( $args ) {
		$id             = $args['id'] ?? '';
		$name           = $args['name'] ?? '';
		$selector       = $args['selector'] ?? '';
		$attrs          = $args['attrs'] ?? [];
		$elements       = $args['elements'];
		$store_instance = $args['storeInstance'] ?? null;

		$tooltipStatus = ( $attrs['content_tooltip']['innerContent']['desktop']['value']['field_tooltip_enable'] ?? 'off' ) === 'on';
		if ( $tooltipStatus ) {
			wp_enqueue_script( 'image-hotspot-popper-script' );
			wp_enqueue_script( 'image-hotspot-tippy-bundle-script' );
			wp_enqueue_script( 'df_avatar_stack' );
		}
		// Element Script Data Options.
		$elements->script_data(
			[
				'attrName' => 'module',
			]
		);
	}

	public static function render_callback( $attrs, $content, $block, $elements ) {

		$children_ids = $block->parsed_block['innerBlocks'] ? array_map(
			function ( $inner_block ) {
				return $inner_block['id'];
			},
			$block->parsed_block['innerBlocks']
		) : [];

		$parent       = BlockParserStore::get_parent( $block->parsed_block['id'], $block->parsed_block['storeInstance'] );
		$parent_attrs = $parent->attrs ?? [];

		$child_items = HTMLUtility::render(
			[
				'tag'               => 'div',
				'attributes'        => [
					'class'         => 'difl_avatar_stack_container',
					'id'            => 'difl-avatar-stack-container',
					"data-tag_attr" => wp_json_encode( [
						"title_tag"    => $attrs['design_child_text']['decoration']['font']['font']['desktop']['value']['headingLevel'] ?? "h4",
						"subtitle_tag" => $attrs['design_child_text_container']['decoration']['font']['font']['desktop']['value']['headingLevel'] ?? "h6",
					] ),
					"data-settings" => wp_json_encode( self::process_tooltip_data( $attrs ) )
				],
				'childrenSanitizer' => 'et_core_esc_previously',
				'children'          => $content,
			]
		);


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
//				'classnamesFunction'  => [ self::class, 'classnames' ],
				'scriptDataComponent' => [ self::class, 'script_data' ],
				'stylesComponent'     => [ self::class, 'styles' ],
				'parentAttrs'         => $parent_attrs,
				'parentId'            => $parent->id ?? '',
				'parentName'          => $parent->blockName ?? '',
				'children'            => ElementComponents::component(
						[
							'attrs'         => $attrs['module']['decoration'] ?? [],
							'id'            => $block->parsed_block['id'],

							// FE only.
							'orderIndex'    => $block->parsed_block['orderIndex'],
							'storeInstance' => $block->parsed_block['storeInstance'],
						]
					) . $child_items,
				'childrenIds'         => $children_ids,
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
					DIFL_MODULES_JSON_PATH . 'avatar-stack/',
					[
						'render_callback' => [ self::class, 'render_callback' ],
					]
				);
			}
		);
	}
}
