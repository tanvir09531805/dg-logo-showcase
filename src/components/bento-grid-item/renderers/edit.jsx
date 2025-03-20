// External Dependencies.
import React from 'react';

// Divi Dependencies.
const {
	ModuleContainer
} = window?.divi?.module;
const { generateDefaultAttrs } = window?.divi?.moduleLibrary;
const { getAttrByMode } = window?.divi?.moduleUtils;
const { processFontIcon } = window?.divi?.iconLibrary;

import { Styles } from './styles';
import { Classnames } from './classnames';
import {
	isEmpty,
	merge,
} from "lodash";
import parentMetadata from '../../bento-grid/module.json';

const processButtonMarkup = ( attrs, elements ) => {
	const link_value = attrs?.button?.innerContent?.desktop?.value?.linkUrl ?? '';
	const text_value = attrs?.button?.innerContent?.desktop?.value?.buttonTitle ?? '';

	const has_custom_button = 'on' === ( attrs?.button?.decoration?.button?.desktop?.value?.enable ?? 'off' );
	const button_icon_value = getAttrByMode( attrs?.button?.decoration?.button?.desktop?.value?.icon?.settings ) ?? null;
	const has_button_icon   = has_custom_button && button_icon_value;

	const button_icon        = has_button_icon
		? processFontIcon( button_icon_value ?? [] )
		: '';

	const rendered_rel      = attrs?.button?.innerContent?.desktop?.value?.rel ?? '';
	const link_target_value = attrs?.button?.innerContent?.desktop?.value?.linkTarget ?? '';
	const link_target       = 'on' === link_target_value ? '_blank' : null;

	// Nothing to output if neither Button Text nor Button URL is defined.
	if ( isEmpty( text_value ) && isEmpty( link_value ) ) {
		return '';
	}

	return (
		<div className="difl_bento_grid_item__button_wrapper">
			<a className="difl_bento_grid_item__button et_pb_button" href={ link_value } target={ link_target }>
				{ text_value }
			</a>
		</div>
	)
}

export const Edit = ( props ) => {
	const {
		attrs,
		elements,
		id,
		name,
		parentAttrs,
	} = props;
	const utils = window.ET_Builder.API.Utils;
	// console.log(utils)
	const parentDefaultAttrs = generateDefaultAttrs ( parentMetadata );
	const parentAttrsWithDefault = merge ( parentDefaultAttrs, parentAttrs );
	const parentIconContent = getAttrByMode ( parentAttrsWithDefault?.icon?.innerContent );

	const iconContent = getAttrByMode ( attrs?.icon?.innerContent );

	const icon = isEmpty ( iconContent ) ? parentIconContent : iconContent;

	const image = attrs?.image?.innerContent?.desktop?.value?.src;
	const buttonTitle = attrs?.button?.innerContent?.desktop?.value?.buttonTitle;
	const buttonLink = attrs?.button?.innerContent?.desktop?.value?.linkUrl;

	console.log("Child: ",attrs)
	// console.table([image,buttonTitle,buttonLink])

	return (
		<ModuleContainer
			attrs={attrs}
			parentAttrs={parentAttrs}
			elements={elements}
			id={id}
			name={name}
			stylesComponent={Styles}
			classnamesFunction={Classnames}
			tag="div"
		>
			{elements.styleComponents ( {
				attrName: 'module',
			} )}
			{icon && (
				<div className="difl_bento_grid_item__icon et-pb-icon">
					{processFontIcon ( icon )}
				</div>
			)}
			{image && (
				<div className="difl_bento_grid_item__image">
					<img key={ image?.id } src={ image } alt=""/>
				</div>
			)}
			<div className="difl_bento_grid_item__content-container">
				{elements.render ( {
					attrName: 'title',
				} )}
				<div className="difl_bento_grid_item__content">
					{elements.render ( {
						attrName: 'content',
					} )}
				</div>
			</div>
			{ processButtonMarkup(attrs, elements) }
		</ModuleContainer>
	);
};