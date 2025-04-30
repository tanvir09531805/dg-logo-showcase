// External Dependencies
import React, { Component } from 'react';
import axios from 'axios';
import utility from '../../../scripts/df_scripts/utilities';
// Internal Dependencies
import './style.css';

class WPForms extends Component {
    static slug = 'difl_wpforms';

    constructor(props) {
        super(props);

        this.state = { 
            posts: '', 
            form: {
                styles: '',
                scripts: '',
                markup: ''
            },
            df_loading: true,
        };

        this.wpfcRef = React.createRef();
        this.computedType = ['wpforms'];
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
                action : 'df_wpforms_requestdata'
            },
            data : {
                et_admin_load_nonce: window.et_fb_options.et_admin_load_nonce,
                props: props
            }
        }).then(function(response) {
            if ( _this._isMounted ) {
                // console.log(response.data.data.content);
                _this.setState({posts: response.data.data.content});
            }
        }).then(function(res){
            if ( _this._isMounted ) {
                var el = document.createElement( 'html' );
                el.innerHTML = _this.state.posts;
                var content = el.querySelector('.wpforms-container');
                var styles = el.querySelector('#wpforms-full-css');

                _this.setState({
                    df_loading: false,
                    form: {
                        styles: styles,
                        markup: content
                    }
                });
            }
        });
    }

    static css (props) {
        var additionalCss = [];

        if (props.checkbox_radio_color) {

            utility.process_color({
                props: props,
                key: "checkbox_radio_color",
                additionalCss: additionalCss,
                type: "background-color",
                selector: `%%order_class%% .wpforms-container .wpforms-form input[type="radio"]:checked:after`,
                important: true,
            });

            utility.process_color({
                props: props,
                key: "checkbox_radio_color",
                additionalCss: additionalCss,
                type: "border-color",
                selector: `%%order_class%% .wpforms-container .wpforms-form input[type="radio"]:checked:before, 
                            %%order_class%% .wpforms-container .wpforms-form input[type="radio"]:checked:after, 
                            %%order_class%% .wpforms-container .wpforms-form input[type="radio"]:focus:before, 
                            %%order_class%% .wpforms-container .wpforms-form input[type="checkbox"]:checked:before, 
                            %%order_class%% .wpforms-container .wpforms-form input[type="checkbox"]:checked:after, 
                            %%order_class%% .wpforms-container .wpforms-form input[type="checkbox"]:focus:before`,
                important: true,
            });

            additionalCss.push([
                {
                    selector: `%%order_class%% .wpforms-container .wpforms-form input[type="radio"]:checked:before, 
                            %%order_class%% .wpforms-container .wpforms-form input[type="radio"]:checked:after, 
                            %%order_class%% .wpforms-container .wpforms-form input[type="radio"]:focus:before,
                            %%order_class%% .wpforms-container .wpforms-form input[type="checkbox"]:checked:before, 
                            %%order_class%% .wpforms-container .wpforms-form input[type="checkbox"]:focus:before`,
                    declaration: `box-shadow: 0 0 0 1px ${props.checkbox_radio_color},0px 1px 2px rgba(0,0,0,0.15) !important;`,
                },
            ]);

        }

        if(props.submit_align) {
            // additionalCss.push([{
            //     selector:    '%%order_class%% .wpforms-submit-container',
            //     declaration: `text-align: ${props.submit_align};`,
            // }]);

            utility.df_process_string_attr({
                props: props,
                key: "submit_align",
                additionalCss: additionalCss,
                selector: "%%order_class%% .wpforms-submit-container",
                type: "text-align",
                default_value: "left",
            });
        }
        
        // input background
        utility.df_process_bg({
            'props'         : props,
            'additionalCss' : additionalCss,
            'key'           : 'input_bg',
            'selector'      : `%%order_class%% input[type="text"],
                                %%order_class%% input[type="email"],
                                %%order_class%% input[type="number"],
                                %%order_class%% input[type="tel"],
                                %%order_class%% input[type="password"],
                                %%order_class%% textarea`,
            'important'     : true
        });
        // utility.df_process_bg({
        //     'props'         : props,
        //     'additionalCss' : additionalCss,
        //     'key'           : 'submit_bg',
        //     'selector'      : `%%order_class%% [type="submit"]`,
        //     'important'     : true
        // });

        utility.df_process_bg({
            'props'         : props,
            'additionalCss' : additionalCss,
            'key'           : 'submit_bg',
            'selector'      : `%%order_class%% .wpforms-container .wpforms-submit-container [type="submit"]`,
            'important'     : true
        });

        // prevent hover conflict
        if ("undefined" !== typeof props.submit_bg_bgcolor__hover) {
            additionalCss.push([
                {
                    selector: '%%order_class%% .wpforms-container .wpforms-submit-container [type="submit"]:hover',
                    declaration: `background: ${props.submit_bg_bgcolor__hover} !important;`
                },
            ]);
        }else{
            additionalCss.push([
                {
                    selector: '%%order_class%% .wpforms-container .wpforms-submit-container [type="submit"]:hover',
                    declaration: `background: ${props.submit_bg_bgcolor} !important;`
                },
            ]); 
        }

        // dropdown
        utility.df_process_bg({
            'props'         : props,
            'additionalCss' : additionalCss,
            'key'           : 'drop_bg',
            'selector'      : `%%order_class%% .wpforms-form .wpforms-field-container select, %%order_class%% .wpforms-form .wpforms-field-container select:focus`,
            'important'     : true
        });
        utility.process_range_value({
            'props'             : props,
            'key'               : 'dorpdown_height',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .wpforms-form .wpforms-field-select .choices__inner',
            'type'              : 'min-height',
            'unit'              : 'px'
        });
        utility.process_range_value({
            'props'             : props,
            'key'               : 'dorpdown_height',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .wpforms-form .wpforms-field-select:not(.wpforms-field-select-style-classic) select',
            'type'              : 'height',
            'unit'              : 'px'
        });

        // label spacing
        utility.process_margin_padding({
            'props'             : props,
            'key'               : 'label_margin',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% label.wpforms-field-label',
            'type'              : 'margin'
        });
        utility.process_margin_padding({
            'props'             : props,
            'key'               : 'label_padding',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% label.wpforms-field-label',
            'type'              : 'padding'
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
                                    %%order_class%% textarea`,
            'type'              : 'padding'
        });
        utility.process_margin_padding({
            'props'             : props,
            'key'               : 'radio_margin',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .wpforms-container .wpforms-field-radio',
            'type'              : 'margin'
        });
        utility.process_margin_padding({
            'props'             : props,
            'key'               : 'radio_padding',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .wpforms-container .wpforms-field-radio',
            'type'              : 'padding'
        });
        utility.process_margin_padding({
            'props'             : props,
            'key'               : 'checkbox_margin',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .wpforms-container .wpforms-field-checkbox',
            'type'              : 'margin'
        });
        utility.process_margin_padding({
            'props'             : props,
            'key'               : 'checkbox_padding',
            'additionalCss'     : additionalCss,
            'selector'          : '%%order_class%% .wpforms-container .wpforms-field-checkbox',
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
            // 'selector'          : '%%order_class%% .wpforms-container .wpforms-submit-container [type="submit"]',
            'type'              : 'padding',
        });


        return additionalCss;
    }

    renderPosts() {
        if (this.state.form.markup) {
            if(this.state.form.styles !== null){
                return {__html: this.state.form.styles.outerHTML + this.state.form.markup.outerHTML};
            }else{
                return {__html: this.state.form.markup.outerHTML};
            }
            
        } else {
            return {__html : "There is no form selected"};
        }
    }

    render() {
        const props = this.props;
        
        if (this.state.df_loading === false) {
            return <div className="df-wpf-container" dangerouslySetInnerHTML={this.renderPosts()}></div>
        } else {
            return (
                <div className="et-fb-preloader et-fb-preloader__loading">
                  <div className="et-fb-loader"/>
                </div>
            )
        }
        
    }
}

export default WPForms;
