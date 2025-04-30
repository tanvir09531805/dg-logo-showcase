import React, { Fragment } from "react";
import { ModuleContainer } from '@divi/module';
import { Styles } from "./Styles";
import { moduleClassnames } from "./Classes";
import { ScriptData } from "./ScriptData";
import { processFontIcon } from "@divi/icon-library";
// import { convertDynamicDataFormatToObject } from "@divi/module/build-types/modal/components/dynamic-content";
const { getAttrByMode } = window?.divi?.moduleUtils;
console.log("window?.divi?.moduleUtils", window?.divi?.moduleUtils);

const render_image = ( attrs, elements ) => {
	let icon = '';
	if ( attrs?.blurb_icon_enable && attrs?.blurb_icon_enable?.innerContent?.desktop?.value === 'on' ) {
		if ( ! attrs?.blurb_icon || attrs?.blurb_icon?.innerContent?.desktop?.value === '' ) {
			icon = '5'
		} else {
			icon = processFontIcon( attrs?.blurb_icon?.innerContent?.desktop?.value )
		}
	}
	if ( attrs?.blurb_icon_enable?.innerContent?.desktop?.value === 'on' ) {
		return (
			<span className="et-pb-icon df-blurb-icon">{ icon }</span>
		)
	}

	if ( attrs?.icon_image?.innerContent?.desktop?.value?.blurb_icon_enable === 'off' ) {
		const image = attrs?.dynamic?.image;
		if ( image?.loading ) {
			// Let Divi render the loading placeholder.
			return image.render();
		}

		return (
			<img className="df_ab_blurb_image_img " src={ attrs?.icon_image?.innerContent?.desktop?.value?.src }
				 atl={ attrs?.alt_text?.innerContent?.desktop?.value }/>
		)

	}
}
const render_badge_icon = ( props ) => {
	let icon = '';

	if ( props?.badge_icon_enable && props?.badge_icon_enable?.innerContent?.desktop?.value === 'on' ) {
		if ( ! props?.badge_icon || props?.badge_icon?.innerContent?.desktop?.value === '' ) {
			icon = '5'
		} else {
			icon = processFontIcon( props?.badge_icon?.innerContent?.desktop?.value )
		}
	}
	if ( props?.badge_icon_enable?.innerContent?.desktop?.value === 'on' ) {
		return (
			<span className="et-pb-icon badge_icon">{ icon }</span>
		)
	} else {
		return null
	}
}

