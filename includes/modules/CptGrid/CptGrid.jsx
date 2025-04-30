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

class CptGrid extends Component {
    static slug = 'difl_cptgrid';
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            posts: '',
            loading: true,
            masonry: null,
            cpt_items: [],
            cpt_items_without_class: []
        }

        this.wrapper = React.createRef();
        this.get_posts = this.get_posts.bind(this);
        this.render_output = this.render_output.bind(this);
        this.get_cpt_items = this.get_cpt_items.bind(this);
        this.get_terms = this.get_terms.bind(this);
        this.computedType = ['post_type', 'posts_number', 'post_display', 'include_categories', 'include_tags',
        'orderby', 'offset_number', 'layout', 'use_image_as_background', 'use_background_scale', 'show_pagination',
        'older_text', 'newer_text', 'equal_height', 'use_number_pagination', 'show_pagination', 'post_type_arch',
        'use_icon_only_at_pagination'];
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidUpdate(prevProps, prevState) {
        const _this = this;
        const props = _this.props;

        $('body').on('click','.df-pagination a', function(event) {
            event.preventDefault();
        })

        if(_this.state.loading) {
            setTimeout(_this.get_posts, 500);
        }

        if(_this.props.layout === 'masonry' && _this.state.masonry) {
            _this.state.masonry.layout()
        }

        _this.get_cpt_items();

        for (const index of _this.computedType) {
            if (prevProps[index] !== _this.props[index]) {
                if(_this.computedType.includes(index)){
                    _this.setState({loading: true})
                } 
            }
        } 

        const post_type             = props.post_type;
        const selected_taxonomy     = props['tax_for_' + post_type];
        
        if( prevProps['tax_for_' + post_type] !== props['tax_for_' + post_type] ) {
            _this.setState({loading: true})
        }
        if( prevProps[post_type + '_terms_' + selected_taxonomy] !== props[post_type + '_terms_' + selected_taxonomy] ) {
            _this.setState({loading: true})
        }

    }
    /**
     * Get terms by selected post type
     * and texonomy
     * 
     * @return array
     */
    get_terms() {
        const props                 = this.props;
        const post_type             = props.post_type;
        const selected_taxonomy     = props['tax_for_' + post_type];
        const selected_terms        = props[post_type + '_terms_' + selected_taxonomy];

        return {
            'selected_taxonomy' : selected_taxonomy,
            'selected_terms'    : selected_terms
        };
    }

    /**
     * Get all posts through ajax request
     * 
     */
    get_posts() {
        const _this = this;

        const get_tax_details = _this.get_terms();

        axios({
            method: 'post',
            url: window.ETBuilderBackend.ajaxUrl,
            params: {
                action : 'df_cpt_grid'
            },
            data : {
                et_admin_load_nonce: window.et_fb_options.et_admin_load_nonce,
                cptItems: _this.get_cpt_items().cptItems,
                post_type: _this.props.post_type,
                posts_number: _this.props.posts_number,
                offset_number: _this.props.offset_number,
                post_display: _this.props.post_display,
                selected_terms: get_tax_details.selected_terms,
                selected_taxonomy: get_tax_details.selected_taxonomy,
                orderby: _this.props.orderby,
                layout: _this.props.layout,
                use_image_as_background: _this.props.use_image_as_background,
                use_background_scale: _this.props.use_background_scale,
                equal_height: _this.props.equal_height,
                show_pagination: _this.props.show_pagination,
                use_number_pagination: _this.props.use_number_pagination,
                older_text: _this.props.older_text,
                newer_text: _this.props.newer_text,
                use_current_loop: _this.props.use_current_loop ? _this.props.use_current_loop : 'off',
                post_type_arch: _this.props.post_type_arch,
                use_icon_only_at_pagination: _this.props.use_icon_only_at_pagination
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
                const selector = _this.wrapper.current.querySelector('.df-cpts-wrap');
                var masonry = new Isotope( selector, {
                    itemSelector: '.df-cpt-item'
                });
                masonry.layout();
                _this.setState({masonry: masonry})
            }
        })
        
    }

    get_cpt_items() {
        const _this = this;
        const props = _this.props;
        const content = props.content;
        const cptItems = {};
        const cptItems_without_class = {};
        const inner = [];
        const inner_without_class = [];
        const outer = [];
        const outer_without_class = [];
        const cpt_item_object = [];

        if (!content || content.length === 0) {
            if(!lodash.isEqual(cptItems, _this.state.cpt_items)) {
                _this.setState({
                    cpt_items : cptItems, 
                    loading: true
                })
            }
            return {
                'cptItems': cptItems,
                'cpt_item_object': cpt_item_object
            }
        };

        content.map((data, i) => {
            const utils = window.ET_Builder.API.Utils;
            const item_props = data.props.attrs;
            const type = item_props.type ? item_props.type : 'select';
            var object = {};

            object.type = type;

            if( 'select' !== type ) {
                object.module_vb_class =  'et-module-' + data.props._key;
                object.class =  data.props.matching.slug + '_' +  data.props.shortcode_index;
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
                object.use_icon = item_props.use_icon ? item_props.use_icon : 'off';       
                object.font_icon = item_props.font_icon ? utils.processFontIcon(item_props.font_icon) : '5';       
                // image 
                object.image_size = item_props.image_size ? item_props.image_size : 'mid';
                // placement
                object.placement = item_props.outside_wrapper ? item_props.outside_wrapper : 'off';
                // hover
                object.image_scale = item_props.image_scale ? item_props.image_scale : 'no-image-scale';
                object.overlay = item_props.overlay ? item_props.overlay : 'off';
                // overlay icon
                object.overlay_icon = item_props.overlay_icon ? item_props.overlay_icon : 'off';
                object.overlay_icon_reveal = item_props.overlay_icon_reveal ? item_props.overlay_icon_reveal : 'df-fade-up';
                object.overlay_font_icon = item_props.overlay_font_icon ? 
                    item_props.overlay_font_icon : '%%16%%';

                // custom text
                object.custom_text = item_props.custom_text ? item_props.custom_text : '';
                object.use_custom_field = item_props.use_custom_field ? item_props.use_custom_field : '';
                object.custom_field = item_props.custom_field ? item_props.custom_field : '';
                object.custom_field_before_label   = item_props.custom_field_before_label ? item_props.custom_field_before_label : '';
                object.custom_field_after_label    = item_props.custom_field_after_label ? item_props.custom_field_after_label : '';

                // taxonomy
                const taxonomy = item_props['tax_for_' + item_props.post_type];
                object.taxonomy = taxonomy ? taxonomy : '';

                // custom taxonomy separator
                object.separator_tax = ', ';
                if('on' === item_props.enable_tax_custom_separator){
                    object.separator_tax = item_props.tax_custom_separator_text && "" !== item_props.tax_custom_separator_text ? item_props.tax_custom_separator_text : ', ';
                    object.tax_before_label = item_props.tax_before_label ? item_props.tax_before_label : '';
                    object.tax_after_label = item_props.tax_after_label ? item_props.tax_after_label : '';
                }

                // background
                object.background_enable_mask_style = item_props.background_enable_mask_style ? item_props.background_enable_mask_style : 'off';
                object.background_enable_pattern_style = item_props.background_enable_pattern_style ? item_props.background_enable_pattern_style : 'off';

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

                // pod field
                if(item_props.type === 'pod_fields') {
                    object.post_type_for_pod  = item_props.post_type_for_pod ? item_props.post_type_for_pod : '';
                    object.pod_field          = item_props.post_type_for_pod && item_props.post_type_for_pod !== 'select' ? item_props["pod-" + object.post_type_for_pod] : '';
                    object.pod_before_label   = item_props.pod_before_label ? item_props.pod_before_label : '';
                    object.pod_after_label    = item_props.pod_after_label ? item_props.pod_after_label : '';
                    object.pod_url_text       = item_props.pod_url_text ? item_props.pod_url_text : '';
                    object.pod_url_new_window = item_props.pod_url_new_window ? item_props.pod_url_new_window : 'off';
                    object.pod_email_text     = item_props.pod_email_text ? item_props.pod_email_text : '';
                }
                
                // meta box field
                if (item_props.type === 'metabox_fields') {
                    object.post_type_for_metabox    = item_props.post_type_for_metabox ? item_props.post_type_for_metabox : '';
                    object.metabox_field            = item_props.post_type_for_metabox && item_props.post_type_for_metabox !== 'select' ? item_props["metabox-" + object.post_type_for_metabox] : '';
                    object.metabox_before_label     = item_props.metabox_before_label ? item_props.metabox_before_label : '';
                    object.metabox_after_label      = item_props.metabox_after_label ? item_props.metabox_after_label : '';
                    object.metabox_url_text         = item_props.metabox_url_text ? item_props.metabox_url_text : '';
                    object.metabox_url_new_window   = item_props.metabox_url_new_window ? item_props.metabox_url_new_window : 'off';
                    object.metabox_email_text       = item_props.metabox_email_text ? item_props.metabox_email_text : '';
                }

                // reading_time field
                if (item_props.type === 'reading_time') {
                    object.reading_time_before_label = item_props.reading_time_before_label ?
                        item_props.reading_time_before_label : '';
                    object.reading_time_after_label = item_props.reading_time_after_label ?
                        item_props.reading_time_after_label : '';
                }
                if (item_props.outside_wrapper === 'on') {
                    outer.push(object);
                    outer_without_class.push(lodash.omit(object, ['module_vb_class', 'class']));
                } else {
                    inner.push(object);
                    inner_without_class.push(lodash.omit(object, ['module_vb_class', 'class']));
                }
                cpt_item_object.push(object);
            } 
        });

        cptItems_without_class.inner = inner_without_class;
        cptItems_without_class.outer = outer_without_class;

        cptItems.inner = inner;
        cptItems.outer = outer;

        const _cptCombineItems = [...outer, ...inner];

        if(!lodash.isEqual(cptItems_without_class, _this.state.cpt_items_without_class)) {
            _this.setState({
                cpt_items : cptItems, 
                loading: true,
                cpt_items_without_class: cptItems_without_class
            })
        }

        return {
            'cptItems': cptItems,
            'cpt_item_object': _cptCombineItems
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
            selector:    '%%order_class%% .pagination .older:before, %%order_class%% .pagination .prev:before',
            declaration: `content: '${CptGrid.arrow_icon(props.next_prev_icon, 'prev')}';`
        }]);
        additionalCss.push([{
            selector:    '%%order_class%% .pagination .newer:after, %%order_class%% .pagination .next:after',
            declaration: `content: '${CptGrid.arrow_icon(props.next_prev_icon, 'next')}';`
        }]);

        utility.df_process_string_attr({
            'props': props,
            'key': 'alignment',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-cpt-inner-wrap',
            'type': 'text-align'
        });
        // spacing
        utility.process_margin_padding({
            'props': props,
            'key': 'item_wrapper_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-cpt-outer-wrap',
            'type': 'padding'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'item_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-cpt-inner-wrap',
            'type': 'margin'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'item_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-cpt-inner-wrap',
            'type': 'padding'
        });
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
        utility.process_margin_padding({
            'props': props,
            'key': 'wrapper_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-cpts-wrap',
            'type': 'margin'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'wrapper_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-cpts-wrap',
            'type': 'padding'
        });
        // background
        utility.df_process_bg({
            'props': props,
            'additionalCss': additionalCss,
            'key': 'item_background',
            'selector': '%%order_class%% .df-cpt-inner-wrap'
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
        // column
        if ( props.column && props.column !== '') {
            const column_desktop = (100 / parseInt(props.column)) + '%' ;
            additionalCss.push([{
                selector:    '%%order_class%% .df-cpt-item',
                declaration: `width: ${column_desktop};`,
            }]);
        }
        if ( props.column_tablet && props.column_tablet !== '') {
            const column_tablet = (100 / parseInt(props.column_tablet)) + '%' ;
            additionalCss.push([{
                selector:    '%%order_class%% .df-cpt-item',
                declaration: `width: ${column_tablet};`,
                'device':'tablet'
            }]);
        }
        if ( props.column_phone && props.column_phone !== '') {
            const column_phone = (100 / parseInt(props.column_phone)) + '%' ;
            additionalCss.push([{
                selector:    '%%order_class%% .df-cpt-item',
                declaration: `width: ${column_phone};`,
                'device':'phone'
            }]);
        }
        // gutter
        if ( props.gutter && props.gutter !== '') {
            const gutter_desktop = parseInt(props.gutter) / 2 ;
            additionalCss.push([{
                selector:    '%%order_class%% .df-cpt-item',
                declaration: `padding-left: ${gutter_desktop}px; padding-right: ${gutter_desktop}px; padding-bottom: ${parseInt(props.gutter)}px;`,
            }]);
            additionalCss.push([{
                selector:    '%%order_class%% .df_cptgrid_container .df-cpts-wrap',
                declaration: `margin-left:-${gutter_desktop}px;margin-right:-${gutter_desktop}px;`
            }]);
        }
        // gutter tablet
        if ( props.gutter_tablet && props.gutter_tablet !== '') {
            const gutter_tablet = parseInt(props.gutter_tablet) / 2 ;
            additionalCss.push([{
                selector:    '%%order_class%% .df-cpt-item',
                declaration: `padding-left: ${gutter_tablet}px; padding-right: ${gutter_tablet}px; padding-bottom: ${parseInt(props.gutter_tablet)}px;`,
                'device':'tablet'
            }]);
            additionalCss.push([{
                selector:    '%%order_class%% .df_cptgrid_container .df-cpts-wrap',
                declaration: `margin-left:-${gutter_tablet}px;margin-right:-${gutter_tablet}px;`,
                'device':'tablet'
            }]);
        }
        // gutter phone
        if ( props.gutter_phone && props.gutter_phone !== '') {
            const gutter_phone = parseInt(props.gutter_phone) / 2 ;
            additionalCss.push([{
                selector:    '%%order_class%% .df-cpt-item',
                declaration: `padding-left: ${gutter_phone}px; padding-right: ${gutter_phone}px; padding-bottom: ${parseInt(props.gutter_phone)}px;`,
                'device':'phone'
            }]);
            additionalCss.push([{
                selector:    '%%order_class%% .df_cptgrid_container .df-cpts-wrap',
                declaration: `margin-left:-${gutter_phone}px;margin-right:-${gutter_phone}px;`,
                'device':'phone'
            }]);
        }
        // pagination
        utility.df_process_string_attr({
            'props'             : props,
            'key'               : 'pagination_align',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .pagination',
            'type'              : 'justify-content',
            'default_value'     : 'center'
        });

        if(props.use_image_as_background && props.use_image_as_background ==='on' && props.use_background_scale && props.use_background_scale === 'on' ){
            additionalCss.push([{
                selector:    '.difl_cptgrid%%order_class%%',
                declaration: `z-index: 1`
            }]);
        }

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
        var cpt_items = this.get_cpt_items().cpt_item_object;

        $(doc).find('.df-cpt-outer-wrap').each(function(index, element){
            var item = $(element).find('.df-item-wrap');
            item.each(function(i,e){
                var classes = $.grep(this.className.split(" "), function(v, i){
                    return v.indexOf('difl_cptitem') === 0;
                }).join();
                $(e).removeClass(classes);
                if (cpt_items[i]) {
                    $(e).addClass(cpt_items[i]['class'])
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
                        <div className="df_cptgrid_container" dangerouslySetInnerHTML={this.render_output()} ref={this.wrapper} /> 
                        : 
                        <div className="et-fb-preloader et-fb-preloader__loading">
                            <div className="et-fb-loader"/>
                        </div>
                    }
                    { props.content.length !== 0 ? props.content : '' }
                </div>
            </React.Fragment>
        )
    }
}

export default CptGrid;