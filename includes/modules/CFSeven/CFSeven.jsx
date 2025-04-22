// External Dependencies
import React, { Component } from 'react';
import axios from 'axios';
import utility from '../../../scripts/df_scripts/utilities';
// Internal Dependencies
import './style.css';

class CFSeven extends Component {
    static slug = 'difl_cfseven';

    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef();
        this.state = { 
            posts: '', 
            df_loading: true,
        };
        this.computedType = ['cf7_forms'];
        this.requestForPosts = this.requestForPosts.bind(this);
        this.renderPosts = this.renderPosts.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        this.requestForPosts(this.props);
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    componentDidUpdate(prevProps, prevState) {
        var _this = this;
        for (const index in prevProps) {
            if (prevProps[index] !== _this.props[index]) {
                if(_this.computedType.includes(index)){
                    setTimeout(function() {
                        _this.requestForPosts (_this.props);
                        _this.setState({df_loading: true});
                    }, 1500);
                }
            }
        }  
    }

    requestForPosts (props) {
        var _this = this;
        
        axios({
            method: 'post',
            url: window.ETBuilderBackend.ajaxUrl,
            params: {
                action : 'df_cfseven_requestdata'
            },
            data : {
                et_admin_load_nonce: window.et_fb_options.et_admin_load_nonce,
                props: props
            }
        }).then(function(response) {
            if ( _this._isMounted ) {
                _this.setState({posts: response.data.data});
            }
        }).then(function(res){
            if ( _this._isMounted ) {
                _this.setState({df_loading: false});
            }
        });
    }

    static css (props) {
        var additionalCss = [];

        // input background
        utility.df_process_bg({
            'props'         : props,
            'additionalCss' : additionalCss,
            'key'           : 'input_background',
            'selector'      : `%%order_class%% input[type="text"],
                                %%order_class%% input[type="email"],
                                %%order_class%% input[type="number"],
                                %%order_class%% input[type="tel"],
                                %%order_class%% input[type="password"],
                                %%order_class%% input[type="url"],
                                %%order_class%% input[type="date"],
                                %%order_class%% textarea`,
            'important'     : true
        });
        utility.df_process_bg({
            'props'         : props,
            'additionalCss' : additionalCss,
            'key'           : 'select_background',
            'selector'      : `%%order_class%% .wpcf7-select`,
            'important'     : true
        });
        utility.df_process_bg({
            'props'         : props,
            'additionalCss' : additionalCss,
            'key'           : 'submit_background',
            'selector'      : `%%order_class%% [type="submit"]`,
            'important'     : true
        });
        // input spacing
        utility.process_margin_padding({
            'props'             : props,
            'key'               : 'input_margin',
            'additionalCss'     : additionalCss,
            'selector'          : `%%order_class%% input[type="text"],
                %%order_class%% input[type="email"],
                %%order_class%% input[type="number"],
                %%order_class%% input[type="tel"],
                %%order_class%% input[type="password"],
                %%order_class%% input[type="url"],
                %%order_class%% input[type="date"],
                %%order_class%% textarea`,
            'type'              : 'margin'
        });
        utility.process_margin_padding({
            'props'             : props,
            'key'               : 'input_padding',
            'additionalCss'     : additionalCss,
            'selector'          : `%%order_class%% input[type="text"],
                %%order_class%% input[type="email"],
                %%order_class%% input[type="number"],
                %%order_class%% input[type="tel"],
                %%order_class%% input[type="password"],
                %%order_class%% input[type="url"],
                %%order_class%% input[type="date"],
                %%order_class%% textarea`,
            'type'              : 'padding'
        });

        // width

        utility.process_range_value({
            'props': props,
            'key': 'input_text_width',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .wpcf7-form-control.wpcf7-text',
            'type': 'width',
        });
        utility.process_range_value({
            'props': props,
            'key': 'input_email_width',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .wpcf7-form-control.wpcf7-email',
            'type': 'width',
        });
        utility.process_range_value({
            'props': props,
            'key': 'input_textarea_width',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .wpcf7-form-control.wpcf7-textarea',
            'type': 'width',
        });
        utility.process_range_value({
            'props': props,
            'key': 'input_select_width',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .wpcf7-form-control.wpcf7-select',
            'type': 'width',
        });
        utility.process_range_value({
            'props': props,
            'key': 'input_submit_width',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .wpcf7-form-control.wpcf7-submit',
            'type': 'width',
        });

        utility.df_process_string_attr({
            'props': props,
            'key': 'submit_button_align',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% p:has(.wpcf7-form-control.wpcf7-submit) ',
            'type': 'text-align',
          });
       
        // dropdown spacing
        utility.process_margin_padding({
            'props'             : props,
            'key'               : 'dropdown_margin',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .wpcf7-select',
            'type'              : 'margin'
        });
        utility.process_margin_padding({
            'props'             : props,
            'key'               : 'dropdown_padding',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .wpcf7-select',
            'type'              : 'padding'
        });
        // submit spacing
        utility.process_margin_padding({
            'props'             : props,
            'key'               : 'submit_margin',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% [type="submit"]',
            'type'              : 'margin'
        });
        utility.process_margin_padding({
            'props'             : props,
            'key'               : 'submit_padding',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% [type="submit"]',
            'type'              : 'padding'
        });

        return additionalCss;
    }

    renderPosts() {
        return {__html: this.state.posts};
    }

    render() {
        // const props = this.props;

        if(this.state.df_loading === false) {
            return (<div className="df-cf7-container" dangerouslySetInnerHTML={this.renderPosts()} />); 
        } else {
            return (
                <div className="et-fb-preloader et-fb-preloader__loading">
                  <div className="et-fb-loader"/>
                </div>
            )
        }
        
    }
}

export default CFSeven;