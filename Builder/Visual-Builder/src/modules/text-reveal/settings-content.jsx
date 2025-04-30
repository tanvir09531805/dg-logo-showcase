/** @format */

import React, {
    useState
} from "react";
import {
    __
} from "@wordpress/i18n";

// Divi package dependencies.
const {
    RichTextContainer,
    SelectContainer,
    ColorPickerContainer,
    RangeContainer
} = window?.divi?.fieldLibrary;

const {GroupContainer} = window?.divi?.modal;
const {
    AdminLabelGroup,
    BackgroundGroup,
    FieldContainer,
} = window?.divi?.module;
const {mergeAttrs} = window?.divi?.moduleUtils;


export const SettingsContent = props => {

    const defaultSettingsAttrs = props.defaultSettingsAttrs;
    const attrs = props.attrs;

    const margeAttrs = attrs ? mergeAttrs({
        defaultAttrs: defaultSettingsAttrs?.asMutable({deep: true}) ?? {},
        attrs: attrs.asMutable({deep: true}) ?? {},
    }) : defaultSettingsAttrs;


    return (
        <React.Fragment>
            <GroupContainer
                id="toggle_key__content"
                title={__("Text", "divi_flash")}
            >
                <FieldContainer
                    attrName="settings__content.innerContent"
                    label={__("Text", "divi_flash")}
                    features={{
                        sticky: false,
                        preset: "content",
                        responsive: false,
                        hover: false,
                        dynamicContent: true,
                    }}
                >
                    <RichTextContainer/>
                </FieldContainer>
            </GroupContainer>

            {/* Reveal Settings  */}
            <GroupContainer
                id="toggle_key__reveal_settings"
                title={__("Reveal Settings", "divi_flash")}
            >
                {/* Trigger Type  */}
                <FieldContainer
                    attrName="settings__trigger_type.innerContent"
                    label={__("Trigger Type", "divi_flash")}
                    features={{
                        sticky: false
                    }}
                    options={{
                        auto: {
                            label: __("Auto", "divi_flash"),
                            value: "auto"
                        },
                        "with-scroll": {
                            label: __("With Scroll", "divi_flash"),
                            value: "with-scroll"
                        },
                        "on-viewport": {
                            label: __("On Viewport", "divi_flash"),
                            value: "on-viewport"
                        }
                    }}
                    defaultAttr={defaultSettingsAttrs?.settings__trigger_type?.innerContent}
                >
                    <SelectContainer/>
                </FieldContainer>

                {/* Split Content  */}
                <FieldContainer
                    attrName="settings__split_content.innerContent"
                    label={__("Split Content", "divi_flash")}
                    features={{
                        sticky: false
                    }}
                    options={{
                        df_text_reveal_letter_by_letter: {
                            label: __("Letter By Letter", "divi_flash"),
                            value: "df_text_reveal_letter_by_letter"
                        },
                        df_text_reveal_word_by_word: {
                            label: __("Word By Word", "divi_flash"),
                            value: "df_text_reveal_word_by_word"
                        }
                    }}
                    defaultAttr={defaultSettingsAttrs?.settings__split_content?.innerContent}
                >
                    <SelectContainer/>
                </FieldContainer>

                {/* Reveal By  */}
                <FieldContainer
                    attrName="settings__reveal_by.innerContent"
                    label={__("Reveal By", "divi_flash")}
                    features={{
                        sticky: false
                    }}
                    options={{
                        df_text_reveal_by_opacity_animationr: {
                            label: __("Opacity Animation", "divi_flash"),
                            value: "df_text_reveal_by_opacity_animationr"
                        },
                        df_text_reveal_by__dual_color_animation: {
                            label: __("Dual Color", "divi_flash"),
                            value: "df_text_reveal_by__dual_color_animation"
                        }
                    }}
                    defaultAttr={defaultSettingsAttrs?.settings__reveal_by?.innerContent}
                >
                    <SelectContainer/>
                </FieldContainer>

                {/* Reveal color  */}
                {margeAttrs.settings__reveal_by?.innerContent?.desktop?.value === "df_text_reveal_by__dual_color_animation" && (
                    <FieldContainer
                        attrName="settings__reveal_color.decoration"
                        label={__("Reveal color", "divi_flash")}
                        features={{
                            sticky: false
                        }}
                        defaultAttr={defaultSettingsAttrs?.settings__reveal_color?.decoration}
                    >
                        <ColorPickerContainer/>
                    </FieldContainer>)}

                {/* Animation Duration (ms)  */}
                {(margeAttrs.settings__trigger_type?.innerContent?.desktop?.value === "auto" || margeAttrs.settings__trigger_type?.innerContent?.desktop?.value === "on-viewport") && (
                    <FieldContainer
                        attrName="settings__reveal_duration.innerContent"
                        label={__("Animation Duration (ms)", "divi_flash")}
                        features={{
                            sticky: false
                        }}
                        defaultAttr={defaultSettingsAttrs?.settings__reveal_duration?.innerContent}
                        min={0}
                        max={1000}
                        step={1}
                        defaultUnit=""
                        allowedUnits={[""]}
                    >
                        <RangeContainer/>
                    </FieldContainer>)}

                {/* Animation Delay (ms)  */}
                {(margeAttrs.settings__trigger_type?.innerContent?.desktop?.value === "auto" || margeAttrs.settings__trigger_type?.innerContent?.desktop?.value === "on-viewport") && (
                    <FieldContainer
                        attrName="settings__reveal_delay.innerContent"
                        label={__("Animation Delay (ms)", "divi_flash")}
                        features={{
                            sticky: false
                        }}
                        defaultAttr={defaultSettingsAttrs?.settings__reveal_delay?.innerContent}
                        min={0}
                        max={1000}
                        step={1}
                        defaultUnit=""
                        allowedUnits={[""]}
                    >
                        <RangeContainer/>
                    </FieldContainer>)}

                {/* Initial Opacity  */}
                <FieldContainer
                    attrName="settings__reveal_initial_opacity.innerContent"
                    label={__("Initial Opacity", "divi_flash")}
                    features={{
                        sticky: false
                    }}
                    defaultAttr={defaultSettingsAttrs?.settings__reveal_initial_opacity?.innerContent}
                    minLimit={0.1}
                    min={0.1}
                    maxLimit={0.9}
                    max={0.9}
                    step={0.01}
                    defaultUnit=""
                    allowedUnits={[""]}
                >
                    <RangeContainer/>
                </FieldContainer>

                {/* Viewport offset top  */}
                {(margeAttrs.settings__trigger_type?.innerContent?.desktop?.value === "on-viewport" || margeAttrs.settings__trigger_type?.innerContent?.desktop?.value === "with-scroll") && (
                    <FieldContainer
                        attrName="settings__reveal_viewport_offset_value_top.innerContent"
                        label={__("Viewport offset top", "divi_flash")}
                        features={{
                            sticky: false
                        }}
                        defaultAttr={defaultSettingsAttrs?.settings__reveal_viewport_offset_value_top?.innerContent}
                        min={0}
                        max={100}
                        step={1}
                        defaultUnit={"%"}
                        allowedUnits={["%", "px"]}
                    >
                        <RangeContainer/>
                    </FieldContainer>)}

                {/* Viewport offset Bottom  */}
                {(margeAttrs.settings__trigger_type?.innerContent?.desktop?.value === "on-viewport" || margeAttrs.settings__trigger_type?.innerContent?.desktop?.value === "with-scroll") && (
                    <FieldContainer
                        attrName="settings__reveal_viewport_offset_value_bottom.innerContent"
                        label={__("Viewport offset Bottom", "divi_flash")}
                        features={{
                            sticky: false
                        }}
                        defaultAttr={defaultSettingsAttrs?.settings__reveal_viewport_offset_value_bottom?.innerContent}
                        min={0}
                        max={100}
                        step={1}
                        defaultUnit={"%"}
                        allowedUnits={["%", "px"]}
                    >
                        <RangeContainer/>
                    </FieldContainer>)}
            </GroupContainer>
            <BackgroundGroup
                hidePanels={["video", "pattern", "mask"]}
            />

            <AdminLabelGroup
                defaultGroupAttr={defaultSettingsAttrs?.module?.meta?.adminLabel}
            />
        </React.Fragment>);
};
