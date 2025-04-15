<?php

namespace DIVIFLASH\Modules\ContentCarouselItem\Traits;

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
use DIVIFLASH\modules\ContentCarouselItem\ContentCarouselItem;

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

		// Icon. | useIcon.decoration.icon

		$icon_value = isset($attrs['useIcon']['decoration']['icon']['desktop']['value']) ? $attrs['useIcon']['decoration']['icon']['desktop']['value'] : '';
		// echo '<pre>';
		// 		// var_dump($attrs['useIcon']['decoration']);
		// 		var_dump($attrs['titleOrder']['innerContent']);
		// echo '</pre>';

		$iconHasValue = isset($attrs['imageIcon']['innerContent']['desktop']['value']['useIcon']) ? $attrs['imageIcon']['innerContent']['desktop']['value']['useIcon']: 'off';
		
		// btn 
		$btn =  isset($attrs['button']['innerContent']['desktop']['value'])?$attrs['button']['innerContent']['desktop']['value']:$attrs;
  		$linkTarget = (isset($btn['linkTarget']) && 'on' === $btn['linkTarget']) ? '_blank':'_self';

		$btnMarkup = isset($btn['text']) ? '<div class="df_cci_button_wrapper">
					<a href="'.$btn['linkUrl'].'" class="df_cci_button" target="'.$linkTarget.'">'.$btn['text'].'</a>
				</div>' : '';
		// Image
		// $image = $attrs['image']['innerContent']['desktop']['value']['image'] ?? "";
		$image = $attrs['useImage']['innerContent']['items']['src']['desktop']['value'] ?? "";
		$imgSetAlt = $attrs['useImage']['innerContent']['items']['alt']['desktop']['value']['alt'] ?? "";
		$imgAltText= $imgSetAlt?:$image['alt'];
		
		$image_markup = "";
		if ( is_array($image) && !empty($image['src']) ) {
			$image_markup = HTMLUtility::render(
				[
					'tag'               => 'div',
					'childrenSanitizer' => 'et_core_esc_previously',
					'children'          => "<img src='{$image['src']}' alt='{$imgAltText}' title='{$image['titleText']}' />",
					'attributes'        => [
						'class'    => 'df_cci_image_container',
						'data-src' => $image['src'],
					],
				]
			);
		}

		$icon = "";
		if( !empty($icon_value) && $iconHasValue==='on'){

			$processIcon = Utils::process_font_icon( $icon_value );
			
			$icon = HTMLUtility::render(
				[
					'tag'               => 'span',
					'childrenSanitizer' => 'esc_html',
					'children'          => $processIcon, // $processIcon,
					'attributes'        => [
						'class' => 'et-pb-icon',
					],
				]
			);

			$image_markup = '<div class="df_cci_image_container">'.$icon.'</div>';
			// $image_markup = '<div class="df_cci_image_container"><span className="et-pb-icon">'.$processIcon.'</span></div>';
			// $image_markup = HTMLUtility::render(
			// 	[
			// 		'tag'               => 'div',
			// 		'childrenSanitizer' => 'et_core_esc_previously',
			// 		'children'          => '<span class="et-pb-icon">'.$processIcon.'</span>',
			// 		'attributes'        => [
			// 			'class'    => 'df_cci_image_container',
			// 			'data-src' => $image['src'],
			// 		],
			// 	]
			// );
		}

		// Title.
		$title = $elements->render(
			[
				'attrName'   => 'title',
				'attributes' => [
					'class' => 'df_cc_title',
				],
			]
		);
		// Sub Title.
		$subTitle = $elements->render(
			[
				'attrName'   => 'subTitle',
				'attributes' => [
					'class' => 'df_cc_subtitle',
				],
			]
		);

		// Content.
		$content = $elements->render(
			[
				'attrName'   => 'content',
				'tag'        => 'div',
				'attributes' => [
					'class' => 'df_cc_content',
				],
			]
		);

		// Content container.
		$content_markup = HTMLUtility::render(
			[
				'tag'               => 'div',
				'childrenSanitizer' => 'et_core_esc_previously',
				'children'          => $content,
				'attributes'        => [
					'class' => 'df_cc_content',
				],
			]
		);
		
		
		$difl_content_carousel_item = '
		
			<div class="df_cci_container" data-src="'.$image['src'].'">
				' . $image_markup . '
				'.$title.'
				'.$subTitle.'
				' . $content . '
				' . $btnMarkup . '
			</div>
			
		';


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
					) .$difl_content_carousel_item, //  $icon . $image_markup . $content_container . self::process_button_markup($attrs)
			]
		);
	}

	/**
	 * Process button markup.
	 *
	 * @param array $attrs Block attributes that were saved by VB.
	 *
	 * @return string Button markup.
	 */
	/*
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
					'class'  => 'difl_content_carouselitem__button et_pb_button',
				],
				'children'   => $text_value,
			]
		);

		return HTMLUtility::render(
			[
				'tag'               => 'div',
				'attributes'        => [
					'class'  => 'difl_content_carouselitem__button_wrapper',
				],
				'childrenSanitizer' => 'et_core_esc_previously',
				'children'          => $button,
			]
		);
	}
	*/
}