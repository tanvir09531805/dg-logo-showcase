<?php

namespace DIFL\Server\Modules\ACFGallery;

use ET\Builder\Framework\DependencyManagement\Interfaces\DependencyInterface;
use ET\Builder\Packages\Module\Layout\Components\ModuleElements\ModuleElements;
use ET\Builder\Packages\Module\Module;
use ET\Builder\Packages\ModuleLibrary\ModuleRegistration;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

class ACFGallery implements DependencyInterface {

	public static function get_acf_gallery_data($args=[]): array {
		error_log(print_r($args, true));

		$image_array = [];
		if( 0 === (int)$args['post_id']){
			error_log(print_r($args, true));
			global $post, $paged, $wp_query, $wp_the_query;
			$main_query = $wp_the_query;
			$args       = [
				'posts_per_page' => 1,
				'post_type'      => 'any',
				'orderby'        => 'rand',
				'meta_query'     => [
					[
						'key'     => $args['acf_gallery_field_data'],
						'compare' => 'EXISTS',
					],
				],
			];

			query_posts( $args );

			if ( have_posts() ) {
				while ( have_posts() ) {
					the_post();
					$post_id = $post->ID;
					$gallery_data = get_field( $args['acf_gallery_field_data'], $post->ID );
					if ( is_array( $gallery_data ) && ! empty( $gallery_data ) ) {
						$image_array = $gallery_data;
					}
				}


			}
			$wp_the_query = $wp_query = $main_query; // phpcs:ignore WordPress.WP.GlobalVariablesOverride
			wp_reset_query(); // phpcs:ignore WordPress.WP.DiscouragedFunctions
		}else{
			$gallery_data = get_field( $args['acf_gallery_field_data'], $args['post_id'] );
			if ( is_array( $gallery_data ) && ! empty( $gallery_data ) ) {
				$image_array = $gallery_data;
			}
		}


//		$options = df_acf_gallery_options(
//			array( 'images_array' => $image_array ),
//			$_POST
//		);
//
//		$gallery = df_acf_gallery_render_images( $options );

		return [
			"gallery" => "",
			"image_array" => $image_array,
			"post_id" => $args['post_id']
		];
	}

	public static function render_callback( array $attrs, string $content, WP_Block $block, ModuleElements $elements ): string {
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
				'moduleClassName'     => '',
				'moduleCategory'      => $block->block_type->category,
				'hasModuleClassName'  => true,   // Add or remove et_pb_module class
//				'classnamesFunction'  => [ self::class, 'module_classnames' ],
//				'scriptDataComponent' => [ self::class, 'module_script_data' ],
//				'stylesComponent'     => [ self::class, 'module_styles' ],
				'children'            => ""
			]
		);
	}

	public function load(): void {
		$module_json_folder_path = DIFL_MODULES_JSON_PATH . 'acf-gallery/';

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