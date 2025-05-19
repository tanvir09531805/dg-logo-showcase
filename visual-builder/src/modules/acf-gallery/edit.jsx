/** @format */

import React, { useState, useEffect } from "react";

import { ModuleContainer, ChildModulesContainer } from '@divi/module';

import { moduleClassnames } from "./module-classnames";
import { ModuleStyles } from "./module-styles";
import { ModuleScriptData } from "./module-script-data";
// Internal Dependencies
// import "../../../../../includes/modules/ACFGallery/style.css";

export const ACFGalleryEdit = ({ attrs, id, name, elements }) => {
    //variable declearation
    // let carouselType = attrs.carousel_type?.innerContent?.desktop?.value || "slide";

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
