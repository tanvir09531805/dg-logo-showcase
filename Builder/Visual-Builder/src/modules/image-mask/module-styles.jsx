import React from "react";

import {cssFields} from "./custom-css";
import df_mask from "./df_mask";

const {CssStyle, StyleContainer, CommonStyle} = window?.divi?.module;

/**
 * Module style component for static module
 */
export const ModuleStyles = props => {
    const {
        attrs, elements, settings, orderClass, mode, state, noStyleTag,
    } = props

    return (<StyleContainer mode={mode} state={state} noStyleTag={noStyleTag}>
        {/* Element: Module */}
        {elements.style({
            attrName: "module",
            styleProps: {
                disabledOn: {
                    disabledModuleVisibility: settings?.disabledModuleVisibility,
                },
            },
        })}
        <CssStyle
            selector={orderClass}
            attr={attrs.css}
            cssFields={cssFields}
        />

        <CommonStyle
            selector={`${orderClass} .df_im_container`}
            attr={attrs?.mask?.innerContent}
            declarationFunction={(props) => {

                return `-webkit-mask-image:url("${df_mask[props.attrValue.select]}");
                            mask-image: url("${df_mask[props.attrValue.select]}");
                            -webkit-mask-size: ${props.attrValue.size};
                            mask-size: ${props.attrValue.size};
                            -webkit-mask-position: ${props.attrValue.position};
                            mask-position: ${props.attrValue.position};
                            transform:rotate(${props.attrValue.rotate}) 
                            `
            }}
        />
        {
            "on" === attrs?.image?.innerContent?.desktop?.value.full_width &&
            <CommonStyle
                selector={`${orderClass} .df_im_container img`}
                attr={attrs?.image?.innerContent}
                declarationFunction={(props) => 'width:100% !important'}
            />
        }

    </StyleContainer>);
};
