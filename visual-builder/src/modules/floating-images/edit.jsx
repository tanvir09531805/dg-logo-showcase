/** @format */

import React, { useState, useEffect } from "react";

// Divi package dependencies.
// Renderer - HTML
const { ModuleContainer } = window?.divi?.module;

import { moduleClassnames } from "./module-classnames";
import { ModuleStyles } from "./module-styles";
import { ModuleScriptData } from "./module-script-data";
// Internal Dependencies
// import "../../../../../includes/modules/FloatingImages/style.css";

export const FloatingImagesEdit = ({ attrs, id, name, elements }) => {
    //variable declearation
    

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
            {elements.styleComponents({
                attrName: "module",
            })}
            
        </ModuleContainer>
    );
};
