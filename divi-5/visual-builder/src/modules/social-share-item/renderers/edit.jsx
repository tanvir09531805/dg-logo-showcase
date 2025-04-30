import React from 'react';

// Divi Dependencies.
import {
	ModuleContainer,
	ElementComponents
} from '@divi/module';
import parentMetadata from "../../social-share/module.json";
import { isEmpty, merge } from "lodash";

const { __ } = window?.vendor?.wp?.i18n;
import { generateDefaultAttrs } from '@divi/module-library';
import { getAttrByMode, mergeAttrs } from '@divi/module-utils';
import { processFontIcon, isFaIcon, findIconInList } from '@divi/icon-library';

import { Styles } from './styles'
import { Classnames } from './classnames'
import { htmlAttributes } from './htmlAttributes'

export const Edit = ( props ) => {
	const {
		attrs,
		elements,
		id,
		name,
		parentAttrs,
		parentDefaultAttrs
	} = props;
	// const utils = window.ET_Builder.API.Utils;
	const parentAttrsWithDefault = mergeAttrs({
		defaultAttrs: parentDefaultAttrs,
		attrs:        parentAttrs,
	});
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
	const fa_icons = [ "amazon", "bandcamp", "telegram", "bitbucket", "behance", "buffer", "codepen", "deviantart", "flipboard", "foursquare", "github", "goodreads", "google", "houzz", "itunes", "last_fm", "line", "medium", "meetup", "odnoklassniki", "patreon", "periscope", "quora", "researchgate", "reddit", "snapchat", "soundcloud", "spotify", "steam", "tripadvisor", "tiktok", "twitch", "vk", "weibo", "whatsapp", "xing", "yelp" ];

	const social_network_name = attrs?.social_network?.innerContent?.desktop?.value ?? "";
	const social_icon_class = !isEmpty(social_network_name) ? ` df-social-share-${social_network_name}` : "";
	const is_fa_icon_class = !isEmpty(social_network_name) && -1 < fa_icons.indexOf(social_network_name) ? ' df-social-share-fa-icon' : '';

	const item_view = getAttrByMode(parentAttrsWithDefault?.settings?.innerContent?.item_view) ?? "iconAndText";
	const url_new_window = getAttrByMode(parentAttrsWithDefault?.settings?.innerContent?.url_new_window) ?? "on";
	const share_content_title = attrs?.custom_label?.innerContent?.desktop?.value ?? social_network_data[social_network_name]?.label;

	const process_image_icon = () => {
		let imageElement = '';
		if (attrs?.src?.innerContent?.desktop?.value){
			const img_src = attrs?.src?.innerContent?.desktop?.value ?? "";
			imageElement = (
				<img
					src={img_src}
					className="difl_custom_image_icon"
					alt={""}
				/>
			);
		}
		return <>{imageElement}</>;
	}

	let share_icon = '';
	let share_content = '';
	if( 'iconAndText' === item_view ){
		if('on' === attrs?.use_custom_image_icon?.innerContent?.desktop?.value && !isEmpty(social_network_name)){
			share_icon = <div className="difl_social_share_icon">{process_image_icon()}</div>;
		} else {
			share_icon =
				<div className="difl_social_share_icon"><i className={`${is_fa_icon_class} ${social_icon_class}`}></i>
				</div>;
		}

		share_content = <div className="difl_social_share_content_container">
			<div className="difl_social_share_content">
				<span className="difl_social_share_text">{share_content_title}</span>
			</div>
		</div>;
	}
	if( 'icon' === item_view ) {
		if('on' === attrs?.use_custom_image_icon?.innerContent?.desktop?.value && !isEmpty(social_network_name)){
			share_icon = <div className="difl_social_share_icon">{process_image_icon()}</div>;
		}else{
			share_icon = <div className="difl_social_share_icon"><i className={`${is_fa_icon_class} ${social_icon_class}`}></i></div>;
		}
	}
	if ('text' === item_view) {
		share_content = <div className="difl_social_share_content_container">
			<div className="difl_social_share_content">
				<span className="difl_social_share_text">{share_content_title}</span>
			</div>
		</div>;
	}

	const get_social_link = (social_name) => {
		if (isEmpty(social_name) || !social_network_data[social_name]) {
			return "#";
		}
		return social_network_data[social_name].data.url.replace('%1$s', window.location.href);
	};

	return (
		<ModuleContainer
			attrs={attrs}
			parentAttrs={parentAttrs}
			elements={elements}
			id={id}
			name={name}
			stylesComponent={Styles}
			classnamesFunction={Classnames}
			htmlAttributesFunction={htmlAttributes}
			tag="a"
			htmlAttrs={{
				id: "difl-social-share-item-wrapper",
				title: isEmpty(social_network_name) ? social_network_data[social_network_name].label : "" ,
				href: get_social_link(social_network_name),
				target: ( 'on' === url_new_window ? '_blank' : '' ),
				role: "link",
				rel: "noopener noreferrer"
			}}
		>
			{elements.styleComponents ( {
				attrName: 'module',
			} )}
			{share_icon}
			{share_content}
		</ModuleContainer>
	);
};