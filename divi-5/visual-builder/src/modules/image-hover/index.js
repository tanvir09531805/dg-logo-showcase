import {ImageHoverEdit} from './edit';
import metadata from './module.json';
import {conversionOutline} from './conversion-outline';
import {__} from "@wordpress/i18n";

export const imageHoverMetadata = metadata;

export const imageHover = {
    renderers: {
        edit: ImageHoverEdit,
    },
    conversionOutline,
};


//handle innerContent component show_if && show_if_not condition
window.vendor.wp.hooks.addFilter(
    'divi.moduleLibrary.moduleAttributes.difl.imagehover',
    'difl',
    (attributes, metadata) => {
        //enable icon
        attributes.icon.settings.innerContent.items.icon['visible'] = (({attrs}) => 'on' === attrs?.icon?.innerContent?.desktop?.value?.enable)
        attributes.icon.settings.innerContent.items.color['visible'] = (({attrs}) => 'on' === attrs?.icon?.innerContent?.desktop?.value?.enable)
        attributes.icon.settings.innerContent.items.size['visible'] = (({attrs}) => 'on' === attrs?.icon?.innerContent?.desktop?.value?.enable)

        //overlay
        attributes.overlay.settings.innerContent.items.primary_color['visible'] = (({attrs}) => 'on' === attrs?.overlay?.innerContent?.desktop?.value?.useOverlay)
        attributes.overlay.settings.innerContent.items.secondary_color['visible'] = (({attrs}) => 'on' === attrs?.overlay?.innerContent?.desktop?.value?.useOverlay)
        attributes.overlay.settings.innerContent.items.direction['visible'] = (({attrs}) => 'on' === attrs?.overlay?.innerContent?.desktop?.value?.useOverlay)

        //border anim
        attributes.border_anim.settings.innerContent.items.color['visible'] = (({attrs}) => 'on' === attrs?.border_anim?.innerContent?.desktop?.value?.enable)
        attributes.border_anim.settings.innerContent.items.margin['visible'] = (({attrs}) => 'on' === attrs?.border_anim?.innerContent?.desktop?.value?.enable)
        attributes.border_anim.settings.innerContent.items.width['visible'] = (({attrs}) => 'on' === attrs?.border_anim?.innerContent?.desktop?.value?.enable)
        attributes.border_anim.settings.innerContent.items.anm_style['visible'] = (({attrs}) => 'on' === attrs?.border_anim?.innerContent?.desktop?.value?.enable)

        //image scale
        attributes.image.settings.innerContent.items.scale_hover['visible'] = (({attrs}) => ('c4-image-rotate-left' === attrs?.image?.innerContent?.desktop?.value?.scale_type || 'c4-image-rotate-right' === attrs?.image?.innerContent?.desktop?.value?.scale_type))

        // hover
        attributes.title.settings.innerContent.items.title_reveal['visible'] = (({attrs}) => ('off' === attrs?.title?.innerContent?.desktop?.value?.always_show_title))
        attributes.title.settings.innerContent.items.title_anm_delay['visible'] = (({attrs}) => ('off' === attrs?.title?.innerContent?.desktop?.value?.always_show_title))

        // hover
        attributes.icon.settings.innerContent.items.icon_reveal['visible'] = (({attrs}) => ('off' === attrs?.icon?.innerContent?.desktop?.value?.always_show_icon))
        attributes.icon.settings.innerContent.items.icon_anm_delay['visible'] = (({attrs}) => ('off' === attrs?.icon?.innerContent?.desktop?.value?.always_show_icon))

        return attributes;
    }
);

// window.vendor.wp.hooks.addFilter(
//     'divi.moduleLibrary.moduleSettings.groups.difl',
//     'difl',
//     (groups, metadata) => {
//         console.log('groups=>',groups);
//
//         return groups;
//     }
// );
