// External Dependencies
import React, { Fragment, Component } from "react";
import utility from "../../../scripts/df_scripts/utilities";
import $ from "jquery";
import svgData from "../../../admin/assets/svg/verticalMenu.json";

// Internal Dependencies
import "./style.css";
class VerticalMenu extends Component {
    static slug = "difl_vertical_menu";
    static main_css_element = `%%order_class%%  .df_vertical_menu_main_container .df-vertical-menu-nav-wrap  ul.df-vertical-menu-nav`;
    static main_css_core_element = `%%order_class%%  .df_vertical_menu_main_container`;

    constructor(props) {
        super(props);

        this.state = {
            menuItems: ``,
            loading: true
        };
    }

    componentDidMount() {
        const menu_id = this.props.settings__select_menu_slug;

        this.get_the_menu(menu_id);
    }
    componentDidUpdate(prevProps) {
        let uniqSelector = this.props.moduleInfo.orderClassName;
        let builder_visiblity = this.props.settings__builder_visiblity;
        let badge_visiblity = this.props.settings__badge_visiblity;
        let tooltip_visiblity = this.props.settings__tooltip_visiblity;

        // badge visiblity control
        this.handler_element_visiblity(
            `.${uniqSelector} ul li a .df-vertical-nav-item-badge`,
            badge_visiblity
        );
        // tooltip visiblity control
        this.handler_element_visiblity(
            `.${uniqSelector} ul li a .df-vertical-nav-item-tooltip`,
            tooltip_visiblity
        );

        // builder submenu visiblity control
        this.handler_nested_submenu_visiblity(uniqSelector, builder_visiblity);

        if (
            prevProps.settings__select_menu_slug !==
            this.props.settings__select_menu_slug
        ) {
            this.setState({ loading: true });
            const menu_id = this.props.settings__select_menu_slug;
            this.get_the_menu(menu_id);
        }
    }

