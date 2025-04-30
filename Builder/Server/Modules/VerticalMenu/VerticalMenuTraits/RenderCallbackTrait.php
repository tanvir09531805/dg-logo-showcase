<?php

namespace DIFL\Server\Modules\VerticalMenu\VerticalMenuTraits;

if (! defined('ABSPATH')) {
  die('Direct access forbidden.');
}


use DIFL\Server\Modules\VerticalMenu\VerticalMenu;
use ET\Builder\FrontEnd\BlockParser\BlockParserStore;
use ET\Builder\Packages\Module\Module;

trait RenderCallbackTrait
{
  public static function render_callback($attrs, $content, $block, $elements)
  {
		wp_enqueue_script('df_vertical_menu');
		wp_enqueue_style('difl-module-visual-builder-css');

    $parent = BlockParserStore::get_parent($block->parsed_block['id'], $block->parsed_block['storeInstance']);
    $menu_slug = $attrs['settings__select_menu_slug']["innerContent"]["desktop"]["value"];

    
    $menu_items = df_vertical_get_am_menu(
      [
        'menu' => '',
        'menu_id' => $menu_slug,
      ]
    );

    
    return Module::render(
      [
        // FE only.
        'orderIndex'          => $block->parsed_block['orderIndex'],
        'storeInstance'       => $block->parsed_block['storeInstance'],

        // VB equivalent.
        'attrs'               => $attrs,
        'elements'            => $elements,
        'id'                  => $block->parsed_block['id'],
        'moduleClassName'     => '',
        'name'                => $block->block_type->name,
        'classnamesFunction'  => [VerticalMenu::class, 'module_classnames'],
        'moduleCategory'      => $block->block_type->category,
        'stylesComponent'     => [VerticalMenu::class, 'module_styles'],
        'scriptDataComponent' => [VerticalMenu::class, 'module_script_data'],
        'parentAttrs'         => $parent->attrs ?? [],
        'parentId'            => $parent->id ?? '',
        'parentName'          => $parent->blockName ?? '',
        'children'            => $elements->style_components(
          [
            'attrName' => 'module',
          ]
        ) ."<div>". $menu_items."</div>",
      ]
    );
  }
}
