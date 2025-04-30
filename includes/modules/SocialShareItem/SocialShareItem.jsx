import React, {Component, Fragment} from 'react';
import utility from "../../../scripts/df_scripts/utilities";

// Internal Dependencies
import './style.css';

class SocialShareItem extends Component {
    static slug = 'difl_social_share_item';

    static css(props) {
        let additionalCss = [];
        // Icon Background
        utility.df_process_bg({
            props: props,
            additionalCss: additionalCss,
            key: "icon_bg_color",
            selector: `%%order_class%%#difl-social-share-item-wrapper.difl_temp_1.difl_temp_2.difl_social_share_item_wrapper .difl_social_share_icon`,
            important: false,
        });

        // Icon Custom Padding
        const icon_container_padding = props.icon_container_padding ? props.icon_container_padding : '';
        const icon_container_padding_tablet = props.icon_container_padding_tablet ? props.icon_container_padding_tablet : icon_container_padding;
        const icon_container_padding_phone = props.icon_container_padding_phone ? props.icon_container_padding_phone : icon_container_padding_tablet;
        if ( '' !== icon_container_padding || '' !== icon_container_padding_tablet || '' !== icon_container_padding_phone ) {
            additionalCss.push([{
                selector: `%%order_class%%#difl-social-share-item-wrapper.difl_temp_1.difl_temp_2.difl_social_share_item_wrapper .difl_social_share_icon`,
                declaration: `width: auto; height: auto;`,
            }]);
        }

        // Text Container Background
        utility.df_process_bg({
            props: props,
            additionalCss: additionalCss,
            key: "text_container_bg_color",
            selector: `%%order_class%%#difl-social-share-item-wrapper.difl_temp_1.difl_temp_2.difl_social_share_item_wrapper .difl_social_share_content`,
            important: false,
        });

        utility.process_color({
            props           : props,
            key             : "icon_color",
            additionalCss   : additionalCss,
            selector        : `%%order_class%%#difl-social-share-item-wrapper.difl_temp_1.difl_temp_2.difl_social_share_item_wrapper .difl_social_share_icon i:before`,
            type            : "color"
        });
        if( props.use_icon_font_size && 'on' === props.use_icon_font_size ){
            utility.process_range_value({
                props           : props,
                key             : "icon_font_size",
                additionalCss   : additionalCss,
                selector        : `%%order_class%%#difl-social-share-item-wrapper.difl_temp_1.difl_temp_2.difl_social_share_item_wrapper`,
                type            : "--df-ss-icon-font-size"
            });
        }

        /*------ Spacing ------*/
        // Icon
        utility.process_margin_padding({
            props: props,
            key: "icon_container_margin",
            additionalCss: additionalCss,
            selector: `%%order_class%%#difl-social-share-item-wrapper.difl_temp_1.difl_temp_2.difl_social_share_item_wrapper .difl_social_share_icon`,
            type: "margin",
            important: false,
        });
        utility.process_margin_padding({
            props: props,
            key: "icon_container_padding",
            additionalCss: additionalCss,
            selector: `%%order_class%%#difl-social-share-item-wrapper.difl_temp_1.difl_temp_2.difl_social_share_item_wrapper .difl_social_share_icon`,
            type: "padding",
            important: false,
        });
        // Label
        utility.process_margin_padding({
            props: props,
            key: "label_container_margin",
            additionalCss: additionalCss,
            selector: `%%order_class%%#difl-social-share-item-wrapper.difl_temp_1.difl_temp_2.difl_social_share_item_wrapper .difl_social_share_content_container`,
            type: "margin",
            important: false,
        });
        utility.process_margin_padding({
            props: props,
            key: "label_container_padding",
            additionalCss: additionalCss,
            selector: `%%order_class%%#difl-social-share-item-wrapper.difl_temp_1.difl_temp_2.difl_social_share_item_wrapper .difl_social_share_content`,
            type: "padding",
            important: false,
        });

        return additionalCss;
    }

    generate_share_link(network_name){
        const shareLinks = {
            buffer: 'https://buffer.com/add?url=%1$s&text=%2$s',
            facebook: 'https://www.facebook.com/sharer/sharer.php?u=%1$s&title=%2$s',
            flipboard: 'https://share.flipboard.com/bookmarklet/popout?v=2&url=%1$s&title=%2$s',
            line: 'https://social-plugins.line.me/lineit/share?url=%1$s&title=%2$s',
            linkedin: 'https://www.linkedin.com/shareArticle?mini=true&url=%1$s&title=%2$s',
            myspace: 'https://myspace.com/post?u=%1$s&title=%2$s',
            odnoklassniki: 'https://connect.ok.ru/dk?st.cmd=WidgetSharePreview&st.shareUrl=%1$s&title=%2$s',
            pinterest: 'https://pinterest.com/pin/create/button/?url=%1$s&description=%2$s',
            reddit: 'https://www.reddit.com/submit?url=%1$s&title=%2$s',
            skype: 'https://web.skype.com/share?url=%1$s&title=%2$s',
            telegram: 'https://t.me/share/url?url=%1$s&text=%2$s',
            tumblr: 'https://www.tumblr.com/widgets/share/tool?canonicalUrl=%1$s&title=%2$s',
            twitter: 'https://twitter.com/intent/tweet?url=%1$s&text=%2$s',
            vk: 'https://vk.com/share.php?url=%1$s&title=%2$s',
            weibo: 'https://service.weibo.com/share/share.php?url=%1$s&title=%2$s',
            whatsapp: 'https://api.whatsapp.com/send?text=%2$s:+%1$s',
            xing: 'https://www.xing.com/spi/shares/new?url=%1$s&title=%2$s',
        };
        const url = window.location.href;
        const title = document.title;

        if (!shareLinks[network_name]) return '#'; // Fallback if network is not supported
        const encodedUrl = encodeURIComponent(url);
        const encodedTitle = encodeURIComponent(title);
        return shareLinks[network_name]
            .replace('%1$s', encodedUrl)
            .replace('%2$s', encodedTitle);
    }

