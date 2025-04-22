// External Dependencies
import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import _ from 'lodash';
import utility from '../../../scripts/df_scripts/utilities';
import Isotope from 'isotope-layout';
// Internal Dependencies
import './style.css';

var lodash = _.noConflict();


class PostList extends Component {
    static slug = 'difl_postlist';
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            posts: '',
            loading: true,
            masonry: null,
            post_items: [],
            post_items_without_class: []
        }

        this.wrapper = React.createRef();
        this.get_posts = this.get_posts.bind(this);
        this.render_output = this.render_output.bind(this);
        this.get_post_items = this.get_post_items.bind(this);
        this.computedType = ['posts_number', 'post_display', 'include_categories', 'include_tags',
        'orderby', 'offset_number', 'layout', 'use_image_as_background', 'use_background_scale', 'show_pagination',
        'older_text', 'newer_text', 'use_number_pagination', 'show_pagination', 'collapse', 'vertical_align', 'image_size', 'image_scale', 'equal_height', 'use_iamge', 'use_icon', 'icon_image', 'ignore_specific_sticky', 'ignore_sticky_post'];
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidUpdate(prevProps, prevState) {
        const _this = this;

        $('body').on('click','.df-pagination a', function(event) {
            event.preventDefault();
        })

        if(_this.state.loading) {
            setTimeout(_this.get_posts, 800)
        }

        if(_this.props.layout === 'masonry' && _this.state.masonry) {
            _this.state.masonry.layout()
        }

        _this.get_post_items();

        for (const index of _this.computedType) {
            if (prevProps[index] !== _this.props[index]) {
                if(_this.computedType.includes(index)){
                    _this.setState({loading: true})
                }
            }
        } 

        // fix builder css selector issue
        if(_this.wrapper.current) {
            utility.df_fix_builder_css_issue(
                _this.wrapper.current,
                _this.wrapper.current.parentElement
            )
        }
        
    }

    /**
     * Get all posts through ajax request
     * 
     */
    get_posts() {
        const _this = this;
        if(!_this.get_post_items()) return;
        const utils = window.ET_Builder.API.Utils;

        axios({
            method: 'post',
            url: window.ETBuilderBackend.ajaxUrl,
            params: {
                action : 'df_pl_posts'
            },
            data : {
                et_admin_load_nonce: window.et_fb_options.et_admin_load_nonce,
                postItems: _this.get_post_items().postItems,
                element_classes: _this.state.element_classes,
                posts_number: _this.props.posts_number,
                offset_number: _this.props.offset_number,
                post_display: _this.props.post_display,
                include_categories: _this.props.include_categories,
                include_tags: _this.props.include_tags,
                orderby: _this.props.orderby,
                layout: _this.props.layout,
                show_pagination: _this.props.show_pagination,
                use_number_pagination: _this.props.use_number_pagination,
                older_text: _this.props.older_text,
                newer_text: _this.props.newer_text,
                collapse: _this.props.collapse,
                vertical_align: _this.props.vertical_align,
                image_size: _this.props.image_size,
                image_scale: _this.props.image_scale,
                equal_height: _this.props.equal_height,
                use_iamge: _this.props.use_iamge,
                use_icon: _this.props.use_icon,
                icon_image: _this.props.icon_image ? utils.processFontIcon(_this.props.icon_image) : '$',
                ignore_sticky_post: _this.props.ignore_sticky_post,
                ignore_specific_sticky: _this.props.ignore_specific_sticky
            }
        })
        .then(function(response) {
            _this.setState({
                loading: false,
                posts: response.data.data
            })
            $(_this.wrapper.current).find('video').mediaelementplayer(window._wpmejsSettings)
        })
        .then(function(response){
            if(_this.props.layout === 'masonry') {
                const selector = _this.wrapper.current.querySelector('.df-posts-wrap');
                var masonry = new Isotope( selector, {
                    itemSelector: '.df-post-item'
                });
                masonry.layout();
                _this.setState({masonry: masonry})
            }
        })
        
    }

    get_post_items() {
        const _this = this;
        const props = _this.props;
        const content = props.content;
        const postItems = {};
        const postItems_without_class = {};
        const inner = [];
        const inner_without_class = [];
        const outer = [];
        const outer_without_class = [];
        const posts_item_object = [];

        if (!content || content.length === 0) {
            if(!lodash.isEqual(postItems, _this.state.post_items)) {
                _this.setState({post_items: {}, loading: true});
            }
            return {
                'postItems': postItems,
                'posts_item_object': posts_item_object
            }
        }

        content.map((data, i) => {
            const utils = window.ET_Builder.API.Utils;
            const item_props = data.props.attrs;
            const type = item_props.type ? item_props.type : 'select';
            var object = {};

            object.type = type;

            if(type !== 'select') {
                // title
                object.title_tag = item_props.title_tag ? item_props.title_tag : 'h2';
                // content
                object.post_content = item_props.post_content ? item_props.post_content : 'excerpt';
                object.use_post_excrpt = item_props.use_post_excrpt ? item_props.use_post_excrpt : 'off';
                object.excerpt_length = item_props.excerpt_length ? item_props.excerpt_length : '270';
                // meta
                object.date_format = item_props.date_format ? item_props.date_format : 'M j, Y';
                object.show_author_image = item_props.show_author_image ? item_props.show_author_image : 'off';
                object.author_image_size = item_props.author_image_size ? item_props.author_image_size : '16';
                object.hide_author_text = item_props.hide_author_text ? item_props.hide_author_text : 'off';
                object.comment_text = item_props.comment_text ? item_props.comment_text : 'off';
                // read more
                object.read_more_text = item_props.read_more_text ? item_props.read_more_text : 'Read More';
                // icon
                object.image_icon = item_props.image_icon !== '' ? item_props.image_icon : '';    
                object.image_alt_text = item_props.image_alt_text !== '' ? item_props.image_alt_text : '';   
                object.use_icon = item_props.use_icon ? item_props.use_icon : 'off';       
                object.font_icon = item_props.font_icon ? utils.processFontIcon(item_props.font_icon) : '5';       
                // image 
                object.image_size = item_props.image_size ? item_props.image_size : 'mid';
                // placement
                // object.placement = item_props.outside_wrapper ? item_props.outside_wrapper : 'off';
                // hover
                object.image_scale = item_props.image_scale ? item_props.image_scale : 'no-image-scale';
                object.overlay = item_props.overlay ? item_props.overlay : 'off';
                // overlay icon
                object.overlay_icon = item_props.overlay_icon ? item_props.overlay_icon : 'off';
                object.overlay_icon_reveal = item_props.overlay_icon_reveal ? item_props.overlay_icon_reveal : 'df-fade-up';
                object.overlay_font_icon = item_props.overlay_font_icon ? 
                    item_props.overlay_font_icon : '%%16%%';

                // custom text
                object.custom_text = item_props.custom_text ? 
                    item_props.custom_text : '';
                object.use_custom_field = item_props.use_custom_field
                    ? item_props.use_custom_field
                    : "";
                object.custom_field = item_props.custom_field
                    ? item_props.custom_field
                    : "";
                object.custom_field_before_label = item_props.custom_field_before_label
                    ? item_props.custom_field_before_label
                    : "";
                object.custom_field_after_label = item_props.custom_field_after_label
                    ? item_props.custom_field_after_label
                    : "";
                // acf field
                if(item_props.type === 'acf_fields') {
                    object.post_type_for_acf = item_props.post_type_for_acf ? item_props.post_type_for_acf : '';
                    object.acf_field = item_props.post_type_for_acf && item_props.post_type_for_acf !== 'select' ?
                        item_props[object.post_type_for_acf] : '';
                    object.acf_before_label = item_props.acf_before_label ?
                        item_props.acf_before_label : '';
                    object.acf_after_label = item_props.acf_after_label ?
                        item_props.acf_after_label : '';
                    object.acf_url_text = item_props.acf_url_text ? item_props.acf_url_text : '';
                    object.acf_url_new_window = item_props.acf_url_new_window ? item_props.acf_url_new_window : 'off';
                    object.acf_email_text = item_props.acf_email_text ? item_props.acf_email_text : '';
                }
                const element_before_after_depandancy = ['author', 'date', 'comments'];
                if(  element_before_after_depandancy.includes(item_props.type) ){
                    object.element_before_label = item_props.element_before_label ?
                        item_props.element_before_label : '';
                    object.element_after_label = item_props.element_after_label ?
                    item_props.element_after_label : '';
                }
                // reading_time field
                if (item_props.type === 'reading_time') {
                    object.reading_time_before_label = item_props.reading_time_before_label ?
                        item_props.reading_time_before_label : '';
                    object.reading_time_after_label = item_props.reading_time_after_label ?
                        item_props.reading_time_after_label : '';
                }
                // class
                object.module_vb_class =  'et-module-' + data.props._key;
                object.class =  data.props.matching.slug + '_' +  data.props.shortcode_index;

                // background
                object.background_enable_mask_style = item_props.background_enable_mask_style ? item_props.background_enable_mask_style : 'off';
                object.background_enable_pattern_style = item_props.background_enable_pattern_style ? item_props.background_enable_pattern_style : 'off';

                if (item_props.outside_wrapper === 'on') {
                    outer.push(object);
                    outer_without_class.push(lodash.omit(object, ['module_vb_class', 'class']));
                } else {
                    inner.push(object);
                    inner_without_class.push(lodash.omit(object, ['module_vb_class', 'class']));
                }
                posts_item_object.push(object);
            } 
        });

        postItems_without_class.inner = inner_without_class;
        postItems_without_class.outer = outer_without_class;

        postItems.inner = inner;
        postItems.outer = outer;

        const _postCombineItems = [...outer, ...inner];

        if(!lodash.isEqual(postItems_without_class, _this.state.post_items_without_class)) {
            _this.setState({
                post_items : postItems, 
                loading: true,
                post_items_without_class: postItems_without_class
            })
        }

        return {
            'postItems': postItems,
            'posts_item_object': _postCombineItems
        };
    }

    static arrow_icon(set = 'set_1', type) {
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
            selector:    '%%order_class%%',
            declaration: `
            --collapse-value: ${props.collapse_value && props.collapse_value !== '' ? props.collapse_value : '50px'};
            --align-items: ${props.vertical_align ? props.vertical_align : 'stretch'};
            --image-col-size: ${props.image_col_size ? props.image_col_size : '50%'};
            --gap: ${props.item_gap ? props.item_gap : '30px'};
            `
        }]);
        additionalCss.push([{
            selector:    '%%order_class%%',
            declaration: `
            --flex-direction: column;
            --order-2: unset;
            --align-items: center;
            --image-col-size: 100%;
            --collapse-value: 0;
            --gap: ${props.item_gap_mobile ? props.item_gap_mobile : '30px'}`,
            'device':'tablet'
        }]);
        additionalCss.push([{
            selector:    '%%order_class%% .df-postlist-featured-image',
            declaration: `
            width: ${props.mobile_image_size ? props.mobile_image_size : '100%'}`,
            'device':'tablet'
        }]);
        additionalCss.push([{
            selector:    '%%order_class%% .df-post-outer-wrap',
            declaration: `
            width: ${props.mobile_content_size ? props.mobile_content_size : '100%'}`,
            'device':'tablet'
        }]);
        // z-index
        if(props.featured_image_index && props.featured_image_index !== '0') {
            additionalCss.push([{
                selector:    '%%order_class%% .df-postlist-featured-image',
                declaration: `z-index: ${props.featured_image_index} !important;`
            }]);
        }
        if(props.content_wrapper_index && props.content_wrapper_index !== '0') {
            additionalCss.push([{
                selector:    '%%order_class%% .df-post-outer-wrap',
                declaration: `z-index: ${props.content_wrapper_index} !important;`
            }]);
        }
        // icon
        utility.process_icon_font_style({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'icon_image',
            'selector'          : '%%order_class%% .df-pl-icon'
        });
        utility.process_range_value({
            'props': props,
            'key': 'icon_size',
            'additionalCss': additionalCss,
            'default': '30px',
            'selector': '%%order_class%% .df-pl-icon',
            'type': 'font-size',
        });
        utility.df_process_string_attr({
            'props': props,
            'key': 'icon_color',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-pl-icon',
            'type': 'color'
        });
        utility.df_process_bg({
            'props': props,
            'additionalCss': additionalCss,
            'key': 'icon_background',
            'selector': '%%order_class%% .df-pl-icon'
        });
        // featured image with equal height
        additionalCss.push([{
            selector:    '%%order_class%% .df-post-item.equal-height .df-postlist-featured-image a',
            declaration: `min-height: ${props.image_min_height};`
        }]);
        additionalCss.push([{
            selector:    '%%order_class%% .df-post-item.equal-height .df-postlist-featured-image a',
            declaration: `min-height: ${props.mobile_image_min_height};`,
            'device':'tablet'
        }]);
        // pagination
        additionalCss.push([{
            selector:    '%%order_class%% .pagination .newer:after, %%order_class%% .pagination .next:after',
            declaration: `content: '${PostList.arrow_icon(props.next_prev_icon, 'next')}' !important;`
        }]);
        additionalCss.push([{
            selector:    '%%order_class%% .pagination .older:before, %%order_class%% .pagination .prev:before',
            declaration: `content: '${PostList.arrow_icon(props.next_prev_icon, 'prev')}' !important;`
        }]);

        utility.df_process_string_attr({
            'props': props,
            'key': 'alignment',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-post-inner-wrap',
            'type': 'text-align'
        });
        // spacing
        utility.process_margin_padding({
            'props': props,
            'key': 'item_outer_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-post-outer-wrap',
            'type': 'margin'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'item_outer_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-post-outer-wrap',
            'type': 'padding'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'post_item_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-post-item',
            'type': 'margin'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'post_item_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-post-item',
            'type': 'padding'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'item_inner_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-post-inner-wrap',
            'type': 'margin'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'item_inner_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-post-inner-wrap',
            'type': 'padding'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'pagination_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .pagination .page-numbers',
            'type': 'margin'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'pagination_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .pagination .page-numbers',
            'type': 'padding'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'icon_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-pl-icon',
            'type': 'padding'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'icon_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-pl-icon',
            'type': 'margin'
        });
        // background
        utility.df_process_bg({
            'props': props,
            'additionalCss': additionalCss,
            'key': 'item_background',
            'selector': '%%order_class%% .df-post-item'
        });
        utility.df_process_bg({
            'props': props,
            'additionalCss': additionalCss,
            'key': 'outer_wrapper_background',
            'selector': '%%order_class%% .df-post-outer-wrap'
        });
        utility.df_process_bg({
            'props': props,
            'additionalCss': additionalCss,
            'key': 'inner_wrapper_background',
            'selector': '%%order_class%% .df-post-inner-wrap'
        });
        utility.df_process_bg({
            'props': props,
            'additionalCss': additionalCss,
            'key': 'pagination_background',
            'selector': '%%order_class%% .pagination .page-numbers:not(.current)'
        });
        utility.df_process_bg({
            'props': props,
            'additionalCss': additionalCss,
            'key': 'active_pagination_background',
            'selector': '%%order_class%% .pagination .page-numbers.current',
            'important' : true
        });
        // pagination
        utility.df_process_string_attr({
            'props'             : props,
            'key'               : 'pagination_align',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .pagination',
            'type'              : 'justify-content',
            'default_value'     : 'center'
        });

        return additionalCss;
    }

    render_pagination(props) {
        const older = props.older_text !== '' ? props.older_text : 'Older Entries';
        const next = props.newer_text !== '' ? props.newer_text : 'Next Entries';

        return `<div class="pagination clearfix">
            <div class="alignleft">
                <a>&laquo; ${older}</a>
            </div>
            <div class="alignright">
                <a>${next} &raquo;</a>
            </div>
        </div>`;
    }

    render_output() {
        const props = this.props;
        var content = this.state.posts;
        var parser = new DOMParser();
        var doc = parser.parseFromString(content, "text/html");
        var post_items = this.get_post_items().posts_item_object;

        $(doc).find('.df-post-outer-wrap').each(function(index, element){
            var item = $(element).find('.df-item-wrap');
            item.each(function(i,e){
                var classes = $.grep(this.className.split(" "), function(v, i){
                    return v.indexOf('difl_postlistitem') === 0;
                }).join();
                $(e).removeClass(classes);
                if (post_items[i]) {
                    $(e).addClass(post_items[i]['class'])
                }
            })
        })

        return {__html: doc.querySelector('body').outerHTML};
    }

    render() {
        const props = this.props;

        return(
            <React.Fragment>
            <div>
                {this.state.loading === false ? 
                    <React.Fragment>
                        { props.content.length !== 0 ? props.content : '' }
                        <div className="df_postlist_container" dangerouslySetInnerHTML={this.render_output()} ref={this.wrapper} /> 
                    </React.Fragment>
                    : 
                    <div className="et-fb-preloader et-fb-preloader__loading">
                        <div className="et-fb-loader"/>
                    </div>
                }
            </div>
            </React.Fragment>
        )
    }
}
export default PostList;
