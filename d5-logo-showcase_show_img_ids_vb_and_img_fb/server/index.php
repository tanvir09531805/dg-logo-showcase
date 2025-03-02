<?php

// namespace D5TUTSimpleQuickModule;
namespace D5LSLogoShowcaseModule;

if ( ! defined( 'ABSPATH' ) ) {
    die( 'Direct access forbidden.' );
}

require_once ABSPATH . 'wp-content/themes/Divi/includes/builder-5/server/Framework/DependencyManagement/Interfaces/DependencyInterface.php';

use ET\Builder\Framework\DependencyManagement\Interfaces\DependencyInterface;
use ET\Builder\Framework\Utility\HTMLUtility;
use ET\Builder\FrontEnd\Module\Style;
use ET\Builder\Packages\Module\Module;
use ET\Builder\Packages\Module\Options\Element\ElementClassnames;
use ET\Builder\Packages\ModuleLibrary\ModuleRegistration;

/**
 * Class that handle "D5LogoShowcaseModule" module output in frontend.
 */
class D5LogoShowcaseModule implements DependencyInterface {
    /**
     * Register module.
     * `DependencyInterface` interface ensures class method name `load()` is executed for initialization.
     */
    public function load() {
        // Register module.
        add_action( 'init', [ D5LogoShowcaseModule::class, 'register_module' ] );
    }

    /**
     * Register module.
     */
    public static function register_module() {
        // Path to module metadata that is shared between Frontend and Visual Builder.
        $module_json_folder_path = dirname( __DIR__, 1 ) . '/visual-builder/src';

        ModuleRegistration::register_module(
            $module_json_folder_path,
            [
                'render_callback' => [ D5LogoShowcaseModule::class, 'render_callback' ],
            ]
        );
    }

