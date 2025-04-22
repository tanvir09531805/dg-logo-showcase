<?php

namespace DIFL\Builder;

class Main {
	public function __construct() {
		$this->load_server();
		add_action( 'divi_visual_builder_assets_before_enqueue_scripts', [ $this, 'enqueue_scripts' ] );
	}

	protected function load_server() {
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
		$handle       = 'difl-divi5-new';
		$dependencies = include_once $plugin_path . $path . 'bundle.asset.php';
		wp_enqueue_style(
			$handle,
			$plugin_url . $path . 'styles/bundle.css',
			[ 'wp-components' ],
			$dependencies['version'] );

		$dependencies['dependencies'] = array_map( function ( $item ) {
			if ( strpos( $item, '@divi' ) === false ) {
				return $item;
			}
			$module = explode( '/', $item );

			return str_replace( '@', '', $module[0] ) . '-' . $module[1];
		}, $dependencies['dependencies'] );


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
}

new Main();