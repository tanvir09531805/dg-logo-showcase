/** @format */

import React, {useState, useEffect} from "react";

// Divi package dependencies.
// Renderer - HTML
const {ModuleContainer} = window?.divi?.module;
const {
    isFaIcon,
    escapeFontIcon,
    processFontIcon, findIconInList
} = window?.divi?.iconLibrary

import {moduleClassnames} from "./module-classnames";
import {ModuleStyles} from "./module-styles";
import {ModuleScriptData} from "./module-script-data";
// Internal Dependencies
// import "../../../../../includes/modules/ImageHover/style.css";

export const ImageHoverEdit = ({attrs, id, name, elements}) => {
    console.log('attrs=>',attrs);
    //variable declearation


    const title_reveal_class = attrs?.title?.innerContent?.desktop?.value?.always_show_title === 'on' ?
        'always-show-title c4-fade-up' : (attrs?.title?.innerContent?.desktop?.value?.title_reveal ?? "c4-fade-up");

    const icon_reveal_class = attrs?.icon?.innerContent?.desktop?.value?.always_show_icon === 'on' ?
        'always-show-title c4-fade-up' : (attrs?.icon?.innerContent?.desktop?.value?.icon_reveal ?? "c4-fade-up");

    const TitleTag = attrs?.title?.innerContent?.desktop?.value?.tag ?? 'h3';

    const image = ('' !== attrs?.image?.innerContent?.desktop?.value?.src) && <img src={attrs?.image?.innerContent?.desktop?.value.src} alt={attrs?.image?.innerContent?.desktop?.value.alt}/>;

    const title = ('' !== attrs?.title?.innerContent?.desktop?.value?.titleText) &&
        <div className={"ihb_title_wrap " + title_reveal_class}>
            <TitleTag className="df_ihb_title">{attrs?.title?.innerContent?.desktop?.value?.titleText}</TitleTag>
        </div>;


    const icon = attrs?.icon?.innerContent?.desktop?.value?.enable && attrs?.icon?.innerContent?.desktop?.value?.enable === 'on' ?
        !attrs?.icon?.innerContent?.desktop?.value?.icon || attrs?.icon?.innerContent?.desktop?.value?.icon === '' ?
            <div className={"ihb_icon_wrap " + icon_reveal_class}>
                <span className="et-pb-icon">5</span>
            </div> :
            <div className={"ihb_icon_wrap " + icon_reveal_class}>
                <span className="et-pb-icon">{processFontIcon(attrs?.icon?.innerContent?.desktop?.value?.icon)}</span>
            </div> : '';

    const border_anm_style = attrs?.border_anim?.innerContent?.desktop?.value?.enable === 'on' ? (attrs?.border_anim?.innerContent?.desktop?.value?.anm_style ?? "c4-border-fade") : "";

    return (
        <ModuleContainer
            attrs={attrs}
            elements={elements}
            id={id}
            name={name}
            scriptDataComponent={ModuleScriptData}
            stylesComponent={ModuleStyles}
            classnamesFunction={moduleClassnames}
        >
            <div className={"df_ihb_container " + attrs?.image?.innerContent?.desktop?.value?.scale_type ?? "no-image-scale"}>
                <figure className={"c4-izmir df_ihb_image_wrap " + border_anm_style}>
                    {attrs?.overlay?.innerContent?.desktop?.value?.useOverlay === 'on' ? <span className="df-overlay"></span> : ''}
                    {image}
                    <figcaption className={"df_ihb_content " + (attrs?.content_position?.innerContent?.desktop?.value ?? "c4-layout-top-left")}>
                        {icon}
                        {title}
                    </figcaption>
                </figure>
            </div>
            {elements.styleComponents({
                attrName: "module",
            })}

        </ModuleContainer>
    );
};
