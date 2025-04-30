// External dependencies.
import React from 'react';

// WordPress dependencies
const { __ } = window?.vendor?.wp?.i18n;

// Divi dependencies.
import {
	AdminLabelGroup,
	BackgroundGroup,
	FieldContainer,
	updateAttribute
} from "@divi/module";
import {
	GroupContainer
} from "@divi/modal";
import {
	SelectContainer,
	TextContainer,
	ToggleContainer,
	UploadContainer
} from "@divi/field-library";
import { isEmpty } from "lodash";

export const Content = ( props ) => {
	const { attrs, defaultSettingsAttrs } = props;
	const social_network_data = {
		'': { label: __('Select a Network', 'divi_flash'), value: '', data: { color: '', url: '%1$s' } },
		facebook: { label: __('Facebook', 'divi_flash'), value: 'facebook', data: { color: '#1877F2', url: 'https://www.facebook.com/sharer/sharer.php?u=%1$s' } },
		twitter: { label: __('X', 'divi_flash'), value: 'twitter', data: { color: '#000000', url: 'https://twitter.com/intent/tweet?text=%1$s' } },
		linkedin: { label: __('LinkedIn', 'divi_flash'), value: 'linkedin', data: { color: '#007bb6', url: 'https://www.linkedin.com/shareArticle?mini=true&url=%1$s/&title=&summary=&source=' } },
		pinterest: { label: __('Pinterest', 'divi_flash'), value: 'pinterest', data: { color: '#cb2027', url: 'https://www.pinterest.com/pin/create/button/?url=%1$s&media=' } },
		reddit: { label: __('Reddit', 'divi_flash'), value: 'reddit', data: { color: '#ff4500', url: 'https://www.reddit.com/submit?url=%1$s&title=' } },
		vk: { label: __('VK', 'divi_flash'), value: 'vk', data: { color: '#45668e', url: 'https://vk.com/share.php?url=%1$s' } },
		tumblr: { label: __('Tumblr', 'divi_flash'), value: 'tumblr', data: { color: '#32506d', url: 'https://tumblr.com/share/link?url=%1$s' } },
		digg: { label: __('Digg', 'divi_flash'), value: 'digg', data: { color: '#005be2', url: 'https://digg.com/submit?url=%1$s' } },
		skype: { label: __('Skype', 'divi_flash'), value: 'skype', data: { color: '#12A5F4', url: 'https://web.skype.com/share?url=%1$s' } },
		stumbleupon: { label: __('Stumbleupon', 'divi_flash'), value: 'stumbleupon', data: { color: '#eb4924', url: 'https://www.stumbleupon.com/submit?url=%1$s' } },
		mix: { label: __('Mix', 'divi_flash'), value: 'mix', data: { color: '#f3782b', url: 'https://mix.com/add?url=%1$s' } },
		telegram: { label: __('Telegram', 'divi_flash'), value: 'telegram', data: { color: '#179cde', url: 'https://telegram.me/share/url?url=%1$s&text=' } },
		pocket: { label: __('Pocket', 'divi_flash'), value: 'pocket', data: { color: '#ef3f56', url: 'https://getpocket.com/edit?url=%1$s' } },
		xing: { label: __('XING', 'divi_flash'), value: 'xing', data: { color: '#026466', url: 'https://www.xing.com/spi/shares/new?url=%1$s' } },
		whatsapp: { label: __('WhatsApp', 'divi_flash'), value: 'whatsapp', data: { color: '#25D366', url: 'https://api.whatsapp.com/send?text=**%1$s' } },
		email: { label: __('Email', 'divi_flash'), value: 'email', data: { color: '#ea4335', url: 'mailto:?body=%1$s' } },
		print: { label: __('Print', 'divi_flash'), value: 'print', data: { color: '#aaa', url: '%1$s' } },
		buffer: { label: __('Buffer', 'divi_flash'), value: 'buffer', data: { color: '#000000', url: 'https://buffer.com/add?url=%1$s&text=' } },
		flipboard: { label: __('FlipBoard', 'divi_flash'), value: 'flipboard', data: { color: '#e12828', url: 'https://share.flipboard.com/bookmarklet/popout?v=2&url=%1$s' } },
		line: { label: __('Line', 'divi_flash'), value: 'line', data: { color: '#00c300', url: 'https://social-plugins.line.me/lineit/share?url=%1$s' } },
		myspace: { label: __('MySpace', 'divi_flash'), value: 'myspace', data: { color: '#3b5998', url: 'https://myspace.com/post?u=%1$s' } },
		odnoklassniki: { label: __('Odnoklassniki', 'divi_flash'), value: 'odnoklassniki', data: { color: '#ed812b', url: 'https://connect.ok.ru/dk?st.cmd=WidgetSharePreview&st.shareUrl=%1$s' } },
		weibo: { label: __('Weibo', 'divi_flash'), value: 'weibo', data: { color: '#eb7350', url: 'https://service.weibo.com/share/share.php?url=%1$s' } },
	};

	const social_network_name = attrs?.social_network?.innerContent?.desktop?.value ?? "";

	return (
		<React.Fragment>
			<GroupContainer
				id="main_content"
				title={__( 'Content', 'divi_flash' )}
			>
				<FieldContainer
					attrName="social_network.innerContent"
					label={__( 'Social Network', 'divi_flash' )}
					description={__( 'Choose a social network.', 'divi_flash' )}
					features={{
						sticky: false
					}}
					options={ social_network_data }
					defaultAttr={defaultSettingsAttrs?.social_network?.innerContent}
					onChange={ e => {
						const {
							inputValue,
							moduleId,
							attrName,
							responsiveMode,
							stateMode,
							features
						} = e;
						updateAttribute(inputValue, {
							attrName: attrName,
							features: features,
							moduleId: moduleId,
							responsiveMode: responsiveMode,
							stateMode: stateMode
						});

						// Update admin label
						const admin_label = social_network_data[inputValue]?.label ?? "Social Share Item";
						updateAttribute(admin_label, {
							attrName: "module.meta.adminLabel",
							features: features,
							moduleId: moduleId,
							responsiveMode: responsiveMode,
							stateMode: stateMode
						});

						// Update background color attribute if available
						const backgroundColor = social_network_data[inputValue]?.data?.color ?? "#000000";
						updateAttribute(backgroundColor, {
							attrName: "module.decoration.background",
							attrSubName: "color",
							features: features,
							moduleId: moduleId,
							responsiveMode: responsiveMode,
							stateMode: stateMode
						});
					} }
				>
					<SelectContainer/>
				</FieldContainer>
				{
					!isEmpty( attrs?.social_network?.innerContent?.desktop?.value ) &&
					<FieldContainer
						attrName="use_custom_image_icon.innerContent"
						label={__( 'Use Custom Image Icon', 'divi_flash' )}
						description={__( 'You can add custom image for your icon.', 'divi_flash' )}
						features={{
							sticky: false
						}}
						options={
							{
								off: { label: __( 'No', 'divi_flash' ), value: 'off' },
								on: { label: __( 'Yes', 'divi_flash' ), value: 'on' }
							}
						}
						defaultAttr={defaultSettingsAttrs?.use_custom_image_icon?.innerContent}
					>
						<ToggleContainer/>
					</FieldContainer>
				}
				{
					"on" === attrs?.use_custom_image_icon?.innerContent?.desktop?.value &&
					<FieldContainer
						attrName="src.innerContent"
						label={__( 'Use Custom Image Icon', 'divi_flash' )}
						description={__( 'You can add custom image for your icon.', 'divi_flash' )}
						features={{
							sticky: false,
							dynamicContent: {
								type: "image"
							}
						}}
						options={
							{
								off: { label: __( 'No', 'divi_flash' ), value: 'off' },
								on: { label: __( 'Yes', 'divi_flash' ), value: 'on' }
							}
						}
						defaultAttr={defaultSettingsAttrs?.src?.innerContent}
					>
						<UploadContainer/>
					</FieldContainer>
				}
				{
					!isEmpty( attrs?.social_network?.innerContent?.desktop?.value ) &&
					<FieldContainer
						attrName="custom_label.innerContent"
						label={__( 'Custom Label', 'divi_flash' )}
						description={__( 'This defines the Custom Label.', 'divi_flash' )}
						features={{
							sticky: false
						}}
						defaultAttr={defaultSettingsAttrs?.custom_label?.innerContent}
					>
						<TextContainer/>
					</FieldContainer>
				}

			</GroupContainer>
			<BackgroundGroup
				attrName='module.decoration.background'
				defaultGroupAttr={defaultSettingsAttrs?.module?.decoration?.background?.asMutable( { deep: true } ) ?? {}}
			/>
			<AdminLabelGroup
				defaultGroupAttr={defaultSettingsAttrs?.module.meta?.adminLabel}
			/>
		</React.Fragment>
	);
}