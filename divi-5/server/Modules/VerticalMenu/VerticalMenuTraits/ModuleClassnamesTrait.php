<?php

namespace DIVIFLASH5\Modules\VerticalMenu\VerticalMenuTraits;

if (! defined('ABSPATH')) {
  die('Direct access forbidden.');
}

use ET\Builder\Packages\Module\Options\Text\TextClassnames;
use ET\Builder\Packages\Module\Options\Element\ElementClassnames;

trait ModuleClassnamesTrait
{
  public static function module_classnames($args)
  {
    $classnames_instance = $args['classnamesInstance'];
    $attrs               = $args['attrs'];

    // Module.
    $classnames_instance->add(
      ElementClassnames::classnames(
        [
          'attrs' => $attrs['module']['decoration'] ?? [],
          'attrs' => array_merge(
            $attrs['module']['decoration'] ?? [],
            [
              'link' => $attrs['module']['advanced']['link'] ?? [],
            ]
          ),
        ]
      )
    );

    // Helper function
    function get_val($attrs, $a, $device = "desktop")
    {
      return isset($attrs[$a]['innerContent'][$device]['value']) ? $attrs[$a]['innerContent'][$device]['value'] : null;
    }

    // Common classes
    $common_classes = ['builder-view', 'df_vertical_menu_main_container'];
    $classnames_instance->add(implode(' ', $common_classes));

    // Badge position
    $badge_position = get_val($attrs, 'style_settings__badge__alignment');
    if ($badge_position) {
      $classnames_instance->add("badge-position-$badge_position");
    }

    // Alignment
    $alignment = get_val($attrs, 'style_settings__alignment');
    if ($alignment) {
      $classnames_instance->add($alignment);
    }

    // Alignment-tablet
    $alignment_tablet = get_val($attrs, 'style_settings__alignment', 'tablet');
    if ($alignment_tablet) {
      $classnames_instance->add("{$alignment_tablet}-tablet");
    }

    // Alignment-phone
    $alignment_phone = get_val($attrs, 'style_settings__alignment', 'phone');
    if ($alignment_phone) {
      $classnames_instance->add("{$alignment_phone}-phone");
    }

    // SubMenu Reveal Type
    $submenu_reveal_type = get_val($attrs, 'settings__submenu_reveal_type');
    if ($submenu_reveal_type) {
      $classnames_instance->add($submenu_reveal_type);
    }

    // Tree View
    $tree_view = get_val($attrs, 'style_settings__sub_menu__tree_view');
    if ($tree_view === 'on' && $submenu_reveal_type === 'df-vertical-sub-menu-reveal-stack') {
      $classnames_instance->add('df_enable_sub_menu__tree_view');
    }

    // Hover Animation
    $hover_animation = get_val($attrs, 'settings__menu_item_hover_animation');
    $animation_type = get_val($attrs, 'settings__select_animation_type');
    if ($hover_animation === 'on') {
      $classnames_instance->add("df-vertical-has-item-animation $animation_type");
    }

    // Builder Visibility
    $builder_visibility = get_val($attrs, 'settings__builder_visiblity');
    if ($builder_visibility === 'on') {
      $classnames_instance->add('df-vertical-submenu-builder-visiblity');
    }

    // Badge Visibility
    $badge_visibility = get_val($attrs, 'settings__badge_visiblity');
    if ($badge_visibility !== 'on') {
      $classnames_instance->add('df-vertical-menu-bedge-hide');
    }

    // Tooltip Visibility
    $tooltip_visibility = get_val($attrs, 'settings__tooltip_visiblity');
    if ($tooltip_visibility !== 'on') {
      $classnames_instance->add('df-vertical-menu-tooltip-hide');
    }
  }
}
