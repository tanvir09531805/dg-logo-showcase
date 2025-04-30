// External Dependencies
import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import utility from '../../../scripts/df_scripts/utilities';
// Internal Dependencies
// import '../../../assets/scripts/lib/jquery.justifiedGallery.js';
import '../../../public/js/lib/jquery.justifiedGallery.js';

import './style.css';

class JustifiedGallery extends Component {
    static slug = 'difl_justifiedgallery';
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            props: this.props,
            images: '',
            gallery: '',
            viewMode: window.ET_Builder.API.State.View_Mode.current
        }
        this.wrapper = React.createRef();
        this.requestgallery = this.requestgallery.bind(this);
        this.renderGallery = this.renderGallery.bind(this);
        this.computedType = ['image_size', 'load_more', 
            'image_count', 'show_caption', 'ini_count', 'gallery',
            'show_description', 'content_reveal_caption', 'content_reveal_description',
            'content_position', 'image_scale', 'overlay',
            'image_size', 'caption_tag', 'description_tag',
            'border_anim', 'border_anm_style',
            'show_pagination',  'use_number_pagination', 'show_pagination', 'use_icon_only_at_pagination', 'pagination_img_count'
        ];
    }

    componentDidMount() {
        this._isMounted = true;

        if (this.state.loading === true) {
            this.requestgallery();
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidUpdate(prevProps, prevState) {
        const _this = this;

        for (const index in _this.state.props) {
            if (_this.state.props[index] !== _this.props[index]) {
                if(_this.computedType.includes(index)){
                    _this.setState({props: _this.props, loading: true})
                    _this.requestgallery();
                }
            }
        }

        if ( this.props.gallery !== this.state.images ) {
            this.requestgallery();
        }
        
        if (this.wrapper.current) {
            $(this.wrapper.current).find('.justified-gallery').justifiedGallery({
                rowHeight : parseInt(_this.props.rowheight),
                margins : parseInt(_this.props.space_between),
                selector : 'a, figure:not(.spinner)',
                captions: false
            })
            .on('jg.complete', function(e){
        
                $(this).find('img').css('transition', 'all 600ms ease')
        
                $(this).find('.df_jsg_image')
                .fadeIn("slow")
                .removeClass('image_loading');
            });
        }

        if (this.state.viewMode !== window.ET_Builder.API.State.View_Mode.current){
            _this.setState({viewMode: window.ET_Builder.API.State.View_Mode.current}, ()=>{})
            _this.setState({props: _this.props, loading: true})
            _this.requestgallery();
        }
    }

    requestgallery() {
        const _this = this;

        axios({
            method: 'post',
            url: window.ETBuilderBackend.ajaxUrl,
            params: {
                action : 'df_jsg_render_image'
            },
            data : {
                et_admin_load_nonce: window.et_fb_options.et_admin_load_nonce,
                gallery: _this.props.gallery,
                // image_size: _this.props.image_size,
                load_more: _this.props.load_more,
                image_count: _this.props.image_count,
                show_caption: _this.props.show_caption,
                show_description: _this.props.show_description,
                ini_count: _this.props.ini_count,
                show_content_lg: _this.props.show_content_lg,
                content_reveal_caption: _this.props.content_reveal_caption,
                content_reveal_description: _this.props.content_reveal_description,
                content_position: _this.props.content_position,
                image_scale: _this.props.image_scale,
                overlay: _this.props.overlay,
                image_size: _this.props.image_size,
                caption_tag: _this.props.caption_tag,
                description_tag: _this.props.description_tag,
                border_anim: _this.props.border_anim,
                border_anm_style: _this.props.border_anm_style,
                show_pagination: _this.props.show_pagination,
                pagination_img_count: _this.props.pagination_img_count,
                use_number_pagination: _this.props.use_number_pagination,
                older_text: _this.props.older_text,
                newer_text: _this.props.newer_text,
                use_icon_only_at_pagination: _this.props.use_icon_only_at_pagination
            }
        })
        .then((response) => {
            if ( _this._isMounted ) {
                _this.setState({gallery: response.data.data, 
                    images: _this.props.gallery});
            }
        })
        .then((res) => {
            if ( _this._isMounted ) {
                _this.setState({loading: false});
            }
        })
    }

    renderGallery() {
        return {__html: this.state.gallery};
    }

    static jsg_arrow_icon(set = 'set_1', type) {
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

    static css(props) {
        const additionalCss = [];

        additionalCss.push([{
            selector:    '%%order_class%% .c4-izmir',
            declaration: `--border-radius: 0px;`,
        }]);
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
        if (props.more_btn_align && props.more_btn_align !== '') {
            additionalCss.push([{
                selector:    '%%order_class%% .df_jsg_button_container',
                declaration: `text-align: ${props.more_btn_align};`,
            }]);
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

        // loading icon color
        utility.process_color({
            'props'             : props,
            'key'               : 'spinner_color',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .jsg-more-image-btn .spinner svg',
            'type'              : 'fill'
        });
        // load more icon
        utility.process_range_value({
            'props'             : props,
            'key'               : 'more_btn_icon_size',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .df-jsg-load-more-icon',
            'type'              : 'font-size',
            'unit'              : 'px'
        });
        // background: More Button
        utility.df_process_bg({
            'props'             : props,
            'key'               : 'more_btn_bg',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .jsg-more-image-btn',
        });
        // spacing: title
        utility.process_margin_padding({
            'props' : props,
            'key':'title_padding',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_jsg_caption',
            'type'  : 'padding'
        });
        // spacing: description
        utility.process_margin_padding({
            'props' : props,
            'key':'description_padding',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .df_jsg_description',
            'type'  : 'padding'
        });
        // spacing: load more
        utility.process_margin_padding({
            'props' : props,
            'key':'load_more_margin',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .jsg-more-image-btn',
            'type'  : 'margin'
        });
        utility.process_margin_padding({
            'props' : props,
            'key':'load_more_padding',
            'additionalCss' : additionalCss,
            'selector' : '%%order_class%% .jsg-more-image-btn',
            'type'  : 'padding'
        });
        // icon font family
        utility.process_icon_font_style({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'more_btn_font_icon',
            'selector'          : '%%order_class%% .df-jsg-load-more-icon'
        })

        /** Pagination **/
        additionalCss.push([{
            selector:    '%%order_class%% .pagination .older:before, %%order_class%% .pagination .prev:before',
            declaration: `content: '${this.jsg_arrow_icon(props.next_prev_icon, 'prev')}';`
        }]);
        additionalCss.push([{
            selector:    '%%order_class%% .pagination .newer:after, %%order_class%% .pagination .next:after',
            declaration: `content: '${this.jsg_arrow_icon(props.next_prev_icon, 'next')}';`
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

    render_load_more(props) {
        const utils = window.ET_Builder.API.Utils;
        const button_icon = props.more_btn_use_icon === 'on' ?
            <span className="df-jsg-load-more-icon">
                {props.more_btn_font_icon ? utils.processFontIcon(this.props.more_btn_font_icon) : '4'}
            </span> : '';

        var icon_class = props.more_btn_use_icon === 'on' ? ' has_icon' : '';

        if (props.load_more === 'on') {
            return (
                <div className="df_jsg_button_container">
                    <button className={"jsg-more-image-btn" + icon_class}>
                        {props.load_more_text}
                        {button_icon}
                    </button>
                </div>
            );
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
        return (<div className={`df-jsg-pagination pagination clearfix ${'on' === props.use_icon_only_at_pagination ? 'only_icon':''}`}>
            <a className="prev page-numbers" href="#">{older}</a>
            {('on' === use_number_pagination) ? this.get_pagination_numbers(props):""}
            <a className="next page-numbers" href="#">{next}</a>
        </div>);
    }

    render() {
        const props = this.props;
        
        return(<div className={"df_jsg_container"} ref={this.wrapper}>
            {this.state.loading === false ?
            <React.Fragment>
                <div className="justified-gallery" dangerouslySetInnerHTML={this.renderGallery()} />
                {this.render_load_more(props)}
                {'on' === props.show_pagination? this.render_pagination(props):''}
            </React.Fragment>
            : <div className="et-fb-preloader et-fb-preloader__loading">
                <div className="et-fb-loader"/>
            </div>}
        </div>)
    }
}
export default JustifiedGallery;