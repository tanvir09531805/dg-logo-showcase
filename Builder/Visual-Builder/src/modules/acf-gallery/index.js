import metadata from './module.json';
import './styles.scss';
import { Edit } from "./edit";
import {  } from "@divi/module-library";
// import { conversionOutline } from "./conversion-outline";


const sizeFieldVisibleCallback = ({ attrs }) => "off" === ( attrs?.settings?.innerContent?.use_orientation?.desktop?.value ?? 'off');
const imageOrientationFieldVisibleCallback = ({ attrs }) => "on" === ( attrs?.settings?.innerContent?.use_orientation?.desktop?.value ?? 'off');
const load_moreFieldVisibleCallback = ({ attrs }) => ("off" === ( attrs?.settings?.innerContent?.show_pagination?.desktop?.value ?? 'off') && "off" === ( attrs?.settings?.innerContent?.filter_nav?.desktop?.value ?? 'off'));
const loadMoreRelatedFieldVisibleCallback = ({ attrs }) => ("on" === ( attrs?.settings?.innerContent?.load_more?.desktop?.value ?? 'off') && "off" === ( attrs?.settings?.innerContent?.show_pagination?.desktop?.value ?? 'off') && "off" === ( attrs?.settings?.innerContent?.filter_nav?.desktop?.value ?? 'off'));
const show_paginationFieldVisibleCallback = ({ attrs }) => ("off" === ( attrs?.settings?.innerContent?.load_more?.desktop?.value ?? 'off') && "off" === ( attrs?.settings?.innerContent?.filter_nav?.desktop?.value ?? 'off'));
const showPaginationRelatedFieldVisibleCallback = ({ attrs }) => ("on" === ( attrs?.settings?.innerContent?.show_pagination?.desktop?.value ?? 'off') && "off" === ( attrs?.settings?.innerContent?.load_more?.desktop?.value ?? 'off') && "off" === ( attrs?.settings?.innerContent?.filter_nav?.desktop?.value ?? 'off'));
const paginationUseIconRelatedFieldVisibleCallback = ({ attrs }) => ("off" === ( attrs?.settings?.innerContent?.use_icon_only_at_pagination?.desktop?.value ?? 'off') && "on" === ( attrs?.settings?.innerContent?.show_pagination?.desktop?.value ?? 'off') && "off" === ( attrs?.settings?.innerContent?.load_more?.desktop?.value ?? 'off') && "off" === ( attrs?.settings?.innerContent?.filter_nav?.desktop?.value ?? 'off'));

