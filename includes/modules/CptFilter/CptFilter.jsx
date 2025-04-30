// External Dependencies
import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import _ from 'lodash';
import utility from '../../../scripts/df_scripts/utilities';
import Isotope from 'isotope-layout';
import '../../../public/js/lib/ion.rangeSlider.min';
// Internal Dependencies
import './../../../public/css/lib/ion.rangeSlider.min.css';
import './style.css';

var lodash = _.noConflict();

class CptFilter extends Component {
    static slug = 'difl_cptfilter';
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            posts: '',
            loading: true,
            iso: null,
            cpt_items: [],
            cpt_items_without_class: []
        }

        this.wrapper = React.createRef();
        this.get_posts = this.get_posts.bind(this);
        this.render_output = this.render_output.bind(this);
        this.get_cpt_items = this.get_cpt_items.bind(this);
        this.get_terms = this.get_terms.bind(this);
        this.computedType = ['post_type', 'posts_number', 'post_display', 'include_categories', 'include_tags', 'multi_filter_type',
        'orderby', 'offset_number', 'layout', 'use_image_as_background', 'use_background_scale', 'show_pagination',
        'older_text', 'newer_text', 'equal_height', 'use_number_pagination', 'show_pagination', 'use_multi_filter_label', 'prefix_multi_filter_label',
         'single_label_text', 'enable_single_filter_label', 'use_search_bar','search_bar_button_text','search_bar_placeholder_text','use_search_bar_icon', 
         'search_bar_font_icon', 'search_button_icon_placement', 'use_only_search_bar_icon', 'use_load_more', 'use_load_more_icon', 'load_more_font_icon', 'load_more_icon_pos', 'use_load_more_text',
        'all_items', 'all_items_text','multi_filter_dropdown_placeholder_prefix', 'multi_filter_item_in_row', 'entire_item_clickable', 'enable_mobile_responsive', 'use_author_filter', 'show_filter_label', 'author_filter_field_type'];

        this.notice = {
            'notice1': '<h2 class="df-empty-notice">Please setup PostType, Taxonomy and Terms to continue.</h2>',
            'notice2': '<h2 class="df-empty-notice">Please add new items to continue.</h2>'
        }
    }

    componentDidMount() {
        this._isMounted = true;
        const props = this.props;
        if(props.post_type === '' || props.post_type === 'select') {
            this.setState({df_notice: 'Select a PostType.'})
        }
        if('multiple_filter' == props['post_display']){
            this.update_computed_data_for_multi_filter();
        }
        document.addEventListener("scroll", this.dfHandleScroll);
    }

    componentWillUnmount() {
        this._isMounted = false;
        document.removeEventListener("scroll", this.dfHandleScroll);
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
        if( prevProps['tax_list_for_' + post_type] !== props['tax_list_for_' + post_type] ) {
            _this.setState({loading: true})
        }
        if( prevProps[post_type + '_terms_' + selected_taxonomy] !== props[post_type + '_terms_' + selected_taxonomy] ) {
            _this.setState({loading: true})
        }

        if( prevProps['acf_filter_option_' + post_type] !== props['acf_filter_option_' + post_type] ) {
            _this.setState({loading: true})
        }

        if( prevProps['pod_filter_option_' + post_type] !== props['pod_filter_option_' + post_type] ) {
            _this.setState({loading: true})
        }

        if(_this.state.iso) {
            _this.state.iso.layout();
            setTimeout(() => {
                _this.state.iso.layout();
            }, 100);

            if( _this.wrapper.current && _this.props.equal_height === 'on' ) {
                const entries = _this.wrapper.current.querySelectorAll('.df-cpt-item');
                var height = 1;
        
                _this.state.iso.on( 'layoutComplete', function(  ) {
                    entries.forEach(function (v) {
                        if( parseInt(v.scrollHeight) > parseInt(height) ) {
                            height = v.scrollHeight;
                        }
                    });
                    height = parseInt(height);
                    entries.forEach(function (v) {
                        v.style.minHeight = height + 'px';
                    });
                });
            }
            
        }

        if('multiple_filter' === props['post_display']){
            this.update_computed_data_for_multi_filter();
        }

    }

    update_computed_data_for_multi_filter(){
        let fields = [];
        for (const [key, value] of Object.entries(this.props)) {
            if (key.includes('tax_filter_field_type_') || key.includes('tax_list_for_') || key.includes('acf_filter_field_type_') || key.includes('acf_filter_') || key.includes('acf_filter_option_') || key.includes('pod_filter_field_type_') || key.includes('pod_filter_') || key.includes('pod_filter_option_')){
                if(!this.computedType.includes(key)){
                    fields.push(key);
                }
            }
        }

        this.computedType = [...this.computedType, ...fields];
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
        const selected_texonomy_list = props['tax_list_for_' + post_type];
       
        return {
            'selected_taxonomy' : selected_taxonomy,
            'selected_terms'    : selected_terms,
            'selected_texonomy_list' : selected_texonomy_list
        };
    }

    /**
     * Get all posts through ajax request
     * 
     */
    get_posts() {
        const _this = this;

        const get_tax_details = _this.get_terms();
        const fields_type_data = _this.get_fields_type();
        axios({
            method: 'post',
            url: window.ETBuilderBackend.ajaxUrl,
            params: {
                action : 'df_cpt_filter'
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
                selected_texonomy_list: get_tax_details.selected_texonomy_list,
                multi_filter_type: _this.props.multi_filter_type,
                multi_filter_dropdown_placeholder_prefix: _this.props.multi_filter_dropdown_placeholder_prefix,
                use_multi_filter_label: _this.props.use_multi_filter_label,
                single_label_text: _this.props.single_label_text,
                prefix_multi_filter_label:_this.props.prefix_multi_filter_label,
                enable_single_filter_label:_this.props.enable_single_filter_label,
                orderby: _this.props.orderby,
                layout: _this.props.layout,
                use_image_as_background: _this.props.use_image_as_background,
                use_background_scale: _this.props.use_background_scale,
                equal_height: _this.props.equal_height,
                show_pagination: _this.props.show_pagination,
                use_number_pagination: _this.props.use_number_pagination,
                older_text: _this.props.older_text,
                newer_text: _this.props.newer_text,
                use_search_bar: _this.props.use_search_bar,
                use_search_bar_icon: _this.props.use_search_bar_icon,
                search_bar_font_icon:_this.props.search_bar_font_icon,
                search_button_icon_placement: _this.props.search_button_icon_placement,
                use_only_search_bar_icon:_this.props.use_only_search_bar_icon,
                search_bar_button_text: _this.props.search_bar_button_text,
                search_bar_placeholder_text: _this.props.search_bar_placeholder_text,
                load_more: _this.props.use_load_more,
                use_load_more_icon: _this.props.use_load_more_icon,
                load_more_font_icon: _this.props.load_more_font_icon,
                load_more_icon_pos: _this.props.load_more_icon_pos,
                use_load_more_text: _this.props.use_load_more_text,
                all_items: _this.props.all_items,
                all_items_text: _this.props.all_items_text,
                acf_filter : _this.props['acf_filter_' + _this.props.post_type],
                acf_filter_options: _this.props['acf_filter_option_' + _this.props.post_type],
                pod_filter : _this.props['pod_filter_' + _this.props.post_type],
                pod_filter_options: _this.props['pod_filter_option_' + _this.props.post_type],
                multi_filter_fields_type: fields_type_data,
	            use_author_filter: _this.props.use_author_filter,
	            author_filter_field_type: _this.props.author_filter_field_type ? _this.props.author_filter_field_type : 'select',
	            show_filter_label: _this.props.show_filter_label,
                entire_item_clickable: _this.props.entire_item_clickable ? _this.props.entire_item_clickable : 'off',

               enable_mobile_responsive: _this.props.enable_mobile_responsive
            }
        })
        .then(function(response) {
            _this.setState({
                loading: false,
                posts: response.data.data
            })
            $(_this.wrapper.current).find('video').mediaelementplayer(window._wpmejsSettings)
        })
        .then(function(){
                const selector = _this.wrapper.current.querySelector('.df-cpts-inner-wrap');
                if(selector) {
                    const postOrderByInit = parseInt(_this.props.orderby);
                    const postOrderByString = ['date', 'date', 'title', 'title', 'random', 'menu_order', 'menu_order'];
                    const postOrderBy = postOrderByString[ postOrderByInit - 1];
                    let isOrderAsc = postOrderByInit % 2 === 1;
                    
                    // on server 'random' has descending order
                    if('random' === postOrderBy ){
                        isOrderAsc = false;
                    }
            
                    // isotope order ascending on number
                    if('date' === postOrderBy || 'menu_order' === postOrderBy){
                        isOrderAsc = !isOrderAsc;
                    }
                    var iso = new Isotope( selector, {
                        layoutMode: _this.props.layout, // this.props.layout masonry
                        itemSelector: '.df-cpt-item',
                        percentPosition: true,
                        stagger: 60,
                        sortBy: postOrderBy,
                        sortAscending: isOrderAsc,
                        getSortData: {
                            [postOrderBy]: `[data-order] ${'title' !== postOrderBy ? 'parseInt' : ''}`
                        }
                    });
                    _this.setState({iso: iso})
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

            if(type !== 'select') {
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
                object.custom_text = item_props.custom_text ? 
                    item_props.custom_text : '';
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

    get_fields_type(){
        let fields_type = {};
        for (const [key, value] of Object.entries(this.props)) {
            if (key.includes('tax_filter_field_type_'+this.props.post_type) || key.includes('acf_filter_field_type_'+this.props.post_type) || key.includes('pod_filter_field_type_'+this.props.post_type)){
                fields_type[key] = value;
            }
        }
        return fields_type;
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

        const filter_modile_view_header = "%%order_class%% .df_phn_resp_cls .difl_filter_short_desc_card_header";
        const filter_modile_view_footer = "%%order_class%% .df_phn_resp_cls .difl_filter_short_desc_card";

        additionalCss.push([{
            selector:    '%%order_class%% .pagination .older:before, %%order_class%% .pagination .prev:before',
            declaration: `content: '${CptFilter.arrow_icon(props.next_prev_icon, 'prev')}';`
        }]);
        additionalCss.push([{
            selector:    '%%order_class%% .pagination .newer:after, %%order_class%% .pagination .next:after',
            declaration: `content: '${CptFilter.arrow_icon(props.next_prev_icon, 'next')}';`
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
            'key': 'item_outer_background',
            'selector': '%%order_class%% .df-cpt-outer-wrap'
        });
        utility.df_process_bg({
            'props': props,
            'additionalCss': additionalCss,
            'key': 'item_inner_background',
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
                selector:    '%%order_class%% .df_cptfilter_container .df-cpts-inner-wrap',
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
                selector:    '%%order_class%% .df_cptfilter_container .df-cpts-inner-wrap',
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
                selector:    '%%order_class%% .df_cptfilter_container .df-cpts-inner-wrap',
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
        // overflow
        if( props.outer_wrpper_visibility && props.outer_wrpper_visibility !== 'default' ) {
            utility.df_process_string_attr({
                'props'             : props,
                'key'               : 'outer_wrpper_visibility',
                'additionalCss'     : additionalCss,
                'selector'          : '%%order_class%% .df-cpt-outer-wrap',
                'type'              : 'overflow'
            });
        }
        if( props.inner_wrpper_visibility && props.inner_wrpper_visibility !== 'default' ) {
            utility.df_process_string_attr({
                'props'             : props,
                'key'               : 'inner_wrpper_visibility',
                'additionalCss'     : additionalCss,
                'selector'          : '%%order_class%% .df-cpt-inner-wrap',
                'type'              : 'overflow'
            });
        }
        
        // Filter Buttons
        utility.df_process_bg({
            'props': props,
            'additionalCss': additionalCss,
            'key': 'filter_buttons',
            'selector': '%%order_class%% .df-cpt-filter-nav-item, %%order_class%%.difl_cptfilter .filter_section .df_author_filter:not(:has(.dropdown-container)) ul li'
        });
        utility.df_process_string_attr({
            'props'             : props,
            'key'               : 'filter_button_align',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .df-cpt-filter-nav, %%order_class%%.difl_cptfilter .filter_section .df_author_filter ul',
            'type'              : 'justify-content',
            'default_value'     : 'center'
        });
        utility.process_range_value({
            'props'             : props,
            'key'               : 'filter_nav_gap',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .df-cpt-filter-nav, %%order_class%%.difl_cptfilter .filter_section .df_author_filter ul',
            'type'              : 'gap',
            'unit'              : 'px',
            'default_value'     : '20',
            'important'         : false,
            'negative'          : false,
            'fixed_unit'        : 'px'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'filter_buttons_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-cpt-filter-nav-item, %%order_class%%.difl_cptfilter .filter_section .df_author_filter',
            'type': 'margin'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'filter_buttons_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-cpt-filter-nav-item, %%order_class%%.difl_cptfilter .filter_section .df_author_filter',
            'type': 'padding'
        });
        // active filter button
        utility.df_process_bg({
            'props': props,
            'additionalCss': additionalCss,
            'key': 'filter_button_active',
            'selector': '%%order_class%% .df-cpt-filter-nav-item.df-active, %%order_class%% .filter_section .filter_elements .filter_element_card, %%order_class%%.difl_cptfilter .filter_section .df_author_filter:not(:has(.dropdown-container)) ul li.df_author_active'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'filter_button_active_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-cpt-filter-nav-item.df-active, %%order_class%% .filter_section .filter_elements .filter_element_card, %%order_class%%.difl_cptfilter .filter_section .df_author_filter:not(:has(.dropdown-container)) ul li.df_author_active',
            'type': 'margin'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'filter_button_active_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-cpt-filter-nav-item.df-active, %%order_class%% .filter_section .filter_elements .filter_element_card, %%order_class%%.difl_cptfilter .filter_section .df_author_filter:not(:has(.dropdown-container)) ul li.df_author_active',
            'type': 'padding'
        });
        // Multi Filter Input
         utility.df_process_bg({
            'props': props,
            'additionalCss': additionalCss,
            'key': 'multi_filter_input_bg',
            'selector': '%%order_class%% .filter_section ul li select , %%order_class%% .filter_section li .multi-select-component'
        });

        utility.df_process_bg({
            'props': props,
            'additionalCss': additionalCss,
            'key': 'multi_filter_label_bg',
            'selector': '%%order_class%% .filter_section ul li span.multi_filter_label'
        });

        utility.df_process_bg({
            'props': props,
            'additionalCss': additionalCss,
            'key': 'multi_filter_range_label_bg',
            'selector': '%%order_class%% .filter_section ul li span.multi_filter_range_label'
        });
        if(props.multi_filter_label_position && props.multi_filter_label_position === 'on_top'){
            additionalCss.push([{
                selector:    '%%order_class%% .filter_section ul li',
                declaration: `display: flex; flex-direction:column;`
            }]);
        }
        if('multiple_filter' === props['post_display'] ){
            utility.df_process_bg({
                'props': props,
                'additionalCss': additionalCss,
                'key': 'multi_filter_container_bg',
                'selector': '%%order_class%% .filter_section'
            });
            utility.df_process_string_attr({
                'props'             : props,
                'key'               : 'multi_filter_item_align',
                'additionalCss'     : additionalCss,
                'selector'          : '%%order_class%% .df_cptfilter_container.df_filter_sidebar',
                'type'              : 'align-items',
                'important'         : 'true'
            });
            utility.df_process_bg({
                'props': props,
                'additionalCss': additionalCss,
                'key': 'multi_filter_checkbox_field_bg',
                'selector': '%%order_class%% .filter_section li .checkbox_container '
            });
        }

        if('on' === props.multi_filter_item_full_width ){
            additionalCss.push([{
                selector:    '%%order_class%% .filter_section ul li, %%order_class%% .filter_section ul li select, %%order_class%% .filter_section ul li span.multi_filter_label',
                declaration: `width: 100%;`
            }]);
        }
        utility.df_process_string_attr({
            'props'             : props,
            'key'               : 'multi_filter_input_align',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .filter_section ul.multi_filter_container',
            'type'              : 'justify-content',
            'default_value'     : 'center'
        });
        if ( 'multiple_filter' === props['post_display'] && 'default' === props['multi_filter_placement']  ){
            utility.process_range_value({
                'props'             : props,
                'key'               : 'multi_filter_input_gap',
                'additionalCss'     : additionalCss,
                'selector'          : '%%order_class%% .df_cptfilter_container:not(.df_filter_sidebar) .filter_section ul.multi_filter_container > li:not(:last-child)',
                'type'              : 'padding-right',
                'unit'              : 'px',
                'default_value'     : '20',
                'important'         : false,
                'negative'          : false,
                'fixed_unit'        : 'px'
            });
            utility.process_range_value({
                'props'             : props,
                'key'               : 'multi_filter_input_gap',
                'additionalCss'     : additionalCss,
                'selector'          : '%%order_class%% .df_cptfilter_container:not(.df_filter_sidebar) .filter_section ul',
                'type'              : 'row-gap',
                'unit'              : 'px',
                'default_value'     : '20',
                'important'         : false,
                'negative'          : false,
                'fixed_unit'        : 'px'
            });
            if('off' === props.multi_filter_item_full_width){
                utility.process_range_value({
                    'props'             : props,
                    'key'               : 'multi_filter_label_min_width',
                    'additionalCss'     : additionalCss,
                    'selector'          : '%%order_class%% .df_cptfilter_container:not(.df_filter_sidebar) .filter_section ul li .multi_filter_label',
                    'type'              : 'min-width',
                    'unit'              : 'px',
                    'default_value'     : '150px',
                    'important'         : false,
                    'negative'          : false,
                    'fixed_unit'        : 'px'
                });
                utility.process_range_value({
                    'props'             : props,
                    'key'               : 'multi_filter_range_label_min_width',
                    'additionalCss'     : additionalCss,
                    'selector'          : '%%order_class%% .df_cptfilter_container:not(.df_filter_sidebar) .filter_section ul li .multi_filter_range_label',
                    'type'              : 'min-width',
                    'unit'              : 'px',
                    'default_value'     : '50px',
                    'important'         : false,
                    'negative'          : false,
                    'fixed_unit'        : 'px'
                });
            }

            const multi_filter_item_in_row = props['multi_filter_item_in_row'] ? props['multi_filter_item_in_row'] : '3';
            const multi_filter_item_in_row_tablet = props['multi_filter_item_in_row_tablet'] ? props['multi_filter_item_in_row_tablet'] : multi_filter_item_in_row;
            const multi_filter_item_in_row_phone = props['multi_filter_item_in_row_phone'] ? props['multi_filter_item_in_row_phone'] : multi_filter_item_in_row_tablet;

			const multi_filter_item_in_row_data = (multi_filter_item_in_row) => {
				let width = '25%',flex = '24%';
				switch (multi_filter_item_in_row){
					case '1':
						flex = '100%';
						width = '100%';
						break;
					case '2':
						flex = '50%';
						width = '50%';
						break;
					case '3':
						flex = '33%';
						width = '33.33%';
						break;
					case '5':
						flex = '19%';
						width = '20%';
						break;
					case '6':
						flex = '16%';
						width = '16.66%';
						break;
					default:
						flex = '24%';
						width = '25%';
						break;
				}

				return {
					flex: flex,
					width: width
				};
			}

	        additionalCss.push( [
		        {
			        selector: '%%order_class%% .filter_section ul.multi_filter_container > li',
			        declaration: `width: ${multi_filter_item_in_row_data( multi_filter_item_in_row ).flex};max-width:${multi_filter_item_in_row_data( multi_filter_item_in_row ).width};`
		        },
		        {
			        selector: '%%order_class%% .filter_section ul.multi_filter_container > li',
			        declaration: `width: ${multi_filter_item_in_row_data( multi_filter_item_in_row_tablet ).flex};max-width:${multi_filter_item_in_row_data( multi_filter_item_in_row_tablet ).width};`,
			        'device':'tablet'
		        },
		        {
			        selector: '%%order_class%% .filter_section ul.multi_filter_container > li',
			        declaration: `width: ${multi_filter_item_in_row_data( multi_filter_item_in_row_phone ).flex};max-width:${multi_filter_item_in_row_data( multi_filter_item_in_row_phone ).width};`,
			        'device':'phone'
		        }
	        ] );
        }
        
        if ( 'multiple_filter' === props['post_display'] && 'default' !== props['multi_filter_placement']  ){
            utility.process_range_value({
                'props'             : props,
                'key'               : 'multi_filter_input_gap',
                'additionalCss'     : additionalCss,
                'selector'          : '%%order_class%% .df_cptfilter_container.df_filter_sidebar .filter_section ul.multi_filter_container > li:not(:last-child)',
                'type'              : 'margin-bottom',
                'unit'              : 'px',
                'default_value'     : '20',
                'important'         : false,
                'negative'          : false,
                'fixed_unit'        : 'px'
            });

            additionalCss.push([{
                selector:    '%%order_class%% .filter_section ul li, %%order_class%% .filter_section ul li .checkbox_container,%%order_class%% .filter_section ul li .dropdown-container, %%order_class%% .filter_section ul li span.multi_filter_label',
                declaration: `width: auto;`
            }]);
        }
        if ( 'multiple_filter' === props['post_display'] && 'on' === props['enable_mobile_responsive']  ){

            const multi_filter_input_gap_for_mobile = props.multi_filter_input_gap_for_mobile ? parseInt(props.multi_filter_input_gap_for_mobile) : '20';
            additionalCss.push([{
                selector:    '%%order_class%% .df_cptfilter_container .filter_section ul.multi_filter_container> li:not(:last-child)',
                declaration: `margin-bottom: ${multi_filter_input_gap_for_mobile}px;padding-right:0px !important;`,
                'device':'phone'
            }]);

            utility.process_color({
                'props': props,
                'additionalCss': additionalCss,
                'key': 'filter_button_active_container_header',
                'selector': filter_modile_view_header,
                'type': 'background'
            });
            utility.process_color({
                'props': props,
                'additionalCss': additionalCss,
                'key': 'filter_button_active_container_header_cls_btn_icon_color',
                'selector': "%%order_class%% .df_phn_resp_cls:after",
                'type': 'color'
            });
            utility.process_color({
                'props': props,
                'additionalCss': additionalCss,
                'key': 'filter_button_active_container_header_cls_btn_bg',
                'selector': "%%order_class%% .df_phn_resp_cls:after",
                'type': 'background'
            });
            utility.process_color({
                'props': props,
                'additionalCss': additionalCss,
                'key': 'filter_button_active_container_footer',
                'selector': filter_modile_view_footer,
                'type': 'background'
            });
            utility.process_color({
                'props': props,
                'additionalCss': additionalCss,
                'key': 'filter_button_active_container_show',
                'selector': `${filter_modile_view_footer} a.difl_filter_show_btn`,
                'type': 'background'
            });
            utility.process_color({
                'props': props,
                'additionalCss': additionalCss,
                'key': 'filter_button_active_container_cancel',
                'selector': `${filter_modile_view_footer} a.difl_filter_cls_btn`,
                'type': 'background'
            });
        }

        if ( 'multiple_filter' === props['post_display'] ){
            utility.process_range_value({
                'props'             : props,
                'key'               : 'multi_filter_autocomplete_max_height',
                'additionalCss'     : additionalCss,
                'selector'          : '%%order_class%% .autocomplete-list',
                'type'              : 'max-height',
                'unit'              : 'px',
                'default_value'     : '180',
                'important'         : false,
                'negative'          : false,
                'fixed_unit'        : 'px'
            });
            utility.process_margin_padding({
                'props': props,
                'key': 'multi_filter_container_padding',
                'additionalCss': additionalCss,
                'selector': '%%order_class%% .filter_section .filter_field_wrapper',
                'type': 'padding'
            });
            utility.process_margin_padding({
                'props': props,
                'key': 'multi_filter_container_margin',
                'additionalCss': additionalCss,
                'selector': '%%order_class%% .filter_section .filter_field_wrapper',
                'type': 'margin',
                'important':false
            });

            const range_background = props['multi_filter_range_bg'] ? props['multi_filter_range_bg'] : '#e1e4e9';
            additionalCss.push([{
                selector:    '%%order_class%% .filter_section li .irs .irs-line',
                declaration: `background-color: ${range_background};`
            }]);
            const range_active_color = props['multi_filter_range_active_color'] ? props['multi_filter_range_active_color'] : '#ed5565';
            additionalCss.push([{
                selector:    '%%order_class%% .filter_section li .irs .irs-bar',
                declaration: `background-color: ${range_active_color};`
            }]);
            const range_active_border_color = props['multi_filter_range_active_border_color'] ? props['multi_filter_range_active_border_color'] : '#da4453';
            additionalCss.push([{
                selector:    '%%order_class%% .filter_section li .irs .irs-handle>i:first-child',
                declaration: `background-color: ${range_active_border_color};`
            }]);
            const range_tooltip_color = props['multi_filter_range_tooltip_bg'] ? props['multi_filter_range_tooltip_bg'] : '#ed5565';
            additionalCss.push([{
                selector:    '%%order_class%% .filter_section li .irs .irs-from, %%order_class%% .filter_section li .irs .irs-to',
                declaration: `background-color: ${range_tooltip_color};`
            }]);
            additionalCss.push([{
                selector:    '%%order_class%% .filter_section li .irs .irs-from:before, %%order_class%% .filter_section li .irs .irs-to:before',
                declaration: `border-top-color: ${range_tooltip_color};`
            }]);
            const range_min_max_backgrond = props['multi_filter_range_min_max_bg'] ? props['multi_filter_range_min_max_bg'] : '#e1e4e9';
            additionalCss.push([{
                selector:    '%%order_class%% .filter_section li .irs .irs-min, %%order_class%% .filter_section li .irs .irs-max',
                declaration: `background-color: ${range_min_max_backgrond};`
            }]);
        }


        utility.process_margin_padding({
            'props': props,
            'key': 'multi_filter_input_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .filter_section ul li select , %%order_class%% .filter_section li .multi-select-component',
            'type': 'margin'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'multi_filter_input_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .filter_section ul li select , %%order_class%% .filter_section li .multi-select-component',
            'type': 'padding'
        });

        utility.process_margin_padding({
            'props': props,
            'key': 'multi_filter_dropdown_container_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .filter_section ul li .dropdown-container',
            'type': 'margin'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'multi_filter_dropdown_container_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .filter_section ul li .dropdown-container',
            'type': 'padding'
        });

        utility.process_margin_padding({
            'props': props,
            'key': 'multi_filter_label_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .filter_section ul li span.multi_filter_label',
            'type': 'margin'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'multi_filter_label_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .filter_section ul li span.multi_filter_label',
            'type': 'padding'
        });

        utility.process_margin_padding({
            'props': props,
            'key': 'multi_filter_checkbox_field_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .filter_section ul li .checkbox_container',
            'type': 'margin'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'multi_filter_checkbox_field_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .filter_section ul li .checkbox_container',
            'type': 'padding'
        });

        const multi_filter_checkbox_field_checkbox_item_gap = props.multi_filter_checkbox_field_checkbox_item_gap ? parseInt(props.multi_filter_checkbox_field_checkbox_item_gap) : '8';
        additionalCss.push([{
            selector:    '%%order_class%% .filter_section li .checkbox_container .checkbox_content',
            declaration: `margin-bottom: ${multi_filter_checkbox_field_checkbox_item_gap}px;`
        }]);

        const multi_filter_checkbox_field_checkbox_item_space_left = props.multi_filter_checkbox_field_checkbox_item_space_left ? parseInt(props.multi_filter_checkbox_field_checkbox_item_space_left) : '10';
        additionalCss.push([{
            selector:    '%%order_class%% .filter_section li .checkbox_container .checkbox_content',
            declaration: `margin-left: ${multi_filter_checkbox_field_checkbox_item_space_left}px;`
        }]);

        const multi_filter_checkbox_field_checkbox_size = props.multi_filter_checkbox_field_checkbox_size ? parseInt(props.multi_filter_checkbox_field_checkbox_size) : '25';
        additionalCss.push([{
            selector:    '%%order_class%% .filter_section li .checkbox_container .checkmark',
            declaration: `height: ${multi_filter_checkbox_field_checkbox_size}px; width: ${multi_filter_checkbox_field_checkbox_size}px;`
        }]);

        const multi_filter_checkbox_field_checkbox_text_space_left = props.multi_filter_checkbox_field_checkbox_text_space_left ? parseInt(props.multi_filter_checkbox_field_checkbox_text_space_left) : '35';
        additionalCss.push([{
            selector:    '%%order_class%% .filter_section li .checkbox_container .checkbox_content',
            declaration: `padding-left: ${multi_filter_checkbox_field_checkbox_text_space_left}px;`
        }]);

        const multi_filter_checkbox_field_checkbox_checked_color = props.multi_filter_checkbox_field_checkbox_checked_color ? props.multi_filter_checkbox_field_checkbox_checked_color : '#2196F3';
        additionalCss.push([{
            selector:    '%%order_class%% .filter_section li .checkbox_container input:checked ~ .checkmark',
            declaration: `background-color: ${multi_filter_checkbox_field_checkbox_checked_color};`
        }]);

        if( 'multiple_filter' === props.post_display  && 'default' !==props.multi_filter_placement){
            utility.process_range_value({
                'props'             : props,
                'key'               : 'multi_filter_container_width',
                'additionalCss'     : additionalCss,
                'selector'          : '%%order_class%% .df_filter_sidebar .filter_section',
                'type'              : 'width',
                'unit'              : '%',
                'default_value'     : '30',
                'important'         : false,
                'negative'          : false,
                'fixed_unit'        : '%'
            });
            if( 'right' === props.multi_filter_placement){
                additionalCss.push([{
                    selector:    '%%order_class%% .df_cptfilter_container.df_filter_sidebar',
                    declaration: `flex-direction: row-reverse`
                }]);
            }

            let multi_filter_container_width = props.multi_filter_container_width ? props.multi_filter_container_width : '0%' ;
            multi_filter_container_width = multi_filter_container_width.includes('%')? multi_filter_container_width : multi_filter_container_width + '%';
            additionalCss.push([{
                selector:    '%%order_class%% .df_filter_sidebar .df-cpts-wrap',
                declaration: `width: calc(100% - ${multi_filter_container_width});`,
            }]);
            let multi_filter_container_width_tablet = props.multi_filter_container_width_tablet ? props.multi_filter_container_width_tablet : multi_filter_container_width ;
            multi_filter_container_width_tablet = '' !== multi_filter_container_width_tablet ? multi_filter_container_width_tablet : '0%';
            multi_filter_container_width_tablet = multi_filter_container_width_tablet.includes('%')? multi_filter_container_width_tablet : multi_filter_container_width_tablet + '%';
	        if("100%" === multi_filter_container_width_tablet){
		        multi_filter_container_width_tablet = "0%";
	        }
            additionalCss.push([{
                selector:    '%%order_class%% .df_filter_sidebar .df-cpts-wrap',
                declaration: `width: calc(100% - ${multi_filter_container_width_tablet});`,
                'device':'tablet'
            }]);
            let multi_filter_container_width_phone = props.multi_filter_container_width_phone ? props.multi_filter_container_width_phone : multi_filter_container_width_tablet ;
            multi_filter_container_width_phone = '' !== multi_filter_container_width_phone ? multi_filter_container_width_phone : '0%';
            multi_filter_container_width_phone = multi_filter_container_width_phone.includes('%')? multi_filter_container_width_phone : multi_filter_container_width_phone + '%';
			if("100%" === multi_filter_container_width_phone){
				multi_filter_container_width_phone = "0%";
			}
            additionalCss.push([{
                selector:    '%%order_class%% .df_filter_sidebar .df-cpts-wrap',
                declaration: `width: calc(100% - ${multi_filter_container_width_phone});`,
                'device':'phone'
            }]);
        }

        if(props.post_display === 'multiple_filter' && props.enable_mobile_responsive === 'on'){
            additionalCss.push([{
                selector:    '%%order_class%% .df_cptfilter_container , %%order_class%% .df_cptfilter_container.df_filter_sidebar',
                declaration: `flex-direction:column;`,
                'device':'phone'
            }]);

            additionalCss.push([{
                selector:    '%%order_class%% .df_cptfilter_container .filter_section, %%order_class%% .df_cptfilter_container .filter_section ul',
                declaration: `display:block; width:100%;`,
                'device':'phone'
            }]);

            additionalCss.push([{
                selector:    '%%order_class%% .df_cptfilter_container .filter_section li, %%order_class%% .df_cptfilter_container .filter_section li select, %%order_class%% .df_cptfilter_container .filter_section li> span',
                declaration: `width:100%;`,
                'device':'phone'
            }]);
            additionalCss.push([{
                selector:    '%%order_class%% .df_cptfilter_container .filter_section li, %%order_class%% .df_cptfilter_container .filter_section li select, %%order_class%% .df_cptfilter_container .df-cpts-wrap',
                declaration: `width:100% !important;max-width:100% !important;`,
                'device':'phone'
            }]);
       
        }
        // load more button
        utility.df_process_string_attr({
            'props'             : props,
            'key'               : 'load_more_align',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .load-more-pagintaion-container',
            'type'              : 'text-align',
            'default_value'     : 'left'
        });
        utility.df_process_bg({
            'props': props,
            'additionalCss': additionalCss,
            'key': 'load_more_background',
            'selector': '%%order_class%% .df-cptfilter-load-more'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'load_more_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-cptfilter-load-more',
            'type': 'margin'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'load_more_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-cptfilter-load-more',
            'type': 'padding'
        });
        if(props.full_width_load_more && props.full_width_load_more === 'on') {
            additionalCss.push([{
                selector:    '%%order_class%% .df-cptfilter-load-more',
                declaration: `width: 100%;`
            }]);
        }
        utility.process_icon_font_style({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'load_more_font_icon',
            'selector'          : '%%order_class%% .et-pb-icon.df-load-more-icon'
        })

        // Search Bar

        utility.process_icon_font_style({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'search_bar_font_icon',
            'selector'          : '%%order_class%% .et-pb-icon.search_icon'
        })
        utility.process_color({
        'props': props,
        'key': 'search_button_icon_color',
        'additionalCss': additionalCss,
        'selector': '%%order_class%% .search_bar .search_bar_button .et-pb-icon.search_icon',
        'type': 'color',
        })
    
        utility.process_range_value({
        'props': props,
        'key': 'search_button_icon_size',
        'additionalCss': additionalCss,
        'default': '14px',
        'selector': '%%order_class%% .search_bar .et-pb-icon.search_icon',
        'type': 'font-size',
        });

        utility.process_range_value({
            'props': props,
            'key': 'search_input_width',
            'additionalCss': additionalCss,
            'default': '200px',
            'selector': '%%order_class%% .df_search_filter_input',
            'type': 'width',
            });
        utility.df_process_string_attr({
            'props'             : props,
            'key'               : 'search_bar_align',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .search_bar',
            'type'              : 'justify-content',
            'default_value'     : 'center'
        });
        utility.df_process_bg({
            'props': props,
            'additionalCss': additionalCss,
            'key': 'search_bar_input_background',
            'selector': '%%order_class%% .search_bar input.df_search_filter_input'
        });

        utility.df_process_bg({
            'props': props,
            'additionalCss': additionalCss,
            'key': 'search_bar_button_background',
            'selector': '%%order_class%% .search_bar .search_bar_button'
        });

        utility.df_process_bg({
            'props': props,
            'additionalCss': additionalCss,
            'key': 'search_bar_wrapper_background',
            'selector': '%%order_class%% .search_bar'
        });

        utility.process_margin_padding({
            'props': props,
            'key': 'search_bar_wrapper_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .search_bar',
            'type': 'margin'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'search_bar_wrapper_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .search_bar',
            'type': 'padding'
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'search_bar_button_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .search_bar .search_bar_button',
            'type': 'padding'
        });

        utility.process_margin_padding({
            'props': props,
            'key': 'search_bar_button_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .search_bar .search_bar_button',
            'type': 'margin'
        });
        
        utility.process_margin_padding({
            'props': props,
            'key': 'search_bar_input_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .search_bar input.df_search_filter_input',
            'type': 'padding'
        });

        utility.process_margin_padding({
            'props': props,
            'key': 'search_bar_button_icon_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .search_bar .search_icon',
            'type': 'margin'
        });

        if(props.use_image_as_background && props.use_image_as_background ==='on' && props.use_background_scale && props.use_background_scale === 'on' ){
            additionalCss.push([{
                selector:    '.difl_cptfilter%%order_class%%',
                declaration: `z-index: 1`
            }]);
        }
        
        if(props.turn_off_cpt_sticky === 'tablet_phone' ){
            additionalCss.push([{
                selector:    '%%order_class%% .filter_section.difl_cpt_sticky_filter_on, %%order_class%% .filter_section.difl_cpt_sticky_filter_on + ul.df-cpt-filter-nav',
                declaration: `position: unset;`,
                'device':'tablet'
            }]);
        }else if(props.turn_off_cpt_sticky === 'phone' ){
            additionalCss.push([{
                selector:    '%%order_class%% .filter_section.difl_cpt_sticky_filter_on, %%order_class%% .filter_section.difl_cpt_sticky_filter_on + ul.df-cpt-filter-nav',
                declaration: `position: unset;`,
                'device':'phone'
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
        let view_mode = window.ET_Builder.API.State.View_Mode.current;
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
        $(document).ready(() => {
            const multiple_filter_ranges = $(this.wrapper.current).find('.filter_section li .df-rangle-slider');

            if (multiple_filter_ranges.length > 0) {
                multiple_filter_ranges.each((index, multiple_filter_range) => {
                    const data = JSON.parse($(multiple_filter_range).attr('data-range'));
                    $(multiple_filter_range).ionRangeSlider(data);
                });
            }
            
            let sticky_filter = 'on'===props.cpt_sticky_filter?'difl_cpt_sticky_filter_on':'';
            let stickyOffset  = props.cpt_sticky_offset ? parseInt(props.cpt_sticky_offset.slice(0, -2), 10)  : 0;
            
            const multi_filter_container = $(this.wrapper.current).find('.filter_section');
            multi_filter_container.addClass(sticky_filter);
            multi_filter_container.attr("data-top", stickyOffset);

            if(this.props.post_display === 'multiple_filter' && this.props.enable_mobile_responsive === 'on' && 'phone' === view_mode){
                const enable_mobile_responsive_view_on_builder = (this.props.enable_mobile_responsive_view_on_builder) ? this.props.enable_mobile_responsive_view_on_builder : 'on';
                if('on' === enable_mobile_responsive_view_on_builder) {
                    multi_filter_container.removeClass('df_phn_resp')
                        .addClass('df_phn_resp_cls')
                        .addClass("df_phn_resp_builder")

                    if (multi_filter_container.find('.difl_filter_short_desc_card').length === 0){
                        const filter_short_desc_title = document.createElement('h4');
                        filter_short_desc_title.innerText = "Filter";
                        const targetElement = document.querySelector('.filter_wrapper .difl_filter_short_desc_card_header .filter_elements');

                        // Step 3: Insert the new element before the target element
                        if (targetElement && targetElement.parentNode) {
                            targetElement.parentNode.insertBefore(filter_short_desc_title, targetElement);
                        }

                        const filter_short_desc = document.createElement("div");
                        filter_short_desc.classList.add("difl_filter_short_desc_card");
                        filter_short_desc.setAttribute("data-parent", "%%order_class%%");
                        const show_btn = document.createElement("a");
                        show_btn.classList.add("difl_filter_show_btn");
                        show_btn.innerText = `Show (4)`;
                        show_btn.setAttribute("href", "javascript:void(0);")
                        const cls_btn = document.createElement("a");
                        cls_btn.classList.add("difl_filter_cls_btn");
                        cls_btn.innerText = "Cancel";
                        cls_btn.setAttribute("href", "javascript:void(0);")
                        filter_short_desc.appendChild(show_btn);
                        filter_short_desc.appendChild(cls_btn);
                        multi_filter_container.find('.filter_wrapper').append(filter_short_desc);
                    }
                }else{
                    multi_filter_container.removeClass('df_phn_resp_cls').addClass('df_phn_resp');
                    multi_filter_container.find('.filter_wrapper .difl_filter_short_desc_card').remove();
                    multi_filter_container.find(`.filter_wrapper .difl_filter_short_desc_card_header h4`).remove();
                }
            }

        });

        return {__html: doc.querySelector('body').outerHTML};
    }

    search_bar_render(){
        return '<input type="text" name="df_search_filter" placeholder="Search" class="df_search_filter_input">';
    }

    render() {
        const props = this.props;
        var multi_filter_placement_class = 'multiple_filter' == props.post_display && 'default' !== props.multi_filter_placement ? ' df_filter_sidebar' : '';
        return (
            <React.Fragment>
                {this.state.loading === false ?
                    <div className={"df_cptfilter_container load-complete" + multi_filter_placement_class + ` orderby_${props.orderby}` } dangerouslySetInnerHTML={this.render_output()} ref={this.wrapper} />
                    :
                    <div className="et-fb-preloader et-fb-preloader__loading">
                        <div className="et-fb-loader"/>
                    </div>
                }
                { props.content.length !== 0 ? props.content : '' }
            </React.Fragment>
        )
        
    }
    
    dfHandleScroll = () => {
        let loggedIn  = document.querySelector("#wpadminbar") ? document.querySelector("#wpadminbar").offsetHeight : 0;
        let navHeight = document.querySelector("#main-header") ? document.querySelector("#main-header").offsetHeight : 0;
        let stickyNav = document.querySelector(".et_fixed_nav");
        let stickyEle = document.querySelectorAll(".difl_cpt_sticky_filter_on");
        let windowWidth = window.innerWidth;
        
        stickyEle.forEach(element => {
            let dataAttribute = element.getAttribute('data-top');
            let stickyOffset  = loggedIn + Number(dataAttribute);
            let cptFilterNav  = element.parentElement.querySelector('.df-cpt-filter-nav');
            
            if(stickyNav && windowWidth > 980){
                let stickyNavOffset = stickyOffset + navHeight;
                element.style.top = `${stickyNavOffset}px`;
                if(cptFilterNav){
                    cptFilterNav.style.top = `${stickyNavOffset}px`;
                }
            } else {
                element.style.top = `${stickyOffset}px`;
                if(cptFilterNav){
                    cptFilterNav.style.top = `${stickyOffset}px`;
                }
            }
        });
    }
}

export default CptFilter;
