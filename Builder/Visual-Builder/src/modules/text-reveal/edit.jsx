/** @format */

import React, { useState, useEffect } from "react";

// Divi package dependencies.
// Renderer - HTML
const { ModuleContainer } = window?.divi?.module;

import { moduleClassnames } from "./module-classnames";
import { ModuleStyles } from "./module-styles";
import { ModuleScriptData } from "./module-script-data";
// Internal Dependencies
import "../../../../../includes/modules/TextReveal/style.css";

function processContent(settings, doc) {
    const initialOpacity = settings.settings__reveal_initial_opacity || 0.2;
    if (doc.body) {
        function wrapTextNodes(node) {
            if (node.nodeType === Node.TEXT_NODE) {
                const text = node.nodeValue;
                const parent = node.parentNode;
                let chunk;

                if (text.trim()) {
                    if (
                        "df_text_reveal_word_by_word" ===
                        settings.settings__split_content
                    ) {
                        chunk = text.split(" ");
                    }
                    // if text split by letter by letter
                    else if (
                        "df_text_reveal_letter_by_letter" ===
                        settings.settings__split_content
                    ) {
                        chunk = text.split("");
                    }

                    chunk = chunk.map(
                        (e) =>
                            `<span class="df_inner" style="opacity:${initialOpacity}">${e}</span>`,
                    );

                    const tempDiv = document.createElement("div");

                    if (
                        "df_text_reveal_word_by_word" ===
                        settings.settings__split_content
                    ) {
                        tempDiv.innerHTML = chunk.join(" ");
                    }
                    // if text split by letter by letter
                    else if (
                        "df_text_reveal_letter_by_letter" ===
                        settings.settings__split_content
                    ) {
                        tempDiv.innerHTML = chunk.join("");
                    }

                    while (tempDiv.firstChild) {
                        parent.insertBefore(tempDiv.firstChild, node);
                    }

                    parent.removeChild(node);
                }
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                Array.from(node.childNodes).forEach((childNode) => {
                    wrapTextNodes(childNode);
                });
            }
        }

        wrapTextNodes(doc.body);
    }
    return doc.body.innerHTML;
}
function restoreStage(settings, id) {
    const orderClass = `difl_text_reveal_${id}`;
    const ele = document.querySelector("body");
    const initialOpacity = settings.settings__reveal_initial_opacity || 0.2;
    const elements = ele.querySelectorAll(`.${orderClass} span.df_inner`);

    //first half
    for (let i = 0; i < Math.floor(elements.length / 2); i++) {
        let element = elements[i];

        element.style.opacity = "1";
        if (
            "df_text_reveal_by__dual_color_animation" ===
            settings.settings__reveal_by
        ) {
            let secondaryColor = `var( --secondary-reveal-color )`;
            element.style.color = secondaryColor;
        }
    }

    //last half
    for (let i = Math.floor(elements.length / 2); i < elements.length; i++) {
        let element = elements[i];

        element.style.opacity = initialOpacity;

        if (
            "df_text_reveal_by__dual_color_animation" ===
            settings.settings__reveal_by
        ) {
            element.style.color = "unset";
        }
    }
}
function handleBasicAnimation(settings, id, _targetedChunk) {
    const orderClass = `difl_text_reveal_${id}`;
    const ele = document.querySelector("body");
    const delay = settings.settings__reveal_delay || 0;
    const duration = settings.settings__reveal_duration || 0;
    const elements = ele.querySelectorAll(`.${orderClass} span.df_inner`);

    let targetedChunk = _targetedChunk;
    let chunk_duration = duration / elements.length;

    setTimeout(() => {
        let intervalId;
        try {
            intervalId = setInterval(() => {
                if (targetedChunk < elements.length) {
                    const element = elements[targetedChunk];
                    element.style.transition = `all ${chunk_duration}ms`;
                    element.style.opacity = "1";

                    if (
                        "df_text_reveal_by__dual_color_animation" ===
                        settings.settings__reveal_by
                    ) {
                        let secondaryColor = `var( --secondary-reveal-color )`;
                        element.style.color = secondaryColor;
                    }

                    targetedChunk += 1;
                    _targetedChunk = targetedChunk;
                } else {
                    clearInterval(intervalId);
                    restoreStage(settings, id);
                }
            }, chunk_duration);
        } catch (error) {
            clearInterval(intervalId);
            restoreStage(settings, id);
            console.error(error);
        }
    }, delay);
}
function init(id, settings, targetedChunk) {
    const orderClass = `difl_text_reveal_${id}`;
    const initialOpacity = settings.settings__reveal_initial_opacity || 0.2;
    document.querySelectorAll(`.${orderClass} span.df_inner`).forEach((e) => {
        e.style.transition = "unset";
        e.style.opacity = initialOpacity;
        e.style.color = "unset";
    });
    if (
        "df_text_reveal_by__dual_color_animation" ===
        settings.settings__reveal_by
    ) {
        handleBasicAnimation(settings, id, targetedChunk);
    } else if (
        "df_text_reveal_by_opacity_animationr" === settings.settings__reveal_by
    ) {
        handleBasicAnimation(settings, id, targetedChunk);
    }
}
export const TextRevealEdit = ({ attrs, id, name, elements }) => {
    //variable declearation
    let props = elements?.attrs;
    let settings;
    let targetedChunk = 0;
    const settings__trigger_type =
        props["settings__trigger_type"] &&
        props["settings__trigger_type"].innerContent.desktop.value;
    const settings__split_content =
        props["settings__split_content"] &&
        props["settings__split_content"].innerContent.desktop.value;
    const settings__reveal_by =
        props["settings__reveal_by"] &&
        props["settings__reveal_by"].innerContent.desktop.value;
    const settings__reveal_duration =
        props["settings__reveal_duration"] &&
        props["settings__reveal_duration"].innerContent.desktop.value;
    const settings__reveal_delay =
        props["settings__reveal_delay"] &&
        props["settings__reveal_delay"].innerContent.desktop.value;
    const settings__reveal_initial_opacity =
        props["settings__reveal_initial_opacity"] &&
        props["settings__reveal_initial_opacity"].innerContent.desktop.value;

    settings = {
        settings__reveal_duration: settings__reveal_duration || 1000,
        settings__reveal_delay: settings__reveal_delay || 0,
        settings__reveal_initial_opacity:
            parseFloat(settings__reveal_initial_opacity) || "0.2",
        settings__trigger_type: settings__trigger_type || "auto",
        settings__split_content:
            settings__split_content || "df_text_reveal_word_by_word",
        settings__reveal_by:
            settings__reveal_by || "df_text_reveal_by_opacity_animationr",
    };

    const parser = new DOMParser();
    const content =
        props["settings__content"] &&
        props["settings__content"].innerContent.desktop.value;

    const parsedDocument = parser.parseFromString(content, "text/html");

    //state declearation
    const [initialState] = useState(() => {
        init(id, settings, targetedChunk);
    });
    useEffect(() => {
        init(id, settings, targetedChunk);
    }, [
        settings.settings__trigger_type,
        settings.settings__split_content,
        settings.settings__reveal_by,
        settings.settings__reveal_initial_opacity,
    ]);

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
            {elements.styleComponents({
                attrName: "module",
            })}
            {content && content != "" && (
                <div
                    className={`df_text_reveal_main_container`}
                    dangerouslySetInnerHTML={{
                        __html: processContent(settings, parsedDocument),
                    }}
                />
            )}
        </ModuleContainer>
    );
};
