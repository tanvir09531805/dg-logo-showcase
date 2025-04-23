<?php

namespace DIFL\Modules\BusinessHoursItem;

if (! defined('ABSPATH')) {
  die('Direct access forbidden.');
}

use ET\Builder\FrontEnd\Module\Style;
use ET\Builder\Packages\Module\Layout\Components\StyleCommon\CommonStyle;
use ET\Builder\Packages\Module\Options\Css\CssStyle;
use ET\Builder\Packages\StyleLibrary\Utils\StyleDeclarations;

trait Styles
{
  public static function styles($args)
  {
    $attrs        = $args['attrs'] ?? [];
    $parent_attrs = $args['parentAttrs'] ?? [];
    $order_class  = $args['orderClass'];
    $elements     = $args['elements'];
    $settings     = $args['settings'] ?? [];
    $icon_selector = "{$order_class} .et-pb-icon";

    Style::add(
      [
        'id'            => $args['id'],
        'name'          => $args['name'],
        'orderIndex'    => $args['orderIndex'],
        'storeInstance' => $args['storeInstance'],
        'styles'        => [
          // Module.
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

          // CommonStyle::style(
          //   [
          //     'selector' => "{$order_class} .df_cci_image_container",
          //     'attr'     => $attrs['imgOrder']['innerContent'] ?? '',
          //     'property' => 'order',
          //   ]
          // ),
          
          // CommonStyle::style(
          //   [
          //     'selector' => "{$order_class} .df_cc_arrows>div",
          //     'attr'     => $attrs['arrows']['advanced']['circleArrow'] ?? [],
          //     'declarationFunction' => [self::class, 'df_circle_icon'],
          //   ]
          // ),

          // Prev icon style.
          // $elements->style(
          //   [
          //     'attrName' => 'arrowPrevIcon',
          //   ]
          // ),
          
        ],
      ]
    );
  }

  public static function df_circle_icon(array $args): string
  {
    $iconRadius = ($args['attrValue'] === 'on') ? 'border-radius: 50%;' : '';
    return $iconRadius;
  }

}