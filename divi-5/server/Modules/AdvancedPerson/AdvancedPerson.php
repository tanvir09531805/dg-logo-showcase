<?php
/**
 * AdvancedPerson Module class.
 *
 * @package DIVIFLASH5\Modules\AdvancedPerson;
 */

namespace DIVIFLASH5\Modules\AdvancedPerson;

if ( !defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

use ET\Builder\Framework\DependencyManagement\Interfaces\DependencyInterface;
use ET\Builder\FrontEnd\Module\Style;
use ET\Builder\Packages\Module\Layout\Components\StyleCommon\CommonStyle;
use ET\Builder\Packages\Module\Module;
use ET\Builder\Packages\Module\Options\Css\CssStyle;
use ET\Builder\Packages\Module\Options\Element\ElementClassnames;
use ET\Builder\Packages\Module\Options\Text\TextClassnames;
use ET\Builder\Packages\ModuleLibrary\ModuleRegistration;


/**
 * Class AdvancedPerson
 *
 * @package DIVIFLASH5\Modules\AdvancedPerson
 */
class AdvancedPerson implements DependencyInterface
{

	public static function custom_css()
	{
		return \WP_Block_Type_Registry::get_instance()->get_registered( 'difl/advanced-person' )->customCssFields;
	}

	public static function module_classnames( $args )
	{
		$classnames_instance = $args['classnamesInstance'];
		$attrs = $args['attrs'];

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
					'attrs' => $attrs['module']['decoration'] ?? [],
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

	public static function module_script_data( $args )
	{
		$elements = $args['elements'];

		// Element Script Data Options.
		$elements->script_data(
			[
				'attrName' => 'module',
			]
		);
	}

	public static function module_styles( $args )
	{
		function df_transition_fn($arg){
			$transition = [
				'ease'          => 'ease',
				'ease_in'       => 'ease-in',
				'ease_in_out'   => 'ease-in-out',
				'ease_out'      => 'ease-out',
				'linear'        => 'linear',
				'bounce'        => 'cubic-bezier(.2,.85,.4,1.275)'
			];
			return $transition[$arg];
		}

		$attrs = $args['attrs'] ?? [];
		$elements = $args['elements'];
		$settings = $args['settings'] ?? [];
		$orderClass = $args['orderClass'];

//		error_log( print_r( $attrs, true ) );
		$style = [
			// Element: Module.
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
			CssStyle::style(
				[
					'selector'  => $args['orderClass'],
					'attr'      => $attrs['css'] ?? [],
					'cssFields' => self::custom_css(),
				]
			),

			// Element: Content.
			$elements->style(
				[
					'attrName' => 'settings__content',
				]
			),
			CommonStyle::style(
				[
					'selector' => "{$orderClass} .df_person_photo_wrapper ",
					'attr'     => $attrs['image_alignment']['innerContent'] ?? [],
					'property' => 'margin',
				],
			),
			CommonStyle::style(
				[
					'selector' => "{$orderClass} .df_person_photo_wrapper ",
					'attr'     => $attrs['image_wrapper']['innerContent'] ?? [],
					'property' => 'max-width',
				],
			),

		];
		$style[] = $elements->style( [ 'attrName' => 'social_container_border' ] );
		$style[] = $elements->style( [ 'attrName' => 'social_icon_border' ] );
		$style[] = $elements->style( [ 'attrName' => 'social_icon_shadow' ] );
		$style[] = $elements->style( [ 'attrName' => 'child_filters_target' ] );

		$style[] = $attrs['style_type']['innerContent']['desktop']['value']!=="default"?$elements->style( [ 'attrName' => 'ekip_overlay_background' ] ):null;
		$style[] = $attrs['style_type']['innerContent']['desktop']['value']==="default"?$elements->style( [ 'attrName' => 'default_overlay_background' ] ):null;
		$style[] = $elements->style( [ 'attrName' => 'name_background' ] );
		$style[] = $elements->style( [ 'attrName' => 'role_background' ] );
		$style[] = $elements->style( [ 'attrName' => 'description_background' ] );
		$style[] = $elements->style( [ 'attrName' => 'icon_background' ] );
		$style[] = $elements->style( [ 'attrName' => 'icon' ] );
		$style[] = $elements->style( [ 'attrName' => 'icon_color' ] );
		$style[] = $elements->style( [ 'attrName' => 'social_wrapper_background' ] );
		$style[] = $elements->style( [ 'attrName' => 'facebook' ] );
		$style[] = $elements->style( [ 'attrName' => 'twitter' ] );
		$style[] = $elements->style( [ 'attrName' => 'linkedin' ] );
		$style[] = $elements->style( [ 'attrName' => 'instagram' ] );
		$style[] = $elements->style( [ 'attrName' => 'pinterest' ] );
		$style[] = $elements->style( [ 'attrName' => 'email' ] );
		$style[] = $elements->style( [ 'attrName' => 'phone' ] );
		$style[] = $elements->style( [ 'attrName' => 'image_wrapper' ] );
		$style[] = $elements->style( [ 'attrName' => 'content' ] );
		$style[] = $elements->style( [ 'attrName' => 'details_wrapper' ] );
		$style[] = $elements->style( [ 'attrName' => 'social_wrapper' ] );
		$style[] = $elements->style( [ 'attrName' => 'name' ] );
		$style[] = $elements->style( [ 'attrName' => 'role' ] );
		$style[] = $elements->style( [ 'attrName' => 'description' ] );
		$style[] = $elements->style( [ 'attrName' => 'image' ] );
		$style[] = $elements->style( [ 'attrName' => 'social' ] );
		$style[] = $elements->style( [ 'attrName' => 'first_social_margin' ] );
		$style[] = $elements->style( [ 'attrName' => 'last_social_margin' ] );

		$style[] = $elements->style( [
			'attrName'   => 'module_wrapper',
			'styleProps' => [
				'selector' => "{$orderClass} .df_ap_person_desc_wrapper"
			]
		] );

		$style[] = $elements->style( [
			'attrName'   => 'image_wrapper',
			'styleProps' => [
				'selector' => "{$orderClass} .df_person_photo_wrapper"
			]
		] );

		$style[] = $elements->style( [
			'attrName'   => 'content',
			'styleProps' => [
				'selector' => "{$orderClass} .df_ap_person_desc_wrapper"
			]
		] );

		$style[] = $elements->style( [
			'attrName'   => 'details_wrapper',
			'styleProps' => [
				'selector' => "{$orderClass} .df_person_details"
			]
		] );

		$style[] = $elements->style( [
			'attrName'   => 'social_wrapper',
			'styleProps' => [
				'selector' => "{$orderClass} .df_person_socail_wrapper"
			]
		] );

		$style[] = $elements->style( [
			'attrName'   => 'name',
			'styleProps' => [
				'selector' => "{$orderClass} .df_person_name"
			]
		] );

		$style[] = $elements->style( [
			'attrName'   => 'role',
			'styleProps' => [
				'selector' => "{$orderClass} .df_person_role"
			]
		] );

		$style[] = $elements->style( [
			'attrName'   => 'description',
			'styleProps' => [
				'selector' => "{$orderClass} .df_person_description"
			]
		] );

		$style[] = $elements->style( [
			'attrName'   => 'image',
			'styleProps' => [
				'selector' => "{$orderClass} .df_person_photo"
			]
		] );

		$style[] = $elements->style( [
			'attrName'   => 'social',
			'styleProps' => [
				'selector' => "{$orderClass} .df_person_socail_wrapper .df_person_social_icon"
			]
		] );

		$style[] = $elements->style( [
			'attrName'   => 'first_social',
			'styleProps' => [
				'selector' => "{$orderClass} .df_person_social_icon:first-child"
			]
		] );


		if (
			( $attrs['image_force_to_fullwidth']['innerContent']['desktop']['value'] ?? '' ) === 'on' &&
			( $attrs['enable_alternative_photo']['innerContent']['desktop']['value'] ?? '' ) === 'off'
		) {
			$style[] = CommonStyle::style( [
				'selector'            => "{$orderClass} .c4-izmir",
				'attr'                => $attrs['image_force_to_fullwidth']['innerContent'] ?? [],
				'declarationFunction' => fn( $props ) => "display:block;",
			] );
		}

		if ( ( $attrs['image_scale_type']['innerContent']['desktop']['value'] ?? '' ) === 'c4-image-rotate-left' ) {
			$style[] = CommonStyle::style( [
				'selector'            => "{$orderClass} .df_ap_person_container:hover .c4-image-rotate-left img.person_photo, {$orderClass} .df_ap_person_container:focus.c4-image-rotate-left img.person_photo",
				'attr'                => $attrs['image_scale_value']['innerContent'] ?? [],
				'declarationFunction' => fn( $props ) => "transform:scale({$props['attrValue']}) rotate(-15deg);",
			] );
		}

		if ( ( $attrs['image_scale_type']['innerContent']['desktop']['value'] ?? '' ) === 'c4-image-rotate-right' ) {
			$style[] = CommonStyle::style( [
				'selector'            => "{$orderClass} .df_ap_person_container:hover .c4-image-rotate-right img.person_photo, {$orderClass} .df_ap_person_container:focus.c4-image-rotate-right img.person_photo",
				'attr'                => $attrs['image_scale_value']['innerContent'] ?? [],
				'declarationFunction' => fn( $props ) => "transform:scale({$props['attrValue']}) rotate(15deg);",
			] );
		}

		if ( ( $attrs['border_anim']['innerContent']['desktop']['value'] ?? '' ) === 'on' ) {
			$style[] = CommonStyle::style( [
				'selector'            => "{$orderClass} .c4-izmir",
				'attr'                => $attrs['anm_border_color']['innerContent'] ?? [],
				'declarationFunction' => fn( $props ) => "--border-color:{$props['attrValue']};",
			] );
			$style[] = CommonStyle::style( [
				'selector'            => "{$orderClass} .c4-izmir",
				'attr'                => $attrs['anm_border_width']['innerContent'] ?? [],
				'declarationFunction' => fn( $props ) => "--border-width:{$props['attrValue']};",
			] );
			$style[] = CommonStyle::style( [
				'selector'            => "{$orderClass} .c4-izmir",
				'attr'                => $attrs['anm_border_margin']['innerContent'] ?? [],
				'declarationFunction' => fn( $props ) => "--border-margin:{$props['attrValue']};",
			] );
		}

		$style[] = CommonStyle::style( [
			'selector'            => "{$orderClass} .df_ap_person_container .df_ap_person_desc",
			'attr'                => $attrs['anim_direction']['innerContent'] ?? [],
			'declarationFunction' => function ( $props ) {
				return "transform: " . df_transform_values( $props['attrValue'],'hover' ). ";";
			}
		] );

		$style[] = CommonStyle::style( [
			'selector'            => "{$orderClass} .df_ap_person_container:hover .df_ap_person_desc",
			'attr'                => $attrs['anim_direction']['innerContent'] ?? [],
			'declarationFunction' => fn( $props ) => "transform: " . df_transform_values( $props['attrValue'],'default'). ";",
		] );

		$style[] = CommonStyle::style( [
			'selector'            => "{$orderClass} .df_ap_person_container .df_ap_person_desc",
			'attr'                => $attrs['overlay_transition_transition_duration']['innerContent'] ?? [],
			'declarationFunction' => fn( $props ) => "transition-duration: {$props['attrValue']};",
		] );

		$style[] = CommonStyle::style( [
			'selector'            => "{$orderClass} .df_ap_person_container .df_ap_person_desc",
			'attr'                => $attrs['overlay_transition_transition_delay']['innerContent'] ?? [],
			'declarationFunction' => fn( $props ) => "transition-delay: {$props['attrValue']};",
		] );

		$style[] = CommonStyle::style( [
			'selector'            => "{$orderClass} .df_ap_person_container .df_ap_person_desc",
			'attr'                => $attrs['overlay_transition_transition_curve']['innerContent'] ?? [],
			'declarationFunction' => fn( $props ) => "transition-timing-function: " . df_transition_fn( $props['attrValue'] ) . ";",
		] );

		$style[] = CommonStyle::style( [
			'selector' => "{$orderClass} .df_person_socail_wrapper",
			'attr'     => $attrs['social_section_align']['innerContent'] ?? [],
			'property' => 'text-align',
		] );
		$style[] = CommonStyle::style( [
			'selector' => "{$orderClass} .c4-izmir",
			'attr'     => $attrs['anm_content_padding']['innerContent'] ?? [],
			'property' => '--padding',
		] );

		if ( ( $attrs['make_full_with_icon']['innerContent']['desktop']['value'] ?? '' ) === 'on' ) {
			$style[] = CommonStyle::style( [
				'selector'            => "{$orderClass} .df_person_socail_wrapper",
				'attr'                => $attrs['anm_border_color']['innerContent'] ?? [],
				'declarationFunction' => fn( $props ) => "display:flex",
			] );
			$style[] = CommonStyle::style( [
				'selector'            => "{$orderClass} .df_person_socail_wrapper .df_person_social_icon",
				'attr'                => $attrs['anm_border_width']['innerContent'] ?? [],
				'declarationFunction' => fn( $props ) => "flex-grow: 1;margin: 0px;",
			] );
		}

		Style::add(
			[
				'id'            => $args['id'],
				'name'          => $args['name'],
				'orderIndex'    => $args['orderIndex'],
				'storeInstance' => $args['storeInstance'],
				'styles'        => $style,
			]
		);
	}

	public static function render_callback( $attrs, $content, $block, $elements )
	{
		// handler;
		function df_social_icon( $icon )
		{
			return sprintf(
				'<span class="et-pb-icon socail_icon">%1$s</span>',
				$icon !== '' ? esc_attr( et_pb_process_font_icon( $icon ) ) : '5'
			);
		}
		function df_render_image( $attrs, $props_key )
		{

			if ( !empty( $attrs[ $props_key ]['innerContent']['desktop']['value'] ) ) {
				$main_img = $attrs[ $props_key ]['innerContent']['desktop']['value'];
				$alt_text = !empty( $attrs['photo_alt_text']['innerContent']['desktop']['value'] )
					? $attrs['photo_alt_text']['innerContent']['desktop']['value']
					: df_image_alt_by_url( $main_img );

				$src = 'src';
				$image_html = sprintf(
					'<img class="person_photo" %3$s="%1$s" alt="%4$s" />',
					esc_url( $main_img ),
					$props_key,
					$src,
					esc_attr( $alt_text )
				);

				if (
					!empty( $attrs['ap_alternative_photo']['innerContent']['desktop']['value'] ) &&
					$attrs['enable_alternative_photo']['innerContent']['desktop']['value'] === 'on' &&
					$attrs['style_type']['innerContent']['desktop']['value'] === 'default_style'
				) {
					$alt_img = $attrs['ap_alternative_photo']['innerContent']['desktop']['value'];
					$alt_alt = !empty( $attrs['alternative_photo_alt_text']['innerContent']['desktop']['value'] )
						? $attrs['alternative_photo_alt_text']['innerContent']['desktop']['value']
						: df_image_alt_by_url( $alt_img );

					$image_html .= sprintf(
						'<img class="person_photo img-top" %3$s="%1$s" alt="%4$s"/>',
						esc_url( $alt_img ),
						'ap_alternative_photo',
						$src,
						esc_attr( $alt_alt )
					);

					return sprintf( '<div class="alter_image">%1$s</div>', $image_html );
				}

				return $image_html;
			}
		}
		function df_transform_values( $key = 'bottom', $state = 'default' )
		{
			$transform_values = [
				'top'          => [
					'default' => 'translateY(0px)',
					'hover'   => 'translateY(-100%)'
				],
				'bottom'       => [
					'default' => 'translateY(0px)',
					'hover'   => 'translateY(100%)'
				],
				'left'         => [
					'default' => 'translateX(0px)',
					'hover'   => 'translateX(-100%)'
				],
				'right'        => [
					'default' => 'translateX(0px)',
					'hover'   => 'translateX(100%)'
				],
				'center'       => [
					'default' => 'scale(1)',
					'hover'   => 'scale(0)'
				],
				'top_right'    => [
					'default' => 'translateX(0px) translateY(0px)',
					'hover'   => 'translateX(100%) translateY(-100%)'
				],
				'top_left'     => [
					'default' => 'translateX(0px) translateY(0px)',
					'hover'   => 'translateX(-100%) translateY(-100%)'
				],
				'bottom_right' => [
					'default' => 'translateX(0px) translateY(0px)',
					'hover'   => 'translateX(100%) translateY(100%)'
				],
				'bottom_left'  => [
					'default' => 'translateX(0px) translateY(0px)',
					'hover'   => 'translateX(-100%) translateY(100%)'
				],
			];

			return $transform_values[ $key ][ $state ];
		}


		$name_level = esc_attr( $attrs['ap_name_tag']['innerContent']['desktop']['value'] );
		$role_level = esc_attr( $attrs['ap_role_tag']['innerContent']['desktop']['value'] );

		$name_html = $attrs['name']['innerContent']['desktop']['value'] !== '' ?
			sprintf( '<%1$s class="df_person_name">%2$s</%1$s>', $name_level, esc_attr( $attrs['name']['innerContent']['desktop']['value'] ) ) : '';

		$role_html = $attrs['ap_role']['innerContent']['desktop']['value'] !== '' ?
			sprintf( '<%1$s class="df_person_role">%2$s</%1$s>', $role_level, esc_attr( $attrs['ap_role']['innerContent']['desktop']['value'] ) ) : '';

		$description = $attrs['ap_description']['innerContent']['desktop']['value'] !== '' ?
			sprintf( '<div class="df_person_description">%1$s</div>', $attrs['ap_description']['innerContent']['desktop']['value'] ) : '';

		$pattern = "/<p[^>]*><\\/p[^>]*>/";
		$description = preg_replace( $pattern, '', $description );

		$member_details_html = ( $name_html || $role_html || $description ) ?
			sprintf( '<div class="df_person_details">%1$s%2$s%3$s</div>', $name_html, $role_html, $description ) : '';

		$facebook = !empty($attrs['ap_facebook']['innerContent']['desktop']['value'])?
			sprintf( '<a href="%1$s" class="df_person_social_icon facebook" target="_blank" df-tooltip="Facebook">%2$s</a>',
				esc_url( $attrs['ap_facebook']['innerContent']['desktop']['value'] ),
				df_social_icon( '%%291%%' )
			) : '';
		$twitter = !empty($attrs['ap_twitter']['innerContent']['desktop']['value']) ?
			sprintf( '<a href="%1$s" class="df_person_social_icon twitter" target="_blank" df-tooltip="Twitter">%2$s</a>',
				esc_url( $attrs['ap_twitter']['innerContent']['desktop']['value'] ),
				df_social_icon( '%%292%%' )
			) : '';

		$linkedin = !empty($attrs['ap_linkedin']['innerContent']['desktop']['value']) ?
			sprintf( '<a href="%1$s" class="df_person_social_icon linkedin" target="_blank" df-tooltip="Linkedin">%2$s</a>',
				esc_url( $attrs['ap_linkedin']['innerContent']['desktop']['value'] ),
				df_social_icon( '%%301%%' )
			) : '';

			$instagram = !empty( $attrs['ap_instagram']['innerContent']['desktop']['value'] ) ?
			sprintf(
				'<a href="%1$s" class="df_person_social_icon instagram" target="_blank" df-tooltip="Instagram">%2$s</a>',
				esc_url( $attrs['ap_instagram']['innerContent']['desktop']['value'] ),
				df_social_icon( '%%298%%' )
			) : '';

		$pinterest = !empty( $attrs['ap_pinterest']['innerContent']['desktop']['value'] ) ?
			sprintf(
				'<a href="%1$s" class="df_person_social_icon pinterest" target="_blank" df-tooltip="Pinterest">%2$s</a>',
				esc_url( $attrs['ap_pinterest']['innerContent']['desktop']['value'] ),
				df_social_icon( '%%293%%' )
			) : '';

		$email = !empty( $attrs['ap_email']['innerContent']['desktop']['value'] ) ?
			sprintf(
				'<a href="mailto:%1$s" class="df_person_social_icon email" target="_blank" df-tooltip="Email">%2$s</a>',
				esc_attr( $attrs['ap_email']['innerContent']['desktop']['value'] ),
				df_social_icon( '%%238%%' )
			) : '';

		$phone = !empty( $attrs['ap_phone']['innerContent']['desktop']['value'] ) ?
			sprintf(
				'<a href="tel:%1$s" class="df_person_social_icon phone" target="_blank" df-tooltip="Phone">%2$s</a>',
				esc_attr( $attrs['ap_phone']['innerContent']['desktop']['value'] ),
				df_social_icon( '%%264%%' )
			) : '';

		$socail_html = ( $facebook || $twitter || $linkedin || $instagram || $pinterest || $email || $phone ) ?
			sprintf( '<div class="df_person_socail_wrapper %8$s">%1$s%2$s%3$s%4$s%5$s%6$s%7$s</div>',
				$facebook,
				$twitter,
				$linkedin,
				$instagram,
				$pinterest,
				$email,
				$phone,
				( $attrs['make_vertical_icon']['innerContent']['desktop']['value'] === 'on' && $attrs['style_type']['innerContent']['desktop']['value'] === 'default_style' ) ? 'vertical' : ''
			) : '';

		$border_anim_class = ($attrs['border_anim']['innerContent']['desktop']['value'] === 'on' && $attrs['style_type']['innerContent']['desktop']['value'] === 'default_style') ?
			$attrs['border_anm_style']['innerContent']['desktop']['value'] : '';

		$icon_reveal_class = $attrs['always_show_icon']['innerContent']['desktop']['value'] === 'on' ?
			'always-show-title' : $attrs['icon_reveal_caption']['innerContent']['desktop']['value'];

		$overlay_social = $attrs['enable_icon_on_overlay']['innerContent']['desktop']['value'] === 'on' ?
			sprintf( '<div class="%1$s">%2$s</div>', $icon_reveal_class, $socail_html ) : '';

		$overlay_content = ( $attrs['style_type']['innerContent']['desktop']['value'] === 'default_style' && $attrs['enable_icon_on_overlay']['innerContent']['desktop']['value'] === 'on' ) ?
			sprintf( '<figcaption class="df_ap_person_content %1$s">%2$s%3$s%4$s</figcaption>',
				$attrs['content_position']['innerContent']['desktop']['value'] ?? '',
				$overlay_name ?? '',
				$overlay_role ?? '',
				$overlay_social ?? ''
			) :
			'<figcaption class="df_ap_person_content"></figcaption>';

		$person_photo = df_render_image( $attrs, 'ap_photo' ) !== '' ?
			sprintf( '<div class="df_person_photo_wrapper"><div class="%6$s %5$s">%2$s<div class="df_person_photo">%1$s</div>%3$s</div></div>',
				df_render_image( $attrs, 'ap_photo' ),
				( $attrs['overlay']['innerContent']['desktop']['value'] === 'on' && $attrs['enable_alternative_photo']['innerContent']['desktop']['value'] !== 'on' ) ? '<span class="df-overlay"></span>' : '',
				$overlay_content,
				$attrs['image_scale_type']['innerContent']['desktop']['value'] ?? '',
				$border_anim_class,
				( $attrs['overlay']['innerContent']['desktop']['value'] === 'on' || $attrs['border_anim']['innerContent']['desktop']['value'] === 'on' || $attrs['enable_alternative_photo']['innerContent']['desktop']['value'] === 'on' || $attrs['enable_icon_on_overlay']['innerContent']['desktop']['value'] === 'on' ) ? 'c4-izmir' : 'c4-izmir'
			) : '';

//        additional_css_styles($render_slug);
//
//        if (array_key_exists('image', $advanced_fields) && array_key_exists('css', $advanced_fields['image'])) {
//            add_classname(generate_css_filters(
//                $render_slug,
//                'child_',
//                self::$data_utils->array_get($advanced_fields['image']['css'], 'main', '%%order_class%%')
//            ));
//        }

		if ( $attrs['style_type']['innerContent']['desktop']['value'] === 'default_style' ) {
			$person_html = sprintf( '<div class="df_ap_person_wrapper %6$s">%1$s<div class="df_ap_person_desc_wrapper"><div class="df_person_details">%2$s%3$s%4$s</div>%5$s</div></div>',
				$person_photo,
				$name_html,
				$role_html,
				$description,
				( $attrs['enable_icon_on_overlay']['innerContent']['desktop']['value'] !== 'on' ) ? $socail_html : '',
				$attrs['image_scale_type']['innerContent']['desktop']['value'] ?? ''
			);
		} else if ( $attrs['style_type']['innerContent']['desktop']['value'] === 'ekip_style' ) {
			$overlay_class = 'df_person_overlay';
			$person_html = sprintf( '<div class="df_ap_person_wrapper">%1$s<div class="df_ap_person_desc %4$s"><div class="df_ap_person_desc_wrapper">%2$s%3$s</div></div></div>',
				$person_photo,
				$member_details_html,
				$socail_html,
				$overlay_class
			);
		} else if ( $attrs['style_type']['innerContent']['desktop']['value'] === 'ekip_style_2' ) {
			$person_html = sprintf( '<div class="df_ap_person_wrapper %4$s">%1$s<div class="df_ap_person_desc"><div class="df_ap_person_desc_wrapper">%2$s%3$s</div></div></div>',
				$person_photo,
				$member_details_html,
				$socail_html,
				$attrs['image_scale_type']['innerContent']['desktop']['value'] ?? ''
			);
		}

		$layout_class = 'df_ap_' . esc_attr( $attrs['style_type']['innerContent']['desktop']['value'] );
		$html_code = sprintf( '<div class="df_ap_person_container %2$s">%1$s</div>', $person_html, $layout_class );


		wp_enqueue_script( 'df-advanced-person' );

		return Module::render(
			[
				// FE only.
				'orderIndex'          => $block->parsed_block['orderIndex'],
				'storeInstance'       => $block->parsed_block['storeInstance'],
				// VB equivalent.
				'attrs'               => $attrs,
				'elements'            => $elements,
				'id'                  => $block->parsed_block['id'],
				'moduleClassName'     => '',
				'name'                => $block->block_type->name,
				'classnamesFunction'  => [ AdvancedPerson::class, 'module_classnames' ],
				'moduleCategory'      => $block->block_type->category,
				'stylesComponent'     => [ AdvancedPerson::class, 'module_styles' ],
				'scriptDataComponent' => [ AdvancedPerson::class, 'module_script_data' ],
				'parentAttrs'         => $parent->attrs ?? [],
				'parentId'            => $parent->id ?? '',
				'parentName'          => $parent->blockName ?? '',
				'children'            => $elements->style_components(
						[
							'attrName' => 'module',
						]
					) . $html_code,
			]
		);
	}

	public function load()
	{
		$module_json_folder_path = DIFL5_JSON_PATH . '/advanced-person';

		add_action(
			'init',
			function () use ( $module_json_folder_path ) {
				ModuleRegistration::register_module(
					$module_json_folder_path,
					[
						'render_callback' => [ AdvancedPerson::class, 'render_callback' ],
					]
				);
			}
		);
	}
}
