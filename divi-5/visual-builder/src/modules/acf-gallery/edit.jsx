import React, { useEffect, useRef, useState } from 'react';
const { useFetch } = window?.divi?.rest;
import {
	ModuleContainer,
	ElementComponents,
	ChildModulesContainer
} from '@divi/module';
import { WarningContainer } from "@divi/field-library";

import { Styles } from './styles';
import imagesloaded from "imagesloaded";
import Isotope from "isotope-layout";
import { processFontIcon } from "@divi/icon-library";

export const Edit = ( props ) => {
	const [imageArray, setImageArray] = useState(0);
	const [gallery, setGallery] = useState("");
	const [postID, setPostID] = useState("0");
	console.log( "ACF Edit => ", props );
	const {
		attrs,
		id,
		name,
		elements,
		childrenIds
	} = props;

	const {
		fetch,
		response,
		isLoading,
	} = useFetch( [] );

	const acf_gallery_fields = attrs?.settings?.innerContent?.acf_gallery_fields?.desktop?.value ?? "select_option";
	const fetchAbortRef = useRef();

	useEffect( () => {
		if ( fetchAbortRef.current ) {
			fetchAbortRef.current.abort();
		}

		fetchAbortRef.current = new AbortController();

		const params = new URLSearchParams({
			acf_gallery_fields: JSON.stringify(acf_gallery_fields),
			post_id: postID
		});

		fetch( {
			restRoute: `/difl/v5/acf-gallery/builder/get-image-data?${params.toString()}`,
			method: 'GET',
			signal: fetchAbortRef.current.signal,
		} ).catch( ( error ) => {
			console.error( error );
		} );
		console.log( response )
		return () => {
			if ( fetchAbortRef.current ) {
				fetchAbortRef.current.abort();
			}
		};
	}, [ acf_gallery_fields ] );

	function request_acf__gallery_data(post_id) {
		return "";
		const acf_gallery_fields = attrs?.settings?.innerContent?.acf_gallery_fields?.desktop?.value ?? "select_option";
		const image_size = attrs?.settings?.innerContent?.image_size?.desktop?.value ?? "medium";
		const use_orientation = attrs?.settings?.innerContent?.use_orientation?.desktop?.value ?? "off";
		const image_orientation = attrs?.settings?.innerContent?.image_orientation?.desktop?.value ?? "landscape";

		fetch(window.ETBuilderBackend.ajaxUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: new URLSearchParams({
				action: 'df_acf_gallery',
				et_admin_load_nonce: window.et_fb_options.et_admin_load_nonce,
				acf_gallery_fields: JSON.stringify(acf_gallery_fields),
				image_size: image_size,
				use_orientation: use_orientation,
				image_orientation: image_orientation,
				load_more: _this.props.load_more,
				init_count: _this.props.init_count,
				image_count: _this.props.image_count,
				layout_mode: _this.props.layout_mode,
				show_caption: _this.props.show_caption,
				show_description: _this.props.show_description,
				caption_tag: _this.props.caption_tag,
				description_tag: _this.props.description_tag,
				image_scale: _this.props.image_scale,
				enable_content_position: _this.props.enable_content_position,
				content_position_outside: _this.props.content_position_outside,
				content_position: _this.props.content_position,
				content_reveal_caption: _this.props.content_reveal_caption,
				content_reveal_description: _this.props.content_reveal_description,
				border_anim: _this.props.border_anim,
				border_anm_style: _this.props.border_anm_style,
				overlay: _this.props.overlay,
				field_use_icon: _this.props.field_use_icon,
				field_font_icon: _this.props.field_font_icon,
				content_reveal_icon: _this.props.content_reveal_icon,
				always_show_title: _this.props.always_show_title,
				always_show_description: _this.props.always_show_description,
				use_image_order: _this.props.use_image_order,
				image_order: _this.props.image_order,
				show_pagination: _this.props.show_pagination,
				pagination_img_count: _this.props.pagination_img_count,
				use_number_pagination: _this.props.use_number_pagination,
				older_text: _this.props.older_text,
				newer_text: _this.props.newer_text,
				post_type_arch: _this.props.post_type_arch,
				use_icon_only_at_pagination: _this.props.use_icon_only_at_pagination,
				post_id: post_id
			}),
		})
			.then((res) => res.json())
			.then((result) => {
				if (true === result.success && _this._isMounted) {
					_this.setState({gallery: result.data.gallery, image_array: result.data.image_array, post_id: result.data.post_id });
				}
			})
			.then(function (res) {
				if (_this._isMounted) {
					_this.setState({loading: false});
				}
			})
			.then(() => {
				const grid = _this.wrapper.current.querySelector('.grid');
				let iso;
				imagesloaded(grid, function () {
					iso = new Isotope(grid, {
						layoutMode: _this.props.layout_mode,
						percentPosition: true,
					});
				})
			});

	}

	function render_load_more() {
		const load_more = attrs?.settings?.innerContent?.load_more?.desktop?.value ?? "off";
		const more_btn_use_icon = attrs?.more_btn?.innerContent?.more_btn_use_icon?.desktop?.value ?? "off";
		const load_more_text = attrs?.settings?.innerContent?.load_more_text?.desktop?.value ?? "Load More";

		let icon_class = "";
		let button_icon = "";
		if("on" === more_btn_use_icon) {
			icon_class = " has_icon";
			const more_btn_font_icon = attrs?.more_btn?.innerContent?.more_btn_font_icon?.desktop?.value ?? {type: "divi", unicode: "&#x33;", weight: "400"};
			button_icon = <span className="df-acf-gallery-load-more-icon">
                {processFontIcon( more_btn_font_icon )}
            </span>
		}


		if ( "on" === load_more ) {
			return (
				<div className="df_acf_gallery_button_container">
					<button className={"df-acf-gallery-load-more-btn" + icon_class}>
						{load_more_text}
						{button_icon}
					</button>
				</div>
			);
		}
	}

	function get_pagination_numbers() {
		const paginationImgCount = parseInt(attrs?.settings?.innerContent?.pagination_img_count?.desktop?.value ?? 6);

		return Array.from({length: Math.ceil(imageArray.length / paginationImgCount)}, (_, i) => (
			<a key={i} className={`page-numbers ${0 === i ? 'current' : ''}`} data-page={i + 1}
			   data-count={paginationImgCount} href="#">
				{i + 1}
			</a>
		));
	}

	function render_pagination() {
		if("off" === ( attrs?.settings?.innerContent?.show_pagination?.desktop?.value ?? "off" ) ) return "";

		const iconOnly = "on" === attrs?.settings?.innerContent?.use_icon_only_at_pagination?.desktop?.value ?? "off";
		const older = iconOnly ? '' : attrs?.settings?.innerContent?.older_text?.desktop?.value || 'Older Entries';
		const next = iconOnly ? '' : attrs?.settings?.innerContent?.newer_text?.desktop?.value || 'Next Entries';
		const useNumbers = "on" === attrs?.settings?.innerContent?.use_number_pagination?.desktop?.value ?? "off";

		return (
			<div className={`df-acf-gallery-pagination pagination clearfix ${iconOnly ? 'only_icon' : ''}`}>
				<a className="prev page-numbers" href="#">{older}</a>
				{useNumbers ? get_pagination_numbers(props) : ""}
				<a className="next page-numbers" href="#">{next}</a>
			</div>
		);
	}


	return (
		<ModuleContainer
			attrs={attrs}
			elements={elements}
			id={id}
			name={name}
			stylesComponent={Styles}
			// classnamesFunction={Classnames}
			// scriptDataComponent={ScriptData}
			tag="div"
		>
			{elements.styleComponents( {
				attrName: 'module',
			} )}

			<ElementComponents
				attrs={attrs?.module?.decoration ?? {}}
				id={id}
			/>
			<div className="df_acf_gallery_container">
				{
					"" !== gallery &&
					<div
						className="df_acf_gallery grid"
						style={{ width: "auto", marginLeft: "0px" }}
						dangerouslySetInnerHTML={{__html: gallery}}
					/>
				}
				{
					"" === gallery &&
					<div className="df_acf_gallery grid">
						<h2
							style={{
								background: "#eee",
								paddingTop: "10px",
								paddingBottom: "10px",
								paddingLeft: "20px",
								paddingRight: "20px",
								width:"100%",
								textAlign:"center"
							}}
						>Please add <strong>Data</strong> to continue.
						</h2>
					</div>
				}
				{render_load_more()}
				{render_pagination()}
			</div>
		</ModuleContainer>
	);
}