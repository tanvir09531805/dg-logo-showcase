<?php

namespace DIFL\D5\Modules\BentoGridItem\Traits;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Direct access forbidden.' );
}

// phpcs:disable ET.Sniffs.ValidVariableName.UsedPropertyNotSnakeCase -- WP use snakeCase in \WP_Block_Parser_Block

use ET\Builder\Packages\Module\Module;
use ET\Builder\Framework\Utility\HTMLUtility;
use ET\Builder\FrontEnd\BlockParser\BlockParserStore;
use ET\Builder\Packages\IconLibrary\IconFont\Utils;
use ET\Builder\Packages\Module\Options\Element\ElementComponents;
use ET\Builder\Packages\ModuleLibrary\ModuleRegistration;
use ET\Builder\Packages\ModuleLibrary\Button\ButtonModuleUtils;
use DIFL\D5\modules\BentoGridItem\BentoGridItem;

trait RenderCallback {
	use Classnames;
	use Styles;

	/**
	 * Child module render callback which outputs server side rendered HTML on the Front-End.
	 *
	 * @since ??
	 *
	 * @param array          $attrs Block attributes that were saved by VB.
	 * @param string         $content          Block content.
	 * @param WP_Block       $block            Parsed block object that being rendered.
	 * @param ModuleElements $elements         ModuleElements instance.
	 *
	 * @return string HTML rendered of Child module.
	 */
	public static function render_callback( $attrs, $content, $block, $elements ) {
		$parent = BlockParserStore::get_parent( $block->parsed_block['id'], $block->parsed_block['storeInstance'] );

		$parent_attrs = $parent->attrs ?? [];

		$parent_default_attributes = ModuleRegistration::get_default_attrs( 'diviflash/bento-grid' );
		$parent_attrs_with_default = array_replace_recursive( $parent_default_attributes, $parent_attrs );

		// Icon.
		$icon_value = $attrs['icon']['innerContent']['desktop']['value'] ?? $parent_attrs_with_default['icon']['innerContent']['desktop']['value'] ?? [];
		$icon = "";
		if( !empty($icon_value)){
			$icon       = HTMLUtility::render(
				[
					'tag'               => 'div',
					'attributes'        => [
						'class' => 'difl_bento_grid_item__icon et-pb-icon',
					],
					'childrenSanitizer' => 'esc_html',
					'children'          => Utils::process_font_icon( $icon_value ),
				]
			);
		}


		// Image
		$image = $attrs['image']['innerContent']['desktop']['value']['src'] ?? "";
		$image_markup = "";
		if ( ! empty($image) ){
			$image_markup = HTMLUtility::render(
				[
					'tag'               => 'div',
					'attributes'        => [
						'class' => 'difl_bento_grid_item__image',
					],
					'childrenSanitizer' => 'et_core_esc_previously',
					'children'          => "<img src='{$image}' alt='{$image}'>",
				]
			);
		}

		// Title.
		$title = $elements->render(
			[
				'attrName'      => 'title',
				'hoverSelector' => '{{parentSelector}}',
			]
		);

		// Content.
		$content = $elements->render(
			[
				'attrName'      => 'content',
				'hoverSelector' => '{{parentSelector}}',
			]
		);

		// Content container.
		$content_markup = HTMLUtility::render(
			[
				'tag'               => 'div',
				'attributes'        => [
					'class' => 'difl_bento_grid_item__content',
				],
				'childrenSanitizer' => 'et_core_esc_previously',
				'children'          => $content,
			]
		);
		$content_container = HTMLUtility::render(
			[
				'tag'               => 'div',
				'attributes'        => [
					'class' => 'difl_bento_grid_item__content-container',
				],
				'childrenSanitizer' => 'et_core_esc_previously',
				'children'          => $title . $content_markup,
			]
		);

		return Module::render(
			[
				// FE only.
				'orderIndex'         => $block->parsed_block['orderIndex'],
				'storeInstance'      => $block->parsed_block['storeInstance'],

				// VB equivalent.
				'id'                 => $block->parsed_block['id'],
				'name'               => $block->block_type->name,
				'moduleCategory'     => $block->block_type->category,
				'attrs'              => $attrs,
				'elements'           => $elements,
				'classnamesFunction' => [ self::class, 'classnames' ],
				'stylesComponent'    => [ self::class, 'styles' ],
				'parentAttrs'        => $parent_attrs,
				'parentId'           => $parent->id ?? '',
				'parentName'         => $parent->blockName ?? '',
				'children'           => ElementComponents::component(
						[
							'attrs'         => $attrs['module']['decoration'] ?? [],
							'id'            => $block->parsed_block['id'],

							// FE only.
							'orderIndex'    => $block->parsed_block['orderIndex'],
							'storeInstance' => $block->parsed_block['storeInstance'],
						]
					) . $icon . $image_markup . $content_container . self::process_button_markup($attrs),
			]
		);
	}

	public static function process_button_markup( $attrs ) {
		$link_value = $attrs['button']['innerContent']['desktop']['value']['linkUrl'] ?? '';
		$text_value = $attrs['button']['innerContent']['desktop']['value']['buttonTitle'] ?? '';

		if ( $text_value ) {
			$text_value = ButtonModuleUtils::extract_link_title( $text_value );
		}

		$text_value = '' === $text_value && ! empty( $link_value ) ? esc_url( $link_value ) : esc_attr( $text_value );

		$has_custom_button = 'on' === ( $attrs['button']['decoration']['button']['desktop']['value']['enable'] ?? 'off' );
		$button_icon_value = $attrs['button']['decoration']['button']['desktop']['value']['icon']['settings'] ?? null;
		$has_button_icon   = $has_custom_button && isset( $button_icon_value );

		$button_icon        = $has_button_icon
			? Utils::process_font_icon( $attrs['button']['decoration']['button']['desktop']['value']['icon']['settings'] ?? [] )
			: '';
		$button_icon_tablet = $has_button_icon
			? Utils::process_font_icon( $attrs['button']['decoration']['button']['tablet']['value']['icon']['settings'] ?? [] )
			: '';
		$button_icon_phone  = $has_button_icon
			? Utils::process_font_icon( $attrs['button']['decoration']['button']['phone']['value']['icon']['settings'] ?? [] )
			: '';

		$rendered_rel      = $attrs['button']['innerContent']['desktop']['value']['rel'] ?? '';
		$link_target_value = $attrs['button']['innerContent']['desktop']['value']['linkTarget'] ?? '';
		$link_target       = 'on' === $link_target_value ? '_blank' : null;

		// Nothing to output if neither Button Text nor Button URL is defined.
		if ( empty( $text_value ) && empty( $link_value ) ) {
			return '';
		}

		$button = HTMLUtility::render(
			[
				'tag'        => 'a',
				'htmlAttrs'                 => [
					'href'             => esc_url( $link_value ),
					'target'           => esc_attr( $link_target ),
					'data-icon'        => esc_attr( $button_icon ),
					'data-icon-tablet' => esc_attr( $button_icon_tablet ),
					'data-icon-phone'  => esc_attr( $button_icon_phone ),
					'rel'              => empty( $rendered_rel ) ? '' : esc_attr( implode( ' ', $rendered_rel ) ),
				],
				'attributes' => [
					'class'  => 'difl_bento_grid_item__button et_pb_button',
				],
				'children'   => $text_value,
			]
		);

		return HTMLUtility::render(
			[
				'tag'               => 'div',
				'attributes'        => [
					'class'  => 'difl_bento_grid_item__button_wrapper',
				],
				'childrenSanitizer' => 'et_core_esc_previously',
				'children'          => $button,
			]
		);
	}
}