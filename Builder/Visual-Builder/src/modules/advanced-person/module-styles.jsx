import React from "react";

import {cssFields} from "./custom-css";
import utility from "../../../../../scripts/df_scripts/utilities";

const {CssStyle, StyleContainer, CommonStyle} = window?.divi?.module;

const {mergeAttrs} = window?.divi?.moduleUtils;

export const ModuleStyles = (props) => {

    let {
        attrs,
        elements,
        settings,
        orderClass,
        mode,
        state,
        noStyleTag,
    } = props

    function df_transform_values(key = 'bottom') {
        const transfor_values = {
            'top': {
                'default': 'translateY(0px)',
                'hover': 'translateY(-100%)'
            },
            'bottom': {
                'default': 'translateY(0px)',
                'hover': 'translateY(100%)'
            },
            'left': {
                'default': 'translateX(0px)',
                'hover': 'translateX(-100%)'
            },
            'right': {
                'default': 'translateX(0px)',
                'hover': 'translateX(100%)'
            },
            'center': {
                'default': 'scale(1)',
                'hover': 'scale(0)'
            },
            'top_right': {
                'default': 'translateX(0px) translateY(0px)',
                'hover': 'translateX(100%) translateY(-100%)'
            },
            'top_left': {
                'default': 'translateX(0px) translateY(0px)',
                'hover': 'translateX(-100%) translateY(-100%)'
            },
            'bottom_right': {
                'default': 'translateX(0px) translateY(0px)',
                'hover': 'translateX(100%) translateY(100%)'
            },
            'bottom_left': {
                'default': 'translateX(0px) translateY(0px)',
                'hover': 'translateX(-100%) translateY(100%)'
            },
        };
        return transfor_values[key];
    }

    function df_transition_fn(arg) {
        const transition = {
            ease: 'ease',
            ease_in: 'ease-in',
            ease_in_out: 'ease-in-out',
            ease_out: 'ease-out',
            linear: 'linear',
            bounce: 'cubic-bezier(.2,.85,.4,1.275)',
        };
        return transition[arg];
    }


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
            {elements.style({attrName: "social_container_border",})}
            {elements.style({attrName: "social_icon_border",})}
            {elements.style({attrName: "social_icon_shadow",})}
            {elements.style({attrName: "child_filters_target",})}

            {((attrs?.style_type?.innerContent?.desktop?.value ?? "default_style") != 'default_style') && elements.style({attrName: "ekip_overlay_background",})}
            {((attrs?.style_type?.innerContent?.desktop?.value ?? "default_style") === 'default_style') && elements.style({attrName: "default_overlay_background",})}

            {elements.style({attrName: "name_background",})}
            {elements.style({attrName: "icon_background",})}
            {elements.style({attrName: "icon",})}
            {elements.style({attrName: "icon_color",})}
            {elements.style({attrName: "social_wrapper_background",})}
            {elements.style({attrName: "facebook",})}
            {elements.style({attrName: "twitter",})}
            {elements.style({attrName: "linkedin",})}
            {elements.style({attrName: "instagram",})}
            {elements.style({attrName: "pinterest",})}
            {elements.style({attrName: "email",})}
            {elements.style({attrName: "phone",})}
            {elements.style({attrName: "image_wrapper",})}
            {elements.style({attrName: "content",})}
            {elements.style({attrName: "details_wrapper",})}
            {elements.style({attrName: "name",})}
            {elements.style({attrName: "role",})}
            {elements.style({attrName: "description",})}
            {elements.style({attrName: "image",})}
            {elements.style({attrName: "first_social_margin",})}
            {elements.style({attrName: "last_social_margin",})}

            {elements.style({
                attrName: "social",
                styleProps: {
                    selector: `${orderClass} .df_person_socail_wrapper .df_person_social_icon`,
                }
            })
            }
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
                    selector: `${orderClass} .df_ap_person_desc_wrapper`,
                    selectorFunction: (props) => {
                        if ("hover" === props.state) {
                            return ":hover"
                        }
                        return props.setector;
                    }
                }
            })
            }
            {elements.style({
                attrName: "image_wrapper",
                styleProps: {
                    selector: `${orderClass} .df_person_photo_wrapper`
                }
            })}

            {elements.style({
                attrName: "content",
                styleProps: {
                    selector: `${orderClass} .df_ap_person_desc_wrapper`
                }
            })}

            {elements.style({
                attrName: "details_wrapper",
                styleProps: {
                    selector: `${orderClass} .df_person_details`
                }
            })}

            {elements.style({
                attrName: "social_wrapper",
                styleProps: {
                    selector: `${orderClass} .df_person_socail_wrapper`
                }
            })}

            {elements.style({
                attrName: "name",
                styleProps: {
                    selector: `${orderClass} .df_person_name`
                }
            })}

            {elements.style({
                attrName: "role",
                styleProps: {
                    selector: `${orderClass} .df_person_role`
                }
            })}

            {elements.style({
                attrName: "description",
                styleProps: {
                    selector: `${orderClass} .df_person_description`
                }
            })}

            {elements.style({
                attrName: "image",
                styleProps: {
                    selector: `${orderClass} .df_person_photo`
                }
            })}

            {elements.style({
                attrName: "social",
                styleProps: {
                    selector: `${orderClass} .df_person_socail_wrapper .df_person_social_icon`
                }
            })}

            {elements.style({
                attrName: "first_social",
                styleProps: {
                    selector: `${orderClass} .df_person_social_icon:first-child`
                }
            })}

            {elements.style({
                attrName: "last_social",
                styleProps: {
                    selector: `${orderClass} .df_person_social_icon:last-child`
                }
            })}

            <CommonStyle
                selector={`${orderClass} .df_person_photo_wrapper `}
                attr={attrs?.image_alignment?.innerContent}
                property="margin"
            />
            <CommonStyle
                selector={`${orderClass} .df_person_photo_wrapper `}
                attr={attrs?.image_wrapper?.innerContent}
                property="max-width"
            />

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
                    selector={`${orderClass} .df_ap_person_container:hover .c4-image-rotate-left img.person_photo, ${orderClass} .df_ap_person_container:focus.c4-image-rotate-left img.person_photo`}
                    attr={attrs?.image_scale_value?.innerContent}
                    declarationFunction={(props) => `transform:scale(${props.attrValue}) rotate(-15deg);`}
                />
            }
            {
                ((attrs?.image_scale_type?.innerContent.desktop.value ?? 'no-image-scale') === 'c4-image-rotate-right') &&
                <CommonStyle
                    selector={`${orderClass} .df_ap_person_container:hover .c4-image-rotate-right img.person_photo, ${orderClass} .df_ap_person_container:focus.c4-image-rotate-right img.person_photo`}
                    attr={attrs?.image_scale_value?.innerContent}
                    declarationFunction={(props) => `transform:scale(${props.attrValue}) rotate(15deg);`}
                />
            }


            {((attrs?.border_anim?.innerContent.desktop.value ?? 'off') === 'on') &&
                <>
                    <CommonStyle
                        selector={`${orderClass} .c4-izmir`}
                        attr={attrs?.anm_border_color?.innerContent}
                        declarationFunction={(props) => `--border-color:${props.attrValue};`}
                    />
                    <CommonStyle
                        selector={`${orderClass} .c4-izmir`}
                        attr={attrs?.anm_border_width?.innerContent}
                        declarationFunction={(props) => `--border-width:${props.attrValue};`}
                    />
                    <CommonStyle
                        selector={`${orderClass} .c4-izmir`}
                        attr={attrs?.anm_border_margin?.innerContent}
                        declarationFunction={(props) => `--border-margin:${props.attrValue};`}
                    />
                </>

            }

            <CommonStyle
                selector={`${orderClass} .df_ap_person_container .df_ap_person_desc`}
                attr={attrs?.anim_direction?.innerContent}
                declarationFunction={(props) => `transform: ${df_transform_values(props.attrValue).hover};`}
            />
            <CommonStyle
                selector={`${orderClass} .df_ap_person_container:hover .df_ap_person_desc`}
                attr={attrs?.anim_direction?.innerContent}
                declarationFunction={(props) => `transform: ${df_transform_values(props.attrValue).default};`}
            />
            <CommonStyle
                selector={`${orderClass} .df_ap_person_container .df_ap_person_desc`}
                attr={attrs?.overlay_transition_transition_duration?.innerContent}
                declarationFunction={(props) => `transition-duration: ${props.attrValue};`}
            />
            <CommonStyle
                selector={`${orderClass} .df_ap_person_container .df_ap_person_desc`}
                attr={attrs?.overlay_transition_transition_delay?.innerContent}
                declarationFunction={(props) => `transition-delay: ${props.attrValue};`}
            />
            <CommonStyle
                selector={`${orderClass} .df_ap_person_container .df_ap_person_desc`}
                attr={attrs?.overlay_transition_transition_curve?.innerContent}
                declarationFunction={(props) => `transition-timing-function: ${df_transition_fn(props.attrValue)};`}
            />
            {((attrs?.make_full_with_icon?.innerContent.desktop.value ?? 'off') === 'on') &&
                <>
                    <CommonStyle
                        selector={`${orderClass} .df_person_socail_wrapper`}
                        attr={attrs?.make_full_with_icon?.innerContent}
                        declarationFunction={(props) => `display: flex;`}
                    />
                    <CommonStyle
                        selector={`${orderClass} .df_person_socail_wrapper .df_person_social_icon`}
                        attr={attrs?.make_full_with_icon?.innerContent}
                        declarationFunction={(props) => `flex-grow: 1; margin: 0px;`}
                    />
                </>
            }
            <CommonStyle
                selector={`${orderClass} .df_person_socail_wrapper`}
                attr={attrs?.social_section_align?.innerContent}
                property='text-align'
            />
            <CommonStyle
                selector={`${orderClass} .c4-izmir`}
                attr={attrs?.anm_content_padding?.innerContent}
                property='--padding'
            />
            <CommonStyle
                selector={`${orderClass} .df_ap_person_desc_wrapper`}
                attr={attrs?.content_zindex?.innerContent}
                property='z-index'
            />


        </StyleContainer>
    );
};
