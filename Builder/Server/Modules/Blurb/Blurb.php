<?php
namespace DIFL\Builder\Server\Modules\Blurb;
use ET\Builder\Packages\Module\Layout\Components\ModuleElements\ModuleElements;
use ET\Builder\Packages\ModuleLibrary\ModuleRegistration;
use ET\Builder\Framework\DependencyManagement\Interfaces\DependencyInterface;

use DIFL\Handler\Fa_Icon_Handler;

class Blurb implements DependencyInterface {
//	use DIFL\Handler\Fa_Icon_Handler;

	public static $content;

	protected $props;
	public function load(): void {
		$module_json_folder_path = dirname( __DIR__, 3 ) . '/visual-builder/config/Blurb';

		add_action(
			'init',
			function () use ( $module_json_folder_path ) {
				ModuleRegistration::register_module(
					$module_json_folder_path,
					[
						'render_callback' => [ $this, 'render_callback' ],
					]
				);
			}
		);
	}

	public function additional_css_styles( $render_slug ) {

		if ( 'off' !== $this->props['order_enable'] ) {
			$this->df_process_range( [
				'render_slug' => $render_slug,
				'slug'        => 'image_order',
				'type'        => 'order',
				'selector'    => '%%order_class%% .df_ab_blurb_image'
			] );

			$this->df_process_range( [
				'render_slug' => $render_slug,
				'slug'        => 'title_order',
				'type'        => 'order',
				'selector'    => '%%order_class%% .df_ab_blurb_title'
			] );
			$this->df_process_range( [
				'render_slug' => $render_slug,
				'slug'        => 'sub_title_order',
				'type'        => 'order',
				'selector'    => '%%order_class%% .df_ab_blurb_sub_title'
			] );
			$this->df_process_range( [
				'render_slug' => $render_slug,
				'slug'        => 'content_order',
				'type'        => 'order',
				'selector'    => '%%order_class%% .df_ab_blurb_description'
			] );
			$this->df_process_range( [
				'render_slug' => $render_slug,
				'slug'        => 'button_order',
				'type'        => 'order',
				'selector'    => '%%order_class%% .df_ab_blurb_button_wrapper'
			] );

			$this->df_process_range( [
				'render_slug' => $render_slug,
				'slug'        => 'badge_order',
				'type'        => 'order',
				'selector'    => '%%order_class%% .df_ab_blurb_badge_wrapper'
			] );
		}
		// Z index
		$this->df_process_range( [
			'render_slug' => $render_slug,
			'slug'        => 'blurb_img_zindex',
			'type'        => 'z-index',
			'selector'    => '%%order_class%% .df_ab_blurb_image'
		] );

		$this->df_process_range( [
			'render_slug' => $render_slug,
			'slug'        => 'badge_zindex',
			'type'        => 'z-index',
			'selector'    => '%%order_class%% .df_ab_blurb_badge_wrapper'
		] );

		$this->df_process_range( [
			'render_slug' => $render_slug,
			'slug'        => 'button_zindex',
			'type'        => 'z-index',
			'selector'    => '%%order_class%% .df_ab_blurb_button_wrapper'
		] );

		$this->df_process_range( [
			'render_slug' => $render_slug,
			'slug'        => 'title_zindex',
			'type'        => 'z-index',
			'selector'    => '%%order_class%% .df_ab_blurb_title'
		] );

		$this->df_process_range( [
			'render_slug' => $render_slug,
			'slug'        => 'sub_title_zindex',
			'type'        => 'z-index',
			'selector'    => '%%order_class%% .df_ab_blurb_sub_title'
		] );

		$this->df_process_range( [
			'render_slug' => $render_slug,
			'slug'        => 'content_zindex',
			'type'        => 'z-index',
			'selector'    => '%%order_class%% .df_ab_blurb_description'
		] );

		// Image placement
		$image_placement = $this->props['image_placement'];

		$this->df_process_string_attr( [
			'render_slug' => $render_slug,
			'slug'        => 'image_placement',
			'type'        => 'flex-direction',
			'selector'    => '%%order_class%% .df_ab_blurb_container',
			'default'     => 'column'
		] );

		// if('flex_top' !== $image_placement){
		//     ET_Builder_Element::set_style($render_slug, array(
		//         'selector'      => "%%order_class%% .df_ab_blurb_container",
		//         'declaration'   => "flex-direction: $image_placement;",
		//         'media_query'   => ET_Builder_Element::get_media_query('max_width_767')
		//     ));
		// }
		$this->df_process_range( [
			'render_slug' => $render_slug,
			'slug'        => 'content_width',
			'type'        => 'max-width',
			'selector'    => '%%order_class%% .df_ab_blurb_container'
		] );

		$this->df_process_string_attr( [
			'render_slug' => $render_slug,
			'slug'        => 'image_icon_alignment',
			'type'        => 'text-align',
			'selector'    => '%%order_class%% .df_ab_blurb_image',
			'default'     => 'left'
		] );

		$this->df_process_range( [
			'render_slug' => $render_slug,
			'slug'        => 'image_width',
			'type'        => 'max-width',
			'selector'    => '%%order_class%% .df_ab_blurb_image_img'
		] );

		if ( $this->props['image_icon_container_position'] !== 'inside' && ( $image_placement === 'flex_left' || $image_placement === 'flex_right' ) ) {
			// Image container and content container design
			if ( 'off' === $this->props['blurb_icon_enable'] ) {
				$this->df_process_range( [
					'render_slug' => $render_slug,
					'slug'        => 'image_container_width',
					'type'        => 'width',
					'selector'    => '%%order_class%% .df_ab_blurb_image'
				] );
			}

			$slug                          = 'image_container_width';
			$selector_property             = 'width';
			$image_container_width_desktop = ! empty( $this->props[ $slug ] ) ?
				$this->df_process_values( $this->props[ $slug ] ) : '20%';
			$image_container_width_tablet  = ! empty( $this->props[ $slug . '_tablet' ] ) ?
				$this->df_process_values( $this->props[ $slug . '_tablet' ] ) : $image_container_width_desktop;

			$image_container_width_phone = ! empty( $this->props[ $slug . '_phone' ] ) ?
				$this->df_process_values( $this->props[ $slug . '_phone' ] ) : $image_container_width_tablet;

			ET_Builder_Element::set_style( $render_slug, [
				'selector'    => '%%order_class%% .df_ab_blurb_content_container',
				'declaration' => $selector_property . ':  calc(100% - ' . $image_container_width_desktop . ');'
			] );

			if ( $this->props['image_placement_tablet'] === 'flex_left' || $this->props['image_placement_tablet'] === 'flex_right' ) {
				ET_Builder_Element::set_style( $render_slug, [
					'selector'    => '%%order_class%% .df_ab_blurb_content_container',
					'declaration' => $selector_property . ':  calc(100% - ' . $image_container_width_tablet . ');',
					'media_query' => ET_Builder_Element::get_media_query( 'max_width_980' )
				] );
			}


			ET_Builder_Element::set_style( $render_slug, [
				'selector'    => '%%order_class%% .df_ab_blurb_content_container',
				'declaration' => $selector_property . ':  100%;',
				'media_query' => ET_Builder_Element::get_media_query( 'max_width_767' )
			] );

			// ET_Builder_Element::set_style($render_slug, array(
			//     'selector' => "%%order_class%% .df_ab_blurb_container",
			//     'declaration' => sprintf('align-items: %1$s;',  $this->props['image_icon_item_align'])
			// ));


			// if ('' !== $this->props['image_icon_item_align']) {
			//     ET_Builder_Element::set_style($render_slug, array(
			//         'selector' => "%%order_class%% .df_ab_blurb_container",
			//         'declaration' => sprintf(' align-items: %1$s;',  $this->props['image_icon_item_align'])
			//     ));
			// }

			$this->df_process_string_attr( [
				'render_slug' => $render_slug,
				'slug'        => 'image_icon_item_align',
				'type'        => 'align-items',
				'selector'    => '%%order_class%% .df_ab_blurb_container',
				'default'     => 'center'
			] );
		}

		//  background
		$this->df_process_bg( [
			'render_slug' => $render_slug,
			'slug'        => 'content_area_background',
			'selector'    => '%%order_class%% .df_ab_blurb_content_container',
			'hover'       => '%%order_class%% .df_ab_blurb_container:hover .df_ab_blurb_content_container'
		] );
		$this->df_process_bg( [
			'render_slug' => $render_slug,
			'slug'        => 'title_background',
			'selector'    => '%%order_class%% .df_ab_blurb_title',
			'hover'       => '%%order_class%% .df_ab_blurb_container:hover .df_ab_blurb_title'
		] );
		$this->df_process_bg( [
			'render_slug' => $render_slug,
			'slug'        => 'sub_title_background',
			'selector'    => '%%order_class%% .df_ab_blurb_sub_title',
			'hover'       => '%%order_class%% .df_ab_blurb_container:hover .df_ab_blurb_sub_title'
		] );
		$this->df_process_bg( [
			'render_slug' => $render_slug,
			'slug'        => 'content_background',
			'selector'    => '%%order_class%% .df_ab_blurb_description',
			'hover'       => '%%order_class%% .df_ab_blurb_container:hover .df_ab_blurb_description'
		] );
		$this->df_process_bg( [
			'render_slug' => $render_slug,
			'slug'        => 'button_background',
			'selector'    => '%%order_class%% .df_ab_blurb_button',
			'hover'       => '%%order_class%% .df_ab_blurb_container:hover .df_ab_blurb_button'
		] );

		$this->df_process_bg( [
			'render_slug' => $render_slug,
			'slug'        => 'badge_background',
			'selector'    => '%%order_class%% .df_ab_blurb_badge',
			'hover'       => '%%order_class%% .df_ab_blurb_container:hover .df_ab_blurb_badge'
		] );
		// Badge icon
		if ( 'on' === $this->props['badge_icon_enable'] ) {
			$this->df_process_color( [
				'render_slug' => $render_slug,
				'slug'        => 'badge_icon_color',
				'type'        => 'color',
				'selector'    => '%%order_class%% .df_ab_blurb_badge .et-pb-icon',
				'hover'       => '%%order_class%% .df_ab_blurb_container:hover .df_ab_blurb_badge .et-pb-icon'
			] );

			$this->df_process_range( [
				'render_slug' => $render_slug,
				'slug'        => 'badge_icon_size',
				'type'        => 'font-size',
				'selector'    => '%%order_class%% .df_ab_blurb_badge .et-pb-icon'
			] );
		}
		// Blurb Icon
		if ( 'on' === $this->props['blurb_icon_enable'] ) {
			$this->df_process_color( [
				'render_slug' => $render_slug,
				'slug'        => 'blurb_icon_color',
				'type'        => 'color',
				'selector'    => '%%order_class%% .et-pb-icon.df-blurb-icon',
				'hover'       => '%%order_class%% .df_ab_blurb_container:hover .et-pb-icon.df-blurb-icon'
			] );

			$this->df_process_range( [
				'render_slug' => $render_slug,
				'slug'        => 'icon_size',
				'type'        => 'font-size',
				'selector'    => '%%order_class%% .et-pb-icon.df-blurb-icon',
				'hover'       => '%%order_class%% .df_ab_blurb_container:hover .et-pb-icon.df-blurb-icon'
			] );

			if ( '' !== $this->props['blurb_icon_background_color'] ) {
				$this->df_process_color( [
					'render_slug' => $render_slug,
					'slug'        => 'blurb_icon_background_color',
					'type'        => 'background-color',
					'selector'    => '%%order_class%% .et-pb-icon.df-blurb-icon',
					'hover'       => '%%order_class%% .df_ab_blurb_container:hover .et-pb-icon.df-blurb-icon'
				] );
			}
		}
		if ( 'on' === $this->props['blurb_icon_enable'] && '' !== $this->props['blurb_icon_spacing'] ) {
			$this->set_margin_padding_styles( [
				'render_slug' => $render_slug,
				'slug'        => 'blurb_icon_spacing',
				'type'        => 'padding',
				'selector'    => '%%order_class%% .et-pb-icon.df-blurb-icon',
				'hover'       => '%%order_class%% .df_ab_blurb_container:hover .et-pb-icon.df-blurb-icon',
				'important'   => false
			] );
		}
		// Button icon
		if ( 'on' === $this->props['use_button_icon'] ) {
			$this->df_process_color( [
				'render_slug' => $render_slug,
				'slug'        => 'button_icon_color',
				'type'        => 'color',
				'selector'    => '%%order_class%% .df_ab_blurb_button .et-pb-icon',
				'hover'       => '%%order_class%% .df_ab_blurb_container:hover .df_ab_blurb_button .et-pb-icon.df-blurb-button-icon'
			] );

			$this->df_process_range( [
				'render_slug' => $render_slug,
				'slug'        => 'button_icon_size',
				'type'        => 'font-size',
				'default'     => '24px',
				'selector'    => '%%order_class%% .df_ab_blurb_button .et-pb-icon.df-blurb-button-icon'
			] );
		}


		// Blurb Image
		if ( '' !== $this->props['image'] ) {
			if ( '' !== $this->props['blurb_img_background_color'] ) {

				$this->df_process_color( [
					'render_slug' => $render_slug,
					'slug'        => 'blurb_img_background_color',
					'type'        => 'background-color',
					'selector'    => '%%order_class%% .df_ab_blurb_image_img',
					'hover'       => '%%order_class%% .df_ab_blurb_container:hover .df_ab_blurb_image_img'
				] );
			}
			$this->set_margin_padding_styles( [
				'render_slug' => $render_slug,
				'slug'        => 'blurb_img_spacing',
				'type'        => 'padding',
				'selector'    => '%%order_class%% .df_ab_blurb_image_img',
				'hover'       => '%%order_class%% .df_ab_blurb_container:hover .df_ab_blurb_image_img',
				'important'   => true
			] );

		}

		if ( '' !== $this->props['blurb_img_margin'] ) {
			$this->set_margin_padding_styles( [
				'render_slug' => $render_slug,
				'slug'        => 'blurb_img_margin',
				'type'        => 'margin',
				'selector'    => '%%order_class%% .df_ab_blurb_image',
				'hover'       => '%%order_class%% .df_ab_blurb_image:hover',
				'important'   => false
			] );
		}

		// Blurb Container spacing
		$this->set_margin_padding_styles( [
			'render_slug' => $render_slug,
			'slug'        => 'wrapper_margin',
			'type'        => 'margin',
			'selector'    => '%%order_class%% .df_ab_blurb_container',
			'hover'       => '%%order_class%% .df_ab_blurb_container:hover',
			'important'   => false
		] );
		$this->set_margin_padding_styles( [
			'render_slug' => $render_slug,
			'slug'        => 'wrapper_padding',
			'type'        => 'padding',
			'selector'    => '%%order_class%% .df_ab_blurb_container',
			'hover'       => '%%order_class%% .df_ab_blurb_container:hover',
			'important'   => false
		] );

		// Button Design
		if ( 'on' === $this->props['button_full_width'] ) {
			ET_Builder_Element::set_style( $render_slug, [
				'selector'    => '%%order_class%% .df_ab_blurb_button',
				'declaration' => 'display: block !important;'
			] );
		}
		if ( 'off' === $this->props['button_full_width'] && '' !== $this->props['button_alignment'] ) {
			$this->df_process_string_attr( [
				'render_slug' => $render_slug,
				'slug'        => 'button_alignment',
				'type'        => 'text-align',
				'selector'    => '%%order_class%% .df_ab_blurb_button_wrapper',
				'default'     => 'left'
			] );

		}

		$this->set_margin_padding_styles( [
			'render_slug' => $render_slug,
			'slug'        => 'button_wrapper_margin',
			'type'        => 'margin',
			'selector'    => '%%order_class%% .df_ab_blurb_button_wrapper',
			'hover'       => '%%order_class%% .df_ab_blurb_container:hover .df_ab_blurb_button_wrapper',
			'important'   => false
		] );
		$this->set_margin_padding_styles( [
			'render_slug' => $render_slug,
			'slug'        => 'button_wrapper_padding',
			'type'        => 'padding',
			'selector'    => '%%order_class%% .df_ab_blurb_button_wrapper',
			'hover'       => '%%order_class%% .df_ab_blurb_container:hover .df_ab_blurb_button_wrapper',
			'important'   => false
		] );

		$this->set_margin_padding_styles( [
			'render_slug' => $render_slug,
			'slug'        => 'badge_wrapper_margin',
			'type'        => 'margin',
			'selector'    => '%%order_class%% .df_ab_blurb_badge_wrapper',
			'hover'       => '%%order_class%% .df_ab_blurb_container:hover .df_ab_blurb_badge_wrapper',
			'important'   => false
		] );


		$this->set_margin_padding_styles( [
			'render_slug' => $render_slug,
			'slug'        => 'button_margin',
			'type'        => 'margin',
			'selector'    => '%%order_class%% .df_ab_blurb_button',
			'hover'       => '%%order_class%% .df_ab_blurb_container:hover .df_ab_blurb_button',
			'important'   => false
		] );
		$this->set_margin_padding_styles( [
			'render_slug' => $render_slug,
			'slug'        => 'button_padding',
			'type'        => 'padding',
			'selector'    => '%%order_class%% .df_ab_blurb_button',
			'hover'       => '%%order_class%% .df_ab_blurb_container:hover .df_ab_blurb_button',
			'important'   => false
		] );

		$this->set_margin_padding_styles( [
			'render_slug' => $render_slug,
			'slug'        => 'button_icon_margin',
			'type'        => 'margin',
			'selector'    => '%%order_class%% .df_ab_blurb_button .et-pb-icon.df-blurb-button-icon',
			'hover'       => '%%order_class%% .df_ab_blurb_container:hover .df_ab_blurb_button .et-pb-icon.df-blurb-button-icon',
			'important'   => false,
			'show_if'     => [
				'use_button_icon' => 'on'
			]
		] );
		// Content area design
		$this->df_process_string_attr( [
			'render_slug' => $render_slug,
			'slug'        => 'content_area_alignment',
			'type'        => 'text-align',
			'selector'    => '%%order_class%% .df_ab_blurb_content_container',
			'default'     => 'left'
		] );

		// list additional fields
		$this->df_process_string_attr( [
			'render_slug' => $render_slug,
			'slug'        => 'ul_type',
			'type'        => 'list-style-type',
			'selector'    => '%%order_class%% .df_ab_blurb_description ul',
			'default'     => 'disc'
		] );
		$this->df_process_string_attr( [
			'render_slug' => $render_slug,
			'slug'        => 'ul_position',
			'type'        => 'list-style-position',
			'selector'    => '%%order_class%% .df_ab_blurb_description ul',
			'default'     => 'inside'
		] );
		$this->df_process_string_attr( [
			'render_slug' => $render_slug,
			'slug'        => 'ol_type',
			'type'        => 'list-style-type',
			'selector'    => '%%order_class%% .df_ab_blurb_description ol',
			'default'     => 'decimal'
		] );
		$this->df_process_string_attr( [
			'render_slug' => $render_slug,
			'slug'        => 'ol_position',
			'type'        => 'list-style-position',
			'selector'    => '%%order_class%% .df_ab_blurb_description ol',
			'default'     => 'inside'
		] );

		$this->set_margin_padding_styles( [
			'render_slug' => $render_slug,
			'slug'        => 'content_area_margin',
			'type'        => 'margin',
			'selector'    => '%%order_class%% .df_ab_blurb_content_container',
			'hover'       => '%%order_class%% .df_ab_blurb_container:hover .df_ab_blurb_content_container',
			'important'   => false
		] );
		$this->set_margin_padding_styles( [
			'render_slug' => $render_slug,
			'slug'        => 'content_area_padding',
			'type'        => 'padding',
			'selector'    => '%%order_class%% .df_ab_blurb_content_container',
			'hover'       => '%%order_class%% .df_ab_blurb_container:hover .df_ab_blurb_content_container',
			'important'   => false
		] );

		// Title design
		$this->set_margin_padding_styles( [
			'render_slug' => $render_slug,
			'slug'        => 'title_margin',
			'type'        => 'margin',
			'selector'    => '%%order_class%% .df_ab_blurb_title',
			'hover'       => '%%order_class%% .df_ab_blurb_container:hover .df_ab_blurb_title',
			'important'   => false
		] );
		$this->set_margin_padding_styles( [
			'render_slug' => $render_slug,
			'slug'        => 'title_padding',
			'type'        => 'padding',
			'selector'    => '%%order_class%% .df_ab_blurb_title',
			'hover'       => '%%order_class%% .df_ab_blurb_container:hover .df_ab_blurb_title',
			'important'   => false
		] );

		// Sub Title
		$this->set_margin_padding_styles( [
			'render_slug' => $render_slug,
			'slug'        => 'sub_title_margin',
			'type'        => 'margin',
			'selector'    => '%%order_class%% .df_ab_blurb_sub_title',
			'hover'       => '%%order_class%% .df_ab_blurb_container:hover .df_ab_blurb_sub_title',
			'important'   => false
		] );
		$this->set_margin_padding_styles( [
			'render_slug' => $render_slug,
			'slug'        => 'sub_title_padding',
			'type'        => 'padding',
			'selector'    => '%%order_class%% .df_ab_blurb_sub_title',
			'hover'       => '%%order_class%% .df_ab_blurb_container:hover .df_ab_blurb_sub_title',
			'important'   => false
		] );

		// Content design
		$this->set_margin_padding_styles( [
			'render_slug' => $render_slug,
			'slug'        => 'content_margin',
			'type'        => 'margin',
			'selector'    => '%%order_class%% .df_ab_blurb_description',
			'hover'       => '%%order_class%% .df_ab_blurb_container:hover .df_ab_blurb_description',
			'important'   => false
		] );
		$this->set_margin_padding_styles( [
			'render_slug' => $render_slug,
			'slug'        => 'content_padding',
			'type'        => 'padding',
			'selector'    => '%%order_class%% .df_ab_blurb_description',
			'hover'       => '%%order_class%% .df_ab_blurb_container:hover .df_ab_blurb_description',
			'important'   => false
		] );

		// Badge design
		if ( 'on' === $this->props['badge_enable'] && '' !== $this->props['badge_alignment'] ) {
			$this->df_process_string_attr( [
				'render_slug' => $render_slug,
				'slug'        => 'badge_alignment',
				'type'        => 'text-align',
				'selector'    => '%%order_class%% .df_ab_blurb_badge_wrapper',
			] );

		}

		ET_Builder_Element::set_style( $render_slug, [
			'selector'    => '%%order_class%% .badge_text_1',
			'declaration' => 'display: block !important;',
		] );

		ET_Builder_Element::set_style( $render_slug, [
			'selector'    => '%%order_class%% .badge_text_2',
			'declaration' => 'display: block !important;',
		] );

		$this->set_margin_padding_styles( [
			'render_slug' => $render_slug,
			'slug'        => 'badge_margin',
			'type'        => 'margin',
			'selector'    => '%%order_class%% .df_ab_blurb_badge',
			'hover'       => '%%order_class%%  .df_ab_blurb_container:hover .df_ab_blurb_badge',
			'important'   => false
		] );
		$this->set_margin_padding_styles( [
			'render_slug' => $render_slug,
			'slug'        => 'badge_padding',
			'type'        => 'padding',
			'selector'    => '%%order_class%% .df_ab_blurb_badge',
			'hover'       => '%%order_class%%  .df_ab_blurb_container:hover .df_ab_blurb_badge',
			'important'   => false
		] );
		$this->set_margin_padding_styles( [
			'render_slug' => $render_slug,
			'slug'        => 'badge_icon_margin',
			'type'        => 'margin',
			'selector'    => '%%order_class%% .df_ab_blurb_badge .et-pb-icon',
			'hover'       => '%%order_class%%  .df_ab_blurb_container:hover .df_ab_blurb_badge .et-pb-icon',
			'important'   => false
		] );
		$this->set_margin_padding_styles( [
			'render_slug' => $render_slug,
			'slug'        => 'badge_text_1_margin',
			'type'        => 'margin',
			'selector'    => '%%order_class%% .badge_text_1',
			'hover'       => '%%order_class%%  .df_ab_blurb_container:hover .badge_text_1',
			'important'   => false
		] );
		$this->set_margin_padding_styles( [
			'render_slug' => $render_slug,
			'slug'        => 'badge_text_1_padding',
			'type'        => 'padding',
			'selector'    => '%%order_class%% .badge_text_1',
			'hover'       => '%%order_class%%  .df_ab_blurb_container:hover .badge_text_1',
			'important'   => false
		] );
		// icon font family
		if ( method_exists( 'ET_Builder_Module_Helper_Style_Processor', 'process_extended_icon' ) ) {
			$this->generate_styles(
				[
					'utility_arg'    => 'icon_font_family',
					'render_slug'    => $render_slug,
					'base_attr_name' => 'blurb_icon',
					'important'      => true,
					'selector'       => '%%order_class%% .et-pb-icon.df-blurb-icon',
					'processor'      => [
						'ET_Builder_Module_Helper_Style_Processor',
						'process_extended_icon'
					]
				]
			);
			$this->generate_styles(
				[
					'utility_arg'    => 'icon_font_family',
					'render_slug'    => $render_slug,
					'base_attr_name' => 'badge_icon',
					'important'      => true,
					'selector'       => '%%order_class%% .et-pb-icon.badge_icon',
					'processor'      => [
						'ET_Builder_Module_Helper_Style_Processor',
						'process_extended_icon'
					]
				]
			);

			$this->generate_styles(
				[
					'utility_arg'    => 'icon_font_family',
					'render_slug'    => $render_slug,
					'base_attr_name' => 'button_font_icon',
					'important'      => true,
					'selector'       => '%%order_class%% .et-pb-icon.df-blurb-button-icon',
					'processor'      => [
						'ET_Builder_Module_Helper_Style_Processor',
						'process_extended_icon',
					],
				]
			);
		}
	}

