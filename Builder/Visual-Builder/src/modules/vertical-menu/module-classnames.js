const { elementClassnames, textOptionsClassnames } = window?.divi?.module;

export const moduleClassnames = ({ classnamesInstance, attrs }) => {
    classnamesInstance.add(
        textOptionsClassnames(attrs?.module?.advanced?.text, {
            orientation: false,
        }),
    );

    // Add element classnames.
    classnamesInstance.add(
        elementClassnames({
            attrs: attrs?.module?.decoration ?? {},
        }),
    );

    // healper function
    const get_val = (a, device = "desktop") =>
        attrs[a]?.innerContent[device]?.value;

    const common_classes = ["builder-view", "df_vertical_menu_main_container"];

    //add common classes
    classnamesInstance.add(common_classes.join(" "));

    // badge position
    classnamesInstance.add(
        `badge-position-${get_val("style_settings__badge__alignment")}`,
    );

    //Alignment
    get_val("style_settings__alignment") &&
        classnamesInstance.add(get_val("style_settings__alignment"));
    //Alignment-tablet
    get_val("style_settings__alignment", "tablet") &&
        classnamesInstance.add(
            `${get_val("style_settings__alignment", "tablet")}-tablet`,
        );
    //Alignment-phone
    get_val("style_settings__alignment", "phone") &&
        classnamesInstance.add(
            `${get_val("style_settings__alignment", "phone")}-phone`,
        );

    //SubMenu Reveal Type
    get_val("settings__submenu_reveal_type") &&
        classnamesInstance.add('df-vertical-sub-menu-reveal-stack');

    //Tree View
    if (
        get_val("style_settings__sub_menu__tree_view") === "on" &&
        get_val("settings__submenu_reveal_type") ===
            "df-vertical-sub-menu-reveal-stack"
    ) {
        classnamesInstance.add("df_enable_sub_menu__tree_view");
    }

    //Hover Animation
    get_val("settings__menu_item_hover_animation") == "on" &&
        classnamesInstance.add(
            `df-vertical-has-item-animation ${get_val(
                "settings__select_animation_type",
            )}`,
        );

    //Builder Visiblity
    get_val("settings__builder_visiblity") === "on"?
        classnamesInstance.add("df-vertical-submenu-builder-visiblity"):
        classnamesInstance.add("df-vertical-submenu-builder-hidden");    //Builder Visiblity



    //Badge Visiblity
    get_val("settings__badge_visiblity") != "on" &&
        classnamesInstance.add("df-vertical-menu-bedge-hide");

    //Tooltip Visiblity
    get_val("settings__tooltip_visiblity") != "on" &&
        classnamesInstance.add("df-vertical-menu-tooltip-hide");
};
