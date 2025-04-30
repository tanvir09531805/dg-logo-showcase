import React, { useState } from "react";

import { __ } from "@wordpress/i18n";

//Import Internal Dependencis
import {
    MenuStyler,
    Tabs,
    ActiveStateStyler,
    BadgeTooltipStyler,
} from "./common-components";

import $ from "jquery";

const {
    AnimationGroup,
    BorderGroup,
    BoxShadowGroup,
    FiltersGroup,
    FontGroup,
    FontBodyGroup,
    SizingGroup,
    SpacingGroup,
    TextGroup,
    TransformGroup,
    FieldContainer,
} = window?.divi?.module;
const {mergeAttrs} = window?.divi?.moduleUtils;

const { GroupContainer, GroupTabs } = window.divi.modal;

const { RangeContainer, ButtonOptionsContainer, ToggleContainer } =
    window?.divi?.fieldLibrary;
/**
 * Design Settings panel for the Static Module.
 */
export const SettingsDesign = (props) => {
    const { defaultSettingsAttrs, attrs } = props;
    const margeAttrs = attrs?mergeAttrs({
        defaultAttrs: defaultSettingsAttrs?.asMutable({deep: true}) ?? {},
        attrs: attrs.asMutable({deep: true}) ?? {},
    }):defaultSettingsAttrs;

    return (
        <React.Fragment>
            <GroupContainer
                id="toggle_key__alignemnt"
                title={__("Alignment", "divi_flash")}
            >
                <FieldContainer
                    attrName="style_settings__alignment.innerContent"
                    features={{
                        sticky: false,
                    }}
                    options={{
                        "df-vertical-menu-alignment-left": {
                            icon: "divi/align-left",
                        },
                        "df-vertical-menu-alignment-center": {
                            icon: "divi/align-center",
                        },
                        "df-vertical-menu-alignment-right": {
                            icon: "divi/align-right",
                        },
                        "df-vertical-menu-alignment-justified": {
                            icon: "divi/text-align-justify",
                        },
                    }}
                    defaultAttr={
                        defaultSettingsAttrs?.style_settings__alignment
                            ?.innerContent
                    }
                >
                    <ButtonOptionsContainer showLabel={false} />
                </FieldContainer>
            </GroupContainer>
            <FontGroup
                attrName="style_settings__menu__item.decoration.font"
                groupLabel={__("Text Style", "divi_flash")}
                fields={{
                    headingLevel: {
                        render: false,
                    },
                }}
                defaultGroupAttr={
                    defaultSettingsAttrs?.style_settings__menu__item?.decoration?.font?.asMutable(
                        { deep: true },
                    ) ?? {}
                }
            />
            <MenuStyler
                grouped={true}
                defaultSettingsAttrs={defaultSettingsAttrs}
                groupTitle={__("Menu Items", "divi_flash")}
                groupId="toggle_key__menu_items"
                fieldLabel={__("Item ", "divi_flash")}
                uniqKeys={{
                    elementGap: {
                        key: "style_settings__menu__item_gap",
                    },
                    iconColor: {
                        key: "style_settings__menu__item_icon",
                    },
                    iconSize: {
                        key: "style_settings__menu__item_icon",
                    },
                    background: {
                        key: "style_settings__menu__item",
                    },
                    elementPadding: {
                        key: "style_settings__menu__item",
                    },
                    iconImageMargin: {
                        key: "style_settings__menu__item_icon",
                    },
                    elementBorder: {
                        key: "style_settings__menu__item",
                    },
                    elementBoxshadow: {
                        key: "style_settings__menu__item",
                    },
                }}
            />
            <GroupContainer
                id="toggle_key__sub_menu"
                title={__("Sub Menu ", "divi_flash")}
            >
                <Tabs
                    tabs={{
                        submenuWrapperTabs: {
                            label: __("Container", "divi_flash"),
                            component: (
                                <>
                                    {margeAttrs?.settings__submenu_reveal_type
                                        ?.innerContent?.desktop?.value ===
                                        "df-vertical-sub-menu-reveal-stack" && (
                                        <>
                                            <FieldContainer
                                                attrName={`style_settings__sub_menu__tree_view.innerContent`}
                                                label={__(
                                                    "Enable Submenu Tree View ",
                                                    "divi_flash",
                                                )}
                                                features={{
                                                    sticky: false,
                                                    responsive: false,
                                                    hover: false,
                                                }}
                                                defaultAttr={
                                                    defaultSettingsAttrs
                                                        ?.style_settings__sub_menu__tree_view
                                                        ?.innerContent
                                                }
                                            >
                                                <ToggleContainer />
                                            </FieldContainer>
                                            {margeAttrs
                                                ?.style_settings__sub_menu__tree_view
                                                ?.innerContent?.desktop
                                                ?.value === "on" && (
                                                <FieldContainer
                                                    attrName={`style_settings__sub_menu__tree_view_spacing.decoration`}
                                                    label={__(
                                                        "Tree Spacing",
                                                        "divi_flash",
                                                    )}
                                                    features={{
                                                        sticky: false,
                                                        responsive: true,
                                                    }}
                                                    defaultAttr={
                                                        defaultSettingsAttrs
                                                            ?.style_settings__sub_menu__tree_view_spacing
                                                            ?.decoration
                                                    }
                                                    min={0}
                                                    max={100}
                                                    step={1}
                                                    allowedUnit={["px"]}
                                                >
                                                    <RangeContainer />
                                                </FieldContainer>
                                            )}
                                        </>
                                    )}
                                    <MenuStyler
                                        grouped={false}
                                        defaultSettingsAttrs={
                                            defaultSettingsAttrs
                                        }
                                        groupTitle={__(
                                            "Sub Menu ",
                                            "divi_flash",
                                        )}
                                        groupId="toggle_key__sub_menu_wrapper"
                                        fieldLabel={__(
                                            "Wrapper ",
                                            "divi_flash",
                                        )}
                                        uniqKeys={{
                                            background: {
                                                key: "style_settings__sub_menu__wrapper",
                                            },
                                            elementPadding: {
                                                key: "style_settings__sub_menu__wrapper",
                                            },
                                            elementBorder: {
                                                key: "style_settings__sub_menu__wrapper",
                                            },
                                        }}
                                    />
                                </>
                            ),
                        },
                        submenuItemTab: {
                            label: __("Item", "divi_flash"),
                            component: (
                                <MenuStyler
                                    grouped={false}
                                    defaultSettingsAttrs={defaultSettingsAttrs}
                                    groupTitle={__("Sub Menu ", "divi_flash")}
                                    groupId="toggle_key__sub_menu_items"
                                    fieldLabel={__("Item ", "divi_flash")}
                                    uniqKeys={{
                                        elementGap: {
                                            key: "style_settings__sub_menu__item_gap",
                                        },
                                        iconColor: {
                                            key: "style_settings__sub_menu__item_icon",
                                        },
                                        iconSize: {
                                            key: "style_settings__sub_menu__item_icon",
                                        },
                                        background: {
                                            key: "style_settings__sub_menu__item",
                                        },
                                        elementPadding: {
                                            key: "style_settings__sub_menu__item",
                                        },
                                        iconImageMargin: {
                                            key: "style_settings__sub_menu__item_icon",
                                        },
                                        elementBorder: {
                                            key: "style_settings__sub_menu__item",
                                        },
                                        elementFont: {
                                            key: "style_settings__sub_menu__item",
                                        },
                                        elementBoxshadow: {
                                            key: "style_settings__sub_menu__item",
                                        },
                                    }}
                                />
                            ),
                        },
                    }}
                ></Tabs>
            </GroupContainer>

            <GroupContainer
                id="toggle_key__mega_menu"
                title={__("Mega Menu ", "divi_flash")}
            >
                <Tabs
                    tabs={{
                        megamenuWrapperTabs: {
                            label: __("Container", "divi_flash"),
                            component: (
                                <>
                                    <MenuStyler
                                        grouped={false}
                                        defaultSettingsAttrs={
                                            defaultSettingsAttrs
                                        }
                                        groupTitle={__(
                                            "Mega Menu ",
                                            "divi_flash",
                                        )}
                                        groupId="toggle_key__mega_menu_wrapper"
                                        fieldLabel={__(
                                            "Wrapper ",
                                            "divi_flash",
                                        )}
                                        uniqKeys={{
                                            elementGap: {
                                                name: __(
                                                    "Column",
                                                    "divi_flash",
                                                ),
                                                key: "style_settings__mega_menu__column_gap",
                                            },
                                            background: {
                                                key: "style_settings__mega_menu__wrapper",
                                            },
                                            elementPadding: {
                                                key: "style_settings__mega_menu__wrapper",
                                            },
                                            elementBorder: {
                                                key: "style_settings__mega_menu__wrapper",
                                            },
                                        }}
                                    />
                                </>
                            ),
                        },
                        megamenuItemTab: {
                            label: __("Item", "divi_flash"),
                            component: (
                                <MenuStyler
                                    grouped={false}
                                    defaultSettingsAttrs={defaultSettingsAttrs}
                                    groupTitle={__("Mega Menu ", "divi_flash")}
                                    groupId="toggle_key__mega_menu_items"
                                    fieldLabel={__("Item ", "divi_flash")}
                                    uniqKeys={{
                                        elementGap: {
                                            key: `style_settings__mega_menu__item_gap`,
                                        },
                                        iconColor: {
                                            key: `style_settings__mega_menu__item_icon`,
                                        },
                                        iconSize: {
                                            key: `style_settings__mega_menu__item_icon`,
                                        },
                                        background: {
                                            key: `style_settings__mega_menu__item`,
                                        },
                                        elementPadding: {
                                            key: `style_settings__mega_menu__item`,
                                        },
                                        iconImageMargin: {
                                            key: `style_settings__mega_menu__item_icon`,
                                        },
                                        elementBorder: {
                                            key: `style_settings__mega_menu__item`,
                                        },
                                        elementFont: {
                                            key: `style_settings__mega_menu__item`,
                                        },
                                        elementBoxshadow: {
                                            key: `style_settings__mega_menu__item`,
                                        },
                                    }}
                                />
                            ),
                        },
                    }}
                ></Tabs>
            </GroupContainer>

            <FontGroup
                attrName="style_settings__mega_menu__parent.decoration.font"
                groupLabel={__("Mega Menu Parent", "divi_flash")}
                fieldLabel={__("", "divi_flash")}
                fields={{
                    headingLevel: {
                        render: false,
                    },
                    textAlign: {
                        render: false,
                    },
                }}
                defaultGroupAttr={
                    defaultSettingsAttrs?.style_settings__mega_menu__parent?.decoration?.font?.asMutable(
                        { deep: true },
                    ) ?? {}
                }
            />
            <GroupContainer
                id="toggle_key__menu__active_state"
                title={__("Active State ", "divi_flash")}
            >
                <Tabs
                    tabs={{
                        mainMenuActiveState: {
                            label: __("Main Menu", "divi_flash"),
                            component: (
                                <ActiveStateStyler
                                    grouped={false}
                                    defaultSettingsAttrs={defaultSettingsAttrs}
                                    groupTitle={__(
                                        "Active State",
                                        "divi_flash",
                                    )}
                                    groupId="toggle_key__active_state"
                                    fieldLabel={__("Main Menu ", "divi_flash")}
                                    uniqKeys={{
                                        fontColor: {
                                            key: "style_settings__menu__active__state_item",
                                            name: __("Font", "divi_flash"),
                                        },
                                        iconColor: {
                                            key: "style_settings__menu__active__state_item_icon",
                                        },
                                        background: {
                                            key: "style_settings__menu__active__state_item",
                                        },
                                    }}
                                />
                            ),
                        },
                        subMenuActiveState: {
                            label: __("Submenu", "divi_flash"),
                            component: (
                                <ActiveStateStyler
                                    grouped={false}
                                    defaultSettingsAttrs={defaultSettingsAttrs}
                                    groupTitle={__(
                                        "Active State",
                                        "divi_flash",
                                    )}
                                    groupId="toggle_key__active_state"
                                    fieldLabel={__("Main Menu ", "divi_flash")}
                                    uniqKeys={{
                                        fontColor: {
                                            key: "style_settings__sub_menu__active__state_item",
                                            name: __("Font", "divi_flash"),
                                        },
                                        iconColor: {
                                            key: "style_settings__sub_menu__active__state_item_icon",
                                        },
                                        background: {
                                            key: "style_settings__sub_menu__active__state_item",
                                        },
                                    }}
                                />
                            ),
                        },
                        megaMenuActiveState: {
                            label: __("Mega Menu", "divi_flash"),
                            component: (
                                <ActiveStateStyler
                                    grouped={false}
                                    defaultSettingsAttrs={defaultSettingsAttrs}
                                    groupTitle={__(
                                        "Active State",
                                        "divi_flash",
                                    )}
                                    groupId="toggle_key__active_state"
                                    fieldLabel={__("Main Menu ", "divi_flash")}
                                    uniqKeys={{
                                        fontColor: {
                                            key: "style_settings__mega_menu__active__state_item",
                                            name: __("Font", "divi_flash"),
                                        },
                                        iconColor: {
                                            key: "style_settings__mega_menu__active__state_item_icon",
                                        },
                                        background: {
                                            key: "style_settings__mega_menu__active__state_item",
                                        },
                                    }}
                                />
                            ),
                        },
                    }}
                ></Tabs>
            </GroupContainer>

            <GroupContainer
                id="toggle_key__menu__badge"
                title={__("Badge ", "divi_flash")}
            >
                <Tabs
                    tabs={{
                        mainMenuBadge: {
                            label: __("Main Menu", "divi_flash"),
                            component: (
                                <BadgeTooltipStyler
                                    grouped={false}
                                    defaultSettingsAttrs={defaultSettingsAttrs}
                                    groupTitle={__("Main Menu", "divi_flash")}
                                    groupId="toggle_key__badge"
                                    fieldLabel={__("Badge ", "divi_flash")}
                                    uniqKeys={{
                                        alignment: {
                                            key: "style_settings__menu__badge",
                                        },
                                        font: {
                                            key: "style_settings__menu__badge",
                                        },
                                        background: {
                                            key: "style_settings__menu__badge",
                                        },
                                    }}
                                />
                            ),
                        },
                        subMenuBadge: {
                            label: __("Submenu", "divi_flash"),
                            component: (
                                <BadgeTooltipStyler
                                    grouped={false}
                                    defaultSettingsAttrs={defaultSettingsAttrs}
                                    groupTitle={__(
                                        "Active State",
                                        "divi_flash",
                                    )}
                                    groupId="toggle_key__active_state"
                                    fieldLabel={__("Badge ", "divi_flash")}
                                    uniqKeys={{
                                        alignment: {
                                            key: "style_settings__sub_menu__badge",
                                        },
                                        font: {
                                            key: "style_settings__sub_menu__badge",
                                        },
                                        background: {
                                            key: "style_settings__sub_menu__badge",
                                        },
                                    }}
                                />
                            ),
                        },
                    }}
                ></Tabs>
            </GroupContainer>

            <GroupContainer
                id="toggle_key__menu__tooltip"
                title={__("Tooltip ", "divi_flash")}
            >
                <Tabs
                    tabs={{
                        mainMenuTooltip: {
                            label: __("Main Menu", "divi_flash"),
                            component: (
                                <BadgeTooltipStyler
                                    grouped={false}
                                    defaultSettingsAttrs={defaultSettingsAttrs}
                                    groupTitle={__("Main Menu", "divi_flash")}
                                    groupId="toggle_key__tooltip"
                                    fieldLabel={__("Tooltip ", "divi_flash")}
                                    uniqKeys={{
                                        font: {
                                            key: "style_settings__menu__tooltip",
                                        },
                                        background: {
                                            key: "style_settings__menu__tooltip",
                                        },
                                    }}
                                />
                            ),
                        },
                        subMenuTooltip: {
                            label: __("Submenu", "divi_flash"),
                            component: (
                                <BadgeTooltipStyler
                                    grouped={false}
                                    defaultSettingsAttrs={defaultSettingsAttrs}
                                    groupTitle={__(
                                        "Active State",
                                        "divi_flash",
                                    )}
                                    groupId="toggle_key__active_state"
                                    fieldLabel={__("Tooltip ", "divi_flash")}
                                    uniqKeys={{
                                        font: {
                                            key: "style_settings__sub_menu__tooltip",
                                        },
                                        background: {
                                            key: "style_settings__sub_menu__tooltip",
                                        },
                                    }}
                                />
                            ),
                        },
                    }}
                ></Tabs>
            </GroupContainer>
            <SizingGroup />
            <SpacingGroup />
            <BorderGroup />
            <BoxShadowGroup />
            <FiltersGroup />
            <TransformGroup />
            <AnimationGroup />
        </React.Fragment>
    );
};