	public function df_render_image_icon() {
		if ( isset( $this->props['blurb_icon_enable'] ) && $this->props['blurb_icon_enable'] === 'on' ) {

			return sprintf(
				'<span class="et-pb-icon df-blurb-icon">%1$s</span>',
				isset( $this->props['blurb_icon'] ) && $this->props['blurb_icon'] !== '' ?
					esc_attr( et_pb_process_font_icon( $this->props['blurb_icon'] ) ) : '5'
			);
		} else if ( isset( $this->props['image'] ) && $this->props['image'] !== '' ) {

			$src       = 'src';
			$image_alt = $this->props['alt_text'] !== '' ? $this->props['alt_text'] : df_image_alt_by_url( $this->props['image'] );
			$image_url = $this->props['image'];

			return sprintf(
				'<img class="df_ab_blurb_image_img" %3$s="%1$s" alt="%2$s" />',
				$this->props['image'],
				$image_alt,
				$src
			);
		}
	}

	public function df_render_badge_icon() {
		if ( isset( $this->props['badge_icon_enable'] ) && $this->props['badge_icon_enable'] === 'on' ) {

			return sprintf(
				'<span class="et-pb-icon badge_icon">%1$s</span>',
				isset( $this->props['badge_icon'] ) && $this->props['badge_icon'] !== '' ?
					esc_attr( et_pb_process_font_icon( $this->props['badge_icon'] ) ) : '5'
			);
		}
	}

