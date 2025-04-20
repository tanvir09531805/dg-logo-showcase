import React from "react";
import {__} from "@wordpress/i18n";

// Divi package dependencies.
const {
    RichTextContainer,
    SelectContainer,
    ColorPickerContainer,
    RangeContainer,
} = window?.divi?.fieldLibrary;

const {GroupContainer} = window?.divi?.modal;
const {AdminLabelGroup, BackgroundGroup, FieldContainer} = window?.divi?.module;

export const ContentSettings = (props) => {
    const {data, defaultSettingsAttrs} = props;

    const settings = data.attributes;
    const groups = data.settings.groups;
    console.log("🚀 ~ ContentSettings ~ groups:", groups)

    // Generate JSX fields
    const fields = Object.entries(settings).map(([key, item], index) => {
        if (item?.elementType === "richText") {
            return (
                <GroupContainer
                    id={item?.groupSlug || `group-${index}`}
                    title={__(groups[item?.groupSlug]?.groupName || "Default Group", "divi_flash")}
                    key={key}
                >
                    <FieldContainer
                        attrName={`${key}.innerContent`}
                        label={__(item.title || "Default Title", "divi_flash")}
                        defaultAttr={defaultSettingsAttrs?.[key]?.innerContent || ""}
                    >
                        <RichTextContainer/>
                    </FieldContainer>
                </GroupContainer>
            );
        }
        return null;
    });

    // Filter out null or invalid fields
    const validFields = fields.filter(Boolean);

    // Debugging valid fields
    console.log("Valid fields (JSX):", validFields);

    // Return JSX elements
    return (
        <>
            {validFields}
        </>
    );
};
