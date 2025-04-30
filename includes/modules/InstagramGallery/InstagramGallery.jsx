// External Dependencies
import React, { Component } from 'react';
import axios from 'axios';
import utility from '../../../scripts/df_scripts/utilities';
// Internal Dependencies
// import '../../../assets/styles/lib/df_hover.css';
import imagesloaded from 'imagesloaded';
import Isotope from 'isotope-layout';
import './style.css';

class InstagramGallery extends Component {
    static slug = 'difl_instagramgallery';
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            slider: null,
            loading: true,
            props: this.props,
            items: null,
            error: false,
            error_msg: ''
        }
        this.wrapper = React.createRef();
        this.requestgallery = this.requestgallery.bind(this);
        this.loading_data = this.loading_data.bind(this);
        this.computedType = ['item_limit', 'instagram_client_id', 'instagram_client_secret',
            'instagram_post_only_image', 'autoplay_video', 'show_instagram_user_info', 'instagram_user_profile_picture',
            'instagram_username_text', 'instagram_icon', 'instagram_icon_enable', 'use_icon', 'hover_icon', 'date_formate', 'show_caption',
            'always_show_title', 'content_position', 'content_reveal_caption', 'image_to_display', 'load_more',
            'image_count', 'layout_mode', 'caption_tag', 'image_scale', 'border_anim', 'border_anm_style', 'overlay', 'init_count']
    }

    componentDidMount() {
        this._isMounted = true;
        if (this.state.loading === true) {
            this.setState({ loading: false });
            this.requestgallery();
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidUpdate(prevProps, prevState) {
        const _this = this;
        var user_token_changed = false;


        if (this.props.instagram_user_token !== this.state.props.instagram_user_token) {
            this.loading_data(true);
        }

        for (const index in _this.state.props) {
            if (_this.props[index] !== _this.state.props[index]) {
                if (_this.computedType.includes(index)) {
                    _this.loading_data()
                }
            }
        }
    }

    loading_data(user_token_changed = false) {
        this.setState({
            props: this.props,
            loading: true,
            error: false
        })
        this.requestgallery(user_token_changed);
    }
    getUniqueClass(slug) {
        const selector = '.' + slug + '[data-address="' + this.props.moduleInfo.address + '"]';
        const classesList = document.querySelector(selector).classList;
        var unique_module_name = ''
        for (var i = 0; i < classesList.length; i++) {
            var matches = /^difl_instagramgallery\_(.+)/.exec(classesList[i]);

            if (matches != null) {
                unique_module_name = matches[0];
            }
        }
        return unique_module_name;
    }
    requestgallery(user_token_changed) {
        const _this = this;
        const utils = window.ET_Builder.API.Utils;
        const instagram_icon = this.props.instagram_icon_enable === 'on' && this.props.instagram_icon ?
            utils.processFontIcon(this.props.instagram_icon) : '4';
        const hover_icon = this.props.use_icon === 'on' && this.props.hover_icon ?
            utils.processFontIcon(this.props.hover_icon) : '4';
        const order_number = this.props.moduleInfo.address.replace(/\D/g, '');

        const unique_module_name = this.getUniqueClass(this.props.moduleInfo.type);

        axios({
            method: 'post',
            url: window.ETBuilderBackend.ajaxUrl,
            params: {
                action: 'df_instagram_gallery'
            },
            data: {
                et_admin_load_nonce: window.et_fb_options.et_admin_load_nonce,
                instagramClientID: _this.props.instagram_client_id,
                instagramClientSecret: _this.props.instagram_client_secret,
                instagramUserToken: _this.props.instagram_user_token,
                item_limit: _this.props.item_limit,
                instagram_post_only_image: _this.props.instagram_post_only_image,
                autoplay_video: _this.props.autoplay_video,
                cache_time: _this.props.cache_time ? _this.props.cache_time : '-1',
                cache_time_type: _this.props.cache_time_type ? _this.props.cache_time_type : 'minute',
                image_size: _this.props.image_size,
                filter_nav: _this.props.filter_nav,
                load_more: _this.props.load_more,
                init_count: _this.props.init_count,
                image_count: _this.props.image_count,
                layout_mode: _this.props.layout_mode,
                show_caption: _this.props.show_caption,
                show_instagram_user_info: _this.props.show_instagram_user_info,
                instagram_user_profile_picture: _this.props.instagram_user_profile_picture ? _this.props.instagram_user_profile_picture : '',
                instagram_username_text: _this.props.instagram_username_text ? _this.props.instagram_username_text : '',
                date_formate: _this.props.date_formate,
                instagram_icon_enable: _this.props.instagram_icon_enable,
                instagram_icon: instagram_icon,
                use_icon: _this.props.use_icon,
                hover_icon: hover_icon,
                caption_tag: _this.props.caption_tag,
                image_scale: _this.props.image_scale,
                content_position: _this.props.content_position,
                content_reveal_caption: _this.props.content_reveal_caption,
                content_reveal_description: _this.props.content_reveal_description,
                border_anim: _this.props.border_anim,
                border_anm_style: _this.props.border_anm_style,
                overlay: _this.props.overlay,
                always_show_title: _this.props.always_show_title,
                unique_module_name: unique_module_name,
                user_token_changed: user_token_changed
            }
        })

            .then((response) => {
                if (_this._isMounted) {
                    if (response.data.data.error) {
                        _this.setState({
                            error: true,
                            error_msg: response.data.data.error.msg
                        });
                    }

                    if (response.data.data !== undefined) {

                        _this.setState({
                            items: response.data.data
                        });
                    }
                }
            })
            .then((res) => {
                if (_this._isMounted) {
                    _this.setState({
                        loading: false
                    });
                }
            })
            .then(() => {
                var grid = _this.wrapper.current.querySelector('.grid');
                var iso;
                imagesloaded(grid, function () {
                    iso = new Isotope(grid, {
                        layoutMode: _this.props.layout_mode,
                        percentPosition: true
                    });
                })
            });

    }

    static css(props) {
        const additionalCss = [];
        if (props.image_to_display) {
            const image_width = 100 / props.image_to_display;
            const image_width_tablet = props.image_to_display_tablet ?
                100 / props.image_to_display_tablet : image_width;
            const image_width_phone = props.image_to_display_phone ?
                100 / props.image_to_display_phone : image_width_tablet;
            additionalCss.push([{
                selector: '%%order_class%% .grid-sizer, %%order_class%% .grid-item',
                declaration: `width: ${image_width}%;`,
            }]);
            additionalCss.push([{
                selector: '%%order_class%% .grid-sizer, %%order_class%% .grid-item',
                declaration: `width: ${image_width_tablet}%;`,
                'device': 'tablet'
            }]);
            additionalCss.push([{
                selector: '%%order_class%% .grid-sizer, %%order_class%% .grid-item',
                declaration: `width: ${image_width_phone}%;`,
                'device': 'phone'
            }]);
        }
        // loading icon color
        utility.process_color({
            'props': props,
            'key': 'spinner_color',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .ing-load-more-btn .spinner svg',
            'type': 'fill'
        });
        if ('on' === props.show_instagram_user_info) {
            if ('on' === props.user_info_show_at_bottom) {
                additionalCss.push([{
                    selector: "%%order_class%% .df_ing_container .item-content",
                    declaration: `flex-direction: column-reverse;`,
                }]);
            }
            if ('on' === props.instagram_icon_enable) {
                utility.process_color({
                    'props': props,
                    'key': 'instagram_icon_color',
                    'additionalCss': additionalCss,
                    'selector': '%%order_class%% .df-instagram-feed-icon .et-pb-icon',
                    'type': 'color',
                });

                utility.process_range_value({
                    'props': props,
                    'key': 'instagram_icon_size',
                    'additionalCss': additionalCss,
                    'selector': '%%order_class%% .df-instagram-feed-icon .et-pb-icon',
                    'type': 'font-size',
                    'unit': 'px'
                });
                utility.process_range_value({
                    'props': props,
                    'key': 'instagram_user_section_width',
                    'additionalCss': additionalCss,
                    'selector': '%%order_class%% a.df-instagram-user',
                    'type': 'flex-basis',
                    'default_value': '70%',
                });
            } else {

                additionalCss.push([{
                    selector: "%%order_class%% a.df-instagram-user",
                    declaration: `flex-basis:  100%;`,
                }]);
            }

            const key = 'instagram_user_section_width';
            const type = 'flex-basis';
            const desktop = props[key] && props[key] !== '' ? props[key] : '20%';
            const tablet = props[key + '_tablet'] && props[key + '_tablet'] !== '' ? props[key + '_tablet'] : desktop;
            const phone = props[key + '_phone'] && props[key + '_phone'] !== '' ? props[key + '_phone'] : tablet;


            if (desktop && '' !== desktop) {
                additionalCss.push([{
                    selector: "%%order_class%% a.df-instagram-feed-icon",
                    declaration: `${type}:  calc(100% -  ${desktop});`,
                }]);
            }
            if (tablet && '' !== tablet) {
                additionalCss.push([{
                    selector: "%%order_class%% a.df-instagram-feed-icon",
                    declaration: `${type}:  calc(100% -  ${tablet});`,
                    'device': 'tablet',
                }]);
            }
            if (phone && '' !== phone) {

                additionalCss.push([{
                    selector: "%%order_class%% a.df-instagram-feed-icon",
                    declaration: `${type}:  calc(100% -  ${phone});`,
                    'device': 'phone'
                }]);
            }

            if (props.instagram_icon_position) {
                additionalCss.push([{
                    selector: '%%order_class%% .df-instagram-user-info',
                    declaration: `align-items: ${props.instagram_icon_position};`,
                }]);
            }

            utility.process_range_value({
                'props': props,
                'key': 'user_profile_picture_width',
                'additionalCss': additionalCss,
                'selector': '%%order_class%% .df-instagram-user-profile-picture',
                'type': 'width',
                'unit': 'px'
            });

            utility.df_process_string_attr({
                'props': props,
                'key': 'instagram_icon_alignment',
                'additionalCss': additionalCss,
                'selector': '%%order_class%% a.df-instagram-feed-icon',
                'type': 'text-align',
                'default_value': 'right'
            });
            utility.df_process_string_attr({
                'props': props,
                'key': 'instagram_username_align',
                'additionalCss': additionalCss,
                'selector': '%%order_class%% span.df-instagram-user-name',
                'type': 'text-align',
                'default_value': 'left'
            });
            utility.df_process_string_attr({
                'props': props,
                'key': 'instagram_post_date_align',
                'additionalCss': additionalCss,
                'selector': '%%order_class%% span.df-instagram-postdate',
                'type': 'text-align',
                'default_value': 'left'
            });

            utility.df_process_bg({
                'props': props,
                'key': 'user_info_bg',
                'additionalCss': additionalCss,
                'selector': '%%order_class%% .df-instagram-user-info',
            });


            utility.process_margin_padding({
                'props': props,
                'key': 'instagram_user_info_padding',
                'additionalCss': additionalCss,
                'selector': '%%order_class%% .df-instagram-user-info',
                'type': 'padding'
            });
            utility.process_margin_padding({
                'props': props,
                'key': 'instagram_user_profile_picture_margin',
                'additionalCss': additionalCss,
                'selector': '%%order_class%% .df-instagram-user-profile-picture',
                'type': 'margin'
            });
            utility.process_margin_padding({
                'props': props,
                'key': 'instagram_user_profile_picture_padding',
                'additionalCss': additionalCss,
                'selector': '%%order_class%% .df-instagram-user-profile-picture',
                'type': 'padding'
            });

            utility.process_margin_padding({
                'props': props,
                'key': 'instagram_post_date_margin',
                'additionalCss': additionalCss,
                'selector': '%%order_class%% .df-instagram-postdate',
                'type': 'margin'
            });

            utility.process_margin_padding({
                'props': props,
                'key': 'instagram_user_name_margin',
                'additionalCss': additionalCss,
                'selector': '%%order_class%% .df-instagram-user-name',
                'type': 'margin'
            });

            utility.process_margin_padding({
                'props': props,
                'key': 'instagram_icon_margin',
                'additionalCss': additionalCss,
                'selector': '%%order_class%% .et-pb-icon.instagram_icon',
                'type': 'margin'
            });
        }

        if (props.use_icon === 'on') {
            utility.process_color({
                'props': props,
                'key': 'hover_icon_color',
                'additionalCss': additionalCss,
                'selector': '%%order_class%% .et-pb-icon.hover_icon',
                'type': 'color',
            });

            utility.process_range_value({
                'props': props,
                'key': 'hover_icon_size',
                'additionalCss': additionalCss,
                'selector': '%%order_class%% .et-pb-icon.hover_icon',
                'type': 'font-size',
                'unit': 'px'
            });
        }
        if (props.item_gutter !== '') {
            utility.process_range_value({
                'props': props,
                'key': 'item_gutter',
                'additionalCss': additionalCss,
                'selector': '%%order_class%% .grid .grid-item',
                'type': 'padding-left',
                'unit': 'px'
            });
            utility.process_range_value({
                'props': props,
                'key': 'item_gutter',
                'additionalCss': additionalCss,
                'selector': '%%order_class%% .grid .grid-item',
                'type': 'padding-bottom',
                'unit': 'px'
            });
            utility.process_range_value({
                'props': props,
                'key': 'item_gutter',
                'additionalCss': additionalCss,
                'selector': '%%order_class%% .grid',
                'type': 'margin-left',
                'unit': 'px',
                'negative': true
            });
        }
        if (props.image_scale === 'c4-image-rotate-left') {
            additionalCss.push([{
                selector: '%%order_class%% .c4-image-rotate-left:hover img, %%order_class%% :focus.c4-image-rotate-left img',
                declaration: `transform: scale(${props.image_scale_hover}) rotate(-15deg);`,
            }]);
        }
        if (props.image_scale === 'c4-image-rotate-right') {
            additionalCss.push([{
                selector: '%%order_class%% .c4-image-rotate-right:hover img, %%order_class%% :focus.c4-image-rotate-right img',
                declaration: `transform: scale(${props.image_scale_hover}) rotate(15deg);`,
            }]);
        }
        if (props.fliter_align && props.fliter_align !== '') {
            additionalCss.push([{
                selector: '%%order_class%% .df_filter_buttons',
                declaration: `text-align: ${props.fliter_align};`,
            }]);
        }
        if (props.more_btn_align && props.more_btn_align !== '') {
            additionalCss.push([{
                selector: '%%order_class%% .df_ing_button_container',
                declaration: `text-align: ${props.more_btn_align};`,
            }]);
        }
        if (props.overlay !== 'on') {
            additionalCss.push([{
                selector: '%%order_class%% .c4-izmir',
                declaration: `--image-opacity: 1;`,
            }]);
        }
        if (props.overlay === 'on') {
            additionalCss.push([{
                selector: '%%order_class%% .c4-izmir .df-overlay',
                declaration: `background-image: linear-gradient(${props.overlay_direction},  
                    ${props.overlay_primary} 0, 
                    ${props.overlay_secondary} 100%);`,
            }]);
        }
        if (props.border_anim === 'on') {
            additionalCss.push([{
                selector: '%%order_class%% .c4-izmir',
                declaration: `--border-color: ${props.anm_border_color};`,
            }]);
            utility.process_range_value({
                'props': props,
                'key': 'anm_border_width',
                'additionalCss': additionalCss,
                'selector': '%%order_class%% .c4-izmir',
                'type': '--border-width',
                'unit': 'px'
            });
            utility.process_range_value({
                'props': props,
                'key': 'anm_border_margin',
                'additionalCss': additionalCss,
                'selector': '%%order_class%% .c4-izmir',
                'type': '--border-margin',
                'unit': 'px'
            });
        }
        utility.process_range_value({
            'props': props,
            'key': 'anm_content_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .c4-izmir',
            'type': '--padding',
            'unit': 'em'
        });

        utility.df_process_bg({
            'props': props,
            'key': 'more_btn_bg',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .ing-load-more-btn',
        });
        utility.df_process_bg({
            'props': props,
            'key': 'active_filter_bg',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df_filter_buttons button.is-checked',
        });
        // spacing: title
        utility.process_margin_padding({
            'props': props,
            'key': 'title_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df_ing_caption',
            'type': 'padding'
        });


        // spacing: load more
        utility.process_margin_padding({
            'props': props,
            'key': 'load_more_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .ing-load-more-btn',
            'type': 'margin'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'load_more_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .ing-load-more-btn',
            'type': 'padding'
        });
        // icon font family
        utility.process_icon_font_style({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'hover_icon',
            'selector'          : '%%order_class%% .et-pb-icon.hover_icon'
        })
        utility.process_icon_font_style({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'instagram_icon',
            'selector'          : '%%order_class%% .et-pb-icon.instagram_icon'
        })

        return additionalCss;
    }

    contentOutput(props) {
        return props.content.length !== 0 ? props.content : '';
    }

    renderGallery() {
        if (this.state.items !== null) {
            return { __html: this.state.items };
        } else {
            return { __html: <div> Your instagram Account information has't correct !</div> };
        }
    }

    render_load_more(props) {
        if (props.load_more === 'on' && props.filter_nav !== 'on') {
            return (
                <div className="df_ing_button_container">
                    <button className="ing-load-more-btn">
                        {props.load_more_text}
                    </button>
                </div>
            );
        }
    }

    render() {
        const props = this.props;
        const error = this.state.error;

        const module_error_msg = props.instagram_user_token === '' ? 'Please Enter Access token' : this.state.error_msg;
        if (props.instagram_user_token !== '' && !error) {
            return (<div className={"df_ing_container"} ref={this.wrapper}>
                {this.state.loading === false ?
                    <React.Fragment>
                        <div className="df_ing_gallery grid" dangerouslySetInnerHTML={this.renderGallery()} />
                        {this.render_load_more(props)}
                    </React.Fragment>
                    : <div className="et-fb-preloader et-fb-preloader__loading">
                        <div className="et-fb-loader" />
                    </div>}
            </div>)
        } else {
            return (<div className={"df_ing_container error-section"} ref={this.wrapper}>
                {module_error_msg}
            </div>)
        }

    }
}
export default InstagramGallery;