	public function df_render_button() {
		$text   = isset( $this->props['button_text'] ) ? $this->props['button_text'] : '';
		$url    = isset( $this->props['button_url'] ) ? $this->props['button_url'] : '';
		$target = $this->props['button_url_new_window'] === 'on' ?
			'target="_blank"' : '';

		$button_font_icon = $this->props['button_font_icon'];
		$button_icon_pos  = $this->props['button_icon_placement'];

		// Button icon
		$button_icon = $this->props['use_button_icon'] !== 'off' ? sprintf( '<span class="et-pb-icon df-blurb-button-icon">%1$s</span>',
			$button_font_icon !== '' ? esc_attr( et_pb_process_font_icon( $button_font_icon ) ) : '5'
		) : '';
		if ( $text !== '' || $url !== '' ) {
			return sprintf( '<div class="df_ab_blurb_button_wrapper">
                                <a href="%1$s" %3$s class="df_ab_blurb_button" data-icon="5">%5$s <span>%2$s</span> %4$s</a>
                            </div>',
				esc_attr( $url ),
				esc_html( trim( $text ) ),
				$target,
				$button_icon_pos === 'right' ? $button_icon : '',
				$button_icon_pos === 'left' ? $button_icon : ''
			);
		} else {
			return '';
		}
	}

