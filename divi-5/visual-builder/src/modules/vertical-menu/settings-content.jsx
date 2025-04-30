import React from "react";

import {__} from "@wordpress/i18n";

const {
    SelectMenuContainer,
    ToggleContainer,
    SelectContainer,
    TextContainer,
    ColorPickerContainer,
    RangeContainer,
} = window?.divi?.fieldLibrary;
const {GroupContainer} = window?.divi?.modal;
const {AdminLabelGroup, BackgroundGroup, FieldContainer, LinkGroup} =
    window?.divi?.module;

const {mergeAttrs} = window?.divi?.moduleUtils;


/**
 * Content Settings panel for the Static Module.
 */
export const SettingsContent = ({attrs, defaultSettingsAttrs}) => {
    const margeAttrs = mergeAttrs({
        defaultAttrs: defaultSettingsAttrs?.asMutable({deep: true}) ?? {},
        attrs: attrs.asMutable({deep: true}) ?? {},
    });

    return (
        <React.Fragment>
            {/* Content */}
            <GroupContainer
                id="toggle_key__content"
                title={__("Content", "divi_flash")}
            >
                <FieldContainer
                    attrName="settings__select_menu_slug.innerContent"
                    label={__("Select Menu", "divi_flash")}
                    description={__(
                        "Select a menu that should be used in the module",
                        "divi_flash",
                    )}
                    features={{
                        sticky: false,
                        preset: "content",
                        responsive: false,
                        hover: false,
                        dynamicContent: true,
                    }}
                    defaultAttr={
                        defaultSettingsAttrs?.settings__select_menu_slug
                            ?.innerContent
                    }
                >
                    <SelectMenuContainer/>
                </FieldContainer>
            </GroupContainer>

            {/* Builder View */}
            <GroupContainer
                id="toggle_key__builder_view"
                title={__("Builder View", "divi_flash")}
            >
                <FieldContainer
                    attrName="settings__builder_visiblity.innerContent"
                    label={__("Show Submenu on Builder", "divi_flash")}
                    description={__(
                        "When this setting is enabled, you will be able to see a preview of the nested submenu in the builder.",
                        "divi_flash",
                    )}
                    features={{
                        sticky: false,
                        responsive: false,
                        hover: false,
                    }}
                    defaultAttr={
                        defaultSettingsAttrs?.settings__builder_visiblity
                            ?.innerContent
                    }
                >
                    <ToggleContainer/>
                </FieldContainer>
            </GroupContainer>

            {/* Settings */}
            <GroupContainer
                id="toggle_key__settings"
                title={__("Settings", "divi_flash")}
            >
                {/* Submenu Type */}
                <FieldContainer
                    attrName="settings__submenu_reveal_type.innerContent"
                    label={__("Submenu Type", "divi_flash")}
                    description={__(
                        "When this setting is enabled, you will be able to see a preview of the nested submenu in the builder.",
                        "divi_flash",
                    )}
                    features={{
                        sticky: false,
                        responsive: false,
                        hover: false,
                    }}
                    options={{
                        "df-vertical-sub-menu-reveal-stack": {
                            label: __("Stack", "divi_flash"),
                            value: "df-vertical-sub-menu-reveal-stack",
                        },
                        "df-vertical-sub-menu-reveal-flyout": {
                            label: __("Flyout", "divi_flash"),
                            value: "df-vertical-sub-menu-reveal-flyout",
                        },
                    }}
                    defaultAttr={
                        defaultSettingsAttrs?.settings__submenu_reveal_type
                            ?.innerContent
                    }
                >
                    <SelectContainer/>
                </FieldContainer>

                {/* Submenu Reveal Direction */}
                {(undefined ===
                    margeAttrs?.settings__submenu_reveal_type?.innerContent?.desktop
                        ?.value ||
                    "df-vertical-sub-menu-reveal-flyout" ===
                    margeAttrs?.settings__submenu_reveal_type?.innerContent?.desktop
                        ?.value) && (
                    <FieldContainer
                        attrName="settings__submenu_reveal_dir.innerContent"
                        label={__("Submenu Reveal Direction", "divi_flash")}
                        features={{
                            sticky: false,
                            responsive: false,
                            hover: false,
                        }}
                        options={{
                            "df-vertical-sub-menu-reveal-left": {
                                label: __("Left", "divi_flash"),
                                value: "df-vertical-sub-menu-reveal-left",
                            },
                            "df-vertical-sub-menu-reveal-right": {
                                label: __("Right", "divi_flash"),
                                value: "df-vertical-sub-menu-reveal-right",
                            },
                        }}
                        defaultAttr={
                            defaultSettingsAttrs?.settings__submenu_reveal_dir
                                ?.innerContent
                        }
                    >
                        <SelectContainer/>
                    </FieldContainer>
                )}

                {/* Active State Style on Clicked */}
                {"df-vertical-sub-menu-reveal-stack" ===
                    margeAttrs?.settings__submenu_reveal_type?.innerContent?.desktop
                        ?.value && (
                        <FieldContainer
                            attrName="settings__clicked_menu_element_style.innerContent"
                            label={__("Active State Style on Clicked", "divi_flash")}
                            description={__(
                                "If disable active state style work only for current page item",
                                "divi_flash",
                            )}
                            features={{
                                sticky: false,
                                responsive: false,
                                hover: false,
                            }}
                            defaultAttr={
                                defaultSettingsAttrs
                                    ?.settings__clicked_menu_element_style?.innerContent
                            }
                        >
                            <ToggleContainer/>
                        </FieldContainer>
                    )}

                {/* Badge */}
                <FieldContainer
                    attrName="settings__badge_visiblity.innerContent"
                    label={__("Badge", "divi_flash")}
                    features={{
                        sticky: false,
                        responsive: false,
                        hover: false,
                    }}
                    defaultAttr={
                        defaultSettingsAttrs?.settings__badge_visiblity
                            ?.innerContent
                    }
                >
                    <ToggleContainer/>
                </FieldContainer>

                {/* Tooltip */}
                <FieldContainer
                    attrName="settings__tooltip_visiblity.innerContent"
                    label={__("Tooltip", "divi_flash")}
                    features={{
                        sticky: false,
                        responsive: false,
                        hover: false,
                    }}
                    defaultAttr={
                        defaultSettingsAttrs?.settings__tooltip_visiblity
                            ?.innerContent
                    }
                >
                    <ToggleContainer/>
                </FieldContainer>
            </GroupContainer>

            {/* Hamburger */}
            <GroupContainer
                id="toggle_key__hamburger"
                title={__("Hamburger", "divi_flash")}
            >
                <FieldContainer
                    attrName="settings__use_hamburger_for_mobile.innerContent"
                    label={__("Hamburger", "divi_flash")}
                    features={{
                        sticky: false,
                    }}
                    defaultAttr={
                        defaultSettingsAttrs?.settings__use_hamburger_for_mobile
                            ?.innerContent
                    }
                >
                    <ToggleContainer/>
                </FieldContainer>
                {margeAttrs?.settings__use_hamburger_for_mobile?.innerContent?.desktop
                    ?.value === "on" && (
                    <>
                        <FieldContainer
                            attrName="settings__hamburger_menu_reveal_type.innerContent"
                            label={__("Menu Reveal On", "divi_flash")}
                            features={{
                                sticky: false,
                            }}
                            options={{
                                df_hamburger_reveal_on_click: {
                                    label: __("Click", "divi_flash"),
                                    value: "df_hamburger_reveal_on_click",
                                },
                                df_hamburger_reveal_on_hover: {
                                    label: __("Hover", "divi_flash"),
                                    value: "df_hamburger_reveal_on_hover",
                                },
                            }}
                            defaultAttr={
                                defaultSettingsAttrs
                                    ?.settings__hamburger_menu_reveal_type
                                    ?.innerContent
                            }
                        >
                            <SelectContainer/>
                        </FieldContainer>
                        <FieldContainer
                            attrName="settings__hamburger_text.innerContent"
                            label={__("Text", "divi_flash")}
                            features={{
                                sticky: false,
                            }}
                            defaultAttr={
                                defaultSettingsAttrs?.settings__hamburger_text
                                    ?.innerContent
                            }
                        >
                            <TextContainer/>
                        </FieldContainer>

                        <FieldContainer
                            attrName="settings__hamburger_icon_preset.innerContent"
                            label={__("Hamburger Icon", "divi_flash")}
                            features={{
                                sticky: false,
                            }}
                            options={{
                                icon1: {
                                    label: __("Hamburger 1", "divi_flash"),
                                    value: "icon1",
                                },
                                icon2: {
                                    label: __("Hamburger 2", "divi_flash"),
                                    value: "icon2",
                                },
                                icon3: {
                                    label: __("Hamburger 3", "divi_flash"),
                                    value: "icon3",
                                },
                                icon4: {
                                    label: __("Hamburger 4", "divi_flash"),
                                    value: "icon4",
                                },
                                icon5: {
                                    label: __("Hamburger 5", "divi_flash"),
                                    value: "icon5",
                                },
                            }}
                            defaultAttr={
                                defaultSettingsAttrs
                                    ?.settings__hamburger_icon_preset?.innerContent
                            }
                        >
                            <SelectContainer/>
                        </FieldContainer>
                    </>
                )}
            </GroupContainer>

            {/* Menu Item Hover Animation */}
            <GroupContainer
                id="toggle_key__menu_item_hover_animation"
                title={__("Menu Item Hover Animation", "divi_flash")}
            >
                <FieldContainer
                    attrName="settings__menu_item_hover_animation.innerContent"
                    label={__("Enable Item Animation", "divi_flash")}
                    features={{
                        sticky: false,
                    }}
                    defaultAttr={
                        defaultSettingsAttrs?.settings__builder_visiblity
                            ?.innerContent
                    }
                >
                    <ToggleContainer/>
                </FieldContainer>
                {"on" === margeAttrs?.settings__menu_item_hover_animation?.innerContent?.desktop
                    ?.value && (
                    <>
                        <FieldContainer
                            attrName="settings__select_animation_type.innerContent"
                            label={__("Submenu Reveal Direction", "divi_flash")}
                            features={{
                                sticky: false,
                            }}
                            description={__(
                                "Selected Animation Applied on menu hover",
                                "divi_flash",
                            )}
                            options={{
                                "item-hover-1": {
                                    label: __("Animation 1", "divi_flash"),
                                    value: "item-hover-1",
                                },
                                "item-hover-2": {
                                    label: __("Animation 2", "divi_flash"),
                                    value: "item-hover-2",
                                },
                                "item-hover-3": {
                                    label: __("Animation 3", "divi_flash"),
                                    value: "item-hover-3",
                                },
                            }}
                            defaultAttr={
                                defaultSettingsAttrs
                                    ?.settings__select_animation_type?.innerContent
                            }
                        >
                            <SelectContainer/>
                        </FieldContainer>

                        <FieldContainer
                            attrName="settings__select_animation_color.decoration"
                            label={__("Line Color", "divi_flash")}
                            features={{
                                sticky: false,
                            }}
                            description={__(
                                "Here you can define a custom line color.",
                                "divi_flash",
                            )}
                            defaultAttr={
                                defaultSettingsAttrs
                                    ?.settings__select_animation_color?.decoration
                            }
                        >
                            <ColorPickerContainer/>
                        </FieldContainer>
                        <FieldContainer
                            attrName="settings__animation__line_weight.innerContent"
                            label={__("Line Weight", "divi_flash")}
                            features={{
                                sticky: false,
                            }}
                            defaultAttr={
                                defaultSettingsAttrs
                                    ?.settings__animation__line_weight?.innerContent
                            }
                            min={1}
                            max={10}
                            step={0.1}
                            allowedUnit={["px"]}
                        >
                            <RangeContainer/>
                        </FieldContainer>
                    </>
                )}
            </GroupContainer>

            <BackgroundGroup
                hidePanels={["video", "pattern", "mask"]}
                fields={{
                    image: {
                        parallaxEnabled: {
                            render: false
                        },
                        parallaxMethod: {
                            render: false
                        },
                        blend: {
                            render: false
                        }
                    }
                }}
            />
            <AdminLabelGroup
                defaultGroupAttr={
                    defaultSettingsAttrs?.module?.meta?.adminLabel ?? {}
                }
            />
        </React.Fragment>
    )
};