const use_urlFieldVisibleCallback = ({ attrs }) => "on" === ( attrs?.settings?.innerContent?.use_url?.desktop?.value ?? 'off');
const use_urlOffFieldVisibleCallback = ({ attrs }) => "off" === ( attrs?.settings?.innerContent?.use_url?.desktop?.value ?? 'off');
const useLightBoxFieldVisibleCallback = ({ attrs }) => ( "off" === ( attrs?.settings?.innerContent?.use_url?.desktop?.value ?? 'off') && "on" === ( attrs?.settings?.innerContent?.use_lightbox?.desktop?.value ?? 'off') );
const overlayFieldVisibleCallback = ({ attrs }) => "on" === ( attrs?.hover?.innerContent?.overlay?.desktop?.value ?? 'off');
const overlayUseIconFieldVisibleCallback = ({ attrs }) => ( "on" === ( attrs?.hover?.innerContent?.overlay?.desktop?.value ?? 'off') && "on" === ( attrs?.hover?.innerContent?.field_use_icon?.desktop?.value ?? 'off'));
const overlayBorderAminFieldVisibleCallback = ({ attrs }) => "on" === ( attrs?.hover?.innerContent?.border_anim?.desktop?.value ?? 'off');
const showCaptionFieldVisibleCallback = ({ attrs }) => ( "on" === ( attrs?.hover?.innerContent?.show_caption?.desktop?.value ?? 'off') && "off" === ( attrs?.hover?.innerContent?.enable_content_position?.desktop?.value ?? 'off') );
const contentRevealCaptionFieldVisibleCallback = ({ attrs }) => ( "on" === ( attrs?.hover?.innerContent?.show_caption?.desktop?.value ?? 'off') && "off" === ( attrs?.hover?.innerContent?.enable_content_position?.desktop?.value ?? 'off') && "off" === ( attrs?.hover?.innerContent?.always_show_title?.desktop?.value ?? 'off') );
const showDescriptionFieldVisibleCallback = ({ attrs }) => ( "on" === ( attrs?.hover?.innerContent?.show_description?.desktop?.value ?? 'off') && "off" === ( attrs?.hover?.innerContent?.enable_content_position?.desktop?.value ?? 'off') );
const contentRevealDescriptionFieldVisibleCallback = ({ attrs }) => ( "on" === ( attrs?.hover?.innerContent?.show_description?.desktop?.value ?? 'off') && "off" === ( attrs?.hover?.innerContent?.enable_content_position?.desktop?.value ?? 'off') && "off" === ( attrs?.hover?.innerContent?.always_show_description?.desktop?.value ?? 'off') );
const enableContentPositionFieldVisibleCallback = ({ attrs }) => "on" === ( attrs?.hover?.innerContent?.enable_content_position?.desktop?.value ?? 'off');
const enableContentPositionOffFieldVisibleCallback = ({ attrs }) => "off" === ( attrs?.hover?.innerContent?.enable_content_position?.desktop?.value ?? 'off');
const imageScaleHoverFieldVisibleCallback = ({ attrs }) => ['c4-image-rotate-left', 'c4-image-rotate-right'].includes(attrs?.hover?.innerContent?.image_scale?.desktop?.value ?? 'no-image-scale');
const loadMoreUseIconFieldVisibleCallback = ({ attrs }) => "on" === ( attrs?.more_btn?.innerContent?.more_btn_use_icon?.desktop?.value ?? 'off');
const loadMoreFieldVisibleCallback = ({ attrs }) => "on" === ( attrs?.settings?.innerContent?.load_more?.desktop?.value ?? 'off');
const showPaginationFieldVisibleCallback = ({ attrs }) => "on" === ( attrs?.settings?.innerContent?.show_pagination?.desktop?.value ?? 'off');