	public function render( $attrs, $content, $render_slug ) {
//		$this->handle_fa_icon();
		$title_level             = $this->props['title_level'];
		$sub_title_level         = $this->props['sub_title_level'];
		$title_url               = isset( $this->props['title_url'] ) ? $this->props['title_url'] : '';
		$title_url_target        = $this->props['title_url_new_tab'] === 'on' ?
			'target="_blank"' : '';
		$title_element_with_link =  $this->props['title'] !== '' ?
			sprintf('<a href="%1$s" class="df_ab_title_link" %3$s >%2$s</a>',
				$title_url,
				$this->props['title'],
				$title_url_target
			) : '';

		$title_html = $this->props['title'] !== '' ?
			sprintf('<%1$s  class="df_ab_blurb_title">%2$s</%1$s >',
				et_pb_process_header_level($title_level, 'h4'),
				!empty ( $this->props['title_url'] ) ? $title_element_with_link  : $this->props['title'] ) :  '';

		$sub_title_html = $this->props['sub_title'] !== '' ?
			sprintf('<%1$s  class="df_ab_blurb_sub_title">%2$s</%1$s >', et_pb_process_header_level($sub_title_level, 'h6'), $this->props['sub_title']) : '';
		$content = $this->props['content'] !== '' ?
			sprintf('<div class="df_ab_blurb_description">%1$s</div>', $this->props['content']) : '';

		$badge_text_1_html = ( $this->props['badge_enable']==='on' && $this->props['badge'] !== '' ) ?
			sprintf('<span class="badge_text_1">%1$s</span>', $this->props['badge']) : '';

		$badge_text_2_html = ( $this->props['badge_enable']==='on' && $this->props['badge_text_2'] !== '' ) ?
			sprintf('<span class="badge_text_2">%1$s</span>', $this->props['badge_text_2']) : '';

		$badge_text_html = ( $this->props['badge'] !== '' && $this->props['badge_icon_enable'] !== 'on') ?
			sprintf('<span class="badge_text_wrapper">
										%1$s
										%2$s
								</span>
								',  $badge_text_1_html, $badge_text_2_html) : '';

		$badge_html = ( $this->props['badge_enable']==='on' ) ?
			sprintf('<div class="df_ab_blurb_badge_wrapper">
								<div class="df_ab_blurb_badge">
										%2$s
										%1$s
								</div>
						</div>',  $badge_text_html , $this->df_render_badge_icon()) : '';

		$this->additional_css_styles($render_slug);

		// filter for images


		if (array_key_exists('image', $this->advanced_fields) && array_key_exists('css', $this->advanced_fields['image'])) {
			$this->add_classname($this->generate_css_filters(
				$render_slug,
				'child_',
				self::$data_utils->array_get($this->advanced_fields['image']['css'], 'main', '%%order_class%%')
			));
		}

		$placement_class = ($this->props['image_placement'] !== '' && $this->props['blurb_icon_enable'] === 'off') ? 'placement_image_' . $this->props['image_placement'] : 'placement_icon_' . $this->props['image_placement'];
		$icon_available_class = ($this->props['blurb_icon_enable'] === 'on' && $this->props['image_placement'] ==='flex_top') ? 'icon' : 'image';

		$image_html  = sprintf('<div class="df_ab_blurb_image %3$s %2$s">%1$s</div>', $this->df_render_image_icon(), $placement_class, $icon_available_class);

		if ( 'outside'!== $this->props['image_icon_container_position']  ) {
			$html_code = '<div class="df_ab_blurb_container"> <div class="df_ab_blurb_content_container">%2$s %3$s %4$s %1$s %5$s %6$s</div></div>';
		} else {
			$html_code = '<div class="df_ab_blurb_container"> %2$s<div class="df_ab_blurb_content_container"> %3$s %4$s %1$s %5$s %6$s</div></div>';
		}

		return sprintf($html_code, $content, $image_html, $title_html, $sub_title_html, $this->df_render_button() , $badge_html);
	}

	public  function render_callback( array $attrs, string $content, \WP_Block $block, ModuleElements $elements, array $default_printed_style_attrs ): string {

		return '';
	}
}