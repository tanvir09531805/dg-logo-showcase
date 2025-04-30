// Global Dependencies
import React, {useState} from "react";
import {__} from "@wordpress/i18n";

// DIVI Dependencies
const {
    FieldContainer,
    BackgroundGroup,
    SpacingGroup,
    BorderGroup,
    FontGroup,
    BoxShadowGroup
} = window?.divi?.module;

const {RangeContainer, ButtonOptionsContainer, ColorPickerContainer} = window?.divi?.fieldLibrary;
const {GroupContainer, GroupTabs} = window.divi.modal;

export const MenuStyler = ({
                               grouped,
                               defaultSettingsAttrs,
                               groupTitle,
                               groupId,
                               uniqKeys,
                               fieldLabel
                           }) => {
    return (
        <GroupContainer id={groupId} title={groupTitle} grouped={grouped}>
            {uniqKeys.elementGap && (
                <FieldContainer
                    attrName={`${uniqKeys.elementGap.key}.decoration`}
                    label={__(
                        `${uniqKeys.elementGap.name || fieldLabel} Gap`,
                        "divi_flash",
                    )}
                    features={{
                        sticky: false,
                        responsive: true,
                    }}
                    defaultAttr={
                        defaultSettingsAttrs[uniqKeys.elementGap.key]
                            ?.decoration
                    }
                    min={0}
                    max={100}
                    step={1}
                    allowedUnit={["px"]}
                >
                    <RangeContainer/>
                </FieldContainer>
            )}

            {uniqKeys.iconColor && (
                <FieldContainer
                    attrName={`${uniqKeys.iconColor.key}.decoration.font.font`}
                    subName="color"
                    label={__("Icon Color", "divi_flash")}
                    features={{
                        sticky: false,
                        responsive: true,
                    }}
                    defaultGroupAttr={
                        defaultSettingsAttrs[uniqKeys.iconColor.key]?.decoration
                            .font?.font
                    }
                >
                    <ColorPickerContainer/>
                </FieldContainer>

            )
            }

            {
                uniqKeys.background && (
                    <BackgroundGroup
                        grouped={false}
                        hidePanels={["video", "pattern", "mask"]}
                        fields={{
                            image: {
                                parallaxEnabled: {
                                    render: false
                                },
                                parallaxMethod: {
                                    render: false
                                },
                                blend:{
                                    render:false
                                }
                            }
                        }}
                        attrName={`${uniqKeys.background.key}.decoration.background`}
                        defaultGroupAttr={
                            defaultSettingsAttrs[
                                uniqKeys.background.key
                                ]?.decoration?.background?.asMutable({deep: true}) ??
                            {}
                        }
                    />
                )
            }

            {
                uniqKeys.elementFont && (
                    <FontGroup
                        attrName={`${uniqKeys.elementFont.key}.decoration.font`}
                        fieldLabel={fieldLabel}
                        features={{
                            sticky: false,
                            responsive: true,
                        }}
                        defaultGroupAttr={
                            defaultSettingsAttrs[uniqKeys.elementFont.key]
                                ?.decoration.font
                        }
                        grouped={false}
                        fields={{
                            textAlign: {
                                render: false,
                            },
                        }}
                    />
                )
            }
            {
                uniqKeys.elementPadding && (
                    <SpacingGroup
                        grouped={false}
                        attrName={`${uniqKeys.elementPadding.key}.decoration.spacing`}
                        defaultGroupAttr={
                            defaultSettingsAttrs[
                                uniqKeys.elementPadding.key
                                ]?.decoration?.spacing?.asMutable({deep: true}) ?? {}
                        }
                        groupLabel={fieldLabel}
                        fieldLabel={fieldLabel}
                        fields={{
                            margin: {
                                render: false,
                            },
                        }}
                    />
                )
            }
            {
                uniqKeys.iconImageMargin && (
                    <SpacingGroup
                        grouped={false}
                        attrName={`${uniqKeys.iconImageMargin.key}.decoration.spacing`}
                        defaultGroupAttr={
                            defaultSettingsAttrs[
                                uniqKeys.iconImageMargin.key
                                ]?.decoration?.spacing?.asMutable({deep: true}) ?? {}
                        }
                        groupLabel={__("Icon/Image", "divi_flash")}
                        fieldLabel={__("Icon/Image", "divi_flash")}
                        fields={{
                            padding: {
                                render: false,
                            },
                        }}
                    />
                )
            }
            {
                uniqKeys.elementBorder && (
                    <BorderGroup
                        grouped={false}
                        attrName={`${uniqKeys.elementBorder.key}.decoration.border`}
                        defaultGroupAttr={
                            defaultSettingsAttrs[
                                uniqKeys.elementBorder.key
                                ]?.decoration?.border?.asMutable({deep: true}) ?? {}
                        }
                        groupLabel={fieldLabel}
                        fieldLabel={fieldLabel}
                    />
                )
            }
            {
                uniqKeys.elementBoxshadow && (
                    <BoxShadowGroup
                        grouped={false}
                        attrName={`${uniqKeys.elementBoxshadow.key}.decoration.boxShadow`}
                        defaultGroupAttr={
                            defaultSettingsAttrs[
                                uniqKeys.elementBoxshadow.key
                                ]?.decoration?.border?.asMutable({deep: true}) ?? {}
                        }
                        groupLabel={uniqKeys.elementBoxshadow.name || fieldLabel}
                        fieldLabel={uniqKeys.elementBoxshadow.name || fieldLabel}
                    />
                )
            }
        </GroupContainer>
    )
        ;
};

