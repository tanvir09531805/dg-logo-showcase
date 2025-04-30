<?php

namespace DIVIFLASH5\Modules\TextReveal\TextRevealTraits;

if (!defined('ABSPATH')) {
    die('Direct access forbidden.');
}

use DIVIFLASH5\Modules\TextReveal\TextReveal;
use ET\Builder\FrontEnd\BlockParser\BlockParserStore;
use ET\Builder\Packages\Module\Module;

trait RenderCallbackTrait
{
    public static function render_callback($attrs, $content, $block, $elements)
    {


        wp_enqueue_script('df-text-reveal');
        $content_body = $attrs['settings__content']['innerContent']['desktop']['value'] ?? '';

        $settings__trigger_type = $attrs['settings__trigger_type']['innerContent']['desktop']['value'] ?? '';

        $settings__split_content = $attrs['settings__split_content']['innerContent']['desktop']['value'] ?? '';

        $settings__reveal_by = $attrs['settings__reveal_by']['innerContent']['desktop']['value'] ?? '';

        $settings__reveal_duration = $attrs['settings__reveal_duration']['innerContent']['desktop']['value'] ?? '';

        $settings__reveal_delay = $attrs['settings__reveal_delay']['innerContent']['desktop']['value'] ?? '';

        $settings__reveal_initial_opacity = $attrs['settings__reveal_initial_opacity']['innerContent']['desktop']['value'] ?? '';

        $settings__reveal_viewport_offset_value_top = $attrs['settings__reveal_viewport_offset_value_top']['innerContent']['desktop']['value'] ?? '';

        $settings__reveal_viewport_offset_value_bottom = $attrs['settings__reveal_viewport_offset_value_bottom']['innerContent']['desktop']['value'] ?? '';

        $args = [
            'settings__reveal_duration' => $settings__reveal_duration,
            'settings__reveal_delay' => $settings__reveal_delay,
            'settings__reveal_initial_opacity' => $settings__reveal_initial_opacity,
            'settings__reveal_viewport_offset_value_top' => $settings__reveal_viewport_offset_value_top,
            'settings__reveal_viewport_offset_value_bottom' => $settings__reveal_viewport_offset_value_bottom,
        ];

        // Content.
        $content = sprintf(
            '<div data-settings="%5$s" class="df_text_reveal_main_container %3$s  %2$s %4$s" >%1$s</div>',
            $content_body,
            esc_html($settings__trigger_type),
            esc_html($settings__split_content),
            esc_html($settings__reveal_by),
            esc_attr(wp_json_encode($args))
        );

        $parent = BlockParserStore::get_parent($block->parsed_block['id'], $block->parsed_block['storeInstance']);

        return Module::render(
            [
                // FE only.
                'orderIndex' => $block->parsed_block['orderIndex'],
                'storeInstance' => $block->parsed_block['storeInstance'],

                // VB equivalent.
                'attrs' => $attrs,
                'elements' => $elements,
                'id' => $block->parsed_block['id'],
                'moduleClassName' => '',
                'name' => $block->block_type->name,
                'classnamesFunction' => [TextReveal::class, 'module_classnames'],
                'moduleCategory' => $block->block_type->category,
                'stylesComponent' => [TextReveal::class, 'module_styles'],
                'scriptDataComponent' => [TextReveal::class, 'module_script_data'],
                'parentAttrs' => $parent->attrs ?? [],
                'parentId' => $parent->id ?? '',
                'parentName' => $parent->blockName ?? '',
                'children' => $elements->style_components(
                        [
                            'attrName' => 'module',
                        ]
                    ) . $content,
            ]
        );
    }
}
