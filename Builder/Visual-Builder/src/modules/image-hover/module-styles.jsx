import React from "react";

import {cssFields} from "./custom-css";
import utility from "../../../../../scripts/df_scripts/utilities";

const {CssStyle, StyleContainer, CommonStyle} = window?.divi?.module;

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
            <CssStyle
                selector={orderClass}
                attr={attrs.css}
                cssFields={cssFields}
            />

            {/* Element: Content */}
            {elements.style({
                attrName: "icon",
            })}
            {elements.style({
                attrName: "icon_wrapper",
            })}
            {elements.style({
                attrName: "title",
            })}

            {attrs?.overlay?.innerContent?.desktop?.value?.useOverlay !== 'on' && <CommonStyle
                selector={`${orderClass} .c4-izmir`}
                attr={attrs?.overlay?.innerContent}
                declarationFunction={(props) => "--image-opacity: 1;"}

            />
            }
            {attrs?.overlay?.innerContent?.desktop?.value?.useOverlay === 'on' && <CommonStyle
                selector={`${orderClass} .c4-izmir .df-overlay`}
                attr={attrs?.overlay?.innerContent}
                declarationFunction={(props) => {
                    return `background-image: linear-gradient(${props.attrValue.overlay_direction ?? '180deg'},  
                    ${props.attrValue.primary_color ?? "#00B4DB"} 0, 
                    ${props.attrValue.secondary_color ?? "#0083B0"} 100%);`
                }
                }
            />}

            {attrs?.border_anim?.innerContent?.desktop?.value?.enable !== 'on' &&
                <CommonStyle
                    selector={`${orderClass} .c4-izmir`}
                    attr={attrs?.border_anim?.innerContent}
                    declarationFunction={(props) => {

                        return `
                        --border-color:${props.attrValue.color ?? "#ffffff"};
                        --border-width:${props.attrValue.width ?? '3px'};
                        --border-margin:${props.attrValue.margin ?? '15px'}
                        `
                    }
                    }
                />

            }
            <CommonStyle
                selector={`${orderClass} .c4-izmir`}
                attr={attrs?.anm_content_padding?.innerContent}
                declarationFunction={(props) => {

                    return `
                        --padding:${props.attrValue ?? '1em'}
                        `
                }
                }
            />

            {attrs?.image?.innerContent?.desktop?.value?.scale_type === 'c4-image-rotate-left' &&
                <CommonStyle
                    selector={`${orderClass} .c4-image-rotate-left:hover img,${orderClass} :focus.c4-image-rotate-left im`}
                    attr={attrs?.image?.innerContent}
                    declarationFunction={(props) => {
                        return `
                        transform: scale(${props.attrValue.scale_hover ?? '1.3'}) rotate(-15deg);
                        `
                    }
                    }
                />
            }
            {attrs?.image?.innerContent?.desktop?.value?.scale_type === 'c4-image-rotate-right' &&
                <CommonStyle
                    selector={`${orderClass} .c4-image-rotate-right:hover img,${orderClass} :focus.c4-image-rotate-right im`}
                    attr={attrs?.image?.innerContent}
                    declarationFunction={(props) => {
                        return `
                        transform: scale(${props.attrValue.scale_hover ?? '1.3'}) rotate(15deg);
                        `
                    }
                    }
                />
            }

            <CommonStyle
                selector={`${orderClass}  .et-pb-icon`}
                attr={attrs?.icon?.innerContent}
                declarationFunction={(props) => {
                    return `
                        color:${props.attrValue.color ?? '#2ea3f2'};
                        font-size:${props.attrValue.size ?? '96px'} ;
                        `
                }}
            />
            {/*if (props.title_anim_delay && props.title_anim_delay !== '0' && props.always_show_title !== 'on') {
            additionalCss.push([{
                selector:    '%%order_class%% .ihb_title_wrap, %%order_class%% .ihb_title_wrap > *',
                declaration: `transition-delay: ${props.title_anim_delay}ms;`,
            }]);
        }*/}
            {
                attrs?.title?.innerContent?.desktop?.value?.always_show_title !== 'on' &&
                <CommonStyle
                    selector={`${orderClass} .ihb_title_wrap, ${orderClass} .ihb_title_wrap > *`}
                    attr={attrs?.title?.innerContent}
                    declarationFunction={(props) => {
                        return `
                        transition-delay: ${props.attrValue.title_anm_delay}ms;
                        `
                    }}
                />
            }
            {
                attrs?.icon?.innerContent?.desktop?.value?.always_show_icon !== 'on' &&
                <CommonStyle
                    selector={`${orderClass} .ihb_icon_wrap, ${orderClass} .ihb_icon_wrap > *`}
                    attr={attrs?.title?.innerContent}
                    declarationFunction={(props) => {
                        return `
                        transition-delay: ${props.attrValue.icon_anm_delay}ms;
                        `
                    }}
                />
            }


        </StyleContainer>
    );
};
