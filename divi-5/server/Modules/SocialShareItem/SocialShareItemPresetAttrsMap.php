<?php
namespace DIFL\D5\Modules\SocialShareItem;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

class SocialShareItemPresetAttrsMap {
	/**
	 * Get the preset attributes map for the SocialShareItem module.
	 *
	 * @since ??
	 *
	 * @param array  $map         The preset attributes map.
	 * @param string $module_name The module name.
	 *
	 * @return array
	 */
	public static function get_map( array $map, string $module_name ) {
		if ( 'difl/social-share-item' !== $module_name ) {
			return $map;
		}

		return [];
	}
}