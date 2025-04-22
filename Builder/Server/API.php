<?php

namespace DIFL\Builder\Server;

use ET\Builder\Framework\Controllers\RESTController;

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
	}

	public function render_library_layout( $request ) {
		$id       = $request->get_param( 'id' ) ?? 0;
		$response = [
			'data' => do_blocks( get_post( $id )->post_content ),
		];

		return RESTController::response_success( $response );
	}
}

new API();