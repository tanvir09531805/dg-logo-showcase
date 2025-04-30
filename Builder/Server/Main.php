<?php
namespace DIFL\Builder\Server;
class Main {
	public function __construct() {
		require_once __DIR__ . '/Modules/Blurb/Blurb.php';
	}
}

new Main();
