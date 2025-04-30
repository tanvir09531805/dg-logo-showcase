<?php

namespace DIFL\Builder;

class Main {
	public function __construct() {
		$this->load_server();
		add_action( 'divi_visual_builder_assets_before_enqueue_scripts', [ $this, 'enqueue_scripts' ] );
		add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_frontend_scripts' ] );
	}

	protected function load_server() {
		require __DIR__ . '/vendor/autoload.php';
		require_once __DIR__ . '/Server/API.php';
		require_once __DIR__ . '/Server/Modules/Main.php';
	}

	public function enqueue_scripts() {

		if ( ! et_builder_d5_enabled() && ! et_core_is_fb_enabled() ) {
			return;
		}

		$plugin_path  = plugin_dir_path( __DIR__ );
		$plugin_url   = plugin_dir_url( __DIR__ );
		$path         = 'Builder/Visual-Builder/build/';
		$assets_path  = 'Builder/Assets/';
		$handle       = 'difl-divi5-new';
		$dependencies = [];

		if ( file_exists( $plugin_path . $path . 'bundle.asset.php' ) ) {
			$dependencies = include_once $plugin_path . $path . 'bundle.asset.php';
		}

		wp_enqueue_style(
			$handle . '-lib',
			$plugin_url . $assets_path . 'styles/df_lib_styles.css',
			[ 'wp-components' ],
			DIFL_VERSION );

		wp_enqueue_style(
			$handle,
			$plugin_url . $path . 'styles/bundle.css',
			[ 'wp-components' ],
			DIFL_VERSION );

//		$dependencies['dependencies'] = array_map( function ( $item ) {
//			if ( strpos( $item, '@divi' ) === false ) {
//				return $item;
//			}
//			$module = explode( '/', $item );
//
//			return str_replace( '@', '', $module[0] ) . '-' . $module[1];
//		}, $dependencies['dependencies'] );


		wp_enqueue_script(
			$handle,
			$plugin_url . $path . 'bundle.js',
			[
				'divi-module-library',
				'divi-vendor-wp-hooks',
			],
			1, true );

		$library_item = [];

		foreach ( df_load_library() as $key => $value ) {
			$library_item[ $key ]['label'] = $value;
		}

		wp_localize_script(
			$handle,
			'diflVBLocalData',
			[
				'library_item' => $library_item,
			] );
	}

	public function enqueue_frontend_scripts() {
		$plugin_path = plugin_dir_path( __DIR__ );
		$plugin_url  = plugin_dir_url( __DIR__ );
		$path        = 'Builder/Visual-Builder/build/';
		$handle      = 'difl-divi5-new';
		$assets_path = 'Builder/Assets/';

		wp_enqueue_style(
			$handle . '-lib',
			$plugin_url . $assets_path . 'styles/df_lib_styles.css',
			[ 'wp-components' ],
			DIFL_VERSION );

		wp_enqueue_style(
			$handle,
			$plugin_url . $path . 'styles/bundle.css',
			[ 'wp-components' ],
			DIFL_VERSION );
		
		wp_enqueue_script( 'swiper-script' );

		wp_enqueue_script( $handle . '-content-carousel', $plugin_url . $assets_path . 'js/contentcarousel.js', [ 'swiper-script' ], DIFL_VERSION, true );
	}
}

new Main();