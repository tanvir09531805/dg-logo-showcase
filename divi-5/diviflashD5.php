<?php

namespace DIFL\D5;

class diviflashD5 {
	public function __construct() {
		$this->init();
		add_action( 'divi_visual_builder_assets_before_enqueue_scripts', [ $this, 'enqueue_scripts' ] );
//		add_action( 'divi_visual_builder_assets_before_enqueue_packages', [ $this, 'enqueue_scripts' ] );
		add_action( 'wp_enqueue_scripts', [$this, 'enqueue_frontend_scripts'] );
		require_once __DIR__ . '/Localizer.php';
	}

	public function init() {
		require_once __DIR__ . '/API.php';
		require_once __DIR__ . '/server/Helper/init.php';
		require_once __DIR__ . '/server/Modules/Modules.php';
		require_once __DIR__ . '/vendor/autoload.php';
	}

	public function enqueue_scripts() {
		if ( ! et_builder_d5_enabled() && ! et_core_is_fb_enabled() ) return;

		$plugin_dir_url = plugin_dir_url( __FILE__ );
		$handle       = 'difl-divi5-new';

		wp_enqueue_script(
			$handle,
			"{$plugin_dir_url}visual-builder/scripts/bundle.js",
			[
				'divi-module-library',
				'divi-vendor-wp-hooks',
			],
			'1.0.0',
			true
		);

//			wp_enqueue_style( 'difl-d5-vb-bundle-style', "{$plugin_dir_url}visual-builder/styles/vb-bundle.css", array(), '1.0.0' );
	}

	public function enqueue_frontend_scripts() {
		$plugin_dir_url = plugin_dir_url( __FILE__ );
		wp_enqueue_style( 'difl-d5-bundle-style', "{$plugin_dir_url}visual-builder/styles/bundle.css", array(), '1.0.0' );
	}
}

new diviflashD5();