const render_button = ( attrs, elements ) => {

	const utils = window.ET_Builder.API.Utils;
	// const button_text = props['button_text'] ?<span>{props['button_text'] }</span> : '';
	// const button_url = props['button_url'] ? props['button_url'] : '';
	const button_font_icon = attrs?.button_font_icon ? attrs?.button_font_icon?.innerContent?.desktop?.value : '5';
	const button_icon_pos = attrs?.button_icon_placement?.innerContent?.desktop?.value ?? ''

	const button_icon = 'off' !== attrs?.use_button_icon?.innerContent?.desktop?.value ?
		<span className={ 'et-pb-icon df-blurb-button-icon' }>
        { processFontIcon( button_font_icon ) }</span>
		: '';

	return (
		<div className="df_ab_blurb_button_wrapper">
			<a className="df_ab_blurb_button" href="#"
			   style={ { display: attrs?.button_full_width?.innerContent?.desktop?.value === 'on' ? 'block' : '' } }>
				{ button_icon_pos === 'left' ? button_icon : '' }
				<span>{ attrs?.button_text?.innerContent?.desktop?.value ?? '' }</span>
				{ button_icon_pos === 'right' ? button_icon : '' }
			</a>
		</div>
	)
}
const OutPut = ( { attrs, elements } ) => {
	const content_value = {}
	const decoration_value = {}
	// Object.keys( attrs ).map( key => {
	// 	if ( 'content_area_alignment' === key || 'button_width_alignment' === key || 'button' === key) {
	// 		return;
	// 	}
	// 	if ( attrs[key]?.innerContent ) {
	// 		content_value[key] = getAttrByMode( attrs[key]?.innerContent ) ?? {};
	// 	}
	// } )

	// const {  } = content_value;
	const icon_image = content_value?.icon_image;
	const icon_enable = icon_image?.blurb_icon_enable;
	const content_icon = icon_image?.icon;
	const content_image = icon_image?.src;
	const image_placement = content_value?.image_placement ?? 'top';
	const content = <div className="df_ab_blurb_description"
						 dangerouslySetInnerHTML={ { __html: attrs?.content?.innerContent?.desktop?.value ?? '' } }></div>;

	const PlacementClass = (attrs?.image_placement?.innerContent?.desktop?.value !== '' && attrs?.blurb_icon_enable?.innerContent?.desktop?.value === 'off') ? 'placement_image_' + attrs?.image_placement?.innerContent?.desktop?.value : 'placement_icon_' + attrs?.image_placement?.innerContent?.desktop?.value;
	const iconAvailableClass = (attrs?.blurb_icon_enable?.innerContent?.desktop?.value === 'on') ? 'icon' : 'image';
	const SubTitle_level = attrs?.sub_title?.decoration?.font?.font?.desktop?.value?.headingLevel ?? 'h4';
	const TitleLevel = attrs?.title?.decoration?.font?.font?.desktop?.value?.headingLevel ?? 'h2';

	const title_url = attrs?.dynamic?.title_url?.hasValue ? utility._renderDynamicContent( attrs, 'title_url', false ) : '';
	const title_element_with_link = attrs?.dynamic?.title?.hasValue ?
		<a href={ title_url } className="df_ab_title_link">{ utility._renderDynamicContent( attrs, 'title' ) }</a> : '';

	const TitleHtml = <TitleLevel
		className="df_ab_blurb_title">{ elements.render( {
		attrName: 'title'
	} ) }</TitleLevel>;
	const SubTitleHtml = <SubTitle_level
		className="df_ab_blurb_sub_title">{ elements.render( {
		attrName: 'sub_title',
	} ) }</SubTitle_level>;

	const ImageHtml = ('off' !== icon_enable && 'top' === image_placement) ?
		<div className={ "df_ab_blurb_image " + iconAvailableClass + " " + PlacementClass }
			 style={ { textAlign: attrs?.image_icon_alignment?.innerContent?.desktop?.value } }> { render_image( attrs ) }</div> :
		<div className={ "df_ab_blurb_image " + PlacementClass }
			 style={ { textAlign: attrs?.image_icon_alignment?.innerContent?.desktop?.value } }> { render_image( attrs, elements ) }</div>;

	const BadgeText1 = (attrs?.badge_enable?.innerContent?.desktop?.value === 'on') ?
		<span className="badge_text_1">{ elements.render( {
			attrName: 'badge',
		} ) } </span> : '';
	const BadgeText2 = (attrs?.badge_enable?.innerContent?.desktop?.value === 'on') ?
		<span className="badge_text_2">{ elements.render( {
			attrName: 'badge_text_2',
		} ) } </span> : '';

	const BadgeTextHtml = (attrs?.badge && attrs?.badge?.innerContent?.desktop?.value !== '' && attrs?.badge_icon_enable?.innerContent?.desktop?.value !== 'on') ?
		<span className="badge_text_wrapper">{ BadgeText1 } { BadgeText2 }</span> : '';

	const BadgeHtml = (attrs?.badge_enable?.innerContent?.desktop?.value === 'on') ?
		<div className="df_ab_blurb_badge_wrapper">
			<div className="df_ab_blurb_badge">{ render_badge_icon( attrs ) } { BadgeTextHtml }</div>
		</div> : '';

	const HtmlCode = ('outside' !== attrs?.image_icon_container_position?.innerContent?.desktop?.value) ?
		<div className="df_ab_blurb_container"
			 style={ { maxWidth: attrs?.content_width?.innerContent?.desktop?.value?.width ?? '100%' } }>
			<div className="df_ab_blurb_content_container">
				{ ImageHtml }
				{ elements.render( {
					attrName: 'title',
				} ) }{ elements.render( {
				attrName: 'sub_title',
			} ) }{ elements.render( {
				attrName: 'content',
			} ) }{ elements.render({
				attrName:'button'
				}) }{ BadgeHtml }
			</div>
		</div>
		:
		<div className="df_ab_blurb_container"
			 style={ { maxWidth: attrs?.content_width?.innerContent?.desktop?.value?.width ?? '100%' } }>
			{ ImageHtml }
			{ elements.render({
				attrName:'button'
			}) }
			<div
				className="df_ab_blurb_content_container"> { TitleHtml }{ SubTitleHtml }{ elements.render( { attrName: 'content' } ) }{ render_button( attrs ) }{ BadgeHtml }</div>
		</div>
	return (
		<Fragment>
			{ HtmlCode }
		</Fragment>
	);
}
export const Edit = ( props ) => {
	const { attrs, id, name, elements, } = props
	const content = <div className="df_ab_blurb_description">{ elements.render( {
		attrName: 'content',
	} ) }</div>
	const PlacementClass = (attrs?.image_placement?.innerContent?.desktop?.value !== '' && attrs?.blurb_icon_enable?.innerContent?.desktop?.value === 'off') ? 'placement_image_' + attrs?.image_placement?.innerContent?.desktop?.value : 'placement_icon_' + attrs?.image_placement?.innerContent?.desktop?.value;
	const iconAvailableClass = (attrs?.blurb_icon_enable?.innerContent?.desktop?.value === 'on') ? 'icon' : 'image';

	const SubTitle_level = attrs?.sub_title_level?.innerContent?.desktop?.value;
	const TitleLevel = attrs?.title_level?.innerContent?.desktop?.value;
	// console.log("attrs is title", isDynamicData( attrs?.title?.innerContent?.desktop?.value))
	// console.log("convert", convertDynamicDataFormatToObject( attrs?.title?.innerContent?.desktop?.value))
	// console.log("attrs", formatDynamicContent() ( attrs?.title?.innerContent?.desktop?.value))
	return (
		<ModuleContainer
			attrs={ attrs }
			elements={ elements }
			id={ id }
			moduleClassName="df_ab_blurb_container"
			name={ name }
			scriptDataComponent={ ScriptData }
			stylesComponent={ Styles }
			classnamesFunction={ moduleClassnames }
		>
			<div className="et_pb_module_inner">
				{elements.render({ attrName: 'button' })}
				<OutPut attrs={ attrs } elements={ elements }/>
			</div>
		</ModuleContainer>
	);
}