import {__} from "@wordpress/i18n";
// react dependency
import React, {useEffect, useState, useRef} from "react";

const {GroupTabs} = window.divi.modal;

const {FieldContainer,SpacingGroup} = window?.divi?.module;


/**
 * Module component for Custom Spacing
 *     "customSpacing": {
 *       "settings": {
 *         "innerContent": {
 *           "groupType": "group-item",
 *           "item": {
 *             "groupSlug": "custom_spacing",
 *             "render": true,
 *             "component": {
 *               "type": "field",
 *               "name": "difl/custom-spacing",
 *               "tabs": {
 *                 "wrapper": {
 *                   "tabName": "Wrapper",
 *                   "fields": {
 *                     "module_wrapper": {
 *                       "attrName": "module_wrapper.decoration.spacing",
 *                       "label": "Wrapper",
 *                        "fields": {
 *                         "padding": {
 *                           "render": false
 *                         }
 *                       },
 *                       "defaultAttr": {
 *                         "desktop": {
 *                           "value": {
 *                             "margin": {
 *                               "top": "50px",
 *                               "bottom": "50px",
 *                               "left": "50px",
 *                               "right": "50px"
 *                             }
 *                           }
 *                         }
 *                       }
 *                     },
 *                 },
 *               }
 *             }
 *           }
 *         }
 *       },
 *     },
 */
const Tabs = ({tabs}) => {
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
export const CustomSpacing = (props) => {

    const tabs = Object.entries(props.component.tabs).reduce((acc, [key, value]) => {
        acc[key] = {
            label: __(value.tabName, "divi_flash"),
            component: (
                <>
                    {Object.entries(value.fields).map(([objKey,objValue],fieldKey) => {
                        return ( <SpacingGroup
                            selector={`.df_person_social_icon .et-pb-icon`}
                            grouped={false}
                            attrName={`${objValue.attrName}`}
                            defaultGroupAttr={objValue?.defaultAttr}
                            groupLabel={objValue.label}
                            fieldLabel={objValue.label}
                            fields={objValue.fields}
                        />)
                    })}

                </>
            ),
        };
        return acc;
    }, {});


    return <>
        <Tabs
            tabs={tabs}
        ></Tabs>
    </>
}
