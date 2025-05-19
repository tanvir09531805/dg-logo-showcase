import React from "react";

import { cssFields } from "./custom-css";

const { CssStyle, StyleContainer, CommonStyle } = window?.divi?.module;

/**
 * Module style component for static module
 */
export const ModuleStyles = ({
    attrs,
    elements,
    settings,
    orderClass,
    mode,
    state,
    noStyleTag,
}) => {
    
    return (
        <StyleContainer mode={mode} state={state} noStyleTag={noStyleTag}>
            {/* Element: Module */}
            {elements.style({
                attrName: "module",
                styleProps: {
                    disabledOn: {
                        disabledModuleVisibility:
                            settings?.disabledModuleVisibility,
                    },
                },
            })}
            <CssStyle
                selector={orderClass}
                attr={attrs.css}
                cssFields={cssFields}
            />

            {/* Element: Content */}
            {elements.style({
                attrName: "settings__content",
            })}
            <CommonStyle
                selector={`${orderClass} .df_text_reveal_main_container`}
                attr={attrs?.settings__reveal_color?.decoration}
                property="--secondary-reveal-color"
            />
            
            {elements.style({
                attrName: "social_wrapper",
                styleProps: {
                    selector: `${orderClass} .df_person_socail_wrapper`,
                }
            })
            }
            {elements.style({
                attrName: "module_wrapper",
                styleProps: {
                    selector: `${orderClass} .df_ap_person_wrapper`,
                    selectorFunction: (props) => {
                        if ("hover" === props.state) {
                            return `${orderClass} .df_ap_person_container:hover .df_ap_person_wrapper`
                        }
                        return props.setector;
                    }
                }
            })
            }
            {(((attrs?.image_force_to_fullwidth?.innerContent.desktop.value ?? 'off') === 'on') && (attrs?.enable_alternative_photo?.innerContent.desktop.value ?? 'off') === 'off') &&
                <CommonStyle
                    selector={`${orderClass} .c4-izmir`}
                    attr={attrs?.image_force_to_fullwidth?.innerContent}
                    declarationFunction={(props) => "display:block"}
                />

            }
            {
                ((attrs?.image_scale_type?.innerContent.desktop.value ?? 'no-image-scale') === 'c4-image-rotate-left') &&
                <CommonStyle
                    selector={`${orderClass} .df_ap_person_container:hover img,${orderClass} .df_ap_person_container:focus img`}
                    attr={attrs?.image_scale_value?.innerContent}
                    declarationFunction={(props) => `transform:scale(${props.attrValue}) rotate(-15deg);`}
                />
            }
        </StyleContainer>
    );
};
