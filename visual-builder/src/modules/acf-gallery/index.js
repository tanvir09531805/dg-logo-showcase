import { ACFGalleryEdit } from './edit';
import metadata from './module.json';
import { conversionOutline } from './conversion-outline';
import { __ } from "@wordpress/i18n";

export const aCFGallery = {
    metadata: metadata,
    renderers: {
        edit: ACFGalleryEdit,
    },
    conversionOutline,
};

function checkVisiblity(props) {
    const attrObj = props.attrName.split('.');
    const attrKey = attrObj[0];
    const attrMeta = metadata.attributes[attrKey] || {};

    const conditions = attrMeta['show_if'] || {};
    const conditions_not = attrMeta['show_if_not'] || {};

    const status_show_if = Object.keys(conditions).every(key => {
        if (key === 'function.isTBLayout') return true;

        const settingVal = props.attrs?.[key]?.innerContent?.desktop?.value;
        const expectedVal = conditions[key];

        if (Array.isArray(expectedVal)) {
            return expectedVal.includes(settingVal);
        } else {
            return settingVal === expectedVal;
        }
    });

    const status_show_if_not = Object.keys(conditions_not).every(key => {
        if (key === 'function.isTBLayout') return true;

        const settingVal = props.attrs?.[key]?.innerContent?.desktop?.value;
        const expectedVal = conditions_not[key];

        if (Array.isArray(expectedVal)) {
            return !expectedVal.includes(settingVal);
        } else {
            return settingVal !== expectedVal;
        }
    });

    return status_show_if && status_show_if_not;
}

const arrowNext = ({ attrs, }) => "on" === attrs.arrow_next_icon_use_icon?.innerContent?.desktop?.value;

//handle innerContent component show_if && show_if_not condition
window.vendor.wp.hooks.addFilter('divi.moduleLibrary.moduleAttributes.difl.acfgallery', 'difl', (attributes, metadata) => {
    Object.entries(attributes).forEach(([key, singleAttr]) => {
        if (singleAttr.show_if || singleAttr.show_if_not) {
            if (singleAttr.settings.innerContent) {
                attributes[key].settings.innerContent.item.visible = checkVisiblity
            }
        }
    });

    // attributes.arrowNextIcon.settings.innerContent.items.arrow_next_icon_icon_size.visible = arrowNext;
    // attributes.arrowNextIcon.settings.decoration.icon.items.arrowNextIcon.component.props.visible = arrowNext;
    // metadata.settings.groups.design_overlay.component.props.visible = (({ attrs }) => (('default_style' === (attrs?.style_type?.innerContent?.desktop?.value ?? "default_style")) && 'off' === (attrs?.enable_alternative_photo?.innerContent?.desktop?.value ?? "off")));

    return attributes;

});
