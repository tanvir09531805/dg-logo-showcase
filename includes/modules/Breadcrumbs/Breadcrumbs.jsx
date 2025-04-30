// External Dependencies
import React, { Component } from 'react';
import axios from 'axios';
import utility from '../../../scripts/df_scripts/utilities';
// Internal Dependencies
import './style.css';


class Breadcrumbs extends Component {
    static slug = 'difl_breadcrumbs';

    constructor(props) {
        super(props);

        this.state = {
            breadcrumbs_item: '',
            loading: true,
        }
        this.wrapper = React.createRef();
        this.get_breadcrumbs = this.get_breadcrumbs.bind(this);
        this.computedType = ['use_home_icon', 'home_font_icon', 'home_icon_placement', 'use_icon_inner_item', 'inner_icon','separator_text', 'separator_font_icon', 
                                'use_separator_icon', 'home_text', 'enable_custom_page' , 'page_title', 'show_title'];
    }
    componentDidUpdate(prevProps, prevState) {
        const _this = this;

        if(_this.state.loading) {
            setTimeout(_this.get_breadcrumbs, 500)
        }


        for (const index of _this.computedType) {
            if (prevProps[index] !== _this.props[index]) {
                if(_this.computedType.includes(index)){
                    _this.setState({loading: true})
                }
            }
        } 
    }
    get_string_value(content) {
        if (content !== undefined) {
            let string_value = '';
  
            if (typeof content === 'string') {
                string_value = content;
            }
  
            if (typeof content === 'object' && content.hasValue) {
                string_value = content.value;
            }
  
            return string_value.replace(/(<([^>]+)>)/ig, '');
        }
  
        return '';
    }
    /**
     * Get all products through ajax request
     * 
     */
     get_breadcrumbs() {
        const _this = this;
       const title_props = utility.df_collect_dynamic_content('page_title', _this.props);
       const pageTitle = 'on' === _this.props.enable_custom_page ?  _this.get_string_value(title_props) : '';

       const home_props = utility.df_collect_dynamic_content('home_text', _this.props);
       const home_text = _this.get_string_value(home_props);
       
        axios({
            method: 'post',
            url: window.ETBuilderBackend.ajaxUrl,
            params: {
                action : 'df_breadcrumbs_data'
            },
            data : {
                et_admin_load_nonce: window.et_fb_options.et_admin_load_nonce,
                request_type : window.ET_Builder.Frames.app.ETBuilderBackendDynamic.requestType,
                post_id : window.ET_Builder.Frames.app.ETBuilderBackendDynamic.postId,
                post_item: window.ET_Builder.Frames.app.ETBuilderBackendDynamic.postMeta,
                post_current_title: window.ET_Builder.Frames.app.ETBuilderBackendDynamic.postTitle,
                visual_builder : true,
                use_home_icon: _this.props.use_home_icon,
                home_font_icon: _this.props.home_font_icon ? _this.props.home_font_icon : '&#xe074;' ,
                home_icon_placement: _this.props.home_icon_placement,
                use_icon_inner_item: _this.props.use_icon_inner_item,
                inner_icon: _this.props.inner_icon ? _this.props.inner_icon : '&#x39;' ,
                use_separator_icon: _this.props.use_separator_icon,
                separator_font_icon: _this.props.separator_font_icon ? _this.props.separator_font_icon : '&#x39;',
                separator_text: _this.props.separator_text,
                home_text: home_text,
                page_title: pageTitle,
                use_page_custom_url: _this.props.use_page_custom_url,
                page_custom_url: _this.props.use_page_custom_url === 'on' && _this.props.dynamic.page_custom_url.hasValue ? utility._renderDynamicContent(_this.props , 'page_custom_url',false) : '',
                page_custom_url_target: _this.props.page_custom_url_target,
                search_title: _this.props.search_title,
                error_404_title:_this.props.error_404_title,
                show_on_front_page:'on' === _this.props.show_on_front_page ? true : false,
                show_title: 'on' === _this.props.show_title ? true : false
            }
        })
        .then(function(response) {
            _this.setState({
                loading: false,
                breadcrumbs_item: response.data.data
            })
        })
        
    }
  
