<?php

namespace DIFL\D5\API;

use DIFL\D5\Modules\ACFGallery\ACFGallery;
use ET\Builder\Framework\Controllers\RESTController;
use ET\Builder\Framework\UserRole\UserRole;

class API {

	const BASE = 'difl/v5';

	public function __construct() {
		add_action( 'rest_api_init', [ $this, 'register_rest_routes' ] );
	}

	public function register_rest_routes() {
		register_rest_route( self::BASE, '/get-lib-item', [
			'methods'             => \WP_REST_Server::READABLE,
			'callback'            => [ $this, 'render_library_layout' ],
			'permission_callback' => function () {
				return true;
			},
		] );

		register_rest_route( self::BASE, '/acf-gallery/builder/get-image-data', [
			'methods'             => \WP_REST_Server::READABLE,
			'callback'            => [ $this, 'get_acf_image_data' ],
			'permission_callback' => function () {
				return true;
			},
		] );
	}

	public function render_library_layout( $request ) {
		$id       = $request->get_param( 'id' ) ?? 0;
		$response = [
			'data' => do_blocks( get_post( $id )->post_content ),
		];

		return RESTController::response_success( $response );
	}

	public function rest_acf_fields() {
		if ( ! function_exists( 'acf_get_fields' ) && ! function_exists( 'acf_get_field_groups' ) ) {
			return [];
		}
		$field_groups = acf_get_field_groups();

		if ( $field_groups ) {
			foreach ( $field_groups as $group ) {
				$fields = acf_get_fields( $group['key'] );
				if ( $fields ) {
					foreach ( $fields as $field ) {
						if ( ! is_array( $field ) ) {
							continue;
						}
//						if ( $field['type'] === 'gallery' ) {
						$field_labels[ $field['name'] ] = $field['label'];
//						}
					}
				}
			}
		}
		$response = [
			'acf_gallery_fields' => $field_labels
		];

		return RESTController::response_success( $response );
	}

	public function get_acf_image_data( $request ) {
		$acf_gallery_fields = $request->get_param( 'acf_gallery_fields' ) ?? "";
		$post_id            = $request->get_param( 'post_id' ) ?? "0";

		$response = [
			"status" => true,
			"result" => ACFGallery::get_acf_gallery_data( [
				'post_id'                => $post_id,
				'acf_gallery_field_data' => $acf_gallery_fields
			] ),
			"error"  => ""
		];

		return RESTController::response_success( $response );
	}
}

new API();