    static css(props) {
        function dynamic_main_css_element(dynamic_val) {
            return `%%order_class%%  .df_vertical_menu_main_container${dynamic_val} .df-vertical-menu-nav-wrap  ul.df-vertical-menu-nav`;
        }

        const additionalCss = [];

        utility.df_process_bg({
            props: props,
            additionalCss: additionalCss,
            key: `style_settings__sub_menu__item__bg`,
            selector: `${this.main_css_element}  .df-vertical-sub-menu:not(.df-vertical-col-added):not(.df-vertical-inside-mega-menu):not(.df-vertical-custom-submenu) > li  a`,
            important: true
        });
        utility.df_process_bg({
            props: props,
            additionalCss: additionalCss,
            key: `style_settings__sub_menu__wrapper__bg`,
            selector: `${this.main_css_element}  .df-vertical-sub-menu:not(.df-vertical-col-added):not(.df-vertical-inside-mega-menu):not(.df-vertical-mega-menu-item):not(.df-vertical-custom-submenu)`,
            important: true
        });
        utility.df_process_bg({
            props: props,
            additionalCss: additionalCss,
            key: `style_settings__mega_menu__wrapper_bg`,
            selector: `${this.main_css_element}  .df-vertical-sub-menu.df-vertical-col-added `,
            important: true
        });
        utility.df_process_bg({
            props: props,
            additionalCss: additionalCss,
            key: `style_settings__mega_menu__items_bg`,
            selector: `${this.main_css_element}  .df-vertical-sub-menu.df-vertical-col-added li a`,
            important: true
        });
        utility.df_process_bg({
            props: props,
            additionalCss: additionalCss,
            key: `style_settings__menu__item_bg`,
            selector: `${this.main_css_element}  > li a `,
            important: true
        });

        utility.process_margin_padding({
            props: props,
            key: `style_settings__menu__item_icon_spacing_margin`,
            additionalCss: additionalCss,
            selector: `${this.main_css_element}  li > a .df-vertical-menu-icon,${this.main_css_element}  li > a > img`,
            type: `margin`
        });
        utility.process_margin_padding({
            props: props,
            key: `style_settings__menu__item_spacing_padding`,
            additionalCss: additionalCss,
            selector: `${this.main_css_element}  li > a`,
            type: `padding`
        });

        //hamburger
        utility.process_margin_padding({
            props: props,
            key: `style_settings__hamburger__wrapper_spacing_padding`,
            additionalCss: additionalCss,
            selector: `${this.main_css_core_element}  .df-vertical-humberger-container`,
            type: `padding`
        });

        //hamburger
        utility.process_margin_padding({
            props: props,
            key: `style_settings__hamburger__wrapper_spacing_margin`,
            additionalCss: additionalCss,
            selector: `${this.main_css_core_element}  .df-vertical-humberger-container`,
            type: `margin`
        });

        // submenu items
        utility.process_margin_padding({
            props: props,
            key: `style_settings__sub_menu__item_icon_spacing_margin`,
            additionalCss: additionalCss,
            selector: `${this.main_css_element}  .df-vertical-sub-menu:not(.df-vertical-col-added):not(.df-vertical-inside-mega-menu) > li > a .df-vertical-menu-icon , ${this.main_css_element}  .df-vertical-sub-menu:not(.df-vertical-col-added):not(.df-vertical-inside-mega-menu) > li > a > img`,
            type: `margin`
        });
        utility.process_margin_padding({
            props: props,
            key: `style_settings__sub_menu__item_spacing_padding`,
            additionalCss: additionalCss,
            selector: `${this.main_css_element}  .df-vertical-sub-menu:not(.df-vertical-col-added):not(.df-vertical-inside-mega-menu) > li > a`,
            type: `padding`
        });
        utility.process_margin_padding({
            props: props,
            key: `style_settings__sub_menu__wrapper_spacing_padding`,
            additionalCss: additionalCss,
            selector: `${this.main_css_element}  .df-vertical-sub-menu:not(.df-vertical-col-added):not(.df-vertical-inside-mega-menu):not(.df-vertical-mega-menu-item)`,
            type: `padding`
        });

        utility.process_margin_padding({
            props: props,
            key: `style_settings__mega_menu__wrapper_spacing_padding`,
            additionalCss: additionalCss,
            selector: `${this.main_css_element}  .df-vertical-sub-menu.df-vertical-col-added`,
            type: `padding`
        });
        // megamenu items
        utility.process_margin_padding({
            props: props,
            key: `style_settings__mega_menu__items_icon_spacing_margin`,
            additionalCss: additionalCss,
            selector: `${this.main_css_element}  .df-vertical-sub-menu.df-vertical-col-added li a .df-vertical-menu-icon,${this.main_css_element}  .df-vertical-sub-menu.df-vertical-col-added li a img`,
            type: `margin`
        });
        utility.process_margin_padding({
            props: props,
            key: `style_settings__mega_menu__items_spacing_padding`,
            additionalCss: additionalCss,
            selector: `${this.main_css_element} .df-vertical-sub-menu.df-vertical-col-added li a`,
            type: `padding`
        });
        utility.apply_single_value({
            props: props,
            key: `style_settings__menu__item_gap`,
            additionalCss: additionalCss,
            selector: `${this.main_css_element}  li:not(:first-child),${this.main_css_element} .df-vertical-inside-mega-menu li:first-child`,
            type: `margin-top`,
            unit: `px`,
            important: true
        });
        utility.apply_single_value({
            props: props,
            key: `settings__animation__line_weight`,
            additionalCss: additionalCss,
            selector: `${this.main_css_element}  li.df-vertical-menu-item > a .df_vertical_border_hover_effect:after,${this.main_css_element}  li.df-vertical-menu-item > a .df_vertical_border_hover_effect:before`,
            type: `height`,
            unit: `px`
        });
        utility.apply_single_value({
            props: props,
            key: `style_settings__sub_menu__item_gap`,
            additionalCss: additionalCss,
            selector: `${this.main_css_element} .df-vertical-sub-menu:not(.df-vertical-col-added):not(.df-vertical-inside-mega-menu) > li:not(:first-child)`,
            type: `margin-top`,
            unit: `px`
        });
        utility.apply_single_value({
            props: props,
            key: `style_settings__mega_menu__item_gap`,
            additionalCss: additionalCss,
            selector: `${this.main_css_element} li.df-vertical-menu-item .df-vertical-sub-menu.df-vertical-col-added .df-vertical-sub-menu li`,
            type: `margin-top`,
            unit: `px`
        });
        utility.apply_single_value({
            props: props,
            key: `style_settings__mega_menu__columns`,
            additionalCss: additionalCss,
            selector: `${this.main_css_element} li.df-vertical-menu-item .df-vertical-sub-menu.df-vertical-col-added`,
            type: `gap`,
            unit: `px`
        });
        utility.process_range_value({
            props: props,
            key: `style_settings__sub_menu__tree_view_spacing`,
            additionalCss: additionalCss,
            selector: `${dynamic_main_css_element(
                ".df_enable_sub_menu__tree_view"
            )} .df-vertical-sub-menu:not(.df-vertical-col-added):not(.df-vertical-inside-mega-menu):not(.df-vertical-mega-menu-item):not(.df-vertical-menu-nav-level-1)`,
            type: `padding-left`,
            unit: `px`,
            important: true
        });
        // utility.apply_single_value({
        //     props: props,
        //     key: `style_settings__mega_menu__item_width`,
        //     additionalCss: additionalCss,
        //     selector: `${this.main_css_element} li.df-vertical-menu-item .df-vertical-sub-menu.df-vertical-col-added .df-vertical-sub-menu li`,
        //     type: `width`,
        //     unit: `px`
        // });

        //ANCHOR - push icon style
        utility.apply_single_value({
            props: props,
            key: `style_settings__menu__icon_font_size`,
            additionalCss: additionalCss,
            selector: `${this.main_css_element}  li a span.df-vertical-menu-icon`,
            type: `font-size`,
            unit: `px`,
            important: true
        });
        utility.apply_single_value({
            props: props,
            key: `style_settings__hamburger_icon_font_size`,
            additionalCss: additionalCss,
            selector: `${this.main_css_core_element}  .df-vertical-humberger-container span.df-vertical-menu-hamburger-icon .hamburger`,
            type: `width`,
            unit: `px`,
            important: true
        });
        utility.apply_single_value({
            props: props,
            key: `style_settings__hamburger_icon_font_size`,
            additionalCss: additionalCss,
            selector: `${this.main_css_core_element}  .df-vertical-humberger-container span.df-vertical-menu-hamburger-icon .hamburger`,
            type: `height`,
            unit: `px`,
            important: true
        });
        utility.process_color({
            props: props,
            key: `style_settings__menu__icon_color`,
            additionalCss: additionalCss,
            type: `color`,
            selector: `${this.main_css_element} li a .df-vertical-menu-icon`,
            important: true
        });

        utility.process_color({
            props: props,
            key: `settings__hamburger_icon_color`,
            additionalCss: additionalCss,
            type: `fill`,
            selector: `${this.main_css_core_element} .df-vertical-humberger-container span.df-vertical-menu-hamburger-icon svg`,
            important: true
        });

        utility.process_color({
            props: props,
            key: `settings__select_animation_color`,
            additionalCss: additionalCss,
            type: `background`,
            selector: `${this.main_css_element} li.df-vertical-menu-item > a .df_vertical_border_hover_effect:after,${this.main_css_element} li.df-vertical-menu-item > a .df_vertical_border_hover_effect:before`,
            important: true
        });

        utility.process_color({
            props: props,
            key: `style_settings__sub_menu__icon_color`,
            additionalCss: additionalCss,
            type: `color`,
            selector: `${this.main_css_element}  .df-vertical-sub-menu:not(.df-vertical-col-added):not(.df-vertical-inside-mega-menu):not(.df-vertical-col-added ul) > li > a .df-vertical-menu-icon`,
            important: true
        });
        utility.process_color({
            props: props,
            key: `style_settings__mega_menu__icon_color`,
            additionalCss: additionalCss,
            type: `color`,
            selector: `${this.main_css_element}  .df-vertical-sub-menu.df-vertical-col-added li a > .df-vertical-menu-icon`,
            important: true
        });

        //ANCHOR -  PROCESS-BADGE-STYLE

        utility.df_process_bg({
            props: props,
            additionalCss: additionalCss,
            key: `style_settings__menu__badge_bg`,
            selector: `${this.main_css_element} li a .df-vertical-nav-item-badge `,
            important: true
        });
        utility.df_process_bg({
            props: props,
            additionalCss: additionalCss,
            key: `style_settings__sub_menu__badge_bg`,
            selector: `${this.main_css_element} .df-vertical-sub-menu li a .df-vertical-nav-item-badge `,
            important: true
        });
        utility.df_process_bg({
            props: props,
            additionalCss: additionalCss,
            key: `style_settings__hamburger__wrapper__bg`,
            selector: `${this.main_css_core_element} .df-vertical-humberger-container `,
            important: true
        });
        //ANCHOR -  PROCESS-tooltip-STYLE

        utility.df_process_bg({
            props: props,
            additionalCss: additionalCss,
            key: `style_settings__menu__tooltip_bg`,
            selector: `${this.main_css_element} li a .df-vertical-nav-item-tooltip `,
            important: true
        });
        utility.df_process_bg({
            props: props,
            additionalCss: additionalCss,
            key: `style_settings__sub_menu__tooltip_bg`,
            selector: `${this.main_css_element} .df-vertical-sub-menu li a .df-vertical-nav-item-tooltip `,
            important: true
        });
        return additionalCss;
    }