    static css (props) {
        const additionalCss = [];
       
        if (props.alignment !== '') {
            utility.df_process_string_attr({
              'props': props,
              'key': 'alignment',
              'additionalCss': additionalCss,
              'selector': '%%order_class%% ul.df-breadcrumbs',
              'type': 'justify-content',
              'default_value': 'left'
            });
        }

        // Background
        utility.df_process_bg({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'breadcrumbs_background',
            'selector'          : '%%order_class%% ul.df-breadcrumbs'
        });
        utility.df_process_bg({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'separator_background',
            'selector'          : '%%order_class%% .df-breadcrumbs-separator'
        });
        utility.df_process_bg({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'home_background',
            'selector'          : '%%order_class%% .df-breadcrumbs-item.df-breadcrumbs-start'
        });
        utility.df_process_bg({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'pages_background',
            'selector'          : '%%order_class%% .df-breadcrumbs-item'
        });
        utility.df_process_bg({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'active_page_background',
            'selector'          : '%%order_class%% .df-breadcrumbs-item.df-breadcrumbs-end'
        });
        // Home Icon Style
        utility.process_color({
            'props': props,
            'key': 'home_icon_color',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .et-pb-icon.df-home-icon',
            'type': 'color',
        })
    
        utility.process_range_value({
            'props': props,
            'key': 'home_icon_font_size',
            'additionalCss': additionalCss,
            'default': '16px',
            'selector': '%%order_class%% .et-pb-icon.df-home-icon',
            'type': 'font-size',
            'important': true
        });

        utility.process_icon_font_style({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'home_font_icon',
            'selector'          : '%%order_class%% .et-pb-icon.df-home-icon'
        });

         // Home Icon Style
         utility.process_color({
            'props': props,
            'key': 'inner_icon_color',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .et-pb-icon.df-inner-icon',
            'type': 'color',
        })
    
        utility.process_range_value({
            'props': props,
            'key': 'inner_icon_font_size',
            'additionalCss': additionalCss,
            'default': '16px',
            'selector': '%%order_class%% .et-pb-icon.df-inner-icon',
            'type': 'font-size',
            'important': true
        });

        utility.process_range_value({
            'props': props,
            'key': 'inner_icon_spacing',
            'additionalCss': additionalCss,
            'default': '5px',
            'selector': '%%order_class%% .et-pb-icon.df-inner-icon',
            'type': 'margin-left',
            'important': true
        });
        utility.process_icon_font_style({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'inner_icon',
            'selector'          : '%%order_class%% .et-pb-icon.df-inner-icon'
        });

        // Separator Icon Style
        utility.process_color({
            'props': props,
            'key': 'separator_icon_color',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .et-pb-icon.df-separator-icon',
            'type': 'color',
        })

        utility.process_range_value({
            'props': props,
            'key': 'separator_icon_font_size',
            'additionalCss': additionalCss,
            // 'default': '16px',
            'selector': '%%order_class%% .df-breadcrumbs-separator .df-breadcrumbs-separator-icon',
            'type': 'font-size',
            'important': true
        });

        utility.process_icon_font_style({
            'props'             : props,
            'additionalCss'     : additionalCss,
            'key'               : 'separator_font_icon',
            'selector'          : '%%order_class%% .et-pb-icon.df-separator-icon'
        })

        // Custom Spacing

        utility.process_margin_padding({
            'props': props,
            'key': 'breadcrumbs_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% ul.df-breadcrumbs',
            'type': 'margin',
            'important': false
          });

          utility.process_margin_padding({
            'props': props,
            'key': 'breadcrumbs_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% ul.df-breadcrumbs',
            'type': 'padding',
            'important': false
          });

          utility.process_margin_padding({
            'props': props,
            'key': 'pages_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-breadcrumbs-item',
            'type': 'margin',
            'important': false
          });

          utility.process_margin_padding({
            'props': props,
            'key': 'pages_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-breadcrumbs-item',
            'type': 'padding',
            'important': false
          });
          utility.process_margin_padding({
            'props': props,
            'key': 'home_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-breadcrumbs-item.df-breadcrumbs-start',
            'type': 'margin',
            'important': false
          });

          utility.process_margin_padding({
            'props': props,
            'key': 'home_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-breadcrumbs-item.df-breadcrumbs-start',
            'type': 'padding',
            'important': false
          });
          utility.process_margin_padding({
            'props': props,
            'key': 'home_icon_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-breadcrumbs-item.df-breadcrumbs-start .df-breadcrumbs-home-icon .df-home-icon',
            'type': 'margin',
            'important': false
          });
          utility.process_margin_padding({
            'props': props,
            'key': 'active_page_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-breadcrumbs-item.df-breadcrumbs-end',
            'type': 'margin',
            'important': false
          });

          utility.process_margin_padding({
            'props': props,
            'key': 'active_page_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df-breadcrumbs-item.df-breadcrumbs-end',
            'type': 'padding',
            'important': false
          });
          utility.process_margin_padding({
            'props': props,
            'key': 'separator_margin',
            'additionalCss': additionalCss,
            'selector': ' %%order_class%% .df-breadcrumbs-separator',
            'type': 'margin',
            'important': false
          });

          utility.process_margin_padding({
            'props': props,
            'key': 'separator_padding',
            'additionalCss': additionalCss,
            'selector': ' %%order_class%% .df-breadcrumbs-separator',
            'type': 'padding',
            'important': false
          });
         
        return additionalCss;
    }
    render_output() {
        const props = this.props;
        var content = this.state.breadcrumbs_item;
        var parser = new DOMParser();
        var doc = parser.parseFromString(content, "text/html");
        
        return {__html: doc.querySelector('body').outerHTML};
    }


    render() {
        const props = this.props;
        return(
            <React.Fragment>
            {this.state.loading === false ? 
                    <React.Fragment>
                        <div className="df_breadcrumbs_container ">
                            <div className="difl_breadcrumbs_wrapper" dangerouslySetInnerHTML={this.render_output()}/>
                        </div>
                    </React.Fragment>
                    : 
                    <div className="et-fb-preloader et-fb-preloader__loading">
                        <div className="et-fb-loader"/>
                    </div>
                }
            
            </React.Fragment>
        )
    }   
}

export default Breadcrumbs;