export const Tabs = ({tabs}) => {
    const [activeTab, setActiveTab] = useState();

    if (undefined === activeTab) {
        setActiveTab(Object.keys(tabs)[0]);
    }
    return (
        <>
            <GroupTabs
                tabs={tabs}
                showLabel={true}
                showIcon={true}
                activeTab={activeTab}
                onClick={(tab) => {
                    const tab_value =
                        tab.target.value || tab.target.parentElement?.value;
                    setActiveTab(tab_value);
                }}
            />
            {tabs[activeTab]?.component}
        </>
    );
};

export const ActiveStateStyler = ({
                                      grouped,
                                      defaultSettingsAttrs,
                                      groupTitle,
                                      groupId,
                                      uniqKeys,
                                      fieldLabel,
                                  }) => {
    return (
        <GroupContainer id={groupId} title={groupTitle} grouped={grouped}>
            {uniqKeys.fontColor && (
                <FieldContainer
                    attrName={`${uniqKeys.fontColor.key}.decoration.font.font`}
                    subName="color"
                    label={__("Font Color", "divi_flash")}
                    features={{
                        sticky: false,
                        responsive: true,
                    }}
                    defaultGroupAttr={
                        defaultSettingsAttrs[uniqKeys.iconColor.key]?.decoration
                            .font?.font
                    }
                >
                    <ColorPickerContainer/>
                </FieldContainer>

            )
            }
            {uniqKeys.iconColor && (
                <FieldContainer
                    attrName={`${uniqKeys.iconColor.key}.decoration.font.font`}
                    subName="color"
                    label={__("Icon Color", "divi_flash")}
                    features={{
                        sticky: false,
                        responsive: true,
                    }}
                    defaultGroupAttr={
                        defaultSettingsAttrs[uniqKeys.iconColor.key]?.decoration
                            .font?.font
                    }
                >
                    <ColorPickerContainer/>
                </FieldContainer>

            )
            }
            {uniqKeys.background && (
                <BackgroundGroup
                    grouped={false}
                    hidePanels={["video", "pattern", "mask"]}
                    fields={{
                        image: {
                            parallaxEnabled: {
                                render: false
                            },
                            parallaxMethod: {
                                render: false
                            },
                            blend:{
                                render:false
                            }
                        }
                    }}
                    attrName={`${uniqKeys.background.key}.decoration.background`}
                    defaultGroupAttr={
                        defaultSettingsAttrs[
                            uniqKeys.background.key
                            ]?.decoration?.background?.asMutable({deep: true}) ??
                        {}
                    }
                />
            )}
        </GroupContainer>
    );
};

export const BadgeTooltipStyler = ({
                                       grouped,
                                       defaultSettingsAttrs,
                                       groupTitle,
                                       groupId,
                                       uniqKeys,
                                       fieldLabel,
                                   }) => {
    return (
        <GroupContainer id={groupId} title={groupTitle} grouped={grouped}>
            {uniqKeys.alignment && (
                <FieldContainer
                    attrName={`${uniqKeys.alignment.key}.innerContent`}
                    label={__(
                        `${uniqKeys.alignment.name || fieldLabel} Alignment`,
                        "divi_flash",
                    )}
                    features={{
                        sticky: false,
                        responsive: true,
                    }}
                    defaultAttr={
                        defaultSettingsAttrs[uniqKeys.alignment.key]
                            ?.innerContent
                    }
                    options={{
                        "left": {
                            icon: "divi/align-left",
                        },
                        "right": {
                            icon: "divi/align-right",
                        }
                    }}
                >
                    <ButtonOptionsContainer showLabel={false}/>
                </FieldContainer>
            )}
            {uniqKeys.font && (
                <FontGroup
                    attrName={`${uniqKeys.font.key}.decoration.font`}
                    fieldLabel={uniqKeys.font.name || fieldLabel}
                    features={{
                        sticky: false,
                        responsive: true,
                    }}
                    defaultGroupAttr={
                        defaultSettingsAttrs[uniqKeys.font.key]?.decoration
                            .font
                    }
                    grouped={false}
                    fields={{
                        textAlign: {
                            render: false,
                        },
                    }}
                />
            )}
            {uniqKeys.background && (
                <BackgroundGroup
                    grouped={false}
                    hidePanels={["video", "pattern", "mask"]}
                    fields={{
                        image: {
                            parallaxEnabled: {
                                render: false
                            },
                            parallaxMethod: {
                                render: false
                            },
                            blend:{
                                render:false
                            }
                        }
                    }}
                    attrName={`${uniqKeys.background.key}.decoration.background`}
                    defaultGroupAttr={
                        defaultSettingsAttrs[
                            uniqKeys.background.key
                            ]?.decoration?.background?.asMutable({deep: true}) ??
                        {}
                    }
                />
            )}
        </GroupContainer>
    );
};