    get_the_menu = menu_id => {
        const url = `${window.ETBuilderBackend.ajaxUrl}?action=df_vertical_am_menu`;

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                et_admin_load_nonce: window.et_fb_options.et_admin_load_nonce,
                menu_id: menu_id
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    this.setState({ menuItems: data.data, loading: false });
                } else {
                    console.error("Error in response data:", data);
                }
            })
            .catch(error => console.error("Fetch error:", error));
    };
    appendExtraDivForEnableHoverEffect = doc => {
        $(doc)
            .find("a")
            .each(function(i, ele) {
                let newSpan = $(
                    '<span class="df_vertical_border_hover_effect"></span>'
                );
                $(this).append(newSpan);
            });
        return doc;
    };
    megaMenuColumn = doc => {
        $(doc)
            .find(".df-vertical-mega-menu")
            .each(function(i, ele) {
                const _col_number = Number(ele.dataset.column);
                let _c = 1;
                $(this)
                    .find(">ul>li")
                    .each(function(index, element) {
                        if (!$(this).attr("data-column")) {
                            $(this).attr("data-column", _c);
                            if (_c === _col_number) {
                                _c = 1;
                            } else {
                                _c++;
                            }
                        }
                    });
                if (
                    !$(this)
                        .find(">ul")
                        .hasClass("df-vertical-col-added")
                ) {
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
                    $(this)
                        .find(">ul")
                        .addClass("df-vertical-col-added");
                }
            });
        doc = this.appendExtraDivForEnableHoverEffect(doc);
        return doc.body.innerHTML;
    };
    handler_nested_submenu_visiblity(selector, status) {
        if (status === "on") {
            document
                .querySelectorAll(`.${selector}  .dropdown-arrow`)

                .forEach(function(arrow) {
                    arrow.classList.add(`rotate-arrow-up`);
                });
            document.querySelector(
                `.${selector} .df_vertical_menu_main_container `
            ) &&
                document
                    .querySelector(
                        `.${selector} .df_vertical_menu_main_container `
                    )
                    .classList.add(`df-vertical-submenu-builder-visiblity`);

            document.querySelector(
                `.${selector} .df_vertical_menu_main_container `
            ) &&
                document
                    .querySelector(
                        `.${selector} .df_vertical_menu_main_container `
                    )
                    .classList.remove(`df-vertical-submenu-builder-hidden`);
        } else if (status === `off`) {
            document.querySelector(`.${selector} .dropdown-arrow `) &&
                document
                    .querySelectorAll(`.${selector}  .dropdown-arrow`)
                    .forEach(function(arrow) {
                        if (arrow.classList.contains(`rotate-arrow-up`)) {
                            arrow.classList.remove(`rotate-arrow-up`);
                        }
                    });

            document.querySelector(
                `.${selector} .df_vertical_menu_main_container `
            ) &&
                document
                    .querySelector(
                        `.${selector} .df_vertical_menu_main_container `
                    )
                    .classList.remove(`df-vertical-submenu-builder-visiblity`);

            document.querySelector(
                `.${selector} .df_vertical_menu_main_container `
            ) &&
                document
                    .querySelector(
                        `.${selector} .df_vertical_menu_main_container `
                    )
                    .classList.add(`df-vertical-submenu-builder-hidden`);
        }
    }
    handler_element_visiblity(selector, value) {
        if (value == `on`) {
            document
                .querySelectorAll(selector)
                .forEach(e => (e.style.display = `block`));
        } else {
            document
                .querySelectorAll(selector)
                .forEach(e => (e.style.display = `none`));
        }
    }

    render() {
        const { menuItems } = this.state;
        let {
            style_settings__badge__alignment,
            settings__menu_item_hover_animation,
            settings__select_animation_type,
            style_settings__sub_menu__tree_view,
            settings__submenu_reveal_type,
            style_settings__alignment,
            style_settings__alignment_tablet,
            style_settings__alignment_phone,
            settings__hamburger_icon_preset,
            settings__use_hamburger_for_mobile,
            settings__hamburger_text,
            settings__submenu_reveal_dir
        } = this.props;
        let animation_type = "";
        animation_type =
            settings__menu_item_hover_animation === "on" &&
            settings__select_animation_type;

        style_settings__sub_menu__tree_view =
            style_settings__sub_menu__tree_view === "off" &&
            settings__submenu_reveal_type ===
                "df-vertical-sub-menu-reveal-stack"
                ? "df_disable_sub_menu__tree_view"
                : "df_enable_sub_menu__tree_view";

        //content allignment
        const content_alignment = style_settings__alignment;
        const content_alignment_tablet = style_settings__alignment_tablet
            ? style_settings__alignment_tablet
            : style_settings__alignment;

        const content_alignment_phone = style_settings__alignment_phone
            ? style_settings__alignment_phone
            : style_settings__alignment;

        // parse content
        const parser = new DOMParser();
        const parsedDocument = parser.parseFromString(menuItems, "text/html");

        //humberger settings
        if ("on" == this.props.settings__use_hamburger_for_mobile) {
            settings__use_hamburger_for_mobile = "df_enabled_hamburger";
        } else {
            settings__use_hamburger_for_mobile = "";
        }

        const markupClassList = `${settings__submenu_reveal_dir} builder-view ${settings__use_hamburger_for_mobile} df_vertical_menu_main_container 
        ${content_alignment && content_alignment} ${
            this.props.settings__submenu_reveal_type ===
            "df-vertical-sub-menu-reveal-stack"
                ? style_settings__sub_menu__tree_view
                : ""
        } ${content_alignment_tablet &&
            content_alignment_tablet}-tablet ${content_alignment_phone &&
            content_alignment_phone}-phone badge-position-${style_settings__badge__alignment} ${
            animation_type ? "df-vertical-has-item-animation" : ""
        } ${animation_type}  `;

        return (
            <Fragment>
                {this.state.loading === false ? (
                    <div className={markupClassList}>
                        {settings__use_hamburger_for_mobile ==
                            "df_enabled_hamburger" && (
                            <span className="df-vertical-humberger-container">
                                <span className="df-vertical-menu-hamburger-text">
                                    {settings__hamburger_text}
                                </span>
                                <span className="df-vertical-menu-hamburger-icon">
                                    <span className="hamburger">
                                        <div
                                            class=""
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    svgData.VerticalMenu[
                                                        settings__hamburger_icon_preset
                                                    ]
                                            }}
                                        />
                                        <div
                                            class=""
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    svgData.VerticalMenu[
                                                        "close"
                                                    ]
                                            }}
                                        />
                                    </span>
                                </span>
                            </span>
                        )}
                        <span
                            dangerouslySetInnerHTML={{
                                __html: this.megaMenuColumn(parsedDocument)
                            }}
                        />
                    </div>
                ) : (
                    <div className="et-fb-preloader et-fb-preloader__loading">
                        <div className="et-fb-loader" />
                    </div>
                )}
            </Fragment>
        );
    }
}

export default VerticalMenu;
