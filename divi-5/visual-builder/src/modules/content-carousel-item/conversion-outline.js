import { convertBackground, convertIcon, convertSpacing } from '../../../scripts/content-carousel';

const processConversionOutlineData = () => {

    const processModuleData = () => {
        const general_field = {
            title: "title.innerContent.*",
            sub_title: "subTitle.innerContent.*",
            content: "content.innerContent.*",
            title_tag: "title.decoration.font.*.headingLevel",
            subtitle_tag: "subTitle.decoration.font.*.headingLevel",
            df_cci_image: "useImage.innerContent.*.src",
            df_cci_alt_text: "useImage.innerContent.*.alt",
            df_cci_use_icon: "imageIcon.innerContent.*.useIcon",
            df_cci_font_icon: "useIcon.decoration.icon.*",
            df_cci_icon_color: "useIcon.decoration.icon.*.color",
            df_cci_icon_size: "useIcon.decoration.sizing.*",
            df_cci_icon_align: "useIcon.decoration.*.alignment",
            df_cci_image_align: "useImage.decoration.imageAlignment.*",
            df_cci_full_width: "useImage.decoration.fullWidth.*",
            df_cci_max_width: "useImage.decoration.maxWidth.*",
            df_cci_icon_bg: "useIcon.decoration.background.*",
            df_cci_circle_icon: "useIcon.decoration.*.circleIcon",
            df_title_bg: "title.decoration.background.*",
            df_subtitle_bg: "subTitle.decoration.background.*",
            df_content_bg: "content.decoration.background.*",
            cc_button_button_text: "button.innerContent.*.text",
            cc_button_button_url: "button.innerContent.*.linkUrl",
            cc_button_button_url_new_window: "button.innerContent.*.linkTarget",
            image_order: "imgOrder.innerContent.*",
            title_order: "titleOrder.innerContent.*",
            subtitle_order: "subTitleOrder.innerContent.*",
            content_order: "contentOrder.innerContent.*",
            button_order: "btnOrder.innerContent.*",
    
            cc_button_button_align: "button.decoration.button.*.alignment",
            button_margin: "button.decoration.spacing.*.margin",
            button_padding: "button.decoration.spacing.*.padding",
            df_button_bg: "button.decoration.background.*",
            btn_use_icon: "button.decoration.button.*.enable",
            btn_font_icon: "button.decoration.button.*.icon.settings",
            btn_icon_color: "button.decoration.button.*.icon.color",
            btn_icon_placement: "button.decoration.button.*.icon.placement",
            btn_icon_show_hover: "button.decoration.button.*.icon.onHover",
            btn_icon_font_size: "btnIconSizeMargin.decoration.sizing.*",
            btn_icon_margin: "btnIconSizeMargin.decoration.spacing.*.margin",
            button_wrapper_margin: "button.decoration.spacing.*.margin",
            button_wrapper_padding: "button.decoration.spacing.*.padding",
    
    
            item_wrapper_margin: "cWrapItem.decoration.spacing.*.margin",
            item_wrapper_padding: "cWrapItem.decoration.spacing.*.padding",
            image_wrapper_margin: "cWrapImage.decoration.spacing.*.margin",
            image_wrapper_padding: "cWrapImage.decoration.spacing.*.padding",
            image_margin: "useImage.decoration.spacing.*.margin",
            icon_wrapper_margin: "useIcon.decoration.spacing.*.margin",
            icon_wrapper_padding: "useIcon.decoration.spacing.*.padding",
            title_margin: "title.decoration.spacing.*.margin",
            title_padding: "title.decoration.spacing.*.padding",
            subtitle_margin: "subTitle.decoration.spacing.*.margin",
            subtitle_padding: "subTitle.decoration.spacing.*.padding",
            content_margin: "content.decoration.spacing.*.margin",
            content_padding: "content.decoration.spacing.*.padding"
        }
        const title_bg = convertBackground( 'df_title_bg', 'title' );
		const icon_bg  = convertBackground( 'df_cci_icon_bg', 'useIcon' );

		return {
            ...general_field, 
            ...title_bg,
            ...icon_bg 
        };
    }

    return {
        advanced: {
            admin_label: "module.meta.adminLabel",
            background: "module.decoration.background",
            fonts: {
                cc_title: "title.decoration.font",
                cc_subtitle: "subTitle.decoration.font",
                cc_content: "content.decoration.font",
                button: "button.decoration.font",
                // df_content_inherit: "df_content_inherit.decoration.font",
                // content_heading_1: "content_heading_1.decoration.font"
            },
            borders: {
                default: "module.decoration.border",
                // image_wrapper_border: "image_wrapper_border.decoration.border",
                // icon_wrapper_border: "icon_wrapper_border.decoration.border",
                button: "button.decoration.border"
            },
            box_shadow: {
                default: "module.decoration.boxShadow"
            },
            filters: {
                default: "module.decoration.filters"
            }
        },
        module: processModuleData(),
        valueExpansionFunctionMap: {
            df_cci_font_icon: convertIcon,
            btn_font_icon: convertIcon,
            btn_icon_margin: convertSpacing,

            button_wrapper_margin: convertSpacing,
            button_wrapper_padding: convertSpacing,
            button_margin: convertSpacing,
            button_padding: convertSpacing,
            item_wrapper_margin: convertSpacing,
            item_wrapper_padding: convertSpacing,
            image_wrapper_margin: convertSpacing,
            image_wrapper_padding: convertSpacing,
            image_margin: convertSpacing,
            icon_wrapper_margin: convertSpacing,
            icon_wrapper_padding: convertSpacing,
            title_margin: convertSpacing,
            title_padding: convertSpacing,
            subtitle_margin: convertSpacing,
            subtitle_padding: convertSpacing,
            content_margin: convertSpacing,
            content_padding: convertSpacing
        }
    }
    
}
export const conversionOutline = processConversionOutlineData();