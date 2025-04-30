<?php

namespace DIFL\Server;

class Localizer {
	private static string $handler = "difl-divi5-new";

	public function __construct() {
		add_action( 'divi_visual_builder_assets_before_enqueue_scripts', [ $this, 'enqueue_localize_data' ] );
	}

	public function enqueue_localize_data() {
		wp_localize_script(
			self::$handler,
			'diflVBLocalData',
			[
				'acf_gallery' => [
					"acf_gallery_fields"    => $this->get_acf_gallery_fields(),
					"registered_image_size" => $this->get_registered_image_size()
				]
			] );
	}

	private function get_acf_gallery_fields() {
		if ( ! function_exists( 'acf_get_fields' ) && ! function_exists( 'acf_get_field_groups' ) ) {
			return [];
		}
		$field_groups                           = acf_get_field_groups();
		$field_labels                           = [];
		$field_labels['select_option']['label'] = "Select Gallery";

		if ( $field_groups ) {
			foreach ( $field_groups as $group ) {
				$fields = acf_get_fields( $group['key'] );
				if ( $fields ) {
					foreach ( $fields as $field ) {
						if ( ! is_array( $field ) ) {
							continue;
						}
						if ( $field['type'] === 'gallery' ) {
						$field_labels[ $field['name'] ]['label'] = $field['label'];
						}
					}
				}
			}
		}

		return $field_labels;
	}

	public function get_registered_image_size() {
		$options  = [];
		$sub_size = wp_get_registered_image_subsizes();
		foreach ( $sub_size as $key => $value ) {
			$options[ $key ]['label'] = $key;
		}

		return $options;
	}

}

new Localizer();