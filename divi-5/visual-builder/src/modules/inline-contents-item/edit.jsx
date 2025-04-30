import React from 'react';
import { ElementComponents, ModuleContainer } from '@divi/module';
import { processFontIcon } from "@divi/icon-library";
import { isEmpty } from "lodash";

import { Styles } from "./styles";

export const moduleClassnames = ( props ) => {
	const {
		classnamesInstance,
		attrs,
		state,
		breakpoint,
	} = props;

	const content_type = attrs?.content_main?.innerContent?.content_type?.desktop?.value ?? "Text";
	if("Text" === content_type){ classnamesInstance.add("difl_inline_content_text") }
	if("Icon" === content_type){
		classnamesInstance.add("et-pb-icon");
		classnamesInstance.add("difl_inline_content_icon");
	}
	if("Line_Break" === content_type){ classnamesInstance.add("df_break_line") }
}

export const Edit = ( props ) => {
	const {
		attrs,
		elements,
		id,
		name,
		parentAttrs,
		parentDefaultAttrs
	} = props;
	console.log("C Edit => ",props)

	const content_type = attrs?.content_main?.innerContent?.content_type?.desktop?.value ?? "Text";

	const process_text = () => {
		return attrs?.content_main?.innerContent?.content_text?.desktop?.value ?? "";
	}
	const process_icon = () => {
		const content_icon = attrs?.content_main?.innerContent?.content_icon?.desktop?.value ?? null;
		return processFontIcon( content_icon ?? {type: "divi", unicode: "&#xe08a;", weight: "400"} );
	}
	const process_image = () => {
		const content_image = attrs?.content_main?.innerContent?.content_image?.desktop?.value?.src ?? "";
		if( isEmpty(content_image) ) return "";
		return  <img src={content_image} alt="" className={`difl_inline_content_image${""}`}/>;
	}

	return (
		<ModuleContainer
			attrs={attrs}
			parentAttrs={parentAttrs}
			elements={elements}
			id={id}
			name={name}
			stylesComponent={Styles}
			classnamesFunction={moduleClassnames}
			tag="span"
		>
			{elements.styleComponents ( {
				attrName: 'module',
			} )}
			<ElementComponents
				attrs={attrs?.module?.decoration ?? {}}
				id={id}
			/>
			{ "Text" === content_type && process_text() }
			{ "Icon" === content_type && process_icon() }
			{ "Image" === content_type && process_image() }
		</ModuleContainer>
	);
}