    /**
     * Render module style.
     */
    public static function module_styles( $args ) {
        $attrs    = $args['attrs'] ?? [];
        $elements = $args['elements'];

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
                                    'disabledModuleVisibility' => $args['settings']['disabledModuleVisibility'] ?? null,
                                ],
                            ],
                        ]
                    ),
                    // Title.
                    $elements->style(
                        [
                            'attrName' => 'title',
                        ]
                    ),
                    // Content.
                    $elements->style(
                        [
                            'attrName' => 'content',
                        ]
                    ),

                    // Module - Only for Custom CSS.
                    // CssStyle::style([
                    //     'selector'    => $args['orderClass'],  // Places orderClass in the selector
                    //     'attr'        => $attrs['css'] ?? [],
                    //     'cssFields'   => self::custom_css(),   // Passes custom CSS fields
                    //     'orderClass'  => $args['orderClass'],  // Enables orderClass for dynamic styling
                    // ]),
                ],
            ]
        );
    }

    /**
     * Render module script data.
     */
    public static function module_script_data( $args ) {
        $elements = $args['elements'];

        // Element Script Data Options.
        $elements->script_data(
            [
                'attrName' => 'module',
            ]
        );
    }

    /**
     * Render module classnames.
     */
    public static function module_classnames( $args ) {
        $classnames_instance = $args['classnamesInstance'];
        $attrs               = $args['attrs'];

        // Module.
        $classnames_instance->add(
            ElementClassnames::classnames(
                [
                    'attrs' => $attrs['module']['decoration'] ?? [],
                ]
            )
        );
    }

    /**
     * Render module HTML output.
     */
    public static function render_callback( $attrs, $content, $block, $elements ) {
        // Title.
        $title = $elements->render(
            [
                'attrName' => 'title',
            ]
        );

        // Content.
        $content = $elements->render(
            [
                'attrName' => 'content',
            ]
        );

        // images.
        // $images = $attrs, $content, $block, $elements;
        $imageIds = $block->parsed_block['attrs']["images"]["innerContent"]["desktop"]["value"];
        $imgIdsArray = explode(',', $imageIds);
        $default_image = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTA4MCIgaGVpZ2h0PSI1NDAiIHZpZXdCb3g9IjAgMCAxMDgwIDU0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZmlsbD0iI0VCRUJFQiIgZD0iTTAgMGgxMDgwdjU0MEgweiIvPgogICAgICAgIDxwYXRoIGQ9Ik00NDUuNjQ5IDU0MGgtOTguOTk1TDE0NC42NDkgMzM3Ljk5NSAwIDQ4Mi42NDR2LTk4Ljk5NWwxMTYuMzY1LTExNi4zNjVjMTUuNjItMTUuNjIgNDAuOTQ3LTE1LjYyIDU2LjU2OCAwTDQ0NS42NSA1NDB6IiBmaWxsLW9wYWNpdHk9Ii4xIiBmaWxsPSIjMDAwIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz4KICAgICAgICA8Y2lyY2xlIGZpbGwtb3BhY2l0eT0iLjA1IiBmaWxsPSIjMDAwIiBjeD0iMzMxIiBjeT0iMTQ4IiByPSI3MCIvPgogICAgICAgIDxwYXRoIGQ9Ik0xMDgwIDM3OXYxMTMuMTM3TDcyOC4xNjIgMTQwLjMgMzI4LjQ2MiA1NDBIMjE1LjMyNEw2OTkuODc4IDU1LjQ0NmMxNS42Mi0xNS42MiA0MC45NDgtMTUuNjIgNTYuNTY4IDBMMTA4MCAzNzl6IiBmaWxsLW9wYWNpdHk9Ii4yIiBmaWxsPSIjMDAwIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz4KICAgIDwvZz4KPC9zdmc+Cg==';
        $logo_size='medium';

        $images= '';
        foreach ($imgIdsArray as $key => $id) {
            
        $image_url = wp_get_attachment_image_src($id, $logo_size); // $logo_size='medium'
        $logoUrl = !empty($image_url) && !is_bool($image_url[0]) ? $image_url[0] : $default_image;
            # code...
        $images .= '<div key="'.$key.'" class="d5_ls_module_image">
                        <img src="'.$logoUrl.'" alt="Logo '.$key.'" />
                    </div>';
        }

        $logos = '<div class="d5_ls_module_images logo_5" style="display: grid; grid-template-columns: repeat(5, 1fr);">'.$images.'</div>';
    // echo '<pre>';
    //         var_dump($content);
    // echo '</pre>';

        // Module Inner.
        // Essentially, this is the module content.
        // Were wrapping the title and content in a div with class `et_pb_module_inner`.
        $module_inner = HTMLUtility::render(
            [
                'tag'               => 'div',
                'attributes'        => [
                    'class' => 'et_pb_module_inner',
                ],
                'childrenSanitizer' => 'et_core_esc_previously',
                'children'          => $title . $content . $logos,
            ]
        );

        // This are the module elements that will be rendered in the frontend.
        $module_elements = $elements->style_components(
            [
                'attrName' => 'module',
            ]
        );

        // This are the children of the module container, which are the module elements and the module inner.
        $module_container_children = $module_elements . $module_inner;

        return Module::render(
            [
                // FE only.
                'orderIndex'          => $block->parsed_block['orderIndex'],
                'storeInstance'       => $block->parsed_block['storeInstance'],

                // VB equivalent.
                'attrs'               => $attrs,
                'elements'            => $elements,
                'id'                  => $block->parsed_block['id'],
                'moduleClassName'     => 'd5_ls_module',
                'name'                => $block->block_type->name,
                'classnamesFunction'  => [ D5LogoShowcaseModule::class, 'module_classnames' ],
                'moduleCategory'      => $block->block_type->category,
                'stylesComponent'     => [ D5LogoShowcaseModule::class, 'module_styles' ],
                'scriptDataComponent' => [ D5LogoShowcaseModule::class, 'module_script_data' ],
                'children'            => $module_container_children,
            ]
        );
    }

}

// Register module.
add_action('divi_module_library_modules_dependency_tree', function( $dependency_tree ) {
    $dependency_tree->add_dependency( new D5LogoShowcaseModule() );
});

