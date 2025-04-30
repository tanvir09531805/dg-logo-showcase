<?php
namespace DIFL\D5\Modules\BentoGridItem;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

use ET\Builder\Framework\DependencyManagement\Interfaces\DependencyInterface;
use ET\Builder\Packages\ModuleLibrary\ModuleRegistration;

class BentoGridItem implements DependencyInterface {
	use Traits\RenderCallback;

	/**
	 * Loads `ChildModule` and registers Front-End render callback and REST API Endpoints.
	 *
	 * @since ??
	 *
	 * @return void
	 */
	public function load() {
		$module_json_folder_path = DIFL_MODULES_JSON_PATH . 'bento-grid-item/';

		add_action(
			'init',
			function() use ( $module_json_folder_path ) {
				ModuleRegistration::register_module(
					$module_json_folder_path,
					[
						'render_callback' => [ BentoGridItem::class, 'render_callback' ],
					]
				);
			}
		);
	}
}