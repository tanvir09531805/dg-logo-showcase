// External Dependencies
import React, { Component } from 'react';
import axios from 'axios';
import utility from '../../../scripts/df_scripts/utilities';
// Internal Dependencies
import imagesloaded from 'imagesloaded';
import Isotope from 'isotope-layout';
import './style.css';
import '../../../public/js/imageGalleryChildController'
import $ from 'jquery';


class ImageGallery extends Component {
    static slug = 'difl_imagegallery';
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            slider: null,
            loading: true,
            props: this.props,
            images: '',
            gallery: '',
            titles: {},
            request_data: '',
            category_ids:'',
            viewMode: window.ET_Builder.API.State.View_Mode.current
        }
        this.wrapper = React.createRef();
        this.get_image_ids = this.get_image_ids.bind(this);
        this.requestgallery = this.requestgallery.bind(this);
        this.render_filter_buttons = this.render_filter_buttons.bind(this);
        this.computedType = ['image_size', 'use_orientation', 'image_to_display', 'image_to_display_phone', 'image_to_display_tablet', 'image_to_display_last_edited', 'load_more', 'image_count', 'filter_nav', 'show_caption', 'show_description', 'layout_mode', 'caption_tag', 'description_tag', 'image_scale', 'enable_content_position','content_position', 'content_position_outside', 'content_reveal_caption', 'content_reveal_description','border_anim', 'border_anm_style', 'overlay', 'field_use_icon', 'field_font_icon', 'content_reveal_icon', 'always_show_title', 'always_show_description', 'init_count', 'use_image_order', 'image_order', 'item_gutter', 'item_gutter_tablet','item_gutter_phone','df_gallery_enable_category', 'category_ids', 'disable_filter_nav_all_button', 'image_orientation', 'show_pagination',  'use_number_pagination', 'show_pagination', 'use_icon_only_at_pagination', 'pagination_img_count', 'anm_content_padding', 'title_padding', 'description_padding']
    }

    componentDidMount() {
        this._isMounted = true;
        if (this.state.loading === true) {
            this.setState({loading: false})
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidUpdate(prevProps, prevState) {
        this.get_image_ids();
        if('on' === this.props.show_pagination){
            $('body').on('click','.df-ig-pagination a', function(event) {
                event.preventDefault();
            })
        }
        if (this.state.viewMode !== window.ET_Builder.API.State.View_Mode.current){
            this.setState({viewMode: window.ET_Builder.API.State.View_Mode.current})
            this.requestgallery(this.state.request_data)
        }
    }

    get_image_ids() {
        if('on' === this.props.df_gallery_enable_category){
            this.get_category_image_id();
        }else{
            if (this.props.content.length && this.props.content.length > 0) {
                this.get_child_content_image_id();
            }
        }
    }

    get_category_image_id(){
        const props = this.props;
        const _this = this;
        var promise = new Promise(async (resolve, reject) => {
            if('undefined' === typeof props.category_ids) return;
            const tax_ids = JSON.parse(props.category_ids);
            let fatch_data = {};
            await fetch(window.ETBuilderBackend.ajaxUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    action: 'df_image_gallery_category_data_fetch',
                    et_admin_load_nonce: window.et_fb_options.et_admin_load_nonce,
                    tax_ids: JSON.stringify(tax_ids)
                }),
            })
                .then((res) => res.json())
                .then((result) => {
                    if(true === result.success){
                        fatch_data = result.data;
                    }
                })
            resolve({
                images: fatch_data.images,
                request_data: fatch_data.request_data,
                titles : fatch_data.titles
            })
        });

        promise
            .then((res) => {
                if (_this.state.images !== res.images) {
                    _this.setState({images: res.images, titles: res.titles, request_data: res.request_data})
                    _this.setState({loading: true});
                    // send ajax request for the images to load
                    _this.requestgallery(res.request_data)
                } else {
                    for (const index of _this.computedType) {
                        if (_this.state.props[index] !== _this.props[index]) {
                            if(_this.computedType.includes(index)){
                                _this.setState({props: _this.props, loading: true});
                                _this.requestgallery(res.request_data);
                            }
                        }
                    }
                }
            })
    }

    get_child_content_image_id(){
        const props = this.props;
        const _this = this;

        var promise = new Promise((resolve, reject) => {
            const content = props.content;
            let images = '';
            let request_data = [];
            let titles = {};
            content.map((element, index) => {
                const image  = {
                    gallery_title : element.props.attrs.gallery_title,
                    gallery_ids: element.props.attrs.gallery_ids
                };
                images = images + element.props.attrs.gallery_ids + ',';

                if ( element.props.attrs.gallery_title ) {
                    titles[
                        element.props.attrs.gallery_title.replace(/ /g, "-").toLowerCase()
                        ] = element.props.attrs.gallery_title
                }

                request_data.push(image)
            });
            resolve({
                images: images,
                request_data: request_data,
                titles : titles
            })
        });

        promise
            .then((res) => {
                if (_this.state.images !== res.images) {
                    _this.setState({images: res.images, titles: res.titles, request_data: res.request_data})
                    _this.setState({loading: true});
                    // send ajax request for the images to load
                    _this.requestgallery(res.request_data)
                } else {
                    for (const index in _this.state.props) {
                        if (_this.state.props[index] !== _this.props[index]) {
                            if(_this.computedType.includes(index)){
                                _this.setState({props: _this.props, loading: true})
                                _this.requestgallery(res.request_data)
                            }
                        }
                    }
                }
            })
    }

    requestgallery(request_data) {
        const _this = this;
        axios({
            method: 'post',
            url: window.ETBuilderBackend.ajaxUrl,
            params: {
                action : 'df_image_gallery'
            },
            data : {
                et_admin_load_nonce: window.et_fb_options.et_admin_load_nonce,
                images: JSON.stringify(request_data),
                image_size: _this.props.image_size,
                use_orientation: _this.props.use_orientation,
                image_orientation: _this.props.image_orientation,
                filter_nav: _this.props.filter_nav,
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
                use_lightbox_content: _this.props.use_lightbox_content
            }
        })
            .then(function(response) {
                if ( _this._isMounted ) {
                    _this.setState({gallery: response.data.data});
                }
            })
            .then(function(res){
                if ( _this._isMounted ) {
                    _this.setState({loading: false});
                }
            })
            .then(() => {
                const grid = _this.wrapper.current.querySelector('.grid');
                let iso;
                imagesloaded (grid, function() {
                    iso = new Isotope( grid, {
                        layoutMode: _this.props.layout_mode,
                        percentPosition: true,
                    });

                    const filtersElem = _this.wrapper.current.querySelector('.df_filter_buttons');
                    if (filtersElem !== null) {
                        const is_checked = filtersElem.querySelector('.is-checked');
                        if(is_checked){
                            iso.arrange({ filter: is_checked.getAttribute('data-filter') });
                        }
                        const buttons = filtersElem.querySelectorAll('.button');

                        filtersElem.addEventListener( 'click', function( event ) {
                            // ditect mouse click outside button
                            if( !event.target.classList.contains('button')){
                                return;
                            }
                            buttons.forEach(button => {
                                button.classList.remove('is-checked');

                            });

                            const filterValue = event.target.getAttribute('data-filter');
                            event.target.classList.add('is-checked');

                            iso.arrange({ filter: filterValue });
                        });
                    }
                })
            });
    }


    static css(props) {
        const additionalCss = [];
        if (props.image_to_display) {
            const image_width = 100/props.image_to_display;
            const image_width_tablet = props.image_to_display_tablet ?
                100/props.image_to_display_tablet : image_width;
            const image_width_phone = props.image_to_display_phone ?
                100/props.image_to_display_phone : image_width_tablet;
            additionalCss.push([{
                selector:    '%%order_class%% .grid-sizer, %%order_class%% .grid-item',
                declaration: `width: ${image_width}%;`,
            }]);
            additionalCss.push([{
                selector:    '%%order_class%% .grid-sizer, %%order_class%% .grid-item',
                declaration: `width: ${image_width_tablet}%;`,
                'device':'tablet'
            }]);
            additionalCss.push([{
                selector:    '%%order_class%% .grid-sizer, %%order_class%% .grid-item',
                declaration: `width: ${image_width_phone}%;`,
                'device':'phone'
            }]);
        }
        // loading icon color
        utility.process_color({
            'props'             : props,
            'key'               : 'spinner_color',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .ig-load-more-btn .spinner svg',
            'type'              : 'fill'
        });
        // load more icon
        utility.process_range_value({
            'props'             : props,
            'key'               : 'more_btn_icon_size',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .df-ig-load-more-icon',
            'type'              : 'font-size',
            'unit'              : 'px'
        });

        if (props.item_gutter !== '') {
            utility.process_range_value({
                'props'             : props,
                'key'               : 'item_gutter',
                'additionalCss'     : additionalCss,
                'selector'          : '%%order_class%% .grid .grid-item',
                'type'              : 'padding-left',
                'unit'              : 'px'
            });
            utility.process_range_value({
                'props'             : props,
                'key'               : 'item_gutter',
                'additionalCss'     : additionalCss,
                'selector'          : '%%order_class%% .grid .grid-item',
                'type'              : 'padding-bottom',
                'unit'              : 'px'
            });
            utility.process_range_value({
                'props'             : props,
                'key'               : 'item_gutter',
                'additionalCss'     : additionalCss,
                'selector'          : '%%order_class%% .grid',
                'type'              : 'margin-left',
                'unit'              : 'px',
                'negative'          : true
            });
        }
        if (props.image_scale === 'c4-image-rotate-left') {
            additionalCss.push([{
                selector:    '%%order_class%% .c4-image-rotate-left:hover img, %%order_class%% :focus.c4-image-rotate-left img',
                declaration: `transform: scale(${props.image_scale_hover}) rotate(-15deg);`,
            }]);
        }
        if (props.image_scale === 'c4-image-rotate-right') {
            additionalCss.push([{
                selector:    '%%order_class%% .c4-image-rotate-right:hover img, %%order_class%% :focus.c4-image-rotate-right img',
                declaration: `transform: scale(${props.image_scale_hover}) rotate(15deg);`,
            }]);
        }
        if (props.fliter_align && props.fliter_align !== '') {
            additionalCss.push([{
                selector:    '%%order_class%% .df_filter_buttons',
                declaration: `text-align: ${props.fliter_align};`,
            }]);
        }
        if (props.more_btn_align && props.more_btn_align !== '') {
            additionalCss.push([{
                selector:    '%%order_class%% .df_ig_button_container',
                declaration: `text-align: ${props.more_btn_align};`,
            }]);
        }
        if(props.overlay !== 'on') {
            additionalCss.push([{
                selector:    '%%order_class%% .c4-izmir',
                declaration: `--image-opacity: 1;`,
            }]);
        }
        if(props.overlay === 'on') {
            additionalCss.push([{
                selector:    '%%order_class%% .c4-izmir .df-overlay',
                declaration: `background-image: linear-gradient(${props.overlay_direction},  
                    ${props.overlay_primary} 0, 
                    ${props.overlay_secondary} 100%);`,
            }]);
            const overlay_spacing = props.overlay_spacing ? props.overlay_spacing : "0px";
            additionalCss.push([{
                selector:    '%%order_class%% .c4-izmir .df-overlay',
                declaration: `margin: ${overlay_spacing};`,
            }]);
            if(props.overlay_spacing_tablet){
                additionalCss.push([{
                    selector: '%%order_class%% .c4-izmir .df-overlay',
                    declaration: `margin: ${props.overlay_spacing_tablet};`,
                    'device': 'tablet'
                }]);
            }
            if(props.overlay_spacing_phone){
                additionalCss.push([{
                    selector: '%%order_class%% .c4-izmir .df-overlay',
                    declaration: `margin: ${props.overlay_spacing_phone};`,
                    'device': 'phone'
                }]);
            }
        }
        if(props.border_anim === 'on') {
            additionalCss.push([{
                selector:    '%%order_class%% .c4-izmir',
                declaration: `--border-color: ${props.anm_border_color};`,
            }]);
            utility.process_range_value({
                'props'             : props,
                'key'               : 'anm_border_width',
                'additionalCss'     : additionalCss,
                'selector'          : '%%order_class%% .c4-izmir',
                'type'              : '--border-width',
                'unit'              : 'px'
            });
            utility.process_range_value({
                'props'             : props,
                'key'               : 'anm_border_margin',
                'additionalCss'     : additionalCss,
                'selector'          : '%%order_class%% .c4-izmir',
                'type'              : '--border-margin',
                'unit'              : 'px'
            });
        }
        utility.process_range_value({
            'props'             : props,
            'key'               : 'anm_content_padding',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .c4-izmir',
            'type'              : '--padding',
            'unit'              : 'em'
        });
        utility.df_process_bg({
            'props'             : props,
            'key'               : 'filter_nav_bg',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .df_filter_buttons button',
        });
        utility.df_process_bg({
            'props'             : props,
            'key'               : 'more_btn_bg',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .ig-load-more-btn',
        });
        utility.df_process_bg({
            'props'             : props,
            'key'               : 'active_filter_bg',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .df_filter_buttons button.is-checked',
        });
        // spacing: title
        utility.process_margin_padding({
            'props' : props,
            'key':'title_padding',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_ig_caption',
            'type'  : 'padding'
        });
        // spacing: description
        utility.process_margin_padding({
            'props' : props,
            'key':'description_padding',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_ig_description',
            'type'  : 'padding'
        });
        // spacing: filter button container
        utility.process_margin_padding({
            'props' : props,
            'key':'filter_button_container_margin',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_filter_buttons',
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'filter_button_container_padding',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_filter_buttons',
            'type'  : 'padding'
        });
        // spacing: filter button
        utility.process_margin_padding({
            'props' : props,
            'key':'filter_button_margin',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_filter_buttons button',
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'filter_button_padding',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_filter_buttons button',
            'type'  : 'padding'
        });
        // spacing: load more
        utility.process_margin_padding({
            'props' : props,
            'key':'load_more_margin',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .ig-load-more-btn',
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'load_more_padding',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .ig-load-more-btn',
            'type'  : 'padding'
        });
        // icon font family
        utility.process_icon_font_style({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'more_btn_font_icon',
            'selector'          : '%%order_class%% .df-ig-load-more-icon'
        })

        if('on' === props.field_use_icon){
            // overlay icon font family
            utility.process_icon_font_style({
                'props'             : props,
                'additionalCss'     : additionalCss,
                'key'               : 'field_font_icon',
                'selector'          : '%%order_class%% .df-overlay .et-pb-icon'
            })
            utility.process_color({
                'props'             : props,
                'key'               : 'field_icon_color',
                'additionalCss'     : additionalCss,
                'selector'          : '%%order_class%% .df-overlay .et-pb-icon',
                'type'              : 'color',
                'important'         : true
            });
            utility.process_range_value({
                'props'             : props,
                'key'               : 'field_icon_size',
                'additionalCss'     : additionalCss,
                'selector'          : '%%order_class%% .df-overlay .et-pb-icon',
                'type'              : 'font-size',
                'default_value'     : '24qpx',
                'important'         : true
            });
            const icon_placement = 'undefined' !== props.field_icon_placement ? props.field_icon_placement : 'center';
            const icon_alignment = 'undefined' !== props.field_icon_alignment ? props.field_icon_alignment : 'center';
            additionalCss.push([{
                selector:    '%%order_class%% .df-overlay',
                declaration: `display: flex;align-items:${icon_placement};justify-content:${icon_alignment};`,
            }]);
        }

        /** Pagination **/
        additionalCss.push([{
            selector:    '%%order_class%% .pagination .older:before, %%order_class%% .pagination .prev:before',
            declaration: `content: '${ImageGallery.ig_arrow_icon(props.next_prev_icon, 'prev')}';`
        }]);
        additionalCss.push([{
            selector:    '%%order_class%% .pagination .newer:after, %%order_class%% .pagination .next:after',
            declaration: `content: '${ImageGallery.ig_arrow_icon(props.next_prev_icon, 'next')}';`
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
            'important' : true
        });

        utility.df_process_string_attr({
            'props'             : props,
            'key'               : 'pagination_align',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .pagination',
            'type'              : 'justify-content',
            'default_value'     : 'center'
        });
        /** Pagination **/

        return additionalCss;
    }

    static ig_arrow_icon(set = 'set_1', type) {
        const icons = {
            set_1 : {
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
    contentOutput(props){
        return props.content.length !== 0 ? props.content : '';
    }

    renderGallery() {
        if(('on' !== this.props.df_gallery_enable_category && this.props.content.length > 0) || ('on' === this.props.df_gallery_enable_category && JSON.parse(this.props.category_ids).length > 0)){
            return {__html: this.state.gallery};
        }else{
            const grid = this.wrapper.current.querySelector('.grid');
            if (grid) { grid.style.height = 'auto';grid.style.marginLeft = "0px" }
            return {__html: '<h2 style="background:#eee; padding: 10px 20px; width: 100%;text-align: center;">Please add <strong>Item/Category</strong> to continue.</h2>'};
        }

    }

    render_filter_buttons() {
        const disable_filter_nav_all_button = this.props.disable_filter_nav_all_button;
        let nav = '';
        if (this.state.titles !== {}) {
            for (const [index, [key, value]] of Object.entries(this.state.titles).entries()) {
                if('on' === disable_filter_nav_all_button && 0 === index){
                    nav = `<button class="button is-checked" data-filter=".${key}">${value}</button>` + nav;
                    continue;
                }
                nav = nav + `<button class="button" data-filter=".${key}">${value}</button>`;
            }
        }
        if ('on' === this.props.filter_nav) {
            if('off' === disable_filter_nav_all_button){
                const first_button_text = '' !== this.props.filter_nav_all_button ? this.props.filter_nav_all_button : 'All';
                nav = `<button class="button is-checked" data-filter="*">${first_button_text}</button>` + nav;
            }
            if('on' !== this.props.df_gallery_enable_category && this.props.content.length > 0 || ('on' === this.props.df_gallery_enable_category && this.props.category_ids.length > 2)){
                return <div className='df_filter_buttons' dangerouslySetInnerHTML={{
                    __html: nav
                }}/>
            }else{
                return "";
            }

        }
    }

    render_load_more(props) {
        const utils = window.ET_Builder.API.Utils;
        const button_icon = props.more_btn_use_icon === 'on' ?
            <span className="df-ig-load-more-icon">
                {props.more_btn_font_icon ? utils.processFontIcon(this.props.more_btn_font_icon) : '4'}
            </span> : '';

        var icon_class = props.more_btn_use_icon === 'on' ? ' has_icon' : '';
        if (props.load_more === 'on' && props.filter_nav !== 'on') {
            if(('on' !== this.props.df_gallery_enable_category && this.props.content.length > 0) || ('on' === this.props.df_gallery_enable_category && this.props.category_ids.length > 2)){
                return (
                    <div className="df_ig_button_container">
                        <button className={"ig-load-more-btn" + icon_class}>
                            {props.load_more_text}
                            {button_icon}
                        </button>
                    </div>
                );
            }else{
                return "";
            }

        }
    }

    get_pagination_numbers(props){
        const images = this.state.images.slice(0, -1).split(",");
        const paginationImgCount = parseInt(props.pagination_img_count);

        return Array.from({ length: Math.ceil(images.length / paginationImgCount) }, (_, i) => (
            <a key={i} className={`page-numbers ${ 0 === i ? 'current' : '' }`} data-page={i + 1} data-count={paginationImgCount} href="#">
                {i + 1}
            </a>
        ));
    }

    render_pagination(props) {
        const older = 'on' === props.use_icon_only_at_pagination ? "" : props.older_text !== '' ? props.older_text : 'Older Entries';
        const next = 'on' === props.use_icon_only_at_pagination ? "" : props.newer_text !== '' ? props.newer_text : 'Next Entries';
        const use_number_pagination = props.use_number_pagination;
        return (<div className={`df-ig-pagination pagination clearfix ${'on' === props.use_icon_only_at_pagination ? 'only_icon':''}`}>
            <a className="prev page-numbers" href="#">{older}</a>
            {('on' === use_number_pagination) ? this.get_pagination_numbers(props):""}
            <a className="next page-numbers" href="#">{next}</a>
        </div>);
    }

    render() {
        const props = this.props;
        return (<div className={"df_ig_container"} ref={this.wrapper}>
            {this.state.loading === false ?
                <React.Fragment>
                {this.render_filter_buttons()}
                    <div className="df_ig_gallery grid" dangerouslySetInnerHTML={this.renderGallery()} />
                    {this.render_load_more(props)}
                    {'on' === props.show_pagination? this.render_pagination(props):''}
                </React.Fragment>
                : <div className="et-fb-preloader et-fb-preloader__loading">
                    <div className="et-fb-loader"/>
                </div>}
        </div>)
    }
}
export default ImageGallery;