window.vendor.wp.hooks.addFilter( 'divi.moduleLibrary.moduleAttributes.difl.acf-gallery', 'difl', ( attributes, metadata ) => {


	attributes.settings.settings.innerContent.items.acf_gallery_fields.component.props.options = diflVBLocalData.acf_gallery.acf_gallery_fields;
	attributes.settings.settings.innerContent.items.image_size.component.props.options = diflVBLocalData.acf_gallery.registered_image_size;

	attributes.settings.settings.innerContent.items.image_size.visible = sizeFieldVisibleCallback;
	attributes.settings.settings.innerContent.items.image_orientation.visible = imageOrientationFieldVisibleCallback;

	attributes.settings.settings.innerContent.items.load_more.visible = load_moreFieldVisibleCallback;
	attributes.settings.settings.innerContent.items.init_count.visible = loadMoreRelatedFieldVisibleCallback;
	attributes.settings.settings.innerContent.items.image_count.visible = loadMoreRelatedFieldVisibleCallback;
	attributes.settings.settings.innerContent.items.load_more_text.visible = loadMoreRelatedFieldVisibleCallback;
	attributes.more_btn.settings.decoration.more_btn_data.items.spinner_color.visible = loadMoreRelatedFieldVisibleCallback;

	attributes.settings.settings.innerContent.items.show_pagination.visible = show_paginationFieldVisibleCallback;
	attributes.settings.settings.innerContent.items.pagination_img_count.visible = showPaginationRelatedFieldVisibleCallback;
	attributes.settings.settings.innerContent.items.use_number_pagination.visible = showPaginationRelatedFieldVisibleCallback;
	attributes.settings.settings.innerContent.items.use_icon_only_at_pagination.visible = showPaginationRelatedFieldVisibleCallback;
	attributes.settings.settings.innerContent.items.older_text.visible = paginationUseIconRelatedFieldVisibleCallback;
	attributes.settings.settings.innerContent.items.newer_text.visible = paginationUseIconRelatedFieldVisibleCallback;
	attributes.settings.settings.innerContent.items.url_target.visible = use_urlFieldVisibleCallback;
	attributes.settings.settings.innerContent.items.use_lightbox.visible = use_urlOffFieldVisibleCallback;
	attributes.settings.settings.innerContent.items.use_lightbox_download.visible = useLightBoxFieldVisibleCallback;
	attributes.settings.settings.innerContent.items.use_lightbox_content.visible = useLightBoxFieldVisibleCallback;

	attributes.hover.settings.innerContent.items.overlay_primary.visible = overlayFieldVisibleCallback;
	attributes.hover.settings.innerContent.items.overlay_secondary.visible = overlayFieldVisibleCallback;
	attributes.hover.settings.innerContent.items.overlay_direction.visible = overlayFieldVisibleCallback;
	attributes.hover.settings.innerContent.items.field_use_icon.visible = overlayFieldVisibleCallback;
	attributes.hover.settings.innerContent.items.field_font_icon.visible = overlayUseIconFieldVisibleCallback;
	attributes.hover.settings.innerContent.items.field_icon_color.visible = overlayUseIconFieldVisibleCallback;
	attributes.hover.settings.innerContent.items.field_icon_size.visible = overlayUseIconFieldVisibleCallback;
	attributes.hover.settings.innerContent.items.field_icon_placement.visible = overlayUseIconFieldVisibleCallback;
	attributes.hover.settings.innerContent.items.field_icon_alignment.visible = overlayUseIconFieldVisibleCallback;
	attributes.hover.settings.innerContent.items.content_reveal_icon.visible = overlayUseIconFieldVisibleCallback;
	attributes.hover.settings.innerContent.items.anm_border_color.visible = overlayBorderAminFieldVisibleCallback;
	attributes.hover.settings.innerContent.items.anm_border_width.visible = overlayBorderAminFieldVisibleCallback;
	attributes.hover.settings.innerContent.items.anm_border_margin.visible = overlayBorderAminFieldVisibleCallback;
	attributes.hover.settings.innerContent.items.border_anm_style.visible = overlayBorderAminFieldVisibleCallback;

	attributes.hover.settings.innerContent.items.always_show_title.visible = showCaptionFieldVisibleCallback;
	attributes.hover.settings.innerContent.items.content_reveal_caption.visible = contentRevealCaptionFieldVisibleCallback;
	attributes.hover.settings.innerContent.items.always_show_description.visible = showDescriptionFieldVisibleCallback;
	attributes.hover.settings.innerContent.items.content_reveal_description.visible = contentRevealDescriptionFieldVisibleCallback;
	attributes.hover.settings.innerContent.items.content_position_outside.visible = enableContentPositionFieldVisibleCallback;
	attributes.hover.settings.innerContent.items.content_position.visible = enableContentPositionOffFieldVisibleCallback;
	attributes.hover.settings.innerContent.items.image_scale_hover.visible = imageScaleHoverFieldVisibleCallback;

	attributes.more_btn.settings.decoration.more_btn_data.items.more_btn_font_icon.visible = loadMoreUseIconFieldVisibleCallback;
	attributes.more_btn.settings.decoration.more_btn_data.items.more_btn_icon_size.visible = loadMoreUseIconFieldVisibleCallback;

	metadata.settings.groups.more_btn.component.props.visible = loadMoreFieldVisibleCallback;
	metadata.settings.groups.pagination.component.props.visible = showPaginationFieldVisibleCallback;
	metadata.settings.groups.active_pagination.component.props.visible = showPaginationFieldVisibleCallback;

	return attributes;
})

export const acfGallery = {
	metadata: metadata,
	renderers: {
		edit: Edit,
	},
	// conversionOutline
};