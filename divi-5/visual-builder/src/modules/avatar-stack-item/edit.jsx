import React from 'react';
import {
	ModuleContainer,
	ElementComponents
} from '@divi/module';
import { mergeAttrs } from "@divi/module-utils";
import { processFontIcon } from '@divi/icon-library';
import { isEmpty } from "lodash";
import { Styles } from "./styles";

export const Edit = ( props ) => {
	const {
		attrs,
		elements,
		id,
		name,
		parentAttrs,
		parentDefaultAttrs
	} = props;
	console.log("Edit => ", props);
	const parentAttrsWithDefault = mergeAttrs( {
		defaultAttrs: parentDefaultAttrs,
		attrs: parentAttrs,
	} );

	const process_icon = () => {
		const stack_icon_data = attrs?.content_main?.innerContent?.field_font_icon?.desktop?.value ?? null;
		const stack_icon = processFontIcon( stack_icon_data ?? {type: "divi", unicode: "&#xe08a;", weight: "400"} );
		if( isEmpty(stack_icon)) return "";
		return <span className='et-pb-icon difl_avatar_stack_icon'>{stack_icon}</span>;
	}
	const process_media = () => {
		const field_image_src = attrs?.content_main?.innerContent?.field_image_src?.desktop?.value?.src ?? "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDUwMCA1MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxwYXRoIGZpbGw9IiNFQkVCRUIiIGQ9Ik0wIDBoNTAwdjUwMEgweiIvPgogICAgICAgIDxyZWN0IGZpbGwtb3BhY2l0eT0iLjEiIGZpbGw9IiMwMDAiIHg9IjY4IiB5PSIzMDUiIHdpZHRoPSIzNjQiIGhlaWdodD0iNTY4IiByeD0iMTgyIi8+CiAgICAgICAgPGNpcmNsZSBmaWxsLW9wYWNpdHk9Ii4xIiBmaWxsPSIjMDAwIiBjeD0iMjQ5IiBjeT0iMTcyIiByPSIxMDAiLz4KICAgIDwvZz4KPC9zdmc+Cg==";
		const field_image_alt = attrs?.content_main?.innerContent?.field_image_src?.desktop?.value?.alt ?? "";
		if( isEmpty(field_image_src) ) return "";
		return  <img src={field_image_src} alt={field_image_alt} className="difl_avatar_stack_media"/>;
	}
	const process_rating = () => {
		const rating_number = attrs?.content_main?.innerContent?.field_rating_number?.desktop?.value ?? "5";
		let star = '';
		for (let i = 1; i <= 5; i++) {
			if (i <= rating_number) {
				star = star + '<span class="rate"></span>';
			} else {
				star = star + '<span class="blank"></span>';
			}
		}

		let rating_label = ''
		const field_rating_label = attrs?.content_main?.innerContent?.field_rating_label?.desktop?.value ?? "";
		if(!isEmpty(field_rating_label)){
			rating_label = <span className="difl_avatar_stack_rating_label">{field_rating_label}</span>;
		}

		return (
			<div className="difl_avatar_stack_rating_container">
				<div className="difl_avatar_stack_rating" dangerouslySetInnerHTML={{__html: star}}/>
				{rating_label}
			</div>
		);
	}
	const process_text = () => {
		const field_title_text = attrs?.content_main?.innerContent?.field_title_text?.desktop?.value ?? "";
		const field_subtitle_text = attrs?.content_main?.innerContent?.field_subtitle_text?.desktop?.value ?? "";
		let title = '';
		if(!isEmpty(field_title_text)){
			title = <h4 className="difl_avatar_stack_text_title">{field_title_text}</h4>;
		}

		let subtitle = ''
		if(!isEmpty(field_subtitle_text)){
			subtitle = <h6 className="difl_avatar_stack_text_subtitle">{field_subtitle_text}</h6>;
		}

		return (
			<div className="difl_avatar_stack_text_container">
				{title}
				{subtitle}
			</div>
		);
	}

	const field_content_type = attrs?.content_main?.innerContent?.field_content_type?.desktop?.value ?? "has_icon";

	let output = '';
	let output_class = 'has_icon';
	if("image" === field_content_type) {
		output = process_media();
		output_class = 'has_media';
	}else if("rating" === field_content_type) {
		output = process_rating();
		output_class = 'has_rating';
	}else if("text" === field_content_type) {
		output = process_text();
		output_class = 'has_text';
	}else{
		output = process_icon();
		output_class = 'has_icon';
	}

	let tooltip_content = "";
	const field_content_tooltip = attrs?.content_main?.innerContent?.field_content_tooltip?.desktop?.value ?? "";
	if(!isEmpty(field_content_tooltip)){
		tooltip_content = <noscript id="difl-avatar-stack-item-tooltip-content">{field_content_tooltip}</noscript>;
	}


	return (
		<ModuleContainer
			attrs={attrs}
			parentAttrs={parentAttrs}
			elements={elements}
			id={id}
			name={name}
			stylesComponent={Styles}
			tag="div"
		>
			{elements.styleComponents ( {
				attrName: 'module',
			} )}
			<ElementComponents
				attrs={attrs?.module?.decoration ?? {}}
				id={id}
			/>

			{tooltip_content}
			<div className={`difl_avatar_stack_item_wrapper ${output_class}`}>
				{output}
			</div>
		</ModuleContainer>
	);
}