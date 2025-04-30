<?php

namespace DIVIFLASH5\Modules\VerticalMenu\VerticalMenuTraits;

if (! defined('ABSPATH')) {
  die('Direct access forbidden.');
}

use ET\Builder\FrontEnd\Module\Style;
use ET\Builder\Packages\Module\Layout\Components\StyleCommon\CommonStyle;
use ET\Builder\Packages\Module\Options\Css\CssStyle;

trait ModuleStylesTrait
{

  use CustomCssTrait;

  public static function module_styles($args)
  {
    $attrs    = $args['attrs'] ?? [];
    $elements = $args['elements'];
    $settings = $args['settings'] ?? [];
    $order_class  = $args['orderClass'];

    $main_css_element = `{$order_class}.df_vertical_menu_main_container .df-vertical-menu-nav-wrap  ul.df-vertical-menu-nav`;

    Style::add(
      [
        'id'            => $args['id'],
        'name'          => $args['name'],
        'orderIndex'    => $args['orderIndex'],
        'storeInstance' => $args['storeInstance'],
        'styles'        => [
          // Element: Module.
          $elements->style(
            [
              'attrName'   => 'module',
              'styleProps' => [
                'disabledOn' => [
                  'disabledModuleVisibility' => $settings['disabledModuleVisibility'] ?? null,
                ],
              ],
            ]
          ),
          CssStyle::style(
            [
              'selector'  => $args['orderClass'],
              'attr'      => $attrs['css'] ?? [],
              'cssFields' => self::custom_css(),
            ]
          ),

          // Element: Title.
          $elements->style(
            [
              'attrName' => 'title',
            ]
          ),

          // Element: Content.
          $elements->style(
            [
              'attrName' => 'content',
            ]
          ),

          // Element: Menu Item
          $elements->style([
            'attrName' => 'style_settings__menu__item',
          ]),

          // Element: Menu Item Icon
          $elements->style([
            'attrName' => 'style_settings__menu__item_icon',
          ]),

          // Element: Sub Menu Item
          $elements->style([
            'attrName' => 'style_settings__sub_menu__item',
          ]),

          // Element: Sub Menu Item Icon
          $elements->style([
            'attrName' => 'style_settings__sub_menu__item_icon',
          ]),

          // Element: Mega Menu Item
          $elements->style([
            'attrName' => 'style_settings__mega_menu__item',
          ]),

          // Element: Mega Menu Item Icon
          $elements->style([
            'attrName' => 'style_settings__mega_menu__item_icon',
          ]),

          // Element: Sub Menu Wrapper
          $elements->style([
            'attrName' => 'style_settings__sub_menu__wrapper',
          ]),

          // Element: Mega Menu Wrapper
          $elements->style([
            'attrName' => 'style_settings__mega_menu__wrapper',
          ]),

          // Element: Mega Menu Parent Item
          $elements->style([
            'attrName' => 'style_settings__mega_menu__parent',
          ]),

          // Element: Menu Active Item
          $elements->style([
            'attrName' => 'style_settings__menu__active__state_item',
          ]),

          // Element: Menu Active Item Icon
          $elements->style([
            'attrName' => 'style_settings__menu__active__state_item_icon',
          ]),

          // Element: Sub Menu Active State Item
          $elements->style([
            'attrName' => 'style_settings__sub_menu__active__state_item',
          ]),

          // Element: Sub Menu Active State Item Icon
          $elements->style([
            'attrName' => 'style_settings__sub_menu__active__state_item_icon',
          ]),

          // Element: Mega Menu Active State Item
          $elements->style([
            'attrName' => 'style_settings__mega_menu__active__state_item',
          ]),

          // Element: Mega Menu Active State Item Icon
          $elements->style([
            'attrName' => 'style_settings__mega_menu__active__state_item_icon',
          ]),

          // Element: Menu Badge
          $elements->style([
            'attrName' => 'style_settings__menu__badge',
          ]),

          // Element: Sub Menu Badge
          $elements->style([
            'attrName' => 'style_settings__sub_menu__badge',
          ]),

          // Element: Menu Tooltip
          $elements->style([
            'attrName' => 'style_settings__menu__tooltip',
          ]),

          // Element: Sub Menu Tooltip
          $elements->style([
            'attrName' => 'style_settings__sub_menu__tooltip',
          ]),

          CommonStyle::style(
            [
              'selector' => "{$main_css_element} li:not(:first-child),{$main_css_element} .df-vertical-inside-mega-menu li:first-child",
              'attr'     => $attrs['style_settings__menu__item_gap']['decoration'] ?? [],
              'property' => 'margin-top',
              'important' => true,
            ],
          ),

          CommonStyle::style(
            [
              'selector' => "{$main_css_element} .df-vertical-sub-menu:not(.df-vertical-col-added):not(.df-vertical-inside-mega-menu) > li:not(:first-child)",
              'attr'     => $attrs['style_settings__sub_menu__item_gap']['decoration'] ?? [],
              'property' => 'margin-top',
              'important' => true,
            ],
          ),

          CommonStyle::style(
            [
              'selector' => "{$main_css_element} li.df-vertical-menu-item .df-vertical-sub-menu.df-vertical-col-added .df-vertical-sub-menu li",
              'attr'     => $attrs['style_settings__mega_menu__item_gap']['decoration'] ?? [],
              'property' => 'margin-top',
              'important' => true,
            ],
          ),

          CommonStyle::style(
            [
              'selector' => "{$main_css_element} li.df-vertical-menu-item .df-vertical-sub-menu.df-vertical-col-added",
              'attr'     => $attrs['style_settings__mega_menu__column_gap']['decoration'] ?? [],
              'property' => 'gap',
              'important' => true,
            ],
          ),

          CommonStyle::style(
            [
              'selector' => "{$main_css_element} li.df-vertical-menu-item .df-vertical-sub-menu.df-vertical-col-added",
              'attr'     => $attrs['style_settings__mega_menu__columns']['decoration'] ?? [],
              'property' => 'gap',
              'important' => true,
            ],
          ),

          CommonStyle::style(
            [
              'selector' => "{$order_class}.df_vertical_menu_main_container.df_enable_sub_menu__tree_view .df-vertical-menu-nav-wrap ul.df-vertical-menu-nav .df-vertical-sub-menu:not(.df-vertical-col-added):not(.df-vertical-inside-mega-menu):not(.df-vertical-mega-menu-item):not(.df-vertical-menu-nav-level-1)",
              'attr'     => $attrs['style_settings__sub_menu__tree_view_spacing']['innerContent'] ?? [],
              'property' => 'padding-left',
              'important' => true,
            ],
          ),

          CommonStyle::style(
            [
              'selector' => "{$main_css_element} li.df-vertical-menu-item > a .df_vertical_border_hover_effect:after, {$main_css_element} li.df-vertical-menu-item > a .df_vertical_border_hover_effect:before",
              'attr'     => $attrs['settings__select_animation_color']['decoration'] ?? [],
              'property' => 'background',
              'important' => true,
            ],
          ),

          CommonStyle::style(
            [
              'selector' => "{$main_css_element} li.df-vertical-menu-item > a .df_vertical_border_hover_effect:after, {$main_css_element} li.df-vertical-menu-item > a .df_vertical_border_hover_effect:before",
              'attr'     => $attrs['settings__animation__line_weight']['innerContent'] ?? [],
              'property' => 'height',
              'important' => true,
            ],
          )
        ],
      ]
    );
  }
}
