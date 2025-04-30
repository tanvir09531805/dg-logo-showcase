/** @format */

import React, {useState, useEffect} from "react";

// Divi package dependencies.
// Renderer - HTML
const {ModuleContainer} = window?.divi?.module;

import {moduleClassnames} from "./module-classnames";
import {ModuleStyles} from "./module-styles";
import {ModuleScriptData} from "./module-script-data";
import utility from "../../../../../scripts/df_scripts/utilities";
// Internal Dependencies
// import "../../../../../includes/modules/ImageMask/style.css";

export const ImageMaskEdit = ({attrs, id, name, elements}) => {
    console.log(attrs);

    const imageSrc = attrs?.image?.innerContent?.desktop?.value?.src ?? ''
    const imageAlt = attrs?.image?.innerContent?.desktop?.value?.alt ?? '';

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
            <div className="df_im_container">
                {
                    elements.render({attrName: 'image'})
                }
            </div>

            {elements.styleComponents({
                attrName: "module",

            })}

        </ModuleContainer>
    );
};
