/** @format */

import React, { useState, useEffect } from "react";

import { ModuleContainer, ChildModulesContainer } from '@divi/module';

import { moduleClassnames } from "./module-classnames";
import { ModuleStyles } from "./module-styles";
import { ModuleScriptData } from "./module-script-data";
// Internal Dependencies
// import "../../../../../includes/modules/AnimatedHeading/style.css";

export const AnimatedHeadingEdit = ({ attrs, id, name, elements }) => {
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
