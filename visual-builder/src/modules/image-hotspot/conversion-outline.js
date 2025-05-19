import { D4ToD5Background, D4ToD5Spacing, D4ToD5Icon } from "../../helper/conversion";

export const conversionOutline = {
    module: {
    advanced: {
        admin_label: "module.meta.adminLabel",
        background: "module.decoration.background",
        fonts: {
            tooltip_text_body: "tooltip_text_body.decoration.font",
            tooltip_text_a: "tooltip_text_a.decoration.font",
            tooltip_text_h1: "tooltip_text_h1.decoration.font",
            spot: "spot.decoration.font"
        },
        borders: {
            default: "module.decoration.border",
            spots_border: "spots_border.decoration.border",
            spots_image_border: "spots_image_border.decoration.border",
            tooltips_border: "tooltips_border.decoration.border",
            image_border: "image_border.decoration.border"
        },
        box_shadow: {
            default: "module.decoration.boxShadow"
        },
        filters: {
            default: "module.decoration.filters"
        }
    },
    module: {
        hotsopt_image: "hotsopt_image.innerContent.*",
        hotsopt_image_alt_text: "hotsopt_image_alt_text.innerContent.*",
        hotsopt_image_alignment: "hotsopt_image_alignment.innerContent.*",
        spots_background: "spots_background.innerContent.*",
        spots_icon_color: "spots_icon_color.innerContent.*",
        spots_icon_size: "spots_icon_size.innerContent.*",
        tooltip_enable: "tooltip_enable.innerContent.*",
        tooltip_arrow: "tooltip_arrow.innerContent.*",
        tooltip_placement: "tooltip_placement.innerContent.*",
        tooltip_animation: "tooltip_animation.innerContent.*",
        tooltip_trigger: "tooltip_trigger.innerContent.*",
        tooltip_interactive: "tooltip_interactive.innerContent.*",
        tooltip_interactive_border: "tooltip_interactive_border.innerContent.*",
        tooltip_interactive_debounce: "tooltip_interactive_debounce.innerContent.*",
        tooltip_follow_cursor: "tooltip_follow_cursor.innerContent.*",
        tooltip_custom_maxwidth: "tooltip_custom_maxwidth.innerContent.*",
        tooltip_offset_enable: "tooltip_offset_enable.innerContent.*",
        tooltip_offset_skidding: "tooltip_offset_skidding.innerContent.*",
        tooltip_offset_distance: "tooltip_offset_distance.innerContent.*",
        tooltips_background: "tooltips_background.innerContent.*",
        tooltips_arrow_color: "tooltips_arrow_color.innerContent.*",
        wrapper_margin: "wrapper_margin.decoration.spacing.*.margin",
        wrapper_padding: "wrapper_padding.decoration.spacing.*.padding",
        spots_padding: "spots_padding.decoration.spacing.*.padding",
        tooltips_padding: "tooltips_padding.decoration.spacing.*.padding"
    },
    valueExpansionFunctionMap: {
        wrapper_margin: D4ToD5Spacing,
        wrapper_padding: D4ToD5Spacing,
        spots_padding: D4ToD5Spacing,
        tooltips_padding: D4ToD5Spacing
    }
}
};
