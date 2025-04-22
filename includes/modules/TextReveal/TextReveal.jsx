// External Dependencies
import React, { Fragment, Component } from "react";
import utility from "../../../scripts/df_scripts/utilities";
import $ from "jquery";

import "./../../../public/js/textReveal.js";

// Internal Dependencies
import "./style.css";
class TextReveal extends Component {
    static slug = "difl_text_reveal";
    static main_css_element = `%%order_class%%  .df_text_reveal_main_container`;
    lastScrollTop;
    scrollDirectionGlobal;
    settings;
    targetedChunk = 0;

    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.init();
    }
    componentDidUpdate(prevProps) {
        let styleChangingStatus = false;
        Object.entries(this.settings).forEach(value => {
            if (
                (prevProps[value[0]] != value[1] &&  value[0] === "settings__reveal_by") ||
                (prevProps[value[0]] != value[1] &&  value[0] === "settings__split_content")
            ) {
                styleChangingStatus = true;
            }
        });
        if (styleChangingStatus) {
            this.targetedChunk = 0;
            this.init();
        }
        this.restoreStage();
    }

    static css(props) {
        const additionalCss = [];
        const revealColor = props["settings__reveal_color"];
        additionalCss.push([
            {
                selector: this.main_css_element,
                declaration: ` --secondary-reveal-color: ${revealColor} !important;`
            }
        ]);

        return additionalCss;
    }
    processContent(doc) {
        const _this = this;
        const initialOpacity =
            this.settings.settings__reveal_initial_opacity || 0.2;
        if (doc.body) {
            function wrapTextNodes(node) {
                if (node.nodeType === Node.TEXT_NODE) {
                    const text = node.nodeValue;
                    const parent = node.parentNode;
                    let chunk;

                    if (text.trim()) {
                        if (
                            "df_text_reveal_word_by_word" ===
                            _this.settings.settings__split_content
                        ) {
                            chunk = text.split(" ");
                        }
                        // if text split by letter by letter
                        else if (
                            "df_text_reveal_letter_by_letter" ===
                            _this.settings.settings__split_content
                        ) {
                            chunk = text.split("");
                        }

                        chunk = chunk.map(
                            e =>
                                `<span class="df_inner" style="opacity:${initialOpacity}">${e}</span>`
                        );

                        const tempDiv = document.createElement("div");

                        if (
                            "df_text_reveal_word_by_word" ===
                            _this.settings.settings__split_content
                        ) {
                            tempDiv.innerHTML = chunk.join(" ");
                        }
                        // if text split by letter by letter
                        else if (
                            "df_text_reveal_letter_by_letter" ===
                            _this.settings.settings__split_content
                        ) {
                            tempDiv.innerHTML = chunk.join("");
                        }

                        while (tempDiv.firstChild) {
                            parent.insertBefore(tempDiv.firstChild, node);
                        }

                        parent.removeChild(node);
                    }
                } else if (node.nodeType === Node.ELEMENT_NODE) {
                    Array.from(node.childNodes).forEach(childNode => {
                        wrapTextNodes(childNode);
                    });
                }
            }

            wrapTextNodes(doc.body);
        }
        return doc.body.innerHTML;
    }
    restoreStage() {
        const orderClass = this.props.moduleInfo.orderClassName;
        const ele = document.querySelector("body");
        const initialOpacity =
            this.settings.settings__reveal_initial_opacity || 0.2;
        const elements = ele.querySelectorAll(`.${orderClass} span.df_inner`);

        //first half
        for (let i = 0; i < Math.floor(elements.length / 2); i++) {
            let element = elements[i];

            element.style.opacity = "1";
            if (
                "df_text_reveal_by__dual_color_animation" ===
                this.settings.settings__reveal_by
            ) {
                let secondaryColor = `var( --secondary-reveal-color )`;
                element.style.color = secondaryColor;
            }
        }

        //last half
        for (
            let i = Math.floor(elements.length / 2);
            i < elements.length;
            i++
        ) {
            let element = elements[i];

            element.style.opacity = initialOpacity;

            if (
                "df_text_reveal_by__dual_color_animation" ===
                this.settings.settings__reveal_by
            ) {
                element.style.color = "unset";
            }
        }
    }
    detectScrollDirection() {
        const _this = this;
        const currentScrollTop = $(window).scrollTop();

        if (currentScrollTop > _this.lastScrollTop) {
            _this.lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
            _this.scrollDirectionGlobal = "down";
            return "down";
        } else if (currentScrollTop < _this.lastScrollTop) {
            _this.lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
            _this.scrollDirectionGlobal = "up";
            return "up";
        }
    }

    handleBasicAnimation() {
        const orderClass = this.props.moduleInfo.orderClassName;
        const ele = document.querySelector("body");
        const delay = this.settings.settings__reveal_delay || 0;
        const duration = this.settings.settings__reveal_duration || 0;
        const elements = ele.querySelectorAll(`.${orderClass} span.df_inner`);

        let targetedChunk = this.targetedChunk;
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
                            this.settings.settings__reveal_by
                        ) {
                            let secondaryColor = `var( --secondary-reveal-color )`;
                            element.style.color = secondaryColor;
                        }

                        targetedChunk += 1;
                        this.targetedChunk = targetedChunk;
                    } else {
                        clearInterval(intervalId);
                        this.restoreStage();
                    }
                }, chunk_duration);
            } catch (error) {
                clearInterval(intervalId);
                this.restoreStage();
                console.error(error);
            }
        }, delay);
    }

    init() {
        const orderClass = this.props.moduleInfo.orderClassName;
        const initialOpacity =
            this.settings.settings__reveal_initial_opacity || 0.2;
        document.querySelectorAll(`.${orderClass} span.df_inner`).forEach(e => {
            e.style.transition = "unset";
            e.style.opacity = initialOpacity;
            e.style.color = "unset";
        });
        if (
            "df_text_reveal_by__dual_color_animation" ===
            this.settings.settings__reveal_by
        ) {
            this.handleBasicAnimation();
        } else if (
            "df_text_reveal_by_opacity_animationr" ===
            this.settings.settings__reveal_by
        ) {
            this.handleBasicAnimation();
        }
    }

    render() {
        const parser = new DOMParser();
        const content = this.props["settings__content"];
        const parsedDocument = parser.parseFromString(content, "text/html");
        const settings__trigger_type = this.props["settings__trigger_type"];
        const settings__split_content = this.props["settings__split_content"];
        const settings__reveal_by = this.props["settings__reveal_by"];
        const settings__reveal_color = this.props["settings__reveal_color"]
            ? this.props["settings__reveal_color"]
            : "";
        const settings__reveal_duration = this.props[
            "settings__reveal_duration"
        ]
            ? this.props["settings__reveal_duration"]
            : "";
        const settings__reveal_delay = this.props["settings__reveal_delay"]
            ? this.props["settings__reveal_delay"]
            : "";
        const settings__reveal_initial_opacity = this.props[
            "settings__reveal_initial_opacity"
        ]
            ? this.props["settings__reveal_initial_opacity"]
            : "";
        const settings__reveal_viewport_offset_value = this.props[
            "settings__reveal_viewport_offset_value"
        ]
            ? this.props["settings__reveal_viewport_offset_value"]
            : "";

        this.settings = {
            settings__content: content,
            settings__reveal_color: settings__reveal_color,
            settings__reveal_duration: settings__reveal_duration,
            settings__reveal_delay: settings__reveal_delay,
            settings__reveal_initial_opacity: parseFloat(
                settings__reveal_initial_opacity
            ),
            settings__trigger_type: settings__trigger_type,
            settings__split_content: settings__split_content,
            settings__reveal_by: settings__reveal_by
        };

        return (
            <Fragment>
                {(content == "" || !content) && (
                    <div className={`df_text_reveal_placeholder`}>
                        Add Text For Reveal
                    </div>
                )}
                {content && content != "" && (
                    <div
                        className={`df_text_reveal_main_container`}
                        dangerouslySetInnerHTML={{
                            __html: this.processContent(parsedDocument)
                        }}
                    />
                )}
            </Fragment>
        );
    }
}

export default TextReveal;
