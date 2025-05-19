<?php
/**
 * FaqItem Module class.
 *
 * @package DIFL\Server\Modules\FaqItem;
 */

namespace DIFL\Server\Modules\FaqItem;

if (!defined('ABSPATH')) {
    die('Direct access forbidden.');
}

use ET\Builder\Framework\DependencyManagement\Interfaces\DependencyInterface;
use ET\Builder\FrontEnd\Module\Style;
use ET\Builder\Packages\Module\Layout\Components\StyleCommon\CommonStyle;
use ET\Builder\Packages\Module\Module;
use ET\Builder\Packages\Module\Options\Css\CssStyle;
use ET\Builder\Packages\Module\Options\Element\ElementClassnames;
use ET\Builder\Packages\Module\Options\Text\TextClassnames;
use ET\Builder\Packages\ModuleLibrary\ModuleRegistration;


/**
 * Class FaqItem
 *
 * @package DIFL\Server\Modules\FaqItem
 */
class FaqItem implements DependencyInterface {

  public static function custom_css() {
        return \WP_Block_Type_Registry::get_instance()->get_registered( 'difl/faqitem' )->customCssFields;
    }

  public static function module_classnames( $args ) {
        $classnames_instance = $args['classnamesInstance'];
        $attrs               = $args['attrs'];

        // Text Options.
        $classnames_instance->add(
            TextClassnames::text_options_classnames(
                $attrs['module']['advanced']['text'] ?? [],
                [
                    'orientation' => false,
                ]
            ),
            true
        );

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
    }

  public static function module_script_data( $args ) {
        $elements = $args['elements'];

        // Element Script Data Options.
        $elements->script_data(
            [
                'attrName' => 'module',
            ]
        );
    }

  public static function module_styles( $args ) {
        $attrs    = $args['attrs'] ?? [];
        $elements = $args['elements'];
        $settings = $args['settings'] ?? [];
        $order_class  = $args['orderClass'];

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

                    // Element: Content.
                    $elements->style(
                        [
                            'attrName' => 'settings__content',
                        ]
                    ),
                    CommonStyle::style(
                        [
                            'selector'            => "{$order_class} .df_text_reveal_main_container",
                            'attr'                => $attrs['settings__reveal_color']['decoration'] ?? [],
                            'property' => '--secondary-reveal-color'
                        ]
                    ),
                ],
            ]
        );
    }

  public static function render_callback($attrs, $content, $block, $elements)
    {


        wp_enqueue_script('df-faq-item');

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
                'classnamesFunction' => [FaqItem::class, 'module_classnames'],
                'moduleCategory' => $block->block_type->category,
                'stylesComponent' => [FaqItem::class, 'module_styles'],
                'scriptDataComponent' => [FaqItem::class, 'module_script_data'],
                'parentAttrs' => $parent->attrs ?? [],
                'parentId' => $parent->id ?? '',
                'parentName' => $parent->blockName ?? '',
                'children' => $elements->style_components(
        [
            'attrName' => 'module',
        ]
    ) . $content."hi",
            ]
        );
    }

  public function load()
    {
        $module_json_folder_path = DIFL_MODULES_JSON_PATH . '/faq-item';

        add_action(
            'init',
            function () use ($module_json_folder_path) {
                ModuleRegistration::register_module(
                    $module_json_folder_path,
                    [
                        'render_callback' => [ FaqItem::class, 'render_callback' ],
          ]
        );
      }
        );
    }
}