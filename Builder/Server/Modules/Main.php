<?php
namespace DIFL\Builder\Server\Modules;

use DIFL\Builder\Server\Modules\Blurb\Blurb;

class Main {
	public function __construct() {
		add_action( 'divi_module_library_modules_dependency_tree', [ $this, 'register_to_dependency' ] );
	}

	public function register_to_dependency( $dt ) {
		require_once __DIR__ . '/Blurb/Blurb.php';
		$dt->add_dependency( new Blurb() );
	}
}

new Main();