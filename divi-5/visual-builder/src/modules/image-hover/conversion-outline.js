
import {D4ToD5Background,D4ToD5Spacing,D4ToD5Icon} from "../../healper/conversion";

export const conversionOutline = 
  {
    advanced: {
        admin_label: "module.meta.adminLabel",
        background: "module.decoration.background",
        fonts: {
            title: "title.decoration.font"
        },
        borders: {
            icon_wrapper_border: "icon_wrapper.decoration.border"
        },
        box_shadow: {
            default: "module.decoration.boxShadow",
            icon_wrapper_shadow:"icon_wrapper.decoration.boxShadow"
        }
    },
    module: {
        image: "image.innerContent.*.src",
        alt: "image.innerContent.*.alt",
        title_text: "title.innerContent.*.titleText",
        use_icon: "icon.innerContent.*.enable",
        font_icon: "icon.innerContent.*.icon",
        title_tag: "title.innerContent.*.tag",
        overlay: "overlay.innerContent.*.useOverlay",
        overlay_primary: "overlay.innerContent.*.primary_color",
        overlay_secondary: "overlay.innerContent.*.secondary_color",
        overlay_direction: "overlay.innerContent.*.direction",
        border_anim: "border_anim.innerContent.*.enable",
        anm_border_color: "border_anim.innerContent.*.color",
        anm_border_width: "border_anim.innerContent.*.width",
        anm_border_margin: "border_anim.innerContent.*.margin",
        border_anm_style: "border_anim.innerContent.*.anm_style",
        anm_content_padding: "anm_content_padding.innerContent.*",
        content_position: "content_position.innerContent.*",
        image_scale: "image.innerContent.*.scale_type",
        image_scale_hover: "image.innerContent.*.scale_hover",
        always_show_title: "title.innerContent.*.always_show_title",
        content_reveal_title: "title.innerContent.*.title_reveal",
        title_anim_delay: "title.innerContent.*.title_anm_delay",
        always_show_icon: "icon.innerContent.*.always_show_icon",
        icon_anim_delay: "icon.innerContent.*.icon_anm_delay",
        content_reveal_icon: "icon.innerContent.*.icon_reveal",
        icon_color: "icon.innerContent.*.color",
        icon_size: "icon.innerContent.*.size",
        ...D4ToD5Background('icon_background_color','icon'),

        title_margin: "title.decoration.spacing.*.margin",
        icon_wrapper_margin: "icon_wrapper.decoration.spacing.*.margin",
        icon_margin: "icon.decoration.spacing.*.margin"
    },
    valueExpansionFunctionMap: {
        title_margin: D4ToD5Spacing,
        icon_wrapper_margin: D4ToD5Spacing,
        icon_margin: D4ToD5Spacing,
        font_icon:D4ToD5Icon
    }
}

