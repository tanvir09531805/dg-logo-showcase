import React, { useEffect, useState } from "react";

import { ModuleStyles } from "./module-styles";
import { ModuleScriptData } from "./module-script-data";
import { moduleClassnames } from "./module-classnames";
import $ from "jquery";

// Internal Dependencies
import "../../../../../includes/modules/VerticalMenu/style.css";

const { ModuleContainer } = window?.divi?.module;

const appendExtraDivForEnableHoverEffect = (doc) => {
    $(doc)
        .find("a")
        .each(function (i, ele) {
            let newSpan = $(
                '<span class="df_vertical_border_hover_effect"></span>',
            );
            $(this).append(newSpan);
        });
    return doc;
};

const megaMenuColumn = (doc) => {
    $(doc)
        .find(".df-vertical-mega-menu")
        .each(function (i, ele) {
            const _col_number = Number(ele.dataset.column);
            let _c = 1;
            $(this)
                .find(">ul>li")
                .each(function (index, element) {
                    if (!$(this).attr("data-column")) {
                        $(this).attr("data-column", _c);
                        if (_c === _col_number) {
                            _c = 1;
                        } else {
                            _c++;
                        }
                    }
                });
            if (!$(this).find(">ul").hasClass("df-vertical-col-added")) {
                $(this)
                    .find('[data-column="1"]')
                    .wrapAll('<div class="col col-1"></div>')
                    .find("ul")
                    .addClass("df-vertical-inside-mega-menu");
                $(this)
                    .find('[data-column="2"]')
                    .wrapAll('<div class="col col-2"></div>')
                    .find("ul")
                    .addClass("df-vertical-inside-mega-menu");
                $(this)
                    .find('[data-column="3"]')
                    .wrapAll('<div class="col col-3"></div>')
                    .find("ul")
                    .addClass("df-vertical-inside-mega-menu");
                $(this)
                    .find('[data-column="4"]')
                    .wrapAll('<div class="col col-4"></div>')
                    .find("ul")
                    .addClass("df-vertical-inside-mega-menu");
                $(this)
                    .find('[data-column="5"]')
                    .wrapAll('<div class="col col-5"></div>')
                    .find("ul")
                    .addClass("df-vertical-inside-mega-menu");
                $(this)
                    .find('[data-column="6"]')
                    .wrapAll('<div class="col col-6"></div>')
                    .find("ul")
                    .addClass("df-vertical-inside-mega-menu");
                $(this)
                    .find('[data-column="7"]')
                    .wrapAll('<div class="col col-7"></div>')
                    .find("ul")
                    .addClass("df-vertical-inside-mega-menu");
                $(this).find(">ul").addClass("df-vertical-col-added");
            }
        });
    doc = appendExtraDivForEnableHoverEffect(doc);
    return doc.body.innerHTML;
};
const get_the_menu = async (menu_id) => {
    const url = `${window.et_code_snippets_data.api}?action=df_vertical_am_menu_divi5`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                menu_id: menu_id,
            }),
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();

        if (data.success) {
            return data.data;
        } else {
            console.error("Error in response data:", data);
        }
    } catch (error) {
        console.error("Fetch error:", error);
    }
};

export const VerticalMenuEdit = ({ attrs, elements, id, name }) => {
    const [menuItems, setMenuItems] = useState(null);
    const menu_id = attrs.settings__select_menu_slug.innerContent.desktop.value;

    // Function to parse menuItems when available
    const parsedDocument = menuItems
        ? new DOMParser().parseFromString(menuItems, "text/html")
        : null;

    useEffect(() => {
        const fetchMenuItems = async () => {
            const data = await get_the_menu(menu_id);
            setMenuItems(data);
        };

        if (menu_id) fetchMenuItems();
    }, [menu_id]);

    return (
        <ModuleContainer
            attrs={attrs}
            elements={elements}
            id={id}
            name={name}
            scriptDataComponent={ModuleScriptData}
            stylesComponent={ModuleStyles}
            classnamesFunction={moduleClassnames}
        >
            <div
                dangerouslySetInnerHTML={{
                    __html: parsedDocument
                        ? megaMenuColumn(parsedDocument)
                        : "",
                }}
            />
        </ModuleContainer>
    );
};