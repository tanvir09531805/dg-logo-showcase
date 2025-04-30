import React, {Component} from 'react';
import utility from '../../../scripts/df_scripts/utilities';

// Internal Dependencies
import './style.css';
import imagesloaded from "imagesloaded";
import Isotope from "isotope-layout";

class ACFGallery extends Component {
    static slug = 'difl_acfgallery';
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            gallery: '',
            image_array: [],
            post_id: 0
        }
        this.wrapper = React.createRef();
        this.request_acf__gallery_data = this.request_acf__gallery_data.bind(this);
        this.computedType = ['acf_gallery_fields', 'image_size', 'image_to_display', 'image_to_display_phone', 'image_to_display_tablet', 'image_to_display_last_edited', 'layout_mode', 'use_orientation', 'image_orientation', 'load_more', 'init_count', 'overlay', 'field_use_icon', 'field_font_icon', 'content_reveal_icon', 'always_show_title', 'always_show_description', 'show_caption', 'show_description', 'caption_tag', 'description_tag', 'image_scale', 'enable_content_position', 'content_position', 'content_position_outside', 'content_reveal_caption', 'content_reveal_description', 'border_anim', 'border_anm_style', 'use_image_order', 'image_order', 'item_gutter', 'item_gutter_tablet', 'item_gutter_phone', 'use_number_pagination', 'show_pagination', 'use_icon_only_at_pagination', 'pagination_img_count', 'anm_content_padding', 'title_padding', 'description_padding'];
    }

    componentDidMount() {
        this._isMounted = true;
        if (this.state.loading === true) {
            this.setState({loading: false});
            this.request_acf__gallery_data(this.state.post_id);
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }


    componentDidUpdate(prevProps, prevState) {
        const _this = this;
        let post_id = _this.state.post_id
        if( prevProps['acf_gallery_fields'] !== _this.props['acf_gallery_fields'] ){
            _this.setState({post_id: 0});
            post_id = 0
        }
        for (const index of _this.computedType) {
            if (prevProps[index] !== _this.props[index]) {
                if (_this.computedType.includes(index)) {
                    _this.setState({loading: true});
                    this.request_acf__gallery_data(post_id);
                }
            }
        }
    }

    static acf_gallery_arrow_icon(set = 'set_1', type) {
        const icons = {
            set_1: {
                next: '5',
                prev: '4'
            },
            set_2: {
                next: '$',
                prev: '#'
            },
            set_3: {
                next: '9',
                prev: '8'
            },
            set_4: {
                next: 'E',
                prev: 'D'
            }
        };
        return icons[set][type];
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
            'selector': '%%order_class%% .df-acf-gallery-load-more-btn .spinner svg',
            'type': 'fill'
        });
        // load more icon
        utility.process_range_value({
            'props': props,
            'key': 'more_btn_icon_size',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-acf-gallery-load-more-icon',
            'type': 'font-size',
            'unit': 'px'
        });
        if ('' !== props.item_gutter) {
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
        utility.process_margin_padding({
            'props': props,
            'key': 'load_more_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-acf-gallery-load-more-btn',
            'type': 'margin'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'load_more_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-acf-gallery-load-more-btn',
            'type': 'padding'
        });
        if ('c4-image-rotate-left' === props.image_scale) {
            additionalCss.push([{
                selector: '%%order_class%% .c4-image-rotate-left:hover img, %%order_class%% :focus.c4-image-rotate-left img',
                declaration: `transform: scale(${props.image_scale_hover}) rotate(-15deg);`,
            }]);
        }
        if ('c4-image-rotate-right' === props.image_scale) {
            additionalCss.push([{
                selector: '%%order_class%% .c4-image-rotate-right:hover img, %%order_class%% :focus.c4-image-rotate-right img',
                declaration: `transform: scale(${props.image_scale_hover}) rotate(15deg);`,
            }]);
        }
        if ('' !== props.more_btn_align && props.more_btn_align) {
            additionalCss.push([{
                selector: '%%order_class%% .df_acf_gallery_button_container',
                declaration: `text-align: ${props.more_btn_align};`,
            }]);
        }
        if ('on' !== props.overlay) {
            additionalCss.push([{
                selector: '%%order_class%% .c4-izmir',
                declaration: `--image-opacity: 1;`,
            }]);
        }
        if ('on' === props.overlay) {
            additionalCss.push([{
                selector: '%%order_class%% .c4-izmir .df-overlay',
                declaration: `background-image: linear-gradient(${props.overlay_direction},  
                    ${props.overlay_primary} 0, 
                    ${props.overlay_secondary} 100%);`,
            }]);
        }
        if ('on' === props.border_anim) {
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
            'selector': '%%order_class%% .df-acf-gallery-load-more-btn',
        });
        // spacing: title
        utility.process_margin_padding({
            'props': props,
            'key': 'title_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df_acf_gallery_caption',
            'type': 'padding'
        });
        // spacing: description
        utility.process_margin_padding({
            'props': props,
            'key': 'description_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df_acf_gallery_description',
            'type': 'padding'
        });
        // spacing: load more
        utility.process_margin_padding({
            'props': props,
            'key': 'load_more_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-acf-gallery-load-more-btn',
            'type': 'margin'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'load_more_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-acf-gallery-load-more-btn',
            'type': 'padding'
        });
        // icon font family
        utility.process_icon_font_style({
            'props': props,
            'additionalCss': additionalCss,
            'key': 'more_btn_font_icon',
            'selector': '%%order_class%% .df-acf-gallery-load-more-icon'
        })
        if ('on' === props.field_use_icon) {
            // overlay icon font family
            utility.process_icon_font_style({
                'props': props,
                'additionalCss': additionalCss,
                'key': 'field_font_icon',
                'selector': '%%order_class%% .df-overlay .et-pb-icon'
            })
            utility.process_color({
                'props': props,
                'key': 'field_icon_color',
                'additionalCss': additionalCss,
                'selector': '%%order_class%% .df-overlay .et-pb-icon',
                'type': 'color',
                'important': true
            });
            utility.process_range_value({
                'props': props,
                'key': 'field_icon_size',
                'additionalCss': additionalCss,
                'selector': '%%order_class%% .df-overlay .et-pb-icon',
                'type': 'font-size',
                'default_value': '24qpx',
                'important': true
            });
            const icon_placement = 'undefined' !== props.field_icon_placement ? props.field_icon_placement : 'center';
            const icon_alignment = 'undefined' !== props.field_icon_alignment ? props.field_icon_alignment : 'center';
            additionalCss.push([{
                selector: '%%order_class%% .df-overlay',
                declaration: `display: flex;align-items:${icon_placement};justify-content:${icon_alignment};`,
            }]);
        }
        /** Pagination **/
        additionalCss.push([{
            selector: '%%order_class%% .pagination .older:before, %%order_class%% .pagination .prev:before',
            declaration: `content: '${this.acf_gallery_arrow_icon(props.next_prev_icon, 'prev')}';`
        }]);
        additionalCss.push([{
            selector: '%%order_class%% .pagination .newer:after, %%order_class%% .pagination .next:after',
            declaration: `content: '${ACFGallery.acf_gallery_arrow_icon(props.next_prev_icon, 'next')}';`
        }]);

        utility.process_margin_padding({
            'props': props,
            'key': 'pagination_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .pagination .page-numbers.prev, %%order_class%% .pagination .page-numbers.next',
            'type': 'margin'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'pagination_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .pagination .page-numbers.prev, %%order_class%% .pagination .page-numbers.next',
            'type': 'padding'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'pagination_number_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .pagination .page-numbers:not(.prev):not(.next)',
            'type': 'margin'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'pagination_number_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .pagination .page-numbers:not(.prev):not(.next)',
            'type': 'padding'
        });

        utility.df_process_bg({
            'props': props,
            'additionalCss': additionalCss,
            'key': 'pagination_background',
            'selector': '%%order_class%% .pagination .page-numbers:not(.dots)'
        });
        utility.df_process_bg({
            'props': props,
            'additionalCss': additionalCss,
            'key': 'active_pagination_background',
            'selector': '%%order_class%% .pagination .page-numbers.current',
            'important': true
        });

        utility.df_process_string_attr({
            'props': props,
            'key': 'pagination_align',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .pagination',
            'type': 'justify-content',
            'default_value': 'center'
        });
        /** Pagination **/
        return additionalCss;
    }

    request_acf__gallery_data(post_id) {
        const _this = this;
        fetch(window.ETBuilderBackend.ajaxUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                action: 'df_acf_gallery',
                et_admin_load_nonce: window.et_fb_options.et_admin_load_nonce,
                acf_gallery_fields: JSON.stringify(this.props.acf_gallery_fields),
                image_size: _this.props.image_size,
                use_orientation: _this.props.use_orientation,
                image_orientation: _this.props.image_orientation,
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

    render_load_more(props) {
        const utils = window.ET_Builder.API.Utils;
        const button_icon = props.more_btn_use_icon === 'on' ?
            <span className="df-acf-gallery-load-more-icon">
                {props.more_btn_font_icon ? utils.processFontIcon(this.props.more_btn_font_icon) : '4'}
            </span> : '';

        var icon_class = props.more_btn_use_icon === 'on' ? ' has_icon' : '';
        if (props.load_more === 'on') {
            return (
                <div className="df_acf_gallery_button_container">
                    <button className={"df-acf-gallery-load-more-btn" + icon_class}>
                        {props.load_more_text}
                        {button_icon}
                    </button>
                </div>
            );
        }
    }

    get_pagination_numbers(props) {
        const images = this.state.image_array;
        const paginationImgCount = parseInt(props.pagination_img_count);

        return Array.from({length: Math.ceil(images.length / paginationImgCount)}, (_, i) => (
            <a key={i} className={`page-numbers ${0 === i ? 'current' : ''}`} data-page={i + 1}
               data-count={paginationImgCount} href="#">
                {i + 1}
            </a>
        ));
    }

    render_pagination(props) {
        const older = 'on' === props.use_icon_only_at_pagination ? "" : props.older_text !== '' ? props.older_text : 'Older Entries';
        const next = 'on' === props.use_icon_only_at_pagination ? "" : props.newer_text !== '' ? props.newer_text : 'Next Entries';
        const use_number_pagination = props.use_number_pagination;
        return (<div
            className={`df-acf-gallery-pagination pagination clearfix ${'on' === props.use_icon_only_at_pagination ? '' : 'only_icon'}`}>
            <a className="prev page-numbers" href="#">{older}</a>
            {('on' === use_number_pagination) ? this.get_pagination_numbers(props) : ""}
            <a className="next page-numbers" href="#">{next}</a>
        </div>);
    }

    renderGallery() {
        if ("" !== this.state.gallery) {
            return {__html: this.state.gallery};
        } else {
            const grid = this.wrapper.current.querySelector('.grid');
            if (grid) {
                grid.style.height = 'auto';
                grid.style.marginLeft = "0px"
            }
            return {__html: '<h2 style="background:#eee; padding: 10px 20px; width: 100%;text-align: center;">Please add <strong>Data</strong> to continue.</h2>'};
        }

    }

    render() {
        const props = this.props;
        return (<div className={"df_acf_gallery_container"} ref={this.wrapper}>
            {this.state.loading === false ?
                <React.Fragment>
                    <div className="df_acf_gallery grid" dangerouslySetInnerHTML={this.renderGallery()}/>
                    {this.render_load_more(props)}
                    {'on' === props.show_pagination ? this.render_pagination(props) : ''}
                </React.Fragment>
                : <div className="et-fb-preloader et-fb-preloader__loading">
                    <div className="et-fb-loader"/>
                </div>}
        </div>)
    }
}

export default ACFGallery;