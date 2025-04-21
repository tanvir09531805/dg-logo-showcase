<?php

namespace DIFL\Modules\LogoShowcase\Traits;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

// phpcs:disable ET.Sniffs.ValidVariableName.UsedPropertyNotSnakeCase -- WP use snakeCase in \WP_Block_Parser_Block

use ET\Builder\FrontEnd\BlockParser\BlockParserStore;
use ET\Builder\Packages\Module\Module;
use ET\Builder\Packages\Module\Options\Element\ElementComponents;
use ET\Builder\Framework\Utility\HTMLUtility;
use DIFL\modules\LogoShowcase\LogoShowcase;

trait RenderCallback {
	use Classnames;
	use Styles;
	use ScriptData;

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
            $images .= '<span key="'.$key.'" class="dgl-showcase dgl-orientation ">
                    <img src="'.$logoUrl.'" alt="Logo '.$key.'" class="dgls-image" />
                    <span class="logo_info bottom-center"></span>
                </span>';
        }

        $logos = '<div class="dg-logos logo_5" >'.$images.'</div>';
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
				'id'                  => $block->parsed_block['id'],
				'name'                => $block->block_type->name,
				'moduleCategory'      => $block->block_type->category,
				'attrs'               => $attrs,
				'elements'            => $elements,
				'classnamesFunction'  => [ self::class, 'classnames' ],
				'scriptDataComponent' => [ self::class, 'script_data' ],
				'stylesComponent'     => [ self::class, 'styles' ],
				'children'            => $module_container_children,
			]
		);
	}
}
