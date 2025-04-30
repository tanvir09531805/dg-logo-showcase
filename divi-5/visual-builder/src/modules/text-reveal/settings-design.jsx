import React from "react";

import { __ } from "@wordpress/i18n";

const {
    AnimationGroup,
    BorderGroup,
    BoxShadowGroup,
    FiltersGroup,
    FontHeaderGroup,
    FontBodyGroup,
    SizingGroup,
    SpacingGroup,
    TransformGroup,
} = window?.divi?.module;

/**
 * Design Settings panel for the Static Module.
 */
export const SettingsDesign = ({ defaultSettingsAttrs }) => (
    <React.Fragment>
        <FontBodyGroup
            attrName="settings__content.decoration.bodyFont"
            groupLabel={__("Text", "divi_flash")}
            title={__("Text", "divi_flash")}
            defaultGroupAttr={defaultSettingsAttrs?.settings__content?.decoration?.bodyFont}
        />
        <FontHeaderGroup
            attrName="settings__content.decoration.headingFont"
            title={__("Heading", "divi_flash")}
            groupLabel={__("Heading", "divi_flash")}
            defaultGroupAttr={defaultSettingsAttrs?.settings__content?.decoration?.headingFont}
        />
        <SizingGroup />
        <SpacingGroup />
        <BorderGroup />
        <BoxShadowGroup />
        <AnimationGroup />
    </React.Fragment>
);
