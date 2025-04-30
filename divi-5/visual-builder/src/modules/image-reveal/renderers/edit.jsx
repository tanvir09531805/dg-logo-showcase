// External Dependencies.
import React from 'react';

// Divi Dependencies.
import {
	ModuleContainer,
	ElementComponents,
	DynamicData,
	ModuleClassnamesParams,
	textOptionsClassnames,
	ModuleScriptDataProps,
	StylesProps,
	StyleContainer,
	CommonStyle,
	elementClassnames,
	ChildModulesContainer
} from '@divi/module';
const { useFetch } = window?.divi?.rest;
import {
	getAttrByMode,
} from '@divi/module-utils';
import { isEmpty, map } from 'lodash';

const { __ } = window?.vendor?.wp?.i18n;

import { ScriptData } from "./script";
// import { Classnames } from "./classnames";
import { Styles } from "./styles";
import { processFontIcon } from "@divi/icon-library";

import { Empty } from '../../../components/empty'

export const Edit = ( props ) => {
	const {
		attrs,
		id,
		name,
		elements,
		childrenIds
	} = props;
	const background_hover_effect = props?.attrs?.bg_hover_effects?.innerContent?.desktop?.value ?? '';

	const getAttr = (attr, sub_attr = '', declaration = 'innerContent', options = {}) => {
		if(!isEmpty(sub_attr)) {
			return getAttrByMode(props?.attrs?.[attr]?.[declaration]?.[sub_attr], options) ?? null;
		}
		return getAttrByMode(props?.attrs?.[attr]?.[declaration], options) ?? null;
	}
	const processRenderElements = (attrs) => {
		const processor = {
			__class__reveal_effect: attrs?.content_reveal_animation?.innerContent?.field_reveal_effects?.desktop?.value ?? 'none',
			__field__image: attrs?.content_image?.innerContent?.field_image?.desktop?.value ?? '',
			__field__caption_enable: attrs?.content_caption?.innerContent?.field_caption_enable?.desktop?.value ?? 'off',
			__field__caption_placement: attrs?.content_caption?.innerContent?.field_caption_placement?.desktop?.value ?? 'bottom',
			__field__caption_title: attrs?.content_caption?.innerContent?.field_caption_title?.desktop?.value ?? 'Your Caption Goes Here',
			__field__lightbox_enable: attrs?.content_link?.innerContent?.field_lightbox_enable?.desktop?.value ?? 'off',
			__field__link_url: attrs?.content_link?.innerContent?.field_link_url?.desktop?.value ?? '',
			__field__link_target: attrs?.content_link?.innerContent?.field_link_target?.desktop?.value ?? '',
			__field__reveal_directions: attrs?.content_reveal_animation?.decoration?.field_reveal_directions?.desktop?.value ?? 'reveal_ltr',
			__field__reveal_delay: attrs?.content_reveal_animation?.decoration?.field_reveal_delay?.desktop?.value ?? 0,
			__field__reveal_animation_time: attrs?.content_reveal_animation?.decoration?.field_reveal_animation_time?.desktop?.value ?? 1,
			__field__reveal_view_port: attrs?.content_reveal_animation?.decoration?.field_reveal_view_port?.desktop?.value ?? '25%',
			__field__hover_overlay_enable: attrs?.content_hover_overlay?.innerContent?.field_hover_overlay_enable?.desktop?.value ?? 'off',
			__field__hover_overlay_content_enable: attrs?.content_hover_overlay?.innerContent?.field_hover_overlay_content_enable?.desktop?.value ?? 'off',
			__field__hover_content_title: attrs?.content_hover_overlay?.innerContent?.field_hover_content_title_text?.desktop?.value ?? 'Your Title Goes Here',
			__field__hover_content_desc: attrs?.content_hover_overlay?.innerContent?.field_hover_content_desc_text?.desktop?.value ?? 'Your Description Goes Here',
			__field__hover_overlay_arrive_from: attrs?.content_hover_overlay?.innerContent?.field_hover_overlay_arrive_from?.desktop?.value ?? 'right',
			__field__overlay_enable: attrs?.content_overlay?.innerContent?.field_overlay_enable?.desktop?.value ?? 'off',

			init: () => {
				return processor.renderFinalOutput();
			},
			getRevealDirection: () => {
				switch (processor.__field__reveal_directions) {
					case 'reveal_ltr':
						return 'difl__image_reveal_lr';
					case 'reveal_rtl':
						return 'difl__image_reveal_rl';
					case 'reveal_ttb':
						return 'difl__image_reveal_tb';
					case 'reveal_btt':
						return 'difl__image_reveal_bt';
					default:
						return 'difl__image_reveal_lr';
				}
			},
			generateOverlay: () => {
				if ('on' === processor.__field__overlay_enable) {
					return <div className="difl__image_reveal_overlay"></div>;
				}
				return '';
			},
			getHoverOverlayDirection: () => {
				switch (processor.__field__hover_overlay_arrive_from) {
					case 'left':
						return 'difl__hover_overlay_lr';
					case 'right':
						return 'difl__hover_overlay_rl';
					case 'top':
						return 'difl__hover_overlay_tb';
					case 'bottom':
						return 'difl__hover_overlay_bt';
					case 'linear':
						return 'difl__hover_overlay_linear';
					case 'ease_in_out':
						return 'difl__hover_overlay_ease_in_out';
					case 'ease':
						return 'difl__hover_overlay_ease';
					case 'ease_in':
						return 'difl__hover_overlay_ease_in';
					case 'ease_out':
						return 'difl__hover_overlay_ease_out';
					default:
						return 'difl__hover_overlay_lr';
				}
			},
			generateHoverOverlayContent: () => {
				if ('on' === processor.__field__hover_overlay_content_enable) {
					return <>
						<h3 className="title arrival">{processor.__field__hover_content_title.length > 0 ?
							processor.__field__hover_content_title :
							'Your Title Goes Here..'}</h3>
						<div
							className="description arrival"
							dangerouslySetInnerHTML={{
								__html: processor.__field__hover_content_desc.length > 0 ?
									processor.__field__hover_content_desc :
									'Your Description Goes Here...',
							}}
						/>
					</>;
				}
				return '';
			},
			generateHoverOverlay: () => {
				if ('on' === processor.__field__hover_overlay_enable) {
					return <div
						className={`difl__image_reveal_hover_overlay ${processor.getHoverOverlayDirection()}`}>
						<div className="difl__image_reveal_hover_overlay_content">
							{processor.generateHoverOverlayContent()}
						</div>
					</div>;
				}
				return '';
			},
			generateCaption: () => {
				if ('on' === processor.__field__caption_enable) {
					const caption = <div className="difl_caption">{processor.__field__caption_title}</div>;
					return caption;
				}
				return '';
			},
			getRevealEffect: () => {
				if ('none' !== processor.__class__reveal_effect) {
					return 'difl__animate ' + processor.__class__reveal_effect;
				}
				return '';
			},
			renderFinalOutput: () => {
				return <div
					className={`difl__image_reveal_wrapper ${processor.getRevealDirection()}`}>
                    <span
	                    className={`difl__image_wrap ${processor.getRevealEffect()}`}>
                        <div className="difl__image_reveal_content"
                             style={{opacity: '1'}}>
                            <div className="difl__box_shadow_overlay"></div>
	                        {'on' === processor.__field__caption_enable &&
	                        'top' === processor.__field__caption_placement ?
		                        processor.generateCaption() :
		                        ''}
	                        <img
		                        decoding="async"
		                        fetchPriority="high"
		                        src={processor.__field__image}
		                        alt=""
	                        />
	                        {'on' === processor.__field__caption_enable &&
	                        'bottom' === processor.__field__caption_placement ?
		                        processor.generateCaption() :
		                        ''}
                        </div>
	                    {processor.generateOverlay()}
	                    {processor.generateHoverOverlay()}
	                    <div
		                    className="difl__image_reveal_element difl__image_reveal"></div>
                    </span>
				</div>;
			},
		};
		return processor.init();
	};


	return (
		<ModuleContainer
			attrs={attrs}
			elements={elements}
			id={id}
			name={name}
			stylesComponent={Styles}
			// classnamesFunction={Classnames}
			// scriptDataComponent={ScriptData}
			tag="div"
		>
			{elements.styleComponents ( {
				attrName: 'module',
			} )}

			<ElementComponents
				attrs={attrs?.module?.decoration ?? {}}
				id={id}
			/>
			{processRenderElements(attrs)}
		</ModuleContainer>
	);
}