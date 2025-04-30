const convertInlineFont = value => (isString(value) ? value.split(",") : []);

export const conversionOutline = {
    advanced: {
        admin_label: "module.meta.adminLabel",
        animation: "module.decoration.animation",
        background: "module.decoration.background",
        disabled_on: "module.decoration.disabledOn",
        module: "module.advanced.htmlAttributes",
        overflow: "module.decoration.overflow",
        position_fields: "module.decoration.position",
        scroll: "module.decoration.scroll",
        sticky: "module.decoration.sticky",
        text: "module.advanced.text",
        transform: "module.decoration.transform",
        transition: "module.decoration.transition",
        z_index: "module.decoration.zIndex",
        margin_padding: "module.decoration.spacing",
        max_width: "module.decoration.sizing",
        height: "module.decoration.sizing",
        link_options: "module.advanced.link",
        fonts: {
            "text-body": "settings__content.decoration.bodyFont.body",
            link: "settings__content.decoration.bodyFont.link",
            ul: "settings__content.decoration.bodyFont.ul",
            ol: "settings__content.decoration.bodyFont.ol",
            quote: "settings__content.decoration.bodyFont.quote",
            //header
            header: "settings__content.decoration.headingFont.h1",
            header_2: "settings__content.decoration.headingFont.h2",
            header_3: "settings__content.decoration.headingFont.h3",
            header_4: "settings__content.decoration.headingFont.h4",
            header_5: "settings__content.decoration.headingFont.h5",
            header_6: "settings__content.decoration.headingFont.h6"
        },
        text_shadow: {
            default: "module.advanced.text.textShadow"
        },
        box_shadow: {
            default: "module.decoration.boxShadow"
        },
        borders: {
            default: "module.decoration.border"
        },
        filters: {
            default: "module.decoration.filters"
        }
    },
    css: {
        after: "css.*.after",
        before: "css.*.before",
        main_element: "css.*.mainElement",
        title: "css.*.title",
        content: "css.*.content"
    },
    module: {
        title: "title.innerContent.*",
        settings__content: "settings__content.innerContent.*",
        settings__trigger_type: "settings__trigger_type.innerContent.*",
        settings__split_content: "settings__split_content.innerContent.*",
        settings__reveal_by: "settings__reveal_by.innerContent.*",
        settings__reveal_color: "settings__reveal_color.decoration.*",
        settings__reveal_duration: "settings__reveal_duration.innerContent.*",
        settings__reveal_delay: "settings__reveal_delay.innerContent.*",
        settings__reveal_initial_opacity:
            "settings__reveal_initial_opacity.innerContent.*",
        settings__reveal_viewport_offset_value_top:
            "settings__reveal_viewport_offset_value_top.innerContent.*",
        settings__reveal_viewport_offset_value_bottom:
            "settings__reveal_viewport_offset_value_bottom.innerContent.*",
        ////
        content: "content.innerContent.*",
        header_level: "title.decoration.font.font.*.headingLevel",
        inline_fonts: "content.decoration.inlineFont.*.families"
    },
    valueExpansionFunctionMap: {
        inline_fonts: convertInlineFont
    }
};