    process_image_icon() {
        let imageElement = '';
        if (this.props.src){
            const dynamic_src = this.props.dynamic.src;
            if (!dynamic_src.hasValue) return null;
            imageElement = (
                <img
                    src={dynamic_src.value}
                    className="difl_custom_image_icon"
                    alt={this.props.alt || ""}
                />
            );
        }
        return <>{imageElement}</>;
    }

    render() {
        const props = this.props;
        if(undefined === props.social_network || '' === props.social_network) return null;
        const socialNetworkNames = {
            amazon: 'Amazon',
            bandcamp: 'Bandcamp',
            behance: 'Behance',
            bitbucket: 'BitBucket',
            buffer: 'Buffer',
            codepen: 'CodePen',
            deviantart: 'DeviantArt',
            dribbble: 'Dribbble',
            facebook: 'Facebook',
            flikr: 'Flickr',
            flipboard: 'FlipBoard',
            foursquare: 'Foursquare',
            github: 'GitHub',
            goodreads: 'Goodreads',
            google: 'Google',
            houzz: 'Houzz',
            instagram: 'Instagram',
            itunes: 'iTunes',
            last_fm: 'Last.fm',
            line: 'Line',
            linkedin: 'LinkedIn',
            medium: 'Medium',
            meetup: 'Meetup',
            myspace: 'MySpace',
            odnoklassniki: 'Odnoklassniki',
            patreon: 'Patreon',
            periscope: 'Periscope',
            pinterest: 'Pinterest',
            quora: 'Quora',
            reddit: 'Reddit',
            researchgate: 'ResearchGate',
            rss: 'RSS',
            skype: 'Skype',
            snapchat: 'Snapchat',
            soundcloud: 'SoundCloud',
            spotify: 'Spotify',
            steam: 'Steam',
            telegram: 'Telegram',
            tiktok: 'TikTok',
            tripadvisor: 'TripAdvisor',
            tumblr: 'Tumblr',
            twitch: 'Twitch',
            twitter: 'X',
            vimeo: 'Vimeo',
            vk: 'VK',
            weibo: 'Weibo',
            whatsapp: 'WhatsApp',
            xing: 'XING',
            yelp: 'Yelp',
            youtube: 'Youtube',
            digg: 'Digg',
            stumbleupon: 'Stumbleupon',
            pocket: 'Pocket',
            email: 'Email',
            print: 'Print',
	        mix: 'Mix'
        };
        const social_network = props.social_network;
        const social_icon_class = ` df-social-share-${social_network}`;
        const is_fa_icon_class = -1 < window.ETBuilderBackend.socialNetFaIcons.indexOf(social_network) ? ' df-social-share-fa-icon' : '';
        // const url = this.generate_share_link(social_network);

        const { item_view, hover_animation } = window.ETBuilderBackend.i18n.modules.diflSocialShare;
        const share_content_title = undefined !== props.custom_label && '' !== props.custom_label ? props.custom_label : socialNetworkNames[social_network];
        let share_icon = '';
        let share_content = '';
        if( 'iconAndText' === item_view ){
            if('on' === props.use_custom_image_icon && social_network && '' !== social_network){
                share_icon = <div className="difl_social_share_icon">{this.process_image_icon()}</div>;
            }else{
                share_icon = <div className="difl_social_share_icon"><i className={`${is_fa_icon_class} ${social_icon_class}`}></i></div>;
            }

            share_content = <div className="difl_social_share_content_container">
                <div className="difl_social_share_content">
                    <span className="difl_social_share_text">{share_content_title}</span>
                </div>
            </div>;
        }
        if( 'icon' === item_view ) {
            if('on' === props.use_custom_image_icon && social_network && '' !== social_network){
                share_icon = <div className="difl_social_share_icon">{this.process_image_icon()}</div>;
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
		/*------- Tooltip ------*/
	    const tooltip_content = props.field_tooltip_content && props.field_tooltip_content !== '' ? props.field_tooltip_content : "";
		let tooltip_content_data = "";
		if('' !== tooltip_content){
			tooltip_content_data = <noscript>{tooltip_content}</noscript>;
		}
        return (
            <Fragment>
                <a href="#" id="difl-social-share-item-wrapper" className={`difl_temp_1 difl_temp_2 difl_social_share_item_wrapper ${this.props.moduleInfo.orderClassName} ${hover_animation}`}
                   title={socialNetworkNames[social_network]}>
                    {share_icon}
                    {share_content}
	                {tooltip_content_data}
                </a>
            </Fragment>
        );
    }
}

export default SocialShareItem;