<?php
namespace DIFL\Server\Modules\TextReveal\TextRevealTraits;

if ( ! defined( 'ABSPATH' ) ) {
  die( 'Direct access forbidden.' );
}

trait CustomCssTrait {
  public static function custom_css() {
    return \WP_Block_Type_Registry::get_instance()->get_registered( 'difl/text-reveal' )->customCssFields;
  }
}