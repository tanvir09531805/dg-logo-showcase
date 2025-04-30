<?php
namespace DIFL\Server\Modules\SocialShare;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

class SocialSharePresetAttrsMap {
	/**
	 * Get the preset attributes map for the SocialShare module.
	 *
	 * @since ??
	 *
	 * @param array  $map         The preset attributes map.
	 * @param string $module_name The module name.
	 *
	 * @return array
	 */
	public static function get_map( array $map, string $module_name ) {
		if ( 'difl/social-share' !== $module_name ) {
			return $map;
		}

		return [];
	}
}